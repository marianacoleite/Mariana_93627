// Array de produtos em memória
let produtos = [];
let proximoId = 1;

// Referências aos elementos
const modal = document.getElementById("produtoModal");
const btnNovoProduto = document.getElementById("btnNovoProduto");
const btnFecharModal = document.getElementById("fecharModal");
const btnCancelarModal = document.getElementById("cancelarModal");
const formProduto = document.getElementById("formProduto");
const tabelaBody = document.querySelector("#tabelaProdutos tbody");

// ---- FUNÇÕES DE MODAL ----
function abrirModal() {
  modal.classList.add("aberto");
}

function fecharModal() {
  modal.classList.remove("aberto");
  formProduto.reset();
}

// ---- FUNÇÃO PARA RENDERIZAR A TABELA ----
function renderizarTabela() {
  tabelaBody.innerHTML = "";

  produtos.forEach((produto) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = produto.id;

    const tdNome = document.createElement("td");
    tdNome.textContent = produto.nome;

    const tdQtd = document.createElement("td");
    tdQtd.textContent = produto.quantidade;

    const tdValor = document.createElement("td");
    tdValor.textContent = produto.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdQtd);
    tr.appendChild(tdValor);

    tabelaBody.appendChild(tr);
  });
}

// ---- EVENTOS ----
btnNovoProduto.addEventListener("click", abrirModal);

btnFecharModal.addEventListener("click", fecharModal);
btnCancelarModal.addEventListener("click", fecharModal);

// Fecha modal clicando fora
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

// Submit do formulário
formProduto.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nomeProduto").value.trim();
  const quantidade = Number(
    document.getElementById("quantidadeProduto").value
  );
  const valor = Number(document.getElementById("valorProduto").value);

  if (!nome || quantidade <= 0 || valor < 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novoProduto = {
    id: proximoId++,
    nome,
    quantidade,
    valor,
  };

  produtos.push(novoProduto);
  renderizarTabela();
  fecharModal();
});
