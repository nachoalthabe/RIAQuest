var CatBag = new Class({
  Extends: Component,
  Binds: [
    'initResource'
  ],
  _app: undefined,// Contendra una referencia al App
  _folder: undefined,
  _resources: {},// Contendra el mapa de clases
  initialize: function(){
    if (arguments[0])
      this.setOptions(arguments[0]);
    return this;
  },
  init: function(){
    var name = this.Name.toLowerCase();
    this._folder = this._app.getFolderPath(name);
    this._resources = this._app.getResources(name);
    while (this._resources.length > 0){
      this._loadResources(this._resources.pop()); 
    };
  },
  _getResourceUrl: function(resource){
    return this._folder+resource+'.class.js';
  },
  _loadResources: function(resource){
    var url = this._getResourceUrl(resource);
    var req = new Request({
      url: url,
      async: false,
      onFailure: function(){
        throw ('Unable to load resource '+resource);
      }
    }).get();
    this._resources[resource] = this.initResource({
      name: resource,
      content: req.response.text
    });
  },
  initResource: function(resource){
    var result = eval(resource.content);
    
  },
  get: function(resource,params){
    if (!this._resources[resource])
      throw ('Unable to load unexist resource '+resource);
    var response = new this._resources[resource](params);
    response.setApp(this._app);
    return response;
  }
});
var SingletonCatBag = new Class({
  Extends: CatBag,
  _instances: {},// Contendra el mapa de instancias
  get: function(resource){
    if (!this._instances[resource]){
      if (!this._resources[resource])
        throw ('Unable to load unexist resource '+resource);
      this._instances[resource] = new this._resources[resource]();
      this._instances[resource].setApp(this._app);
    }
    return this._instances[resource]
  }
});
var ViewsCatBag = new Class({
  Extends: CatBag,
  Name: 'Views'
});
var ControllersCatBag = new Class({
  Extends: SingletonCatBag,
  Name: 'Controllers'
});
var ModelsCatBag = new Class({
  Extends: CatBag,
  Name: 'Models'
});
var ServicesCatBag = new Class({
  Extends: SingletonCatBag,
  Name: 'Services'
});
var PropertiesCatBag = new Class({
  Extends: SingletonCatBag,
  Name: 'Properties',
  _getResourceUrl: function(filename){
    return this._folder+filename+'.json';
  },
  initResource: function(resource){
    return JSON.decode(resource);
  }
});