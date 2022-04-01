<template>
    <div style="box-sizing: border-box; padding: 0 0">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in counts" :key="index">
                <el-card class="box-card" shadow="hover">
                    <div class="d-flex align-items-center">
                        <el-icon
                            :class="[item.color]"
                            class="h4 mb-0 text-white text-center mr-3"
                            style="width: 40px; height: 40px; line-height: 35px"
                            :size="25"
                        >
                            <component :is="item.icon"></component>
                        </el-icon>
                        <div>
                            <h4 class="mb-1">{{ item.num }}</h4>
                            <small class="text-muted">{{ item.desc }}</small>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 店铺、订单提示 ｜ 统计图 -->
        <el-row :gutter="20" class="mt-3">
            <el-col :span="12" class="d-flex flex-column" style="height: 370px">
                <el-card
                    class="box-card mb-auto"
                    shadow="never"
                    v-for="(tip, tindex) in tips"
                    :key="tindex"
                >
                    <template #header>
                        <div
                            class="d-flex align-items-center justify-content-between"
                        >
                            <span>{{ tip.title }}</span>
                            <el-button type="text">{{ tip.desc }}</el-button>
                        </div>
                    </template>
                    <div class="row">
                        <div
                            :class="getCol(tip.list.length)"
                            v-for="(l, li) in tip.list"
                        >
                            <button class="btn btn-light w-100">
                                <h4 class="mb-1">{{ l.value }}</h4>
                                <small class="text-muted">{{ l.name }}</small>
                            </button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!-- 统计图  -->
            <el-col :span="12">
                <el-card class="box-card" style="height: 370px" shadow="never">
                    <template #header>
                        <div
                            class="d-flex align-items-center justify-content-between"
                        >
                            <span>卡片名称</span>
                            <el-button type="text">操作按钮</el-button>
                        </div>
                    </template>
                    <div ref="myChart" style="width: 100%; height: 270px"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import * as echarts from "echarts";
import { ref, shallowRef, onMounted } from "vue";
import { UserFilled, List as ListIcon } from "@element-plus/icons-vue";

onMounted(() => {
    drawLine();
});

function drawLine() {
    let mychart = echarts.init(myChart.value);
    mychart.setOption({
        title: {
            text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
            data: ["销量"],
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    });
}
const myChart = ref();
const getCol = function (val) {
    return `col-${12 / val}`;
};
const counts = ref([
    {
        icon: shallowRef(UserFilled),
        color: "bg-primary",
        num: "30",
        desc: "关注人数(个)",
    },
    {
        icon: shallowRef(UserFilled),
        color: "bg-success",
        num: "30",
        desc: "关注人数(个)",
    },
    {
        icon: shallowRef(ListIcon),
        color: "bg-danger",
        num: "4183.3",
        desc: "今日订单金额(元)",
    },
    {
        icon: shallowRef(UserFilled),
        color: "bg-warning",
        num: "30",
        desc: "关注人数(个)",
    },
]);

const tips = ref([
    {
        title: "店铺及商品提示",
        desc: "需要关注的店铺信息及代办事项",
        list: [
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
        ],
    },
    {
        title: "交易提示",
        desc: "需要关注的交易提示",
        list: [
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
            {
                name: "出售中",
                value: "60",
            },
        ],
    },
]);
</script>
