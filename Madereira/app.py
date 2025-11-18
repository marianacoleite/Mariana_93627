from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import mysql.connector

app = Flask(__name__)
app.secret_key = "chave-super-secreta"  # Qualquer chave secreta para segurança de sessões


# ==============================
#  CONEXÃO COM O BANCO
# ==============================
def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # coloque sua senha do MySQL se tiver
        database="madereira"
    )


# ==============================
#  ROTA LOGIN (TELA)
# ==============================
@app.route("/")
def tela_login():
    return render_template("index.html")  # Página de login


# ==============================
#  ROTA LISTA (TELA)
# ==============================
@app.route("/produtos")
def pagina_produtos():
    if "usuario" not in session:
        return redirect(url_for("tela_login"))  # Redireciona para o login se não estiver autenticado

    return render_template("lista.html")  # Página de lista de produtos


# ==============================
#  API LOGIN (VALIDAÇÃO)
# ==============================
@app.route("/api/login", methods=["POST"])
def api_login():
    dados = request.get_json()
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    con = conectar()
    cur = con.cursor()
    sql = "SELECT * FROM usuario WHERE usuario=%s AND senha=%s"
    cur.execute(sql, (usuario, senha))
    resultado = cur.fetchone()
    con.close()

    if resultado:
        session["usuario"] = usuario  # Salva o usuário na sessão
        return jsonify({"ok": True})
    else:
        return jsonify({"ok": False, "mensagem": "Usuário ou senha inválidos."}), 401


# ==============================
#  API LISTAR PRODUTOS
# ==============================
@app.route("/api/produtos", methods=["GET"])
def api_listar_produtos():
    if "usuario" not in session:  # Verifica se o usuário está logado
        return jsonify({"erro": "não autorizado"}), 401

    con = conectar()
    cur = con.cursor()
    cur.execute("SELECT id, nome, quantidade, valor FROM madeira")
    linhas = cur.fetchall()
    con.close()

    produtos = []
    for linha in linhas:
        produtos.append({
            "id": linha[0],
            "nome": linha[1],
            "quantidade": linha[2],
            "valor": float(linha[3])
        })

    return jsonify(produtos)  # Retorna os produtos em formato JSON


# ==============================
#  API CRIAR PRODUTO
# ==============================
@app.route("/api/produtos", methods=["POST"])
def api_criar_produto():
    if "usuario" not in session:  # Verifica se o usuário está logado
        return jsonify({"erro": "não autorizado"}), 401

    dados = request.get_json()
    nome = dados.get("nome")
    quantidade = dados.get("quantidade")
    valor = dados.get("valor")

    con = conectar()
    cur = con.cursor()
    sql = "INSERT INTO madeira (nome, quantidade, valor) VALUES (%s, %s, %s)"
    cur.execute(sql, (nome, quantidade, valor))
    con.commit()
    con.close()

    return jsonify({"mensagem": "Produto salvo com sucesso!"}), 201


# ==============================
#  INICIAR SERVIDOR
# ==============================
if __name__ == "__main__":
    app.run(debug=True)
