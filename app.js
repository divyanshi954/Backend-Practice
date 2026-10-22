//CORE MODULE
const express = require('express');

//LOCAL MODULES
const hostRouter = require('./routes/hostRouter');
const userRouter = require('./routes/userRouter');

const storeController = require('./controllers/store');
const errorController = require('./controllers/error');
const { default: mongoose } = require('mongoose');
const db_path = require('./db_path');

const app = express();         //creating application

app.use(express.static('public'));              // output css
app.use(express.urlencoded({ extended: true })); //Form data parsing

app.set('view engine', 'ejs');      //for ejs 
app.set('views', 'views');

app.get("/", storeController.getIndex);         //Home page of website

app.use("/store", userRouter);         //user related routes
app.use("/host", hostRouter);          //host related routes

app.use(errorController.pageNotFound);             //page not found error

//SERVER START
mongoose.connect(db_path).then(() => {
  app.listen(3002, () => {
    console.log("CONNECTED TO MONGODB");
    console.log('SERVER IS RUNNING ON http://localhost:3002');
  });
}).catch(err => {
  console.log("ERROR OCCURED: ", err);
})


