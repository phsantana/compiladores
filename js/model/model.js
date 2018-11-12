var content = {
	conteudo: "",
	flag: 0
};

/******************EVENTOS******************/

window.addEventListener("load",function(){
	var entrada1 = {
		lexema: "a",
		token: "ID",
		categoria: "var",
		tipo: "integer",
		valor: "1",
		escopo: "global",
		utilizada: 0
	};

	var entradas = [entrada1];

	var semanticer = new AnalisadorSemantico();
	var tabela = semanticer.gerarTabela(entradas);
});

document.querySelector("#menu").onclick = function(){

	var sidebar = document.querySelector("#sidebar");
	var coverContainer = document.querySelector("#cover-container");

	if(this.innerHTML == "menu"){
		this.innerHTML = "arrow_back";
		this.style.animation = "inArrow .3s ease";
	}else{
		this.innerHTML = "menu";
		this.style.animation = "inMenu .3s ease";
	}

	if(sidebar.classList.contains("off")){
		setAttributes(bg,{style: "position: fixed; width: 100%; height: 100%; background-color: rgba(255,255,255,.7); z-index: 2; animation: fadeIn .6s ease;"});

		coverContainer.appendChild(bg);

		setTimeout(function(){
			sidebar.classList.remove("off");
			sidebar.classList.add("on");
		},50);

		sidebar.style.animation = "slideIn .3s ease";

	}else{

		document.querySelector("#cover-container").removeChild(document.querySelector("#cover-container").lastChild);

		setTimeout(function(){
			sidebar.classList.remove("on");
			sidebar.classList.add("off");
		},290);
		sidebar.style.animation = "slideOut .3s ease";

		while(bg.hasChildNodes())
			bg.removeChild(bg.lastChild);
	}
}

document.querySelector("#lexico").onclick = function(){

	if(!bg.hasChildNodes()){

		var r1 = createRow();

		var colTitulo = createCol(12);
		colTitulo.style.marginTop = "20px";
		colTitulo.classList.add("center");

		var h = createTopo(5,"#555","DIGITE O CÓDIGO");
		setFont(h,2);

		h.style.textAlign = "center";
		addAnimation(h,4,1,"ease");

		colTitulo.appendChild(h);
		r1.appendChild(colTitulo);
		bg.appendChild(r1);

		//-------------------------------

		var r2 		= createRow();

		var colText = createCol(6,undefined,3);
		colText.classList.add("center");

		var txtArea = createTxtArea(15,40);
		addAnimation(txtArea,1,2,"ease");

		if(content.flag != 0)
			txtArea.value = content.conteudo;

		colText.appendChild(txtArea);
		r2.appendChild(colText);
		bg.appendChild(r2);

		//---------------------------------

		var r3 			= createRow();
		var colButton 	= createCol(12);
		colButton.classList.add("center");

		var button 		= createButton("ANALISAR");
		setFont(button,2);
		addAnimation(button,4,2,"ease");

		//ANALISADOR LÉXICO
		button.addEventListener("click", function(){

			if(document.querySelector(".result")){
				document.querySelector(".result").parentNode.removeChild(document.querySelector(".result"));
			}

			var lexer 	= new AnalisadorLexico();
			var result 	= createDIV(["result"]);

			lexer.analisarLexico(txtArea.value);

			var tokens = lexer.getTokens();
			var titles = Object.getOwnPropertyNames(tokens[0]);

			var tabela = createTable(titles,tokens);

			result.appendChild(tabela);
			bg.appendChild(result);
		});

		colButton.appendChild(button);
		r3.appendChild(colButton);
		bg.appendChild(r3);
	}
	else{
		while(bg.hasChildNodes())
			bg.removeChild(bg.firstElementChild);

		var r1 = createRow();

		var colTitulo = createCol(12);
		colTitulo.style.marginTop = "20px";
		colTitulo.classList.add("center");

		var h = createTopo(5,"#555","DIGITE O CÓDIGO");
		setFont(h,2);

		h.style.textAlign = "center";
		addAnimation(h,4,1,"ease");

		colTitulo.appendChild(h);
		r1.appendChild(colTitulo);
		bg.appendChild(r1);

		//-------------------------------

		var r2 		= createRow();

		var colText = createCol(6,undefined,3);
		colText.classList.add("center");

		var txtArea = createTxtArea(15,40);
		addAnimation(txtArea,1,2,"ease");

		if(content.flag != 0)
			txtArea.value = content.conteudo;

		colText.appendChild(txtArea);
		r2.appendChild(colText);
		bg.appendChild(r2);

		//---------------------------------

		var r3 			= createRow();
		var colButton 	= createCol(12);
		colButton.classList.add("center");

		var button 		= createButton("ANALISAR");
		setFont(button,2);
		addAnimation(button,4,2,"ease");

		//ANALISADOR LÉXICO
		button.addEventListener("click", function(){
			var restultEl = document.querySelector(".result");

			if(resultEl)
				resultEl.parentNode.removeChild(resultEl);

			var lexer 	= new AnalisadorLexico();
			var result 		= createDIV(["result"]);

			lexer.analisarLexico(txtArea.value);

			var tokens = lexer.getTokens();
			var titles = Object.getOwnPropertyNames(tokens[0]);

			var tabela = createTable(titles,tokens);

			result.appendChild(tabela);
			bg.appendChild(result);
		});

		colButton.appendChild(button);
		r3.appendChild(colButton);
		bg.appendChild(r3);
	}
}

