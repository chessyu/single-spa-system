<template>
    <div class="ht_content-container animation-left">
        <div class="ht_content-view">
            <div class="ht__query-box">

            </div>
            <div class="sys__table">
                <Tabs>
                    <TabPane label="柱状图" icon="ios-podium">
                        <echart-bar :options="barOptions" style="width:100%;"></echart-bar>
                    </TabPane>
                    <TabPane label="折线图" icon="logo-steam">
                        <echart-line :options="options" style="width:100%;"></echart-line>
                    </TabPane>
                    <TabPane label="饼状图" icon="md-pie">
                        <echart-pie :options="options" style="width:100%;"></echart-pie>
                    </TabPane>
                    <TabPane label="K线图" icon="md-trending-up">
                        <echart-candlestick :options="options" style="width:100%;"></echart-candlestick>
                    </TabPane>
                </Tabs>
            </div>
        </div>

    </div>
</template>

<script src="./report.js"></script>

<style lang="less" scoped>

</style>