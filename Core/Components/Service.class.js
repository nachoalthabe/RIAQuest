/**
 * @class Service
 * @module Components
 * @extends Component
 */
var Service = new Class({
  Extends: Component,
  /**
   * @propertie url
   * @type String
   * @default ''
   */
  url: '',
  /**
   * @propertie method
   * @type String
   * @default 'POST'
   */
  method: 'POST',
  /**
   * @method hidrateModel
   * @param {Model} model
   * @param {Object} response
   * @returns {Model}
   */
  hidrateModel: function(model,response){
    var model = this._app.getModel(model,response);
    return model;
  },
  /**
   * @private
   * @mrthod call
   * @param {String} operationID
   * @param {Object} params
   */
  call: function(operationID,params){
	  
  }
});