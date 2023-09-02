<template>
<!--vant3组件库,Form表单-->
  <div id="teamAddPage">
      <van-form @submit="onSubmit">
          <van-cell-group inset>
              <van-field
                      v-model="addTeamData.teamName"
                      name="teamName"
                      label="队伍名称"
                      placeholder="请输入队伍名"
                      :rules="[{ required: true, message: '请输入队伍名' }]"
              />
<!--              高度自适应-->
              <van-field
                  v-model="addTeamData.teamDescription"
                  rows="3"
                  autosize
                  label="队伍描述"
                  type="textarea"
                  placeholder="请输入队伍描述"
              />
<!--              步进器-->
              <van-field name="stepper" label="队伍最大人数">
                  <template #input>
                      <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
                  </template>
              </van-field>
<!--              日历-->
              <van-field
                  v-model="addTeamData.expireTime"
                  is-link
                  readonly
                  name="calendar"
                  label="队伍到期时间"
                  :placeholder="addTeamData.expireTime ?? '点击选择日期'"
                  @click="showCalendar = true"
              />
              <van-calendar v-model:show="showCalendar" @confirm="onConfirm"/>
<!--              单选框-->
              <van-field name="radio" label="队伍状态">
                  <template #input>
                      <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
                          <van-radio name="0">公开</van-radio>
                          <van-radio name="1">私有</van-radio>
                          <van-radio name="2">加密</van-radio>
                      </van-radio-group>
                  </template>
              </van-field>
              <!-- 加密队伍才输入密码 -->
              <van-field v-if="Number(addTeamData.teamStatus) === 2" v-model="addTeamData.teamPassword" type="password" label="队伍密码" />
          </van-cell-group>
          <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">
                  提交
              </van-button>
          </div>
      </van-form>

<!-- 查看addTeamData     {{addTeamData}}-->

  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getTeamById, updateTeam} from "../api/api.ts";
import {useRoute, useRouter} from "vue-router";


//修改队伍需填写的表单数据
const addTeamData = ref({});

const showCalendar = ref(false);
//todo 日期格式化、天数+1（只是天数显示有问题，数据库插入的天数正常）
const onConfirm = (date) => {
    addTeamData.value.expireTime = date.toISOString();
    showCalendar.value = false;
};


const router = useRouter();

const onSubmit = async () => {
    const postData = {
        // 取出表单中的数据
        ...addTeamData.value,
        //队伍状态应该是number，需要覆盖表单中的字符串形式的队伍状态
        teamStatus: Number(addTeamData.value.teamStatus),
    }
    //更新队伍
    await updateTeam(postData);
    router.push({
        path: '/team',
        //创建队伍页=>队伍页。使用replace，它会把之前创建队伍页的记录给删除，返回上一页不会回到创建队伍页。
        replace: true,
    })
};

// route接收其他页面传过来的参数
const route = useRoute();
// console.log(route.path)
// console.log(route.params)
// console.log(route.query)

//待更新的队伍id
const id = route.query.id;

//获取之前的队伍信息，来回显旧信息（想正常回显，外面也需要用async异步+await等待）
onMounted(async () => {
    if (id <= 0) {
        console.log("想修改的队伍id异常")
        //id异常，直接返回，不用执行后续代码
        return;
    }
    addTeamData.value = await getTeamById(id as number);
})

</script>

<style scoped>

</style>