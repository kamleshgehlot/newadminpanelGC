const express = require('express');
// const multer = require('multer');

const AppController = require('../controllers/AppController.js');
const validateToken = require('../utils/utils.js').validateToken;

const Routing = express.Router();


// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './files/images');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname.split('.')[0] + "_" + Date.now() + '.' + file.originalname.split('.')[1]);
//   }
// });

// const upload = multer({ storage: storage });




Routing.route("/getContactList").get(AppController.getContactList);




Routing.route("/login").post(AppController.login);
Routing.route("/getPrevBannerImage").post(validateToken, AppController.getPrevBannerImage);
Routing.route("/updateBannerProduct").post(validateToken, AppController.updateBannerProduct);
Routing.route("/addUpdateFormContent").post(validateToken, AppController.addUpdateFormContent);
Routing.route("/getTabRelatedList").post(validateToken, AppController.getTabRelatedList);
Routing.route("/changeState").post(validateToken, AppController.changeState);


module.exports = Routing;