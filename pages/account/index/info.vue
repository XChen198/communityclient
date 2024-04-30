<template>
    <el-text class="mx-1" type="info">我的信息</el-text>
    <div class="myinfo" style="margin-top: 20px;">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" style="max-width: 600px; margin: 0 auto;">
            <el-form-item label="用户名 :">
                <el-input :value="userStore.userInfo?.username" disabled
                    style="max-width: 600px; margin: 0 auto;"></el-input>
            </el-form-item>
            <el-form-item label="旧密码 :" prop="oldPassword">
                <el-input v-model.trim="ruleForm.oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码 :" prop="newPassword">
                <el-input v-model.trim="ruleForm.newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>

                <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%;">重置密码</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-text class="mx-1" type="warning" style="margin: 0 auto">修改成功后需重新登录</el-text>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user';
import { changePassword } from '~/apis/user'
import { logout } from '~/apis/auth';

const router = useRouter()
const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    oldPassword: '',
    newPassword: '',
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

const rules = reactive<FormRules>({
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ]
})


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const response = await changePassword(ruleForm.oldPassword, ruleForm.newPassword)
            const responseData = response ? await response.json() : null;
            if (responseData.code === 0) {
                ElMessage({
                    message: responseData.message,
                    type: 'success'
                })
                ruleForm.oldPassword = ''
                ruleForm.newPassword = ''
                logout()
                router.push('/')
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


</script>

<style></style>