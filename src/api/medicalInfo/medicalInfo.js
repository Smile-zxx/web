import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import { Message } from 'element-ui';
import router from '../../router/index.js'
import store from '../../store/index.js';

//获取机构列表信息
export function getOrgInfo() {
    if (store.state.medicalInfo.organization == false) {
        return Get('/api/medicalinfo/organization').then(res => {
            store.commit('orgList', res.data.data.listInfo)
            return res.data.data.listInfo
        })
    } else {
        return new Promise(resolve => {
            let obj = store.state.medicalInfo.organization
            resolve(obj)
        })
    }
}
//获取机构详情
export function getOrgDetail(orgId) {
    return Get('/api/medicalinfo/orgdetail', orgId).then(res => {
        return res.data.data.orgInfo
    }).catch(() => {
        Message.error("网络错误！")
    })

}
//获取医生详情
export function getDoctorDetail(docId) {
    return Get('/api/medicalinfo/docdetail', docId).then(res => {
        return res.data.data.docDetail
    }).catch(() => {
        Message.error("网络错误！")
    })

}
//获取护士详情
export function getNurseDetail(nurId) {
    Get('/api/medicalinfo/docdetail', nurId).then(res => {
        return res.data.data.docDetail
    }).catch(() => {
        Message.error("网络错误！")
    })

}
//获取专家团队列表
export function getExpertGroupInfo() {
    if (store.state.medicalInfo.expertGroup == false) {
        return Get('/api/medicalinfo/expertgroup').then(res => {
            store.commit('expertGroupList', res.data.data.listInfo)
            return res.data.data.listInfo
        })
    } else {
        return new Promise(resolve => {
            let obj = store.state.medicalInfo.expertGroup
            resolve(obj)
        })
    }
}
//获取专家团队详情
export function getExpertGroupDetail(experGroupId) {
    return Get('/api/medicalinfo/expertgroupdetail', experGroupId).then(res => {
        return res.data.data.expertGroupInfo
    }).catch(() => {
        Message.error("网络错误！")
    })

}
// 获取专家详情
export function getExpertDetail(experId) {
    Get('/api/medicalinfo/expertdetail', experId).then(res => {
        return res.data.data.expertGroupDetail
    }).catch(() => {
        Message.error("网络错误！")
    })

}

