<template>
    <v-chart autoresize :options="optionData" theme="macarons" ></v-chart>
</template>

<script>
import 'echarts/lib/chart/line'
export default{
    data(){
        return{
           
        }
    },
    props:{
        options:{
            type:Object,
            required:true
        }
    },
    computed:{
        optionData(){
            let defaultData = {
                xAxis: {
                    type: 'category',
                    data: this.options.bottomData,
                },
                yAxis: {
                    type: 'value'
                }
            }
            let series = [];
            this.options.params.forEach(e=>{
                series.push({
                    data:e.data,
                    type: 'line',
                    smooth: true
                })
            })
            defaultData.series = series;
            return defaultData;
        }
    }
}


</script>

