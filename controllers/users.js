const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, res = response) => {

  const desde = Number(req.query.desde) || 0;

  const users = await User
    .find({ _id: { $ne: req.uid } })
    .sort('-isOnline')
    .skip(desde)
    .limit(5)
    ;

  res.json({
    ok: true,
    users,
    desde
  })
}

module.exports = {
  getUsers
}