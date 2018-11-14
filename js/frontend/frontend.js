function choosePath(flag){
	var main = element({tipo: "div", class: "cover", style: "background-color: rgba(0,0,0,.95); display: block; z-index: 5; top: 0; transition: all ease .5s;"});

	var hTxt = {tipo: "h2", class: "levenim", texto: ".txt", style: "color: black; text-align: center"};

	var hTerm = Object.assign({},hTxt);
	hTerm.texto = "abc";

	hTxt = element(hTxt);
	hTerm = element(hTerm);

	var container = element({tipo: "div", class: "container-choose-path"});

	var r1 = createRow();
	var colInfo = createCol(12);
	var h4 = createTopo(4,"white","SELECIONE O TIPO DA ENTRADA","center");
	h4.classList.add("levenim");

	addAnimation(h4,4,2,"ease");

	r1.appendChild(colInfo);
	colInfo.appendChild(h4);
	main.appendChild(r1);

	var row 	= createRow();
	var colTxt 	= createCol(6);
	var colTerm	= createCol(6);

	row.appendChild(colTxt);
	row.appendChild(colTerm);

	var file 	 = createINPUT("arquivo","file","arquivo",["undefined"]);
	var txt 	 = createLabel("arquivo",["path"]);
	var terminal = createDIV(["path"], "Terminal");

	txt.title = "Arquivo";

	file.setAttribute("onchange", "lerTxt(evt)");
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

	txt.addEventListener("click", function(){
		file.onchange = function(evt){

			lerTxt(evt);

			setTimeout(function(){
				main.parentNode.removeChild(main);
			},1500);

			addAnimation(main,5,1.5,"ease");
			addAnimation(txt,6,1.5,"ease");
			addAnimation(terminal,7,1.5,"ease");

			if(flag){	
				startIcons();
				rollTitle();
			}
		}
	});

	terminal.addEventListener("click", function(){
		setTimeout(function(){
			main.parentNode.removeChild(main);
		},1500);
		addAnimation(main,5,1.5,"ease");
		addAnimation(this,7,1.5,"ease");
		addAnimation(txt,6,1.5,"ease");

		content.conteudo = "";
		content.flag = 0;

		if(flag){
			startIcons();
			rollTitle();
		}
	});
	
	//startIcons();
}


//Inicia os ícones de menu da página
function startIcons(){

	var icons 	= document.querySelectorAll("i");

	setTimeout(function(){
		for(let i = 0; i < icons.length; i++){
			icons[i].style.visibility = 'visible';
			icons[i].style.opacity = '1';
			icons[i].style.animation = "pop 1s ease";
		}
	},1500);
}

function rollTitle(cont = 0){
	var titulo	= document.querySelector("#titulo");
	var pai 	= titulo.parentElement;
	var titulos = ["COMPILADORES","ANALISADOR LÉXICO", "ANALISADOR SINTÁTICO","ANALISADOR SEMÂNTICO"];

	setTimeout(function(){
		if(cont < titulos.length){
			titulo.innerHTML = titulos[cont];
			++cont;
		}

		if(cont == titulos.length)
			cont = 0;

		titulo.style.animation = "fadeInUp 2s ease";
	},1000);

	setTimeout(function(){
		pai.removeChild(titulo);
		titulo.style.animation = "fadeOutUp 1.1s ease";
		pai.appendChild(titulo);
		rollTitle(cont);
	},3000);
}