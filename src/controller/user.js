const User = require('../models/users')
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

exports.signup = (req, res ) =>{
    {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
          if (user)
            return res.status(400).json({
              error: "User already registered",
            });
      
          const { firstName, lastName, email, password } = req.body;
          const hash_password = await bcrypt.hash(password, 10);
          const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
          });
      
          _user.save((error, user) => {
            if (error) {
              return res.status(400).json({
                message: error,
              });
            }
      
            if (user) {
            //   const token = generateJwtToken(user._id);
              const { _id, firstName, lastName, email } = user;
              return res.status(201).json({
                // token,
                user: { _id, firstName, lastName, email },
              });
            }
          });
        });
      }
}

exports.signin = (req, res) =>{
    User.findOne({email: req.body.email})
    .exec((error, user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id}, 'shhh', {expiresIn: '1h'});
                const { firstName, lastName, email} = user;
                res.status(200).json({
                    token,
                    user:{
                        firstName, lastName, email
                    }
                })
            }else{
                return res.status(400).json({
                    message: "wrong pass"
                })
            }
        }else{
            return res.status(400).json({
                message: "something wrong"
            })
        }
    })
}

exports.requireSignIn = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const user = jwt.verify(token, 'shhh');
    req.user = user;
    next();
}