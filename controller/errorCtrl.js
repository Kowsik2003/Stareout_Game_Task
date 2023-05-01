const AppError = require('../utils/AppError');

module.exports = (err,req,res,next) => {

   if(!err.statusCode)
   {
        err.statusCode = 500
        err.message = err.message
   }

  	res.status(err.statusCode).json({
  		status : 'fail',
        message : err.message
  	});
 }