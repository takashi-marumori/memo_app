const express = require('express');
const mysql = require('mysql');
const app = express();
const env = require('dotenv').config()
const session = require('express-session');
const bcrypt = require('bcrypt');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.NODE_PASS,
  database: 'memo_app'
});

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE items SET name = ? WHERE id =?',
    [req.body.itemName,req.params.id],
    (error,results) => {
      res.redirect('/index');
    });

});

app.post('/sign_up',(req,res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      res.render('sign_up.ejs', {users: results});
    }
  );
});

app.post('/log_in', (req,res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error,results) => {
      if(results.length > 0){
        if(req.body.password === results[0].password){
          console.log('成功');
          res.redirect('top');
        } else{
          console.log('失敗');
          res.redirect('top');
        }
      } else {
        res.redirect('top');
      }
    }
  )
});

app.listen(3000);