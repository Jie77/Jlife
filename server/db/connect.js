const mongoose = require('mongoose');
const { dbpath } = require('./config');

mongoose.connect(dbpath, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.on('connected',()=>{
    console.log('connect success!');
})
connection.on('error',(err)=>{
    console.log(`connect error: ${err}`);
})
connection.on('disconnected',()=>{
    console.log('connect disconnected');
})

module.exports = mongoose;