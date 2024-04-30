<template>
    <el-text class="mx-1" type="info">发布帖子</el-text>
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
    <el-input v-model="inputTitle" style="width: 100%; height: 40px; margin-bottom: 20px;" placeholder="标题推荐在30字以内" />
    <el-text class="mx-1" type="danger">注意: 单张图片不能高于2MB!</el-text>
    <ClientOnly>
        <QuillEditor :options="editorOptions" v-model:content="data" content-type="html" />
        <input type="file" style="display: none;" id="getFile" @change="selectContentImg($event)"
            accept="image/gif,image/jpeg,image/jpg,image/png">
    </ClientOnly>
    <el-button type="primary" size="large" style="margin-top: 20px; width: 100%" @click="uploadPost">发布</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { uploadImg, createPost } from '~/apis/post'

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

const uploadPost = async () => {
    let response: Response | undefined;
    response = await createPost(selectCategory.value, inputTitle.value, data.value)
    if (response) {
        const responseData = await response.json();
        if (responseData.code === 0) {
            ElMessage({
                message: responseData.message,
                type: 'success'
            })
            // 清空数据
            selectCategory.value = ''
            inputTitle.value = '';
            data.value = '';
            // 清空富文本编辑器内容
            const quill = document.querySelector('.ql-editor')
            if (quill) {
                quill.innerHTML = '';
            }

        } else {
            ElMessage({
                message: responseData.message,
                type: 'error'
            })
        }
    } else {
        console.log('Error fetching user info');
    }
}

</script>

<style>
.ql-editor {
    min-height: 200px;
    height: 100%;
}
</style>