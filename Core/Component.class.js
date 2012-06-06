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
	 * @method execute
	 * @param {String} operationID
	 * @param {Object} params
	 * @returns {Boolean}
	 * @chainable
	 */
	execute : function(operationID, params) {//TODO Implenetar
		return false;
	},
	/**
	 * @protected
	 * @method killMe
	 */
	killMe : function() {
		if (this.container) {
			this.container.destroy()
		}
		delete window[this.id];
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
		if (!this.resources[type][resourceName]) {
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
			this.resources[type][resourceName] = instance;
		}
		return this.resources[type][resourceName];
	},
	/**
	 * @method _delResource
	 * @private
	 * @param {String}
	 *          type ('view'|'component'|'service'|'model')
	 * @param {String}
	 *          resourceName
	 * @return {Boolean} Can delete
	 */
	_delResource : function(type, resourceName) {
		if (this.resources[type][viewName]) {
			delete this.resources[type][viewName];
			return true;
		} else {
			return false;
		}
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
	 * @method delView
	 * @param {String}
	 *          viewName
	 * @return {View}
	 */
	delView : function(viewName) {
		return this._delResource('view', viewName);
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
	 * @method delController
	 * @param {String} controllerName
	 * @return {Controller}
	 */
	delController : function(controllerName) {
		return this._delResource('controller', controllerName);
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
	 * @method delModel
	 * @param {String} modelName
	 * @return {Model}
	 */
	delModel : function(modelName) {
		return this._delResource('model', modelName);
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
	 * @method delService
	 * @param {String} serviceName
	 * @return {Service}
	 */
	delService : function(serviceName) {
		return this._delResource('service', serviceName);
	},
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