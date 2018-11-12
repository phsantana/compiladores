var AnalisadorSemantico = function(){

	this.gerarTabela = gerarTabela;

	function gerarTabela(content){
		var table = [];
		var numRows = content.length+1;

		table.push(Object.getOwnPropertyNames(content[0]));

		content.forEach(row => {
			for(var item in row)
				table.push(row[item]);
		});
		return table;
	}
};

var Semanticist = function(){
	var semanticRow = [];

	this.addSemantic = addSemantic;

	function addSemantic(token){
		
	}
}