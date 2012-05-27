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
	initialize : function() {
	},
	/**
	 * @method setContext
	 * @param {ComponentContext} options
	 * @returns {Component}
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
		return this._app.getStoreKey(key);
	},
	/**
	 * @method setStoreKey
	 * @param {String} key
	 * @param {Object} value
	 * @returns {Object}
	 */
	setStoreKey : function(key, value) {
		return this._app.setStoreKey(key, value);
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