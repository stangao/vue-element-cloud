import Vue from 'vue'
import Router from 'vue-router'
import Global from './global'
import Login from './login'
import Cluster from './cluster'
import Storage from './storage'
import Service from './service'
import console from './console'

Vue.use(Router)

const allRoutes = [
  ...Global.routes,
  ...Login.routes,
  ...Cluster.routes,
  ...Storage.routes,
  ...Service.routes,
  ...console.routes,
]

export default new Router({
  routes: allRoutes
})
