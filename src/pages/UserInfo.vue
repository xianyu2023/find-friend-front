<template>
    <template v-if="user">
        <van-cell title="昵称" is-link to="/user/edit"  :value= "user.userName" @click="toEdit('userName','昵称',user.userName)"/>
        <van-cell title="账号" :value="user.userAccount" />
        <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
            <img style="height: 50px" :src="user.avatarUrl" />
        </van-cell>
        <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
        <van-cell title="电话" is-link :value="user.phone" to="/user/edit" @click="toEdit('phone','电话',user.phone)"/>
        <van-cell title="邮箱" is-link :value="user.email" to="/user/edit" @click="toEdit('email','邮箱',user.email)"/>
        <van-cell title="用户创建时间" :value="user.createTime" />
        <van-cell title="星球编号" :value="user.planetCode" />
        <van-cell title="用户所带标签" is-link to="/user/edit" :value="user.tags" @click="toEdit('tags','标签',user.tags)" />
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//     id: 1,
//     userName: 'dogYuPi',
//     userAccount: 123456,
//     avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//     gender: '男',
//     phone: 102111880,
//     email: '102111880.qq.com',
//     createTime: new Date().toISOString(),
//     planetCode: 1,
//     tags: null,
// };
const user = ref();

onMounted( async () => {
    user.value = await getCurrentUser();
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) =>{
    // 带查询参数，结果是 /register?plan=private
    router.push({
        path: '/user/edit',
        query: {
            editKey,
            editName,
            currentValue,
        },
    })
}
</script>

<style scoped>

</style>