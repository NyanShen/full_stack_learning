class SilentLogin {
    TOKEN_KEY = "silent_login_token";
    constructor() {
        console.log("SilentLogin init......")
    }
    fetchCode(retryCount = 3) {
        let self = this;
        return uni.getProvider({ service: 'oauth' }) // 使用uni.getProvider异步获取方式
            .then(res => {
                return uni.login({ provider: res.provider });
            })
            .then(res => {
                if (res.code) {
                    return res.code; 
                }
                if (--retryCount > 0) {
                    return self.fetchCode(retryCount)
                } else {
                    // throw new Error, 下方catche 会捕获到
                    throw new Error("获取code失败");
                }
            })
            .catch(err => {
                // err.message = "获取code失败";
                err.message && $uniApi.alert(err.message);
                // 其他异常抛出去, 由调用者捕获处理
                return Promise.reject(err);
            })
    }
}