/**
 * @class SingletonCatBag
 * @module CatBag
 * @extends CatBag
 */
var SingletonCatBag = new Class(
		{
			Extends : CatBag,
			/**
			 * @protected
			 * @property instances
			 * @type [Component]*
			 * @default []
			 */
			instances : {},
			/**
			 * @method getInstance
			 * @param {String} resourceName
			 * @returns {Component}
			 */
			getInstance : function(resourceName) {
				if (!this.instances[resourceName]) {
					var classID = this.getResource(resourceName);

					var instanceID = this.getInstanceID(resourceName,
							'singleton', '_');

					window[instanceID] = new window[classID]();
					window[instanceID].setContext({
						app : this.app,
						id : instanceID,
						folder : this.getResourcePath(resourceName, false),
						name : this.getResourceFilename(resourceName, true)
					});
					this.instances[resourceName] = instanceID;
				}
				return window[this.instances[resourceName]];
			}
		});