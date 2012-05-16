var View = new Class({
	Implements: [Options,Events],
	initialize: function(){
		if(arguments[0])
			this.setOptions();
	},
	setApp: function(app){
		this._app = app;
		return this;
	}
});