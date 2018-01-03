/**
 * Created by 乃波 on 2017-9-11.
 */

import Api from '../../api/apis'
// deleteInstances
const state = {
  managerServiceList:{},
  clustersType:[],
  clustersList:[],
  restartInstances:{},
  deleteInstances:{},
  instancesInfo:{},
  restartService:{},
  deleteService:{},
  moduleData:{},
  moduleConfigs:[],
  moduleShared:{},
  setConfigs:{},
  setContinuRun:{},
  setShareModule:{}
}

const getters = {
  getManagerServiceList: state => state.managerServiceList,
  getClustersType: state => state.clustersType,
  getClustersList: state => state.clustersList,
  getRestartInstances: state => state.restartInstances,
  getDeleteInstances: state => state.deleteInstances,
  getInstancesInfo: state => state.instancesInfo,
  getRestartService: state => state.restartService,
  getDeleteService: state => state.deleteService,
  getModuleData: state => state.moduleData,
  getModuleConfigs: state => state.moduleConfigs,
  getModuleShared: state => state.moduleShared,
  getSetConfigs: state => state.setConfigs,
  getSetContinuRun: state => state.setContinuRun,
  getSetShareModule: state => state.setShareModule,
}
const actions = {
  requestManagerServiceList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getManagerService(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_MANAGERSERVICE_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_MANAGERSERVICE_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_MANAGERSERVICE_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestClustersType({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getClustersType(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CLUSTERS_TYPE", data);
          resolve(data);
        }
        else{
          commit("SET_CLUSTERS_TYPE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CLUSTERS_TYPE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestClustersList({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getClustersList(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CLUSTERS_LIST", data);
          resolve(data);
        }
        else{
          commit("SET_CLUSTERS_LIST", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CLUSTERS_LIST", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestRestartInstances({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putRestartInstances(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_RESTART_INSTANCES", data);
          resolve(data);
        }
        else{
          commit("SET_RESTART_INSTANCES", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_RESTART_INSTANCES", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestDeleteInstances({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.deleteInstances(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_DELETE_INSTANCES", data);
          resolve(data);
        }
        else{
          commit("SET_DELETE_INSTANCES", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_DELETE_INSTANCES", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestInstancesInfo({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getInstancesInfo(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_INSTANCES_INFO", data);
          resolve(data);
        }
        else{
          commit("SET_INSTANCES_INFO", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_INSTANCES_INFO", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestRestartService({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putRestartService(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_RESTART_SERVICE", data);
          resolve(data);
        }
        else{
          commit("SET_RESTART_SERVICE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_RESTART_SERVICE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestDeleteService({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.deleteService(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_DELETE_SERVICE", data);
          resolve(data);
        }
        else{
          commit("SET_DELETE_SERVICE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_DELETE_SERVICE", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestModuleConfigs({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getModuleConfigs(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_MODULE_CONFIGS", data);
          resolve(data);
        }
        else{
          commit("SET_MODULE_CONFIGS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_MODULE_CONFIGS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSetConfigs({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.getSetConfigs(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SET_FONFIGS", data);
          resolve(data);
        }
        else{
          commit("SET_SET_FONFIGS", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SET_FONFIGS", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSetContinuRun({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.putContinuRun(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_CONTINU_RUN", data);
          resolve(data);
        }
        else{
          commit("SET_CONTINU_RUN", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_CONTINU_RUN", {});
        reject(err);
      }).catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return promise;
  },
  requestSetShareModule({commit,state},params){
    let promise = new Promise(function(resolve, reject){

      Api.wandaCloudAPIs.postShareModule(params).then((response) => {
        let logicData = response;
        if(logicData != null ){
          const data = logicData
          commit("SET_SHARE_MODULE", data);
          resolve(data);
        }
        else{
          commit("SET_SHARE_MODULE", {});
          reject(err);
        }

      }, err => {
        console.error(err);
        commit("SET_SHARE_MODULE", {});
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
  ['SET_MANAGERSERVICE_LIST'](state,data){
    state.managerServiceList = data;
  },
  ['SET_CLUSTERS_TYPE'](state,data){
    state.clustersType = data.services;
  },
  ['SET_CLUSTERS_LIST'](state,data){
    state.clustersList = data.instances;
  },
  ['SET_RESTART_INSTANCES'](state,data){
    state.restartInstances = data;
  },
  ['SET_DELETE_INSTANCES'](state,data){
    state.deleteInstances = data;
  },
  ['SET_INSTANCES_INFO'](state,data){
    state.instancesInfo = data;
  },
  ['SET_RESTART_SERVICE'](state,data){
    state.restartService = data;
  },
  ['SET_DELETE_SERVICE'](state,data){
    state.deleteService = data;
  },
  ['SET_MODULE_CONFIGS'](state,data){
    let connectData = [];
    let priceObj = {};//公用价格存储

    state.moduleData = JSON.parse(JSON.stringify(data));//深拷贝data数组
    // console.log(222111,state.moduleData)
    for(let priceItem in data){
      if(priceItem == "unit_price"){
        // console.log(999,data[priceItem])
        priceObj = data[priceItem]
      }
    }
      let titalPrice = 0 // 计算初始价格变量
      if((data.storage_type == "shared") && data.storage){
        let resetSharedStorage = data.storage
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
      let modulesObj = data.modules;
      for(let item in data.modules){
        let serviceArray = data.modules[item]
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
      data.service_price = titalPrice //设置服务默认价格为

    state.moduleConfigs = data;
    console.log(state.moduleConfigs,999)
    // console.log(222111333,state.moduleData)

  },
  ['SET_SET_FONFIGS'](state,data){
    state.setConfigs = data;
  },
  ['SET_CONTINU_RUN'](state,data){
    state.setContinuRun = data;
  },
  ['SET_SHARE_MODULE'](state,data){
    state.setShareModule = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
