<template>
  <!--    导航栏-->
    <van-nav-bar
            :title="name"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    >
        <template #right>
            <van-icon name="search" size="18"/>
        </template>
    </van-nav-bar>

    <div id="content">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view/>
    </div>
  <!--    &lt;!&ndash;使用 router-link 组件进行导航 &ndash;&gt;-->
  <!--    &lt;!&ndash;通过传递 `to` 来指定链接 &ndash;&gt;-->
  <!--    &lt;!&ndash;`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签&ndash;&gt;-->
  <!--    <router-link to="/">首页</router-link>-->
  <!--    <router-link to="/team">队伍页</router-link>-->


  <!--tab栏-->
<!--    route路由模式和监听切换事件@change="onChange"冲突，不可一块用-->
    <van-tabbar route>
        <van-tabbar-item to="/" icon="home-o" name="index">首页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" icon="friends-o" name="user">用户</van-tabbar-item>
    </van-tabbar>
</template>


<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const name = ref('首页');
//实例化路由
const router = useRouter();
//返回
const onClickLeft = () => {
    router.back();
}

//路由跳转到搜索页
const onClickRight = () => {
    // 字符串路径
    router.push('/searchPage')
}

router.beforeEach((to, from) => {
    // console.log(to)
    // console.log("to:"+to.path+"  from:"+from.path)
    name.value=to.name
})


// const active = ref("index");
// const onChange = (index) => Toast(`标签 ${index}`);

</script>


<style scoped>
#content {
    padding-bottom: 50px;
}
</style>