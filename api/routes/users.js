var express = require('express');
var router = express.Router();
var User = require('../../model/User');
var Post = require('../../model/Post');
var bcrypt = require('bcryptjs');
var checkAuth = require('../middleware/check-auth');

router.get('/list',checkAuth,function (req,res) {
  User.find(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        users:rtn
      });
    }
  })
})

router.post('/add',checkAuth,function (req,res) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(201).json({
        message:"User Account Created!!",
        user:rtn
      })
    }
  })
})

router.get('/:id',checkAuth,function (req,res) {
  User.findById(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        user:rtn
      })
    }
  })
})

router.patch('/:id',checkAuth,function (req,res) {
  var update = {};
  for (var opt of req.body) {
    update[opt.proName]=opt.proValue
  }
  User.findByIdAndUpdate(req.params.id,{$set:update},function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"internal server err",
        error:err
      })
    }else {
      res.status(200).json({
        message:"User Account updated"
      })
    }
  })
})

router.delete('/:id',checkAuth,function (req,res) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        message:"User Account Deleted"
      })
    }
  })
})

module.exports = router;
