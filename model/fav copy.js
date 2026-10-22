// const favourites = [];
// const fs = require('fs');
// const path = require('path');
// const rootDir = require('../path/pathUtils');
// const Home = require('./home');
const { getdb } = require('../path/databaseUtil');
const Home = require('./home');
const { ObjectId } = require('mongodb');


module.exports = class FavouriteList {
  constructor(homename, address, price, _id) {
    this.homename = homename;
    this.address = address;
    this.price = price;
    if(_id) {
      this._id = _id;
    }
  }

//   static addFavourites(homeid, callback) {
//     FavouriteList.getFavourites((favourites) => {
//       if(favourites.includes(homeid)) {
//         callback("already marked as favourite");
//       }
//       else { 
//         favourites.push(homeid);
//         const favPath = path.join(rootDir, 'data', 'favourites.json');
//         fs.writeFile(favPath, JSON.stringify(favourites), callback);
//       }
//     });
//   }

  // static getFavourites(callback) {
  //   Home.find((houseList) => {
  //   const favData = houseList.filter(home => homes.includes(home._id));
  //   const favPath = path.join(rootDir, 'data', 'favourites.json');
  //   fs.readFile(favPath, (err, data) => {
  //     callback(!err ? JSON.parse(data) : []);
  //   })
  // });
  // }

  // static deleteFavourites(homeId, callback) {
  //   FavouriteList.getFavourites((favourites) => {
  //     favourites = favourites.filter(homeid => homeid !== homeId);
  //     const favPath = path.join(rootDir, 'data', 'favourites.json');
  //     fs.writeFile(favPath, JSON.stringify(favourites), callback);
  //   });
  // }


   static addFavourites(homeId) {
    const db = getdb();
    return Home.findById(homeId).then(home => {
     return db.collection('Favourites').findOne({_id : home._id}).then(fav => {
     if(!fav) {
        return db.collection('Favourites').insertOne(home);
     }
     else {
        return db.collection('Favourites').find().toArray();
    }});
    });
  }

  static fetchFavourites() {
    const db = getdb();
    return db.collection('Favourites').find().toArray();
  }

  static deleteFavourites(homeId) {
    const db = getdb();
    return db.collection('Favourites').deleteOne({_id : new ObjectId(String(homeId))});
  }

}