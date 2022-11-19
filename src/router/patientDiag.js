

const patientDiag = {
    path: '/patientdiag',
    redirect: '/patientdiag/todayconsultation',
    name: '患者诊断',
    component: () => import('../views/patientdiag/Layout.vue'),
    children: [
        {
            path: "/patientdiag/details",
            name: "患者详情",
            component: () => import('../views/patientdiag/PatientDetails.vue'),
        },
        {
            path: "/patientdiag/todaydiagnosis",
            name: "今日患者",
            component: () => import('../views/patientdiag/PatientDiag.vue'),
        }, {
            path: "/patientdiag/historydiagnosis",
            name: "历史患者",
            component: () => import('../views/patientdiag/HistoryPatient.vue'),
        }, {
            path: "/patientdiag/historydetails",
            name: "历史患者详情",
            component: () => import('../views/patientdiag/HistoryPatientDetails.vue'),
        },
    ]
}

export default patientDiag     //导出
