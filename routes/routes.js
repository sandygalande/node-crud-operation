
const express = require("express");
const router = express.Router();
const User = require('../models/users');

router.get("/users", (req, res)=>{
    res.render("index", {title: "Home Page"});
});

// insert an user into database route
router.post('/add', upload, (req, res)=>{
    const user = new User({
        productname: req.body.productname,
        productid: req.body.productid,
        categoryname: req.body.categoryname,
        categoryid: req.body.categoryid,
    });
    user.save((err)=>{
        if(err){
            res.json({message: err.message, type: 'danger'});
        }else{
            req.session.message = {
                type: 'success',
                message: 'User added successfully!'
            }
            res.redirect("/");
        }
    })
});

// Get all users route
router.get("/", (req, res) => {
    User.find().exec((err, users) => { 
    if(err){
    res.json({ message: err.message });
    } else {
    res.render('index', {
    title: 'Home Page',
    users: users, 
    })
  }  
});
});

router.get('/add',(req, res)=>{
    res.render('add_users',{title: "Add Users"});
})
module.exports = router;