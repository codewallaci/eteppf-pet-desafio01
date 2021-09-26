const express = require('express')
const app = express()
const cors = require('cors')

app.use(
    cors({
        credentials: true,
        origin: true
    })
)

app.options('*', cors())

app.get('/api/produtos', (req, res) =>{
    res.send("Bem vindo")
})

app.listen(3000, () => {
    console.log('API iniciando na porta 3000')
})