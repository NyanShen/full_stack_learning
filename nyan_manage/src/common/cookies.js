import Cookies from "js-cookie";
import { Base64 } from "js-base64";
/**
 * 登录token缓存
 */
const TOKEN_KEY = "Login_Token";

export function getToken() {
    return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
    return Cookies.remove(TOKEN_KEY)
}

/**
 * 登录信息-记住我功能
 */
const LOGIN_KEY = "Login_Info";
export function getLoginInfo() {
    let storageData = JSON.parse(decodeURIComponent(Cookies.get(LOGIN_KEY)));
    return {
        password: Base64.decode(storageData?.password || ""),
        account: storageData?.account,
        rememberMe: storageData?.rememberMe
    }
}
export function setLoginInfo(loginInfo) {
    let password = Base64.encode(loginInfo.password);
    let storageData = {
        ...loginInfo,
        password,
    }
    return Cookies.set(LOGIN_KEY, encodeURIComponent(JSON.stringify(storageData)), { expires: 30 })
}
export function removeLoginInfo() {
    return Cookies.remove(LOGIN_KEY)
}