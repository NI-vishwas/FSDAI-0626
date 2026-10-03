const mysql = require('mysql');
const express = require('express');
const path = require('path');
// use ejs template engine

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const rows = [
    { id: 1, name: 'John Doe', email: 'john.doe@gmail.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

app.get('/', (req, res) => {
    res.render('index', { rows: rows });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 