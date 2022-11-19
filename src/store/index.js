import Vue from "vue";
import Vuex from "vuex";
import msg from "./message/message.js"
import patientDiag from "./patientDiag/patientDiag.js"
import patientTreatment from "./patientTreatment/patientTreatment.js"
import instantInfo from "./instantInfo/instantInfo.js"
import patientCommunication from "./instantInfo/patientCommunication.js"
import operationManage from "./operationManage/operationManage.js"

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ["instantInfo", "user.userInfo",]
})

export default new Vuex.Store({
  state: {
    pageState: true,//功能栏是否收缩，true表示没有收缩
    user: {
      userInfo: {
        userId: '',
        name: '',
        role: "",
        func: [],
        portrait: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      personalInfo:
      {
        basicinfo:
        {
          Name: '',
          Gender: '',
          Birthday: '',
          Post: '',
          Tel: '',
          Address: '',
          Portrait: ''
        },
        exp: [],
        personalfinance: [],
        financeAccount: {
          flag: false,
          defaultType: '',
          bank: {
            bankName: '',
            account: '',
            name: '',
          },
          alipay: {
            account: '',
            name: '',
          },
          wechat: {
            account: '',
            name: '',
          },
        },
        settings: ''
      },
    },
    recommend: {
      collapseDate: [],
      imgList: []
    },
    medicalInfo: {
      organization: [],
      expertGroup: [],
      ariticle: [],
    },
    expertManage: [],
    orgManage: [],
  },

  getters: {
    recommend: (state) => {
      return state.recommend
    },
    userFunction: (state) => {
      return state.user.userInfo.func
    },
    basicInfo: (state) => {
      let obj = {};
      obj.basicInfo = state.user.personalInfo.basicinfo;
      obj.exp = state.user.personalInfo.exp;
      return obj;
    },
    userInfo: (state) => {
      return state.user.userInfo
    },
    financeAccount: (state) => {
      return state.user.personalInfo.financeAccount
    }
  },
  mutations: {
    pageState(state) {
      state.pageState = !state.pageState
    },
    userInfo(state, data) {
      state.user.userInfo.userId = data[0];
      state.user.userInfo.name = data[1];
      state.user.userInfo.role = data[2];
      state.user.userInfo.func = data[3];
      state.user.userInfo.portrait = data[4];
    },
    recommend(state, data) {
      state.recommend.imgList = data[0];
      state.recommend.collapseDate = data[1];
    },
    basicInfo(state, data) {
      localStorage.setItem('name', data[0].Name)
      state.user.userInfo.name = data[0].Name;
      state.user.personalInfo.basicinfo = data[0];
      state.user.personalInfo.exp = data[1];
    },
    financeAccount(state, data) {
      state.user.personalInfo.financeAccount = data
      state.user.personalInfo.financeAccount.flag = true
    },
    orgList(state, data) {
      state.medicalInfo.organization = data
    },
    expertGroupList(state, data) {
      state.medicalInfo.expertGroup = data
    },
    ariticleList(state, data) {
      state.medicalInfo.ariticle = data
    },
    expertManage(state, data) {
      state.expertManage = data

    },
    orgManage(state, data) {
      state.orgaManage = data

    },
  },
  actions: {
  },
  modules: {
    msg,
    patientDiag,
    patientTreatment,
    instantInfo,
    operationManage,
    patientCommunication
  },
  plugins: [dataState]
});
