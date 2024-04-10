import { ElMessage, ElMessageBox } from "element-plus";

export default {
    success(msg) {
        ElMessage({ message: msg, type: "success" });
    },
    error(msg) {
        ElMessage({ message: msg, type: "error" });
    }
}