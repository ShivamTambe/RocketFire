const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const _ = require("lodash");
const { off } = require("process");

require("dotenv").config();

const stripe = require("stripe")("sk_test_51LeggnSJbyVt35s0x1LWDZoMX8lTiaB7WnL7zEkjE2jgf1YQ5LrDtHFK02GExO5bqzMoyK0xSWS0xRknfxsQ0vUI00eIEWMm8N");

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Add a US business address"}],
    [2, { priceInCents: 20000, name : "Manage your business"}],
])


const port = process.env.PORT || 5000;
// mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
// mongoose.connect("mongodb://process.env.PORT/todolistDB",{useNewUrlParser: true});

// const loginSchema = {
//     firstName : String,
//     lastName : String,
//     email : String,
//     screenName : String,
//     password : String,
//     confirmPassword : String,
//     dateOfBirth : Date,
//     zipCode : Number,
//     gender : String
// };

// const Id = mongoose.model("Id", loginSchema);

// const person1 = new Id({
//     firstName : "Rocket",
//     lastName : "Fire",
//     email : "admin@gmail.com",
//     screenName : "RocketOfficial",
//     password : "admin@1234",
//     confirmPassword : 'admin@1234',
//     dateOfBirth : 05/06/2011,
//     zipCode : 372938,
//     gender :"male"
// })
// const person2 = new Id({
//     firstName : "Rocket",
//     lastName : "Fire",
//     email : "user@gmail.com",
//     screenName : "RocketOfficial",
//     password : "user@1234",
//     confirmPassword : 'user@1234',
//     dateOfBirth : 05/06/2011,
//     zipCode : 372938,
//     gender :"male"
// })
// const defaultitems = [ person1, person2];


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set("port", 5000);
app.use(bodyparser.urlencoded({extended:false}))


app.get("/", function(req, res){
    // Id.find({}, function(err, foundItems){
    //     if(foundItems.length === 0){
    //         Id.insertMany(defaultitems, function(err){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 console.log("success");
    //             }
    //         });
    //         res.redirect("/log");
    //     }
    //     else{
    //         res.render("index");
    //     }
    // })
    res.render("index");
})
app.get("/wallet", function(req, res){
    res.render("wallet");
})
app.get("/dashboard", function(req, res){
    res.render("dashboard");
})
app.get("/analytic", function(req, res){
    res.render("analytic");
})
app.get("/history", function(req, res){
    res.render("history");
})
app.get("/news", function(req, res){
    res.render("news");
})
app.get("/settings", function(req, res){
    res.render("setting");
})
app.get("/signup", function(req, res){
    res.render("signup");
})
app.post("/signup", function(req, res){
    // let newId = new Id({
    //     firstName : "Rocket",
    //     lastName : "Fire",
    //     email : `${req.body.email}`,
    //     screenName : "RocketOfficial",
    //     password : `${req.body.password}`,
    //     confirmPassword : req.body.confirmpassword,
    //     dateOfBirth : 05/06/2011,
    //     zipCode : 372938,
    //     gender :"male"
    // })
    // if(req.body.password === req.body.confirmpassword){
    //     newId.save();
    // }
    
    res.render("index");
})


app.post("/create-checkout-session", async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            mode : "payment",
            line_items: [
                {
                  price_data: {
                    currency: "usd",
                    unit_amount: 500,
                    product_data: {
                      name: "name of the product",
                    },
                  },
                  quantity: 1,
                },
            ],
               
            success_url: `${process.env.PORT}/company.ejs`,
            cancel_url: `${process.env.PORT}/cancel.html`
        })
        res.json({ url : session.url})
    }
    catch(e){
        res.status(500).json({ error : e.message})
    }
})


app.post("/login", function(req, res){
    let email = req.body.email;
    let password = req.body.password;
        // Id.find({}, async function(err, foundItems){
        //     for(var i=0; i<foundItems.length ; i++){
        //         // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
        //         if((email === foundItems[i].email && foundItems[i].password === password) || (email === "admin@gmail.com" && password === "admin@1234")){
        //             console.log("founnd");
        //             page =  "/dashboard";
        //             console.log(page);
        //             res.redirect("/dashboard");
        //             break;
        //         }
        //     }
        // });
        if( email === "admin@gmail.com" && password === "admin@1234"){
            res.redirect("/dashboard");
        }
        else{
            res.redirect("/");
        }
})


app.get("/logout", function(req, res){
    res.render("logout");
})
app.get("/log", function(req, res){
    res.render("index");
})
// app.post("/next",function(req, res){
//     console.log(req.body.radio);
//     let value = req.body.radio;
// })
// app.listen(app.get("port"), function(){
//     console.log("server is running on prot "+ app.get("port"));
// })
app.listen(port, function(){
    console.log("server is running on prot "+ port);
})