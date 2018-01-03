// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  './components'

//  vuex
import store from './store/store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource);


// Vue.http.options.emulateJSON = true;
// Vue.http.options.xhr = { withCredentials: true }
// Vue.http.interceptors.push(function(request, next) {//拦截器
// // 跨域携带cookie
//   request.credentials = true;
//   next()
// })

// Vue.http.interceptors.push((request,next)=>{
//  // request.credentials = true; // 接口每次请求会跨域携带cookie
//  // request.method= 'GET'; // 请求方式（get,post）
//  request.headers.set('token','111') // 请求headers携带参数
//
//  next(function(response){
//   return response;
//  });
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
