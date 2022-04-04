<template>
	<div>
		<div class="py-2 border-bottom d-flex align-items-center">
			<el-button @click="createTop">新增分类</el-button>
		</div>
		<el-tree
			  :data="dataSource"
			  draggable
			  show-checkbox
			  node-key="id"
			  default-expand-all
			  :expand-on-click-node="false"
			  @node-drop="nodeDrop"
			>
			<template #default="{ node, data }">
				<span class="custom-tree-node">
					<div>
						<el-input ref="labelInput" v-model="data.label" v-if="data.editStatus" 
							@keyup.enter="editEnter(data)"
							@blur.stop="editBlur(data)"
						></el-input>
						<span v-else>{{ node.label }}</span>
					</div>
					<span>
						<el-button type="primary" size="small"
							@click.stop="showOrHide(data)"
						>{{ data.status ? '显示' : '隐藏'}}</el-button>
						<el-button type="success" size="small" @click.stop="append(data)">增加</el-button>
						<el-button type="info" size="small" @click.stop="edit(data)">
							{{data.editStatus ? '完成' : '修改'}}
						</el-button>
						<el-button type="danger" size="small" @click.stop="remove(node, data)">删除</el-button>
					</span>
				</span>
			</template>
		</el-tree>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dataSource:[
				{
					id: 1,
				    label: 'Level one 1',
					status : 1,
					editStatus : false,
				    children: [
				      {
						id: 11,
				        label: 'Level two 1-1',
						status : 1,
						editStatus : false,
				        children: [
				          {
							id: 12,
							status : 1,
							editStatus : false,
				            label: 'Level three 1-1-1',
				          },
				        ],
				      },
				    ],
				  }
			]
		}
	},
	methods:{
		handleNodeClick(data) {
			console.log(data)
		},
		showOrHide(data) {
			data.status = data.status ? 0 : 1
			console.log(data)
		},
		editEnter(data){
			data.editStatus = false
		},
		editBlur(data){
			data.editStatus = false
		},
		edit(data) {
			data.editStatus = !data.editStatus
			if(data.editStatus) {
				this.$nextTick(function() {
					// DOM 现在更新了
					// `this` 被绑定到当前实例
					this.$refs.labelInput.focus()
				})
			}
		},
		append(data){
			const newChild = {
						id: 12,
						label: '123',
						status : 1,
						editStatus : true,
						label: '新分类',
						children:[]
					}
			  if (!data.children) {
			    data.children = []
			  }
			  data.children.push(newChild)
			  this.$nextTick(function() {
			  	// DOM 现在更新了
			  	// `this` 被绑定到当前实例
			  	this.$refs.labelInput.focus()
			  })
			  // dataSource.value = [...dataSource.value]
		},
		remove(node, data) {
			this.$confirm('此操作将删除该分类，是否继续？', '提示', {
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let { parent } = node
				let children = parent.data.children || parent.data
				let index = children.findIndex(v => {
					return v.id === data.id
				})
				children.splice(index, 1)
			})
		},
		nodeDrop(...option){
			console.log(option)
		},
		// 创建顶级分类
		createTop(){
			this.$prompt('新建分类', '提示', {
				confirmButtonText: '创建',
				cancelButtonText: '取消',
				inputValidator: function(val) {
					if(!val){
						return '请输入分类名称'
					}
				}
			}).then(({ value }) => {
				console.log(value)
			})
		
		}
	}
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content {
	padding : 20px 10px;
}
</style>