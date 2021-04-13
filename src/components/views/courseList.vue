<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 科目管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" @click="addVisible = true;">添加</el-button>
            </div>
            <el-table
                    :data="courseList"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >
                <el-table-column prop="courseId" label="科目编号" align="center"></el-table-column>
                <el-table-column prop="courseName" label="科目名称" align="center"></el-table-column>
                <el-table-column label="分科情况" align="center">
                    <template slot-scope="scope">{{scope.row.division=='1'?'文科':(scope.row.division=='2'?'理科':'未分科')}}
                    </template>
                </el-table-column>
                <el-table-column prop="grade.gradeName" label="所属年级" align="center"></el-table-column>
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
                <el-form-item label="科目编号" style="display: none">
                    <el-input v-model="form.courseId"></el-input>
                </el-form-item>
                <el-form-item label="科目名称">
                    <el-input v-model="form.courseName"></el-input>
                </el-form-item>
                <el-form-item label="分科情况">
                    <el-select v-model="form.division" placeholder="请选择分科情况" style="width:350px">
                        <el-option
                                v-for="state in StatusOptions"
                                :key="state.key"
                                :value="state.key"
                                :label="state.display_name"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="所属年级">
                    <el-select v-model="form.grade.gradeName" placeholder="请选择年级" style="width:350px">
                        <el-option
                                v-for="state in gradeList"
                                :key="state.gradeId"
                                :value="state.gradeId"
                                :label="state.gradeName"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 新增-->
        <el-dialog v-dialogDrag title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="科目名称">
                    <el-input v-model="form.courseName"></el-input>
                </el-form-item>
                <el-form-item label="分科情况">
                    <el-select v-model="form.division" placeholder="请选择分科情况" style="width:350px">
                        <el-option
                                v-for="state in StatusOptions"
                                :key="state.key"
                                :value="state.key"
                                :label="state.display_name"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="所属年级">
                    <!--<el-input v-model=""></el-input>-->
                    <el-select v-model="form.gradeId" placeholder="请选择年级" style="width:350px">
                        <el-option
                                v-for="state in gradeList"
                                :key="state.gradeId"
                                :value="state.gradeId"
                                :label="state.gradeName"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { api } from '../common/api';

    export default {
        name: 'courseList',
        data() {
            return {
                StatusOptions: [
                    { key: '0', display_name: '未分科' },
                    { key: '1', display_name: '文科' },
                    { key: '2', display_name: '理科' }
                ],
                gradeList: [],
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                courseList: [],
                delList: [],
                editVisible: false,
                addVisible: false,
                pageTotal: 0,
                form: {
                    grade: {
                        gradeId: '',
                        gradeName: ''
                    },
                    division: ''
                },
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
                this.$http.get(api.course.get, {
                    params: this.query
                }).then(({ data }) => {
                    this.courseList = data.items;
                    this.pageTotal = data.total;
                    //加载班级信息
                    this.$http.get(api.grade.get).then(({ data }) => {
                        this.gradeList = data.items;
                    });
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
                        this.$http.delete(api.course.delete + row.courseId).then(({ data }) => {
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
                    });
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = JSON.parse(JSON.stringify(index));
                this.form = JSON.parse(JSON.stringify(row));
                /*this.idx = index;
                this.form = row;*/
                this.form.division=='1'? this.form.division='文科': (this.form.division=='2'?this.form.division='理科':this.form.division='未分科')
                this.editVisible = true;
            },
            // 保存新增
            saveAdd() {
                let params=JSON.parse(JSON.stringify(this.form));
                if(params.division=="未分科"||params.division=="理科"||params.division=="文科"){
                    params.division=="未分科" ? params.division=0 : (params.division=='理科'?params.division=1:params.division=2)
                }
                this.$http.post(api.course.add, this.$qs.stringify(params)).then(({ data }) => {
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
            //取消
            cancel() {
                this.editVisible = false;
                this.addVisible = false;
            },
            // 保存编辑
            saveEdit() {
                let params=JSON.parse(JSON.stringify(this.form));
                if(params.division=="未分科"||params.division=="理科"||params.division=="文科"){
                    params.division=="未分科" ? params.division=0 : (params.division=='理科'?params.division=1:params.division=2)
                }
                this.$http.put(api.course.save, this.$qs.stringify(params)).then(({ data }) => {
                    if (data.code == 200) {
                        this.editVisible = false;
                        this.$message.success(data.msg);
                        this.getData();
                        /*this.$set(this.tableData, this.idx, this.form);*/
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

</style>
