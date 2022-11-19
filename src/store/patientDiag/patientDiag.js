export default {
    state: {
        todayPatientsList: [],
    },
    getters: {
    },
    mutations: {
        //整体更新病人列表
        todayPatientsList(state, patients) {
            state.todayPatientsList = patients
        },
        //来新病人后添加到列表中
        addTodayPatient(state, newPatient) {
            state.todayPatientsList.push(newPatient)
        },
        // 完成病人诊断后改变其就诊状态
        changeTodayPatient(state, data) {
            state.todayPatientsList.forEach(e => {
                if (e.API_pid == data.pid) {
                    e.API_state = data.newState
                }
            });
        }
    },
    actions: {

    },
    modules: {}
};