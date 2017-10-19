<template>
    <div class="details">
      <!--头部-->
        <div class="details_top">
          <div class="d_t_left">
            <!--回到上一页用函数式路由-->
            <a class="d_t_link" @click="routerBack"><i class="iconfont icon-jiantou-"></i></a>
          </div>
          <div class="d_t_zhong">
            <span class="xiangqing-title">商品详情</span>
          </div>
          <div class="d_t_right">
            <router-link class="d_t_link" :to="{path:'/'}"><i class="iconfont icon-shouye"></i></router-link>
          </div>
        </div>
        <!--内容-->
        <div class="details_main" id="main1">
          <div class="d_m_img swiper-container" id="img11">
            <div class="swiper-wrapper details_lunboimgs_box">
              <!--滚动内容-->
              <div class="swiper-slide" v-for="item in data1.lunboimgs"><img class="details_lunboimgs" :src="Imgurl + item"></div>
            </div>
            <!--控制器-->
            <div class="swiper-pagination"></div>
          </div>
          <div class="details_product">
              <div class="product_box">
                <div class="product_title">{{data1.title}}</div>
                <div class="product_xiaoliang">
                  <div class="p_x_text1">已售{{data1.num}}件</div>
                  <div class="p_x_text1"><span class="p_x_color">100%</span>好评</div>
                </div>
              </div>
              <div class="product_pinpai_box product_box">
                <div class="product_logo_box">
                  <img :src="Imgurl + data1.logo">
                </div>
                <div class="product_pinpai">
                  <span>{{data1.pinpai}}</span>
                </div>
                <div class="p_g_jiantou">
                  <i class="iconfont icon-jiantou-"></i>
                </div>
              </div>
              <div class="product_price_box product_box">
                <p><span class="text_css">限时抢</span><span class="p_price">¥{{data1.price}}.00</span></p>
                <p><del class="p_yuanjia">¥{{data1.yuanjia}}.00</del></p>
              </div>
          </div>
          <div class="product_zhekou_box">
            <div class="border_box">
              <div class="product_cuxiao">
                促销({{data1.zhekoulength}})
              </div>
              <div class="p_z">
                <div class="product_zhekou" v-for="item in data1.zhekou">
                  <span class="zhekou_color">{{item}}</span>
                  仅限该产品使用
                </div>
              </div>
              <div class="p_g_jiantou">
                  <i class="iconfont icon-jiantou-"></i>
              </div>
            </div>
          </div>
          <div class="product_zhekou_box product_peisong_box">
            <div class="border_box">
              <div class="product_cuxiao">
                配送
              </div>
              <div class="p_z">
                <div class="product_zhekou">
                  <span class="zhekou_color">跨境商品</span>
                  足不出户，与韩国同步，海外直邮满299包邮！
                </div>
              </div>
              <div class="p_g_jiantou">
                  <i class="iconfont icon-jiantou-"></i>
              </div>
            </div>
          </div>
          <div class="product_guige product_zhekou_box">
            <div class="border_box" >
              <div class="guige_title">请选择规格</div>
              <div class="p_g_jiantou">
                  <i class="iconfont icon-jiantou-"></i>
              </div>
            </div>
          </div>
          <div class="tuwenxiangqing product_zhekou_box">
            <div class="tuwen_title">图文详情</div>
            <div class="tuwen_imgs">
              <!--让字符串与数据拼接-->
              <img :src="`${Imgurl}zhiyou.jpg`">
              <img v-for="(index,attr) in data1.imgs" :src="Imgurl + index">
            </div>
          </div>
        </div>
        <!--尾部-->
        <div class="details_foot">
          <div class="foot_left">
            <div class="foot_shoucang">
              <i class="iconfont icon-shoucang"></i>
            </div>
            <div class="foot_gouwuche">
              <router-link to="/car">
              <i class="iconfont icon-gouwuche"></i>
              <span class="gouwu_num">{{gouwuNum}}</span>
              </router-link>
            </div>
          </div>
          <div class="foot_right">
            <span>加入购物车</span>
          </div>
        </div>
        <!--配送说明组件-->
        <Peisong></Peisong>
        <!--规格选择组件-->
        <!--v-on(@)指定事件，demo是子组件触发$emit（demo1）后执行的函数-->
        <Guige :data="data1"   @demo1="demo">
          <img class="guige_img" slot="guigeImg" :src="Imgurl + data1.img">
          <img class="close_button_img" slot="close_button" :src="url + close">
          <p class="text_content_p" slot="text_content_slot">{{data1.title}}</p>
          <p class="t_c_yuanjia" slot="yuanjia">原价:¥<span class="t_c_y_span">{{data1.yuanjia}}.00</span></p>
          <p class="t_c_xianjia" slot="xianjia">¥<span class="t_c_x_span">{{data1.price}}.00</span></p>
          <div class="guige_select " slot="select">
            <div class="select_div" v-for="attr in data1.guige">
              {{attr}}
            </div>
          </div>
        </Guige>

    </div>
