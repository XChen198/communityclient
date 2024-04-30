<template>
    <div>
        <el-row>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <aside>
                    <h1>网站名称</h1>
                    <el-button plain style="width: 100%; margin-top: 10px;" size="large" @click="ToLogin"
                        v-if="!isLogin">登录</el-button>
                    <span></span>
                    <el-button plain style="width: 100%; margin-top: 10px;" size="large" @click="ToSignup"
                        v-if="!isLogin">注册</el-button>
                    <el-button type="primary" plain style="width: 100%; margin-top: 10px;" size="large" v-if="isLogin"
                        @click="router.push('/account/publish')">个人中心</el-button>
                    <span></span>
                    <el-button type="danger" plain style="width: 100%; margin-top: 10px;" size="large" @click="ToLogout"
                        v-if="isLogin">退出登录</el-button>
                    <span>
                        在此输入帖子的标题，发帖人名称以搜索，分类可以不选
                    </span>
                    <div>
                        <el-select v-model="selectCategory" placeholder="选择分类" style="width: 100%">
                            <el-option label="招聘" value="招聘" />
                            <el-option label="新闻" value="新闻" />
                            <el-option label="生活" value="生活" />
                            <el-option label="科技" value="科技" />
                            <el-option label="娱乐" value="娱乐" />
                            <el-option label="社会" value="社会" />
                            <el-option label="编程" value="编程" />
                            <el-option label="不选" value="" />
                        </el-select>
                        <el-input v-model="searchInput" placeholder="输入要搜索的关键词" type="text" />
                        <el-button type="primary" style="width: 100%; margin-top: 10px;"
                            @click="getSearch">搜索</el-button>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                        style="width: 20px; vertical-align: bottom ;">
                        <path fill="currentColor"
                            d="M704 192h160v736H160V192h160v64h384zM288 512h448v-64H288zm0 256h448v-64H288zm96-576V96h256v96z">
                        </path>
                    </svg>
                    <span>最热帖子</span>
                    <div class="latestPost">
                        <ul>
                            <li v-for="post in hotPostArray">
                                <nuxt-link :to="`/post/${post._id}`" class="hotPost">
                                    {{ post.title }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <span>公告</span>
                    <div>
                        <!-- 写一个使用该网站的注意事项，比如不允许出现有毒言论亦或是诈骗等等 -->
                        <el-card shadow="always">
                            <p>本站旨在建立一个可用于交流的社区，你可以以游客的方式浏览内容或是创建一个账户来发表帖子，但禁止发布辱骂等敏感词汇，感谢大家的配合</p>
                        </el-card>
                        <el-card shadow="always">
                            <p>本站旨在建立一个可用于交流的社区，你可以以游客的方式浏览内容或是创建一个账户来发表帖子，但禁止发布辱骂等敏感词汇，感谢大家的配合</p>
                        </el-card>
                    </div>
                    <div style="height: 1px;"></div>
                </aside>
                <header>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                        @select="handleSelect">
                        <el-menu-item index="1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                                style="width: 24px;">
                                <path fill="currentColor"
                                    d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576">
                                </path>
                            </svg>
                            <span style="padding-left: 5px;">
                                首页
                            </span>
                        </el-menu-item>
                        <div class="flex-grow"></div>
                        <el-menu-item index="2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                                style="width: 24px;">
                                <path fill="currentColor"
                                    d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704">
                                </path>
                            </svg>
                            <span style="padding-left: 5px; padding-right: 15px;">搜索</span>
                        </el-menu-item>
                        <el-menu-item index="3" v-if="!isLogin">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                                style="width: 24px;">
                                <path fill="currentColor"
                                    d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0">
                                </path>
                            </svg>
                            <span style="padding-left: 5px;">注册/登录</span>
                        </el-menu-item>
                        <el-sub-menu index="4" v-else="isLogin" close-on-click-outside="true">
                            <template #title>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                                    style="width: 24px;">
                                    <path fill="currentColor"
                                        d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0">
                                    </path>
                                </svg>
                                <span style="padding-left: 5px;">{{ userStore.userInfo?.username }}</span>
                            </template>
                            <el-menu-item index="4-1">个人中心</el-menu-item>
                            <el-menu-item index="4-2" style="color: #f56c6c;">
                                退出登录
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                    <transition name="el-zoom-in-top">
                        <div v-if="showSearchBox" class="searchBox">
                            <el-input v-model="searchInput" placeholder="输入关键词" size="large">
                                <template #prepend>
                                    <el-select v-model="selectCategory" placeholder="选择" style="width: 105px;"
                                        size="large">
                                        <el-option label="招聘" value="招聘" />
                                        <el-option label="新闻" value="新闻" />
                                        <el-option label="生活" value="生活" />
                                        <el-option label="科技" value="科技" />
                                        <el-option label="娱乐" value="娱乐" />
                                        <el-option label="社会" value="社会" />
                                        <el-option label="编程" value="编程" />
                                        <el-option label="不选" value="" />
                                    </el-select>
                                </template>
                                <template #append>
                                    <el-button type="primary" style="width: 70px;" @click="getSearch">搜索</el-button>
                                </template>
                            </el-input>
                        </div>
                    </transition>
                </header>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <main>
                    <NuxtLink v-for="post in postArray" :key="post._id" :to="`/post/${post._id}`">
                        <div>
                            <el-avatar :size="50" :src="post.avatar" style="vertical-align: middle">
                                <img src="../../public/img/avatar.png">
                            </el-avatar>
                            <span>{{ post.username }}</span>
                            <h4>{{ post.title }}</h4>
                            <p class="content" v-html="post.content" style="width:100%; margin-bottom: 5px">
                            </p>
                            <span>
                                {{ post.createdAt.split('T')[0] }}
                            </span>
                            <span style="float: right;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                                    style="width: 20px; vertical-align: text-bottom">
                                    <path fill="currentColor"
                                        d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160">
                                    </path>
                                </svg> {{ post.visitors }}
                            </span>
                            <span style="float: right;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                                    style="width: 20px; vertical-align: text-bottom">
                                    <path fill="currentColor"
                                        d="m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.056 461.056 0 0 1-206.912-48.384l-175.616 58.56z">
                                    </path>
                                    <path fill="currentColor"
                                        d="M512 563.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4">
                                    </path>
                                </svg> {{ post.comments }}
                            </span>
                        </div>
                    </NuxtLink>
                    <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" :pager-count="5"
                        style="justify-content: center;" @current-change="handlePageChange" />
                </main>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/user';
import { getUserInfo } from '~/apis/user'
import { getPosts, getHotPosts } from '~/apis/post'
import { logout } from '~/apis/auth';
const router = useRouter()
const userStore = useUserStore()
const activeIndex = ref('1')
const searchInput = ref('')
const selectCategory = ref('')
const showSearchBox = ref(false)
const isLogin = ref(false)
const currentPage = ref(1)
const hotPostArray = ref<hotPostArrayItem[]>([])
const postArray = ref<postArrayItem[]>([])

interface hotPostArrayItem {
    _id: string,
    title: string
}

interface postArrayItem {
    _id: string,
    type: string,
    title: string,
    content: string,
    visitors: number,
    comments: number,
    username: string,
    avatar: string,
    updatedAt: string,
    createdAt: string
}

const total = ref(0)

onMounted(async () => {
    getSearch()
    let response: Response | undefined;
    response = await getUserInfo()
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            isLogin.value = true;
            userStore.setUserInfo(responseData.data)
        } else {
            isLogin.value = false;
            console.log('Error fetching user info', responseData.message);
        }
    } else {
        console.log('Error fetching user info');
    }
    let result: Response | undefined;
    result = await getHotPosts()
    if (result) {
        const resultData = await result.json()
        if (resultData.code === 0) {
            hotPostArray.value = resultData.data
        } else {
            console.log('Error fetching hot posts', resultData.message);
        }
    } else {
        console.log('Error fetching hot posts');
    }
})

