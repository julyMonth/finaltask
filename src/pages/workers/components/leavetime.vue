<template>
<div class="conbox">
    <div class="table-title">
            {{msg}}
    </div>
    <div class="title-box" >
        <div class="search">
          <el-form ref="form" size="small">
            <el-form-item label="姓名"  label-width="40px">
              <el-input  type="text" v-model="name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="工号"  label-width="50px">
              <el-input  type="text" v-model="sid" placeholder="请输入工号"></el-input>
            </el-form-item>
            <el-form-item label="时间" label-width="50px">
              <el-date-picker
              value-format="yyyy-MM-dd" 
              v-model="times"
              type="daterange"
              unlink-panels
              style="width:240px"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="50px">
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-box">
            <el-button  class="el-icon-plus" size="mini" @click= "putin"> 新增</el-button>
        </div>
    </div>
    <div class="table-box">
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="height:100%;overflow:auto">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="140"
                        align="center">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="140"
                    align="center">
                    </el-table-column>
                     <!-- <el-table-column
                    prop="sex"
                    label="性别"
                    width="140">
                    </el-table-column> -->
                    <el-table-column
                    label="工号"
                    width="140"
                    align="center">
                        <template slot-scope="scope">{{ scope.row.number }}</template>
                    </el-table-column>
                    <el-table-column
                    label="请假开始日期"
                    width="140"
                    align="center">
                        <template slot-scope="scope">{{ scope.row.begin }}</template>
                    </el-table-column>
                    <el-table-column
                    label="请假结束时间"
                    width="140"
                    align="center">
                        <template slot-scope="scope">{{ scope.row.end }}</template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      show-overflow-tooltip>
                       <template slot-scope="scope">
                         <el-button type="text" size="small" class="word-left" @click="handleClick(scope.row)">编辑</el-button>
                         <el-button type="text" size="small" class="word-left" @click="handleClick2(scope.row)">删除</el-button>
                        </template>
                     </el-table-column>
             </el-table>
    </div>
    <div  class="pagination-box">
      <el-pagination
      :page-size="pageSize"
      :pager-count=5
      layout="prev, pager, next"
       @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
    </div>
    <!-- 点击新增后的大弹框 -->
    <div class="workerConbox" v-show="show">
      <div class="table-title">
            {{"员工信息"}}
    </div>
        <div class="title-box">
            <div class="search">
              <el-form ref="form" size="small">
                <el-form-item label="姓名"  label-width="40px">
                  <el-input  type="text" v-model="userName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="工号"  label-width="50px">
                  <el-input  type="text" v-model="number" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item label-width="50px">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="searchleave">搜索</el-button>
                </el-form-item>
                <el-form-item label-width="50px">
                    <el-button type="primary" size="small" icon="el-icon-close" @click="cancel">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
        <div class="table-box">
            <el-table
                ref="multipleTable"
                :data="workerData"
                height="100%"
                tooltip-effect="dark"
                style="height: 100%;overflow:auto"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="160"
                        align="center">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="240"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    label="工号"
                    width="240"
                    align="center">
                        <template slot-scope="scope">{{ scope.row.number }}</template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button type="text" size="small" class="word-left" @click="handleClick3(scope.row)">请假</el-button>
                        </template>
                      </el-table-column>
              </el-table>
        </div>
        <div  class="pagination-box">
          <el-pagination
          :page-size='pageSize'
          :pager-count=5
          @current-change="handleCurrentChange2"
          layout="prev, pager, next"
          :total='total'>
        </el-pagination>
        </div>
        <!-- 点击新增后弹框后的请假的弹框 -->
        <el-dialog
          title="请假单"
          top="15%"
          width="500px"
          :visible.sync="hideToshow">
          <div>
            <el-form class="demo-form-inline"  label-width="80px">
              <el-form-item label="姓 名">
                <el-input disabled v-model="workername" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="工 号">
                <el-input disabled v-model="workernumber" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="开 始">
                <el-date-picker
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="startDate"
                    type="date"
                    style="width:300px"
                    placeholder="选择请假开始时间"
                    :picker-options="pickerOptions0"
                    >
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结 束">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                    v-model="endDate"
                    type="date"
                    style="width:300px"
                    placeholder="选择请假结束时间"
                    :picker-options="pickerOptions0"
                    >
                  </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="addConfirm">确认</el-button>
              <el-button type="primary" plain style="margin-left:40px" @click="cancel1">取消</el-button>
          </div>
        </el-dialog>
    </div>
    <!-- 点击编辑后的弹框 -->
    <el-dialog
      title="修改请假单"
      top="15%"
      width="500px"
      :visible.sync="mask">
      <div>
        <el-form class="demo-form-inline"  label-width="80px">
          <el-form-item label="姓 名">
            <el-input disabled v-model="workername" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="工 号">
            <el-input disabled  v-model="workernumber" style="width:300px"></el-input>
          </el-form-item>
           <el-form-item label="开 始">
             <el-date-picker
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="start"
                type="date"
                style="width:300px"
                placeholder="选择请假开始时间"
                >
              </el-date-picker>
          </el-form-item>
           <el-form-item label="结 束">
             <el-date-picker
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                v-model="end"
                type="date"
                style="width:300px"
                placeholder="选择请假结束时间">
              </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary" plain @click="confirm">确认</el-button>
          <el-button type="primary" plain style="margin-left:40px" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
