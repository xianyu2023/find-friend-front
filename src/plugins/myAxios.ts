import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev)
// Set config defaults when creating the instance
//创建axios实例myAxios，导出给其他地方用，来发送请求
const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : '线上环境',
});


// 全局设置 axios 发送请求带上cookie
myAxios.defaults.withCredentials = true

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("我要发送请求了", config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// const router = useRouter();
// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("我收到响应了", response.data)
    //强制登录，前端全局响应拦截，未登录自动跳转到登录页
    if (response?.data?.code===40100) {
        //ts中使用router跳转好像不行，使用window.location.href来跳转
        //window.location.href还表示当前页地址，可用一个变量来存储当前页地址
        const oldHref = window.location.href;
        window.location.href = `/loginAndRegister?redirect=${oldHref}`
    }
    return response?.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;