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