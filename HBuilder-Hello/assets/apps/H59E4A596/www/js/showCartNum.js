$(".bottom .cart").css("position","relative");
$(".cartNum").css({
	"position": "absolute",
	"top": "6px",
	"right": "22px",
	"width": "20px",
	"height": "20px",
	"borderRadius": "10px",
	"color": "white",
	"backgroundColor": "#ab2b2b",
	"textAlign": "center",
	"lineHeight": "23px"
});

function setCart() {
	$.ajax({
		type:"post",
		url:IP + "/oversea/cart/getAllQuantity.html",
		async:true,
		dataType:"json",
		success:function(data) {
			if(data.result === "success") {
				var num = parseInt(data.content);
				if (num > 99) {
					num = 99;
				}
				$(".bottom .cartNum").html(num);
			}
		}
	});
}
