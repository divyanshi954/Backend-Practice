const Home = require('../model/home.js')
const Favourite = require('../model/fav.js')

exports.getIndex = (req,res,next) => {
    res.render('store/index', {pageTitle: "airbnb", currentPage: "index"});
 };

exports.getHomes = (req,res,next) => {
  Home.find().then((homes) => {
    res.render('store/home', {houseList: homes, pageTitle: "airbnb-home", currentPage: "Home"});
  });
}

exports.getBookings = (req, res, next) => {
  res.render('store/booking', {pageTitle: "My-Bookings", currentPage: "Bookings"});
}

exports.getFavouriteList = (req, res, next) => {
  Favourite.find().populate("homeId").then((homes) => {
    const favHomes = homes.map((home) => home.homeId);
      res.render('store/favouriteList', {houseList: favHomes, pageTitle: "My-Favourites", currentPage: "Favourites"});   
  });
}

exports.postFavouriteList = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Favourite.findOne({homeId : homeId}).then(favHome => {
    if(favHome) {
      console.log('ALREADY ADDED TO FAVOURITE');
      return res.redirect("/store/favouriteList");
    }
    const fav = new Favourite({homeId : homeId});
    return fav.save();
  }).then(() => {
    res.redirect("/store/favouriteList");
  }).catch(err => {
    console.log('ERROR OCCURED WHILE ADDING TO FAVOURITE', err);
  })  
}

exports.deleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({homeId : homeId}).then(result => {
    console.log('DELETED SUCCESSFULLY ', result);
    res.redirect("/store/favouriteList");
  });
}

exports.getReserved = (req, res, next) => {
  Home.find().then((homes) => {
    res.render('store/reserve', {houseList: homes, pageTitle: "Reserved", currentPage: "Reserved"});
  });
}

exports.gethomeDetails = (req, res, next) => {
  const homeId = req.params.homeID;
  Home.findById(homeId).then(homeFound => {
    if(homeFound) {
      console.log('HOME FOUND ');
      res.render('store/homeDetails', {homeDetails: homeFound, pageTitle: "home-Details", currentPage: "Home"});
    }
    else {
      res.render('404', {pageTitle: "Error-404| Page not found", currentPage: "error"});
      // res.redirect("/store/home");
    }
  });
}
