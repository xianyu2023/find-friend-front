<template>
<!--    {{-->
<!--    JSON.stringify(route.query)-->
<!--    }}-->
    <van-cell center title="匹配模式">
        <template #right-icon>
            <van-switch v-model="checked" size="24" />
        </template>
    </van-cell>
    <user-card-list :user-list="userList" :loading="loading"/>
    <van-empty image="search" v-if="!userList || userList.length<1 " description="搜索结果为空" />
</template>

<script setup lang="ts">
import { ref, watchEffect} from "vue";
import UserCardList from "../components/UserCardList.vue";
import {matchUser, recommendUser} from "../api/api.ts";
import {UserType} from "../model/user";


//搜索到的用户列表，多个用户，数组[]
const userList = ref([]);
const loading = ref(true);

// type ModeType = "default" | "match";
// const mode = ref<ModeType>("default");

const checked = ref<boolean>(false);
/**
 * 根据条件加载首页数据
 */
const loadData = async () => {
    //加载状态显示
    loading.value = true;
    let userListData = [];
    if (checked.value) {
        //根据标签匹配用户
        const num = 3;
        userListData = await matchUser(num);
    } else {
        //直接分页查询用户
        userListData = await recommendUser();
    }
    if(userListData) {
        userListData.forEach((user: UserType) => {
            if(user.tags) {
                user.tags = JSON.parse(user.tags)
            }
        })
        userList.value = userListData;
    }
    //结束加载状态
    loading.value = false;
}

//它能监听变量checked.value的变化
watchEffect(() => {
    // alert("checked: " + checked.value)
    loadData();
})


</script>

<style scoped>

</style>