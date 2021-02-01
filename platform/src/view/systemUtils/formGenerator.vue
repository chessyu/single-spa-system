<template>
    <div class="ht_content-container animation-left">
        <pc-form-generator @postFormData="getData"></pc-form-generator>
        <Modal v-model="isOpen"   :mask-closable="false"  @on-ok="onOk" loading>
            <p slot="header" style="color:#00afff;text-align:center">
                <Icon type="md-locate" />
                <span>选择业务模块</span>
            </p>
            <Select v-model="select" >
                <Option v-for="item in selectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Modal>
    </div>
</template>

<script src="./formGenerator.js"></script>

<style lang="less">

</style>