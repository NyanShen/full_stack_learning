const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const categorySchema = require('../../schema/onlineOrder/order');
// 服务
const orderService = require('../../services/onlineOrder/order.service');

/* 
 * @route POST /api/onlineOrder/order/createPayMethod
 * @group 
 * @param {object}
 * @returns {object} 0 - 
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/createPayMethod', orderService.createPayMethod);
/* 
 * @route POST /api/onlineOrder/order/createBusinessOrder
 * @group 
 * @param {object}
 * @returns {object} 0 - 
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/createBusinessOrder', expressJoi(categorySchema.order_limit), orderService.createBusinessOrder);

/* 
 * @route POST /api/onlineOrder/order/createPayOrder
 * @group 
 * @param {object}
 * @returns {object} 0 - 
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/createPayOrder', expressJoi(categorySchema.pay_limit), orderService.createPayOrder);

module.exports = router;
