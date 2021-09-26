const express = require('express');
const app = express();
var cors = require('cors');
const {v4: uuid} = require('uuid')
app.use(express.json())

const alunos = []

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get('/alunos', (req, res) => {
    res.send(alunos)
})

app.post('/alunos/cadastro', (req, res) => {
    const dados = req.body
    alunos.push({
      id: uuid(),
      ...dados
    })
    return res.send("Aluno cadastrado")
  
  })
  
  app.put('/alunos/alterar/:id', (req, res) => {
    const dados = req.body
  
    const id = req.params.id
    const indexAluno = alunos.findIndex((aluno) => aluno.id == id)
    if(indexAluno == -1){
      res.send("Aluno não encontrado")
    }
  
    alunos[indexAluno] = {id, ...dados}
    res.send("Aluno alterado com sucesso", id, indexAluno)
  })
  

app.listen(process.env.PORT || 3000, function() {
    console.log('API rodando na porta 3000', '');
});