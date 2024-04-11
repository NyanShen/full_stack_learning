import { ElMessage, ElMessageBox } from "element-plus";

export default {
    success(msg) {
        ElMessage({ message: msg, type: "success" });
    },
    error(msg) {
        ElMessage({ message: msg, type: "error" });
    },
    warnConfirm(msg, confirmButtonText = '确认', cancelButtonText = '取消') {
        return ElMessageBox.confirm(msg, '温馨提示', {
            confirmButtonText,
            cancelButtonText,
            type: 'warning',
        })
    }
}