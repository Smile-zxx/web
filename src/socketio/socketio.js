import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vue from "vue";
import store from "../store/index.js"
import { getTodayPatients } from '../api/patientdiag/patientdiag.js';
const socket = io('http://132.232.18.227:3000');
socket.addEventListener("seekMedical", (data) => {
    getTodayPatients()
    let obj = {}
    obj.type = "huanzhe"
    obj.time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    obj.msg = "您有新的就诊请求"
    obj.router = "/patientdiag/todaydiagnosis"
    store.commit("addMessage", obj)
    data.API_pid = data.pid
    console.log(data)
    // data.API_date = new Date(data.API_date).toLocaleTimeString('zh-CN', { hour12: false })
    store.commit("addTodayPatient", data)
})

socket.addEventListener("temp_message", (data) => {
    if (data.length > 0) {
        getTodayPatients()
        data.forEach(item => {
            let obj = {}
            switch (item.type) {
                case 'seekmedical':
                    obj.type = "huanzhe"
                    obj.time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
                    obj.msg = "您有新的就诊请求"
                    obj.router = "/patientdiag/todaydiagnosis"
                    store.commit("addMessage", obj)
                    break;
                case 'seekmedicalreply':
                    break;
                default:
                    store.commit("instantInfo/receiveMessage", {
                        fromid: item.fromid,
                        message: item.message,
                        type: item.type,
                        msgtime: item.req_datetime,
                        toid: item.toid
                    })
                    obj.type = "instant"
                    obj.time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
                    obj.msg = "您有新的消息"
                    obj.router = ""
                    store.commit("addMessage", obj)
                    break;

            }
        });
    }

})

socket.addEventListener("login", (data) => {
    console.log(data)
})
socket.addEventListener("seekmedicalreply", (data) => {
    getTodayPatients()
    store.commit("changeTodayPatient", { pid: data.pid, newState: data.API_state },)

})

socket.addEventListener("instantMsg", (data) => {
    store.commit("instantInfo/receiveMessage", data)
    let obj = {}
    obj.type = "instant"
    obj.time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    obj.msg = "您有新的消息"
    obj.router = "/instantinfo/message"
    store.commit("addMessage", obj)
})

socket.addEventListener("after_treatment_request", (data) => {
    let role = store.state.user.userInfo.role
    let obj = {}
    obj.type = "newPatient"
    obj.time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    obj.msg = "您有新的住院患者"
    if (role == '护士') {
        obj.router = "/operationmanage/patientlist"
    } else {
        obj.router = "/treatment/patientlist"
    }
    store.commit("addMessage", obj)

})

Vue.use(VueSocketIOExt, socket);

export default socket;