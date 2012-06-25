/**
 * @class Controller
 * @module Components
 * @extends Component
 */
var Controller = new Class({
	Extends : Component,
	options : {
		spinner : {
			style : {
				'background-color' : 'rgba(0,0,0,0.3)'
			},
			message : 'Cargando...',
			img : {
				html : '<center><img src="images/spinner.gif"></center>'
			}
		}
	},
	startSpinner : function(where, text) {
		this.options.spinner.message = text;
		this._spinner = new Spinner(where, this.options.spinner);
		this._spinner.show();
	},
	stopSpinner : function() {
		this._spinner.hide();
	}
});