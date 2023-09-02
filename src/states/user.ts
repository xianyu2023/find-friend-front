// 存储用户的状态
import {UserType} from "../model/user";

let currentUser: UserType;

//接收外界传入的user，并存储起来
const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}
const getCurrentUserState = () : UserType => {
    return currentUser;
}
export {
    setCurrentUserState,
    getCurrentUserState,
}