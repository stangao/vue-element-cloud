/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  managerClusterList:{},
  changegroupStatus: '',
  billDetail:{}
}

const getters = {
  getManagerClusterList: state => state.managerClusterList,
  getChangegroupStatus: state => state.changegroupStatus,
  getBillDetail: state => state.billDetail,

}
const actions = {
  requestManagerClusterList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getClusterList(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_MANAGERCLUSTER_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_MANAGERCLUSTER_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_MANAGERCLUSTER_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestChangegroup({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getChangeGroup(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CHANGEGROUP_STATUS", data);
          resolve(data);
        }
        else{
          commit("SET_CHANGEGROUP_STATUS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CHANGEGROUP_STATUS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestBillDetail({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getBillDetail(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_BILL_DETAIL", data);
          resolve(data);
        }
        else{
          commit("SET_BILL_DETAIL", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_BILL_DETAIL", {});
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
  ['SET_MANAGERCLUSTER_LIST'](state,data){
    state.managerClusterList = data;
  },
  ['SET_CHANGEGROUP_STATUS'](state,data){
    state.changegroupStatus = data;
  },
  ['SET_BILL_DETAIL'](state,data){
    state.billDetail = data;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
