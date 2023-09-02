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

import {ref} from "vue";
import {addTeam} from "../api/api.ts";
import {useRouter} from "vue-router";

const initFormData = {
    "expireTime": null,
    "maxNum": 3,
    "teamDescription": "",
    "teamName": "",
    "teamPassword": "",
    "teamStatus": 0
}

/**
 * {...initFormData}对象扩展符，保证这个初始值initFormData不会被修改
 * 创建队伍需填写的表单数据
 */
const addTeamData = ref({...initFormData});

/**
 * 显示日历用于时间选择
 */
const showCalendar = ref(false);
//todo 日期格式化、天数+1（只是天数显示有问题，数据库插入的天数正常）

//日历时间确认
const onConfirm = (date) => {
    addTeamData.value.expireTime = date.toISOString();
    showCalendar.value = false;
};


const router = useRouter();

/**
 * 提交创建队伍表单
 */
const onSubmit = async () => {
    const postData = {
        // 取出表单中的数据
        ...addTeamData.value,
        //队伍状态应该是number。覆盖表单中的原有的字符串形式的队伍状态
        teamStatus: Number(addTeamData.value.teamStatus),
    }
    //创建队伍
    await addTeam(postData);
    router.push({
        path: '/team',
        //创建队伍页=>队伍页。使用replace，它会把之前创建队伍页的记录给删除，返回上一页不会回到创建队伍页。
        replace: true,
    })
};
</script>

<style scoped>

</style>