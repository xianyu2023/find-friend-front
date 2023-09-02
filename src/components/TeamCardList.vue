<template>
    <div id="teamCardList">
        <van-skeleton v-for="team in props.teamList"
                      title avatar :row="3" :loading="props.loading">
            <van-card
                      :desc="team.teamDescription"
                      :title="team.teamName"
                      :thumb="kun"
            >
                <template #tags>
                    <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px " >
                        <!--                像数组索引取值-->
                        {{ teamStatusEnum[team.teamStatus] }}
                    </van-tag>
                </template>
                <!--        使用插槽slots（template）自定义内容。id为bottom的插槽-->
                <template #bottom>
                    <div>
                        {{'当前/总数:    ' + team.joinNum + '/' + team.maxNum}}
                    </div>
                    <div>
                        {{'创建时间:    '+team.createTime}}
                    </div>
                    <div>
                        {{'到期时间:    '+team.expireTime}}
                    </div>
                </template>


                <template #footer>
                    <!--                只有队长才可以更新、解散队伍-->
                    <van-button v-if="currentUser?.id === team.leaderId" size="mini" type="primary" plain @click="toUpdateTeam(team.id)">
                        更新队伍
                    </van-button>
                    <van-button v-if="currentUser?.id === team.leaderId" size="mini" type="primary" plain @click="doDeleteTeam(team.id)">
                        解散队伍
                    </van-button>

<!--                    如果不想给函数doJoinTeam传递队伍id参数。可以自定义一个joinTeamId变量，然后赋值-->
                    <van-button v-if="!team.hasJoin" size="mini" type="primary" plain @click="preDoJoinTeam(team)">
                        加入队伍
                    </van-button>
    <!--                只有已加入队伍才可以退出队伍-->
                    <van-button v-if="team.hasJoin" size="mini" type="primary" plain @click="doExitTeam(team.id)">退出队伍</van-button>
                </template>
            </van-card>
        </van-skeleton>
        <!--       这个组件放最外层   密码输入弹出框：          点击加入加密队伍时要输入密码-->
        <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam()" @cancel="cancelJoinTeam">
            <van-field v-model="teamPassword" label="密码 :" type="password" placeholder="请输入密码" />
        </van-dialog>
    </div>

</template>

<script setup lang="ts">
import {TeamType} from "../model/team";
import {teamStatusEnum} from "../constants/team.ts";
import kun from "../assets/kun.jpg";
import {deleteTeam, exitTeam, joinTeam} from "../api/api.ts";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
teamList: TeamType[];
loading: boolean;
}

const props = withDefaults(defineProps<TeamCardListProps>(),{
    loading: true,
    //@ts-ignore
    teamList: [] as TeamType[],
});

const joinTeamId = ref(0);
/**
 * 加入队伍
 */
const doJoinTeam = async () => {
    //如果想加入的队伍id不存在，直接返回，减少占用后端资源
    if (!joinTeamId.value) {
        return;
    }
    //todo 加入队伍、退出队伍后没有刷新（使用router不行）
    await joinTeam(joinTeamId.value,teamPassword.value);
}

const router = useRouter();
/**
 * 跳转到修改队伍页面
 * @param teamId
 */
const toUpdateTeam = (teamId: number) => {
    router.push({
        path: '/team/update',
        query: {
            id: teamId,
        }
    })
}

// 没有给当前用户信息设置缓存，获取不到信息
// const currentUser = getCurrentUserState();
const currentUser = ref();
onMounted(async () => {
    currentUser.value = await getCurrentUser();
})

/**
 * 退出队伍
 * @param teamId
 */
const doExitTeam = async (teamId: number) => {
    await exitTeam(teamId);
}

/**
 * 解散队伍（队长）
 * @param teamId
 */
const doDeleteTeam = async (teamId: number) => {
    await deleteTeam(teamId);
}
//存储密码输入框内的密码
const teamPassword = ref('');
//控制输入密码弹窗的显示
const showPasswordDialog = ref(false);

/**
 * 预加入队伍，支持加入加密队伍时密码弹窗显示
 * 如果组件中不支持@click="() =>{代码}"这种写法，可提取代码到此处
 * @param team
 */
const preDoJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id;
    if(team.teamStatus === 0) {
        doJoinTeam();
    } else {
        showPasswordDialog.value = true;
    }
}

/**
 * 加入加密队伍时取消加入清空想加入的队伍id及已经输入的队伍密码
 */
const cancelJoinTeam = () => {
    joinTeamId.value = 0;
    teamPassword.value = '';
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
    height: 120px;
    /*unset似乎没起作用*/
    object-fit: unset;
}
</style>