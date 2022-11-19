import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'
// 获取今日患者列表
export function api_test() {
    Get("http://132.232.18.227:3000/patienttreatment/patientlist").then(res => {
        console.log(res)
    })
    // console.log("!23")
}

