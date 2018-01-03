/**
 * Created by zhjb on 2017/9/20.
 */
import config from  '../configs/config'
import Vue from 'vue'
const debug = process.env.NODE_ENV !== 'production'

const actionCreatorPost = async (relativePath, params) => {
  var host = config.getHostUrl(location.host)
  params = params || {} // TODO 测试
  var urlString = host + relativePath;
  return new Promise(function(resolve, reject){

    Vue.http.post(urlString, params,{emulateJSON: true}).then(function(data){
      debug && console.log("---------POST RESPONSE DATA START---------\n"+"url: "+urlString+"\n"+"data: "+JSON.stringify(data));
      debug && console.log("----------POST RESPONSE DATA END----------\n");
      if(data.status == 200){
        if(data.data.ret_code == 200){
          resolve(data.data);
        }else{
          reject("接口请求失败！")
        }
      }else{
        reject("服务接口挂掉啦！")
      }
    }, function(e){
      console.warn(e);
      reject(e)
    }).catch(function(e){
      console.error(e);
      reject(e)
    });
  });
}

const actionCreatorPut = async (relativePath, params) => {
  var host = config.getHostUrl(location.host)
  params = params || {} // TODO 测试
  var urlString = host + relativePath;
  return new Promise(function(resolve, reject){

    Vue.http.put(urlString, params).then(function(data){
      debug && console.log("---------PUT RESPONSE DATA START---------\n"+"url: "+urlString+"\n"+"data: "+JSON.stringify(data));
      debug && console.log("----------PUT RESPONSE DATA END----------\n");
      if(data.status == 200){
        if(data.data.ret_code == 200){
          resolve(data.data);
        }else{
          reject("接口请求失败！")
        }
      }else{
        reject("服务接口挂掉啦！")
      }
    }, function(e){
      console.warn(e);
      reject(e)
    }).catch(function(e){
      console.error(e);
      reject(e)
    });
  });
}

const actionCreatorGet = async (relativePath, params) => {
  var host = config.getHostUrl(location.host)
  params = params || {} // TODO 测试
  var urlString = host + relativePath;
  return new Promise(function(resolve, reject){

    Vue.http.get(urlString,{"params":params}).then(function(data){
      console.log("---------GET RESPONSE DATA START---------\n"+"url: "+urlString+"\n"+"data: "+JSON.stringify(data));
      console.log("----------GET RESPONSE DATA END----------\n");
      if(data.status == 200){
        if(data.data.ret_code == 200){
          resolve(data.data);
        }else{
          reject("接口请求失败！")
        }
      }else{
        reject("服务接口挂掉啦！")
      }
    }, function(e){
      console.warn(e);
      reject(e)
    }).catch(function(e){
      console.error(e);
      reject(e)
    });
  });
}

const actionCreatorDelete = async (relativePath, params) => {
  var host = config.getHostUrl(location.host)
  params = params || {} // TODO 测试
  var urlString = host + relativePath;
  return new Promise(function(resolve, reject){

    Vue.http.delete(urlString,params).then(function(data){
      console.log("---------DELETE RESPONSE DATA START---------\n"+"url: "+urlString+"\n"+"data: "+JSON.stringify(data));
      console.log("----------DELETE RESPONSE DATA END----------\n");
      if(data.status == 200){
        if(data.data.ret_code == 200){
          resolve(data.data);
        }else{
          reject("接口请求失败！")
        }
      }else{
        reject("服务接口挂掉啦！")
      }
    }, function(e){
      console.warn(e);
      reject(e)
    }).catch(function(e){
      console.error(e);
      reject(e)
    });
  });
}

export default{
  actionCreatorPost,
  actionCreatorGet,
  actionCreatorPut,
  actionCreatorDelete
}
