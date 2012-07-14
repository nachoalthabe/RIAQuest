/**
 * @class Component
 * @module Components
 */
var Component = new Class({
	Implements : [ Options, Events ],
	/**
	 * @protected
	 * @property app
	 * @type Application
	 * @default undefined
	 */
	app : undefined,
	resources: {
		'view': [],
		'controller': [],
		'service': [],
		'model': [],
	},
	initialize : function() {
	},
	/**
	 * @method setContext
	 * @param {ComponentContext} options
	 * @returns {Component}
	 * @chainable
	 */
	setContext : function(options) {
		if (options.id)
			this.id = options.id;
		if (options.folder)
			this.sourceFolder = options.folder;
		if (options.params)
			this.setOptions(options.params);
		if (options.app)
			this.app = options.app;
		if (options.name)
			this.Name = options.name;
		if (this.init)
			this.init();
		return this;
	},
	/**
	  * @method getStoreKey
	  * @param {String} key
	  * @returns {Object}
	  */
	getStoreKey : function(key) {
		return this.app.getStoreKey(key);
	},
	/**
	 * @method setStoreKey
	 * @param {String} key
	 * @param {Object} value
	 * @returns {Object}
	 */
	setStoreKey : function(key, value) {
		return this.app.setStoreKey(key, value);
	},
	/**
	 * @method onSuccess
	 * @param {Object} response
	 * @param {String} operationID
	 * @returns {Object}
	 */
	onSuccess : function(response, operationID) {//TODO Implenetar
		return false;
	},
	/**
	 * @method onProgress
	 * @param {Object} response
	 * @param {String} operationID
	 * @returns {Object}
	 */
	onProgress : function(response, operationID) {//TODO Implenetar
		return false;
	},
	/**
	 * @method onFailure
	 * @param {Object} response
	 * @param {String} operationID
	 * @returns {Object}
	 */
	onFailure : function(response, operationID) {//TODO Implenetar
		return false;
	},
	/**
	 * @public
	 * @method destroy
	 */
	destroy : function() {
		this._destroy();
	},
	/**
	 * @provate
	 * @method _destroy
	 */
	_destroy: function() {
		delete window[this.getID()];
	},
	/**
	 * @method _getResource
	 * @private
	 * @param {String}
	 *          type ('view'|'component'|'service'|'model')
	 * @param {String}
	 *          resourceName
	 * @param {Object}
	 *          params
	 * @return {Component}
	 */
	_getResource : function(type, resourceName, params) {
		
			var instance = false;
			switch (type) {
			case 'view':
				instance = this.app.getView(resourceName,params);
				break;
			case 'controller':
				instance = this.app.getController(resourceName,params);
				break;
			case 'service':
				instance = this.app.getService(resourceName,params);
				break;
			case 'model':
				instance = this.app.getModel(resourceName,params);
				break;
			default:
				throw("Type only can be ('view'|'component'|'service'|'model'):",type);
				break;
			}
		return instance;
	},
	/**
	 * @method getID
	 * @return {String} InstanceID
	 */
	getID: function(){
		return this.id;
	},
	/**
	 * @method getView
	 * @param {String}
	 *          viewName
	 * @return {View}
	 */
	getView : function(viewName, params) {
		return this._getResource('view', viewName, params);
	},
	/**
	 * @method getController
	 * @param {String}
	 *          controllerName
	 * @return {Controller}
	 */
	getController : function(controllerName,params) {
		return this._getResource('controller', controllerName, params);
	},
	/**
	 * @method getModel
	 * @param {String} modelName
	 * @param {Object} params
	 * @return {Model}
	 */
	getModel : function(modelName, params) {
		return this._getResource('model', modelName, params);
	},
	/**
	 * @method getService
	 * @param {String} serviceName
	 * @return {Service}
	 */
	getService : function(serviceName,params) {
		return this._getResource('service', serviceName, params);
	},
	/**
	 * @method getInstance
	 * @param {String} instanceID
	 * @return {Object} Required instance or false if can't find it
	 */
	getInstance: function(instanceID){
		var response = false;
		if(window[instanceID]){
			response = window[instanceID];
		}
		return response; 
	},
	callbackMap: {},
	getDatas: function(requests, callback){
		var waitFor = Object.getLength(requests);
		var url,params,method;
		Object.each(requests,function(request,index){
			if(typeof request == 'Object'){
				url = request.url;
			}else{
				url = request;
				requests[index] = {
						url: url,
						response: false
				}
			}
			params = (request.params)?request.params:{};
			method = (request.method)?request.method:'get';
			var req = new Request({
				url : url,
				async : true,
				evalResponse: false,
				onSuccess : function(response){
					waitFor --;
					requests[index].response = response;
						if ( waitFor == 0 ){
							this[callback].apply(this, [requests]);
						};
					fireEvent('dataReady',[response,url,this]);
				}.bind(this),
				onFailure : function() {
					throw ('Unable to load data ' + url);
				}.bind(this)
			});
			if(method == 'get'){
				req.get(params);
			}else{
				req.post(params);
			}
		}.bind(this));
	},
	 /**
	   * @private
	   * @method getData
	   * @param {String} dataURL
	   * @param {String} Function name to callback
	   * @returns {Element}
	   */
	  getData: function(url,callback){
		  if(callback != undefined){
			  if (!this.callbackMap[callback]){
				  this.callbackMap[callback] = {
					  waitFor: 0,
					  responses: []
				  }
			  }else{
				  this.callbackMap[callback].waitFor++;
			  }
		  }
	  	var req = new Request({
				url : url,
				async : true,
				evalResponse: false,
				onSuccess : function(response){
					if (this.callbackMap[callback] != undefined){
						this.callbackMap[callback].responses.push({
							url : url,
							response: response
						});
						if ( this.callbackMap[callback].waitFor == 0 ){
							if(this.callbackMap[callback].responses.lenght == 1){
								var argument = this.callbackMap[callback].responses[0]
							}else{
								this[callback].apply(this, this.callbackMap[callback].responses);
							}
						}
						this.callbackMap[callback].waitFor--;
					}
					fireEvent('dataReady',[response,url,this]);
				}.bind(this),
				onFailure : function() {
					throw ('Unable to load data ' + url);
				}
			}).get();
	  }
});

/**
 * @class ComponentContext
 */
var ComponentContext = {
	/**
	 * @config id
	 * @type {String} 
	 */
	id : '',
	/**
	 * @config folder
	 * @type {String} 
	 */
	folder : '',
	/**
	 * @config params
	 * @type {Object} 
	 */
	params : {},
	/**
	 * @config app
	 * @type {Application} 
	 */
	app : '',
	/**
	 * @config name
	 * @type {String} 
	 */
	name : ''
};