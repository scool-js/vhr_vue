<template>
    <div>
        <div>
            <el-input
                    size="mini"
                    class="addPosInput"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
        </div>
        <div class="posManaMain">
            <el-table
                    :data="positions"
                    border
                    size="small"
                    stripe
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                 </el-table-column>
            </el-table>
        </div>
        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PosMana",
        data(){
            return{
                pos:{
                    name:""
                },
                positions: [],
                dialogVisible:false
            }
        },
        mounted() {
            this.initPosition()
        },
        methods:{
            showEditView(index,data){
                this.dialogVisible = true;
            },
            addPosition(){
                if(this.pos.name){
                    this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
                        if(resp){
                            this.initPosition()
                            this.pos.name=""
                        }
                    })
                }else {
                    this.$message.error('职位名称不为空');
                }
            },
            handleDelete(index,data){
                this.$confirm('此操作将永久删除【'+data.name+'】职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
                        if(resp){
                            this.initPosition()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initPosition(){
                this.getRequest("/system/basic/pos/").then(resp=>{
                    if(resp){
                        this.positions = resp;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .addPosInput{
        width: 300px;margin-right: 8px
    }
    .posManaMain{
        margin-top: 10px;
        width: 70%;
    }
</style>