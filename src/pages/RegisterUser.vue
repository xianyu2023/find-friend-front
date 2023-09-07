<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="userAccount"
                    name="userAccount"
                    label="账号"
                    placeholder="请输入账号"
                    :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
                    v-model="userPassword"
                    type="password"
                    name="userPassword"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="checkPassword"
                type="password"
                name="checkPassword"
                label="重复密码"
                placeholder="请再次输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                注册
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {ref} from "vue";

const route = useRoute();

// console.log(route.path)
// console.log(route.query)
// console.log(route.params)



const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const onSubmit = async () => {
    const res = await myAxios.post('/user/registerUser',{
        userAccount: userAccount.value,
        userPassword: userPassword.value,
        checkPassword: checkPassword.value
    })
    console.log(res,'用户注册')
    if(res.code===0 && res.data) {
        // // Toast.success('登录成功');这个vant3的Toast组件用不了
        // const oldHref = route.query?.redirect as string ?? '/';
        // window.location.href = oldHref;
        router.push("/loginUser")
    } else {
        // Toast.fail('登录失败');
    }
};
</script>

<style scoped>

</style>