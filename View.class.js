var View = new Class({
  Extends: Component,
  _endExecution: function(){
    console.log('endExecution');
    delete this;
  }
});