const Blog = require('../model/blog.model');
const User = require('../model/user.model');

const AppError = require('../utils/AppError');

exports.addBlog = async (req,res,next) => {
	try {
		const blog = {...req.body , postedUser : req.user._id};
		const newBlog = await Blog.create(blog);

		res.status(201).json({
			status : 'success',
			data : {
				newBlog
			}
		});
	} catch(err) {
		return next(err);
	}
}

exports.getAllBlog = async (req,res,next) => {
	const Blogs = await Blog.find().sort('');

	res.status(200).json({
		status : 'success',
		data : {
			no_of_Blogs : Blogs.length,
			Blogs
		}
	});
}

exports.myBlogs = async (req,res,next) => {
	const Blogs = await Blog.find({postedUser : req.user._id});

	res.status(200).json({
		status : 'success',
		data : {
			no_of_Blogs : Blogs.length,
			Blogs
		}
	});
}

exports.getBlogById = async (req,res,next) => {
	try {
		const blog = await Blog.findById(req.params.id);

		if(!blog)
			return next(new AppError('no Blog found with this Id',404));

		res.status(200).json({
			status : 'success',
			data : {
				blog
			}
		});
	} catch(err) {
		return next(err);
	}
}

exports.updateBlog = async (req,res,next) => {
	try {
		if(req.body.likes)
			delete req.body.likes;

		const checkBlog = await Blog.findOne({postedUser : req.user._id , _id : req.params.id});

		if(!checkBlog) 
			return next(new AppError('user has no Blog with this Id',404));

		const updatedBlog = await Blog.findOneAndUpdate({_id : req.params.id},req.body,{
			new : true,
			runValidators : true
		});

		res.status(200).json({
			status : 'success',
			data : {
				updatedBlog
			}
		});
	} catch(err) {
		return next(err);
	}
}

exports.deleteBlog = async (req,res,next) => {

	const checkBlog = await Blog.findOne({postedUser : req.user._id , _id : req.params.id});

	if(!checkBlog) 
		return next(new AppError('user has no Blog with this Id',404));

	const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status : 'success',
		message : 'Blog deleted'
	})
}