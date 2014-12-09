var Helpers = (function(){
  var _wrap_li = function(value){
    var li = document.createElement('li');
    li.innerHTML = value;
    li.addEventListener('click', function(e) {
      this.addClass
    });
    return li;
  };

  return {
    wrap_li: _wrap_li
  }
})();
