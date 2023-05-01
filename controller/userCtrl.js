const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/AppError');


exports.loginUser = async (req,res,next) => {
	try {

		const email = req.body.email, password = req.body.password;

		if(!email || !password)
		{
			return next(new AppError('provide email and password',400));
		}

		const user = await User.findOne({email : email}).select('+password');

		//const test = await (user.checkPassword(password,user.password));
		if(!user || !(await (user.checkPassword(password,user.password))))
		{
			return next(new AppError('email or password is wrong',401));
		}	

		const token = jwt.sign({id : user._id},process.env.JWT_KEY,{
			expiresIn : process.env.JWT_EXPIRESIN
		});

		res.status(200).json({
			status : 'success',
			token
		});
		//console.log(token);
	}	catch (err) {
		return next(err);
	}
}

exports.registerUser = async (req,res,next) => {
	try {
		if(!req.body.email || !req.body.password)
			throw new AppError('provide email and password',400)

			const ck = await User.findOne({email : req.body.email});

			if(ck)
				throw new AppError('email already exist',409)

			const newuser = await User.create({
			email : req.body.email,
			password : req.body.password
			});

			newuser.password = undefined;
			//console.log(req.body);

			const token = jwt.sign({id : newuser._id},process.env.JWT_KEY,{
				expiresIn : process.env.JWT_EXPIRESIN
			});

			res.status(201).json({
				status : 'created',
				data : {
					newuser,token
				}
			});
 		} catch(err) {
 		 return	next(err);
 		}
}


