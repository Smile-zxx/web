import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import axios from "./http/axios.js"
// import './mock/mock.js'
import './socketio/socketio.js'
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/common.scss"
import './assets/icon/iconfont/iconfont.css'



Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
