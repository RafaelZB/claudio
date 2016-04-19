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
	var listaDeFundos = [ 
	                      ['Fundo Supremo',3.79],
	                      ['CDB - 90% CDI',0.18],
	                      ['CDB - 92% CDI',0.16],
	                      ['CDB - 94% CDI',0.09],
	                      ['CDB - 96% CDI',0.07],
	                      ['Fundo Cl\xE1ssico',1.89],
	                      ['Fundo Soberano',1.42],
	                      ['Fundo Absoluto',0.95],
	                      ['Fundo Diferenciado',0.47],
	                      ['Fundo Master',0.47],
	                      ['Fundo Super',0.19],
	                      ['Fundo Premium',0.19],
	                      ['Fundo Ref. DI',0.09],
	                      ['Poupan\xE7a',0.85]
	                     ];
	
	//TAXAS
	var taxaSupremo = listaDeFundos[0];
	var taxaClassico = listaDeFundos[5];
	var taxaSoberano = listaDeFundos[6];
	var taxaAbsoluto = listaDeFundos[7];
	var taxaDiferenciado = listaDeFundos[8];
	var taxaMaster = listaDeFundos[9];
	var taxaSuper = listaDeFundos[10];
	var taxaPremium = listaDeFundos[11];
	var taxaRef = listaDeFundos[12];
	var tarifaMigracao;
	
	$(document).ready(function(){
		$("#valor").maskMoney({symbol:'R$ ', showSymbol:true, thousands:'.', decimal:',', symbolStay: true});
		$("#novaAplicacao").maskMoney({symbol:'R$ ', showSymbol:true, thousands:'.', decimal:',', symbolStay: true});
		
		$( "#valor" ).keyup(function(event) {
			calculaTarifaMigracao();
			calculaTabela();
		});
		$( "#novaAplicacao" ).keyup(function(event) {
			calculaTarifaMigracao();
			calculaTabela();
		});
		$( "#selecaotarifas" ).change(function(event) {
			calculaTarifaMigracao();
			calculaTabela();
		});
		
	});

	function calculaTarifaMigracao(){
		var valor = $( "#valor" ).val();
		var nomeTarifa = $( "#selecaotarifas option:selected" ).text();
		var txTarifa = $( "#selecaotarifas" ).val();
		
		if(valor == null || valor == '')
			valor = '0';
		valor = valor.split(".").join("");
		valor = valor.replace(",", ".");
		valor = parseFloat(valor);
		
		var resultadoTarifa = new calculos( txTarifa, txTarifa, valor, valor);
		var resultado = resultadoTarifa.resultadoTarifaMigracao;
		
		tarifaMigracao = resultado;
		resultado = formataReal(resultado);
		
		$( "#bbaplicacaoatual1" ).html(resultado);
		$( "#bbaplicacaoatual2" ).html(resultado);
		$( "#bbaplicacaoatual3" ).html(resultado);
		$( "#bbaplicacaoatual4" ).html(resultado);
		$( "#bbaplicacaoatual5" ).html(resultado);
		$( "#bbaplicacaoatual6" ).html(resultado);
		$( "#bbaplicacaoatual7" ).html(resultado);
		$( "#bbaplicacaoatual8" ).html(resultado);
		$( "#bbaplicacaoatual9" ).html(resultado);
		
		$( "#headColunaTarifaAtual" ).html(nomeTarifa);
		
		
	}
	
	function calculaTabela(){
		var valor = $( "#valor" ).val();
		var valorNovaAplicacao = $( "#novaAplicacao" ).val();
		var txTarifaMigracao = $( "#selecaotarifas" ).val();
		
		if(valor == null || valor == '')
			valor = '0';
		
		if(valorNovaAplicacao == null || valorNovaAplicacao == '')
			valorNovaAplicacao = '0';
		
		valor = valor.split(".").join("");
		valor = valor.replace(",", ".");
		valor = parseFloat(valor);
		
		valorNovaAplicacao = valorNovaAplicacao.split(".").join("");
		valorNovaAplicacao = valorNovaAplicacao.replace(",", ".");
		valorNovaAplicacao = parseFloat(valorNovaAplicacao);
		
		var resultadoNovaAplicacao = 0; 
		var resultadoAplicacao = 0;
		
		var resultadoTaxaSupremo = new calculos( 		txTarifaMigracao, taxaSupremo[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaClassico = new calculos( 		txTarifaMigracao, taxaClassico[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaSoberano = new calculos( 		txTarifaMigracao, taxaSoberano[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaAbsoluto = new calculos( 		txTarifaMigracao, taxaAbsoluto[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaDiferenciado = new calculos( 	txTarifaMigracao, taxaDiferenciado[1], 	valor, valorNovaAplicacao);
		var resultadoTaxaMaster = new calculos( 		txTarifaMigracao, taxaMaster[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaSuper = new calculos( 			txTarifaMigracao, taxaSuper[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaPremium = new calculos( 		txTarifaMigracao, taxaPremium[1], 		valor, valorNovaAplicacao);
		var resultadoTaxaRef = new calculos( 			txTarifaMigracao, taxaRef[1], 			valor, valorNovaAplicacao);
				
		$( "#bbcpsupremoB").html( formataReal( resultadoTaxaSupremo.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpsupremoA").html( formataReal( resultadoTaxaSupremo.resultadoTarifaMigracao ) );
		$( "#bbcpsupremoC").html( formataReal( resultadoTaxaSupremo.resultadoTarifaResultado ) );

		$( "#bbcpclassicoB").html( formataReal( resultadoTaxaClassico.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpclassicoA").html( formataReal( resultadoTaxaClassico.resultadoTarifaMigracao ) );
		$( "#bbcpclassicoC").html( formataReal( resultadoTaxaClassico.resultadoTarifaResultado ) );

		$( "#bbcpsoberanoB").html( formataReal( resultadoTaxaSoberano.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpsoberanoA").html( formataReal( resultadoTaxaSoberano.resultadoTarifaMigracao ) );
		$( "#bbcpsoberanoC").html( formataReal( resultadoTaxaSoberano.resultadoTarifaResultado ) );

		$( "#bbcpabsolutoB").html( formataReal( resultadoTaxaAbsoluto.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpabsolutoA").html( formataReal( resultadoTaxaAbsoluto.resultadoTarifaMigracao ) );
		$( "#bbcpabsolutoC").html( formataReal( resultadoTaxaAbsoluto.resultadoTarifaResultado ) );

		$( "#bbcpdiferenciadoB").html( formataReal( resultadoTaxaDiferenciado.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpdiferenciadoA").html( formataReal( resultadoTaxaDiferenciado.resultadoTarifaMigracao ) );
		$( "#bbcpdiferenciadoC").html( formataReal( resultadoTaxaDiferenciado.resultadoTarifaResultado ) );

		$( "#bbcpmasterB").html( formataReal( resultadoTaxaMaster.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpmasterA").html( formataReal( resultadoTaxaMaster.resultadoTarifaMigracao ) );
		$( "#bbcpmasterC").html( formataReal( resultadoTaxaMaster.resultadoTarifaResultado ) );

		$( "#bbcpsuperB").html( formataReal( resultadoTaxaSuper.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpsuperA").html( formataReal( resultadoTaxaSuper.resultadoTarifaMigracao ) );
		$( "#bbcpsuperC").html( formataReal( resultadoTaxaSuper.resultadoTarifaResultado ) );

		$( "#bbcppremiumB").html( formataReal( resultadoTaxaPremium.resultadoTarifaNovaAplicacao ) );
		$( "#bbcppremiumA").html( formataReal( resultadoTaxaPremium.resultadoTarifaMigracao ) );
		$( "#bbcppremiumC").html( formataReal( resultadoTaxaPremium.resultadoTarifaResultado ) );

		$( "#bbcprefB").html( formataReal( resultadoTaxaRef.resultadoTarifaNovaAplicacao ) );
		$( "#bbcprefA").html( formataReal( resultadoTaxaRef.resultadoTarifaMigracao ) );
		$( "#bbcprefC").html( formataReal( resultadoTaxaRef.resultadoTarifaResultado ) );
		
	}
	
	function executarFormula(taxa, valor){
		taxa = taxa/100;
		var resultado = (taxa / diasUteisAno) * diasUteisMes * valor;
		return resultado;
	}
	
	function calculos (taxaAtual, taxaMigracao, valorAtual, valorNovaAplicacao){
		this.taxaAtual = taxaAtual;
		this.taxaMigracao = taxaMigracao;
		this.valorAtual = valorAtual;
		this.valorNovaAplicacao = valorNovaAplicacao;
		
		this.resultadoTarifaNovaAplicacao = calculaFormula(this.taxaAtual, this.valorNovaAplicacao);
		this.resultadoTarifaAtual = calculaFormula(this.taxaAtual, this.valorAtual);
		this.resultadoTarifaMigracao = calculaFormula(this.taxaMigracao, this.valorAtual);
		this.resultadoTarifaResultado = this.resultadoTarifaAtual - this.resultadoTarifaMigracao + this.resultadoTarifaNovaAplicacao;
		
		function calculaFormula(taxa, valor){
			taxa = taxa/100;
			var resultado = (taxa / diasUteisAno) * diasUteisMes * valor;
			return resultado;
		}
		
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
	
	function carregarComboTarifas(){
		for(var i = 0 ; i < listaDeFundos.length ; i ++){
			$('#selecaotarifas').append($("<option></option>").attr("value",listaDeFundos[i][1]).text(listaDeFundos[i][0]));
		}
	}
	
	