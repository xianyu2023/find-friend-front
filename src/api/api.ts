import myAxios from "../plugins/myAxios.ts";


/**创建队伍 POST    /team/add */
export const addTeam = async (postData) => {
    //使用async异步+await等待的方式，等待请求响应完毕后才会执行后续的代码，否则会立刻执行
    //todo 前端参数校验
    const res = await myAxios.post("/team/add", postData);
    if (res?.code === 0 && res.data) {
        console.log("创建队伍成功");
        return true;
    } else {
        console.log("创建队伍失败");
        return false;
    }
}

/**加入队伍 POST    /team/join */
export const joinTeam = async (id: number, teamPassword: string) => {
    const res = await myAxios.post("/team/join", {
        teamId: id,
        teamPassword
    });
    if (res?.code === 0 && res.data) {
        console.log("加入队伍成功");
    } else {
        console.log("加入队伍失败: " + (res.description ? `${res.description}` : ''));
    }
}

/**根据id获取队伍信息 GET    /team/get */
export const getTeamById = async (id: number) => {
    const res = await myAxios.get("/team/get", {
        params: {
            teamId: id,
        }
    });
    if (res?.code === 0 && res.data) {
        console.log("获取旧队伍信息成功");
        return res.data;
    } else {
        console.log("获取旧队伍信息失败: " + (res.description ? `${res.description}` : ''));
    }
}

/**修改队伍信息 POST    /team/update */
export const updateTeam = async (postData) => {
    const res = await myAxios.post("/team/update", postData);
    if (res?.code === 0 && res.data) {
        console.log("更新队伍成功");
        return res.data;
    } else {
        console.log("更新队伍失败: " + (res.description ? `${res.description}` : ''));
    }
}

/**退出队伍 POST    /team/exit */
export const exitTeam = async (teamId: number) => {
    const res = await myAxios.post("/team/exit", {
        teamId
    });
    if (res?.code === 0 && res.data) {
        console.log("退出队伍成功");
        return res.data;
    } else {
        console.log("退出队伍失败: " + (res.description ? `${res.description}` : ''));
    }
}

/**解散队伍 POST    /team/delete */
export const deleteTeam = async (teamId: number) => {
    const res = await myAxios.post("/team/delete", {
        teamId
    });
    if (res?.code === 0 && res.data) {
        console.log("删除队伍成功");
        return res.data;
    } else {
        console.log("删除队伍失败: " + (res.description ? `${res.description}` : ''));
    }
}

/**匹配道友 GET    /user/match */
export const matchUser = async (num: number) => {
    const res = await myAxios.get("/user/match", {
        params: {
            num
        }
    });
    if (res?.code === 0 && res.data) {
        console.log("匹配道友成功");
        return res.data;
    } else {
        console.log("匹配道友失败: " + (res.description ? `${res.description}` : ''));
    }
}

/**直接分页查询用户 GET    /user/match */
export const recommendUser = async () => {
    const res = await myAxios.get('/user/recommend', {
        params: {
            pageNum: 1,
            pageSize: 8,
        },
    })
        .then(function (response) {
            // console.log('/user/recommend',response);
            // Toast.success('请求成功');
            // console.log(response);
            //先把res=>response处理=>res
            return response?.data?.records;
        })
        .catch(function (error) {
            console.error('/user/recommend',error);
            // Toast.fail('请求失败');
        });
    // console.log("res:"+res?.data?.records)
    // console.log("res: "+res)
    return res;
}