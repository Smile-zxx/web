import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from 'element-ui';
import patientDiag from './patientDiag.js'
import patientTreatment from './patientTreatment.js'
import instantInfo from './instantInfo.js'
import operationManage from './operationManage.js'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/index",
    redirect: "/recommend",
    name: "Layout",
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/recommend',
        name: '更多推荐',
        component: () => import('../views/more/More.vue')
      },
      {
        path: '/personalinfo',
        redirect: "/personalinfo/basicinfo",
        name: '个人信息',
        component: () => import('../views/personalInfo/Layout.vue'),
        children: [
          {
            path: "/personalinfo/basicinfo",
            name: "基本信息",
            component: () => import('../views/personalInfo/BasicInfo.vue'),
          },
          {
            path: "/personalinfo/personalfinance",
            name: "个人财务",
            component: () => import('../views/personalInfo/Finance.vue'),
          },
          {
            path: "/personalinfo/bankaccount",
            name: "银行卡管理",
            component: () => import('../views/personalInfo/BankAccount.vue'),
          },
          {
            path: "/personalinfo/settings",
            name: "个人设置",
            component: () => import('../views/personalInfo/Settings.vue'),
          }
        ]
      },
      // 医疗信息
      {
        path: '/medicalinfo',
        name: '医疗信息',
        component: () => import('../views/medicalInfo/Layout.vue'),
        children: [
          {
            path: "/medicalinfo/organization",
            name: "医疗机构",
            component: () => import('../views/medicalInfo/Organization.vue'),
          },
          {
            path: "/medicalinfo/expert",
            name: "医疗专家",
            component: () => import('../views/medicalInfo/Expert.vue'),
          },
          {
            path: "/medicalinfo/article",
            name: "医疗用品",
            component: () => import('../views/medicalInfo/Article.vue'),
          },
          {
            path: "/medicalinfo/orgdetails",
            name: "医疗机构详情",
            component: () => import('../views/medicalInfo/OrgDetails.vue'),
          },
          {
            path: "/medicalinfo/expertdetails",
            name: "医疗专家详情",
            component: () => import('../views/medicalInfo/ExpertDetails.vue'),
          },
        ]
      },
      // 患者诊断
      patientDiag,
      // 患者治疗
      patientTreatment,
      // 查房管理
      operationManage,
      {
        path: '/groupconsultation',
        redirect: "/groupconsultation/todayconsultation",
        name: '普通会诊',
        component: () => import('../views/groupconsultation/Layout.vue'),
        children: [
          {
            path: "/groupconsultation/todayconsultation",
            name: "今日患者",
            component: () => import('../views/groupconsultation/TodayConsultation.vue'),
          },
          {
            path: "/groupconsultation/historyconsultation",
            name: "历史患者",
            component: () => import('../views/groupconsultation/History.vue'),
          }
        ]
      },
      {
        path: '/organizationmanage',
        redirect: '/organizationmanage/orgmanage',
        name: '/',
        component: () => import('../views/orgmanage/Layout.vue'),
        children: [
          {
            path: "/organizationmanage/orgdetails",
            name: "医疗机构详情",
            component: () => import('../views/orgmanage/Details.vue'),
          },
          {
            path: "/organizationmanage/orgmanage",
            name: "机构管理",
            component: () => import('../views/orgmanage/OrgManage.vue'),
          },
        ]
      },
      {
        path: '/expertmanage',
        redirect: '/expertmanage/expmanage',
        name: '/',
        component: () => import('../views/expertmanage/Layout.vue'),
        children: [
          {
            path: "/expertmanage/details",
            name: "专家团队详情",
            component: () => import('../views/expertmanage/Details.vue'),
          },
          {
            path: "/expertmanage/expmanage",
            name: "专家管理",
            component: () => import('../views/expertmanage/ExpManage.vue'),
          },
        ]
      },
      // 即时信息模块
      instantInfo,
    ]
  },
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    if (localStorage.getItem("token")) {
      next()
    } else {
      Message.error('您尚未登录！');
      next('/login')
    }
  } else {
    next()
  }

})


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
