<template>
  <div id="app">
    <!--头部-->
    <!--<indexlist></indexlist>-->
    <div id="top">
      <!--头部导航-->
      <div class="T-nav">
        <div class="T-nav-header">
          <!--用户盒子-->
          <div class="T-n-h-people">
            <router-link to="/mine" class="T-n-h-p-a">
              <i class="iconfont icon-icon">
                
              </i>
            </router-link>
          </div>
          <!--logo盒子-->
          <div class="T-n-h-logo">
            
          </div>
          <!--搜索盒子-->
          <div class="T-n-h-search">
            <router-link to="/search">
              <i class="iconfont icon-sousuo"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!--内容-->
    <!--轮播banner图不需要图片预加载-->
    <div id="main">
      <!--导航和轮播-->
      <div class="main-top">
        <!--轮播-->
        <div class="top-lunbo swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img class="banner-box" src="../static/imgs/banner1.jpg"></div>
              <div class="swiper-slide"><img class="banner-box" src="../static/imgs/banner2.jpg"></div>
              <div class="swiper-slide"><img class="banner-box" src="../static/imgs/banner3.jpg"></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>

        <!--导航-->
        <div class="top-list">
          <ul class="t-l-ul">
            <li class="t-l-u-li">
              <i class="iconfont icon-cb076744863b79b4df2aa85bb20934df-copy"></i>
              <span>美白面膜</span>
            </li>
            <li class="t-l-u-li">
              <i class="iconfont icon-yanzhuang"></i>
              <span>防水眼妆</span>
            </li>
            <li class="t-l-u-li">
              
              <i class="iconfont icon-dizhuang"></i>
              <span>遮瑕底妆</span>
            </li>
            <li class="t-l-u-li">
              <i class="iconfont icon-fangshaishuang"></i>
              <span>轻薄防晒</span>
            </li>
          </ul>
          <ul class="t-l-ul">
            <li class="t-l-u-li">
              <i class="iconfont icon-kouhong"></i>
              <span>水润唇妆</span>
            </li>
            <li class="t-l-u-li">
              <i class="iconfont icon-hufumeizhuang"></i>
              <span>洁面卸妆</span>
            </li>
            <li class="t-l-u-li">
              <i class="iconfont icon-meironghufu"></i>
              <span>美妆工具</span>
            </li>
            <li class="t-l-u-li">
              <i class="iconfont icon-17"></i>
              <span>眼霜精华</span>
            </li>
          </ul>
        </div>
      </div>
      <!--商品推荐-->
      <div class="main-container">
        <!--这里把结构做成一个组件会比较方便-->
        <!--一个m-b-container就是一个系列商品-->
        <!--1、PAPA RECIPE-->
        <div class="main-box">
          <div class="m-b-banner">
            <img class="banner-box1" src="../static/imgs/banner21.jpeg"></img>
          </div>

          <div class="m-b-container">
            <ul class="m-b-c-ul">
              <li class="m-b-c-li" v-for="(index,attr) in data1.chunyu" v-if="attr<=11">
                <router-link :to="{path:'/details',query:{id:index.id,type:index.type}}">
                <div class="m-b-c-li-imgbox">
                  <img class="loading-imgs" :src="src + loading" :data-src="chunfengsrc+index.img">
                </div>
                <div class="m-b-c-li-textbox">
                  <span class="textbox-title">{{index.title}}</span>
                </div>
                <div class="m-b-c-li-pricebox">
                  <div class="priceMax-box">
                    <span>¥</span>{{index.price}}<span>.00</span>
                  </div>
                  <div class="priceMin-box">
                    <span>¥</span>{{index.yuanjia}}<span>.00</span>
                  </div>
                </div>
                </router-link>
                
              </li>
              <li class="m-b-c-li">
                <router-link to="/main">
                <div class="all_box">
                  <span class="all_chinese">查看全部</span>
                  <div class="all_english">See All</div>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!--2、aimoli-->
        <div class="main-box">
          <div class="m-b-banner">
            <img class="banner-box1" src="../static/imgs/aimoli.jpg"></img>
          </div>

          <div class="m-b-container">
            <ul class="m-b-c-ul">
              <li class="m-b-c-li" v-for="(index,attr) in data1.aimoli" v-if="attr<=100">
                <router-link :to="{path:'/details',query:{id:index.id,type:index.type}}">
                <div class="m-b-c-li-imgbox">
                  <img class="loading-imgs" :src="src + loading" :data-src="chunfengsrc+index.img">
                </div>
                <div class="m-b-c-li-textbox">
                  <span class="textbox-title">{{index.title}}</span>
                </div>
                <div class="m-b-c-li-pricebox">
                  <div class="priceMax-box">
                    <span>¥</span>{{index.price}}<span>.00</span>
                  </div>
                  <div class="priceMin-box">
                    <span>¥</span>{{index.yuanjia}}<span>.00</span>
                  </div>
                </div>
                </router-link>
                
              </li>
              <li class="m-b-c-li">
                <router-link to="/main">
                <div class="all_box">
                  <span class="all_chinese">查看全部</span>
                  <div class="all_english">See All</div>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!--3.pony effect-->
        <div class="main-box">
          <div class="m-b-banner">
            <img class="banner-box1" src="../static/imgs/banner22.jpg"></img>
          </div>

          <div class="m-b-container">
            <ul class="m-b-c-ul">
              <li class="m-b-c-li" v-for="(index,attr) in data1.pony" v-if="attr<=100">
                <router-link :to="{path:'/details',query:{id:index.id,type:index.type}}">
                <div class="m-b-c-li-imgbox">
                  <img class="loading-imgs" :src="src + loading" :data-src="chunfengsrc+index.img">
                </div>
                <div class="m-b-c-li-textbox">
                  <span class="textbox-title">{{index.title}}</span>
                </div>
                <div class="m-b-c-li-pricebox">
                  <div class="priceMax-box">
                    <span>¥</span>{{index.price}}<span>.00</span>
                  </div>
                  <div class="priceMin-box">
                    <span>¥</span>{{index.yuanjia}}<span>.00</span>
                  </div>
                </div>
                </router-link>
                
              </li>
              <li class="m-b-c-li">
                <router-link to="/main">
                <div class="all_box">
                  <span class="all_chinese">查看全部</span>
                  <div class="all_english">See All</div>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!--4.xuehua-->
        <div class="main-box">
          <div class="m-b-banner">
            <img class="banner-box1" src="../static/imgs/banner23.jpg"></img>
          </div>

          <div class="m-b-container">
            <ul class="m-b-c-ul">
              <li class="m-b-c-li" v-for="(index,attr) in data1.xuehua" v-if="attr<=100">
                <router-link :to="{path:'/details',query:{id:index.id,type:index.type}}">
                <div class="m-b-c-li-imgbox">
                  <img class="loading-imgs" :src="src + loading" :data-src="chunfengsrc+index.img">
                </div>
                <div class="m-b-c-li-textbox">
                  <span class="textbox-title">{{index.title}}</span>
                </div>
                <div class="m-b-c-li-pricebox">
                  <div class="priceMax-box">
                    <span>¥</span>{{index.price}}<span>.00</span>
                  </div>
                  <div class="priceMin-box">
                    <span>¥</span>{{index.yuanjia}}<span>.00</span>
                  </div>
                </div>
                </router-link>
                
              </li>
              <li class="m-b-c-li">
                <router-link to="/main">
                <div class="all_box">
                  <span class="all_chinese">查看全部</span>
                  <div class="all_english">See All</div>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

         <!--5、innisfree-->
        <div class="main-box">
          <div class="m-b-banner">
            <img class="banner-box1" src="../static/imgs/banner24.jpg"></img>
          </div>

          <div class="m-b-container">
            <ul class="m-b-c-ul">
              <li class="m-b-c-li" v-for="(index,attr) in data1.innisfree" v-if="attr<=100">
                <router-link :to="{path:'/details',query:{id:index.id,type:index.type}}">
                <div class="m-b-c-li-imgbox">
                  <img class="loading-imgs" :src="src + loading" :data-src="chunfengsrc+index.img">
                </div>
                <div class="m-b-c-li-textbox">
                  <span class="textbox-title">{{index.title}}</span>
                </div>
                <div class="m-b-c-li-pricebox">
                  <div class="priceMax-box">
                    <span>¥</span>{{index.price}}<span>.00</span>
                  </div>
                  <div class="priceMin-box">
                    <span>¥</span>{{index.yuanjia}}<span>.00</span>
                  </div>
                </div>
                </router-link>
                
              </li>
              <li class="m-b-c-li">
                <router-link to="/main">
                <div class="all_box">
                  <span class="all_chinese">查看全部</span>
                  <div class="all_english">See All</div>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        
        <!--6、laneige-->
        <div class="main-box">
          <div class="m-b-banner">
            <img class="banner-box1" src="../static/imgs/banner21.jpg"></img>
          </div>

          <div class="m-b-container">
            <ul class="m-b-c-ul">
              <li class="m-b-c-li" v-for="(index,attr) in data1.laneige" v-if="attr<=100">
                <router-link :to="{path:'/details',query:{id:index.id,type:index.type}}">
                <div class="m-b-c-li-imgbox">
                  <img class="loading-imgs" :src="src + loading" :data-src="chunfengsrc+index.img">
                </div>
                <div class="m-b-c-li-textbox">
                  <span class="textbox-title">{{index.title}}</span>
                </div>
                <div class="m-b-c-li-pricebox">
                  <div class="priceMax-box">
                    <span>¥</span>{{index.price}}<span>.00</span>
                  </div>
                  <div class="priceMin-box">
                    <span>¥</span>{{index.yuanjia}}<span>.00</span>
                  </div>
                </div>
                </router-link>
                
              </li>
              <li class="m-b-c-li">
                <router-link to="/main">
                <div class="all_box">
                  <span class="all_chinese">查看全部</span>
                  <div class="all_english">See All</div>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div> 



        <div class="main_foot">
          <div>已经没有更多了哦~</div>
        </div>       
      </div>
    </div>

    <!--购物车组件-->
    <div class="buycar">
      <router-link to="/car"><img :src="src + car "></router-link>
      <span class="buycar_num">{{buyNum}}</span>
    </div>
    <!--组件的窗口-->
    <router-view></router-view>
  </div>
