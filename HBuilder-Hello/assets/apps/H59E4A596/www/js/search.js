var $history = $("div.searchContent div.sc");
var series = [];
function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}
Array.prototype.unique = function (key) {
    var arr = this;
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) === -1) n.push(arr[i]);
        } else {
            inner: {
                var has = false;
                for (var j = 0; j < n.length; j++) {
                    if (arr[i][key] === n[j][key]) {
                        has = true;
                        break inner;
                    }
                }
            }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n;
};

/**
 * Created by ycy on 2017/4/27.
 */
var $searchPageInput = $(".searchPage input").first();
var $searchPageCloseIcon = $(".searchPage i.icon-close").first();
var $searchPageContent = $(".searchPage div.searchContent").first();
var $resultUl = $(".searchPage div.resultList ul").first();
var $cancelSearch = $(".searchPage div.cancelSearch").first();
var timer = void 0;
$searchPageInput.focus(function () {
    $resultUl.show();
    if ($searchPageInput.val()) $searchPageCloseIcon.show();
});

$searchPageInput.blur(function () {
    if (!$searchPageInput.val()) {
        $searchPageCloseIcon.hide();
        $searchPageContent.show();
        $resultUl.empty();
        $resultUl.hide();
    }
});

function render(result) {
    $resultUl.empty();
    // console.log(result.length);
    if (result.length === 0 || (result.length === 1 && result[0].length === 0)) {
        $resultUl.append($("<li>没有找到结果</li>"));
    }
    else {
        result.forEach(function (value) {
            var li = "<li><a href=" + " series/detail.html?id=" + value['id'] + ">" + value['name'] + "</li>";
            var $li = $(li).click(function () {
                var storage = sessionStorage.getItem("ii") === 'true' ? localStorage : sessionStorage;
                var url = "series/detail.html?id=" + value['id'];
                var history = storage.getItem("mobile_search_history") || '[]';
                var parse = JSON.parse(history);
                parse.push({id: value['id'], name: value['name']});
                var unique = parse.unique('id');
                var stringify = JSON.stringify(unique);
                storage.setItem("mobile_search_history", stringify);
                return true;
            });
            $resultUl.append($li);
        });
    }
}
$searchPageInput.on("input", function () {
    if (!$searchPageInput.val()) {
        $searchPageCloseIcon.hide();
        $searchPageContent.show();
        $resultUl.empty();
        $resultUl.hide();
    } else {
        $searchPageCloseIcon.show();
        $searchPageContent.hide();
        $resultUl.show();
        $resultUl.empty();
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            var target = $searchPageInput.val().trim().toLowerCase();
            var result = series.filter(function (ser) {
                return ser.name.toLowerCase().indexOf(target) !== -1;
            });
            render(result);
        }, 250);
    }
});

$searchPageCloseIcon.click(function () {
    $searchPageInput.val('').focus();
    $searchPageCloseIcon.hide();
    $searchPageContent.show();
    $resultUl.empty();
    $resultUl.hide();
});

$cancelSearch.on("click", function () {
    $resultUl.empty();
    $resultUl.hide();
    location.href = "index.html";
});

(function () {
    $.get("../web/series/getAll.html").success(function (data) {
        series = JSON.parse(data);
    }).fail(function () {
        alert("network error!");
    });
    var storage = sessionStorage.getItem("ii") == 'true' ? localStorage : sessionStorage;
    var history = storage.getItem("mobile_search_history") || '[]';
    var arr = JSON.parse(history);
    arr.forEach(function (value) {
        var item = "<a href=" + "series/detail.html?id=" + value.id + ">" + value.name + "</a>";
        $history.append($(item));
    })
})();