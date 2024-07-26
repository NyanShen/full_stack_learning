const db = require("../../models/index");
const customerModel = db.customer;

class CustomerService {
    /**
     * 新增客户
     */
    async create(customer) {
        try {

            return await customerModel.create(customer);
        } catch (error) {
            
        }
    }

}
module.exports = new CustomerService();