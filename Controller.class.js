var Controller = new Class({
	Implements: [Options,Events],
	initialize: function(){
		if(arguments[0])
			this.setOptions();
		this.init();
	},
	setApp: function(app){
		this._app = app;
		return this;
	}
});