const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extend: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));


const { env } = require("./lib/databaseMySQL.js");
const mainRoute = require('./routes/mainRoute.js');


if (env === 'prod') {
    app.use('/', express.static(path.join(__dirname, 'dist')));
    app.use('/dist', express.static(path.join(__dirname, 'dist')));
} else {
    app.use('/', express.static(path.join(__dirname, '..', 'src')));
    app.use('/src', express.static(path.join(__dirname, '..', 'src')));
}


app.use('/api/images', function (req, res, next) {
    try {
      const fileName = (req.query.path).toString().split('/').pop();
      let file = '';
      try {
        if(fileName === 'null'){
            file = `${__dirname}/files/fileNotAvailabe.jpg`;
        }else if (fs.existsSync(`${__dirname}/files/${req.query.path}`)) {
            file = `${__dirname}/files/${req.query.path}`;
        }else {
            file = `${__dirname}/files/fileNotAvailabe.jpg`;
        }
      } catch(err) {
        console.error(err)
      }
  
      res.download(file); // Set disposition and send it.
    } catch (error) {
      next(error);
    }
});
  

app.use('/api',require('./routes/appRouting.js'));
app.use('/',mainRoute);

let port ='';

if(env === 'local'){
    port = 5001;
}else if(env === 'prod'){
    port = 3007;
}

const server = http.createServer(app);
server.listen(port, () => {
    console.log('server is running on port: ', port);    
});