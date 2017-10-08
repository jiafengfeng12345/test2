var speSelect = $(".spe-select");
var length = $(speSelect).length + 1;
var number = $(".number").val();
var arr = new Array(length);
var ids = new Array(length);
var initstr = "请选择规格以及数量";
var $setNum = $(".set-num");
arr[length - 1] = "*" + number;
var hidden = $("input[type=hidden]").val();
var $addCatr = $(".shopcar");
var $alert = $(".alert");
var num = 2;

var id;
var seriesId = $("input[type=hidden]").val();

function getPrice(){
	$.ajax({
		url: "${pageContext.request.contextPath}/web/series/getProductId.html",
		type: "post",
		dataType: "json",
		data: {
			seriesId: seriesId,
			wireSizeId: ids[0],
			axleLoadId: ids[1],
			statusId: ids[2]
		},
		success: function(data){
			$(".price").find("span").text("¥" + "600");
			if (data.result == "error") {
				$addCatr.addClass("disablebtn");
			} else if (data.result == "success") {
				$addCatr.attr("data-id", data.content);
				$addCatr.removeClass("disablebtn");
			}
		}
	});
}
getPrice();


// $.get(BASEURL+"getSpec.html",{"seriesName":hidden},function (result) {
//     for(var key in result){
//         var warp ="<div class='spe-select' data-id="+index+">";
//         warp = warp+" <div class='tt'>"+key+"</div><div class='con'>";
//         index = index +1;
//         for(res in result[key]){
//             warp = warp+"<div class='tab'> <span>"+result[key][res]+"</span> </div>";
//         }
//         warp = warp +"</div></div>";
//         $append.append($(warp));
//     }
// },"JSON")

$(".tab").click(function() {
	var id = $(this).parent().parent().attr("data-id");
	if ($(this).hasClass("tabactive")) {
		// $(this).removeClass("tabactive");
		// arr[id - 1] = "";
		// $.show();
		// $addCatr.addClass("disablebtn");
		// $(".price").find("span").text("¥");
	} else {
		$(this).addClass("tabactive").siblings().removeClass("tabactive");
		$.addspc(this, id);
		$.show();
	}
	if ($.isOk()) {
		getPrice();
	}
})

$setNum.on("input", function() {
	var value = parseInt($(this).val());
	if (value == 0) {
		$(this).siblings("span").eq(1).text(value);
		$(this).parent().addClass("disablenum");
		$addCatr.addClass("disablebtn");
	} else {
		value = (parseInt(value, 10));
		$(this).val(value);
		if (value % 5 == 0) {
			$(this).parent().removeClass("disablenum");
			$(this).siblings("span").eq(1).text(value / 5);
			num = value / 5;
			$.show();
			if ($.isOk()) {
				$addCatr.removeClass("disablebtn");

			}
		} else {
			$(this).parent().addClass("disablenum");
			$addCatr.addClass("disablebtn");
		}
	}
})

$addCatr.on("click", function() {
	if ($(this).hasClass("disablebtn")) {
		return false;
	}

	var id = $(this).attr("data-id");
	$.ajax({
		"url" : "${pageContext.request.contextPath}/mobile/cart/add.html",
		"type" : "POST",
		"data" : {
			"productId" : id,
			"quantity" : num
		},
		"dataType" : "JSON",
		"success" : function(data) {
			if (data.result == "error") {
				alert(data.content);
			} else if (data.result == "success") {
				$alert.html(data.content);
				$alert.fadeIn("500");
				setTimeout(function() {
					$alert.fadeOut("500");
				}, "1000")
			}
		}
	})
})

$.addspc = function(tab, index) {
	var item = $(tab).find("span").text();
	ids[index - 1] = $(tab).attr("data-id");
	arr[index - 1] = item + " ";
}

$.show = function() {
	var showtext = false;
	arr.forEach(function(value, index, arr) {
		if (index != (length - 1) && value != "") {
			showtext = true;
		}
	})
	if (showtext) {
		arr[length - 1] = "*" + $setNum.siblings("span").eq(1).text();
		$(".selected").find("span").html(arr.join(""));
	} else {
		$(".selected").find("span").html(initstr);
	}
}

$.isOk = function() {
	return parseInt($(".set-num").val()) % 5 == 0 && ($(".tabactive").length == (length - 1));
}

