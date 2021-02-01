<template>
    <Modal
        :title="conf.title"
        v-model="isShow"
        :closable="false"
        :ok-text="conf.okText"
        :cancel-text="conf.cancelText"
        @on-ok="conf.onOk"
        @on-cancel="cancel"
        class-name="vertical-center-modal">
        {{conf.content}}
    </Modal>
</template>

<script>
export default{
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
        conf:{
            type:Object,
            default:{}
        },
        // title:{
        //     type:String,
        //     default:'title'
        // },
        // content:{
        //     type:String,
        //     default:''
        // },
        // okText:{
        //     type:String,
        //     default:'确定'
        // },
        // cancelText:{
        //     type:String,
        //     default:'取消'
        // },
        // onOk:{
        //     type:Function,
        //     required:false
        // }
    },
    computed
}
</script>

<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>