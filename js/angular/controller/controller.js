app.controller('appctrl',function($scope,ngDialog){


var caminhoimagem = "imagens/semimagem.jpg";
$scope.codigo;
$scope.linhadigitavel;
$scope.linha;
$scope.mensagem;
$scope.vencimento;
$scope.valor;
$scope.barra;
$scope.imagem =  caminhoimagem;


///////////////////

$scope.linha =null;
$scope.vencimento=null;
$scope.valor = null;
	




$scope.limpaCampo = function()
{

	$scope.barra = null;
	$scope.linha = null;
    $scope.mensagem = null;
    $scope.linhadigitavel = null;
    $scope.valor = null;
    $scope.imagem =caminhoimagem;
	location.reload();

};




function buscaLogo(banco)
{
	
	$scope.imagem ="imagens/"+banco+".png";
	
	
}



function geraLinha(linha)
{
	
	
	
	if(linha.length != 44)
	{
	  $scope.linha =null; 
	  $scope.vencimento = null;
	  $scope.valor = null;
	  $scope.barra = null;
	  
	  alert("Código de Barras Inválido, deve possuir 44 caracteres!");
	  
	
	 
	  
	  return
	  
	  
	   
	}
	
	
	var campo1 = linha.substr(0,4)+linha.substr(19,1)+'.'+linha.substr(20,4);
	var campo2 = linha.substr(24,5)+'.'+linha.substr(29,5);	
	var campo3 = linha.substr(34,5)+'.'+linha.substr(39,5);
	var campo4 = linha.substr(4,1); // Digito verificador
	var campo5 = linha.substr(5,14); //Vencimento + valor 
	
	
	
	buscaLogo(campo1.substr(0,3));
	
	
	
/*	if( modulo11(linha.substr(0,4)+campo5+campo2+campo3) != campo4)
	{
		$scope.linha =null;
		
		 alert("Digito verificador "+campo4+" o correto é "+ +modulo11(linha.substr(0,4)+campo5+campo2+campo3));
		return
	}
	*/
	
	if(campo5 == 0)
	{
		campo5 = '000';
	}
	
	$scope.linha =  "Linha Digitável: "+campo1 + modulo10(campo1)
						+' '
            +campo2 + modulo10(campo2) 
            +' '
            +campo3 + modulo10(campo3)
            +' '
            +campo4
            +' '
            +campo5;
	
  $scope.vencimento ="Vencimento: "+fatorVencimento(campo5);  
  $scope.valor = "Valor: "+calculaValor(campo5);
     

}
//23794.13004 00000.000000 03002.014102 1 33680000016545
//BBBMC.CCCCd CCCCC.CCCCCd CCCCC.CCCCCd D VVVVVVVVVVVVVV

function geraBarra(barra)

{
	
	if(barra.length != 54)
	{
	  
	  
	  alert("Linha digitável inválida deve possuir 54 caracteres!");
	  
	
	 
	  
	  return
	}
	
	
	buscaLogo(barra.substr(0,3));
	
	var campo1 = barra.substr(0,4)+barra.substr(38,1)+barra.substr(40,14);
	var campo2 = barra.substr(4,1)+barra.substr(6,4)+barra.substr(12,5)+barra.substr(19,5);
	var campo3 = barra.substr(25,5)+barra.substr(31,5);
	$scope.linha = "Código de Barras: "+campo1+campo2+campo3;
	
};


$scope.gera= function(){
	
	
	
	
	var linha;
	
	
	if($scope.barra == null && $scope.linhadigitavel ==null)
	{
		 alert("Campos em branco, preencher um campo!");
		
		 return;
	}
	
	
	
	if($scope.barra != null && $scope.linhadigitavel !=null)
	{
		 alert("Somente pode preencher um campo!");
		 
		 limpaCampo();
		 
		 return;
	}
	
	if($scope.barra != null)
	{
		
		geraLinha($scope.barra);
			
	}
	
	if($scope.linhadigitavel !=null)
	{
		
		geraBarra($scope.linhadigitavel);
		
	}
	
	
	
	
};


function fatorVencimento(campo)
{
	
	var vencimento = campo.substr(0,4);
	var date = new Date('10/07/1997');
	
	date.setTime(date.getTime()+(vencimento *24*60*60*1000));
	
	return data =(("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear());;
	
	
}



function calculaValor(campo)
{
	var valor = campo.substr(5,10);
	
	valor = valor*1;
	
	return  parseFloat(valor/100).toFixed(2).replace('.',',');
}

function modulo10(numero)
{
	numero = numero.replace(' ','').replace('.','');
   	var soma = 0;
   	var peso = 2;
   	var contador = numero.length-1;
   	
   	while(contador >=0)
   	{
   		var mult = numero.substr(contador,1)*peso;
   		
   		if(mult >=10)
   		{
   			mult = 1+(mult-10);
   		}
   		
   		soma = soma+mult;
   		if(peso ==2)
   		{
   			peso=1;
   		}
   		else
   		{
   			peso=2;
   		}
   		
   		contador = contador-1;
   	
   	}
   	
   	var digito =10-(soma % 10);
   	
   	if(digito == 10)
   	    digito =0;
   	    
   	  return digito;  
   
};
	
  function modulo11(numero)
  {
  
  	numero = numero.replace(' ','').replace('.','');
  	var base =9;
  	var resto = 0;
  	var soma = 0;
  	var fator = 2;
  	var numeros = [];
  	var parcial = [];
  	
  	numeros = numero.length;
  	parcial = numero.length;
  	
  	for(i = numero.length;i>=0;i--)
  	{
  		numeros [i] = numero.substr(i-1,i);
  		parcial [i] = numeros[i]* fator;
  		
  		soma += parseInt(parcial[i]);
  		
  		if(fator == base)
  		{
  			fator =1;
  		}
  		else{
  		fator++}
  	}
  	
  	if(resto == 0)
  	{
  		soma *=10;
  		var digito = soma % 11;
  		
  		if(digito == 10)
  		{
  			digito = 0;
  		}
  		return digito;
  	}else {
  		resto = soma%11
  		return resto;
  	}
  	
  	
  };
  


});


app.controller('dialogctrl', function ($scope){
	
	
	$scope.mensagem;
	
	
});
