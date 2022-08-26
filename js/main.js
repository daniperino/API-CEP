
//Limpar o formulário toda vez que for fazer uma nova a pesquisa e retornar vazio.
const limparFormulario = (endereco) => { 
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Variável recebe um argumento endereco
const preencherFormulario = (endereco) => {
/*Pega a caixinha de texto rua/bairro/cidade/estado e retorna o elemento endereco, 
recebe o endereco(value) e retorna o logradouro/bairro/localidade/uf do json (como está no Via Cep)*/  
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

/*Const criada para verificar se o usuário digitou somente números. 
Expressão regular fica entre barras (//), foi criado uma lista de [0-9], 
o (^) significa que precisa começar com número, 
o sinal de (+) siginifica que todos precisam ser números e 
($) significa fim (termina com número também).
Tudo isso vai ser verificado no cep com o .test(numero)*/
const somenteNumero = (numero) => /^[0-9]+$/.test(numero);

/*Variável recebe uma arrow (=>) que vai receber como argumento cep e retorna 
um cep de tamanho 8 e somente números, (vai ser true)*/ 
const cepCorreto = (cep) => cep.length == 8 && somenteNumero(cep);

//Função assíncrona(async) para resolver a promise(const dados).
const pesquisarCep = async() => { 
    //Limpa o formulário quando faz uma nova pesquisa.    
    limparFormulario();   
    //Pega o elemento de ID cep e também o que o usuário digitou na caixinha(cep).
    const cep = document.getElementById('cep').value;

    //Como o cep é dinâmico usa-se acento gráfico ``(template string) e troca o cep da url por ${cep}
    const url = `http://viacep.com.br/ws/${cep}/json/`;  

    //Se o cep estiver correto busca o cep.
    if(cepCorreto(cep)){
    /*Variável para receber a promise(dados) - await espera a promise ser resolvida para depois 
    continuar rodando o código e fetch busca a url.*/
    const dados = await fetch(url); 
    //Variável endereco aguarda os dados do método json
    const endereco = await dados.json();
   
    /*Antes de preencher o formulário, precisa corrigir possíveis erros de cep. 
    Se retornar(true) com o valor 'erro' dar os alerts.*/
    if(endereco.hasOwnProperty('erro')){
        alert("CEP não encontrado! \nDigite um CEP valido!"); 
    //Se não pega o endereco e preenche o formulário (const preencherFormulario).           
    }else{
    preencherFormulario(endereco);
}
    }else{
        alert("Digite um CEP valido! \nDigite somente números!");
    } 
    
}
//Retorna o elemento de ID cep
document.getElementById('cep')
//Após digitar o cep e apertar enviar vai sair do foco acionar a função pesquisarCep                         
        .addEventListener('focusout', pesquisarCep);     
