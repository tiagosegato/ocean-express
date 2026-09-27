const express = require('express');
const app = express();
const port = 3000;

// Permite receber dados em JSON no corpo das requisições
app.use(express.json());

// Dados em memória (simulando um banco de dados)
const usuarios = [
    { nome: 'Tiago', idade: 39 },
    { nome: 'Alessandra', idade: 38 },
    { nome: 'Maria', idade: 69 }
];

// Rota inicial
app.get('/', (req, res) => {
    res.send('Home do CRUD');
});

// Rota "sobre"
app.get('/sobre', (req, res) => {
    res.send('Sobre o CRUD');
});

// Read all: lista todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Read: busca um usuário pelo id (posição no array)
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    if (!usuarios[id]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuarios[id]);
});

// Create: adiciona um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, idade } = req.body;
    if (!nome || !idade) {
        return res.status(400).json({ erro: 'Nome e idade são obrigatórios' });
    }
    usuarios.push(req.body);
    res.status(201).json(usuarios);
});

// Update: substitui o usuário na posição indicada
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    if (!usuarios[id]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    if (!nome || !idade) {
        return res.status(400).json({ erro: 'Nome e idade são obrigatórios' });
    }
    usuarios[id] = req.body;
    res.json(usuarios);
});

// Delete: remove o usuário na posição indicada
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    if (!usuarios[id]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    usuarios.splice(id, 1);
    res.json(usuarios);
});

// Rota para simular um erro (apenas para teste)
app.get('/erro', (req, res) => {
    throw new Error('Erro simulado');
});

// Middleware de erro: captura erros inesperados
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});