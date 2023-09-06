import {UserVO} from "./user";

/**
 * 队伍类型
 */
export type TeamType = {
    id: number;
    teamName: string;
    teamDescription?: string;
    maxNum: number;
    expireTime?: Date;
    leaderId: number;
    //todo 定义枚举值类型，更规范
    teamStatus: number;
    teamPassword?: string;
    createTime: Date;
    updateTime: Date;
    leaderVO?: UserVO;
    hasJoin?: boolean;
    joinNum?: number;
};