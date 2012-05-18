var Component = new Class({
  Implements: [Options,Events],
  initialize: function(params){
    if (params)
      this.setOptions(params);
  },
  setApp: function(app){
    this._app = app;
    if(this.init)
      this.init()
    return this;
  },
})