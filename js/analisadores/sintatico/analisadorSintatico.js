var AnalisadorSintatico = function(tokens){
	this.tokens = tokens;
	var gramatica = new Gramatica(this.tokens);

	this.setVT = setVT;
	this.getVT = getVT;
	this.analisarSintaxe = analisarSintaxe(this.tokens);

	function setVT(tokens){
		gramatica.setVT(tokens);
	}

	function getVT(){
		return gramatica.getVT();
	}

	function analisarSintaxe(tokens){
		return gramatica.programa;
	}
}