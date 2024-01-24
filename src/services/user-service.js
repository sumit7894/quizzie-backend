const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const ServiceError = require('../Errors/service-errors')
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }   
    
    async create(data){
        try {
            const existingUser = await this.userRepository.get(data.email);
            if(existingUser){
                throw new ServiceError('User already exist','Somthing went wrong in user creation');
            }
            const user = await this.userRepository.create(data);
            const token = await this.createToken(data.email,data.name);
            return [user,{"token":token}];
        } catch (error) {
            console.log("Somthing went wrong in the service layer",error);
            throw error;
        }
    }
    async createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY);
            return token;
        } catch (error) {
            console.log("Somthing went wrong in service layer in creating token");
            throw error;
        }
    }
    async get(email){
        try {
            const user = await this.userRepository.get(email);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the service layer");
            throw error;
        }
    }
    async comparePassword(password,hashedPassword){
        try {
            return bcrypt.compareSync(password,hashedPassword);
        } catch (error) {
            console.log("Somthing went wrong in matching the password");
        }
    }
    async login(data){
        try{
        const user = await this.get(data.email);
        if(!user){
            throw new ServiceError("No user exist with this email","Error in signin")
        }
        const matchPassword = await this.comparePassword(data.password,user.password);
        if(!matchPassword){
            throw new ServiceError("Wrong Password","Password doesn't match")
        }
        const token = await this.createToken(data.email,user.name);
        return token;
        }catch(error){
            console.log("Somthing went wrong in service layer",error);
            throw error;
        }
    }
}
module.exports = UserService;