var App = new Class({
  Implements: [
      Options,Events
  ],
  Binds: [
      'initApp','_getName'
  ],// Funciones que simpre se ejecutan en
  // contexto this
  _views: new ViewsCatBag(),// CatBag
  _controllers: new ControllersCatBag(),
  _models: new ModelsCatBag(),
  _services: new ServicesCatBag(),
  _store: {},//Se utilizara para persistir modelos de respuestas a servicios
  options: {
    name: 'Application',
    folders: {// Las carpetas donde se encuentra cada cosa
      base: 'resources/',
      views: 'views/',
      controllers: 'controllers/',
      models: 'models/',
      services: 'services/',
      properties: 'properties/'
    },
    resources: {// Lista de cosas a cargar
      views: [],
      controllers: [],
      models: [],
      services: []
    },
    init: {// Configuracion del controller que se dispara la primera vez
      controller: '',// Nombre del controller
      arguments: {}
    // Argumentos que recibe
    }
  },
  getView: function(view,params){
    return this._views.get(view,params);
  },
  getController: function(controller,param){
    return this._controllers.get(controller,param);
  },
  getModel: function(model,param){
    return this._models.get(model,param);
  },
  getService: function(service,param){
    return this._services.get(service,param);
  },
  getStoreKey: function(key){
    if (!this._store[key]){
      return false;
    }else{
      return this._store[key];
    }
  },
  setStoreKey: function(key,value){
    if (!this._store[key]){
      this._store[key] = value;
    }else{
      this._store[key] = Object.merge(this._store[key],value);
    }
    return this._store[key];
  },
  getFolderPath: function(component){
    return this.options.folders.base+this.options.folders[component];
  },
  getResources: function(component){
    return this.options.resources[component];
  },
  _getName: function(){
    return this.options.name;
  },
  addEventListener: function(eventName,callback){
    this.addEvent(eventName,callback);
  },
  initialize: function(options){
    if (options)
      this.setOptions(options);
    // Preparo la iniciacion del app
    this.__defineGetter__("Name",this._getName);
    // Inicializo las CatBags
    this._views.setContext({
      app: this,
      folder: this.getFolderPath('view')
    });
    this._controllers.setContext({
      app: this,
      folder: this.getFolderPath('controllers')
    });
    this._models.setContext({
      app: this,
      folder: this.getFolderPath('models')
    });
    this._services.setContext({
      app: this,
      folder: this.getFolderPath('services')
    });
  },
  executeController: function(controllerName,params){
    var controller = this.getController(controllerName);
    controller['execute'].apply(controller,[
      params
    ]);
  },
  run: function(){
    if (this.options.init.controller!='')
      this.executeController(this.options.init.controller,
          this.options.init.arguments);
  }
});