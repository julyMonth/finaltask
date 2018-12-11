<template>
<div class="conbox">
    <div class="table-title">
            {{msg}}
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
            <el-form-item label="员工状态"  label-width="80px">
              <el-select  v-model="state" placeholder="员工状态">
                  <el-option label="在职" value="1"></el-option>
                  <el-option label="离职" value="0"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="时间" label-width="50px">
              <el-date-picker
              value-format="yyyy-MM-dd" 
              v-model="times"
              type="daterange"
              unlink-panels
              style="width:240px"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions0">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label-width="50px">
                <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-box">
            <!-- <el-button >编辑</el-button> -->
            <el-button  class="el-icon-plus" size="mini" @click="putin"> 新增</el-button>
        </div>
       
    </div>
    <div class="table-box">
        <el-table
            ref="multipleTable"
            :data="tableData"
            height="100%"
            tooltip-effect="dark"
            style="height: 100%;overflow:auto"
            @selection-change="handleSelectionChange">
                <!-- <el-table-column
                type="selection"
                width="140">
                </el-table-column> -->
                <el-table-column
                    type="index"
                    label="序号"
                    width="60" 
                    align="center">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="140"
                align="center">
                </el-table-column>
                 <el-table-column
                label="工号"
                width="140"
                align="center">
                    <template slot-scope="scope">{{ scope.row.number }}</template>
                </el-table-column>
                <el-table-column
                prop="photo"
                label="照片"
                width="140"
                align="center">
                <template slot-scope="scope">
                  <img  :src="scope.row.photo" style="width: 60px;height: 60px;">
                </template>
                </el-table-column>
                <el-table-column
                prop="balance"
                label="余额(元)"
                width="140"
                align="center">
                </el-table-column>
               <el-table-column
                prop="status"
                label="状态"
                width="140"
                align="center">
                <template slot-scope="scope">
                  {{statusMap[scope.row.status]}}
                </template>
                </el-table-column>
                <el-table-column
                label="日期"
                width="140"
                align="center">
                    <template slot-scope="scope">{{ scope.row.registDate }}</template>
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
      :page-size='pageSize'
      :pager-count=5
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total='total'>
    </el-pagination>
    </div>
    <!-- 点击新增后的弹框 -->
    <el-dialog
      title="新增员工"
      top="15%"
      width="500px"
      :before-close="cancel"
      :visible.sync="show">
      <div>
        <div class="dialogBody">
          <div ref="addForm" style="width:100%;height:100%">
            <div class="dialogLeft">
               <el-form class="demo-form-inline"  label-width="60px">
                  <el-form-item label="姓 名">
                    <el-input placeholder="请输入姓名"  v-model="addname"></el-input>
                  </el-form-item>
                  <el-form-item label="工 号" style="padding-top:20px">
                    <el-input placeholder="请输入工号" id="addid" v-model="addnumber" ></el-input>
                  </el-form-item>
                </el-form>
            </div>
            <div class="dialogRight">
              <div class="dialogImg">
                 <img :src="avatar?avatar:imgBgs" alt=""  name="avatarImg" ref="avatarImg">
              </div>
              <form ref="avatarForm">
                <input type="file" class="input-file" style="width:75px"  name="avatarInput" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
               </form>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary" plain @click="upload">确认</el-button>
          <el-button type="primary" plain style="margin-left:40px" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑后的弹框 -->
    <el-dialog
      title="修改员工信息"
      top="15%"
      width="500px"
      :before-close="cancel"
      :visible.sync="mask">
      <div>
        <div class="dialogBody">
          <div style="width:100%;height:100%">
            <div class="dialogLeft">
               <el-form class="demo-form-inline"  label-width="60px">
                  <el-form-item label="姓 名">
                    <el-input  v-model="addname"></el-input>
                  </el-form-item>
                   <el-form-item label="工 号" style="padding-top:20px">
                    <el-input id="addid" v-model="addnumber"></el-input>
                  </el-form-item>
                </el-form>
            </div>
            <div class="dialogRight">
              <div class="dialogImg">
                 <img :src="avatar?avatar:imgBgs" alt="" >
              </div>
              <input type="hidden" name="id" v-model="singleId">
              <form ref="editForm">
                <input type="file" class="input-file" style="width:75px"  name="editInput" ref="editInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
               </form>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary" plain @click="confirm">确认</el-button>
          <el-button type="primary" plain style="margin-left:40px" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import imgBg from "../../../assets/worker.png";
