var analisadorSemantico = function(){

	this.geraTabela = geraTabela;

	function geraTabela(titles,content){
		var table = new Array();
		var numRows = 1+content.length;

		table.push(titles);

		for(var row in content){
			table.push(content[row]);
		}

		return table;
	}
}