//funcao para validar formulario
function validateForm(){
    //obtem os valores dos campo de iput pelo id
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let confirmesenha = document.getElementById('confirmesenha').value;
     //
    let erroMSG = document.getElementById('error');


// limpar qualquer mesg de error anterior
erroMSG.textContent ='';

if(nome ===''){

    erroMSG.textContent = 'Por favor, insira seu nome.';
    return false;
}

if(email ===''){

    erroMSG.textContent = 'Por favor, insira seu email.';
    return false;
}

if(senha ===''){

    erroMSG.textContent = 'Por favor, insira sua senha.';
    return false;

}

if(senha !== confirmesenha){

    erroMSG.textContent = 'As senhas não coincidem';
    return false;}

if(confirmesenha ===''){

    erroMSG.textContent = 'Por favor, confirme sua senha.';
    return false;
}

return true;

}