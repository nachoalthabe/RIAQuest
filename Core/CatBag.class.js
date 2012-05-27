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
			 * @default undefined
			 */
			app: undefined,
			/**
			 * @protected
			 * @property resources
			 * @type [Component]*
			 * @default []
			 */
			resources: [],
			/**
			 * @protected
			 * @method init
			 * @param {Application} app
			 * @returns {CatBag}
			 */
			init : function(app) {
				this.app = app;
				this.folder = this.app.getCatBagFolderPath(this.name);
				var toLoad = this.app.getCatBagResources(this.name);
				while (toLoad.length > 0) {
					this.getResource(toLoad.pop());
				}
				return this;
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
					this.resources[resourceName] = this
							.loadResource(resourceName);
					return this.resources[resourceName];
				}
			},
			/**
			 * @protected
			 * @method loadResource
			 * @param {String} resourceName
			 * @returns {String} ClassID
			 */
			loadResource : function(resourceName) {

				var url = this.getResourcePath(resourceName, true);
				var req = new Request({
					url : url,
					async : false,
					evalResponse : false,
					onFailure : function() {
						throw ('Unable to load unexist resource ' + resource);
					}
				}).get();

				var content = req.response.text.toString();
				content = content.replace(/[\w\W]+?\n+?/, "");
				content = "{\n" + content;// Para que no se rompa todo...

				var classID = this.getClassID(resourceName, true);

				var annotation = "\n//@ sourceURL=/"
						+ this.getResourcePath(resourceName, true) + "\n\n";

				var script = 'new Class(' + content + ');' + annotation;

				try {
					window[classID] = eval(script);
				} catch (error) {
					throw ('Unable to eval resource ' + resourceName);
				}

				return classID;
			},
			/**
			 * @method get
			 * @param {String} resourceName
			 * @param {Object} params
			 * @returns {Component} Instance of resource
			 */
			get : function(resourceName, params) {
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