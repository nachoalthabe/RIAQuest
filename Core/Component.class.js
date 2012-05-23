var Component = new Class({
  Implements: [Options,Events],
  initialize: function(id){
  	this.id = id;
  },
  addEventListener: function(eventName,callback){
  	this._app.addEventListener(eventName,callback.bind(this));
  },
  /**
   * Setea el contexto del componente.
   * {
   *    app: Referencia al app
   *    folder: Carpeta donde encontrar tanto el componente como a sus recursos
   *    params: Parametros de inicializacion
   *    name: Nombre del componente
   *  }
   */
  setContext: function(options){
    if(options.folder)
      this.sourceFolder = options.folder;
  	if(options.params)
  	  this.setOptions(options.params);
  	if(options.app)
  	  this._app = options.app;
    if(options.name)
      this.Name = options.name;
    if(this.init)
      this.init();
    return this;
  },
  killMe: function(){
  	if(this.container){
  		this.container.destroy()
  	}
    delete window[this.id];
  }
});