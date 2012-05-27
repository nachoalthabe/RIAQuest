/**
 * @class OperationsCatBag
 * @module CatBag
 * @extends CatBag
 */
OperationsCatBag = new Class({
	Extends : CatBag,
	/**
	 * @property name 
	 * @type String
	 * @default 'operations'
	 */
	name : 'operations',
	/**
	 * @protected
	 * @method init
	 * @param {Application} app
	 * @returns {OperationsCatBag}
	 */
	init : function(app) {
		this.app = app;
	},
	get: function(components){
		
	}
});