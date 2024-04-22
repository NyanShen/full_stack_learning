/**
 * 是否有权限自定义指令
 * 控制html元素是否显示
 */
import { useUserStore } from '@store/userStore';
export default {
    mounted(el, binding) {
        // 获取指令传入的值
        const { value } = binding;
        const allPermissions = "*";
        // 获取用户权限
        const userStore = useUserStore();
        const userPermissions = userStore.permissions;
        if (value && value instanceof Array && value.length > 0) {
            // 判断是否拥有权限, 如果指令传入的权限value在用户权限列表内则显示元素
            const hasPermission = userPermissions.some(item => {
                return allPermissions === item || value.includes(item)
            });
            // 没有权限则移除元素
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`请设置操作权限标签值`);
        }
    }
}