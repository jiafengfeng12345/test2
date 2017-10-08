/**
 * Created by chenliangjun on 2017/5/13.
 */
$(function () {
    var BASEURL="${pageContext.request.contextPath}/mobile/cart/";
    var BASEURL_ORDER="${pageContext.request.contextPath}/mobile/order/";
    var $num = $(".num");
    var $select = $(".goods-select");
    var $imgout = $(".img-out");
    var $checkspan = $(".checkSpan");
    var $orderbtn = $(".orderBtn");
    var $tips = $(".tips");
    var $delete = $(".deleteBtn");
    var $radio = $("input:radio");
    $num.on("input",function (data) {
        var per = parseInt($(this).parent().siblings(".tips").find("span").text());
        var value = $(this).val();
        if(value==""){
            value=0;
            $(this).val(value);
            $(this).addClass("numerror");
            $(this).parent().next().find("span").eq(1).html(0);
        }else{
            value=(parseInt(value,10));
            $(this).val(value);
            if(value%per!=0){
                $(this).addClass("numerror");
            }else{
                $(this).removeClass("numerror");
                $(this).parent().next().find("span").eq(1).html(value/5);
                var $radio = $(this).parents(".inner-goodsItem").siblings(".select-price").find("input:radio:checked");
                if($radio.length!=0){
                    var total = value*parseFloat($radio.val());
                    $(this).parents(".inner-goodsItem").siblings(".item-total").find("span").eq(1).text(total.toFixed(2));
                }
                if($(this).parent().parent().siblings(".img-wrapper").find(".img-out").hasClass("checked")){
                    $.totalPrice();
                }
                $.ajax({
                    "url":BASEURL+"edit.html",
                    "type":"GET",
                    "data":{"id":$(this).parents(".goodsItem").attr("data-id"),"quantity":value,"isChecked":true},
                    "dataType":"JSON",
                    "success":function (data) {
                        var message = data.message;
                        if(message.result=="error"){
                            alert(message.content);
                            window.location.reload();
                        }
                    }
                })

            }
        }

    })

    $imgout.on("click",function () {
        $.check(this,"checked");
        $.totalPrice();
        $.showNum();
        if($.isAllChecked()){
            $checkspan.addClass("allchecked");
        }else{
            $checkspan.removeClass("allchecked");
        }
        if($(".checked").length!=0){
            if($.isChecked()){
                $orderbtn.removeClass("disablebtn");
            }
        }else{
            $orderbtn.addClass("disablebtn");
        }
        $.ajax({
            "url":BASEURL+"edit.html",
            "type":"GET",
            "data":{"id":$(this).parents(".goodsItem").attr("data-id"),
                "quantity":$(this).parents(".img-wrapper").siblings(".num-select").find("input[type=number]").val(),
                "isChecked":$(this).hasClass("checked")},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="error"){
                    alert(message.content);
                    window.location.reload();
                }
            }
        })

    })

    $select.on("change",function () {
        var text = $(this).find("option:selected").text();
        $(this).next().text(text);

    })

    $checkspan.on("click",function () {
        if($(this).hasClass("allchecked")){
            $(this).removeClass("allchecked");
            $orderbtn.addClass("disablebtn");
            $imgout.removeClass("checked");
            $.selectAll(false);

        }else{
            $(this).addClass("allchecked");
            $orderbtn.removeClass("disablebtn");
            $imgout.addClass("checked");
            $.selectAll(true);
        }
        $.showNum();
    })

    $orderbtn.on("click",function () {
        if($(this).hasClass("disablebtn")){
            return false;
        }else{
            window.location.href=BASEURL_ORDER+"checkout.html";
        }
    })

    $delete.on("click",function () {
        console.log(1);
        var id = $(this).attr("data-id");
        $.ajax({
            "url":BASEURL+"delete.html",
            "type":"GET",
            "data":{"id":id},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="success"){
                    window.location.reload();
                }else{
                    alert(message.content);
                }
            }
        })
    })

    $radio.on("click",function () {
        var value = parseFloat($(this).parents(".select-price").siblings(".inner-goodsItem").find(".num").val());
        var num =parseFloat($(this).siblings("label").find("span").eq(1).text());
        $(this).parents(".select-price").siblings(".item-total").find("span").eq(1).text((num*value).toFixed(2));
        // var num = parseInt($num.val());
        // var span = $(".item-total").find("span").eq(1);
        //
        // $(span).text((value*num).toFixed(2));
        if($(this).parents(".select-price").siblings(".inner-goodsItem").find(".img-out").hasClass("checked")){
            $.totalPrice();
        }
        if($.isChecked()) {
            $orderbtn.removeClass("disablebtn");
        }
    })

    $.check = function (that,checked) {
        if($(that).hasClass(checked)){
            $(that).removeClass(checked)
        }else{
            $(that).addClass(checked);
        }
    }

    $.totalPrice = function () {
        var total = 0;
        $checked = $(".checked");
        $total = $(".item-total");
        $checked.each(function (index,data) {
            total = total +parseFloat($($total.get(index)).find("span").eq(1).text());
        })
        $(".price").find("span").eq(1).text(total.toFixed(2));
    }

    $.isAllChecked = function () {
        var length = $(".goodsItem").length;
        var checkedLength = $(".checked").length;
        return length==checkedLength;
    }
    $.showNum = function () {
        var $selectNum = $(".selectNum");
        $selectNum.text($(".checked").length);
    }
    $.selectAll = function (isChecked) {
        $.ajax({
            "url":BASEURL+"selectAll.html",
            "type":"GET",
            "data":{"isChecked":isChecked},
            "dataType":"JSON",
            "success":function (data) {
                var message = data.message;
                if(message.result=="error"){
                    alert(message.content);
                }
            }
        })
    }
    $.setAllChecked = function () {
        if($.isAllChecked()){
            $(".checkSpan").addClass("allchecked");
        }
    }
    $.isChecked = function () {
        var $checked = $(".checked");
        var flag = true;
        $checked.each(function (index,data) {
            var radioChecked = $(data).parents(".goodsItem").find("input:radio:checked");
            if($(radioChecked).length!=1){
                flag = false;
            }
        })
        return flag;
    }
    $.showNum();
    $.totalPrice();
    $.setAllChecked();
})