<template>
<!--    方便全局控制样式（加个id把按钮套起来）-->
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
        <van-tabs v-model:active="active" type="card" @change="onTagChange">
            <van-tab title="公开队伍" name="public"/>
            <van-tab title="加密队伍" name="secret"/>
        </van-tabs>
<!--        使用margin-bottom，来隔开16px-->
        <div style="margin-bottom: 16px"></div>
<!--        引入队伍列表数据(team-list=teamList)-->
        <team-card-list :team-list="teamList" :loading="loading"/>
<!--        创建队伍按钮放到队伍卡片的后面，防止被队伍卡片覆盖-->
        <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"/>
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


/**
 * 跳转到创建队伍页面
 */
const toAddTeam = () => {
    router.push({
        path: '/team/add'
    })
}

//自定义查询到的队伍列表（响应式变量：封装）
const teamList = ref([]);
const loading = ref(true);

//自定义搜索关键词(响应式变量)
const searchText = ref('');

/**
 * 按条件查询全部队伍（提取出的公共部分）
 * @param val
 * @param teamStatus
 * @returns {Promise<void>}
 */
const listTeam = async (val = '',teamStatus = 0) => {
    loading.value = true;
    const res = await myAxios.get("/team/list",{
        params: {
            searchText: val,
            teamStatus,
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

const active = ref('public');
//最好不要用下面的代码（循环调用listTeam()代替一次性调用onMounted）-开闭原则
//watchEffect能监听到本代码块内的响应式变量（外面声明的简单变量，复杂的有其他问题）的变化，并在变化时调用本代码块内的代码
//而且watchEffect内的代码似乎会在页面最初加载时执行一次
// watchEffect(() => {
//     // alert(active.value)
//     listTeam();
// })

/**
 * tab标签变化就调用下列函数
 * @param name
 */
const onTagChange = (name) => {
    if (name === 'public') {
        listTeam(searchText.value,0);
    }
    if (name === 'secret') {
        listTeam(searchText.value,2);
    }
}


/**
 * 页面最初加载时,空条件查询队伍一次
 */
onMounted( () => {
     listTeam();
})



/**
 * 关键词搜索队伍
 * @param val
 */
const onSearch =  (val) => {
     listTeam(val);
}




</script>

<style scoped>
#teamPage{

}
</style>