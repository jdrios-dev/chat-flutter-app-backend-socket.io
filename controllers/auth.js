const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response)=>{

  const { email, password } = req.body;

  try {
    const existEmail = await User.findOne({email});
    if(existEmail){
      return res.status(400).json({
        ok: false,
        msg: 'Email already registered'
      });
    }

    const user = new User(req.body);

    //Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk with the admin, we have an error :('
    })
  }
}

const loginUser = async(req, res) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({email});

    if(!userDB){
      return res.status(400).json({
        ok: false,
        msg: 'User was not found'
      });
    }

    // Validate password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrect'
      });
    }

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      user: userDB,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact the admin, Please'
    })
  }
}

const renewToken = async (req, res = response) =>{

  const uid = req.uid;
  const token = await generateJWT(uid);
  const user = await User.findById(uid);

  return res.json({
    ok: true,
    user,
    token
  });
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}