require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/connection");
const PORT = 4000;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userDB = require("./model/user.schema")

const clientID = "905319856019-uec5pol4mihtvp55h935d6cpbchqa8mm.apps.googleusercontent.com";
const clientSecret = "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";

app.use(cors({
    origin:'http://localhost:3000',
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"8508191234MadMan",
    resave:false,
    saveUninitialized:true
}))

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new OAuth2Strategy({
    clientID:clientID,
    clientSecret:clientSecret,
    callbackURL:"/auth/google/callback",
    scope:["profile","email"]
},
async (accessToken, refreshToken, profile, done)=>{
console.log("~profile",profile)
try{
let user = await userDB.findOne({googleId: profile.id})

if(!user){
    user  = new userDB({
        googleId: profile.id,
        displayName: profile.displayName,
        email:profile.emails[0].value,
        image:profile.photos[0].value
    })

    await user.save();
}

return done(null,user);
}
catch(error){
    done(error, null)
}
}
))

passport.serializeUser((user, done)=>{
    done(null,user);
})

passport.deserializeUser((user, done)=>{
    done(null,user);
})

//initiate google login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/home",
    failureRedirect:"http://localhost:3000/login"
}))


// app.get("/",(req,res)=>{
//     res.status(200).json("server starts")
// })


app.get("/login/success",async(req,res)=>{
    if(req.user){
        res.status(200).json({message:"Authenticated",user:req.user})
    }else{
        res.status(400).json({message:"Not Authenticated", user:null})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3001");
    })
})

app.listen(PORT, ()=>{
    console.log("server started on 4000");
})