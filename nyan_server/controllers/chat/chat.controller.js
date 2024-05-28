const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const chatSchema = require('../../schema/chat/index');
// 菜单服务
const chatService = require('../../services/chat/chat.service');

/* 
 * 发送消息
 * @route GET /api/chat/sendMsg
 * @group 聊天管理 - 发送
 * @param {object}
 * @returns {object} 0 - chat object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/sendMsg', expressJoi(chatSchema.send_limit), chatService.sendMsg);

/**
 * 查询聊天记录-分页
 * @route GET /api/chat/list
 * @group 聊天管理 - list of chat 
 * @returns {object} 200 - chat list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/list', chatService.chatList);

module.exports = router;