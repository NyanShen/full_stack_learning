import jsbarcode from "./jsbarcode.js";
import $uniApi from "../uni.app.api.js";

function convert_length(len) {
    let result = $uniApi.loadSystemInfoSync();
    return Math.round(len * result.windowWidth / 750);
}

export function tobarcode(canvasId, component, code, width, height) {
    let ctx = uni.createCanvasContext(canvasId, component);
    jsbarcode.code128(ctx, code, convert_length(width), convert_length(height));
}