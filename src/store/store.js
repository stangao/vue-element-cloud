/**
 * Created by 军标 on 2017-9-11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import debug from './modules/debug'
import buy from './modules/buy'
import cluster from './modules/cluster'
import server from './modules/server'
import config from './modules/config'
import manager from './modules/manager'
import managerService from './modules/managerService'
import serviceOpenStop from './modules/serviceOpenStop'
import task from './modules/task'
import detail from './modules/detail'
import plan from './modules/plan'
import storage from './modules/storage'







//import * as actions from './actions'
//import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    debug,
    buy,
    cluster,
    server,
    config,
    manager,
    managerService,
    serviceOpenStop,
    task,
    detail,
    plan,
    storage
  }
})
