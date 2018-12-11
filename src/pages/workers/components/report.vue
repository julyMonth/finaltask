<template>
<div class="conbox">
    <div class="table-title">
            {{msg}}
    </div>
    <div class="title-box">
        <div class="search">
          <el-form ref="form" size="small" :rules='rules'>
            <el-form-item label="姓名"  label-width="40px">
              <el-input  type="text" v-model="userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="工号"  label-width="50px">
              <el-input  type="text" v-model="number" placeholder="请输入工号"></el-input>
            </el-form-item>
            <el-form-item  label="选择"  label-width="50px" >
              <el-select v-model="region" placeholder="请选择统计类型">
                <el-option label="按日统计" value=0></el-option>
                <el-option label="按月统计" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" label-width="50px" >
               <el-date-picker label-width="50px"
                  :value-format="dataType[1][region]" 
                  :type="dataType[0][region]"
                  v-model="time"
                  placeholder="选择日期"
                  style="width:200px"
                  :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label-width="50px">
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-box">
            <el-button class="el-icon-download" size="mini" @click= "exportmsg">批量导出</el-button>
        </div>
    </div>
    <div class="table-box">
        <el-table
              :data="tableData"
              style="overflow:auto;"
              align="center"
               >
                    <el-table-column 
                      type="index"
                      label="序号"
                      width="60"
                      align="center">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="100"
                    align="center">
                    </el-table-column>
                     <el-table-column
                    prop="charge"
                    :label="day[region].charge"
                    align="center"
                    >
                  </el-table-column>
                    <el-table-column
                    prop="mqty"
                    label="早餐次数（次）"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="mamt"
                    label="早餐金额（元）"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="nqty"
                    label="中餐次数（次）"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="namt"
                    label="中餐金额（元）"
                    align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="leavedays"
                    label="请假次数"
                    align="center"
                    >
                    </el-table-column>
                  <el-table-column label="无故未就餐" align="center">
                      <el-table-column
                        prop="absenceDays"
                        label="次数"
                        width="100"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="consume"
                        label="损耗（元）"
                        width="100"
                        align="center">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column
                        prop="otherPrice"
                        label="其他消费"
                        align="center"
                       >
                      </el-table-column>
                      <el-table-column
                        prop="sumAll"
                        :label="day[region].sumAll"
                        width="140"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="balance"
                        label="个人账户余额（元）"
                        width="140"
                        align="center">
                      </el-table-column>
            </el-table>
    </div>
    <div  class="pagination-box">
      <el-pagination
      :page-size='pageSize'
      :pager-count=11
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total='total'>
    </el-pagination>
    </div>
    
</div>
</template>

<script>
export default {
  name: "worker",
  data() {
    return {
      mask: false,
      show: false,
      msg: "员工就餐统计报表",
      region: "1",//报表类型
      //搜索条件,导出数据
      dataType:[{
       0: "date",
       1: "month"
      },
      {
       0: "yyyy-MM-dd",
       1: "yyyy-MM"
      }],//日期类型
      day:[
       {'charge':"当日充值(元)",
       'sumAll':"当日消费金额(元)"
       },
       {'charge':"本月充值(元)",
       'sumAll':"本月消费金额(元)"},
       
      ],
      userName: "",
      number: "",
      time: "",
      currentPage: 1,
      pageSize: 20,
      total:0,
      // tableItem: [], //存放表单项
      tableData: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
       rules:{ 
        number:[{type: 'number', message: '工号必须为数字'}],
        region:[{required:true,message:'请选择报表类型'}],
        time:[{required:true,message:'请输入搜索日期'}],
      }
    };
  },
  watch: {
    region(newValue, oldValue) {
      if(newValue && newValue.length == 1){
        this.time = '';
      } 
    },
    // tableData(newvalue, oldvalue) {
    //   let obj = newvalue[0];
    //   this.tableItem = [];
    //   for (let key in obj) {
    //     this.tableItem.push(key);
    //   }
    // }
  },
  methods: {
    setImg(item) {
      if (item.indexOf(".") > -1) {
        let index = item.lastIndexOf(".") - 0 + 1;
        let string = item.slice(index);
        if (string == "jpg" || string == "jpeg" || string == "png") {
          return true;
        }
      }
      return false;
    },
    renderTable() {
      let params = {
        currentPage: this.currentPage, //要显示的页码|
        pageSize: this.pageSize, //|一页显示的数量|
        searchTime:this.time,//搜索日期
        type:this.region,//报表类型
        number: this.number, //||员工工号|
        name: this.userName //|员工姓名|
      };
      // console.log(params)
      this.tableData = [];
      this.$axios
        .post("report/searchReportInfo", params)
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          }else{
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
    search() {
      if(this.region == ""){
         this.$message({
          message: '请选择报表类型',
          type: 'warning'
        });
        return;
      }
      if(this.time == ""){
        this.$message({
          message: '请选择报表时间',
          type: 'warning'
        });
        return;
      };
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
         this.currentPage = 1;
         this.renderTable();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renderTable();
    },
    // 导出信息
    exportmsg() {
      // let params = {
      //   number: this.number, //||员工工号|
      //   name: this.userName, //|员工姓名|
      //   searchTime: this.time,
      //   type: this.type,
      // };
      if(this.number==""&&this.userName==""&& this.time==""){
         alert("请填写导出信息")
      }else{
         let params = {
            currentPage: this.currentPage, //要显示的页码|
            pageSize: this.pageSize, //|一页显示的数量|
            searchTime:this.time,//搜索日期
            type:this.region,//报表类型
            number: this.number, //||员工工号|
            name: this.userName //|员工姓名|
          };
      // console.log(params)
      this.tableData = [];
      this.$axios
        .post("report/searchReportInfo", params)
        .then(res => {
          if (res.data.status == 200) {
             window.location.href =
              "report/exportExcel?+number=" +
              this.number +
              "&name=" +
              encodeURI(encodeURI(this.userName)) +
              "&searchTime=" +
              this.time+
              "&type="+
              this.type
          }else{
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
         }
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
  /* box-shadow: 0 0 5px 5px #ccc; */
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
  position:absolute;
  text-align: left;
  padding-top: 8px;
  box-sizing: border-box;
  height: 40px;
  left: 74px;
  top: 96px;
}
.search {
  width: 100%;
  height: 100px;
  padding-top: 8px;
  box-sizing: border-box;
}
.search div {
  float: left;
  margin: 0;
  /* padding-right: 20px; */
}
.blank{
  display:inline-block;
  width:10;
}
/* input {
  width: 200px;
  height: 40px;
  padding: 0 16px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  outline: none;
} */
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
</style>


