const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')

const signUpUser = async (req, res) => {
  const {email, fullName, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)

    await User.create({...req.body, password: hash})
    res.status(201).send('Sucessfully account opened ')
    return
  } catch (err) {
    console.log('Eorror : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({email})
    if (!!!user) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      let token = newToken(user)
      res.status(200).send({status: 'ok', token})
      return
    }
    sendResponseError(400, 'InValid password !', res)
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.send("User signOUT");
};

const getUser = async (req, res) => {
  res.status(200).send({user: req.user})
}

const addAddress = (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { addresses: req.body } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.status(200).json({
        status: "success",
        message: "Address added successfully.",
        data: doc.addresses,
      });
    }
  );
};

const removeAddress = (req, res, next) => {
  // $pull => remove productId from wishlist array if productId exist

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { addresses: { _id: req.params.id } } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).json({ err: "Something wrong when updating data!" });
      }

      res.status(200).json({
        status: "success",
        message: "Address removed successfully.",
        data: doc.addresses,
      });
    }
  );
};

const getLoggedUserAddresses = (req, res, next) => {
  // const user = await User.findById(req.Profile._id).populate("wishlist");

  User.findById(req.user._id)
    .populate("addresses")
    .then((user) => {
      if (user) {
        res.status(200).json({
          status: "success",
          results: user.addresses.length,
          data: user.addresses,
        });
      }
    });
};


module.exports = {signUpUser, signInUser,logout, getUser ,getLoggedUserAddresses, removeAddress,  addAddress}
