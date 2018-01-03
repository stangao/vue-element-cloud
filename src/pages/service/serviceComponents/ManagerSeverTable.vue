/** * Created by 军标 on 2017-9-11. */
<template>
	<div class="serverList">
		<el-table :data="list" border fit highlight-current-row style="width: 100%">
			<el-table-column align="center" label="服务模块名称" v-loading="loading" element-loading-text="请给我点时间！" width="100px">
				<template scope="scope">
					<span>{{scope.row.instance_name}}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="IP" width="100px">
				<template scope="scope">
					<span>{{scope.row.ip}}</span>
				</template>
			</el-table-column>

			<el-table-column label="创建时间" width="110px">
				<template scope="scope">
					<span>{{scope.row.start_time}}</span>
				</template>
			</el-table-column>

			<el-table-column width="90px" align="center" label="已运行时间">
				<template scope="scope">
					<span>{{scope.row.run_time}}</span>
				</template>
			</el-table-column>

			<el-table-column width="70px" label="CPU(核)">
				<template scope="scope">
          <span>{{scope.row.cpu}}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="内存(MB)" width="100">
				<template scope="scope">
					<span>{{scope.row.memory}}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="存储(GB)" width="100">
				<template scope="scope">
					<span>{{scope.row.storage}}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="状态" width="80">
				<template scope="scope">
					<span>{{scope.row.status}}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="操作" width="390">
				<template scope="scope">
					<el-button size="small" @click="toDetail(scope.$index, scope.row)">查看详情</el-button>
					<el-button size="small" @click="reStart(scope.$index, scope.row)">重启</el-button>
					<el-button size="small" v-if="(list.length-1) == scope.$index" @click="toDelete(scope.$index, scope.row)">删除</el-button>
					<el-button size="small" @click="toWebShell(scope.$index, scope.row)">WebShell</el-button>
					<!-- <el-button size="small" @click="toWebService(scope.$index, scope.row)">进入web管理</el-button> -->
					<el-button size="small" @click="toLogShell(scope.$index, scope.row)">LogShell</el-button>


					<!-- <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>

		</el-table>
		<div class="options-btn">
			<el-button type="primary" @click="btnDeleteService">删除此服务</el-button>
			<el-button type="primary" @click="btnChangeConfig">修改配置</el-button>
			<el-button type="primary" @click="btnReStartAll">服务模块全部重启</el-button>
			<el-button type="primary" @click="btnSetTaskPlan">设置任务执行计划</el-button>
			<el-button type="primary" @click="btnSetServicePlan">设置服务启停计划</el-button>
			<el-button type="primary" @click="btnSetContent">服务容量设置</el-button>
			<el-button type="primary" @click="btnCheckDetail">查看服务详情</el-button>

		</div>
		<div class="options-switch">
			<p>
				<label for="">服务共享</label>
				<el-switch on-text="" off-text="" v-model="isShareModule" @change="toShareModule"></el-switch>
				<span>服务共享后其它集群可见</span>
			</p>
			<p>
				<label for="">服务持续运行</label>
				<el-switch on-text="" off-text="" v-model="isContinuRun" @change="toContinuRun"></el-switch>
				<span>关闭后服务只在任务执行前启动和任务执行后自动关闭</span>
			</p>
			<p>
				单位费用：cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元cpu 1分钟1核 2元
			</p>
			<p>
				注意：只有Spark和Flink可以设置任务执行计划！其它服务可以”设置服务启停计划“
			</p>

		</div>
		<!--编辑界面-->
		<el-dialog title="" size="large" class="service-set" v-model="editFormVisible" :close-on-click-modal="false">
			<div class="common-flex-area">
				<el-row type="flex" class="row-bg" justify="space-around">
					<el-col :span="24">
						<!-- <fieldset v-for="item in configServerList" :key="item.service_name"> -->
						<fieldset>
							<legend>{{getModuleConfigs.service_name}}服务</legend>
							<!-- <legend>服务</legend> -->
							<div class="contentContainer">
								<div v-if="(getModuleConfigs.storage_type === 'shared') && getModuleConfigs.storage" class="config-right">
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
								<!-- <div class="config-area" v-if="configServerList.shared_modules">
									<div class="config-singel" v-for="(sharedArray,index) in configServerList.shared_modules" :key="index">
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
			<!-- <div class="">
				<el-button type="primary" @click="createTestConfig" class="btn">生成服务</el-button>
			</div> -->
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存并重启服务</el-button>
				<el-button @click.native="editFormVisible = false">返回</el-button>
			</div>
		</el-dialog>

		<!--查看实例详情-->
		<el-dialog title="服务模块详情" v-model="LookFormDetail" :close-on-click-modal="false">
			<div class="billDetailBox" v-for="(item,key) in billData" :key="key">
				<div class="commom-listP" v-if="key == 'mount'">
					<label for="">{{key}}:</label>
					<div class="mount-box" v-for="(mountItem,mountKey) in item">
						<span>{{mountKey}} --&gt;&nbsp; </span><span>{{mountItem}}</span>
					</div>
				</div>
				<div class="commom-listP" v-else>
					<label for="">{{key}}:</label>
					<span>{{item}}</span>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="LookFormDetail = false">返回</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Utils from '../../../common/utils'
	export default {
		props: {
			type: {
				type: String,
				default: 'spark'
			},
			serviceUuid:{
				type: String,
				default: '91a62eb7-09bc-480f-a946-c08cf95fdb5a'
			},
			projectId:{
				type: String,
				default: 'c6d4ecd3-144c-43c3-b27b-d3a1b73d7ca9'
			},
			projectName:{
				type: String,
				default: 'gnb'
			},
			parentTimeUnit:{
				type: String,
				default: '天'
			}
		},
		computed: {
			...mapGetters({
				getClustersList: 'getClustersList',
				getRestartInstances: 'getRestartInstances',
				getDeleteInstances: 'getDeleteInstances',
				getRestartService: 'getRestartService',
				getDeleteService: 'getDeleteService',
				getInstancesInfo: 'getInstancesInfo',
				getModuleData: 'getModuleData',
			  getModuleConfigs: 'getModuleConfigs',
			  getModuleShared: 'getModuleShared',
				getSetConfigs: 'getSetConfigs',
				getSetContinuRun: 'getSetContinuRun',
				getSetShareModule: 'getSetShareModule'
			})
		},
		data() {
			return {
				list: null,
				childServiceUuid: this.serviceUuid,
				childProjectId: this.projectId,
				childProjectName: this.projectName,
				childType: this.type,
				listData: [],
				//编辑界面数据
				editForm: {
					groupName: '',
					groupStyle: '',
					chargeStyle: '',
					foundTime: '',
					groupStatus: ''
				},
				optionsGroupStyle: [{
					value: 'hadoop',
					label: 'hadoop'
				}, {
					value: 'spark',
					label: 'spark'
				}],
				configServerList: [], //总数据数组测试环境
				shareObj: {},
				timeUnit: this.parentTimeUnit, //时间单位
				cpuPrice: '0', //cpu价格
				memoryPrice: '0', //内存价格
				storageBlockPrice: '0', //硬盘价格
				storageNfsPrice: '0', //nfs价格
				serviceName: '',//弹出框服务名称
				loading: false,
				isContinuRun: false,
				isShareModule: false,
				editFormVisible: false,
				LookFormDetail: false,
				billData: [],
				zoopkeeperInput: '',
				editLoading: false
			}
		},
		created() {
			// alert(this.props.type)
			// this.getList()
		},
		mounted() {
			let params={
				"service_uuid": this.childServiceUuid
			}
			this.init(params);
		},
		methods: {
			init(params) {
				this.requestClustersList(params).then((data) => {
					let timeUnit =  Utils.timeToChina(data.billing_mode)
					//  this.tableData = data.projects
					console.log(1111,data.instances)
					// this.list = this.listData;
					let dataInstances = data.instances
					dataInstances.forEach((e)=>{
						for(var key in e.resource_used){
							e[key] = e.resource_used[key]
							// console.log(999,e.resource_used)
						}
						e.run_time = e.run_time + timeUnit
						e.start_time = Utils.dateCut(e.start_time)
						e.status = Utils.statusToChina(e.status)

					})
					console.log("0000",dataInstances)
					this.list = data.instances;

				}, function(e) {
					console.log(e)
					this.$message.error(e);
				}).catch((err) => {
					console.log(err)
					this.$message.error(err);
				})
			},
			toDetail(index, row) {
				let params = {
					instance_id: row.instance_id
				}
				this.requestInstancesInfo(params).then((data) => {
					this.LookFormDetail = true
					delete data.ret_code
					delete data.ret_msg
					delete data.start_time

					data.ports = data.ports.join(",")
					this.billData = data
				}, function(e) {
					console.log(e)
					this.$message.error(e);
				}).catch((err) => {
					console.log(err)
					this.$message.error(err);
				})
			},
      //重启
      reStart(index, row) {
        this.$confirm('你确定要重启服务嘛?', '提示', {
						type: 'warning'
					})
					.then(() => {
						// this.tableData.splice(index, 1);
						let params = {
							user_id: localStorage.getItem("userId"),    //用户id
							project_id: this.childProjectId,
							instance_id: row.instance_id
						}
						this.requestRestartInstances(params).then((data) => {
							this.$message({
			          showClose: true,
			          message: '恭喜你，重启成功！',
			          type: 'success'
			        });
						}, function(e) {
							console.log(e)
							this.$message.error(e);
						}).catch((err) => {
							console.log(err)
							this.$message.error(err);
						})

					}).catch((e) => {
						// this.$Message('已取消操作!');
            console.log(e)
					});
			},
			//删除服务模块
			toDelete(index, row) {
        this.$confirm('你确定要删除服务模块嘛?', '提示', {
						type: 'warning'
					})
					.then(() => {
						// this.tableData.splice(index, 1);
						let params = {
							user_id: localStorage.getItem("userId"),    //用户id
							project_id: this.childProjectId,
							instance_id: row.instance_id
						}
						this.requestDeleteInstances(params).then((data) => {
							this.list.splice(index, 1);
							this.$message({
			          showClose: true,
			          message: '恭喜你，删除实例成功！',
			          type: 'success'
			        });
						}, function(e) {
							console.log(e)
							this.$message.error(e);
						}).catch((err) => {
							console.log(err)
							this.$message.error(err);
						})

					}).catch((e) => {
						// this.$Message('已取消操作!');
            console.log(e)
					});
			},
      //去webShell
      toWebShell(index, row) {
				let projectName = this.childProjectName //正式环境使用
				let podName = 'frontendbms-12-mhx7g' //正式环境使用row.pod_name
				let containerName =row.container_name  //正式环境使用

        var url = '/webShell?project_name=' + projectName + "&pod_name=" + podName + "&container_name=" + containerName;
        this.$router.push(url);
			},
      //进入LogShell
      toLogShell(index, row) {
				let projectName = this.childProjectName //正式环境使用
				let podName = 'frontendbms-12-mhx7g' //正式环境使用row.pod_name
				let containerName =row.container_name  //正式环境使用

        var url = '/logShell?project_name=' + projectName + "&pod_name=" + podName + "&container_name=" + containerName;
        this.$router.push(url);
			},
			btnCreate() {
				this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
			},
      btnDeleteService(){
        this.$confirm('你确定要删除此服务嘛?', '提示', {
						type: 'warning'
					})
					.then(() => {
						// this.tableData.splice(index, 1);
						let params = {
							user_id: localStorage.getItem("userId"),    //用户id
							project_id: this.childProjectId,
							service_uuid: this.childServiceUuid
						}
						this.requestDeleteService(params).then((data) => {
							this.$message({
			          showClose: true,
			          message: '恭喜你，删除服务成功！',
			          type: 'success'
			        });
						}, function(e) {
							console.log(e)
							this.$message.error(e);
						}).catch((err) => {
							console.log(err)
							this.$message.error(err);
						})

					}).catch((e) => {
            console.log(e)
						// this.$Message('已取消操作!');
					});
      },
      btnChangeConfig(){
				let serviceUuid = this.childServiceUuid
        var url = '/managerServiceConfig?service_uuid='+serviceUuid;
        this.$router.push(url);
      },
      btnReStartAll(){
        this.$confirm('你确定要重启所有服务?', '提示', {
						type: 'warning'
					})
					.then(() => {
						// this.tableData.splice(index, 1);
						let params = {
							user_id: localStorage.getItem("userId"),    //用户id
							project_id: this.childProjectId,
							service_uuid: this.childServiceUuid
						}
						this.requestRestartService(params).then((data) => {
							this.$message({
			          showClose: true,
			          message: '恭喜你，全部重启成功！',
			          type: 'success'
			        });
						}, function(e) {
							console.log(e)
							this.$message.error(e);
						}).catch((err) => {
							console.log(err)
							this.$message.error(err);
						})


					}).catch((e) => {
            console.log(e)
						// this.$Message('已取消操作!');
					});
      },
      btnSetTaskPlan(){
				let projectId = this.childProjectId //正式环境使用
				let projectName = this.childProjectName //正式环境使用
				let serviceType =	this.childType//服务类型
				let serviceUuid =	this.childServiceUuid//服务类型
        var url = '/managerServiceTask?project_id=' + projectId+'&project_name='+projectName+'&service_type='+serviceType+'&service_uuid='+serviceUuid;
        this.$router.push(url);
      },
			btnSetServicePlan(){
				let projectId = this.childProjectId //正式环境使用
				let projectName = this.childProjectName //正式环境使用
				let serviceType =	this.childType//服务类型
				let serviceUuid =	this.childServiceUuid//服务类型
        var url = '/managerServiceSchedule?project_id=' + projectId+'&project_name='+projectName+'&service_type='+serviceType+'&service_uuid='+serviceUuid;
        this.$router.push(url);
      },
      btnSetContent(){
        this.editFormVisible = true;
				let params = {
					user_id: localStorage.getItem("userId"),    //用户id
					project_id: this.childProjectId,//正式环境使用
					service_uuid: this.childServiceUuid//正式环境使用
				}
				let APIloading = this.$loading({ fullscreen: true })
				this.requestModuleConfigs(params).then((data) => {
					console.log("--------------------",data)
					APIloading.close();//接口返回loading关闭

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
      },
			changeSelectSharedTest(serviceName,storageType,realValue){
				console.log(serviceName)
				console.log(storageType)
				console.log(realValue)

				if((this.getModuleData.storage_type == storageType) &&  (this.getModuleData.service_name == serviceName)){
					this.getModuleData.storage.value = parseInt(realValue)
				}
				this.countPriceTest()//修改测试环境单元价格
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
      btnCheckDetail(){
				let serviceUuid = this.childServiceUuid //正式环境使用
        var url = '/serviceBill?service_uuid=' + serviceUuid;
        this.$router.push(url);
      },
			editSubmit() {
				console.log(this.getModuleData)
				let params = {
					"if_restart": true,
					"service_uuid": this.childServiceUuid
				}
				params.storage_type = this.getModuleData.storage_type
				params.storage = this.getModuleData.storage
				params.modules = this.getModuleData.modules
				console.log(1234,params)
				this.createService(params)
			},
			createService(data){
				let params = data
				let APIloading = this.$loading({ fullscreen: true })//接口loading
				this.requestSetConfigs(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					console.log(data)
					this.$message({
						showClose: true,
						message: '恭喜你，保存重启服务成功！',
						type: 'success'
					});
					this.editFormVisible = false;

				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			toContinuRun(){
				console.log(this.isContinuRun)
				let params = {
					if_persist: this.isContinuRun,
					service_uuid: this.childServiceUuid
				}
				let APIloading = this.$loading({ fullscreen: true })//接口loading
				this.requestSetContinuRun(JSON.stringify(params)).then((data) => {
					APIloading.close();//接口返回loading关闭
					this.$message({
						showClose: true,
						message: '恭喜你，服务持续运行设置成功！',
						type: 'success'
					});
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			toShareModule(){
				console.log(this.isShareModule)
				let params = {
					if_share: this.isShareModule,
					service_uuid: this.childServiceUuid
				}
				let APIloading = this.$loading({ fullscreen: true })//接口loading
				this.requestSetShareModule(JSON.stringify(params)).then((data) => {
					APIloading.close();//接口返回loading关闭
					this.$message({
						showClose: true,
						message: '恭喜你，服务共享设置成功！',
						type: 'success'
					});
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			...mapActions([
				'requestClustersList',
				'requestRestartInstances',
				'requestDeleteInstances',
				'requestInstancesInfo',
				'requestRestartService',
				'requestDeleteService',
				'requestModuleConfigs',
				'requestSetConfigs',
				'requestSetContinuRun',
				'requestSetShareModule'
			]),
		}
	}
</script>
<style lang="less" scoped>
	@import '../../../assets/css/managerservice.less';
</style>
<style lang="less">
	.serviceManagerPage{
		.el-button+.el-button{
			margin-left: 6px;
		}
	}
	.service-set {
		.el-tabs__header {
			border-bottom: none !important;
			margin-bottom: -2px !important;
			.el-tabs__nav-wrap {
				margin-bottom: 1px;
				.el-tabs__nav {
					margin-left: 170px !important;
					border-radius: 4px;
					border: 1px solid #d1dbe5;
					.el-tabs__item {
						border-radius: 0 !important;
						border: none !important;
						&.is-active {
							color: #fff;
							background: #20a0ff;
							border-radius: 0 !important;
							border: none !important;
						}
					}
				}
			}
		}
		.el-tabs__content {
			border-top: 1px solid #d1dbe5;
			overflow: auto !important;
		}
		.el-input__inner {
			font-size: 12px !important;
			padding-right: 20px;
		}
		legend {
			font-size: 14px;
		}
	}
</style>
