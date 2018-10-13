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
							bloco(vT,report);
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

	function bloco(vT,report){
		if(vT.length){
			if(vT[0].tipo == "TIPOINT" || vT[0].tipo == "TIPOBOOL" || vT[0].tipo == "TIPOREAL" || vT[0].tipo == "TIPOCHAR")
				vT = declaracaoVar(vT,variaveis);

			if(vT[0].tipo == "PROCEDURE"){
				vT.splice(0,1);
				vT = declaracaoProcedure(vT);
			}

			if(vT[0].tipo == "BEGIN"){
				vT.splice(0,1);
				++contBeginEnd;
				vT = comandos(vT,contBeginEnd);
			}
			else{
				vT.splice(0,1);
				setReport("BEGINERROR",BEGINERROR);
			}
		}
	}

	function declaracaoVar(vT, variaveis){
		console.log("Declaração Var");
		return vT;
	}
	function declaracaoProcedure(vT, procedures){
		console.log("Declaração Procedures");
		return vT;
	}
	function comandos(vT, contador){
		console.log("Comandos");
		return vT;
	}

}