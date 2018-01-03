/**
* Created by 军标 on 2017-9-11.
*/
<template lang="html">
  <div>
    <span style="font-size: 32px">万达云公司前端调试界面</span>
    <ul>
      <li>
        <router-link to="/login">登录</router-link>
      </li>
      <li>
        <router-link to="/createCluster">创建集群</router-link>
      </li>
      <li><router-link to="/buyStorage">购买存储</router-link></li>
      <li><router-link to="/buyStorageResult">购买存储成功</router-link></li>
      <li><router-link to="/buyService">选择购买服务</router-link></li>
      <li><router-link to="/configService">服务资源设置</router-link></li>
      <li><router-link to="/managerCluster">集群管理</router-link></li>
      <li><router-link to="/managerService">服务管理</router-link></li>
      <li><router-link to="/managerServiceConfig">服务配置管理</router-link></li>
      <li><router-link to="/managerServiceSchedule">服务启停计划</router-link></li>
      <li><router-link to="/managerServiceTask">任务执行计划</router-link></li>
      <li><router-link to="/serviceBill">服务使用详情</router-link></li>
      <li><router-link to="/workBench">交互式工作台</router-link></li>
      <li><router-link to="/webShell">webshell</router-link></li>
    </ul>
    <br/>
    <span style="font-size: 32px">接口测试数据</span>
    <ul>
      <li v-for="(item,index) in testList">
        {{index}}-{{item.url}}
      </li>
    </ul>
  </div>

</template>
<script>
  import {
    mapGetters,
    mapActions,
  } from 'vuex'

  export default {
    computed: {
  ...
  mapGetters({
    testList: 'getTestList',
  })
  },
  mounted()
  {
    let _this = this
    let params = {'offset': 0, 'limit': 3, 'catId': 4}
    this.requestTestList(params).then(function (data) {
      console.log(_this.testList)
    }, function (e) {
      console.log(e)
    }).catch((err)=>{

      console.log(err)
    }
  )
//    this.$store.dispatch('requestTestList',params);

  }
  ,
  data()
  {
    return {
      msg: 'hello baby',
      visible: false,
      radio: '1'
    }
  }
  ,
  methods: {
  ...
    mapActions([
      'requestTestList',
    ]),
  }
  ,

  }
</script>

<style lang="less" scoped="">
  @import '../assets/css/debug.less';

</style>
