<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 遍历所有数据 -->
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <!--选中就是1,没选中就是0  -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="checkCart(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <!-- 商品标题 -->
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <!-- 商品价格 -->
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <button class="mins" @click="updateAdd(cart,-1)" :disabled="cart.skuNum===1">-</button>
            <!-- 商品数量 -->
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @input="formatSkuNum"
              @blur="updateAdd(cart,$event.target.value*1-cart.skuNum)"
            />
            <!-- @blur="update(cart.skuId,cart.skuNum,$event)"
            @input="formatSkuNum"-->
            <!-- blur失去焦点时,更新数量,触发event事件 -->
            <!-- input表单事件不传参,默认是event参数 -->
            <button @click="updateAdd(cart,1)" class="plus" :disabled="cart.skuNum===10">+</button>
            <!-- disabled当按钮加到或减到一定数量时,会禁止加或减,相当于默认就是1或10 -->
          </li>
          <li class="cart-list-con6">
            <!-- 商品总价格 -->
            <span class="sum">{{cart.skuNum*cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckeAll" @change="checkCartAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="batchDelCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="submit">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'ShopCart',
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList,
    }),
    ...mapGetters(['selectCart', 'totalCount', 'totalPrice', 'isCheckeAll']),
    //商品总数量
    // total() {
    //   return (
    //     this.cartList
    //       //过滤选择的商品
    //       .filter((cart) => cart.isChecked === 1)
    //       .reduce((p, c) => {
    //         return p + c.skuNum;
    //       }, 0)
    //   );
    // },
    //商品总价格
    // totalPrice() {
    //   return this.cartList
    //     .filter((cart) => cart.isChecked === 1)
    //     .reduce((p, c) => {
    //       return p + c.skuNum * c.skuPrice;
    //     }, 0);
    // },
  },

  methods: {
    ...mapActions(['getShopCart', 'getUpdateCart', 'getDeleteCart']),
    //表单事件格式化
    // formatSkuNum(e) {
    //   //正则验证指向的值
    //   let skuNum = e.target.value.replace(/\D+/g, '');
    //   //判断临界值
    //   if (skuNum < 1) {
    //     skuNum = 1;
    //   } else if (skuNum > 10) {
    //     skuNum = 10;
    //   }
    //   e.target.value = skuNum;
    // },

    //表单失去焦点更新数据发送请求
    // update(skuId, skuNum, e) {
    //   if (+e.target.value === skuNum) return;
    //   this.getUpdateCart({ skuId, skuNum: e.target.value - skuNum });
    // },
    //更新商品数量
    /* skuId:商品Id,skuNum:商品增加或减少,count商品数量 */
    // async updateAdd(skuId, skuNum) {
    /*  if(count<=1 && skuNum<0){
        if(window.confirm("您要删除当前商品吗?")){

        }
        return
      }
      if(count>=100 &&skuNum===1){
        alert("库存有限")
        return
      } */
    //更新商品
    // await this.getUpdateCart({ skuId, skuNum });
    //刷新页面,
    //手动更新页面方法就不需要发请求了
    // await this.getShopCart();
    //},

    //删除商品
    async deleteCart(skuId) {
      if (window.confirm('你确认要删除吗?')) {
        await this.getDeleteCart(skuId);
        this.getShopCart();
      }
    },
    //删除所有选中的商品
    batchDelCart() {
      const { selectCart } = this;
      if (selectCart.length === 0) return;
      if (window.confirm('你确认要删除已选中的购物项吗?')) {
        selectCart.forEach((cart) => {
          this.getDeleteCart(cart.skuId);
          this.getShopCart();
        });
      }
    },
    //切换选中商品
    async checkCart(cart) {
      const isChecked = cart.isChecked === 1 ? 0 : 1;
      try {
        //触发actions函数
        await this.$store.dispatch('getCheckCart', {
          skuId: cart.skuId,
          isChecked,
        });
        this.getShopCart();
      } catch (error) {
        alert(error);
      }
    },
    //切换全选和全不选操作
    async checkCartAll(e) {
      const isChecked = e.target.checked * 1;
      const promises = this.cartList.map((cart) => {
        return this.$store.dispatch('getCheckCart', {
          skuId: cart.skuId,
          isChecked,
        });
      });
      try {
        await Promise.all(promises);
        this.getShopCart();
      } catch (err) {
        alert(err);
      }
    },
    //修改商品数量
    async updateAdd(cart, changeNum) {
      const { skuId } = cart;
      if (cart.skuNum + changeNum > 0) {
        await this.$store.dispatch('getUpdateCart', {
          skuId,
          skuNum: changeNum,
        });
      }
    },
    //格式化
    formatSkuNum(e) {
      let skuNum = e.target.value.replace(/\D+/g, '');
      if (skuNum < 1) {
        skuNum = 1;
      } else if (skuNum > 10) {
        skuNum = 10;
      }
      e.target.value = skuNum;
    },
    //点击结算跳转页面
    submit() {
      this.$router.push('/trade');
    },
  },
  mounted() {
    //一上来发送请求
    this.getShopCart();
  },
};
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 10%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 20%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 17.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 15%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 15%;
        }

        .cart-list-con5 {
          width: 20%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>