/** * Created by 军标 on 2017-9-11. */
<template lang="html">
	<section>
		<div v-title>{{title}}</div>
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
			<h3 class="title">用户登录</h3>
			<el-form-item prop="account">
				<el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
			</el-form-item>
			<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			<el-form-item style="width:100%;">
				<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
				<!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
			</el-form-item>
		</el-form>
	</section>

</template>
<script>
import {mapGetters,mapActions,} from 'vuex'
import Utils from '../common/utils'

	export default {
		computed: {
			...mapGetters({
				loginToken: 'getLoginToken',
			})
		},
		data() {
			return {
				title: '登录页面',
				logining: false,
				ruleForm2: {
					account: 'admin',
					checkPass: ''
				},
				rules2: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						//{ validator: validaePass }
					],
					checkPass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						//{ validator: validaePass2 }
					]
				},
				checked: true
			};
		},
		methods: {
			handleReset() {},
			handleSubmit(ev) {
				var _this = this;
				this.$refs.ruleForm2.validate((valid) => {
					if(valid) {
						//_this.$router.replace('/table');
						let params = {
							user_name: _this.ruleForm2.account,
							user_password: _this.ruleForm2.checkPass
						}
						this.logining = true;
						this.requestLogin(params).then(data=>{
							this.logining = false;
							localStorage.setItem("openshift_access_token", data.access_token)//登录设置loginToken
							// document.cookie. = data.access_token
							// Utils.setCookie('openshift_access_token',data.access_token)
							// document.cookie="openshift_access_token="+data.access_token;//登录设置loginToken到cookie里
							// data.user_id = 123
							localStorage.setItem("userId", data.user_uuid)//登录设置loginToken
							location.reload()//默认刷新页面 
							this.$router.push({
								path: '/createCluster'
							});
						}, (e)=> {
							this.logining = false;
							this.$message.error(e);
						}).catch((err) => {
							this.logining = false;
							this.$message.error(err);
						})
						//
						// setTimeout(() => {
						//
						// }, 1500)
						//NProgress.start();
						// var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
						// requestLogin(loginParams).then(data => {
						//   this.logining = false;
						//   //NProgress.done();
						//   let { msg, code, user } = data;
						//   if (code !== 200) {
						//     this.$message({
						//       message: msg,
						//       type: 'error'
						//     });
						//   } else {
						//     sessionStorage.setItem('user', JSON.stringify(user));
						//     this.$router.push({ path: '/createCluster' });
						//   }
						// });
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			...mapActions([
	      'requestLogin'
	    ])
		}
	}
</script>

<style lang="less">
	@import '../assets/css/login.less';
</style>
