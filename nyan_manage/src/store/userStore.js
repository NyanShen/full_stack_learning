import { defineStore } from "pinia"
import { fetchUser } from "@api/modules/user";
import { fetchUserMenus } from "@api/modules/permission";
import { removeToken } from "@common/cookies";
import { formatTree, generateRoutes } from "@common/utils";
import defaultAvatar from "@/assets/default_avatar.png"


export const useUserStore = defineStore('user', {
    state: () => ({
        id: "", // 用户ID
        name: "", // 用户名称
        avatar: "", // 用户头像
        roles: [], // 关联角色
        permissions: [], // 关联权限
        menuTree: []
    }),
    getters: {
        rolesStr: (state) => state.roles.join(','),
        userAvatar: (state) => state.avatar || defaultAvatar
    },
    actions: {
        setId(id) {
            this.id = id;
        },
        setName(name) {
            this.name = name;
        },
        setAvatar(avatar) {
            this.avatar = avatar;
        },
        setRoles(roles) {
            this.roles = roles;
        },
        setPermissions(permissions) {
            this.permissions = permissions;
        },
        setMenuTree(tree) {
            this.menuTree = tree;
        },
        async loadUser() {
            try {
                const res = await fetchUser();
                if (res.data.code !== 0) {
                    return Promise.reject(new Error(res.data.msg))
                }
                const { id, name, avatar, roles, account, permissions } = res.data.data;
                this.setId(id);
                this.setName(name || account);
                this.setAvatar(avatar);
                this.setRoles(roles ? [roles] : []);
                this.setPermissions(permissions ? [permissions] : []);
                return res.data.data;
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async loadMenuTree(codes) {
            try {
                const res = await fetchUserMenus({ codes });
                if (res.data.code !== 0) {
                    return Promise.reject(new Error(res.data.msg))
                }
                const menuTree = formatTree(res.data.data, "id", "pid");
                console.log("menuTree1111>>>", menuTree)
                this.setMenuTree(menuTree)
                return menuTree
            } catch (error) {
                return Promise.reject(error)
            }
        },
        logout() {
            this.setRoles([]);
            this.setPermissions([]);
            removeToken();
        }
    },
})