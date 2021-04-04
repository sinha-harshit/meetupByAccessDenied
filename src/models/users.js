const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    gender: {
        type: String,
        require:true
        
    },
    organization:{
        type: String,
        require:true
    },
    type:{
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true,
        unique:true
    },
    password: {
        type: String,
        require:true
    }
})

/*userSchema.pre("save", async function(next) {

    if(this.isModified("password")){

        this.password = await bcrypt.hash(this.password, 10);
    }
    
    next();
}); */


const Register = new mongoose.model("User", userSchema);
module.exports = Register;