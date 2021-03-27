<template>
    <div class="container-fluid container-bg office-efficiency-index">
	    <div class="row  office-header">
	        <div class="col-sm-12 col-md-12 pd  title-info">科技中心大屏</div>
	        <div class="col-sm-5  col-md-5 pd analysis-info">各组项目进度良好，请继续保持</div>
	        <div class="col-sm-7  col-md-7 pd analysis-filter">
              <table style="width:100%;height:48px;">
	              <tr>
	                  <td style="width:70%;text-align:right;">
	                  </td>
	                  <td style="width:15%;text-align:right;padding-left:10px;color:#fff;font-size:14px;font-weight:bold;" id="td-data-date">
	                     <!-- <input type="text" id="data-date" name="dataDate" class="form-control" style="width:100px;"/> -->
						 2021年3月8
	                  </td>
	                  <td style="width:15%;">
	                     <div class="cust-type-default right" type="2">政企</div>
                         <div class="cust-type-default left active" type="1">公众</div>
	                  </td>
	              </tr>
              </table>
	        </div>
	        <!--地域渠道条件选择-->
	        <div id="select-group-channel-tablebar" class="select-group-channel-tablebar">
				 <div class="row">
			       <div class="col-sm-2  col-md-2 pd" style="color:#fff;height:40px;line-height:35px;margin-top:15px;text-align:right;width:110px;font-size:15px;">地域选择：</div>
			       <div class="col-sm-4  col-md-4 pd" style="height:40px;margin-top:15px;">
			           <input type="text" id="selectCity" name="cityCode" class="form-control" style="width:150px;"/>
			       </div>
			       <div class="col-sm-2  col-md-2 pd" style="color:#fff;height:40px;line-height:35px;margin-top:15px;text-align:right;width:110px;font-size:15px;">区域选择：</div>
			       <div class="col-sm-4  col-md-4 pd" style="height:40px;margin-top:15px;">
			           <input type="text" id="selectCounty" name="countyCode" class="form-control" style="width:150px;"/>
			       </div>
				 </div>
				 <div class="row">
				      <div class="col-sm-2  col-md-2 pd" style="color:#fff;height:40px;line-height:35px;margin-top:15px;text-align:right;width:110px;font-size:15px;">渠道名称：</div>
				      <div class="col-sm-6  col-md-6 pd" style="height:40px;margin-top:15px;">
				         <input type="text" id="channel_name" name="channelName" class="form-control" style="width:330px;" placeHolder=""/>
				      </div>
				      <div class="col-sm-4  col-md-4 pd" style="height:40px;margin-top:15px;text-align:center;">
				          <button type="button" class="btn btn-info btn-sm" style="height:35px;width:70px;margin-left:10px;background:#181C41;" onclick="doQueryChannelName();">查询</button>
				          <button type="button" class="btn btn-info btn-sm" style="height:35px;width:70px;background:#282C55;" onclick="doRestChannelName();">重置</button>	
				     </div>
				 </div>
		    </div>
	    </div>
	    <div class="row  office-header-content">
	         <div class="col-sm-3 col-md-3 pd">
	            <div  class="col-info">
	               <div class="title">门店基本信息</div>
	               <div class="content base-info" id="base-info">
	                 <table>
	                    <tr>
                           <td colspan="4"><div class="channel-name">XXXX</div></td>
                        </tr>
	                    <tr>
	                       <td rowspan="2"><div id="integral_echart" class="integral-echart"></div></td>
	                       <td><div class="ding-dan-bg"></div></td>
	                       <td><div class="ke-liu-bg"></div></td>
	                       <td><div class="pai-dui-ji-bg"></div></td>
	                    </tr>
	                    <tr>
					       <td><div class="liang-shu-zhi" type="dingdanVal">--</div></td>
					       <td><div class="liang-shu-zhi" type="custNumVal">--</div></td>
					       <td><div class="liang-shu-zhi" type="lineUpVal">--</div></td>
						</tr>
						<tr class="td-shu-zhi">
						   <td class="popval">全省前5%</td>
						   <td>订单量</td>
						   <td>当日客流</td>
						   <td>排队时长</td>
						</tr>
						<tr>
						    <td><div class="channel-star-level">门店星级</div></td>
						    <td colspan="3"  class="chanenl-star">
						       <img src="../../assets/img/iframe/star1.png" style="width:21px;height:20px;"/>
						       <img src="../../assets/img/iframe/star1.png" style="width:21px;height:20px;"/>
						       <img src="../../assets/img/iframe/star1.png" style="width:21px;height:20px;"/>
						       <img src="../../assets/img/iframe/star1.png" style="width:21px;height:20px;"/>
						       <img src="../../assets/img/iframe/star1.png" style="width:21px;height:20px;"/>
						       <div class="channel-total-score">--分</div>
						    </td>
						</tr>
						<tr>
					      <td class="label-name">台席健康度：</td>
					      <td class="label-value  device-score">
					         <img src="../../assets/img/iframe/star1.png"/>
					         <div class="score-val">1分</div>
					      </td>
					      <td class="label-name">受理速度：</td>
					      <td class="label-value avgtime">
					        <img src="../../assets/img/iframe/star1.png"/>
					        <div class="score-val">1分</div>
					      </td>
					    </tr>
					    <tr>
					       <td class="label-name">违规行为：</td>
					       <td class="label-value weigui">
					         <img src="../../assets/img/iframe/star1.png"/>
					         <div class="score-val">1分</div>
					       </td>
					       <td class="label-name">营销评级：</td>
					       <td class="label-value yingxiao">
					         <img src="../../assets/img/iframe/star1.png"/>
					         <div class="score-val">1分</div>
					       </td>
					   </tr>
					   <tr>
					      <td class="label-name">业务量：</td>
					      <td class="label-value yewuliang">
					        <img src="../../assets/img/iframe/star1.png"/>
					        <div class="score-val">1分</div>
					      </td>
					      <td></td>
					      <td></td>
					   </tr>
	                 </table>
	               </div>
	            </div>
	         </div>
	         <div class="col-sm-6 col-md-6 pd">
	            <div  class="col-info">
	               <div class="title">门店历史受理详情 </div>
	               <div class="content" id="channel_handle_detail"></div>
	            </div>
	         </div>
	         <div class="col-sm-3 col-md-3 pd">
	            <div  class="col-info">
	               <div class="title">营业员受理详情</div>
	               <div class="content staff-info" id="staff-info">
	               </div>
	            </div>
	         </div>
	         <div class="col-sm-3 col-md-3 pd device-info-col">
	            <div  class="col-info">
	               <div class="title">门店台席健康度</div>
	               <div class="title-icon">
	                  <div class="device-alarm"><svg class="icon" aria-hidden="true"><use xlink:href="#icongaojing2"></use></svg><span type="grayGrade">0</span></div>
	                  <div class="device-alarm"><svg class="icon" aria-hidden="true"><use xlink:href="#icongaojing1"></use></svg><span type="redGrade">0</span></div>
	                  <div class="device-alarm"><svg class="icon" aria-hidden="true"><use xlink:href="#icongaojing"></use></svg><span type="greenGrade">0</span></div>
	               </div>
	               <div class="content deviceInfo" id="device-info">
	               </div>
	            </div>
	         </div>
	         <div class="col-sm-5 col-md-5 pd time-step-col">
	            <div  class="col-info">
	               <div class="title">耗时步骤分析</div>
	               <div class="content" id="time-step-detial"></div>
	            </div>
	         </div>
	         <div class="col-sm-4 col-md-4 pd business-type-time-col">
	            <div  class="col-info">
	               <div class="title">业务类型耗时分析</div>
	               <div class="content" id="business-type-time-detial"></div>
	            </div>
	         </div>
	    </div>
    </div>
</template>

<script>
import "../../assets/less/office_efficiency_index.css"
import "../../assets/less/style.css"
import "swiper/dist/css/swiper.css"
import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap"
import "swiper/dist/js/swiper"
export default {
    
}
</script>

