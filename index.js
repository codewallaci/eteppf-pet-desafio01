const express = require('express');
const app = express();
var cors = require('cors');
const {v4: uuid} = require('uuid')
app.use(express.json())

//Constante do tipo array que vai salvar todos os produtos cadastrados na API.
const produtos = []

//Cors é responsável por fornecer ao Express um middleware que permite lidar com requisições externas.
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

//Requisição padrão para ter todos os produtos.
app.get('/api/produtos', (req, res) => {
    res.send(produtos)
})

//Método de post para cadastrar novos produtos.
app.post('/api/produtos/cadastro', (req, res) => {
    const dados = req.body
    produtos.push({
      id: uuid(),
      ...dados
    })
    return res.send('Produto cadastrado com sucesso.')
  
})

//Método para obter informações de um produto específico com o id do mesmo.
app.get('/api/produtos/:id', (req, res) =>{
 
    const id = req.params.id
    const indexProduto = produtos.findIndex((produto) => produto.id == id)
    const idEProdutos = [produtos[indexProduto]]

    if(indexProduto == -1){
        return res.send('Produto não encontrado.')
    }
        res.json(idEProdutos)
})

//Método para alterar um produto com o id dele.
app.put('/api/produtos/alterar/:id', (req, res) => {
    const dados = req.body
    const id = req.params.id
    const indexProduto = produtos.findIndex((produto) => produto.id == id)
    
    if(indexProduto == -1){
        return res.send('Produto não encontrado.' + indexProduto)
    }
        produtos[indexProduto] = {id, ...dados}
        res.send('Produto alterado com sucesso.', id, indexProduto)
})

//Método para apagar um produto usando o id dele.
app.delete('/api/produtos/deletar/:id', (req, res) => {
    const id = req.params.id
    const indexProduto = produtos.findIndex((produto) => produto.id == id)
    
    if(indexProduto == -1){
        return res.send('Produto não encontrado.')       
    }
        produtos.splice(indexProduto, 1)
        res.send('Produto removido com sucesso.')
})

//Inicio da aplicação.
app.listen(process.env.PORT || 3000, function() {
    console.log('API iniciando na porta 3000', '');
});