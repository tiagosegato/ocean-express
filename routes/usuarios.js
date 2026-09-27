const express = require('express');
const router = express.Router();

// Dados em memória (simulando um banco de dados)
const usuarios = [
    { nome: 'Tiago', idade: 38 },
    { nome: 'Alessandra', idade: 36 },
    { nome: 'Maria', idade: 79 }
];

// Read: lista todos os usuários
router.get('/', (req, res) => {
    res.json(usuarios);
});

// Read: busca um usuário pelo id (posição no array)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!usuarios[id]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuarios[id]);
});

// Create: adiciona um novo usuário
router.post('/', (req, res) => {
    const { nome, idade } = req.body;
    if (!nome || !idade) {
        return res.status(400).json({ erro: 'Nome e idade são obrigatórios' });
    }
    usuarios.push(req.body);
    res.status(201).json(usuarios);
});

// Update: substitui o usuário na posição indicada
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!usuarios[id]) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    usuarios.splice(id, 1);
    res.json(usuarios);
});

module.exports = router;