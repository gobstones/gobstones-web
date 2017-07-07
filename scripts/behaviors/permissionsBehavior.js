"use strict";

Polymer.PermissionsBehavior = {
  hasPermission: function hasPermission(permissions, name) {
    var allPermissions = permissions || {};
    allPermissions = allPermissions.base || allPermissions;

    var permission = allPermissions[name];
    return _.isUndefined(permission) ? true : permission;
  }
};