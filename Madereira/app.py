from flask import Flask, render_template,request, redirect
import mysql.connector
app = Flask(__name__)

def conectar():
    return mysql.connector(
        host="localhost",
        user="root",
        password="",
        database="madereira"
    )

@app.route('/')
def index():
    con = conectar()
    cur = con.cursor()
    cur.execute("SELECT * FROM produto")
    produto = cur.fetchall()
    con.close()
    return render_template('index.html', produto=produto)


@app.route('/cadastro')
def cadastrar():
    return render_template('cadastro.html')

@app.route('/salvar')