<template>
    <el-text class="mx-1" type="info">我的头像</el-text>
    <div class="avatar">
        <el-avatar :size="200" :src="useStore.userInfo?.avatar">
            <img src="../../../public/img/avatar.png">
        </el-avatar>
        <el-text class="mx-1" type="primary" style="margin-top: 10px">注意: 单张图片不能高于2MB!</el-text>
        <el-upload class="avatar-uploader" action="http://localhost:3001/api/user/" :show-file-list="false"
            :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload"
            :with-credentials="true" accept="image/gif,image/jpeg,image/jpg,image/png" name="avatar">
            <el-button size="large" type="primary" style="margin-top: 10px;">选择图片并上传</el-button>
        </el-upload>

    </div>

</template>
<script setup lang="ts">
interface UserInfo {
    _id: string,
    username: string,
    avatar: string,
    createdAt: string,
    updatedAt: string
}
import { useUserStore } from '~/stores/user';
const useStore = useUserStore();

const handleAvatarSuccess = (res: any, file: any) => {
    useStore.setUserInfo({ ...useStore.userInfo, avatar: res.data.avatar } as UserInfo);
    ElMessage.success('上传成功!');
}
const handleAvatarError = (err: any) => {
    ElMessage.error('上传失败!请稍后再试');
}
const beforeAvatarUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG && !isPNG && !isGIF) {
        ElMessage.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
    }
    return (isJPG || isPNG || isGIF) && isLt2M;
}


</script>

<style scoped>
.avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
}
</style>