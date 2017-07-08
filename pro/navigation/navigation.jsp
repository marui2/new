<%@ page language="java" import="java.util.*,cn.iie.icm.pojo.yzlj.Subjectyzlj" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<% String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="utf-8"/>
<title>预制拦截</title>
<title>主题监测</title>
	<!--单独CSS-->
	<link type="text/css" rel="stylesheet" href="<%=path%>/wxb/yzlj/navigation/css/all.css" />
	<!--公共样式+公共JS-->
	<link type="text/css" rel="stylesheet" href="<%=path%>/resources/css/common.css">
	<!-- 详情页样式 -->
	<link href="<%=path%>/wxb/yzlj/monitor/infodetail/index.css" rel="stylesheet" type="text/css">

	<!-- jQuery -->
	<script type="text/javascript" charset="utf8" src="<%=path%>/resources/js/third/jquery-1.9.1.min.js"></script>
	 
	<!-- DataTables组件引入 -->
	<link rel="stylesheet" type="text/css" href="<%=path%>/resources/js/third/datatable/css/jquery.dataTables.css">
	<script type="text/javascript" charset="utf8" src="<%=path%>/resources/js/third/datatable/js/jquery.dataTables.js"></script>
	<style>

    .addselect {
        border-radius: 2px;
        display: inline-block;
        background-color: #ccc;
        height: 12px;
        width: 16px;
        text-align: center;
        color: #fff;
        font-size: 9px;
        font-family: Arial;
        position: relative;
        margin-left: 4px;
        cursor: pointer;
        overflow: hidden;
        vertical-align: top;
        top: 1px;
    }

    .addselect select {
        width: 44px;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
    }

  table.dataTable thead th {
        padding: 0 8px;
    }
    
         .odd{
    	background-color:rgb(235,242,250) !important;
    }
    .even{
    	background-color:rgb(235,235,235) !important;
    }
    
</style>
        
<!-- KandyTabs组件引入 -->
<link rel="stylesheet" href="<%=path%>/resources/js/third/kandytabs/kandytabs.css" type="text/css">
<script type="text/javascript" src="<%=path%>/resources/js/third/kandytabs/kandytabs.pack.js"></script>

<!-- layer组件引入 -->
<link rel="stylesheet" href="<%=path%>/resources/js/third/layer/skin/layer.css" type="text/css">
<script type="text/javascript" src="<%=path%>/resources/js/third/layer/layer.js"></script>

<!-- jeDate组件引入 -->
<link rel="stylesheet" href="<%=path%>/resources/js/third/jedate/skin/jedate.css" type="text/css">
<script type="text/javascript" src="<%=path%>/resources/js/third/jedate/jedate.js"></script>
<style type="text/css">
body {
	font-size:14px;
	font-family:微软雅黑;
}

</style>
<script type="text/javascript" charset="utf8">
	//----------初始化状态设置start-----------------
	//tab标签页激活页码
	//var state=${ctype};
	//var state =1;
	//console.log(state);
	//“审核确认”条件对象：捕捉时间，标记时间，标记状态（固定：有害），处理状态（固定：未处置），来源地域,信息来源
	var shqr_condition={	  
			  searchType:"-1",
			  sourceArea:"-1",
			  sourceType:"-1",
			  startDate:"",
			  endDate:"",
			  markStartDate:"",
			  markEndDate:"",
			  exportType:"80"
	};
	
	//信息来源，“其他”的类型数组
	var sourceTypeArr=[3,4,5,6];
	//左边时间过滤条件
	var subjectIds=[];
	//数据加载遮罩层索引
	var loadindex;
	//日期控件弹出层索引
	var dateindex;
	//datatables对象
	var table;
	//----------初始化状态设置end-----------------	
	//左边时间过滤条件
 	//var subjectId="${subjectId}";
 	
	//if(subjectId == null || subjectId == ''){
	//	window.top.location.href = "../home/homepage.do";
	//}
    /*$(function() {
    	$('table').eq(0).attr('id','table'+state);
    	setRightDivWidth(200);
    	$('#a-con').click();
    	$('#table_data').on( 'draw.dt', function () {
    		var n =$('li[class="deh8bt"]').length;
    		if(n != 0){
    			$('#main-content').show();
    		}else{
    			$('#main-content').hide();
    		}
    		
    	} );
    	$('#info_content').load(function(){
    		$('#ifram-tip').text("页面加载完成！");
    	});
		  
 	});*/
	/*window.addEventListener('resize', function () {
		setRightDivWidth(200);
	});
	function setRightDivWidth(leftWidth){
	  	  var w = $(window).width()*0.9-50;
	  	  $('#zhutiright').width(w);
	  	  $('#zhutiright').css("height","");
	}*/
	function hideCondition(obj){
		var image1 = "${pageContext.request.contextPath}/wxb/yzlj/monitor/infocheck/images/arrow-b.png";
		var image2 = "${pageContext.request.contextPath}/wxb/yzlj/monitor/infocheck/images/arrow-t.png";
		var text = $(obj).text();
		if(text == '隐藏筛选条件'){
			$(obj).find("span").text("展开筛选条件");
			$(obj).find("img").attr("src",image1);
			
		}else{
			$(obj).find("span").text("隐藏筛选条件");
			$(obj).find("img").attr("src",image2);
		}
		$(".hide_t").toggle();
	}
