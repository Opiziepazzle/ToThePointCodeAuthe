require('dotenv').config();
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectionParams={
    useNewUrlParser: true,
//  useCreateIndex: false,
    useUnifiedTopology: true 
}

mongoose.connect(process.env.MONGODB_URI,connectionParams 
    ).then((data)=>{
        console.log('DATABASE CONNECTION SET')
    }).catch((err)=>{
        console.log(err)
    })



