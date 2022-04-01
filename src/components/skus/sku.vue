<template>
    <div class="sku-main">
        <el-form ref="form" :model="form" status-icon inline-message>
            <el-table :data="form.skuData" stripe border highlight-current-row>
                <el-table-column
                    v-if="emitAttribute.length > 0"
                    type="index"
                    width="50"
                    align="center"
                    :resizable="false"
                />
                <el-table-column
                    v-for="(attr, index) in emitAttribute"
                    :key="`attribute-${index}`"
                    :label="attr.name"
                    :prop="attr.name"
                    width="120"
                    align="center"
                    :resizable="false"
                />
                <el-table-column
                    v-for="(item, index) in structure"
                    :key="`structure-${index}`"
                    :label="item.label"
                    :prop="item.name"
                    align="center"
                    :resizable="false"
                    min-width="120px"
                >
                    <!-- 自定义表头 -->
                    <template #header>
                        <span :class="{ required_title: item.required }">
                            {{ item.label }}
                        </span>
                        <el-tooltip
                            v-if="item.tip"
                            effect="dark"
                            :content="item.tip"
                            placement="top"
                        >
                            <i class="el-icon-info" />
                        </el-tooltip>
                    </template>
                    <!-- 自定义表格内部展示 -->
                    <template #default="scope">
                        <!-- 增加是 key 是为了保证异步验证不会出现 skuData 数据变化后无法验证的 bug -->
                        <el-form-item
                            v-if="item.type == 'input'"
                            :key="`structure-input-${index}-${scope.row.sku}`"
                            :prop="'skuData.' + scope.$index + '.' + item.name"
                            :rules="rules[item.name]"
                        >
                            <el-input
                                v-model="scope.row[item.name]"
                                :placeholder="`请输入${item.label}`"
                                size="small"
                            />
                        </el-form-item>
                        <el-form-item
                            v-else-if="item.type == 'slot'"
                            :key="`structure2-input-${index}-${scope.row.sku}`"
                            :prop="'skuData.' + scope.$index + '.' + item.name"
                            :rules="rules[item.name]"
                        >
                            <slot
                                :name="item.name"
                                :$index="scope.$index"
                                :row="scope.row"
                                :column="scope.column"
                            />
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";
interface SourceAttribute {
    name: string;
    canAddAttribute: boolean;
    addAttribute: string;
    item: Array<SourceAttributeItem>;
}
interface SourceAttributeItem {
    name: string;
    checked: boolean;
}

interface AttributeItem {
    name: string;
    checked: boolean;
}
interface Attribute {
    name: string;
    item: [string];
}
interface Sku {
    sku: string;
}
interface Structure {
    name: string;
    type: string;
    label: string;
    required: boolean;
    tip: string;
    skuProperty: boolean;
    defaultValue?: string;
}
interface Props {
    async?: boolean;
    sourceAttribute?: Array<SourceAttribute>;
    attribute: Array<Attribute>;
    sku: Array<Sku>;
    structure: Array<Structure>;
    emptySku: string;
}
const props = withDefaults(defineProps<Props>(), {
    async: false,
    sourceAttribute: () => [
        {
            name: "颜色",
            canAddAttribute: false,
            addAttribute: "asd",
            item: [
                {
                    name: "ad",
                    checked: true,
                },
            ],
        },
    ],
    /**
     * 已使用的规格数据，用于复原数据，支持.sync修饰符
     * attribute: [
     *   { name: '颜色', item: ['黑'] },
     *   { name: '运营商', item: ['电信', '移动', '联通'] }
     * ]
     */
    attribute: () => [
        {
            name: "颜色",
            item: ["黑"],
        },
    ],
    sku: () => [
        {
            sku: "黑",
            originalprice: 100,
            price: 80,
            stock: 100,
        },
    ],
    structure: () => [
        {
            name: "price",
            type: "input",
            label: "价格",
            required: false,
            tip: "!",
            skuProperty: false,
            defaultValue: "",
        },
        {
            name: "stock",
            type: "input",
            label: "库存",
            required: false,
            tip: "!",
            skuProperty: false,
            defaultValue: "",
        },
    ],
    emptySku: "",
});

onMounted(() => {
    !props.async && init();
});

const isInit = ref(false);
const form = ref({
    skuData: [],
});

const myAttribute = ref([]);

const emitAttribute = computed(() => {
    let attribute = [];
    myAttribute.value.forEach((v1) => {
        const obj = {
            name: v1.name,
            item: [],
        };
        v1.item.forEach((v2) => {
            if (v2.checked) {
                obj.item.push(v2.name);
            }
        });
        if (obj.item.length !== 0) {
            attribute.push(obj);
        }
    });
    console.log(attribute, "attribute");
    return attribute;
});
const rules = computed(() => {
    let rules = {};
    return rules;
});
watch(
    myAttribute,
    () => {
        if (props.attribute.length !== 0) {
            combinationAttribute();
        } else {
            form.value.skuData = [];
            const obj = {
                sku: props.emptySku,
            };
            props.structure.forEach((v) => {
                if (!(v.type == "slot" && v.skuProperty == false)) {
                    obj[v.name] =
                        typeof v.defaultValue != "undefined"
                            ? v.defaultValue
                            : "";
                }
            });
            form.value.skuData.push(obj);
            console.log(form.value);
        }
    },
    { deep: true }
);
const combinationAttribute = function () {};
const init = () => {
    nextTick(() => {
        console.log("init?");
        isInit.value = true;
        // 初始化 _myAttribute
        let _myAttribute = [];
        // 根据 sourceAttribute 复原 _myAttribute 的结构
        props.sourceAttribute.forEach((v) => {
            const temp = {
                name: v.name,
                canAddAttribute:
                    typeof v.canAddAttribute != "undefined"
                        ? v.canAddAttribute
                        : true,
                addAttribute: "",
                item: [],
            };
            v.item.forEach((itemName) => {
                temp.item.push({
                    name: itemName,
                    checked: false,
                });
            });
            _myAttribute.push(temp);
        });
        // 根据 attribute 更新 _myAttribute
        props.attribute.forEach((attrVal) => {
            _myAttribute.forEach((myAttrVal) => {
                if (attrVal.name === myAttrVal.name) {
                    attrVal.item.forEach((attrName) => {
                        if (
                            !myAttrVal.item.some((myAttrItem) => {
                                if (attrName === myAttrItem.name) {
                                    myAttrItem.checked = true;
                                }
                                return attrName === myAttrItem.name;
                            })
                        ) {
                            myAttrVal.item.push({
                                name: attrName,
                                checked: true,
                            });
                        }
                    });
                }
            });
        });

        myAttribute.value = _myAttribute;
        // 通过 sku 更新 skuData，但因为 skuData 是实时监听 myAttribute 变化并自动生成，而 watch 是在 methods 后执行，所以增加 setTimeout 方法，确保 skuData 生成后在执行下面的代码
        setTimeout(() => {
            props.sku.forEach((skuItem) => {
                // form.value.skuData.forEach((skuDataItem) => {
                //   console.log(skuDataItem, "skuDataItem");
                //   if (skuItem.sku === skuDataItem.sku) {
                //     props.structure.forEach((structureItem) => {
                //       skuDataItem[structureItem.name] = skuItem[structureItem.name];
                //     });
                //   }
                // });
            });
            isInit.value = false;
            console.log(props.sku, "props.sku.");
        }, 10);
    });
};
</script>
<style lang="postcss" scoped>
.sku-main {
    margin-left: 120px;
}
.required_title::before {
    content: "*";
    color: #f56c6c;
}
</style>
