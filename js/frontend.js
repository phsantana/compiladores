/***
	Este arquivo serve para controlar os eventos da página, fazer a criação de elementos e chamar os métodos que executam as análises (léxica, sintática, semântica).


BY: Gustavo Gimenez e Phillipe Sant'Ana
***/


/*************VARIÁVEIS GLOBAIS*******************/

var bg 		= document.createElement("div");
var body 	= document.querySelector("body");


/************FUNÇÕES PRINCIPAIS****************/

window.onload = bootstrap();

function bootstrap(){
//Dá o ponta pé inicial chamando as funções mais importantes para iniciar a aplicação
choosePath();
// inicialPage();
// rollTitle();
}

function choosePath(){
	var main 		 = createDIV(["cover"]);
	main.style.backgroundColor = "rgba(0,0,0,.85)";
	main.style.display = "block";
	main.style.zIndex = '5';
	main.style.top = "0";
	main.style.transition = "all ease .5s";

	var hTxt = createTopo(2,"black",".txt","center");
	var hTerm = createTopo(2,"black","abc","center");

	hTxt.classList.add("levenim");
	hTerm.classList.add("levenim");

	var container = createDIV(["container-choose-path"]);

	var r1 = createRow();
	var colInfo = createCol(12);
	var h3 = createTopo(3,"white","SELECIONE O TIPO DA ENTRADA","center");
	h3.classList.add("tw_cent");

	addAnimation(h3,4,2,"ease");

	r1.appendChild(colInfo);
	colInfo.appendChild(h3);
	main.appendChild(r1);
	// colInfo.classList.add("center");

	var row 	= createRow();
	var colTxt 	= createCol(6);
	var colTerm	= createCol(6);

	row.appendChild(colTxt);
	row.appendChild(colTerm);

	var file 	 = createINPUT("arquivo","file","arquivo",["undefined"]);
	var txt 	 = createLabel("arquivo",["path"]);
	var terminal = createDIV(["path"], "Terminal");

	txt.title = "Arquivo";

	file.style.display = 'none';
	colTxt.appendChild(file);

	txt.appendChild(hTxt);
	terminal.appendChild(hTerm);

	txt.style.float = "right";

	colTxt.style.paddingRight = "5%";
	colTerm.style.paddingLeft = "5%";

	colTxt.appendChild(txt);
	colTerm.appendChild(terminal);

	body.appendChild(main);
	main.appendChild(container);
	container.appendChild(row);

	/*************EVENTOS*************/

	txt.addEventListener("click", function(){

		file.onchange = function(){	
			setTimeout(function(){
				main.parentNode.removeChild(main);
			},1500);

			addAnimation(main,5,1.5,"ease");
			addAnimation(txt,6,1.5,"ease");
			addAnimation(terminal,7,1.5,"ease");

			inicialPage();
			rollTitle();
		}
	});

	terminal.addEventListener("click", function(){
		setTimeout(function(){
			main.parentNode.removeChild(main);
		},1500);
		addAnimation(main,5,1.5,"ease");
		addAnimation(this,7,1.5,"ease");
		addAnimation(txt,6,1.5,"ease");

		inicialPage();
		rollTitle();
	});
	
	//inicialPage();
}


//Inicia os ícones de menu da página
function inicialPage(){

	var icons 	= document.querySelectorAll("i");

	setTimeout(function(){
		for(let i = 0; i < icons.length; i++){
			icons[i].style.visibility = 'visible';
			icons[i].style.opacity = '1';
			icons[i].style.animation = "pop 1s ease";
		}
	},1500);
}

function rollTitle(){
	var titulo	= document.querySelector("#titulo");
	var pai 	= titulo.parentNode;

	setTimeout(function(){
		if(titulo.innerHTML == "COMPILADORES"){
			titulo.innerHTML = "ANALISADOR LÉXICO";
		}
		else{
			titulo.innerHTML = "COMPILADORES";
		}
		titulo.style.animation = "fadeInUp 2s ease";
	},1000);

	setTimeout(function(){

		pai.removeChild(titulo);
		titulo.style.animation = "fadeOutUp 1.1s ease";
		pai.appendChild(titulo);

		rollTitle();
	},3000);
}

/******************EVENTOS******************/

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
		bg.style.position = 'fixed';
		bg.style.width = "100%";
		bg.style.height = "100%";
		bg.style.backgroundColor = "rgba(255,255,255,.7)";
		bg.style.zIndex = '2';
		bg.style.animation = "fadeIn .6s ease";

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

		//ANALISADOR
		button.addEventListener("click", function(){

			if(document.querySelector(".result")){
				document.querySelector(".result").parentNode.removeChild(document.querySelector(".result"));
			}

			var analisador 	= new analisadorLexico();

			var result 		= createDIV(["result"]);
			var tabela 		= createTable();
			var tbody 		= tabela.lastChild;
			tbody.classList.add("brandon_r");

			analisador.analisarLexico(txtArea.value);

			var tokens = analisador.getTokens();

			for(var i in tokens)
				addContentInARow(tbody,tokens[i].simbolo,tokens[i].tipo);

			result.appendChild(tabela);
			bg.appendChild(result);
		});

		colButton.appendChild(button);
		r3.appendChild(colButton);
		bg.appendChild(r3);
	}
}