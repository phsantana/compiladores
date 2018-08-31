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
}