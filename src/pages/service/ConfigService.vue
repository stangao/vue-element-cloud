/** * Created by 军标 on 2017-9-22. */
<template lang="html">
		<div class="configServicePage pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>服务资源种类</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="headText">选择服务资源的种类</div>
			<div class="headBtn">
				<el-button type="primary" @click="queryCurrentservices" class="btn">查看当前服务地址</el-button>
			</div>
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="测试环境" name="test">
					<div class="common-flex-area">
						<el-row type="flex" class="row-bg" justify="space-around">
							<el-col :span="14">
								<fieldset v-for="item in configServerListTest" :key="item.service_name">
									<legend>{{item.service_name}}服务</legend>
									<div class="contentContainer">
										<div v-if="(item.storage_type === 'shared')&& item.storage" class="config-right">
											<p>服务共享一个DNS存储</p>
											<el-select v-model="item.storage.realValue" placeholder="请选择" class="small-select" @change="changeSelectSharedTest(item.service_name,item.storage_type,item.storage.realValue)">
												<el-option v-for="itemOption in item.storage.valueArrays" :key="itemOption.value" :label="itemOption.label" :value="itemOption.value">
												</el-option>
											</el-select>
										</div>
										<div class="config-left">
											<!-- <label for="">{{item.modules}}</label> -->
											<div v-for="(itemModules,key) in item.modules" class="config-area" :key="key">
												<!-- <label for="">123123{{itemModules}}</label> -->
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
										<div class="config-area" v-if="item.shared_modules">
											<div class="config-singel" v-for="(sharedArray,index) in item.shared_modules" :key="index">
													<label for="">{{sharedArray.name}}</label>
													<el-input v-if="sharedArray.display_box =='input'" v-model="zoopkeeperInput" placeholder="请输入内容" @change="changeInputTest(sharedArray.name,zoopkeeperInput)"></el-input>
											</div>
										</div>
										<div class="config-bottom">
											<label for="">费用</label>{{item.service_price}}元/{{timeUnit}}
										</div>
									</div>
								</fieldset>


							</el-col>
              <el-col :span="1"></el-col>
							<el-col :span="9">
								<fieldset>
									<legend>共享服务列表</legend>
									<div class="contentContainer">
										<ul v-for="item in shareObjTest" :key="item.service_name">
											<li><label for="">{{item.service_name}}所在集群：</label><span>{{item.project_name}}</span></li>
											<li><label for="">{{item.service_name}}地址：</label>
												<span v-for="addrArray in item.addr_array" :key="addrArray.addr">
													{{addrArray.addr}};&nbsp;&nbsp;
												</span>
											</li>
										</ul>
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
					<div class="">
						<el-button type="primary" @click="createTestConfig" class="btn">生成服务</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="正式环境" name="product">
					<div class="common-flex-area">
						<el-row type="flex" class="row-bg" justify="space-around">
							<el-col :span="14">
								<fieldset v-for="item in configServerList">
									<legend>{{item.service_name}}服务</legend>
									<div class="contentContainer">
										<div v-if="item.storage_type =='shared' && item.storage" class="config-right">
                      <p>服务共享一个DNS存储</p>
											<el-select v-model="item.storage.realValue" placeholder="请选择" class="small-select" >
												<el-option v-for="itemOption in item.storage.valueArrays" :key="itemOption.value" :label="itemOption.label" :value="itemOption.value" @change="changeSelectSharedProd(item.service_name,item.storage_type,item.storage.realValue)">
												</el-option>
											</el-select>
										</div>
										<div class="config-left">
											<!-- <label for="">{{item.modules}}</label> -->
											<div v-for="(itemModules,key,index) in item.modules" class="config-area" :key="key">
												<!-- <label for="">123123{{itemModules}}</label> -->
												<label for="">{{key}}</label>
                        <span class="" v-for="itemModulesArray in itemModules" :key="itemModulesArray.value">
                          <el-select v-model="itemModulesArray.realValue" placeholder="请选择" class="small-select" @change="changeSelectProd(key,index,itemModulesArray.realValue)">
  													<el-option v-for="item in itemModulesArray.valueArrays" :key="item.value" :label="item.label" :value="item.value">
  													</el-option>
  												</el-select>
                          <label for="" v-if="itemModulesArray.name==='replicas'">每节点：</label>
                        </span>
											</div>
										</div>
										<div class="config-area" v-if="item.shared_modules">
											<div class="config-singel" v-for="(sharedArray,index) in item.shared_modules" :key="index">
													<label for="">{{sharedArray.name}}</label>
													<el-input v-if="sharedArray.display_box =='input'" v-model="zoopkeeperInput" placeholder="请输入内容" @change="changeInputProd(sharedArray.name,zoopkeeperInput)"></el-input>
											</div>
										</div>
										<div class="config-bottom">
											<label for="">费用</label>{{4* cpuPrice}}元/{{timeUnit}}
										</div>
									</div>
								</fieldset>


							</el-col>
              <el-col :span="1"></el-col>
							<el-col :span="9">
								<fieldset>
									<legend>共享服务列表</legend>
									<div class="contentContainer">
										<ul v-for="item in shareObj" :key="item.service_name">
											<li><label for="">{{item.service_name}}所在集群：</label><span>{{item.project_name}}</span></li>
											<li><label for="">{{item.service_name}}地址：</label>
												<span v-for="addrArray in item.addr_array" :key="addrArray.addr">
													{{addrArray.addr}};&nbsp;&nbsp;
												</span>
											</li>
										</ul>
									</div>
								</fieldset>
							</el-col>

						</el-row>
						<div class="common-p">
							单位费用：cpu 1{{timeUnit}}/1核 {{cpuPrice}}元，内存 1{{timeUnit}}/1GB {{memoryPrice}}元 存储 1{{timeUnit}}/1GB {{storageBlockPrice}}元
						</div>
						<div class="common-p">
							注意：服务只是停止并没有删除，因为要保留数据所以存储需要按时间单位一直计费。
						</div>
					</div>
					<div class="">
						<el-button type="primary" @click="createProdConfig" class="btn">生成服务</el-button>
					</div>
				</el-tab-pane>

			</el-tabs>

			<!--依赖服务弹出界面-->
			<el-dialog title="查询到当前项目服务地址：" v-model="editFormVisible" :close-on-click-modal="false">
				<div class="current-box" v-for="item in this.getCurrentServices" :key="item.service_name">
					<h3>{{item.service_name}}</h3>
					<ul>
						<li v-for="addrItem in item.addr_array" :key="addrItem.addr">{{addrItem.addr}}</li>
					</ul>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">关闭</el-button>
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
				getConfigData: 'getConfigData',
				getGroupName: 'getGroupName',
				getGroupId: 'getGroupId',
				getSharedServices: 'getSharedServices',
				getConfigList: 'getConfigList',
				getServerObj: 'getServerObj',
				getCreateService: 'getCreateService',
				getServiceStatus: 'getServiceStatus',
				getCurrentServices: 'getCurrentServices'
			})
		},
		data() {
			return {
				title: "服务资源设置",
				checked: [],
				// buys: buyServices,
				radio: '测试环境',
				activeName2: 'test',
        shareObjTest: [],
				configTestData: {},//测试环境接口原始数据
				configProdData: {},//正式环境接口原始数据
				shareObj: [],
				serviceConfig: [],
				unitPriceTest: 0,//测试环境服务项目单元价格
				timeUnit: '', //时间单位
				cpuPrice: '0', //cpu价格
				memoryPrice: '0', //内存价格
				storageBlockPrice: '0', //硬盘价格
				storageNfsPrice: '0', //nfs价格
				configServerListTest: [], //总数据数组测试环境
				serverNameTest:[],//测试服务名称
        configServerList: [], //总数据数组正式环境
				serverName:[],//正式服务名称
				valueSpCPU: '1核CPU',
				zoopkeeperInput: '',
				urlProjectId: '',
				stayTime: [],//查询时间数组
				editFormVisible: false//

			}
		},
		mounted() {
			let serviceArry = []
			let serviceBaseId = ''
			for(let item in this.getServerObj){
				if(this.getServerObj[item]){
					serviceArry.push(this.getServerObj[item])
				}
			}
			serviceBaseId = serviceArry.join(",")
			this.urlProjectId = this.$route.query.project_id;//如果url有则取url的project_id


			let params = {//默认显示测试环境
				// project_id: 'f6ddb229-c6ef-4da5-a1ae-f68b6955564a',
				project_id: this.urlProjectId || this.getGroupId,//正式环境使用
				service_base_uuid: serviceBaseId,//正式环境使用
				// service_base_uuid: '27261fd0-a823-443f-8b8c-738d2650fa8c,0227395c-acc4-406b-a0c5-97a02c2ca5a5,f7e9ccd9-6ec3-4f92-a08a-8e4d5aa935c5,1c2f3c43-cfe2-4c00-b356-c8ccd67e06fe',
				env: 'test'
			}
			this.init(params);

		},
		methods: {
			init(params) {
				let APIloading = this.$loading({ fullscreen: true })
				this.requestConfigServerList(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					if(params.env == 'test'){
						this.configTestData =	this.getConfigData
					}else if(params.env == 'prod'){
						this.configProdData =	this.getConfigData
					}
					// for(var name in data){
					//     this.configTestData[name] = data[name];
					// }
					console.log(111000,this.configTestData)

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

						if(params.env && params.env === "test"){
							this.configServerListTest = data.configs;
			        // this.configServerList = data.configs;
			        console.log('----------',this.configServerListTest)
							this.configServerListTest.forEach((e,index)=>{
								this.serverNameTest[index] = e.service_name//服务名称保存，供服务状态查询使用
							})
			        // this.serverNameTest

							this.shareObjTest = data.shared_services;
			        // this.shareObj = data.shared_services;
						}else{
							// this.configServerListTest = data.configs;
			        this.configServerList = data.configs;
							this.configServerList.forEach((e,index)=>{
								this.serverName[index] = e.service_name//服务名称保存，供服务状态查询使用
							})
							// this.shareObjTest = data.shared_services;
			        this.shareObj = data.shared_services;
						}
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
			createTestConfig() {

				console.log(this.configTestData)
				let params = {
					"if_immediate": true,
					"env": "test"
				}
				params.services = this.configTestData.configs
				this.createService(params)

			},
			createProdConfig() {
				console.log(this.configProdData)
				let params = {
					"if_immediate": true,
					"env": "prod"
				}
				params.services = this.configProdData.configs
				this.createService(params)
			},
			createService(data){
				let params = data
				for(let item in params){
					if(item == "services"){
						params[item].forEach(e=> {
							for(let modobj in e){
								if(modobj == "shared_modules"){
									for(let nameser in e[modobj]){
										console.log(e[modobj][nameser].service_addr)
										if(e[modobj][nameser].service_addr){
											console.log("also input value")
										}else{
											e[modobj][nameser].service_addr = ""
										}
										delete e[modobj][nameser].display_box//删除display_box属性
										delete e[modobj][nameser].name//删除name属性
									}
								}
							}
						})
					}
				}
				let APIloading = this.$loading({ fullscreen: true })//接口loading
				this.requestCreateService(JSON.stringify(params)).then((data) => {
					APIloading.close();//接口返回loading关闭
					console.log(data)
					let serviceUuidArry = data.service_uuids//接口返回数组service_uuids赋值
					this.stayTime.splice(0,this.stayTime.length)//清空数组
					serviceUuidArry.forEach((e,index)=>{
						this.stayTime[index] = 0

						this.checkStatus(e,index,params.env)//调用查询接口
					})
					// if(data.ret_code == "200"){
					// 	var url = '/managerCluster';
					// 	this.$router.push(url);
					// }
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			checkStatus(ServiceUuid,indexNum,evn){
				const loading = this.$loading({
					lock: true,
					text: '正在创建服务中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				var queryStatus = null
				let statusParams = {
					"service_uuid" : ServiceUuid
				}
				this.requestServiceStatus(statusParams).then((statusData) => {//查询创建快照状态
					console.log(this.stayTime[indexNum])
					if(statusData.status == "Running"){
						clearInterval(queryStatus)
						loading.close();
						this.stayTime[indexNum] = 0//停留时间清零
						this.init();//刷新页面数据
						this.$message({
							showClose: true,
							message: '恭喜你，创建服务成功！',
							type: 'success'
						});
						if(data.ret_code == "200"){
							var url = '/managerCluster';
							this.$router.push(url);
						}
					}else if(this.stayTime[indexNum] <= 20){//两秒请求一次，默认最多请求40秒
						clearInterval(queryStatus)
						queryStatus = setTimeout(()=>{
							this.stayTime[indexNum]++
							console.log(this.stayTime[indexNum])
							this.checkStatus(ServiceUuid,indexNum,evn);
						},2000)
					}else{
						clearInterval(queryStatus)
						this.stayTime[indexNum] = 0//停留时间清零
						loading.close();
						let errMessage = []
						if(evn = "test"){
							errMessage = this.serverNameTest
						}else{
							errMessage = this.serverName
						}
						this.$message({
			          message: '很抱歉，创建'+errMessage[indexNum]+'服务失败',
								duration: 10000,
								showClose: true,
			          type: 'error'
			        });
					}

				}, (e)=> {
					loading.close();
					this.$message.error(e);
				}).catch((err) => {
					loading.close();
					this.$message.error(err);
				})
			},
			changeSelectSharedTest(serviceName,storageType,realValue){
				console.log(serviceName)
				console.log(storageType)
				console.log(realValue)
				for(let item in this.configTestData){//创建接口post值修改
					if(item == "configs"){
						this.configTestData[item].forEach(e=> {
							if((e.storage_type == storageType) &&  (e.service_name == serviceName)){
								e.storage.value = parseInt(realValue)
							}
						})
					}
				}
				this.countPriceTest()//修改测试环境单元价格
			},
			changeSelectTest(key,zIndex,value){
				console.log(key)
				console.log(zIndex)
				console.log(value)
				for(let item in this.configTestData){
					if(item == "configs"){
						this.configTestData[item].forEach(e=> {
							for(let modobj in e){
								if(modobj == "modules"){
									for(let nameser in e[modobj]){
										if(nameser == key){
											e[modobj][nameser][zIndex].value = parseInt(value)
										}
									}

								}
							}
						})
					}
				}
				console.log(this.configTestData)
				this.countPriceTest()//修改测试环境单元价格
			},
			changeInputTest(name,value) {
				console.log(name)
				console.log(value)
				for(let item in this.configTestData){
					if(item == "configs"){
						this.configTestData[item].forEach(e=> {
							for(let modobj in e){
								if(modobj == "shared_modules"){
									for(let nameser in e[modobj]){
										e[modobj][nameser].service_addr = value//添加service_addr属性
										delete e[modobj][nameser].display_box//删除display_box属性
										delete e[modobj][nameser].name//删除name属性
									}
								}
							}
						})
					}
				}
				console.log(this.configTestData)
			},
			countPriceTest(){
				this.configServerListTest.forEach((item)=>{
          let titalPrice = 0 // 计算初始价格变量
          if((item.storage_type == "shared") && item.storage){
            let resetSharedStorage = item.storage
            titalPrice = titalPrice + parseInt(parseInt(resetSharedStorage.realValue)*this.storageBlockPrice)//公用存储价格计算
          }
          let modulesObj = item.modules;
          for(let items in modulesObj){
            let serviceArray = modulesObj[items]
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
          item.service_price = titalPrice //设置服务默认价格为
        })
			},
			changeSelectSharedProd(serviceName,storageType,realValue){
				console.log(serviceName)
				console.log(storageType)
				console.log(realValue)
				for(let item in this.configProdData){
					if(item == "configs"){
						this.configProdData[item].forEach(e=> {
							if((e.storage_type == storageType) &&  (e.service_name == serviceName)){
								e.storage.value = parseInt(realValue)
							}
						})
					}
				}
				this.countPriceProd();//修改正式环境单元价格
			},
			changeSelectProd(key,zIndex,value){
				console.log(key)
				console.log(zIndex)
				console.log(value)
				for(let item in this.configProdData){
					if(item == "configs"){
						this.configProdData[item].forEach(e=> {
							for(let modobj in e){
								if(modobj == "modules"){
									for(let nameser in e[modobj]){
										if(nameser == key){
											e[modobj][nameser][zIndex].value = parseInt(value)
										}
									}

								}
							}
						})
					}
				}
				console.log(this.configProdData)
				this.countPriceProd();//修改正式环境单元价格
			},
			changeInputProd(name,value) {
				console.log(name)
				console.log(value)
				for(let item in this.configProdData){
					if(item == "configs"){
						this.configProdData[item].forEach(e=> {
							for(let modobj in e){
								if(modobj == "shared_modules"){
									for(let nameser in e[modobj]){
										e[modobj][nameser].service_addr = value//添加service_addr属性
										delete e[modobj][nameser].display_box//删除display_box属性
										delete e[modobj][nameser].name//删除name属性
									}
								}
							}
						})
					}
				}
				console.log(this.configProdData)
			},
			countPriceProd(){
				this.configServerList.forEach((item)=>{
          let titalPrice = 0 // 计算初始价格变量
          if((item.storage_type == "shared") && item.storage){
            let resetSharedStorage = item.storage
            titalPrice = titalPrice + parseInt(parseInt(resetSharedStorage.realValue)*this.storageBlockPrice)//公用存储价格计算
          }
          let modulesObj = item.modules;
          for(let items in modulesObj){
            let serviceArray = modulesObj[items]
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
          item.service_price = titalPrice //设置服务默认价格为
        })
			},
			handleClick(tab, event) {
				// alert(tab)
				if(tab.name === "product"){//正式环境
					let serviceArry = []
					let serviceBaseId = ''
					for(let item in this.getServerObj){
						if(this.getServerObj[item]){
							serviceArry.push(this.getServerObj[item])
						}
					}
					serviceBaseId = serviceArry.join(",")
					this.urlProjectId = this.$route.query.project_id;//如果url有则取url的project_id
					let params = {//默认显示测试环境
						// project_id: 'f6ddb229-c6ef-4da5-a1ae-f68b6955564a',
						project_id: this.urlProjectId || this.getGroupId,//正式环境使用
						// service_base_uuid: '27261fd0-a823-443f-8b8c-738d2650fa8c,0227395c-acc4-406b-a0c5-97a02c2ca5a5,f7e9ccd9-6ec3-4f92-a08a-8e4d5aa935c5,1c2f3c43-cfe2-4c00-b356-c8ccd67e06fe',
						service_base_uuid: serviceBaseId,//正式环境使用
						env: 'prod'
					}
					this.init(params);
				}
				console.log(tab);
			},
			queryCurrentservices(){//获取当前项目服务地址:
				let APIloading = this.$loading({ fullscreen: true })//接口loading
				this.requestCurrentServices({}).then((data) => {
					APIloading.close();//接口返回loading关闭
					this.editFormVisible = true
					console.log(data)
				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
			},
			...mapActions([
				'requestConfigServerList',
				'requestCreateService',
				'requestServiceStatus',
				'requestCurrentServices'
			])
		}
	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/configservice.less';
</style>
<style lang="less">
	.configServicePage {
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
