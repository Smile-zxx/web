export default {
    namespaced: true,
    state: {
        currentPid: "",
    },
    getters: {
    },
    mutations: {
        currentPidChange(state, pid) {
            state.currentPid = pid
        }
    },
    actions: {

    },
    modules: {}
};