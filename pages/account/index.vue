<template>
    <el-row>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
            <el-menu default-active="1-1" class="el-menu-vertical-demo" @select="handleSelect" :default-openeds="['1']">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0">
                                </path>
                            </svg>
                        </el-icon>
                        <span>用户名:{{ userStore.userInfo?.username }}</span>
                    </template>
                    <el-menu-item index="1-0">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576">
                                </path>
                            </svg>
                        </el-icon>
                        <span>
                            返回首页
                        </span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z">
                                </path>
                                <path fill="currentColor"
                                    d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z">
                                </path>
                            </svg>
                        </el-icon>
                        <span>
                            发布帖子
                        </span>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z">
                                </path>
                                <path fill="currentColor" d="M480 192h64v704h-64z"></path>
                            </svg>
                        </el-icon>
                        <span>
                            查看已发布的帖子
                        </span>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0m544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z">
                                </path>
                            </svg>
                        </el-icon>
                        <span>
                            我的信息
                        </span>
                    </el-menu-item>
                    <el-menu-item index="1-4">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0">
                                </path>
                            </svg>
                        </el-icon>
                        <span>
                            我的头像
                        </span>
                    </el-menu-item>
                    <el-menu-item index="1-5" v-if="isAdmin">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96">
                                </path>
                                <path fill="currentColor"
                                    d="M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32m192-160v-64a192 192 0 1 0-384 0v64zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64">
                                </path>
                            </svg>
                        </el-icon>
                        <span>
                            管理员
                        </span>
                    </el-menu-item>
                    <el-menu-item index="1-6">
                        <el-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128z">
                                </path>
                                <path fill="currentColor" d="M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32">
                                </path>
                            </svg>
                        </el-icon>
                        <span>
                            退出登录
                        </span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <main>
                <NuxtPage />
            </main>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user';
import { logout, checkAdmin } from '~/apis/auth';
import { getUserInfo } from '~/apis/user'
const userStore = useUserStore();
const router = useRouter()
const isAdmin = ref(false)

onMounted(async () => {
    let response: Response | undefined;
    response = await getUserInfo()
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            userStore.setUserInfo(responseData.data)
        } else {
            router.push('/login')
        }
    } else {
        console.log('Error fetching user info');
    }
    response = await checkAdmin()
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            isAdmin.value = true
        } else {
            console.log('Error fetching admin info');
        }
    } else {
        console.log('Error fetching admin info');
    }
})



const handleSelect = (key: string) => {
    if (key === '1-0') {
        router.push('/')
    } else if (key === '1-1') {
        router.push('/account/publish')
    } else if (key === '1-2') {
        router.push('/account/published')
    } else if (key === '1-3') {
        router.push('/account/info')
    } else if (key === '1-4') {
        router.push('/account/avatar')
    } else if (key === '1-5') {
        router.push('/account/admin')
    } else if (key === '1-6') {
        logout()?.then(() => {
            router.push('/login')
        })
    }
}

</script>

<style scoped>
.el-menu {
    border: none;
}
</style>