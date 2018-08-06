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

	function setRules(expressao){
		rules = new RegExp(expressao);
	}

	function analisarSintatico(){

	}

	function analisarSemantico(){

	}
}