const crypto = require('crypto');

const verifyTokenGenerator = () => {
      const verificationToken = crypto.randomInt(100000, 1000000).toString();;
      return verificationToken;
}

module.exports = verifyTokenGenerator;