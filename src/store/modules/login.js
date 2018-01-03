/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  loginToken:'',
}

const getters = {
  getLoginToken: state => state.loginToken
}
const actions = {
  requestLogin({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postLogin(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_LOGIN_TOKEN", data);
          resolve(data);
        }
        else{
          commit("SET_LOGIN_TOKEN", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_LOGIN_TOKEN", {});
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
  ['SET_LOGIN_TOKEN'](state,data){
    state.loginToken = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
