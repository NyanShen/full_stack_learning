const express = require("express");
const XLSX = require('xlsx');
const multer = require("multer"); // 文件上传服务

const router = express.Router();

// 文件上传-设置存储位置
const storage = multer.diskStorage({
	//保存路径
	destination: function (req, file, cb) {
		cb(null, 'public/images')
		//注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
	},
	//保存在 destination 中的文件名
	filename: function (req, file, cb) {
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
	const filePath = `http://localhost:3000/images/${req.file.filename}`
	res.json({
		code: 200,
		msg: '图片上传成功',
		data: filePath
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


router.get("/excelToJson", async (req, res) => {
	try {
		// 假设Excel文件位于项目的公共文件夹中，例如public/data.xlsx
		const file = XLSX.readFile('public/files/country.xls');
		const sheetNames = file.SheetNames;
		const sheet = file.Sheets[sheetNames[0]];
		const jsonData = XLSX.utils.sheet_to_json(sheet);
		const result = jsonData.sort(function (a, b) {
			let nameA = a.name.toUpperCase(); // 将name转换为大写以忽略大小写
			let nameB = b.name.toUpperCase(); // 将name转换为大写以忽略大小写
			return nameA < nameB ? -1 : nameA > nameB ? 1 : 0; // 比较大写字符串
		})
		res.json(result);
	} catch (error) {
		res.sendResult(error.message, 500);
	}
});

module.exports = router;