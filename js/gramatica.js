var Gramatica = function(tokens){
	var vN = "";
	var vT = tokens;
	var report = [];
	var variaveis = [];
	var procedures = [];
	var contBeginEnd = 0;
	var contParenteses = 0;

	this.programa = programa(tokens);
	this.setVN = setVN;
	this.setVT = setVT;
	this.getVN = getVN;
	this.getVT = getVT;

	function setVN(vN){
		this.vN = vN;
	}

	function getVN(){
		return this.vN;
	}

	function setVT(vT){
		this.vT = vT;
	}

	function getVT(){
		return this.vT;
	}

	function setReport(t,m){
		report.push({tipo: t, msg: m});
	}

	function programa(vT){
		if(vT.length){
			if(vT[0].tipo == "PROGRAM")
				vT.splice(0,1);
			else{
				vT.splice(0,1);
				console.log("Program não está definido!");
				setReport("PRGERROR",PRGERROR);
			}

			if(vT.length){
				if(vT[0].tipo == "ID"){
					vT.splice(0,1);

					if(vT.length){
						if(vT[0].tipo == "END LINE"){
							vT.splice(0,1);
							bloco(vT);
						}
						else{
							console.log("EndLine não definido!");
							setReport("ELERROR", ELERROR);
							bloco(vT,report);
						}
					}
					else{
						setReport("ELERROR", ELERROR);
						bloco(vT,report);
					}
				}
				else{
					vT.splice(0,1);
					console.log("Identificador não definido!");
					setReport("IDERROR",IDERROR);
					bloco(vT,report);
				}
			}
			else{
				setReport("IDERROR", IDERROR);
				bloco(vT,report);
			}
		}
		else{
			console.log("Programa Vazio");
			setReport("VAZIO", VAZIO);
		}

		return report;
	}

	function bloco(vT){
		if(vT.length){
			if(vT[0].tipo == "TIPOINT" || vT[0].tipo == "TIPOBOOL" || vT[0].tipo == "TIPOREAL" || vT[0].tipo == "TIPOCHAR"){
				vT.splice(0,1);
				vT = declaracaoVar(vT,variaveis);
				bloco(vT);
			}
		}

		if(vT.length){
			if(vT[0].tipo == "PROCEDURE"){
				vt.splice(0,1);
				vT = declaracaoProcedure(vT,procedures);
				bloco(vT);
			}
		}

		if(vT.length){
			if(vT[0].tipo == "BEGIN"){
				vT = comandoComposto(vT);
				bloco(vT);
			}
		}
	}

	function declaracaoVar(vT, variaveis){

		var endLine = 0;

		do{
			if(vT[0].tipo == "COMMA")
				vT.splice(0,1);

			if(vT[0].tipo == "ID"){
				variaveis.push(vT[0]);
				vT.splice(0,1);

				if(vT[0].tipo == "END LINE"){
					endLine = 1;
					vT.splice(0,1);
					break;
				}
			}
		}while(vT[0].tipo == "COMMA");

		if(!endLine)
			setReport("ELERROR",ELERROR);

		return vT;
	}

	function declaracaoProcedure(vT, procedures){
		console.log("Declaração Procedures");
		return vT;
	}

	function comandoComposto(vT){
		if(vT.length){
			if(vT[0].tipo == "BEGIN"){
				++contBeginEnd;
				vT.splice(0,1);
			}
		}

		if(vT.length){
			if(vT[0].tipo == "ID" && vT[1].tipo == "ATR"){
				console.log("Atribuição");
			}
		}
		return vT;
	}
}