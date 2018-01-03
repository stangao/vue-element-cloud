/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  serviceDetail:{}
}

const getters = {
  getServiceDetail: state => state.serviceDetail
}
const actions = {
  requestServiceDetail({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServiceDetail(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVICE_DETAIL", data);
          resolve(data);
        }
        else{
          commit("SET_SERVICE_DETAIL", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVICE_DETAIL", {});
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
  ['SET_SERVICE_DETAIL'](state,data){
    state.serviceDetail = data;
  }  
}

export default {
  state,
  getters,
  actions,
  mutations
}
