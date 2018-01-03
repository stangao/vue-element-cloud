<template>
  <div id="app">
    <div class="layout" v-if="pageRoute != 'login'">
  		<side-bar></side-bar>
  		<nav-bar></nav-bar>
      <div>
        <transition name="fade" mode="out-in">
  			<router-view></router-view>
  		</transition>
     </div>
    </div>
    <div class=""  v-if="pageRoute == 'login'">
      <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    </div>
  </div>
</template>

<script>
import navBar from './pages/layout/Navbar'
import sideBar from './pages/layout/SideBar'
export default {
  components: {
    navBar,
    sideBar
  },
  watch: {
    pageRoute: function(newPageRoute){
      this.pageRoute = this.$route.name
    }
  },
  created(){
    this.pageRoute = this.$route.name
  },
  data() {
    return {
      pageRoute: '',
      pageTime: null
    }
  },
  name: 'app',
  mounted(){
    // this.pageRoute = this.$route.name
    this.pageTime = setInterval(()=>{
      this.pageRoute = this.$route.name
      if(this.pageRoute !="login"){
        clearInterval(this.pageTime)
      }
    },100)
  }
}
</script>
<style lang="less" scoped>
	@import './assets/css/var.less';
</style>
<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /*margin-top: 20px;*/
}
</style>
