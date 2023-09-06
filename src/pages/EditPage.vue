<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="editUser.currentValue"
                    :name="editUser.editKey"
                    :label="editUser.editName"
                    :placeholder="`请输入新的${editUser.editName}`"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";
import {LoginUserVO} from "../model/user";
const onSubmit = async () => {
    // console.log('submit', values);
    // console.log('submit',editUser.value.currentValue)
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        console.log('用户未登录');
        return;
    }
    let url = '';
    if (currentUser.userRole === "admin") {
        url = '/user/update'
    } else if (currentUser.userRole === "user") {
        url = '/user/update/my'
    }
    const res = await myAxios.post(url,{
        'id': currentUser.id,
        [editUser.value.editKey]: editUser.value.currentValue,
    })
    console.log(res,'更新请求');
    if(res.code === 0 && res.data > 0) {
        // Toast.success('修改成功');
        router.back();
    } else {
        // Toast.fail('修改失败');
    }
};
const router = useRouter();
const route = useRoute();
//测试route
// console.log(route);
// console.log(route.params);
// console.log(route.query);

const editUser = ref({
    editKey: route.query.editKey,
    editName: route.query.editName,
    currentValue: route.query.currentValue,
})

</script>

<style scoped>

</style>