/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  taskList:{},
  taskDetail:{},
  createTaskPlans:{}
}

const getters = {
  getTaskList: state => state.taskList,
  getTaskDetail: state => state.taskDetail,
  getCreateTaskPlans: state => state.createTaskPlans,
}
const actions = {
  requestTaskList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getTaskList(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_TASK_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_TASK_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_TASK_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestTaskDetail({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getTaskDetail(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_TASK_DETAIL", data);
          resolve(data);
        }
        else{
          commit("SET_TASK_DETAIL", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_TASK_DETAIL", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestCreateTaskPlans({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postCreateTaskPlans(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CREATE_TASK_PLANS", data);
          resolve(data);
        }
        else{
          commit("SET_CREATE_TASK_PLANS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CREATE_TASK_PLANS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  }
}

const mutations = {
  ['SET_TASK_LIST'](state,data){
    state.taskList = data;
  },
  ['SET_TASK_DETAIL'](state,data){
    state.taskDetail = data;
  },
  ['SET_CREATE_TASK_PLANS'](state,data){
    state.createTaskPlans = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
