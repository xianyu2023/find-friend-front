
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import SearchPage from "../pages/SearchPage.vue";
import EditPage from "../pages/EditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import LoginUser from "../pages/LoginUser.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserInfo from "../pages/UserInfo.vue";
import TeamHasJoinPage from "../pages/TeamHasJoinPage.vue";
import TeamIsLeaderPage from "../pages/TeamIsLeaderPage.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/', name: '首页', component: Index},
    { path: '/team', name: '队伍页', component: Team },
    { path: '/user', name: '用户页', component: User },
    { path: '/searchPage', name: '搜索页', component: SearchPage },
    { path: '/user/edit', name: '用户编辑页', component: EditPage },
    { path: '/searchResultPage', name: '搜索结果页',component: SearchResultPage },
    { path: '/loginUser', name: '登录用户', component: LoginUser },
    { path: '/team/add',name: '创建队伍页', component: TeamAddPage },
    { path: '/team/update',name: '更新队伍页', component: TeamUpdatePage },
    { path: '/user/info', name: '用户详情页',component: UserInfo },
    { path: '/team/hasJoin', name: '我加入的队伍',component: TeamHasJoinPage },
    { path: '/team/isLeader', name: '我管理的队伍',component: TeamIsLeaderPage },

]
export default routes;