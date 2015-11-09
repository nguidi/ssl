//	Apartir del resultado del lexer, analiza de forma descendente la cadena.
//	Definiciones globales para el analizador (al estilo C/C++)
var	TERMINAL		=	0;
var	NO_TERMINAL 	=	1;
var	ERROR			=	false;
var	FIN_DE_CADENA	=	'#';

//	Devuelve las producciones de un terminal dado
function obtenerProducciones(noTerminal) {

	return	GRAMATICA.PRODUCCIONES[noTerminal];

}

//	Devuelve el tipo de simbolo en funcion del caracter, es decir, si es Terminal o No Terminal.
function tipoDeCaracter(caracter) {

	return	(GRAMATICA.NO_TERMINALES.indexOf(caracter) != -1 ) ?	NO_TERMINAL :	TERMINAL;

}

//	Funcion procedimiento del algoritmo ADSR
function procedimiento(noTerminal, cadena) {

	//	Producciones del no terminal pasado como argumento (solo parte derecha)
	var producciones = obtenerProducciones(noTerminal);

	var i = 0;

	do {
		
		ERROR = false;
		procesar(producciones[i], cadena);
		i++;
		
	} while (ERROR && (i < producciones.length));
	
}

//	Funcion procesar del algoritmo ADSR
function procesar(produccion, cadena) {

	var punteroRetroceso = PUNTERO;

	for	(var i = 0; (i < produccion.length) && !ERROR; i++) {
		switch(tipoDeCaracter(produccion[i])) {

			case TERMINAL:
				if	(cadena[PUNTERO] == produccion[i])
					PUNTERO++;
				else
					ERROR = true;
				break;
			case NO_TERMINAL:
				procedimiento(produccion[i], cadena);
				break;
		}

	}

	if	(ERROR)
		PUNTERO = punteroRetroceso;
}

//	Funcion main del algoritmo ADSR
function adsr(cadena){

	//	Inicializacion
	ERROR	=	false;
	PUNTERO	=	0;
	cadena.push(FIN_DE_CADENA);

	//	Corro la funcion procedimiento para el simbolo distinguido
	procedimiento(GRAMATICA.SIMBOLO_DISTINGUIDO,cadena);

	//	Devuelvo si la cadena pertenece o no al lenguaje
	return (!ERROR && cadena[PUNTERO] == FIN_DE_CADENA);

}