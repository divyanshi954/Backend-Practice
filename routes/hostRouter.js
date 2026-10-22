const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controllers/host');

hostRouter.get("/add-home", hostController.getHome);

hostRouter.post("/added", hostController.postHome);

hostRouter.get("/hostHomeList", hostController.getHostHomes);

hostRouter.get("/edit-home/:homeId", hostController.editHome);

hostRouter.post("/edit-home", hostController.postEditHome);

hostRouter.post("/delete/:homeId", hostController.deleteHome);

module.exports = hostRouter;