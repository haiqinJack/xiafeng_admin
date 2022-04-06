<template>
    <div>
		<button-search
			:showSearch="false"
			placeholder="要搜索商品名称"
		>
			<template #left>
				<el-button type="success" @click="showModel()">创建规格</el-button>
				<el-button type="danger" @click="deleteAll">批量删除</el-button>
			</template>
		</button-search>
		<el-table
			border
			class="mt-3"
			:data="tableData"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="45" align="center" />
			<el-table-column prop="name" label="类型名称" width="380px">
				
			</el-table-column>
			<el-table-column prop="value" label="类型值" align="center" />
			<el-table-column prop="order" label="排序" align="center" />
			<el-table-column prop="status" label="商品状态" align="center">
				<template #default="scope">
					<el-button
						:type="scope.row.status ? 'success' : 'danger'"
						@click="changeStatus(scope.row)"
						>{{ scope.row.status ? "显示" : "隐藏" }}</el-button
					>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="150px">
				<template #default="scope">
					<el-button-group>
						<el-button type="primary" @click="showModel(scope)" plain>修改</el-button>
						<el-button
							type="danger"
							plain
							@click="deleteItem(scope.$index)"
						>
							删除
						</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model='createModel' :title="editIndex ? '创建类型' : '修改类型'">
			<el-form :model="form" ref="formRef"  :rules="rules">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" placeholder="类型名称" style="width:40%;"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input v-model="form.order" type="number" style="width:40%;"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio :label="1"  border>显示</el-radio>
						<el-radio :label="0" border>隐藏</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="confirm">创建</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
    </div>
</template>
<script>
import ButtonSearch from "@/components/ButtonSearch.vue";

export default {
    components: { ButtonSearch },
    data() {
        return {
            tabIndex: 0,
            tableData: [
				{
					id: 112,
					name : '颜色',
					value : '棕色,蓝色',
					order : 50,
					status : 1
				}
			],
            multipleSelection: [],
			createModel: false,
			editIndex : -1,
			form: {
				name : '',
				value : '',
				order : 0,
				status : 1
			},
			rules : {
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' },
				]
			}
        };
    },
    created() {
        this.__getData();
    },
    methods: {
        __getData() {
            for (let i = 0; i < 10; i++) {
				this.tableData.push({
					id: i,
					name : '尺寸',
					value : 'X,XL',
					order : 50,
					status : 1
				})
            }
        },
        //修改上架，下架
        changeStatus(item) {
            item.status = item.status === 1 ? 0 : 1;
        },
		showModel(e = false) {
			if(!e) {// 点击创建按钮
				this.form = {
					id: 1,
					name : '',
					value : '',
					order : 0,
					status : 1
				}				
				this.editIndex = -1
			} else {//点击修改按钮
				let { row } = e
				this.form = {
					id: 1,
					name : row.name,
					value : row.value,
					order : row.order,
					status : row.status
				}
				this.editIndex = e.$index
			}
			this.createModel = true
		},
		confirm() {
			this.$refs.formRef.validate(res => {
				if(res) {
					if(this.editIndex === -1) {// 增加操作
						this.tableData.unshift(this.form)
					} else { //修改操作
						this.tableData[this.editIndex] = this.form
					}
					
					this.createModel = false
					this.$message({
						message : 'success',
						type : 'success'
					})
				}
			}) 
			
		},
        //删除
        deleteItem(index) {
            this.$confirm("删除", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.tableData.splice(index, 1);
            });
        },
		// 批量删除
		deleteAll() {
			console.log(this.tableData[0])
			this.multipleSelection.forEach(item => {
				let index = this.tableData.findIndex(v=>v.id === item.id)
				console.log(index, 'index')
				if(index !== -1) {
					this.tableData.splice(index, 1)
				}
			})
			this.multipleSelection = []
		},
        handleSelectionChange(val) {
			console.log(val)
            this.multipleSelection = val;
        },
    },
};
</script>
