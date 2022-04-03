<template>
    <div>
        <router-link :to="{ name: 'goods_list' }">
            <el-button type="primary">返回</el-button>
        </router-link>
        <el-tabs v-model="tabIndex" @tab-click="handleClick">
            <el-tab-pane label="基础设置">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="标题">
                        <el-input
                            :model-value="title"
                            @input="vModel('title', $event)"
                            placeholder="商品标题"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-cascader
                            :model-value="category"
                            @change="vModel('category', $event)"
                            :options="options"
                        />
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input
                            type="textarea"
                            :model-value="desc"
                            @input="vModel('desc', $event)"
                            placeholder="商品描述"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品单位">
                        <el-input
                            :model-value="unit"
                            @input="vModel('unit', $event)"
                            placeholder="如：包,件,罐"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="总库存">
                        <el-input-number
                            :model-value="stock"
                            @change="vModel('stock', $event)"
                            :min="0"
                            :max="999"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存预警">
                        <el-input-number
                            :model-value="min_stock"
                            @change="vModel('min_stock', $event)"
                            :min="0"
                            :max="999"
                        ></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存显示">
                        <el-radio-group
                            :model-value="display_stock"
                            @change="vModel('display_stock', $event)"
                        >
                            <el-radio :label="1" border>是</el-radio>
                            <el-radio :label="0" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否上架">
                        <el-radio-group
                            :model-value="status"
                            @change="vModel('status', $event)"
                        >
                            <el-radio :label="1" border>立即上架</el-radio>
                            <el-radio :label="0" border>放入仓库</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运费模版">
                        <el-select
                            :model-value="express"
                            @change="vModel('express', $event)"
                            placeholder=""
                        >
                            <el-option label="上海" value="上海" />
                            <el-option label="上海2" value="上海2" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品规格">
                <el-form>
                    <el-form-item label="商品规格">
                        <el-radio-group
                            :model-value="sku_type"
                            @change="vModel('sku_type', $event)"
                            class="ml-3"
                        >
                            <el-radio-button label="0">单规格</el-radio-button>
                            <el-radio-button label="1">多规格</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <!-- 单规格 -->
                <template v-if="sku_type == 0">
                    <el-form>
                        <el-form-item label="销售价格">
                            <!-- <el-input-number
                            :model-value="pprice"
                            @change="vModel('pprice', $event)"
                            :min="0"
                            :max="999"
                        ></el-input-number> -->
                            <el-input
                                :model-value="pprice"
                                @input="vModel('pprice', $event)"
                                type="number"
                                placeholder=""
                                style="width: 200px"
                            >
                                <template #append> 元 </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="进货价格">
                            <el-input
                                :model-value="cprice"
                                @input="vModel('cprice', $event)"
                                type="number"
                                placeholder=""
                                style="width: 200px"
                            >
                                <template #append> 元 </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input
                                :model-value="weight"
                                @input="vModel('weight', $event)"
                                type="number"
                                placeholder=""
                                style="width: 200px"
                            >
                                <template #append>kg</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <!-- 多规格 -->
                <template v-else>
                    <el-form>
                        <el-form-item label="添加规格">
                            <div class="container">
                                <skuCard
                                    v-for="(item, index) in sku_card"
                                    :key="index"
                                    :index="index"
                                    :item="item"
                                    :total="skuCardTotal"
                                />
                                <el-button
                                    type="success"
                                    @click="addSkuCard"
                                    class="mt-3"
                                    >添加规格</el-button
                                >
                            </div>
                        </el-form-item>
					</el-form>
					<el-form ref="form" label-width="80px">
						<el-form-item label="批量设置">
							<template v-if="!updateAllStatus">
								<el-button type="text" 
									v-for="(btn, btnIndex) in updateList"
									:key="btnIndex"
									
									@click="openUpdateAllStatus(btn)"
								>{{btn.name}}</el-button>
							</template>
							<template v-else>
								<div class="d-flex align-items-center">
									<el-input 
										style="width:150px;" 
										class="mr-2" 
										type="number"
										v-model="updateAllValue"
										:placeholder="updateAllPlaceholder"
									>
									</el-input>								
									<el-button type="primary" @click="updateAllSubmit">设置</el-button>
									<el-button @click="closeUpdateAllStatus">取消</el-button>
								</div>								
							</template>
						</el-form-item>
						
						
                        <el-form-item label="商品规格" v-if="skuCardTotal">
                            <skuTable ref="skuTableRef"/>
                        </el-form-item>
                    </el-form>
                </template>
            </el-tab-pane>
            <el-tab-pane label="商品属性"> 商品属性 </el-tab-pane>
            <el-tab-pane label="媒体设置">
				<el-form>
					<el-form-item label="商品大图">
						<div class="d-flex flex-wrap">
							<div
								v-for="(item,index) in banners"
								:key="index"
								v-if="banners.length > 0"
								style="width:150px;height:150px;cursor: pointer;" 
								class="border d-flex rounded align-items-center justify-content-center mr-2 mb-3 position-relative"	
								@click="chooseImage(index)"
							>
								<img
									:src="item.url" 
									v-if="item.url"
									style="width:100px;height: 50px;"
								/>
								<el-icon size="15px"
									style="position:absolute;top:0;right:0; background-color: rgba(0,0,0,0.4);"
									@click.stop="deleteImage(index)"
								>
									<Delete />
								</el-icon>
							</div>
							<div
								v-if="banners.length < 5"
								style="width:150px;height:150px;cursor: pointer;" 
								class="border d-flex rounded align-items-center justify-content-center mr-2 mb-3"	
								@click="chooseImage(-1)"
							>
								<el-icon size="50px">
									<Plus />
								</el-icon>
							</div>
						</div>
					</el-form-item>
					
				</el-form>
            </el-tab-pane>
            <el-tab-pane label="商品详情"> <TEditor /> </el-tab-pane>
            <el-tab-pane label="折扣设置"> 折扣设置 </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import skuCard from "@/components/goods/create/sku/sku-card.vue";
