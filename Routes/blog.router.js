const express = require('express');

const BlogCtrl = require('../controller/blogCtrl');
const userCtrl = require('../controller/userCtrl');

const protect = require('../middleware/protect')

const router = express.Router();

router.route('/')
	.get(protect,BlogCtrl.getAllBlog)
	.post(protect,BlogCtrl.addBlog);

router.route('/myblog')
	.get(protect,BlogCtrl.myBlogs);

router.route('/:id')
	.patch(protect,BlogCtrl.updateBlog)
	.delete(protect,BlogCtrl.deleteBlog)
	.get(protect,BlogCtrl.getBlogById);


module.exports = router;