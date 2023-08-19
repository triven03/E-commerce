const express = require('express')
const {
  signUpUser,
  signInUser,
  getUser,
  addAddress,
  removeAddress,
  getLoggedUserAddresses
} = require('../controller/user.controller')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

// @desc  new user register
router.post('/signup', signUpUser);

// @desc  user login
router.post('/signin', signInUser);

// @desc  get user frome logged user
router.route('/me').get([verifyUser], getUser);

// @desc  Add address to user addresses list
router.post("/addAddres", [verifyUser], addAddress);

// @desc  Remove address from user addresses list
router.delete("/removeAddress:id", [verifyUser], removeAddress);

// / @desc  Get logged user addresses list
router.get("/getAddress", [verifyUser], getLoggedUserAddresses);

module.exports = router;
