//	Palabras reservadas
var palabrasReservadas
=	new RegExp('(\\W|^)(Para|desde|hasta|Si|entonces|return|NO|Y|O|)(\\W|$)')
//	Tipo de Datos
,	tipoDeDato
=	new RegExp('(\\W|^)(entero|real|logica)(\\W|$)')
//	Constantes Enteras
,	constanteEntera
=	new RegExp('(\\W|^)([1-9][0-9]*|0)(\\W|$)')
//	Constantes Logicas
,	constanteLogica
=	new RegExp('(\\W|^)("VERDADERO"|"FALSO")(\\W|$)')
//	Identificador de Variables
,	identificadorVariable
=	new RegExp('(\\W|^)([a-z]+)(\\W|$)')
//	Identificador de Funciones
,	identificadorFuncion
=	new RegExp('(\\W|^)([A-Z][a-z]*)(\\W|$)')
//	Operadores
,	operadores
=	new RegExp('(\\W|^)("=="|">="|"<="|">"|"<")(\\W|$)')

document.querySelector('#analizar')
	.addEventListener(
		'click'
	,	function()
		{
			var	entrada
			=	document.querySelector('#entrada').value
			,	salida
			=	[]

			var tokensSinParsear
			=	entrada.split(/[\s;]+/)

			tokensSinParsear
				.forEach(
					function(preToken,indice)
					{
						if	(palabrasReservadas.test(preToken))
							salida.push('<'+preToken+'>')
						else
						if	(tipoDeDato.test(preToken))
							salida.push('<Tipo>')
						else
						if	(constanteEntera.test(preToken))
							salida.push('<ConstEntera>')
						else
						if	(constanteLogica.test(preToken))
							salida.push('<ConstLogica>')
						else
						if	(identificadorVariable.test(preToken))
							salida.push('<NombreVariable>')
						else
						if	(identificadorFuncion.test(preToken))
							salida.push('<NombreFuncion>')
						else
						if	(operadores.test(preToken))
							salida.push('<Operador>')
					}
				)

			document.querySelector('#salida').innerHTML = salida.join('')
		}
	) 