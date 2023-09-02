<template>
<!--    {{-->
<!--    JSON.stringify(route.query)-->
<!--    }}-->
    <user-card-list :user-list="userList"/>

    <van-empty image="search" v-if="!userList || userList.length<1 " description="搜索结果为空" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";


/**
 *使用route来接收页面跳转的传参
 * 查询条件tags
 */
const route = useRoute();
// console.log(route);
// console.log(route.query);
const {tags} = route.query;


//搜索到的用户列表，多个用户，数组[]
const userList = ref([]);

/**
 * onMounted钩子给后端发送get请求
 */
onMounted(async () => {
    const userListData = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags,
        },
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
        .then(function (response) {
            console.log('/user/search/tags success',response);
            // Toast.success('请求成功');
            console.log(response);
            return response?.data;
        })
        .catch(function (error) {
            console.error('/user/search/tags error',error);
            // Toast.fail('请求失败');
        });
    if(userListData) {
        userListData.forEach(user => {
            if(user.tags) {
                user.tags = JSON.parse(user.tags)
            }
        })
        userList.value = userListData;
    }
})



//演示的假数据
const mockUser = {
    id: 1,
    userName: 'dogYuPi',
    userAccount: 123456,
    avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
    profile: '咸鱼工程师',
    gender: '男',
    phone: 102111880,
    email: '102111880.qq.com',
    createTime: new Date().toISOString(),
    planetCode: 1,
    tags: ['java','c','咸鱼','咸鱼'],
}



</script>

<style scoped>

</style>