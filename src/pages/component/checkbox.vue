<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-checkbox v-model="state.checkbox1">复选框</van-checkbox>
        </demo-block>

        <demo-block title="禁用状态">
            <van-checkbox
                :model-value="false"
                disabled>
                复选框
            </van-checkbox>
            <view class="h-2"></view>
            <van-checkbox
                :model-value="true"
                disabled>
                复选框
            </van-checkbox>
        </demo-block>

        <demo-block title="自定义形状">
            <van-checkbox-group
                v-model="state.checkboxShape"
                shape="square">
                <van-checkbox name="a">自定义形状 a</van-checkbox>
                <view class="h-2"></view>
                <van-checkbox name="b">自定义形状 b</van-checkbox>
            </van-checkbox-group>
        </demo-block>

        <demo-block title="自定义颜色">
            <van-checkbox
                v-model="state.checkbox2"
                checked-color="#ee0a24">
                自定义颜色
            </van-checkbox>
        </demo-block>

        <demo-block title="自定义大小">
            <van-checkbox
                v-model="state.checkboxIcon"
                icon-size="24px">
                自定义大小
            </van-checkbox>
        </demo-block>

        <demo-block title="自定义图标">
            <van-checkbox v-model="state.checkbox3">
                自定义图标
                <template #icon>
                    <van-image
                        :src="state.checkbox3 ? cdnURL('user-active.png') : cdnURL('user-inactive.png')"
                        height="16px"
                        fit="aspectFit" />
                </template>
            </van-checkbox>
        </demo-block>

        <demo-block title="左侧文本">
            <van-checkbox
                v-model="state.leftLabel"
                label-position="left">
                左侧文本
            </van-checkbox>
        </demo-block>

        <demo-block title="禁止文本点击">
            <van-checkbox
                v-model="state.checkboxLabel"
                label-disabled>
                复选框
            </van-checkbox>
        </demo-block>

        <demo-block title="复选框组">
            <van-checkbox-group v-model="state.result">
                <van-checkbox name="a">复选框 a</van-checkbox>
                <view class="h-2"></view>
                <van-checkbox name="b">复选框 b</van-checkbox>
            </van-checkbox-group>
        </demo-block>

        <demo-block title="水平排列">
            <van-checkbox-group
                v-model="state.horizontalResult"
                direction="horizontal">
                <van-checkbox name="a">复选框 a</van-checkbox>
                <van-checkbox name="b">复选框 b</van-checkbox>
            </van-checkbox-group>
        </demo-block>

        <demo-block title="限制最大可选数">
            <van-checkbox-group
                v-model="state.result2"
                :max="2">
                <van-checkbox name="a">复选框 a</van-checkbox>
                <view class="h-2"></view>
                <van-checkbox name="b">复选框 b</van-checkbox>
                <view class="h-2"></view>
                <van-checkbox name="c">复选框 c</van-checkbox>
            </van-checkbox-group>
        </demo-block>

        <demo-block title="全选与反选">
            <van-checkbox-group
                v-model="state.checkAllResult"
                ref="group">
                <van-checkbox name="a">复选框 a</van-checkbox>
                <view class="h-2"></view>
                <van-checkbox name="b">复选框 b</van-checkbox>
                <view class="h-2"></view>
                <van-checkbox name="c">复选框 c</van-checkbox>
            </van-checkbox-group>

            <div class="mt-2 flex gap-2">
                <van-button
                    type="primary"
                    size="small"
                    @click="checkAll">
                    全选
                </van-button>
                <van-button
                    type="primary"
                    size="small"
                    @click="toggleAll">
                    反选
                </van-button>
            </div>
        </demo-block>

        <demo-block
            title="搭配单元格组件使用"
            :card="false">
            <van-checkbox-group v-model="state.result3">
                <van-cell-group inset>
                    <van-cell
                        v-for="(item, index) in state.list"
                        clickable
                        :key="index"
                        :title="`复选框 ${item}`"
                        @click="toggle(index)">
                        <template #rightIcon>
                            <van-checkbox
                                :ref="setRefs(index)"
                                :name="item"
                                @click.stop />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </demo-block>

        <demo-block title="不确定状态">
            <view class="border-0 border-b border-neutral-200 border-solid mb-3 pb-3">
                <van-checkbox
                    v-model="state.isCheckAll"
                    :indeterminate="state.isIndeterminate"
                    @change="checkAllChange">
                    全选
                </van-checkbox>
            </view>
            <van-checkbox-group
                v-model="state.result4"
                @change="checkedResultChange">
                <template
                    v-for="item in list"
                    :key="item">
                    <van-checkbox :name="item"> 复选框 {{ item }} </van-checkbox>
                    <view class="h-2"></view>
                </template>
            </van-checkbox-group>
        </demo-block>
    </view>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import { useRefs } from '@/uni_modules/uvant-ui'
import { cdnURL } from '@/utils'

const state = reactive({
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
    isCheckAll: false,
    isIndeterminate: true,
    checkboxLabel: true,
    checkboxIcon: true,
    leftLabel: false,
    list: ['a', 'b'],
    result: ['a', 'b'],
    checkboxShape: ['a', 'b'],
    result2: [],
    result3: [],
    result4: ['a', 'b', 'd'],
    checkAllResult: [],
    horizontalResult: [],
})

const group = ref()
const list = ['a', 'b', 'c', 'd']

onMounted(() => {
    nextTick(() => {
        console.log(group.value)
    })
})

const checkAll = () => {
    group.value?.toggleAll(true)
}

const toggleAll = () => {
    group.value?.toggleAll()
}

const [refs, setRefs] = useRefs()
const toggle = (index) => {
    refs.value[index].toggle()
}

const checkAllChange = (val) => {
    state.result4 = val ? list : []
    state.isIndeterminate = false
}

const checkedResultChange = (value) => {
    const checkedCount = value.length
    state.isCheckAll = checkedCount === list.length
    state.isIndeterminate = checkedCount > 0 && checkedCount < list.length
}
</script>

<style lang="scss" scoped></style>
