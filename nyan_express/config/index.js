
/**
 * @description 读取配置文件
 * @author NyanShen
 * @date 2024-07-26 09:09:09
 * @version 1.0.0
 * __dirname: 当前文件所在目录
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // yaml文件

const configFile = fs.readFileSync(path.join(__dirname, '../config.yml'), 'utf8');
const config = yaml.load(configFile);

module.exports = config;