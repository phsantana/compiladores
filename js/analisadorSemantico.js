var analisadorSemantico = function(){

	var geraTabela;

	this.geraTabela = geraTabela;
	
	function geraTabela(titles,content){
		var table = new Array();
		var numRows = 1+content.length;

		titles.forEach(titulo => {
			table[0].push(titulo);
		});

		for(var row in content){
			for(var att in row){
				table[row].push(content[row][att]);
			}
		}
	}
}