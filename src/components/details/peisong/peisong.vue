<template>
    <div class="details_peisong">
      <div class="peisong_top_box">
          <div class="d_t_left">
            <!--回到上一页用函数式路由-->
            <a class="d_t_link" id="aaaa"><i class="iconfont icon-jiantou-"></i></a>
          </div>
          <div class="d_t_zhong">
            <span class="xiangqing-title">配送说明</span>
          </div>
          <div class="d_t_right">
            <router-link class="d_t_link" :to="{path:'/'}"><i class="iconfont icon-shouye"></i></router-link>
          </div>
      </div>
      <div class="peisong_main_box">
        <div class="text_peisong_box">
          <div class="text_peisong_title">
            <div class="text_peisong_title_img"><img :src="url + peisongurl"></div>
            <div class="text_peisong_title_text">配送说明:</div>
          </div>
          <div class="text_peisong_neirong">
            <p>1、订单金额满299元包邮；</p>
            <p>2、下单后预计4-7个工作日到货（偏远地区除外）；</p>
            <p>3、商品提交订单后不可修改地址；</p>
            <p>4、若遇法定节假日或进出口海关清关，可能会影响收货时间，如有急用，请您谨慎考虑。</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import './peisong.scss'
  import '../../../assets/iconfont/iconfont.css'
  
  import Base from '../../../assets/js/base.js'
  import base from '../../../assets/js/global.js'
  export default {
    components: {
      
    },
    created(){

    },
    data(){
      return {
        PeiSongAnimate:Base.PeiSongAnimate,
        url:base.imgUrl,
        peisongurl:'/peisong.png',
      }
    },
    methods:{
     //获得translateX的数量
     init:function(){
         var oWidth = document.documentElement.clientWidth + 'px';
         var oPei = document.querySelector('.details_peisong');
         oPei.style.transform = 'translateX('+ oWidth +')';
     },

    },
    mounted(){
      this.init();
      var od_t_link = document.querySelector('#aaaa');
      var odetails_peisong = document.querySelector('.details_peisong');
      var owidth = document.documentElement.clientWidth;
      var fangxiang = 'X';

      //返回的动画效果
      //为了避免touchstart造成点透,采取阻止浏览器默认事件解决
      this.PeiSongAnimate(od_t_link,odetails_peisong,fangxiang,owidth);
    },
    updated(){

    }
  }    
</script>