var Service = new Class({
  Extends: Component,
  prepareResponse: function(model,response){
    var model = this._app.getModel(model,response);
    return model;
  },
  getStoreKey: function(key){
    return this._app.getStoreKey(key);
  },
  setStoreKey: function(key,value){
    return this._app.setStoreKey(key,value);
  }
});