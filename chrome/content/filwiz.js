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


	/** Genera un nombre aleatorio */
	generarNombre: function() {

		var nombres = ["Adrián","Agustina","Agustín","Aimar","Aitor","Alba","Alejandro","Alex","Alicia","Álvaro","Ana","Andrés","Ane","Antonio","Beatriz","Benjamín","Carla","Carlos","Carlota","Carolina","Cecilia","Daniel","Daniela","David","Diego","Domingo","Eduardo","Elisa","Federico","Felix","Francisco","Gabriel","Gloria","Guillermo","Gustavo","Hugo","Iker","Isabel","Javier","Joaquín","Jose Luis","Jose","Juana","Judith","Julián","Júlia","Laura","Lucas","Luciana","Lucrecia","Lucía","Luis","Manuél","Marcelo","Mariana","Mario","Martina","María","Matías","Nicolás","Nieves","Nora","Pablo","Patricia","Pau","Paula","Priscila","Rocío","Samuel","Santiago","Sara","Sebastián","Sergio","Silvia","Sofía","Tania","Tomás","Unai","Victoria","Yasmina"];
		var apellidos = ["Acosta","Aguirre","Alonso","Alvarado","Arias","Blanco","Campos","Castillo","Castro","Cubas","Delgado","Domínguez","Dorta","Díaz","Fajardo","Falcón","Fernández","Flores","García","Gil","Giménez","González","Gutiérrez","Gómez","Hernansanz","Hernández","Herrera","Iglesias","Jiménez","Juárez","Ledesma","Lemes","Lorenzo","López","Martín","Martínez","Marín","Medina","Molina","Montenegro","Morales","Moreno","Moyano","Muñoz","Navarro","Núñez","Ojeda","Ortega","Ortiz","Pérez","Ramos","Ramírez","Rodríguez","Rojas","Romero","Rubio","Ruiz","Ríos","Santana","Sanz","Serrano","Sosa","Soto","Suárez","Sánchez","Torres","Vilela","Villalba","Vázquez","Álvarez"];

		var nombre = nombres[this.aleatorio(0, nombres.length - 1)];
		var apellido = apellidos[this.aleatorio(0, apellidos.length - 1)] + " " + apellidos[this.aleatorio(0, apellidos.length - 1)];

		this.setValue(nombre + " " + apellido);
	},


	/** Genera una palabra con un número de letras comprendido entre el mínimo y máximo indicado */
	generarPalabra: function(min, max) {

		var vocales = ['a', 'e', 'i', 'o', 'u'];
		var consonantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'z'];
		var cantidad = this.aleatorio(min, max);
		var insertarVocal = this.aleatorio(0, 1) === 0;
		var nombre = "";

		for (var i=0; i<cantidad; i++) {

			if (insertarVocal) {
				nombre += vocales[this.aleatorio(0, vocales.length - 1)];
				insertarVocal = false;
			} else {
				nombre += consonantes[this.aleatorio(0, consonantes.length - 1)];
				insertarVocal = true;
			}
		}

		this.setValue(nombre.charAt(0).toUpperCase() + nombre.slice(1));
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
