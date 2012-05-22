var App = new Class({
	Implements : [ Options, Events ],
	Binds : [ 'initApp', '_getName' ],// Funciones que simpre se ejecutan en
	// contexto this
	_views : {},// CatBag
	_controllers : {},
	_models : {},
	_services : {},
	_properties : {},
	options : {
		name : 'Application',
		folders : {// Las carpetas donde se encuentra cada cosa
			base : 'resources/',
			views : 'views/',
			controllers : 'controllers/',
			models : 'models/',
			services : 'services/',
			properties : 'properties/'
		},
		resources : {// Lista de cosas a cargar
			views : [],
			controllers : [],
			models : [],
			services : [],
			properties : []
		},
		init : {// Configuracion del controller que se dispara la primera vez
			controller : '',// Nombre del controller
			arguments : {}
		// Argumentos que recibe
		}
	},
	getView : function(view, params) {
		return this._views.get(view, params);
	},
	getController : function(controller, param) {
		return this._controllers.get(controller, param);
	},
	getModel : function(model, param) {
		return this._models.get(model, param);
	},
	getService : function(service, param) {
		return this._services.get(service, param);
	},
	getPropertie : function(propertie, param) {
		return this._properties.get(propertie, param);
	},
	getFolderPath : function(component) {
		return this.options.folders.base + this.options.folders[component];
	},
	getResources : function(component) {
		return this.options.resources[component];
	},
	_getName : function() {
		return this.options.name;
	},
	addEventListener: function(eventName,callback){
		this.addEvent(eventName,callback);
	},
	initialize : function(options) {
		if (options)
			this.setOptions(options);
		// Preparo la iniciacion del app

		this.__defineGetter__("Name", this._getName);

		// Inicializo las CatBags
		this._views = new ViewsCatBag();
		this._controllers = new ControllersCatBag();
		this._models = new ModelsCatBag();
		this._services = new ServicesCatBag();
		this._properties = new PropertiesCatBag();
		this._views.setContext(this);
		this._controllers.setContext(this);
		this._models.setContext(this);
		this._services.setContext(this);
		this._properties.setContext(this);
	},
	executeController : function(controllerName, params) {
		var controller = this.getController(controllerName);
		controller['execute'].apply(controller, [ params ]);
	},
	run : function() {
		if (this.options.init.controller != '')
			this.executeController(this.options.init.controller,
					this.options.init.arguments);
	}
});