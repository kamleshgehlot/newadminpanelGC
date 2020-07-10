const connection = require("../lib/connection.js");
const {dbName} = require("../lib/connection.js");

const AppModel = function (params) {
  this.type = params.type;  
  this.title = params.title;
  this.content = params.content;
  this.id = params.id;
  this.image_id = params.image_id;
  this.link_id = params.link_id;
  this.password = params.password;
  this.username = params.username;
  this.image_name = params.image_name;
  this.new_image_id = params.new_image_id;
  this.link = params.link;
  this.new_link_id = params.new_link_id;
  this.address= params.address;
  this.email= params.email;
  this.mobile = params.mobile;
  this.is_active = params.is_active;

  this.imageId = params.imageId;
  this.picType = params.picType;
  this.documentName = params.documentName;
  this.module_id = params.module_id;
};


AppModel.prototype.uploadImage = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
  connection.getConnection(function (error, connection) {
    if (error) {
      throw error;
    }
    connection.changeUser({database : dbName});  
    let Values = [[that.type, that.image_name, 1]];    
    connection.query('INSERT INTO images(type, image_name, is_active) VALUES ?',[Values], function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  } 
      resolve(rows);              
    });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
  });
});
}


AppModel.prototype.uploadProductImage = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName});
      connection.query(`UPDATE images SET is_active = 0 WHERE type = 'bannerImage'`, function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        
        const VALUES = [0, that.type, that.documentName, 1];
        let Query = `INSERT INTO images(module_id, type, image_name, is_active) VALUES(?)`;
        connection.query(Query, [VALUES], function (error, rows, fields) {
         
          if (error) {  console.log("Error...", error); reject(error);  }
          resolve(rows.insertId);
        });

      });

      
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
} 



AppModel.prototype.getPrevBannerImage = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName});
      connection.query(`SELECT * FROM images WHERE type = 'bannerImage'`, function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }       
            resolve(rows);
        });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
} 


AppModel.prototype.changeProductImage = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName});
      connection.query(`UPDATE images SET is_active = 0 WHERE type = +that.type+ `, function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
       
        connection.query(`UPDATE images SET is_active = 1 WHERE id = ${this.imageId},type = ${this.type}`, function (error, rows, fields) {
          if (error) {  console.log("Error...", error); reject(error);  }
            resolve(rows.insertId);
        });
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
} 



AppModel.prototype.insertLink = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
  connection.getConnection(function (error, connection) {
    if (error) {
      throw error;
    }
    connection.changeUser({database : dbName});  
    let Values = [[1,that.type,that.link, 1]];    
    connection.query('INSERT INTO links(module_id,type,website_link, is_active) VALUES ?',[Values], function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  } 
      resolve(rows);              
    });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
  });
});
}

AppModel.prototype.addFormContent = function () {
    const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      let Values = [[that.type, that.new_image_id, that.new_link_id, that.title, that.content, 1]];
      connection.changeUser({database : dbName});      
      connection.query('INSERT INTO website_content(type, image_id, link_id, title, content, is_active) VALUES ?',[Values], function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  } 
        resolve(rows);              
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}



AppModel.prototype.updateFormContent = function () {
  const that = this;
return new Promise(function (resolve, reject) {
  connection.getConnection(function (error, connection) {
    if (error) {
      throw error;
    }
   

    connection.changeUser({database : dbName});
    connection.query('UPDATE website_content SET title = "'+that.title+'", image_id = "' + that.image_id + '", link_id = "' +that.link_id+ '", content = "'+that.content+'" WHERE id = "'+that.id+'"', function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  }          
      resolve(rows);              
    });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
  });
});
}



AppModel.prototype.updateContactForm = function () {
  const that = this;
return new Promise(function (resolve, reject) {
  connection.getConnection(function (error, connection) {
    if (error) {
      throw error;
    }
   

    connection.changeUser({database : dbName});
    connection.query('UPDATE contact SET email = "'+that.email+'", address = "' + that.address + '", mobile = "' +that.mobile+ '" WHERE id = "'+that.id+'"', function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  }          
      resolve(rows);              
    });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
  });
});
}

AppModel.prototype.getTabRelatedList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      
      connection.changeUser({database : dbName});
      connection.query('SELECT wc.*,i.type, i.image_name, l.website_link as link FROM website_content as wc LEFT JOIN images as i ON wc.image_id = i.id LEFT JOIN links as l ON l.id = wc.link_id WHERE wc.type = "' +that.type+ '"', function (error, rows, fields) { 
        if (error) { console.log("Error...", error); reject(error);  }   
        resolve(rows);              
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}


AppModel.prototype.getContactList = function () {
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName});
      connection.query('SELECT * FROM contact', function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  }          
        resolve(rows);              
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
}




AppModel.prototype.login = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName});
      connection.query('SELECT name, token, username, is_active FROM user WHERE username = "'+that.username+'" AND password = "'+that.password+'"', function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  }          
        resolve(rows);              
      });
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
} 


AppModel.prototype.changeState = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName});
      if(that.type === 'contact'){
        connection.query('UPDATE contact SET is_active  = "'+ that.is_active +'" WHERE id = "'+that.id+'"', function (error, rows, fields) { 
          if (error) {  console.log("Error...", error); reject(error);  }          
          resolve(rows);              
        });
      }else{
        connection.query('UPDATE website_content SET is_active  = "'+ that.is_active +'" WHERE id = "'+that.id+'"', function (error, rows, fields) { 
          if (error) {  console.log("Error...", error); reject(error);  }          
          resolve(rows);              
        });
      }      
        connection.release();
        console.log('Process Complete %d', connection.threadId);
    });
  });
} 

module.exports = AppModel;
