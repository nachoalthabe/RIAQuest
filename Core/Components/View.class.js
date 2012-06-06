/**
 * @class View
 * @module Components
 * @extends Component
 */
var View = new Class({
  Extends: Component,
  /**
   * @private
   * @method appendView
   * @param {Element} htmlOfView
   * @returns {Element}
   */
  appendView: function(htmlOfView,params){
  	this.container = new Element('div',Object.merge((!params)?{}:params,{
  		id: this.id,
  		html: htmlOfView
  	}));
  	this.container.inject(document.body);
  	return this.container;
  },
  /**
   * @private
   * @method getTheme
   * @param {String} htmlOfView
   * @returns {Element}
   */
  getTheme: function(themeName){
  	var req = new Request({
			url : this.sourceFolder+'themes/'+themeName+'.html',
			async : false,
			evalResponse: false,
			onFailure : function() {
				throw ('Unable to load resource ' + resource);
			}
		}).get();
  	return req.response.text;
  },
  /**
   * @method render
   * @param {Model} model
   * @returns {Boolean}
   */
  render: function(model){//TODO Implementar
	  return false
  }
});