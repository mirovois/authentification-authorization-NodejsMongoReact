const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
});

userSchema.methods.verifyPassword = async(enteredPassword) =>{
 return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = User = mongoose.model("user", userSchema);