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
		resultado = numeroParaMoeda(resultado);
		
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
				
		$( "#bbcpsupremoB").html( numeroParaMoeda( resultadoTaxaSupremo.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpsupremoA").html( numeroParaMoeda( resultadoTaxaSupremo.resultadoTarifaMigracao ) );
		$( "#bbcpsupremoC").html( numeroParaMoeda( resultadoTaxaSupremo.resultadoTarifaResultado ) );

		$( "#bbcpclassicoB").html( numeroParaMoeda( resultadoTaxaClassico.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpclassicoA").html( numeroParaMoeda( resultadoTaxaClassico.resultadoTarifaMigracao ) );
		$( "#bbcpclassicoC").html( numeroParaMoeda( resultadoTaxaClassico.resultadoTarifaResultado ) );

		$( "#bbcpsoberanoB").html( numeroParaMoeda( resultadoTaxaSoberano.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpsoberanoA").html( numeroParaMoeda( resultadoTaxaSoberano.resultadoTarifaMigracao ) );
		$( "#bbcpsoberanoC").html( numeroParaMoeda( resultadoTaxaSoberano.resultadoTarifaResultado ) );

		$( "#bbcpabsolutoB").html( numeroParaMoeda( resultadoTaxaAbsoluto.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpabsolutoA").html( numeroParaMoeda( resultadoTaxaAbsoluto.resultadoTarifaMigracao ) );
		$( "#bbcpabsolutoC").html( numeroParaMoeda( resultadoTaxaAbsoluto.resultadoTarifaResultado ) );

		$( "#bbcpdiferenciadoB").html( numeroParaMoeda( resultadoTaxaDiferenciado.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpdiferenciadoA").html( numeroParaMoeda( resultadoTaxaDiferenciado.resultadoTarifaMigracao ) );
		$( "#bbcpdiferenciadoC").html( numeroParaMoeda( resultadoTaxaDiferenciado.resultadoTarifaResultado ) );

		$( "#bbcpmasterB").html( numeroParaMoeda( resultadoTaxaMaster.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpmasterA").html( numeroParaMoeda( resultadoTaxaMaster.resultadoTarifaMigracao ) );
		$( "#bbcpmasterC").html( numeroParaMoeda( resultadoTaxaMaster.resultadoTarifaResultado ) );

		$( "#bbcpsuperB").html( numeroParaMoeda( resultadoTaxaSuper.resultadoTarifaNovaAplicacao ) );
		$( "#bbcpsuperA").html( numeroParaMoeda( resultadoTaxaSuper.resultadoTarifaMigracao ) );
		$( "#bbcpsuperC").html( numeroParaMoeda( resultadoTaxaSuper.resultadoTarifaResultado ) );

		$( "#bbcppremiumB").html( numeroParaMoeda( resultadoTaxaPremium.resultadoTarifaNovaAplicacao ) );
		$( "#bbcppremiumA").html( numeroParaMoeda( resultadoTaxaPremium.resultadoTarifaMigracao ) );
		$( "#bbcppremiumC").html( numeroParaMoeda( resultadoTaxaPremium.resultadoTarifaResultado ) );

		$( "#bbcprefB").html( numeroParaMoeda( resultadoTaxaRef.resultadoTarifaNovaAplicacao ) );
		$( "#bbcprefA").html( numeroParaMoeda( resultadoTaxaRef.resultadoTarifaMigracao ) );
		$( "#bbcprefC").html( numeroParaMoeda( resultadoTaxaRef.resultadoTarifaResultado ) );
		
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
		this.resultadoTarifaResultado = - this.resultadoTarifaAtual + this.resultadoTarifaMigracao + this.resultadoTarifaNovaAplicacao;
		
		function calculaFormula(taxa, valor){
			taxa = taxa/100;
			var resultado = (taxa / diasUteisAno) * diasUteisMes * valor;
			return resultado;
		}
		
	}
	function numeroParaMoeda(n, c, d, t){
		var xyz;
		var negativo = false;
		if(n < 0)
			negativo = true;
		c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		xyz =  s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		if(negativo)
			xyz = "<span class='red'>" + xyz + "</span>";
		return xyz;
	}
	
	function carregarComboTarifas(){
		for(var i = 0 ; i < listaDeFundos.length ; i ++){
			$('#selecaotarifas').append($("<option></option>").attr("value",listaDeFundos[i][1]).text(listaDeFundos[i][0]));
		}
	}
	
	