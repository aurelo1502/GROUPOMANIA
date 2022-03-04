// Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '<JWT_SIGN_TOKEN>';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '8h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    
    const token = module.exports.parseAuthorization(authorization);
    let userId;

    if(token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if(jwtToken != null) 
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}
