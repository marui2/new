Infocheck = {};
function sleep(d){
	  for(var t = Date.now();Date.now() - t <= d;);
	}


//页面加载完毕执行的代码
$(document).ready( function () {	
	createDataTable();
	
//-------------------------------初始化KandyTabs组件--------------------------------------------------
    $("dl").KandyTabs({
    	trigger:"click"
    });
				  	  	  
//-------------------------------------------tab区域事件设置start-----------------------------------------	  
	  
	  
	  $("dt").on("click","a",function(e){
		 if(this.id=="scbz"){
			 state=1;
		 }
		 if(this.id=="shqr"){
			 state=2;
		 }
		 if(this.id=="czhy"){
			 state=3;
		 }
		 table.ajax.reload();
		 $('#checkAll').prop('checked',false);
	  }); 
	  //“有害信息”内点击事件
	  $("#table2").on("click","td a",function(e){
		  var ischange=false;
		  var tr_index=$(this).parents("tr").index();
		  var td_index=$(this).parents("td").index();
		 
		  if(tr_index<3){
			  $(this).addClass("selected");
			  $($(this).siblings(".selected")).removeClass("selected");
			  if(tr_index==0){		  
				  if(td_index==1){//捕捉时间，注:点击“自定义”按钮不触发
					  shqr_condition.searchType=$(this).attr("value");
					  if($(this).attr("value")!="0"){
						  ischange=true;  
					  }
					
				  }
				  if(td_index==3){//标记时间
					  ischange=true;
				  }			  
			  }
			  if(tr_index==0 && td_index==3){//导出标志
				  shqr_condition.exportType=$(this).attr("value");
				  
				  ischange=true;
			  }
			  
			  if(tr_index==0 && td_index==3){//来源地域
				  shqr_condition.sourceArea=$(this).attr("value");
				  ischange=true;
			  }
			  if(tr_index==2 && td_index==3){//信息来源
				  shqr_condition.sourceType=$(this).attr("value");
				  ischange=true;
			  }
			  if(ischange){
				  table.ajax.reload();
			  }
		  }
		  if(tr_index==1 && td_index==1){//批量操作
			  switch(parseInt($(this).attr('value'))){
				  case 1:
					  exportinfo(false);
					  break;
				  case 2:
					  exportinfo(true);
					  //延时刷新，当数据库的数据改变后刷新才有用,如何知道下载完成呢？单线程应该没有问题，请求有先后，后发的之前的后台方法肯定执行完了
					  setTimeout(function(){table.ajax.reload();$('#checkAll').prop('checked',false);}, 500);
					   break;
				  case 3:					//导出表格
					 // layer.msg('导出表格2');
					 // exportExcel(false,false);
			  }
		  }
		
	  });

	  //日期控件	 
	  $("table").on("click","a[name='zdydate']",function(e){
		  var X = $(this).offset().top+$(this).outerHeight(); 
		  var Y = $(this).offset().left; 
		  //设置当前“自定义”按钮的索引给日期控件弹出框
		  $("#datewnd").attr("index",$(this).attr("index"));
		  //使用layer组件
		  dateindex=layer.open({
		        type: 1,
		        shade: false,
		        title: false, //不显示标题
		        closeBtn: 0,
		        offset: [X, Y],
		        area: ['400px', '100px'],
		        shadeClose: true, //点击遮罩关闭
		        content: $('#datewnd'),
		    });
		  });
	//点击显示（YYYY年MM月DD日 hh:mm:ss）格式
	  jeDate({
	  	dateCell:"#startdate",  //目标元素。由于jedate.js封装了一个轻量级的选择器，因此dateCell还允许你传入class、tag这种方式 '#id .class'
	  	format:"YYYY-MM-DD hh:mm:ss",
	  	minDate:"2014-09-19 00:00:00",
	  	isinitVal:false, //是否初始化时间
	    festival: true,
	    isTime:true,                          //是否开启时间选择
	    ishmsLimit:false,                     //时分秒限制
	    ishmsVal:true, 
	  	zIndex:999999999,
	  });

	  //时分秒（hh:mm:ss）
	  jeDate({
	  	dateCell:"#enddate",  
	  	format:"YYYY-MM-DD hh:mm:ss",
	  	minDate:"2014-09-19 00:00:00",
	  	isinitVal:false, //是否初始化时间
	    festival: true,
	    isTime:true,                          //是否开启时间选择
	    ishmsLimit:false,                     //时分秒限制
	    ishmsVal:true, 
	  	zIndex:999999999,
	  });
	  $("#datesubmit").on("click",function(){
		  var index=$("#datewnd").attr("index");
		  var startdate=$("#startdate")[0].value;
		  var endDate=$("#enddate")[0].value;
		  if(index=="11"){
			  scbz_condition.startDate=startdate;
			  scbz_condition.endDate=endDate;
		  }
		  if(index=="21"){
			  shqr_condition.startDate=startdate;
			  shqr_condition.endDate=endDate;
		  }
		  if(index=="22"){
			  shqr_condition.markStartDate=startdate;
			  shqr_condition.markEndDate=endDate;
		  }
		  if(index=="31"){
			  czhy_condition.startDate=startdate;
			  czhy_condition.endDate=endDate;
		  }
		  if(index=="32"){
			  czhy_condition.exportStartDate=startdate;
			  czhy_condition.exportEndDate=endDate;
		  }
		  layer.close(dateindex);
		  table.ajax.reload();
	  });
	  $("#datecancel").on("click",function(){
		  layer.close(dateindex);
	  });
	  $("#dateclear").on("click",function(){
		  var index=$("#datewnd").attr("index");
		  $("#startdate").val("");
		  $("#enddate").val("");
		  if(index=="11"){
			  scbz_condition.startDate="";
			  scbz_condition.endDate="";
		  }
		  if(index=="21"){
			  shqr_condition.startDate="";
			  shqr_condition.endDate="";
		  }
		  if(index=="22"){
			  shqr_condition.markStartDate="";
			  shqr_condition.markEndDate="";
		  }
		  if(index=="31"){
			  czhy_condition.startDate="";
			  czhy_condition.endDate="";
		  }
		  if(index=="32"){
			  czhy_condition.exportStartDate="";
			  czhy_condition.exportEndDate="";
		  }
	  });
	  
	  
	  
//----------------------------------------左边列表事件start-----------------------------------------------------
		$('#zhutilist').on('click', 'input[name="eventscheckList"]', function () {
		    var $tmp = $('[name=eventscheckList]:checkbox');
		    $('#eventsCheckAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);
		
		});

		 
	    //checkbox全选
	    $("#eventsCheckAll").on("click", function () {
	        if ($(this).prop("checked") === true) {
	            $("input[name='eventscheckList']").prop("checked", $(this).prop("checked"));
	        } else {
	            $("input[name='eventscheckList']").prop("checked", false);
	        }
	    });
	    $("#eventqueren").on("click", function () {
	    	var checkboxs=$('#zhutilist input[name="eventscheckList"]').filter(':checked');
	    	$("#eventTitle").text("");
	    	subjectIds = [];
	    	var eventTitle='监测事件：';
	    	for(var i=0;i<checkboxs.length;i++){
	    		subjectIds[i]=checkboxs[i].value;
	    		eventTitle+=$(checkboxs[i]).next('a')[0].innerHTML+'，';
	    	}
	    	eventTitle=eventTitle.substring(0,eventTitle.length-1);
	    	$("#eventTitle").text(eventTitle);
	    	table.ajax.reload();

	    });
//----------------------------------------导出表格事件-----------------------------------------------------
	    $("#exportSelected").on("click",function(){
	    	exportExcel(false,false);
	    });
	    $("#exportAll").on("click",function(){
	    	var param = getQueryCondition(null);
        	$.ajax({
        		type : 'POST',
        		async: true,
        		contentType : 'application/json;charset=UTF-8',
        		url: "exportAll.do",
        		data:JSON.stringify(param),
        		success:function(d){
        			if(d.success==true){
    					var newWin;
    					var name=d.name;
    					console.log(name);
    						newWin=window.open("/iie-icm/resources/doc/"+name,'newWin');
    						sleep(1500);
    						newWin.close();
    						}else if(d.success==false){
    							var st =window.parent.document.body.scrollTop+200;
    							layer.msg('没有可导出的数据',{offset:[st+"px"]});
    						}
        		}
        	});
	    });
	  	    
});

//获取查询条件
function getQueryCondition(data) {
	var param = {};
	//查询条件
	param.condition = {};
	/*switch (state) {
	case 1:
		param.condition.searchType=scbz_condition.searchType;
		if(scbz_condition.exportType!="-1"){
			param.condition.exportType=scbz_condition.exportType;		
		}
		if(scbz_condition.sourceArea!="-1"){
			param.condition.sourceArea=scbz_condition.sourceArea;		
		}
		if(scbz_condition.sourceType!="-1"&&scbz_condition.sourceType!="-2"){
			param.condition.sourceType=scbz_condition.sourceType;		
		}
		if(scbz_condition.sourceType=="-2"){
			param.condition.sourceTypeArr=sourceTypeArr;
		}
		param.condition.markType="0";  
		param.condition.startDate=scbz_condition.startDate;
		param.condition.endDate=scbz_condition.endDate;
		break;
	case 2:
		param.condition.searchType=shqr_condition.searchType;
		param.condition.exportType=shqr_condition.exportType;
		
		if(shqr_condition.sourceArea!="-1"){
			param.condition.sourceArea=shqr_condition.sourceArea;		
		}
		if(shqr_condition.sourceType!="-1"&&shqr_condition.sourceType!="-2"){
			param.condition.sourceType=shqr_condition.sourceType;		
		}
		if(shqr_condition.sourceType=="-2"){
			param.condition.sourceTypeArr=sourceTypeArr;
		}
		param.condition.markType="88";//查找已标记过的信息
		param.condition.startDate=shqr_condition.startDate;
		param.condition.endDate=shqr_condition.endDate;
		if(shqr_condition.markStartDate!=""){
			param.condition.markStartDate=shqr_condition.markStartDate;
		}
		if(shqr_condition.markEndDate!=""){
			param.condition.markEndDate=shqr_condition.markEndDate;
		}
		break;
	case 3:
		param.condition.searchType=czhy_condition.searchType;
		param.condition.exportType="1";
		if(czhy_condition.sourceArea!="-1"){
			param.condition.sourceArea=czhy_condition.sourceArea;		
		}
		if(czhy_condition.sourceType!="-1"&&czhy_condition.sourceType!="-2"){
			param.condition.sourceType=czhy_condition.sourceType;		
		}
		if(czhy_condition.sourceType=="-2"){
			param.condition.sourceTypeArr=sourceTypeArr;
		}
		param.condition.markType="1"; 
		param.condition.startDate=czhy_condition.startDate;
		param.condition.endDate=czhy_condition.endDate;
		if(czhy_condition.exportStartDate!=""){
			param.condition.exportStartDate=czhy_condition.exportStartDate;
		}
		if(czhy_condition.exportEndDate!=""){
			param.condition.exportEndDate=czhy_condition.exportEndDate;
		}
		break;
	}*/
	/*if(subjectIds.length == 0){
		createSubjectIds();
	} 
	if(subjectIds.length==1){
		param.condition.subjectId=subjectIds[0];
	} else {
		param.condition.subjectIds=subjectIds;
	}*/
	
	//组装分页参数
	if(data!=null){
	param.startIndex = data.start;
	param.pageSize = data.length;
	}
	return param;
}

function exportinfo(isdeal){
	  var checks=$('#table_data tr input[name="checkList"]').filter(':checked');
	  var count=checks.length;
	  
	  if(count==0){
		  var st =window.parent.document.body.scrollTop+200;
		  layer.msg('没有选中的数据，请选中后再执行导出操作',{offset:[st+"px"]});
		  return;
	  }
	  var infos=[];
	  for(var i=0;i<count;i++){
		  infos[i]=checks[i].value;
	  }
	  
	  $.ajax({
			type : 'POST',
			async: true,
			url: "exportinfo.do",
			data:"ids="+JSON.stringify(infos)+"&isdeal="+isdeal,
			success:function(d){
				if(d.success==true){
					var newWin;
					var names=d.names;
					//layer.msg('操作成功');
					for(var i=0;i<count;i++){
						//window.open ("/wxb_keyword/resources/doc/"+i+".doc","_blank","",false);
						newWin=window.open("/iie-icm/resources/doc/"+names[i]+".doc",'newWin');
						sleep(1500);
						newWin.close();
					}
				}
				
			}
		});	
		}
function exportExcel(isdeal,isall){//导出表格
	  var checks=$('#table_data tr input[name="checkList"]').filter(':checked');
	  var count=checks.length;
	  if(count==0 && !isall){
		  layer.msg('没有选中的数据，请选中后再执行导出操作',{offset:[window.parent.document.body.scrollTop+200+"px"]});
		  return;
	  }
	  var infos=[];
	  for(var i=0;i<count;i++){
		  infos[i]=checks[i].value;
	  }
	  //使用jquery创建表单并提交实现文件下载
	  var form = $("<form>");
	  form.attr("style","display:none");
	  form.attr("method","post");
	  //form.attr("enctype","multipart/form-data");
	  form.attr("action","exportExcel.do");
	  var input1 = $("<input>");
	  input1.attr("type","hidden");
	  input1.attr("name","ids");
	  input1.attr("value",JSON.stringify(infos));
	  var input2 = $("<input>");
	  input2.attr("type","hidden");
	  input2.attr("name","isdeal");
	  input2.attr("value",isdeal);
	  var input3 = $("<input>");
	  input3.attr("type","hidden");
	  input3.attr("name","isall");
	  input3.attr("value",isall);
	  var input4 = $("<input>");
	  input4.attr("type","hidden");
	  input4.attr("name","param");
	  input4.attr("value", JSON.stringify(getQueryCondition({start:0,length:0})));
	  $("body").append(form);
	  form.append(input1);
	  form.append(input2);
	  form.append(input3);
	  form.append(input4);
	  form.submit();
	  form.remove();
}
function export_s(isdeal,id){
	$('#'+id).addClass("cddsour");
	  var infos=[];
	  var name1=$('#'+id).attr("name");
	  infos[0]=$('#'+id).attr("value");
	//使用jquery创建表单并提交实现文件下载
	  var form = $("<form>");
	  form.attr("style","display:none");
	  form.attr("method","post");
	  form.attr("enctype","multipart/form-data");
	  form.attr("action","exportinfo_s.do");
	  var input1 = $("<" +
	  		"input>");
	  input1.attr("type","hidden");
	  input1.attr("name","ids");
	  input1.attr("value",JSON.stringify(infos));
	  var input2 = $("<input>");
	  input2.attr("type","hidden");
	  input2.attr("name","isdeal");
	  input2.attr("value",isdeal);
	  var input3 = $("<input>");
	  input3.attr("type","hidden");
	  input3.attr("name","name1");
	  input3.attr("value",name1);
	  $("body").append(form);
	  form.append(input1);
	  form.append(input2);
	  form.submit();
	  form.remove();
}
function highlightKeyword(str,kw){
	var arr=str.split(kw);
	var htmlstr='';
	for(var i=0;i<arr.length-1;i++){
		htmlstr+=arr[i]+"<span style='color:#c60a00;font-weight:bold;'>"+kw+"</span>";
	}
	return htmlstr+=arr[arr.length-1];
}


$('#table_data').resize(function(e){
	var newHeight = 250 + $(this).height();
	$('#zhutiright').height(newHeight);
	var minHeight = $(window.top).height() - 60 - $('.footer').height();
	if($('#zhutiright').height() < minHeight){
		$('#zhutiright').height(minHeight);
	}
	var height = $('#zhutiright').height() + $('.footer').height() + 60;
	$(document.body).height(height);
	//$('#webContent', window.parent.document).css("height",height);
	//$("#xiangqingye").height(650);
});
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function showMsg(msg){
	var st =window.parent.document.body.scrollTop+200;
	layer.alert(msg,{offset:[st+"px"]});
}
function AddWebsite(){
	layer.open({
		  type:1,
		  title :'添加网站',
		  shade: 0,
		 area: ['500px', '530px'], //宽高
		 closeBtn: 1,
		  shadeClose : true,
		 offset: ['100px','500px'],
		 content:$('#AddWebsiteLayer'),
		  btn:'确定',
	     yes: function(index, layero){
	    	 layer.close(index);
	     }
		});
}
/**
 * 保存网站信息
 */
function doSaveWebsite(){
	var id = $("#id").val();
	var name = $("#name").val();
	var url = $("#url").val();
	var domain = $("#domain").val();
	var image_url = $("#pictureUrl").val();
	var priority = $("input[name='radio1']:checked").val();
	var address = $("#address").val();
	var ip = $("#ip").val();
	var censored = $("input[name='radio2']:checked").val();
	if(id==''||name==''||url==''||domain==''||image_url==''||address==''||ip==''){
		showMsg("请输入非空值");
		return false;
	}
	var data={
		id:id,
		name:name,
		url:url,
	    domain:domain,
	    image_url:image_url,
	    priority:priority,
	    address:address,
	    ip:ip,
	    censored:censored,
	};
	$.ajax({
		type : 'POST',
		async: false,
		contentType : 'application/json;charset=UTF-8',
		url: "saveWebsite.do",
		dataType:"json",
		data:JSON.stringify(data),
		success:function(q){
			if('success' ==q.result ){
				showMsg("保存成功!");
			} else {
				if(q.result!=null){
					showMsg(q.result);
				}else{
					showMsg("保存失败");
				}
			}
		},
		error:function(req,status,error){
			showMsg('向服务器请求数据失败，请联系管理员!');
		}
	});
}
function delWebsite(){
	  var checks=$('#table_data tr input[name="checkList"]').filter(':checked');
	  var count=checks.length;
	  if(count==0){
		  layer.msg('没有选中的数据',{offset:[window.parent.document.body.scrollTop+200+"px"]});
		  return;
	  }
	  var websites=[];
	  for(var i=0;i<count;i++){
		  websites[i]=checks[i].value;
	  }
	  $.ajax({
			type : 'POST',
			async: true,
			url: "delWebsite.do",
			//dataType:"json",
			data:"websites="+JSON.stringify(websites),
			success:function(q){
				if('success' ==q.result ){
					showMsg("删除成功!");
				} else {
					if(q.result!=null){
						showMsg(q.result);
					}else{
						showMsg("删除失败!");
					}
				}
			},
			error:function(req,status,error){
				showMsg('向服务器请求数据失败，请联系管理员!');
			}
		});
	 
}
function createDataTable(){
	//-------------------------------初始化DataTable组件--------------------------------------------------
	table = $('#table_data').DataTable({
		"autoWidth": false, 
		"searching": false,
		"dom": 'irtlp',
		"lengthMenu": [50,10,25,75,100],
		"columns": [
		            { 
//		            	"width": "4%",
		            	"orderable": false,
		            	"className": "deh5",
		            	"data":null,
		   	         	"render" : function (data, type, row, meta) {
		   	        	 return "<input type='checkbox' name='checkList'>";
		   	         	},
            		},
		            { 
//	            		"width": "70%",
	            		"orderable": false,
	            		"className": "ddsour",
	            		"data":null,
	            		"render" : function (data, type, row, meta) {
	            	    	var html = '<span value="'+data.id+'">'+data.name+'</span>';
	            	    	return html;
			   	         },
	            	},
	            	 { 
//	            		"width": "6%",
	            		"orderable": false,
	            		"className": "ddsour",
	            		"data":null,
	            		"render" : function (data, type, row, meta) {
	            			var isblock=data.censored;
	            			var tag='是';
	            			if(isblock=='0'){
	            				tag='否';
	            			}else{
	            				tag='是';
	            			}
	            	    	var html = '<span>'+tag+'</span>';
	            	    	return html;
			   	         },
	            	},
	            	 { 
//	            		"width": "6%",
	            		"orderable": false,
	            		"className": "ddsour",
	            		"data":null,
	            		"render" : function (data, type, row, meta) {
	            			var address=data.address;
	            			if((address!=null)&&(address.length>6)){
	            				address=address.substring(0,6);
	            			}
	            	    	var html = '<span>'+address+'</span>';
	            	    	return html;
			   	         },
	            	},
	
		   	         { 
		   	         	//"width": "6%",
		   	         	 "orderable": false,
		   	         	"className": "ddsour", 
		   	         	"data":null,
		   	         	"render" : function (data, type, row, meta) {
		   	         	var url=data.url;
		   	         	if(url.length>30){
		   	         		url=url.substring(0,26);
		   	         	}
		   	         	return '<span title='+data.url+'><a target="_blank" href='+data.url+'>'+url+'</a></span>';
		   	         	},
		   	         		 },
		          
		          ],
          "order": [
                    [0, null]
                ],//第一列排序图标改为默认		
		"oLanguage": {//国际语言转化
	        "oAria": {
	            "sSortAscending": " - click/return to sort ascending",
	            "sSortDescending": " - click/return to sort descending"
	        },
	        "sLengthMenu": "显示 _MENU_ 记录",
	        "sZeroRecords": "对不起，查询不到任何相关数据",
	        "sEmptyTable": "未有相关数据",
	        "sLoadingRecords": "正在加载数据-请等待...",
	        "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
	        "sInfoEmpty": "当前显示0到0条，共0条记录",
	        "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
	        "sSearch": "模糊查询：",
	        "sUrl": "",
	        //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
	        "oPaginate": {
	            "sFirst": "首页",
	            "sPrevious": " 上一页 ",
	            "sNext": " 下一页 ",
	            "sLast": " 尾页 "
	        }
	    },
        "serverSide": true,
        "ajax": function(data, callback, settings){
        	var param = getQueryCondition(data);
        	loadindex = layer.load(1, {shade: [0.1,'#fff'],offset:[window.parent.document.body.scrollTop+200+"px"]});
        	$.ajax({
        		type : 'POST',
        		async: true,
        		contentType : 'application/json;charset=UTF-8',
        		url: "findAllWebsite.do",
        		dataType:"json",
        		data:JSON.stringify(param),
        		success:function(d){
        			layer.close(loadindex);
        			callback(d.data);
        			$("div.box_right_url").empty();
        			if(d.data!=null){
    					var html ="";
    						jQuery.each(d.data.data, function(i,item){
    							
    							i++;
    							var reg = new RegExp("(公司)|(主流)");
    							var stat = reg.test(item.address);
    							if(stat){
    								$("#box_id_two").append("<a target='_blank' href='"+item.url+"'>"+i+"."+item.name+"</a>");
    							}else{
    								$("#box_id_one").append("<a target='_blank' href='"+item.url+"'>"+i+"."+item.name+"</a>");
    							}
    							
    							
    			            }); 
    				}
        		}
        	});
        },
        //行被创建时回调函数,主要用于加工获得后台数据后的显示方式
	    "createdRow":function (row, data, index ){
	    	
    		//给每行的“checkbox”赋id值
    		$('td input', row).val(data.id);

	    },
    });
	function abc(data){
		/*console.log(data[0][address]);*/
		$.each( data.list, function(i, n){
			  alert( n.id);
		});
		/*for(var i=0;i<data.length;i++){
			$('div.box').append('<tr><td>'+data[i].name+'</td></tr>');
		}*/
	}
	//选中checkbox
	$('#table_data tbody').on('click', 'tr input[name="checkList"]', function () {
	    var $tr = $(this).parents('tr');
	    var $tmp = $('[name=checkList]:checkbox');
	    $('#checkAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);
	
	});	 
    //checkbox全选
    $("#checkAll").on("click", function () {
        if ($(this).prop("checked") === true) {
            $("input[name='checkList']").prop("checked", $(this).prop("checked"));
       //     $('#table_data tbody tr').addClass('selected');
        } else {
            $("input[name='checkList']").prop("checked", false);
         //   $('#table_data tbody tr  ').removeClass('selected');
        }
    });
}
