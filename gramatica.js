// Definicion de la gramatica de mi ADSR
GRAMATICA
=	{
	/* -------------------- CONJUNTO DE NO TERMINALES DE LA GRAMATICA ---------------------------------------------- */
		NO_TERMINALES:			["P", "DV", "DF", "LP", "LPCont", "LC", "CAsignacion", "CPara", "CSiEntonces",
								 "CLLamadoFuncion", "LLPar", "LLParCont", "ExpEntera", "ExpEnteraSRI", "Termino",
								  "TerminoSRI", "Factor", "ExpLogica", "ExpLogicaSRI", "OperandoLogico",
								  "OperandoLogicoSRI", "FactorLogico", "Comparacion", "Operador"]
	
	/* -------------------- CONJUNTO DE TERMINALES DE LA GRAMATICA ------------------------------------------------- */
	,	TERMINALES:				["(", ")", "{", "}", "+", "*", "-", "O", "Y", "NO", "ConstanteEntera", "ConstanteLogica",
								 "NombreFuncion", "NombreVariable", "Para", "desde", "hasta", "Si", "entonces", "=", "==",
								 "<", ">", ">=", "<=", ";", ",", "return", "Tipo"]
	
	/* -------------------- SIMBOLO DISTINGUIDO DE LA GRAMATICA ---------------------------------------------------- */
	,	SIMBOLO_DISTINGUIDO:	"P"
	
	/* -------------------- CONJUNTO DE PRODUCCIONES DE LA GRAMATICA ----------------------------------------------- */
	,	PRODUCCIONES:
		{
			"P":					[
										["DV", "DF", "LC"]
									,	["DV", "DF"]
									,	["DV", "LC"]
									,	["DF", "LC"]
									,	["DV"]
									,	["DF"]
									,	["LC"]
									,	[""]
									]
		,	"DV":					[
										["Tipo", "NombreVariable", ";", "DV"]
									,	["Tipo", "NombreVariable", ";"]
									]
		,	"DF":					[
										["Tipo", "NombreFuncion", "LP", "{", "LC", ";", "return", "NombreVariable", ";", "}", "DF"]
									,	["Tipo", "NombreFuncion", "LP", "{", "LC", ";", "return", "NombreVariable", ";", "}"]
									]
		,	"LP":					[
										["(", "LPCont", ")"]
									,	["(", ")"]
									]
		,	"LPCont":				[
										["Tipo", "NombreVariable", ",", "LPCont"]
									,	["Tipo", "NombreVariable"]
									]
		,	"LC":					[
										["CAsignacion", "LC"]
									,	["CPara", "LC"]
									,	["CSiEntonces", "LC"]
									,	["CLLamadoFuncion", "LC"]
									,	["CAsignacion"]
									,	["CPara"]
									,	["CSiEntonces"]
									,	["CLLamadoFuncion"]
									]
		,	"CAsignacion":			[
										["NombreVariable", "=", "ExpEntera", ";"]
									]
		,	"CPara":				[
										["Para", "NombreVariable", "desde", "ExpEntera", "hasta", "ExpEntera", "{", "LC", "}"]
									,	["Para", "NombreVariable", "desde", "ExpEntera", "hasta", "ExpEntera", "{", "}"]
									]
		,	"CSiEntonces":			[
										["Si", "ExpLogica", "entonces", "{", "LC", "}"]
									,	["Si", "ExpLogica", "entonces", "{", "}"]
									]
		,	"CLLamadoFuncion":		[
										["NombreFuncion", "LLPar", ";"]
									]
		,	"LLPar":				[
										["(", "LLParCont", ")"]
									,	["(", ")"]
									]
		,	"LLParCont":			[
										["NombreVariable", ",", "LLParCont"]
									,	["NombreVariable"]
									]
		/*
		,	"ExpEntera":		[
									["ExpEntera", "+", "Termino"]
								,	["ExpEntera", "-", "Termino"]
								,	["Termino"]
								]
		*/
		,	"ExpEntera":			[
										["Termino", "ExpEnteraSRI"]
									,	["Termino"]
									]					
		,	"ExpEnteraSRI":			[
										["+", "Termino", "ExpEnteraSRI"]
									,	["-", "Termino", "ExpEnteraSRI"]
									,	["+", "Termino"]
									,	["-", "Termino"]
									]
		/*
		,	"Termino":				[
										["Termino", "*", "Factor"]
									,	["Factor"]
									]
		*/
		,	"Termino":				[
										["Factor",	"TerminoSRI"]
									,	["Factor"]
									]	
		,	"TerminoSRI":			[
										["*", "Factor", "TerminoSRI"]
									,	["*", "Factor"]
									]
		,	"Factor":				[
										["(", "ExpEntera", ")"]
									,	["ConstanteEntera"]
									,	["NombreVariable"]
									]
		/*
		,	"ExpLogica":		[
									["ExpLogica", "O", "OperandoLogico"]
								,	["OperandoLogico"]
								]
		*/
		,	"ExpLogica":			[
										["OperandoLogico", "ExpLogicaSRI"]
									,	["OperandoLogico"]
									]
		,	"ExpLogicaSRI":			[
										["O", "OperandoLogico", "ExpLogicaSRI"],
										["O", "OperandoLogico"]
									]
		/*
		,	"OperandoLogico":	[
									["OperandoLogico", "Y", "FactorLogico"]
								,	["FactorLogico"]
								,	["NO"]
								] 
		*/
		,	"OperandoLogico":		[	
										["FactorLogico", "OperandoLogicoSRI"]
									,	["FactorLogico"]
									,	["No", "FactorLogico", "OperandoLogicoSRI"]
									,	["NO", "FactorLogico"]
									]
		,	"OperandoLogicoSRI":	[
										["Y", "FactorLogico", "OperandoLogicoSRI"]
									,	["Y", "FactorLogico"]
									]
		,	"FactorLogico":			[
										["(", "ExpLogica", ")"]
									,	["ConstanteLogica"]
									,	["Comparacion"]
									]
		,	"Comparacion":			[
										["ExpEntera", "Operador", "ExpEntera"]
									]
		,	"Operador":				[
										["=="]
									,	[">"]
									,	["<"]
									,	[">="]
									,	["<="]
									]
		}
	};