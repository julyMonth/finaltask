 <template>
   <div class="logBox">
        <div class="logmsg" >
            <div>
               <h2>{{title}}</h2>
            </div>
            <div class="name">
                <span></span>
                <input type="text" id="name" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="password">
                <span></span>
                <input type="password" id="password" placeholder="请输入密码" v-model="password" @keyup.enter="login($data)">
            </div>
            <div class="landBox-con check">
                <input type="submit" value="登 录" class="sub" @click="login" />
                <!-- <i class="el-icon-loading"></i> -->
                <div class="login_fal" v-cloak>{{msg}}</div>
            </div>
         </div>
   </div>
</template>
<script>
export default {
    name:"login",
    data(){
        return{
            msg:"",
            title:"登录管理",
            username:"",
            password:"",
        }
    },
    created(){
      this.$store.commit("del_token", '');
    },
    methods:{
        // login(){
        //     this.$router.push("/workermsg");
        // }
        login () {
	        if(this.username =="" && this.password =="") {
                    alert("请输入用户名和密码")
                } else {			
                    this.$axios(
                    {
                        method:"post",
                        url:"user/login",
                        // headers:{'Content-type': 'application/x-www-form-urlencoded'},
                        data:{
                            username:this.username,
                            password:this.password
                        }
                    }).then((res)=>{
                        if(res.data.status==200){
                            if(res.data.token.isadmin==0){
                                this.$router.push("/face");
                                let token = res.data.token;
                                this.$store.commit('set_token',token);
                            };
                            if(res.data.token.isadmin==1){
                                this.$router.push("/workermsg");
                                let token = res.data.token;
                                this.$store.commit('set_token',token);
                            }
                        }else{
                             this.$message({
                             showClose: true,
                             message: '登录失败'
                            });
                            this.$router.replace("/login");
                        }
               })  		
        }
   },
},
}
</script>
<style scoped>
.logBox{
    width: 100%;
    height:100% ;
    padding-top:160px;
    box-sizing: border-box;
    overflow: hidden;
}
.logmsg{
    width: 550px;
    height: 400px;
    margin: 0 auto;
    position: relative;
    padding-top: 100px;
    background-color: rgba(251, 251, 251, 0.03);
    box-shadow: 0px 0px 30px -6px #8585ff;
}
h2{
    font-size:30px;
    padding:10px 0 30px 45px;
}
.name,.password,.landBox-con{
    width:400px;
    padding-bottom:20px;
    overflow: hidden;
    margin:0 auto;
}
.landBox-con{
    padding-left: 106px;
}
.sub{
    height: 50px;
    font-size:20px;
    cursor: pointer;
    background-color:rgb(5, 160, 95);
    color:#fff;
}
.sub:hover {
    background-color:rgba(5, 160, 95,0.8);
}
.name span,.password span{
    float:left;
    width:24px;
    height:24px;
    padding: 16px 8px 0 0;
    margin-right:20px;
}
.name span{
    background:url(../../assets/log1.png) no-repeat center center;
    background-size:85%; 
} 
.password span{
    background:url(../../assets/log2.png) no-repeat center center;
    background-size:85%; 
}
#name,#password{
    text-indent:16px;
}
input{
    width: 320px;
    height:34px;
    float:left;
    border-radius: 4px;
    font-size: 14px;
    border: 1px solid #ddd;
    outline:none;
    opacity:0.7;
    color: rgb(5, 160, 95)
}
.remenber {
    height: 18px;
    width: 280px;
    font-size: 10px;
    line-height: 16px;
    color: rgb(26, 25, 25);
    overflow: hidden;
    padding: 1px 0 0 3px;
    margin:0 auto;
}
.remenber input {
    height: 18px;
    width: 13px;
    box-sizing: border-box;
    float: left;
}
.remenber label {
    height: 13px;
    line-height: 19px;
    float: left;
}
.remenber span{
    padding:0 6px 0 18px;
}
i{
    display: inline-block;
    width:40px;
}
.toRegist{
    position: absolute;
    right: 130px;
    top: -2px;
    padding-left: 4px;
    color: #2c3e50;
    font-size:14px;
    cursor: pointer;
}
.check{
    position:relative;
}
.admin{
    float:right;
    color: #335dff;
    font-size: 14px;
}
.login_fal {
    text-align: right;
    font-size: 13px;
    width: 147px;
    height: 16px;
    position: absolute;
    right: 16px;
    top: 7px;
    color: red;
}
</style>


