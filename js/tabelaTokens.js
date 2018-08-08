// Arquivo contendo as expressões regulares para a classificação dos lexemas

// Inteiro
const INT = /^([-+]?)(\d+)$/;

// Número real
const REAL = /^([-+]?)(\d+)\.(\d+)$/;

// Operador de soma
const OPSOMA = /^([+])$/;

// Operador de substração
const OPSUB = /^([-])$/;

// Operador de multiplicação
const OPMUL = /^([*])$/;

// Operador de divisão
const OPDIV = /^([\/])$/;

// Abre parenteses
const AP = /^([(])$/;

// Fecha parenteses
const FP = /^([)])$/;