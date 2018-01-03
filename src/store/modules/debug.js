/**
 * Created by 军标 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  testList:{}
}

const getters = {
  getTestList: state => state.testList
}
const actions = {
  requestTestList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getTest(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_TEST_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_TEST_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_TEST_LIST", {});
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
  ['SET_TEST_LIST'](state,data){
    state.testList = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

