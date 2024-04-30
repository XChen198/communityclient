<template>
    <div class="back">
        <div class="backbtn" @click="$router.back()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""
                style="width:24px ; vertical-align: text-top">
                <path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"></path>
                <path fill="currentColor"
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z">
                </path>
            </svg>
            <span style="margin-left: 5px;">返回</span>
        </div>
    </div>
    <div class="post">
        <el-avatar :size="50" :src="post.avatar" style="vertical-align: middle">
            <img src="../../public/img/avatar.png">
        </el-avatar>
        <span class="username">{{ post.username }}</span>
        <div class="main">
            <h3>{{ post.title }}</h3>
            <div v-html="post.content"></div>
        </div>
        <div class="footer">
            <span>{{ post.updatedAt.split('T')[0] }}</span>
        </div>
    </div>
    <div class="comments">
        <el-text class="mx-1">浏览量: {{ post.visitors }}</el-text>
        <el-text class="mx-1" style="margin-left: 8px">评论数: {{ post.comments }}</el-text>
        <div class="comment" v-for="comment in comments" :key="comment._id">
            <el-avatar :size="45" :src="comment.avatar" style="vertical-align: middle">
                <img src="../../public/img/avatar.png">
            </el-avatar>
            <span style="margin-left: 8px;">{{ comment.username }}</span>
            <div class="content">
                <el-text class="mx-1" size="large">{{ comment.content }}</el-text>
                <el-divider />
                <el-row v-if="comment.total !== 0">
                    <el-col style="margin-bottom: 8px;" v-for="childComment in comment.childComments"
                        :key="childComment._id">
                        <el-text class="mx-1">{{ childComment.username }}: {{ childComment.content }}</el-text>
                    </el-col>
                    <el-col v-if="comment.total > 2">
                        <el-text class="mx-1 checkTotal" @click="showChildComments(comment._id, true)">查看全部{{
            comment.total
        }}条评论</el-text>
                    </el-col>
                </el-row>
            </div>
            <div style="margin: 0 auto" class="timeAndReply">
                <el-text class="mx-1" size="small">{{ comment.createdAt.split('T')[0] }}</el-text>
                <el-text class="mx-1 reply" style="margin-left: 10px;" @click="showReplyArea(comment._id)">回复</el-text>
            </div>
            <transition name="el-fade-in-linear">
                <div v-if="temp === comment._id">
                    <el-input v-model.trim="replycontent" placeholder="请输入要回复的内容" type="textarea" style="width: 100%;"
                        :rows="2"></el-input>
                    <el-button type="primary" style="width: 100%; margin-top: 10px"
                        @click="replyComment(comment._id)">回复</el-button>
                </div>
            </transition>
            <el-divider />
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" :pager-count="5"
            style="justify-content: center;" @current-change="handlePageChange" />
    </div>
    <div class="sendComment" style="text-align: center">
        <el-input v-model.trim="content" placeholder="请输入评论内容" type="textarea" style="width: 100%;"
            :rows="6"></el-input>
        <el-button type="primary" size="large" @click="sendComment" style="width: 100%; margin-top: 10px">发送</el-button>
    </div>
    <client-only>
        <el-drawer v-model="drawer" :size="size">
            <div>
                <el-avatar :size="45" :src="child.parent.avatar" style="vertical-align: middle">
                    <img src="../../public/img/avatar.png">
                </el-avatar>
                <el-text class="mx-1" style="margin-left:8px">{{ child.parent.username }}</el-text>
                <div style="width: 80%; margin: 10px auto;">
                    <el-col>
                        <el-text class="mx-1" size="large">{{ child.parent.content }}</el-text>
                    </el-col>
                    <el-col style="margin-top: 10px; text-align: right;">
                        <el-text class="mx-1" size="small" style="margin-top: 8px;">{{
            child.parent.createdAt.split('T')[0] }}</el-text>
                    </el-col>
                </div>
                <el-divider>以下是回复的评论</el-divider>
            </div>
            <div v-for="childComment in child.childComments" :key="childComment._id" style="margin-top: 10px;">
                <el-avatar :size="45" :src="childComment.avatar" style="vertical-align: middle">
                    <img src="../../public/img/avatar.png">
                </el-avatar>
                <el-text class="mx-1" style="margin-left: 8px;">{{ childComment.username }}: </el-text>
                <div style="width: 80%; margin: 10px auto;">
                    <el-col>
                        <el-text v-if="childComment.replyUsername">回复 {{ childComment.replyUsername }} : {{
            childComment.content }}</el-text>
                        <el-text class="mx-1" size="large" v-else>{{ childComment.content }}</el-text>
                    </el-col>
                    <el-col style="margin-top: 10px; text-align: right;">
                        <el-text class="mx-1" size="small">{{ childComment.createdAt.split('T')[0] }}</el-text>
                        <el-text class="mx-1 reply" style="margin-left: 10px;"
                            @click="showChildReplyArea(childComment._id)">回复</el-text>
                    </el-col>

                    <div v-if="childtemp === childComment._id">
                        <el-input v-model.trim="replychildcontent" placeholder="请输入要回复的内容" type="textarea"
                            style="width: 100%;" :rows="2"></el-input>
                        <el-button type="primary" style="width: 100%; margin-top: 10px"
                            @click="replyChildComments(childComment.parentId, childComment.postId, childComment._id)">回复</el-button>
                    </div>
                </div>
                <el-divider />
            </div>
            <el-pagination background layout="prev, pager, next" :total="child.total" :page-size="10" :pager-count="5"
                style="justify-content: center;" :current-page="currentChildPage"
                @current-change="handleChildPageChange" />
            <div style="margin-top: 10px">
                <el-input v-model.trim="replycontent" :placeholder="`回复 ${child.parent.username}`" type="textarea"
                    style="width: 100%;" :rows="2"></el-input>
                <el-button type="primary" style="width: 100%; margin-top: 10px"
                    @click="replyComment(child.parent._id)">回复</el-button>
            </div>
        </el-drawer>
    </client-only>


