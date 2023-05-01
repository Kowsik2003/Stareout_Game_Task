const User = require('../model/user.model');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');


module.exports = async (req,res,next) => {
	try {
	    let token;
	    if (
	      req.headers.authorization &&
	      req.headers.authorization.startsWith("Bearer")
	    ) {
	      token = req.headers.authorization.split(" ")[1];
	    }
    
		if(!token)
			return next(new AppError('user not logged In',403));

		const jwtId = await promisify(jwt.verify)(token,process.env.JWT_KEY);

		const jwtUser = await User.findById(jwtId.id);

		if(!jwtUser)
			return next(new AppError('The user does not exist !',404));

		req.user = jwtUser;
		next();
	} catch (err) {
		return next(err);
	}
}