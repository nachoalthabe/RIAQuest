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
  appendView: function(htmlOfView){
  	this.container = new Element('div',{
  		id: this.id,
  		html: htmlOfView
  	});
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
			async : true,
			evalResponse: false,
			onSuccess : function(){
				this.render();
			}.bind(this),
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