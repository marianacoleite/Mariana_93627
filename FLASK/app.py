
#Incluir a biblioteca do flask
from flask import Flask, render_template, jsonify
app = Flask(__name__)


# Página principal
@app.route('/')
def home():return render_template('index.html')



# API simples
@app.route('/api/mensagem')
def mensagem():return jsonify({'mensagem': 'Olá, mundo!'})

# Iniciar o site
if __name__ == '__main__':app.run(debug=True)


#200 - ok seguirdor api
#404 not found - erro 
#403 - acesso negado