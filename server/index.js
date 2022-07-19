const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve('build','index.html'));
});

app.get('/bundle.js', (req, res) => {
    res.sendFile(path.resolve('build', 'bundle.js'));
})

app.listen(PORT, () => {
    console.log('Server is listening to PORT', PORT);
});