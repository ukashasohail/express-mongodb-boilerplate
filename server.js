const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const User = require("./User.js");

const app = express();


app.use(bodyParser.urlencoded({
   extended: true
}));

mongoose.connect("mongodb+srv://zubair:zubair123@cluster0-clyyy.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.log(err);
    })

// Add body parser
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("hello to boiler plate");
});

app.post("/", (req, res) => {
    // creating new user from User model
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    console.log(req.body);
    console.log(newUser);

    newUser.save()
        .then((user) => {
            res.json(user) // Sending back new user data
        })
        .catch((err) => {
            console.log(err);
        });
})


app.listen(3030, (req,res)=>{
    console.log(`running on port 3030`);
})