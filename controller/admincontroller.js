const admins = require("../model/admins");
const imageDataBase = require("../model/images");
const express = require("express");
const jwt = require('jsonwebtoken')
const cloudnary = require('../helper/cloudinary')
const path = require("path")

exports.home = async (req, res) => {
  var datas = await imageDataBase.find({});
  res.render("dashboard",{datas});
};
exports.register = (req, res) => {
  res.render("register");
};
exports.registerPost = async (req, res) => {
  try {
    const { name, email, adminsname, pass } = req.body;
    var data = await admins.findOne({ email });
    if (data == null) {
      var datas = await admins.create({
        name,
        email,
        adminsname,
        pass,
      });
      if (datas) {
        console.log("Data Added Successfully!!!");
        req.flash("success", "admins Register SuccessFully");
        res.redirect("back");
      } else {
        console.log("Data Not Added");
        req.flash("success", "Data Not Added");
        res.redirect("back");
      }
    } else {
      req.flash("success", "Email Already Exist");
      res.redirect("back");
      console.log("Email Already Exist");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res) => {
  res.render("login");
};
exports.loginPost = async (req, res) => {
  try {
    var email = req.body.email;
    var pass = req.body.pass;

  var data = await admins.findOne({ email });
  if (data == null) {
    console.log("Email Not Found");
    req.flash("success", "Email Not Found");
    res.redirect("back");
  } else {
    if (email == data.email) {
      if (pass == data.pass) {

        var token = await jwt.sign({userId:data._id},process.env.KEY)
        res.cookie("jwt", token, {
          expires:new Date(Date.now() + 24*60*60*1000)
        })

        res.redirect("/admin/home");
      } else {
        res.redirect("back");
        console.log("password Is Worng");
        req.flash("success", "password Is Worng");
      }
    } else {
      res.redirect("back");
      console.log("email Is Worng");
      req.flash("success", "email Is Worng");
    }
  }
  } catch (error) {
    console.log(error);
  }
};
exports.formElenents = async (req,res)=>{
  res.render("formElenents")
}
exports.formElenentsPost = async (req,res)=>{
  try {
    const {img} = req.body;
    
    var image = await cloudnary.uploader.upload(req.file.path);
    var images = image.secure_url;
    var imgId = image.public_id;
      var datas = await imageDataBase.create({
        img: images,
        imgId
      });
      if (datas) {
        console.log("Data Added Successfully!!!");
        req.flash("success", "Image Addead SuccessFully");
        res.redirect("/admin/home");
      } else {
        console.log("Data Not Added");
        req.flash("success", "Image Can Not Addead");
        res.redirect("back");
      }
  }catch (error) {
    console.log(error);
  }
}
exports.deletes = async (req,res)=>{
  try {
      var deletess = await imageDataBase.findById(req.params.id);
      if (deletess.imgId) {
        var ss = await cloudnary.uploader.destroy(
          deletess.imgId,
          (err, data) => {
            if (err) {
              console.log(err);
              req.flash("success", "Image Can Not delete");
              res.redirect('back')
            }
            else{
              console.log(data);
              req.flash("success", "Image Deleted successfully");
              res.redirect('back')
            }
          }
        );
      } else {
        console.log("image id not define");
      }
  }catch (error) {
    console.log(error);
  }
}