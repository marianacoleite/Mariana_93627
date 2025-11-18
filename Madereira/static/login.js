async function fazerLogin() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const erro = document.getElementById("erro");

  erro.textContent = "";  // Limpa qualquer erro anterior

  if (!usuario || !senha) {
    erro.textContent = "Preencha usuário e senha.";
    return;
  }

  try {
    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await resposta.json();

    if (resposta.ok) {
      // Se o login for bem-sucedido, redireciona para /produtos
      window.location.href = "/produtos";
    } else {
      erro.textContent = data.mensagem || "Usuário ou senha inválidos.";
    }
  } catch (e) {
    erro.textContent = "Erro ao conectar ao servidor.";
    console.error(e);
  }
}
