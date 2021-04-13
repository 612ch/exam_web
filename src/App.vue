<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/

    /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
    .el-table th.gutter{
        display: table-cell!important;
    }
</style>
