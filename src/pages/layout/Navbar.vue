/** * Created by 军标 on 2017-9-11. */
<template lang="html">
	<div class="navBar" id="navBar">
		<div class="navBarContent">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<div class="navLogo">
					<img src="../../assets/images/wandaLogo.png" alt="">
				</div>
				<el-dropdown class="avatar-container" trigger="click">
					<div class="avatar-wrapper">
						<img class="user-avatar" src="../../assets/images/img.jpg">
						<span>admin</span>
					</div>
					<el-dropdown-menu class="user-dropdown" slot="dropdown">
						<router-link class='inlineBlock' to="/">
							<el-dropdown-item>
								首页
							</el-dropdown-item>
						</router-link>
						<el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			logout() {
				localStorage.setItem("openshift_access_token", "")//删除loginToken
				localStorage.setItem("userId", "")//删除userId
				location.reload()//默认刷新页面
				var url = '/login';
				this.$router.push(url);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/css/navbar.less';
</style>
