const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        
      },

      password: {
        type: String,
        
      },
    
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
    
      dateOfBirth: {

        type: String,
        
      },
})
module.exports =  mongoose.model('List', UserSchema)