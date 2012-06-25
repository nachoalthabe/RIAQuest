/**
 * @class View
 * @module Components
 * @extends Component
 */
var View = new Class({
	Extends : Component,
	isReady: false,
	_modelReady : true,
	model : null,
	_themeReady : true,
	theme : null,
	init : function() {
		this.render();
	},
	/**
	 * @private
	 * @method appendView
	 * @param {Element} htmlOfView
	 * @returns {Element}
	 */
	appendView : function(params) {
		var defaultParams = {
			id : this.id,
			html : this.theme
		};
		var params = Object.merge(defaultParams, params);
		var container = new Element('div', params);
		container.inject(document.body);
		return container;
	},
	/**
	 * @method setModel
	 * @param {Model} model
	 */
	setModel : function(model) {
		this.model = model;
		if (this.model.ready == true) {
			this._render();
		} else {
			this._modelReady = false;
			model.addEvent('ready', function() {
				this._modelReady = true;
				this._render();
			}.bind(this));
		}
	},
	/**
	 * @private
	 * @method getTheme
	 * @param {String} htmlOfView
	 * @returns {Element}
	 */
	getTheme : function(themeName) {
		this._themeReady = false;
		var req = new Request({
			url : this.sourceFolder + 'themes/' + themeName + '.html',
			async : true,
			evalResponse : false,
			onFailure : function() {
				throw ('Unable to load resource ' + resource);
			}.bind(this),
			onSuccess : function(theme) {
				this.theme = theme;
				this._themeReady = true;
				this._render();
			}.bind(this)
		});
		req.get();
	},
	/**
	 * @method _render
	 * @private
	 */
	_render : function() {//TODO Implementar
		if (this._modelReady && this._themeReady) {
			this.render();
		}
	},
	render : function() {
		this.ready();
	},
	ready : function() {
		this.isReady = true;
		this.fireEvent('ready', [ this ]);
	}
});