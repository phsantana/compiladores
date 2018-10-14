var Gramatica = function(tokens){
	var vN = "";
	var vT = tokens;
	var report = [];
	var variaveis = new Array();
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
				vT = declaracaoVar(vT);
				bloco(vT);
			}
		}

		if(vT.length){
			if(vT[0].tipo == "PROCEDURE"){
				vt.splice(0,1);
				vT = declaracaoProcedure(vT);
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

	function declaracaoVar(vT){
		var endLine = 0;

		do{
			if(vT[0].tipo == "COMMA")
				vT.splice(0,1);

			if(vT[0].tipo == "ID"){
				variaveis.push(vT[0].simbolo);
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

	function declaracaoProcedure(vT){
		var endLine = 0;
		var auxVar = [];
		var auxPro;

		if(vT.length){
			if(vT[0].tipo == "ID"){
				auxPro = vT[0].simbolo;
				vT[0].splice(0,1)
			}
			else
				setReport("IDERROR",IDERROR);
		}

		if(vT.length){
			if(vT[0].tipo == "AP"){
				vT[0].splice(0,1);
				++contParenteses;

				while(vT[0].tipo != "FP"){
					if(vT.length){
						if((vT[0].tipo == "ID") || (vT[0].tipo == "VAR")){
							if(vT[0].tipo == "VAR")
								vT[0].splice(0,1);

							if(vT[0].tipo == "ID"){
								auxVar.push(vT[0].simbolo);
								vT[0].splice(0,1);
							}
							else
								setReport("IDERROR",IDERROR);

							if(vT[0].tipo == "END LINE")
								vT[0].splice(0,1);
							else
								setReport("ELERROR",ELERROR);

						}
					}
				}

				if(vT[0].tipo == "FP"){
					vT.splice(0,1);
					--contParenteses;
				}
				else
					setReport("FPERROR",FPERROR);
			}
			else
				setReport("APERROR",APERROR);
		}

		((vT[0].tipo == "END LINE") ? vT.splice(0,1) : setReport("ELERROR",ELERROR));

		if(contParenteses)
			setReport("PARERROR",PARERROR);

		procedures.push({nome: auxPro, tipo: auxVar});

		return vT;
	}

	function comandoComposto(vT){
		//Verifica se começou o comandoComposto
		if(vT.length){
			if(vT[0].tipo == "BEGIN"){
				++contBeginEnd;
				vT.splice(0,1);
				vT = comandoComposto(vT);
			}
		}

		//Atribuição
		if(vT.length){
			if(vT[0].tipo == "ID" && vT[1].tipo == "ATR"){
				if(vT[2].tipo == "ID" || vT[2].tipo == "OPSOMA" || vT[2].tipo == "OPSUB" || vT[2].tipo == "INT" || vT[2].tipo == "REAL" || vT[2].tipo == "AP" ||  vT[2].tipo == "NOT"){
					vT = expressao(vT);

					if(vT[0].tipo == "END LINE")
						vT.splice(0,1);
					else
						setReport("ELERROR",ELERROR);

					vT = comandoComposto(vT);
				}
				else{
					setReport("EXPERROR",EXPERROR);
				}
				vT = comandoComposto(vT);
			}
		}

		//Chamada a Procedimento
		if(vT.length){
			if(vT[0].tipo == "ID" && vT[1].tipo == "AP"){
				++contParenteses;
				var flag = 0;
				for(let i in procedures){
					if(procedures[i].nome == vT[0].simbolo){
						flag = 1;
						break;
					}
				}
				
				if(flag)
					vT.splice(0,2);
				else{
					setReport("NOEXST",vT[0].simbolo + NOEXST);
					vT.splice(0,2);
				}

				vT = expressao(vT);

				if(vT[0].tipo == "FP"){
					vT.splice(0,1);
					--contParenteses;
				}

				if(contParenteses)
					setReport("FPERROR",FPERROR);
			}
		}

		//If
		if(vT.length){
			if(vT[0].tipo == "IF"){
				vT.splice(0,1);
				if(vT[0].tipo == "AP"){
					
				}
			}
		}

		//End
		if(vT.length){
			if(vT[0].tipo == "END"){
				vT.splice(0,1);
				--contBeginEnd;
				comandoComposto(vT);
			}
		}

		//Verifica se todos os begins fecharam
		if(contBeginEnd != 0)
			setReport("ENDERROR",ENDERROR);

		return vT;
	}

	function expressao(vT){
		if(vT[0].tipo == "ID"){	
			if(variaveis.includes(vT[0].simbolo))
				vT.splice(0,2);
			else
				setReport("NOEXST",vT[0]+NOEXST);
		}

		if(vT[0].tipo == "ID"){
			if(variaveis.includes(vT[0].simbolo)){
				vT.splice(0,1);
				vT = expressao(vT);
			}
			else
				setReport("NOEXST",vT[0]+NOEXST);
		}
		else{
			if(vT[0].tipo != "END LINE"){
				if(vT[0].tipo == "OPSOMA" || vT[0].tipo == "OPSUB" || vT[0].tipo == "INT" || vT[0].tipo == "REAL" || vT[0].tipo == "AP" ||  vT[0].tipo == "NOT"){
					vT.splice(0,1);
					vT = expressao(vT);
				}
				else
					setReport("EXPERROR",EXPERROR);
			}
		}

		return vT;
	}

}