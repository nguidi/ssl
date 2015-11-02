//	Funcion que permite cambiar el estado de los paneles
function cambiarEstadoDelPanel(paneles, nuevoEstado)
{
	for (var indice in paneles)	{
		paneles[indice].className = "panel " + nuevoEstado;
	}
}

//	Escucho que se haga click sobre el boton cuya id es analizar
document.querySelector('button#analizar')
	.addEventListener(
		'click'
	,	function()
		{
			//	Obtengo los paneles de salida
			var panelesDeSalida
			=	document.querySelectorAll('.output .panel');

			//	Cambio el estado de los paneles a procesando
			cambiarEstadoDelPanel(panelesDeSalida, 'panel-primary');

			//	Obtengo la cadena de entrada
			var	entrada
			=	document.querySelector('#entrada').value
			
			//	Obtengo los tokens
			var	arrayDeTokens
			=	lexer(entrada)

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

			//	Obtengo la cadena de entrada como un array
			var	cadenaDeEntrada
			=	arrayDeTokens.map(
					function(token)
					{
						var auxArray = token.split('');
						auxArray.shift();
						auxArray.pop();
						return	auxArray.join('');
					}
				)

			//	Cambio el estado de los paneles al estado correspondiendte
			cambiarEstadoDelPanel(panelesDeSalida, 'panel-' + (adsr(cadenaDeEntrada) ? 'success' : 'danger'));
		}
	) 