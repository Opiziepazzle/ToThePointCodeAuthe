const express = require('express')
const app = express()
const PORT = process.env.PORT || 3008
 const fs = require('fs')
 const path = require('path')

//const mongoose = require('mongoose')
require('./config/db')
//const Techjobs = require('./model/Techjobs')


//to accept post from data
const bodyParser = require('body-parser').json


const dotenv = require('dotenv')
const dotenvb = require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const { engine } = require('express-handlebars');
const UserSchema = require('./models/UserSchema')
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

//password handler
const bcrypt = require('bcrypt')
const { userInfo } = require('os')



//signup
app.post('/signup', (req, res)=>{
let {name, email, password, dateOfBirth} = req.body;
name = name.trim(),
email = email.trim(),
password = password.trim()
dateOfBirth = dateOfBirth.trim()
if (name == "" || email == "" || password == "" || dateOfBirth == ""){
//if any is empty, we return a json object
res.json({
  status: "FAILED",
  message: "Empty input fields"
});   // if non of the box are empty, it checks for the format of the name uysing regular expression
}  else if(!/^[a-zA-Z]*$/.test(name)){  //if the name doest match our regular expression it returns a json as well
res.json({ 
  status:  "FAILED",
  message: "Invalid name entered"
})
}else if(!/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(email)) {
  res.json({
    status:  "FAILED",
    message: "Invalid email entered"
  });   //once the email is checked , we chheck for vaalidity of ourb date 
}else if (!new Date(dateOfBirth).getTime()){
  res.json({
    status:  "FAILED",
    message: "Invalid date of birth entered"
  });
}else if (password.length < 8){
  res.json({
    status:  "FAILED",
    message: "password is too short"
  }); // son once threre is no issue, we start rhew sign up process
} else {
  //checking if user exist
  UserSchema.find({email}).then(result =>{
if (result.length){
// if a user exist already we retrn already we return a message that yuser exist
res.json({
  status:  "FAILED",
  message: " User with the provided email already exist"
}); 

}else{
  // if user doesnt exist, we store the user in the database

  //password handling
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then(hashPassword =>{
const newUserSchema = new UserSchema({
  name,
  email,
  password: hashPassword,
  dateOfBirth
});
newUserSchema.save().then(result =>{
  res.json({
  status:  "SUCCESS",
  message: "Signup succesful",
  data : result
}); 
})
.then(err =>{
  res.json({
  status:  "FAILED",
  message: " An error occured saving user account"
}); 
})
  }).catch(err => {
    res.json({
      status:  "FAILED",
      message: " An error encountered while hashing password"
    }); 
  })
}
  }).catch(err =>{
    console.log(err);
    res.json({
      status:  "FAILED",
      message: "An error occured while checking for existing user"
    }); 
  })
}

})







//signin
app.post('/signin', (req, res)=>{
  let { email, password} = req.body;

email = email.trim(),
password = password.trim()
if (email == "" || password == "" ){
  
  res.json({
    status: "FAILED",
    message: "Empty credentials supplied"
  });   
  }else{
    UserSchema.find({email})
    .then(data =>{
      if(data.length){
        const hashPassword = data[0].password;
        bcrypt.compare(password, hashPassword).then(result =>{
          if (result){
            res.json({
              status: 'SUCCESS',
              message: 'Signin Successful',
              data:data
            })
          }else{
            res.json({
              status: 'FAILED',
              message: 'Invalid Password entered'
            }) 
          }
        }).catch(err =>{
          res.json({
            status: 'FAILED',
            message: 'An error occured while comparing Password'
          }) 
         })
          } else {
            res.json({
              status: 'FAILED',
              message: 'Invalid credentials entered'
            }) 
 }
    }).catch(err=>{
      res.json({
        status: 'FAILED',
        message: 'An error occured while checking for existing user'
      }) 

    })
  }
})





app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });

