<template>
    <div class="msg">
        <div class="top">
            <img class="imgs_user" :src="user_imgs" alt="">
        </div>
        <div class="center">
            <p class="user_name">{{user_names}}</p>
            <p class="point">{{pp}}{{user_remind}}！</p>
            <h1 class="me">账户信息：</h1>
            <div class="money">
                <p>本月消费：{{mom_money}}元</p>
                <p>账户余额：{{balance}}元</p>
                <p>当前时间：{{mom_time}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Homemsg',
    data() {
        return {
            pp: "",
            user_imgs: "",
            user_names: "",
            user_remind: "",
            job_number: "",
            mom_money: "",
            mom_day: "",
            mom_fact: "",
            mom_time: "",
            balance: ""
        }
    },
    methods:{
        
    },
    mounted(){
        this.user_remind = this.$store.state.timers;
        console.log(this.user_remind)
        if(this.$store.state.timers == "消费"){
            this.pp = "请您"
        }else{
            this.pp = "请您点"
        }
    },
    beforeMount(){
        var t = new Date();
        var year = t.getFullYear();
        var mom = t.getMonth() + 1;
        var day = t.getDate();
        this.user_names = this.$route.query.name;
        this.user_imgs = this.$route.query.imgs;
        this.job_number = this.$route.query.job_number;
        this.mom_money = this.$route.query.mom_money;
        this.mom_day = this.$route.query.mom_day;
        this.mom_fact = this.$route.query.mom_fact;
        this.mom_time = year+"/"+mom+"/"+day;
        this.balance = this.$route.query.balance;
        // console.log(this.$route.query)
        // this.user_remind = this.$store.state.timers;
        // console.log(this.user_remind)

    },
    computed:{
        duty() {
            this.mom_duty = this.mom_day - this.mom_fact;
            if(isNaN(this.mom_duty)){
                this.mom_duty = 0;
            }
        }
    }
}
</script>
<style scoped>
.msg {
    width: 30%;
    height: 100%;
    background-color: rgb(185, 223, 252);
}
    .top {
        width: 66%;
        height: 30%;
        border-radius: 130px;
        margin: 100px auto 10px;
        overflow: hidden;
        border: 1px solid gray;
    }
        .imgs_user {
            width: 100%;
        }
    .center {
        height: 50%;
        width: 75%;
        margin: 30px auto 20px;
        overflow: hidden;
    }
        .user_name {
            font: bold 30px "微软雅黑";
            line-height: 30px;
            height: 40px;
        }
        .point {
            font-size: 16px;
            padding: 20px 0 0 10px;
            font-family: "微软雅黑";
        }
        .me {
            font-size: 20px;
            font-weight: bold;
            font-family: "微软雅黑";
            text-align: left;
            margin-top: 40px;
        }
        .money {
            width: 100%;
            height: 59%;
            font-size: 16px;
            text-align: left;
            padding: 15px 0 0 20px;
            line-height: 40px;
            font-family: "微软雅黑";
        }
</style>

