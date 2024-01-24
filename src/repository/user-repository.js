const User = require('../models/user');
const bcrypt = require('bcrypt');
const {SALT} = require('../config/serverConfig');
class UserRepository{
    async create(data){
        try {
            const {password} = data;
            const encryptedPassword = bcrypt.hashSync(password,SALT);
            data.password = encryptedPassword;
            const user= await User.create(data);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repo layer");
            throw error;
        }
    }
    async get(emailId){
        try {
            const user = await User.findOne({email:emailId});
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repo layer");
            throw error;
        }
    }
}
module.exports = UserRepository;