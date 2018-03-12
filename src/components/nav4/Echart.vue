<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {getEcharts} from '../../api/api'
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                chartColumnData: {},
                chartBarData: {},
                chartLineData: {},
                chartPieData: {},
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption(this.chartColumnData);
            },
            drawBarChart() {
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartBar.setOption(this.chartBarData);
            },
            drawLineChart() {
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption(this.chartLineData);
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption(this.chartPieData);
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawBarChart()
                this.drawLineChart()
                this.drawPieChart()
            },
        },

        mounted: function () {
          getEcharts().then(item=>{
             this.chartColumnData =  item.data.msg.chartColumn? item.data.msg.chartColumn: {},
             this.chartBarData =  item.data.msg.chartBar? item.data.msg.chartBar: {},
             this.chartLineData =  item.data.msg.chartLine? item.data.msg.chartLine:{},
             this.chartPieData =  item.data.msg.chartPie? item.data.msg.chartPie:{}
             this.drawCharts()
          })
        
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }

    .el-col {
        padding: 30px 20px;
    }
</style>
