<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 所有教师
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-lx-friendadd"
                        class="handle-del mr10"
                        @click="addVisible = true"
                >添加</el-button>
                <el-input v-model="query.teacherName" placeholder="姓名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="teacherList"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <el-table-column prop="teacherId" label="教师编号" align="center"></el-table-column>
                <el-table-column prop="teacherName" label="教师姓名" align="center"></el-table-column>
                <el-table-column prop="teacherAccount" label="后台账户" align="center"></el-table-column>
                <el-table-column prop="adminPower" label="后台权限" align="center"></el-table-column>
                <el-table-column prop="class.classname" label="班主任" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 编辑 -->
        <el-dialog v-dialogDrag title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="年级编号" style="display: none">
                    <el-input v-model="form.gradeId"></el-input>
                </el-form-item>
                <el-form-item label="年级名称">
                    <el-input v-model="form.gradeName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 新增-->
        <el-dialog v-dialogDrag title="新增" :visible.sync="addVisible"  width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="年级名称">
                    <el-input v-model="form.gradeName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { api } from '../common/api';

    export default {
        name: 'teacherList',
        data() {
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                teacherList: [],
                gradeList: [],
                delList: [],
                editVisible: false,
                addVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取数据
            getData() {
                this.$http.get(api.teacher.get, {
                    params: this.query
                }).then(({ data }) => {
                    this.teacherList = data.items;
                    this.pageTotal = data.total;
                }).catch(() => {

                });
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$http.delete(api.grade.delete + row.gradeId).then(({ data }) => {
                            if (data.code = 200) {
                                this.$message.success(data.msg);
                                if ((this.pageTotal - 1) % 10 == 0) {
                                    --this.query.pageIndex;
                                }
                                this.getData();
                            } else {
                                this.$message.error(data.msg);
                            }
                        }).catch(reps => {
                            console.log(reps);
                        });
                    })
                    .catch(() => {
                        this.$message.info("删除已取消");
                    });
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 保存新增
            saveAdd() {
                this.$http.post(api.grade.add, this.$qs.stringify(this.form)).then(({ data }) => {
                    if (data.code == 200) {
                        this.addVisible = false;
                        this.$message.success(data.msg);
                        this.getData();
                    } else {
                        this.$message.error(data.msg);
                    }
                }).catch(reps => {
                    console.log(reps);
                });

            },
            // 保存编辑
            saveEdit() {
                this.$http.put(api.grade.save, this.$qs.stringify(this.form)).then(({ data }) => {
                    if (data.code == 200) {
                        this.editVisible = false;
                        this.$message.success(data.msg);
                        this.$set(this.tableData, this.idx, this.form);
                    }
                }).catch(reps => {
                    console.log(reps);
                });

            },
            // 分页导航
            handlePageChange(val) {
                this.pageIndex = val;
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

</style>
