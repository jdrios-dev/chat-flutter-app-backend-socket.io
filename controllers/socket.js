const Message = require('../models/message');
const User = require('../models/user');

const userConnected = async (uid = '') => {
  const user = await User.findById(uid);
  user.isOnline = true;
  await user.save();
}

const userDisconnected = async (uid = '') => {
  const user = await User.findById(uid);
  user.isOnline = false;
  await user.save();
}

const saveMessage = async (payload) => {

  /*
  Payload
    {
      from: '',
      to: '',
      message: ''
    }
  */

  try {

    const message = new Message(payload);
    await message.save();

    return true;
  } catch (error) {
    return false
  }
}

module.exports = {
  userConnected,
  userDisconnected,
  saveMessage
}