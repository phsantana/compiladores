var analisadorLexico = function() {

	var rules;
	var tokens = new Array();

	this.analisarLexico = analisarLexico;
	this.getTokens = getTokens;

	function preProcessadorEntrada(entrada){
		var aux = entrada;
		var lexemaAux

		entrada = entrada.replace(/[0-9]+/g, "#");
		entrada = entrada.replace(/[\.]/g, "#");
		var numeros = aux.split(/[^0-9\.]+/);
		var operadores = entrada.split("#").filter(function(n){return n});
		var lexemas = [];

		for (var cont = 0; cont < operadores.length; cont++) {
			if(operadores[cont].length > 1){
				lexemaAux = operadores[cont];
				lexemaAux = lexemaAux.split("").reverse().join();
				lexemaAux = lexemaAux.split(",");

				operadores.splice(cont, 1, lexemaAux[0]);

				for (var j = 1; j < lexemaAux.length; j++) {
					operadores.splice(i + j, 0, lexemaAux[j]);
				}
			}
		}


		for(var i = 0; i < numeros.length; i++){
			if(numeros[i] != "" && numeros[i] != " "){
				lexemas.push(numeros[i]);
			}
		}

		for(var i = 0; i < operadores.length; i++){
			if(operadores[i] != "" && operadores[i] != " "){
				lexemas.push(operadores[i]);
			}
		}

		return lexemas;
	}

	function analisarLexico(lexemas){
		lexemas = preProcessadorEntrada(lexemas);

		var classificacao;

		for(var i = 0, tam = lexemas.length; i < tam; i++){
			if(isInteger(lexemas[i])){
				classificacao = "INT";
			}
			else if(isFloat(lexemas[i])){
				classificacao = "REAL";
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
			else{
				classificacao = "ERRO";
			}

				addToken({simbolo:lexemas[i], tipo:classificacao});
		}

		console.log(tokens);
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

}