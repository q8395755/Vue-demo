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
            <span class="edit" @click="Edit" v-show="edit">编辑</span>
            <span class="edit" @click="Edit" v-show="!edit">完成</span>
          </div>
        </div>
        <!--v-else必须跟在v-if后面-->

        <!--如果购物车有数据就显示这个div-->
        <div class="car_main" v-show="have" ref="mainC">
          <!--根据购物车里的数据判断应该显示哪一个折扣的div-->
          <!--韩国直邮-->
          <div class="main_korea" v-if="this.dataKorea.length>0" ref="korea_main">
            <!--头部信息-->
            <div class="m_k_top">
              <!--头部全选-->
              <div class="m_k_top_all_select_box center">
                <div class="m_k_top_all_select"  ref="korea_all"></div>
              </div>
              <!--头部满减信息-->
              <div class="m_k_top_logo_box center">
                <div class="m_k_top_logo">跨境商品</div>
              </div>
              <!--头部文字-->
              <div class="m_k_top_text center">满299元包邮</div>
            </div>
            <div class="m_k_main" v-for="attr,index in dataKorea" >
              <!--商品选择-->
              <div class="main_left m_k_top_all_select_box center">
                <div class="m_k_top_all_select korea_select m_korea" :data-num=index></div>
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
              <p>本区总计：<span class="mkb_text mkb_color">￥{{KoreaPrice}}</span></p>
            </div>
          </div>


          <div class="main_china" v-if="this.dataChina.length>0" ref="china_main">
            <!--头部信息-->
            <div class="m_k_top">
              <!--头部全选-->
              <!--国内包邮-->
              <div class="m_k_top_all_select_box center">
                <div class="m_k_top_all_select" ref="china_all"></div>
              </div>
              <!--头部满减信息-->
              <div class="m_k_top_logo_box center">
                <div class="m_k_top_logo">其他商品</div>
              </div>
              <!--头部文字-->
              <div class="m_k_top_text center">满99元包邮</div>
            </div>
            <div class="m_k_main" v-for="attr,index in dataChina">
              <div class="main_left m_k_top_all_select_box center">
                <div class="m_k_top_all_select m_china china_select" :data-num=index></div>
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
              <p>本区总计：<span class="mkb_text mkb_color">￥{{ChinaPrice}}</span></p>
            </div>
          </div>
        </div>
        <div class="car_main" v-show="!have"><p class="main_kong">购物车空空如也，快去选购吧！</p></div>
        <div class="car_foot" v-show="have">
          <div class="main_left m_k_top_all_select_box center">
            <div class="m_k_top_all_select allSelect" ref="selectorAll"></div>
          </div>
          <div class="foot_right">
            <div class="all_select_text ">
              全选
            </div>
            <div class="foot_price">
              <p>总计：<span>￥{{price}}</span></p>
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
        dataChina:[],
        dataKorea:[],
        imgUrl:base.imgUrl + 'chunfeng/',
        //全选
        selectorAllColor:false,
        koreaSelect:false,
        chinaSelect:false,
        price:0,
        ChinaPrice:0,
        KoreaPrice:0,
        ChinaYouJi:false,
        KoreaYouJi:false,
        koreaDanxuanNum:0,
        chinaDanxuanNum:0,
        del:false,
        edit:false,
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
      //商品全选
      m_selectorAll(){
          var oAll =document.querySelectorAll('.m_k_top_all_select');
            //清空总价,韩国总价，中国总价
            this.price = 0;
            this.ChinaPrice = 0;
            this.KoreaPrice = 0; 
          if(this.selectorAllColor){
            //已经全选
            this.selectorAllColor = false;
            this.chinaSelect = false;
            this.koreaSelect = false;
            //全选数量
            this.koreaDanxuanNum = 0;
            this.chinaDanxuanNum = 0;
            console.log(this.chinaDanxuanNum);
            oAll.forEach(function(attr){
              attr.classList.remove('select_color');
            });

          }else{
            //还未全选
            var oThis = this;
            oAll.forEach(function(attr){
              attr.classList.add('select_color');
            });
            //改变状态
            this.selectorAllColor = true;
            this.chinaSelect = true;
            this.koreaSelect = true;
            //改变数量
            this.koreaDanxuanNum = this.dataKorea.length;
            this.chinaDanxuanNum = this.dataChina.length;
            //改变总价，韩国总价，中国总价
            this.dataKorea.forEach(function(attr){
              var dataPrice = attr.price * attr.num;
              oThis.KoreaPrice += dataPrice;
            })
            this.dataChina.forEach(function(attr){
              var dataPrice = attr.price * attr.num;
              oThis.ChinaPrice += dataPrice;           
            })
            this.price = this.ChinaPrice + this.KoreaPrice;
            //满足包邮条件
            this.ChinaYouJi = true;
            this.KoreaYouJi = true;
          }
      },
      //全选判断
      judge(){
        if(this.koreaSelect&&this.chinaSelect){
          this.selectorAllColor = true;
        }else{
          this.selectorAllColor = false;
        }
      },
      chinaSelectAll(){
          if(this.chinaSelect){
            //已经全选
             this.selectorAllColor = false;
             this.chinaSelect = false;
          }else{
            //还未全选
            this.chinaSelect =true;
          }       
      },
      //选择函数封装
      SelectorAll(refname,fn){
        var oThis = this;
        var attr = this.$refs[refname];
        if(attr){
          attr.addEventListener('touchstart',fn);
        }
        
      },
      koreaSelectAll(){
        if(this.koreaSelect){
            //已经全选
            this.selectorAllColor = false;
            this.koreaSelect = false;
        }else{
            //还未全选
            this.koreaSelect = true;
        }
      },
      korea_all(){
        var oThis = this;
        //获取韩国全选按钮
        var oKorea_all = this.$refs.korea_all;
        //获取韩国单选按钮
        var oKorea = document.querySelectorAll('.m_korea');
        //获取全选按钮
        var oAll = document.querySelector('.allSelect');
        //如果韩国全选已经被选中
        if(oKorea_all.className.indexOf('select_color')>=0){
          //清除全选  因为样式有可能是全选添加的
          oAll.classList.remove('select_color');
          //清除本身样式 阴阳有可能是点击韩国全选按钮添加的
          oKorea_all.classList.remove('select_color');
          //取消选中就必须把韩国单选样式全部取消
          oKorea.forEach(function(attr){
            attr.classList.remove('select_color');
          });
          this.koreaSelect = false;
          this.koreaDanxuanNum = 0;
          oThis.price -= oThis.KoreaPrice;
          oThis.KoreaPrice = 0;
        }
        //如果韩国全选还未被选中
        else{
          var oThis = this;
          oThis.price = 0;
          oThis.KoreaPrice = 0;
          //这里要先判断中国全选是否选中的
          //不全选就等于韩国全选
          oKorea_all.classList.add('select_color');
          //给所有韩国单选按钮添加颜色
          oKorea.forEach(function(attr){
            attr.classList.add('select_color');
          })
          //改变韩国全选状态以及改变韩国全选数量
          this.koreaSelect = true;
          this.koreaDanxuanNum = this.dataKorea.length;
          //如果中国全选也true，就点亮全选，并改变价格
          if(this.chinaSelect){
            this.selectorAllColor = true;
            oAll.classList.add('select_color');
            // this.dataChina.forEach(function(attr){
            //   var dataPrice = attr.price * attr.num;
            //   oThis.price += dataPrice;            
            // })

          }
          //改变价格
          this.dataKorea.forEach(function(attr){
            var dataPrice = attr.price * attr.num;
            oThis.KoreaPrice += dataPrice;
          }); 
          
          this.price += this.KoreaPrice;  
            oThis.price += oThis.ChinaPrice;       
        }
        
      },
      china_all(){
        var oThis = this;
        //获取中国全选按钮
        
        var ochina_all = this.$refs.china_all;
        //获取中国单选按钮
        var ochina = document.querySelectorAll('.m_china');

        var oAll = document.querySelector('.allSelect');
        //如果中国全选已经被选中
        if(ochina_all.className.indexOf('select_color')>=0){
          //清除全选  因为样式有可能是全选添加的
          this.selectorAllColor = false;
          oAll.classList.remove('select_color');
          //清楚本身样式 阴阳有可能是点击韩国全选按钮添加的
          ochina_all.classList.remove('select_color');
          //取消选中就必须把韩国单选样式全部取消
          ochina.forEach(function(attr){
            attr.classList.remove('select_color');
          });
          this.chinaSelect = false;
          this.chinaDanxuanNum = 0;
          oThis.price -= oThis.ChinaPrice;
          oThis.ChinaPrice = 0;          
        }
        //如果韩国全选还未被选中
        else{
          this.price = 0;
          this.ChinaPrice = 0;
          //这里要先判断中国全选是否选中的
          //不全选就等于韩国全选
          ochina_all.classList.add('select_color');

          ochina.forEach(function(attr){
            attr.classList.add('select_color');
          })
          this.chinaSelect = true;
          this.chinaDanxuanNum = this.dataChina.length;
          if(this.koreaSelect){
            this.selectorAllColor = true;
            oAll.classList.add('select_color');
          }
          this.dataChina.forEach(function(attr){
            var dataPrice = attr.price * attr.num;
            oThis.ChinaPrice += dataPrice;   
                   
          })
          this.price += this.ChinaPrice; 
          this.price += this.KoreaPrice;
        }
        
      },
      korea_danxuan(e){
        //如果是韩国单选按钮
        var oKorea_all = this.$refs.korea_all;
        var oAll = document.querySelector('.allSelect');

        if(e.target.className.indexOf('m_korea')>=0){
          //获取点击按钮的位置
          var oNum = e.target.getAttribute("data-num");
          //如果有颜色
          if(e.target.className.indexOf('select_color')>=0){
            //有颜色先取消全选状态
            this.selectorAllColor = false;
            this.koreaSelect = false;

            //取消全选颜色以及本身颜色
            oKorea_all.classList.remove('select_color');
            oAll.classList.remove('select_color');
            e.target.classList.remove('select_color')
            //修改选中商品数量
            this.koreaDanxuanNum-=1;
            //减少当前按钮的价格
            var oPrice = this.dataKorea[oNum].price*this.dataKorea[oNum].num;
            this.price -= oPrice;
            this.KoreaPrice -= oPrice;
          }
          //如果没颜色
          else{
            //先添加颜色
            e.target.classList.add('select_color');
            //修改选中数量，修改总价
            this.koreaDanxuanNum+=1;
            var oPrice = this.dataKorea[oNum].price*this.dataKorea[oNum].num;
            this.price += oPrice;
            this.KoreaPrice += oPrice;
            //查询韩国单选和中国单选的状态，决定是否要增加全选颜色
            // var oKorea =document.querySelectorAll('.m_korea');
            console.log(this.koreaDanxuanNum);
            if(this.koreaDanxuanNum==this.dataKorea.length){
              oKorea_all.classList.add('select_color');
              
              this.koreaSelect = true;
              
              if(this.chinaDanxuanNum == this.dataChina.length){
                oAll.classList.add('select_color');
              }
            }

          }
        }

      },
      china_danxuan(e){
        //如果是中国单选按钮
        var oChina_all = this.$refs.china_all;
        var oAll = document.querySelector('.allSelect');
        if(e.target.className.indexOf('m_china')>=0){
          //如果有颜色
          //获取点击按钮的位置
          var oNum = e.target.getAttribute("data-num");
          if(e.target.className.indexOf('select_color')>=0){
            //有颜色先取消全选状态
            this.selectorAllColor = false;
            this.chinaSelect = false;
            console.log(oChina_all);
            //取消全选颜色以及本身颜色
            oChina_all.classList.remove('select_color');
            oAll.classList.remove('select_color');
            e.target.classList.remove('select_color')

            this.chinaDanxuanNum-=1;
            var oPrice = this.dataChina[oNum].price*this.dataChina[oNum].num;
            this.price -= oPrice;
            this.ChinaPrice -= oPrice;
          }
          //如果没颜色
          else{
            //先添加颜色
            e.target.classList.add('select_color');
            this.chinaDanxuanNum+=1;
            var oPrice = this.dataChina[oNum].price*this.dataChina[oNum].num;
            this.price += oPrice;
            this.ChinaPrice += oPrice;
            //查询韩国单选和中国单选的状态，决定是否要增加全选颜色
            // var ochina =document.querySelectorAll('.m_china');
            if(this.chinaDanxuanNum==this.dataChina.length){
              oChina_all.classList.add('select_color');
              console.log(this.chinaDanxuanNum);
              this.chinaSelect = true;
              console.log(this.chinaDanxuanNum);
              if(this.koreaDanxuanNum == this.dataKorea.length){
                oAll.classList.add('select_color');
              }
            }

          }
        }
      },
      //编辑按钮
      Edit(){
        if(!this.edit){
          this.edit = !this.edit;
        }else{
          this.edit = !this.edit;
        }
      }      
    },
    mounted(){
        if(this.have){
          this.SelectorAll('selectorAll',this.m_selectorAll);
          this.SelectorAll('korea_all',this.korea_all);  
          this.SelectorAll('china_all',this.china_all);
          this.SelectorAll('korea_main',this.korea_danxuan);  
          this.SelectorAll('china_main',this.china_danxuan);
          this.Edit(); 
        }
    },
    updated(){
      
    }
  }    
</script>