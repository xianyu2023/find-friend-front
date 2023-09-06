import myAxios from "../plugins/myAxios.ts";
export const getCurrentUser = async () => {
    // //使用缓存
    // const currentUser = getCurrentUserState();
    // if (currentUser) {
    //     return currentUser;
    // }
    //用户信息不存在，从远程获取
    const res= await myAxios.get('/user/get/login')
    if (res.code === 0 && res.data) {
        console.log(res,'成功获取当前用户信息');
        // setCurrentUserState(res.data);
        return res.data;
    } else {
        return null;
    }
}

