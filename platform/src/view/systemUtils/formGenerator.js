export default{
    data(){
        return{
            isOpen:false,
            formData:{},
            select:'',
            selectData:[
                {
                    label:"报表A",
                    value:10
                },
                {
                    label:"报表B",
                    value:11
                },
                {
                    label:"报表C",
                    value:12
                },
                {
                    label:"报表D",
                    value:13
                },
            ]
        }
    },
    methods:{
        getData(data){
            if(data.formItemConf.length > 0){
                this.formData = data;
                this.isOpen = true;
            }else{
                this.$Message.error('当前未配置任何组件！！');
            }
            
        },
        onOk(){
            setTimeout(() => {
                this.isOpen = false;
                console.log(this.formData)
            }, 2000);
        }
    }
}