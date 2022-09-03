const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:false}))


app.get("/", function(req, res){
    res.render("dashboard");
})
app.get("/wallet", function(req, res){
    res.render("wallet");
})
app.get("/dashboard", function(req, res){
    res.render("dashboard");
})

app.get("/signup", function(req, res){
    res.render("signup");
})

app.post("/next",function(req, res){
    console.log(req.body.radio);
    let value = req.body.radio;
})
app.listen(port, function(){
    console.log("server is running on prot "+ port);
})