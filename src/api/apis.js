/**
 * Created by zhjb on 2017/9/20.
 */
import api from  './index'
import config from '../configs/config'

const mock = (url) => {
  console.warn('mock: ' + url);
  return new Promise(function(resolve, reject) {
    let response = require(`../mock/${url}`);
    resolve(response);
  });
}

const userId = config.getUserInfo().userId//公用userId
const loginToken = window.localStorage.getItem("openshift_access_token")//回去登录openshift_access_token
const loginTokenStr = "?openshift_access_token="+loginToken//拼接参数


const wandaCloudAPIs = {
  getTest: (params) => {
    return mock('debug.json')
  },
  /**
   * 获取创建集群时获取页面信息的接口
   * @param params
   * @returns {Promise}
   */
  getClusterConfig:(params) => {
    // return mock("clusterConfig")
    return api.actionCreatorGet("rest-d/api/v1/cluster/config"+loginTokenStr,params)
  },
  postClusterConfig:(params) => {
    //return mock("postClusterConfig")
    return api.actionCreatorPost("rest-d/api/v1/projects/"+userId+"/config"+loginTokenStr,params)
  },
  getServiceConfig:(params) => {
    // return mock("serverConfig")
    let projectId = params.projectId
    return api.actionCreatorGet("rest-d/api/v1/servicebase/"+userId+"/"+projectId+"/actions/list"+loginTokenStr,params)
  },
  getConfigService:(params) => {
    // return mock("configServer")
    let projectId = params.project_id
    return api.actionCreatorGet("rest-d/api/v1/modulebase/"+userId+"/"+projectId+"/configs/actions/collect"+loginTokenStr,params)
  },
  postCreateService:(params) => {//创建服务
    //return mock("configServer")
    // let projectId = params.project_id
    let projectId = localStorage.getItem("projectId")//正式环境使用
    // let projectId = '55b82265-8f29-44b6-8334-e5066d739b22'
    return api.actionCreatorPost("rest-d/api/v1/services/"+userId+"/"+projectId+"/actions/create"+loginTokenStr,params)
  },
  getServiceStatus:(params) => {//创建服务状态查询
    let serviceUuid = params.service_uuid//正式环境使用
    return api.actionCreatorGet("rest-d/api/v1/util/services/"+serviceUuid+"/status"+loginTokenStr,params)
  },
  getCurrentServices:(params) => {//查询当前服务依赖
    // return mock("currentServices")
    let projectId = localStorage.getItem("projectId")//正式环境使用
    return api.actionCreatorGet("rest-d/api/v1/modulebase/"+projectId+"/currentservices"+loginTokenStr,params)
  },
  getClusterList:(params) => {//获取集群列表
    // return mock("managerCluster")
    // return api.actionCreatorGet("rest-d/api/v1/projects/"+userId+"/clusters?sort=-project_name"+loginTokenStr,params)
    return api.actionCreatorGet("rest-d/api/v1/projects/"+userId+"/clusters"+loginTokenStr,params)
  },
  getClusterBill:(params) => {//计费详情
    // return mock("managerCluster")
    // return api.actionCreatorGet("rest-d/api/v1/projects/"+userId+"/clusters?sort=-project_name"+loginTokenStr,params)
    return api.actionCreatorGet("rest-d/api/v1/projects/"+userId+"/clusters"+loginTokenStr,params)
  },
  getManagerService:(params) => {
    // return mock("managerService")
    let projectId = params.projectId
    return api.actionCreatorGet("rest-d/api/v1/services/"+userId+"/"+projectId+"/clusters"+loginTokenStr,params)
  },
  getServiceOpenStop:(params) => {//服务启停计划列表
    // return mock("serviceOpenStop")
    let projectId = params.projectId
    return api.actionCreatorGet("rest-d/api/v1/serviceplans/"+projectId+"/actions/list"+loginTokenStr,params)
  },
  postCreatServicePlans:(params) => {//创建服务启停计划
    // return mock("serviceOpenStop")
    let serviceUuid = params.service_uuid
    return api.actionCreatorPost("rest-d/api/v1/serviceplans/"+serviceUuid+"/actions/create"+loginTokenStr,JSON.stringify(params))//正式环境使用，志强会修改
    // return api.actionCreatorPost("rest-d/api/v1/serviceplans/actions/create"+loginTokenStr,JSON.stringify(params))
  },
  getServicePlansStatus:(params) => {//服务启停计划状态查询
    // return mock("serviceOpenStop")
    let servicePlanUuid = params.service_plan_uuid
    return api.actionCreatorGet("rest-d/api/v1/util/service_plans/"+servicePlanUuid+"/status"+loginTokenStr,params)
  },
  getServiceUpdate:(params) => {//修改服务启停计划
    // return mock("serviceOpenStop")
    let servicePlanId = params.service_plan_uuid
    return api.actionCreatorPut("rest-d/api/v1/serviceplans/"+servicePlanId+"/actions/update"+loginTokenStr,params)
  },
  getDeleteService:(params) => {//删除服务启停计划
    // return mock("serviceOpenStop")
    let servicePlanId = params.service_plan_id
    return api.actionCreatorDelete("rest-d/api/v1/serviceplans/"+servicePlanId+"/actions/delete"+loginTokenStr,params)
  },
  getChangeGroup:(params) => {//修改集群类型
    //return mock("changeGroup")
    return api.actionCreatorPut("rest-d/api/v1/projects/update"+loginTokenStr,params)
  },
  getServerManagerList:(params) => {//服务配置管理列表
    // return mock("serviceManager")
    let serviceUuid = params.service_uuid
    // let serviceUuid = 'c6af399b-5b41-4b60-8c36-9a5f86bf8817'
    return api.actionCreatorGet("rest-d/api/v1/moduleconfigs/"+serviceUuid+"/vars"+loginTokenStr,params)
  },
  putSetMaps:(params) => {//设置环境变量和重启
    // return mock("serviceManager")
    let serviceUuid = params.service_uuid
    // let serviceUuid = 'c6af399b-5b41-4b60-8c36-9a5f86bf8817'
    return api.actionCreatorPut("rest-d/api/v1/moduleconfigs/"+serviceUuid+"/configmap"+loginTokenStr,params)
  },
  putSetEvns:(params) => {//设置环境变量和重启
    // return mock("serviceManager")
    let serviceUuid = params.service_uuid
    // let serviceUuid = 'c6af399b-5b41-4b60-8c36-9a5f86bf8817'
    return api.actionCreatorPut("rest-d/api/v1/moduleconfigs/"+serviceUuid+"/envs"+loginTokenStr,params)
  },
  getBuyStorage:(params) => {//购买存储
    // return mock("buyStorage")
    return api.actionCreatorGet("billing/api/v1/storage_config/s3"+loginTokenStr,params)
  },
  postStoragePurchase:(params) => {//购买存储post
    // return mock("storagePurchase")
    return api.actionCreatorPost("billing/api/v1/storage_purchase/s3"+loginTokenStr,params)
  },
  getBillDetail:(params) => {//计费详情
    // return mock("billDetail")
    let projectId = params.project_id
    return api.actionCreatorGet("billing/api/v1/projects/"+projectId+"/billing"+loginTokenStr,params)
  },
  postLogin:(params) => {//登录接口
    return api.actionCreatorPost("auth/api/v1/users/token",JSON.stringify(params))
  },
  getClustersType:(params) => {//集群服务列表类型
    let projectId = params.projectId
    // return api.actionCreatorGet("rest-d/api/v1/services/"+userId+"/"+projectId+"/clusters?sort=-service_name"+loginTokenStr,params)
    return api.actionCreatorGet("rest-d/api/v1/services/"+userId+"/"+projectId+"/clusters"+loginTokenStr,params)
  },
  getClustersList:(params) => {//集群服务列表
    let serviceUuid = params.service_uuid
    // return api.actionCreatorGet("rest-d/api/v1/instances/"+serviceUuid+"/clusters?sort=-instance_name"+loginTokenStr,params)
    return api.actionCreatorGet("rest-d/api/v1/instances/"+serviceUuid+"/clusters"+loginTokenStr,params)
  },
  putRestartInstances:(params) => {//重启单个实例
    let instanceId = params.instance_id
    return api.actionCreatorPut("rest-d/api/v1/instances/"+instanceId+"/actions/restart"+loginTokenStr,params)
  },
  deleteInstances:(params) => {//删除单个实例
    let instanceId = params.instance_id
    return api.actionCreatorDelete("rest-d/api/v1/instances/"+instanceId+"/actions/delete"+loginTokenStr,params)
  },
  getInstancesInfo:(params) => {//获取单个实例详情
    let instanceId = params.instance_id
    return api.actionCreatorGet("rest-d/api/v1/instances/"+instanceId+"/info"+loginTokenStr,params)
  },
  putRestartService:(params) => {//重启服务
    let serviceUuid = params.service_uuid
    return api.actionCreatorPut("rest-d/api/v1/services/"+serviceUuid+"/actions/restart"+loginTokenStr,params)
  },
  deleteService:(params) => {//删除服务
    let serviceUuid = params.service_uuid
    return api.actionCreatorDelete("rest-d/api/v1/services/"+serviceUuid+"/actions/delete"+loginTokenStr,params)
  },
  putContinuRun:(params) => {//设置持续运行
    // return mock("serviceDepend")
    let serviceUuid = params.service_uuid
    return api.actionCreatorPut("rest-d/api/v1/services/"+serviceUuid+"/persist"+loginTokenStr,params)
  },
  postShareModule:(params) => {//设置共享模块
    // return mock("serviceDepend")
    let serviceUuid = params.service_uuid
    return api.actionCreatorPut("rest-d/api/v1/services/"+serviceUuid+"/actions/shared"+loginTokenStr,params)
  },
  getModuleConfigs:(params) => {//获取服务配置
    // return mock("serviceOpenStop")
    let serviceUuid = params.service_uuid
    return api.actionCreatorGet("rest-d/api/v1/moduleconfigs/"+serviceUuid+"/configs"+loginTokenStr,params)
  },
  getSetConfigs:(params) => {//获取服务配置
    // return mock("serviceOpenStop")
    let serviceUuid = params.service_uuid
    return api.actionCreatorPut("rest-d/api/v1/moduleconfigs/"+serviceUuid+"/configs"+loginTokenStr,params)
  },
  getTaskList:(params) => {//任务执行计划管理
    // return mock("serviceTask")
    let projectId = params.project_id
    return api.actionCreatorGet("rest-d/api/v1/jobplans/"+projectId+"/actions/list"+loginTokenStr,params)
  },
  postCreateTaskPlans:(params) => {//创建任务执行计划
    // return mock("serviceTask")
    let serviceUuid = params.job_plan_param.service_uuid
    return api.actionCreatorPost("rest-d/api/v1/jobplans/"+serviceUuid+"/actions/create"+loginTokenStr,JSON.stringify(params))
  },
  getTaskDetail:(params) => {//任务执行计划管理
    // return mock("taskDetail")
    let jobPlanUuid = params.job_plan_uuid
    return api.actionCreatorGet("rest-d/api/v1/jobplans/"+jobPlanUuid+"/logs"+loginTokenStr,params)
    // http://wdfapiproxy.10.209.224.161.xip.io/rest-d/api/v1/jobplans/cff4b797-8ce2-4a8c-a450-067428fc0bfb/logs
  },
  getServiceDetail:(params) => {//服务详情
    // return mock("serviceDetail")
    let serviceUuid = params.service_uuid
    return api.actionCreatorGet("rest-d/api/v1/instances/"+serviceUuid+"/service"+loginTokenStr,params)
  },
  deleteJobPlan:(params) => {//服务详情
    // return mock("serviceDetail")
    let jobPlanUuid = params.job_plan_uuid
    return api.actionCreatorDelete("rest-d/api/v1/jobplans/"+jobPlanUuid+"/actions/delete"+loginTokenStr,params)
  },
  putJobPlanStop:(params) => {//服务详情
    // return mock("serviceDetail")
    let jobPlanUuid = params.job_plan_uuid
    return api.actionCreatorPut("rest-d/api/v1/jobplans/"+jobPlanUuid+"/actions/stop"+loginTokenStr,params)
  },
  getJobPlanConfigs:(params) => {//获取任务启停配置
    // return mock("serviceDetail")
    let jobPlanUuid = params.job_plan_uuid
    return api.actionCreatorGet("rest-d/api/v1/jobplans/"+jobPlanUuid+"/configs"+loginTokenStr,params)
  },
  getJobPlanDepend:(params) => {//查询依赖服务
    // return mock("serviceDepend")
    let projectId = params.project_id
    return api.actionCreatorGet("rest-d/api/v1/jobplans/"+userId+"/"+projectId+"/depend_services"+loginTokenStr,params)
  },
  putJobPlanUpdate:(params) => {//更新任务计划
    // return mock("serviceDepend")
    let jobPlanUuid = params.job_plan_param.job_plan_uuid
    // let jobPlanUuid = params.job_plan_uuid
    return api.actionCreatorPut("rest-d/api/v1/jobplans/"+jobPlanUuid+"/actions/update"+loginTokenStr,JSON.stringify(params))
  },
  getStorageList:(params) => {//存储管理列表
    // return mock("serviceDepend")
    // let jobPlanUuid = params.job_plan_uuid
    return api.actionCreatorGet("storage/api/v1/userpvcs/"+userId+loginTokenStr,params)
  },
  postCreatSnapShot:(params) => {//创建快照
    // return mock("serviceDepend")
    let pvcUuid = params.pvc_uuid
    return api.actionCreatorPost("storage/api/v1/pvcsnapshot/"+pvcUuid+loginTokenStr,JSON.stringify(params))
  },
  getSnapShotList:(params) => {//快照列表
    // return mock("serviceDepend")
    let pvcUuid = params.pvc_uuid
    return api.actionCreatorGet("storage/api/v1/pvcsnapshot/"+pvcUuid+loginTokenStr,params)
  },
  deleteSnapShot:(params) => {//删除快照
    // return mock("serviceDepend")
    let pvcUuid = params.pvc_uuid
    let snapShotId = params.pvcs_snapshot_uuid
    return api.actionCreatorDelete("storage/api/v1/pvcsnapshot/"+pvcUuid+"/"+snapShotId+loginTokenStr,params)
  },
  postSnapShotRestore:(params) => {//恢复数据
    // return mock("serviceDepend")
    let pvcUuid = params.pvc_uuid
    let snapShotId = params.pvcs_snapshot_uuid
    return api.actionCreatorPost("storage/api/v1/pvcsnapshot/"+pvcUuid+"/"+snapShotId+"/restore"+loginTokenStr,params)
  },
  getSnapShotStatus:(params) => {//查询状态
    // return mock("serviceDepend")
    let pvcUuid = params.pvc_uuid
    let snapShotId = params.pvcs_snapshot_uuid
    let action = params.action
    return api.actionCreatorGet("storage/api/v1/pvcsnapshot/"+pvcUuid+"/"+snapShotId+"/"+action+loginTokenStr,params)
  }


}

export default{
  wandaCloudAPIs,
}
