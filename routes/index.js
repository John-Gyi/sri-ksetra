const express = require('express');
const router = express.Router();
const Admin=require('../model/Admin');
const mongoose=require('mongoose');
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async(req, res)=> {
  res.render('index', { title: 'Sri-Ksetra Information System' });
});
router.get('/signup', async(req, res)=> {
  res.render('sign_up');
});
router.get('/signin', async(req, res)=> {
  res.render('sign_in');
});
router.post('/signup',async(req,res)=>{
  const admin=new Admin();
  admin.name=req.body.name;
  admin.email=req.body.email;
  admin.password=req.body.password;

  admin.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/signin');
  })

});

router.post('signin',async(req,res)=>{
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    console.log(err);
    if(rtn!= null && Admin.compare(req.body.password,rtn.password)){
      res.redirect('/');
    }else{
      res.redirect('/signin');
    }
  })
})
module.exports = router;
