<template>
    <div class="mine">

        <div class="details_top">
          <div class="d_t_left">
            <!--回到上一页用函数式路由-->
            <a class="d_t_link" @click="routerBack"><i class="iconfont icon-jiantou-"></i></a>
          </div>
          <div class="d_t_zhong">
            <span class="xiangqing-title">登录/注册</span>
          </div>
          <div class="d_t_right">
            <i class="iconfont icon-shouye" @click="routerBack"></i>
          </div>
        </div> 

        <div class="top_left top_public">
          <div class="login_title public_title">登陆</div>
        </div>
        <div class="top_right top_public">
          <div class="register_title public_title">注册</div>
        </div> 

        <div class="mine_main">
          <div class="main_username main_input">
            <input type="number" id="username" name="user" placeholder="手机号" class="input_style"/>
          </div>
          <div class="main_password main_input">
            <input type="password" id="username" name="pasw" placeholder="密码" class="input_style"/>
          </div>
        </div>
        <div class="mine_button">
          <button class="mine_emit">登录</button>
          <p class="losepassword">忘记密码?</p>
        </div> 
    </div>
</template>

<script>
  import './mine.scss'
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
        if(localStorage.username=='' || !localStorage.username){
          this.$router.push({name: 'mine'});
        }
      },
      routerBack(){
          this.$router.go(-1);
      },
    },
    mounted(){
      this.init();
    },
    updated(){

    }
  }    
</script>
