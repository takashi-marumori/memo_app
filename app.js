const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const env = require('dotenv').config()
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

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = 'ゲスト';
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

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
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  bcrypt.hash(password,10,(error,hash) => {
    connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hash],
      (error, results) => {
        req.session.userId = results.insertId;
        req.session.username = username;
        res.redirect('/');
      }
    );
  });
});

app.post('/log_in', (req, res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        const plain = req.body.password;
        const hash = results[0].password;
        bcrypt.compare(plain,hash,(error,isEqual) => {
          if(isEqual){
          req.session.userId = results[0].id;
            req.session.username = results[0].username;
            res.redirect('/');
          } else {
            res.redirect('/');
          }
        });
      } else {
        res.redirect('/');
      }
    }
  );
});

app.get('/log_out', (req, res) => {
  req.session.destroy(error => {
    res.redirect('/');
  });
});

app.listen(3000);