</template>

<script>
  import './main.scss'
  import './assets/iconfont/iconfont.css'
  import './assets/css/swiper-3.4.2.min.css'
  import Swiper from 'swiper'
  import axios from 'axios';
  import base from './assets/js/global.js'

  // 引入index-list组件
  // import indexList from './components/index/index-list.vue'
  export default {
    //引入index-list组件
    components: {
      // 'indexlist':indexList
    },
    created(){
      
    },
    data(){
      return {
       num:7,
       src:base.imgUrl,
       loading:'loading.gif',
       car:'car.png',
       chunfengsrc:base.imgUrl+'chunfeng/',
       buyNum:'',
       img21:'banner12.jpg',
       data1:'',
      }
    },
    methods:{
      checkCar(){
        if(!localStorage.car || localStorage.car==''){
            localStorage.car='';
        }else{
          this.buyNum = JSON.parse(localStorage.car).length;
          var oBuyNum =document.querySelector('.buycar_num');
          oBuyNum.style.display = 'block';
        }
        
      },        
   },
   mounted(){ 
      //swiper  banner轮播
      var mySwiper = new Swiper ('.swiper-container', {
       autoplay:1000,
       loop : true,
       pagination : '.swiper-pagination',
      })

      // 用一个变量指向this
      // 这样可以在axios里面调用它
      var oThis = this;
      //在dev-server文件中引入json，然后用router模块模拟后台
        axios.get('/getgoods')
       .then(function (response) {
          oThis.data1 = response.data[0];
          localStorage.data = JSON.stringify(response.data[0]);
          
        })
        .catch(function (error) {
          console.log(error);
        }
        
      );

      
      this.checkCar();
      
      
		},
    updated(){
      //图片延迟加载
      var loadingImgs = document.querySelectorAll('.loading-imgs');
      for(var i=0;i<=loadingImgs.length-1;i++){
        loadingImgs[i].onload = function(){
          this.src = this.getAttribute("data-src");
        } 
      }
    }
  }
</script>

