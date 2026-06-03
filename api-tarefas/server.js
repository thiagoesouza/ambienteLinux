const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

let tarefas = [
    {id: 1, titulo: 'Estudar Express', concluida: false},
    {id: 2, titulo: 'Fazer Exercícios', concluida: true},
    {id: 3, titulo: 'Revisar Middlewares', concluida: false}
]

let proximoId = 4

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Tarefas funcionando!'})
})

app.get('/tarefas', (req, res) => {
    const { concluida } = req.query

    if (concluida !== undefined) {
        const status = concluida === 'true'
        const tarefasFiltradas = tarefas.filter(t => t.concluida === status)

        return res.json({
            total: tarefasFiltradas.length,
            tarefas: tarefasFiltradas
        })
    }

    res.json({
        total: tarefas.length,
        tarefas: tarefas
    })
})

app.get('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const tarefa = tarefas.find(t => t.id === id)

    if(!tarefa){
        return res.status(404).json({
            erro: `Tarefa com ID ${id} não encontrado`
        })
    }  
    res.json(tarefa)
})

app.post('/tarefas', (req, res) => {
    const {titulo} = req.body
    
    if(!titulo) {
        return res.status(400).json({
         erro: 'O campo título é obrigatório'
        })
    }

    const novaTarefa = {
        id: proximoId,
        titulo: titulo,
        concluida: false
    }

    tarefas.push(novaTarefa)
    proximoId++

    res.status(201).json({
        mensagem: 'Tarefa criada com sucesso!',
        tarefa: novaTarefa
    })
})

app.put('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({
            erro: `Tarefa com ID ${id} não encontrada`
        })
    }

    const { titulo, concluida } = req.body

    if (!titulo) {
        return res.status(400).json({
            erro: 'O campo "titulo" é obrigatório'
        })
    }

    // Substitui completamente a tarefa
    tarefas[index] = {
        id: id,
        titulo: titulo,
        concluida: concluida || false
    }

    res.json({
        mensagem: 'Tarefa atualizada completamente!',
        tarefa: tarefas[index]
    })
})

app.patch('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({
            erro: `Tarefa com ID ${id} não encontrada`
        })
    }

    // Atualiza apenas os campos enviados
    if (req.body.titulo !== undefined) {
        tarefas[index].titulo = req.body.titulo
    }

    if (req.body.concluida !== undefined) {
        tarefas[index].concluida = req.body.concluida
    }

    res.json({
        mensagem: 'Tarefa atualizada parcialmente!',
        tarefa: tarefas[index]
    })
})

app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return res.status(404).json({
            erro: `Tarefa com ID ${id} não encontrada`
        })
    }

    const tarefaRemovida = tarefas[index]
    tarefas.splice(index, 1)

    res.json({
        mensagem: 'Tarefa removida com sucesso!',
        tarefa: tarefaRemovida
    })
})

app.use((req, res) => {
    res.status(404).json({
        erro: `Rota ${req.method} ${req.originalUrl} não encontrada`
    })
})

// Erro interno do servidor
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        erro: 'Erro interno do servidor'
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})