/**
 * Created by 军标 on 2017-9-11.
 */
import Api from '../../api/apis'

const state = {
  storageList:[],
  creatSnapShot:{},
  snapShotList:[],
  snapShotDelete:{},
  snapShotRestore:{},
  snapShotStatus:{}
}

const getters = {
  getStorageList: state => state.storageList,
  getCreatSnapShot: state => state.creatSnapShot,
  getSnapShotList: state => state.snapShotList,
  getSnapShotDelete: state => state.snapShotDelete,
  getSnapShotRestore: state => state.snapShotRestore,
  getSnapShotStatus: state => state.snapShotStatus,
}
const actions = {
  requestStorageList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getStorageList(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_STORAGE_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_STORAGE_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_STORAGE_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestCreatSnapShot({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postCreatSnapShot(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CREAT_SNAPSHOT", data);
          resolve(data);
        }
        else{
          commit("SET_CREAT_SNAPSHOT", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CREAT_SNAPSHOT", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSnapShotList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getSnapShotList(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SNAPSHOT_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_SNAPSHOT_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SNAPSHOT_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSnapShotDelete({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.deleteSnapShot(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SNAPSHOT_DELETE", data);
          resolve(data);
        }
        else{
          commit("SET_SNAPSHOT_DELETE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SNAPSHOT_DELETE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSnapShotRestore({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postSnapShotRestore(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SNAPSHOT_RESTORE", data);
          resolve(data);
        }
        else{
          commit("SET_SNAPSHOT_RESTORE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SNAPSHOT_RESTORE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSnapShotStatus({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getSnapShotStatus(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SNAPSHOT_STATUS", data);
          resolve(data);
        }
        else{
          commit("SET_SNAPSHOT_STATUS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SNAPSHOT_STATUS", {});
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
  ['SET_STORAGE_LIST'](state,data){
    state.storageList = data.object;
  },
  ['SET_CREAT_SNAPSHOT'](state,data){
    state.creatSnapShot = data;
  },
  ['SET_SNAPSHOT_LIST'](state,data){
    state.snapShotList = data.object;
  },
  ['SET_SNAPSHOT_DELETE'](state,data){
    state.snapShotDelete = data;
  },
  ['SET_SNAPSHOT_RESTORE'](state,data){
    state.snapShotRestore = data;
  },
  ['SET_SNAPSHOT_STATUS'](state,data){
    state.snapShotStatus = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
