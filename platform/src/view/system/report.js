import echartLine from '@/component/echarts/line.vue'
import echartBar from '@/component/echarts/bar.vue'
import echartPie   from '@/component/echarts/pie.vue'
import echartCandlestick from '@/component/echarts/candlestick.vue'

export default{
    data(){
        return{
            data:[],
            menuData: [],
            showAdd:false,
            loading:false,
            selectRow:{},
            menuQuery:{
                pageNum: 1,
                pageSize: 10,
                roleName: undefined,
                roleKey: undefined,
                status: undefined,
                beginTime:'',
                endTime:''
            },
            actionType:'',
            rowData:{},
            options:{
                bottomData : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                params : [
                    {
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    },
                    {
                        data:[890, 732, 901, 534,690, 1930, 1820]
                    },
                    {
                        data:[390, 932, 201, 934,390, 1530, 1420]
                    }
                ]
            },
            barOptions:{},
            pieOptions:{}
        }
    },
    mounted(){
        this.postOrganizational(this.menuQuery);
    },
    methods:{
        //获取报表的数据
        async postOrganizational(param){
            
        },
        query(){  //查询
            this.postOrganizational(this.menuQuery)
        },
        reset(){  //重置
            this.$refs['roleForm'].resetFields();
        },
    },
    components:{
        echartLine,
        echartBar,
        echartPie,
        echartCandlestick,
    }

}