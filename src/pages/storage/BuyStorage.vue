/** * Created by 乃波 on 2017-9-21. */
<template lang="html">
		<div class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<!-- <el-breadcrumb-item>创建集群/项目</el-breadcrumb-item> -->
				</el-breadcrumb>
			</div>
			<div class="groupContainer">
				<fieldset>
					<legend>购买存储</legend>
					<div class="contentContainer">
						{{storageList.storage_name}}存储
						<!-- <el-select v-model="valueStore" placeholder="请选择" class="inline-input1">
							<el-option v-for="item in optionsStore" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
						<span class="prefixLabel">{{storageList.free_value}}GB(含)内免费</span>
						<br/>
						<br/>
						<br/> 购买时间
						<!-- <el-select v-model="valueDays" placeholder="请选择" class="inline-input2">
							<el-option v-for="item in optionsDays" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select> -->
						<el-input v-model="storageTime" value="number" placeholder="请输入购买天数" class="inline-input2"></el-input> &nbsp;&nbsp;天
						<span>0天是表示无限期使用</span>
						<!-- <span class="prefixLabel">计费共{{(storageTime*24*storageList.unit_price).toFixed(2)}}元</span> -->
						<span class="prefixLabel">  <el-checkbox v-model="autoAdd"  label="到期继续使用"  :disabled="isChecked"></el-checkbox></span>

						<br/>
						<el-button type="primary" @click="btnBuy" class="btn">购买</el-button>
						<span class="prefixLabel">每次费用{{storageList.unit_price}}{{storageList.unit_type}}</span>
					</div>
				</fieldset>
			</div>
		</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'

	export default {

		computed: {
			...
			mapGetters({
				getBuyStorageStore: 'getBuyStorageStore',
				getStoragePost: 'getStoragePost',
			})
		},
		watch: {
	    storageTime: function (val, oldVal) {
	      if(val == 0){
					this.isChecked = true
				}else{
					this.isChecked = false
				}
	    }
		},
		data() {
			return {
				title: "购买存储",
				storageList: {},
				storageTime: 0,
				autoAdd: false,
				isChecked: true,//默认当选为0是无限期使用
				// optionsStore: [],
				// valueStore: '',
				// optionsDays: [],
				// valueDays: '',
			}
		},
		methods: {
			btnBuy() {
				let APIloading = this.$loading({ fullscreen: true })
				let  continueValue = 0;
				if (this.autoAdd === true && this.storageTime != 0){
					continueValue = 1
				}else{
					continueValue = 0
				}
				let params = {
				      "user_id": localStorage.getItem("userId"),    //用户id
				      "days": parseInt(this.storageTime), //预购天数,0表示无限期
				      "continue": continueValue //到期是否继续购买，0不继续，1继续
				 }
				this.requestStoragePost(JSON.stringify(params)).then((data) => {
					APIloading.close();//接口返回loading关闭
					var url = '/buyStorageResult';
					this.$router.push(url);

				}, function(e) {
					APIloading.close();//接口返回loading关闭
					console.log(e)
					this.$message.error(e);
				}).catch((err) => {
					APIloading.close();//接口返回loading关闭
					console.log(err)
					this.$message.error(err);

				})


			},
			...mapActions([
				'requestBuyStorage',
				'requestStoragePost'
			]),
		},
		mounted() {

			let params = {
				unit_price: "day"
			}
			let APIloading = this.$loading({ fullscreen: true })
			this.requestBuyStorage(params).then((data) => {
				APIloading.close();//接口返回loading关闭
				this.storageList = this.getBuyStorageStore;
				// this.optionsStore = this.getBuyStorageStore
				// this.optionsDays = this.getBuyStorageDays
				// this.valueStore = this.optionsStore[0].value
				// this.valueDays = this.optionsDays[0].value

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
	@import '../../assets/css/buystorage.less';
</style>
