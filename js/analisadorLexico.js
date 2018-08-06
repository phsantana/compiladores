var analisadorLexico = function() {

	var rules;
	var tokens = new Array();

	this.analisarLexico = analisarLexico;

	function analisarLexico(lexemas){
		var classificacao;
		lexemas = lexemas.split(" ");

		for(var i = 0; i < lexemas.length; i++){
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
		rules = new RegExp(/^([-+]?)(\d+)$/);

		return rules.test(lexema);
	}

	function isFloat(lexema){
		rules = new RegExp(/^([-+]?)(\d+)\.(\d+)$/);

		return rules.test(lexema);
	}

	function isSoma(lexema){
		rules = new RegExp(/^([+])$/);

		return rules.test(lexema);
	}

	function isSub(lexema){
		rules = new RegExp(/^([-])$/);

		return rules.test(lexema);
	}

	function isMult(lexema){
		rules = new RegExp(/^([*])$/);

		return rules.test(lexema);
	}

	function isDiv(lexema){
		rules = new RegExp(/^([\/])$/);

		return rules.test(lexema);
	}

	function isAP(lexema){
		rules = new RegExp(/^([(])$/);

		return rules.test(lexema);
	}

	function isFP(lexema){
		rules = new RegExp(/^([)])$/);

		return rules.test(lexema);
	}

}