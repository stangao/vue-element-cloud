/** * Created by 军标 on 2017-9-11. */
<template lang="html">
		<div class="groupContainer pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>创建集群/项目</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<fieldset>
				<legend>创建集群/项目</legend>
				<div class="contentContainer">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
						<el-form-item label="输入集群名称" prop="name">
							<el-input v-model="ruleForm.name" placeholder="请输入内容" class="inline-input"></el-input>
							<span class="group-tips">-{{randomNum}}</span>
						</el-form-item>
						<el-form-item label="集群类型" prop="completedate">
							<el-autocomplete v-model="ruleForm.completedate" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" class="inline-input"></el-autocomplete>
						</el-form-item>
						<el-form-item label="计费模式" prop="options" style="display:none"><!--文华说暂时不用显示，默认赋值分钟-->
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<span class="common-tips">计费模式不能修改</span>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
						</el-form-item>
					</el-form>
				</div>
			</fieldset>
		</div>

</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'

	export default {
		computed: {
			...
			mapGetters({
				getClustTypeList: 'getClustTypeList',
				getTimeTypeList: 'getTimeTypeList',
				postClustGroup: 'postClustGroup',
				getGroupName: 'getGroupName',
				getGroupId: 'getGroupId'
			})
		},
		data() {
			var checkGroupName = (rule, value, callback) => {
				var result = value.match(/^^(?!\-)[a-z0-9\-]+$/);//名称只能包括：数字，小写字母，减号，且开头不能为减号
				if(result == null){
					callback(new Error('名称只能包括：数字，小写字母，减号，且开头不能为减号'));
				}else{
					callback();
				}
      };
			return {
				title: "创建集群",
				options: [],
				value: '',
				randomNum: '',//随机4位数
				ruleForm: {
					name: '',
					completedate: ''
				},
				rules: {
					name: [
						{required: true, message: '请输入集群名称', trigger: 'blur' },
						{ min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
						{ validator: checkGroupName, trigger: 'blur' }
					],
					completedate: [{
						required: true,
						message: '请输入集群类型',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			creatRandomNum(){
				let randomNum = Math.random()+''
				this.randomNum = randomNum.substr(randomNum.length-4)
			},
			btnCreate() {
				console.log("create")
				var url = '/buyStorage';
				this.$router.push(url);
			},
			querySearch(queryString, cb) {
				var clusterTypes = this.getClustTypeList
				var results = queryString ? clusterTypes.filter(this.createFilter(queryString)) : clusterTypes;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return(clusterType) => {
					return(clusterType.value.indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				this.ruleForm.completedate = item.value;
				console.log(this.ruleForm.completedate);
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let _this = this
						let projectName = this.ruleForm.name + '-' + this.randomNum;
						let params = {
							project_name: projectName,
							cluster_type: this.ruleForm.completedate,
							// billing_mode: this.value//文华说占时注释掉，不选择默认用分钟
							billing_mode: "minute"
						}
						let APIloading = this.$loading({ fullscreen: true })
						this.requestPostClusterConfigList(JSON.stringify(params)).then((data) => {
							this.requestGroupName(this.ruleForm.name); //vuex存储创建集群名称
							this.requestGroupId(data.project_id); //vuex存储创建集群id
							localStorage.setItem("projectId",data.project_id)
							console.log(data)
							console.log("creat success")
							var url = '/buyStorage';
							this.$router.push(url);
						}, (e)=> {
							APIloading.close();//接口返回loading关闭
							this.$message.error(e);
						}).catch((err) => {
							APIloading.close();//接口返回loading关闭
							this.$message.error(err);
						})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			...mapActions([
				'requestClusterConfigList',
				'requestPostClusterConfigList',
				'requestGroupName',
				'requestGroupId'
			]),
		},
		mounted() {
			this.creatRandomNum()//初始化生成4位随机数
			let _this = this
			let APIloading = this.$loading({ fullscreen: true })
			this.requestClusterConfigList({}).then(function(data) {
				APIloading.close();//接口返回loading关闭
				_this.options = _this.getTimeTypeList
				_this.value = _this.options[0]['label']
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
	@import '../../assets/css/createcluster.less';
</style>
