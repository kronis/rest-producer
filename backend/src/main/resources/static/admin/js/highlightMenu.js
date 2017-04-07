$(function () {

  function resolvePathBySubPath() {
    var specialUrl = [
      {
        url: 'batches',
        param: 'mode'
      },
      {
        url: 'batches',
        param: 'name'
      }
    ];

    var urlMapper = {
      'errorCodes': ['errorCodes/edit'],
      'transactionLogs': ['transactionLogs/fileInfo']
    };

    var returnValue;

    _.each(specialUrl, function (obj) {
      if (window.location.pathname.indexOf(obj.url) > -1) {
        var paramValue = getQueryParam(obj.param);
        if (paramValue) {
          returnValue = obj.url + '?' + obj.param + '=' + paramValue;
        }
      }
    });

    if (returnValue) {
      return returnValue;
    }

    _.each(urlMapper, function (values, index) {
      _.each(values, function (value) {
        if (window.location.pathname.indexOf(value) > -1) {
          returnValue = index;
        }
      });
    });

    return returnValue;
  }

  function highlightUrl(path) {
    var links = $('#primaryMenu').find('li a');
    links.removeClass('active');
    _.each(links, function (linkItem) {
      var link = $(linkItem).attr('href');
      if (link && link !== '#' && link === path) {
        $(linkItem).closest('li').addClass('active');
        $(linkItem).closest('.toplevel').addClass('active');
      }
    });
  }

  function highlightAdjustedUrl(path) {
    var item = _.find($('#primaryMenu').find('li a'), function (it) {
      return $(it).attr('href').indexOf(path) > 0
    })
    if (item) {
      $(item).closest('li').addClass('active').closest('.toplevel').addClass('active');
    }
  }

  var adjustedPath = resolvePathBySubPath();

  if (adjustedPath) {
    highlightAdjustedUrl(adjustedPath)
  }
  if ($('#primaryMenu').find('li.active').size() < 1) {
    var pathName = window.location.pathname;
    //pathName = pathName.indexOf('?') > -1 ? pathName.substring(0, pathName.indexOf('?')) : pathName;
    highlightUrl(pathName);
  }
});