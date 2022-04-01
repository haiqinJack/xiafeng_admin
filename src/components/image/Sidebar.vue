<template>
    <li
        class="list-group-item list-group-item-action d-flex align-items-center"
        style="cursor: pointer"
        :class="{
            'active sum-active': active,
        }"
        @click.stop="$emit('change', index)"
    >
        {{ item.name }}
        <span class="btn btn-light btn-sm border ml-auto" v-if="!showOptions">
            {{ item.num }}
        </span>
        <el-dropdown class="ml-auto" v-else>
            <span class="btn btn-light btn-sm border">
                {{ item.num }}
                <el-icon class="el-icon--right">
                    <ArrowDown />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        @click.stop="$emit('edit', { item, index })"
                    >
                        修改
                    </el-dropdown-item>
                    <el-dropdown-item @click.stop="$emit('delete', index)">
                        删除
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </li>
</template>
<script>
import { ArrowDown } from "@element-plus/icons-vue";
export default {
    components: {
        ArrowDown,
    },
    props: {
        item: {
            type: Object,
            default: [],
        },
        active: {
            type: Boolean,
            default: false,
        },
        showOptions: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["change", "delete", "edit"],
};
</script>
