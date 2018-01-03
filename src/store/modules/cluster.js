/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  clustTypeList:[],
  timeTypeList:[],
  clustGroup:[],
  groupName:'myGroup',
  groupId:''

}

const getters = {
  getClustTypeList: state => state.clustTypeList,
  getTimeTypeList: state => state.timeTypeList,
  postClustGroup: state => state.clustGroup,
  getGroupName: state => state.groupName,
  getGroupId: state => state.groupId,

}
const actions = {
  requestClusterConfigList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getClusterConfig(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CLUSTERCONFIG_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_CLUSTERCONFIG_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CLUSTERCONFIG_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestPostClusterConfigList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postClusterConfig(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("POST_CLUSTERCONFIG_LIST", data);
          resolve(data);
        }
        else{
          commit("POST_CLUSTERCONFIG_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("POST_CLUSTERCONFIG_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestGroupName({commit,state},data){
    commit('SET_GROUP_NAME',data);
  },
  requestGroupId({commit,state},data){
    commit('SET_GROUP_ID',data);
  }
}

const mutations = {
  ['SET_CLUSTERCONFIG_LIST'](state,data){
    state.clustTypeList = []
    state.timeTypeList = []
    data['cluster_type'].forEach(function(e){
      state.clustTypeList.push({'value':e})
    });
    // state.timeTypeList = data['billing_mode']
    data['billing_mode'].forEach(function(e){
      state.timeTypeList.push({'value':e["value"],'label':e["label"]})
    });

  },
  ['POST_CLUSTERCONFIG_LIST'](state,data){
    state.clustGroup = data;
  },
  ['SET_GROUP_NAME'](state,value){
    state.groupName = value;
  },
  ['SET_GROUP_ID'](state,value){
    state.groupId = value;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
