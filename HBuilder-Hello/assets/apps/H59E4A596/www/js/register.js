/**
 * Created by chenliangjun on 2017/5/14.
 */
$(function () {
    var $username = $("input[name=username]");
    var $password = $("input[name=password]");
    var $repassword = $("input[name=repassword]");
    var $email = $("input[name=email]");

    var BASEURL="${pageContext.request.contextPath}/mobile/staff/";

    var $btn = $(".registerbtn");


    $btn.click(function () {
        var username = $username.val()||"";
        var password = $password.val()||"";
        var repassword = $repassword.val()||"";
        var email = $email.val()||"";
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");


        if (username.length == 0) {
            alert("用户名不能为空");
            return false;
        }else if(password!=""&&repassword!=""&&password!=repassword) {
            alert("请输入相同的密码");
            return false;
        } else{
            if (atpos<1 || dotpos<(atpos+2) || (dotpos+2)>=email.length){
                alert("请输入正确的邮箱");
                return false;
            }
        }
        $.ajax({
            "url":BASEURL+"register.html",
            "dataType":"JSON",
            "data":{"username":username,"password":password,"email":email},
            "success":function (data) {
                if(data.result!="error"){
                    alert(data.content);
                    window.location.href="index.html";
                }else{
                    alert(data.content);
                }
            }
        })
    })

})