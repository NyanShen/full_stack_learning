/**
 * 新增一个sendResult方格式化返回数据格式
 * @returns 
 */
module.exports = function responseFormatter() {
    return (req, res, next) => {
        res.sendResult = (err, status = -1, data = null) => {
            res.send({
                code: status,
                msg: err instanceof Error ? err.message : err,
                data
            })
        };
        next()
    }
}