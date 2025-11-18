// REFERÊNCIAS
const modal = document.getElementById("produtoModal");
const btnNovoProduto = document.getElementById("btnNovoProduto");
const btnFecharModal = document.getElementById("fecharModal");
const btnCancelarModal = document.getElementById("cancelarModal");
const formProduto = document.getElementById("formProduto");
const tabelaBody = document.querySelector("#tabelaProdutos tbody");


// ==============================
// MODAL
// ==============================
function abrirModal() {
  modal.classList.add("aberto");
}

function fecharModal() {
  modal.classList.remove("aberto");
  formProduto.reset();
}

btnNovoProduto.addEventListener("click", abrirModal);
btnFecharModal.addEventListener("click", fecharModal);
btnCancelarModal.addEventListener("click", fecharModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});


// ==============================
// CARREGAR PRODUTOS DO BANCO
// ==============================
async function carregarProdutos() {
  tabelaBody.innerHTML = "";

  try {
    const resposta = await fetch("/api/produtos");
    if (!resposta.ok) throw new Error("Erro ao carregar");

    const produtos = await resposta.json();

    produtos.forEach((produto) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>${Number(produto.valor).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })}</td>
      `;

      tabelaBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar produtos.");
  }
}


// ==============================
// SALVAR PRODUTO NO BANCO
// ==============================
formProduto.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nomeProduto").value.trim();
  const quantidade = Number(document.getElementById("quantidadeProduto").value);
  const valor = Number(document.getElementById("valorProduto").value);

  if (!nome || quantidade <= 0 || valor < 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novoProduto = { nome, quantidade, valor };

  try {
    const resposta = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto),
    });

    if (!resposta.ok) throw new Error("Erro ao salvar");

    fecharModal();
    carregarProdutos();

  } catch (err) {
    console.error(err);
    alert("Erro ao salvar o produto.");
  }
});


// ==============================
// INICIAR TABELA
// ==============================
window.addEventListener("DOMContentLoaded", carregarProdutos);
