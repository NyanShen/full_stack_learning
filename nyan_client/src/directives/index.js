import hasPermi from "./hasPermi";
import watermark from "./watermark";
/**
 * 全局自定义指令
 */
export const directives = {
    install(app) {
        app.directive("hasPermi", hasPermi);
        app.directive("watermark", watermark);
    }
};