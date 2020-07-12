const express = require('express');

const AppController = require('../controllers/AppController.js');
const validateToken = require('../utils/utils.js').validateToken;

const Routing = express.Router();


Routing.route("/login").post(AppController.login);
Routing.route("/getPrevBannerImage").post(validateToken, AppController.getPrevBannerImage);
Routing.route("/updateBannerProduct").post(validateToken, AppController.updateBannerProduct);
Routing.route("/addUpdateFormContent").post(validateToken, AppController.addUpdateFormContent);
Routing.route("/getTabRelatedList").post(validateToken, AppController.getTabRelatedList);
Routing.route("/changeState").post(validateToken, AppController.changeState);


module.exports = Routing;