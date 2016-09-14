import angular from 'angular';
import _ from 'lodash';

function notificationService($timeout) {
  var notifications = [];

  return {
    notifications: notifications,
    success: success,
    fail: fail,
    warn: warn,
    info: info,
    fatal: fatal,
    remove: remove,
  };

  function toParams(params) {
    if (params === undefined || params === null) {
      params = {};
    } else if (angular.isArray(params) || !angular.isObject(params)) {
      params = {message: params};
    }

    return params;
  }

  function setDefaults(params, defaults) {
    _.each(defaults, function(value, key) {
      if (params[key] === undefined) {
        params[key] = value;
      }
    });
  }

  function success(params) {
    params = toParams(params);
    setDefaults(params, {
      title: 'Success',
      icon: 'fa-check-circle',
      type: 'success'
    });
    return _notify(params);
  }

  function fail(params) {
    params = toParams(params);
    setDefaults(params, {
      title: 'Error',
      icon: 'fa-exclamation-circle',
      type: 'fail'
    });
    return _notify(params);
  }

  function warn(params) {
    params = toParams(params);
    setDefaults(params, {
      title: 'Warning',
      icon: 'fa-exclamation-circle',
      type: 'warn'
    });
    return _notify(params);
  }

  function info(params) {
    params = toParams(params);
    setDefaults(params, {
      title: 'Info',
      icon: 'fa-info-circle',
      type: 'info'
    });
    return _notify(params);
  }

  function fatal(params) {
    params = toParams(params);
    setDefaults(params, {
      title: 'Fatal Error',
      type: 'fatal',
      message: 'An unexpected error has occurred. Please try reloading the page.',
      timeout: 0
    });
    return _notify(params);
  }

  function _notify(params) {
    if (angular.isArray(params.message)) {
      params.message = params.message.join(' ');
    }

    if (params.timeout === undefined) {
      params.timeout = 5000; // 5 seconds
    }

    var notification = {
      type: params.type,
      title: params.title,
      message: params.message,
      icon: params.icon,
      timeout: params.timeout,
      remove: function() {
        remove(this);
      }
    };

    if (notification.timeout > 0) {
      $timeout(function() {
        remove(notification);
      }, notification.timeout);
    }

    // Remove old duplicate messages
    _.remove(notifications, function(x) {
      return (
        x.type === notification.type &&
        x.title === notification.title &&
        x.message === notification.message
      );
    });

    notifications.push(notification);

    return notification;
  }

  function remove(notification) {
    _.pull(notifications, notification);
  }
}

notificationService.$inject = ['$timeout'];

export default notificationService;
