import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'
// 获取今日患者列表

// 获取患者详情
export function getPatientsDetails(pid) {
    return Get("http://132.232.18.227:3000/patienttreatment/treatmentlog/" + pid).then((res) => {
        console.log("state", res)
        return res.data
    })
}

// 提交新的治疗记录
export function newTreatmentLog(pid, data) {
    return Post("http://132.232.18.227:3000/patienttreatment/treatmentlog/" + pid, data).then((res) => {
        return true
    })
}

//获取治疗方案描述选项
export function getTreatmentOptions() {
    if (localStorage.getItem("treatmentopts")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("treatmentopts"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/treatmentoptions").then(res => {
            console.log(res.data.treatmentOptions)
            localStorage.setItem("treatmentopts", JSON.stringify(res.data.treatmentOptions))
            return res.data.treatmentOptions
        })
        // }
    }
}


//获取患者状态描述选项
export function getStateOptions() {
    if (localStorage.getItem("stateopt")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("stateopt"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/stateoptions").then(res => {
            localStorage.setItem("stateopt", JSON.stringify(res.data.stateOptions))
            return res.data.stateOptions
        })
    }

}


export function getPatientsNursingDetails(pid) {
    return Get("/api/patienttreatment/patientdetails/" + pid).then((res) => {
        return res.data;
    })
}

// 住院申请列表
export function getApplyList() {
    return Get("/api/patienttreatment/applylist").then((res) => {
        return res.data.patientsList
    })
}


// 住院申请详情
export function getApplyDetails() {
    return new Promise(resolve => {
        let obj = {
            API_basicInfo: {
                API_UserID: "13568479726",
                API_name: "zhangxiao",
                API_address: "西南交通大学",
                API_birthday: "2020-03-11 00:00:00",
                API_date: "2020-09-18 10:06:28",
                API_gender: "男",
                API_pic: "http://132.232.18.227:5000/user/userinfo/readfile?url=5446492386645447be3b515d6534e588.jpg",
                API_tel: "199887676677",
            },

            API_questionnaire: [
                {
                    data: {},
                    name: "吞咽功能评定",
                    state: "已完成"
                },
                {
                    data: {},
                    name: "跌倒风险评定",
                    state: "已完成"
                },
            ],
        }
        obj.API_questionnaire.forEach(item => {
            switch (item.name) {
                case "吞咽功能评定":
                    item.type = "TUNYAN"
                    break
                case "跌倒风险评定":
                    item.type = "DIEDAO"
                    break
            }
        })
        resolve(obj)
    })
    // return Get("/api/operationmanage/applylist").then((res) => {
    //     return res.data.applyList;
    // })
}


// 确认入院申请
export function confirmApply(pid, data) {
    return Post("/api/patienttreatment/applydetails/confirm/" + pid, data).then((res) => {
        console.log(res)
        return new Promise(resolve => {
            resolve(true)
        })
    })
}

// 获取住院患者列表
export function getPatientsList() {
    return Get("/api/patienttreatment/applylist").then((res) => {
           let arr = [
        {
            API_state: "已处理",
            API_toHospitalID: "202009188426",
            API_expert: "专家2",
            API_date: "2020-09-18 10:06:28",
            API_pid: 426,
            API_name: "zhangxiao"
        }
    ]
    return arr
        return res.data.patientsList
    })
    console.log('123')
    let arr = [
        {
            API_state: "已处理",
            API_toHospitalID: "202009188426",
            API_expert: "专家2",
            API_date: "2020-09-18 10:06:28",
            API_pid: 426,
            API_name: "zhangxiao"
        }
    ]
    return arr
}

