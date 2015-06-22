//	Obtiene los tokens a partir de una cadena de entrada
function obtenerTokens(cadenaDeEntrada)
{
	//	Expresion regular para la deteccion de palabras reservadas
	var	palabraReservada
	=	new RegExp(/\b(Para|desde|hasta|Si|entonces|return|NO|Y|O)\b/)
	//	Expresion regular para la detecion de tipo de datos
	,	tipoDeDato
	=	new RegExp(/\b(entero|logica)\b/)
	//	Expresion regular para las constantes enteras
	,	constanteEntera
	=	new RegExp(/\d+/g)
	//	Expresion regular para las constantes logicas
	,	constanteLogica
	=	new RegExp(/\b(VERDADERO|FALSO)\b/)
	//	Expresion regular para los nombres de las variables
	,	nombreVariable
	=	new RegExp(/\b([a-z]+)\b/)
	//	Expresion regular para los nombres de las funciones
	,	nombreFuncion
	=	new RegExp(/\b([A-Z][a-z]*)\b/)
	//	Expresion regular para los operadores logicos
	,	operadorLogico
	=	new RegExp(/\b(==|>=|<=|>|<)\b/)
	//	Expresion regular para los operadores aritmeticos
	,	operadorAritmetico
	=	new RegExp(/(\+|\-|\*|\/)/)
	//	Simbolos terminales que no se clasifican en ninguna expresion regular anterior
	,	simbolosTerminales
	=	new RegExp(/(;|,|\(|\)|\{|\}|=)/)

	//	La variable salida contendra los tokens generados. La inicializo vacia.
	var	salida
	=	''

	//	Remuevo los saltos de linea de la cadena de entrada
	var	sinSaltosDeLinea
	=	cadenaDeEntrada.replace(/\n/g,'')

	//	Convierto la cadena de entrada en un array separando segun caracteres especiales
	var	sepearadoPorCaracterEspecial
	=	sinSaltosDeLinea.match(/[^;,\(\)\{\}\s\+\-\*\/]+|[;,=\(\)\{\}\S\+\-\*\/]/g)

	//	Mapeo el array trimeando (Remuevo espacios al principio y fin de las cadenas) las cadenas y removiendo las vacias. 
	var	separadoYTrimeado
	=	sepearadoPorCaracterEspecial.map(
			function(cadena)
			{
				return	cadena.trim()
			}
			).filter(
			function(cadena)
			{
				return	cadena.length > 0
			}
		)

	//	Tokenizo el array haciendo uso de las expresiones regulares
	var	arrayDeTokens
	=	separadoYTrimeado.map(
			function(preToken)
			{
				return	(palabraReservada.test(preToken) || simbolosTerminales.test(preToken))
					?	'<'+preToken+'>'
					:	tipoDeDato.test(preToken)
					?	'<Tipo>'
					:	constanteEntera.test(preToken)
					?	'<ConstanteEntera>'
					:	constanteLogica.test(preToken)
					?	'<ConstanteLogica>'
					:	nombreFuncion.test(preToken)
					?	'<NombreFuncion>'
					:	nombreVariable.test(preToken)
					?	'<NombreVariable>'
					:	operadorLogico.test(preToken)
					?	'<OperadorLogico>'
					:	operadorAritmetico.test(preToken)
					?	'<OperadorAritmetico>'
					:	'<error>'
			}
		)

	//	Devuelvo el array de tokens
	return	arrayDeTokens
}	

//	Escucho que se haga click sobre el boton cuya id es analizar
document.querySelector('button#analizar')
	.addEventListener(
		'click'
	,	function()
		{
			//	Obtengo la cadena de entrada
			var	entrada
			=	document.querySelector('#entrada').value
			
			//	Obtengo los tokens
			var	arrayDeTokens
			=	obtenerTokens(entrada)

			//	Realizo la union entre los elementos del array generando una cadena
			var	cadenaDeTokens
			=	arrayDeTokens.join('')
			//	Inserto la cadena
			document.querySelector('#salidaSinFormato').innerHTML = cadenaDeTokens

			var	arrayConFormato
			=	arrayDeTokens.map(
					function(token)
					{
						var	span
						=	document.createElement("SPAN")

						span.appendChild(document.createTextNode(token))

						span
							.setAttribute(
								'class'
							,		(/Tipo/g.test(token))
								?	'cp'
								:	(/(ConstanteEntera|ConstanteLogica)/g.test(token))
								?	'nt'
								:	(/(NombreFuncion|NombreVariable)/g.test(token))
								?	'na'
								:	(/(OperadorLogico|OperadorAritmetico)/g.test(token))
								?	'c'
								:	's'
							)	

						if	(/(;|\{|\})/g.test(token))
							span.appendChild(document.createElement("BR"))

						return	span.outerHTML
					}
				)

			//	Inserto la cadena
			document.querySelector('#salidaConFormato').innerHTML = arrayConFormato.join('')
		}
	) 