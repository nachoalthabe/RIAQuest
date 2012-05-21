var Component = new Class({
  Implements: [Options,Events],
  initialize: function(params){
    if (params)
      this.setOptions(params);
  },
  setContext: function(app,params){
  	this.setOptions(params);
    this._app = app;
    if(this.init)
      this.init();
    return this;
  },
});