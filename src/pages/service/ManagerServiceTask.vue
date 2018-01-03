/** * Created by 军标 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>任务执行计划管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="common-title">
				集群名称：{{urlProjectName}}
				<span class="creat-btn"><el-button type="primary"  @click="toCreatTaskPlans()">创建任务执行计划</el-button></span>
			</div>
			<el-table :data="tableData" border height="350" style="width: 100%">
				<el-table-column label="任务名称" prop="groupName" sortable width="130">
					<template scope="scope">
						{{ scope.row.plan_name }}
					</template>
				</el-table-column>
				<el-table-column label="服务名称" prop="serviceStyle" width="130">
					<template scope="scope">
						{{ scope.row.service_name }}
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="foundTime" sortable width="120">
					<template scope="scope">
						{{ scope.row.create_time }}
					</template>
				</el-table-column>
				<el-table-column label="开始时间" prop="foundTime" width="120">
					<template scope="scope">
						{{ scope.row.start_time }}
					</template>
				</el-table-column>
				<el-table-column label="周期" prop="chargeStyle" width="100">
					<template scope="scope">
						{{ scope.row.period_type }}
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="groupStatus" width="100">
					<template scope="scope">
						{{ scope.row.statusCN }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleLook(scope.$index, scope.row)">查看详情</el-button>
						<el-button size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="small" @click="handleStop(scope.$index, scope.row)">停止</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--创建编辑界面-->
			<el-dialog :title="dialogTitle" size="large" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="180px" ref="editForm">
					<el-form-item label="集群名称：">
						<span>{{urlProjectName}}</span>
					</el-form-item>
					<el-form-item label="服务名称：">
						<span>{{urlServiceType}}</span>
					</el-form-item>
					<el-form-item label="任务名称" prop="groupName">
						<el-input v-model="editForm.plan_name" auto-complete="off" @change="changePlanName()"></el-input>
					</el-form-item>
					<el-form-item label="设置调度周期">
						每
						<el-select v-model="setServiceStartCycle" placeholder="每周/天/小时" class="small-select" @change="setCycle">
							<el-option v-for="item in circleStyle" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-select v-if="isHasWeek" v-model="setServiceStartTime" placeholder="周一/周日" class="small-select" @change="changeStartWeek">
							<el-option v-for="item in optionsStartTime" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-time-picker
							v-if="isHasTime"
					    v-model="setStartTime"
							@change="changeStartTime"
					    :picker-options="{
					      selectableRange: '00:00:00 - 23:59:59'
					    }"
					    placeholder="任意时间点">
					  </el-time-picker>
						<span v-if="isHasMinute">第</span>
						<el-select v-if="isHasMinute" v-model="minuteValue" placeholder="分钟" class="small-select" @change="changeMinute">
					    <el-option
					      v-for="item in minuteOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
						<span v-if="isHasMinute">分钟</span>
						<span>注意：请保证下个执行时间到来之前，上一个执行任务已完毕，否则下一个任务不会自动执行</span>
					</el-form-item>
					<el-form-item label="设置开始时间">
						<el-date-picker v-model="baginTime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions" @change="changeCreateTime">
						</el-date-picker>
						<span>{{baginTime}}为第一次开始执行，以后按周期调度执行</span>
					</el-form-item>
					<el-form-item label="">
						<span>任务执行错误后自动停止继续执行</span>
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="输入执行shell脚本" v-model="planTextarea" @change="changeShellScripts">
						</el-input>
					</el-form-item>
					<el-form-item label="">

						<div class="common-flex-area">
							<el-row type="flex" class="row-bg" justify="space-around">
								<el-col :span="24">
									<!-- <fieldset v-for="item in configServerList" :key="item.service_name"> -->
									<fieldset>
										<legend>{{getModuleConfigs.service_name}}服务</legend>
										<!-- <legend>服务</legend> -->
										<div class="contentContainer">
											<div v-if="getModuleConfigs.storage_type === 'shared'" class="config-right">
												<p>服务共享一个DNS存储</p>
												<el-select v-model="getModuleConfigs.storage.realValue" placeholder="请选择" class="small-select" @change="changeSelectSharedTest(getModuleConfigs.service_name,getModuleConfigs.storage_type,getModuleConfigs.storage.realValue)">
													<el-option v-for="itemOption in getModuleConfigs.storage.valueArrays" :key="itemOption.value" :label="itemOption.label" :value="itemOption.value">
													</el-option>
												</el-select>
											</div>
											<div class="config-left">
												<div v-for="(itemModules,key) in configServerList.modules" class="config-area" :key="key">
													<label for="">{{key}}</label>
													<span class="" v-for="(itemModulesArray,index) in itemModules" :key="itemModulesArray.value">
														<el-select v-model="itemModulesArray.realValue" placeholder="请选择" class="small-select" @change="changeSelectTest(key,index,itemModulesArray.realValue)">
															<el-option v-for="item in itemModulesArray.valueArrays" :key="item.value" :label="item.label" :value="item.value">
															</el-option>
														</el-select>
														<label for="" v-if="itemModulesArray.name==='replicas'">每节点：</label>
													</span>
												</div>
											</div>
											<!-- <div class="config-area" v-if="item.shared_modules">
												<div class="config-singel" v-for="(sharedArray,index) in item.shared_modules" :key="index">
														<label for="">{{sharedArray.name}}</label>
														<el-input v-if="sharedArray.display_box =='input'" v-model="zoopkeeperInput" placeholder="请输入内容" @change="changeInputTest(sharedArray.name,zoopkeeperInput)"></el-input>
												</div>
											</div> -->
											<div class="config-bottom">
												<label for="">费用</label>{{getModuleConfigs.service_price}}元/{{timeUnit}}
											</div>
										</div>
									</fieldset>


								</el-col>

							</el-row>
							<div class="common-p">
								单位费用：cpu 1{{timeUnit}}/1核 {{cpuPrice}}元，内存 1{{timeUnit}}/1GB {{memoryPrice}}元 存储 1{{timeUnit}}/1GB {{storageBlockPrice}}元 节点 1{{timeUnit}}/1节点 {{storageNfsPrice}}元
							</div>
							<div class="common-p">
								注意：服务只是停止并没有删除，因为要保留数据所以存储需要按时间单位一直计费。
							</div>
						</div>
					</el-form-item>
					<el-form-item label="请选择依赖的服务">
						<!-- <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
							<div class="buyItem" v-for="serviceGroup in serviceDepend">
								<el-checkbox :label="serviceGroup.service_uuid" :key="serviceGroup.service_uuid">{{serviceGroup.service_name}}</el-checkbox>
							</div>
						</el-checkbox-group> -->
						<div class="depend_services" v-for="(serviceGroup,index) in serviceDepend">
							<el-checkbox :checked="serviceGroup.isChioce" :label="serviceGroup.service_uuid" :key="serviceGroup.service_uuid" @change="handleCheckedDependChange(serviceGroup.service_uuid,index,serviceGroup.isChioce)">{{serviceGroup.service_name}}</el-checkbox>
							<!-- <el-radio v-for="service in serviceGroup" class="radio" v-model="radio" :label="service" :key="service" >{{service}}</el-radio> -->
						</div>
					</el-form-item>
					<el-form-item label="注意：">
						<span>请保存的任务依赖的其它服务在此段时间内已启动：任何服务没启动，任务将不执行！系统分析后给出提示</span>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
					<!-- <el-button @click.native="editFormVisible = false">返回</el-button> -->
				</div>
			</el-dialog>

			<!-- 任务详情弹出层 -->
			<el-dialog title="任务详情" v-model="detailsFormVisible" :close-on-click-modal="false">
				<div class="taskDetail">
					<p>
						<label for="">任务名称：</label>
						<span>{{getTaskDetail.job_plan_name}}</span>
					</p>
					<p>
						<label for="">周期:</label>
						<span>1{{detailCircle}}</span>
					</p>
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="任务执行脚本" v-model="getTaskDetail.shell_scripts">
					</el-input>
					<p v-for="(item,index) in getTaskDetail.log_historys" :key="index">
						开始时间{{item.start_time}}到{{item.end_time}} 执行完成<br>
						<span v-for="itemLog in item.logs" :key="itemLog.instance_name"><br>{{itemLog.instance_name}} 任务日志 {{itemLog.log}}</span>
					</p>
				</div>

				<div slot="footer" class="dialog-footer">
					<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button> -->
					<el-button @click.native="detailsFormVisible = false">返回</el-button>
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
				getTaskList: 'getTaskList',
				getTaskDetail: 'getTaskDetail',
				getJobPlanDelete: 'getJobPlanDelete',
				getJobPlanStop: 'getJobPlanStop',
				getModuleData: 'getModuleData',
				getJobPlanConfigs: 'getJobPlanConfigs',
				getModuleConfigs: 'getModuleConfigs',
				getJobPlanDepend: 'getJobPlanDepend',
				getJobPlanUpdate: 'getJobPlanUpdate',
				getCreateTaskPlans: 'getCreateTaskPlans'
			})
		},
		data() {
			return {
				title: "任务执行计划",
				dialogTitle: '',
				isEditDialog: true,//判断是编辑弹出框true或者是创建弹出框false
				editParma: {},//编辑任务计划接口参数
				creatParma: {},//创建任务接口参数
				checked: [],
				serviceDepend: [],//项目依赖服务
				detailCircle: '',
        setServiceStartTime: '周一/周日',
        setServiceStartCycle: '每周/天/小时',
				isHasWeek: true,//默认是否显示每周的日期
				isHasTime: true,//默认是否显示时间日期
				isHasMinute: false,//默认不显示分钟时间
				tableData: [],
				jobPlanParam: {},//编辑任务周期接口数据
				urlProjectId: '',//url中的project_id
				urlProjectName: '',//url中集群名称
				urlServiceType: '',//url获取serviceType
				urlServiceUuid: '',//url获取serviceUuid
				configServerList: [], //总数据数组测试环境
				shareObj: {},
				chioceUuidStr: '',//选中依赖服务串
				timeUnit: '', //时间单位
				cpuPrice: '0', //cpu价格
				memoryPrice: '0', //内存价格
				storageBlockPrice: '0', //硬盘价格
				storageNfsPrice: '0', //nfs价格
				nowJobPlanUuid: '',//当前编辑的job_plan-uuid
				//编辑界面数据
				editForm: {
					create_time: '',
					period_type: '',
					plan_name: '',
					service_name: '',
					service_plan_uuid: '',
					service_uuid: '',
					start_time: '',
					status: ''
				},
				circleStyle: [{
					value: 'week',
					label: '周'
				}, {
					value: 'day',
					label: '天'
				}, {
					value: 'hour',
					label: '小时'
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
				editFormVisible: false,
				detailsFormVisible: false,
				editLoading: false,
				value1: true,
				setStartTime: new Date(),
				// hourValue: '',
				minuteValue: '',
				minuteOptions: [],
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				baginTime: new Date(),
				planTextarea: '',
				textareaTask: ''
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			toEditParma(){
				for(let key in this.editParma){
					if(key === "job_plan_param"){
						this.editParma[key].job_plan_name = this.editForm.plan_name
						this.editParma[key].period_type = this.setServiceStartCycle
						this.editParma[key].start_week = this.setServiceStartTime
						this.editParma[key].start_hour = this.setStartTime.getHours()
						this.editParma[key].start_minute = this.setStartTime.getMinutes()
						this.editParma[key].first_run_year = this.baginTime.getFullYear()
						this.editParma[key].first_run_month = this.baginTime.getMonth()+1
						this.editParma[key].first_run_day = this.baginTime.getUTCDate()
						this.editParma[key].first_run_hour = this.baginTime.getHours()
						this.editParma[key].first_run_minute = this.baginTime.getMinutes()
						this.editParma[key].shell_scripts = this.planTextarea
						this.editParma[key].depend_service_uuid = this.chioceUuidStr
						if(this.editParma[key].period_type == "day"){
							this.editParma[key].start_week = 0
						}else if(this.editParma[key].period_type == "hour"){
							this.editParma[key].start_week = 0
							this.editParma[key].start_hour = 0
							this.editParma[key].start_minute = this.minuteValue
						}
					}else if(key === "module_configs"){
						this.editParma[key].modules = this.getModuleData.modules
						this.editParma[key].storage = this.getModuleData.storage
					}
				}
				console.log('444444',this.editParma)
				console.log(this.editForm)


			},
			changePlanName(){
				this.toEditParma()//编辑函数调用
			},
			changeStartWeek(){
				this.toEditParma()//编辑函数调用
			},
			changeStartTime(){
				this.toEditParma()//编辑函数调用
			},
			changeCreateTime(){
				this.toEditParma()//编辑函数调用
				// console.log(this.baginTime.getFullYear())
			},
			changeShellScripts(){
				this.toEditParma()//编辑函数调用
			},
			changeMinute(){
				this.toEditParma()//编辑函数调用
			},
			changeSelectSharedTest(serviceName,storageType,realValue){
				console.log(serviceName)
				console.log(storageType)
				console.log(realValue)

				if((this.getModuleData.storage_type == storageType) &&  (this.getModuleData.service_name == serviceName)){
					this.getModuleData.storage.value = parseInt(realValue)
				}
				this.countPriceTest()//修改测试环境单元价格
				this.toEditParma()//编辑函数调用

			},
			changeSelectTest(key,zIndex,value){
				console.log(key)
				console.log(zIndex)
				console.log(value)
				for(let nameser in this.getModuleData.modules){
					if(nameser == key){
						this.getModuleData.modules[nameser][zIndex].value = parseInt(value)
					}
				}
				console.log(this.getModuleData)
				this.countPriceTest()//修改测试环境单元价格
				this.toEditParma()//编辑函数调用

			},
			countPriceTest(){
				let titalPrice = 0 // 计算初始价格变量
	      if(this.configServerList.storage_type == "shared"){
					let resetSharedStorage = this.configServerList.storage
					titalPrice = titalPrice + parseInt(parseInt(resetSharedStorage.realValue)*this.storageBlockPrice)//公用存储价格计算
	      }
	      let modulesObj = this.configServerList.modules;
	      for(let item in this.configServerList.modules){
	        let serviceArray = this.configServerList.modules[item]
	        serviceArray.forEach((e)=>{
	          let serviceArrayObj = e
						if(serviceArrayObj.name == "replicas"){
							titalPrice = titalPrice + parseInt(parseInt(serviceArrayObj.realValue)*this.storageNfsPrice)//公用存储价格计算
						}else if(serviceArrayObj.name == "cpu"){
							titalPrice = titalPrice + parseInt(parseInt(serviceArrayObj.realValue)*this.cpuPrice)//公用存储价格计算
						}else if(serviceArrayObj.name == "memory"){
							titalPrice = titalPrice + parseInt(parseInt(serviceArrayObj.realValue)*this.memoryPrice)//公用存储价格计算
						}else if(serviceArrayObj.name == "storage"){
							titalPrice = titalPrice + parseInt(parseInt(serviceArrayObj.realValue)*this.storageBlockPrice)//公用存储价格计算
						}else{
							titalPrice = titalPrice
						}
	        })
	      }
	      this.configServerList.service_price = titalPrice //设置服务默认价格为
			},
			init(){
				this.urlProjectId = 'f18214e1-7b95-40d3-9596-54a49b33bfba' || this.$route.query.project_id;//如果url有则取url的project_id
				this.urlProjectName = this.$route.query.project_name || 'projectName';//如果url有则取url的project_id
				this.urlServiceType = this.$route.query.service_type || 'Spark';//如果url有则取url的service_type
				this.urlServiceUuid = this.$route.query.service_uuid || '91a62eb7-09bc-480f-a946-c08cf95fdb5a'
				for(let minuteNum = 1;minuteNum < 60; minuteNum++){//初始化循环出60秒的时间
					this.minuteOptions.push({"value":minuteNum,"label":minuteNum})
				}
				this.minuteValue = this.minuteOptions[0].value
				let APIloading = this.$loading({ fullscreen: true })
				let params = {
					project_id : this.urlProjectId,
					limit: 20,
					offset: 0,
					sort: "-job_plan_name"
				}
				this.requestTaskList(params).then((data) => {
					console.log(1111,data)
					let taskList = data.plans
					taskList.forEach((e)=>{
						e.statusCN = Utils.statusToChina(e.status)
						e.period_type = Utils.timeToChina(e.period_type)
						e.create_time = Utils.dateCut(e.create_time)
						e.start_time = Utils.dateCut(e.start_time)
					})
					this.tableData = data.plans
					APIloading.close();//接口返回loading关闭
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			handleEdit(index, row) {
				this.dialogTitle = '服务启停计划编辑'
				this.isEditDialog = true;
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				let jobPlanUuid = row.job_plan_uuid//job_plan_uuid
				this.nowJobPlanUuid = row.service_plan_uuid//当前选中编辑的service_plan_uuid
				let APIloading = this.$loading({ fullscreen: true })
				let params = {
					job_plan_uuid : jobPlanUuid
				}
				this.detailCircle = row.period_type
				this.requestJobPlanConfigs(params).then((data) => {
					// this.tableData.splice(index, 1);
					console.log('-------------',this.setStartTime)
					this.jobPlanParam = data.job_plan_param//接口job_plan_param赋值
					this.editParma.job_plan_param = data.job_plan_param//赋值job_plan_param
					console.log('????',this.editParma)

					if(this.jobPlanParam.start_week){//判断是否是以周为周期
						this.setServiceStartCycle = "week"
						this.setServiceStartTime = this.jobPlanParam.start_week
						this.setStartTime = new Date(2017,0,12,parseInt(this.jobPlanParam.start_hour),parseInt(this.jobPlanParam.start_minute),0);
					}else{

					}
					// this.baginTime = new Date()//初始化时间
					this.planTextarea = this.jobPlanParam.shell_scripts
					APIloading.close();//接口返回loading关闭
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})


				let configParams = {
					user_id: localStorage.getItem("userId"),    //用户id
					project_id: this.urlProjectId,//正式环境使用
					service_uuid: row.service_uuid//正式环境使用
				}
				// let APIloading = this.$loading({ fullscreen: true })
				this.requestModuleConfigs(configParams).then((data) => {
					console.log("--------------------123",data)
					APIloading.close();//接口返回loading关闭
					this.editParma.module_configs = JSON.parse(JSON.stringify(data));//深拷贝data数组
					delete this.editParma.module_configs.ret_code
					delete this.editParma.module_configs.ret_msg
					console.log("--------------------123",data)

					// console.log(111000,this.getModuleData)

						//接口获取时间单位及换算
						let dataTimeUnit = data.billing_mode;
						if(dataTimeUnit == "hour") {
							this.timeUnit = '小时';
						} else if(dataTimeUnit == "day") {
							this.timeUnit = '天';
						} else if(dataTimeUnit == "minute") {
							this.timeUnit = '分';
						} else if(dataTimeUnit == "month") {
							this.timeUnit = '月';
						} else if(dataTimeUnit == "second") {
							this.timeUnit = '秒';
						}
						//接口获取各存储价格单位
						let dataUnitPrice = data.unit_price;
						for(let item in dataUnitPrice) {
							if(item == "cpu") {
								this.cpuPrice = dataUnitPrice[item];
							}else if(item == "memory") {
								this.memoryPrice = dataUnitPrice[item];
							}else if(item == "storage_block") {
								this.storageBlockPrice = dataUnitPrice[item];
							} else if(item == "storage_nfs") {
								this.storageNfsPrice = dataUnitPrice[item];
							}
						}
						//总体数组
						this.configServerList = this.getModuleConfigs;
						this.shareObj = data.shared_services;
						// this.serviceConfig = this.getConfigList;
						// this.valueSpCPU = "1GB"
						console.log(data)

				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})


				let dependParams = {
					project_id : this.urlProjectId
				}
				this.requestJobPlanDepend(dependParams).then((data) => {
					data.current_project.forEach((e)=>{
						e.isChioce = false
					})
					this.serviceDepend = data.current_project
					console.log('-------------123',this.serviceDepend)

					APIloading.close();//接口返回loading关闭
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
				this.toEditParma()//编辑函数调用
			},

      handleDelete(index, row) {
				console.log(index, row.chargeStyle);

				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(() => {
						let jobPlanUuid = row.job_plan_uuid
						let APIloading = this.$loading({ fullscreen: true })
						let params = {
							job_plan_uuid : jobPlanUuid
						}
						this.detailCircle = row.period_type
						this.requestJobPlanDelete(params).then((data) => {
							this.tableData.splice(index, 1);
							APIloading.close();//接口返回loading关闭
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
      handleStop(index, row){
        // console.log(index, row.chargeStyle);

				this.$confirm('您是否确定停止服务?', '提示', {
						type: 'warning'
					})
					.then(() => {
						let jobPlanUuid = row.job_plan_uuid
						let APIloading = this.$loading({ fullscreen: true })
						let params = {
							job_plan_uuid : jobPlanUuid
							// service_plan_uuid : 'e36517b3-7ada-42c7-a98c-887372133767'
						}
						this.detailCircle = row.period_type
						this.requestJobPlanStop(params).then((data) => {
							APIloading.close();//接口返回loading关闭
						}, (e)=> {
							APIloading.close();//接口返回loading关闭
							this.$message.error(e);
						}).catch((err) => {
							APIloading.close();//接口返回loading关闭
							this.$message.error(err);
						})
						// this.tableData.splice(index, 1);
					}).catch((e) => {
            console.log(e)
						// this.$Message('已取消操作!');
					});
				// this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
      },
			setCycle(value){
				this.toEditParma()//编辑函数调用
				if(value === "week"){
					this.isHasWeek = true
					this.isHasTime = true
					this.isHasMinute = false
				}else if(value === "day"){
					this.isHasWeek = false
					this.isHasTime = true
					this.isHasMinute = false
				}else if(value === "hour"){
					this.isHasWeek = false
					this.isHasMinute = true
					this.isHasTime = false
				}else{
					this.isHasWeek = true
					this.isHasTime = false
					this.isHasMinute = false
				}
			},
			handleLook(index,row) {

				let jobPlanUuid = row.job_plan_uuid
				let APIloading = this.$loading({ fullscreen: true })
				let params = {
					job_plan_uuid : jobPlanUuid
				}
				this.detailCircle = row.period_type
				this.requestTaskDetail(params).then((data) => {
					console.log(222,data)
					this.detailsFormVisible = true;
					APIloading.close();//接口返回loading关闭
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			handleCheckedDependChange(uuid,index,isChioce) {
				this.serviceDepend.forEach((e,zIndex)=>{
					if(e.service_uuid == uuid && zIndex== index ){
						e.isChioce = !isChioce
					}
				})
				this.chioceUuidStr= ''//先置空字符串
				this.serviceDepend.forEach((e,zIndex)=>{
					if(e.isChioce == true){
						this.chioceUuidStr = this.chioceUuidStr + e.service_uuid+','
					}
				})
				this.chioceUuidStr = this.chioceUuidStr.substring(0,this.chioceUuidStr.length-1)//清楚字符串最后一个，号
				this.toEditParma()//编辑函数调用
			},
			editSubmit() {
				// 123

				let APIloading = this.$loading({ fullscreen: true })

				delete this.editParma.job_plan_param.create_time//删除两个无用接口参数
				delete this.editParma.job_plan_param.delete_time//删除两个无用接口参数


				let params = this.editParma
				if(this.isEditDialog){//编辑弹出层
					this.requestJobPlanUpdate(params).then((data) => {
						console.log(222,data)
						this.editFormVisible = false;
						APIloading.close();//接口返回loading关闭
					}, (e)=> {
						APIloading.close();//接口返回loading关闭
						this.$message.error(e);
					}).catch((err) => {
						APIloading.close();//接口返回loading关闭
						this.$message.error(err);
					})
				}else{//创建弹出层
					this.requestCreateTaskPlans(params).then((data) => {
						console.log('创建弹出层数据',data)
						this.editFormVisible = false;
						APIloading.close();//接口返回loading关闭
					}, (e)=> {
						APIloading.close();//接口返回loading关闭
						this.$message.error(e);
					}).catch((err) => {
						APIloading.close();//接口返回loading关闭
						this.$message.error(err);
					})
				}

			},
			toCreatTaskPlans(){
				this.dialogTitle = '创建服务启停计划'
				this.isEditDialog = false;
				this.editFormVisible = true;


				//创建服务启停计划begin
				let APIloading = this.$loading({ fullscreen: true })
				let configParams = {
					user_id: localStorage.getItem("userId"),    //用户id
					project_id: this.urlProjectId,//正式环境使用
					service_uuid: this.urlServiceUuid//正式环境使用
				}
				// let APIloading = this.$loading({ fullscreen: true })
				this.requestModuleConfigs(configParams).then((data) => {
					console.log("--------------------123",data)
					APIloading.close();//接口返回loading关闭
					this.editParma.module_configs = JSON.parse(JSON.stringify(data));//深拷贝data数组
					delete this.editParma.module_configs.ret_code
					delete this.editParma.module_configs.ret_msg
					console.log("--------------------123",data)

					// console.log(111000,this.getModuleData)

						//接口获取时间单位及换算
						let dataTimeUnit = data.billing_mode;
						if(dataTimeUnit == "hour") {
							this.timeUnit = '小时';
						} else if(dataTimeUnit == "day") {
							this.timeUnit = '天';
						} else if(dataTimeUnit == "minute") {
							this.timeUnit = '分';
						} else if(dataTimeUnit == "month") {
							this.timeUnit = '月';
						} else if(dataTimeUnit == "second") {
							this.timeUnit = '秒';
						}
						//接口获取各存储价格单位
						let dataUnitPrice = data.unit_price;
						for(let item in dataUnitPrice) {
							if(item == "cpu") {
								this.cpuPrice = dataUnitPrice[item];
							}else if(item == "memory") {
								this.memoryPrice = dataUnitPrice[item];
							}else if(item == "storage_block") {
								this.storageBlockPrice = dataUnitPrice[item];
							} else if(item == "storage_nfs") {
								this.storageNfsPrice = dataUnitPrice[item];
							}
						}
						//总体数组
						this.configServerList = this.getModuleConfigs;
						this.shareObj = data.shared_services;
						// this.serviceConfig = this.getConfigList;
						// this.valueSpCPU = "1GB"
						console.log(data)

				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})


				let dependParams = {
					project_id : this.urlProjectId
				}
				this.requestJobPlanDepend(dependParams).then((data) => {
					data.current_project.forEach((e)=>{
						e.isChioce = false
					})
					this.serviceDepend = data.current_project
					console.log('-------------123',this.serviceDepend)

					APIloading.close();//接口返回loading关闭
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
				this.editParma.job_plan_param = {//设置job_plan_param空对象
					  "job_plan_name": "",
					  "service_uuid": this.urlServiceUuid,
					  "period_type": "",
					  "status": "Created",
					  "shell_scripts": "",
					  "depend_service_uuid": ""
				}
				this.toEditParma()//编辑函数调用
				//创建服务启停计划end
			},
			...mapActions([
				'requestTaskList',
				'requestTaskDetail',
				'requestJobPlanDelete',
				'requestJobPlanStop',
				'requestJobPlanConfigs',
				'requestModuleConfigs',
				'requestJobPlanDepend',
				'requestJobPlanUpdate',
				'requestCreateTaskPlans'
			]),
		}
	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/managerservicestask.less';
</style>
