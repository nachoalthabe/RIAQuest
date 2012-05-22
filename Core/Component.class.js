var Component = new Class({
  Implements: [Options,Events],
  initialize: function(id){
  	this.id = id;
  },
  addEventListener: function(eventName,callback){
  	this._app.addEventListener(eventName,callback.bind(this));
  },
  setContext: function(app,sourceFolder,params){
  	this.sourceFolder = sourceFolder;
  	this.setOptions(params);
    this._app = app;
    if(this.init)
      this.init();
    return this;
  },
  killMe: function(){
  	if(this.container){
  		this.container.destroy()
  	}
    delete window[this.id];
  }
});