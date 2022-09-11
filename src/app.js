const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { PORT = 3005 } = process.env;

const app = express();

app.get('/', (req, resp) => {
    resp.status(200);
    resp.send('Hello world!');
});

app.get('/users', (req, resp) => {
    resp.status(200);
    resp.send('Here are users!');
});

app.get('/books', (req, resp) => {
    resp.status(200);
    resp.send('Here are books!');
});

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}/`);
})
