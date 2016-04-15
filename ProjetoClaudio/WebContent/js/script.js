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
	
	var diasUteisRestantes = calculaDiasUteisRestantes();
	var diasUteisAno = 252;
	var diasUteisMes = 21;
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
		
		valor = valor.split(".").join("");
		valor = valor.replace(",", ".");
		valor = parseFloat(valor);
		
		txTarifa = txTarifa.replace(",", ".");
		txTarifa = parseFloat(txTarifa);
		
		var resultado = executarFormula(valor, txTarifa);
		
		$( "#tarifaatualnome" ).html(nomeTarifa);
		$( "#tarifaatualtaxa" ).html(txTarifa);
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
		
		var taxaSupremo = 4.0;
		var taxaClassico = 2.0;
		var taxaSoberano = 1.5;
		var taxaAbsoluto = 1;
		var taxaDiferenciado = 0.5;
		var taxaMaster = 0.5;
		
		
		$( "#bbcpsupremoA").html( executarFormula(taxaSupremo, valor) );
		$( "#bbcpsupremoB").html( executarFormula(taxaSupremo, valorNovaAplicacao) );
		$( "#bbcpsupremoC").html();
		
		$( "#bbcpclassicoA").html( executarFormula(taxaClassico, valor) );
		$( "#bbcpclassicoB").html( executarFormula(taxaClassico, valorNovaAplicacao) );
		$( "#bbcpclassicoC").html();
		
		$( "#bbcpsoberanoA").html( executarFormula(taxaSoberano, valor) );
		$( "#bbcpsoberanoB").html( executarFormula(taxaSoberano, valorNovaAplicacao) );
		$( "#bbcpsoberanoC").html();
		
		$( "#bbcpabsolutoA").html( executarFormula(taxaAbsoluto, valor) );
		$( "#bbcpabsolutoB").html( executarFormula(taxaAbsoluto, valorNovaAplicacao) );
		$( "#bbcpabsolutoC").html();
		
		$( "#bbcpdiferenciadoA").html( executarFormula(taxaDiferenciado, valor) );
		$( "#bbcpdiferenciadoB").html( executarFormula(taxaDiferenciado, valorNovaAplicacao) );
		$( "#bbcpdiferenciadoC").html();
		
		$( "#rfmasterA").html( executarFormula(taxaMaster, valor) );
		$( "#rfmasterB").html( executarFormula(taxaMaster, valorNovaAplicacao) );
		$( "#rfmasterC").html();
		
		
	}
	
	function executarFormula(taxa, valor){
		taxa = taxa/100;
		var resultado = (taxa / diasUteisAno) * diasUteisMes * valor;
		return resultado;
	}
	
	