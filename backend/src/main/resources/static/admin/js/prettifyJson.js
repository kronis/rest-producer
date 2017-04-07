$(function () {
    function arrayAsValue(arrayValue) {
        var asString = _.reduce(arrayValue, function (memoObject, item) {
            var itemValue = _.reduce(item, function (memoItem, value, key) {
                var separator = memoItem == '' ? '' : ', ';
                return memoItem + separator + key + ': ' + value;
            }, '')
            var separator = memoObject == '' ? '    ' : ', \n    ';
            return memoObject + separator + itemValue;
        }, '');
        return '[\n' + asString + ']';
    }

    var prettifyItems = $('.prettifyJson');
    if (prettifyItems && prettifyItems.length > 0) {
        _.each(prettifyItems, function (item) {
            var jsonString = $(item).text();
            $(item).data('toggle', 'popover').data('placement', 'left').data('trigger', 'hover').data('content', '<pre>' + jsonString + '</pre>').attr('title', 'Raw data');
            var object = JSON.parse(jsonString);
            var textValue = '';
            _.each(object, function (value, key, all) {
                var separator = '\n';
                if (_.indexOf(_.keys(all), key) === 0) {
                    separator = '';
                }
                if (_.isArray(value)) {
                    value = arrayAsValue(value);
                }
                textValue = textValue + separator + key + ': ' + value;
            });

            $(item).text(textValue);
        });
    }
    $(prettifyItems).popover({html: true, container: 'body'});

});