</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user';
import { useRoute } from 'vue-router';
import { getPost } from '~/apis/post'
import { getUserInfo } from '~/apis/user'
import { getComments, postComment, replyFirstComment, getChildComments, replySecondComment } from '~/apis/comment'
const { params } = useRoute()
const userStore = useUserStore()
const router = useRouter()
const post = ref({
    _id: '',
    type: '',
    title: '',
    content: '',
    username: '',
    avatar: '',
    updatedAt: '',
    visitors: 0,
    comments: 0
})
const currentPage = ref(1)
const currentChildPage = ref(1);
const total = ref(0)
const content = ref('')
const replycontent = ref('')
const replychildcontent = ref('')
const temp = ref('')
const childtemp = ref('')
const child = ref<child>({
    childComments: [],
    total: 0,
    parent: {
        _id: '',
        content: '',
        createdAt: '',
        username: '',
        avatar: '',
    }
})
const comments = ref<commentItem[]>([])
const drawer = ref(false)
const size = ref('50%')

interface child {
    childComments: childCommentItem[],
    total: number,
    parent: {
        _id: '',
        content: '',
        createdAt: '',
        username: '',
        avatar: '',
    }
}
interface commentItem {
    _id: '',
    content: '',
    createdAt: '',
    username: '',
    avatar: '',
    childComments: childCommentItem[],
    total: 0
}

interface childCommentItem {
    _id: '',
    content: '',
    createdAt: '',
    username: '',
    avatar: '',
    replyId: '',
    postId: '',
    parentId: '',
    replyUsername: ''
}

onMounted(async () => {
    let response: Response | undefined;
    response = await getPost(params.id as string)
    if (response) {
        const responseData = await response.json();
        post.value = responseData.data
    } else {
        console.log('Error fetching post');
    }
    let result: Response | undefined;
    result = await getComments(params.id as string, currentPage.value)
    if (result) {
        const resultData = await result.json();
        if (resultData.code === 0) {
            comments.value = resultData.data.comments
            total.value = resultData.data.total
        } else {
            console.log('Error fetching comments');
        }
    } else {
        console.log('Error fetching comments');
    }
})

const showReplyArea = (commentId: string) => {
    replycontent.value = ''
    temp.value = commentId;
}
const showChildReplyArea = (commentId: string) => {
    replychildcontent.value = ''
    childtemp.value = commentId;
}

