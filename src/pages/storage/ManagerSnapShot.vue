/** * Created by 军标 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>快照列表</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-table :data="tableData" border height="350" style="width: 100%">
				<el-table-column label="快照名称" prop="pvcs_snapshot_name" sortable width="130">
					<template scope="scope">
						{{ scope.row.pvcs_snapshot_name }}
					</template>
				</el-table-column>
				<el-table-column label="大小" prop="snapshot_size" width="130">
					<template scope="scope">
						{{ scope.row.snapshot_size }}
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="create_time" width="100">
					<template scope="scope">
						{{ scope.row.create_time }}
					</template>
				</el-table-column>
				<el-table-column label="备注" prop="comments" width="120">
					<template scope="scope">
						{{ scope.row.comments }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="small" @click="handleRestore(scope.$index, scope.row)">恢复数据</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="common-bottom">
				<el-button type="primary" @click="backToManager">返回存储列表</el-button>
			</div>

		</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'
	export default {
		computed: {
			...mapGetters({
				getSnapShotList: 'getSnapShotList',
				getSnapShotDelete: 'getSnapShotDelete',
				getSnapShotRestore: 'getSnapShotRestore',
				getSnapShotStatus: 'getSnapShotStatus'
			})
		},
		data() {
			return {
				title: '管理快照',
				tableData: [],
				urlPvcUuid: '',//url获取pvc_uuid
				stayTime: 0,//删除查询状态时间
				editLoading: false
			}
		},
		methods: {
			//删除快照
			handleDelete(index, row) {
				this.$confirm('您是否确定要删除快照?', '提示', {
						type: 'warning'
					})
					.then(() => {
						let params = {
							pvc_uuid : row.pvc_uuid,
							pvcs_snapshot_uuid: row.pvcs_snapshot_uuid
						}
						let APIloading = this.$loading({ fullscreen: true })
						this.requestSnapShotDelete(params).then((data) => {
							APIloading.close();//接口返回loading关闭
							let statusParams = {
								"pvc_uuid": row.pvc_uuid,
								"pvcs_snapshot_uuid": row.pvcs_snapshot_uuid,
								"action": 'delete'
							}
							this.checkStatus(statusParams);
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
			},
			//恢复数据
			handleRestore(index, row) {
				this.$confirm('您是否确定要恢复数据?', '提示', {
						type: 'warning'
					})
					.then(() => {
						let params = {
							pvc_uuid : row.pvc_uuid,
							pvcs_snapshot_uuid: row.pvcs_snapshot_uuid
						}
						let APIloading = this.$loading({ fullscreen: true })
						this.requestSnapShotRestore(params).then((data) => {
							APIloading.close();//接口返回loading关闭
							let statusParams = {
								"pvc_uuid": row.pvc_uuid,
								"pvcs_snapshot_uuid": row.pvcs_snapshot_uuid,
								"action": 'restore'
							}
							this.checkStatus(statusParams);
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
			},

			checkStatus(statusParams){
				const loading = this.$loading({
					lock: true,
					text: '正在恢复数据中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				var queryStatus = null
				var statusStr,messageText
				if(statusParams.action == "delete"){
					statusStr = "deleted"
					messageText = "恭喜你，删除快照成功"
				}else if(statusParams.action == "restore"){
					statusStr = "restored"
					messageText = "恭喜你，恢复数据成功"
				}
				this.requestSnapShotStatus(statusParams).then((statusData) => {//查询创建快照状态
					console.log(this.stayTime)
					if(statusData.status == statusStr){
						clearInterval(queryStatus)
						loading.close();
						this.stayTime = 0//停留时间清零
						this.$message({
							message: messageText,
							type: 'success'
						});
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
			backToManager(){
				var url = '/managerStorage'
				this.$router.push(url);
			},
			...mapActions([
				'requestSnapShotList',
				'requestSnapShotDelete',
				'requestSnapShotRestore',
				'requestSnapShotStatus'
			]),
		},
		mounted() {
			this.urlPvcUuid = this.$route.query.pvc_uuid || 'b5d0ac11-991e-11e7-a1ba-ecf4bbe2f144'//如果url有则取url的project_id
			let params = {
				"pvc_uuid": this.urlPvcUuid,
			}
			let APIloading = this.$loading({ fullscreen: true })
			this.requestSnapShotList(params).then((data) => {
				APIloading.close();//接口返回loading关闭
				//  this.tableData = data.projects
				data.object.forEach(function(item) {
					item.create_time = Utils.dateCut(item.create_time)
					item.status = Utils.statusToChina(item.status)
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
	@import '../../assets/css/managerSnapShot.less';
</style>
