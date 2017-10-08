/**
 * Created by chenliangjun on 2017/6/14.
 */
$(function () {
    var BASEURL_CART = "${pageContext.request.contextPath}/mobile/cart/";

    var $check = $(".check");
    var $checkAll = $(".checkAll");
    var $less = $(".less");
    var $add = $(".add");
    var $edit = $(".edit-cart");
    var $delete = $(".delete");
    var number = $(".numberinput .number");
    var initVal = 0;
    $check.on("click",function () {
        var id = $(this).parent().attr("data-id");
        var quantity = $(this).parent().find(".box-num").find("span").eq(1).text();
        var isChecked = $(this).hasClass("icon-yuan");
        var that = $(this);
        $.ajax({
            "url":BASEURL_CART+"edit.html",
            "type":"POST",
            "data":{id:id,"quantity":quantity,"isChecked":isChecked},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="success"){
                    if(isChecked){
                        $.check($(that));
                        if($.isAllChecked()){
                            $.check($checkAll);
                        }
                    }else{
                        $(that).removeClass("icon-check").addClass("iconfont-1").addClass("icon-yuan");
                        $.unCheck($(that));
                        $.unCheck($checkAll);
                    }
                    $.showNum();
                    $.showPrice();
                }
            }
        })
    })

    $checkAll.on("click",function () {
        var that = $(this);
        var isAllchecked = $(this).hasClass("icon-check");
        $.ajax({
            "url":BASEURL_CART+"selectAll.html",
            "type":"GET",
            "data":{"isChecked":!isAllchecked},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="success"){
                    if(!isAllchecked){
                        $uncheck = $(".icon-yuan");
                        $.check($uncheck);
                        $.showNum();
                        $.showPrice();

                    }else{
                        $checked = $(".icon-check");
                        $.unCheck($checked);
                        $.showNum();
                        $.showPrice();
                    }
                }
            }
        })
    })

    $(number).focus(function () {
        initVal =$(this).val();
    })

    $(number).blur(function(){
        var id = $(this).parents(".list").attr("data-id");
        var quantity = $(this).val();
        var that = $(this);
        if($(this).val()==initVal){
            return false;
        }
          $.ajax({
            "url":BASEURL_CART+"edit.html",
            "type":"POST",
            "data":{id:id,"quantity":quantity,"isChecked":true},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="success"){
                    $(that).parents(".setnum").next().find("span").eq(1).text((quantity-1)/5);
                    $.showPrice();
                }
            }
        })
    })

    $less.on("click",function () {
        var id = $(this).parents(".list").attr("data-id");
        var $number = $(this).next().find(".number");
        var quantity =parseInt($number.val());
        if(quantity==1||(quantity-1)%5!=0){
            $number.val(quantity-1);
            return false;
        }
        if($.isChecked($(this))){
            $.ajax({
            "url":BASEURL_CART+"edit.html",
            "type":"POST",
            "data":{id:id,"quantity":(quantity-1)/5,"isChecked":true},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="success"){
                        $number.val(quantity-1);
                        $number.parents(".setnum").next().find("span").eq(1).text((quantity-1)/5);
                        $.showPrice();
                    }
                }
            })
        }
    })

    $add.on("click",function () {
        var id = $(this).parents(".list").attr("data-id");
        var $number = $(this).prev().find(".number");
        var quantity =parseInt($number.val());
        if((quantity+1)%5!=0){
            $number.val(quantity+1);
            return false;
        }
        if($.isChecked($(this))){
            $.ajax({
            "url":BASEURL_CART+"edit.html",
            "type":"POST",
            "data":{id:id,"quantity":(quantity+1)/5,"isChecked":true},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="success"){
                        $number.val(quantity+1);
                        $number.parents(".setnum").next().find("span").eq(1).text((quantity-1)/5);
                        $.showPrice();
                    }
                }
            })
        }
    })

    $edit.on("click",function () {
        var $delete = $(".delete");
        if($(this).hasClass("complete")) {
            // $delete.animate({left: "0"}, 400);
            $(".list").animate({right:"12%"},400);
            $(this).html("完成").removeClass("complete");
        }else {
            // $delete.animate({left:"-12%"},400);
            $(".list").animate({right:"0"},400);
            $(this).html("编辑").addClass("complete");
        }
    })

    $delete.on("click",function () {
        var id = $(this).attr("data-id");
        var $parent = $(this).closest(".schedule");
        $.ajax({
            url:BASEURL_CART+"delete.html",
            type:"GET",
            data:{"id":id},
            dataType:"JSON",
            success:function (data) {
                var message = data.message;
                if(message.result=="success"){
                    $parent.fadeOut();
                    $parent.remove();
                    $.showNum();
                    $.showPrice();
                }else {
                    alert("会话失效,请重新登陆");
                }
            }
        })
    })

    $.check = function (e) {
        $(e).removeClass("icon-yuan").removeClass("iconfont-1").addClass("icon-check");
    }

    $.unCheck = function (e) {
        $(e).removeClass("icon-check").addClass("iconfont-1").addClass("icon-yuan");
    }

    $.showNum = function () {
        var number = $(".content .icon-check").length;
        $checkAll.siblings("span").eq(1).text(number);
    }

    $.showPrice = function () {
        $check = $(".content .icon-check");
        var price = 0;
        $check.each(function (index,data) {
            price = price + parseInt($(data).siblings(".quantity").find(".number").val());
        })
        $(".foot-center").find("span").eq(1).text((60*price).toFixed(2));
    }

    $.isAllChecked = function () {
        var $goods = $(".schedule");
        var $checked = $(".content .icon-check");
        return  $goods.length==0? false : $goods.length == $checked.length;
    }

    $.isChecked = function (e) {
        return $(e).parents(".right").siblings("i").hasClass("icon-check");
    }
})

$(window).load(function () {
    $.showNum();
    $.showPrice();
    var $checkAll = $(".checkAll");
    if($.isAllChecked()){
        $.check($checkAll);
    }
})