const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()  => {
    return new Date().getFullYear();
});

app.use((req,res,next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync('server.log',log + '\n');
  next();
});

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) => {
  res.render('root.hbs',{
    pageTitle : 'Home page'
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});

app.get('/bad',(req,res) =>{
  res.send('Bad page');
});

app.listen(port,() => {
  console.log(`Server up and running in ${port}`);
});
