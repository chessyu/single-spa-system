<template>
    <div class="mainSys__home animation-left">
        <div class="mainSys__home home_overflow" >
            <Row class="mainSys__home-header" >
                <Col :sm="12" :md="12" :lg="6">
                    <pc-card class="pcCard card_money" icon="logo-bitcoin" :iconColor="'#00ff14'" name="销售金额" :number="152658"></pc-card>
                </Col>
                <Col :sm="12" :md="12" :lg="6">
                    <pc-card class="pcCard card_order" icon="md-cart" :iconColor="'#2f89b5'" name="订单数" :number="13698"></pc-card>
                </Col>
                <Col :sm="12" :md="12" :lg="6">
                    <pc-card class="pcCard card_next" icon="md-alarm" :iconColor="'#a656ff'" name="待处理" :number="50"></pc-card>
                </Col>
                <Col :sm="12" :md="12" :lg="6">
                    <pc-card class="pcCard card_finsh" icon="md-cloud-done" :iconColor="'red'" name="已接渠道" :number="125"></pc-card>
                </Col>
            </Row>
            <Row class="mainSys__home-content" >
                <Col :sm="24">
                    <v-chart autoresize :options="domeCenter" theme="macarons" ></v-chart>
                </Col>
            </Row>
            <Row  class="mainSys__home-footer">
                <Col :xs="2" :sm="4" :md="6" :lg="8">
                    <v-chart autoresize :options="option1" theme="macarons" @mergeOptions="mergeOptions"/>
                </Col>
                <Col :xs="20" :sm="16" :md="12" :lg="8">
                    <v-chart autoresize :options="polar"  theme="macarons"/>
                </Col>
                <Col :xs="2" :sm="4" :md="6" :lg="8">
                    <v-chart autoresize :options="option2" theme="macarons" />
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/pie'

export default{
    data () {
        let data = []
        for (let i = 0; i <= 360; i++) {
            let t = i / 180 * Math.PI
            let r = Math.sin(2 * t) * Math.cos(2 * t)
            data.push([r, i])
        }
        return {

            // cardIcon:'logo-freebsd-devil',   //iview 图标
            // cardName:'title',
            // cardNumber:150552,
            polar: {
                title: {
                    text: '极坐标双数值轴'
                },
                legend: {
                    data: ['line']
                },
                polar: {
                    center: ['50%', '51%']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                radiusAxis: {
                    min: 0
                },
                series: [
                    {
                        coordinateSystem: 'polar',
                        name: 'line',
                        type: 'line',
                        showSymbol: false,
                        data: data
                    }
                ],
                animationDuration: 2000
            },
            domeCenter:{
                    xAxis: {
                        type: 'category',
                        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    },
                    {
                        data: [890, 732, 901, 534,690, 1930, 1820],
                        type: 'line',
                        smooth: true
                    },
                    {
                        data: [390, 932, 201, 934,390, 1530, 1420],
                        type: 'line',
                        smooth: true
                    }
                    ]
            },
            option1 : {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '业务指标',
                        type: 'gauge',
                        detail: {formatter: '{value}%'},
                        data: [{value: 80, name: '完成率'}]
                    }
                ]
            },
            option2:{
                title: {
                    text: '同名数量统计',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: this.genData(10).legendData,

                    selected: this.genData(10).selected
                },
                series: [
                    {
                        name: '姓名',
                        type: 'pie',
                        radius: '55%',
                        center: ['40%', '50%'],
                        data: this.genData(10).seriesData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    },
    created(){
        
    },
    methods:{
        mergeOptions(){
            setInterval(function (){
                this.option1.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
                this.option1.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
                this.option1.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
                this.option1.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
                // myChart.setOption(this.option1,true);
            },2000);
        },
        genData(count){
            var nameList = [
                '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
            ];
            var legendData = [];
            var seriesData = [];
            var selected = {};
            for (var i = 0; i < count; i++) {
                name = Math.random() > 0.65
                    ? makeWord(4, 1) + '·' + makeWord(3, 0)
                    : makeWord(2, 1);
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: Math.round(Math.random() * 100000)
                });
                selected[name] = i < 6;
            }

            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected
            };

            function makeWord(max, min) {
                var nameLen = Math.ceil(Math.random() * max + min);
                var name = [];
                for (var i = 0; i < nameLen; i++) {
                    name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
                }
                return name.join('');
            }
        }
    }
}
</script>

<style lang="less" >
.card_content{
    text-align: center;
}
.pcCard{
    background: #fff;
}
.card_money .i{
    color: #e5cf0d;
}
.card_order .i{
    color: #b6a2de;
}
.card_next .i{
    color: #d87a80;
}
.card_finsh .i{
    color: #3bc88a;
}
.mainSys__home{
    height: 100%;
    // background: url('../../assets/img/home.jpg') no-repeat;
    // background-size: 100% 100%;
    .home_overflow{
        overflow-y: auto;
    }
    .ivu-row > .ivu-col{
        height: 100%;
        padding: 0 5px;
    }
    .mainSys__home-header{
        height: 150px;
        margin-bottom: 10px;
    }
    .mainSys__home-content{
        height: calc(100% - 370px);
        min-height: 400px;
        margin-bottom: 10px;
        .echarts {
            width: 100%;
            height: 100%;
            background: #fff;
        }
        
    }
    .mainSys__home-footer{
        height: 200px;
        .echarts {
            width: 100%;
            height: 100%;
            background: #fff;
        }
    }
}

</style>