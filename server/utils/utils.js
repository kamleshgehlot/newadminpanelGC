const jwt = require('jsonwebtoken');
var fs = require('fs');
const handlebars = require('handlebars');

module.exports = {
  readHTMLFile: (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        console.log(err)
        throw err;        
      }
      else {
        callback(null, html);
      }
    });
  },

  randomString: (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzDEFGH';
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  },

  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const secret = process.env.JWT_SECRET || 'secret';
      const options = { expiresIn: '12h', issuer: 'https://sargatechnology.com'};
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, secret, options);
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        // throw new Error(err);
        result = { 
          error: `Authentication error. Token required.`,
          status: 401
        };
        res.status(401).send(result);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};