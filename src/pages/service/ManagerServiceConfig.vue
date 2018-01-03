/** * Created by 乃波 on 2017-9-22. */
<template lang="html">
		<div class="pageContent">
			<div v-title>{{title}}</div>
			<div class="crumbs">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item><i class="el-icon-date"></i>{{title}}</el-breadcrumb-item>
					<el-breadcrumb-item>选择要修改的服务模块</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-table :data="tableData" border height="150" style="width: 100%">
				<el-table-column label="Spark服务模块配置修改" prop="module_name" sortable width="230">
					<template scope="scope">
						{{ scope.row.module_name }}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" @click="handleConfigFile(scope.$index, scope.row)">修改配置文件</el-button>
						<el-button size="small" @click="handleConfigValue(scope.$index, scope.row)">修改环境变量</el-button>
						<!-- <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>

			<!--模块配置文件 -->
			<div class="common-area" v-if="isConfigFile">
				<p class="common-title">列出每个模块的所有配置文件</p>
				<div class="flex-area" v-for="item in this.configmapList">
					<el-row type="flex" class="row-bg">
						<el-col :span="6">
							<div class="border-div">
	              <div class="border-div-content">
	                <!-- <span>core-site.xml</span><br> -->
									<span>{{item.cm_key}}</span><br>
	                <el-button type="primary" @click="changeServiceFile(item,item.cm_key,item.cm_value)">修改配置文件</el-button>
	              </div>
							</div>
						</el-col>
						<el-col :span="18">
							<div class="border-xml">
								<!-- <el-input type="textarea" autosize v-model="textarea1">
								</el-input> -->
								<xmp>{{item.cm_value}}</xmp>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>

			<!--编辑环境变量  -->
			<div class="common-area" v-if="isConfigValue">

				<p class="common-p">编辑环境变量</p>
				<p class="common-p">Container alluxio-master Environment Variables</p>
				<div class="path-var">
          <el-row>
            <el-col :span="10"><span>Name</span></el-col>
            <el-col :span="10"><span>Value</span></el-col>
            <el-col :span="4"></el-col>
          </el-row>
					<div class="path-box" v-for="(pathObj,index) in pathValue">
						<el-input v-model="pathObj.key"  class="small-input"></el-input>
						<el-input v-model="pathObj.value"  class="small-input"></el-input>
						<!-- <span><i class="el-icon-setting"></i></span> -->
						<span class="delectIcon" @click="deletePath(index)"><el-button size="mini" type="info" plain round><i class="el-icon-close"></i></el-button></span>

					</div>
					<div class="add-path">
						<el-button type="info" plain @click="addPath"><i class="el-icon-plus"></i>add Environment Variable </el-button>
					</div>
					<div class="pathFooter">
						<el-button type="primary" @click="savePath">保存配置</el-button>
						<el-button type="primary" @click="saveRestartPath">保存并重启服务</el-button>
						<el-button type="primary" @click="cancelPath">取消</el-button>
					</div>
				</div>
			</div>

      <!--编辑界面-->
      <el-dialog title="编辑配置文件" v-model="editFormVisible" :close-on-click-modal="false">
        <div class="common-title">
          <div class="common-title">Edit Config Map hadoop-config</div>
					<span class="config-tips">config maps hold key-value pairs that can be used in pods to read application configuration</span>
          <el-form ref="form" :model="formConfig" label-width="0px">
						<el-form-item label="*key">
							<el-input v-model="formConfig.key"></el-input>
							<span class="config-tips">A unique key for this config map entry.</span>
						</el-form-item>
            <el-form-item label="value" class="upload-box">
							<el-input :disabled="true"></el-input>
							<el-upload
							  class="upload-demo"
							  ref="upload"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
								:on-change="handleSuccess"
								:multiple="false"
								:limit="1"
							  :file-list="fileList"
							  :auto-upload="false">
							  <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
							  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
							  <div slot="tip" class="el-upload__tip">只能上传xml文件，且不超过500kb</div>
							</el-upload>
							<span class="config-tips">Enter a  value for the config map erntry or use the contents of a file.</span>
						</el-form-item>
						<div class="clear-value" @click="clearValue">
							Clear Value
						</div>
            <el-form-item label="">
              <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入XML文本"
                v-model="formConfig.value">
              </el-input>
						</el-form-item>
					</el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="saveMaps" :loading="editLoading">保存配置</el-button>
          <el-button type="primary" @click.native="saveRestartMaps" :loading="editLoading">保存并重启服务</el-button>
          <el-button @click.native="editFormVisible = false">取消</el-button>
        </div>
      </el-dialog>

		</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'
	import navBar from '../layout/Navbar'
	import sideBar from '../layout/SideBar'

	export default {
		components: {
			navBar,
			sideBar
		},
		computed: {
			...mapGetters({
				getServiceConfigModules: 'getServiceConfigModules',
				getSetEvns: 'getSetEvns',
				getSetMaps: 'getSetMaps'
			})
		},
		data() {
			return {
				title: "服务配置管理",
				tableData: [],
				configmapList: [],//配置文件数组
				configEnvsList: [],//原始环境变量
				pathValue: [],
        formConfig: {
					key: '',
					value: ''
				},
				nowMapsObj:{},//当前maps对象
				// fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
				fileList: [],
				nowModuleName: '',
				nowModuleUuid: '',
				urlServiceUuid: '',
        editFormVisible: false,
        LookFormDetail: false,
        editLoading: false,
				isConfigFile: false,//配置文件是否显示
				isConfigValue: false//配置环境变量是否显示
			}
		},
		methods: {
			handleConfigFile(index,row) {
				this.getServiceConfigModules.forEach((e)=>{
					if((e.module_name == row.module_name)&&(e.module_uuid == row.module_uuid)){
						this.configmapList = e.configmap//configmap赋值给列表数据渲染页面
					}
				});
				this.nowModuleName = row.module_name//当前module_name值
				this.nowModuleUuid = row.module_uuid//当前module_uuid值
				this.isConfigFile = true//配置文件是否显示
				this.isConfigValue = false//配置环境变量是否显示
			},
			handleConfigValue(index,row) {
				this.getServiceConfigModules.forEach((e)=>{
					if((e.module_name == row.module_name)&&(e.module_uuid == row.module_uuid)){
						this.configEnvsList = []//清空数组
						this.pathValue = []//清空数组
						for(let item in e.envs){
							this.pathValue.push({"key":item,"value":e.envs[item]})
							this.configEnvsList.push({"key":item,"value":e.envs[item]})
						}
					}
				});
				this.nowModuleName = row.module_name//当前module_name值
				this.nowModuleUuid = row.module_uuid//当前module_uuid值
				this.isConfigValue = true//配置环境变量是否显示
				this.isConfigFile = false//配置文件是否显示
			},
      changeServiceFile(item,key,value){
				this.nowMapsObj = item
				this.formConfig.key = key
				this.formConfig.value = value
        this.editFormVisible = true
      },
			addPath(){
				this.pathValue.push({"key":"","value":""})
			},
			deletePath(index){
				this.pathValue.splice(index,1)//删除数组
				// console.log(this.pathValue)
				// this.pathValue.push({"key":"","value":""})
			},
			savePath(){
				let params = {
					service_uuid: 'c6af399b-5b41-4b60-8c36-9a5f86bf8817',
					// service_uuid: this.urlServiceUuid,//正式环境是使用
					module_uuid: this.nowModuleName,
					module_name: this.nowModuleUuid,
					if_restart: false,
					evns:{}
				}
				// params.envs =
				this.pathValue.forEach((e)=> {
					params.evns[e.key] = e.value
				})
				console.log(params)
				let APIloading = this.$loading({ fullscreen: true })
				this.requestSetEvns(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					this.$message({
	          message: '恭喜你，环境变量保存配置成功！',
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
			saveRestartPath(){
				let params = {
					service_uuid: 'c6af399b-5b41-4b60-8c36-9a5f86bf8817',
					// service_uuid: this.urlServiceUuid,//正式环境是使用
					module_uuid: this.nowModuleName,
					module_name: this.nowModuleUuid,
					if_restart: true,
					evns:{}
				}
				// params.envs =
				this.pathValue.forEach((e)=> {
					params.evns[e.key] = e.value
				})
				console.log(params)
				let APIloading = this.$loading({ fullscreen: true })
				this.requestSetEvns(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					this.$message({
	          message: '恭喜你，环境变量保存重启成功！',
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
			cancelPath(){
				this.pathValue.splice(0,this.pathValue.length)//清空数组
				// this.configEnvsList.push({"key":item,"value":e.envs[item]})
				this.configEnvsList.forEach((e)=> {
					this.pathValue.push(e)
				})

			},
			// submitUpload() {
      //   this.$refs.upload.submit();
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
			handleSuccess(file, fileList) {

				var reader = new FileReader()
				let _this = this
		    //将文件以文本形式读入页面
		    reader.onload=function(f){
						_this.formConfig.value = this.result
						_this.formConfig.key = file.name
						// _this.formConfig.value = "

		    }
				reader.readAsText(file.raw)
				if(fileList.length>1){//如果文件数超过2个，则删除第一个文件
					fileList.splice(0,1);
				}

				// //支持chrome IE10
			  //   if (window.FileReader) {
			  //       var file = myput.files[0];
			  //       console.log(file)
			  //       filename = file.name.split(".")[0];
			  //       var reader = new FileReader();
			  //       reader.onload = function() {
			  //           console.log(this.result)
			  //           alert(this.result);
			  //       }
			  //       reader.readAsText(file);
			  //   }
			  //   //支持IE 7 8 9 10
			  //   else if (typeof window.ActiveXObject != 'undefined'){
			  //       var xmlDoc;
			  //       xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			  //       xmlDoc.async = false;
			  //       xmlDoc.load(myput.value);
			  //       alert(xmlDoc.xml);
			  //   }
			  //   //支持FF
			  //   else if (document.implementation && document.implementation.createDocument) {
			  //       var xmlDoc;
			  //       xmlDoc = document.implementation.createDocument("", "", null);
			  //       xmlDoc.async = false;
			  //       xmlDoc.load(myput.value);
			  //       alert(xmlDoc.xml);
			  //   } else {
			  //       alert('error');
			  //   }

			},
			clearValue(){
				this.formConfig.value = ""
			},
			saveMaps(){
				let params = {
					service_uuid: '157241fa-2b12-4a25-90df-4cd90dd699ba',
					// service_uuid: this.urlServiceUuid,//正式环境是使用
					module_uuid: this.nowModuleName,
					module_name: this.nowModuleUuid,
					if_restart: false,
					cm_name: this.nowMapsObj.cm_name,
				  cm_path: this.formConfig.key,
				  cm_key: this.formConfig.key,
				  cm_value: this.formConfig.value
				}

				console.log(123456,params)
				let APIloading = this.$loading({ fullscreen: true })

				this.requestSetMaps(params).then((data) => {
					console.log(data)
					APIloading.close();//接口返回loading关闭
					this.$message({
	          message: '恭喜你，保存配置成功！',
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
			saveRestartMaps(){
				let params = {
					service_uuid: 'c6af399b-5b41-4b60-8c36-9a5f86bf8817',
					// service_uuid: this.urlServiceUuid,//正式环境是使用
					module_uuid: this.nowModuleName,
					module_name: this.nowModuleUuid,
					if_restart: true,
					cm_name: this.nowMapsObj.cm_name,
				  cm_path: this.formConfig.key,
				  cm_key: this.formConfig.key,
				  cm_value: this.formConfig.value
				}
				let APIloading = this.$loading({ fullscreen: true })
				this.requestSetMaps(params).then((data) => {
					APIloading.close();//接口返回loading关闭
					this.$message({
	          message: '恭喜你，保存配置并重启成功！',
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
				'requestServerManagerList',
				'requestSetEvns',
				'requestSetMaps'
			]),
		},
		mounted() {
			this.urlServiceUuid = this.$route.query.service_uuid;//如果url有则取url的service_uuid
			let params = {
				service_uuid: 'c6af399b-5b41-4b60-8c36-9a5f86bf8817',
				// service_uuid: this.urlServiceUuid,//正式环境是使用
			}
			let APIloading = this.$loading({ fullscreen: true })
			this.requestServerManagerList(params).then((data) => {
				APIloading.close();//接口返回loading关闭
				this.getServiceConfigModules.forEach((e)=>{
					this.tableData.push({"module_name":e.module_name,"module_uuid":e.module_uuid})//get请求数据赋值给表格
				});
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
	@import '../../assets/css/managerserviceconfig.less';
</style>
