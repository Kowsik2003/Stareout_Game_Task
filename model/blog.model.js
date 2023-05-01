const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	image : {
		type : String,
		required : [true,'image is required field']
	},
	title : {
		type : String ,
		required : [true,'title is required field']
	},
	description : {
		type : String,
		required : [true,'description is required field']
	},
	postedUser : {
		type : mongoose.Schema.ObjectId,
		required : true,
		ref : 'user'
	}
},{
	timestamps : true
});

const Post = mongoose.model('blog',blogSchema);

module.exports = Post;