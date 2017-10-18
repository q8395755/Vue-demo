<template>
    <div class="details">
        实验
    </div>
    
</template>

<script>
  import axios from 'axios';
  export default {
    
    components: {
     
    },
    created(){
      
    },
    data(){
      return {
        a:''
      }
    },
    methods:{
       
    },
    mounted(){
      var se = this;
      axios.get('./src/json/index.json')
       .then(function (response) {
          
          se.data1 = response.data[0];
          console.log(se);
        })
        .catch(function (error) {
          console.log(error);
        }
        
      );
    },
    updated(){
      
    }
  }    
</script>


