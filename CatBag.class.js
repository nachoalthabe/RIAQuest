var CatBag = new Class({
	Implements : [ Options, Events ],
	Binds : [ 'initResource' ],
	_app : undefined,// Contendra una referencia al App
	_folder: undefined,
	_resourceMap : {},// Contendra el mapa de clases
	initialize : function() {
		if (arguments[0])
			this.setOptions(arguments[0]);
		return this;
	},
	init : function(appReference, folder, resources) {
		this._app = appReference;
		this._folder = folder;
		resources.each(this._loadResources.bind(this));
		
	},
	_getResourceUrl: function(resource){
		return this._folder+resource+'.class.js';
	},
	_encodeResourceHash: function(resource){
		return resource.replace('/','_');
	},
	_decodeResourceHash: function(resource){
		return resource.replace('_','/');
	},
	_loadResources: function(resource) {
		var url = this._getResourceUrl(resource)
		var req = new Request({
				url : url,
				async: false,
				onFailure : function() {
					throw ('Unable to load resource ' + content);
				}
			}).get();
		this._resourceMap[this._encodeResourceHash(resource)] = this.initResource(req.response.text);
		
	},
	initResource : function(resource) {
		console.log(eval(resource));
		return eval(resource);
	}
});

var ViewsCatBag = new Class({
	Extends : CatBag
});

var ControllersCatBag = new Class({
	Extends : CatBag
});

var ModelsCatBag = new Class({
	Extends : CatBag
});

var PropertiesCatBag = new Class({
	Extends : CatBag,
	_getResourceUrl: function(filename){
		return this._folder+filename+'.json';
	},
	initResource: function(resource){
		return JSON.decode(resource);
	}
});