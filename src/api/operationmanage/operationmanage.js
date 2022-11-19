import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'





/* 
    住院申请：
        住院申请列表
        住院申请详情
*/

// 住院申请列表 
export function getApplyList() {
    return Get("/api/operationmanage/applylist").then((res) => {
        return res.data.patientsList;
    })
}

// 住院申请详情
export function getApplyDetails(pid) {
    return Get("/api/operationmanage/applydetails/" + pid).then((res) => {
        let arr = [
            {
                data: {},
                name: "吞咽功能评定",
                state: "未完成"
            }, {
                data: {},
                name: "跌倒风险评定",
                state: "未完成"
            },
        ]
        console.log(pid, res.data)
        res.data.API_questionnaire.forEach(element => {
            arr.forEach(item => {
                if (element.name == item.name) {
                    item.state = '已完成'
                    item.data = element.data
                }
            })
        });

        res.data.API_questionnaire = arr
        res.data.API_questionnaire.forEach(item => {
            switch (item.name) {
                case '吞咽功能评定':
                    item.type = 'TUNYAN'
                    break;
                case '跌倒风险评定':
                    item.type = 'DIEDAO'
                    break;
            }
        })
        console.log(res.data)
        return res.data;
    })
}






// 提交新的护理记录
export function newQuestionnaire(pid, name, data) {
    let obj = {
        time: new Date(),
        name: name,
        data: data
    }
    return Post("/api/operationmanage/newquestionnaire/" + pid, obj).then((res) => {
        Message.success("成功")
        return true
    })
}






// 提交入院评估
export function postRuyuanPinggu(pid, data) {
    return Post("/api/operationmanage/applydetails/pinggu/" + pid, data).then(() => {
        return new Promise(resolve => {
            resolve(true)
        })
    })
}

// 确认入院评估
export function pingguConfirm(pid) {
    return Post("/api/operationmanage/applydetails/confirm/" + pid,).then((res) => {
        return new Promise(resolve => {
            resolve(true)
        })
    })
}

// 住院患者列表
export function getPatientsList() {
    return Get("/api/operationmanage/patientlist").then((res) => {
        console.log(res)
        return res.data.patientsList;
    })
}

// 住院患者详情
export function getPatientsDetails(pid) {
    return Get("/api/operationmanage/applydetails/" + pid).then((res) => {
        return res.data.API_basicInfo
    })
}

// 获取每日护理记录
export function getNursingLogs(pid) {
    return Get("/api/operationmanage/patientdetails/nursinglogs/" + pid).then((res) => {
        let arr = [];
        res.data.API_nursingLogs.forEach(item => {
            arr.push({
                ...item.NursingRecord,
                date: item.NursingDate
            })
        })
        return arr
    })
}

//提交每日护理记录
export function postNursingLogs(pid, data) {
    return Post("/api/operationmanage/patientdetails/newnursinglog/" + pid, { API_newNursingLog: data }).then((res) => {
        Message.success("提交成功")
        return new Promise(resolve => {
            resolve(true)
        })
    })
}

// 获取评估记录
export function getPingguLogs(pid) {
    return Get("/api/operationmanage/pinggulogs/" + pid).then((res) => {
        console.log(res)
        // let arr = [];
        // res.data.API_nursingLogs.forEach(item => {
        //     arr.push({
        //         ...item.NursingRecord,
        //         date: item.NursingDate
        //     })
        // })
        // return arr
        return []
    })
}


// 获取入院记录
export function getRuyuanLogs(pid) {
    return Get("/api/operationmanage/ruyuanlog/" + pid).then((res) => {
        console.log(res)
        return []
    })
}