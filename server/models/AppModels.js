const connection = require("../lib/connection.js");
const {dbName} = require("../lib/connection.js");

const AppModel = function (params) {
  this.type = params.type;  
  this.operation = params.operation;
  this.title = params.title;
  this.content = params.content;
  this.date = params.date;
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
  this.time = params.time;
  this.location = params.location;
  this.contact = params.contact;
  
  this.imageId = params.imageId;
  this.picType = params.picType;
  this.documentName = params.documentName;
  this.module_id = params.module_id;
};



AppModel.prototype.login = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }

      connection.changeUser({database : dbName});
      let Query = `SELECT id, name, token, username, account_id, is_active FROM user WHERE username = '${that.username}' AND password = AES_ENCRYPT('${that.password}', 'secret') AND is_active = 1;`;
      // console.log(Query)
      connection.query(Query, function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  }          
        resolve(rows);              
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
      if (error) { throw error; }
      connection.changeUser({database : dbName});
      connection.query(`SELECT * FROM images WHERE type = '${that.type}';`, function (error, rows, fields) {
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
      connection.query(`UPDATE images SET is_active = 0 WHERE type = '${that.type}';`, function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
        
        const VALUES = [0, that.type, that.documentName, 1];
        let Query = `INSERT INTO images(module_id, type, image_name, is_active) VALUES(?)`;
        connection.query(Query, [VALUES], function (error, rows, fields) {
          if (error) {  console.log("Error...", error); reject(error);  }
          resolve(rows);
        });
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
      if (error) { throw error;}
      connection.changeUser({database : dbName});
      connection.query(`UPDATE images SET is_active = 0 WHERE type = '${that.type}'; `, function (error, rows, fields) {
        if (error) {  console.log("Error...", error); reject(error);  }
       
        connection.query(`UPDATE images SET is_active = 1 WHERE id = ${that.imageId} AND type = '${that.type}';`, function (error, rows, fields) {
          if (error) {  console.log("Error...", error); reject(error);  }
            resolve(rows);
        });
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
    if (error) { throw error; }
    
    connection.changeUser({database : dbName});
    
    let Query = `INSERT INTO website_content(type, title, content, date, time, location, contact, is_active) VALUES ?`;
    let Values = [[that.type, that.title, that.content, that.date, that.time, that.location, that.contact, 1]];
    connection.query(Query,[Values], function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  } 
      resolve(rows.insertId);
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
    if (error) { throw error;}

    connection.changeUser({database : dbName});    
    let Query = ``;
    if(that.type === 'Contact'){
        Query = `UPDATE contact SET email = '${that.email}', address = '${that.address}', mobile = '${that.mobile}' WHERE id = '${that.id}';`;
    }else{
        Query = 'UPDATE website_content SET title = "' +that.title+'", content = "' + that.content +'", date = "' +that.date +'", time = "' + that.time +'", location = "'+ that.location + '", contact = "'+ that.contact +'" WHERE id = "' + that.id +'";';
    }
    connection.query(Query, function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  }          
      resolve(rows);
    });
      connection.release();
      console.log('Process Complete %d', connection.threadId);
  });
});
}



AppModel.prototype.uploadImage = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
  connection.getConnection(function (error, connection) {
    if (error) {
      throw error;
    }
    connection.changeUser({database : dbName});  
    if(that.operation === 'Update'){
      connection.query(`UPDATE images SET is_active = 0 WHERE id = ${that.image_id};`, function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  } 
        resolve(rows);              
      });
    }
    let Values = [[that.id, that.type, that.image_name, 1]];
    connection.query('INSERT INTO images(module_id, type, image_name, is_active) VALUES ?',[Values], function (error, rows, fields) { 
      if (error) {  console.log("Error...", error); reject(error);  } 
      resolve(rows);              
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

    if(that.operation === 'Update'){
      connection.query(`UPDATE links SET is_active = 0 WHERE id = ${that.link_id} AND website_link != '${that.link}';`, function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  } 
        if(rows.changedRows !== 0){
          let Values = [[that.id ,that.type, that.link, 1]];    
          connection.query('INSERT INTO links(module_id, type, website_link, is_active) VALUES ?',[Values], function (error, rows, fields) { 
            if (error) {  console.log("Error...", error); reject(error);  } 
            resolve(rows);
          });
        }else{
          resolve(rows);
        }
      });
    }else{
      let Values = [[that.id ,that.type, that.link, 1]];    
      connection.query('INSERT INTO links(module_id, type, website_link, is_active) VALUES ?',[Values], function (error, rows, fields) { 
        if (error) {  console.log("Error...", error); reject(error);  } 
        resolve(rows);
      });
    }

      connection.release();
      console.log('Process Complete %d', connection.threadId);
  });
});
}


AppModel.prototype.getTabRelatedList = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) { throw error; }
      
      connection.changeUser({database : dbName});
      let Query = `SELECT wc.id, wc.type, wc.title, wc.content, wc.date, wc.time, wc.location, wc.contact, wc.is_active, wc.created_at, wc.updated_at, i.id as image_id, i.image_name, l.id as link_id, l.website_link as link FROM website_content as wc LEFT JOIN images as i ON wc.id = i.module_id AND i.is_active = 1 LEFT JOIN links as l ON wc.id = l.module_id AND l.is_active = 1 WHERE wc.type = '${that.type}' ORDER BY wc.id DESC;`;
      if(that.type === 'Contact'){
          Query = `Select * FROM contact WHERE id = 1;`;
      }
      connection.query(Query, function (error, rows, fields) { 
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





AppModel.prototype.changeState = function () {
  const that = this;
  return new Promise(function (resolve, reject) {
    connection.getConnection(function (error, connection) {
      if (error) {
        throw error;
      }
      connection.changeUser({database : dbName});
      if(that.type === 'Contact'){
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