import axios from "axios";

export default {
  name: "worker",
  data() {
    return {
      avatar: "",
      imgBgs: "",
      imgBgs: imgBg,
      file: "",
      mask: false,
      show: false,
      msg: "员工基本情况统计表",
      radio: "1",
      //搜索条件
      userName: "",
      number: "",
      state: "",
      times: [],
      startDate: "",
      sexid: "",
      endDate: "",
      singleId: "",
      // jxx ADD 分页器
      currentPage: 1,
      pageSize: 8, //每页显示条数
      total: 0,
      // =====
      //新增数据
      addname: "",
      addnumber: "",
      fileList3: [],
      fileList4: [],
      statusMap: {
        0: "离职",
        1: "在职"
      },
      tableData: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      }
    };
  },
  watch: {
    times(n, o) {
      if(n && n.length == 2){
        this.startDate = n[0];
        this.endDate = n[1];
      }else{
       this.startDate = '';
        this.endDate = '';
      }
    }
  },
  created() {
    this.renderTable();
  },
  methods: {
    changeImage: function(e) {
      let file = e.target.files[0];
      this.file = file;
      let reader = new FileReader();
      let that = this;
      reader.addEventListener("load", function(event) {
        var loadedFile = event.target;
        try {
          let result = loadedFile.result;
          that.avatar = result;
        } catch (e) {
          alert("失败");
        }
      });
      reader.readAsDataURL(file); //转化上传图片的格式
    },
    upload: function() {
      if (!this.addname.length) {
        this.$message({
            message: "用户名为空",
            type: "warning"
           });
        return;
      }
      if (!this.addnumber.length) {
         this.$message({
            message: "工号为空",
            type: "warning"
          });
        return;
      }
      if (!this.avatar.length) {
         this.$message({
            message: "上传照片为空",
            type: "warning"
          });
        return;
      }
       if(this.addnumber!== ""){
         var reg = /^\d*$/;
         if (!reg.test(this.addnumber)) {
         this.$message({
              message: '工号类型错误',
              type: 'warning'
          });
          return;
           }
       };
      if (this.$refs.avatarInput && this.$refs.avatarInput.files &&this.$refs.avatarInput.files.length && this.$refs.avatarInput.files[0].length !== 0) {
        let data = new FormData();
        this.dicFiles = this.$refs.avatarInput.files[0];
        this.imgType = this.dicFiles.type;
        data.append("dicFiles", this.file);
        data.append("number", this.addnumber);
        data.append("name", this.addname);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.submitmsg(data, config);
      }
    },
    // jxx ADD  渲染表格
    renderTable() {
       if(this.number!== ""){
         var reg = /^\d*$/;
         if (!reg.test(this.addnumber)) {
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
        startDate: this.startDate, //开始时间|
        endDate: this.endDate, //|结束时间|
        number: this.number, //员工工号|
        name: this.userName, //|员工姓名|
        status: this.state
      };
      this.$axios
        .post("upload/selectStaff", params)
        .then(res => {
          if (res.data.status == 200) {
            if(res.data.data.list.length!==0){
              this.tableData = res.data.data.list;
              this.total = res.data.data.total;
            }else{
              this.$message({
                  message: "未搜索到数据",
                  type: 'warning'
                });
            } 
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
    search() {
      this.currentPage = 1;
      this.renderTable();
    },
    // 新增员工信息
    putin() {
      this.addname = "";
      this.addnumber = "";
      this.fileList3 = '';
      this.show = true;
     if(this.$refs.avatarForm){
          this.avatar = '';
          this.$refs.avatarForm.reset(); 
          this.fileList3 = "";
        };
      
    },
    //新增的提交按钮
    submitmsg(data, config) {
      let instance = axios.create({
        headers: { "content-type": "multipart/form-data" }
      });
      instance
        .post("upload/addStaffSingle", data, config)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
            this.cancel();
            this.currentPage = 1; 
            if(this.$refs.avatarForm){
                this.avatar = '';
                this.$refs.avatarForm.reset(); 
                this.fileList3 = "";
              };
            this.renderTable();
           
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

    // 编辑员工信息
    handleClick(row) {
      this.cancel();
      this.addname = "";
      this.addnumber = "";
      this.avatar = "";
      this.singleId = -1;
      this.mask = true;
      this.addname = row.name;
      this.addnumber = row.number;
      this.avatar = row.photo;
      this.singleId = row.id;
    },
    //编辑的提交按钮
    confirm() {
      // this.mask = false;
      // 判空
      if (this.addname == "") {
         this.$message({
            message: "姓名为空",
            type: "warning"
          });
        return;
      }
      if (this.addid == "") {
        this.$message({
            message: "工号为空",
            type: "warning"
          });
        return;
      }
      if (!this.avatar.length) {
        this.$message({
            message: "照片为空",
            type: "warning"
          });
        return;
      }
      if(this.addid!==""){
          if(/^\d*$/.test(this.addid)){ 
          }else{
             this.$message({
                showClose: true,
                message: '工号类型错误',
                type: 'warning'
              });
              return;
          }
      }
      let data = new FormData();
      if (this.$refs.editInput && this.$refs.editInput.files && this.$refs.editInput.files.length && this.$refs.editInput.files[0].length !== 0) {
        this.fileList4 = this.$refs.editInput.files[0];
        this.imgType = this.fileList4.type;
        data.append("dicFiles", this.fileList4);
      }else{
        this.fileList4 = ''
      }
        data.append("number", this.addnumber);
        data.append("name", this.addname);
        data.append("id", this.singleId);

        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let instance = axios.create({
          headers: { "content-type": "multipart/form-data" }
        });

        instance
          .post("upload/updateStaff", data, config)
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                showClose: true,
                message: res.data.data,
                type: "success"
              });
              this.cancel();
              this.renderTable();
            } else {
                this.$message({
                      message: res.data.message,
                      type: 'warning'
                    });
              if(this.$refs.editForm){
                this.avatar = "";
                this.fileList4 = "";
                this.$refs.editForm.reset(); 
                };
            }
          })
          .catch(err => {
            this.$message.error('数据请求失败');
            if(this.$refs.editForm){
                this.avatar = "";
                this.fileList4 = "";
                this.$refs.editForm.reset(); 
                };
          });

    },
    // 删除按钮
    handleClick2(row) {
      let params = {
        id: row.id
      };
      this.$axios
        .post("upload/deleteStaff", params)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
            this.renderTable();
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
    
    // 关闭弹窗
    cancel() {
       if(this.$refs.avatarForm){
       this.$refs.avatarForm.reset(); 
      };
       if(this.$refs.editForm){
       this.$refs.editForm.reset(); 
      };
      this.show = false;
      this.mask = false;
      this.userName = "";
      this.number = "";
      this.state = "";
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renderTable();
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
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
  /* box-shadow: 0 0 5px 5px #ccc; */
  padding: 16px 32px;
  box-sizing: border-box;
}
.dialogBody {
  width: 100%;
  height: 180px;
}
.dialogLeft {
  width: calc(100% - 150px);
  padding-right: 16px;
  padding-top: 4px;
  box-sizing: border-box;
  height: 100%;
  float: left;
}
.dialogRight {
  float: left;
  width: 150px;
  height: 100%;
  /* background: pink; */
}
.dialogImg {
  width: 100px;
  height: 130px;
  margin-bottom: 16px;
  margin-left: 20px;
  border: 1px solid #ccc;
  /* background: blue; */
}
img {
  width: 100%;
  height: 100%;
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
  /* padding-right: 20px; */
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