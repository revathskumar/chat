var Chat = (function() {
  var _el = "";
  var sendBtn = "";
  var input = "";

  var init = function(options) {
    _el = options.el;
    sendBtn = document.getElementById('send');
    input = document.getElementById('chat_input');
    sendBtn.addEventListener('click', addChat);

    socket.on('get', add);
  };

  var addChat = function(e) {
    _el.appendChild(Helpers.wrap_li(" me: " + input.value));
    socket.emit('send', {chat: input.value})
    input.value = "";
  };

  var add = function(data) {
    _el.appendChild(Helpers.wrap_li( data.from + ": " + data.chat));
  };

  return {
    start: init
  }

})();
