<template>
    <h1>管理员</h1>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="帖子" name="first">
            <el-card v-for="post in postsArray" :key="post._id" class="mb-2">
                <el-row>
                    <el-col :span="9">
                        <nuxt-link :to="`/post/${post._id}`" class="goPost">{{ post.title }}</nuxt-link>
                    </el-col>
                    <el-col :span="9">
                        <el-text>{{ post.updatedAt.split('T')[0] }}</el-text>
                    </el-col>
                    <el-col :span="6" class="text-right">
                        <el-link :underline="false" @click="deletePost(post._id)">删除</el-link>
                    </el-col>
                </el-row>
            </el-card>
            <el-pagination background layout="prev, pager, next" :total="postsTotal" :page-size="10" :pager-count="5"
                style="justify-content: center;" @current-change="handlePostPageChange" />
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
            <el-card v-for="comment in commentsArray" :key="comment._id" class="mb-2">
                <el-row>
                    <el-col :span="9">
                        <nuxt-link :to="`/post/${comment.postId}`" class="goPost">{{ comment.content }}</nuxt-link>
                    </el-col>
                    <el-col :span="3">用户名: {{ comment.username }}</el-col>
                    <el-col :span="6">
                        <el-text>{{ comment.createdAt.split('T')[0] }}</el-text>
                    </el-col>
                    <el-col :span="6" class="text-right">
                        <el-link :underline="false" @click="deleteComment(comment._id)">删除</el-link>
                    </el-col>
                </el-row>
            </el-card>
            <el-pagination background layout="prev, pager, next" :total="commentsTotal" :page-size="10" :pager-count="5"
                style="justify-content: center;" @current-change="handleCommentPageChange" />
        </el-tab-pane>

    </el-tabs>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { getPosts, deletePostById } from '~/apis/post';
import { delteComment, getAllComments } from '~/apis/comment'
const activeName = ref('first')
const currentPage = ref(1)
const currentCommentsPage = ref(1)
const keyWords = ref('')
const type = ref('')
interface postArrayItem {
    _id: string,
    type: string,
    title: string,
    content: string,
    visitors: number,
    comments: number,
    username: string,
    avatar: string,
    updatedAt: string
}
interface commentsArrayItem {
    _id: string,
    postId: string,
    content: string,
    parentId: string,
    replyId: string,
    createdAt: string,
    userId: string,
    username: string
}
const postsArray = ref<postArrayItem[]>([])
const postsTotal = ref(0)
const commentsArray = ref<commentsArrayItem[]>([])
const commentsTotal = ref(0)

onMounted(async () => {
    const posts = await getPosts(currentPage.value, keyWords.value, type.value)
    const postsData = await posts?.json()
    if (postsData.code === 0) {
        postsArray.value = postsData.data.result
        postsTotal.value = postsData.data.total
    } else {
        console.log('Error in getting posts');
    }
})

const handlePostPageChange = async (val: number) => {
    currentPage.value = val
    const posts = await getPosts(currentPage.value, keyWords.value, type.value)
    const postsData = await posts?.json()
    if (postsData.code === 0) {
        postsArray.value = postsData.data.result
        postsTotal.value = postsData.data.total
    } else {
        console.log('Error in getting posts');
    }
}

const handleCommentPageChange = async (val: number) => {
    currentCommentsPage.value = val
    const comments = await getAllComments(currentCommentsPage.value)
    const commentsData = await comments?.json()
    if (commentsData.code === 0) {
        commentsArray.value = commentsData.data.comments
        commentsTotal.value = commentsData.data.total
    } else {
        console.log('Error in getting comments');
    }
}

const handleClick = async (tab: TabsPaneContext, event: Event) => {
    if (tab.props.name === 'first') {
        // 获取所有帖子
        const posts = await getPosts(currentPage.value, keyWords.value, type.value)
        const postsData = await posts?.json()
        if (postsData.code === 0) {
            postsArray.value = postsData.data.result
            postsTotal.value = postsData.data.total
        } else {
            console.log('Error in getting posts')
        }
    } else {
        // 获取所有评论
        const comments = await getAllComments(currentCommentsPage.value)
        const commentsData = await comments?.json()
        if (commentsData.code === 0) {
            commentsArray.value = commentsData.data.comments
            commentsTotal.value = commentsData.data.total
        } else {
            console.log('Error in getting comments');
        }
    }
}

const deletePost = async (id: string) => {
    const res = await deletePostById(id)
    const resData = await res?.json()
    if (resData.code === 0) {
        ElMessage.success('删除成功')
        const posts = await getPosts(currentPage.value, keyWords.value, type.value)
        const postsData = await posts?.json()
        if (postsData.code === 0) {
            postsArray.value = postsData.data.result
            postsTotal.value = postsData.data.total
        } else {
            console.log(postsData.msg)
        }
    } else {
        console.log(resData.msg)
    }
}

const deleteComment = async (id: string) => {
    const res = await delteComment(id)
    const resData = await res?.json()
    if (resData.code === 0) {
        ElMessage.success('删除成功')
        const comments = await getAllComments(currentCommentsPage.value)
        const commentsData = await comments?.json()
        if (commentsData.code === 0) {
            commentsArray.value = commentsData.data.comments
            commentsTotal.value = commentsData.data.total
        } else {
            console.log(commentsData.msg)
        }
    } else {
        console.log(resData.msg)
    }
}
</script>

<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>