<template>
    <template v-if="user">
        <van-image
            round
            width="10rem"
            height="10rem"
            :src="user.userAvatar"
        />
        <van-cell title="当前用户" :value= "`${user?.userAccount}(昵称：${user?.userName})`"/>
        <van-cell title="个人信息" is-link to="/user/info"/>
        <van-cell title="队伍管理" is-link to="/team/isLeader"/>
        <van-cell title="他人队伍" is-link to="/team/hasJoin"/>
        <van-cell title="切换用户" is-link to="/loginUser"/>
        <van-cell title="注册新用户" is-link to="/register"/>


    </template>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";


const user = ref();
/**
 * 获取当前用户信息
 */
onMounted( async () => {
    user.value = await getCurrentUser();
})
</script>

<style scoped>

</style>