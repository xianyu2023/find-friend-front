<template>
    <van-skeleton v-for="user in props.userList"
                  title avatar :row="3" :loading="props.loading">
        <van-card
                  :desc="user.profile"
                  :title="`${user.userName}（${user.planetCode}）`"
                  :thumb="user.avatarUrl"
        >
            <template #tags>
                <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px " >
                    {{ tag }}
                </van-tag>
            </template>
            <template #footer>
                <van-button size="mini">联系我</van-button>
            </template>
        </van-card>
    </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../model/user.js";

interface UserCardListProps {
userList: UserType[];
loading: boolean;
}

const props = withDefaults(defineProps<UserCardListProps>(),{
    //加载状态给定默认值true，显示
    loading: true,
    //@ts-ignore
    userList: [] as UserType[],
});

</script>

<style scoped>

</style>