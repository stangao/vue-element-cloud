/** * Created by 军标 on 2017-9-11 */
<template>
		<section class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>集群列表</el-breadcrumb-item>
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
						<el-button size="small" @click="toCheckServer(scope.$index, scope.row)">查看服务</el-button>
						<el-button size="small" @click="toWorkBanch(scope.$index, scope.row)">交互工作台</el-button>
						<el-button size="small" @click="toBuyService(scope.$index, scope.row)">购买服务</el-button>
						<el-button size="small" @click="handleLook(scope.$index, scope.row)">集群计费</el-button>
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
						{{editForm.project_name}}
						<!-- <el-input v-model="editForm.project_name" auto-complete="off"></el-input> --><!--集群名称暂时时不能修改-->
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

			<!--计费详情-->
			<el-dialog title="计费详情" v-model="LookFormDetail" :close-on-click-modal="false">
				<div class="billDetailBox" v-for="item in billData">
					<div class="commom-listP">
						<label for="">{{item.service_name}}:</label>
						<span>创建时间 {{item.create_time}}</span>
					</div>
					<div class="commom-listP">
						<label for="">{{item.service_name}}:</label>
						<span>累计费用{{item.billing}}元</span>
					</div>
				</div>
				<div class="commom-listP dialog-center">
					<label for="">{{detailProjectName}}:</label>
					<span>累计费用{{clusterTitleBill}}元</span>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="LookFormDetail = false">返回</el-button>
				</div>
			</el-dialog>

		</section>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'

	export default {
		computed: {
			...mapGetters({
				getManagerClusterList: 'getManagerClusterList',
				getChangegroupstatus: 'getChangegroupstatus',
				getClustTypeList: 'getClustTypeList',
				getBillDetail: 'getBillDetail'
			})
		},
		data() {
			return {
				title: '集群管理',
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
				editLoading: false
			}
		},
		methods: {
			handleDelete(index, row) {
				console.log(index, row);
			},
			//显示编辑界面
			handleEdit(index, row) {
				console.log(index, row.cluster_type);
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
      //查看服务
      toCheckServer(index, row){
				// alert(JSON.stringify(row))
        var url = '/managerService?'+"project_id="+row.project_id;
				this.$router.push(url)
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
				}).catch((err) => {
					console.log(err)
				})

			},
			handleLook(index, row) {

				let APIloading = this.$loading({ fullscreen: true })
				let params = {
					project_id: row.project_id
				}
				this.requestBillDetail(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					//  this.tableData = data.projects
					console.log(111,data)
					this.clusterTitleBill = data.object.sum_billing
					let detailDate = data.object.svc_billing || []//如果返回值为空，则赋值为空数组，避免代码报错
					detailDate.forEach((e)=>{
						e.create_time = Utils.dateCut(e.create_time)
					})

					this.billData = detailDate

					this.detailProjectName = row.project_name

				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
				})
				this.LookFormDetail = true;
			},
			...mapActions([
				'requestManagerClusterList',
				'requestClusterConfigList',
				'requestChangegroup',
				'requestBillDetail'
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

			this.requestClusterConfigList({}).then((data) => {
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
	@import '../../assets/css/managercluster.less';
</style>
