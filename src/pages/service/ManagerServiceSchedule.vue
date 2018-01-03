/** * Created by 军标 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>服务启停计划管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		<div class="common-title">
			集群名称：{{urlProjectName}}
			<span class="creat-btn"><el-button type="primary"  @click="toCreatServicePlans()">创建服务启停计划</el-button></span>
		</div>
			<el-table :data="tableData" border height="350" style="width: 100%">
				<el-table-column label="计划名称" prop="plan_name" sortable width="130">
					<template scope="scope">
						{{ scope.row.plan_name }}
					</template>
				</el-table-column>
				<el-table-column label="服务名称" prop="service_name" width="130">
					<template scope="scope">
						{{ scope.row.service_name }}
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="create_time" sortable width="120">
					<template scope="scope">
						{{ scope.row.create_time }}
					</template>
				</el-table-column>
				<el-table-column label="开始时间" prop="start_time" width="120">
					<template scope="scope">
						{{ scope.row.start_time }}
					</template>
				</el-table-column>
				<el-table-column label="周期" prop="period_type" width="100">
					<template scope="scope">
						{{ scope.row.period_type }}
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="status" width="100">
					<template scope="scope">
						{{ scope.row.status }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
			<el-dialog :title="dialogTitle" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="180px" ref="editForm">
					<el-form-item label="集群名称：" prop="service_name">
						<span>{{urlProjectName}}</span>
					</el-form-item>
					<el-form-item label="服务名称：" prop="service_name">
						<span>{{urlServiceType}}</span>
					</el-form-item>
					<el-form-item label="计划名称" prop="plan_name">
						<el-input v-model="editForm.plan_name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="设置服务启动时间">
						每
						<el-select v-model="setServiceCircleTime" placeholder="请选择类型" class="small-select" @change="chioseCircleTime(setServiceCircleTime)">
							<el-option v-for="item in optionsGroupStyle" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span>注意：停止时间不能小于开始时间且服务启停时间差不能小于60分钟</span>
					</el-form-item>
					<el-form-item label="设置服务启动时间">
						<el-select v-model="setServiceStartTime" placeholder="周一/周日" class="small-select"  :disabled="selectDisable" @change="changeStartTime">
							<el-option v-for="item in optionsStartTime" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-time-picker
					    v-model="valueStartTime"
					    placeholder="任意时间点"
							@blur="setStartHour"
							format="HH:mm">
					  </el-time-picker>
					</el-form-item>
					<el-form-item label="设置服务停止时间">
						<el-select v-model="setServiceStopTime" placeholder="周一/周日" class="small-select" :disabled="selectDisable" @change="changeEndTime">
							<el-option v-for="item in optionsEndTime" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-time-picker
					    v-model="valueEndTime"
					    placeholder="任意时间点"
							@blur="setEndHour"
							format="HH:mm">
					  </el-time-picker>
					</el-form-item>
					<el-form-item label="是否激活">
						<el-switch on-text="" off-text="" v-model="ifActive" @change="changeActive"></el-switch>
					</el-form-item>
					<el-form-item label="是否立即执行">
						<el-switch on-text="" off-text="" v-model="ifChangeCurrent" @change="changeCurrent"></el-switch>
					</el-form-item>
					<el-form-item label="注意：">
						<span>保存时请注意已添加的计划是否跟现在的有重叠</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
					<el-button @click.native="editFormVisible = false">返回</el-button>
				</div>
			</el-dialog>

		</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'


	export default {
		computed: {
			...mapGetters({
				getServiceOnOffList: 'getServiceOnOffList',
				getServiceUpdate: 'getServiceUpdate',
				getServiceDelete: 'getServiceDelete',
				getCreatServicePlans: 'getCreatServicePlans',
				getServicePlansStatus: 'getServicePlansStatus'
			})
		},
		data() {
			return {
				title: "服务启停计划",
				tableData: [],
				urlProjectName:'',
				urlprojectId: '',//url获取projectId
				urlServiceType: '',//url获取serviceType
				urlServiceUuid: '',//url获取serviceUuid
        setServiceCircleTime: '周/天',
        setServiceStopTime: '周一/周日',
				setServiceStartTime: '周一/周日',
				valueStartTime: '',
				valueEndTime: '',
				selectDisable: false,
				editParams:{},
				dialogTitle: '',//编辑弹出框
				isEditDialog: true,//判断是编辑弹出框true或者是创建弹出框false
				createServicePlanUuid: '',//创建服务接口返回service_plan_uuid保存
				stayTime: 0,//查询时间
				//编辑界面数据
				editForm: {
					create_time: '',
					if_active: '',
					period_type: '',
					plan_name: '',
					service_name: '',
					service_plan_uuid: '',
					service_uuid: '',
					start_time: '',
					status: ''
				},
				optionsGroupStyle: [{
					value: 'week',
					label: '周'
				}, {
					value: 'day',
					label: '天'
				}],
				optionsStartTime: [{
					value: 1,
					label: '周一'
				}, {
					value: 2,
					label: '周二'
				}, {
					value: 3,
					label: '周三'
				}, {
					value: 4,
					label: '周四'
				}, {
					value: 5,
					label: '周五'
				}, {
					value: 6,
					label: '周六'
				}, {
					value: 7,
					label: '周日'
				}],
				optionsEndTime: [{
					value: 1,
					label: '周一'
				}, {
					value: 2,
					label: '周二'
				}, {
					value: 3,
					label: '周三'
				}, {
					value: 4,
					label: '周四'
				}, {
					value: 5,
					label: '周五'
				}, {
					value: 6,
					label: '周六'
				}, {
					value: 7,
					label: '周日'
				}],
				editFormVisible: false,
				LookFormDetail: false,
				editLoading: false,
				ifActive: 0,
				ifChangeCurrent: 0
			}
		},
		methods: {
			init(){
				let params = {
					projectId: this.urlprojectId,
					limit: 20,
					offset: 0,
					sort: "-service_plan_name"
				}
				let APIloading = this.$loading({ fullscreen: true })
				this.requestServiceOnOffList(params).then((data) => {
					// debugger
					APIloading.close();//接口返回loading关闭
					//  this.tableData = data.projects
					var  projectsArry = []
					let dataPlans = data.plans
					dataPlans.forEach((item) =>{
						// debugger
					  item.create_time = Utils.dateCut(item.create_time)
						item.start_time = Utils.dateCut(item.start_time)
					  item.period_type = Utils.timeToChina(item.period_type)
					  item.status = Utils.statusToChina(item.status)
					  projectsArry.push(item)
					})
					// debugger
					this.tableData = projectsArry;
					// debugger
					// return this.tableData
					// debugger
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			handleEdit(index, row) {
				this.dialogTitle = '服务启停计划编辑';
				this.isEditDialog = true;
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			handleDelete(index, row) {
				console.log(index, row.chargeStyle);
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						type: 'warning'
					}).then(() => {
						let params = {
							service_plan_id: row.service_plan_uuid
						}
						let APIloading = this.$loading({ fullscreen: true })
						this.requestServiceDelete(params).then((data) => {
							APIloading.close();//接口返回loading关闭
							this.tableData.splice(index, 1);
						}, (e)=> {
							APIloading.close();//接口返回loading关闭
							this.$message.error(e);
						}).catch((err) => {
							APIloading.close();//接口返回loading关闭
							this.$message.error(err);
						})

					}).catch((e) => {
            console.log(e)
						// this.$Message('已取消操作!');
					});

				// this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
			},
			chioseCircleTime(value) {
				if(value == "day"){
					this.selectDisable = true
				}else{
					this.selectDisable = false
				}
				this.editParams.period_type = value//设置编辑周期
			},
			changeStartTime() {
				this.editParams.start_week = this.setServiceStartTime//设置周期开始时间
			},
			changeEndTime() {
				this.editParams.stop_week = this.setServiceStopTime//周期结束时间
			},
			setStartHour() {
				// console.log(this.valueStartTime.getHours())
				this.editParams.start_hour = this.valueStartTime.getHours()
				this.editParams.start_minute = this.valueStartTime.getMinutes()

			},
			setEndHour() {
				// console.log(this.valueEndTime.getMinutes())
				this.editParams.stop_hour = this.valueEndTime.getHours()
				this.editParams.stop_minute = this.valueEndTime.getMinutes()
			},
			changeActive() {
				this.editParams.if_active = this.ifActive
				console.log(this.editParams.if_active)
			},
			changeCurrent() {
				this.editParams.if_change_current = this.ifChangeCurrent
				console.log(this.editParams.if_change_current)

			},
      editSubmit() { //编辑列表简单版
				let para = Object.assign({}, this.editForm);
				console.log(2222, JSON.stringify(para));
				console.log(para.service_uuid)
				this.editParams.plan_name = para.plan_name
				// this.editParams.service_uuid = para.service_uuid
				this.editParams.service_plan_uuid = para.service_plan_uuid
				if(this.editParams.period_type == "day" ){
					this.editParams.start_week = 0//设置周期开始时间
					this.editParams.stop_week = 0//周期结束时间
				}
				//  this.editParams = {
				// 	// "plan_name":"spar-plan123",
				// 	// "service_uuid":"91a62eb7-09bc-480f-a946-c08cf95fdb5a",
				// 	// "period_type":"week",
				// 	"start_week":2,
				// 	"start_hour":9,
				// 	"start_minute":12,
				// 	"stop_week":2,
				// 	"stop_hour":9,
				// 	"stop_minute":15,
				// 	"if_active":1,
				// 	"if_change_current":1
				// }
				if(this.isEditDialog){
					delete this.editParams.service_uuid//删除service_uuid属性
					let APIloading = this.$loading({ fullscreen: true })
					this.requestServiceUpdate(this.editParams).then((data) => {
						APIloading.close();//接口返回loading关闭
						this.$message({
							showClose: true,
							message: '恭喜你，服务启停计划编辑成功！',
							type: 'success'
						});
						this.init();//刷新页面数据
					}, (e)=> {
						APIloading.close();//接口返回loading关闭
						this.$message.error(e);
					}).catch((err) => {
						APIloading.close();//接口返回loading关闭
						this.$message.error(err);
					})

	        for(var i = 0; i < this.tableData.length; i++) {
	          if(this.tableData[i].plan_id === para.plan_id) {
	            this.tableData.splice(i, 1, para);
	          }
	        }
				}else{
					delete this.editParams.service_plan_uuid//删除service_plan_uuid属性
					this.editParams.service_uuid = this.urlServiceUuid//用url的service_uuid
					let APIloading = this.$loading({ fullscreen: true })
					this.requestCreatServicePlans(this.editParams).then((data) => {
						APIloading.close();//接口返回loading关闭
						this.createServicePlanUuid = data.service_plan_uuid//创建服务启停计划接口返回service_plan_uuid
						this.checkStatus(data.service_plan_uuid)
					}, (e)=> {
						APIloading.close();//接口返回loading关闭
						this.$message.error(e);
					}).catch((err) => {
						APIloading.close();//接口返回loading关闭
						this.$message.error(err);
					})
				}
				this.editFormVisible = false;
			},
			toCreatServicePlans(){
				this.dialogTitle = '创建服务启停计划';
				this.isEditDialog = false;
				this.editFormVisible = true;
				this.editForm = Object.assign({}, {});
				for(let key in this.editForm){//清空editForm属性
					this.editForm[key] = ''
				}
			},
			checkStatus(createServicePlanUuid){
				const loading = this.$loading({
					lock: true,
					text: '正在创建服务启停计划中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				var queryStatus = null
				let statusParams = {
					"service_plan_uuid" : createServicePlanUuid
				}
				this.requestServicePlansStatus(statusParams).then((statusData) => {//查询创建快照状态
					console.log(this.stayTime)
					if(statusData.status == "Created"){
						clearInterval(queryStatus)
						loading.close();
						this.stayTime = 0//停留时间清零
						this.init();//刷新页面数据
						this.$message({
							showClose: true,
							message: '恭喜你，创建服务启停计划成功！',
							type: 'success'
						});
					}else if(this.stayTime <= 15){//两秒请求一次，默认最多请求30秒
						clearInterval(queryStatus)
						queryStatus = setTimeout(()=>{
							this.stayTime++
							console.log(this.stayTime)
							this.checkStatus(this.createServicePlanUuid);
						},2000)
					}else{
						clearInterval(queryStatus)
						this.stayTime = 0//停留时间清零
						loading.close();
						this.$message.error('很抱歉，创建服务启停计划失败');
					}

				}, (e)=> {
					loading.close();
					this.$message.error(e);
				}).catch((err) => {
					loading.close();
					this.$message.error(err);
				})
			},
      			...mapActions([
				'requestServiceOnOffList',
				'requestServiceUpdate',
				'requestServiceDelete',
				'requestCreatServicePlans',
				'requestServicePlansStatus'
			]),
		},
		mounted() {
			this.urlprojectId = this.$route.query.project_id || 'f18214e1-7b95-40d3-9596-54a49b33bfba';//如果url有则取url的project_id
			this.urlProjectName = this.$route.query.project_name || 'projectName';//如果url有则取url的project_id
			this.urlServiceType = this.$route.query.service_type || 'Spark';//如果url有则取url的service_type
			this.urlServiceUuid = this.$route.query.service_uuid || '91a62eb7-09bc-480f-a946-c08cf95fdb5a'
			this.init()//初始化

		}
	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/managerserviceschedule.less';
</style>
