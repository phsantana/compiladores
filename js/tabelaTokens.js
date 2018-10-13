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

const EL 		= /^;$/




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

// Identificador (variável)
const ID 		= /^((\_?)([a-z]+)([A-Z]*)(([a-z]*)||(\d*))*)$/;

//Tipo inteiro
const TIPOINT 	= /^int$/;

//Tipo real
const TIPOREAL	= /^real$/;

//Tipo char
const TIPOCHAR 	= /^char$/;

//Tipo boolean
const TIPOBOOL 	= /^boolean$/;