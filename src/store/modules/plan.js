/**
 * Created by 军标 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  jobPlanDelete:{},
  jobPlanStop:{},
  jobPlanConfigs:{},
  jobPlanDepend:{},
  jobPlanUpdate:{}
}

const getters = {
  getJobPlanDelete: state => state.jobPlanDelete,
  getJobPlanStop: state => state.jobPlanStop,
  getJobPlanConfigs: state => state.jobPlanConfigs,
  getJobPlanDepend: state => state.jobPlanDepend,
  getJobPlanUpdate: state => state.jobPlanUpdate
}
const actions = {
  requestJobPlanDelete({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.deleteJobPlan(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_JOB_PLAN_DELETE", data);
          resolve(data);
        }
        else{
          commit("SET_JOB_PLAN_DELETE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_JOB_PLAN_DELETE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestJobPlanStop({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putJobPlanStop(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_JOB_PLAN_STOP", data);
          resolve(data);
        }
        else{
          commit("SET_JOB_PLAN_STOP", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_JOB_PLAN_STOP", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestJobPlanConfigs({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getJobPlanConfigs(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_JOB_PLAN_CONFIGS", data);
          resolve(data);
        }
        else{
          commit("SET_JOB_PLAN_CONFIGS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_JOB_PLAN_CONFIGS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestJobPlanDepend({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getJobPlanDepend(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_JOB_PLAN_DEPEND", data);
          resolve(data);
        }
        else{
          commit("SET_JOB_PLAN_DEPEND", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_JOB_PLAN_DEPEND", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestJobPlanUpdate({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putJobPlanUpdate(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_JOB_PLAN_UPDATE", data);
          resolve(data);
        }
        else{
          commit("SET_JOB_PLAN_UPDATE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_JOB_PLAN_UPDATE", {});
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
  ['SET_JOB_PLAN_DELETE'](state,data){
    state.jobPlanDelete = data;
  },
  ['SET_JOB_PLAN_STOP'](state,data){
    state.jobPlanStop = data;
  },
  ['SET_JOB_PLAN_CONFIGS'](state,data){
    state.jobPlanConfigs = data;
  },
  ['SET_JOB_PLAN_DEPEND'](state,data){
    state.jobPlanDepend = data;
  },
  ['SET_JOB_PLAN_UPDATE'](state,data){
    state.jobPlanUpdate = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
