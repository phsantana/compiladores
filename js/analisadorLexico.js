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

			if(noSpace[i] != undefined && noSpace[i].match(/,/)){
				var pieceComma = noSpace[i].split(/,/);

				if(pieceComma[pieceComma.length-1] != ""){
					noSpace.splice(i,1);
					noSpace.splice(i,0,pieceComma[0],",",pieceComma[pieceComma.length-1]);
					i += 2;
				}
				else{	
					noSpace.splice(i,1);
					noSpace.splice(i,0,pieceComma[0],",");
					i += 1;
				}
			}

			if(noSpace[i] != undefined && noSpace[i].match(/:=/)){
				var pieceAtr = noSpace[i].split(":=");

				if(pieceAtr[pieceAtr.length-1] != ""){
					noSpace.splice(i,1);
					noSpace.splice(i,0,pieceAtr[0],":=",pieceAtr[pieceAtr.length-1]);
					i += 2;
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

			if(noSpace[i] != undefined && noSpace[i].match(/[(]/)){
				var piecesAp = noSpace[i].split(/[(]/);
				var cont = 0;
				var offset = 0;

				noSpace.splice(i,1);

				for(let j = 0; j < piecesAp.length; j++){
					if(piecesAp[j] == ""){
						noSpace.splice(i+offset,0,"(");
						if((j+1 < piecesAp.length) && piecesAp[j+1] != ""){
							noSpace.splice(i+offset+1,0,"(");
							++cont;
							++offset;
						}
						++cont;
						++offset;
					}
					else{
						noSpace.splice(i+offset,0,piecesAp[j]);
						if((j+1 < piecesAp.length) && piecesAp[j+1] != ""){
							noSpace.splice(i+offset+1,0,"(");
							++cont;
							++offset;
						}
						++cont;
						++offset;
					}
				}
				i += cont-1;
			}

			if(noSpace[i] != undefined && noSpace[i].match(/[)]/)){
				var piecesFp = noSpace[i].split(/[)]/);
				var offset = 0;
				var cont = 0;

				noSpace.splice(i,1);

				for(let j = 0; j < piecesFp.length; j++){
					if(piecesFp[j] == ""){
						noSpace.splice(i+offset,0,")");
						if((j+1 < piecesFp.length) && piecesFp[j+1] != ""){
							noSpace.splice(i+offset+1,0,")");
							++cont;
							++offset;
						}
						++cont;
						++offset;
					}
					else{
						noSpace.splice(i+offset,0,piecesFp[j]);
						if((j+1 < piecesFp.length) && piecesFp[j+1] != ""){
							noSpace.splice(i+offset+1,0,")");
							++cont;
							++offset;
						}
						++cont;
						++offset;
					}
				}
				i += cont - 1;
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

		return rules.test(rules);
	}
}