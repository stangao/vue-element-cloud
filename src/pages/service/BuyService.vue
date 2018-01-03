/** * Created by 军标 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<p class="common-title">集群名称:{{getGroupName}}</p>
			<div class="group1">
				<div class="groupContainer1">
					<fieldset>
						<legend>请选择您要购买的服务</legend>
						<div class="contentContainer">
							<div class="buyItem" v-for="(serviceGroup,index) in buyList" :key="index">
								<el-checkbox-group v-model="serviceGroup.value" @change="groupChange(serviceGroup.value,serviceGroup.keys,serviceGroup.associated)">
                    <el-checkbox class="checkbox" v-for="(item,index) in serviceGroup.label" :label="item"  :key="index">{{item}}</el-checkbox>
                </el-checkbox-group>
							</div>
						</div>
					</fieldset>
				</div>
				<div class="groupContainer2">
					<fieldset>
						<legend>已经共享的服务</legend>
						<div class="contentContainer">
							<div class="shareItem" v-for="service in shares">
								{{service}}
								<br/>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="group2">
				<br>
				<p class="common-p">每个集群每种服务只能有一个</p>
				<p class="common-p">注意：服务有关联性,如：Kafka需要zookeeper,如果没有共享的zookeeper服务，选择Kafka后要提示用户选择zookeeper</p>
				<el-button type="primary" @click="btnBuy" class="btn">下一步</el-button>
			</div>
		</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import Utils from '../../common/utils'

	export default {
		computed: {
			...
			mapGetters({
				getGroupName: 'getGroupName',
				getGroupId: 'getGroupId',
				getServerList: 'getServerList',
				getAlsoServerList: 'getAlsoServerList',
				getServerObj: 'getServerObj'
			})
		},
		data() {
			return {
				title: "选择购买服务",
				checked: [],
				buyList: [],
				shares: [],
				urlProjectId: '',
				buyServiceList: {},
				isIndeterminate: true,
			}
		},
		methods: {
			btnBuy() {
				let params = this.buyServiceList
				let isJudgeAssociated = this.judgeAssociated()
				// let isJudgeAssociated = false

				if(isJudgeAssociated == false){//判断依赖关系调用
					this.requestServerObj(params)
					// console.log("create")
					if(this.urlProjectId){
						let url = '/configService?project_id='+this.urlProjectId;
						this.$router.push(url);
					}else{
						let url = '/configService';
						this.$router.push(url);
					}
				}
			},
			groupChange(itemArry,keys,associatedArry){
	      if(itemArry.length>1){
	      	itemArry.splice(0,1);
	      }
				this.getServerList.forEach((item)=>{
					item.label.forEach((e,index)=>{
						if(e == itemArry[0]){
							// this.buyServiceList[keys] = itemArry[0]
							this.buyServiceList[keys] = item.serviceId[index]
						}
					})
				})
				if(itemArry.length == 0){//取消选中，清空对应key值
					this.buyServiceList[keys] = null
				}
				this.judgeAssociated()//判断依赖关系调用
			},
			judgeAssociated(){//判断依赖关系函数
				//判断依赖关系
				let isHasAssociate = false //依赖开关逻辑
				this.getServerList.forEach((e)=>{
					e.associated.forEach((ass)=>{
						if(ass.associatedArry){
							for(let em in this.buyServiceList){
								if(this.buyServiceList[em] == ass.serviceBaseUuid){
									ass.associatedArry.forEach((assItem,index)=>{
										let associateNum = 1//依赖开关数字
										for(let list in this.buyServiceList){
											if(this.buyServiceList[list] == assItem){
												associateNum = associateNum*0
											}else{
												associateNum = associateNum*1
											}
										}
										if(!associateNum && !isHasAssociate){
											isHasAssociate = true
											let tipStr = ass.key + "需要要依赖服务" + ass.associatedName[index] +"，只能选择其中一个服务"
											this.$alert(tipStr, '服务依赖提示', {
							          confirmButtonText: '确定',
							          callback: action => {
							          }
							        });
											return false
										}

									})
								}
							}

						}
					})
				})
				return isHasAssociate//当判断都通过时，依赖关系变成false
			},
			...mapActions([
				'requestGroupName',
				'requestGroupId',
				'requestServerConfigList',
				'requestServerObj'
			]),
		},
		mounted() {
			this.urlProjectId = this.$route.query.project_id;//如果url有则取url的project_id
			let APIloading = this.$loading({ fullscreen: true })//接口loading
			let params = {
				userId: localStorage.getItem("userId"),
				// projectId: this.getGroupId||'abae566e-fddb-4000-a518-027f817f7b9e'
				projectId: this.urlProjectId || this.getGroupId
			}
			this.requestServerConfigList(params).then((data) => {
				APIloading.close();//接口返回loading关闭
				this.shares = this.getAlsoServerList
				this.buyList = this.getServerList
				this.getServerList.forEach((e)=>{
					let key = e.keys
					this.buyServiceList[key] = null
				})
			}, (e)=> {
				APIloading.close();//接口返回loading关闭
				this.$message.error(e);
			}).catch((err) => {
				APIloading.close();//接口返回loading关闭
				this.$message.error(err);
			})

			console.log(this.buyList);

		}

	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/buyservice.less';
</style>
<style lang="less">
	.buyItem {
	  .el-checkbox-group{
	    width: 100%;
      .el-checkbox{
        width: 45%;
				margin-bottom: 10px;
      }
	  }
	}
</style>
