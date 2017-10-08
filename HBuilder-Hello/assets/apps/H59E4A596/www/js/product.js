/**
 * Created by chenliangjun on 2017/5/16.
 */
$(function () {
    var BASEURL = "${pageContext.request.contextPath}/mobile/";
    var BASEURL_PRODUCT =BASEURL+"product/";
    var BASEURL_SERIES = BASEURL+"series/"
    var $shopcar = $(".shopcar");
    var swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        autoplay: 2500,
        // autoplayDisableOnInteraction: false,
        loop:true,
        loopAdditionalSlides : 1,
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

    $shopcar.on("click",function () {
        var id = $(this).attr("data-id");
        window.location.href=BASEURL_SERIES+"spec.html";
    })
})