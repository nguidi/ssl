var	palabraReservada
=	new RegExp(/\b(Para|desde|hasta|Si|entonces|return|NO|Y|O)\b/g)
,	tipoDeDato
=	new RegExp(/\b(entero|logica)\b/g)
,	constanteEntera
=	new RegExp(/\d+/g)
,	constanteLogica
=	new RegExp(/\b(VERDADERO|FALSO)\b/g)
,	identificadorVariable
=	new RegExp(/([a-z]+)/g)
,	identificadorFuncion
=	new RegExp(/([A-Z][a-z]*)/g)
,	operadorLogico
=	new RegExp(/\b(==|>=|<=|>|<)\b/g)
,	operadorAritmetico
=	new RegExp(/\+\-\*\//g)



document.querySelector('#analizar')
	.addEventListener(
		'click'
	,	function()
		{
			var	entrada
			=	document.querySelector('#entrada').value
			,	salida
			=	''
			
			//	Remuevo los saltos de linea
			var sinSaltosDeLinea
			=	entrada.replace(/\n/g,'')

			//	Separo segun caracteres especiales (en Array)
			var	sepearadoPorCaracterEspecial
			=	sinSaltosDeLinea.match(/[^;,\(\)\{\}\s\+\-\*\/]+|[;,=\(\)\{\}\S\+\-\*\/]/g)

			//	Mapeo el array trimeando las cadenas y removiendo las vacias (Remuevo espacios al principio y fin de las cadenas)
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
						return	palabraReservada.test(preToken)
							?	'<'+preToken+'>'
							:	tipoDeDato.test(preToken)
							?	'<Tipo>'
							:	constanteEntera.test(preToken)
							?	'<ConstanteEntera>'
							:	constanteLogica.test(preToken)
							?	'<ConstanteLogica>'
							:	identificadorFuncion.test(preToken)
							?	'<NombreFuncion>'
							:	identificadorVariable.test(preToken)
							?	'<NombreVariable>'
							:	operadorLogico.test(preToken)
							?	'<OperadorLogico>'
							:	operadorAritmetico.test(preToken)
							?	'<OperadorAritmetico>'
							:	'<'+preToken+'>'
					}
				)

			console.log(arrayDeTokens)

			document.querySelector('#salidaSinFormato').innerHTML = arrayDeTokens.join('')
		}
	) 