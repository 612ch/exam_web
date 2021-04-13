<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 班级统计
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="hover">
                        <schart class="schart" style="width: 550px" canvasId="bar" :options="options1"></schart>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover">
                        <schart class="schart" style="width: 550px" canvasId="line" :options="options2"></schart>
                    </el-card>
                </el-col>
                <!--<div class="schart-box">
                    <div class="content-title">饼状图</div>
                    <schart class="schart" canvasId="pie" :options="options3"></schart>
                </div>
                <div class="schart-box">
                    <div class="content-title">环形图</div>
                    <schart class="schart" canvasId="ring" :options="options4"></schart>
                </div>-->
            </el-row>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';

    export default {
        name: 'studentCount',
        components: {
            Schart
        },
        data() {
            return {
                options1: {
                    type: 'bar',
                    title: {
                        text: '各班级人数统计'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['一班', '二班', '三班', '四班', '五班', '五班', '五班', '五班', '五班', '五班'],
                    datasets: [
                        {
                            label: '各班级人数',
                            fillColor: 'rgba(241, 49, 74, 0.5)',
                            data: [1, 1, 2, 1, 2, 1, 2, 5, 40, 20]
                        }
                    ]
                },
                options2: {
                    type: 'line',
                    title: {
                        text: '各年级登陆次数'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['6月', '7月', '8月', '9月', '10月'],
                    datasets: [
                        {
                            label: '高一',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '高二',
                            data: [164, 178, 150, 135, 160]
                        },
                        {
                            label: '高三',
                            data: [114, 138, 200, 235, 190]
                        }
                    ]
                }/*,
                options3: {
                    type: 'pie',
                    title: {
                        text: '服装品类销售饼状图'
                    },
                    legend: {
                        position: 'left'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['T恤', '牛仔裤', '连衣裙', '毛衣', '七分裤', '短裙', '羽绒服'],
                    datasets: [
                        {
                            data: [334, 278, 190, 235, 260, 200, 141]
                        }
                    ]
                },
                options4: {
                    type: 'ring',
                    title: {
                        text: '环形三等分'
                    },
                    showValue: false,
                    legend: {
                        position: 'bottom',
                        bottom: 40
                    },
                    bgColor: '#fbfbfb',
                    labels: ['vue', 'react', 'angular'],
                    datasets: [
                        {
                            data: [500, 500, 500]
                        }
                    ]
                }*/
            };
        }
    };
</script>

<style scoped>

    .schart {
        width: 600px;
        height: 400px;
    }
</style>
