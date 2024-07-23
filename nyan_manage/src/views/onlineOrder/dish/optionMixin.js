import { toRefs, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
    fetchOptionList,
    fetchDishOptionList,
    updateDishOptions,
    removeDishOptions,
} from "@api/modules/onlineOrder";
export const useDishOption = () => {
    let optionState = reactive({
        options: [], // 可选择菜品选项
        dishOptions: [], // 菜品已设置的菜品选项
        optionIds: [], // 需要新增的菜品选项
        delOptionIds: [], // 需要删除的菜品选项
        optionDialogVisible: false,
    })
    let { options, dishOptions, optionIds, delOptionIds, optionDialogVisible } = toRefs(optionState)
    /**
     * 获取菜品选项
     */
    const loadOptionList = () => {
        fetchOptionList()
            .then((res) => {
                options.value = res.data.data;
            })
            .catch(() => { });
    };
    /**
     * 获取菜品-菜品选项
     * dishId
     */
    const loadDishOptionList = (dishId) => {
        fetchDishOptionList({ dishId })
            .then((res) => {
                dishOptions.value = res.data.data;
                return fetchOptionList()
            })
            .then((res) => {
                options.value = res.data.data.map(item => {
                    return {
                        ...item,
                        disabled: dishOptions.value.some(dishOption => dishOption.id === item.id)
                    }
                });
            })
            .catch(() => { });
    };
    /**
     * 新增菜品选项
     */
    const bindDishOptions = (dishId) => {
        if (optionIds.value.length === 0) {
            return;
        }
        updateDishOptions({
            id: dishId,
            optionIds: optionIds.value.join(","),
        }).then((res) => {
            if (res.data.code !== 0) {
                ElMessage.error(res.data.msg);
                return;
            }
            ElMessage.success("保存成功.");
            optionIds.value = [];
            loadDishOptionList(dishId);
        });
    };
    /**
     * 删除菜品选项
     */
    const deleteDishOptions = (dishId) => {
        removeDishOptions({
            id: dishId,
            optionIds: delOptionIds.value.join(","),
        }).then((res) => {
            if (res.data.code !== 0) {
                ElMessage.error(res.data.msg);
                return;
            }
            ElMessage.success("删除成功.");
            delOptionIds.value = [];
            loadDishOptionList(dishId);
        });
    };
    const handleSelectionChange = (val) => {
        delOptionIds.value = val.map((item) => item.id);
    }
    return {
        options,
        dishOptions,
        optionIds,
        delOptionIds,
        optionDialogVisible,
        loadDishOptionList,
        bindDishOptions,
        deleteDishOptions,
        handleSelectionChange
    }
}