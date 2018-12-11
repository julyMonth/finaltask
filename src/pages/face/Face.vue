<template>
    <div id="Face">
        <facehome></facehome>
    </div>
</template>
<script>
import axios from 'axios'
import Facehome from './components/Facehome'

export default {
    name: "Face",
    data() {
        return {}
    },
    components:{
        Facehome,
    },
    methods:{},
    mounted(){
        if(this.$store.state.token == ""){
            this.$router.push({path : "/"});
        };
    }
}
</script>
<style scoped>
#Face {
    width: 1060px;
    height: 700px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 100px;
}
</style>
