<template>
    <el-text class="mx-1" type="info">查看已经发布的帖子</el-text>
    <el-empty v-if="total === 0" description="还没有上传任何帖子" />
    <div>
        <el-card v-for="post in posts" :key="post._id" class="mb-2">
            <el-row>
                <el-col :span="9">
                    <nuxt-link :to="`/post/${post._id}`" class="goPost">{{ post.title }}</nuxt-link>
                </el-col>
                <el-col :span="9">
                    <el-text>{{ post.updatedAt.split('T')[0] }}</el-text>
                </el-col>
                <el-col :span="6" class="text-right">
                    <el-link :underline="false" @click="editPost(post._id)">编辑</el-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-link :underline="false" @click="deletePost(post._id)">删除</el-link>
                </el-col>
            </el-row>
        </el-card>
        <el-pagination v-if="total > 0" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="10" :total="total" layout="prev, pager, next" />
        <client-only>
            <el-drawer v-model="drawer" title="编辑页面" size="70%">
                <h5>选择分类：</h5>
                <el-select v-model="selectCategory" placeholder="选择" style="width: 100%;" size="large">
                    <el-option label="招聘" value="招聘" />
                    <el-option label="新闻" value="新闻" />
                    <el-option label="生活" value="生活" />
                    <el-option label="科技" value="科技" />
                    <el-option label="娱乐" value="娱乐" />
                    <el-option label="社会" value="社会" />
                    <el-option label="编程" value="编程" />
                </el-select>
                <h5>标题：</h5>
                <el-input v-model="inputTitle" style="width: 100%; height: 40px; margin-bottom: 20px;"
                    placeholder="标题推荐在30字以内" />
                <el-text class="mx-1" type="danger">注意: 单张图片不能高于2MB!</el-text>
                <ClientOnly>
                    <QuillEditor :options="editorOptions" v-model:content="data" content-type="html" />
                    <input type="file" style="display: none;" id="getFile" @change="selectContentImg($event)"
                        accept="image/gif,image/jpeg,image/jpg,image/png">
                </ClientOnly>
                <el-button type="primary" size="large" style="margin-top: 20px; width: 100%"
                    @click="updatePost">更新</el-button>
            </el-drawer>
        </client-only>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getUserPosts, deletePostById, getPost, uploadImg, updatePostById } from '~/apis/post';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const currentPage = ref(1)
const posts = ref<postArrayItem[]>([])
const total = ref(0)
const postInfo = ref<postArrayItem>()
const drawer = ref(false)
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

onMounted(async () => {
    let res: Response | undefined;
    res = await getUserPosts(currentPage.value);
    if (res) {
        const resData = await res.json();
        if (resData.code === 0) {
            posts.value = resData.data.posts
            total.value = resData.data.total

        } else {
            ElMessage.error('获取数据失败')
        }
    } else {
        console.log('请求失败');

    }
})

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
]

const selectCategory = ref('') // 分类
const inputTitle = ref('') // 标题
const data = ref('') // 富文本编辑器内容


const editorOptions = {
    theme: 'snow',
    placeholder: '请输入内容',
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                'image': function () {
                    document.getElementById('getFile')?.click()
                }
            }
        }
    }
}

const selectContentImg = async (e: any) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('img', file)
    let res: Response | undefined;
    res = await uploadImg(formData)
    if (res) {
        const data = await res.json()
        if (data.code === 0) {
            // 将图片插入到富文本编辑器中
            const quill = document.querySelector('.ql-editor')
            if (quill) {
                quill.innerHTML += `<img src="${data.data.imageUrl}" alt="图片" style="max-width: 100%; max-height: 400px;"  />`;
            }
        } else {
            ElMessage({
                message: data.message,
                type: 'error'
            })
        }
    }
}


const updatePost = async () => {
    let response: Response | undefined;
    if (postInfo.value) {
        response = await updatePostById(postInfo.value._id, selectCategory.value, inputTitle.value, data.value)
    }
    if (response) {
        const resData = await response.json();
        if (resData.code === 0) {
            ElMessage.success('更新成功')
            drawer.value = false
            let res: Response | undefined;
            res = await getUserPosts(currentPage.value);
            if (res) {
                const resData = await res.json();
                if (resData.code === 0) {
                    posts.value = resData.data.posts
                    total.value = resData.data.total
                } else {
                    ElMessage.error('获取数据失败')
                }
            } else {
                console.log('请求失败');
            }
        } else {
            ElMessage({
                message: resData.message,
                type: 'error'
            })
        }
    } else {
        console.log('请求失败');
    }
}



const handleCurrentChange = async (val: number) => {
    currentPage.value = val
    let res: Response | undefined;
    res = await getUserPosts(currentPage.value);
    if (res) {
        const resData = await res.json();
        if (resData.code === 0) {
            posts.value = resData.data.posts
            total.value = resData.data.total

        } else {
            ElMessage.error('获取数据失败')
        }
    } else {
        console.log('请求失败');

    }
}

const editPost = async (id: string) => {
    let res: Response | undefined;
    res = await getPost(id)
    if (res) {
        const resData = await res.json();
        if (resData.code === 0) {
            postInfo.value = resData.data
            if (postInfo.value) {
                selectCategory.value = postInfo.value.type
                inputTitle.value = postInfo.value.title
                data.value = postInfo.value.content
            }

        } else {
            ElMessage.error('获取数据失败')
        }
    } else {
        console.log('请求失败');
    }
    drawer.value = true

}

const deletePost = async (id: string) => {
    let res: Response | undefined;
    res = await deletePostById(id);
    if (res) {
        const resData = await res.json();
        if (resData.code === 0) {
            ElMessage.success('删除成功')
            let res: Response | undefined;
            res = await getUserPosts(currentPage.value);
            if (res) {
                const resData = await res.json();
                if (resData.code === 0) {
                    posts.value = resData.data.posts
                    total.value = resData.data.total
                } else {
                    ElMessage.error('获取数据失败')
                }
            } else {
                console.log('请求失败');
            }
        } else {
            ElMessage({
                message: resData.message,
                type: 'error'
            })
        }
    } else {
        console.log('请求失败');
    }
}
</script>

<style scoped>
/* 超出一行则变成省略号 */
.goPost {
    text-decoration: none;
    color: black;
    font-size: 14px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.goPost:hover {
    text-decoration: underline;
    color: #409eff;
}
</style>