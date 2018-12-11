<template>
    <div class="workerbox">
        <div class="topheader">
            <h2>管理员操作平台</h2>
            <span @click="logout">退出登录</span>
        </div>
        <div class="aside" :style="isCollapse?'width:65px':''">
            <el-menu :default-active="activeIndex" 
                    class="el-menu-vertical-demo" 
                    :collapse="isCollapse"  
                    background-color="#113452"  
                    text-color="#fff"
                    active-text-color="#fbb859">
                <el-menu-item index="cashier"  @click="switchMenu('worker')">
                    <i class="el-icon-location"></i>
                    <span slot="title">员工管理</span>
                </el-menu-item>
                <el-menu-item index="report" @click="switchMenu('report')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">报表统计</span>
                </el-menu-item>
                <el-menu-item index="list" @click="switchMenu('list')">
                    <i class="el-icon-document"></i>
                    <span slot="title">消费记录</span>
                </el-menu-item>
                <el-menu-item index="leave" @click="switchMenu('leave')">
                   <i class="el-icon-document"></i>
                   <span slot="title">请假统计</span>
                </el-menu-item>
                <el-menu-item index="menu" @click="switchMenu('menu')">
                   <i class="el-icon-setting"></i>
                   <span slot="title">菜单管理</span>
                </el-menu-item>
         </el-menu>
        </div>
        <el-main :style="isCollapse ? 'width:calc(100% - 65px)!important' : 'width:calc(100% - 200px)'">
            <router-view ></router-view>
        </el-main>
    </div>
</template>
<script>
import Worker from "@/pages/workers/components/worker"
import Leave from "@/pages/workers/components/leavetime"
import Report from "@/pages/workers/components/report"
import Menu from '@/pages/workers/components/menu'
import List from '@/pages/workers/components/listofDay'
export default {
    name:"workersmsg",
    data(){
        return{
        isCollapse: false,
        show:false,
        currentMenu:"worker",
        activeIndex:"worker",
        }
    },
    created(){
        if(this.$route.name){
            this.activeIndex = this.$route.name
        }
    },
    methods: {
       showtohide(){
          this.isCollapse=!this.isCollapse;
        },
       switchMenu(menu) { 
        //  var myData = new Date();
        //  var myYear = myData.getFullYear();
        //  var myMonth = myData.getMonth();
        //  var myDay = myData.getDate();
        //  var str =myYear+'-'+myMonth+'-'+myDay;
         this.currentMenu = menu;
         this.$router.push({path : this.currentMenu})
        //  if(menu=="report"){//给后台传递当前时间后，跳转至report页面
            
            //  };
        //  console.log(this.$route.name)
      },
      logout(){
          let token = '';
          this.$store.commit('set_token',token);
          this.$router.push({path:"/"});
          
      }
    },
    mounted(){
        if(this.$store.state.token == ""){
            this.$router.push({path : "/"});
        };
    },
    components:{
       Worker,
       Leave,
       Report,
       List,
    }
}
</script>
<style scoped>
.workerbox{
    width:100%;
    height:100%;
    box-sizing: border-box;
}
.topheader {
    width :100%;
    height:80px !important;
    background-color:#018DF0;
    opacity:0.7;
    color: #333;
  }
  .topheader h2{
    width:200px;
    height:80px;
    padding-left:40px;
    line-height:80px;
    font-size:20px;
    text-align: left;
    color:#fff;
  }
  .topheader span{
     display:inline-block;
     width:60px;
     height:20px;
     line-height: 20px;
     padding:2px;
     color:#fff;
     position:fixed;
     top:28px;
     right:100px;
     cursor: pointer;
  }
  .aside {
    width: 180px;
    height:calc(100% - 80px);
    float:left;
    opacity:0.6;
    box-sizing: border-box;
  }
  .el-menu-vertical-demo{
      overflow: hidden;
      height:100%;
      background:#113452 !important;
  }
  .el-submenu{
      background:#113452 !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  } 
  .el-main {
    background-color:rgb(255, 255, 255);
    color: #333;
    width:calc(100% - 180px) !important;
    height:calc(100% - 80px);
    box-sizing: border-box;
    float:right;
  }
</style>

