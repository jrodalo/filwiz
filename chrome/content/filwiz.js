/**
* FilWiz - Genera valores útiles para el desarrollo de aplicaciones.
*
* @author Jose Luis Rodriguez Alonso <jrodalo@gmail.com> || @jrodalo
*/
var filwiz = {

	/** Se ejecuta al inicio para añadir un evento en el popup */
	init: function () {
		document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", filwiz.onPopupShowing, false);
	},


	/** Muestra el menu solo cuando se pulsa sobre un campo de texto */
	onPopupShowing: function() {
		document.getElementById("filwiz_menu").hidden = ! gContextMenu.onTextInput;
	},


	/** Genera un NIF aleatorio y lo introduce en el campo seleccionado */
	generarNif: function() {

		var numero = this.generarNumeros(8);
		var posicionLetra = numero % 23;
		var letra = this.obtenerLetraNif(posicionLetra);

		this.setValue(numero + letra);
	},


	/** Genera un CIF aleatorio y lo introduce en el campo seleccionado */
	generarCif: function() {

		var numero = this.generarNumeros(7);
		var pares = 0;
		var impares = 0;
		var temp;

		for (var i=1; i<7; i=i+2) {
			pares += parseInt(numero.substr(i, 1), 10);
		}

		for (var j=0; j<7; j=j+2) {
			temp = (2 * parseInt(numero.substr(j, 1), 10)).toString() + "0";
			impares += parseInt(temp.substr(0,1), 10) + parseInt(temp.substr(1,1), 10);
		}

		var suma = (pares + impares).toString();
		var unumero = 10 - parseInt(suma.substr(suma.length - 1, 1), 10);

		if(unumero == 10) unumero = "0";

		this.setValue("B" + numero + unumero);
	},


	/** Genera un NIE aleatorio y lo introduce en el campo seleccionado */
	generarNie: function() {
		var numero = this.generarNumeros(7);
		var posicionLetra = numero % 23;
		var letra = this.obtenerLetraNif(posicionLetra);

		this.setValue("X" + numero + letra);
	},


	/** Formatea la fecha actual y la introduce en el campo seleccionado */
	generarFecha: function() {
		this.setValue(new Date().toLocaleFormat("%d/%m/%Y"));
	},


	/** Genera un número de tarjeta VISA válido */
	generarVisa: function() {
		this.setValue("4111111111111111");
	},


	/** Genera un número de tarjeta MasterCard válido */
	generarMastercard: function() {
		this.setValue("5555555555554444");
	},


	/** Genera un numero con la longitud indicada */
	generarNumeros: function(cantidad) {
		var digitos = [];

		for (var i=0; i<cantidad; i++) {
			digitos[i] = this.aleatorio(0, 9);
		}

		return digitos.join("");
	},


	/** Genera un número aleatorio entre el mínimo y el máximo indicados */
	aleatorio: function(min, max) {
		return parseInt(Math.random() * (max - min + 1), 10) + min;
	},



	/** Retorna la letra asociada a la posición indicada */
	obtenerLetraNif: function(posicion) {
		var letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
		return letras.substring(posicion, posicion + 1);
	},


	/** Introduce el valor indicado en el campo seleccionado */
	setValue: function(valor) {
		if (gContextMenu.onTextInput && gContextMenu.target) {
			gContextMenu.target.value = valor;
		}
	}
};

window.addEventListener("load", filwiz.init, false);
