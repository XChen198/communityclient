<template>
    <h1>注册</h1>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" style="max-width: 600px; margin: 0 auto;"
        label-width="auto">
        <el-form-item label="用户名 :" prop="username">
            <el-input v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="password">
            <el-input v-model.trim="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" prop="confirmPassword">
            <el-input v-model.trim="ruleForm.confirmPassword" type="password"></el-input>
        </el-form-item>
        <div v-if="captchaSvg" v-html="captchaSvg" @click="getCaptha" class="captchaSvg"></div>
        <el-form-item label="验证码 :" prop="captcha">
            <el-input v-model.trim="ruleForm.captcha" type="text"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%;">注册</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="resetForm(ruleFormRef)" style="width: 100%;">重置</el-button>
        </el-form-item>
        <span class="goHome"><nuxt-link to="/">返回首页</nuxt-link></span>
        <span class="goLogin">已有账号? <nuxt-link to="/login">去登录</nuxt-link></span>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { ref, reactive } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { signup, getCaptha } from '~/apis/auth';
const router = useRouter()
const captchaSvg = ref<string>('');

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    captcha: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
    } else {
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再输入一次密码'))
    } else if (value !== ruleForm.password) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再输入一次密码', trigger: 'blur' },
        { validator: validatePass2, trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 4, max: 4, message: '验证码长度为4', trigger: 'blur' }
    ]
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const response = await signup(ruleForm.username, ruleForm.password, ruleForm.confirmPassword, ruleForm.captcha)
            const responseData = response ? await response.json() : null;
            if (responseData.code === 0) {
                ElMessage({
                    message: responseData.message,
                    type: 'success'
                })
                router.push('/login')

            } else {
                ElMessage({
                    message: responseData.message,
                    type: 'error'
                })
            }

        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onMounted(async () => {
    let response: Response | undefined;
    response = await getCaptha()
    if (!response?.ok) {
        throw new Error('获取验证码失败');
    }
    const svgData = await response.text()
    captchaSvg.value = svgData;
})
</script>
<style scoped>
h1 {
    text-align: center;
}

.captchaSvg {
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 40px;
    background-color: #f5f5f5;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #333;
    font-weight: bold;
    user-select: none;
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

.goLogin {
    float: right;
}
</style>