<template>
    <van-skeleton v-for="user in props.userList"
                  title avatar :row="3" :loading="props.loading">
        <van-card
                  :desc="user.userProfile"
                  :title="user.userName"
                  :thumb="user.userAvatar"
        >
            <template #tags>
                <van-tag color="#7232dd" plain  v-for="tag in user.tagsList" style="margin-right: 8px;margin-top: 8px " >
                    {{ tag }}
                </van-tag>
            </template>
            <template #footer>
<!--                <van-button size="mini">联系我</van-button>-->
                <div>
                    {{'邮箱:' + user.email}}
                </div>
<!--                <div>-->
<!--                    {{'电话:' + user.phone}}-->
<!--                </div>-->
            </template>
        </van-card>
    </van-skeleton>
</template>

<script setup lang="ts">
import {UserVO} from "../model/user.js";
import {ref} from "vue";
import {recommendUser} from "../api/api.ts";

interface UserCardListProps {
userList: UserVO[];
loading: boolean;
}

const props = withDefaults(defineProps<UserCardListProps>(),{
    //加载状态给定默认值true，显示
    loading: true,
    //@ts-ignore
    userList: [] as UserVO[],
});
</script>

<style scoped>

</style>