/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  buyStorageStore:{},
  storagePost:{}
}

const getters = {
  getBuyStorageStore: state => state.buyStorageStore,
  getStoragePost: state => state.storagePost,
}
const actions = {
  requestBuyStorage({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getBuyStorage(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_BUY_STORAGE", data);
          resolve(data);
        }
        else{
          commit("SET_BUY_STORAGE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_BUY_STORAGE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestStoragePost({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postStoragePurchase(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_STORAGE_POST", data);
          resolve(data);
        }
        else{
          commit("SET_STORAGE_POST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_STORAGE_POST", {});
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
  ['SET_BUY_STORAGE'](state,data){
    state.buyStorageStore = data;
  },
  ['SET_STORAGE_POST'](state,data){
    state.storagePost = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
