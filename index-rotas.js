const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/sobre', (req, res) => {
    res.send('Sobre');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

