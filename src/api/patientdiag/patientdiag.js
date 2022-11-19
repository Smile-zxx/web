import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'
// 获取今日患者列表
export function getTodayPatients() {
    if (store.state.patientDiag.todayPatientsList.length == 0) {
        Get("http://132.232.18.227:3000/patientdiag/todaypatients").then((res) => {
            console.log(res)
            if (res.data.seekmedicaladvicedata.length > 0) {
                res.data.seekmedicaladvicedata.forEach(item => {
                    item.API_pid = item.pid
                })
            }
            console.log(res.data.seekmedicaladvicedata)
            store.commit("todayPatientsList", res.data.seekmedicaladvicedata)
        })
    }
}

// 获取历史者列表
export function getHistoryPatients(pid) {
    return Get("http://132.232.18.227:3000/patientdiag/historypatients").then((res) => {
        if (res.data.seekmedicaladvicedata.length > 0) {
            res.data.seekmedicaladvicedata.forEach(item => {
                item.API_pid = item.pid
            })
        }
        return res.data.seekmedicaladvicedata
        console.log(res)
        // store.commit("todayPatientsList", res.data.seekmedicaladvicedata)
    })
}


// 获取患者详情信息
export function getPatientDetails(pid) {
    return Get("http://132.232.18.227:3000/patientdiag/patient/" + pid).then((res) => {
        if (res.status == 200) {
            let obj = {};
            obj.patientInfo = {};
            obj.API_diagInfo = {};
            obj.patientInfo.API_basicInfo = res.data.API_basicInfo;
            obj.patientInfo.API_illState = res.data.API_illState;
            obj.patientInfo.API_history = res.data.API_history;
            obj.patientInfo.API_examResult = res.data.API_examResult;
            obj.API_diagInfo = res.data.API_diagInfo;
            obj.API_state = res.data.API_state;
            return obj
        } else {
            new Promise((resolve) => {
                resolve(res)
                router.push("/patientdiag/todaydiagnosis")
            })
        }

    })
}

// 保存患者诊断信息
export function savePatientDiagInfo(pid, API_state, API_illState, API_diagInfo) {
    let errList = [];
    let flag = true;
    // if (API_state) {
    if (API_illState.API_description == 0 && API_illState.API_questionnaire.length == 0) {
        errList.push("病情描述")
        flag = false
    }
    if (API_diagInfo.API_diagResult.length == 0) {
        errList.push("诊断结论描述")
        flag = false
    }
    if (API_diagInfo.API_treatment.API_description.length == 0) {
        errList.push("治疗方案描述")
        flag = false
    }
    // }
    if (flag) {
        let obj = {};
        obj.API_state = API_state;
        obj.API_illState = {};
        obj.API_illState.API_description = API_illState.API_description
        obj.API_diagInfo = API_diagInfo
        Post("http://132.232.18.227:3000/patientdiag/patient/" + pid, obj).then(res => {
            if (res.status == 200) {
                Message.success(res.data.msg)

                store.commit("changeTodayPatient", { pid: pid, API_symptom: obj.API_illState.API_description, newState: "已完成" })
            } else {
                Message.error("保存失败")
            }
        })
        router.push("/patientdiag/todaydiagnosis")
    } else {
        Message.error("请完善以下部分：" + errList.join('、'))
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

//获取诊断结论描述选项
export function getResultOptions() {
    if (localStorage.getItem("resultopt")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("resultopt"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/resultoptions").then(res => {
            localStorage.setItem("resultopt", JSON.stringify(res.data.resultoptions1))
            return res.data.resultoptions1
        })
    }
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
//获取历史诊断结论
export function getDiagHistory() {
    if (localStorage.getItem("diaghistoryopts")) {
        return new Promise(resolve => {
            console.log(localStorage.getItem("diaghistoryopt"))
            let obj = JSON.parse(localStorage.getItem("diaghistoryopt"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/diaghistory").then(res => {
            // console.log(res)
            localStorage.setItem("diaghistoryopt", JSON.stringify(res.data.diagHistory))
            return res.data.diagHistory
        })
    }

}
//获取历史治疗方案
export function getTreatHistory() {
    if (localStorage.getItem("treathistoryopts")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("treathistoryopts"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/treathistory").then(res => {
            localStorage.setItem("treathistoryopts", JSON.stringify(res.data.treatHistory))
            return res.data.treatHistory
        })
    }
}

//获取医疗机构信息
export function getMedicalInfo() {
    if (localStorage.getItem("medicalinfoopt")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("medicalinfoopt"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/medicalinfo").then(res => {
            localStorage.setItem("medicalinfoopt", JSON.stringify(res.data.medicalinfo))
            console.log(res.data.medicalinfo)
            return res.data.medicalinfo
        })
    }
}

// 获取药品信息
export function getDurgsInfo(page, name) {
    return Post("http://132.232.18.227:3000/patientdiag/durgsearch", {
        name: name,
        page: page + ""
    }).then(res => {
        if (res.data.data.length == 0) {
            Message.error("没有找到相关药品")
        }
        return res.data

    })
}

// 获取历史处方
export function getHistoryPrescription(page) {
    return Post("http://132.232.18.227:3000/patientdiag/prescriptionhistory", { page: page + "" }).then(res => {
        console.log(page)
        console.log(res.data)
        return res.data
    })
}