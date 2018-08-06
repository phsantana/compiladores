var Compilador = function(){

	var tokens 	= new Array();
	var rules;

	this.analisarLexico 		= analisarLexico;
	this.analisarSintatico 	= analisarSintatico;
	this.analisarSemantico	= analisarSemantico;
	this.setToken 				= setToken;
	this.getTokens				= getTokens;
	this.setRules 				= setRules;

	function setToken(token){
		tokens.push(token);
	}

	function getTokens(){
		return tokens;
	}

	function analisarLexico(lexemas, tabela){

		for(let i = 0; i < lexemas.length; i++){
			if(rules.test(lexemas[i]) != false){
				setToken(lexemas[i]);
			}
			else
				alert(lexemas[i] + " não corresponde à regra");
		}

		alert(tokens);
	}

	function analisarSintatico(){

	}

	function analisarSemantico(){

	}

	function setRules(expressao){
		rules = new RegExp(expressao);
	}
}