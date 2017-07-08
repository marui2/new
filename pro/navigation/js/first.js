
$(function(){
	ajax_nav();
})


function ajax_nav(){
	var param = getQueryCondition01();
	
    loadindex = layer.load(1, {shade: [0.1,'#fff'],offset:[window.parent.document.body.scrollTop+300+"px"]});
	$.ajax({
			type : 'POST',
	    	async: true,
	    	contentType : 'application/json;charset=UTF-8',
	    	url: "findAllNavigation.do",
	    	dataType:"json",
	    	data:JSON.stringify(param),
	    	success:function(d){
	    		layer.close(loadindex);
	    		/*alert(d.data.data);
	    		alert(JSON.stringify(param));*/
	    		if(d.data!=null){
					var html ="";
						jQuery.each(d.data.data, function(i,item){
							var reg = new RegExp("主|(美国)|欧");
							var stat = reg.test(item.address);
							console.log(item.address);
							var rega = new RegExp("(香港)|(港媒)");
							var stata = rega.test(item.address);
							
							var regb = new RegExp("官|际|媒|(日报)|美|(亚太)");
							var statb = regb.test(item.address);
							
							var regc = new RegExp("敌");
							var statc = regc.test(item.address);
							
							if(stat){
								var a=$("#home a").size()+1;
								$("#home").append("<a style='display:block;padding:5px 0px 5px 10px;width:200px;float: left;' target='_blank' href='"+item.url+"'>"+a+"."+item.name+"</a>");	
								
							}else if(stata){
								var b=$("#profile a").size()+1;
								$("#profile").append("<a style='display:block;padding:5px 0px 5px 10px;width:200px;float: left;' target='_blank' href='"+item.url+"'>"+b+"."+item.name+"</a>");
								
							}else if(statb){
								var c=$("#messages a").size()+1;
								$("#messages").append("<a style='display:block;padding:5px 0px 5px 10px;width:200px;float: left;' target='_blank' href='"+item.url+"'>"+c+"."+item.name+"</a>");
								
							}else if(statc){
								var d=$("#settings a").size()+1;
								$("#settings").append("<a style='display:block;padding:5px 0px 5px 10px;width:200px;float: left;' target='_blank' href='"+item.url+"'>"+d+"."+item.name+"</a>");
								
							}else{
								var e=$("#qita a").size()+1;
								$("#qita").append("<a style='display:block;padding:5px 0px 5px 10px;width:200px;float: left;' target='_blank' href='"+item.url+"'>"+e+"."+item.name+"</a>");
								
							}
							
			            }); 
				}
	    	}
		});
}
//获取查询条件
function getQueryCondition01() {
	var param = {};
	//查询条件
	param.condition = {};
	//组装分页参数
	param.startIndex = 0;
	param.pageSize = 500;
	return param;
}


