import { getUserApi } from '@/services/login';
import apiPath from "@/utils/api";

const { getUserPath } = apiPath;

export default {
    namespace: 'global',
    //该模型中的一些属性
    state: {
        LoginModelBoo: false,
        userMsg: {
            username: "",
            password: "",
            expire: 0,
            queried: 0,
            queries: 0,
            enterprise: "",
            createTime: "",
            updateTime: "",
        },
        searchCon: '',
    },
    //一些正常的同步方法
    reducers: {
        save(state: any, result: any) {
            return {
                ...state,
                ...result,
            }
        },
    },
    effects: {
        // 获取用户信息
        *getUserData(params: any, sagaEffects: any) { //定义异步方法
            const { call, put } = sagaEffects; //获取到call、put方法
            const result = yield call(getUserApi, getUserPath); //执行请求
            yield put({ // 调用reducers中的方法
                type: "save", //指定方法名
                data: result  //传递ajax回来的数据, 注意 put 会指定调用的同步方法[reducers 中定义的方法],
                //该调用的方法会在定义的方法的入参添加一个参数（result）, 使用该参数才能获取到put方法,取到的值
            });
        },
        // 登出
        logout() {
            localStorage.removeItem('authorization');
            localStorage.removeItem('userId');
            window.location.href = '/search';
        }
    }

}
