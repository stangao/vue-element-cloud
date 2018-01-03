/**
* Created by 乃波 on 2017-9-22.
*/
<template lang="html">
		<div class="pageContent">
    <div v-title>{{title}}</div>
      控制台界面
      <ul>
        <!--<li>-->
          <!--登录token<input class="token" v-model="token"/>-->
        <!--</li>-->
        <!--<li>-->
        <!--</li>-->
        <li>
          【机器列表】:
        </li>
        <li>
         项目名<input class="project" v-model="project"/> Pod名<input class="pod" v-model="pod"/> Container名<input class="container" v-model="container"/>  <router-link :to="detailUrl">去控制台SSH</router-link>
        </li>
      </ul>

    </div>
</template>

<script>
  export default {
  data() {
    return {
      title: "webshell列表",
      project:"cyl-test",
      pod:  "frontendbms-12-mhx7g",
      token:"lCa_B_gjzFBZFE_W57289jSwqdrVDe782vZGpDuq5ww",
      container:"frontendbms",
    }

  },
    mounted(){
			this.token = localStorage.getItem("openshift_access_token")//从localStorage获取登录token
			this.project = this.$route.query.project_name || this.project;//如果url有则取url的project_name
			this.pod = this.$route.query.pod_name || this.pod;//如果url有则取url的pod_name
			this.container = this.$route.query.container_name || this.container;//如果url有则取url的container_name

			setTimeout(()=>{
				let screenHeight =  window.innerHeight
				let navBarHeight = document.getElementById("navBar").offsetHeight || 51
				localStorage.setItem("screenHeight", screenHeight)
				localStorage.setItem("navBarHeight", navBarHeight)
			},500)
    },
    computed:{
       detailUrl(){
				 let namespace = this.project + "/pods/"+this.pod
         var url =  "/shellDetail/"+encodeURIComponent(namespace)+ "/"+ encodeURIComponent(this.token)+"/"+ encodeURIComponent(this.container)
         console.log(url)
         return url
       }

    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/webshell.less';

</style>
