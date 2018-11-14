var Gramatica = function(tokens){
	var vN = "";
	var vT = tokens;
	var report 		= [];
	var variaveis 	= [];
	var procedures 	= [];
	var beginEnd 	= [];

	this.programa = programa(tokens);
	this.setVN = setVN;
	this.setVT = setVT;
	this.getVN = getVN;
	this.getVT = getVT;
	this.getVariaveis = getVariaveis;
	this.getProcedures = getProcedures;

	function getVariaveis(){
		return variaveis;
	}

	function getProcedures(){
		return procedures;
	}

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
		var contParenteses = 0;

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

	function comandoComposto(vT, contParenteses = 0){
		//Verifica se começou o comandoComposto

		if(vT.length){
			if(vT[0].tipo == "BEGIN"){
				beginEnd.push("begin");
				vT.splice(0,1);
				vT = comandoComposto(vT,contParenteses);
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

					vT = comandoComposto(vT,contParenteses);
				}
				else{
					setReport("EXPERROR",EXPERROR);
				}
				vT = comandoComposto(vT,contParenteses);
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
					++contParenteses;
					vT.splice(0,1);
					vT = expressao(vT);

					if(vT[0].tipo == "FP"){
						vT.splice(0,1);
						--contParenteses;
					}
					else
						setReport("PARERROR",PARERROR);
				}
				else{
					vT = expressao(vT);
				}

				if(vT[0].tipo != "ELSE"){
					if(vT[0].tipo == "THEN"){
						vT.splice(0,1);
						vT = comandoComposto(vT,contParenteses);
					}
					else
						setReport("THENERROR",THENERROR);
				}
				else{
					vT.splice(0,1);
					vT = comandoComposto(vT,contParenteses);
				}
			}
		}

		//Comando Repetitivo
		if(vT[0].tipo == "WHILE"){
			vT.splice(0,1);
			if(vT[0].tipo == "AP"){
					++contParenteses;
					vT.splice(0,1);
					vT = expressao(vT);

					if(vT[0].tipo == "FP"){
						vT.splice(0,1);
						--contParenteses;
					}
					else
						setReport("PARERROR",PARERROR);
				}
				else{
					vT = expressao(vT);
				}

				if(vT[0].tipo == "DO"){
						vT.splice(0,1);
						vT = comandoComposto(vT,contParenteses);
					}
					else
						setReport("DOERROR",DOERROR);			
		}

		//End
		if(vT.length){
			if(vT[0].tipo == "END"){
				vT.splice(0,1);
				beginEnd.pop();
				comandoComposto(vT,contParenteses);
			}
		}

		//Verifica se todos os begins fecharam
		if(!vT.length){
			if(beginEnd.length)
				setReport("ENDERROR",ENDERROR);
		}

		return vT;
	}

	function expressao(vT){
		if(vT[0].tipo == "ID"){	
			if(variaveis.includes(vT[0].simbolo))
				vT.splice(0,2);
			else{
				setReport("NOEXST",vT[0].simbolo + NOEXST);
				vT.splice(0,2);
			}
		}

		if(vT[0].tipo == "ID"){
			if(variaveis.includes(vT[0].simbolo)){
				vT.splice(0,1);
				vT = expressao(vT);
			}
			else{
				setReport("NOEXST",vT[0].simbolo + NOEXST);
				vT.splice(0,1);
			}
		}
		else{
			if(vT[0].tipo != "END LINE"){
				if(vT[0].tipo == "OPSOMA" || vT[0].tipo == "OPSUB" || vT[0].tipo == "INT" || vT[0].tipo == "REAL" || vT[0].tipo == "AP" ||  vT[0].tipo == "NOT" || vT[0].tipo == "OR"){
					vT.splice(0,1);

					if(vT[0].tipo == "IGUAL" || vT[0].tipo == "DIF" || vT[0].tipo == "MENOR" || vT[0].tipo == "MAIOR" || vT[0].tipo == "MENORIGUAL" || vT[0].tipo == "MAIORIGUAL"){
						vT.splice(0,1);

						if(vT[0].tipo == "OPSOMA" || vT[0].tipo == "OPSUB" || vT[0].tipo == "INT" || vT[0].tipo == "REAL" || vT[0].tipo == "AP" ||  vT[0].tipo == "NOT" || vT[0].tipo == "OR")
							vT = expressao(vT);
						else{
							setReport("EXPERROR",EXPERROR);
							vT = expressao(vT);
						}
					}

					if(vT[0].tipo == "OPMUL" || vT[0].tipo == "DIV" || vT[0].tipo == "AND"){
						vT.splice(0,1);
						if(vT[0].tipo == "AP"){
							let contP = 1;
							vT.splice(0,1);
							vT = expressao(vT);

							if(vT[0].tipo == "FP")
								--contP;

							if(!contP)
								setReport("PARERROR",PARERROR);

							vT = expressao(vT);
						}
						else if(vT[0].tipo == "NOT"){
							vT.splice(0,1);
							if(vT[0].tipo == "ID" || vT[0].tipo == "REAL" || vT[0].tipo == "INT" || vT[0].tipo == "NOT" || vT[0].tipo == "AP")
								vT = expressao(vT);
							else{
								setReport("EXPERROR",EXPERROR);
								vT = expressao(vT);
							}
						}
						else if(vT[0].tipo == "ID" || vT[0].tipo == "REAL" || vT[0].tipo == "INT"){
							vT.splice(0,1);
							vT = expressao(vT);
						}
						else{
							setReport("EXPERROR",EXPERROR);
							vT = expressao(vT);
						}
					}
					vT = expressao(vT);
				}
				else
					setReport("EXPERROR",EXPERROR);
			}
		}
		return vT;
	}
}