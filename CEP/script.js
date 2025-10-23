/*Funçao que sera chamda ao clicar o botao */

function consultarCep(){

    //Obtem o valor do campo cep
    const cep = document.getElementById('cep').value;

    //verificar se o cep tem 8 digitos 
    if(cep.length !==8) {
        alert("Por favor, digite um cep valido de 8 digitos. ");
        return; //interrompe a execução da funçao se o cep for invalido
    }


    //URL da API de cep(usando o serviço viacep como exemplo)
    const url = `https://h-apigateway.conectagov.np.estaleiro.serpro.gov.br/api-cnpj-empresa/v2/empresa/{CNPJempresa}`;




    //Faz uma requisição a API para obter os dados do cep

    fetch(url)
    .then(response=> response.json())  //converte a resposta em json
    .then(data =>{
        //verifica se o cep foi encontrado
        if(data.erro) {
            alert("Cep não encontrado.");
            return //interrompe a execução se o cep não for valido
        }
        //atualiza os campos no formulario com os dados retornados pela Api
        document.getElementById('rua').textContent = data.logradouro;
        document.getElementById('bairro').textContent = data.bairro;
        document.getElementById('cidade').textContent = data.localidade;
        document.getElementById('estado').textContent = data.uf;
    })

    .catch(error =>{
        console.error("Erro ao consultar o CEP:",error); //Loga erros no
        alert("Ocorreu um erro ao consultar o CEP");
    });

}