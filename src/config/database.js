const mongoose = require('mongoose');
const {MONGODB_URL} = require('./serverConfig')
const connect =()=>{
    mongoose.connect(MONGODB_URL);
}

module.exports = connect;