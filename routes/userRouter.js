const express = require('express');
const userRouter = express.Router();

const storeController = require('../controllers/store');

userRouter.get("/", storeController.getIndex);
userRouter.get("/home", storeController.getHomes);
userRouter.get("/booking", storeController.getBookings);
userRouter.get("/favouriteList", storeController.getFavouriteList);
userRouter.post("/favouriteList/:homeId", storeController.postFavouriteList);
userRouter.post("/favouriteList/delete/:homeId", storeController.deleteFavourite);
userRouter.get("/reserve", storeController.getReserved);
userRouter.get("/home/:homeID", storeController.gethomeDetails);

module.exports = userRouter;