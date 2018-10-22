const express=require('express');
const hbs = require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}:${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('unable to append the server.log.');
    }
  });
  next();
});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getcurrentYear',()=>{
return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
//  res.send('<h1>hello Express!</h1>');
res.send({
  name: 'akash',
  likes: [
    "dancing",
    "photography"
  ]
});
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'about page',

  });
});
app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'home page',

    welcome: 'welcome to home page'
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'unable to connect to server'
  });
});
app.listen(port);
