/** * Created by 乃波 on 2017-9-22. */
<template lang="html">
		<div class="pageContent serviceManagerPage">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>服务资源设置</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-table :data="tableData" border height="350" style="width: 100%">
				<el-table-column label="集群名称" prop="project_name" sortable width="130">
					<template scope="scope">
						{{ scope.row.project_name }}
					</template>
				</el-table-column>
				<el-table-column label="集群类型" prop="cluster_type" sortable width="130">
					<template scope="scope">
						{{ scope.row.cluster_type }}
					</template>
				</el-table-column>
				<el-table-column label="计费模式" prop="billing_mode" width="100">
					<template scope="scope">
						{{ scope.row.billing_mode }}
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="create_time" width="120">
					<template scope="scope">
						{{ scope.row.create_time }}
					</template>
				</el-table-column>
				<el-table-column label="集群状态" prop="status" width="100">
					<template scope="scope">
						{{ scope.row.status }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" @click="handleDetail(scope.$index, scope.row)">查看服务</el-button>
						<el-button size="small" @click="toWorkBanch(scope.$index, scope.row)">交互工作台</el-button>
						<el-button size="small" @click="toBuyService(scope.$index, scope.row)">购买服务</el-button>
						<!-- <el-button
            size="small"
            @click="handleLook(scope.$index, scope.row)">集群计费</el-button> -->
						<!-- <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>

			<!--编辑界面-->
			<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" ref="editForm">
					<!-- <el-form-item label="集群Id" prop="project_id">
					<el-input v-model="editForm.project_id" auto-complete="off"></el-input>
				</el-form-item> -->
					<el-form-item label="集群名称" prop="project_name">
						<el-input v-model="editForm.project_name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="集群类型">
						<el-select v-model="editForm.cluster_type" placeholder="请选择类型">
							<el-option v-for="item in optionsGroupStyle" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="计费模式">
						<span v-model="editForm.chargeStyle">按&nbsp;{{editForm.billing_mode}}计费</span>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计费模式不能修改</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
					<el-button @click.native="editFormVisible = false">返回</el-button>
				</div>
			</el-dialog>

			<div class="tab-container" v-if="showDetailTable">
        <fieldset>
          <legend>集群A--服务列表</legend>
				<!-- <el-tag type="primary">mounted times ：{{createdTimes}}</el-tag> -->
				<el-tabs style='margin-top:20px;' v-model="activeName" type="border-card" @tab-click="handleClick">
					<el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
						<!-- <keep-alive>
            <tab-pane v-if='activeName==item.key' :type='item.key' @create='showCreatedTimes'></tab-pane>
          </keep-alive> -->
						<tab-pane v-if='activeName==item.key' :type='item.key' :projectId="projectId" :serviceUuid='serviceUuid' :projectName='projectName' :groupName='groupName' :parentTimeUnit='timeUnit' @create='showCreatedTimes'></tab-pane>
					</el-tab-pane>
				</el-tabs>
      </fieldset>
			</div>
		</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'
	import tabPane from './serviceComponents/ManagerSeverTable'
	export default {
		components: {
			tabPane
		},
		computed: {
			...mapGetters({
				getManagerClusterList: 'getManagerClusterList',
				getChangegroupStatus: 'getChangegroupStatus',
				getClustTypeList: 'getClustTypeList',
				getClustersType: 'getClustersType',
				getClustersList: 'getClustersList',
			})
		},
		data() {
			return {
				title: '服务管理',
				tableData: [],
				//编辑界面数据
				editForm: {
					project_name: '',
					cluster_type: '',
					billing_mode: '',
					create_time: '',
					status: ''
				},
				optionsGroupStyle: [],
				billData: [],
				clusterTitleBill:'',
				detailProjectName: '',
				editFormVisible: false,
				LookFormDetail: false,
				editLoading: false,
				tabMapOptions: [],
				activeName: '',
				createdTimes: 0,
				showDetailTable: false,
				serviceUuid: '',
				projectId: '',
				groupName: '',//集群名称
				timeUnit: ''
			}
		},
		methods: {
			handleDelete(index, row) {
				console.log(index, row);
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
      //交互工作台
      toWorkBanch(index, row){
        var url = '/workBench';
				this.$router.push(url);
      },
      //购买服务
      toBuyService(index, row){
				let projectId = row.project_id
        var url = '/buyService?project_id='+projectId;
				this.$router.push(url);
      },
			//查看服务详情
			handleDetail(index, row) {
				let projectId = row.project_id//查看服务project_id
				this.timeUnit = row.billing_mode//计费模式
				this.projectId = row.project_id
				let params = {
						projectId: projectId//正式环境是使用
					// projectId: "f18214e1-7b95-40d3-9596-54a49b33bfba"
				}
				this.showDetailTable = false//切换服务默认隐藏
				// alert(row.project_id)
				this.requestClustersType(params).then((data) => {
					this.showDetailTable = true;
					this.tabMapOptions.splice(0,this.tabMapOptions.length)//清空数组
					this.getClustersType.forEach((e)=>{
						this.tabMapOptions.push({"label":e.service_name,"key":e.service_name,"service_uuid":e.service_uuid})
					})
					this.activeName = this.tabMapOptions[0].key//默认显示第一个Tab项
					this.serviceUuid = this.tabMapOptions[0].service_uuid//默认传第一个服务service_uuid
					this.projectId = data.project_id//服务的集群id
					this.projectName = data.project_name//服务的集群名称


				}, function(e) {
					console.log(e)
					this.$message.error(e);
				}).catch((err) => {
					console.log(err)
					this.$message.error(err);
				})
				// this.showDetailTable = true;
				// this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
			},
			editSubmit() { //编辑列表简单版
				let para = Object.assign({}, this.editForm);
				console.log(2222, JSON.stringify(para));
				console.log(para.project_id)

				let params = {
					"project_name": para.project_name,
					"project_uuid": para.project_id,
					"cluster_type": para.cluster_type
				}

				this.requestChangegroup(params).then((data) => {
					//  this.tableData = data.projects
					if(data.ret_code == "200") {
						for(var i = 0; i < this.tableData.length; i++) {
							if(this.tableData[i].project_id === para.project_id) {
								this.tableData.splice(i, 1, para);
							}
						}
						this.editFormVisible = false;
					}
				}, function(e) {
					console.log(e)
					this.$message.error(e);
				}).catch((err) => {
					console.log(err)
					this.$message.error(err);
				})

			},
			handleLook() {
				this.LookFormDetail = true;
			},
			handleClick(tab, event) {
				console.log(2222,tab.name);
				let serviceUuid = ""
				this.tabMapOptions.forEach((e)=>{
					if(e.key === tab.name){
						serviceUuid = e.service_uuid
					}
				})
				// this.serviceUuid = "91a62eb7-09bc-480f-a946-c08cf95fdb5a"
				this.serviceUuid = serviceUuid//正式环境使用

				// alert(serviceUuid)
				// let params = {
				// 			// "service_uuid": serviceUuid
				// 			"service_uuid": "91a62eb7-09bc-480f-a946-c08cf95fdb5a"
				// 	  }
				// this.requestClustersList(params).then((data) => {
				// 	//  this.tableData = data.projects
				// 	console.log(1111,data)
				// }, function(e) {
				// 	console.log(e)
				// 	this.$message.error(e);
				// }).catch((err) => {
				// 	console.log(err)
				// 	this.$message.error(err);
				// })
			},
			showCreatedTimes() {
				this.createdTimes = this.createdTimes + 1
			},
			...mapActions([
				'requestManagerClusterList',
				'requestClusterConfigList',
				'requestChangegroup',
				'requestClustersType',
				'requestClustersList',
			]),
		},
		mounted() {
			let APIloading = this.$loading({ fullscreen: true })
			this.requestManagerClusterList({}).then((data) => {
				APIloading.close();//接口返回loading关闭
				//  this.tableData = data.projects
				var projectsArry = []
				data.projects.forEach(function(item) {
					item.create_time = Utils.dateCut(item.create_time)
					item.billing_mode = Utils.timeToChina(item.billing_mode)
					item.status = Utils.statusToChina(item.status)
					projectsArry.push(item)
				})
				this.tableData = projectsArry;
			}, (e)=> {
				APIloading.close();//接口返回loading关闭
				this.$message.error(e);
			}).catch((err) => {
				APIloading.close();//接口返回loading关闭
				this.$message.error(err);
			})

			this.requestClusterConfigList({}).then((data) => {//获取集群类型
				APIloading.close();//接口返回loading关闭
				data.cluster_type.forEach((e)=>{
					this.optionsGroupStyle.push({"value":e,"label":e})
				})
				// this.value = this.options[0]['label']
			}, (e)=> {
				APIloading.close();//接口返回loading关闭
				this.$message.error(e);
			}).catch((err) => {
				APIloading.close();//接口返回loading关闭
				this.$message.error(err);
			})

		}
	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/managerservice.less';
</style>
