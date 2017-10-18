<template>
    <div class="car">
        <div class="details_top">
          <div class="d_t_left">
            <!--回到上一页用函数式路由-->
            <a class="d_t_link" @click="routerBack"><i class="iconfont icon-jiantou-"></i></a>
          </div>
          <div class="d_t_zhong">
            <span class="xiangqing-title">购物车</span>
          </div>
          <div class="d_t_right">
            <router-link class="d_t_link" :to="{path:'/'}"><i class="iconfont icon-shouye"></i></router-link>
          </div>
        </div>
        <!--v-else必须跟在v-if后面-->

        <!--如果购物车有数据就显示这个div-->
        <div class="car_main" v-if="have">
          <!--根据购物车里的数据判断应该显示哪一个折扣的div-->
          <!---->
          <div class="main_korea" v-if="this.dataKorea.length>0">
            <!--头部信息-->
            <div class="m_k_top">
              <!--头部全选-->
              <div class="m_k_top_all_select_box center">
                <div class="m_k_top_all_select"></div>
              </div>
              <!--头部满减信息-->
              <div class="m_k_top_logo_box center">
                <div class="m_k_top_logo">其他商品</div>
              </div>
              <!--头部文字-->
              <div class="m_k_top_text center">满99元包邮</div>
            </div>
            <div class="m_k_main" v-for="attr in dataKorea">
              <!--商品选择-->
              <div class="main_left m_k_top_all_select_box center">
                <div class="m_k_top_all_select"></div>
              </div>
              <div class="main_right">
                <!--商品内容图片-->
                <img :src="imgUrl + attr.img"/>
                <!--商品信息-->
                <div class="main_right_text">
                  <div class="text_top">
                    <div class="text_title">
                      {{attr.title}}
                    </div>
                    <div class="text_guige" >
                      <p>{{attr.selectThis}}</p>
                    </div>
                  </div>
                  <div class="text_price">
                    <span class="t_p_span">￥{{attr.price}}.00</span> x{{attr.num}}
                  </div>
                </div>
              </div>
            </div>
            <div class="m_k_bottom">
              <p>活动优惠：-<span class="mkb_text">￥0</span></p>
              <p>本区总计：<span class="mkb_text mkb_color">￥0.00</span></p>
            </div>
          </div>


          <div class="main_china" v-if="this.dataChina.length>0">
            <!--头部信息-->
            <div class="m_k_top">
              <!--头部全选-->
              <div class="m_k_top_all_select_box center">
                <div class="m_k_top_all_select"></div>
              </div>
              <!--头部满减信息-->
              <div class="m_k_top_logo_box center">
                <div class="m_k_top_logo">跨境商品</div>
              </div>
              <!--头部文字-->
              <div class="m_k_top_text center">满299元包邮</div>
            </div>
            <div class="m_k_main" v-for="attr in dataChina">
              <div class="main_left m_k_top_all_select_box center">
                <div class="m_k_top_all_select"></div>
              </div>
              <div class="main_right">
                <!--商品内容图片-->
                <img :src="imgUrl + attr.img"/>
                <!--商品信息-->
                <div class="main_right_text">
                  <div class="text_top">
                    <div class="text_title">
                      {{attr.title}}
                    </div>
                    
                    <div class="text_guige" >
                      <p>{{attr.selectThis}}</p>
                    </div>
                  </div>
                  <div class="text_price">
                    <span class="t_p_span">￥{{attr.price}}.00</span> x{{attr.num}}
                  </div>
                </div>
              </div>           
            </div>            
            <div class="m_k_bottom">
              <p>活动优惠：-<span class="mkb_text">￥0</span></p>
              <p>本区总计：<span class="mkb_text mkb_color">￥0.00</span></p>
            </div>
          </div>
        </div>
        <div class="car_main" v-else>false</div>
        <div class="car_foot">
          <div class="main_left m_k_top_all_select_box center">
            <div class="m_k_top_all_select"></div>
          </div>
          <div class="foot_right">
            <div class="all_select_text">
              全选
            </div>
            <div class="foot_price">
              <p>总计：<span>￥0</span></p>
              <p>不含运费</p>
            </div>
            <div class="foot_jiesuan">去结算</div>
          </div>
        </div>
    </div>
</template>

<script>
  import './car.scss'
  import base from '../../assets/js/global.js'
  export default {
    components: {
      
    },
    created(){
      if(!localStorage.car || localStorage.car==''){
        this.have = false;
      }else{
        this.init();
        this.have = true;
      }
    },
    data(){
      return {
        have:'',
        data:'',
        dataChina:[],
        dataKorea:[],
        imgUrl:base.imgUrl + 'chunfeng/',
      }
    },
    methods:{
      routerBack(){
          this.$router.go(-1);
      },
      init(){
        var oThis = this;
        var oData = this.data;
        oData = JSON.parse(localStorage.car);
        for(var i=0;i<oData.length;i++){
          if(oData[i].cuxiao==299){
            oThis.dataKorea.push(oData[i]);
          }else{
            oThis.dataChina.push(oData[i]);
          }
        }
      
      }, 
    },
    updated(){

    }
  }    
</script>