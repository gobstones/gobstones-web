"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (typeof require === "undefined") window.require = function () {};

// Object.values polyfill
if (!Object.values) {
  Object.defineProperty(Object, "values", {
    get: function get() {
      return _.values;
    }
  });
}

// Read querystring
// eslint-disable-next-line no-unused-vars
function getParameterByName(name, url) {
  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Clean querystring
// eslint-disable-next-line no-unused-vars
function cleanQueryString() {
  var url = void 0;
  url = window.location.href;
  url = url.replace(url.substring(url.indexOf("?")), "");
  url = url.substring(url.indexOf("//") + 2);
  url = url.substring(url.indexOf("/"));

  history.replaceState({}, '', url);
}

// Array move
// eslint-disable-next-line no-unused-vars
function arrayMove(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

// Base64 image to PNG
// eslint-disable-next-line no-unused-vars
function toBinary(base64) {
  return rawToBinary(atob(base64));
}

// Raw image to binary
function rawToBinary(raw) {
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  var i;
  for (i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return array;
}

// Promisify
// eslint-disable-next-line no-unused-vars
function promisify(value) {
  var deferred = new $.Deferred();
  deferred.resolve(value);
  return deferred.promise();
}

// Set isomorphic local storage method
var getDataPath = function getDataPath() {
  return window.GBS_REQUIRE("electron").remote.app.getPath("appData") + "/gobstones-web-config.json";
};
var readData = function readData() {
  return JSON.parse(window.GBS_REQUIRE("fs").readFileSync(getDataPath(), "utf-8"));
};
var writeData = function writeData(data) {
  return window.GBS_REQUIRE("fs").writeFileSync(getDataPath(), JSON.stringify(data));
};
var webStorage = {
  setItem: function setItem(key, value) {
    localStorage.setItem(key, value);
  },
  getItem: function getItem(key) {
    return localStorage.getItem(key);
  }
};
var desktopStorage = {
  setItem: function setItem(key, value) {
    if (typeof value === "boolean") value = value.toString();

    try {
      var data = readData();
      data[key] = value;
      writeData(data);
    } catch (e) {
      writeData(_defineProperty({}, key, value));
    }
  },
  getItem: function getItem(key) {
    try {
      var json = readData();
      return json[key];
    } catch (e) {
      return null;
    }
  }
};
window.STORAGE = window.GBS_DESKTOP ? desktopStorage : webStorage;