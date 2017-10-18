<template>
    <div class="details_guige">
      <div class="guige_zhezhao"></div>
      <Tips></Tips>
      <div class="guige_xuanze">
        <!--头部展示-->
        <div class="xuanze_top">
          <div class="x_t_img">
            <!--solt接收父组件相同name的slot的内容-->
            <slot name="guigeImg"></slot>
          </div>
          <div class="x_t_text">
            <div class="text_button">
              <div class="close_button">
                <slot name="close_button"></slot>
              </div>
            </div>
            <div class="text_content">
              <slot name="text_content_slot"></slot>
            </div>
            <div class="text_price">
              <slot name="yuanjia"></slot>
              <slot name="xianjia"></slot>
            </div>
          </div>
        </div>
        <!--内容展示-->
        <div class="xuanze_main">
          <p class="x_z_title">规格选择</p>
          <slot name="select"></slot>
        </div>
        <!--尾部展示-->
        <div class="xuanze_foot">
          <div class="foot_num_box">
            <div class="num_box_title">数量</div>
            <div class="foot_num">
              <span class="num_jian num_class">-</span>
              <span class="num_num num_class">{{num}}</span>
              <span class="num_jia num_class">+</span>
            </div>
          </div>
          <div class="foot_car">
            <div class="car_box">加入购物车</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import './guige.scss'
  import Tips from '../../tips/tips.vue'
  export default {
    props:['data'],
    components: {
      'Tips':Tips
    },
    created(){
      
    },
    data(){
      return {
        num:1,
        CarItem:{
          num:'',
          title:this.data.title,
          img:this.data.img,
          selector:'',
          price:this.data.price,
          id:this.data.id,
          type:this.data.type,
          selectThis:'',
          cuxiao:this.data.youji,
        },
        xuanze:false,
        shuliang:'',
      }
    },
    methods:{
    //退出
      TuiChu(){
        var oGuiGe =document.querySelector('.details_guige');
        var oZheZhao = document.querySelector('.guige_zhezhao');
        var oXuanze = document.querySelector('.guige_xuanze');
        var oClose =document.querySelector('.close_button');
        //object.style.height只能获取行内样式
        //获取css内的样式要用到getComputedStyle（chrome）和 currentStyle(ie)两种写法一起兼容
        // console.log(oHeight);
        oZheZhao.addEventListener('touchstart',function(e){
            oXuanze.style.transition = '.5s all';
            oXuanze.style.transform = 'translateY(120%)';
            var oSet = setInterval(function(){
              oGuiGe.style.display = 'none';
              clearInterval(oSet);
            },300) 
        })
        oClose.addEventListener('touchstart',function(e){
            // oXuanze.style.transition = '.5s all';
            oXuanze.style.transform = 'translateY(120%)';
            var oSet = setInterval(function(){
              oGuiGe.style.display = 'none';
              clearInterval(oSet);
            },300) 
        })
      },
    //规格选择变色
      Select(){
        var oThis = this;
        var oGuige_select = document.querySelector('.guige_select');
        var oSelector = document.querySelectorAll('.select_div');

        //判断购物车组件是否显示所选规格
        if(oSelector.length==1){
          this.CarItem.selector = false;
          //写入所选项
         
        }else{
          this.CarItem.selector = true;
        }
        
        oGuige_select.addEventListener('touchstart',function(e){
          if(e.target._prevClass.indexOf('select_div')=== 0 ){
            //所有div还原
            for(var i=0;i<=oSelector.length-1;i++){
              oSelector[i].style.background = '#fff';
              oSelector[i].style.color = '#000'
            }
            //点击的div变色
            e.target.style.background = '#ff5073';
            e.target.style.color = '#fff';
            oThis.CarItem.selectThis =  e.target.innerHTML;
            oThis.xuanze =true;
          }else{
             for(var i=0;i<=oSelector.length-1;i++){
              oSelector[i].style.background = '#fff';
              oSelector[i].style.color = '#000'
              oThis.xuanze =false;
            }
          }
        }) 
      },
      //数量加减
      BuyNum(){
        var oThis = this;
        var oJian =document.querySelector('.num_jian');
        var oJia =document.querySelector('.num_jia');
        oJian.addEventListener('touchstart',function(){
          if(oThis.num!==1){
            oThis.num-=1;
            oJian.style.background = '#ccc';
          }
        })
        oJian.addEventListener('touchend',function(){
          oJian.style.background = '#f9f9f9';
        })
        oJia.addEventListener('touchstart',function(){
          if(oThis.num!==99){
            oThis.num+=1;
            oJia.style.background = '#ccc';
          }
        })
        oJia.addEventListener('touchend',function(){
          oJia.style.background = '#f9f9f9';
        })
      },
      //加入购物车
      addCar(){
        var oThis = this;
        var oAddCar =document.querySelector('.car_box');
        var oTips =document.querySelector('.tips');
        //点击加入购物车按钮
        oAddCar.addEventListener('touchstart',function(){
          
          //判断商品规格是否选择
          if(oThis.xuanze){
            oThis.CarItem.num = oThis.num;
            var oCar = [];
            //判断本地存储购物车是否存在
            //不存在--直接写进去本地存储
            if(!localStorage.car || localStorage.car==''){
              oCar.push(oThis.CarItem);
              localStorage.car = JSON.stringify(oCar);
              oTips.innerHTML = "添加成功";
              oTips.style.display = 'flex';
            }
            //存在--循环数组判断添加的商品在不在本地存储中
            else{
              oCar = JSON.parse(localStorage.car);

              //onOff判断是否添加商品进去数组
              var onOff = true;

              for(var i=0;i<=oCar.length-1;i++){

                //如果要添加的商品已经存在
                if(oCar[i].id == oThis.CarItem.id){
                    onOff = false;
                    
                  //如果要添加的商品的规格与本地存储的一致
                  if(oCar[i].selectThis == oThis.CarItem.selectThis){
                    
                    if(oCar[i].num==oThis.CarItem.num){
                      oTips.innerHTML = "该商品已经在购物车了";
                      oTips.style.display = 'flex';
                      clearInterval(time);
                      var time =setInterval(function(){
                        oTips.style.display = 'none';
                        clearInterval(time);
                      },1000)
                    }else{
                      //修改商品数量
                      oCar[i].num = oThis.CarItem.num;
                      localStorage.car = JSON.stringify(oCar);

                      oTips.innerHTML = "已修改物品数量";
                      oTips.style.display = 'flex';
                      clearInterval(time);
                      var time =setInterval(function(){
                        oTips.style.display = 'none';
                        clearInterval(time);
                      },1000)
                    }
                    //只要找到了立刻停止循环执行
                    break;
                  }
                  //如果不存在
                  else{
                    onOff = true;
                    console.log('走这里了');
                    // oCar.push(oThis.CarItem);
                    // localStorage.car = JSON.stringify(oCar);
                    // console.log(oCar[i].selectThis,oThis.CarItem.selectThis);
                  }
                }
                
              }
              if(onOff){
                  oCar.push(oThis.CarItem);
                  localStorage.car = JSON.stringify(oCar);
                  
                  oTips.innerHTML = '添加成功';
                  oTips.style.display = 'flex';
                  clearInterval(time);
                  var time =setInterval(function(){
                    oTips.style.display = 'none';
                    clearInterval(time);
                  },1000)
              }
          }
          console.log(JSON.parse(localStorage.car))  
            
          oThis.shuliang = JSON.parse(localStorage.car).length; 
          //父子组件通信 
          oThis.demo111(oThis.shuliang);
          }else{
            //没有选择商品规格
            oTips.innerHTML = '请先选择商品规格'
            oTips.style.display = 'flex';
            var time =setInterval(function(){
              oTips.style.display = 'none';
              clearInterval(time);
            },1000)
          }

        })
        
      },
    //子组件触发函数
    //用来$emit 父组件所指定好的 v-on(@)事件（demo1）
    demo111(val){
      this.$emit('demo1',val);
    },  
    },
    mounted(){
      this.TuiChu();
      this.Select();
      this.BuyNum();
      this.addCar();
    },
    updated(){
      
    }
  }    
</script>