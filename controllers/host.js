const Home = require('../model/home.js')

exports.getHome = (req, res, next) => {
  res.render("host/edit-home", {editing: false, pageTitle : 'airbnb - Register your Home', currentPage: 'add'});
}

exports.editHome = (req, res,next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(homeFound => {
    if(!homeFound) {
      console.log("HOME DOES NOT EXIST");
      return res.redirect("/host/hostHomeList");
    }
    console.log(homeId, editing, homeFound);
    res.render("host/edit-home", {home : homeFound, pageTitle : 'airbnb - Edit Home details', currentPage : 'hostHome', editing : editing})
  })
}

exports.postEditHome = (req, res, next) => {
  const  {homename, address, price, _id} = req.body;
  Home.findById(_id).then((home) => {
    home.homename = homename;
    home.address = address;
    home.price = price;
    home.save().then((result) => {
      console.log('Home Edited successfully', result);
    }).catch(err => {
      console.log('ERROR WHILE UPDATING DETAILS', err);
    });
    res.redirect("/host/hostHomeList");
  }).catch((err) => {
    console.log('ERROR IN INDING HOME', err);
  });
  

}
exports.postHome = (req, res, next) => {
  const {homename, address, price} = req.body;
  const home = new Home({homename, address, price});         // change 1
  home.save().then(()=> {
    console.log('HOME SAVED SUCCESSFULLY');
    res.render("host/added", {pageTitle : 'Home Added'});
  });
}

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/hostHomeList", {houseList: registeredHomes, pageTitle: "Home list", currentPage:"homes"});
  })
}

exports.deleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(() => {
    console.log('HOME DELETED SUCCESSFULLY')
    res.redirect("/host/hostHomeList");
    });
}