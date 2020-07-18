const AppModel = require('../models/AppModels.js');
const {uploadDocument} = require('../utils/uploadDocument.js');
const {isNullOrUndefined} = require('util');
const jwt = require('jsonwebtoken');



const login = async function (req, res, next) {
    const params = {
       username: req.body.username,
       password:req.body.password,
    }
    
        let result = {};
        let status = 200;

    try {
        const newActivity = new AppModel(params);
        const users = await newActivity.login();
        const user = users[0];
        
        if (users && users.length > 0 && !isNullOrUndefined(users)) {
                const payload = { id: user.id, name: user.name, username: user.username, account_id : user.account_id };
                const secret = process.env.JWT_SECRET || 'secret';
                const options = { expiresIn: '12h', issuer: 'https://sargatechnology.com' };
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.id = user.id;
                result.name = user.name;
                result.username = user.username;
                result.account_id = user.account_id;
                result.errorCode = 200;
            res.status(status).send(result);
        } else {
            result.errorCode = 401;
            result.message = 'User id or password is incorrect.';
            res.status(status).send(result);
        }
    } catch (err) {
        next(err);
    }
}




const getPrevBannerImage = async function (req, res, next) {
    try {
        const result = await new AppModel({type: req.body.type}).getPrevBannerImage();
        res.send( {imageList: result} );
    } catch (err) {
        next(err);
    }
}
  
const updateBannerProduct = async function (req, res, next) {
    const params = {
        type : req.body.type,
        imageId : req.body.imageId,
        picType : req.body.picType,
        document : req.body.document,
    };
    try {
        const newActivity = new AppModel(params);
        let result =[];
        if(params.picType === 1 && params.document !== ""){
            const base64Data = params.document.data.split(';base64,').pop();
            let name = params.document.name.split('.')[0] + "_" + Date.now() + '.' + params.document.name.split('.')[1];
            name = name.replace(/\s/g,'');
            
            await uploadDocument(`./files/bannerImages/${name}`, base64Data).catch(error => {
                console.error(error);
                throw (error);
            });
            newActivity.documentName = name;
            result = await newActivity.uploadProductImage();
        }else if(params.picType === 2 && params.imageId !== 0){
            result = await newActivity.changeProductImage();
        }
        res.send(result);
    } catch (err) {
        next(err);
    }
}

  
const addUpdateFormContent = async function (req, res, next) {
    const params = {
        id : req.body.id,
        image_id : req.body.image_id,
        link_id : req.body.link_id,  

        operation : req.body.operation,
        type : req.body.type,

        title : req.body.title,
        content : req.body.content,
        link : req.body.link,
        image : req.body.image,
        date : req.body.date,
        time : req.body.time,
        location: req.body.location,
        contact : req.body.contact,

        address : req.body.address,
        email : req.body.email,   
        mobile : req.body.mobile,
    }   
    
    try {
        const newActivity = new AppModel(params);
        
        if (params.operation === 'Add') {
            const insertId = await newActivity.addFormContent();
            if(insertId && insertId !== 0){
                newActivity.id = insertId;
            }
        } else if(params.operation === 'Update'){
            await newActivity.updateFormContent();
        }

        if(!isNullOrUndefined(params.image) && params.image !== ""){
            const base64Data = params.image.data.split(';base64,').pop();
            let name = params.image.name.split('.')[0] + "_" + Date.now() + '.' + params.image.name.split('.')[1];
            name = name.replace(/\s/g,'');

            await uploadDocument(`./files/${params.type}/${name}`, base64Data).catch(error => {
                console.error(error);
                throw (error);
            });
            newActivity.image_name = name;
        }
        if(!isNullOrUndefined(newActivity.image_name) && newActivity.image_name !== ""){
            const result = await newActivity.uploadImage();
        }
        if(!isNullOrUndefined(newActivity.link) && newActivity.link !== ""){
            const result = await newActivity.insertLink();
        }

        res.send();
    } catch (error) {
      next(error);
    }
  };

  
const getTabRelatedList = async function (req, res, next) {
    try {
        const result = await new AppModel({type: req.body.type}).getTabRelatedList();
        res.send({ resultList: result });
    } catch (err) {
        next(err);
    }
}


const changeState = async function (req, res, next) {
    let params = {
        type: req.body.type,
        id : req.body.id,
        is_active : req.body.is_active === 1 ? 0 :  req.body.is_active === 0 ? 1 :'',
    }

    try {
        const activity = new AppModel(params);
        await activity.changeState();

        let result =[];
        if(params.type === 'Contact'){
            result = await activity.getContactList();
        }else{
            result = await activity.getTabRelatedList();
        }
        
        res.send({ resultList: result });
    } catch (err) {
        next(err);
    }
}



module.exports = {    
    login: login,
    getPrevBannerImage : getPrevBannerImage,
    updateBannerProduct: updateBannerProduct,
    addUpdateFormContent: addUpdateFormContent,
    getTabRelatedList: getTabRelatedList,
    changeState: changeState,
};