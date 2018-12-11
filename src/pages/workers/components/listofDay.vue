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
        height="100%"
        tooltip-effect="dark"
        style="height:100%;overflow:auto">
        <el-table-column type="index" label="序号" width="140" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="140" align="center">
        </el-table-column>
        <el-table-column prop="number" label="工号" width="140" align="center">
        </el-table-column>
        <el-table-column prop="payTime" label="消费时间" width="160" align="center">
        </el-table-column>
        <el-table-column prop="menuName" label="消费类型" width="160" align="center">
        </el-table-column>
        <el-table-column prop="qty" label="数量" width="140" align="center">
        </el-table-column>
        <el-table-column prop="amt" label="金额" width="140" align="center">
        </el-table-column>
        <el-table-column prop="username" label="收银员" width="140" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div  class="pagination-box">
           <!-- <el-pagination
      :page-size="pageSize"
      :pager-count=5
      layout="prev, pager, next"
       @current-change="handleCurrentChange"
       :page-size='pageSize'//
      :total="total">
    </el-pagination> -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size='pageSize'
      layout="prev, pager, next, jumper"
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
                style="height: 100%;overflow:auto">
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
                          <el-button type="text" size="small" class="word-left" @click="handleClick(scope.row)">添加消费记录</el-button>
                        </template>
                      </el-table-column>
              </el-table>
        </div>
        <div  class="pagination-box">
          <el-pagination
          :page-size='pageSize'
          :pager-count= 5
          @current-change="handleCurrentChange2"
          layout="prev, pager, next"
          :total='total'>
        </el-pagination>
        </div>
        <!-- 点击新增消费记录的弹框 -->
        <el-dialog
          title="添加记录"
          top="15%"
          width="500px"
          :visible.sync="hideToshow">
          <div>
            <el-form class="demo-form-inline"  label-width="80px">
              <el-form-item label="姓 名" >
                <el-input disabled v-model="workername" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="工 号">
                <el-input disabled v-model="workernumber" style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="消费金额" style="padding:0">
                <el-input v-model="pays" style="width:300px" ></el-input>
              </el-form-item>
              <el-form-item label="消费时间">
                <el-date-picker
                      v-model="paytime"
                      type="datetime"
                      placeholder="选择日期时间"
                      style="width:300px">
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
</div>
</template>
<script>
export default {
  name: "leavetime",
  data() {
    return {
      show: false,
      hideToshow:false,
      msg: "消费清单",
      currentPage: 1,
      pageSize: 20,
      total: 0,
      //搜索条件
      name: "",
      sid: "",
      times: "",
      startTime: "",
      endTime: "",
      //新增数据
      addname: "",
      addid: "",
      value:'',
      // 请假新增弹框搜索条件
      userName: "",
      number: "",
      //请假数据
      singleId: "",
      workername:"",
      workernumber:'',
      paytime:"",
      pays:"",
      workerData: [],
      tableData: [],
       pickerOptions0: {
         disabledDate: (time) => {
            if (this.endTime) {
              return time.getTime() < this.endTime.getTime()
            } else {
              return time.getTime() < Date.now() - 8.64e7
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
    }
  },
  created() {
    this.renderPayinfo();
  },
  methods: {
    // 渲染列表
    renderPayinfo() {
      let params = {
        name: this.name, //|员工姓名|
        sid: this.sid, //||员工工号|
        startTime: this.startTime, //|搜索起始时间|
        endTime: this.endTime, //|搜索结束时间|
        currentPage: this.currentPage, //要显示的页码|
        pageSize: this.pageSize //|一页显示的数量|
      };
       this.$axios.post("pay/getPayInfo",params)
        // this.$axios.get("../../../../static/list.json",params)
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data;
            this.total = res.data.message;
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
        startTime: this.startTime, //|搜索起始时间|
        endTime: this.endTime, //|搜索结束时间|
        currentPage: this.currentPage, //要显示的页码|
        pageSize: this.pageSize //|一页显示的数量|
      };
      this.$axios.post("pay/getPayInfo", params)
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data;
            this.total = res.data.message;
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
      this.userName = "";
      this.number = "";
      this.sid = "";
      this.name = "";
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
      this.$axios.post("upload/selectStaff", params)
      //  this.$axios.get("../../../../static/msgs.json", params)
        .then(res => {
          if (res.data.status == 200) {
            if( res.data.data.list.length!==0){
              this.workerData = res.data.data.list;
              this.total = res.data.data.total; 
            } else{
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
    // 添加消费记录
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
    handleClick(row) {
      this.pays = "";
      this.paytime = "";
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
      if(!this.pays){
         this.$message({
          showClose: true,
          message: '请输入消费金额',
          type: 'warning'
        });
        return;
      };
      if(!this.paytime){
        this.$message({
          showClose: true,
          message: '请输入消费时间',
          type: 'warning'
        });
        return;
      };
      if(this.pays!== ""){
         var reg = /^(\-|\+)?\d+(\.\d+)?$/;
         if (!reg.test(this.pays)) {
         this.$message({
                showClose: true,
                message: '金额必须为数字',
                type: 'warning'
              });
          return;
           }
       };
       let Tim = this.paytime.getFullYear() + "-"+this.paytime.getMonth()+"-"+this.paytime.getDate()+" "+this.paytime.getHours()+":"+this.paytime.getMinutes()+":"+this.paytime.getSeconds()
      let paysnum=Number(this.pays);
      let parames={
        amt:paysnum,//消费金额
        payTime:Tim,//消费时间
        id :this.singleId,//数据单独的id号
      }; 
      this.$axios.post("pay/extraPayInfo",parames)
      // this.$axios.get("../../../../static/list.json",parames)
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
      this.currentPage = 1;
      this.total = 0;
      this.renderPayinfo();  
    },
    cancel1(){
      this.currentPage = 1;
      this.total = 0;
      this.hideToshow = false;
      this.workerData = [];
      this.renderPayinfo();
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renderPayinfo();
    },
    // 新增弹框页码
    handleCurrentChange2(val) {
      this.currentPage = val;
      this.getUserMsg();
    },
     handleSizeChange(val) {
       this.currentPage = val;    
      },
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
.el-dialog .el-form-item{
  padding: 0!important;
}
</style>


