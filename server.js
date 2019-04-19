var express = require('express');
const sqlite3 = require('sqlite3').verbose();
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
var session = require('express-session');
var db = new sqlite3.Database(':memory:');

/*
var db = new sqlite3.Database(':memory:', err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});)
*/


app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')) // to keep css displaying on all pages

db.serialize(function(){
	db.run('CREATE TABLE users (user TEXT, password TEXT)')
	db.run('INSERT INTO users(user,password) VALUES (?,?)',['a','a'], function(err){
		if(err){
			console.log(err.message);
		}
	})			
})

db.serialize(function(){
	db.run('INSERT INTO users(user,password) VALUES (?,?)',[], function(err){
		if(err){
			console.log(err.message);
		}
	})
})

// gets page requests for displaying them
app.get('/', function (req,res) {
	res.render("index")
})

app.get('/index', function (req,res) {
	res.render("index")
})

app.get('/caesar', function (req,res) {
	res.render("caesar")
})

app.get('/atbash', function (req,res) {
	res.render("atbash")
})

app.get('/login', function (req,res) {
	res.render("login")
})

app.get('/registration', function (req,res) {
	res.render("registration")
})

//logging in

app.post('/login', function(req, res) {
	db.get('SELECT user FROM users WHERE user=? AND password=?', [req.body.user, req.body.pass], function (err, row) {
    if(row){
			console.log("Correct Login")
			req.session.user = true
			//res.redirect("/index")
			res.send('Correct Login')
		}
		else{
			res.send("Incorrect Login")
		}
	})
})


//to register the user
app.post('/registration', function(req, res) {
  db.run('INSERT INTO users(user, password) VALUES (?, ?)', [req.body.user, req.body.pass], function(err){
    if(err){
      console.log(err.message);
    }
	  res.redirect("/")
	  console.log('User has successfully been registered ')
  })
})

//creates a session

app.use(session({
  secret: "session",
  name: "authentication",
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.listen(5000, function (){
	console.log('listening on http://localhost:5000/')
})

//var server = app.listen(5000, "127.0.0.1", function () {
//	var host = server.address().address
	//var port = server.address().port
	
	//console.log("Listening on http://%s:%s", host, port)
//})