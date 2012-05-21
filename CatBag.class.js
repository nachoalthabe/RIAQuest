var CatBag = new Class({
	Extends : Component,
	_app : undefined,// Contendra una referencia al App
	_folder : undefined,
	_resources : {},// Contendra el mapa de clases
	init : function() {
		var name = this.Name.toLowerCase();
		this._folder = this._app.getFolderPath(name);
		var toLoad = this._app.getResources(name);
		while (toLoad.length > 0) {
			this._loadResource(toLoad.pop());
		}
		;
	},
	_getResourceUrl : function(resource) {
		return this._folder + resource + '.jsclass';
	},
	_loadResource : function(resource) {
		var url = this._getResourceUrl(resource);
		var req = new Request({
			url : url,
			async : false,
			evalResponse: false,
			onFailure : function() {
				throw ('Unable to load resource ' + resource);
			}
		}).get();

		var content = req.response.text.toString();
		content = content.replace(/[\w\W]+?\n+?/,"");
		content = "{\n"+content;//Para que no se rompa todo...
		this._resources[resource] = this.initResource(resource,content);
	},
	getSourceAccessPath: function(resource,withUnderscore){
		var result;
		if(!withUnderscore){
			result = this._app.Name+'.sources.'+this.Name+'.'+resource;
		}else{
			result = this._app.Name+'_sources_'+this.Name+'_'+resource;
		}
		return result;
	},
	getInstanceAccessPath: function(resource,withUnderscore){
		var result;
		if(!withUnderscore){
			result = this._app.Name+'.instances.'+this.Name+'.'+resource;
		}else{
			result = this._app.Name+'_instances_'+this.Name+'_'+resource;
		}
		return result;
	},
	initResource : function(resource,content) {
		
		if(this._resources[resource]){
			return this._resources[resource];
		}
		
		var id = this.getSourceAccessPath(resource,true);
		
		var scriptElement = '<script id="'+id+'" type="text/javascript">var '+id+' = new Class('+content+')</script>';
		document.write(scriptElement);
		
		return id;
	},
	get : function(resource, params) {
		if (!this._resources[resource])
			throw ('Unable to load unexist resource ' + resource);
		//var response = new window[this._resources[resource]]();
		//var scriptElement = '<script id="'+id+'" type="text/javascript">var '+id+' = new (new Class('+this._resources[resource]+'))();</script>';
		//document.write(scriptElement);
		var id = this.getInstanceAccessPath(resource,true)+'_'+String.uniqueID();
		window[id] = new window[this._resources[resource]](id);
		window[id].setContext(this._app,params);
		return window[id];
	}
});
var SingletonCatBag = new Class({
	Extends : CatBag,
	_instances : {},// Contendra el mapa de instancias
	get : function(resource) {
		if (!this._instances[resource]) {
			if (!this._resources[resource])
				throw ('Unable to load unexist resource ' + this.getSourceAccessPath(resource));
			
			var id = this.getInstanceAccessPath(resource,true)+'_singleton';
			
			window[id] = new window[this._resources[resource]](id);
			window[id].setContext(this._app,false);
			this._instances[resource] = id;
		};
		return window[this._instances[resource]];
	}
});
var ViewsCatBag = new Class({
	Extends : CatBag,
	Name : 'Views'
});
var ControllersCatBag = new Class({
	Extends : SingletonCatBag,
	Name : 'Controllers'
});
var ModelsCatBag = new Class({
	Extends : CatBag,
	Name : 'Models'
});
var ServicesCatBag = new Class({
	Extends : SingletonCatBag,
	Name : 'Services'
});
var PropertiesCatBag = new Class({
	Extends : SingletonCatBag,
	Name : 'Properties',
	_getResourceUrl : function(filename) {
		return this._folder + filename + '.json';
	},
	initResource : function(resource) {
		return JSON.decode(resource);
	}
});