const handleSelect = async (key: string) => {
    if (key === '1') {
        router.push('/')
    } else if (key === '2') {
        showSearchBox.value = !showSearchBox.value
    } else if (key === '3') {
        ToLogin()
    } else if (key === '4-1') {
        router.push('/account/publish')
    } else if (key === '4-2') {
        ToLogout()
    }
}

const ToLogin = () => {
    router.push('/login')
}
const ToSignup = () => {
    router.push('/signup')
}

const ToLogout = async () => {
    let response: Response | undefined;
    response = await logout();
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            isLogin.value = false;
            ElMessage({
                message: responseData.message,
                type: 'success'
            })
        } else {
            ElMessage({
                message: responseData.message,
                type: 'error'
            })
        }
    } else {
        console.log('Error logging out');
    }
}

const handlePageChange = (val: number) => {
    currentPage.value = val
    getSearch()
}

const getSearch = async () => {
    let result: Response | undefined;
    result = await getPosts(currentPage.value, searchInput.value, selectCategory.value)
    if (result) {
        const resultData = await result.json()
        if (resultData.code === 0) {
            postArray.value = resultData.data.result
            total.value = resultData.data.total
        } else {
            console.log('Error fetching posts', resultData.message);
        }
    } else {
        console.log('Error fetching posts');
    }

}

</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #e9f2f9;
}

.flex-grow {
    flex-grow: 1;
}


h1 {
    text-align: center;
}


aside {
    height: 100%;
    background-color: #e9f2f9;
    border-right: 1px solid #d3dce6;
}

aside span {
    display: inline-block;
    margin-top: 30px;
}

aside div {
    margin-top: 20px;
}

aside .latestPost ul li {
    list-style: none;
    margin-top: 15px;
    margin-left: 10px;
}


.header {
    position: relative;
}

.searchBox {
    position: absolute;
    width: 100%;
}

main {
    height: 100%;
}

main a {
    text-decoration: none;
    color: black;
}

main div {
    margin: 0 auto;
    background-color: #ffffff;
    padding: 10px;
    border: 1px solid #d3dce6;
}

main div:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

main div h4 {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
}

main div span {
    margin-left: 10px;
}

main div p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-left: 10px;
    overflow: hidden;
}

.hotPost {
    text-decoration: none;
    color: #409eff;
    font-size: 14px;
}

.hotPost:hover {
    text-decoration: underline;
}

@media screen and (min-width: 991px) {
    header {
        display: none;
    }
}


@media screen and (max-width: 991px) {
    aside {
        display: none;
    }
}
</style>