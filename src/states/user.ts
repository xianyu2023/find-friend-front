// 存储用户的状态
import {UserVO} from "../model/user";

let currentUser: UserVO;

//接收外界传入的user，并存储起来
const setCurrentUserState = (user: UserVO) => {
    currentUser = user;
}
const getCurrentUserState = () : UserVO => {
    return currentUser;
}
export {
    setCurrentUserState,
    getCurrentUserState,
}