<template>
<!--    方便全局控制样式（加个id把按钮套起来）-->
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
<!--        引入队伍列表数据(team-list=teamList)-->
        <team-card-list :team-list="teamList" :loading="loading"/>
<!--        没有队伍列表数据时-->
        <van-empty v-if="!teamList || teamList?.length < 1 " description="数据为空" />
    </div>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
const router = useRouter();


//自定义查询到的队伍列表（响应式变量：封装）
const teamList = ref([]);
const loading = ref(true);

/**
 * 查询我加入的队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
    loading.value = true;
    const res = await myAxios.get("/team/list/my/join",{
        params: {
            searchText: val,
        }
    });
    if (res.code === 0 && res.data) {
        console.log("加载队伍成功");
    } else {
        console.log("加载队伍失败，请刷新重试");
    }
    teamList.value = res.data;
    loading.value = false;
}

/**
 * 页面最初加载时空条件查询队伍一次
 */
onMounted(() => {
    listTeam();
})

//自定义搜索关键词(响应式变量)
const searchText = ref('');

/**
 * 关键词搜索队伍
 * @param val
 */
const onSearch = (val) => {
    listTeam(val);
}

</script>

<style scoped>
#teamPage{

}
</style>