</template>

<script>
  import './details.scss'
  import '../../assets/iconfont/iconfont.css'
  import base from '../../assets/js/global.js'
  import Ro from '../../assets/js/base.js'
  import axios from 'axios';
  import Swiper from 'swiper'

  import PeiSong from './peisong/peisong.vue'
  import Guige from './guige/guige.vue'
  export default {
    
    components: {
     'Peisong':PeiSong,
     'Guige':Guige,
    },
    beforeCreate(){
      //这里要放在DOM生成前执行

 
    
    },
    created(){
      // ---商品查找---
      // 用一个变量指向this
      // 这样可以在axios里面调用它
      var oThis = this;
      var oPagin = document.querySelector('.swiper-pagination');
      console.log(oThis);
      if(!localStorage.data || localStorage.data==''){
        //如果本地存储不存在，就重新ajax
        axios.get('../../static/index.json')
        .then(function (response) {
            localStorage.data = JSON.stringify(response.data[0]);
            
            oThis.FindGoods();
          })
          .catch(function (error) {
            console.log(error);
          }
        
        );

      }else{
        //如果存在就根据Id找到商品
         oThis.FindGoods();
      }
    },
    data(){
      return {
        //data里的数据，如果一开始就给定‘’值，那么在渲染的时候就会把数据当成空值渲染，而不会替换成你想要的数据
        //但是你提前把需要的数据的格式准备好，那么vue就会在数据发生改变的时候自动帮你渲染
        Imgurl:base.imgUrl + 'chunfeng/',
        url:base.imgUrl,
        close:'close.png',
        show:true,
        gouwuNum:1,
        data1:{
          title:'',
          num:'',
          logo:'',
          pinpai:'',
          lunboimgs:[],
          price:'',
          yuanjia:'',
          zhekou:[],
          zhekoulength:'',
          imgs:[],
          img:'',
          guige:'',
        },

      }
    },
    methods:{
      //路由回到上一页的写法
      routerBack(){
        this.$router.go(-1);
      },
      //详情页img高度动态赋值
      oHeight(){
        var oImg = document.querySelector('.d_m_img')
        oImg.style.height = document.documentElement.clientWidth + 'px';
        console.log(oImg.style.height);
      },

      //返回顶部
      Click(){
          var omain1 =document.getElementById('main1');
          omain1.scrollTop = 0;
      },
      //title变色
      Title(){
        var oimg =document.getElementById('img11');
        var omain1 =document.getElementById('main1');
        var oDetails_top = document.querySelector('.details_top');
        var od_t_link = document.querySelectorAll('.d_t_link');
        //轮播图的高
        var oImg = document.documentElement.clientWidth;
        var oXiangqingTitle = document.querySelector('.d_t_zhong');
        oDetails_top.style.background = 'rgba(255,255,255,0)';
        oDetails_top.style.color = 'rgba(255,255,255,0)';
        var num = 0;
        var num1 = 1/oImg;

        //坐标
        var startX ;
        var startY ;
        var endX ;
        var endY ;
        var distanceX;
        var distanceY;
        var scroll_Top;
        omain1.addEventListener('touchstart',function(e){
              startX = e.changedTouches[0].pageX,
              startY = e.changedTouches[0].pageY;
              scroll_Top = omain1.scrollTop;
        })
        omain1.addEventListener('touchmove', function(e) {
         
            // 如果这个元素的位置内只有一个手指的话
          // if (event.targetTouches.length == 1) {
           　　　　 // 阻止浏览器默认事件 
                  e.preventDefault();


            endX = e.changedTouches[0].pageX,
            endY = e.changedTouches[0].pageY;
            //获取滑动距离
            distanceX = endX-startX;
            distanceY = endY-startY;

            //判断滑动方向
            //Math.abs返回绝对值
            //这里有一个bug，scrollTop快到0时会停住，像有物体在卡住scrollTop上升一样。
            //此时会console.log向右或者向左滑动，所以在另外两个判断里也加入了scrollTop的运算
            if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
                // console.log('手指往右滑动');
                omain1.scrollTop = scroll_Top + (-distanceY)*1.2;
            }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
                // console.log('手指往左滑动');
                omain1.scrollTop = scroll_Top + (-distanceY)*1.2;
            }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY<0){
                
                //让下一个值减上一个值，就可以获得应该移动的距离了。
                console.log(omain1.scrollTop)
                omain1.scrollTop = scroll_Top + (-distanceY)*1.2;
            }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY>0){
                //同理 
                console.log('手指往下滑动');
                // console.log(omain1.scrollTop)
                omain1.scrollTop = scroll_Top - distanceY*1.2;
                
            }else{
                console.log('点击未滑动');
            }
            //根据scrollTop对透明度做处理
            num = num1 * omain1.scrollTop;

            oDetails_top.style.background = 'rgba(255,80,115,' +num +')';

            oXiangqingTitle.style.color = 'rgba(255,255,255,' + num +')';
            if(omain1.scrollTop<10){
                oXiangqingTitle.style.color = 'rgba(0,0,0,0)';
                od_t_link[0].style.background = 'rgba(0,0,0,.4)';
                od_t_link[1].style.background = 'rgba(0,0,0,.4)';

            }else{
                od_t_link[0].style.background = 'rgba(0,0,0,0)';
                od_t_link[1].style.background = 'rgba(0,0,0,0)';

            }
          // }
        }, false);

      },
      //根据传入id找商品
      FindGoods(){
        var oType = this.$route.query.type; 
        
        var oChunyu = JSON.parse(localStorage.data)[oType];
        for(var attr in oChunyu){
          if(oChunyu[attr].id==this.$route.query.id){
              this.data1 = oChunyu[attr];
          }
        }        
      },
      //判断swiper控制器是否应该存在 图片是否应该循环
      CheckImgs(oThis,oPagin,mySwiper){
        if(oThis.data1.lunboimgs.length<2){
          oPagin.style.display = 'none';
          mySwiper.autoplayPaused = true;
          mySwiper.animating = true;
        }else{
          oPagin.style.display = 'block';
        };        
      },
      //配送组件的动画
      PeiSongAnimate(StartElement,AnimateElement){
        var oPeiBox = document.querySelectorAll('.p_g_jiantou')[2];
        var oPei = document.querySelector('.details_peisong');
        var oX = 'X';
        var num = 0;
        var zifucuan = 'translate'+ oX + '('+ num +'px)';
        oPeiBox.addEventListener('touchstart',function(){
          oPei.style.transition = ' .5s all';
          oPei.style.transform = zifucuan;
        })
      }, 

      //规格选择的动画
      GuiGeAnimate(){
        var oPeiBox = document.querySelectorAll('.p_g_jiantou')[3];
        var oGuiGe =document.querySelector('.details_guige');
        var oXuanZhe = document.querySelector('.guige_xuanze');
        var oFootRight = document.querySelector('.foot_right');
        oPeiBox.addEventListener('touchstart',function(){
          oGuiGe.style.display = 'block';
          var oSet = setInterval(function(){
            oXuanZhe.style.transform = 'translateY(0%)';
            clearInterval(oSet); 
          },0)
          
        })
        oFootRight.addEventListener('touchstart',function(){
          oGuiGe.style.display = 'block';
          var oSet = setInterval(function(){
            oXuanZhe.style.transform = 'translateY(0%)';
            clearInterval(oSet); 
          },0)
          
        })
      },
      checkCar(){
        if(!localStorage.car || localStorage.car==''){
            localStorage.car='';
        }else{
          this.gouwuNum = JSON.parse(localStorage.car).length;
          var oBuyNum =document.querySelector('.gouwu_num');
          oBuyNum.style.display = 'block';
        }
        
      },

      //子组件$emit时，父组件所执行的函数
      demo(val){
        console.log(val);
        var oGouwu_num =document.querySelector('.gouwu_num');
        oGouwu_num.style.display = 'block';
        this.gouwuNum = val;
      }
    },
    mounted(){
      var oPagin = document.querySelector('.swiper-pagination');
      
      // var se = this;
      // se.data = localStorage.data;
      //swiper  商品详情轮播
      var mySwiper = new Swiper ('.swiper-container', {
        autoplay : 1500,
        loop : true,
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction : false,
        })

      this.CheckImgs(this,oPagin,mySwiper);
      this.Title();
      this.PeiSongAnimate();
      this.GuiGeAnimate();
      this.checkCar();
    },

  }    
</script>