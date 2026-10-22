//const houseList = [];
//const fs = require('fs');
//const path = require('path');
//const rootDir = require('../path/pathUtils');
// const { getFavourites } = require('./fav');
//const FavouriteList = require('./fav');

const { getdb } = require("../path/databaseUtil");
const { ObjectId } = require('mongodb');

//const homeDataPath = path.join(rootDir, 'data', 'homeData.json');

module.exports = class Home {

  constructor(homename, address, price, _id) {
    this.homename = homename;
    this.address = address;
    this.price = price;
    if (_id) {
      this._id = _id;
    }
  }

  // SAVING DATA IN FILES

  // save() {
  //   Home.find((houseList) => {
  //     if (this.id) {
  //       houseList = houseList.map(home => home._id === this.id ? this : home);
  //     }
  //     else {
  //       const lastHome = houseList[houseList.length - 1];
  //       const lastId = lastHome ? Number(lasthome._id) : 0;
  //       this.id = (lastId + 1).toString();
  //       houseList.push(this);
  //     }
  //     fs.writeFile(homeDataPath, JSON.stringify(houseList), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  // static find(callback) {
  //   fs.readFile(homeDataPath, (err, data) => {
  //     callback(!err ? JSON.parse(data) : []);
  //   });
  // }

  // static findById(homeId, callback) {
  //   this.find(homes => {
  //     const homeFound = homes.find(home => home._id === homeId);
  //     callback(homeFound);
  //   });
  // }

  // static deleteById(homeId, callback) {
  //   this.find(homes => {
  //     const houseList = homes.filter(home => home._id !== homeId);
  //     FavouriteList.deleteFavourites(homeId, err => {
  //       if (err) {
  //         return callback(err);
  //       }
  //       fs.writeFile(homeDataPath, JSON.stringify(houseList), callback);
  //     })
  //   })
  // }

  // SAVING DATA IN MONGODB
  save() {
    console.log('CURRENT HOME CLIKED FOR EDITING HAS ID: ', this._id);
    const db = getdb();
    if (this._id) {
      const updateFields = {
        homename: this.homename,
        address: this.address,
        price: this.price
      }
      return db.collection('Homes').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFields }).then(result => {
        return db.collection('Favourites').updateOne({ _id: new ObjectId(String(this._id))}, { $set: updateFields });
      });
    }
    else {
      return db.collection('Homes').insertOne(this);          // IT RETURNS A PROMISE
    }
  }

  static find(callback) {
    const db = getdb();
    return db.collection('Homes').find().toArray();
  }

  static findById(homeId) {
    const db = getdb();
    return db.collection('Homes').find({ _id: new ObjectId(String(homeId)) }).next();
  }

  static deleteById(homeId) {
    const db = getdb();
    return db.collection('Homes').deleteOne({ _id: new ObjectId(String(homeId)) }).then(result => {
      return db.collection('Favourites').deleteOne({_id : new ObjectId(String(homeId))});
    });
  }

}