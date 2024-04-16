import { defineStore } from "pinia"
import { fetchUser } from "@api/modules/user";
import { removeToken } from "../common/cookies";
import defaultAvatar from "@/assets/default_avatar.png"


export const useUserStore = defineStore('user', {
    state: () => ({
        id: "", // 用户ID
        name: "", // 用户名称
        avatar: "", // 用户头像
        roles: [], // 关联角色
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
        async loadUser() {
            try {
                let res = await fetchUser();
                if (res.data.code !== 0) {
                    return Promise.reject(new Error(res.data.msg))
                }
                let { id, name, avatar, roleId, account } = res.data.data;
                this.setId(id);
                this.setName(name || account);
                this.setAvatar(avatar);
                this.setRoles(roleId ? [roleId] : []);
                return res.data.data;
            } catch (error) {
                return Promise.reject(error)
            }
        },
        logout() {
            this.setRoles([]);
            removeToken();
        }
    },
})