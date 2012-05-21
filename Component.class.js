var Component = new Class({
  Implements: [Options,Events],
  initialize: function(id){
  	this.id = id;
  },
  setContext: function(app,params){
  	this.setOptions(params);
    this._app = app;
    if(this.init)
      this.init();
    return this;
  },
  killMe: function(){
  	delete window[this.id];
  }
});