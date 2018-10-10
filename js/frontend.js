function choosePath(flag){
	var main 		 = createDIV(["cover"]);
	main.style.backgroundColor = "rgba(0,0,0,.95)";
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
	var h4 = createTopo(4,"white","SELECIONE O TIPO DA ENTRADA","center");
	h4.classList.add("levenim");

	addAnimation(h4,4,2,"ease");

	r1.appendChild(colInfo);
	colInfo.appendChild(h4);
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