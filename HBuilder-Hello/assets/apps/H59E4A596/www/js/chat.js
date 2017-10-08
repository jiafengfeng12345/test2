var chat={};
var $chat_textarea =  $(".chat_textarea");
var $chat_body = $(".chat_body");
var $chat_send = $(".chat_send");
chat.data = {
    receiveTx:"img/kefu.png",
    sendTx:"img/client.png"
};
chat.sendText = function (text) {
    var html = '<div class="chat_message">' +
        '                    <div class="chat_message_body">' +
        '                        <img src="'+chat.data.sendTx+'" class="chat_rtx">' +
        '                        <div  class="chat_rcontent">' +
        '                            <em class="chat_rArrow"></em>' +
        '                            <span class="chat_rArrow"></span>' +
        '                            <div class="chat_text">' +
        text +
        '                            </div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>';
    $chat_body.append(html);
    document.getElementById('chat_body').scrollTop = document.getElementById('chat_body').scrollHeight;
};
chat.sendImg = function (src) {
    var html = '<div class="chat_message">' +
        '                    <div class="chat_message_body">' +
        '                        <img src="'+chat.data.sendTx+'" class="chat_rtx">' +
        '                        <div  class="chat_rcontent">' +
        '                            <em class="chat_rArrow"></em>' +
        '                            <span class="chat_rArrow"></span>' +
        '                            <div class="chat_text">' +
        '                                <img src="'+src+'" class="chat_Img">' +
        '                            </div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>';
    $chat_body.append(html);
    setTimeout(function () {
        document.getElementById('chat_body').scrollTop = document.getElementById('chat_body').scrollHeight;
    },100);

};
chat.receiveText = function (text) {
    var html = '<div class="chat_message">' +
        '                    <div class="chat_message_body">' +
        '                        <img src="'+chat.data.receiveTx+'" class="chat_ltx">' +
        '                        <div  class="chat_lcontent">' +
        '                            <em class="chat_lArrow"></em>' +
        '                            <span class="chat_lArrow"></span>' +
        '                            <div class="chat_text">' +
        text +
        '                            </div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>';
    $chat_body.append(html);
    document.getElementById('chat_body').scrollTop = document.getElementById('chat_body').scrollHeight;
};
chat.receiveImg = function (src) {
    var html = '<div class="chat_message">' +
        '                    <div class="chat_message_body">' +
        '                        <img src="'+chat.data.receiveTx+'" class="chat_ltx">' +
        '                        <div  class="chat_lcontent">' +
        '                            <em class="chat_lArrow"></em>' +
        '                            <span class="chat_lArrow"></span>' +
        '                            <div class="chat_text">' +
        '                                <img src="'+src+'" class="chat_Img">' +
        '                            </div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>';
    $chat_body.append(html);
    // document.getElementById('chat_body').scrollTop = document.getElementById('chat_body').scrollHeight;
    setTimeout(function () {
        document.getElementById('chat_body').scrollTop = document.getElementById('chat_body').scrollHeight;
    },100);
};
chat.sendPrompt = function (text) {
    var html = '<div class="chat_message">' +
        '                    <div class="chat_prompt">' +
        text +
        '                    </div>\n' +
        '                </div>';
    $chat_body.append(html);
    document.getElementById('chat_body').scrollTop = document.getElementById('chat_body').scrollHeight;
};
$chat_textarea.focus(function () {
    if ($chat_textarea.hasClass("chat_empty")) {
        $chat_textarea.html("");
        $chat_textarea.removeClass("chat_empty")
    }
});
$chat_textarea.blur(function () {
    if ($chat_textarea.html() === "") {
        $chat_textarea.addClass("chat_empty");
        $chat_textarea.html("请输入...");
    }
});
$chat_textarea.keypress(function (e) {
    if (e.which === 13) {
        $chat_send.click();

        return false;
    }
});