import skuTable from "@/components/goods/create/sku/sku-table.vue";
import TEditor from "@/components/TEditor/index.vue";
import { Plus, Delete } from '@element-plus/icons-vue'
import { mapState, mapMutations } from "vuex";

export default {
	inject:['app'],
    components: {
        skuCard,
        skuTable,
        TEditor,
		Plus,
		Delete
    },
    computed: {
        ...mapState({
            sku_type: (state) => state.goods_create.sku_type,
            title: (state) => state.goods_create.title,
            category: (state) => state.goods_create.category,
            desc: (state) => state.goods_create.desc,
            unit: (state) => state.goods_create.unit,
            stock: (state) => state.goods_create.stock,
            min_stock: (state) => state.goods_create.min_stock,
            display_stock: (state) => state.goods_create.display_stock,
            status: (state) => state.goods_create.status,
            express: (state) => state.goods_create.express,
            pprice: (state) => state.goods_create.pprice, //销售价格
            cprice: (state) => state.goods_create.cprice, //成本价格
            weight: (state) => state.goods_create.weight, //重量
			banners: (state) => state.goods_create.banners, //商品主图
            sku_card: (state) => state.goods_create.sku_card,
        }),

        skuCardTotal() {
            return this.sku_card.length;
        },
    },
    data() {
        return {
            tabIndex: 0,
            value: [],
            options: [
                {
                    value: "guide",
                    label: "Guide",
                    children: [
                        {
                            value: "disciplines",
                            label: "Disciplines",
                            children: [
                                {
                                    value: "consistency",
                                    label: "Consistency",
                                },
                                {
                                    value: "feedback",
                                    label: "Feedback",
                                },
                                {
                                    value: "efficiency",
                                    label: "Efficiency",
                                },
                                {
                                    value: "controllability",
                                    label: "Controllability",
                                },
                            ],
                        },
                        {
                            value: "navigation",
                            label: "Navigation",
                            children: [
                                {
                                    value: "side nav",
                                    label: "Side Navigation",
                                },
                                {
                                    value: "top nav",
                                    label: "Top Navigation",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "component",
                    label: "Component",
                    children: [
                        {
                            value: "basic",
                            label: "Basic",
                            children: [
                                {
                                    value: "layout",
                                    label: "Layout",
                                },
                                {
                                    value: "color",
                                    label: "Color",
                                },
                                {
                                    value: "typography",
                                    label: "Typography",
                                },
                                {
                                    value: "icon",
                                    label: "Icon",
                                },
                                {
                                    value: "button",
                                    label: "Button",
                                },
                            ],
                        },
                        {
                            value: "form",
                            label: "Form",
                            children: [
                                {
                                    value: "radio",
                                    label: "Radio",
                                },
                                {
                                    value: "checkbox",
                                    label: "Checkbox",
                                },
                                {
                                    value: "input",
                                    label: "Input",
                                },
                                {
                                    value: "input-number",
                                    label: "InputNumber",
                                },
                                {
                                    value: "select",
                                    label: "Select",
                                },
                                {
                                    value: "cascader",
                                    label: "Cascader",
                                },
                                {
                                    value: "switch",
                                    label: "Switch",
                                },
                                {
                                    value: "slider",
                                    label: "Slider",
                                },
                                {
                                    value: "time-picker",
                                    label: "TimePicker",
                                },
                                {
                                    value: "date-picker",
                                    label: "DatePicker",
                                },
                                {
                                    value: "datetime-picker",
                                    label: "DateTimePicker",
                                },
                                {
                                    value: "upload",
                                    label: "Upload",
                                },
                                {
                                    value: "rate",
                                    label: "Rate",
                                },
                                {
                                    value: "form",
                                    label: "Form",
                                },
                            ],
                        },
                        {
                            value: "data",
                            label: "Data",
                            children: [
                                {
                                    value: "table",
                                    label: "Table",
                                },
                                {
                                    value: "tag",
                                    label: "Tag",
                                },
                                {
                                    value: "progress",
                                    label: "Progress",
                                },
                                {
                                    value: "tree",
                                    label: "Tree",
                                },
                                {
                                    value: "pagination",
                                    label: "Pagination",
                                },
                                {
                                    value: "badge",
                                    label: "Badge",
                                },
                            ],
                        },
                        {
                            value: "notice",
                            label: "Notice",
                            children: [
                                {
                                    value: "alert",
                                    label: "Alert",
                                },
                                {
                                    value: "loading",
                                    label: "Loading",
                                },
                                {
                                    value: "message",
                                    label: "Message",
                                },
                                {
                                    value: "message-box",
                                    label: "MessageBox",
                                },
                                {
                                    value: "notification",
                                    label: "Notification",
                                },
                            ],
                        },
                        {
                            value: "navigation",
                            label: "Navigation",
                            children: [
                                {
                                    value: "menu",
                                    label: "Menu",
                                },
                                {
                                    value: "tabs",
                                    label: "Tabs",
                                },
                                {
                                    value: "breadcrumb",
                                    label: "Breadcrumb",
                                },
                                {
                                    value: "dropdown",
                                    label: "Dropdown",
                                },
                                {
                                    value: "steps",
                                    label: "Steps",
                                },
                            ],
                        },
                        {
                            value: "others",
                            label: "Others",
                            children: [
                                {
                                    value: "dialog",
                                    label: "Dialog",
                                },
                                {
                                    value: "tooltip",
                                    label: "Tooltip",
                                },
                                {
                                    value: "popover",
                                    label: "Popover",
                                },
                                {
                                    value: "card",
                                    label: "Card",
                                },
                                {
                                    value: "carousel",
                                    label: "Carousel",
                                },
                                {
                                    value: "collapse",
                                    label: "Collapse",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "resource",
                    label: "Resource",
                    children: [
                        {
                            value: "axure",
                            label: "Axure Components",
                        },
                        {
                            value: "sketch",
                            label: "Sketch Templates",
                        },
                        {
                            value: "docs",
                            label: "Design Documentation",
                        },
                    ],
                },
            ],
            
			updateList:[
				{name: '商品价格', key:'pprice'},
				{name: '库存', key:'stock'},
				{name: '编码', key:'code'},
			],
			updateAllValue: '',
			updateAllStatus: false,
			updateAllPlaceholder: ''
			
        };
    },
	
    methods: {
        ...mapMutations(["addSkuCard", "vModelState"]),
        vModel(key, value) {
            this.vModelState({ key, value });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
		openUpdateAllStatus(item) {
			this.updateAllStatus = item.key
			this.updateAllPlaceholder = item.name
		},
		// 取消批量设置状态
		closeUpdateAllStatus(){
			this.updateAllStatus = false
			this.updateAllPlaceholder = ''
			this.updateAllValue = ''
		},
		updateAllSubmit(){
			this.$refs.skuTableRef.list.forEach(item => {
				item[this.updateAllStatus] = this.updateAllValue
			})
		},
		// 选择图片
		chooseImage(index) {
			const MAX = 5
			let count = MAX - this.banners.length
		    this.app.chooseImage((res) => {
				let list = []
				// 点击plus
				if(index === -1) {
					list = [...this.banners, ...res]
				} else { //点击图片，替换操作
					list = [...this.banners]
					list[index] = res[0]
				}
				
				this.vModel('banners', list)
		    }, index === -1 ? count : 1);
		},
		// 删除图片
		deleteImage(index) {
			let list = [...this.banners]
			list.splice(index, 1)
			this.vModel('banners', list)
		}
    },
};
</script>
