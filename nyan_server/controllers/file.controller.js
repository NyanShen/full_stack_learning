const express = require("express");
const multer = require("multer"); // 文件上传服务
const db = require("../models/index.js");
const imageModel = db.image;

const router = express.Router();

// 文件上传-设置存储位置
const storage = multer.diskStorage({
	//保存路径
	destination: function(req, file, cb) {
		cb(null, 'public/images')
		//注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
	},
	//保存在 destination 中的文件名
	filename: function(req, file, cb) {
		/**
		  {
			  fieldname: 'image',
			  originalname: '25915814.jpeg',
			  encoding: '7bit',
			  mimetype: 'image/jpeg',
			  destination: 'public/images',
			  filename: 'image_1711368372348.png',
			  path: 'public/images/image_1711368372348.png',
			  size: 23350
			}
		 */
		cb(null, `${file.fieldname + '_' + Date.now()}.png`)
	}
})
const upload = multer({
	storage: storage
})
/**
 * 上传图片
 */
router.post('/upload/image', upload.single('image'), (req, res) => {
	const imageUrl = req.file.path;
	const filePath = `http://localhost:3000/images/${req.file.filename}`

	imageModel.create({
		name: "测试",
		path: filePath
	}).then(image => {
		res.json({
			code: 200,
			msg: '图片上传成功',
			data: filePath
		});
	}).catch(error => {
		res.status(500).json({
			message: '图片上传失败',
			error
		});
	});
});
/**
 * 删除图片
 */
const fs = require('fs');
const path = require('path');
router.delete('/delete/image/:imageName', (req, res) => {
	const imageName = req.params.imageName;
	// 目录需要是项目下的public/images
	const filePath = path.join(__dirname, '../', 'public/images', imageName);
	fs.unlink(filePath, (err) => {
		if (err) {
			res.status(500).send('Error deleting the image.');
		} else {
			res.status(200).send('Image deleted successfully.');
		}
	});
});

/**
 * 传文件全路径删除图片
 */
router.delete('/delete/filePath', async (req, res) => {
	let imageName = req.body.filePath.split("/").pop();
	const filePath = path.join(__dirname, '../', 'public/images', imageName);
	fs.unlink(filePath, (err) => {
		if (err) {
			res.status(500).send('Error deleting the image.');
		} else {
			res.status(200).send('Image deleted successfully.');
		}
	});
});

module.exports = router;