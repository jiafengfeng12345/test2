/**
 * Created by chenliangjun on 2017/5/14.
 */
function addCookie(name, value, options) {
    if (arguments.length > 1 && name != null) {
        if (options == null) {
            options = {};
        }
        if (value == null) {
            options.expires = -1;
        }
        if (typeof options.expires == "number") {
            var time = options.expires;
            var expires = options.expires = new Date();
            expires.setTime(expires.getTime() + time * 1000);
        }
        if (options.path == null) {
            options.path = "/";
        }
        if (options.domain == null) {
            options.domain = "";
        }
        document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) +
            (options.expires != null ? "; expires=" + options.expires.toUTCString() : "") +
            (options.path != "" ? "; path=" + options.path : "") +
            (options.domain != "" ? "; domain=" + options.domain : "") +
            (options.secure != null ? "; secure" : "");
    }
}

function getCookie(name) {
    if (name != null) {
        var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
        return value ? decodeURIComponent(value[1]) : null;
    }
}

function removeCookie(name, options) {
    addCookie(name, null, options);
}

$(function(){
    var BASEURL = "${pageContext.request.contextPath}/mobile/staff";

    var $username = $("input[name=username]");
    var $passwrod = $("input[name=password]");

    var $login = $(".login");
//    var $i = $(".main-checkbox i");

    $login.click(function () {
        var username = $username.val()||"";
        var password = $passwrod.val()||"";
        $.ajax({
            "url":BASEURL+"/login.html",
            "type":"POST",
            "data":{"username":username,"password":password},
            "dataType":"JSON",
            "success":function (data) {
                if(data.result=="error"){
                    alert(data.content);
                }else{
                    window.location.href="index.html";
                }
            }
        });


    });

    $username.val(getCookie("USER.COOKIENAME"));
    $passwrod.val(getCookie("USER_PASSWORD"));

//        $i.click(function () {
//        if($(this).hasClass("fa-square-o")){
//            $(this).removeClass("fa-square-o").addClass("fa-check-square-o");
//        }else{
//            $(this).removeClass("fa-check-square-o").addClass("fa-square-o");
//        }
//    })



});