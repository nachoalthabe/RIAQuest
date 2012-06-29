/**
 * @class Operation
 * @module Components
 * @extends Component
 */
var Operation = new Class({
  Extends: Component,
  /**
   * @property id
   * @type String
   * @default ''
   */
  id: '',
  /**
   * @property ready
   * @type [Boolean]*
   * @default []
   */
  ready: [],
  /**
   * @property components
   * @type [Components]*
   * @default []
   */
  components: [],
  /**
   * @method onSuccess
   * @param {Object} response
   * @returns {Object}
   */
  onSuccess: function(response){//TODO Implementar
	  return false;
  },
  /**
   * @method onProgress
   * @param {Object} response
   * @returns {Object}
   */
  onProgress: function(response){//TODO Implementar
	  return false;
  },
  /**
   * @method onFailure
   * @param {Object} response
   * @returns {Object}
   */
  onFailure: function(responde){//TODO Implementar
	  return false;
  }
});