<template>
	<div class="container-box">
		<Row class="container-title">
			<Col span="24" class="title-info">{{title}}</Col>
			<Col span="12" class="title-left">{{mainInfo}}</Col>
			<Col span="12" class="title-date">
				<span>{{getDate}}</span>
			</Col>
		</Row>
		<Row class="rowBgk">
			<Col span="6"  >
				<div class="panel panel-left">

				</div>
			</Col>
			<Col span="12" >
				<div class="panel panel-left">

				</div>
			</Col>
			<Col span="6" >
				<div class="panel panel-left">

				</div>
			</Col>
		</Row>
		<Row  class="rowBgk">
			<Col span="8"  >
				<div class="panel-footer panel-left">

				</div>
			</Col>
			<Col span="8" >
				<div class="panel-footer panel-left">

				</div>
			</Col>
			<Col span="8" >
				<div class="panel-footer panel-left">

				</div>
			</Col>
		</Row>
	</div>
	
</template>

<script>
import "./style.less"
import "swiper/dist/css/swiper.css"
import "swiper/dist/js/swiper"
export default {
    props:{
		title:{
			type:String,
			default:"科技中心项目大屏"
		},
		mainInfo:{
			type:String,
			default:"各项目组完成进度良好，请继续保持"
		},
		getDate:{
			type:String,
			default:function(){
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			}
		}
	}
}
</script>

