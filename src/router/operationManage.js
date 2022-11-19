const operationManage = {
    path: '/operationmanage',
    redirect: '/operationmanage/patientlist',
    name: '查房管理',
    component: () => import('../views/operationmanage/Layout.vue'),
    children: [
        {
            path: "/operationmanage/applylist",
            name: "住院申请",
            component: () => import('@views/operationmanage/applylist/ApplyList.vue'),
        },
        {
            path: "/operationmanage/applydetails",
            name: "住院申请详情",
            component: () => import('@views/operationmanage/applydetails/ApplyDetails.vue'),
        },
        {
            path: "/operationmanage/patientlist",
            name: "住院患者",
            component: () => import('@views/operationmanage/patientslist/patientsList.vue'),
        },
        {
            path: "/operationmanage/patientdetails",
            name: "住院患者详情",
            component: () => import('@views/operationmanage/patientdetails/PatientDetails.vue'),
        },
    ]
}

export default operationManage     //导出
