const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : [true,'email is required field'],
		trim : true ,
		unique : true,
	},
	password : {
		type : String,
		required : [true,'password is required field'],
		trim : true,
		minlength : [6,'The password should atleast be 6 letters'],
		select : false
	},
},{
	timestamps : true
});

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password,10);
	next();
});

userSchema.methods.checkPassword = async function(givenPassword,userPassword) {
	return await bcrypt.compare(givenPassword,userPassword);
}
 
const User = mongoose.model('user',userSchema);

module.exports = User;