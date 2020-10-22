// load the things we need
var express = require('express');
const bodyParser = require("body-parser");
const user = require("./routes/user");
const UserModel = require("./model/User");
const BusinesslistModel = require("./model/Businesslist");
const InitiateMongoServer = require("./config/db");
// InitiateMongoServer();
var app = express();
const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://dbAbhishek:dbAbhishek@cluster0.qaadd.mongodb.net/dbAbhishek?retryWrites=true&w=majority";

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))


app.use(bodyParser.urlencoded({ extended: true }));


// const kittySchema = new mongoose.Schema({
//     username: String,
//     email:String,
//     password:String
//   });

//   const Kitten = mongoose.model('users', kittySchema);
//   const silence = new Kitten({ name: 'Abhishek',email:'vyasabhishek0204@gmail.com',password:'dbAbhishek' });
//   silence.save();
//   console.log(silence); // 'Silence'
// index page
app.use("/user", user);
app.get('/', function (req, res) {
    res.render('pages/home');
});


// Get all recored
app.get('/businesslist', async function (req, res) {

    try {
        // const business = await BusinesslistModel.create({
        //     contact_name:"ajkjsdj",
        //     contact_number:"ajksjd",
        //     email_adddress:"aksdjksa"
        // })
        const businesslistmodel = await BusinesslistModel.find()
        //console.log({ businesslistmodel })
        res.render('pages/businesslist',{'businesslists':businesslistmodel});
    } catch (error) {
        console.log({ error })
    }
    

});

// Create 
app.post('/businesslist', async function (req, res) {

    try {
        const business = await BusinesslistModel.create({
            contact_name: "ajkjsdj",
            contact_number: "ajksjd",
            email_adddress: "aksdjksa"
        })

        console.log({ business })

    } catch (error) {
        console.log({ error })
    }
    res.render('pages/home');

});


// Get Single 
app.get('/businesslist/:id', async function (req, res) {

    try {
        const id = req.params.id
        const business = await BusinesslistModel.findOne({ _id: id })
        res.render('pages/update',{"business":business});
    } catch (error) {
        console.log({ error })
    }
    

});

// Update
app.post('/businesslist/:id', async function (req, res) {
    try {
        const id = req.params.id
        const business = await BusinesslistModel.findOne({ _id: id })
        business.contact_name = req.body.contact_name;
        business.contact_number = req.body.contact_number;
        business.email_adddress = req.body.email_adddress;
        // console.log(req.contact_name);
        await business.save()

     res.redirect('/businesslist');
    } catch (error) {
        console.log({ error })
    }

});


// Delete
app.get('/businesslist/delete/:id', async function (req, res) {

    try {
        const id = req.params.id
        const business = await BusinesslistModel.deleteOne({ _id: id })
       
    } catch (error) {
        console.log({ error })
    }
    res.redirect('/businesslist');

});




app.get('/home', function (req, res) {
    res.render('pages/home');
});

app.get('/update', function (req, res) {
    res.render('pages/update');
});

// contact page
app.get('/contact', function (req, res) {
    res.render('pages/contact');
});

// about page
app.get('/about', function (req, res) {
    res.render('pages/about');
});

// service page
app.get('/service', function (req, res) {
    res.render('pages/service');
});

// project page
app.get('/project', function (req, res) {
    res.render('pages/project');
});

app.listen(process.env.PORT || 3000);
console.log('3000 is the magic port');

