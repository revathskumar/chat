
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');

db = monk('localhost/chats');

var app = express();
var io = require('socket.io');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
io = io.listen(server);
var sockets = {};
io.sockets.on('connection', function(socket) {
  socket.on('send', function(data){
    var chats = db.get('chats');
    users = db.get('users');
    users.findOne({sid: this.id})
      .success(function(doc){
        chats.insert({text: data.chat, to: data.to, from_name: doc['name'], from_id: doc['sid']}, function(err, doc){
          if(err){
            console.log(err);
          }else{
            // sockets[data.to].emit('get', {chat: data.chat});
            socket.broadcast.emit('get', {chat: data.chat, from: doc['from_name']});
          }
        });
      });
  });

  socket.on('new user', function(data){
    users = db.get('users');
    users.insert({sid: this.id, name: data.name}, function(err, doc){
      if (err) {
        console.log(err);
      }
      else {
        console.log('user created');
        sockets[this.id] = socket;
        socket.broadcast.emit('user list update', {name: data.name, id: this.id});
      }
    });
  });

  socket.on('disconnect', function () {
    users = db.get('users');
    users.remove({sid: this.id})
      .on('success', function(){
        console.log('user deleted');
        socket.broadcast.emit('remove user', {id: this.id});
      });
  });
});
