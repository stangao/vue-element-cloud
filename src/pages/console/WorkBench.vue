/** * Created by 军标 on 2017-9-22. */
<template lang="html">

		<div class="pageContent">
			<div v-title>{{title}}</div>
			交互式工作台页面
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Utils from '../../common/utils'

	export default {
		data() {
			return {
				title: "交互式工作台页面",
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '../../assets/css/workbench.less';
</style>
