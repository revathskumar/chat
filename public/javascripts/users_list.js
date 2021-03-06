var UserList = (function() {
  var _el = "";
  var username_input = "";
  var username_button = "";

  var init = function(options) {
    _el = options.el;
    username_input = document.getElementsByTagName('input')[0];
    username_button = document.getElementsByTagName('button')[0];
    username_button.addEventListener('click', add);

    socket.on('remove user', remove);
    socket.on('user list update', append);
  };

  var remove = function (data) {
    console.log(data);
  };

  var add = function (e) {
    console.log('In add');
    // debugger;
    var name = username_input.value;
    var li = Helpers.wrap_li({name: name});
    li.className = 'me';
    _el.appendChild(li);
    username_input.value = "";
    _el.removeChild(_el.children[0]);
    socket.emit('new user', {name: name});
  };

  var append = function (data) {
    _el.appendChild(Helpers.wrap_li(data));
  };

  return {
    start: init
  }

})();
