/**
 * @class ViewsCatBag
 * @module CatBag
 * @extends CatBag
 */
ViewsCatBag = new Class({
	Extends : CatBag,
	/**
	 * @property name 
	 * @type String
	 * @default 'views'
	 */
	name : 'views',
	/**
	 * @method getResourcePath
	 * @param {String} resourceName
	 * @param {Boolean} withExtension
	 * @returns {String}
	 */
	getResourcePath : function(resourceName, withExtension) {
		var response = this.folder + resourceName + '/';
		if (withExtension) {
			response += this.getResourceFilename(resourceName,true);
		}
		return response;
	}
});