export default {
    namespaced: true,
    state: {
        patientsList: [],
    },
    getters: {
    },
    mutations: {
        // 整体更新病人列表
        patientsList(state, patients) {
            console.log(patients)
            state.patientsList = patients
        },
        // //来新病人后添加到列表中
        // addTodayPatient(state, newPatient) {
        //     state.todayPatientsList.push(newPatient)
        // },
        // // 完成病人诊断后改变其就诊状态
        // changeTodayPatient(state, pid) {
        //     state.todayPatientsList.forEach(e => {
        //         if (e.API_pid == pid) {
        //             e.API_state = "已完成"
        //         }
        //     });
        // }
    },
    actions: {

    },
    modules: {}
};