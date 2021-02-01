
<template>
  <div class="ht__login-box">
    <div class="login-title">
      <div class="login-conten">
          <div class="me-saying">
            <!-- <div class="say-b">
            迷茫的原因有且仅有一个，在本该奋斗的年纪想得太多却做得太少！
            </div> -->
          </div>
          <div  class="me-login">
            <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" label-position="left">
                <FormItem class="company_logo" >
                    <img src="../../assets/img/login-h.png" alt="" v-show="logType == 'default'">
                    <img src="../../assets/img/login-n.png" alt="" v-show="logType == 'focusUserName'">
                    <img src="../../assets/img/login-p.png" alt="" v-show="logType == 'focusPassword'">
                </FormItem>
                <FormItem>
                    <div class="comp_text">管理平台</div>
                </FormItem>
                <FormItem prop="user">
                    <Input prefix="ios-contact" v-model="formInline.user"  placeholder="请输入账号" @on-focus="focusUserName" @on-blur="blur"/>
                </FormItem>
                <FormItem prop="password">
                    <Input prefix="md-lock" type="password" v-model="formInline.password"  placeholder="请输入密码" @on-focus="focusPassWord" @on-blur="blur"/>
                </FormItem>
                <FormItem prop="verCode">
                    <Input prefix="md-photos" type="text" style="width:60%;" v-model="formInline.verCode"  placeholder="请输入验证码" @on-focus="focusUserName" @on-blur="blur"/>
                    <!-- <img :src="verCode" alt="" class="verCodeImg" @click="getVerCode"> -->
                    <span class="verCodeImg" @click="getVerCode" v-html="verCode">
                       
                    </span>
                </FormItem>
                <FormItem label="记住密码">
                    <i-switch class="rem-switch" v-model="remember" ></i-switch>
                </FormItem>
                <FormItem>
                    <div class="login-bottom" @click="singIn">
                        <span>登录</span>
                    </div>
                </FormItem>
            </Form>
          </div>
      </div>
    </div>
  </div>
</template>

<script src="./login"></script>

<style lang='less' scoped>
.ht__login-box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
}
@keyframes rotate {
  0% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  50% {
    transform: scale3d(1, 1, 1);
  }
  100% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
}
.login-title{
    width: 100%;
    height: 100%;
    position: relative;
}
.login-title::after {
    content: "";
    background: url("../../assets/img/dark-logs-bg.jpg") no-repeat;
    animation: rotate 40s 0s ease both infinite;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.login-conten{
    height: 350px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    display: flex;
    & .me-saying{
        flex: 1;
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        font-family: 'KaiTi';
    }
    & .me-saying .say-b{
        float: right;
        position: relative;
        top: 50%;
        width: 450px;
        transform: translate(-30%,-50%);
        & > p:last-child{
            text-align: right;
        }
    }
    & .me-login{
        flex: 1;
        & .form{
            width: 400px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            padding: 50px 50px 10px;
            border-radius: 5px;
            background:#ffffffd1;
            margin: auto;
            box-shadow:0 0 10px var(--borderColorShadow);
            cursor: pointer;
            transition: all 3s ease;
            .company_logo{
                position: absolute;
                float: left;
                left: 52%;
                transform: translateX(-50%);
                top: -92px;
                & img{
                    width: 130px;
                }
            }
        }
        // & .form:hover{
        //     background:#fff !important;
        //     transition: all 3s ease;
        //     & .comp_text{
        //         color: transparent !important;
        //         background-image: linear-gradient(135deg,#009688,blue);
        //         -webkit-background-clip: text;
        //         // animation: bagrc 5s infinite linear;
        //         transition: all 3s ease;
        //     }
        //     & .company_logo img {
        //         background:#fff !important;
        //         transition: all 3s ease;
        //     }
        //     & .login-bottom::after{
        //         content: '';
        //         position: absolute;
        //         top: 50%;
        //         left: 50%;
        //         transform: translate(-50%,-50%);
        //         animation: wave 2s infinite linear
        //     }
        // }
        & .ches_formAction{
            background:#fff;
        }
    }
}

// @keyframes bagrc{
//      0%{
//         background-position: 0 0;
//     }
//     100%{
//         background-position: -100% 0;
//     }
// }

.rem-switch{
    float: right;
}
.login-bottom{
    background: linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff);
    color: #fff;
    text-align: center;
    cursor: pointer;
    position: relative;
    border-radius: 3px;
}
.login-bottom:hover{
    background: linear-gradient(90deg, #3254b1, #317cdf, #42a4ff);
}
@keyframes wave {
    0%{
        width: 0;
        height: 0;
        background:  rgba(0, 0, 0, 0.3);
        border-radius: 10%;
        opacity: 1;
    }
    50%{
        width: 30%;
        height: 100%;
        background:  rgba(0, 0, 0, 0.3);
        border-radius: 33%;
        opacity: 1;
    }
    100%{
        width: 50%;
        height: 100%;
        background:  rgba(0, 0, 0, 0.3);
        opacity: 0;
    }

}
.comp_text{
    text-align: center;
    font-size: 21px;
    font-weight: bold;
    font-family: cursive;
    transition: all 1s ease;
    background-image: linear-gradient(15deg,#009688,blue,red);
    color: transparent !important;
    -webkit-background-clip: text;
}
.verCodeImg{
    width: 35%;
    float: right;
}
</style>