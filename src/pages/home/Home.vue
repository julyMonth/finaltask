<template>
    <div id="HomePage">
        <homemsg></homemsg>
        <router-view/>
    </div>
</template>
<script>
import Homemsg from './components/Homemsg'
import Homemenu from './components/Homemenu'

export default {
    name: 'Home',
    data() {
        return {}
    },
    components:{
        Homemsg,
        Homemenu,
    },
    mounted(){
        if(this.$store.state.token == ""){
            this.$router.push({path : "/"});
        }
    }
}
</script>
<style scoped>
#HomePage {
    width: 1060px;
    height: 700px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    /* box-shadow: 0px 0px 10px #1a4f79; */
    padding-top: 100px;
}

</style>

