/***
	Este arquivo serve para controlar os eventos da página, fazer a criação de elementos e chamar os métodos que executam as análises (léxica, sintática, semântica).


BY: Gustavo Gimenez e Phillipe Sant'Ana
***/



/*************VARIÁVEIS GLOBAIS*******************/

var bg 		= document.createElement("div");
var body 	= document.querySelector("body");

/*************FUNÇÕES AUXILIARES***************/

function createDIV(classe,title){
	var div = document.createElement("div");

	if(typeof(classe) != undefined){
		for(let i = 0; i < classe.length; i++)
			div.classList.add(classe[i]);
	}

	if(typeof(title) != "undefined")
		div.title = title;

	return div;
}

function createCol(tamM, tamS, offset){
/*Esta função cria as colunas do Materialize <div class="col mX sX offset-mX">
 • 1º param: tamanho da coluna em resolução normal
 • 2º param: tamanho da coluna em resolução menor (mobile)
 • 3º param: caso haja offset
 */
 var col = document.createElement("div");
 col.classList.add("col");

 if(typeof(tamM) != "undefined")
 	col.classList.add("m"+tamM);

 if(typeof(tamS) != "undefined")
 	col.classList.add("s"+tamS);

 if(typeof(offset) != "undefined")
 	col.classList.add("offset-m"+offset);

 return col;
}

function createRow(){
//Esta função cria uma <div class="row">
var row = document.createElement("div");
row.classList.add("row");

return row;
}

function createTopo(tipo,cor,texto,align){
/*Esta função cria uma topologia <hX>
 • 1º param: tipo da topologia (tamanho)
 • 2º param: cor do texto
 • 3º param: texto que ficará na topologia
 */
 var h = document.createElement("h"+tipo);
 h.innerHTML = texto;

 if(typeof(cor) != "undefined")
 	h.style.color = cor;

 if(typeof(align) != undefined)
 	h.style.textAlign = align;

 return h;
}

function createTxtArea(row,col){
/*Esta função cria um elemento <textarea>
 • 1º param: número de linhas
 • 2º param: número de colunas
 */
 var textArea = document.createElement("textarea");
 textArea.setAttribute("rows", row);
 textArea.setAttribute("cols", col);

 return textArea;
}

function createButton(texto){
/*Esta função cria um elemento <button>
• 1º param: texto que ficará no botão*/
var button = document.createElement("button");
button.innerHTML = texto;
button.classList.add("btn");

return button;
}

function createTable(){
	var table 	= document.createElement("table");
	var tr 		= document.createElement("tr");
	var thead 	= document.createElement("thead");
	thead.classList.add("brandon_l");

	var th 		= new Array();
	var tbody 	= document.createElement("tbody");
	var content = ["SÍMBOLO", "TIPO"];

	for(let i = 0; i < 2; i++){
		th.push(document.createElement("th"));
		th[i].innerHTML = content[i];
	}

	for(let i = 0; i < 2; i++)
		tr.appendChild(th[i]);

	thead.appendChild(tr);
	table.appendChild(thead);
	table.appendChild(tbody);

	return table;
}

function createTH(conteudo){
	var th = document.createElement("th");
	th.innerHTML = conteudo;

	return th;
}

function createTD(conteudo){
	var td = document.createElement("td");
	td.innerHTML = conteudo;

	return td;
}

function addContentInARow(tbody,header,content){
	var tr = document.createElement("tr");
	var th = createTH(header);
	var td = createTD(content);

	tr.appendChild(th);
	tr.appendChild(td);

	tbody.appendChild(tr);
}

function createINPUT(id,type,name,classe){
	var input = document.createElement("input");

	if(typeof(id) != undefined)
		input.id = id;

	if(typeof(classe) != undefined){	
		for(let i = 0; i < classe.length; i++)
			input.classList.add(classe[i]);
	}

	input.name = name;
	input.type = type;

	return input;
}

function createLabel(link, classe){
	var label = document.createElement("label");

	label.setAttribute("for",link);

	if(typeof(classe) != undefined){
		for(let i = 0; i < classe.length; i++)
			label.classList.add(classe[i]);
	}

	return label;
}

function addAnimation(obj,nome,duracao,tipo){
//Adiciona animações ao elemento
var animations = [
"fadeIn",
"fadeInLeft",
"fadeInRight",
"fadeInDown",
"fadeInUp",
"fadeOut",
"fadeOutLeft",
"fadeOutRight",
"fadeOutDown",
"fadeOutUp",
"slideRight",
"slideIn",
"slideOut",
"inArrow",
"inMenu",
"pop",
"popupIn",
"popupOut",
"blub",
"grow",
"comeLeft",
"growNDecrease"
];

obj.style.animation = animations[nome]+" "+duracao+"s"+" "+tipo;
}

function setFont(obj, fonte){
//Altera a fonte de um elemento
var fontes = [
"brandon_r",
"brandon_t",
"brandon_l",
"brandon_n",
"brandon_m",
"tw_cent",
"levenim",
"poiret",
"gtamerica_l",
"gtamerica_ui",
"gtamerica",
"tw_cent_cnd"
];

obj.classList.add(fontes[fonte]);
}

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