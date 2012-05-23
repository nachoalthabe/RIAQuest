var View = new Class({
  Extends: Component,
  _endExecution: function(){
    console.log('endExecution');
    delete this;
  },
  appendView: function(htmlOfView){
  	this.container = new Element('div',{
  		id: this.id,
  		html: htmlOfView
  	});
  	this.container.inject(document.body);
  	return this.container;
  },
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
  }
});