</script>

</head>
<body>	
	
<div id="zhutijianceye" style="background-color: #eeeeee;height:100%">
	<div id="dbody4" class="dbody" style="width:100%;margin: 0 auto;height :700px;">
	<script>	
	var dbody =  document.getElementById("dbody4");
	console.log("dbody4: "+dbody);
	dbody.style.height=window.screen.height-75+"px";
	console.log("dbody4 height: "+window.screen.height);
	</script>
	<!-- 开始20170705 -->
	<script type="text/javascript" charset="utf8"></script>
	<link type="text/css" rel="stylesheet" href="<%=path%>/wxb/yzlj/navigation/css/bootstrap.min.css" />
	<link type="text/css" rel="stylesheet" href="<%=path%>/wxb/yzlj/navigation/css/bootstrap-theme.min.css" />
	<link type="text/css" rel="stylesheet" href="<%=path%>/wxb/yzlj/navigation/css/first.css" />
	<script type="text/javascript" charset="utf8" src="<%=path%>/wxb/yzlj/navigation/js/first.js"></script>
	<script type="text/javascript" charset="utf8" src="<%=path%>/wxb/yzlj/navigation/js/bootstrap.min.js"></script>
	<div class="new0705">
		<!-- Nav tabs -->
		 <ul class="nav nav-tabs" role="tablist">
		    <li  role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">主流网站</a></li>
		    <li id="abc" role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">港媒</a></li>
		    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">官方网站</a></li>
		    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">敌对网站</a></li>
		    <li role="presentation"><a href="#qita" aria-controls="qita" role="tab" data-toggle="tab">其它</a></li>
		  </ul>
		  <!-- Tab panes -->
		  <div class="tab-content">
		    <div role="tabpanel" class="tab-pane active" id="home"></div>
		    <div role="tabpanel" class="tab-pane" id="profile"></div>
		    <div role="tabpanel" class="tab-pane" id="messages"></div>
		    <div role="tabpanel" class="tab-pane" id="settings"></div>
		    <div role="tabpanel" class="tab-pane" id="qita"></div>
		  </div>
		  
	</div>

	<!-- 结束20170705 -->
		<div class="zhuti" style="width:1050;margin:0 auto">	
			<!-- ===============标签部分================= -->
			<!-- <div class="box">
				<div class="box_one" style="height:45%;border-bottom:1px solid #999;" >
					<div class="box_left_menu"><b>国家集</b></div>
					<div class="box_right_url" id="box_id_one"></div>
				</div>
				<div class="box_one"  style="margin-top:10px;">
					<div class="box_left_menu"><b>民间集</b></div>
					<div class="box_right_url" id="box_id_two"></div>
				</div>
			</div> -->
			
			
			<!-- ===============分页部分================= -->
			<!-- <div id="zhutiright" class="zhutiright" style="margin-left: auto;margin-right: auto;" >
			<div class="ztirt">		
				<div style="width:100%;height:30px;"></div>		
				<div class="ztirt5" >
					表格开始
					<table  id="table_data" style="border-bottom: 0px solid #dfdfdf;">
						1行
						<thead style="display:none;">
							<tr >
								<th class="th01">
									<input id="checkAll" type="checkbox" value="">
								</th>
								<th class="th02">网站名字</th>
							    <th class="th03">是否在封</th>
								<th class="th04">类型</th>
								<th class="th05">网址</th>	
							</tr>
						</thead>
						<tbody style="display:none;">
						</tbody>
					</table>
				</div>
			</div>
							
			</div> -->
				
		</div>
		
		<!-- ==============最后开始============= -->
		<div class="footer">
			<ul>
				<li class="tel"><a>帮助中心 ｜ 联系我们</a></li>
				<li class="infor"><a>中共中央网络安全和信息化领导小组办公室 中华人民共和国互联网信息办公室版权所有
						<br />承建单位：中国科学院信息工程研究所4月
						<br/>
						<br/>
						<br/>
						<br/>
				</a></li>
			</ul>
		</div>
	</div>
</div>	

<!-- 日期控件弹窗 -->
<div id="datewnd" style="padding:5px;display:none;">
	<div>
		<input id="startdate" type="text" value="" readonly>
		<input id="enddate" type="text" value="" readonly>
	</div>
	<div style="margin-top:10px;">
		<input id="datesubmit" value="确定" type="button" style="margin-left:5px;background-color:#5359F9;color:#fff;border:0;">
		<input id="datecancel" value="取消" type="button" style="margin-left:5px;background-color:#5359F9;color:#fff;border:0;">
		<input id="dateclear" value="清空" type="button" style="margin-left:5px;background-color:#5359F9;color:#fff;border:0;">
	</div>			
</div>  
 


</body>
	<script type="text/javascript" charset="utf8" src="<%=path%>/wxb/yzlj/navigation/js/jquery.ba-resize.js"></script>
	<script type="text/javascript" charset="utf8" src="<%=path%>/wxb/yzlj/navigation/js/website.js"></script>
</html>
