/**
 * @class Application
 * @module Core
 * @constructor
 * @required
 * @param {Object} [options]
 * @required
 * @param {String} [options.name]
 * @required
 * @param {Object} [options.folders]
 * @param {String} [options.folders.base]
 * @param {String} [options.folders.views]
 * @param {String} [options.folders.controllers]
 * @param {String} [options.folders.models]
 * @param {String} [options.folders.services]
 * @param {Object} [options.resources]
 * @param {String} [options.resources.views]
 * @param {String} [options.resources.controllers]
 * @param {String} [options.resources.models]
 * @param {String} [options.resources.services]
 * @param {Object} [options.init]
 * @param {String} [options.init.controller]
 * @param {Object} [options.init.arguments]
 * 
 * @uses ControllersCatBag 
 * @uses ModelsCatBag
 * @uses OperationsCatBag
 * @uses ServicesCatBag
 * @uses ViewsCatBag
*/

var Application = new Class({
	Implements : [ Options, Events ],
	Binds : [ '_getName', '_getFolderPath' ],
	classQueue : [ 'CatBag', 'Component', 'SingletonCatBag',
			'CatBags/ControllersCatBag', 'CatBags/ModelsCatBag',
			'CatBags/OperationsCatBag', 'CatBags/ServicesCatBag',
			'CatBags/ViewsCatBag', 'Components/Controller', 'Components/Model',
			'Components/Operation', 'Components/Service', 'Components/View' ],
	classLoaded : 0,
	resourceQueue : [],
	resourcesLoaded : 0,
	/**
	 * @method initialize
	 * @param {Object} options
	 * @return {Application}
	 * @private
	*/
	initialize : function(options) {
		if (options)
			this.setOptions(options);
		this.classToLoad = this.classQueue.length;
		while (this.classQueue.length > 0) {
			this.includeScript();
		}
		this.name = this.options.name;
		this.folder = this.options.folders.base;
	},
	/**
	 * @method init
	 * @async
	 * @private
	*/
	init : function() {
		this.classToLoad--;
		if (this.classToLoad > 0)
			return false;
		this.views = new ViewsCatBag().init(this);
		this.controllers = new ControllersCatBag().init(this);
		this.models = new ModelsCatBag().init(this);
		this.services = new ServicesCatBag().init(this);
		this.operations = new OperationsCatBag().init(this);

		while (this.resourceQueue.length > 0) {
			this.loadResource();
		}
	},
	/**
	 * @private
	 * @method includeScripts
	 */
	includeScript : function() {
		var toLoad = this.classQueue.shift();
		var script = document.createElement("script")
		script.type = "text/javascript";
		script.src = 'Core/' + toLoad + '.class.js';
		script.async = false;
		script.onload = this.init.bind(this);
		document.head.appendChild(script);
	},
	/**
	* @private
	* @property views
	* @type ViewsCatBag
	* @default undefined
	*/
	views : undefined,
	/**
	* @private
	* @property controllers
	* @type ControllersCatBag
	* @default undefined
	*/
	controllers : undefined,
	/**
	* @private
	* @property models
	* @type [ModelsCatBag]*
	* @default undefined
	*/
	models : undefined,
	/**
	* @private
	* @property services
	* @type ServicesCatBag
	* @default undefined
	*/
	services : undefined,
	/**
	* @private
	* @property operations
	* @type OperationsCatBag
	* @default undefined
	*/
	operations : undefined,
	/**
	* @private
	* @property store
	* @type Object
	* @default "{}"
	*/
	store : {},
	/**
	* @property options
	* @type Object
	*/
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
	getView : function(viewName, params) {
		return this.views.getInstance(viewName, params);
	},
	/**
	 * @method getController
	 * @param {String} controllerName
	 * @return {Controller}
	 */
	getController : function(controllerName) {
		return this.controllers.getInstance(controllerName);
	},
	/**
	 * @method getModel
	 * @param {String} modelName
	 * @param {Object} params
	 * @return {Model}
	 */
	getModel : function(modelName, params) {
		return this.models.getInstance(modelName, params);
	},
	/**
	 * @method getService
	 * @param {String} serviceName
	 * @return {Service}
	 */
	getService : function(serviceName) {
		return this.services.getInstance(serviceName);
	},
	/**
	 * @method getOperations
	 * @param {String} operationID
	 * @return {Operation}
	 */
	getOperations : function(operationID) {
		return this.operations.getInstance(operationID);
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
		controller.execute(params);
	},
	/**
	 * @method start
	 * @return {Application}
	 * @chainable
	 */
	start : function() {
		if (this.options.init.controller != '')
			this.executeController(this.options.init.controller,
					this.options.init.arguments);
	},
	/**
	 * @method addResourceToLoad
	 * @param {CatBag} catBag
	 * @param {String} resourceName
	 */
	addResourceToLoad : function(catBag, resourceName) {
		this.resourceQueue.push({
			'catBag' : catBag,
			'resourceName' : resourceName
		});
	},
	/**
	 * @method catBagOpen
	 * @param {CatBag} catBag
	 */
	catBagOpen : function(catBag) {
		console.log('Arranca', catBag.name);
	},
	/**
	 * @method catBagReopen
	 * @param {CatBag} catBag
	 */
	catBagReopen : function(catBag) {
		console.log('Rearranca', catBag.name);
	},
	/**
	 * @method catBagClose
	 * @param {CatBag} catBag
	 */
	catBagClose : function(catBag) {
		console.log('Cierra', catBag.name);
		if (this.services.isReady() && this.models.isReady()
				&& this.controllers.isReady() && this.views.isReady()) {
			this.start();
		}
	},
	/**
	 * @protected
	 * @method loadResource
	 * @param {String} resourceName
	 * @returns {String} ClassID
	 */
	loadResource : function() {
		var resource = this.resourceQueue.pop();
		resource.path = resource.catBag.getResourcePath(resource.resourceName, true);
		resource.classID = resource.catBag.getClassID(resource.resourceName, '_')
		var req = new Request({
			url : resource.path,
			async : false,
			evalResponse : false,
			onFailure : function() {
				throw ('Unable to load unexist resource ' + resource);
			},
			onSuccess: function(response){
				this._loadResource(response,resource);
			}.bind(this)
		}).get();
	},
	/**
	 * @method processDependencies
	 * @param {Object} requires
	 * @private
	 */
	processDependencies: function(requires){
		if(requires.model){
			this.models.addResourcesToLoad(requires.model);
		}
		if(requires.controller){
			this.controllers.addResourcesToLoad(requires.controller);
		}
		if(requires.view){
			this.views.addResourcesToLoad(requires.view);
		}
		if(requires.service){
			this.services.addResourcesToLoad(requires.service);
		}
	},
	/**
	 * @method _loadResource
	 * @param {String} response
	 * @param {Object} resource
	 * @private
	 */
	_loadResource: function(response,resource){
		var content = response.toString();
		content = content.replace(/[\w\W]+?\n+?/, "");
		content = resource.classID+"={\n" + content;// Para que no se rompa todo...

		var annotation = "\n\n//@ sourceURL=/" + resource.path + "\n\n";
		var script = '';
		if (true) {
			script = content + annotation;
			try {
				var object = eval(script);
			} catch (error) {
				throw ('Unable to eval resource ' + resource.path);
			}
			if(object.Require){
				this.processDependencies(object.Require);
			}
			window[resource.classID] = new Class(object);
		} else {
			script = 'new Class(' + content + ');' + annotation;

			try {
				window[classID] = eval(script);
			} catch (error) {
				throw ('Unable to eval resource ' + resourcePath);
			}
		}
		resource.catBag.resourceLoaded(resource.resourceName, resource.classID);
	}
});