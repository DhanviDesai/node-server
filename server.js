const express = require('express');
const fs = require('fs');

var app = express();

app.use((req,res,next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync('server.log',log + '\n');
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.get('/',(req,res) => {
  res.render('root.hbs',{
    pageTitle : 'Home page',
    currentYear : new Date().getFullYear()
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : 'About Page',
    currentYear : new Date().getFullYear()
  });
});

app.get('/bad',(req,res) =>{
  res.send('Bad page');
});

app.listen(3000,() => {
  console.log('Server up and running');
});
