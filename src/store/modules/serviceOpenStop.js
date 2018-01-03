/**
 * Created by 军标 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  serviceOnOffList:{},
  serviceUpdate:{},
  serviceDelete:{},
  creatServicePlans:{},
  servicePlansStatus:{}
}

const getters = {
  getServiceOnOffList: state => state.serviceOnOffList,
  getServiceUpdate: state => state.serviceUpdate,
  getServiceDelete: state => state.serviceDelete,
  getCreatServicePlans: state => state.creatServicePlans,
  getServicePlansStatus: state => state.servicePlansStatus,
}
const actions = {
  requestServiceOnOffList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServiceOpenStop(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVIVCEONOFF_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_SERVIVCEONOFF_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVIVCEONOFF_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestServiceUpdate({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServiceUpdate(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVIVCE_UPDATE", data);
          resolve(data);
        }
        else{
          commit("SET_SERVIVCE_UPDATE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVIVCE_UPDATE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestServiceDelete({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getDeleteService(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVIVCE_DELETE", data);
          resolve(data);
        }
        else{
          commit("SET_SERVIVCE_DELETE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVIVCE_DELETE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestCreatServicePlans({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postCreatServicePlans(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CREATE_SERVICE_PLANS", data);
          resolve(data);
        }
        else{
          commit("SET_CREATE_SERVICE_PLANS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CREATE_SERVICE_PLANS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestServicePlansStatus({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServicePlansStatus(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVICE_PLANS_STATUS", data);
          resolve(data);
        }
        else{
          commit("SET_SERVICE_PLANS_STATUS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVICE_PLANS_STATUS", {});
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
  ['SET_SERVIVCEONOFF_LIST'](state,data){
    state.serviceOnOffList = data;
  },
  ['SET_SERVIVCE_UPDATE'](state,data){
    state.serviceCreate = data;
  },
  ['SET_SERVIVCE_DELETE'](state,data){
    state.serviceDelete = data;
  },
  ['SET_CREATE_SERVICE_PLANS'](state,data){
    state.creatServicePlans = data;
  },
  ['SET_SERVICE_PLANS_STATUS'](state,data){
    state.servicePlansStatus = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
