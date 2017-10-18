<template>
    <div class="tips">
    </div>
</template>

<script>
  import './tips.scss'
  export default {
    components: {
      
    },
    created(){
      
    },
    data(){
      return {
      }
    },
    methods:{
      init(){

        var oWidth =document.documentElement.clientWidth;
        var oHeight =document.documentElement.clientHeight;
        var oTips =document.querySelector('.tips');
        var Tips_width =oWidth/10*2*2;
        var Tips_height =oWidth/10*2*0.5;
        oTips.style.top = (oHeight-Tips_height)/2 + 'px';
        oTips.style.left = (oWidth-Tips_width)/2 + 'px';
      } 
    },
    mounted(){
      this.init();
    },
    updated(){

    }
  }    
</script>