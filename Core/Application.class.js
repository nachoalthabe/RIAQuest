/**
 * @class Application
 * @module Core
 * @constructor
 * @param {Object} options
*/

var Application = new Class({
	Implements : [ Options, Events ],
	Binds : [ '_getName', '_getFolderPath' ],
	loadClass : [ 'CatBag', 'Component', 'SingletonCatBag',
			'CatBags/ControllersCatBag', 'CatBags/ModelsCatBag',
			'CatBags/OperationsCatBag', 'CatBags/ServicesCatBag',
			'CatBags/ViewsCatBag', 'Components/Controller', 'Components/Model', 'Components/Operation', 'Components/Service', 'Components/View' ],
	loadedClass: 0,
	/**
	 * @method initialize
	 * @param {Object} options
	 * @return {Application}
	 * @private
	*/
	initialize : function(options) {
		if (options)
			this.setOptions(options);
		this.includeScripts();
		this.__defineGetter__("name", this._getName);
		this.__defineGetter__("folder", this._getFolderPath);
	},
	init: function(){
		this.loadedClass++;
		if(this.loadedClass < this.loadClass.length)
			return false;
		this.views = new ViewsCatBag().init(this);
		this.controllers = new ControllersCatBag().init(this);
		this.models = new ModelsCatBag().init(this);
		this.services = new ServicesCatBag().init(this);
		this.operations = new OperationsCatBag().init(this);
	},
	/**
	 * @private
	 * @method includeScripts
	 */
	includeScripts : function() {
		this.loadClass.each(function(el){
			var script = document.createElement("script")
			script.type = "text/javascript";
			script.async = false;
			script.src = 'Core/'+el+'.class.js';
			script.onload = this.init.bind(this);
			document.head.appendChild(script);
		}.bind(this))
	},
	/**
	* @private
	* @property views
	* @type {ViewsCatBag}
	* @default undefined
	*/
	views : undefined,
	/**
	* @private
	* @property controllers
	* @type {ControllersCatBag}
	* @default undefined
	*/
	controllers : undefined,
	/**
	* @private
	* @property models
	* @type {ModelsCatBag}
	* @default undefined
	*/
	models : undefined,
	/**
	* @private
	* @property services
	* @type {ServicesCatBag}
	* @default undefined
	*/
	services : undefined,
	/**
	* @private
	* @property operations
	* @type {OperationsCatBag}
	* @default undefined
	*/
	operations : undefined,
	/**
	* @private
	* @property store
	* @type {Object}
	* @default "{}"
	*/
	store : {},
	options : {
		name : 'Application',
		folders : {
			base : 'resources/',
			views : 'views/',
			controllers : 'controllers/',
			models : 'models/',
			services : 'services/'
		},
		resources : {
			views : [],
			controllers : [],
			models : [],
			services : []
		},
		init : {
			controller : '',
			arguments : {}
		}
	},
	/**
	 * @private
	 * @method _getName
	 * @return {String}
	 */
	_getName : function() {
		return this.options.name;
	},
	/**
	 * @private
	 * @method _getFolderPath
	 * @return {String}
	 */
	_getFolderPath : function() {
		return this.options.folders.base;
	},
	/**
	 * @method getView
	 * @param {String} viewName
	 * @param {Object} params
	 * @return {View}
	 */
	getView : function(viewName, params) {
		return this.views.get(viewName, params);
	},
	/**
	 * @method getController
	 * @param {String} controllerName
	 * @return {Controller}
	 */
	getController : function(controllerName) {
		return this.controllers.get(controllerName);
	},
	/**
	 * @method getModel
	 * @param {String} modelName
	 * @param {Object} params
	 * @return {Model}
	 */
	getModel : function(modelName, params) {
		return this.models.get(modelName, params);
	},
	/**
	 * @method getService
	 * @param {String} serviceName
	 * @return {Service}
	 */
	getService : function(serviceName) {
		return this.services.get(serviceName);
	},
	/**
	 * @method getOperations
	 * @param {String} operationID
	 * @return {Operation}
	 */
	getOperations : function(operationID) {
		return this.operations.get(operationID);
	},
	/**
	 * @method getStoreKey
	 * @param {String} key
	 * @return {Object}
	 */
	getStoreKey : function(key) {
		if (!this.store[key]) {
			return false;
		} else {
			return this.store[key];
		}
	},
	/**
	 * @method setStoreKey
	 * @param {String} key
	 * @param {Object} value
	 * @return {Object}
	 */
	setStoreKey : function(key, value) {
		if (!this.store[key]) {
			this.store[key] = value;
		} else {
			this.store[key] = Object.merge(this.store[key], value);
		}
		return this.store[key];
	},
	/**
	 * @method getCatBagFolderPath
	 * @param {String} catBagName
	 * @return {String}
	 */
	getCatBagFolderPath : function(catBagName) {
		return this.folder + this.options.folders[catBagName];
	},
	/**
	 * @method getCatBagResources
	 * @param {String} catBagName
	 * @return {Array} Resources 
	 */
	getCatBagResources : function(catBagName) {
		return this.options.resources[catBagName];
	},
	/**
	 * @method executeController
	 * @param {String} controllerName
	 * @param {Object} params
	 * @return {OperationID}
	 */
	executeController : function(controllerName, params) {
		var controller = this.getController(controllerName);
		controller['execute'].apply(controller, [ params ]);
	},
	/**
	 * @method start
	 * @return {Application}
	 */
	start : function() {
		if (this.options.init.controller != '')
			this.executeController(this.options.init.controller,
					this.options.init.arguments);
	}
});