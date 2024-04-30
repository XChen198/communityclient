import { defineStore } from "pinia";

interface UserInfo {
    _id: string,
    username: string,
    avatar: string,
    createdAt: string,
    updatedAt: string
}


export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo | null>(null)
    const setUserInfo = (newUser: UserInfo) => {
        userInfo.value = newUser
    }

    return {
        userInfo,
        setUserInfo
    }
})
