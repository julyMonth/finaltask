<template>
    
    <div class="menu">
        <div v-show="show" class="work"></div>
        <!-- 1 -->
        <div class="ABC">            
            <div v-for="(item,index) in setMeal" :key="index">
                <!-- 左 -->
                <div class="ABC_img">
                    <div class="ABC_imgs">
                        <img :src="item.photo" alt="">
                    </div>
                </div>
                <!-- 右 -->
                <div class="list">
                    <div class="list_left">
                        <b>{{item.name}}</b>
                    </div>
                    <div class="list_right">
                        <div class="prices">{{item.price}} 元/份</div>
                        <div>
                            <button class="btn add" @click="minus(index)"></button>
                            <span class='numbers'>{{item.number}}</span>
                            <button class="btn minus" @click="add(index)"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 2 -->
        <div class="nn">
            <div class="other">
                <span>其他消费</span>
                <input type="text" @focus="focus($event)" maxlength="6" v-model="otherpay.pays" placeholder="0.00"  onkeyup="value=value.replace(/[^\- \d.]/g,'')">
                <span>元</span>
            </div>
            <div class="total_money">
                <b>本次 {{timers}} 金额：{{cmp}} 元</b>
            </div>
        </div>
        <!-- 3 -->
        <div class="isOk">
            <button class="btns" @click="addMsg">确定支付</button>
            <router-link to="/face">
                <button class="btns">取消</button>
            </router-link>     
        </div>
    </div>
</template>
<script>
import qs from 'qs'

