// Arquivo contendo as expressões regulares para a classificação dos lexemas

// Inteiro
const INT 		= /^([-+]?)(\d+)$/;

// Número real
const REAL 		= /^([-+]?)(\d+)\.(\d+)$/;

// Operador de soma
const OPSOMA 	= /^([+])$/;

// Operador de substração
const OPSUB 	= /^([-])$/;

// Operador de multiplicação
const OPMUL 	= /^([*])$/;

// Operador de divisão
const OPDIV 	= /^([\/])$/;

// Abre parenteses
const AP 		= /^([(])$/;

// Fecha parenteses
const FP 		= /^([)])$/;

// Espaço em branco
const ESP 		= /^([\n])$/;

//Fim de linha (ponto e vírgula)
const EL 		= /^;$/;

//Vírgula
const COMMA 	= /^,$/;

//Atribuição
const ATR 		= /^:=$/;


//=========== PALAVRAS DO PROGRAMA ===========

//Program
const PROGRAM 	= /^program$/;

//Begin
const BEGIN 	= /^begin$/;

//End
const END 		= /^end$/;

//Procedure
const PROCEDURE = /^procedure$/;

//If
const IF 		= /^if$/;

//Then
const THEN 		= /^then$/;

//Else
const ELSE 		= /^else$/;

//While
const WHILE 	= /^while$/;

//Do
const DO 		= /^do$/;

// Identificador
const ID 		= /^((\_?)([a-z]+)([A-Z]*)(([a-z]*)||(\d*))*)$/;

//Tipo inteiro
const TIPOINT 	= /^int$/;

//Tipo real
const TIPOREAL	= /^real$/;

//Tipo char
const TIPOCHAR 	= /^char$/;

//Tipo boolean
const TIPOBOOL 	= /^boolean$/;

//=========== EXPRESSÕES ===========

//Igual
const IGUAL			= /^(=)$/;

//Diferente
const DIF			= /^(<>)$/;

//Menor
const MENOR			= /^(<)$/;

//Maior
const MAIOR			= /^(>)$/;

//Menor Igual
const MENORIGUAL	= /^(<=)$/;

//Maior Igual
const MAIORIGUAL	= /^(>=)$/;

//Negação
const NOT 			= /^not$/;

//Ou
const OR 			= /^or$/;

//E
const AND 			= /^and$/;

//Verdadeiro
const TRUE 			= /^true$/;

//Falso
const FALSE 		= /^false$/;

//Div
const DIV 			= /^div$/;

//Var
const VAR 			= /^var$/;