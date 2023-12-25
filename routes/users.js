const bcrypt = require("bcrypt");
const { UserModel, validUser, validLogin, createToken } = require("../models/userModel");

const checkToken = async (req, res) => {
  res.json(req.tokenData);
};

const myInfo = async (req, res) => {
  try {
    let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const usersList = async (req, res) => {
  try {
    let data = await UserModel.find({}, { password: 0 }).limit(20);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const count = async (req, res) => {
  try {
    let count = await UserModel.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const createUser = async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    user.birth_date = Date.parse(user.birth_date);
    await user.save();
    user.password = "***";
    res.status(201).json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 });
    }
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const login = async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Password or email is wrong, code:1" });
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
      return res.status(401).json({ msg: "Password or email is wrong, code:2" });
    }
    let token = createToken(user._id, user.role);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const changeRole = async (req, res) => {
  if (!req.body.role) {
    return res.status(400).json({ msg: "Need to send role in body" });
  }

  try {
    let userID = req.params.userID;
    if (userID == "649021f6214dca536b6008fb") {
      return res.status(401).json({ msg: "You cant change superadmin to user" });
    }
    let data = await UserModel.updateOne({ _id: userID }, { role: req.body.role });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

const changeActive = async (req, res) => {
  if (!req.body.active && req.body.active != false) {
    return res.status(400).json({ msg: "Need to send active in body" });
  }

  try {
    let userID = req.params.userID;
    if (userID == "649021f6214dca536b6008fb") {
      return res.status(401).json({ msg: "You cant change superadmin to user" });
    }
    let data = await UserModel.updateOne({ _id: userID }, { active: req.body.active });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
};

module.exports = {
  checkToken,
  myInfo,
  usersList,
  count,
  createUser,
  login,
  changeRole,
  changeActive,
};
