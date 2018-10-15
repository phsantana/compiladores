var analisadorLexico = function() {

	var rules;
	var tokens = new Array();

	this.analisarLexico = analisarLexico;
	this.getTokens = getTokens;

	// function preProcessadorEntrada(entrada){
	// 	var aux = entrada;
	// 	var lexemaAux;

	// 	//Utiliza símbolos auxiliares "#" para dividir a entrada
	// 	entrada = entrada.replace(/[0-9]+/g, "#");
	// 	entrada = entrada.replace(/[\.]/g, "#");

	// 	//Divide o array por tudo que não é número
	// 	var numeros = aux.split(/[^0-9\.]+/);

	// 	var operadores = entrada.split("#").filter(function(n){
	// 		return n;
	// 	});

	// 	var lexemas = [];

	// 	for (var cont = 0; cont < operadores.length; cont++) {
	// 		//Tratando espaços vazios entre operadores
	// 		if(operadores[cont].length > 1){
	// 			lexemaAux = operadores[cont];
	// 			lexemaAux = lexemaAux.split("").reverse().join();
	// 			lexemaAux = lexemaAux.split(",");

	// 			operadores.splice(cont, 1, lexemaAux[0]);

	// 			for (var j = 1; j < lexemaAux.length; j++) {
	// 				operadores.splice(i + j, 0, lexemaAux[j]);
	// 			}
	// 		}
	// 	}


	// 	for(var i = 0; i < numeros.length; i++){
	// 		if(numeros[i] != "" && numeros[i] != " "){
	// 			lexemas.push(numeros[i]);
	// 		}
	// 	}

	// 	for(var i = 0; i < operadores.length; i++){
	// 		if(operadores[i] != "" && operadores[i] != " "){
	// 			lexemas.push(operadores[i]);
	// 		}
	// 	}

	// 	return lexemas;
	// }

	function preProcessadorEntrada(entrada){
		var noSpace = entrada.split(/\s/);

		for(let i = 0; i < noSpace.length; i++){
			while(noSpace[i] == "")
				noSpace.splice(i,1);

			if(noSpace[i] != undefined && noSpace[i].match(/(\+|-|\*|\/)/)){
				var pieceSignal = noSpace[i].split(/(\+|-|\*|\/)/);
				var tam = pieceSignal.length;
				var cont = 0;

				if(pieceSignal[tam-1] != ""){
					noSpace.splice(i,1);
					while(pieceSignal.length){
						noSpace.splice(i+cont,0,pieceSignal[0]);
						pieceSignal.splice(0,1);
						++cont;
					}

					i += cont - 1;
				}
			}

			if(noSpace[i] != undefined && noSpace[i].match(/,/)){
				var pieceComma = noSpace[i].split(/(,)/);
				var tam = pieceComma.length;
				var cont = 0;

				if(pieceComma[tam-1] != ""){
					noSpace.splice(i,1);
					while(pieceComma.length){
						noSpace.splice(i+cont,0,pieceComma[0]);
						pieceComma.splice(0,1);
						++cont;
					}

					i += cont - 1;
				}
			}

			if(noSpace[i] != undefined && noSpace[i].match(/:=/)){
				var pieceAtr = noSpace[i].split(/(:=)/);
				var tam = pieceAtr.length;
				var cont = 0;

				if(pieceAtr[tam-1] != ""){
					noSpace.splice(i,1);
					while(pieceAtr.length){
						noSpace.splice(i+cont,0,pieceAtr[0]);
						pieceAtr.splice(0,1);
						++cont;
					}

					i += cont - 1;
				}
			}

			if(noSpace[i] != undefined && noSpace[i].match(/(=|<>|<|<=|>=|>)/)){
				var pieceRel = noSpace[i].split(/(=|<>|<|<=|>=|>)/);
				var tam = pieceRel.length;
				var cont = 0;

				if(pieceRel[tam-1] != ""){
					noSpace.splice(i,1);
					while(pieceRel.length){
						noSpace.splice(i+cont,0,pieceRel[0]);
						pieceRel.splice(0,1);
						++cont;
					}

					i += cont - 1;
				}
			}

			if(noSpace[i] != undefined && noSpace[i].match(/;/)){
				var pieceSC = noSpace[i].split(/;/);

				if(pieceSC[pieceSC.length-1] != ""){
					noSpace.splice(i,1);
					noSpace.splice(i,0,pieceSC[0],";",pieceSC[pieceSC.length-1]);
					i += 2;
				}
				else{	
					noSpace.splice(i,1);
					noSpace.splice(i,0,pieceSC[0],";");
					i += 1;
				}
			}

			if(noSpace[i] != undefined && noSpace[i].match(/(\(|\))/)){
				var piecesAp = noSpace[i].split(/(\(|\))/);
				var tam = piecesAp.length;
				var cont = 0;

				if(piecesAp[tam-1] != ""){
					noSpace.splice(i,1);
					while(piecesAp.length){
						noSpace.splice(i+cont,0,piecesAp[0]);
						piecesAp.splice(0,1);
						++cont;
					}

					i += cont - 1;
				}
			}
		}

		return noSpace;
	}

	function analisarLexico(lexemas){
		lexemas = preProcessadorEntrada(lexemas);

		var classificacao;

		for(var i = 0, tam = lexemas.length; i < tam; i++){
			if(isFloat(lexemas[i])){
				classificacao = "REAL";
			}
			else if(isInteger(lexemas[i])){
				classificacao = "INT";
			}
			else if(isSoma(lexemas[i])){
				classificacao = "OPSOMA";
			}
			else if(isSub(lexemas[i])){
				classificacao = "OPSUB";
			}
			else if(isMult(lexemas[i])){
				classificacao = "OPMUL";
			}
			else if(isDiv(lexemas[i])){
				classificacao = "OPDIV";
			}
			else if(isAP(lexemas[i])){
				classificacao = "AP";
			}
			else if(isFP(lexemas[i])){
				classificacao = "FP";
			}
			else if(isProgram(lexemas[i])){
				classificacao = "PROGRAM";
			}
			else if(isBegin(lexemas[i])){
				classificacao = "BEGIN";
			}
			else if(isEnd(lexemas[i])){
				classificacao = "END";
			}
			else if(isTipoInt(lexemas[i])){
				classificacao = "TIPOINT";
			}
			else if(isTipoReal(lexemas[i])){
				classificacao = "TIPOREAL";
			}
			else if(isTipoChar(lexemas[i])){
				classificacao = "TIPOCHAR";
			}
			else if(isTipoBoolean(lexemas[i])){
				classificacao = "TIPOBOOL";
			}
			else if(isIf(lexemas[i])){
				classificacao = "IF";
			}
			else if(isThen(lexemas[i])){
				classificacao = "THEN";
			}
			else if(isElse(lexemas[i])){
				classificacao = "ELSE";
			}
			else if(isWhile(lexemas[i])){
				classificacao = "WHILE";
			}
			else if(isDo(lexemas[i])){
				classificacao = "DO";
			}
			else if(isComma(lexemas[i])){
				classificacao = "COMMA";
			}
			else if(isAtr(lexemas[i])){
				classificacao = "ATR";
			}
			else if(isEl(lexemas[i])){
				classificacao = "END LINE";
			}
			else if(isProcedure(lexemas[i])){
				classificacao = "PROCEDURE";
			}
			else if(isIgual(lexemas[i])){
				classificacao = "IGUAL";
			}
			else if(isDif(lexemas[i])){
				classificacao = "DIF";
			}
			else if(isMenor(lexemas[i])){
				classificacao = "MENOR";
			}
			else if(isMaior(lexemas[i])){
				classificacao = "MAIOR";
			}
			else if(isMenorIgual(lexemas[i])){
				classificacao = "MENORIGUAL";
			}
			else if(isMaiorIgual(lexemas[i])){
				classificacao = "MAIORIGUAL";
			}
			else if(isNot(lexemas[i])){
				classificacao = "NOT";
			}
			else if(isOr(lexemas[i])){
				classificacao = "OR";
			}
			else if(isAnd(lexemas[i])){
				classificacao = "AND";
			}
			else if(isTrue(lexemas[i])){
				classificacao = "TRUE";
			}
			else if(isFalse(lexemas[i])){
				classificacao = "FALSE";
			}
			else if(isDiv(lexemas[i])){
				classificacao = "DIV";
			}
			else if(isVar(lexemas[i])){
				classificacao = "VAR";
			}
			else if(isId(lexemas[i])){
				classificacao = "ID";
			}
			else{
				classificacao = "ERRO";
			}
			addToken({simbolo:lexemas[i], tipo:classificacao});
		}
		// console.log(tokens);
	}

	function addToken(token){
		tokens.push(token);
	}

	function getTokens(){
		return tokens;
	}

	function isInteger(lexema) {
		rules = new RegExp(INT);
		return rules.test(lexema);
	}

	function isFloat(lexema){
		rules = new RegExp(REAL);
		return rules.test(lexema);
	}

	function isSoma(lexema){
		rules = new RegExp(OPSOMA);
		return rules.test(lexema);
	}

	function isSub(lexema){
		rules = new RegExp(OPSUB);
		return rules.test(lexema);
	}

	function isMult(lexema){
		rules = new RegExp(OPMUL);
		return rules.test(lexema);
	}

	function isDiv(lexema){
		rules = new RegExp(OPDIV);
		return rules.test(lexema);
	}

	function isAP(lexema){
		rules = new RegExp(AP);
		return rules.test(lexema);
	}

	function isFP(lexema){
		rules = new RegExp(FP);
		return rules.test(lexema);
	}

	function isProgram(lexema){
		rules = new RegExp(PROGRAM);
		return rules.test(lexema);
	}

	function isBegin(lexema){
		rules = new RegExp(BEGIN);
		return rules.test(lexema);
	}

	function isEnd(lexema){
		rules = new RegExp(END);
		return rules.test(lexema);
	}

	function isProcedure(lexema){
		rules = new RegExp(PROCEDURE);
		return rules.test(lexema);
	}

	function isIf(lexema){
		rules = new RegExp(IF);
		return rules.test(lexema);
	}

	function isThen(lexema){
		rules = new RegExp(THEN);
		return rules.test(lexema);
	}

	function isElse(lexema){
		rules = new RegExp(ELSE);
		return rules.test(lexema);
	}

	function isWhile(lexema){
		rules = new RegExp(WHILE);
		return rules.test(lexema);
	}

	function isDo(lexema){
		rules = new RegExp(DO);
		return rules.test(lexema);
	}

	function isId(lexema){
		rules = new RegExp(ID);
		return rules.test(lexema);
	}

	function isEl(lexema){
		rules = new RegExp(EL);
		return rules.test(lexema);
	}

	function isTipoInt(lexema){
		rules = new RegExp(TIPOINT);
		return rules.test(lexema);
	}

	function isTipoReal(lexema){
		rules = new RegExp(TIPOREAL);
		return rules.test(lexema);
	}

	function isTipoChar(lexema){
		rules = new RegExp(TIPOCHAR);
		return rules.test(lexema);
	}

	function isTipoBoolean(lexema){
		rules = new RegExp(TIPOBOOL);
		return rules.test(lexema);
	}

	function isComma(lexema){
		rules = new RegExp(COMMA);
		return rules.test(lexema);
	}

	function isAtr(lexema){
		rules = new RegExp(ATR);

		return rules.test(lexema);
	}

	function isIgual(lexema){
		rules = new RegExp(IGUAL);
		return rules.test(lexema);
	}

	function isDif(lexema){
		rules = new RegExp(DIF);
		return rules.test(lexema);
	}

	function isMenor(lexema){
		rules = new RegExp(MENOR);
		return rules.test(lexema);
	}

	function isMaior(lexema){
		rules = new RegExp(MAIOR);
		return rules.test(lexema);
	}

	function isMenorIgual(lexema){
		rules = new RegExp(MENORIGUAL);
		return rules.test(lexema);
	}

	function isMaiorIgual(lexema){
		rules = new RegExp(MAIORIGUAL);
		return rules.test(lexema);
	}

	function isNot(lexema){
		rules = new RegExp(NOT);
		return rules.test(lexema);
	}

	function isOr(lexema){
		rules = new RegExp(OR);
		return rules.test(lexema);	
	}

	function isAnd(lexema){
		rules = new RegExp(AND);
		return rules.test(lexema);
	}

	function isTrue(lexema){
		rules = new RegExp(TRUE);
		return rules.test(lexema);
	}

	function isFalse(lexema){
		rules = new RegExp(FALSE);
		return rules.test(lexema);
	}

	function isDiv(lexema){
		rules = new RegExp(DIV);
		return rules.test(lexema);
	}

	function isMaiorIgual(lexema){
		rules = new RegExp(MAIORIGUAL);
		return rules.test(lexema);
	}

	function isVar(lexema){
		rules = new RegExp(VAR);
		return rules.test(lexema);
	}	
}