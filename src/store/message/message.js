export default {
  namespace: true,
  state: {
    messageList: [],
  },
  getters: {},
  mutations: {
    addMessage(state, msg) {
      state.messageList.forEach((element, index) => {
        if (element.router == msg.router) {
          state.messageList.splice(index, 1)
        }
      });
      state.messageList.push(msg)
    },
    delDessage(state, index) {
      state.messageList.splice(index, 1)
    },
  },
  actions: {
  },
  modules: {}
};