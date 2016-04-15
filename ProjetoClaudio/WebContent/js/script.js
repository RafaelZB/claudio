	function calculaDiasUteisRestantes() {
		var dataAtual = new Date();
		var diasUteisRestantes = 0;
		var mesAtual = dataAtual.getMonth();

		//COLOCAR AQUI OS FERIADOS NACIONAIS
		var feriados = [new Date('2016 4 14'), new Date('2016 4 15')];


		while(mesAtual == dataAtual.getMonth()){
			if(dataAtual.getDay() == 6 || dataAtual.getDay() == 0){
				dataAtual.setDate(dataAtual.getDate() + 1);
				continue;
			}
			var pulaFeriado = false;
			for(var i = 0 ; feriados.length > i ; i ++ ){
				if( ( feriados[i].getDate() == dataAtual.getDate() ) && (feriados[i].getMonth() == dataAtual.getMonth() ) && (feriados[i].getYear() == dataAtual.getYear()) ){
					dataAtual.setDate(dataAtual.getDate() + 1);
					pulaFeriado = true;
					break;
				}
			}
			if(pulaFeriado == true)
				continue;
			
			dataAtual.setDate(dataAtual.getDate() + 1);
			diasUteisRestantes++;			
		}
		return diasUteisRestantes;
		
	}
	
	
	/*
	 * CONSTANTES DE CALCULO
	 * */
	var diasUteisRestantes = calculaDiasUteisRestantes();
	var diasUteisAno = 252;
	var diasUteisMes = 21;
	
	//TAXAS
	var taxaSupremo = [3.79 , '4,0'];
	var taxaContaCorrente = [2.69 , '3,0'];
	var taxaClassico = [1.89 , '2,0'];
	var taxaSoberano = [1.42 , '1,5'];
	var taxaAbsoluto = [0.95 , '1,0'];
	var taxaPoupanca = [0.85 , '1,0'];
	var taxaCdbDI = [0.63 , '0,8'];
	var taxaDiferenciado = [0.47, '0,5'];
	var taxaMaster = [0.47 , '0,5'];
	var taxaCdbSWAP = [0.04 , '0,05'];
	
	$(document).ready(function(){
		$("#valor").maskMoney({symbol:'R$ ', showSymbol:true, thousands:'.', decimal:',', symbolStay: true});
		$("#novaAplicacao").maskMoney({symbol:'R$ ', showSymbol:true, thousands:'.', decimal:',', symbolStay: true});
		
		$( "#valor" ).keyup(function(event) {
			calculaTabela1();
			calculaTabela2();
		});
		$( "#novaAplicacao" ).keyup(function(event) {
			calculaTabela2();
		});
		$( "#selecaotarifas" ).change(function(event) {
			calculaTabela1();
			calculaTabela2();
		});
		
	});

	function calculaTabela1(){
		var valor = $( "#valor" ).val();
		var nomeTarifa = $( "#selecaotarifas option:selected" ).text();
		var txTarifa = $( "#selecaotarifas" ).val();
		switch (txTarifa){
		case 'A':
			txTarifa = taxaSupremo;
			break;
		case 'B':
			txTarifa = taxaContaCorrente;
			break;
		case 'C':
			txTarifa = taxaClassico;
			break;
		case 'D':
			txTarifa = taxaSoberano;
			break;
		case 'E':
			txTarifa = taxaAbsoluto;
			break;
		case 'F':
			txTarifa = taxaPoupanca;
			break;
		case 'G':
			txTarifa = taxaCdbDI;
			break;
		case 'H':
			txTarifa = taxaDiferenciado;
			break;
		case 'I':
			txTarifa = taxaMaster;
			break;
		case 'J':
			txTarifa = taxaCdbSWAP;
			break;
		}
		
		valor = valor.split(".").join("");
		valor = valor.replace(",", ".");
		valor = parseFloat(valor);
		
		var resultado = executarFormula(txTarifa[0], valor);
		resultado = formataReal(resultado);
		
		$( "#tarifaatualnome" ).html(nomeTarifa);
		$( "#tarifaatualtaxa" ).html(txTarifa[1]);
		$( "#tarifaatualresultado" ).html(resultado);
	}
	
	function calculaTabela2(){
		var valor = $( "#valor" ).val();
		var valorNovaAplicacao = $( "#novaAplicacao" ).val();
		
		valor = valor.split(".").join("");
		valor = valor.replace(",", ".");
		valor = parseFloat(valor);
		
		valorNovaAplicacao = valorNovaAplicacao.split(".").join("");
		valorNovaAplicacao = valorNovaAplicacao.replace(",", ".");
		valorNovaAplicacao = parseFloat(valorNovaAplicacao);
		
		
		$( "#bbcpsupremoA").html( formataReal( executarFormula(taxaSupremo[0], valor) ) );
		$( "#bbcpsupremoB").html( formataReal( executarFormula(taxaSupremo[0], valorNovaAplicacao) ) );
		$( "#bbcpsupremoC").html( formataReal( executarFormula(taxaSupremo[0], valor) - executarFormula(taxaSupremo[0], valorNovaAplicacao) ) );
		
		$( "#bbcpclassicoA").html( formataReal( executarFormula(taxaClassico[0], valor) ) );
		$( "#bbcpclassicoB").html( formataReal( executarFormula(taxaClassico[0], valorNovaAplicacao) ) );
		$( "#bbcpclassicoC").html( formataReal( executarFormula(taxaClassico[0], valor) - executarFormula(taxaClassico[0], valorNovaAplicacao) ) );
		
		$( "#bbcpsoberanoA").html( formataReal( executarFormula(taxaSoberano[0], valor) ) );
		$( "#bbcpsoberanoB").html( formataReal( executarFormula(taxaSoberano[0], valorNovaAplicacao) ) );
		$( "#bbcpsoberanoC").html( formataReal( executarFormula(taxaSoberano[0], valor) - executarFormula(taxaSoberano[0], valorNovaAplicacao) ) );
		
		$( "#bbcpabsolutoA").html( formataReal( executarFormula(taxaAbsoluto[0], valor) ) );
		$( "#bbcpabsolutoB").html( formataReal( executarFormula(taxaAbsoluto[0], valorNovaAplicacao) ) );
		$( "#bbcpabsolutoC").html( formataReal( executarFormula(taxaAbsoluto[0], valor) - executarFormula(taxaAbsoluto[0], valorNovaAplicacao) ) );
		
		/*
		 * NÃO É PARA CONSTAR OS DOIS SEGUINTES NA TABELA 2
		$( "#bbcpdiferenciadoA").html( executarFormula(taxaDiferenciado, valor) );
		$( "#bbcpdiferenciadoB").html( executarFormula(taxaDiferenciado, valorNovaAplicacao) );
		$( "#bbcpdiferenciadoC").html();
		
		$( "#rfmasterA").html( executarFormula(taxaMaster, valor) );
		$( "#rfmasterB").html( executarFormula(taxaMaster, valorNovaAplicacao) );
		$( "#rfmasterC").html();
		*/
		
	}
	
	function executarFormula(taxa, valor){
		taxa = taxa/100;
		var resultado = (taxa / diasUteisAno) * diasUteisMes * valor;
		//resultado = resultado.toFixed(2);
		return resultado;
	}
	
	function formataReal( int ){
		var negativo = false;
		if(int < 0)
			negativo = true;
		int = int.toFixed(2);
		var tmp = int+'';
		tmp = tmp.split(".").join("");
		tmp = tmp.replace(/([0-9]{2})$/g, ",$1"); // REGEX NÂO MUDAR
		if( tmp.length > 6 )
			tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
		
		if(negativo)
			tmp = "<span class='red'>" + tmp + "</span>";
		return tmp;
	}
	
	