/**
 * 用户类型
 */
export type UserType = {
    id: number;
    userName?: string;
    userAccount: string;
    userAvatar?: string;
    profile?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus: number;
    userRole: number;
    createTime?: Date;
    tags?: string;
};

/**
 * 脱敏登录用户
 */
export type UserVO = {
    id: number;
    userName?: string;
    userAccount: string;
    userAvatar?: string;
    userProfile?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus: number;
    userRole: string;
    createTime?: Date;
    tagsList?: string[];
};