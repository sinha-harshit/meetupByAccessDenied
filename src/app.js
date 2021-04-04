const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn")
const User = require("./models/users");
const bcrypt = require("bcryptjs");

const port = process.env.PORT || 3000; 

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//console.log(path.join(__dirname, "../public"));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async(req, res) => {
    try{
        const registerUser = new User({
            name : req.body.name,
            //gender : req.body.gender,
            organization : req.body.organization,
            //type : req.body.type,
            email : req.body.email,
            password : req.body.password
    })
    console.log(req.body.gender);
    
    const registered = await registerUser.save();
    res.status(201).render("finder");
    }catch(err){
        res.status(400).send("Error: user may already exist");
    }
});

app.post("/finder", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await User.findOne({email});
        //console.log(userEmail)
        //res.send(userEmail);
        if(userEmail.password == password){
            res.status(201).render("finder");
        }else{
            res.send("Invalid email or password");
        }
     
    }catch(err){
        res.status(400).send("Invalid email or password");
    }
});

app.post("/results", async(req, res) => {
    try{
        const type = req.body.type;
        const city = req.body.city;

        console.log(type);
        console.log(city);
        if(city == 'Melbourne'){
            res.status(201).render("melbres");
        }else if(city == 'Sydney'){
            res.status(201).render("sydres");
        }else{
            res.status(201).render("Aderes");
        }

        
     
    }catch(err){
        res.status(400).send("Invalid email or password");
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
} );