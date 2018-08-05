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

	function analisarLexico(lexemas){
		alert(lexemas);
	}

	function analisarSintatico(){

	}

	function analisarSemantico(){

	}

	function setRules(expressao){
		rules = new RegExp('[0-9]+', 'm');
	}
}