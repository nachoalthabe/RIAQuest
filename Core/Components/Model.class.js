/**
 * @class Model
 * @module Components
 * @extends Component
 */
var Model = new Class({
  Extends: Component,
  _ready: false,
  _loading: false,
  init: function(){
	  this.ready();
  },
  ready: function(){
	  this._ready = true;
	  this.fireEvent('ready',[this]);
  },
  loading: function(){
	  this._loading = true;
	  this.fireEvent('loading',[this]);
  },
  updated: function(){
	  this._loading = false;
	  this.fireEvent('updated',[this]);
  },
  isReady: function(){
  	return this._ready;
  },
  setData: function(data){
  	this.data = data;
  }
});