const showChildComments = async (commentId: string, isShow: boolean) => {
    // 当屏幕宽度小于768px时，drawer的宽度为100%
    if (window.innerWidth < 768) {
        size.value = '100%'
    } else {
        size.value = '50%'
    }
    let response: Response | undefined;
    currentChildPage.value = 1
    response = await getChildComments(commentId, currentChildPage.value)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            child.value.childComments = responseData.data.comments
            child.value.total = responseData.data.total
            child.value.parent = responseData.data.parent
        } else {
            console.log('Error fetching child comments');
        }
    } else {
        console.log('Error fetching child comments');
    }
    drawer.value = isShow
}

const replyChildComments = async (parentId: string, postId: string, commentId: string) => {
    let response: Response | undefined;
    response = await replySecondComment(parentId, postId, replychildcontent.value, commentId)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            ElMessage.success('回复成功');
            replychildcontent.value = '';
            currentChildPage.value = Math.ceil(child.value.total / 10)
            handleChildPageChange(currentChildPage.value)
        }
    }

}

const handlePageChange = async (val: number) => {
    currentPage.value = val
    let response: Response | undefined;
    response = await getComments(params.id as string, currentPage.value)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            comments.value = responseData.data.comments
            total.value = responseData.data.total
        } else {
            console.log('Error fetching comments');
        }
    } else {
        console.log('Error fetching comments');
    }
}

const handleChildPageChange = async (val: number) => {
    currentChildPage.value = val
    let response: Response | undefined;
    response = await getChildComments(child.value.parent._id, currentChildPage.value)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            child.value.childComments = responseData.data.comments
            child.value.total = responseData.data.total

        } else {
            console.log('Error fetching child comments');
        }
    } else {
        console.log('Error fetching child comments');
    }
}

const sendComment = async () => {
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
    response = await postComment(params.id as string, content.value)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            ElMessage.success('评论成功');
            content.value = '';
            let result: Response | undefined;
            result = await getComments(params.id as string, currentPage.value)
            if (result) {
                const resultData = await result.json();
                if (resultData.code === 0) {
                    comments.value = resultData.data.comments
                    total.value = resultData.data.total
                } else {
                    console.log('Error fetching comments');
                }
            } else {
                console.log('Error fetching comments');
            }
        } else {
            ElMessage.error('评论失败,请稍后再试');
        }
    } else {
        console.log('Error posting comment');
    }
}

const replyComment = async (commentId: string) => {
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
    response = await replyFirstComment(commentId, params.id as string, replycontent.value)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            ElMessage.success('回复成功');
            let result: Response | undefined;
            replycontent.value = '';
            result = await getComments(params.id as string, currentPage.value)
            if (result) {
                const resultData = await result.json();
                if (resultData.code === 0) {
                    comments.value = resultData.data.comments

                } else {
                    console.log('Error fetching comments');
                }
            } else {
                console.log('Error fetching comments');
            }
            showChildComments(commentId, false)
        } else {
            ElMessage.error('回复失败,请稍后再试');
        }
    } else {
        console.log('Error posting comment');
    }
}



</script>

<style scoped>
.back {
    margin: 10px;
    padding: 20px;
    background-color: #f4f4f5;
    border: 1px solid #ccc;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 1px;
}

.backbtn {
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
    color: #333;
}

.backbtn:hover {
    color: #409eff;
}

.post {
    margin: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: 0;
    width: 70%;
    margin: 0 auto;
}

.username {
    margin-left: 10px;
    font-size: 18px;
}

.main {
    font-size: 20px;
}


.footer {
    margin-top: 10px;
    text-align: right;
}

.comments {
    margin: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: 0;
    width: 70%;
    margin: 0 auto;
}

.comments .comment {
    margin-top: 10px;
    padding: 6px;
}

.comments .comment .content {
    width: 90%;
    margin-top: 10px !important;
    padding: 6px;
    border: 1px solid #ccc;
    margin: 0 auto;
    background-color: #f4f4f5;
}

.timeAndReply {
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    text-align: right
}


.sendComment {
    margin: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: 0;
    width: 70%;
    margin: 0 auto;
}

.checkTotal:hover {
    color: #409eff;
    cursor: pointer;
}

.reply:hover {
    color: #409eff;
    cursor: pointer;
}


@media screen and (max-width: 768px) {
    .back {
        width: 85%;
    }

    .post {
        width: 85%;
    }

    .comments {
        width: 85%;
    }

    .timeAndReply {
        width: 85%;
    }

    .sendComment {
        width: 85%;
    }
}
</style>