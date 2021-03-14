const express = require('express')
const router = express.Router();
const { signup, signin, requireSignIn } = require('../controller/user');

router.post('/signup' , signup)

router.post('/signin' , signin)

router.post('/dashboard', requireSignIn, (req,res) =>{
  res.status(200).json({
    user: 'dashboard'
  })
})

module.exports = router;