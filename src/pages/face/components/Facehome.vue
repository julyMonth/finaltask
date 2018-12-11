<template>
    <div class="facehomes">
        <div class="Cashier">
            <h1 class="names">{{name}}</h1><!-- this.token.username -->
            <p class="points">{{point}}</p>
            <p class="titl">萧山区质监站职工食堂就餐系统</p>
            <button class="btn1" @click="getMsgInfo2">重新扫描</button> <!--   -->
            <button class="btn2" @click="out">退出登录</button>
        </div>
        <div class="FaceSelect">
            <div v-if="TF == true" v-for="(item,index) in faces" :key="index">
                <div class="pos" @click="addMsg(index)">
                    <div class="i1">
                         <img class="face_img" :src="item.photo" alt="">
                    </div>
                    <div class="abs">
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div v-if="TF == false" class="alts1"></div>
            <div v-if="TF == false" class="alts">
                <div class="alts_txt">{{abb}}</div>
                <button class="alts_btn" @click= "cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Facehome",
    data() {
        return {
            timers:"",
            abb:"正在扫描 请稍等 .  .  .",
            uid: "",
            name: "",
            point: "正在为您点餐！",
            faces: [], 
            faces2: [], 
            TF: false,
            time: null
        }
    },
    methods: {
        addMsg(index) {
            //点击图片时获取
            this.getImgInfo(index)
        },
        out() {
            let token = '';
            this.$store.commit('set_token',token);
            this.$router.push({
               path: '/'
            })
        },
        //取消按钮
        cancel(){
            clearTimeout(this.time);
            this.TF = true;
        },
        //进去就跑
        //获取数据
        getMsgInfo(){
            // clearInterval(time);
            this.abb = "正在扫描 请稍等 .  .  .";
            // console.log(Date.now());
            this.$axios.post('staff/selectStaffInfoByCamera')
            // this.$axios.get('../../../../static/msgs.json')
            .then((res)=>{  // this.GetMsgData
                if(res.data.status == "200") {
                    this.TF = true;
                    this.faces =  res.data.data
                    // console.log(Date.now());
                }else{
                    this.abb = "未识别到注册人员，正在重新扫描!";
                    this.time = setTimeout(this.getMsgInfo, 3000);
                }
            }).catch((res)=>{
                    // console.log(res.data.message);
                }
            ) 
        },
        //重新扫描接收照片数据
        getMsgInfo2(){
            this.TF = false;
            this.getMsgInfo();
        },
    //点击图片时获取方法
        getImgInfo(index) {
            var numb = {id:this.faces[index].id};
            this.$axios.post('staff/getStaffInfo',numb)
            // this.$axios.get('../../../../static/index.json',numb)
            .then((res)=>{
                if(res.data.status == "200"){
                    // debugger
                    // console.log(res.data.data)
                    this.faces2 = res.data.data;
                    // console.log(this.faces2)
                    var obj = res.data.data; 
                    // console.log(obj);
                    this.timers = obj.timers;
                    // console.log(this.timers);
                    var tt = this.timers;
                    // console.log(tt);
                    this.$store.commit('add_time',tt);
                    var vm = {
                        id: this.faces[index].id,
                        imgs: this.faces[index].photo,
                        name: this.faces[index].name,
                        job_number: this.faces2.number,
                        mom_money: this.faces2.consume,
                        mom_day: this.faces2.mom_day,
                        mom_fact: this.faces2.diningDays,
                        balance: this.faces2.balance
                    } 
                    this.$router.push({
                        path: '/home',
                        query: vm
                    })
                }else{
                    alert(res.data.message);
                }
            }).catch( (res)=>{
                    // alert(res.data.message);
                }
            )  
        },
    }, 
    beforeMount() {
        if(this.$store.state.token == ""){
            this.$router.push({path : "/"});
        }else{
            this.getMsgInfo();
        }
    },
    mounted() {
        //  this.getMsgInfo();
        //进入页面自动获取拍摄照片信息
        this.uid = this.$store.state.token.id;
        this.name = this.$store.state.token.username;
    }
}
</script>
<style scoped>
.facehomes {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #ffffff30;
}
    .Cashier {
        width: 100%;
        height: 11%;
        line-height: 30px;
        padding-left: 35px;
        text-align: left;
        margin: 0 auto;
        position: relative;
    }
        .names {
            padding-top: 20px;
            font-weight: bold;
            font-size: 20px;
            font-family: "微软雅黑";
        }
        .points {
            padding-left: 50px;
            font-family: "微软雅黑";
            font-size: 18px;
        }
        .titl {
            position: fixed !important;
            top: 15%;
            left: 40%;
            font-size: 25px;
        }
        .btn1 {
            position: absolute;
            top: 35%;
            right: 15%;
            width: 95px;
            height: 35px;
            cursor: pointer;
            background-color:  rgb(50,66,249);
            color: white;
        }
            .btn1:hover {
                 background-color:  rgba(50,66,249,0.8);
            }
        .btn2 {
            position: absolute;
            top: 35%;
            right: 5%;
            width: 95px;
            height: 35px;
            cursor: pointer;
            background-color: rgb(50,66,249);
            color: white;
        }
            .btn2:hover {
                 background-color:  rgba(50,66,249,0.8);
            }
    .FaceSelect {
        width: 96%;
        height: 80%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        padding: 25px 0 0;
    }
        .FaceSelect>div {
            width: 225px;
            height: 285px;
            cursor: pointer;
            margin: 0 14px;
            overflow: hidden;
        }
            .pos {
                width: 100%;
                height: 100%;
                padding: 5px;
            }
                .i1 {
                    width: 96%;
                    height: 80%;
                    overflow: hidden;
                    box-shadow: 0 0 10px #feffc0;
                }
                .abs {
                    width: 96%;
                    height: 10%; 
                    padding-top: 20px;
                    color: #272f71;
                    font-family: "微软雅黑"; 
                    font-size: 18px;
                }
                .face_img {
                    width: 100%;
                    height: 100%;
                    transition: all 0.3s linear;
                    overflow: hidden; 
                }
                    .face_img:hover {
                        transform: scale(1.1);
                    }
    .alts1 {
        position: fixed !important;
        top: 0%;
        left: 0%;
        width: 100% !important;
        height: 100% !important;
        background-color: rgba(255, 255, 255,0);
        z-index: 200;
        cursor: default !important;
    }
    .alts {
        position: fixed;
        top: 31% !important;
        left:  calc(40% - 75px) !important;
        width: 500px !important;
        height: 330px !important;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 300;
        cursor: default !important;
        font-size: 20px;
    }
        .alts_txt {
            padding-top: 140px;
            width: 100%;
            height: 32%;
            color: rgb(255, 251, 251);
        }
        .alts_btn {
            display: block;
            width: 110px;
            height: 45px;
            cursor: pointer;
            color: white;
            background-color: rgba(61,50,255,0.75);
            margin-left: calc(50% - 50px);
        }
    .GoHome {
        width: 100%;
        height: 12%;
        line-height: 96px; 
    }
        .GoHome>button {
            width: 400px;
            height: 80px;
            font: 23px "微软雅黑";
            color: white;
            background-color: blue;
            cursor: pointer;
        }
</style>
