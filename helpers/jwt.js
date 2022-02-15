const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  
  return new Promise ((resolve, reject)=>{
    const payload = {uid};

    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, (err, token)=>{
      if(err){
        reject('We couldnt generate the JWT');
      } else {
        resolve(token);
      }
    });
  });
}

const checkJWT = (token = '') => {
  if (!token || token === '') {
    return [false, null]
  }
  try {
    const { uid } = jwt?.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    console.log(error);
    return [false, null]
  }
}

module.exports = {
  generateJWT,
  checkJWT
}