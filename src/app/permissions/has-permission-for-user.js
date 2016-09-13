import _ from 'lodash';

function hasPermissionForUserFactory() {
  return function hasPermissionForUser(user, otherUser, permission) {
    if (user === null) {
      return false;
    }

    if (user.isAdmin) {
      return true;
    }

    // Can't edit admins
    if (otherUser.isAdmin && permission === 'EDIT_USER') {
      return false;
    }

    // Can view and edit yourself
    if (user.id === otherUser.id && (permission === 'VIEW_USER' || permission === 'EDIT_USER')) {
      return true;
    }

    var otherUserGroupIds = _.map(otherUser.groups, function(userGroup) {
      return userGroup.group.id;
    });

    var userGroups = user.groups;

    for (var i = 0; i < userGroups.length; i++) {
      var userGroup = userGroups[i];

      if (_.indexOf(otherUserGroupIds, userGroup.group.id) >= 0 && userGroup.hasPermission(permission)) {
        return true;
      }
    }

    return false;
  };
}

export default hasPermissionForUserFactory;
