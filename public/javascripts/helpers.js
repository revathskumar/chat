var Helpers = (function(){
  var _wrap_li = function(value){
    var li = document.createElement('li');
    if(typeof value == 'string') {
      li.innerHTML = value;
    }
    else{
      li.id = value.id;
      li.innerHTML = value.name;
    }
    li.addEventListener('click', function(e) {
      this.addClass
    });
    return li;
  };

  return {
    wrap_li: _wrap_li
  }
})();
