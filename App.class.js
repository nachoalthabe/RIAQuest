var App = new Class({
	Implements : [ Options, Events ],
	Binds : [ 'initApp' ],// Funciones que simpre se ejecutan en contexto this
	_views : new ViewsCatBag(),
	_controllers : new ControllersCatBag(),
	_models : new ModelsCatBag(),
	_properties : new PropertiesCatBag(),
	options : {
		folders : {// Las carpetas donde se encuentra cada cosa
			views : 'views/',
			controllers : 'controllers/',
			models : 'models/',
			properties : 'properties/'
		},
		resources : {// Lista de cosas a cargar
			views : [ 'busqueda/texto' ],
			controllers : [ 'busqueda/texto' ],
			models : [ 'busqueda/texto' ],
			properties : [ 'default' ]
		},
		init : {// Configuracion del controller que se dispara la primera vez
			controller : 'index',// Nombre del controller
			arguments : {}
		// Argumentos que recibe
		}
	},
	initialize : function(options) {
		if (options)
			this.setOptions(options);
		// Preparo la iniciacion del app
		this.addEvent('endInitCatBags', this.initApp);
		// Inicializo las CatBags
		this.fireEvent('startInitCatBags', [ this ]);
		this._views.init(this, this.options.folders.views,
				this.options.resources.views);
		this._controllers.init(this, this.options.folders.controllers,
				this.options.resources.controllers);
		this._models.init(this, this.options.folders.models,
				this.options.resources.models);
		this._properties.init(this, this.options.folders.properties,
				this.options.resources.properties);

	},
	/**
	 * Funcion que llama CatBag cuando termina la carga
	 */
	_endInitCatBag : function() {
		// Si todas las CatBag terminaron
		if (this._views.end && this._controllers.end && this._models.end
				&& this._properties.end)
			// Disparo evento de cierre
			this.fireEvent('endInitCatBags', [ this ]);
	},
	initApp : function() {
		this._controller.call(this.options.init.controller,
				this.options.init.arguments);
	}
});