
const bodyParser = require('body-parser').json
const bcrypt = require('bcrypt')


app.post('/signup', async (req, res)=>{
    let {name, email, password, dateOfBirth} = req.body;

    try {
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
            }else if(/^[a-zA-Z]*$/.test(name)){  //if the name doest match our regular expression it returns a json as well
                res.json({ 
                  status:  "FAILED",
                  message: "Invalid name entered"
                })
                }else if(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(email)) {
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
//                  await UserSchema.find({email})} catch(result =>{
//                 if (result.length){
//                 // if a user exist already we retrn already we return a message that yuser exist
//                 res.json({
//                   status:  "FAILED",
//                   message: " User with the provided email already exist"
//                 }); 
                
//                 }
//             });
//             else{
//                   // if user doesnt exist, we store the user in the database
                
//                   //password handling
//                   const saltRounds = 10;
//                   bcrypt.hash(password, saltRounds).then(hashPassword =>{
//                 const newUserSchema = new UserSchema({
//                   name,
//                   email,
//                   password: hashPassword,
//                   dateOfBirth
//                 });
//                await  newUserSchema.save().then(result =>{
//                   res.json({
//                   status:  "SUCCESS",
//                   message: "Signup succesful",
//                   data : result
//                 }); 
//                 })

// }catch(e){

//}



})