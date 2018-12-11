<template>
<div class="conbox">
    <div class="table-title">
            {{msg}}
    </div>
    <div class="btn-box">
            <el-button  class="el-icon-plus" size="mini" @click= "putin"> 新增</el-button>
    </div>
    <div class="table-box">
        <el-table
                v-show="tableData.length"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="height: 100%;overflow:auto"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="140"
                        align="center">
                    </el-table-column>  
                    <el-table-column
                    prop="name"
                    label="套餐名称"
                    width="140"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="photo"
                    label="套餐详情"
                    width="140"
                    align="center">
                    <template slot-scope="scope">
                      <img  :src="scope.row.photo" style="width: 60px;height: 60px;">
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="价格(元)"
                    width="140"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="在售状态"
                    width="140"
                    align="center">
                    <template slot-scope="scope">
                      {{statusMap[scope.row.status]}}
                    </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      show-overflow-tooltip>
                       <template slot-scope="scope">
                         <el-button type="text" size="small" class="word-left" @click="handleClick(scope.row)" >编辑</el-button>
                         <el-button type="text" size="small" class="word-left" @click="handleClick2(scope.row)" >删除</el-button>
                        </template>
                     </el-table-column>
             </el-table>
    </div>
    <!-- 点击新增后的弹框 -->
    <el-dialog
      title="新增菜单"
      top="15%"
      width="500px"
      :before-close="cancel"
      :visible.sync="show">
      <div>
         <div class="dialogBody">
          <div ref="addForm" style="width:100%;height:100%">
            <div class="dialogLeft">
               <el-form class="demo-form-inline"  label-width="60px">
                  <el-form-item label="名 称">
                    <el-input placeholder="请输入套餐名称"  v-model="mealname"></el-input>
                  </el-form-item>
                  <el-form-item label="价 格" style="padding-top:20px">
                    <el-input placeholder="请输入价格" v-model="newprice"></el-input>
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
         <el-button type="primary" plain @click="submitmsg"  v-loading.fullscreen.lock="fullscreenLoading" >确认</el-button>
          <el-button type="primary" plain style="margin-left:40px" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑后的弹框 -->
     <el-dialog
      title="修改菜单"
      top="15%"
      width="500px"
      :before-close="cancel"
      :visible.sync="mask">
      <div>
        <div class="dialogBody">
          <div ref="addForm" style="width:100%;height:100%">
            <div class="dialogLeft">
               <el-form class="demo-form-inline"  label-width="60px">
                 <el-form-item label="名 称">
                  <el-input placeholder="请输入套餐名称"  v-model="mealname"></el-input>
                </el-form-item>
                  <el-form-item label="价 格" style="padding-top:20px">
                  <el-input placeholder="请输入价格" v-model="newprice"></el-input>
                </el-form-item>
                </el-form>
            </div>
            <div class="dialogRight">
              <div class="dialogImg">
                 <img :src="avatar?avatar:imgBgs" alt="" >
              </div>
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
import imgBg from "../../../assets/menu.png";
import axios from "axios";
export default {
  name: "myMenu",
  data() {
    return {
      avatar: "",
      imgBgs: imgBg,
      mask: false,
      show: false,
      msg: "菜单管理",
      name: "",
      price: "",
      status: "",
      singleId: null,
      fullscreenLoading:false,
      //新增数据
      mealname: "",
      newprice: "",
      newstatus: "",
      fileList3: [],
      all:1,
      statusMap: {
        0: "已下线",
        1: "在售"
      },
      tableData: [],
      id: "",
      currentPage: 1,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      tableHeight: "", //
      timer: null //定时器
    };
  },
  watch: {
    tableData(newvalue, oldvalue) {
      let obj = newvalue[0];
      this.tableItem = [];
      for (let key in obj) {
        this.tableItem.push(key);
      }
    }
  },
  created() {
    this.menuInfo();
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
    menuInfo() {
      let params = {
        all:this.all
      };
      this.$axios
        .post("menu/menuInfo", params)
        .then(res => {
          if (res.data.status == 200) {
            this.tableData = res.data.data;
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
    // 新增按钮
    putin() {
      this.show = true;
      this.mask = false;
      this.delAdd();
      if(this.$refs.avatarForm){
          this.avatar = '';
          this.$refs.avatarForm.reset(); 
          this.fileList3 = "";
        };
    },
    // 新增提交按钮调用的方法
    menuAdd() {
      if (!this.mealname.length) {
        this.$message({
            showClose: true,
            message: "菜名为空",
            type: "warning"
          });
        return;
      }
      if (!this.newprice.length) {
        this.$message({
            showClose: true,
            message: "价格为空",
            type: "warning"
          });
        return;
      }
      if (!this.avatar.length) {
        this.$message({
            showClose: true,
            message: "图片为空",
            type: "warning"
          });
        return;
      }
       if(this.newprice!== ""){
         var reg = /^\d+(\.\d+)?$/;
         if (!reg.test(this.newprice)) {
         this.$message({
                showClose: true,
                message: '价格类型错误',
                type: 'warning'
              });
          return;
           }
       };
      if (this.$refs.avatarInput && this.$refs.avatarInput.files &&this.$refs.avatarInput.files.length && this.$refs.avatarInput.files[0].length !== 0) {
        let data = new FormData();
        this.fileList3 = this.$refs.avatarInput.files[0];
        this.imgType = this.fileList3.type;
        data.append("dicFiles", this.fileList3);
        data.append("price", this.newprice);
        data.append("name", this.mealname);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let instance = axios.create({
          headers: { "content-type": "multipart/form-data" }
        });
        instance
          .post("menu/addMenu", data, config)
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                showClose: true,
                message: res.data.data,
                type: "success"
              });
              this.cancel();
              this.menuInfo();
            } else {
                this.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
              this.show = false;
            }
          })
          .catch(() => {
                this.$message.error('数据请求失败');
          });
      }
    },
    // 清空新增信息
    delAdd() {
      this.mealname = "";
      this.newprice = "";
      this.newstatus = "";
      this.avatar = "";
    },
    //新增的提交按钮
    submitmsg() {
       if(this.$refs.editInput){
         this.avatar = "";
         this.fileList4 = "";
        this.$refs.editForm.reset(); 
      };
      this.menuAdd();
    },
    // 取消按钮
    cancel() {
      if(this.$refs.avatarForm){
        this.$refs.avatarForm.reset();   
      };
      if(this.$refs.editInput){
        this.$refs.editForm.reset(); 
      }; 
        this.show = false;
        this.mask = false;
    },
    // 编辑按钮
    handleClick(row) {
      this.delAdd();
      this.singleId = null;
      this.mask = true;
      this.show = false;
      this.mealname = row.name;
      this.newprice = row.price+"";
      this.newstatus = row.status;
      this.avatar = row.photo;
      this.singleId = row.id;
    },
    //编辑的提交按钮
    confirm() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
      if (!this.mealname.length) {
        this.$message({
            showClose: true,
            message: "菜名为空",
            type: "warning"
          });
        return;
      }
      if (!this.newprice.length) {
        this.$message({
            showClose: true,
            message: "价格为空",
            type: "warning"
          });
        return;
      }
      if (!this.avatar.length) {
        this.$message({
            showClose: true,
            message: "图片为空",
            type: "warning"
          });
        return;
      }
       if(this.newprice){
          if(/^\d+(\.\d+)?$/.test(this.newprice)){ 
          }else{
             this.$message({
                showClose: true,
                message: '价格类型错误',
                type: 'warning'
              });
              return;
          }
      }
        let data = new FormData();
        if (this.$refs.editInput && this.$refs.editInput.files && this.$refs.editInput.files.length && this.$refs.editInput.files[0].length !== 0) {
           this.fileList3 = this.$refs.editInput.files[0];
           data.append("dicFiles", this.fileList3);
        }else{
           this.fileList3 = ''
        }
        data.append("price", this.newprice);
        data.append("name", this.mealname);
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
          .post("menu/updateMenu", data, config)
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                showClose: true,
                message: res.data.data,
                type: "success"
              });
              this.fullscreenLoading = false;
              this.cancel();
              this.menuInfo();
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
    handleClick2(row) {
      let params = {
        id: row.id
      };
      this.$axios
        .post("menu/deleteMenu", params)
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
            this.show = false;
            this.menuInfo();
          } else {
               this.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
            this.show = false;
          }
        })
        .catch(() => {
            this.$message.error('数据删除失败');
        });
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    handleSelectionChange(val) {
      this.id = val.id;
    }
  }
}
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
  height: calc(100% - 120px);
  padding-top: 10px;
  box-sizing: border-box;
  clear: left;
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


