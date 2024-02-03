const express = require("express")
const expressSession  = require("express-session")
const passport = require("passport");
const app = express();
const userModel = require("./models/userModal");
const postModel = require("./models/postModal");

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"secret_key"
}));

app.use(passport.initialize())
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());



app.get("/", (req, res) => {
    res.send("Hello from server")
})

app.get('/createuser', async (req, res) => {
    const user = await userModel.create({
        username: "Sandesh2001",
        fullName: "Sandesh Singhal",
        email: "sandeshsinghal@gmail.com",
        password: "sandesh",
        posts: []
    })
    res.send(user);
})


app.get("/createpost", async (req, res) => {
    const posts = await postModel.create({
        text: "firstpost",
        user: "658522c27bec3eb19aa9c550",
    })
    let user = await userModel.findOne({_id:"658522c27bec3eb19aa9c550"})
    user.posts.push(posts._id)
    await user.save()
    res.send("done");
})


app.get("/userallposts",async (req,res)=>{
   const user = await userModel.findOne({_id:"658522c27bec3eb19aa9c550"}).populate("posts")
   res.send(user)
})

app.listen(4000, () => {
    console.log('server is up and running');
})