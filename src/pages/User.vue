<template>
    <template v-if="user">
        <van-cell title="当前用户" :value= "`${user?.userAccount}(昵称：${user?.userName})`"/>
        <van-cell title="用户信息详情" is-link to="/user/info"/>
        <van-cell title="能管理的队伍" is-link to="/team/isLeader"/>
        <van-cell title="已加入的他人队伍" is-link to="/team/hasJoin"/>
        <van-cell title="切换用户" is-link to="/loginUser"/>


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