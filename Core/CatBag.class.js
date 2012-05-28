/**
 * @class CatBag
 * @module CatBag
 * @return CatBag
 * @constructor
*/
var CatBag = new Class(
		{
			/**
			 * @protected
			 * @property app
			 * @type Application
			 * @default false
			 */
			app : undefined,
			/**
			 * @protected
			 * @property resources
			 * @type [Component]*
			 * @default []
			 */
			resources : [],
			/**
			 * @protected
			 * @property resourcesToLoad
			 * @type Number
			 * @default 0
			 */
			resourcesToLoad : 0,
			/**
			 * @protected
			 * @method init
			 * @param {Application} app
			 * @returns {Component}
			 * @chainable
			 */
			init : function(app) {
				this.app = app;
				this.folder = this.app.getCatBagFolderPath(this.name);
				var toLoad = this.app.getCatBagResources(this.name);
				if (toLoad.length > 0) {
					this.app.catBagOpen(this);
					this.addResourcesToLoad(toLoad);
				}
				return this;
			},
			/**
			 * @method isReady
			 * @returns {Boolean}
			 */
			isReady : function() {
				if (this.resourcesToLoad == 0)
					return true
				else
					return false
			},
			/**
			 * @method addResourcesToLoad
			 * @param {String} resourcesName
			 */
			addResourcesToLoad : function(resourcesName) {
				resourcesName.each(function(elem){
					if (this.resources[elem] == undefined) {
						this.app.addResourceToLoad(this, elem);
						this.resourcesToLoad++;
					}
				}.bind(this))
			},
			/**
			 * @method resourceLoaded
			 * @param {String} resourceName
			 * @param {String} classID
			 */
			resourceLoaded : function(resourceName, classID) {
				this.resources[resourceName] = classID;
				if (--this.resourcesToLoad == 0) {
					this.app.catBagClose(this);
				}
			},
			/**
			 * @method getResourceFilename
			 * @param {String} resourceName
			 * @param {Boolean} withExtencion
			 * @returns {String}
			 */
			getResourceFilename : function(resourceName, withExtencion) {
				var result = resourceName + '_'
						+ this.name.slice(0, this.name.length - 1);
				if (withExtencion) {
					result += '.jsclass';
				}
				return result;
			},
			/**
			 * @method getResourcePath
			 * @param {String} resourceName
			 * @param {Boolean} withFilename
			 * @returns {String}
			 */
			getResourcePath : function(resourceName, withFilename) {
				var response = this.folder;
				if (withFilename) {
					response += this.getResourceFilename(resourceName, true);
				}
				return response;
			},
			/**
			 * @method getClassID
			 * @param {String} resourceName
			 * @param {String} separator
			 * @returns {String}
			 */
			getClassID : function(resourceName, separator) {
				var result = [ this.app.name, 'sources', this.name,
						resourceName ];
				return result.join((separator) ? separator : '_');
			},
			/**
			 * @method getInstanceID
			 * @param {String} resourceName
			 * @param {String} id
			 * @param {String} separator
			 * @returns {String}
			 */
			getInstanceID : function(resourceName, id, separator) {
				var result = [ this.app.name, 'instances', this.name,
						resourceName, id ];
				return result.join((separator) ? separator : '_');
			},
			/**
			 * @method getResource
			 * @param {String} resourceName
			 * @returns {String} ClassID
			 */
			getResource : function(resourceName) {
				if (this.resources[resourceName]) {
					return this.resources[resourceName];
				} else {
					this.resources[resourceName] = this.app.loadResource(this
							.getResourcePath(resourceName, true), this
							.getClassID(resourceName, '_'));
					return this.resources[resourceName];
				}
			},
			/**
			 * @method getInstance
			 * @param {String} resourceName
			 * @param {Object} params
			 * @returns {Component} Instance of resource
			 */
			getInstance : function(resourceName, params) {
				var classID = this.getResource(resourceName);
				// var response = new window[this._resources[resource]]();
				// var scriptElement = '<script id="'+id+'"
				// type="text/javascript">var
				// '+id+' = new (new
				// Class('+this._resources[resource]+'))();</script>';
				// document.write(scriptElement);
				var instanceID = this.getInstanceID(resourceName, String
						.uniqueID(), '_');
				if (true) {
					window[instanceID] = new window[classID]();
				} else {
					window[instanceID] = new Class(window[classID])();
				}

				window[instanceID].setContext({
					app : this.app,
					id : instanceID,
					folder : this.getResourcePath(resourceName, false),
					name : this.getResourceFilename(resourceName, true),
					params : params,
				});
				return window[instanceID];
			}
		});