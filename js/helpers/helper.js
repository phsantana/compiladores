/*************VARIÁVEIS GLOBAIS*******************/

var bg 		= document.createElement("div");
var body 	= document.querySelector("body");

var isUndefined = element => element === undefined;

/*************FUNÇÕES AUXILIARES***************/

var element = obj => {
	var el = document.createElement(obj.tipo);
	delete obj.tipo;

	if("texto" in obj){
		el.innerText = obj.texto;
		delete obj.texto;
	}

	setAttributes(el,obj);

	return el;
}

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

function createTable(titles,content){
	// console.log(titles + " e " + content);
	var table 	= document.createElement("table");
	var tr 		= document.createElement("tr");
	var thead 	= document.createElement("thead");
	var th 		= [];
	var tbody 	= document.createElement("tbody");
	var trTemp 	= [];

	thead.classList.add("brandon_l");
	tbody.classList.add("brandon_l");

	for(let i = 0; i < titles.length; i++){
		th.push(document.createElement("th"));
		th[i].innerHTML = titles[i];
		th[i].classList.add("center");
		th[i].style.textTransform = 'capitalize';
		tr.appendChild(th[i]);
	}

	thead.appendChild(tr);
	table.appendChild(thead);
	table.appendChild(tbody);

	var trContent = [];

	if(typeof content == "object"){
		for(var indice in content){
			trContent.push(document.createElement("tr"));
			for(var key in content[indice]){
				var td = document.createElement("td");
				td.classList.add("center");
				td.innerHTML = content[indice][key];
				trContent[indice].appendChild(td);
			}
		}
	}
	else{
		for(let i = 0, tam = content.length; i < tam; i++){
			trContent.push(document.createElement("tr"));

			for(let j = 0; j < th.length; j++){
				var td = document.createElement("td");
				td.classList.add("center");
				td.innerHTML = content[i];

				trContent[i].appendChild(td);
			}
		}
	}

	trContent.forEach(function(item){
		tbody.appendChild(item);
	});

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

function setAttributes(el,atts){
	for(var key in atts){
		if(el.hasAttribute(key))
			el.setAttribute(key, el.getAttribute(key)+atts);
		else
			el.setAttribute(key,atts[key]);
	}
}