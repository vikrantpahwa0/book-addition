const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); 
require("dotenv").config();


class UserService {
  // 🔹 Hash password before saving (called in Register)
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // 🔹 Register user
  static async registerUser(email, password, name) {
    try {
    const userAlreadyExists = await User.findOne({where:{email:email.trim().toLowerCase()}})
    if(userAlreadyExists){
        throw new Error("User Already Exists")
    }
    const hashedPassword = await this.hashPassword(password);
    const createdUser = await User.create({ name, email:email.trim().toLowerCase(), password: hashedPassword });
    return {id:createdUser.id}        
    } catch (error) {
        throw new Error(error.message)
    }    
  }

  // 🔹 Verify login credentials
  static async login(email, password) {
    const user = await User.findOne({ where: { email:email.trim().toLowerCase() } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email, name:user.name }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return { user:{id:user.id,name:user.name}, token };
  }
}

module.exports = UserService;
