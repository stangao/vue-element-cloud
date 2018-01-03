/** * Created by 乃波 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>我的存储列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-table :data="tableData" border height="350" style="width: 100%">
				<el-table-column label="存储名称" prop="pvc_name" sortable width="130">
					<template scope="scope">
						{{ scope.row.pvc_name }}
					</template>
				</el-table-column>
				<el-table-column label="存储类型" prop="storage_type" sortable width="114">
					<template scope="scope">
						{{ scope.row.storage_type }}
					</template>
				</el-table-column>
				<el-table-column label="集群名称" prop="project_name" sortable width="114">
					<template scope="scope">
						{{ scope.row.project_name }}
					</template>
				</el-table-column>
				<el-table-column label="服务名称" prop="service_name" width="100">
					<template scope="scope">
						{{ scope.row.service_name }}
					</template>
				</el-table-column>
				<el-table-column label="容量" prop="storage" sortable width="90">
					<template scope="scope">
						{{ scope.row.storage }}
					</template>
				</el-table-column>
				<el-table-column label="已使用量" prop="storage_usage" width="100">
					<template scope="scope">
						{{ scope.row.storage_usage }}
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="create_time" width="100">
					<template scope="scope">
						{{ scope.row.create_time }}
					</template>
				</el-table-column>
				<el-table-column label="上次恢复时间" prop="restore_time" width="100">
					<template scope="scope">
						{{ scope.row.restore_time }}
					</template>
				</el-table-column>
				<el-table-column label="使用时间(分钟)" prop="run_time" width="90">
					<template scope="scope">
						{{ scope.row.run_time }}
					</template>
				</el-table-column>
				<el-table-column label="状态" prop="status" width="80">
					<template scope="scope">
						{{ scope.row.status }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="creatSnapshot(scope.$index, scope.row)">创建快照</el-button>
						<el-button size="small" @click="manageSnapshot(scope.$index, scope.row)">管理快照</el-button>
						<!-- <el-button size="small" @click="toWorkBanch(scope.$index, scope.row)">交互工作台</el-button>
						<el-button size="small" @click="toBuyService(scope.$index, scope.row)">购买服务</el-button> -->
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
			<el-dialog title="创建快照" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" ref="editForm">
					<div class="common-title">
						快照详细情况包括完整备注和其它信息
					</div>
					<el-form-item label="快照名称" prop="project_name">
						<el-input v-model="snapshotName" placeholder="请输入快照名称"></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="project_name">
						<el-input v-model="snapshotRemark" placeholder="请输入快照备注"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
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
				getStorageList: 'getStorageList',
				getCreatSnapShot: 'getCreatSnapShot',
				getSnapShotStatus: 'getSnapShotStatus'
			})
		},
		data() {
			return {
				title: '存储管理',
				tableData: [],
				//编辑界面数据
				editForm: {
					pvc_uuid: '',
					pvc_name: '',
					project_name: '',
					storage: '',
					storage_unit: '',
					storage_type: '',
					create_time: '',
					restore_time: '',
					status: '',
					storage_usage: '',
					run_time: '',
					service_name: ''
				},
				stayTime: 0,//查询状态时间
				nowPvcUuid: '',//当前存储pvcuuid
				snapshotName: '',//快照名称
				snapshotRemark: '',//快照备注
				editFormVisible: false,
				editLoading: false
			}
		},
		methods: {
			//创建快照
			creatSnapshot(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.nowPvcUuid = row.pvc_uuid
				this.snapshotName = ''
				this.snapshotRemark = ''
			},
			//管理快照
			manageSnapshot(index, row) {
				let pvcUuid = row.pvc_uuid
				var url = '/managerSnapShot?pvc_uuid='+ pvcUuid
				this.$router.push(url);
			},
			editSubmit() { //创建快照保存
				let params = {
					"pvc_uuid": this.nowPvcUuid,
					"comments": this.snapshotRemark,
					"pvcs_snapshot_name": this.snapshotName
				}
				let APIloading = this.$loading({ fullscreen: true })
				this.requestCreatSnapShot(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					//  this.tableData = data.projects
					this.editFormVisible = false;
					let statusParams = {
						"pvc_uuid": this.nowPvcUuid,
						"pvcs_snapshot_uuid": data.snapshot_id,
						"action": 'create'
					}
					this.checkStatus(statusParams);

				}, (e)=> {
					APIloading.close();//接口返回loading关闭
					this.$message.error(e);
					this.$message({
	          message: '很抱歉，快照创建失败',
	          type: 'success'
	        });
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					this.$message.error(err);
					this.$message({
	          message: '很抱歉，快照创建失败',
	          type: 'success'
	        });
				})
			},
			checkStatus(statusParams){
				const loading = this.$loading({
					lock: true,
					text: '正在马不停蹄的创建快照中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				var queryStatus = null
				this.requestSnapShotStatus(statusParams).then((statusData) => {//查询创建快照状态
					console.log(this.stayTime)
					if(statusData.status == "Created"){
						clearInterval(queryStatus)
						loading.close();
						this.stayTime = 0//停留时间清零
						this.$message({
							message: '恭喜你，快照创建成功',
							type: 'success'
						});
						let pvcUuid = this.nowPvcUuid
						var url = '/managerSnapShot?pvc_uuid='+ pvcUuid
						this.$router.push(url);
					}else if(this.stayTime <= 15){//两秒请求一次，默认最多请求30秒
						clearInterval(queryStatus)
						queryStatus = setTimeout(()=>{
							this.stayTime++
							console.log(this.stayTime)
							this.checkStatus(statusParams);
						},2000)
					}else{
						clearInterval(queryStatus)
						this.stayTime = 0//停留时间清零
						loading.close();
						this.$message.error('很抱歉，快照创建失败');
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
				'requestStorageList',
				'requestCreatSnapShot',
				'requestSnapShotStatus'
			]),
		},
		mounted() {
			let APIloading = this.$loading({ fullscreen: true })
			this.requestStorageList().then((data) => {
				APIloading.close();//接口返回loading关闭
				//  this.tableData = data.projects
				data.object.forEach(function(item) {
					item.create_time = Utils.dateCut(item.create_time)
					item.restore_time = Utils.dateCut(item.restore_time)
					item.status = Utils.statusToChina(item.status)
					// projectsArry.push(item)
				})
				this.tableData = data.object;
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
	@import '../../assets/css/managerStorage.less';
</style>
