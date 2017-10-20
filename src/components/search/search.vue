<template>
    <div class="search flex_center">
        <div class="details_top">
            <div class="d_t_left">
                <a @click="routerBack" class="d_t_link">
                    <i class="iconfont icon-jiantou-"></i>
                </a>
            </div>
            <div class="d_t_right">
                <div class="search_box">
                    <div class="search_logo logo_left">
                        <i class="iconfont icon-sousuo"></i>
                    </div>
                    <input class="search_input" v-model="searchText" @input="clearTextButton">
                    </input>
                    <div class="search_clear_box search_logo">
                        <div class="search_clear" v-show="SearchClearDisPlay" ref="clearButton">x</div>
                    </div>
                </div>
                
            </div>
            <div class="search_button"><div ref="searchButton">搜索</div></div>
        </div>
        <!--排序-->
        <div class="search_sort" v-if="ajaxGo">
                
        </div>        
        <div class="search_main ">
            <div class="search_ready flex_center" v-if="ajaxGo==false">
                
            </div>

            <!--商品展示-->
            <div v-if="ajaxGo" v-for="attr in searchData" class="searchData_box">
                <router-link :to="{path:'/details',query:{id:attr.id,type:attr.type}}" class="flex_center link">
                    <div class="box_left">
                        <img :src="imgUrl + attr.img">
                    </div>
                    <div class="box_right flex_center">
            
                        <p class="b_r_title">{{attr.title}}</p>
                        <p class="b_r_yuanjia">原价：￥{{attr.yuanjia}}.00</p>
                        <p class="b_r_price">￥<span>{{attr.price}}.00</span></p>
                        
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
  import './search.scss'
  import '../../assets/iconfont/iconfont.css'
  import base from '../../assets/js/global.js'
  import axios from 'axios';
  export default {

    components: {
      
    },
    created(){

    },
    data(){
      return {
        //清空选项的显示与否
        SearchClearDisPlay:false,
        //搜索内容
        searchText:'',
        //判断搜索内容有没有值   
        searchZhi:false,     
        ajaxGo:false,
        //搜索数据存放
        searchData:[],
        showD:false,
        imgUrl:base.imgUrl + 'chunfeng/',
      }
    },
    methods:{

      routerBack(){
        this.$router.push('/');
        this.searchText = '';
        
      },
      //判断清空按钮是否显示
      clearTextButton(){
        if(this.searchText==''){
             this.SearchClearDisPlay = false;
             this.searchZhi = false;
        }else{
            this.SearchClearDisPlay = true; 
            this.searchZhi =true;
        }
        
      },
      //清楚输入内容
      clearText(){
        var oThis = this;
        var oButton = this.$refs.clearButton;
        oButton.addEventListener('touchstart',function(){
            oThis.searchText = '';
        });
      },
      //搜索
      searchButton(){
        var oThis = this;
        // console.log(this.$router.currentRoute.query);
        var oButton = this.$refs.searchButton;
        oButton.addEventListener('touchstart',function(){
            
            if(!oThis.searchZhi ||oThis.searchText==''){
                console.log(oThis.searchZhi);
                console.log('请输入内容');
            }else{
                oThis.ajaxGo = true;
                var oSearchData = [];
                //拿到所有数据
                var oData = JSON.parse(localStorage.data);
                //遍历种类
                for(var attr in oData){
                    //遍历每一项
                    for(var i=0;i<=oData[attr].length-1;i++){
                        //查找到
                        if(oData[attr][i].title.indexOf(oThis.searchText)>=0){
                        //找一个数组把找到的数据存起来
                            oSearchData.push(oData[attr][i]);
                        }
                    }
                
                }
                
                oThis.searchData = oSearchData;
                console.log(oSearchData);
                // for(var i=0;i<=oData.length-1;i++){
                //     //查找到
                //     
                //     else{
                //         //这里查找失败不代表没有
                //         // console.log('查找失败');

                //     }
                //     
                //     //总的查找失败就证明数据没数据
                // }
                axios({
                    method:"POST",
                    url:'/search',
                    data:{
                       searchText:oThis.searchText,
                    },

                });
            }
        })
      },

    },
    mounted(){
       this.clearText();
       this.searchButton();
    },
    updated(){
        this.clearTextButton();
    },

  }    
</script>