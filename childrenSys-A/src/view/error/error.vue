
<template>
    <section class="ht__error-wrap animation-left">
        <div class="wrap-box">
            <div class="error-img">
                <img class="e-img" src="../../assets/img/404.png" alt="">
                <img class="e-img-ani c-L" src="../../assets/img/404-o.png" alt="">
                <img class="e-img-ani c-C" src="../../assets/img/404-o.png" alt="">
                <img class="e-img-ani c-R" src="../../assets/img/404-o.png" alt="">
            </div>
            <div class="error-content">
                <div class="c-t transform-bottom">哦豁!</div>
                <div class="c-f transform-bottom">404 页面未找到</div>
                <div class="c-c transform-bottom">可能没有权限访问此页面或页面不存在,请单击下面的按钮返回主页</div>
                <a class="c-b" href="/">返回上页</a>
            </div>
        </div>
    </section>
</template>

<script>
export default{
    data(){
        return{
            
        }
    }
}
</script>

<style lang='less' scoped>
.ht__error-wrap{
    width: 100%;
    height: 100%;
    & .wrap-box{
        transform: translate(-50%,-50%);
        position: absolute;
        top: 40%;
        left: 50%;
        width: 1200px;
        height: 350px;
        & .error-img{
            position: relative;
            float: left;
            width: 600px;
            overflow: hidden;
            & .e-img{
                width: 100%;
            }
            & .e-img-ani{
                position: absolute;
                width: 80px;
                opacity: 0;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1s;
            }
        }
        & .error-content{
            height: 100%;
            padding: 30px 0;
            & .c-t{
                font-size: 32px;
                line-height: 40px;
                color: #1482f0;
                margin-bottom: 20px;
                animation-fill-mode: forwards;
            }
            & .c-f{
                font-size: 20px;
                line-height: 24px;
                color: #222;
                margin-bottom: 10px;
                animation-delay: .1s;
                animation-fill-mode: forwards;
            }
            & .c-c{
                font-size: 13px;
                line-height: 21px;
                color: grey;
                margin-bottom: 30px;
                animation-delay: .2s;
                animation-fill-mode: forwards;
            }
            & .c-b{
                cursor: pointer;
                display: inline-block;
                width: 110px;
                height: 36px;
                background: #1482f0;
                border-radius: 100px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                line-height: 36px;
            }
        }
    }
    
}
.transform-bottom{
    font-weight: 700;
    opacity: 0;
    animation-name: slideUp;
    animation-duration: .5s;
}

@keyframes slideUp{
    0%{
        transform: translateY(60px);
        opacity: 0;
    }
    100%{
        transform: translateY(0);
        opacity: 1;
    }
}

.c-L{
    top: 17px;
    left: 220px;
    animation-name: cloudLeft;
}
.c-C{
    top: 10px;
    left: 420px;
    animation-name: cloudCenter;
    animation-duration: 1.5s;
}
.c-R{
    top: 100px;
    left: 500px;
    animation-name: cloudRight;
}





@keyframes cloudLeft{
    0%{
        top: 17px;
        left: 220px;
        opacity: 0;
    }
    20%{
        top: 33px;
        left: 188px;
        opacity: 1;
    }
    80%{
        top: 81px;
        left: 92px;
        opacity: 1;
    }
    100%{
        top: 97px;
        left: 60px;
        opacity: 0;
    }
}
@keyframes cloudCenter{
    0%{
        top: 10px;
        left: 420px;
        opacity: 0;
    }
    20%{
        top: 40px;
        left: 360px;
        opacity: 1;
    }
    100%{
        top: 160px;
        left: 120px;
        opacity: 0;
    }
}
@keyframes cloudRight{
    0%{
        top: 100px;
        left: 500px;
        opacity: 0;
    }
    20%{
        top: 120px;
        left: 460px;
        opacity: 1;
    }
    80%{
        top: 180px;
        left: 340px;
        opacity: 1;
    }
    100%{
        top: 200px;
        left: 300px;
        opacity: 0;
    }
}
</style>