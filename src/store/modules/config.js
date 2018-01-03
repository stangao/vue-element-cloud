/**
 * Created by 军标 on 2017-9-11.111
 */

import Api from '../../api/apis'

const state = {
  configData:{},
  configList:[],
  serviceConfigModules:[],
  sharedServices:[],
  createService:{},
  setEvns:{},
  setMaps:{},
  serviceStatus:{},
  currentServices:[]
}

const getters = {
  getConfigData: state => state.configData,
  getConfigList: state => state.configList,
  getServiceConfigModules: state => state.serviceConfigModules,
  getSharedServices: state => state.sharedServices,
  getCreateService: state => state.createService,
  getSetEvns: state => state.setEvns,
  getSetMaps: state => state.setMaps,
  getServiceStatus: state => state.serviceStatus,
  getCurrentServices: state => state.currentServices,
}
const actions = {
  requestConfigServerList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getConfigService(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CONFIGSERVER_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_CONFIGSERVER_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CONFIGSERVER_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestServerManagerList({commit,state},params){//managerServiceConfig列表
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServerManagerList(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVICEMANAGER_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_SERVICEMANAGER_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SERVICEMANAGER_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestCreateService({commit,state},params){//managerServiceConfig列表
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postCreateService(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CREATE_SERVICE", data);
          resolve(data);
        }
        else{
          commit("SET_CREATE_SERVICE", {});
          reject(err);
        }
      }, err => {
        console.error(err);
        commit("SET_CREATE_SERVICE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSetEvns({commit,state},params){//设置环境变量
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putSetEvns(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SET_EVNS", data);
          resolve(data);
        }
        else{
          commit("SET_SET_EVNS", {});
          reject(err);
        }
      }, err => {
        console.error(err);
        commit("SET_SET_EVNS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSetMaps({commit,state},params){//设置环境变量
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putSetMaps(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SET_MAPS", data);
          resolve(data);
        }
        else{
          commit("SET_SET_MAPS", {});
          reject(err);
        }
      }, err => {
        console.error(err);
        commit("SET_SET_MAPS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestServiceStatus({commit,state},params){//获取服务状态
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getServiceStatus(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SERVICE_STATUS", data);
          resolve(data);
        }
        else{
          commit("SET_SERVICE_STATUS", {});
          reject(err);
        }
      }, err => {
        console.error(err);
        commit("SET_SERVICE_STATUS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestCurrentServices({commit,state},params){//获取当前服务依赖
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getCurrentServices(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CURRENT_SERVICES", data);
          resolve(data);
        }
        else{
          commit("SET_CURRENT_SERVICES", {});
          reject(err);
        }
      }, err => {
        console.error(err);
        commit("SET_CURRENT_SERVICES", {});
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
  ['SET_CONFIGSERVER_LIST'](state,data){
    let connectData = [];
    let priceObj = {};//公用价格存储

    state.configData = JSON.parse(JSON.stringify(data));//深拷贝data数组
    // console.log(222111,state.configData)
    for(let priceItem in data){
      if(priceItem == "unit_price"){
        // console.log(999,data[priceItem])
        priceObj = data[priceItem]
      }
    }
    for(let item in data){
      if(item == "configs"){
        let itemConfig = data.configs;
        itemConfig.forEach(function(e){
          let titalPrice = 0 // 计算初始价格变量
          if((e.storage_type == "shared") && e.storage){
            let resetSharedStorage = e.storage
            resetSharedStorage.realValue = ''
            resetSharedStorage.realValue = resetSharedStorage.value + resetSharedStorage.value_unit
            console.log(4444,resetSharedStorage.value)
            let valueArray = []
            let valueArrays = []
            valueArray = resetSharedStorage.value_range.split(",");
            // let commonStepNum = parseInt((parseInt(valueArray[1]) - parseInt(valueArray[0]))/parseInt(resetSharedStorage.value_interval))
            let commonStepNum=0;
            do
              {
                valueArrays.push({'value': (parseInt(valueArray[0])+parseInt(resetSharedStorage.value_interval)*commonStepNum)+resetSharedStorage.value_unit,'label':(parseInt(valueArray[0])+parseInt(resetSharedStorage.value_interval)*commonStepNum)+resetSharedStorage.value_unit})
                commonStepNum++
              }
            while ((parseInt(valueArray[0])+parseInt(resetSharedStorage.value_interval)*commonStepNum)<=parseInt(valueArray[1]))
            valueArrays.push({'value': valueArray[1]+resetSharedStorage.value_unit,'label':valueArray[1]+resetSharedStorage.value_unit})


            resetSharedStorage.valueArrays = valueArrays
            console.log(33333,resetSharedStorage.valueArrays)
            titalPrice = titalPrice + parseInt(resetSharedStorage.value*priceObj.storage_block)//公用存储价格计算
          }
          let modulesObj = e.modules;
          for(let item in e.modules){
            let serviceArray = e.modules[item]
            serviceArray.forEach(function(e){
              let serviceArrayObj = e
              if(serviceArrayObj.value_unit === "core"){
                serviceArrayObj.value_unit_cn = "核CPU"
              }else if(serviceArrayObj.value_unit === "number"){
                serviceArrayObj.value_unit_cn = "节点"
              }else if(serviceArrayObj.name === "memory"){
                serviceArrayObj.value_unit_cn = serviceArrayObj.value_unit + "内存"
              }else{
                serviceArrayObj.value_unit_cn = serviceArrayObj.value_unit
              }
              serviceArrayObj.realValue =  serviceArrayObj.value + serviceArrayObj.value_unit_cn
              console.log(555,serviceArrayObj.value_unit_cn)

              let serviceValueArray = []
              let serviceValueArrays = []
              let serviceStepArray = 0
              console.log(7777,serviceArrayObj.value_range)
              serviceValueArray = serviceArrayObj.value_range.split(",");
              let serviceCommonStepNum = 0
              do
                {
                  serviceValueArrays.push({'value': (parseInt(serviceValueArray[0])+parseInt(serviceArrayObj.value_interval)*serviceCommonStepNum)+serviceArrayObj.value_unit_cn,'label':(parseInt(serviceValueArray[0])+parseInt(serviceArrayObj.value_interval)*serviceCommonStepNum)+serviceArrayObj.value_unit_cn})
                  serviceCommonStepNum++
                }
              while ((parseInt(serviceValueArray[0])+parseInt(serviceArrayObj.value_interval)*serviceCommonStepNum) < parseInt(serviceValueArray[1]))
              serviceValueArrays.push({'value': serviceValueArray[1]+serviceArrayObj.value_unit_cn,'label':serviceValueArray[1]+serviceArrayObj.value_unit_cn})

              serviceArrayObj.valueArrays = serviceValueArrays
              console.log(666,serviceArrayObj.realValue)
              if(serviceArrayObj.name == "replicas"){
                titalPrice = titalPrice + parseInt(serviceArrayObj.value*priceObj.storage_nfs)//公用存储价格计算
              }else if(serviceArrayObj.name == "cpu"){
                titalPrice = titalPrice + parseInt(serviceArrayObj.value*priceObj.cpu)//公用存储价格计算
              }else if(serviceArrayObj.name == "memory"){
                titalPrice = titalPrice + parseInt(serviceArrayObj.value*priceObj.memory)//公用存储价格计算
              }else if(serviceArrayObj.name == "storage"){
                titalPrice = titalPrice + parseInt(serviceArrayObj.value*priceObj.storage_block)//公用存储价格计算
              }else{
                titalPrice = titalPrice
              }
            })
          }
          e.service_price = titalPrice //设置服务默认价格为
        })
      }else if(item == "shared_services"){
        state.sharedServices = data.item;
      }

    }
    state.configList = data.configs;
    console.log(state.configList,999)
    // console.log(222111333,state.configData)

  },
  ['SET_SERVICEMANAGER_LIST'](state,data){
    state.serviceConfigModules = data.modules;
  },
  ['SET_CREATE_SERVICE'](state,data){
    state.createService = data;
  },
  ['SET_SET_EVNS'](state,data){
    state.setEvns = data;
  },
  ['SET_SET_MAPS'](state,data){
    state.setMaps = data;
  },
  ['SET_SERVICE_STATUS'](state,data){
    state.serviceStatus = data;
  },
  ['SET_CURRENT_SERVICES'](state,data){
    state.currentServices = data.service_addrs;
  }


}

export default {
  state,
  getters,
  actions,
  mutations
}
