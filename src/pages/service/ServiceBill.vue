/** * Created by 乃波 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>Spark服务详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="plugins-tips">
				<div class="block">
					<span class="demonstration">选择月份：</span>
					<el-date-picker v-model="dateValue" type="month" placeholder="选择月" @change="choiceDate">
					</el-date-picker>
					<div class="demonstration">
						本月服务累计使用：
						<span>cpu {{month_cost.total_cpu}},</span>
						<span>内存 {{month_cost.total_memory}},</span>
						<span>存储 {{month_cost.total_storage}}</span>
					</div>
				</div>
			</div>
			<el-table :data="tableData" border height="350" style="width: 100%">
				<el-table-column label="服务模块名称" prop="instance_name" sortable width="160">
					<template scope="scope">
						{{ scope.row.instance_name }}
					</template>
				</el-table-column>
				<el-table-column label="开始时间" prop="start_time" sortable width="120">
					<template scope="scope">
						{{ scope.row.start_time }}
					</template>
				</el-table-column>
				<el-table-column label="停止时间" prop="end_time" sortable width="120">
					<template scope="scope">
						{{ scope.row.end_time }}
					</template>
				</el-table-column>
				<el-table-column label="运行时间(分钟)" prop="run_time" width="100">
					<template scope="scope">
						{{ scope.row.run_time }}
					</template>
				</el-table-column>
				<el-table-column label="CPU(核)" prop="cpu" width="100">
					<template scope="scope">
						{{ scope.row.cpu }}
					</template>
				</el-table-column>
				<el-table-column label="内存(MB)" prop="memory" width="100">
					<template scope="scope">
						{{ scope.row.memory }}
					</template>
				</el-table-column>
				<el-table-column label="存储(GB)" prop="storage" width="100">
					<template scope="scope">
						{{ scope.row.storage }}
					</template>
				</el-table-column>
				<el-table-column label="存储类型" prop="storage_mode" width="100">
					<template scope="scope">
						{{ scope.row.storage_type }}
					</template>
				</el-table-column>
				<el-table-column label="存储使用方式" prop="storage_type">
					<template scope="scope">
						{{ scope.row.storage_mode }}
					</template>
				</el-table-column>
			</el-table>

			<div v-show="!listLoading" class="pagination-container">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="pageSizes" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>

			<div class="common-area">
				<p>
					<label for="">此服务累计使用：</label>
					<span>cpu {{accumulate_cost.total_cpu}},</span>
					<span>内存 {{accumulate_cost.total_memory}},</span>
					<span>存储 {{accumulate_cost.total_storage}}</span>
				</p>
				<p>
					<label for="">此服务费用累计：</label>
					<span>{{accumulate_cost.total_cost}}元</span>
				</p>
				<p>
					<label for="">单位费用：</label>
					<span>cpu 1{{timeUnit}}/1核 {{cpuPrice}}元，内存 1{{timeUnit}}/1GB {{memoryPrice}}元 存储 1{{timeUnit}}/1GB {{storageBlockPrice}}元 节点 1{{timeUnit}}/1节点 {{storageNfsPrice}}元
</span>
				</p>
				<p>
					<label for="">注意：</label>
					<span>服务只是停止没有删除，因为要保留数据所以存储需要按时间单位一直计费</span>
				</p>
			</div>
		</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'

	export default {
		computed: {
			...mapGetters({
				getServiceDetail: 'getServiceDetail'
			})
		},
		data() {
			return {
				title: "服务使用详情",
				tableData: [],
				dateValue: new Date(),//日历选择值
				limitValue: 1,
				offsetValue: 1,
				urlServiceUuid: '',
				detailData: {},//接口返回数据
				modulesList: [],//接口返回modules数据
				accumulate_cost:{},//接口返回history_cost数据accumulate_cost
				month_cost:{},//接口返回history_cost数据month_cost
				cpuPrice: '0', //cpu价格
				memoryPrice: '0', //内存价格
				storageBlockPrice: '0', //硬盘价格
				storageNfsPrice: '0', //nfs价格
				timeUnit: '分钟',//单位暂时写死
				listLoading: false,
				list: null,
				total: null,
				pageSizes:[1,2,3,4],
				listQuery: {
					page: 1,
					limit: 20,
					importance: undefined,
					title: undefined,
					type: undefined,
					sort: '+id'
				}

			}
		},
		created() {
			this.getList()
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.urlServiceUuid = this.$route.query.service_uuid || '91a62eb7-09bc-480f-a946-c08cf95fdb5a';//如果url有则取url的project_id
				// ?year=2017&month=7&limit=20&offset=0&sort=instance_name
				let nowYear,nowMonth,nowLimit,nowOffset
				nowYear = new Date().getFullYear();
				nowMonth = new Date().getMonth() -1;
				this.dateValue = new Date(nowYear,nowMonth,1,0,0,0);//默认日期选择为上个月的查询时间
				console.log(this.dateValue)
				try{
					nowYear = this.dateValue.getFullYear();
					nowMonth = this.dateValue.getMonth() + 1;
					nowLimit = 1;
					nowOffset = 1;

					let APIloading = this.$loading({ fullscreen: true })

					let params = {
						service_uuid : this.urlServiceUuid,
						year: nowYear,
						month: nowMonth,
						limit: nowLimit,
						offset: nowOffset,
						sort: "instance_name"
					}
					this.requestServiceDetail(params).then((data) => {
						console.log(1111,data)
						this.detailData = JSON.parse(JSON.stringify(data));//深拷贝data数组
						this.modulesList = this.detailData.modules || []
						this.modulesList.forEach(e=>{
							e.status = Utils.statusToChina(e.status)
							e.start_time = Utils.dateCut(e.start_time)
							e.end_time = Utils.dateCut(e.end_time)
							e.storage_mode = Utils.modeToChina(e.storage_mode)
						})
						//接口获取各存储价格单位
						let dataUnitPrice = this.detailData.unit_price;
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
						//接口获取history_cost数据
						this.accumulate_cost = data.history_cost.accumulate_cost
						this.month_cost = data.history_cost.month_cost


						console.log(55555,this.historyCost)
						this.tableData = this.modulesList
						APIloading.close();//接口返回loading关闭
					}, (e)=> {
						APIloading.close();//接口返回loading关闭
						this.$message.error(e);
					}).catch((err) => {
						APIloading.close();//接口返回loading关闭
						this.$message.error(err);
					})
				}
				catch(e){
					this.$message({
	          showClose: true,
	          message: '请选择日期~'
	        });
				}


			},
			choiceDate() {
				this.init()
				// this.dateValue
			},
			getList() {
				this.total = 100;
				this.listLoading = false;

			},
			handleFilter() {
				this.listQuery.page = 1
				this.getList()
			},
			handleSizeChange(val) {
				this.listQuery.limit = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.page = val
				this.getList()
			},
			...mapActions([
				'requestServiceDetail'
			])
		}
	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/servicebill.less';
</style>
