const express = require('express')
const AppController = require('../controllers/AppController.js');
const Routing = express.Router();
const multer = require('multer');

const validateToken = require('../utils/utils.js').validateToken;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './files/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
  }
});

const upload = multer({ storage: storage });

Routing.route("/addUpdateFormContent").post(upload.array('images'), AppController.addUpdateFormContent);
Routing.route("/getTabRelatedList").post(AppController.getTabRelatedList);
Routing.route("/changeState").post(AppController.changeState);
Routing.route("/getContactList").get(AppController.getContactList);




Routing.route("/login").post(AppController.login);

Routing.route("/getPrevBannerImage").post(validateToken, AppController.getPrevBannerImage);
Routing.route("/updateBannerProduct").post(validateToken, AppController.updateBannerProduct);

module.exports = Routing;