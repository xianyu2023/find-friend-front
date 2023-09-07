<template>
    <template v-if="user">
        <van-cell title="昵称" is-link to="/user/edit"  :value= "user.userName" @click="toEdit('userName','昵称',user.userName)"/>
        <van-cell title="账号" :value="user.userAccount" />
        <van-cell title="头像" is-link to="/user/edit" @click="toEdit('userAvatar','头像',user.userAvatar)">
            <img style="height: 50px" :src="user.userAvatar" />
        </van-cell>
        <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
        <van-cell title="电话" is-link :value="user.phone" to="/user/edit" @click="toEdit('phone','电话',user.phone)"/>
        <van-cell title="邮箱" is-link :value="user.email" to="/user/edit" @click="toEdit('email','邮箱',user.email)"/>
        <van-cell title="用户创建时间" :value="user.createTime" />
        <van-cell title="标签" is-link to="/user/edit" :value="tagsList" @click="toEdit('tags','标签',tagsList)" />
    </template>
</template>



<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import LoginUser from "./LoginUser.vue";
import {LoginUserVO} from "../model/user";

// const user = {
//     id: 1,
//     userName: 'dogYuPi',
//     userAccount: 123456,
//     userAvatar: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//     gender: '男',
//     phone: 102111880,
//     email: '102111880.qq.com',
//     createTime: new Date().toISOString(),
//     planetCode: 1,
//     tags: null,
// };
const user = ref();
const tagsList = ref();

onMounted( async ()=> {
    user.value = await getCurrentUser();
    tagsList.value=JSON.stringify(user.value.tagsList)
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) =>{
    console.log("currentValue==="+currentValue)
    // 带查询参数，结果是 /registerUser?plan=private
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