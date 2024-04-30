<template>
    <h1>登录</h1>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" style="max-width:600px; margin: 0 auto;"
        label-width="auto">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%;">登录</el-button>
        </el-form-item>
        <span class="goHome"><nuxt-link to="/">返回首页</nuxt-link></span>
        <span class="goSignup">没有账号? <nuxt-link to="/signup">去注册</nuxt-link></span>
    </el-form>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '~/apis/auth'
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    username: '',
    password: ''
})
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const response = await login(ruleForm.username, ruleForm.password)
            const responseData = response ? await response.json() : null;
            if (responseData.code === 0) {
                ElMessage({
                    message: responseData.message,
                    type: 'success'
                })
                router.push('/')
            } else {
                ElMessage({
                    message: responseData.message,
                    type: 'error'
                })
            }
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
</script>

<style scoped>
h1 {
    text-align: center;
}

a:-webkit-any-link {

    text-decoration: none
}

a:hover {
    text-decoration: underline;
}

.goHome a {
    color: #409EFF;
}


.goSignup {
    float: right;
}
</style>