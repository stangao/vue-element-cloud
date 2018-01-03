/**
* Created by 军标 on 2017-9-22.
*/
<template lang="html">
    <div class="pageContent">
    <div v-title>{{title}}</div>
    <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-date"></i>{{crumbtitle}}</el-breadcrumb-item>
              <el-breadcrumb-item>购买成功</el-breadcrumb-item>
          </el-breadcrumb>
    </div>
    <div class="groupContainer">
          <fieldset>
            <legend>购买成功</legend>
            <div class="contentContainer">
              <p class="payStatus">您的{{getBuyStorageStore.storage_name}}存储
                <span v-if="getStoragePost.user">{{getStoragePost.user}}和</span>
                <span v-if="getStoragePost.access_key">{{getStoragePost.access_key}}和</span>
                <span v-if="getStoragePost.secret_key">{{getStoragePost.secret_key}}和</span>
                <span v-if="getStoragePost.bucket_name">{{getStoragePost.bucket_name}}</span>
                ，{{getBuyStorageStore.storage_name}}存储在所有项目中都可用</p>
              <br/>
              <!-- <p class="payStatus">计费共100元</p> -->
              <div class="payStatusLink">
                登录{{getBuyStorageStore.storage_name}}存储:
                <a :href="getStoragePost.url">{{getStoragePost.url}}</a>
              </div>
              <el-button type="primary" @click="btnBuy" class="btn">完成</el-button>
             </div>
          </fieldset>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Utils from '../../common/utils'


export default {
  computed: {
    ...
    mapGetters({
      getBuyStorageStore: 'getBuyStorageStore',
      getStoragePost: 'getStoragePost',
    })
  },
  data() {
    return {
      title: "购买成功",
      crumbtitle: "购买结果"
    }
  },
  methods: {
    btnBuy() {
      console.log("create")
      var url = '/buyService';
      this.$router.push(url);
    },
    ...mapActions([
      'requestBuyStorage',
      'requestStoragePost'
    ])
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/buystorageresult.less';
</style>
