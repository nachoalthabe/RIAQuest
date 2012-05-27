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
		var response = this.folder + resourceName + '/' + resourceName + '_' + this.name.slice(0,this.name.length-1);
		if (withExtension) {
			response += '.jsclass';
		}
		return response;
	}
});