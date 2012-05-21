Algo = {//TODO: para que se puede usar??
  Extends: Controller,
  initialize: function(){
		alert('Initialize');
	},
  init: function(){
		alert('Init');
	},
	execute: function(params){
	  console.log('aca:',params);
	  this._app.getView('index','Parametros');
	  alert(error);
	}
}