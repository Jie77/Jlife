const mongoose = require('mongoose');
const { dbpath } = require('./config');

mongoose.connect(dbpath, {useNewUrlParser: true});
mongoose.connection('connected',()=>{
    console.log('connect success!');
})
mongoose.connection('error',(err)=>{
    console.log(`connect error: ${err}`);
})
mongoose.connection('disconnected',()=>{
    console.log('connect disconnected');
})

module.exports = mongoose;