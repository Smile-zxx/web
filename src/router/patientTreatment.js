const patientTreatment = {
    path: '/treatment',
    redirect: '/treatment/patientlist',
    name: '患者治疗',
    component: () => import('../views/patienttreatment/Layout.vue'),
    children: [
        {
            path: "/treatment/applylist",
            name: "住院申请",
            component: () => import('@views/patienttreatment/applylist/ApplyList.vue'),
        },
        {
            path: "/treatment/applydetails",
            name: "住院申请详情",
            component: () => import('@views/patienttreatment/applydetails/ApplyDetails.vue'),
        },
        {
            path: "/treatment/patientlist",
            name: "住院患者",
            component: () => import('@views/patienttreatment/patientlist/PatientList.vue'),
        },
        {
            path: "/treatment/patientdetails",
            name: "住院患者详情",
            component: () => import('@views/patienttreatment/patientdetails/PatientDetails.vue'),
        },
    ]
}

export default patientTreatment     //导出
