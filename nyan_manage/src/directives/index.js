import hasPermi from "./hasPermi";
/**
 * 全局自定义指令
 */
export const directives = {
    install(app) {
        app.directive("hasPermi", hasPermi);
    }
};