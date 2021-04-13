<template>
    <div class="sidebar">
        <!--深色主题-->
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router
        >

        <!--浅绿色主题-->
        <!--<el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                unique-opened
                router
        >-->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >{{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'index',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-people',
                        index: '2',
                        title: '基本信息',
                        subs: [
                            {
                                icon: 'el-icon-lx-people',
                                index: 'gradeList',
                                title: '年级管理'
                            },
                            {
                                icon: 'el-icon-lx-people',
                                index: 'courseList',
                                title: '科目管理'
                            }
                        ]
                    }, {
                        icon: 'el-icon-lx-group',
                        index: '3',
                        title: '班级管理',
                        subs: [
                            {
                                index: 'classList',
                                title: '班级管理'
                            },
                            {
                                index: 'studentCount',
                                title: '班级统计'
                            }
                        ]
                    }, {
                        icon: 'el-icon-lx-profile',
                        index: '4',
                        title: '教师管理',
                        subs: [
                            {
                                index: 'teacherList',
                                title: '所有教师'
                            }
                        ]
                    }, {
                        icon: 'el-icon-lx-friend',
                        index: '5',
                        title: '学生管理',
                        subs: [
                            {
                                index: 'studentList',
                                title: '所有学生'
                            },
                            {
                                index: 'examList',
                                title: '考试信息'
                            }
                        ]
                    }, {
                        icon: 'el-icon-lx-file',
                        index: '6',
                        title: '试卷管理',
                        subs: [
                            {
                                index: 'paperList',
                                title: '所有试卷'
                            }
                        ]
                    }, {
                        icon: 'el-icon-lx-punch',
                        index: '7',
                        title: '试题管理',
                        subs: [
                            {
                                index: 'subjectList',
                                title: '所有试题'
                            }, {
                                index: 'initImport',
                                title: '导入试题'
                            }
                        ]
                    }, {
                        icon: 'el-icon-lx-calendar',
                        index: '8',
                        title: '考试管理',
                        subs: [
                            {
                                index: 'examPlanList',
                                title: '待考信息'
                            }, {
                                index: 'examHistoryList',
                                title: '考试记录'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-settings',
                        index: 'setting',
                        title: '系统设置'
                    }
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