export default {
    name: 'Homemenu',
    data() {
        return {
            timers:"",
            show: false,
            setMeal:[],
            otherpay: {
                pays: 0
            },
            personal: {
                job_number: "",  
                uid: ""
            },
            list3: []
        }
    },
    methods:{
        minus(index) {
            if(this.setMeal[index].number == 0){
                this.setMeal[index].number = 0;
            }else{
                this.setMeal[index].number--;
            }
        },
        add(index) {
            this.setMeal[index].number++; 
        },  
        focus:function(event){
            event.currentTarget.select();
        },
        addMsg() {  
            if(this.otherpay.pays == 0 && this.cmp == 0){  
                alert("请点餐！");  
            }else{ 
                // 深克隆 this.setMeal
                var list3 = this.setMeal;
                for(var item of list3){
                    item.sub = item.number*item.price;
                }
                var list2 = JSON.stringify(list3);
                var list = JSON.parse(list2);
                for(var item of list){
                    delete(item.photo);
                    delete(item.name);
                    delete(item.price);
                    // delete(item.timers);
                }
                
                var other = {
                    pays: Number(this.otherpay.pays)
                };
                var staff = {
                    job_number: this.personal.job_number,
                    uid: this.personal.uid
                };
                console.log(staff)
                //传给后台的数据
                var data = JSON.stringify({list,other,staff});
                let params = {data:data}

            //返回给后台用户点餐数据接口
                this.show = true;
                this.$axios.post('pay/addPayInfo',params)
                .then((res)=>{
                    // console.log(res.data);
                    if(res.data.status == "200"){
                        alert("支付成功！");
                        this.$router.push("/face");
                        this.show = false;
                    }else{
                        alert("支付失败");
                        this.show = false;
                    }
                }).catch((res)=>{
                    // alert(res.data.message)
                })
                
            }      
        },
        //获取菜单信息
        getMenuInfo(){// this.handleGetData
            this.$axios.post('menu/menuInfo')
            // this.$axios.get('../../../../static/menu.json')
            .then((res)=>{
                if(res.data.status == "200") {
                    var obj = res.data.data;
                    for(var item of obj){
                        item.number = 0;
                    }
                    this.setMeal =  obj;
                    // this.timers = obj[0].timers;
                    // var tt = obj[0].timers;
                    // console.log(obj[0].timers);
                    // this.$store.commit(add_time,tt);
                     
                }else{
                    alert(res.data.message);
                }
            })
            .catch((res)=>{
                    // alert(res.data.message);
                } 
            )
        },
    },
    computed: {
        cmp(){
            var total = 0;
            var pays = this.otherpay.pays;
            for(var item of this.setMeal){
                total += item.number*item.price;
            }
            total += Number(pays);
            return total;
        }
    },
    watch:{},
    mounted() {
        if(this.$store.state.token == ""){
            this.$router.push({path : "/"});
        }else{
            this.getMenuInfo();
        }
        
        this.timers = this.$store.state.timers;
    },
    beforeMount() {
        this.personal.uid = this.$store.state.token.id;
        this.personal.job_number = this.$route.query.id;
        
    }

}
</script>
<style scoped>
.work {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:#e8e8e8;
    opacity: 0.1;
    z-index: 1000;
}
.menu {
    width: 70%;
    height: 100%;
    background-color: rgb(159, 216, 228);
    
}
    .ABC {
        width: 95%;
        height: 70%;
        margin: 20px auto 0;
        overflow: auto;
    }
        .ABC_img,
        .list {
            display: inline-block;
        }
        .ABC_img {
            width: 30%;
            height: 100%;
            margin-top: 30px;
        }
            .ABC_imgs {
                width: 90%;
                height: 130px;
                overflow: hidden;
            }
                .ABC_imgs>img {
                    width: 100%;
                    height: 100%;
                } 
        .list {
            width: 60%;
            height: 160px;
            color: #316f94;
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
            .list_left,
            .list_right {
                display: inline-block;
            }
                .list_left {
                    width: 28%;
                    /* height: 100%; */
                    line-height: 32px;
                    float: left;
                    display: flex !important;
                    flex-wrap: wrap !important;
                    padding-top: 64px;
                }
                    .list_left>b {
                        width: 100%;
                        /* line-height: 60px; */
                        font-size: 23px;
                    }
                .list_right {
                    width: 68%;
                    height: 100%;
                }
                .list_right>div {
                    display: inline-block;
                }
                .prices {
                    font-size: 20px;
                    font-weight: bold;
                    width: 34%;
                    height: 100%;
                    line-height: 160px;
                }
                .list_right>div:last-child {
                     padding-left: 30px; 
                }
                .btn {
                    width: 52px;
                    height: 35px;;
                    transition: all 0.3s linear;
                    background-color: #e8e8e8;

                }
                    .add {
                        background: url("../../../../static/img/minus.png") no-repeat center center;
                        background-size: 50%;
                        background-color: #7b83e0;
                    }
                    .minus {
                        background: url("../../../../static/img/add.png") no-repeat center center;
                        background-size: 50%;
                        background-color: #7b83e0;
                    }
                .btn:hover {
                    cursor: pointer;
                    background-color: rgba(50, 149, 206,0.5);  
                    color: white;
                }
                .numbers {
                    display: inline-block;
                    padding: 0 5px;
                    font-size: 20px;
                    font-weight: bold;
                }
                 
    .nn {
        width: 65%;
        height: 8%;
        display: flex;
        justify-content: space-between;
        margin: 20px auto 0;
    }
    /* .other {
        width: 85%;
        height: 5%;
        margin: 0 auto;
        text-align: left;
        padding:10px 0 10px 30px;
        line-height: 40px;
    } */
        .other>span {
            font-size: 20px;
        }
        .other>input {
            background-color: rgb(255, 255, 255,0.5);
            margin: 0 10px 5px 10px;
            width: 70px;
            height: 30px;
            padding-left: 10px;
        }
    /* .total_money {
        width: 85%;
        height: 5%;
        margin: 0 auto;
        text-align: left;
        padding-left: 30px;
    }    */
        .total_money>b {
            width: 20px;
            font-size: 22px;
            font-weight: bold;
            font-family: "微软雅黑"
        }    
    .isOk {
        width: 94%;
        height: 10%;
        margin: 0 auto;
        line-height: 60px;
    }   
        .btns {
            width: 33%;
            height: 70%;
            margin: 0 50px;
            background-color: rgb(76, 76, 243);
            color: white;
            cursor: pointer;
        }     
        .btns:hover {
            background-color: rgba(76, 76, 243,0.9);
        } 
</style>

