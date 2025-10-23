function consultarCnpj(){

    //Obtem o valor do campo cep
    const cnpj = document.getElementById('cnpj').value;

    //verificar se o cep tem 8 digitos 
    if(cnpj.length !==14) {
        alert("Por favor, digite um CNPJ valido de 15 digitos. ");
        return; //interrompe a execução da funçao se o cep for invalido
    }


    //URL da API de cep(usando o serviço viacep como exemplo)
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;    //Lembra de colocar o $ se nao nao vai




    //Faz uma requisição a API para obter os dados do cep

    fetch(url)
    .then(response=> response.json())  //converte a resposta em json
    .then(data =>{
        //verifica se o cep foi encontrado
        if(data.erro) {
            alert("Cnpj não encontrado.");
            return //interrompe a execução se o cep não for valido
        }
        //atualiza os campos no formulario com os dados retornados pela Api
        
        document.getElementById('porte').textContent = data.porte;
        document.getElementById('razao').textContent = data.razao_social;
        document.getElementById('fantasia').textContent = data.nome_fantasia;
        document.getElementById('estado').textContent = data.uf;
    })

    .catch(error =>{
        console.error("Erro ao consultar o CNPJ:",error); //Loga erros no
        alert("Ocorreu um erro ao consultar o CNPJ");
    });

}