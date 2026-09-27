const express = require('express');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const port = 3000;

// Permite receber dados em JSON no corpo das requisições
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send('Home');
});

// Rota "sobre"
app.get('/sobre', (req, res) => {
    res.send('Sobre');
});

// Rotas de usuários
app.use('/usuarios', usuariosRoutes);

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