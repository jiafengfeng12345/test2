//IP="http://121.43.32.226:8080";
//IMGIP="http://121.43.32.226:8081";
//IP="http://192.168.1.226:8080/bowei3";
// IP="http://192.168.31.103:8080";
//IMGIP="http://192.168.31.103:8081";
//IP="http://192.168.1.226:8080/bowei3";
IP = "http://192.168.31.107:8080/bowei";
//IP = "http://139.224.61.222:9631";
var UrlTool = {};
UrlTool.getData = function(url){
	var dataStrs = url.split("imData=")[1];
	if(dataStrs == null){
		return null;
	}
	dataStrs = unescape(dataStrs);
	var re = $.parseJSON(dataStrs);
	return re;
}
UrlTool.setData = function(url, jsonData){
	var dataStr = JSON.stringify(jsonData);
	dataStr = escape(dataStr);
	if(url.indexOf("?") == -1){
		url += ("?imData=" + dataStr);
	}else{
		url += ("&imData=" + dataStr);
	}
	return url;
}
function showOurToast(mag,time){
	var toast = $("body #toast");

}

var Toast = {};
Toast.show = function(str, fIn, fOut) {
	var toast = $("#toast");
	if(toast.length == 0){
		$("body").append("<div class='toast' id='toast'></div>");
	}
	var openStatus = $("#toast").css("display") == "none" ? false : true;
	if (openStatus) {
		$("#toast").stop(true);
	}
	if (!fIn)
		fIn = 600;
	if (!fOut)
		fOut = 1200;
	$("#toast").html(str).fadeIn(fIn).fadeOut(fOut);
};

var DeviceTool = {};
DeviceTool.getDeviceID = function(){// 该方法用于获取推送的客户设备码, 需要在plusReady 之后调用
};
$.showAlert = function (e,message,time) {
    $(e).html(message).fadeIn(time||"1000");
	setTimeout(function() {
		$(e).fadeOut(time||"1000");
	}, 700)
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

