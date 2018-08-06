var analisadorLexico = function() {

	var rules;

	this.analisarLexico = analisarLexico;

	function analisarLexico(lexemas){
		lexemas = lexemas.split(" ");

		for(var i = 0; i < lexemas.length; i++){
			if(isInteger(lexemas[i])){
				console.log(lexemas[i] + " é inteiro");
			}
			else if(isFloat(lexemas[i])){
				console.log(lexemas[i] + " é real");
			}
			else if(isOperador(lexemas[i])){
				console.log(lexemas[i] + " é operador");
			}
			else if(isPS(lexemas[i])){
				console.log(lexemas[i] + " é PS");
			}
			else if(isPD(lexemas[i])){
				console.log(lexemas[i] + " é PD");
			}
			else{
				console.log(lexemas[i] + " não foi identificado");
			}
		}
	}

	function isInteger(lexema) {
		rules = new RegExp(/^([-+]?)(\d+)$/);

		return rules.test(lexema);
	}

	function isFloat(lexema){
		rules = new RegExp(/^([-+]?)(\d+)\.(\d+)$/);

		return rules.test(lexema);
	}

	function isOperador(lexema){
		rules = new RegExp(/^([-+*\/])$/);

		return rules.test(lexema);
	}

	function isPS(lexema){
		rules = new RegExp(/^([(])$/);

		return rules.test(lexema);
	}

	function isPD(lexema){
		rules = new RegExp(/^([)])$/);

		return rules.test(lexema);
	}

}