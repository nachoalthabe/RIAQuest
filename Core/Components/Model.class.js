/**
 * @class Model
 * @module Components
 * @extends Component
 */
var Model = new Class({
  Extends: Component,
  _ready: false,
  init: function(){
	  this.ready();
  },
  ready: function(){
	  this._ready = true;
	  this.fireEvent('ready',[this]);
  }
});