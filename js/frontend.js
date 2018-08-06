/***
	Este arquivo serve para controlar os eventos da página, fazer a criação de elementos e chamar os métodos que executam as análises (léxica, sintática, semântica).


BY: Gustavo Gimenez e Phillipe Sant'Ana
***/



/*************VARIÁVEIS GLOBAIS*******************/

var bg = document.createElement("div");



/*************FUNÇÕES AUXILIARES***************/

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

function createTopo(tipo,cor,texto){
/*Esta função cria uma topologia <hX>
 • 1º param: tipo da topologia (tamanho)
 • 2º param: cor do texto
 • 3º param: texto que ficará na topologia
 */
 var h = document.createElement("h"+tipo);
 h.innerHTML = texto;

 if(typeof(cor) != "undefined")
 	h.style.color = cor;

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
	var th 		= new Array();
	var tbody 	= document.createElement("tbody");
	var content = ["TOKENS", "MESSAGE"];

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

function addContentInARow(table,th,td){

	var tr = document.createElement("tr");

	for(let i = 0; i < tds.length; i++)
		tr.appendChild(tds[i]);

	table.appendChild(tr);
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

/****************FUNÇÕES PRINCIPAIS**********************/

window.onload = bootstrap();

function bootstrap(){
//Dá o ponta pé inicial chamando as funções mais importantes para iniciar a aplicação
inicialPage();
rollTitle();
}

function inicialPage(){
//Inicia os ícones de menu da página

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

/*
**********************EVENTOS************************
*/

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
			var tabela 		= createTable();
			var tbody 		= document.querySelector("tbody");
			var classificador = ["INTEGER","FLOAT","OPERADOR","ERRO"];

			var iterator = classificador.keys();

			for (let key of iterator) {
  				alert(key); // expected output: 0 1 2
  			}

  			var compilador 	= new Compilador();

  			compilador.setRules('a|b|c');
  			compilador.analisarLexico(txtArea.value);

  			var headers		= compilador.getTokens();
  		});

		colButton.appendChild(button);
		r3.appendChild(colButton);
		bg.appendChild(r3);
	}
}