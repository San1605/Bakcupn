const express = require("express")
const expressSession = require("express-session")
const passport = require("passport");
const localStrategy = require("passport-local");
const app = express();
const userModel = require("./models/userModal");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "secret_key"
}));

app.use(passport.initialize())
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


passport.use(new localStrategy(userModel.authenticate()))

function isloggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else {
        res.redirect("/")
    }
}


app.get("/", (req, res) => {
    res.send("Hello from server")
})


app.post("/register", (req, res) => {
    // console.log(req.body)
    var userData = new userModel({
        username: "sandesh",
        password: "sandesh",
        fullName:"sandesh singhal",
        email:"sandesh@gmail.com"
    })


    userModel.register(userData, req.body.password)
        .then(function () {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/profile")
            })
        })
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/"
}), (req, res) => {
res.send("login")
})

app.get("/profile", isloggedIn, (req, res) => {
    res.send("profile")
})


app.get("/logout", (req, res) => {
    req.logOut(function (err) {
        if (err) { return next(err) }
        res.redirect("/")
    })
})


app.listen(4000, () => {
    console.log('server is up and running');
})