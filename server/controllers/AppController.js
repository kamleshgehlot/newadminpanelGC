const AppModel = require('../models/AppModels.js');
const {uploadDocument} = require('../utils/uploadDocument.js');
const {isNullOrUndefined} = require('util');
const jwt = require('jsonwebtoken');
const { param } = require('../routes/mainRoute.js');



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
        
            await uploadDocument(`./files/images/${name}`, base64Data).catch(error => {
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
    const data = JSON.parse(req.body.data);

    let attachment = '';
    if(req.files.length> 0) {attachment = req.files[0].filename};
  
    const params = {
        operation: data.operation,
        type: data.type,
        title: data.title,
        content: data.content,
        id: data.id,
        image_id: data.image_id,
        link_id: data.link_id,  
        image_name: attachment,
        link: data.link,
        new_image_id: '',
        new_link_id: '',   
        address: data.address,
        email: data.email,     
        mobile: data.mobile,     
    }   
    try {
        const newActivity = new AppModel(params);
        if(params.image_name !== '' && params.image_name !== undefined && params.image_name !== null){
            const result = await newActivity.uploadImage();
            params.new_image_id = result.insertId;
            newActivity.new_image_id = result.insertId;            
        }

        if(params.link !== '' && params.link !== undefined && params.link !== null){
            const result = await newActivity.insertLink();
            params.new_link_id = result.insertId;
            newActivity.new_link_id = result.insertId;            
        }
        
        if (params.operation === 'add') {
            const result = await newActivity.addFormContent();
            if(result.insertId > 0){
                res.send({ result: result, is_successful : true });
            }else{
                res.send({ result: result, is_successful : false });
            }
        } else if(params.operation === 'update'){
            if(newActivity.new_image_id !== ''){ newActivity.image_id = newActivity.new_image_id }
            if(newActivity.new_link_id !== ''){ newActivity.link_id = newActivity.new_link_id }
            let result = [];
            if(params.type === 'contact'){
                result = await newActivity.updateContactForm();
            }else{
                result = await newActivity.updateFormContent();                
            }
            if(result.changedRows > 0){
                res.send({ result: result, is_successful : true });
            }else{
                res.send({ result: result, is_successful : false });
            }
        }
    } catch (error) {
      next(error);
    }
  };
  

  



const getContactList = async function (req, res, next) {
    try {
        const result = await new AppModel({}).getContactList();
        res.send({ resultList: result });
    } catch (err) {
        next(err);
    }
}



const getTabRelatedList = async function (req, res, next) {
    try {
        // console.log(req.body)
        const result = await new AppModel({type: req.body.type}).getTabRelatedList();
        console.log(result)
        res.send({ resultList: result });
    } catch (err) {
        next(err);
    }
}

const changeState = async function (req, res, next) {
    let params = {
        type: req.body.type,
        id : req.body.id,
        is_active : req.body.is_active == 1 ? 0 :  req.body.is_active == 0 ? 1 :'',
    }

    try {
        const activity = new AppModel(params);        
        await activity.changeState();

        let result =[];
        if(params.type === 'contact'){
            result = await activity.getContactList();
        }else{
            result = await activity.getTabRelatedList();
        }
        
        res.send({ resultList: result });
    } catch (err) {
        next(err);
    }
}




// const getServicesList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getServicesList();
//         res.send({ serviceList: result });
//     } catch (err) {
//         next(err);
//     }
// }



// const getWhyusList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getWhyusList();
//         res.send({ whyUsList: result });
//     } catch (err) {
//         next(err);
//     }
// }


// const getGoalsList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getGoalsList();
//         res.send({ goalsList: result });
//     } catch (err) {
//         next(err);
//     }
// }

// const getTechnologyList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getTechnologyList();
//         res.send({ technologyList: result });
//     } catch (err) {
//         next(err);
//     }
// }

// const getPartnersList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getPartnersList();
//         res.send({ partnersList: result });
//     } catch (err) {
//         next(err);
//     }
// }


// const getPortfolioList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getPortfolioList();
//         res.send({ portfolioList: result });
//     } catch (err) {
//         next(err);
//     }
// }

// const getAboutList = async function (req, res, next) {
//     try {
//         const result = await new AppModel({}).getAboutList();
//         res.send({ aboutList: result });
//     } catch (err) {
//         next(err);
//     }
// }




module.exports = {    
    addUpdateFormContent: addUpdateFormContent,
    getTabRelatedList: getTabRelatedList,
    getContactList:getContactList,    
    changeState: changeState,    

    login: login,
    getPrevBannerImage : getPrevBannerImage,
    updateBannerProduct: updateBannerProduct,
    
};