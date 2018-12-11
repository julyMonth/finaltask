// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import qs from 'qs'
import "./assets/common.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store/store'
import './assets/reset.css'


Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.prototype.token = "";
Vue.prototype.$axios= axios.create({
  // baseURL: '/api', // 本地mock
  // baseURL: process.env.NODE_ENV === 'production' ? ('/' + process.baseURL) : '/apis', // 联调
  headers: {
    // get: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
    post: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
    // post: {'Content-Type': 'application/json;charset=utf-8'}
  },
  withCredentials: true,
  timeout: 30000,
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }],
  paramsSerializer: function (params) {
    return qs.stringify(params, {arrayFormat: 'indices'})
  },
  validateStatus: function () {
    return true
  },
  transformResponse: [function (data) {
    if (typeof data === 'string' && data[0] === '{') {
      data = JSON.parse(data)
    }
    return data
  }]
})

// 添加请求拦截器
Vue.prototype.$axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

// 添加响应拦截器
Vue.prototype.$axios.interceptors.response.use(function (response) {
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    // msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = {msg}
    } else {
      response.data.msg = msg
    }
  }
  if (response.data.code === 2170914) {
    if (process.env.NODE_ENV === 'production') {
      window.location.reload()
    } else {
      window.location.href = response.data.data
    }
  }
  return response
}, function (error) {
  // 错误抛到业务代码
  error.response = {}
  error.response.data = {}
  error.response.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  return Promise.resolve(error.response)
})
// const store = new Vuex.Store({
//     state:{},
//     getters:{},
//     actions:{},
//     mutations:{},
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