document.querySelector("#sintatico").onclick = function(){
	if(!bg.hasChildNodes()){

		var r1 = createRow();

		var colTitulo = createCol(12);
		colTitulo.style.marginTop = "20px";
		colTitulo.classList.add("center");

		var h = createTopo(5,"#555","DIGITE O CÓDIGO");
		setFont(h,2);

		h.style.textAlign = "center";
		addAnimation(h,4,1,"ease");

		colTitulo.appendChild(h);
		r1.appendChild(colTitulo);
		bg.appendChild(r1);

		//-------------------------------

		var r2 		= createRow();

		var colText = createCol(6,undefined,3);
		colText.classList.add("center");

		var txtArea = createTxtArea(15,40);
		addAnimation(txtArea,1,2,"ease");

		if(content.flag != 0)
			txtArea.value = content.conteudo;

		colText.appendChild(txtArea);
		r2.appendChild(colText);
		bg.appendChild(r2);

		//---------------------------------

		var r3 			= createRow();
		var colButton 	= createCol(12);
		colButton.classList.add("center");

		var button 		= createButton("ANALISAR");
		setFont(button,2);
		addAnimation(button,4,2,"ease");

		//ANALISADOR LÉXICO
		button.addEventListener("click", function(){

			if(document.querySelector(".result")){
				document.querySelector(".result").parentNode.removeChild(document.querySelector(".result"));
			}

			var lexer 	= new AnalisadorLexico();
			var result 		= createDIV(["result"]);

			lexer.analisarLexico(txtArea.value);
			var tokens = lexer.getTokens();

			var tabela 		= createTable(["TIPO","MENSAGEM"], tokens);

			var sintaxer = new AnalisadorSintatico(tokens);

			var report = sintaxer.analisarSintaxe;

			result.appendChild(tabela);
			bg.appendChild(result);
		});

		colButton.appendChild(button);
		r3.appendChild(colButton);
		bg.appendChild(r3);
	}
	else{
		while(bg.hasChildNodes())
			bg.removeChild(bg.firstElementChild);

		var r1 = createRow();

		var colTitulo = createCol(12);
		colTitulo.style.marginTop = "20px";
		colTitulo.classList.add("center");

		var h = createTopo(5,"#555","DIGITE O CÓDIGO");
		setFont(h,2);

		h.style.textAlign = "center";
		addAnimation(h,4,1,"ease");

		colTitulo.appendChild(h);
		r1.appendChild(colTitulo);
		bg.appendChild(r1);

		//-------------------------------

		var r2 		= createRow();

		var colText = createCol(6,undefined,3);
		colText.classList.add("center");

		var txtArea = createTxtArea(15,40);
		addAnimation(txtArea,1,2,"ease");

		if(content.flag != 0)
			txtArea.value = content.conteudo;

		colText.appendChild(txtArea);
		r2.appendChild(colText);
		bg.appendChild(r2);

		//---------------------------------

		var r3 			= createRow();
		var colButton 	= createCol(12);
		colButton.classList.add("center");

		var button 		= createButton("ANALISAR");
		setFont(button,2);
		addAnimation(button,4,2,"ease");

		//ANALISADOR LÉXICO
		button.addEventListener("click", function(){

			if(document.querySelector(".result")){
				document.querySelector(".result").parentNode.removeChild(document.querySelector(".result"));
			}

			var lexer 	= new AnalisadorLexico();
			var result 		= createDIV(["result"]);

			lexer.analisarLexico(txtArea.value);
			var tokens = lexer.getTokens();

			var sintaxer = new AnalisadorSintatico()(tokens);
			var report = sintaxer.analisarSintaxe;

			var tabela 	= createTable(["TIPO","MENSAGEM"],tokens);

			result.appendChild(tabela);
			bg.appendChild(result);
		});

		colButton.appendChild(button);
		r3.appendChild(colButton);
		bg.appendChild(r3);
	}
}

document.querySelector("#entrada").onclick = function(){
	choosePath(false);
}

function lerTxt(evt){
	
	var file = evt.target.files[0];

	var reader = new FileReader();
	
	reader.onload = function(fileName){
		content.conteudo = fileName.currentTarget.result;
		content.flag = 1;
	}

	reader.readAsText(file);
}