export default {
  name: "leavetime",
  data() {
    return {
      mask: false,
      show: false,
      hideToshow:false,
      msg: "员工请假报表",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      //搜索条件
      name: "",
      sid: "",
      id :'',
      times: "",
      startTime: "",
      endTime: "",
      //新增数据
      addname: "",
      addid: "",
      start: "",
      end: "",
      value:'',
      // 请假新增弹框搜索条件
      userName: "",
      number: "",
      //请假数据
      singleId: "",
      workername:"",
      workernumber:'',
      startDate: "",
      endDate: "",
      workerData: [],
      tableData: [],
       maxDay : '',
      startPickerOptions: {//开始
            disabledDate: picked => {
                let to = picked.getTime()
                // console.log(new Date().getTime() - 8.64e7)
                return to < new Date().getTime() - 8.64e7
            }
        },
        endPickerOptions: {//结束
          disabledDate: picked => {
              let to = picked.getTime();
              if (this.startDate) {
                  return (
                       to < (new Date(this.startDate)).getTime() ||
                       to > this.maxDay.getTime()
                  );
              } else {
                 return to < new Date()
              }
          }
        },


    };
  },
  watch: {
    times(newValue, oldValue) {
      if(newValue && newValue.length == 2){
        this.startTime = newValue[0];
        this.endTime = newValue[1];
      }else{
        this.startTime = '';
        this.endTime = '';
      }
    },
     startDate(newV,oldV){
        let date = new Date(newV)
        let year = date.getFullYear() + '';
        let month = date.getMonth() + 1 + '';
       if(this.endDate){
        let end = new Date(this.endDate)
        let endYear = end.getFullYear() + ''
        let endMonth = end.getMonth() + 1 + '';
        if (year !== endYear) {
          this.endDate = ''
           this.maxDay = new Date(year,month,0);
        } else {
          if(month !== endMonth){
           this.maxDay = new Date(year,month,0);
          }
        }
       } else {
          this.maxDay = new Date(year,month,0);
       } 
      },
      endDate(newV,oldV){
        if(newV){
          let date = new Date(newV)
          let year = date.getFullYear() + '';
          let month = date.getMonth() + 1 + '';
          if(this.startDate){
            let start = new Date(this.startDate)
            let startYear = start.getFullYear() + ''
            let startMonth = start.getMonth() + 1 + '';
            if(month !== startMonth){
              this.maxDay = new Date(year,month,0);
            }
          } else {
              this.maxDay = new Date(year,month,0);
          } 
        }
      }
  },
  created() {
    this.renderLeavetime();
  },
  methods: {
    // 渲染列表
    renderLeavetime() {
      let params = {
        currentPage: this.currentPage, //要显示的页码|
        pageSize: this.pageSize //|一页显示的数量|
      };
        this.$axios.post("leave/leaveInfo", params)
      //  this.$axios .get("../../../../static/leave.json", params)
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
              this.$message({
              showClose: true,
              message: res.data.message,
              type: "warning"
            });
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(() => {
            this.$message.error('数据请求失败');
            this.tableData = [];
            this.total = 0;
        });
    },
    // 请假搜索
    search() {
      this.currentPage = 1;
        if(this.sid!== ""){
         var reg = /^\d*$/;
         if (!reg.test(this.sid)) {
         this.$message({
              message: '工号类型错误',
              type: 'warning'
          });
          return;
           }
       };
      let params = {
        name: this.name, //|员工姓名|
        sid: this.sid, //||员工工号|
        begin: this.startTime, //|搜索起始时间|
        end: this.endTime, //|搜索结束时间|
        currentPage: this.currentPage, //要显示的页码|
        pageSize: this.pageSize //|一页显示的数量|
      };
      this.$axios
        .post("leave/searchLeave", params)
        // .get("../../../../static/leave.json", params)
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
                this.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(() => {
           this.$message.error('数据请求失败');
          this.tableData = [];
          this.total = 0;
        });
    },
    resetAdd() {
      // 清空新增信息
      this.addname = "";
      this.addid = "";
      this.start = "";
      this.end = "";
      this.name= "";
      this.sid = "";
      this.startTime = "",
      this.endTime = "";
       this.userName = "";
      this.number = "";
    },
    // 点击新增按钮后，调用员工信息接口，然后渲染弹出框
    getUserMsg() {
         if(this.number!== ""){
         var reg = /^\d*$/;
         if (!reg.test(this.number)) {
         this.$message({
              message: '工号类型错误',
              type: 'warning'
          });
          return;
           }
       };
      let params = {
        page: this.currentPage, //要显示的页码|
        limit: this.pageSize, //|一页显示的数量|
        number: this.number, //员工工号|
        name: this.userName, //|员工姓名|
      };
      this.$axios
        .post("upload/selectStaff", params)
        // .get("../../../../static/add.json", params)
        .then(res => {
          if (res.data.status == 200) {
            if( res.data.data.list.length!==0){
               this.workerData = res.data.data.list;
               this.total = res.data.data.total;
            }else{
              this.$message('未搜索到数据');
            }  
          } else {
         this.$message({
              message: res.data.message,
              type: 'warning'
            });
            this.workerData = [];
            this.total = 0;
          }
        })
        .catch(() => {
          this.$message.error('数据请求失败');
          this.workerData = [];
          this.total = 0;
        });
    },
    // 添加请假
    putin() {
      this.show = true;
      this.resetAdd();
      this.currentPage = 1;
      this.getUserMsg();
    },
    // 新增弹框中的搜索按钮
    searchleave() {
      this.currentPage = 1;
      this.getUserMsg();

    },
    // 新增弹框中的请假按钮
    handleClick3(row) {
      this.startDate = "";
      this.endDate = "";
      this.workername = "";
      this.workernumber = "";
      this.singleId = -1;
      this.hideToshow = true;
      this.workername = row.name;
      this.workernumber = row.number;
      this.singleId = row.id;
    },
    //新增   弹框中的提交按钮
    addConfirm() {
      if(!this.startDate){
         this.$message({
          showClose: true,
          message: '请输入开始时间',
          type: 'warning'
        });
        return;
      };
      if(!this.endDate){
        this.$message({
          showClose: true,
          message: '请输入结束时间',
          type: 'warning'
        });
        return;
      };
      let parames={
        begin: this.startDate, //请假开始时间
        end:this.endDate,//请假结束时间
        id :this.singleId,//数据单独的id号
      }; 
       this.$axios.post("leave/askForLeave", parames)
      // this.$axios.get("../../../../static/msgs.json",parames)
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "success"
              });
            this.getUserMsg();
            this.hideToshow = false;
            } else {
               this.$message({
                     message: res.data.message,
                    type: 'warning'
                  });
            }
          })
          .catch(err => {
               this.$message.error('数据请求失败');
          });

    },
    // 取消
    cancel() {
      this.show = false;
      this.mask = false;
      this.addname = "";
      this.addid = "";
      this.start = "";
      this.end = "";
      this.startDate= "";
      this.endDate = "";
      this.currentPage = "";
      this.total = 0;
      this.renderLeavetime();  
    },
    cancel1(){
      this.currentPage = "";
      this.total = 0;
      this.hideToshow = false;
      this.workerData = [];
      this.renderLeavetime();
    },
    // 编辑按钮
    handleClick(row) {
      this.resetEdit();
      this.mask = true;
      this.workername = row.name;
      this.workernumber = row.number;
      this.id = row.id;
      this.start = row.begin;
      this.end = row.end;
    },
    // 编辑弹框提交按钮
    confirm() {
      if (!this.start.length) {
          this.$message({
            showClose: true,
            message: '请输入开始时间',
            type: 'warning'
          });
          return;
      }
      if (!this.end.length) {
          this.$message({
            showClose: true,
            message: '请输入结束时间',
            type: 'warning'
          });
          return;
      }
            let start = new Date(this.start);
            let startYear = start.getFullYear() + '';
            let startMonth = start.getMonth() + 1 + '';
            let startDay = start.getDate()+'';


            let end = new Date(this.end);
            let endYear = end.getFullYear() + '';
            let endtMonth = end.getMonth() + 1 + '';
            let endDay = end.getDate()+'';


          if(startYear!==endYear){
              this.$message({
                showClose: true,
                message: '请假时间不能跨年',
                type: 'warning'
              });
              return; 
          }
         else if(startYear==endYear&&startMonth>endtMonth){
             this.$message({
                showClose: true,
                message: '请假时间不能跨月',
                type: 'warning'
              });
              return; 
          }
          else if(startYear==endYear&&startMonth==endtMonth&&startDay>endDay){
             this.$message({
                showClose: true,
                message: '开始时间不能大于结束时间',
                type: 'warning'
              });
              return;  
            }
      let params = {
        name: this.workername, //|员工姓名|
        sid: this.workernumber, //||员工工号|
        begin: this.start, //|搜索起始时间|
        end: this.end, //|搜索结束时间|
        id:this.id,//数据的id
      };
      this.$axios.post("leave/modifyLeave", params)
        .then(res => {
          if (res.status == 200) {
            this.mask = false;
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "success"
            });
           this.renderLeavetime();
          } else {
              this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
          }
        })
        .catch(() => {
          this.$message.error('数据请求失败');
        });
    },
    resetEdit() {
      this.addname = "";
      this.addid = "";
      this.start = "";
      this.end = "";
      this.id = '';
    },
    // 删除按钮
    handleClick2(row) {
      let params = {
        id: row.id,
        end:row.end,
      };
      this.$axios
        .post("leave/deleteLeave", params)
        .then(res => {
          if (res.status == 200) {
            this.renderLeavetime();
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "success"
            });
          } else {

            this.$message({
                message: res.data.message,
                type: 'warning'
              });
          }
        })
        .catch(() => {
            this.$message.error('数据删除失败');
        });
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renderLeavetime();
    },
    // 新增弹框页码
    handleCurrentChange2(val) {
      this.currentPage = val;
      this.getUserMsg();
    },
     handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style scoped>
.conbox {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  padding: 16px 32px;
  box-sizing: border-box;
}
.table-title {
  height: 32px;
  line-height: 32px;
  text-align: left;
  font-weight: bolder;
  font-size: 18px;
}
.title-box {
  width: 100%;
  height: 100px;
  float: left;
}
.table-box {
  height: calc(100% - 170px);
  padding-top: 10px;
  box-sizing: border-box;
  clear: left;
}
.pagination-box {
  height: 50px;
  padding-top: 10px;
}
.btn-box {
  text-align: left;
  padding-top: 8px;
  box-sizing: border-box;
  height: 40px;
}
.search {
  width: 100%;
  height: 50px;
  padding-top: 8px;
  box-sizing: border-box;
}
.search div {
  float: left;
  margin: 0;
}
.tosearch {
  width: 60px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
.dialog-footer {
  display: table;
  margin: 0 auto;
}
.table-box {
  height: calc(100% - 170px);
  padding-top: 10px;
  box-sizing: border-box;
  clear: left;
}
.workerConbox{
  position:absolute;
  /* z-index: 1; */
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 16px 32px;
  box-sizing: border-box;
  top:0;
  left:0;
}
</style>


