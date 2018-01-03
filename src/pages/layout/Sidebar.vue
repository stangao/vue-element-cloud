/** * Created by 军标 on 2017-9-11. */
<template lang="html">
	<el-row class="tac">
		<div class="sideBar">

      <!--导航菜单-->
			<!-- <el-menu theme="dark" :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect"
				 unique-opened router v-show="!collapsed">
				<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
					<el-submenu :index="index+''" v-if="!item.leaf">
						<template slot="title"><i :class="item.iconCls"></i>{{item.chinaName}}</template>
						<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.chinaName}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-if="item.leaf" :index="item.path"><i :class="item.iconCls"></i>{{item.chinaName}}</el-menu-item>
				</template>
			</el-menu> -->

			<el-menu :default-active="$route.path" unique-opened router class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" @close="handleClose" theme="dark">
					<el-menu-item index="/createCluster"><i class="el-icon-menu"></i>创建集群</el-menu-item>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-document"></i>购买存储</template>
					<el-menu-item-group>
							<el-menu-item index="/buyStorage">购买存储</el-menu-item>
							<el-menu-item index="/buyStorageResult">购买结果</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title"><i class="el-icon-setting"></i>资源设置</template>
					<el-menu-item-group>
							<el-menu-item index="/buyService">选择购买服务</el-menu-item>
							<el-menu-item index="/configService">服务资源设置</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title"><i class="el-icon-upload"></i>服务管理</template>
					<el-menu-item-group>
							<el-menu-item index="/managerCluster">集群管理</el-menu-item>
							<el-menu-item index="/managerService">服务管理</el-menu-item>
							<el-menu-item index="/managerServiceConfig">服务配置管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title"><i class="el-icon-share"></i>计划管理</template>
					<el-menu-item-group>
							<el-menu-item index="/managerServiceSchedule">服务启停计划</el-menu-item>
							<el-menu-item index="/managerServiceTask">任务执行计划</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title"><i class="el-icon-picture"></i>存储管理</template>
					<el-menu-item-group>
							<el-menu-item index="/managerStorage">存储列表</el-menu-item>
							<el-menu-item index="/managerSnapShot">快照列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="/serviceBill">
					<i class="el-icon-upload2"></i>服务详情
				</el-menu-item>
				<!-- <el-menu-item index="/workBench">
					<i class="el-icon-date"></i>交互工作台
				</el-menu-item> --><!-- 交互工作台，目前没有此页面，隐藏导航-->
				<el-menu-item index="/webShell">
					<i class="el-icon-edit"></i>WebShell
				</el-menu-item>
        <el-menu-item index="/logShell">
          <i class="el-icon-edit"></i>LogShell
        </el-menu-item>

			</el-menu>
		</div>

	</el-row>
</template>

<script>
	export default {
    data() {
			return {
        collapsed: false,
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
		},
    mounted(){
      //alert(this.keyRouter)
      // buyStorageResult
    }

	}
</script>
<style lang="less" scoped>
	@import '../../assets/css/sidebar.less';
</style>
<style lang="less">
	.el-menu--dark .el-menu-item,
	.el-menu--dark .el-submenu__title,
	.el-menu--dark .el-submenu {
		min-height: 56px;
		line-height: 56px;
	}

	.el-menu-item-group {
		.el-menu-item-group__title {
			display: none;
		}
	}

	.el-menu-item {
		a {
			color: #bfcbd9;
		}
	}
</style>
