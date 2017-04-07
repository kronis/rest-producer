$(function () {
    if ($(".datepicker").size() > 0) {
//        var nowTemp = new Date();
//        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        var now = new Date();
        $(".datepicker").each(function () {
            var format = 'yyyy-mm-dd';
            var minViewMode = 0;
            var orientation = 'auto'
            var data = $(this).data();
            if (data && data.datepickerFormat) {
                format = data.datepickerFormat;
            }
            if (data && data.datepickerMinviewmode) {
                minViewMode = data.datepickerMinviewmode;
            }
            if(data && data.orientation) {
                orientation = data.orientation
            }

            $(this).datepicker({
                format: format,
                onRender: function (date) {
                    return date.valueOf() > now.valueOf() ? 'disabled' : '';
                },
                autoclose: true,
                todayHighlight: true,
                minViewMode: minViewMode,
                orientation: orientation
            });
        });
    }
});

var sortAndFilter = function (tableId, skipColumns) {
    var tableHeaderColumns = $('#'+tableId).find('thead tr th');
    var newTr = '<tr id="dtFilterRow">'
            + _.map(tableHeaderColumns, function(){
                return '<th></th>';
            })
            + '</tr>';
    $(newTr).appendTo( $('#'+tableId).find('thead'));


    var api = this.api();
    api.columns().indexes().flatten().each(function (i) {
        if (_.contains(skipColumns, i)) {
            return;
        }
        var column = api.column(i);
        var columnHeader = $('#'+tableId + ' #dtFilterRow').find('th').eq(i);
        var select = $('<select><option value=""></option></select>')
                .appendTo($(columnHeader).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());

                    column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                });

        column.data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>')
        });
    });
}