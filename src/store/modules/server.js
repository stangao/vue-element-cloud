/**
 * Created by 军标 on 2017-9-11.
 */

import Api from '../../api/apis'

const state = {
  serverList:[],
  alsoServerList:[],
  serverObj:{}
}

const getters = {
  getServerList: state => state.serverList,
  getAlsoServerList: state => state.alsoServerList,
  getServerObj: state => state.serverObj,
}
const actions = {
  requestServerConfigList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServiceConfig(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVERCONFIG_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_SERVERCONFIG_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVERCONFIG_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestServerObj({commit,state},data){
    commit("SET_SERVER_OBJ", data);
  }
}

const mutations = {
  ['SET_SERVERCONFIG_LIST'](state,data){
    state.serverList = []
    state.alsoServerList = []
    for(var obj in data['services_for_buy']){
      let label = data['services_for_buy'][obj]
      // let version = label[0].version
      // let value = obj + version
      let labelArry = []
      let serviceArry = []
      let associatedArry = []
      label.forEach(function(e){
        e.service_value = e.service_name + e.version
        labelArry.push(e.service_value)
        serviceArry.push(e.service_base_uuid)
        if(e.associated){
          let associatedService = []
          let associatedName = []
          e.associated.forEach((item)=>{
            item.service_value = item.service_name + item.version
            associatedService.push(item.service_base_uuid)
            associatedName.push(item.service_value)
          })
          associatedArry.push({"key":e.service_value,"serviceBaseUuid":e.service_base_uuid,"associatedName":associatedName,"associatedArry":associatedService})
        }

      })
      state.serverList.push({"keys":obj,"value": [],"label": labelArry,"serviceId": serviceArry,"associated":associatedArry})
    }
    if(data['services_for_share']){
      data['services_for_share'].forEach(function(e){
        state.alsoServerList.push(e["service_name"])
      });
    }else{
      state.alsoServerList.push(data['services_for_share'])
    }
  },
  ['SET_SERVER_OBJ'](state,data){
    state.serverObj = data;
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
