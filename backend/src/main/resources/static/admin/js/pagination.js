$(function () {
    $('.pagination-click').click(function (e) {
        var li = $(this).closest('li');
        if ($(li).hasClass('disabled') || $(li).hasClass('active')) {
            e.preventDefault();
            return;
        }

        if ($(this).attr('href') === '#') {
            e.preventDefault();

            var countPerPage = $(this).data('maxResults');
            var page;
            var firstIndex = parseInt(getQueryParam('firstIndex'), 10);
            firstIndex = firstIndex ? firstIndex : 0;

            if ($(this).hasClass('pagination-previous')) {
                page = firstIndex / countPerPage;
            } else if ($(this).hasClass('pagination-next')) {
                page = firstIndex / countPerPage + 2;
            } else {
                page = $(this).data('paginationPage');
            }
            setGetParameter('firstIndex', countPerPage * (page - 1));
        }
    });
});

function setGetParameter(paramName, paramValue) {
    var url = window.location.href;
    if (url.indexOf(paramName + "=") >= 0) {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else {
        if (url.indexOf("?") < 0) {
            url += "?" + paramName + "=" + paramValue;
        }
        else {
            url += "&" + paramName + "=" + paramValue;
        }
    }
    window.location.href = url;
}

function getQueryParam(param) {
    var urlParams = {};
    (function () {
        var e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&=]+)=?([^&#]*)/g,
                d = function (s) {
                    return decodeURIComponent(s.replace(a, " "));
                },
                q = window.location.search.substring(1);

        while (e = r.exec(q)) {
            urlParams[d(e[1])] = d(e[2]);
        }
    })();
    return urlParams[param];
}