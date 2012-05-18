var App = new Class({
  Implements : [ Options, Events ],
  Binds : [ 'initApp' ],// Funciones que simpre se ejecutan en contexto this
  _views : new ViewsCatBag(),
  _controllers : new ControllersCatBag(),
  _models : new ModelsCatBag(),
  _services : new ServicesCatBag(),
  _properties : new PropertiesCatBag(),
  options : {
    folders : {// Las carpetas donde se encuentra cada cosa
      base: 'resources/',
      views : 'views/',
      controllers : 'controllers/',
      models : 'models/',
      services: 'services/',
      properties : 'properties/'
    },
    resources : {// Lista de cosas a cargar
      views : [],
      controllers : ['index'],
      models : [],
      services: [],
      properties : []
    },
    init : {// Configuracion del controller que se dispara la primera vez
      controller: 'index',// Nombre del controller
      arguments: {
        msg: 'Hello Word'
      }
    // Argumentos que recibe
    }
  },
  getView:function(view,params){
    return this._views.get(view,params);
  },
  getController:function(controller,param){
    return this._controllers.get(controller,param);
  },
  getModel:function(model,param){
    return this._models.get(model,param);
  },
  getService:function(service,param){
    return this._services.get(service,param);
  },
  getPropertie:function(propertie,param){
    return this._properties.get(propertie,param);
  },
  getFolderPath: function(component){
    return this.options.folders.base+this.options.folders[component];
  },
  getResources: function(component){
    return this.options.resources[component];
  },
  initialize : function(options) {
    if (options)
      this.setOptions(options);
    // Preparo la iniciacion del app
    
    // Inicializo las CatBags
    this._views.setApp(this);
    this._controllers.setApp(this);
    this._models.setApp(this);
    this._services.setApp(this);
    this._properties.setApp(this);
    
    this.initApp();
  },
  executeController: function(controllerName,params){
    var controller = this.getController(controllerName);
    controller['execute'].apply(controller,[params]);
  },
  initApp : function() {
    this.executeController(this.options.init.controller,this.options.init.arguments);
  }
});