(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-kuaishou/dist/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 23);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = ks.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _ks$getSystemInfoSync = ks.getSystemInfoSync(),
    platform = _ks$getSystemInfoSync.platform,
    pixelRatio = _ks$getSystemInfoSync.pixelRatio,
    windowWidth = _ks$getSystemInfoSync.windowWidth; // uni=>ks runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(ks.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(ks.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
var EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {
    var _this2 = this;
    (0, _classCallCheck2.default)(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this2.on(name, events[name]);
      });
    }
  }
  (0, _createClass2.default)(EventChannel, [{
    key: "emit",
    value: function emit(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {
        return opt.type !== 'once';
      });
    }
  }, {
    key: "on",
    value: function on(eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "off",
    value: function off(eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    }
  }, {
    key: "_clearCache",
    value: function _clearCache(eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    }
  }, {
    key: "_addListener",
    value: function _addListener(eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type
      });
    }
  }]);
  return EventChannel;
}();
var eventChannels = {};
var eventChannelStack = [];
var id = 0;
function initEventChannel(events) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  }
};
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || ks.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    ks.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-kuaishou".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "car-app",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.18",
    uniRuntimeVersion: "3.6.18",
    uniPlatform: undefined || "mp-kuaishou",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = "mp-kuaishou".split('-')[1];
  var _hostName = result.hostName || _platform; // mp-jd
  {
    _hostName = result.host;
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var oName = 'getUserInfo';
var nName = 'getUserProfile';
var getUserProfile = {
  name: ks.canIUse(nName) ? nName : oName
};
var protocols = {
  navigateTo: navigateTo,
  redirectTo: redirectTo,
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile: getUserProfile,
  requestPayment: {
    name: ks.pay ? 'pay' : 'requestPayment',
    args: function args(fromArgs) {
      if ((0, _typeof2.default)(fromArgs) === 'object') {
        // ks.pay 服务类型 id（固定值为 '1'）
        if (ks.pay && !fromArgs.serviceId) fromArgs.serviceId = '1';
      }
    }
  }
};
var todos = ['vibrate'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FEB\u624B\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FEB\u624B\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = ks[methodName].apply(ks, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['kuaishou'],
  share: ['kuaishou'],
  payment: ['kspay'],
  push: ['kuaishou']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    }
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"car-app","VUE_APP_PLATFORM":"mp-kuaishou","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "ks".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this3 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this3.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this3.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this3.route || _this3.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel$1() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel$1();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-kuaishou";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(ks.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function parseApp$1(vm) {
  return parseApp(vm);
}
function createApp(vm) {
  App(parseApp$1(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}

/**
 * 用于延迟调用 setData
 * 在 setData 真实调用的时机需执行 fixSetDataEnd
 * @param {*} mpInstance
 */
function fixSetDataStart(mpInstance) {
  var setData = mpInstance.setData;
  var setDataArgs = [];
  mpInstance.setData = function () {
    setDataArgs.push(arguments);
  };
  mpInstance.__fixInitData = function () {
    var _this4 = this;
    this.setData = setData;
    var fn = function fn() {
      setDataArgs.forEach(function (args) {
        setData.apply(_this4, args);
      });
    };
    if (setDataArgs.length) {
      if (this.groupSetData) {
        this.groupSetData(fn);
      } else {
        fn();
      }
    }
  };
}
/**
 * 恢复真实的 setData 方法
 * @param {*} mpInstance
 */
function fixSetDataEnd(mpInstance) {
  if (mpInstance.__fixInitData) {
    mpInstance.__fixInitData();
    delete mpInstance.__fixInitData;
  }
}
function parseComponent$1(vueComponentOptions, needVueOptions) {
  var _parseComponent = parseComponent(vueComponentOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    componentOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  var oldAttached = componentOptions.lifetimes.attached;
  componentOptions.lifetimes.attached = function attached() {
    var _this5 = this;
    // 暂不区分版本
    if (isPage.call(this)) {
      // 解决快手小程序页面 attached 生命周期 setData 导致数据同步异常的问题
      fixSetDataStart(this);
      setTimeout(function () {
        fixSetDataEnd(_this5);
      }, 0);
    }
    oldAttached.call(this);
  };
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions;
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent$ = parseComponent$1(vuePageOptions, true),
    _parseComponent$2 = (0, _slicedToArray2.default)(_parseComponent$, 2),
    pageOptions = _parseComponent$2[0],
    vueOptions = _parseComponent$2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function parsePage$1(vuePageOptions) {
  return parsePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage$1(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent$1(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp$1(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && ks.onAppShow) {
    ks.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && ks.onAppHide) {
    ks.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = ks.getLaunchOptionsSync && ks.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp$1(vm);
  if (isFn(appOptions.onShow) && ks.onAppShow) {
    ks.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && ks.onAppHide) {
    ks.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = ks.getLaunchOptionsSync && ks.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!ks.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-kuaishou" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, ks[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(ks).forEach(function (name) {
    if (hasOwn(ks, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, ks[name]));
    }
  });
}
ks.createApp = createApp;
ks.createPage = createPage;
ks.createComponent = createComponent;
ks.createSubpackageApp = createSubpackageApp;
ks.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 4 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 20);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 21);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 22);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 23 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-kuaishou/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 24 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"car-app","VUE_APP_PLATFORM":"mp-kuaishou","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"car-app","VUE_APP_PLATFORM":"mp-kuaishou","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"car-app","VUE_APP_PLATFORM":"mp-kuaishou","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"car-app","VUE_APP_PLATFORM":"mp-kuaishou","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 25 */
/*!******************************************************!*\
  !*** /Users/lvjian/carManagement/car-app/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3VuaS1tcC1rdWFpc2hvdS9kaXN0L2luZGV4LmpzP2M1ZjkiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcz9jZDAwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdC5qcz80ZWE0Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanM/Mjc4YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcz9jMTM1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzPzliNDIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanM/NjYxMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzPzVhNDMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzP2MyNDAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanM/OTUyMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b1Byb3BlcnR5S2V5LmpzP2EzOTUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzPzcwMzciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdG9QcmltaXRpdmUuanM/ZTUwZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jb25zdHJ1Y3QuanM/YjE3YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcz80YTRiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdC5qcz82ZjhmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzPzk3MGIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanM/NWJjMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcz80NDhhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzPzIyMzYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5LmpzPzExYjAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanM/MDY3NiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3VuaS1pMThuL2Rpc3QvdW5pLWkxOG4uZXMuanM/MzdkYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy9tcC12dWUvZGlzdC9tcC5ydW50aW1lLmVzbS5qcz82NmZkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qcz9mMGM1Il0sIm5hbWVzIjpbInJlYWxBdG9iIiwiYjY0IiwiYjY0cmUiLCJhdG9iIiwic3RyIiwiU3RyaW5nIiwicmVwbGFjZSIsInRlc3QiLCJFcnJvciIsInNsaWNlIiwibGVuZ3RoIiwiYml0bWFwIiwicmVzdWx0IiwicjEiLCJyMiIsImkiLCJpbmRleE9mIiwiY2hhckF0IiwiZnJvbUNoYXJDb2RlIiwiYjY0RGVjb2RlVW5pY29kZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInNwbGl0IiwibWFwIiwiYyIsImNoYXJDb2RlQXQiLCJ0b1N0cmluZyIsImpvaW4iLCJnZXRDdXJyZW50VXNlckluZm8iLCJ0b2tlbiIsImtzIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0b2tlbkFyciIsInVpZCIsInJvbGUiLCJwZXJtaXNzaW9uIiwidG9rZW5FeHBpcmVkIiwidXNlckluZm8iLCJKU09OIiwicGFyc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJleHAiLCJpYXQiLCJ1bmlJZE1peGluIiwiVnVlIiwicHJvdG90eXBlIiwidW5pSURIYXNSb2xlIiwicm9sZUlkIiwidW5pSURIYXNQZXJtaXNzaW9uIiwicGVybWlzc2lvbklkIiwidW5pSURUb2tlblZhbGlkIiwiRGF0ZSIsIm5vdyIsIl90b1N0cmluZyIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiaXNGbiIsImZuIiwiaXNTdHIiLCJpc09iamVjdCIsIm9iaiIsImlzUGxhaW5PYmplY3QiLCJjYWxsIiwiaGFzT3duIiwia2V5Iiwibm9vcCIsImNhY2hlZCIsImNhY2hlIiwiY3JlYXRlIiwiY2FjaGVkRm4iLCJoaXQiLCJjYW1lbGl6ZVJFIiwiY2FtZWxpemUiLCJfIiwidG9VcHBlckNhc2UiLCJIT09LUyIsImdsb2JhbEludGVyY2VwdG9ycyIsInNjb3BlZEludGVyY2VwdG9ycyIsIm1lcmdlSG9vayIsInBhcmVudFZhbCIsImNoaWxkVmFsIiwicmVzIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwiZGVkdXBlSG9va3MiLCJob29rcyIsInB1c2giLCJyZW1vdmVIb29rIiwiaG9vayIsImluZGV4Iiwic3BsaWNlIiwibWVyZ2VJbnRlcmNlcHRvckhvb2siLCJpbnRlcmNlcHRvciIsIm9wdGlvbiIsImtleXMiLCJmb3JFYWNoIiwicmVtb3ZlSW50ZXJjZXB0b3JIb29rIiwiYWRkSW50ZXJjZXB0b3IiLCJtZXRob2QiLCJyZW1vdmVJbnRlcmNlcHRvciIsIndyYXBwZXJIb29rIiwiZGF0YSIsImlzUHJvbWlzZSIsInRoZW4iLCJxdWV1ZSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNhbGxiYWNrIiwid3JhcHBlck9wdGlvbnMiLCJvcHRpb25zIiwibmFtZSIsIm9sZENhbGxiYWNrIiwiY2FsbGJhY2tJbnRlcmNlcHRvciIsIndyYXBwZXJSZXR1cm5WYWx1ZSIsInJldHVyblZhbHVlIiwicmV0dXJuVmFsdWVIb29rcyIsImdldEFwaUludGVyY2VwdG9ySG9va3MiLCJzY29wZWRJbnRlcmNlcHRvciIsImludm9rZUFwaSIsImFwaSIsInBhcmFtcyIsImludm9rZSIsInByb21pc2VJbnRlcmNlcHRvciIsInJlamVjdCIsIlNZTkNfQVBJX1JFIiwiQ09OVEVYVF9BUElfUkUiLCJDT05URVhUX0FQSV9SRV9FWEMiLCJBU1lOQ19BUEkiLCJDQUxMQkFDS19BUElfUkUiLCJpc0NvbnRleHRBcGkiLCJpc1N5bmNBcGkiLCJpc0NhbGxiYWNrQXBpIiwiaGFuZGxlUHJvbWlzZSIsImNhdGNoIiwiZXJyIiwic2hvdWxkUHJvbWlzZSIsImZpbmFsbHkiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVhc29uIiwicHJvbWlzaWZ5IiwicHJvbWlzZUFwaSIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJhc3NpZ24iLCJFUFMiLCJCQVNFX0RFVklDRV9XSURUSCIsImlzSU9TIiwiZGV2aWNlV2lkdGgiLCJkZXZpY2VEUFIiLCJjaGVja0RldmljZVdpZHRoIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJwbGF0Zm9ybSIsInBpeGVsUmF0aW8iLCJ3aW5kb3dXaWR0aCIsInVweDJweCIsIm51bWJlciIsIm5ld0RldmljZVdpZHRoIiwiTnVtYmVyIiwiTWF0aCIsImZsb29yIiwiTE9DQUxFX1pIX0hBTlMiLCJMT0NBTEVfWkhfSEFOVCIsIkxPQ0FMRV9FTiIsIkxPQ0FMRV9GUiIsIkxPQ0FMRV9FUyIsIm1lc3NhZ2VzIiwibG9jYWxlIiwibm9ybWFsaXplTG9jYWxlIiwibGFuZ3VhZ2UiLCJpbml0STE4bk1lc3NhZ2VzIiwiaXNFbmFibGVMb2NhbGUiLCJsb2NhbGVLZXlzIiwiX191bmlDb25maWciLCJsb2NhbGVzIiwiY3VyTWVzc2FnZXMiLCJ1c2VyTWVzc2FnZXMiLCJpMThuIiwiaW5pdFZ1ZUkxOG4iLCJ0IiwiaTE4bk1peGluIiwibWl4aW4iLCJiZWZvcmVDcmVhdGUiLCJ1bndhdGNoIiwid2F0Y2hMb2NhbGUiLCIkZm9yY2VVcGRhdGUiLCIkb25jZSIsIm1ldGhvZHMiLCIkJHQiLCJ2YWx1ZXMiLCJzZXRMb2NhbGUiLCJnZXRMb2NhbGUiLCJpbml0QXBwTG9jYWxlIiwiYXBwVm0iLCJzdGF0ZSIsIm9ic2VydmFibGUiLCJsb2NhbGVXYXRjaGVycyIsIiR3YXRjaExvY2FsZSIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidiIsIndhdGNoIiwiaW5jbHVkZSIsInBhcnRzIiwiZmluZCIsInBhcnQiLCJzdGFydHNXaXRoIiwidHJpbSIsInRvTG93ZXJDYXNlIiwibGFuZyIsImdldExvY2FsZSQxIiwiZ2V0QXBwIiwiYXBwIiwiYWxsb3dEZWZhdWx0IiwiJHZtIiwiJGxvY2FsZSIsInNldExvY2FsZSQxIiwib2xkTG9jYWxlIiwib25Mb2NhbGVDaGFuZ2VDYWxsYmFja3MiLCJvbkxvY2FsZUNoYW5nZSIsImdsb2JhbCIsImludGVyY2VwdG9ycyIsImJhc2VBcGkiLCJmcmVlemUiLCJfX3Byb3RvX18iLCJFdmVudENoYW5uZWwiLCJpZCIsImV2ZW50cyIsImxpc3RlbmVyIiwiZW1pdENhY2hlIiwib24iLCJldmVudE5hbWUiLCJhcmdzIiwiZm5zIiwib3B0IiwiYXBwbHkiLCJmaWx0ZXIiLCJ0eXBlIiwiX2FkZExpc3RlbmVyIiwiX2NsZWFyQ2FjaGUiLCJjYWNoZUFyZ3MiLCJlbWl0Iiwic2hpZnQiLCJldmVudENoYW5uZWxzIiwiZXZlbnRDaGFubmVsU3RhY2siLCJpbml0RXZlbnRDaGFubmVsIiwiZXZlbnRDaGFubmVsIiwiZ2V0RXZlbnRDaGFubmVsIiwibmF2aWdhdGVUbyIsImZyb21BcmdzIiwidG9BcmdzIiwidXJsIiwiZnJvbVJlcyIsInRvUmVzIiwiZmluZEV4aXN0c1BhZ2VJbmRleCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuIiwicGFnZSIsIiRwYWdlIiwiZnVsbFBhdGgiLCJyZWRpcmVjdFRvIiwiZXhpc3RzIiwiZGVsdGEiLCJleGlzdHNQYWdlSW5kZXgiLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50SW5kZXgiLCJwYXJzZUludCIsImN1cnJlbnQiLCJpc05hTiIsInVybHMiLCJpdGVtIiwiaW5kaWNhdG9yIiwibG9vcCIsIlVVSURfS0VZIiwiZGV2aWNlSWQiLCJ1c2VEZXZpY2VJZCIsInJhbmRvbSIsInNldFN0b3JhZ2UiLCJhZGRTYWZlQXJlYUluc2V0cyIsInNhZmVBcmVhIiwic2FmZUFyZWFJbnNldHMiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJzY3JlZW5IZWlnaHQiLCJwb3B1bGF0ZVBhcmFtZXRlcnMiLCJicmFuZCIsIm1vZGVsIiwic3lzdGVtIiwidGhlbWUiLCJ2ZXJzaW9uIiwiZm9udFNpemVTZXR0aW5nIiwiU0RLVmVyc2lvbiIsImRldmljZU9yaWVudGF0aW9uIiwib3NOYW1lIiwib3NWZXJzaW9uIiwiaG9zdFZlcnNpb24iLCJkZXZpY2VUeXBlIiwiZ2V0R2V0RGV2aWNlVHlwZSIsImRldmljZUJyYW5kIiwiZ2V0RGV2aWNlQnJhbmQiLCJfaG9zdE5hbWUiLCJnZXRIb3N0TmFtZSIsIl9kZXZpY2VPcmllbnRhdGlvbiIsIl9kZXZpY2VQaXhlbFJhdGlvIiwiX1NES1ZlcnNpb24iLCJob3N0TGFuZ3VhZ2UiLCJwYXJhbWV0ZXJzIiwiYXBwSWQiLCJwcm9jZXNzIiwiYXBwTmFtZSIsImFwcFZlcnNpb24iLCJhcHBWZXJzaW9uQ29kZSIsImFwcExhbmd1YWdlIiwiZ2V0QXBwTGFuZ3VhZ2UiLCJ1bmlDb21waWxlVmVyc2lvbiIsInVuaVJ1bnRpbWVWZXJzaW9uIiwidW5pUGxhdGZvcm0iLCJkZXZpY2VNb2RlbCIsImRldmljZVBpeGVsUmF0aW8iLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsImhvc3RUaGVtZSIsImhvc3ROYW1lIiwiaG9zdFNES1ZlcnNpb24iLCJob3N0Rm9udFNpemVTZXR0aW5nIiwid2luZG93VG9wIiwid2luZG93Qm90dG9tIiwib3NMYW5ndWFnZSIsInVuZGVmaW5lZCIsIm9zVGhlbWUiLCJ1YSIsImhvc3RQYWNrYWdlTmFtZSIsImJyb3dzZXJOYW1lIiwiYnJvd3NlclZlcnNpb24iLCJkZXZpY2VUeXBlTWFwcyIsImlwYWQiLCJ3aW5kb3dzIiwibWFjIiwiZGV2aWNlVHlwZU1hcHNLZXlzIiwiX21vZGVsIiwiX20iLCJkZWZhdWx0TGFuZ3VhZ2UiLCJfcGxhdGZvcm0iLCJob3N0IiwiZ2V0U3lzdGVtSW5mbyIsIm9OYW1lIiwibk5hbWUiLCJnZXRVc2VyUHJvZmlsZSIsImNhbklVc2UiLCJwcm90b2NvbHMiLCJyZXF1ZXN0UGF5bWVudCIsInBheSIsInNlcnZpY2VJZCIsInRvZG9zIiwiY2FuSVVzZXMiLCJDQUxMQkFDS1MiLCJwcm9jZXNzQ2FsbGJhY2siLCJtZXRob2ROYW1lIiwicHJvY2Vzc1JldHVyblZhbHVlIiwicHJvY2Vzc0FyZ3MiLCJhcmdzT3B0aW9uIiwia2VlcEZyb21BcmdzIiwia2V5T3B0aW9uIiwiY29uc29sZSIsIndhcm4iLCJrZWVwUmV0dXJuVmFsdWUiLCJ3cmFwcGVyIiwicHJvdG9jb2wiLCJhcmcxIiwiYXJnMiIsInRvZG9BcGlzIiwiVE9ET1MiLCJjcmVhdGVUb2RvQXBpIiwidG9kb0FwaSIsImVyck1zZyIsInByb3ZpZGVycyIsIm9hdXRoIiwic2hhcmUiLCJwYXltZW50IiwiZ2V0UHJvdmlkZXIiLCJzZXJ2aWNlIiwicHJvdmlkZXIiLCJleHRyYUFwaSIsImdldEVtaXR0ZXIiLCJFbWl0dGVyIiwiZ2V0VW5pRW1pdHRlciIsImN0eCIsIiRvbiIsImFyZ3VtZW50cyIsIiRvZmYiLCIkZW1pdCIsImV2ZW50QXBpIiwidHJ5Q2F0Y2giLCJlIiwiZ2V0QXBpQ2FsbGJhY2tzIiwiYXBpQ2FsbGJhY2tzIiwicGFyYW0iLCJjaWQiLCJjaWRFcnJNc2ciLCJlbmFibGVkIiwibm9ybWFsaXplUHVzaE1lc3NhZ2UiLCJpbnZva2VQdXNoQ2FsbGJhY2siLCJpbnZva2VHZXRQdXNoQ2lkQ2FsbGJhY2tzIiwib25QdXNoTWVzc2FnZUNhbGxiYWNrcyIsInN0b3BwZWQiLCJnZXRQdXNoQ2lkQ2FsbGJhY2tzIiwiZ2V0UHVzaENsaWVudElkIiwiaGFzU3VjY2VzcyIsImhhc0ZhaWwiLCJoYXNDb21wbGV0ZSIsIm9uUHVzaE1lc3NhZ2UiLCJvZmZQdXNoTWVzc2FnZSIsIm1vY2tzIiwiZmluZFZtQnlWdWVJZCIsInZtIiwidnVlUGlkIiwiJGNoaWxkcmVuIiwiY2hpbGRWbSIsIiRzY29wZSIsIl8kdnVlSWQiLCJwYXJlbnRWbSIsImluaXRCZWhhdmlvciIsIkJlaGF2aW9yIiwiaXNQYWdlIiwicm91dGUiLCJpbml0UmVsYXRpb24iLCJkZXRhaWwiLCJ0cmlnZ2VyRXZlbnQiLCJzZWxlY3RBbGxDb21wb25lbnRzIiwibXBJbnN0YW5jZSIsInNlbGVjdG9yIiwiJHJlZnMiLCJjb21wb25lbnRzIiwiY29tcG9uZW50IiwicmVmIiwiZGF0YXNldCIsInRvU2tpcCIsInN5bmNSZWZzIiwicmVmcyIsIm5ld1JlZnMiLCJvbGRLZXlzIiwiU2V0IiwibmV3S2V5cyIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJldmVyeSIsImluY2x1ZGVzIiwiZGVsZXRlIiwiaW5pdFJlZnMiLCJmb3JDb21wb25lbnRzIiwiaGFuZGxlTGluayIsImV2ZW50IiwidnVlT3B0aW9ucyIsInBhcmVudCIsIm1hcmtNUENvbXBvbmVudCIsIklTX01QIiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsIk9CIiwiU0tJUCIsImlzRXh0ZW5zaWJsZSIsIk1QUGFnZSIsIlBhZ2UiLCJNUENvbXBvbmVudCIsIkNvbXBvbmVudCIsImN1c3RvbWl6ZVJFIiwiY3VzdG9taXplIiwiaW5pdFRyaWdnZXJFdmVudCIsIm9sZFRyaWdnZXJFdmVudCIsIm5ld1RyaWdnZXJFdmVudCIsImNvbVR5cGUiLCJfdHJpZ2dlckV2ZW50IiwiaW5pdEhvb2siLCJpc0NvbXBvbmVudCIsIm9sZEhvb2siLCJfXyR3cmFwcGVyZWQiLCJhZnRlciIsIlBBR0VfRVZFTlRfSE9PS1MiLCJpbml0TW9ja3MiLCIkbXAiLCJtcFR5cGUiLCJtb2NrIiwiaGFzSG9vayIsImRlZmF1bHQiLCJleHRlbmRPcHRpb25zIiwic3VwZXIiLCJtaXhpbnMiLCJpbml0SG9va3MiLCJtcE9wdGlvbnMiLCJfX2NhbGxfaG9vayIsImluaXRVbmtub3duSG9va3MiLCJleGNsdWRlcyIsImZpbmRIb29rcyIsImluaXRIb29rJDEiLCJpbml0VnVlQ29tcG9uZW50IiwiVnVlQ29tcG9uZW50IiwiZXh0ZW5kIiwiaW5pdFNsb3RzIiwidnVlU2xvdHMiLCIkc2xvdHMiLCJzbG90TmFtZSIsIiRzY29wZWRTbG90cyIsImluaXRWdWVJZHMiLCJ2dWVJZHMiLCJfJHZ1ZVBpZCIsImluaXREYXRhIiwiY29udGV4dCIsIlZVRV9BUFBfREVCVUciLCJzdHJpbmdpZnkiLCJfX2xpZmVjeWNsZV9ob29rc19fIiwiUFJPUF9UWVBFUyIsIkJvb2xlYW4iLCJjcmVhdGVPYnNlcnZlciIsIm9ic2VydmVyIiwibmV3VmFsIiwib2xkVmFsIiwiaW5pdEJlaGF2aW9ycyIsInZ1ZUJlaGF2aW9ycyIsImJlaGF2aW9ycyIsInZ1ZUV4dGVuZHMiLCJleHRlbmRzIiwidnVlTWl4aW5zIiwidnVlUHJvcHMiLCJwcm9wcyIsImJlaGF2aW9yIiwicHJvcGVydGllcyIsImluaXRQcm9wZXJ0aWVzIiwidnVlTWl4aW4iLCJwYXJzZVByb3BUeXBlIiwiZGVmYXVsdFZhbHVlIiwiZmlsZSIsImlzQmVoYXZpb3IiLCJ2dWVJZCIsInNjb3BlZFNsb3RzQ29tcGlsZXIiLCJzZXREYXRhIiwib3B0cyIsIndyYXBwZXIkMSIsIm1wIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJtYXJrZXJJZCIsImdldEV4dHJhVmFsdWUiLCJkYXRhUGF0aHNBcnJheSIsImRhdGFQYXRoQXJyYXkiLCJkYXRhUGF0aCIsInByb3BQYXRoIiwidmFsdWVQYXRoIiwidkZvciIsImlzSW50ZWdlciIsInN1YnN0ciIsIl9fZ2V0X3ZhbHVlIiwidkZvckl0ZW0iLCJ2Rm9yS2V5IiwicHJvY2Vzc0V2ZW50RXh0cmEiLCJleHRyYSIsIl9fYXJnc19fIiwiZXh0cmFPYmoiLCJnZXRPYmpCeUFycmF5IiwiYXJyIiwiZWxlbWVudCIsInByb2Nlc3NFdmVudEFyZ3MiLCJpc0N1c3RvbSIsImlzQ3VzdG9tTVBFdmVudCIsImN1cnJlbnRUYXJnZXQiLCJyZXQiLCJhcmciLCJPTkNFIiwiQ1VTVE9NIiwiaXNNYXRjaEV2ZW50VHlwZSIsImV2ZW50VHlwZSIsIm9wdFR5cGUiLCJnZXRDb250ZXh0Vm0iLCIkcGFyZW50IiwiJG9wdGlvbnMiLCJnZW5lcmljIiwiaGFuZGxlRXZlbnQiLCJldmVudE9wdHMiLCJldmVudE9wdCIsImV2ZW50c0FycmF5IiwiaXNPbmNlIiwiZXZlbnRBcnJheSIsImhhbmRsZXJDdHgiLCJoYW5kbGVyIiwicGF0aCIsImlzIiwib25jZSIsImluaXRFdmVudENoYW5uZWwkMSIsImdldE9wZW5lckV2ZW50Q2hhbm5lbCIsIl9fZXZlbnRDaGFubmVsX18iLCJjYWxsSG9vayIsIl9faWRfXyIsImluaXRTY29wZWRTbG90c1BhcmFtcyIsImNlbnRlciIsInBhcmVudHMiLCIkaGFzU2NvcGVkU2xvdHNQYXJhbXMiLCJoYXMiLCIkZ2V0U2NvcGVkU2xvdHNQYXJhbXMiLCJvYmplY3QiLCIkc2V0U2NvcGVkU2xvdHNQYXJhbXMiLCJwcm9wc0RhdGEiLCJkZXN0cm95ZWQiLCJwYXJzZUJhc2VBcHAiLCJzdG9yZSIsIiRzdG9yZSIsIm1wSG9zdCIsIiRpMThuIiwiX2kxOG4iLCJhcHBPcHRpb25zIiwib25MYXVuY2giLCJnbG9iYWxEYXRhIiwiX2lzTW91bnRlZCIsInBhcnNlQXBwIiwicGFyc2VBcHAkMSIsImNyZWF0ZUFwcCIsIkFwcCIsImVuY29kZVJlc2VydmVSRSIsImVuY29kZVJlc2VydmVSZXBsYWNlciIsImNvbW1hUkUiLCJlbmNvZGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzdHJpbmdpZnlRdWVyeSIsImVuY29kZVN0ciIsInZhbCIsInZhbDIiLCJ4IiwicGFyc2VCYXNlQ29tcG9uZW50IiwidnVlQ29tcG9uZW50T3B0aW9ucyIsIm5lZWRWdWVPcHRpb25zIiwibXVsdGlwbGVTbG90cyIsImFkZEdsb2JhbENsYXNzIiwiY29tcG9uZW50T3B0aW9ucyIsIl9fZmlsZSIsImxpZmV0aW1lcyIsImF0dGFjaGVkIiwiJG1vdW50IiwicmVhZHkiLCJkZXRhY2hlZCIsIiRkZXN0cm95IiwicGFnZUxpZmV0aW1lcyIsInNob3ciLCJoaWRlIiwicmVzaXplIiwic2l6ZSIsIl9fbCIsIl9fZSIsImV4dGVybmFsQ2xhc3NlcyIsInd4c0NhbGxNZXRob2RzIiwiY2FsbE1ldGhvZCIsInBhcnNlQ29tcG9uZW50IiwiZml4U2V0RGF0YVN0YXJ0Iiwic2V0RGF0YUFyZ3MiLCJfX2ZpeEluaXREYXRhIiwiZ3JvdXBTZXREYXRhIiwiZml4U2V0RGF0YUVuZCIsInBhcnNlQ29tcG9uZW50JDEiLCJvbGRBdHRhY2hlZCIsInNldFRpbWVvdXQiLCJob29rcyQxIiwicGFyc2VCYXNlUGFnZSIsInZ1ZVBhZ2VPcHRpb25zIiwicGFnZU9wdGlvbnMiLCJvbkxvYWQiLCJxdWVyeSIsImNvcHlRdWVyeSIsInBhcnNlUGFnZSIsInBhcnNlUGFnZSQxIiwiY3JlYXRlUGFnZSIsImNyZWF0ZUNvbXBvbmVudCIsImNyZWF0ZVN1YnBhY2thZ2VBcHAiLCJvblNob3ciLCJvbkFwcFNob3ciLCJvbkhpZGUiLCJvbkFwcEhpZGUiLCJnZXRMYXVuY2hPcHRpb25zU3luYyIsImNyZWF0ZVBsdWdpbiIsImNhbklVc2VBcGkiLCJhcGlOYW1lIiwidW5pIiwiUHJveHkiLCJ1bmkkMSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfX2VzTW9kdWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsImFycmF5V2l0aEhvbGVzIiwicmVxdWlyZSIsIml0ZXJhYmxlVG9BcnJheUxpbWl0IiwidW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJub25JdGVyYWJsZVJlc3QiLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsIl9lIiwiX3giLCJfciIsIl9hcnIiLCJfbiIsIl9kIiwibmV4dCIsImRvbmUiLCJhcnJheUxpa2VUb0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibyIsIm1pbkxlbiIsIm4iLCJmcm9tIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJhcnIyIiwiX25vbkl0ZXJhYmxlUmVzdCIsIlR5cGVFcnJvciIsInRvUHJvcGVydHlLZXkiLCJfZGVmaW5lUHJvcGVydHkiLCJ3cml0YWJsZSIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIl90b1Byb3BlcnR5S2V5IiwiX3RvUHJpbWl0aXZlIiwiaW5wdXQiLCJoaW50IiwicHJpbSIsInNldFByb3RvdHlwZU9mIiwiaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiX2NvbnN0cnVjdCIsIlBhcmVudCIsIkNsYXNzIiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsImJpbmQiLCJhIiwiQ29uc3RydWN0b3IiLCJGdW5jdGlvbiIsImluc3RhbmNlIiwiX3NldFByb3RvdHlwZU9mIiwicCIsIl9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJzaGFtIiwidmFsdWVPZiIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiZGVzY3JpcHRvciIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsImFycmF5V2l0aG91dEhvbGVzIiwiaXRlcmFibGVUb0FycmF5Iiwibm9uSXRlcmFibGVTcHJlYWQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfYXJyYXlXaXRob3V0SG9sZXMiLCJfaXRlcmFibGVUb0FycmF5IiwiaXRlciIsIl9ub25JdGVyYWJsZVNwcmVhZCIsImRlZmF1bHREZWxpbWl0ZXJzIiwiQmFzZUZvcm1hdHRlciIsIl9jYWNoZXMiLCJkZWxpbWl0ZXJzIiwidG9rZW5zIiwiY29tcGlsZSIsIlJFX1RPS0VOX0xJU1RfVkFMVUUiLCJSRV9UT0tFTl9OQU1FRF9WQUxVRSIsImZvcm1hdCIsInN0YXJ0RGVsaW1pdGVyIiwiZW5kRGVsaW1pdGVyIiwicG9zaXRpb24iLCJ0ZXh0IiwiY2hhciIsInN1YiIsImlzQ2xvc2VkIiwiY29tcGlsZWQiLCJtb2RlIiwiZGVmYXVsdEZvcm1hdHRlciIsIkkxOG4iLCJmYWxsYmFja0xvY2FsZSIsIndhdGNoZXIiLCJmb3JtYXRlciIsIndhdGNoZXJzIiwib3ZlcnJpZGUiLCJpbnRlcnBvbGF0ZSIsIndhdGNoQXBwTG9jYWxlIiwibmV3TG9jYWxlIiwiJHdhdGNoIiwiZ2V0RGVmYXVsdExvY2FsZSIsImlzV2F0Y2hlZEFwcExvY2FsZSIsImYiLCJhZGQiLCJpc1N0cmluZyIsImhhc0kxOG5Kc29uIiwianNvbk9iaiIsIndhbGtKc29uT2JqIiwiaXNJMThuU3RyIiwicGFyc2VJMThuSnNvbiIsImNvbXBpbGVTdHIiLCJjb21waWxlSTE4bkpzb25TdHIiLCJqc29uU3RyIiwibG9jYWxlVmFsdWVzIiwidW5zaGlmdCIsImNvbXBpbGVKc29uT2JqIiwiY29tcGlsZVZhbHVlIiwidmFsdWVMb2NhbGVzIiwibG9jYWxWYWx1ZSIsIndhbGsiLCJyZXNvbHZlTG9jYWxlIiwicmVzb2x2ZUxvY2FsZUNoYWluIiwiY2hhaW4iLCJwb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUFzQjtBQUFBO0FBRXRCLElBQUlBLFFBQVE7QUFFWixJQUFNQyxHQUFHLEdBQUcsbUVBQW1FO0FBQy9FLElBQU1DLEtBQUssR0FBRyxzRUFBc0U7QUFFcEYsSUFBSSxPQUFPQyxJQUFJLEtBQUssVUFBVSxFQUFFO0VBQzlCSCxRQUFRLEdBQUcsa0JBQVVJLEdBQUcsRUFBRTtJQUN4QkEsR0FBRyxHQUFHQyxNQUFNLENBQUNELEdBQUcsQ0FBQyxDQUFDRSxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQztJQUM5QyxJQUFJLENBQUNKLEtBQUssQ0FBQ0ssSUFBSSxDQUFDSCxHQUFHLENBQUMsRUFBRTtNQUFFLE1BQU0sSUFBSUksS0FBSyxDQUFDLDBGQUEwRixDQUFDO0lBQUM7O0lBRXBJO0lBQ0FKLEdBQUcsSUFBSSxJQUFJLENBQUNLLEtBQUssQ0FBQyxDQUFDLElBQUlMLEdBQUcsQ0FBQ00sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUlDLE1BQU07SUFBRSxJQUFJQyxNQUFNLEdBQUcsRUFBRTtJQUFFLElBQUlDLEVBQUU7SUFBRSxJQUFJQyxFQUFFO0lBQUUsSUFBSUMsQ0FBQyxHQUFHLENBQUM7SUFDdEQsT0FBT0EsQ0FBQyxHQUFHWCxHQUFHLENBQUNNLE1BQU0sR0FBRztNQUN0QkMsTUFBTSxHQUFHVixHQUFHLENBQUNlLE9BQU8sQ0FBQ1osR0FBRyxDQUFDYSxNQUFNLENBQUNGLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUdkLEdBQUcsQ0FBQ2UsT0FBTyxDQUFDWixHQUFHLENBQUNhLE1BQU0sQ0FBQ0YsQ0FBQyxFQUFF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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssR0FBRztBQUNSO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7O0FBRUEsSUFBSSxJQUFxQztBQUN6QztBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHVDQUF1Qyx3QkFBd0IsRUFBRTtBQUNqRSwwQkFBMEI7O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQyxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSx3Q0FBd0MsRUFBRTtBQUMxQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixvQkFBb0IsRUFBRTtBQUNyRDtBQUNBLGtDQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsU0FBUyxxQkFBcUI7O0FBRXhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE9BQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsS0FBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksS0FBcUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxLQUFxQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFxQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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M0I7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUVRO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQXFDO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCOztBQUUxQixrQkFBa0I7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sSUFBcUM7QUFDM0M7QUFDQTtBQUNBOztB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Q0E7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUssTUFBTSxFQUVOO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxLQUFxQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLEtBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFVBQVUsSUFBcUM7QUFDcEQ7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDhCQUE4QjtBQUM5QixNQUFNLElBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxLQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0EsS0FBSyxNQUFNLEVBRU47QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxzQ0FBc0M7QUFDdEMsOEM7O0FBRUE7QUFDQSxRQUFRLEtBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLEtBQXFDO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxZQUFZLEtBQXFDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsMkJBQTJCLEVBQUU7QUFDdkUsS0FBSztBQUNMO0FBQ0EsMENBQTBDLDRCQUE0QixFQUFFO0FBQ3hFLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZUFBZTtBQUM5QyxNQUFNLElBQXFDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVksdUlBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxnQ0FBZ0MsRUFBRTtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsdUlBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxXQUFXLHVJQUFXO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QiwwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsVUFBVSx1SUFBVztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0EsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxxREFBcUQsRUFBRSxTQUFTO0FBQ3RIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsT0FBTztBQUN4QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtDQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFZSxrRUFBRyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNzdMbkI7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb21tb24vdmVuZG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdFZ1ZUkxOG4gfSBmcm9tICdAZGNsb3VkaW8vdW5pLWkxOG4nO1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuXG5sZXQgcmVhbEF0b2I7XG5cbmNvbnN0IGI2NCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5jb25zdCBiNjRyZSA9IC9eKD86W0EtWmEtelxcZCsvXXs0fSkqPyg/OltBLVphLXpcXGQrL117Mn0oPzo9PSk/fFtBLVphLXpcXGQrL117M309Pyk/JC87XG5cbmlmICh0eXBlb2YgYXRvYiAhPT0gJ2Z1bmN0aW9uJykge1xuICByZWFsQXRvYiA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBzdHIgPSBTdHJpbmcoc3RyKS5yZXBsYWNlKC9bXFx0XFxuXFxmXFxyIF0rL2csICcnKTtcbiAgICBpZiAoIWI2NHJlLnRlc3Qoc3RyKSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZXhlY3V0ZSAnYXRvYicgb24gJ1dpbmRvdyc6IFRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuXCIpIH1cblxuICAgIC8vIEFkZGluZyB0aGUgcGFkZGluZyBpZiBtaXNzaW5nLCBmb3Igc2VtcGxpY2l0eVxuICAgIHN0ciArPSAnPT0nLnNsaWNlKDIgLSAoc3RyLmxlbmd0aCAmIDMpKTtcbiAgICB2YXIgYml0bWFwOyB2YXIgcmVzdWx0ID0gJyc7IHZhciByMTsgdmFyIHIyOyB2YXIgaSA9IDA7XG4gICAgZm9yICg7IGkgPCBzdHIubGVuZ3RoOykge1xuICAgICAgYml0bWFwID0gYjY0LmluZGV4T2Yoc3RyLmNoYXJBdChpKyspKSA8PCAxOCB8IGI2NC5pbmRleE9mKHN0ci5jaGFyQXQoaSsrKSkgPDwgMTIgfFxuICAgICAgICAgICAgICAgICAgICAocjEgPSBiNjQuaW5kZXhPZihzdHIuY2hhckF0KGkrKykpKSA8PCA2IHwgKHIyID0gYjY0LmluZGV4T2Yoc3RyLmNoYXJBdChpKyspKSk7XG5cbiAgICAgIHJlc3VsdCArPSByMSA9PT0gNjQgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdG1hcCA+PiAxNiAmIDI1NSlcbiAgICAgICAgOiByMiA9PT0gNjQgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdG1hcCA+PiAxNiAmIDI1NSwgYml0bWFwID4+IDggJiAyNTUpXG4gICAgICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdG1hcCA+PiAxNiAmIDI1NSwgYml0bWFwID4+IDggJiAyNTUsIGJpdG1hcCAmIDI1NSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIOazqOaEj2F0b2Llj6rog73lnKjlhajlsYDlr7nosaHkuIrosIPnlKjvvIzkvovlpoLvvJpgY29uc3QgQmFzZTY0ID0ge2F0b2J9O0Jhc2U2NC5hdG9iKCd4eHh4Jylg5piv6ZSZ6K+v55qE55So5rOVXG4gIHJlYWxBdG9iID0gYXRvYjtcbn1cblxuZnVuY3Rpb24gYjY0RGVjb2RlVW5pY29kZSAoc3RyKSB7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVhbEF0b2Ioc3RyKS5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpXG4gIH0pLmpvaW4oJycpKVxufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50VXNlckluZm8gKCkge1xuICBjb25zdCB0b2tlbiA9ICgga3MpLmdldFN0b3JhZ2VTeW5jKCd1bmlfaWRfdG9rZW4nKSB8fCAnJztcbiAgY29uc3QgdG9rZW5BcnIgPSB0b2tlbi5zcGxpdCgnLicpO1xuICBpZiAoIXRva2VuIHx8IHRva2VuQXJyLmxlbmd0aCAhPT0gMykge1xuICAgIHJldHVybiB7XG4gICAgICB1aWQ6IG51bGwsXG4gICAgICByb2xlOiBbXSxcbiAgICAgIHBlcm1pc3Npb246IFtdLFxuICAgICAgdG9rZW5FeHBpcmVkOiAwXG4gICAgfVxuICB9XG4gIGxldCB1c2VySW5mbztcbiAgdHJ5IHtcbiAgICB1c2VySW5mbyA9IEpTT04ucGFyc2UoYjY0RGVjb2RlVW5pY29kZSh0b2tlbkFyclsxXSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcign6I635Y+W5b2T5YmN55So5oi35L+h5oGv5Ye66ZSZ77yM6K+m57uG6ZSZ6K+v5L+h5oGv5Li677yaJyArIGVycm9yLm1lc3NhZ2UpXG4gIH1cbiAgdXNlckluZm8udG9rZW5FeHBpcmVkID0gdXNlckluZm8uZXhwICogMTAwMDtcbiAgZGVsZXRlIHVzZXJJbmZvLmV4cDtcbiAgZGVsZXRlIHVzZXJJbmZvLmlhdDtcbiAgcmV0dXJuIHVzZXJJbmZvXG59XG5cbmZ1bmN0aW9uIHVuaUlkTWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLnVuaUlESGFzUm9sZSA9IGZ1bmN0aW9uIChyb2xlSWQpIHtcbiAgICBjb25zdCB7XG4gICAgICByb2xlXG4gICAgfSA9IGdldEN1cnJlbnRVc2VySW5mbygpO1xuICAgIHJldHVybiByb2xlLmluZGV4T2Yocm9sZUlkKSA+IC0xXG4gIH07XG4gIFZ1ZS5wcm90b3R5cGUudW5pSURIYXNQZXJtaXNzaW9uID0gZnVuY3Rpb24gKHBlcm1pc3Npb25JZCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHBlcm1pc3Npb25cbiAgICB9ID0gZ2V0Q3VycmVudFVzZXJJbmZvKCk7XG4gICAgcmV0dXJuIHRoaXMudW5pSURIYXNSb2xlKCdhZG1pbicpIHx8IHBlcm1pc3Npb24uaW5kZXhPZihwZXJtaXNzaW9uSWQpID4gLTFcbiAgfTtcbiAgVnVlLnByb3RvdHlwZS51bmlJRFRva2VuVmFsaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdG9rZW5FeHBpcmVkXG4gICAgfSA9IGdldEN1cnJlbnRVc2VySW5mbygpO1xuICAgIHJldHVybiB0b2tlbkV4cGlyZWQgPiBEYXRlLm5vdygpXG4gIH07XG59XG5cbmNvbnN0IF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzRm4gKGZuKSB7XG4gIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gaXNTdHIgKHN0cikge1xuICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZydcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaGFzT3duIChvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7IH1cblxuLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhY2hlZCAoZm4pIHtcbiAgY29uc3QgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl07XG4gICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXG4gIH1cbn1cblxuLyoqXG4gKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxpbWl0ZWQgc3RyaW5nLlxuICovXG5jb25zdCBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xuY29uc3QgY2FtZWxpemUgPSBjYWNoZWQoKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxpemVSRSwgKF8sIGMpID0+IGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJylcbn0pO1xuXG5jb25zdCBIT09LUyA9IFtcbiAgJ2ludm9rZScsXG4gICdzdWNjZXNzJyxcbiAgJ2ZhaWwnLFxuICAnY29tcGxldGUnLFxuICAncmV0dXJuVmFsdWUnXG5dO1xuXG5jb25zdCBnbG9iYWxJbnRlcmNlcHRvcnMgPSB7fTtcbmNvbnN0IHNjb3BlZEludGVyY2VwdG9ycyA9IHt9O1xuXG5mdW5jdGlvbiBtZXJnZUhvb2sgKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgY29uc3QgcmVzID0gY2hpbGRWYWxcbiAgICA/IHBhcmVudFZhbFxuICAgICAgPyBwYXJlbnRWYWwuY29uY2F0KGNoaWxkVmFsKVxuICAgICAgOiBBcnJheS5pc0FycmF5KGNoaWxkVmFsKVxuICAgICAgICA/IGNoaWxkVmFsIDogW2NoaWxkVmFsXVxuICAgIDogcGFyZW50VmFsO1xuICByZXR1cm4gcmVzXG4gICAgPyBkZWR1cGVIb29rcyhyZXMpXG4gICAgOiByZXNcbn1cblxuZnVuY3Rpb24gZGVkdXBlSG9va3MgKGhvb2tzKSB7XG4gIGNvbnN0IHJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJlcy5pbmRleE9mKGhvb2tzW2ldKSA9PT0gLTEpIHtcbiAgICAgIHJlcy5wdXNoKGhvb2tzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiByZW1vdmVIb29rIChob29rcywgaG9vaykge1xuICBjb25zdCBpbmRleCA9IGhvb2tzLmluZGV4T2YoaG9vayk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBob29rcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlSW50ZXJjZXB0b3JIb29rIChpbnRlcmNlcHRvciwgb3B0aW9uKSB7XG4gIE9iamVjdC5rZXlzKG9wdGlvbikuZm9yRWFjaChob29rID0+IHtcbiAgICBpZiAoSE9PS1MuaW5kZXhPZihob29rKSAhPT0gLTEgJiYgaXNGbihvcHRpb25baG9va10pKSB7XG4gICAgICBpbnRlcmNlcHRvcltob29rXSA9IG1lcmdlSG9vayhpbnRlcmNlcHRvcltob29rXSwgb3B0aW9uW2hvb2tdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVJbnRlcmNlcHRvckhvb2sgKGludGVyY2VwdG9yLCBvcHRpb24pIHtcbiAgaWYgKCFpbnRlcmNlcHRvciB8fCAhb3B0aW9uKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgT2JqZWN0LmtleXMob3B0aW9uKS5mb3JFYWNoKGhvb2sgPT4ge1xuICAgIGlmIChIT09LUy5pbmRleE9mKGhvb2spICE9PSAtMSAmJiBpc0ZuKG9wdGlvbltob29rXSkpIHtcbiAgICAgIHJlbW92ZUhvb2soaW50ZXJjZXB0b3JbaG9va10sIG9wdGlvbltob29rXSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkSW50ZXJjZXB0b3IgKG1ldGhvZCwgb3B0aW9uKSB7XG4gIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJyAmJiBpc1BsYWluT2JqZWN0KG9wdGlvbikpIHtcbiAgICBtZXJnZUludGVyY2VwdG9ySG9vayhzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXSB8fCAoc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF0gPSB7fSksIG9wdGlvbik7XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChtZXRob2QpKSB7XG4gICAgbWVyZ2VJbnRlcmNlcHRvckhvb2soZ2xvYmFsSW50ZXJjZXB0b3JzLCBtZXRob2QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUludGVyY2VwdG9yIChtZXRob2QsIG9wdGlvbikge1xuICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb24pKSB7XG4gICAgICByZW1vdmVJbnRlcmNlcHRvckhvb2soc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF0sIG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBzY29wZWRJbnRlcmNlcHRvcnNbbWV0aG9kXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChtZXRob2QpKSB7XG4gICAgcmVtb3ZlSW50ZXJjZXB0b3JIb29rKGdsb2JhbEludGVyY2VwdG9ycywgbWV0aG9kKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVySG9vayAoaG9vaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXR1cm4gaG9vayhkYXRhKSB8fCBkYXRhXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQcm9taXNlIChvYmopIHtcbiAgcmV0dXJuICEhb2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbidcbn1cblxuZnVuY3Rpb24gcXVldWUgKGhvb2tzLCBkYXRhKSB7XG4gIGxldCBwcm9taXNlID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBob29rID0gaG9va3NbaV07XG4gICAgaWYgKHByb21pc2UpIHtcbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUod3JhcHBlckhvb2soaG9vaykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXMgPSBob29rKGRhdGEpO1xuICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGhlbiAoKSB7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvbWlzZSB8fCB7XG4gICAgdGhlbiAoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyT3B0aW9ucyAoaW50ZXJjZXB0b3IsIG9wdGlvbnMgPSB7fSkge1xuICBbJ3N1Y2Nlc3MnLCAnZmFpbCcsICdjb21wbGV0ZSddLmZvckVhY2gobmFtZSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW50ZXJjZXB0b3JbbmFtZV0pKSB7XG4gICAgICBjb25zdCBvbGRDYWxsYmFjayA9IG9wdGlvbnNbbmFtZV07XG4gICAgICBvcHRpb25zW25hbWVdID0gZnVuY3Rpb24gY2FsbGJhY2tJbnRlcmNlcHRvciAocmVzKSB7XG4gICAgICAgIHF1ZXVlKGludGVyY2VwdG9yW25hbWVdLCByZXMpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuICAgICAgICAgIHJldHVybiBpc0ZuKG9sZENhbGxiYWNrKSAmJiBvbGRDYWxsYmFjayhyZXMpIHx8IHJlc1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9wdGlvbnNcbn1cblxuZnVuY3Rpb24gd3JhcHBlclJldHVyblZhbHVlIChtZXRob2QsIHJldHVyblZhbHVlKSB7XG4gIGNvbnN0IHJldHVyblZhbHVlSG9va3MgPSBbXTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZ2xvYmFsSW50ZXJjZXB0b3JzLnJldHVyblZhbHVlKSkge1xuICAgIHJldHVyblZhbHVlSG9va3MucHVzaCguLi5nbG9iYWxJbnRlcmNlcHRvcnMucmV0dXJuVmFsdWUpO1xuICB9XG4gIGNvbnN0IGludGVyY2VwdG9yID0gc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF07XG4gIGlmIChpbnRlcmNlcHRvciAmJiBBcnJheS5pc0FycmF5KGludGVyY2VwdG9yLnJldHVyblZhbHVlKSkge1xuICAgIHJldHVyblZhbHVlSG9va3MucHVzaCguLi5pbnRlcmNlcHRvci5yZXR1cm5WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuVmFsdWVIb29rcy5mb3JFYWNoKGhvb2sgPT4ge1xuICAgIHJldHVyblZhbHVlID0gaG9vayhyZXR1cm5WYWx1ZSkgfHwgcmV0dXJuVmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmV0dXJuVmFsdWVcbn1cblxuZnVuY3Rpb24gZ2V0QXBpSW50ZXJjZXB0b3JIb29rcyAobWV0aG9kKSB7XG4gIGNvbnN0IGludGVyY2VwdG9yID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgT2JqZWN0LmtleXMoZ2xvYmFsSW50ZXJjZXB0b3JzKS5mb3JFYWNoKGhvb2sgPT4ge1xuICAgIGlmIChob29rICE9PSAncmV0dXJuVmFsdWUnKSB7XG4gICAgICBpbnRlcmNlcHRvcltob29rXSA9IGdsb2JhbEludGVyY2VwdG9yc1tob29rXS5zbGljZSgpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHNjb3BlZEludGVyY2VwdG9yID0gc2NvcGVkSW50ZXJjZXB0b3JzW21ldGhvZF07XG4gIGlmIChzY29wZWRJbnRlcmNlcHRvcikge1xuICAgIE9iamVjdC5rZXlzKHNjb3BlZEludGVyY2VwdG9yKS5mb3JFYWNoKGhvb2sgPT4ge1xuICAgICAgaWYgKGhvb2sgIT09ICdyZXR1cm5WYWx1ZScpIHtcbiAgICAgICAgaW50ZXJjZXB0b3JbaG9va10gPSAoaW50ZXJjZXB0b3JbaG9va10gfHwgW10pLmNvbmNhdChzY29wZWRJbnRlcmNlcHRvcltob29rXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGludGVyY2VwdG9yXG59XG5cbmZ1bmN0aW9uIGludm9rZUFwaSAobWV0aG9kLCBhcGksIG9wdGlvbnMsIC4uLnBhcmFtcykge1xuICBjb25zdCBpbnRlcmNlcHRvciA9IGdldEFwaUludGVyY2VwdG9ySG9va3MobWV0aG9kKTtcbiAgaWYgKGludGVyY2VwdG9yICYmIE9iamVjdC5rZXlzKGludGVyY2VwdG9yKS5sZW5ndGgpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbnRlcmNlcHRvci5pbnZva2UpKSB7XG4gICAgICBjb25zdCByZXMgPSBxdWV1ZShpbnRlcmNlcHRvci5pbnZva2UsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHJlcy50aGVuKChvcHRpb25zKSA9PiB7XG4gICAgICAgIHJldHVybiBhcGkod3JhcHBlck9wdGlvbnMoaW50ZXJjZXB0b3IsIG9wdGlvbnMpLCAuLi5wYXJhbXMpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXBpKHdyYXBwZXJPcHRpb25zKGludGVyY2VwdG9yLCBvcHRpb25zKSwgLi4ucGFyYW1zKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXBpKG9wdGlvbnMsIC4uLnBhcmFtcylcbn1cblxuY29uc3QgcHJvbWlzZUludGVyY2VwdG9yID0ge1xuICByZXR1cm5WYWx1ZSAocmVzKSB7XG4gICAgaWYgKCFpc1Byb21pc2UocmVzKSkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlc1swXSkge1xuICAgICAgICAgIHJlamVjdChyZXNbMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVzWzFdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbiAgfVxufTtcblxuY29uc3QgU1lOQ19BUElfUkUgPVxuICAvXlxcJHxXaW5kb3ckfFdpbmRvd1N0eWxlJHxzZW5kSG9zdEV2ZW50fHNlbmROYXRpdmVFdmVudHxyZXN0b3JlR2xvYmFsfHJlcXVpcmVHbG9iYWx8Z2V0Q3VycmVudFN1Yk5WdWV8Z2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdHxecmVwb3J0fGludGVyY2VwdG9yc3xJbnRlcmNlcHRvciR8Z2V0U3ViTlZ1ZUJ5SWR8cmVxdWlyZU5hdGl2ZVBsdWdpbnx1cHgycHh8aGlkZUtleWJvYXJkfGNhbklVc2V8XmNyZWF0ZXxTeW5jJHxNYW5hZ2VyJHxiYXNlNjRUb0FycmF5QnVmZmVyfGFycmF5QnVmZmVyVG9CYXNlNjR8Z2V0TG9jYWxlfHNldExvY2FsZXxpbnZva2VQdXNoQ2FsbGJhY2t8Z2V0V2luZG93SW5mb3xnZXREZXZpY2VJbmZvfGdldEFwcEJhc2VJbmZvfGdldFN5c3RlbVNldHRpbmd8Z2V0QXBwQXV0aG9yaXplU2V0dGluZy87XG5cbmNvbnN0IENPTlRFWFRfQVBJX1JFID0gL15jcmVhdGV8TWFuYWdlciQvO1xuXG4vLyBDb250ZXh05L6L5aSW5oOF5Ya1XG5jb25zdCBDT05URVhUX0FQSV9SRV9FWEMgPSBbJ2NyZWF0ZUJMRUNvbm5lY3Rpb24nXTtcblxuLy8g5ZCM5q2l5L6L5aSW5oOF5Ya1XG5jb25zdCBBU1lOQ19BUEkgPSBbJ2NyZWF0ZUJMRUNvbm5lY3Rpb24nLCAnY3JlYXRlUHVzaE1lc3NhZ2UnXTtcblxuY29uc3QgQ0FMTEJBQ0tfQVBJX1JFID0gL15vbnxeb2ZmLztcblxuZnVuY3Rpb24gaXNDb250ZXh0QXBpIChuYW1lKSB7XG4gIHJldHVybiBDT05URVhUX0FQSV9SRS50ZXN0KG5hbWUpICYmIENPTlRFWFRfQVBJX1JFX0VYQy5pbmRleE9mKG5hbWUpID09PSAtMVxufVxuZnVuY3Rpb24gaXNTeW5jQXBpIChuYW1lKSB7XG4gIHJldHVybiBTWU5DX0FQSV9SRS50ZXN0KG5hbWUpICYmIEFTWU5DX0FQSS5pbmRleE9mKG5hbWUpID09PSAtMVxufVxuXG5mdW5jdGlvbiBpc0NhbGxiYWNrQXBpIChuYW1lKSB7XG4gIHJldHVybiBDQUxMQkFDS19BUElfUkUudGVzdChuYW1lKSAmJiBuYW1lICE9PSAnb25QdXNoJ1xufVxuXG5mdW5jdGlvbiBoYW5kbGVQcm9taXNlIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLnRoZW4oZGF0YSA9PiB7XG4gICAgcmV0dXJuIFtudWxsLCBkYXRhXVxuICB9KVxuICAgIC5jYXRjaChlcnIgPT4gW2Vycl0pXG59XG5cbmZ1bmN0aW9uIHNob3VsZFByb21pc2UgKG5hbWUpIHtcbiAgaWYgKFxuICAgIGlzQ29udGV4dEFwaShuYW1lKSB8fFxuICAgIGlzU3luY0FwaShuYW1lKSB8fFxuICAgIGlzQ2FsbGJhY2tBcGkobmFtZSlcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tZXh0ZW5kLW5hdGl2ZSAqL1xuaWYgKCFQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5KSB7XG4gIFByb21pc2UucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdGhpcy50aGVuKFxuICAgICAgdmFsdWUgPT4gcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oKCkgPT4gdmFsdWUpLFxuICAgICAgcmVhc29uID0+IHByb21pc2UucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhyb3cgcmVhc29uXG4gICAgICB9KVxuICAgIClcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvbWlzaWZ5IChuYW1lLCBhcGkpIHtcbiAgaWYgKCFzaG91bGRQcm9taXNlKG5hbWUpIHx8ICFpc0ZuKGFwaSkpIHtcbiAgICByZXR1cm4gYXBpXG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHByb21pc2VBcGkgKG9wdGlvbnMgPSB7fSwgLi4ucGFyYW1zKSB7XG4gICAgaWYgKGlzRm4ob3B0aW9ucy5zdWNjZXNzKSB8fCBpc0ZuKG9wdGlvbnMuZmFpbCkgfHwgaXNGbihvcHRpb25zLmNvbXBsZXRlKSkge1xuICAgICAgcmV0dXJuIHdyYXBwZXJSZXR1cm5WYWx1ZShuYW1lLCBpbnZva2VBcGkobmFtZSwgYXBpLCBvcHRpb25zLCAuLi5wYXJhbXMpKVxuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlclJldHVyblZhbHVlKG5hbWUsIGhhbmRsZVByb21pc2UobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaW52b2tlQXBpKG5hbWUsIGFwaSwgT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICBzdWNjZXNzOiByZXNvbHZlLFxuICAgICAgICBmYWlsOiByZWplY3RcbiAgICAgIH0pLCAuLi5wYXJhbXMpO1xuICAgIH0pKSlcbiAgfVxufVxuXG5jb25zdCBFUFMgPSAxZS00O1xuY29uc3QgQkFTRV9ERVZJQ0VfV0lEVEggPSA3NTA7XG5sZXQgaXNJT1MgPSBmYWxzZTtcbmxldCBkZXZpY2VXaWR0aCA9IDA7XG5sZXQgZGV2aWNlRFBSID0gMDtcblxuZnVuY3Rpb24gY2hlY2tEZXZpY2VXaWR0aCAoKSB7XG4gIGNvbnN0IHtcbiAgICBwbGF0Zm9ybSxcbiAgICBwaXhlbFJhdGlvLFxuICAgIHdpbmRvd1dpZHRoXG4gIH0gPSBrcy5nZXRTeXN0ZW1JbmZvU3luYygpOyAvLyB1bmk9PmtzIHJ1bnRpbWUg57yW6K+R55uu5qCH5pivIHVuaSDlr7nosaHvvIzlhoXpg6jkuI3lhYHorrjnm7TmjqXkvb/nlKggdW5pXG5cbiAgZGV2aWNlV2lkdGggPSB3aW5kb3dXaWR0aDtcbiAgZGV2aWNlRFBSID0gcGl4ZWxSYXRpbztcbiAgaXNJT1MgPSBwbGF0Zm9ybSA9PT0gJ2lvcyc7XG59XG5cbmZ1bmN0aW9uIHVweDJweCAobnVtYmVyLCBuZXdEZXZpY2VXaWR0aCkge1xuICBpZiAoZGV2aWNlV2lkdGggPT09IDApIHtcbiAgICBjaGVja0RldmljZVdpZHRoKCk7XG4gIH1cblxuICBudW1iZXIgPSBOdW1iZXIobnVtYmVyKTtcbiAgaWYgKG51bWJlciA9PT0gMCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgbGV0IHJlc3VsdCA9IChudW1iZXIgLyBCQVNFX0RFVklDRV9XSURUSCkgKiAobmV3RGV2aWNlV2lkdGggfHwgZGV2aWNlV2lkdGgpO1xuICBpZiAocmVzdWx0IDwgMCkge1xuICAgIHJlc3VsdCA9IC1yZXN1bHQ7XG4gIH1cbiAgcmVzdWx0ID0gTWF0aC5mbG9vcihyZXN1bHQgKyBFUFMpO1xuICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgaWYgKGRldmljZURQUiA9PT0gMSB8fCAhaXNJT1MpIHtcbiAgICAgIHJlc3VsdCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IDAuNTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciA8IDAgPyAtcmVzdWx0IDogcmVzdWx0XG59XG5cbmNvbnN0IExPQ0FMRV9aSF9IQU5TID0gJ3poLUhhbnMnO1xuY29uc3QgTE9DQUxFX1pIX0hBTlQgPSAnemgtSGFudCc7XG5jb25zdCBMT0NBTEVfRU4gPSAnZW4nO1xuY29uc3QgTE9DQUxFX0ZSID0gJ2ZyJztcbmNvbnN0IExPQ0FMRV9FUyA9ICdlcyc7XG5cbmNvbnN0IG1lc3NhZ2VzID0ge307XG5cbmxldCBsb2NhbGU7XG5cbntcbiAgbG9jYWxlID0gbm9ybWFsaXplTG9jYWxlKGtzLmdldFN5c3RlbUluZm9TeW5jKCkubGFuZ3VhZ2UpIHx8IExPQ0FMRV9FTjtcbn1cblxuZnVuY3Rpb24gaW5pdEkxOG5NZXNzYWdlcyAoKSB7XG4gIGlmICghaXNFbmFibGVMb2NhbGUoKSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGxvY2FsZUtleXMgPSBPYmplY3Qua2V5cyhfX3VuaUNvbmZpZy5sb2NhbGVzKTtcbiAgaWYgKGxvY2FsZUtleXMubGVuZ3RoKSB7XG4gICAgbG9jYWxlS2V5cy5mb3JFYWNoKChsb2NhbGUpID0+IHtcbiAgICAgIGNvbnN0IGN1ck1lc3NhZ2VzID0gbWVzc2FnZXNbbG9jYWxlXTtcbiAgICAgIGNvbnN0IHVzZXJNZXNzYWdlcyA9IF9fdW5pQ29uZmlnLmxvY2FsZXNbbG9jYWxlXTtcbiAgICAgIGlmIChjdXJNZXNzYWdlcykge1xuICAgICAgICBPYmplY3QuYXNzaWduKGN1ck1lc3NhZ2VzLCB1c2VyTWVzc2FnZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZXNbbG9jYWxlXSA9IHVzZXJNZXNzYWdlcztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5pbml0STE4bk1lc3NhZ2VzKCk7XG5cbmNvbnN0IGkxOG4gPSBpbml0VnVlSTE4bihcbiAgbG9jYWxlLFxuICAge31cbik7XG5jb25zdCB0ID0gaTE4bi50O1xuY29uc3QgaTE4bk1peGluID0gKGkxOG4ubWl4aW4gPSB7XG4gIGJlZm9yZUNyZWF0ZSAoKSB7XG4gICAgY29uc3QgdW53YXRjaCA9IGkxOG4uaTE4bi53YXRjaExvY2FsZSgoKSA9PiB7XG4gICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuJG9uY2UoJ2hvb2s6YmVmb3JlRGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVud2F0Y2goKTtcbiAgICB9KTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgICQkdCAoa2V5LCB2YWx1ZXMpIHtcbiAgICAgIHJldHVybiB0KGtleSwgdmFsdWVzKVxuICAgIH1cbiAgfVxufSk7XG5jb25zdCBzZXRMb2NhbGUgPSBpMThuLnNldExvY2FsZTtcbmNvbnN0IGdldExvY2FsZSA9IGkxOG4uZ2V0TG9jYWxlO1xuXG5mdW5jdGlvbiBpbml0QXBwTG9jYWxlIChWdWUsIGFwcFZtLCBsb2NhbGUpIHtcbiAgY29uc3Qgc3RhdGUgPSBWdWUub2JzZXJ2YWJsZSh7XG4gICAgbG9jYWxlOiBsb2NhbGUgfHwgaTE4bi5nZXRMb2NhbGUoKVxuICB9KTtcbiAgY29uc3QgbG9jYWxlV2F0Y2hlcnMgPSBbXTtcbiAgYXBwVm0uJHdhdGNoTG9jYWxlID0gZm4gPT4ge1xuICAgIGxvY2FsZVdhdGNoZXJzLnB1c2goZm4pO1xuICB9O1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXBwVm0sICckbG9jYWxlJywge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gc3RhdGUubG9jYWxlXG4gICAgfSxcbiAgICBzZXQgKHYpIHtcbiAgICAgIHN0YXRlLmxvY2FsZSA9IHY7XG4gICAgICBsb2NhbGVXYXRjaGVycy5mb3JFYWNoKHdhdGNoID0+IHdhdGNoKHYpKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpc0VuYWJsZUxvY2FsZSAoKSB7XG4gIHJldHVybiB0eXBlb2YgX191bmlDb25maWcgIT09ICd1bmRlZmluZWQnICYmIF9fdW5pQ29uZmlnLmxvY2FsZXMgJiYgISFPYmplY3Qua2V5cyhfX3VuaUNvbmZpZy5sb2NhbGVzKS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gaW5jbHVkZSAoc3RyLCBwYXJ0cykge1xuICByZXR1cm4gISFwYXJ0cy5maW5kKChwYXJ0KSA9PiBzdHIuaW5kZXhPZihwYXJ0KSAhPT0gLTEpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0c1dpdGggKHN0ciwgcGFydHMpIHtcbiAgcmV0dXJuIHBhcnRzLmZpbmQoKHBhcnQpID0+IHN0ci5pbmRleE9mKHBhcnQpID09PSAwKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVMb2NhbGUgKGxvY2FsZSwgbWVzc2FnZXMpIHtcbiAgaWYgKCFsb2NhbGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBsb2NhbGUgPSBsb2NhbGUudHJpbSgpLnJlcGxhY2UoL18vZywgJy0nKTtcbiAgaWYgKG1lc3NhZ2VzICYmIG1lc3NhZ2VzW2xvY2FsZV0pIHtcbiAgICByZXR1cm4gbG9jYWxlXG4gIH1cbiAgbG9jYWxlID0gbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChsb2NhbGUgPT09ICdjaGluZXNlJykge1xuICAgIC8vIOaUr+S7mOWunVxuICAgIHJldHVybiBMT0NBTEVfWkhfSEFOU1xuICB9XG4gIGlmIChsb2NhbGUuaW5kZXhPZignemgnKSA9PT0gMCkge1xuICAgIGlmIChsb2NhbGUuaW5kZXhPZignLWhhbnMnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gTE9DQUxFX1pIX0hBTlNcbiAgICB9XG4gICAgaWYgKGxvY2FsZS5pbmRleE9mKCctaGFudCcpID4gLTEpIHtcbiAgICAgIHJldHVybiBMT0NBTEVfWkhfSEFOVFxuICAgIH1cbiAgICBpZiAoaW5jbHVkZShsb2NhbGUsIFsnLXR3JywgJy1oaycsICctbW8nLCAnLWNodCddKSkge1xuICAgICAgcmV0dXJuIExPQ0FMRV9aSF9IQU5UXG4gICAgfVxuICAgIHJldHVybiBMT0NBTEVfWkhfSEFOU1xuICB9XG4gIGNvbnN0IGxhbmcgPSBzdGFydHNXaXRoKGxvY2FsZSwgW0xPQ0FMRV9FTiwgTE9DQUxFX0ZSLCBMT0NBTEVfRVNdKTtcbiAgaWYgKGxhbmcpIHtcbiAgICByZXR1cm4gbGFuZ1xuICB9XG59XG4vLyBleHBvcnQgZnVuY3Rpb24gaW5pdEkxOG4oKSB7XG4vLyAgIGNvbnN0IGxvY2FsZUtleXMgPSBPYmplY3Qua2V5cyhfX3VuaUNvbmZpZy5sb2NhbGVzIHx8IHt9KVxuLy8gICBpZiAobG9jYWxlS2V5cy5sZW5ndGgpIHtcbi8vICAgICBsb2NhbGVLZXlzLmZvckVhY2goKGxvY2FsZSkgPT5cbi8vICAgICAgIGkxOG4uYWRkKGxvY2FsZSwgX191bmlDb25maWcubG9jYWxlc1tsb2NhbGVdKVxuLy8gICAgIClcbi8vICAgfVxuLy8gfVxuXG5mdW5jdGlvbiBnZXRMb2NhbGUkMSAoKSB7XG4gIC8vIOS8mOWFiOS9v+eUqCAkbG9jYWxlXG4gIGlmIChpc0ZuKGdldEFwcCkpIHtcbiAgICBjb25zdCBhcHAgPSBnZXRBcHAoe1xuICAgICAgYWxsb3dEZWZhdWx0OiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKGFwcCAmJiBhcHAuJHZtKSB7XG4gICAgICByZXR1cm4gYXBwLiR2bS4kbG9jYWxlXG4gICAgfVxuICB9XG4gIHJldHVybiBub3JtYWxpemVMb2NhbGUoa3MuZ2V0U3lzdGVtSW5mb1N5bmMoKS5sYW5ndWFnZSkgfHwgTE9DQUxFX0VOXG59XG5cbmZ1bmN0aW9uIHNldExvY2FsZSQxIChsb2NhbGUpIHtcbiAgY29uc3QgYXBwID0gaXNGbihnZXRBcHApID8gZ2V0QXBwKCkgOiBmYWxzZTtcbiAgaWYgKCFhcHApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBjb25zdCBvbGRMb2NhbGUgPSBhcHAuJHZtLiRsb2NhbGU7XG4gIGlmIChvbGRMb2NhbGUgIT09IGxvY2FsZSkge1xuICAgIGFwcC4kdm0uJGxvY2FsZSA9IGxvY2FsZTtcbiAgICBvbkxvY2FsZUNoYW5nZUNhbGxiYWNrcy5mb3JFYWNoKChmbikgPT4gZm4oe1xuICAgICAgbG9jYWxlXG4gICAgfSkpO1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmNvbnN0IG9uTG9jYWxlQ2hhbmdlQ2FsbGJhY2tzID0gW107XG5mdW5jdGlvbiBvbkxvY2FsZUNoYW5nZSAoZm4pIHtcbiAgaWYgKG9uTG9jYWxlQ2hhbmdlQ2FsbGJhY2tzLmluZGV4T2YoZm4pID09PSAtMSkge1xuICAgIG9uTG9jYWxlQ2hhbmdlQ2FsbGJhY2tzLnB1c2goZm4pO1xuICB9XG59XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBnbG9iYWwuZ2V0TG9jYWxlID0gZ2V0TG9jYWxlJDE7XG59XG5cbmNvbnN0IGludGVyY2VwdG9ycyA9IHtcbiAgcHJvbWlzZUludGVyY2VwdG9yXG59O1xuXG52YXIgYmFzZUFwaSA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgX19wcm90b19fOiBudWxsLFxuICB1cHgycHg6IHVweDJweCxcbiAgZ2V0TG9jYWxlOiBnZXRMb2NhbGUkMSxcbiAgc2V0TG9jYWxlOiBzZXRMb2NhbGUkMSxcbiAgb25Mb2NhbGVDaGFuZ2U6IG9uTG9jYWxlQ2hhbmdlLFxuICBhZGRJbnRlcmNlcHRvcjogYWRkSW50ZXJjZXB0b3IsXG4gIHJlbW92ZUludGVyY2VwdG9yOiByZW1vdmVJbnRlcmNlcHRvcixcbiAgaW50ZXJjZXB0b3JzOiBpbnRlcmNlcHRvcnNcbn0pO1xuXG5jbGFzcyBFdmVudENoYW5uZWwge1xuICBjb25zdHJ1Y3RvciAoaWQsIGV2ZW50cykge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmxpc3RlbmVyID0ge307XG4gICAgdGhpcy5lbWl0Q2FjaGUgPSB7fTtcbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIHRoaXMub24obmFtZSwgZXZlbnRzW25hbWVdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVtaXQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGNvbnN0IGZucyA9IHRoaXMubGlzdGVuZXJbZXZlbnROYW1lXTtcbiAgICBpZiAoIWZucykge1xuICAgICAgcmV0dXJuICh0aGlzLmVtaXRDYWNoZVtldmVudE5hbWVdIHx8ICh0aGlzLmVtaXRDYWNoZVtldmVudE5hbWVdID0gW10pKS5wdXNoKGFyZ3MpXG4gICAgfVxuICAgIGZucy5mb3JFYWNoKG9wdCA9PiB7XG4gICAgICBvcHQuZm4uYXBwbHkob3B0LmZuLCBhcmdzKTtcbiAgICB9KTtcbiAgICB0aGlzLmxpc3RlbmVyW2V2ZW50TmFtZV0gPSBmbnMuZmlsdGVyKG9wdCA9PiBvcHQudHlwZSAhPT0gJ29uY2UnKTtcbiAgfVxuXG4gIG9uIChldmVudE5hbWUsIGZuKSB7XG4gICAgdGhpcy5fYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAnb24nLCBmbik7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShldmVudE5hbWUpO1xuICB9XG5cbiAgb25jZSAoZXZlbnROYW1lLCBmbikge1xuICAgIHRoaXMuX2FkZExpc3RlbmVyKGV2ZW50TmFtZSwgJ29uY2UnLCBmbik7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShldmVudE5hbWUpO1xuICB9XG5cbiAgb2ZmIChldmVudE5hbWUsIGZuKSB7XG4gICAgY29uc3QgZm5zID0gdGhpcy5saXN0ZW5lcltldmVudE5hbWVdO1xuICAgIGlmICghZm5zKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGZuKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZucy5sZW5ndGg7KSB7XG4gICAgICAgIGlmIChmbnNbaV0uZm4gPT09IGZuKSB7XG4gICAgICAgICAgZm5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcltldmVudE5hbWVdO1xuICAgIH1cbiAgfVxuXG4gIF9jbGVhckNhY2hlIChldmVudE5hbWUpIHtcbiAgICBjb25zdCBjYWNoZUFyZ3MgPSB0aGlzLmVtaXRDYWNoZVtldmVudE5hbWVdO1xuICAgIGlmIChjYWNoZUFyZ3MpIHtcbiAgICAgIGZvciAoOyBjYWNoZUFyZ3MubGVuZ3RoID4gMDspIHtcbiAgICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIFtldmVudE5hbWVdLmNvbmNhdChjYWNoZUFyZ3Muc2hpZnQoKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9hZGRMaXN0ZW5lciAoZXZlbnROYW1lLCB0eXBlLCBmbikge1xuICAgICh0aGlzLmxpc3RlbmVyW2V2ZW50TmFtZV0gfHwgKHRoaXMubGlzdGVuZXJbZXZlbnROYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbixcbiAgICAgIHR5cGVcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBldmVudENoYW5uZWxzID0ge307XG5cbmNvbnN0IGV2ZW50Q2hhbm5lbFN0YWNrID0gW107XG5cbmxldCBpZCA9IDA7XG5cbmZ1bmN0aW9uIGluaXRFdmVudENoYW5uZWwgKGV2ZW50cywgY2FjaGUgPSB0cnVlKSB7XG4gIGlkKys7XG4gIGNvbnN0IGV2ZW50Q2hhbm5lbCA9IG5ldyBFdmVudENoYW5uZWwoaWQsIGV2ZW50cyk7XG4gIGlmIChjYWNoZSkge1xuICAgIGV2ZW50Q2hhbm5lbHNbaWRdID0gZXZlbnRDaGFubmVsO1xuICAgIGV2ZW50Q2hhbm5lbFN0YWNrLnB1c2goZXZlbnRDaGFubmVsKTtcbiAgfVxuICByZXR1cm4gZXZlbnRDaGFubmVsXG59XG5cbmZ1bmN0aW9uIGdldEV2ZW50Q2hhbm5lbCAoaWQpIHtcbiAgaWYgKGlkKSB7XG4gICAgY29uc3QgZXZlbnRDaGFubmVsID0gZXZlbnRDaGFubmVsc1tpZF07XG4gICAgZGVsZXRlIGV2ZW50Q2hhbm5lbHNbaWRdO1xuICAgIHJldHVybiBldmVudENoYW5uZWxcbiAgfVxuICByZXR1cm4gZXZlbnRDaGFubmVsU3RhY2suc2hpZnQoKVxufVxuXG52YXIgbmF2aWdhdGVUbyA9IHtcbiAgYXJncyAoZnJvbUFyZ3MsIHRvQXJncykge1xuICAgIGNvbnN0IGlkID0gaW5pdEV2ZW50Q2hhbm5lbChmcm9tQXJncy5ldmVudHMpLmlkO1xuICAgIGlmIChmcm9tQXJncy51cmwpIHtcbiAgICAgIGZyb21BcmdzLnVybCA9IGZyb21BcmdzLnVybCArIChmcm9tQXJncy51cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAnX19pZF9fPScgKyBpZDtcbiAgICB9XG4gIH0sXG4gIHJldHVyblZhbHVlIChmcm9tUmVzLCB0b1Jlcykge1xuICAgIGZyb21SZXMuZXZlbnRDaGFubmVsID0gZ2V0RXZlbnRDaGFubmVsKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGZpbmRFeGlzdHNQYWdlSW5kZXggKHVybCkge1xuICBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICBsZXQgbGVuID0gcGFnZXMubGVuZ3RoO1xuICB3aGlsZSAobGVuLS0pIHtcbiAgICBjb25zdCBwYWdlID0gcGFnZXNbbGVuXTtcbiAgICBpZiAocGFnZS4kcGFnZSAmJiBwYWdlLiRwYWdlLmZ1bGxQYXRoID09PSB1cmwpIHtcbiAgICAgIHJldHVybiBsZW5cbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbnZhciByZWRpcmVjdFRvID0ge1xuICBuYW1lIChmcm9tQXJncykge1xuICAgIGlmIChmcm9tQXJncy5leGlzdHMgPT09ICdiYWNrJyAmJiBmcm9tQXJncy5kZWx0YSkge1xuICAgICAgcmV0dXJuICduYXZpZ2F0ZUJhY2snXG4gICAgfVxuICAgIHJldHVybiAncmVkaXJlY3RUbydcbiAgfSxcbiAgYXJncyAoZnJvbUFyZ3MpIHtcbiAgICBpZiAoZnJvbUFyZ3MuZXhpc3RzID09PSAnYmFjaycgJiYgZnJvbUFyZ3MudXJsKSB7XG4gICAgICBjb25zdCBleGlzdHNQYWdlSW5kZXggPSBmaW5kRXhpc3RzUGFnZUluZGV4KGZyb21BcmdzLnVybCk7XG4gICAgICBpZiAoZXhpc3RzUGFnZUluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBkZWx0YSA9IGdldEN1cnJlbnRQYWdlcygpLmxlbmd0aCAtIDEgLSBleGlzdHNQYWdlSW5kZXg7XG4gICAgICAgIGlmIChkZWx0YSA+IDApIHtcbiAgICAgICAgICBmcm9tQXJncy5kZWx0YSA9IGRlbHRhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgcHJldmlld0ltYWdlID0ge1xuICBhcmdzIChmcm9tQXJncykge1xuICAgIGxldCBjdXJyZW50SW5kZXggPSBwYXJzZUludChmcm9tQXJncy5jdXJyZW50KTtcbiAgICBpZiAoaXNOYU4oY3VycmVudEluZGV4KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHVybHMgPSBmcm9tQXJncy51cmxzO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh1cmxzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGxlbiA9IHVybHMubGVuZ3RoO1xuICAgIGlmICghbGVuKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGN1cnJlbnRJbmRleCA8IDApIHtcbiAgICAgIGN1cnJlbnRJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPj0gbGVuKSB7XG4gICAgICBjdXJyZW50SW5kZXggPSBsZW4gLSAxO1xuICAgIH1cbiAgICBpZiAoY3VycmVudEluZGV4ID4gMCkge1xuICAgICAgZnJvbUFyZ3MuY3VycmVudCA9IHVybHNbY3VycmVudEluZGV4XTtcbiAgICAgIGZyb21BcmdzLnVybHMgPSB1cmxzLmZpbHRlcihcbiAgICAgICAgKGl0ZW0sIGluZGV4KSA9PiBpbmRleCA8IGN1cnJlbnRJbmRleCA/IGl0ZW0gIT09IHVybHNbY3VycmVudEluZGV4XSA6IHRydWVcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21BcmdzLmN1cnJlbnQgPSB1cmxzWzBdO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5kaWNhdG9yOiBmYWxzZSxcbiAgICAgIGxvb3A6IGZhbHNlXG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBVVUlEX0tFWSA9ICdfX0RDX1NUQVRfVVVJRCc7XG5sZXQgZGV2aWNlSWQ7XG5mdW5jdGlvbiB1c2VEZXZpY2VJZCAocmVzdWx0KSB7XG4gIGRldmljZUlkID0gZGV2aWNlSWQgfHwga3MuZ2V0U3RvcmFnZVN5bmMoVVVJRF9LRVkpO1xuICBpZiAoIWRldmljZUlkKSB7XG4gICAgZGV2aWNlSWQgPSBEYXRlLm5vdygpICsgJycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxZTcpO1xuICAgIGtzLnNldFN0b3JhZ2Uoe1xuICAgICAga2V5OiBVVUlEX0tFWSxcbiAgICAgIGRhdGE6IGRldmljZUlkXG4gICAgfSk7XG4gIH1cbiAgcmVzdWx0LmRldmljZUlkID0gZGV2aWNlSWQ7XG59XG5cbmZ1bmN0aW9uIGFkZFNhZmVBcmVhSW5zZXRzIChyZXN1bHQpIHtcbiAgaWYgKHJlc3VsdC5zYWZlQXJlYSkge1xuICAgIGNvbnN0IHNhZmVBcmVhID0gcmVzdWx0LnNhZmVBcmVhO1xuICAgIHJlc3VsdC5zYWZlQXJlYUluc2V0cyA9IHtcbiAgICAgIHRvcDogc2FmZUFyZWEudG9wLFxuICAgICAgbGVmdDogc2FmZUFyZWEubGVmdCxcbiAgICAgIHJpZ2h0OiByZXN1bHQud2luZG93V2lkdGggLSBzYWZlQXJlYS5yaWdodCxcbiAgICAgIGJvdHRvbTogcmVzdWx0LnNjcmVlbkhlaWdodCAtIHNhZmVBcmVhLmJvdHRvbVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVQYXJhbWV0ZXJzIChyZXN1bHQpIHtcbiAgY29uc3Qge1xuICAgIGJyYW5kID0gJycsIG1vZGVsID0gJycsIHN5c3RlbSA9ICcnLFxuICAgIGxhbmd1YWdlID0gJycsIHRoZW1lLCB2ZXJzaW9uLFxuICAgIHBsYXRmb3JtLCBmb250U2l6ZVNldHRpbmcsXG4gICAgU0RLVmVyc2lvbiwgcGl4ZWxSYXRpbywgZGV2aWNlT3JpZW50YXRpb25cbiAgfSA9IHJlc3VsdDtcbiAgLy8gY29uc3QgaXNRdWlja0FwcCA9IFwibXAta3VhaXNob3VcIi5pbmRleE9mKCdxdWlja2FwcC13ZWJ2aWV3JykgIT09IC0xXG5cbiAgLy8gb3NOYW1lIG9zVmVyc2lvblxuICBsZXQgb3NOYW1lID0gJyc7XG4gIGxldCBvc1ZlcnNpb24gPSAnJztcbiAge1xuICAgIG9zTmFtZSA9IHN5c3RlbS5zcGxpdCgnICcpWzBdIHx8ICcnO1xuICAgIG9zVmVyc2lvbiA9IHN5c3RlbS5zcGxpdCgnICcpWzFdIHx8ICcnO1xuICB9XG4gIGxldCBob3N0VmVyc2lvbiA9IHZlcnNpb247XG5cbiAgLy8gZGV2aWNlVHlwZVxuICBjb25zdCBkZXZpY2VUeXBlID0gZ2V0R2V0RGV2aWNlVHlwZShyZXN1bHQsIG1vZGVsKTtcblxuICAvLyBkZXZpY2VNb2RlbFxuICBjb25zdCBkZXZpY2VCcmFuZCA9IGdldERldmljZUJyYW5kKGJyYW5kKTtcblxuICAvLyBob3N0TmFtZVxuICBjb25zdCBfaG9zdE5hbWUgPSBnZXRIb3N0TmFtZShyZXN1bHQpO1xuXG4gIC8vIGRldmljZU9yaWVudGF0aW9uXG4gIGxldCBfZGV2aWNlT3JpZW50YXRpb24gPSBkZXZpY2VPcmllbnRhdGlvbjsgLy8g5LuFIOW+ruS/oSDnmb7luqYg5pSv5oyBXG5cbiAgLy8gZGV2aWNlUGl4ZWxSYXRpb1xuICBsZXQgX2RldmljZVBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvO1xuXG4gIC8vIFNES1ZlcnNpb25cbiAgbGV0IF9TREtWZXJzaW9uID0gU0RLVmVyc2lvbjtcblxuICAvLyBob3N0TGFuZ3VhZ2VcbiAgY29uc3QgaG9zdExhbmd1YWdlID0gbGFuZ3VhZ2UucmVwbGFjZSgvXy9nLCAnLScpO1xuXG4gIC8vIHd4LmdldEFjY291bnRJbmZvU3luY1xuXG4gIGNvbnN0IHBhcmFtZXRlcnMgPSB7XG4gICAgYXBwSWQ6IHByb2Nlc3MuZW52LlVOSV9BUFBfSUQsXG4gICAgYXBwTmFtZTogcHJvY2Vzcy5lbnYuVU5JX0FQUF9OQU1FLFxuICAgIGFwcFZlcnNpb246IHByb2Nlc3MuZW52LlVOSV9BUFBfVkVSU0lPTl9OQU1FLFxuICAgIGFwcFZlcnNpb25Db2RlOiBwcm9jZXNzLmVudi5VTklfQVBQX1ZFUlNJT05fQ09ERSxcbiAgICBhcHBMYW5ndWFnZTogZ2V0QXBwTGFuZ3VhZ2UoaG9zdExhbmd1YWdlKSxcbiAgICB1bmlDb21waWxlVmVyc2lvbjogcHJvY2Vzcy5lbnYuVU5JX0NPTVBJTEVSX1ZFUlNJT04sXG4gICAgdW5pUnVudGltZVZlcnNpb246IHByb2Nlc3MuZW52LlVOSV9DT01QSUxFUl9WRVJTSU9OLFxuICAgIHVuaVBsYXRmb3JtOiBwcm9jZXNzLmVudi5VTklfU1VCX1BMQVRGT1JNIHx8IHByb2Nlc3MuZW52LlVOSV9QTEFURk9STSxcbiAgICBkZXZpY2VCcmFuZCxcbiAgICBkZXZpY2VNb2RlbDogbW9kZWwsXG4gICAgZGV2aWNlVHlwZSxcbiAgICBkZXZpY2VQaXhlbFJhdGlvOiBfZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICBkZXZpY2VPcmllbnRhdGlvbjogX2RldmljZU9yaWVudGF0aW9uLFxuICAgIG9zTmFtZTogb3NOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgb3NWZXJzaW9uLFxuICAgIGhvc3RUaGVtZTogdGhlbWUsXG4gICAgaG9zdFZlcnNpb24sXG4gICAgaG9zdExhbmd1YWdlLFxuICAgIGhvc3ROYW1lOiBfaG9zdE5hbWUsXG4gICAgaG9zdFNES1ZlcnNpb246IF9TREtWZXJzaW9uLFxuICAgIGhvc3RGb250U2l6ZVNldHRpbmc6IGZvbnRTaXplU2V0dGluZyxcbiAgICB3aW5kb3dUb3A6IDAsXG4gICAgd2luZG93Qm90dG9tOiAwLFxuICAgIC8vIFRPRE9cbiAgICBvc0xhbmd1YWdlOiB1bmRlZmluZWQsXG4gICAgb3NUaGVtZTogdW5kZWZpbmVkLFxuICAgIHVhOiB1bmRlZmluZWQsXG4gICAgaG9zdFBhY2thZ2VOYW1lOiB1bmRlZmluZWQsXG4gICAgYnJvd3Nlck5hbWU6IHVuZGVmaW5lZCxcbiAgICBicm93c2VyVmVyc2lvbjogdW5kZWZpbmVkXG4gIH07XG5cbiAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHBhcmFtZXRlcnMpO1xufVxuXG5mdW5jdGlvbiBnZXRHZXREZXZpY2VUeXBlIChyZXN1bHQsIG1vZGVsKSB7XG4gIGxldCBkZXZpY2VUeXBlID0gcmVzdWx0LmRldmljZVR5cGUgfHwgJ3Bob25lJztcbiAge1xuICAgIGNvbnN0IGRldmljZVR5cGVNYXBzID0ge1xuICAgICAgaXBhZDogJ3BhZCcsXG4gICAgICB3aW5kb3dzOiAncGMnLFxuICAgICAgbWFjOiAncGMnXG4gICAgfTtcbiAgICBjb25zdCBkZXZpY2VUeXBlTWFwc0tleXMgPSBPYmplY3Qua2V5cyhkZXZpY2VUeXBlTWFwcyk7XG4gICAgY29uc3QgX21vZGVsID0gbW9kZWwudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGV2aWNlVHlwZU1hcHNLZXlzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgX20gPSBkZXZpY2VUeXBlTWFwc0tleXNbaW5kZXhdO1xuICAgICAgaWYgKF9tb2RlbC5pbmRleE9mKF9tKSAhPT0gLTEpIHtcbiAgICAgICAgZGV2aWNlVHlwZSA9IGRldmljZVR5cGVNYXBzW19tXTtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRldmljZVR5cGVcbn1cblxuZnVuY3Rpb24gZ2V0RGV2aWNlQnJhbmQgKGJyYW5kKSB7XG4gIGxldCBkZXZpY2VCcmFuZCA9IGJyYW5kO1xuICBpZiAoZGV2aWNlQnJhbmQpIHtcbiAgICBkZXZpY2VCcmFuZCA9IGJyYW5kLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gIH1cbiAgcmV0dXJuIGRldmljZUJyYW5kXG59XG5cbmZ1bmN0aW9uIGdldEFwcExhbmd1YWdlIChkZWZhdWx0TGFuZ3VhZ2UpIHtcbiAgcmV0dXJuIGdldExvY2FsZSQxXG4gICAgPyBnZXRMb2NhbGUkMSgpXG4gICAgOiBkZWZhdWx0TGFuZ3VhZ2Vcbn1cblxuZnVuY3Rpb24gZ2V0SG9zdE5hbWUgKHJlc3VsdCkge1xuICBjb25zdCBfcGxhdGZvcm0gPSAgXCJtcC1rdWFpc2hvdVwiLnNwbGl0KCctJylbMV07XG4gIGxldCBfaG9zdE5hbWUgPSByZXN1bHQuaG9zdE5hbWUgfHwgX3BsYXRmb3JtOyAvLyBtcC1qZFxuICB7IF9ob3N0TmFtZSA9IHJlc3VsdC5ob3N0OyB9XG5cbiAgcmV0dXJuIF9ob3N0TmFtZVxufVxuXG52YXIgZ2V0U3lzdGVtSW5mbyA9IHtcbiAgcmV0dXJuVmFsdWU6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB1c2VEZXZpY2VJZChyZXN1bHQpO1xuICAgIGFkZFNhZmVBcmVhSW5zZXRzKHJlc3VsdCk7XG4gICAgcG9wdWxhdGVQYXJhbWV0ZXJzKHJlc3VsdCk7XG4gIH1cbn07XG5cbmNvbnN0IG9OYW1lID0gJ2dldFVzZXJJbmZvJztcbmNvbnN0IG5OYW1lID0gJ2dldFVzZXJQcm9maWxlJztcblxudmFyIGdldFVzZXJQcm9maWxlID0ge1xuICBuYW1lOiBrcy5jYW5JVXNlKG5OYW1lKSA/IG5OYW1lIDogb05hbWVcbn07XG5cbmNvbnN0IHByb3RvY29scyA9IHtcbiAgbmF2aWdhdGVUbyxcbiAgcmVkaXJlY3RUbyxcbiAgcHJldmlld0ltYWdlLFxuICBnZXRTeXN0ZW1JbmZvLFxuICBnZXRTeXN0ZW1JbmZvU3luYzogZ2V0U3lzdGVtSW5mbyxcbiAgZ2V0VXNlclByb2ZpbGUsXG4gIHJlcXVlc3RQYXltZW50OiB7XG4gICAgbmFtZToga3MucGF5ID8gJ3BheScgOiAncmVxdWVzdFBheW1lbnQnLFxuICAgIGFyZ3MgKGZyb21BcmdzKSB7XG4gICAgICBpZiAodHlwZW9mIGZyb21BcmdzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBrcy5wYXkg5pyN5Yqh57G75Z6LIGlk77yI5Zu65a6a5YC85Li6ICcxJ++8iVxuICAgICAgICBpZiAoa3MucGF5ICYmICFmcm9tQXJncy5zZXJ2aWNlSWQpIGZyb21BcmdzLnNlcnZpY2VJZCA9ICcxJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5jb25zdCB0b2RvcyA9IFtcbiAgJ3ZpYnJhdGUnXG5dO1xuY29uc3QgY2FuSVVzZXMgPSBbXTtcblxuY29uc3QgQ0FMTEJBQ0tTID0gWydzdWNjZXNzJywgJ2ZhaWwnLCAnY2FuY2VsJywgJ2NvbXBsZXRlJ107XG5cbmZ1bmN0aW9uIHByb2Nlc3NDYWxsYmFjayAobWV0aG9kTmFtZSwgbWV0aG9kLCByZXR1cm5WYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlcykge1xuICAgIHJldHVybiBtZXRob2QocHJvY2Vzc1JldHVyblZhbHVlKG1ldGhvZE5hbWUsIHJlcywgcmV0dXJuVmFsdWUpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBcmdzIChtZXRob2ROYW1lLCBmcm9tQXJncywgYXJnc09wdGlvbiA9IHt9LCByZXR1cm5WYWx1ZSA9IHt9LCBrZWVwRnJvbUFyZ3MgPSBmYWxzZSkge1xuICBpZiAoaXNQbGFpbk9iamVjdChmcm9tQXJncykpIHsgLy8g5LiA6IisIGFwaSDnmoTlj4LmlbDop6PmnpBcbiAgICBjb25zdCB0b0FyZ3MgPSBrZWVwRnJvbUFyZ3MgPT09IHRydWUgPyBmcm9tQXJncyA6IHt9OyAvLyByZXR1cm5WYWx1ZSDkuLogZmFsc2Ug5pe277yM6K+05piO5piv5qC85byP5YyW6L+U5Zue5YC877yM55u05o6l5Zyo6L+U5Zue5YC85a+56LGh5LiK5L+u5pS56LWL5YC8XG4gICAgaWYgKGlzRm4oYXJnc09wdGlvbikpIHtcbiAgICAgIGFyZ3NPcHRpb24gPSBhcmdzT3B0aW9uKGZyb21BcmdzLCB0b0FyZ3MpIHx8IHt9O1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmcm9tQXJncykge1xuICAgICAgaWYgKGhhc093bihhcmdzT3B0aW9uLCBrZXkpKSB7XG4gICAgICAgIGxldCBrZXlPcHRpb24gPSBhcmdzT3B0aW9uW2tleV07XG4gICAgICAgIGlmIChpc0ZuKGtleU9wdGlvbikpIHtcbiAgICAgICAgICBrZXlPcHRpb24gPSBrZXlPcHRpb24oZnJvbUFyZ3Nba2V5XSwgZnJvbUFyZ3MsIHRvQXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZXlPcHRpb24pIHsgLy8g5LiN5pSv5oyB55qE5Y+C5pWwXG4gICAgICAgICAgY29uc29sZS53YXJuKGBUaGUgJyR7bWV0aG9kTmFtZX0nIG1ldGhvZCBvZiBwbGF0Zm9ybSAn5b+r5omL5bCP56iL5bqPJyBkb2VzIG5vdCBzdXBwb3J0IG9wdGlvbiAnJHtrZXl9J2ApO1xuICAgICAgICB9IGVsc2UgaWYgKGlzU3RyKGtleU9wdGlvbikpIHsgLy8g6YeN5YaZ5Y+C5pWwIGtleVxuICAgICAgICAgIHRvQXJnc1trZXlPcHRpb25dID0gZnJvbUFyZ3Nba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGtleU9wdGlvbikpIHsgLy8ge25hbWU6bmV3TmFtZSx2YWx1ZTp2YWx1ZX3lj6/ph43mlrDmjIflrprlj4LmlbAga2V5OnZhbHVlXG4gICAgICAgICAgdG9BcmdzW2tleU9wdGlvbi5uYW1lID8ga2V5T3B0aW9uLm5hbWUgOiBrZXldID0ga2V5T3B0aW9uLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKENBTExCQUNLUy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgIGlmIChpc0ZuKGZyb21BcmdzW2tleV0pKSB7XG4gICAgICAgICAgdG9BcmdzW2tleV0gPSBwcm9jZXNzQ2FsbGJhY2sobWV0aG9kTmFtZSwgZnJvbUFyZ3Nba2V5XSwgcmV0dXJuVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWtlZXBGcm9tQXJncykge1xuICAgICAgICAgIHRvQXJnc1trZXldID0gZnJvbUFyZ3Nba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9BcmdzXG4gIH0gZWxzZSBpZiAoaXNGbihmcm9tQXJncykpIHtcbiAgICBmcm9tQXJncyA9IHByb2Nlc3NDYWxsYmFjayhtZXRob2ROYW1lLCBmcm9tQXJncywgcmV0dXJuVmFsdWUpO1xuICB9XG4gIHJldHVybiBmcm9tQXJnc1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzUmV0dXJuVmFsdWUgKG1ldGhvZE5hbWUsIHJlcywgcmV0dXJuVmFsdWUsIGtlZXBSZXR1cm5WYWx1ZSA9IGZhbHNlKSB7XG4gIGlmIChpc0ZuKHByb3RvY29scy5yZXR1cm5WYWx1ZSkpIHsgLy8g5aSE55CG6YCa55SoIHJldHVyblZhbHVlXG4gICAgcmVzID0gcHJvdG9jb2xzLnJldHVyblZhbHVlKG1ldGhvZE5hbWUsIHJlcyk7XG4gIH1cbiAgcmV0dXJuIHByb2Nlc3NBcmdzKG1ldGhvZE5hbWUsIHJlcywgcmV0dXJuVmFsdWUsIHt9LCBrZWVwUmV0dXJuVmFsdWUpXG59XG5cbmZ1bmN0aW9uIHdyYXBwZXIgKG1ldGhvZE5hbWUsIG1ldGhvZCkge1xuICBpZiAoaGFzT3duKHByb3RvY29scywgbWV0aG9kTmFtZSkpIHtcbiAgICBjb25zdCBwcm90b2NvbCA9IHByb3RvY29sc1ttZXRob2ROYW1lXTtcbiAgICBpZiAoIXByb3RvY29sKSB7IC8vIOaaguS4jeaUr+aMgeeahCBhcGlcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFBsYXRmb3JtICflv6vmiYvlsI/nqIvluo8nIGRvZXMgbm90IHN1cHBvcnQgJyR7bWV0aG9kTmFtZX0nLmApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZzEsIGFyZzIpIHsgLy8g55uu5YmNIGFwaSDmnIDlpJrkuKTkuKrlj4LmlbBcbiAgICAgIGxldCBvcHRpb25zID0gcHJvdG9jb2w7XG4gICAgICBpZiAoaXNGbihwcm90b2NvbCkpIHtcbiAgICAgICAgb3B0aW9ucyA9IHByb3RvY29sKGFyZzEpO1xuICAgICAgfVxuXG4gICAgICBhcmcxID0gcHJvY2Vzc0FyZ3MobWV0aG9kTmFtZSwgYXJnMSwgb3B0aW9ucy5hcmdzLCBvcHRpb25zLnJldHVyblZhbHVlKTtcblxuICAgICAgY29uc3QgYXJncyA9IFthcmcxXTtcbiAgICAgIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgYXJncy5wdXNoKGFyZzIpO1xuICAgICAgfVxuICAgICAgaWYgKGlzRm4ob3B0aW9ucy5uYW1lKSkge1xuICAgICAgICBtZXRob2ROYW1lID0gb3B0aW9ucy5uYW1lKGFyZzEpO1xuICAgICAgfSBlbHNlIGlmIChpc1N0cihvcHRpb25zLm5hbWUpKSB7XG4gICAgICAgIG1ldGhvZE5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgICB9XG4gICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IGtzW21ldGhvZE5hbWVdLmFwcGx5KGtzLCBhcmdzKTtcbiAgICAgIGlmIChpc1N5bmNBcGkobWV0aG9kTmFtZSkpIHsgLy8g5ZCM5q2lIGFwaVxuICAgICAgICByZXR1cm4gcHJvY2Vzc1JldHVyblZhbHVlKG1ldGhvZE5hbWUsIHJldHVyblZhbHVlLCBvcHRpb25zLnJldHVyblZhbHVlLCBpc0NvbnRleHRBcGkobWV0aG9kTmFtZSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0dXJuVmFsdWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1ldGhvZFxufVxuXG5jb25zdCB0b2RvQXBpcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IFRPRE9TID0gW1xuICAnb25UYWJCYXJNaWRCdXR0b25UYXAnLFxuICAnc3Vic2NyaWJlUHVzaCcsXG4gICd1bnN1YnNjcmliZVB1c2gnLFxuICAnb25QdXNoJyxcbiAgJ29mZlB1c2gnLFxuICAnc2hhcmUnXG5dO1xuXG5mdW5jdGlvbiBjcmVhdGVUb2RvQXBpIChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0b2RvQXBpICh7XG4gICAgZmFpbCxcbiAgICBjb21wbGV0ZVxuICB9KSB7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgZXJyTXNnOiBgJHtuYW1lfTpmYWlsIG1ldGhvZCAnJHtuYW1lfScgbm90IHN1cHBvcnRlZGBcbiAgICB9O1xuICAgIGlzRm4oZmFpbCkgJiYgZmFpbChyZXMpO1xuICAgIGlzRm4oY29tcGxldGUpICYmIGNvbXBsZXRlKHJlcyk7XG4gIH1cbn1cblxuVE9ET1MuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICB0b2RvQXBpc1tuYW1lXSA9IGNyZWF0ZVRvZG9BcGkobmFtZSk7XG59KTtcblxudmFyIHByb3ZpZGVycyA9IHtcbiAgb2F1dGg6IFsna3VhaXNob3UnXSxcbiAgc2hhcmU6IFsna3VhaXNob3UnXSxcbiAgcGF5bWVudDogWydrc3BheSddLFxuICBwdXNoOiBbJ2t1YWlzaG91J11cbn07XG5cbmZ1bmN0aW9uIGdldFByb3ZpZGVyICh7XG4gIHNlcnZpY2UsXG4gIHN1Y2Nlc3MsXG4gIGZhaWwsXG4gIGNvbXBsZXRlXG59KSB7XG4gIGxldCByZXMgPSBmYWxzZTtcbiAgaWYgKHByb3ZpZGVyc1tzZXJ2aWNlXSkge1xuICAgIHJlcyA9IHtcbiAgICAgIGVyck1zZzogJ2dldFByb3ZpZGVyOm9rJyxcbiAgICAgIHNlcnZpY2UsXG4gICAgICBwcm92aWRlcjogcHJvdmlkZXJzW3NlcnZpY2VdXG4gICAgfTtcbiAgICBpc0ZuKHN1Y2Nlc3MpICYmIHN1Y2Nlc3MocmVzKTtcbiAgfSBlbHNlIHtcbiAgICByZXMgPSB7XG4gICAgICBlcnJNc2c6ICdnZXRQcm92aWRlcjpmYWlsIHNlcnZpY2Ugbm90IGZvdW5kJ1xuICAgIH07XG4gICAgaXNGbihmYWlsKSAmJiBmYWlsKHJlcyk7XG4gIH1cbiAgaXNGbihjb21wbGV0ZSkgJiYgY29tcGxldGUocmVzKTtcbn1cblxudmFyIGV4dHJhQXBpID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIGdldFByb3ZpZGVyOiBnZXRQcm92aWRlclxufSk7XG5cbmNvbnN0IGdldEVtaXR0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgRW1pdHRlcjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFVuaUVtaXR0ZXIgKCkge1xuICAgIGlmICghRW1pdHRlcikge1xuICAgICAgRW1pdHRlciA9IG5ldyBWdWUoKTtcbiAgICB9XG4gICAgcmV0dXJuIEVtaXR0ZXJcbiAgfVxufSkoKTtcblxuZnVuY3Rpb24gYXBwbHkgKGN0eCwgbWV0aG9kLCBhcmdzKSB7XG4gIHJldHVybiBjdHhbbWV0aG9kXS5hcHBseShjdHgsIGFyZ3MpXG59XG5cbmZ1bmN0aW9uICRvbiAoKSB7XG4gIHJldHVybiBhcHBseShnZXRFbWl0dGVyKCksICckb24nLCBbLi4uYXJndW1lbnRzXSlcbn1cbmZ1bmN0aW9uICRvZmYgKCkge1xuICByZXR1cm4gYXBwbHkoZ2V0RW1pdHRlcigpLCAnJG9mZicsIFsuLi5hcmd1bWVudHNdKVxufVxuZnVuY3Rpb24gJG9uY2UgKCkge1xuICByZXR1cm4gYXBwbHkoZ2V0RW1pdHRlcigpLCAnJG9uY2UnLCBbLi4uYXJndW1lbnRzXSlcbn1cbmZ1bmN0aW9uICRlbWl0ICgpIHtcbiAgcmV0dXJuIGFwcGx5KGdldEVtaXR0ZXIoKSwgJyRlbWl0JywgWy4uLmFyZ3VtZW50c10pXG59XG5cbnZhciBldmVudEFwaSA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgX19wcm90b19fOiBudWxsLFxuICAkb246ICRvbixcbiAgJG9mZjogJG9mZixcbiAgJG9uY2U6ICRvbmNlLFxuICAkZW1pdDogJGVtaXRcbn0pO1xuXG4vKipcbiAqIOahhuaetuWGhSB0cnktY2F0Y2hcbiAqL1xuLyoqXG4gKiDlvIDlj5HogIUgdHJ5LWNhdGNoXG4gKi9cbmZ1bmN0aW9uIHRyeUNhdGNoIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoZm4sIGFyZ3VtZW50cylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPXG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBcGlDYWxsYmFja3MgKHBhcmFtcykge1xuICBjb25zdCBhcGlDYWxsYmFja3MgPSB7fTtcbiAgZm9yIChjb25zdCBuYW1lIGluIHBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtID0gcGFyYW1zW25hbWVdO1xuICAgIGlmIChpc0ZuKHBhcmFtKSkge1xuICAgICAgYXBpQ2FsbGJhY2tzW25hbWVdID0gdHJ5Q2F0Y2gocGFyYW0pO1xuICAgICAgZGVsZXRlIHBhcmFtc1tuYW1lXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFwaUNhbGxiYWNrc1xufVxuXG5sZXQgY2lkO1xubGV0IGNpZEVyck1zZztcbmxldCBlbmFibGVkO1xuXG5mdW5jdGlvbiBub3JtYWxpemVQdXNoTWVzc2FnZSAobWVzc2FnZSkge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKG1lc3NhZ2UpXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIHJldHVybiBtZXNzYWdlXG59XG5cbmZ1bmN0aW9uIGludm9rZVB1c2hDYWxsYmFjayAoXG4gIGFyZ3Ncbikge1xuICBpZiAoYXJncy50eXBlID09PSAnZW5hYmxlZCcpIHtcbiAgICBlbmFibGVkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChhcmdzLnR5cGUgPT09ICdjbGllbnRJZCcpIHtcbiAgICBjaWQgPSBhcmdzLmNpZDtcbiAgICBjaWRFcnJNc2cgPSBhcmdzLmVyck1zZztcbiAgICBpbnZva2VHZXRQdXNoQ2lkQ2FsbGJhY2tzKGNpZCwgYXJncy5lcnJNc2cpO1xuICB9IGVsc2UgaWYgKGFyZ3MudHlwZSA9PT0gJ3B1c2hNc2cnKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIHR5cGU6ICdyZWNlaXZlJyxcbiAgICAgIGRhdGE6IG5vcm1hbGl6ZVB1c2hNZXNzYWdlKGFyZ3MubWVzc2FnZSlcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb25QdXNoTWVzc2FnZUNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBvblB1c2hNZXNzYWdlQ2FsbGJhY2tzW2ldO1xuICAgICAgY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgICAvLyDor6Xmtojmga/lt7LooqvpmLvmraJcbiAgICAgIGlmIChtZXNzYWdlLnN0b3BwZWQpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJncy50eXBlID09PSAnY2xpY2snKSB7XG4gICAgb25QdXNoTWVzc2FnZUNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgY2FsbGJhY2soe1xuICAgICAgICB0eXBlOiAnY2xpY2snLFxuICAgICAgICBkYXRhOiBub3JtYWxpemVQdXNoTWVzc2FnZShhcmdzLm1lc3NhZ2UpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBnZXRQdXNoQ2lkQ2FsbGJhY2tzID0gW107XG5cbmZ1bmN0aW9uIGludm9rZUdldFB1c2hDaWRDYWxsYmFja3MgKGNpZCwgZXJyTXNnKSB7XG4gIGdldFB1c2hDaWRDYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICBjYWxsYmFjayhjaWQsIGVyck1zZyk7XG4gIH0pO1xuICBnZXRQdXNoQ2lkQ2FsbGJhY2tzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIGdldFB1c2hDbGllbnRJZCAoYXJncykge1xuICBpZiAoIWlzUGxhaW5PYmplY3QoYXJncykpIHtcbiAgICBhcmdzID0ge307XG4gIH1cbiAgY29uc3Qge1xuICAgIHN1Y2Nlc3MsXG4gICAgZmFpbCxcbiAgICBjb21wbGV0ZVxuICB9ID0gZ2V0QXBpQ2FsbGJhY2tzKGFyZ3MpO1xuICBjb25zdCBoYXNTdWNjZXNzID0gaXNGbihzdWNjZXNzKTtcbiAgY29uc3QgaGFzRmFpbCA9IGlzRm4oZmFpbCk7XG4gIGNvbnN0IGhhc0NvbXBsZXRlID0gaXNGbihjb21wbGV0ZSk7XG5cbiAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbmFibGVkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgY2lkID0gJyc7XG4gICAgICBjaWRFcnJNc2cgPSAndW5pUHVzaCBpcyBub3QgZW5hYmxlZCc7XG4gICAgfVxuICAgIGdldFB1c2hDaWRDYWxsYmFja3MucHVzaCgoY2lkLCBlcnJNc2cpID0+IHtcbiAgICAgIGxldCByZXM7XG4gICAgICBpZiAoY2lkKSB7XG4gICAgICAgIHJlcyA9IHtcbiAgICAgICAgICBlcnJNc2c6ICdnZXRQdXNoQ2xpZW50SWQ6b2snLFxuICAgICAgICAgIGNpZFxuICAgICAgICB9O1xuICAgICAgICBoYXNTdWNjZXNzICYmIHN1Y2Nlc3MocmVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyA9IHtcbiAgICAgICAgICBlcnJNc2c6ICdnZXRQdXNoQ2xpZW50SWQ6ZmFpbCcgKyAoZXJyTXNnID8gJyAnICsgZXJyTXNnIDogJycpXG4gICAgICAgIH07XG4gICAgICAgIGhhc0ZhaWwgJiYgZmFpbChyZXMpO1xuICAgICAgfVxuICAgICAgaGFzQ29tcGxldGUgJiYgY29tcGxldGUocmVzKTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGludm9rZUdldFB1c2hDaWRDYWxsYmFja3MoY2lkLCBjaWRFcnJNc2cpO1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IG9uUHVzaE1lc3NhZ2VDYWxsYmFja3MgPSBbXTtcbi8vIOS4jeS9v+eUqCBkZWZpbmVPbkFwaSDlrp7njrDvvIzmmK/lm6DkuLogZGVmaW5lT25BcGkg5L6d6LWWIFVuaVNlcnZpY2VKU0JyaWRnZSDvvIzor6Xlr7nosaHnm67liY3lnKjlsI/nqIvluo/kuIrmnKrmj5DkvpvvvIzmlYXnroDljZXlrp7njrBcbmNvbnN0IG9uUHVzaE1lc3NhZ2UgPSAoZm4pID0+IHtcbiAgaWYgKG9uUHVzaE1lc3NhZ2VDYWxsYmFja3MuaW5kZXhPZihmbikgPT09IC0xKSB7XG4gICAgb25QdXNoTWVzc2FnZUNhbGxiYWNrcy5wdXNoKGZuKTtcbiAgfVxufTtcblxuY29uc3Qgb2ZmUHVzaE1lc3NhZ2UgPSAoZm4pID0+IHtcbiAgaWYgKCFmbikge1xuICAgIG9uUHVzaE1lc3NhZ2VDYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpbmRleCA9IG9uUHVzaE1lc3NhZ2VDYWxsYmFja3MuaW5kZXhPZihmbik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIG9uUHVzaE1lc3NhZ2VDYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBhcGkgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgZ2V0UHVzaENsaWVudElkOiBnZXRQdXNoQ2xpZW50SWQsXG4gIG9uUHVzaE1lc3NhZ2U6IG9uUHVzaE1lc3NhZ2UsXG4gIG9mZlB1c2hNZXNzYWdlOiBvZmZQdXNoTWVzc2FnZSxcbiAgaW52b2tlUHVzaENhbGxiYWNrOiBpbnZva2VQdXNoQ2FsbGJhY2tcbn0pO1xuXG5jb25zdCBtb2NrcyA9IFsnX19yb3V0ZV9fJywgJ19fd3hFeHBhcnNlck5vZGVJZF9fJywgJ19fd3hXZWJ2aWV3SWRfXyddO1xuXG5mdW5jdGlvbiBmaW5kVm1CeVZ1ZUlkICh2bSwgdnVlUGlkKSB7XG4gIGNvbnN0ICRjaGlsZHJlbiA9IHZtLiRjaGlsZHJlbjtcbiAgLy8g5LyY5YWI5p+l5om+55u05bGeKOWPjeWQkeafpeaJvjpodHRwczovL2dpdGh1Yi5jb20vZGNsb3VkaW8vdW5pLWFwcC9pc3N1ZXMvMTIwMClcbiAgZm9yIChsZXQgaSA9ICRjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IGNoaWxkVm0gPSAkY2hpbGRyZW5baV07XG4gICAgaWYgKGNoaWxkVm0uJHNjb3BlLl8kdnVlSWQgPT09IHZ1ZVBpZCkge1xuICAgICAgcmV0dXJuIGNoaWxkVm1cbiAgICB9XG4gIH1cbiAgLy8g5Y+N5ZCR6YCS5b2S5p+l5om+XG4gIGxldCBwYXJlbnRWbTtcbiAgZm9yIChsZXQgaSA9ICRjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHBhcmVudFZtID0gZmluZFZtQnlWdWVJZCgkY2hpbGRyZW5baV0sIHZ1ZVBpZCk7XG4gICAgaWYgKHBhcmVudFZtKSB7XG4gICAgICByZXR1cm4gcGFyZW50Vm1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEJlaGF2aW9yIChvcHRpb25zKSB7XG4gIHJldHVybiBCZWhhdmlvcihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBpc1BhZ2UgKCkge1xuICByZXR1cm4gISF0aGlzLnJvdXRlXG59XG5cbmZ1bmN0aW9uIGluaXRSZWxhdGlvbiAoZGV0YWlsKSB7XG4gIHRoaXMudHJpZ2dlckV2ZW50KCdfX2wnLCBkZXRhaWwpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBbGxDb21wb25lbnRzIChtcEluc3RhbmNlLCBzZWxlY3RvciwgJHJlZnMpIHtcbiAgY29uc3QgY29tcG9uZW50cyA9IG1wSW5zdGFuY2Uuc2VsZWN0QWxsQ29tcG9uZW50cyhzZWxlY3RvcikgfHwgW107XG4gIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgIGNvbnN0IHJlZiA9IGNvbXBvbmVudC5kYXRhc2V0LnJlZjtcbiAgICAkcmVmc1tyZWZdID0gY29tcG9uZW50LiR2bSB8fCB0b1NraXAoY29tcG9uZW50KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN5bmNSZWZzIChyZWZzLCBuZXdSZWZzKSB7XG4gIGNvbnN0IG9sZEtleXMgPSBuZXcgU2V0KC4uLk9iamVjdC5rZXlzKHJlZnMpKTtcbiAgY29uc3QgbmV3S2V5cyA9IE9iamVjdC5rZXlzKG5ld1JlZnMpO1xuICBuZXdLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHJlZnNba2V5XTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IG5ld1JlZnNba2V5XTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvbGRWYWx1ZSkgJiYgQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkgJiYgb2xkVmFsdWUubGVuZ3RoID09PSBuZXdWYWx1ZS5sZW5ndGggJiYgbmV3VmFsdWUuZXZlcnkodmFsdWUgPT4gb2xkVmFsdWUuaW5jbHVkZXModmFsdWUpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHJlZnNba2V5XSA9IG5ld1ZhbHVlO1xuICAgIG9sZEtleXMuZGVsZXRlKGtleSk7XG4gIH0pO1xuICBvbGRLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBkZWxldGUgcmVmc1trZXldO1xuICB9KTtcbiAgcmV0dXJuIHJlZnNcbn1cblxuZnVuY3Rpb24gaW5pdFJlZnMgKHZtKSB7XG4gIGNvbnN0IG1wSW5zdGFuY2UgPSB2bS4kc2NvcGU7XG4gIGNvbnN0IHJlZnMgPSB7fTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZtLCAnJHJlZnMnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIGNvbnN0ICRyZWZzID0ge307XG4gICAgICBzZWxlY3RBbGxDb21wb25lbnRzKG1wSW5zdGFuY2UsICcudnVlLXJlZicsICRyZWZzKTtcbiAgICAgIC8vIFRPRE8g5pqC5LiN6ICD6JmRIGZvciDkuK3nmoQgc2NvcGVkXG4gICAgICBjb25zdCBmb3JDb21wb25lbnRzID0gbXBJbnN0YW5jZS5zZWxlY3RBbGxDb21wb25lbnRzKCcudnVlLXJlZi1pbi1mb3InKSB8fCBbXTtcbiAgICAgIGZvckNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICBjb25zdCByZWYgPSBjb21wb25lbnQuZGF0YXNldC5yZWY7XG4gICAgICAgIGlmICghJHJlZnNbcmVmXSkge1xuICAgICAgICAgICRyZWZzW3JlZl0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAkcmVmc1tyZWZdLnB1c2goY29tcG9uZW50LiR2bSB8fCB0b1NraXAoY29tcG9uZW50KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzeW5jUmVmcyhyZWZzLCAkcmVmcylcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVMaW5rIChldmVudCkge1xuICBjb25zdCB7XG4gICAgdnVlUGlkLFxuICAgIHZ1ZU9wdGlvbnNcbiAgfSA9IGV2ZW50LmRldGFpbCB8fCBldmVudC52YWx1ZTsgLy8gZGV0YWlsIOaYr+W+ruS/oSx2YWx1ZSDmmK/nmb7luqYoZGlwYXRjaClcblxuICBsZXQgcGFyZW50Vm07XG5cbiAgaWYgKHZ1ZVBpZCkge1xuICAgIHBhcmVudFZtID0gZmluZFZtQnlWdWVJZCh0aGlzLiR2bSwgdnVlUGlkKTtcbiAgfVxuXG4gIGlmICghcGFyZW50Vm0pIHtcbiAgICBwYXJlbnRWbSA9IHRoaXMuJHZtO1xuICB9XG5cbiAgdnVlT3B0aW9ucy5wYXJlbnQgPSBwYXJlbnRWbTtcbn1cblxuZnVuY3Rpb24gbWFya01QQ29tcG9uZW50IChjb21wb25lbnQpIHtcbiAgLy8g5ZyoIFZ1ZSDkuK3moIforrDkuLrlsI/nqIvluo/nu4Tku7ZcbiAgY29uc3QgSVNfTVAgPSAnX192X2lzTVBDb21wb25lbnQnO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcG9uZW50LCBJU19NUCwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIGNvbXBvbmVudFxufVxuXG5mdW5jdGlvbiB0b1NraXAgKG9iaikge1xuICBjb25zdCBPQiA9ICdfX29iX18nO1xuICBjb25zdCBTS0lQID0gJ19fdl9za2lwJztcbiAgaWYgKGlzT2JqZWN0KG9iaikgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZShvYmopKSB7XG4gICAgLy8g6YG/5YWN6KKrIEB2dWUvY29tcG9zaXRpb24tYXBpIOingua1i1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIE9CLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIFtTS0lQXTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBvYmpcbn1cblxuY29uc3QgTVBQYWdlID0gUGFnZTtcbmNvbnN0IE1QQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuXG5jb25zdCBjdXN0b21pemVSRSA9IC86L2c7XG5cbmNvbnN0IGN1c3RvbWl6ZSA9IGNhY2hlZCgoc3RyKSA9PiB7XG4gIHJldHVybiBjYW1lbGl6ZShzdHIucmVwbGFjZShjdXN0b21pemVSRSwgJy0nKSlcbn0pO1xuXG5mdW5jdGlvbiBpbml0VHJpZ2dlckV2ZW50IChtcEluc3RhbmNlKSB7XG4gIGNvbnN0IG9sZFRyaWdnZXJFdmVudCA9IG1wSW5zdGFuY2UudHJpZ2dlckV2ZW50O1xuICBjb25zdCBuZXdUcmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQsIC4uLmFyZ3MpIHtcbiAgICAvLyDkuovku7blkI3nu5/kuIDovazpqbzls7DmoLzlvI/vvIzku4XlpITnkIbvvJrlvZPliY3nu4Tku7bkuLogdnVlIOe7hOS7tuOAgeW9k+WJjee7hOS7tuS4uiB2dWUg57uE5Lu25a2Q57uE5Lu2XG4gICAgaWYgKHRoaXMuJHZtIHx8ICh0aGlzLmRhdGFzZXQgJiYgdGhpcy5kYXRhc2V0LmNvbVR5cGUpKSB7XG4gICAgICBldmVudCA9IGN1c3RvbWl6ZShldmVudCk7XG4gICAgfVxuICAgIHJldHVybiBvbGRUcmlnZ2VyRXZlbnQuYXBwbHkodGhpcywgW2V2ZW50LCAuLi5hcmdzXSlcbiAgfTtcbiAgdHJ5IHtcbiAgICAvLyDkuqzkuJzlsI/nqIvluo8gdHJpZ2dlckV2ZW50IOS4uuWPquivu1xuICAgIG1wSW5zdGFuY2UudHJpZ2dlckV2ZW50ID0gbmV3VHJpZ2dlckV2ZW50O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIG1wSW5zdGFuY2UuX3RyaWdnZXJFdmVudCA9IG5ld1RyaWdnZXJFdmVudDtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0SG9vayAobmFtZSwgb3B0aW9ucywgaXNDb21wb25lbnQpIHtcbiAgY29uc3Qgb2xkSG9vayA9IG9wdGlvbnNbbmFtZV07XG4gIG9wdGlvbnNbbmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIG1hcmtNUENvbXBvbmVudCh0aGlzKTtcbiAgICBpbml0VHJpZ2dlckV2ZW50KHRoaXMpO1xuICAgIGlmIChvbGRIb29rKSB7XG4gICAgICByZXR1cm4gb2xkSG9vay5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfTtcbn1cbmlmICghTVBQYWdlLl9fJHdyYXBwZXJlZCkge1xuICBNUFBhZ2UuX18kd3JhcHBlcmVkID0gdHJ1ZTtcbiAgUGFnZSA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcbiAgICBpbml0SG9vaygnb25Mb2FkJywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIE1QUGFnZShvcHRpb25zKVxuICB9O1xuICBQYWdlLmFmdGVyID0gTVBQYWdlLmFmdGVyO1xuXG4gIENvbXBvbmVudCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcbiAgICBpbml0SG9vaygnY3JlYXRlZCcsIG9wdGlvbnMpO1xuICAgIHJldHVybiBNUENvbXBvbmVudChvcHRpb25zKVxuICB9O1xufVxuXG5jb25zdCBQQUdFX0VWRU5UX0hPT0tTID0gW1xuICAnb25QdWxsRG93blJlZnJlc2gnLFxuICAnb25SZWFjaEJvdHRvbScsXG4gICdvbkFkZFRvRmF2b3JpdGVzJyxcbiAgJ29uU2hhcmVUaW1lbGluZScsXG4gICdvblNoYXJlQXBwTWVzc2FnZScsXG4gICdvblBhZ2VTY3JvbGwnLFxuICAnb25SZXNpemUnLFxuICAnb25UYWJJdGVtVGFwJ1xuXTtcblxuZnVuY3Rpb24gaW5pdE1vY2tzICh2bSwgbW9ja3MpIHtcbiAgY29uc3QgbXBJbnN0YW5jZSA9IHZtLiRtcFt2bS5tcFR5cGVdO1xuICBtb2Nrcy5mb3JFYWNoKG1vY2sgPT4ge1xuICAgIGlmIChoYXNPd24obXBJbnN0YW5jZSwgbW9jaykpIHtcbiAgICAgIHZtW21vY2tdID0gbXBJbnN0YW5jZVttb2NrXTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoYXNIb29rIChob29rLCB2dWVPcHRpb25zKSB7XG4gIGlmICghdnVlT3B0aW9ucykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoVnVlLm9wdGlvbnMgJiYgQXJyYXkuaXNBcnJheShWdWUub3B0aW9uc1tob29rXSkpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgdnVlT3B0aW9ucyA9IHZ1ZU9wdGlvbnMuZGVmYXVsdCB8fCB2dWVPcHRpb25zO1xuXG4gIGlmIChpc0ZuKHZ1ZU9wdGlvbnMpKSB7XG4gICAgaWYgKGlzRm4odnVlT3B0aW9ucy5leHRlbmRPcHRpb25zW2hvb2tdKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHZ1ZU9wdGlvbnMuc3VwZXIgJiZcbiAgICAgIHZ1ZU9wdGlvbnMuc3VwZXIub3B0aW9ucyAmJlxuICAgICAgQXJyYXkuaXNBcnJheSh2dWVPcHRpb25zLnN1cGVyLm9wdGlvbnNbaG9va10pKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChpc0ZuKHZ1ZU9wdGlvbnNbaG9va10pIHx8IEFycmF5LmlzQXJyYXkodnVlT3B0aW9uc1tob29rXSkpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNvbnN0IG1peGlucyA9IHZ1ZU9wdGlvbnMubWl4aW5zO1xuICBpZiAoQXJyYXkuaXNBcnJheShtaXhpbnMpKSB7XG4gICAgcmV0dXJuICEhbWl4aW5zLmZpbmQobWl4aW4gPT4gaGFzSG9vayhob29rLCBtaXhpbikpXG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEhvb2tzIChtcE9wdGlvbnMsIGhvb2tzLCB2dWVPcHRpb25zKSB7XG4gIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XG4gICAgaWYgKGhhc0hvb2soaG9vaywgdnVlT3B0aW9ucykpIHtcbiAgICAgIG1wT3B0aW9uc1tob29rXSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiR2bSAmJiB0aGlzLiR2bS5fX2NhbGxfaG9vayhob29rLCBhcmdzKVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0VW5rbm93bkhvb2tzIChtcE9wdGlvbnMsIHZ1ZU9wdGlvbnMsIGV4Y2x1ZGVzID0gW10pIHtcbiAgZmluZEhvb2tzKHZ1ZU9wdGlvbnMpLmZvckVhY2goKGhvb2spID0+IGluaXRIb29rJDEobXBPcHRpb25zLCBob29rLCBleGNsdWRlcykpO1xufVxuXG5mdW5jdGlvbiBmaW5kSG9va3MgKHZ1ZU9wdGlvbnMsIGhvb2tzID0gW10pIHtcbiAgaWYgKHZ1ZU9wdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyh2dWVPcHRpb25zKS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBpZiAobmFtZS5pbmRleE9mKCdvbicpID09PSAwICYmIGlzRm4odnVlT3B0aW9uc1tuYW1lXSkpIHtcbiAgICAgICAgaG9va3MucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gaG9va3Ncbn1cblxuZnVuY3Rpb24gaW5pdEhvb2skMSAobXBPcHRpb25zLCBob29rLCBleGNsdWRlcykge1xuICBpZiAoZXhjbHVkZXMuaW5kZXhPZihob29rKSA9PT0gLTEgJiYgIWhhc093bihtcE9wdGlvbnMsIGhvb2spKSB7XG4gICAgbXBPcHRpb25zW2hvb2tdID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiB0aGlzLiR2bSAmJiB0aGlzLiR2bS5fX2NhbGxfaG9vayhob29rLCBhcmdzKVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFZ1ZUNvbXBvbmVudCAoVnVlLCB2dWVPcHRpb25zKSB7XG4gIHZ1ZU9wdGlvbnMgPSB2dWVPcHRpb25zLmRlZmF1bHQgfHwgdnVlT3B0aW9ucztcbiAgbGV0IFZ1ZUNvbXBvbmVudDtcbiAgaWYgKGlzRm4odnVlT3B0aW9ucykpIHtcbiAgICBWdWVDb21wb25lbnQgPSB2dWVPcHRpb25zO1xuICB9IGVsc2Uge1xuICAgIFZ1ZUNvbXBvbmVudCA9IFZ1ZS5leHRlbmQodnVlT3B0aW9ucyk7XG4gIH1cbiAgdnVlT3B0aW9ucyA9IFZ1ZUNvbXBvbmVudC5vcHRpb25zO1xuICByZXR1cm4gW1Z1ZUNvbXBvbmVudCwgdnVlT3B0aW9uc11cbn1cblxuZnVuY3Rpb24gaW5pdFNsb3RzICh2bSwgdnVlU2xvdHMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodnVlU2xvdHMpICYmIHZ1ZVNsb3RzLmxlbmd0aCkge1xuICAgIGNvbnN0ICRzbG90cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdnVlU2xvdHMuZm9yRWFjaChzbG90TmFtZSA9PiB7XG4gICAgICAkc2xvdHNbc2xvdE5hbWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB2bS4kc2NvcGVkU2xvdHMgPSB2bS4kc2xvdHMgPSAkc2xvdHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFZ1ZUlkcyAodnVlSWRzLCBtcEluc3RhbmNlKSB7XG4gIHZ1ZUlkcyA9ICh2dWVJZHMgfHwgJycpLnNwbGl0KCcsJyk7XG4gIGNvbnN0IGxlbiA9IHZ1ZUlkcy5sZW5ndGg7XG5cbiAgaWYgKGxlbiA9PT0gMSkge1xuICAgIG1wSW5zdGFuY2UuXyR2dWVJZCA9IHZ1ZUlkc1swXTtcbiAgfSBlbHNlIGlmIChsZW4gPT09IDIpIHtcbiAgICBtcEluc3RhbmNlLl8kdnVlSWQgPSB2dWVJZHNbMF07XG4gICAgbXBJbnN0YW5jZS5fJHZ1ZVBpZCA9IHZ1ZUlkc1sxXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0RGF0YSAodnVlT3B0aW9ucywgY29udGV4dCkge1xuICBsZXQgZGF0YSA9IHZ1ZU9wdGlvbnMuZGF0YSB8fCB7fTtcbiAgY29uc3QgbWV0aG9kcyA9IHZ1ZU9wdGlvbnMubWV0aG9kcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IGRhdGEuY2FsbChjb250ZXh0KTsgLy8g5pSv5oyBIFZ1ZS5wcm90b3R5cGUg5LiK5oyC55qE5pWw5o2uXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52LlZVRV9BUFBfREVCVUcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCfmoLnmja4gVnVlIOeahCBkYXRhIOWHveaVsOWIneWni+WMluWwj+eoi+W6jyBkYXRhIOWksei0pe+8jOivt+WwvemHj+ehruS/nSBkYXRhIOWHveaVsOS4reS4jeiuv+mXriB2bSDlr7nosaHvvIzlkKbliJnlj6/og73lvbHlk43pppbmrKHmlbDmja7muLLmn5PpgJ/luqbjgIInLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIOWvuSBkYXRhIOagvOW8j+WMllxuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9O1xuICB9XG5cbiAgT2JqZWN0LmtleXMobWV0aG9kcykuZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBpZiAoY29udGV4dC5fX2xpZmVjeWNsZV9ob29rc19fLmluZGV4T2YobWV0aG9kTmFtZSkgPT09IC0xICYmICFoYXNPd24oZGF0YSwgbWV0aG9kTmFtZSkpIHtcbiAgICAgIGRhdGFbbWV0aG9kTmFtZV0gPSBtZXRob2RzW21ldGhvZE5hbWVdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGFcbn1cblxuY29uc3QgUFJPUF9UWVBFUyA9IFtTdHJpbmcsIE51bWJlciwgQm9vbGVhbiwgT2JqZWN0LCBBcnJheSwgbnVsbF07XG5cbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyIChuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiBvYnNlcnZlciAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICBpZiAodGhpcy4kdm0pIHtcbiAgICAgIHRoaXMuJHZtW25hbWVdID0gbmV3VmFsOyAvLyDkuLrkuobop6blj5Hlhbbku5bpnZ4gcmVuZGVyIHdhdGNoZXJcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEJlaGF2aW9ycyAodnVlT3B0aW9ucywgaW5pdEJlaGF2aW9yKSB7XG4gIGNvbnN0IHZ1ZUJlaGF2aW9ycyA9IHZ1ZU9wdGlvbnMuYmVoYXZpb3JzO1xuICBjb25zdCB2dWVFeHRlbmRzID0gdnVlT3B0aW9ucy5leHRlbmRzO1xuICBjb25zdCB2dWVNaXhpbnMgPSB2dWVPcHRpb25zLm1peGlucztcblxuICBsZXQgdnVlUHJvcHMgPSB2dWVPcHRpb25zLnByb3BzO1xuXG4gIGlmICghdnVlUHJvcHMpIHtcbiAgICB2dWVPcHRpb25zLnByb3BzID0gdnVlUHJvcHMgPSBbXTtcbiAgfVxuXG4gIGNvbnN0IGJlaGF2aW9ycyA9IFtdO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2dWVCZWhhdmlvcnMpKSB7XG4gICAgdnVlQmVoYXZpb3JzLmZvckVhY2goYmVoYXZpb3IgPT4ge1xuICAgICAgYmVoYXZpb3JzLnB1c2goYmVoYXZpb3IucmVwbGFjZSgndW5pOi8vJywgYCR7XCJrc1wifTovL2ApKTtcbiAgICAgIGlmIChiZWhhdmlvciA9PT0gJ3VuaTovL2Zvcm0tZmllbGQnKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZ1ZVByb3BzKSkge1xuICAgICAgICAgIHZ1ZVByb3BzLnB1c2goJ25hbWUnKTtcbiAgICAgICAgICB2dWVQcm9wcy5wdXNoKCd2YWx1ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZ1ZVByb3BzLm5hbWUgPSB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgdnVlUHJvcHMudmFsdWUgPSB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXIsIEJvb2xlYW4sIEFycmF5LCBPYmplY3QsIERhdGVdLFxuICAgICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzUGxhaW5PYmplY3QodnVlRXh0ZW5kcykgJiYgdnVlRXh0ZW5kcy5wcm9wcykge1xuICAgIGJlaGF2aW9ycy5wdXNoKFxuICAgICAgaW5pdEJlaGF2aW9yKHtcbiAgICAgICAgcHJvcGVydGllczogaW5pdFByb3BlcnRpZXModnVlRXh0ZW5kcy5wcm9wcywgdHJ1ZSlcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2dWVNaXhpbnMpKSB7XG4gICAgdnVlTWl4aW5zLmZvckVhY2godnVlTWl4aW4gPT4ge1xuICAgICAgaWYgKGlzUGxhaW5PYmplY3QodnVlTWl4aW4pICYmIHZ1ZU1peGluLnByb3BzKSB7XG4gICAgICAgIGJlaGF2aW9ycy5wdXNoKFxuICAgICAgICAgIGluaXRCZWhhdmlvcih7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBpbml0UHJvcGVydGllcyh2dWVNaXhpbi5wcm9wcywgdHJ1ZSlcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBiZWhhdmlvcnNcbn1cblxuZnVuY3Rpb24gcGFyc2VQcm9wVHlwZSAoa2V5LCB0eXBlLCBkZWZhdWx0VmFsdWUsIGZpbGUpIHtcbiAgLy8gW1N0cmluZ109PlN0cmluZ1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSAmJiB0eXBlLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiB0eXBlWzBdXG4gIH1cbiAgcmV0dXJuIHR5cGVcbn1cblxuZnVuY3Rpb24gaW5pdFByb3BlcnRpZXMgKHByb3BzLCBpc0JlaGF2aW9yID0gZmFsc2UsIGZpbGUgPSAnJywgb3B0aW9ucykge1xuICBjb25zdCBwcm9wZXJ0aWVzID0ge307XG4gIGlmICghaXNCZWhhdmlvcikge1xuICAgIHByb3BlcnRpZXMudnVlSWQgPSB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJydcbiAgICB9O1xuICAgIC8vIHNjb3BlZFNsb3RzQ29tcGlsZXIgYXV0b1xuICAgIHByb3BlcnRpZXMuc2NvcGVkU2xvdHNDb21waWxlciA9IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gICAgcHJvcGVydGllcy52dWVTbG90cyA9IHsgLy8g5bCP56iL5bqP5LiN6IO955u05o6l5a6a5LmJICRzbG90cyDnmoQgcHJvcHPvvIzmiYDku6XpgJrov4cgdnVlU2xvdHMg6L2s5o2i5YiwICRzbG90c1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIHZhbHVlOiBbXSxcbiAgICAgIG9ic2VydmVyOiBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgY29uc3QgJHNsb3RzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbmV3VmFsLmZvckVhY2goc2xvdE5hbWUgPT4ge1xuICAgICAgICAgICRzbG90c1tzbG90TmFtZV0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAkc2xvdHNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcykpIHsgLy8gWyd0aXRsZSddXG4gICAgcHJvcHMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcHJvcGVydGllc1trZXldID0ge1xuICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICBvYnNlcnZlcjogY3JlYXRlT2JzZXJ2ZXIoa2V5KVxuICAgICAgfTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHByb3BzKSkgeyAvLyB7dGl0bGU6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6Jyd9LGNvbnRlbnQ6U3RyaW5nfVxuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBvcHRzID0gcHJvcHNba2V5XTtcbiAgICAgIGlmIChpc1BsYWluT2JqZWN0KG9wdHMpKSB7IC8vIHRpdGxlOnt0eXBlOlN0cmluZyxkZWZhdWx0OicnfVxuICAgICAgICBsZXQgdmFsdWUgPSBvcHRzLmRlZmF1bHQ7XG4gICAgICAgIGlmIChpc0ZuKHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMudHlwZSA9IHBhcnNlUHJvcFR5cGUoa2V5LCBvcHRzLnR5cGUpO1xuXG4gICAgICAgIHByb3BlcnRpZXNba2V5XSA9IHtcbiAgICAgICAgICB0eXBlOiBQUk9QX1RZUEVTLmluZGV4T2Yob3B0cy50eXBlKSAhPT0gLTEgPyBvcHRzLnR5cGUgOiBudWxsLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIG9ic2VydmVyOiBjcmVhdGVPYnNlcnZlcihrZXkpXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgeyAvLyBjb250ZW50OlN0cmluZ1xuICAgICAgICBjb25zdCB0eXBlID0gcGFyc2VQcm9wVHlwZShrZXksIG9wdHMpO1xuICAgICAgICBwcm9wZXJ0aWVzW2tleV0gPSB7XG4gICAgICAgICAgdHlwZTogUFJPUF9UWVBFUy5pbmRleE9mKHR5cGUpICE9PSAtMSA/IHR5cGUgOiBudWxsLFxuICAgICAgICAgIG9ic2VydmVyOiBjcmVhdGVPYnNlcnZlcihrZXkpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnRpZXNcbn1cblxuZnVuY3Rpb24gd3JhcHBlciQxIChldmVudCkge1xuICAvLyBUT0RPIOWPiOW+l+WFvOWuuSBtcHZ1ZSDnmoQgbXAg5a+56LGhXG4gIHRyeSB7XG4gICAgZXZlbnQubXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGV2ZW50KSk7XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IG5vb3A7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gbm9vcDtcblxuICBldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQgfHwge307XG5cbiAgaWYgKCFoYXNPd24oZXZlbnQsICdkZXRhaWwnKSkge1xuICAgIGV2ZW50LmRldGFpbCA9IHt9O1xuICB9XG5cbiAgaWYgKGhhc093bihldmVudCwgJ21hcmtlcklkJykpIHtcbiAgICBldmVudC5kZXRhaWwgPSB0eXBlb2YgZXZlbnQuZGV0YWlsID09PSAnb2JqZWN0JyA/IGV2ZW50LmRldGFpbCA6IHt9O1xuICAgIGV2ZW50LmRldGFpbC5tYXJrZXJJZCA9IGV2ZW50Lm1hcmtlcklkO1xuICB9XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QoZXZlbnQuZGV0YWlsKSkge1xuICAgIGV2ZW50LnRhcmdldCA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LnRhcmdldCwgZXZlbnQuZGV0YWlsKTtcbiAgfVxuXG4gIHJldHVybiBldmVudFxufVxuXG5mdW5jdGlvbiBnZXRFeHRyYVZhbHVlICh2bSwgZGF0YVBhdGhzQXJyYXkpIHtcbiAgbGV0IGNvbnRleHQgPSB2bTtcbiAgZGF0YVBhdGhzQXJyYXkuZm9yRWFjaChkYXRhUGF0aEFycmF5ID0+IHtcbiAgICBjb25zdCBkYXRhUGF0aCA9IGRhdGFQYXRoQXJyYXlbMF07XG4gICAgY29uc3QgdmFsdWUgPSBkYXRhUGF0aEFycmF5WzJdO1xuICAgIGlmIChkYXRhUGF0aCB8fCB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7IC8vIFsnJywnJyxpbmRleCwnZGlzYWJsZSddXG4gICAgICBjb25zdCBwcm9wUGF0aCA9IGRhdGFQYXRoQXJyYXlbMV07XG4gICAgICBjb25zdCB2YWx1ZVBhdGggPSBkYXRhUGF0aEFycmF5WzNdO1xuXG4gICAgICBsZXQgdkZvcjtcbiAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGRhdGFQYXRoKSkge1xuICAgICAgICB2Rm9yID0gZGF0YVBhdGg7XG4gICAgICB9IGVsc2UgaWYgKCFkYXRhUGF0aCkge1xuICAgICAgICB2Rm9yID0gY29udGV4dDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGFQYXRoID09PSAnc3RyaW5nJyAmJiBkYXRhUGF0aCkge1xuICAgICAgICBpZiAoZGF0YVBhdGguaW5kZXhPZignI3MjJykgPT09IDApIHtcbiAgICAgICAgICB2Rm9yID0gZGF0YVBhdGguc3Vic3RyKDMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZGb3IgPSB2bS5fX2dldF92YWx1ZShkYXRhUGF0aCwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodkZvcikpIHtcbiAgICAgICAgY29udGV4dCA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmICghcHJvcFBhdGgpIHtcbiAgICAgICAgY29udGV4dCA9IHZGb3JbdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodkZvcikpIHtcbiAgICAgICAgICBjb250ZXh0ID0gdkZvci5maW5kKHZGb3JJdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5fX2dldF92YWx1ZShwcm9wUGF0aCwgdkZvckl0ZW0pID09PSB2YWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodkZvcikpIHtcbiAgICAgICAgICBjb250ZXh0ID0gT2JqZWN0LmtleXModkZvcikuZmluZCh2Rm9yS2V5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2bS5fX2dldF92YWx1ZShwcm9wUGF0aCwgdkZvclt2Rm9yS2V5XSkgPT09IHZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcigndi1mb3Ig5pqC5LiN5pSv5oyB5b6q546v5pWw5o2u77yaJywgdkZvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlUGF0aCkge1xuICAgICAgICBjb250ZXh0ID0gdm0uX19nZXRfdmFsdWUodmFsdWVQYXRoLCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29udGV4dFxufVxuXG5mdW5jdGlvbiBwcm9jZXNzRXZlbnRFeHRyYSAodm0sIGV4dHJhLCBldmVudCwgX19hcmdzX18pIHtcbiAgY29uc3QgZXh0cmFPYmogPSB7fTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShleHRyYSkgJiYgZXh0cmEubGVuZ3RoKSB7XG4gICAgLyoqXG4gICAgICpbXG4gICAgICogICAgWydkYXRhLml0ZW1zJywgJ2RhdGEuaWQnLCBpdGVtLmRhdGEuaWRdLFxuICAgICAqICAgIFsnbWV0YXMnLCAnaWQnLCBtZXRhLmlkXVxuICAgICAqXSxcbiAgICAgKltcbiAgICAgKiAgICBbJ2RhdGEuaXRlbXMnLCAnZGF0YS5pZCcsIGl0ZW0uZGF0YS5pZF0sXG4gICAgICogICAgWydtZXRhcycsICdpZCcsIG1ldGEuaWRdXG4gICAgICpdLFxuICAgICAqJ3Rlc3QnXG4gICAgICovXG4gICAgZXh0cmEuZm9yRWFjaCgoZGF0YVBhdGgsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGRhdGFQYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoIWRhdGFQYXRoKSB7IC8vIG1vZGVsLHByb3Auc3luY1xuICAgICAgICAgIGV4dHJhT2JqWyckJyArIGluZGV4XSA9IHZtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChkYXRhUGF0aCA9PT0gJyRldmVudCcpIHsgLy8gJGV2ZW50XG4gICAgICAgICAgICBleHRyYU9ialsnJCcgKyBpbmRleF0gPSBldmVudDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFQYXRoID09PSAnYXJndW1lbnRzJykge1xuICAgICAgICAgICAgZXh0cmFPYmpbJyQnICsgaW5kZXhdID0gZXZlbnQuZGV0YWlsID8gZXZlbnQuZGV0YWlsLl9fYXJnc19fIHx8IF9fYXJnc19fIDogX19hcmdzX187XG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhUGF0aC5pbmRleE9mKCckZXZlbnQuJykgPT09IDApIHsgLy8gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgZXh0cmFPYmpbJyQnICsgaW5kZXhdID0gdm0uX19nZXRfdmFsdWUoZGF0YVBhdGgucmVwbGFjZSgnJGV2ZW50LicsICcnKSwgZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRyYU9ialsnJCcgKyBpbmRleF0gPSB2bS5fX2dldF92YWx1ZShkYXRhUGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleHRyYU9ialsnJCcgKyBpbmRleF0gPSBnZXRFeHRyYVZhbHVlKHZtLCBkYXRhUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZXh0cmFPYmpcbn1cblxuZnVuY3Rpb24gZ2V0T2JqQnlBcnJheSAoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJbaV07XG4gICAgb2JqW2VsZW1lbnRbMF1dID0gZWxlbWVudFsxXTtcbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFdmVudEFyZ3MgKHZtLCBldmVudCwgYXJncyA9IFtdLCBleHRyYSA9IFtdLCBpc0N1c3RvbSwgbWV0aG9kTmFtZSkge1xuICBsZXQgaXNDdXN0b21NUEV2ZW50ID0gZmFsc2U7IC8vIHd4Y29tcG9uZW50IOe7hOS7tu+8jOS8oOmAkuWOn+WniyBldmVudCDlr7nosaFcblxuICAvLyBmaXhlZCDnlKjmiLfnm7TmjqXop6blj5EgbXBJbnN0YW5jZS50cmlnZ2VyRXZlbnRcbiAgY29uc3QgX19hcmdzX18gPSBpc1BsYWluT2JqZWN0KGV2ZW50LmRldGFpbClcbiAgICA/IGV2ZW50LmRldGFpbC5fX2FyZ3NfXyB8fCBbZXZlbnQuZGV0YWlsXVxuICAgIDogW2V2ZW50LmRldGFpbF07XG5cbiAgaWYgKGlzQ3VzdG9tKSB7IC8vIOiHquWumuS5ieS6i+S7tlxuICAgIGlzQ3VzdG9tTVBFdmVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgJiZcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldCAmJlxuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbVR5cGUgPT09ICd3eCc7XG4gICAgaWYgKCFhcmdzLmxlbmd0aCkgeyAvLyDml6Dlj4LmlbDvvIznm7TmjqXkvKDlhaUgZXZlbnQg5oiWIGRldGFpbCDmlbDnu4RcbiAgICAgIGlmIChpc0N1c3RvbU1QRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIFtldmVudF1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfX2FyZ3NfX1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGV4dHJhT2JqID0gcHJvY2Vzc0V2ZW50RXh0cmEodm0sIGV4dHJhLCBldmVudCwgX19hcmdzX18pO1xuXG4gIGNvbnN0IHJldCA9IFtdO1xuICBhcmdzLmZvckVhY2goYXJnID0+IHtcbiAgICBpZiAoYXJnID09PSAnJGV2ZW50Jykge1xuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdfX3NldF9tb2RlbCcgJiYgIWlzQ3VzdG9tKSB7IC8vIGlucHV0IHYtbW9kZWwgdmFsdWVcbiAgICAgICAgcmV0LnB1c2goZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0N1c3RvbSAmJiAhaXNDdXN0b21NUEV2ZW50KSB7XG4gICAgICAgICAgcmV0LnB1c2goX19hcmdzX19bMF0pO1xuICAgICAgICB9IGVsc2UgeyAvLyB3eGNvbXBvbmVudCDnu4Tku7bmiJblhoXnva7nu4Tku7ZcbiAgICAgICAgICByZXQucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSAmJiBhcmdbMF0gPT09ICdvJykge1xuICAgICAgICByZXQucHVzaChnZXRPYmpCeUFycmF5KGFyZykpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJiBoYXNPd24oZXh0cmFPYmosIGFyZykpIHtcbiAgICAgICAgcmV0LnB1c2goZXh0cmFPYmpbYXJnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQucHVzaChhcmcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJldFxufVxuXG5jb25zdCBPTkNFID0gJ34nO1xuY29uc3QgQ1VTVE9NID0gJ14nO1xuXG5mdW5jdGlvbiBpc01hdGNoRXZlbnRUeXBlIChldmVudFR5cGUsIG9wdFR5cGUpIHtcbiAgcmV0dXJuIChldmVudFR5cGUgPT09IG9wdFR5cGUpIHx8XG4gICAgKFxuICAgICAgb3B0VHlwZSA9PT0gJ3JlZ2lvbmNoYW5nZScgJiZcbiAgICAgIChcbiAgICAgICAgZXZlbnRUeXBlID09PSAnYmVnaW4nIHx8XG4gICAgICAgIGV2ZW50VHlwZSA9PT0gJ2VuZCdcbiAgICAgIClcbiAgICApXG59XG5cbmZ1bmN0aW9uIGdldENvbnRleHRWbSAodm0pIHtcbiAgbGV0ICRwYXJlbnQgPSB2bS4kcGFyZW50O1xuICAvLyDniLbnu4Tku7bmmK8gc2NvcGVkIHNsb3RzIOaIluiAheWFtuS7luiHquWumuS5iee7hOS7tuaXtue7p+e7reafpeaJvlxuICB3aGlsZSAoJHBhcmVudCAmJiAkcGFyZW50LiRwYXJlbnQgJiYgKCRwYXJlbnQuJG9wdGlvbnMuZ2VuZXJpYyB8fCAkcGFyZW50LiRwYXJlbnQuJG9wdGlvbnMuZ2VuZXJpYyB8fCAkcGFyZW50LiRzY29wZS5fJHZ1ZVBpZCkpIHtcbiAgICAkcGFyZW50ID0gJHBhcmVudC4kcGFyZW50O1xuICB9XG4gIHJldHVybiAkcGFyZW50ICYmICRwYXJlbnQuJHBhcmVudFxufVxuXG5mdW5jdGlvbiBoYW5kbGVFdmVudCAoZXZlbnQpIHtcbiAgZXZlbnQgPSB3cmFwcGVyJDEoZXZlbnQpO1xuXG4gIC8vIFtbJ3RhcCcsW1snaGFuZGxlJyxbMSwyLGFdXSxbJ2hhbmRsZTEnLFsxLDIsYV1dXV1dXG4gIGNvbnN0IGRhdGFzZXQgPSAoZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQpLmRhdGFzZXQ7XG4gIGlmICghZGF0YXNldCkge1xuICAgIHJldHVybiBjb25zb2xlLndhcm4oJ+S6i+S7tuS/oeaBr+S4jeWtmOWcqCcpXG4gIH1cbiAgY29uc3QgZXZlbnRPcHRzID0gZGF0YXNldC5ldmVudE9wdHMgfHwgZGF0YXNldFsnZXZlbnQtb3B0cyddOyAvLyDmlK/ku5jlrp0gd2ViLXZpZXcg57uE5Lu2IGRhdGFzZXQg6Z2e6am85bOwXG4gIGlmICghZXZlbnRPcHRzKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUud2Fybign5LqL5Lu25L+h5oGv5LiN5a2Y5ZyoJylcbiAgfVxuXG4gIC8vIFtbJ2hhbmRsZScsWzEsMixhXV0sWydoYW5kbGUxJyxbMSwyLGFdXV1cbiAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblxuICBjb25zdCByZXQgPSBbXTtcblxuICBldmVudE9wdHMuZm9yRWFjaChldmVudE9wdCA9PiB7XG4gICAgbGV0IHR5cGUgPSBldmVudE9wdFswXTtcbiAgICBjb25zdCBldmVudHNBcnJheSA9IGV2ZW50T3B0WzFdO1xuXG4gICAgY29uc3QgaXNDdXN0b20gPSB0eXBlLmNoYXJBdCgwKSA9PT0gQ1VTVE9NO1xuICAgIHR5cGUgPSBpc0N1c3RvbSA/IHR5cGUuc2xpY2UoMSkgOiB0eXBlO1xuICAgIGNvbnN0IGlzT25jZSA9IHR5cGUuY2hhckF0KDApID09PSBPTkNFO1xuICAgIHR5cGUgPSBpc09uY2UgPyB0eXBlLnNsaWNlKDEpIDogdHlwZTtcblxuICAgIGlmIChldmVudHNBcnJheSAmJiBpc01hdGNoRXZlbnRUeXBlKGV2ZW50VHlwZSwgdHlwZSkpIHtcbiAgICAgIGV2ZW50c0FycmF5LmZvckVhY2goZXZlbnRBcnJheSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBldmVudEFycmF5WzBdO1xuICAgICAgICBpZiAobWV0aG9kTmFtZSkge1xuICAgICAgICAgIGxldCBoYW5kbGVyQ3R4ID0gdGhpcy4kdm07XG4gICAgICAgICAgaWYgKGhhbmRsZXJDdHguJG9wdGlvbnMuZ2VuZXJpYykgeyAvLyBtcC13ZWl4aW4sbXAtdG91dGlhbyDmir3osaHoioLngrnmqKHmi58gc2NvcGVkIHNsb3RzXG4gICAgICAgICAgICBoYW5kbGVyQ3R4ID0gZ2V0Q29udGV4dFZtKGhhbmRsZXJDdHgpIHx8IGhhbmRsZXJDdHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnJGVtaXQnKSB7XG4gICAgICAgICAgICBoYW5kbGVyQ3R4LiRlbWl0LmFwcGx5KGhhbmRsZXJDdHgsXG4gICAgICAgICAgICAgIHByb2Nlc3NFdmVudEFyZ3MoXG4gICAgICAgICAgICAgICAgdGhpcy4kdm0sXG4gICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgZXZlbnRBcnJheVsxXSxcbiAgICAgICAgICAgICAgICBldmVudEFycmF5WzJdLFxuICAgICAgICAgICAgICAgIGlzQ3VzdG9tLFxuICAgICAgICAgICAgICAgIG1ldGhvZE5hbWVcbiAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJDdHhbbWV0aG9kTmFtZV07XG4gICAgICAgICAgaWYgKCFpc0ZuKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy4kdm0ubXBUeXBlID09PSAncGFnZScgPyAnUGFnZScgOiAnQ29tcG9uZW50JztcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnJvdXRlIHx8IHRoaXMuaXM7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dHlwZX0gXCIke3BhdGh9XCIgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBcIiR7bWV0aG9kTmFtZX1cImApXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc09uY2UpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLm9uY2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYW5kbGVyLm9uY2UgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgcGFyYW1zID0gcHJvY2Vzc0V2ZW50QXJncyhcbiAgICAgICAgICAgIHRoaXMuJHZtLFxuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICBldmVudEFycmF5WzFdLFxuICAgICAgICAgICAgZXZlbnRBcnJheVsyXSxcbiAgICAgICAgICAgIGlzQ3VzdG9tLFxuICAgICAgICAgICAgbWV0aG9kTmFtZVxuICAgICAgICAgICk7XG4gICAgICAgICAgcGFyYW1zID0gQXJyYXkuaXNBcnJheShwYXJhbXMpID8gcGFyYW1zIDogW107XG4gICAgICAgICAgLy8g5Y+C5pWw5bC+6YOo5aKe5Yqg5Y6f5aeL5LqL5Lu25a+56LGh55So5LqO5aSN5p2C6KGo6L6+5byP5YaF6I635Y+W6aKd5aSW5pWw5o2uXG4gICAgICAgICAgaWYgKC89XFxzKlxcUytcXC5ldmVudFBhcmFtc1xccypcXHxcXHxcXHMqXFxTK1xcW1snXCJdZXZlbnQtcGFyYW1zWydcIl1cXF0vLnRlc3QoaGFuZGxlci50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNwYXJzZS1hcnJheXNcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcy5jb25jYXQoWywgLCAsICwgLCAsICwgLCAsICwgZXZlbnRdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0LnB1c2goaGFuZGxlci5hcHBseShoYW5kbGVyQ3R4LCBwYXJhbXMpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBpZiAoXG4gICAgZXZlbnRUeXBlID09PSAnaW5wdXQnICYmXG4gICAgcmV0Lmxlbmd0aCA9PT0gMSAmJlxuICAgIHR5cGVvZiByZXRbMF0gIT09ICd1bmRlZmluZWQnXG4gICkge1xuICAgIHJldHVybiByZXRbMF1cbiAgfVxufVxuXG5jb25zdCBob29rcyA9IFtcbiAgJ29uU2hvdycsXG4gICdvbkhpZGUnLFxuICAnb25FcnJvcicsXG4gICdvblBhZ2VOb3RGb3VuZCcsXG4gICdvblRoZW1lQ2hhbmdlJyxcbiAgJ29uVW5oYW5kbGVkUmVqZWN0aW9uJ1xuXTtcblxuZnVuY3Rpb24gaW5pdEV2ZW50Q2hhbm5lbCQxICgpIHtcbiAgVnVlLnByb3RvdHlwZS5nZXRPcGVuZXJFdmVudENoYW5uZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9fZXZlbnRDaGFubmVsX18pIHtcbiAgICAgIHRoaXMuX19ldmVudENoYW5uZWxfXyA9IG5ldyBFdmVudENoYW5uZWwoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX19ldmVudENoYW5uZWxfX1xuICB9O1xuICBjb25zdCBjYWxsSG9vayA9IFZ1ZS5wcm90b3R5cGUuX19jYWxsX2hvb2s7XG4gIFZ1ZS5wcm90b3R5cGUuX19jYWxsX2hvb2sgPSBmdW5jdGlvbiAoaG9vaywgYXJncykge1xuICAgIGlmIChob29rID09PSAnb25Mb2FkJyAmJiBhcmdzICYmIGFyZ3MuX19pZF9fKSB7XG4gICAgICB0aGlzLl9fZXZlbnRDaGFubmVsX18gPSBnZXRFdmVudENoYW5uZWwoYXJncy5fX2lkX18pO1xuICAgICAgZGVsZXRlIGFyZ3MuX19pZF9fO1xuICAgIH1cbiAgICByZXR1cm4gY2FsbEhvb2suY2FsbCh0aGlzLCBob29rLCBhcmdzKVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0U2NvcGVkU2xvdHNQYXJhbXMgKCkge1xuICBjb25zdCBjZW50ZXIgPSB7fTtcbiAgY29uc3QgcGFyZW50cyA9IHt9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGhhc1Njb3BlZFNsb3RzUGFyYW1zID0gZnVuY3Rpb24gKHZ1ZUlkKSB7XG4gICAgY29uc3QgaGFzID0gY2VudGVyW3Z1ZUlkXTtcbiAgICBpZiAoIWhhcykge1xuICAgICAgcGFyZW50c1t2dWVJZF0gPSB0aGlzO1xuICAgICAgdGhpcy4kb24oJ2hvb2s6ZGVzdHJveWVkJywgKCkgPT4ge1xuICAgICAgICBkZWxldGUgcGFyZW50c1t2dWVJZF07XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc1xuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGdldFNjb3BlZFNsb3RzUGFyYW1zID0gZnVuY3Rpb24gKHZ1ZUlkLCBuYW1lLCBrZXkpIHtcbiAgICBjb25zdCBkYXRhID0gY2VudGVyW3Z1ZUlkXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgY29uc3Qgb2JqZWN0ID0gZGF0YVtuYW1lXSB8fCB7fTtcbiAgICAgIHJldHVybiBrZXkgPyBvYmplY3Rba2V5XSA6IG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnRzW3Z1ZUlkXSA9IHRoaXM7XG4gICAgICB0aGlzLiRvbignaG9vazpkZXN0cm95ZWQnLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBwYXJlbnRzW3Z1ZUlkXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRzZXRTY29wZWRTbG90c1BhcmFtcyA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIGNvbnN0IHZ1ZUlkcyA9IHRoaXMuJG9wdGlvbnMucHJvcHNEYXRhLnZ1ZUlkO1xuICAgIGlmICh2dWVJZHMpIHtcbiAgICAgIGNvbnN0IHZ1ZUlkID0gdnVlSWRzLnNwbGl0KCcsJylbMF07XG4gICAgICBjb25zdCBvYmplY3QgPSBjZW50ZXJbdnVlSWRdID0gY2VudGVyW3Z1ZUlkXSB8fCB7fTtcbiAgICAgIG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgaWYgKHBhcmVudHNbdnVlSWRdKSB7XG4gICAgICAgIHBhcmVudHNbdnVlSWRdLiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBWdWUubWl4aW4oe1xuICAgIGRlc3Ryb3llZCAoKSB7XG4gICAgICBjb25zdCBwcm9wc0RhdGEgPSB0aGlzLiRvcHRpb25zLnByb3BzRGF0YTtcbiAgICAgIGNvbnN0IHZ1ZUlkID0gcHJvcHNEYXRhICYmIHByb3BzRGF0YS52dWVJZDtcbiAgICAgIGlmICh2dWVJZCkge1xuICAgICAgICBkZWxldGUgY2VudGVyW3Z1ZUlkXTtcbiAgICAgICAgZGVsZXRlIHBhcmVudHNbdnVlSWRdO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmFzZUFwcCAodm0sIHtcbiAgbW9ja3MsXG4gIGluaXRSZWZzXG59KSB7XG4gIGluaXRFdmVudENoYW5uZWwkMSgpO1xuICB7XG4gICAgaW5pdFNjb3BlZFNsb3RzUGFyYW1zKCk7XG4gIH1cbiAgaWYgKHZtLiRvcHRpb25zLnN0b3JlKSB7XG4gICAgVnVlLnByb3RvdHlwZS4kc3RvcmUgPSB2bS4kb3B0aW9ucy5zdG9yZTtcbiAgfVxuICB1bmlJZE1peGluKFZ1ZSk7XG5cbiAgVnVlLnByb3RvdHlwZS5tcEhvc3QgPSBcIm1wLWt1YWlzaG91XCI7XG5cbiAgVnVlLm1peGluKHtcbiAgICBiZWZvcmVDcmVhdGUgKCkge1xuICAgICAgaWYgKCF0aGlzLiRvcHRpb25zLm1wVHlwZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5tcFR5cGUgPSB0aGlzLiRvcHRpb25zLm1wVHlwZTtcblxuICAgICAgdGhpcy4kbXAgPSB7XG4gICAgICAgIGRhdGE6IHt9LFxuICAgICAgICBbdGhpcy5tcFR5cGVdOiB0aGlzLiRvcHRpb25zLm1wSW5zdGFuY2VcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuJHNjb3BlID0gdGhpcy4kb3B0aW9ucy5tcEluc3RhbmNlO1xuXG4gICAgICBkZWxldGUgdGhpcy4kb3B0aW9ucy5tcFR5cGU7XG4gICAgICBkZWxldGUgdGhpcy4kb3B0aW9ucy5tcEluc3RhbmNlO1xuICAgICAgaWYgKHRoaXMubXBUeXBlID09PSAncGFnZScgJiYgdHlwZW9mIGdldEFwcCA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBoYWNrIHZ1ZS1pMThuXG4gICAgICAgIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xuICAgICAgICBpZiAoYXBwLiR2bSAmJiBhcHAuJHZtLiRpMThuKSB7XG4gICAgICAgICAgdGhpcy5faTE4biA9IGFwcC4kdm0uJGkxOG47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1wVHlwZSAhPT0gJ2FwcCcpIHtcbiAgICAgICAgaW5pdFJlZnModGhpcyk7XG4gICAgICAgIGluaXRNb2Nrcyh0aGlzLCBtb2Nrcyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBhcHBPcHRpb25zID0ge1xuICAgIG9uTGF1bmNoIChhcmdzKSB7XG4gICAgICBpZiAodGhpcy4kdm0pIHsgLy8g5bey57uP5Yid5aeL5YyW6L+H5LqG77yM5Li76KaB5piv5Li65LqG55m+5bqm77yM55m+5bqmIG9uU2hvdyDlnKggb25MYXVuY2gg5LmL5YmNXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLiR2bSA9IHZtO1xuXG4gICAgICB0aGlzLiR2bS4kbXAgPSB7XG4gICAgICAgIGFwcDogdGhpc1xuICAgICAgfTtcblxuICAgICAgdGhpcy4kdm0uJHNjb3BlID0gdGhpcztcbiAgICAgIC8vIHZtIOS4iuS5n+aMgui9vSBnbG9iYWxEYXRhXG4gICAgICB0aGlzLiR2bS5nbG9iYWxEYXRhID0gdGhpcy5nbG9iYWxEYXRhO1xuXG4gICAgICB0aGlzLiR2bS5faXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdtb3VudGVkJywgYXJncyk7XG5cbiAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvbkxhdW5jaCcsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICAvLyDlhbzlrrnml6fniYjmnKwgZ2xvYmFsRGF0YVxuICBhcHBPcHRpb25zLmdsb2JhbERhdGEgPSB2bS4kb3B0aW9ucy5nbG9iYWxEYXRhIHx8IHt9O1xuICAvLyDlsIYgbWV0aG9kcyDkuK3nmoTmlrnms5XmjILlnKggZ2V0QXBwKCkg5LitXG4gIGNvbnN0IG1ldGhvZHMgPSB2bS4kb3B0aW9ucy5tZXRob2RzO1xuICBpZiAobWV0aG9kcykge1xuICAgIE9iamVjdC5rZXlzKG1ldGhvZHMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICBhcHBPcHRpb25zW25hbWVdID0gbWV0aG9kc1tuYW1lXTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRBcHBMb2NhbGUoVnVlLCB2bSwgbm9ybWFsaXplTG9jYWxlKGtzLmdldFN5c3RlbUluZm9TeW5jKCkubGFuZ3VhZ2UpIHx8IExPQ0FMRV9FTik7XG5cbiAgaW5pdEhvb2tzKGFwcE9wdGlvbnMsIGhvb2tzKTtcbiAgaW5pdFVua25vd25Ib29rcyhhcHBPcHRpb25zLCB2bS4kb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGFwcE9wdGlvbnNcbn1cblxuZnVuY3Rpb24gcGFyc2VBcHAgKHZtKSB7XG4gIHJldHVybiBwYXJzZUJhc2VBcHAodm0sIHtcbiAgICBtb2NrcyxcbiAgICBpbml0UmVmc1xuICB9KVxufVxuXG5mdW5jdGlvbiBwYXJzZUFwcCQxICh2bSkge1xuICByZXR1cm4gcGFyc2VBcHAodm0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFwcCAodm0pIHtcbiAgQXBwKHBhcnNlQXBwJDEodm0pKTtcbiAgcmV0dXJuIHZtXG59XG5cbmNvbnN0IGVuY29kZVJlc2VydmVSRSA9IC9bIScoKSpdL2c7XG5jb25zdCBlbmNvZGVSZXNlcnZlUmVwbGFjZXIgPSBjID0+ICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XG5jb25zdCBjb21tYVJFID0gLyUyQy9nO1xuXG4vLyBmaXhlZCBlbmNvZGVVUklDb21wb25lbnQgd2hpY2ggaXMgbW9yZSBjb25mb3JtYW50IHRvIFJGQzM5ODY6XG4vLyAtIGVzY2FwZXMgWyEnKCkqXVxuLy8gLSBwcmVzZXJ2ZSBjb21tYXNcbmNvbnN0IGVuY29kZSA9IHN0ciA9PiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAucmVwbGFjZShlbmNvZGVSZXNlcnZlUkUsIGVuY29kZVJlc2VydmVSZXBsYWNlcilcbiAgLnJlcGxhY2UoY29tbWFSRSwgJywnKTtcblxuZnVuY3Rpb24gc3RyaW5naWZ5UXVlcnkgKG9iaiwgZW5jb2RlU3RyID0gZW5jb2RlKSB7XG4gIGNvbnN0IHJlcyA9IG9iaiA/IE9iamVjdC5rZXlzKG9iaikubWFwKGtleSA9PiB7XG4gICAgY29uc3QgdmFsID0gb2JqW2tleV07XG5cbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbmNvZGVTdHIoa2V5KVxuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgdmFsLmZvckVhY2godmFsMiA9PiB7XG4gICAgICAgIGlmICh2YWwyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsMiA9PT0gbnVsbCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVN0cihrZXkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVTdHIoa2V5KSArICc9JyArIGVuY29kZVN0cih2YWwyKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcmJylcbiAgICB9XG5cbiAgICByZXR1cm4gZW5jb2RlU3RyKGtleSkgKyAnPScgKyBlbmNvZGVTdHIodmFsKVxuICB9KS5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmpvaW4oJyYnKSA6IG51bGw7XG4gIHJldHVybiByZXMgPyBgPyR7cmVzfWAgOiAnJ1xufVxuXG5mdW5jdGlvbiBwYXJzZUJhc2VDb21wb25lbnQgKHZ1ZUNvbXBvbmVudE9wdGlvbnMsIHtcbiAgaXNQYWdlLFxuICBpbml0UmVsYXRpb25cbn0gPSB7fSwgbmVlZFZ1ZU9wdGlvbnMpIHtcbiAgY29uc3QgW1Z1ZUNvbXBvbmVudCwgdnVlT3B0aW9uc10gPSBpbml0VnVlQ29tcG9uZW50KFZ1ZSwgdnVlQ29tcG9uZW50T3B0aW9ucyk7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBtdWx0aXBsZVNsb3RzOiB0cnVlLFxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxuICAgIC4uLih2dWVPcHRpb25zLm9wdGlvbnMgfHwge30pXG4gIH07XG5cbiAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9IHtcbiAgICBvcHRpb25zLFxuICAgIGRhdGE6IGluaXREYXRhKHZ1ZU9wdGlvbnMsIFZ1ZS5wcm90b3R5cGUpLFxuICAgIGJlaGF2aW9yczogaW5pdEJlaGF2aW9ycyh2dWVPcHRpb25zLCBpbml0QmVoYXZpb3IpLFxuICAgIHByb3BlcnRpZXM6IGluaXRQcm9wZXJ0aWVzKHZ1ZU9wdGlvbnMucHJvcHMsIGZhbHNlLCB2dWVPcHRpb25zLl9fZmlsZSksXG4gICAgbGlmZXRpbWVzOiB7XG4gICAgICBhdHRhY2hlZCAoKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICBtcFR5cGU6IGlzUGFnZS5jYWxsKHRoaXMpID8gJ3BhZ2UnIDogJ2NvbXBvbmVudCcsXG4gICAgICAgICAgbXBJbnN0YW5jZTogdGhpcyxcbiAgICAgICAgICBwcm9wc0RhdGE6IHByb3BlcnRpZXNcbiAgICAgICAgfTtcblxuICAgICAgICBpbml0VnVlSWRzKHByb3BlcnRpZXMudnVlSWQsIHRoaXMpO1xuXG4gICAgICAgIC8vIOWkhOeQhueItuWtkOWFs+ezu1xuICAgICAgICBpbml0UmVsYXRpb24uY2FsbCh0aGlzLCB7XG4gICAgICAgICAgdnVlUGlkOiB0aGlzLl8kdnVlUGlkLFxuICAgICAgICAgIHZ1ZU9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyWIHZ1ZSDlrp7kvotcbiAgICAgICAgdGhpcy4kdm0gPSBuZXcgVnVlQ29tcG9uZW50KG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIOWkhOeQhiRzbG90cywkc2NvcGVkU2xvdHPvvIjmmoLkuI3mlK/mjIHliqjmgIHlj5jljJYkc2xvdHPvvIlcbiAgICAgICAgaW5pdFNsb3RzKHRoaXMuJHZtLCBwcm9wZXJ0aWVzLnZ1ZVNsb3RzKTtcblxuICAgICAgICAvLyDop6blj5HpppbmrKEgc2V0RGF0YVxuICAgICAgICB0aGlzLiR2bS4kbW91bnQoKTtcbiAgICAgIH0sXG4gICAgICByZWFkeSAoKSB7XG4gICAgICAgIC8vIOW9k+e7hOS7tiBwcm9wcyDpu5jorqTlgLzkuLogdHJ1Ze+8jOWIneWni+WMluaXtuS8oOWFpSBmYWxzZSDkvJrlr7zoh7QgY3JlYXRlZCxyZWFkeSDop6blj5EsIOS9hiBhdHRhY2hlZCDkuI3op6blj5FcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLndlaXhpbi5xcS5jb20vY29tbXVuaXR5L2RldmVsb3AvZG9jLzAwMDY2YWUyODQ0Y2MwZjhlYjg4M2UyYTU1NzgwMFxuICAgICAgICBpZiAodGhpcy4kdm0pIHtcbiAgICAgICAgICB0aGlzLiR2bS5faXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnbW91bnRlZCcpO1xuICAgICAgICAgIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblJlYWR5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXRhY2hlZCAoKSB7XG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLiRkZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwYWdlTGlmZXRpbWVzOiB7XG4gICAgICBzaG93IChhcmdzKSB7XG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblBhZ2VTaG93JywgYXJncyk7XG4gICAgICB9LFxuICAgICAgaGlkZSAoKSB7XG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblBhZ2VIaWRlJyk7XG4gICAgICB9LFxuICAgICAgcmVzaXplIChzaXplKSB7XG4gICAgICAgIHRoaXMuJHZtICYmIHRoaXMuJHZtLl9fY2FsbF9ob29rKCdvblBhZ2VSZXNpemUnLCBzaXplKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIF9fbDogaGFuZGxlTGluayxcbiAgICAgIF9fZTogaGFuZGxlRXZlbnRcbiAgICB9XG4gIH07XG4gIC8vIGV4dGVybmFsQ2xhc3Nlc1xuICBpZiAodnVlT3B0aW9ucy5leHRlcm5hbENsYXNzZXMpIHtcbiAgICBjb21wb25lbnRPcHRpb25zLmV4dGVybmFsQ2xhc3NlcyA9IHZ1ZU9wdGlvbnMuZXh0ZXJuYWxDbGFzc2VzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodnVlT3B0aW9ucy53eHNDYWxsTWV0aG9kcykpIHtcbiAgICB2dWVPcHRpb25zLnd4c0NhbGxNZXRob2RzLmZvckVhY2goY2FsbE1ldGhvZCA9PiB7XG4gICAgICBjb21wb25lbnRPcHRpb25zLm1ldGhvZHNbY2FsbE1ldGhvZF0gPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy4kdm1bY2FsbE1ldGhvZF0oYXJncylcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBpZiAobmVlZFZ1ZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gW2NvbXBvbmVudE9wdGlvbnMsIHZ1ZU9wdGlvbnMsIFZ1ZUNvbXBvbmVudF1cbiAgfVxuICBpZiAoaXNQYWdlKSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudE9wdGlvbnNcbiAgfVxuICByZXR1cm4gW2NvbXBvbmVudE9wdGlvbnMsIFZ1ZUNvbXBvbmVudF1cbn1cblxuZnVuY3Rpb24gcGFyc2VDb21wb25lbnQgKHZ1ZUNvbXBvbmVudE9wdGlvbnMsIG5lZWRWdWVPcHRpb25zKSB7XG4gIHJldHVybiBwYXJzZUJhc2VDb21wb25lbnQodnVlQ29tcG9uZW50T3B0aW9ucywge1xuICAgIGlzUGFnZSxcbiAgICBpbml0UmVsYXRpb25cbiAgfSwgbmVlZFZ1ZU9wdGlvbnMpXG59XG5cbi8qKlxuICog55So5LqO5bu26L+f6LCD55SoIHNldERhdGFcbiAqIOWcqCBzZXREYXRhIOecn+Wunuiwg+eUqOeahOaXtuacuumcgOaJp+ihjCBmaXhTZXREYXRhRW5kXG4gKiBAcGFyYW0geyp9IG1wSW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gZml4U2V0RGF0YVN0YXJ0IChtcEluc3RhbmNlKSB7XG4gIGNvbnN0IHNldERhdGEgPSBtcEluc3RhbmNlLnNldERhdGE7XG4gIGNvbnN0IHNldERhdGFBcmdzID0gW107XG4gIG1wSW5zdGFuY2Uuc2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXREYXRhQXJncy5wdXNoKGFyZ3VtZW50cyk7XG4gIH07XG4gIG1wSW5zdGFuY2UuX19maXhJbml0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldERhdGEgPSBzZXREYXRhO1xuICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgc2V0RGF0YUFyZ3MuZm9yRWFjaChhcmdzID0+IHtcbiAgICAgICAgc2V0RGF0YS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKHNldERhdGFBcmdzLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuZ3JvdXBTZXREYXRhKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBTZXREYXRhKGZuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuLyoqXG4gKiDmgaLlpI3nnJ/lrp7nmoQgc2V0RGF0YSDmlrnms5VcbiAqIEBwYXJhbSB7Kn0gbXBJbnN0YW5jZVxuICovXG5mdW5jdGlvbiBmaXhTZXREYXRhRW5kIChtcEluc3RhbmNlKSB7XG4gIGlmIChtcEluc3RhbmNlLl9fZml4SW5pdERhdGEpIHtcbiAgICBtcEluc3RhbmNlLl9fZml4SW5pdERhdGEoKTtcbiAgICBkZWxldGUgbXBJbnN0YW5jZS5fX2ZpeEluaXREYXRhO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29tcG9uZW50JDEgKHZ1ZUNvbXBvbmVudE9wdGlvbnMsIG5lZWRWdWVPcHRpb25zKSB7XG4gIGNvbnN0IFtjb21wb25lbnRPcHRpb25zLCB2dWVPcHRpb25zXSA9IHBhcnNlQ29tcG9uZW50KHZ1ZUNvbXBvbmVudE9wdGlvbnMsIHRydWUpO1xuICBjb25zdCBvbGRBdHRhY2hlZCA9IGNvbXBvbmVudE9wdGlvbnMubGlmZXRpbWVzLmF0dGFjaGVkO1xuICBjb21wb25lbnRPcHRpb25zLmxpZmV0aW1lcy5hdHRhY2hlZCA9IGZ1bmN0aW9uIGF0dGFjaGVkICgpIHtcbiAgICAvLyDmmoLkuI3ljLrliIbniYjmnKxcbiAgICBpZiAoaXNQYWdlLmNhbGwodGhpcykpIHtcbiAgICAgIC8vIOino+WGs+W/q+aJi+Wwj+eoi+W6j+mhtemdoiBhdHRhY2hlZCDnlJ/lkb3lkajmnJ8gc2V0RGF0YSDlr7zoh7TmlbDmja7lkIzmraXlvILluLjnmoTpl67pophcbiAgICAgIGZpeFNldERhdGFTdGFydCh0aGlzKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBmaXhTZXREYXRhRW5kKHRoaXMpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICAgIG9sZEF0dGFjaGVkLmNhbGwodGhpcyk7XG4gIH07XG4gIHJldHVybiBuZWVkVnVlT3B0aW9ucyA/IFtjb21wb25lbnRPcHRpb25zLCB2dWVPcHRpb25zXSA6IGNvbXBvbmVudE9wdGlvbnNcbn1cblxuY29uc3QgaG9va3MkMSA9IFtcbiAgJ29uU2hvdycsXG4gICdvbkhpZGUnLFxuICAnb25VbmxvYWQnXG5dO1xuXG5ob29rcyQxLnB1c2goLi4uUEFHRV9FVkVOVF9IT09LUyk7XG5cbmZ1bmN0aW9uIHBhcnNlQmFzZVBhZ2UgKHZ1ZVBhZ2VPcHRpb25zKSB7XG4gIGNvbnN0IFtwYWdlT3B0aW9ucywgdnVlT3B0aW9uc10gPSBwYXJzZUNvbXBvbmVudCQxKHZ1ZVBhZ2VPcHRpb25zLCB0cnVlKTtcblxuICBpbml0SG9va3MocGFnZU9wdGlvbnMubWV0aG9kcywgaG9va3MkMSwgdnVlT3B0aW9ucyk7XG5cbiAgcGFnZU9wdGlvbnMubWV0aG9kcy5vbkxvYWQgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBxdWVyeTtcbiAgICBjb25zdCBjb3B5UXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSk7XG4gICAgZGVsZXRlIGNvcHlRdWVyeS5fX2lkX187XG4gICAgdGhpcy4kcGFnZSA9IHtcbiAgICAgIGZ1bGxQYXRoOiAnLycgKyAodGhpcy5yb3V0ZSB8fCB0aGlzLmlzKSArIHN0cmluZ2lmeVF1ZXJ5KGNvcHlRdWVyeSlcbiAgICB9O1xuICAgIHRoaXMuJHZtLiRtcC5xdWVyeSA9IHF1ZXJ5OyAvLyDlhbzlrrkgbXB2dWVcbiAgICB0aGlzLiR2bS5fX2NhbGxfaG9vaygnb25Mb2FkJywgcXVlcnkpO1xuICB9O1xuICB7XG4gICAgaW5pdFVua25vd25Ib29rcyhwYWdlT3B0aW9ucy5tZXRob2RzLCB2dWVQYWdlT3B0aW9ucywgWydvblJlYWR5J10pO1xuICB9XG5cbiAgcmV0dXJuIHBhZ2VPcHRpb25zXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFnZSAodnVlUGFnZU9wdGlvbnMpIHtcbiAgcmV0dXJuIHBhcnNlQmFzZVBhZ2UodnVlUGFnZU9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFnZSQxICh2dWVQYWdlT3B0aW9ucykge1xuICByZXR1cm4gcGFyc2VQYWdlKHZ1ZVBhZ2VPcHRpb25zKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQYWdlICh2dWVQYWdlT3B0aW9ucykge1xuICB7XG4gICAgcmV0dXJuIENvbXBvbmVudChwYXJzZVBhZ2UkMSh2dWVQYWdlT3B0aW9ucykpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50ICh2dWVPcHRpb25zKSB7XG4gIHtcbiAgICByZXR1cm4gQ29tcG9uZW50KHBhcnNlQ29tcG9uZW50JDEodnVlT3B0aW9ucykpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3VicGFja2FnZUFwcCAodm0pIHtcbiAgY29uc3QgYXBwT3B0aW9ucyA9IHBhcnNlQXBwJDEodm0pO1xuICBjb25zdCBhcHAgPSBnZXRBcHAoe1xuICAgIGFsbG93RGVmYXVsdDogdHJ1ZVxuICB9KTtcbiAgdm0uJHNjb3BlID0gYXBwO1xuICBjb25zdCBnbG9iYWxEYXRhID0gYXBwLmdsb2JhbERhdGE7XG4gIGlmIChnbG9iYWxEYXRhKSB7XG4gICAgT2JqZWN0LmtleXMoYXBwT3B0aW9ucy5nbG9iYWxEYXRhKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgaWYgKCFoYXNPd24oZ2xvYmFsRGF0YSwgbmFtZSkpIHtcbiAgICAgICAgZ2xvYmFsRGF0YVtuYW1lXSA9IGFwcE9wdGlvbnMuZ2xvYmFsRGF0YVtuYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBPYmplY3Qua2V5cyhhcHBPcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIGlmICghaGFzT3duKGFwcCwgbmFtZSkpIHtcbiAgICAgIGFwcFtuYW1lXSA9IGFwcE9wdGlvbnNbbmFtZV07XG4gICAgfVxuICB9KTtcbiAgaWYgKGlzRm4oYXBwT3B0aW9ucy5vblNob3cpICYmIGtzLm9uQXBwU2hvdykge1xuICAgIGtzLm9uQXBwU2hvdygoLi4uYXJncykgPT4ge1xuICAgICAgdm0uX19jYWxsX2hvb2soJ29uU2hvdycsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc0ZuKGFwcE9wdGlvbnMub25IaWRlKSAmJiBrcy5vbkFwcEhpZGUpIHtcbiAgICBrcy5vbkFwcEhpZGUoKC4uLmFyZ3MpID0+IHtcbiAgICAgIHZtLl9fY2FsbF9ob29rKCdvbkhpZGUnLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNGbihhcHBPcHRpb25zLm9uTGF1bmNoKSkge1xuICAgIGNvbnN0IGFyZ3MgPSBrcy5nZXRMYXVuY2hPcHRpb25zU3luYyAmJiBrcy5nZXRMYXVuY2hPcHRpb25zU3luYygpO1xuICAgIHZtLl9fY2FsbF9ob29rKCdvbkxhdW5jaCcsIGFyZ3MpO1xuICB9XG4gIHJldHVybiB2bVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQbHVnaW4gKHZtKSB7XG4gIGNvbnN0IGFwcE9wdGlvbnMgPSBwYXJzZUFwcCQxKHZtKTtcbiAgaWYgKGlzRm4oYXBwT3B0aW9ucy5vblNob3cpICYmIGtzLm9uQXBwU2hvdykge1xuICAgIGtzLm9uQXBwU2hvdygoLi4uYXJncykgPT4ge1xuICAgICAgdm0uX19jYWxsX2hvb2soJ29uU2hvdycsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc0ZuKGFwcE9wdGlvbnMub25IaWRlKSAmJiBrcy5vbkFwcEhpZGUpIHtcbiAgICBrcy5vbkFwcEhpZGUoKC4uLmFyZ3MpID0+IHtcbiAgICAgIHZtLl9fY2FsbF9ob29rKCdvbkhpZGUnLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNGbihhcHBPcHRpb25zLm9uTGF1bmNoKSkge1xuICAgIGNvbnN0IGFyZ3MgPSBrcy5nZXRMYXVuY2hPcHRpb25zU3luYyAmJiBrcy5nZXRMYXVuY2hPcHRpb25zU3luYygpO1xuICAgIHZtLl9fY2FsbF9ob29rKCdvbkxhdW5jaCcsIGFyZ3MpO1xuICB9XG4gIHJldHVybiB2bVxufVxuXG50b2Rvcy5mb3JFYWNoKHRvZG9BcGkgPT4ge1xuICBwcm90b2NvbHNbdG9kb0FwaV0gPSBmYWxzZTtcbn0pO1xuXG5jYW5JVXNlcy5mb3JFYWNoKGNhbklVc2VBcGkgPT4ge1xuICBjb25zdCBhcGlOYW1lID0gcHJvdG9jb2xzW2NhbklVc2VBcGldICYmIHByb3RvY29sc1tjYW5JVXNlQXBpXS5uYW1lID8gcHJvdG9jb2xzW2NhbklVc2VBcGldLm5hbWVcbiAgICA6IGNhbklVc2VBcGk7XG4gIGlmICgha3MuY2FuSVVzZShhcGlOYW1lKSkge1xuICAgIHByb3RvY29sc1tjYW5JVXNlQXBpXSA9IGZhbHNlO1xuICB9XG59KTtcblxubGV0IHVuaSA9IHt9O1xuXG5pZiAodHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJyAmJiBcIm1wLWt1YWlzaG91XCIgIT09ICdhcHAtcGx1cycpIHtcbiAgdW5pID0gbmV3IFByb3h5KHt9LCB7XG4gICAgZ2V0ICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgIGlmIChoYXNPd24odGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdXG4gICAgICB9XG4gICAgICBpZiAoYmFzZUFwaVtuYW1lXSkge1xuICAgICAgICByZXR1cm4gYmFzZUFwaVtuYW1lXVxuICAgICAgfVxuICAgICAgaWYgKGFwaVtuYW1lXSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5KG5hbWUsIGFwaVtuYW1lXSlcbiAgICAgIH1cbiAgICAgIHtcbiAgICAgICAgaWYgKGV4dHJhQXBpW25hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIHByb21pc2lmeShuYW1lLCBleHRyYUFwaVtuYW1lXSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9kb0FwaXNbbmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gcHJvbWlzaWZ5KG5hbWUsIHRvZG9BcGlzW25hbWVdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnRBcGlbbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QXBpW25hbWVdXG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvbWlzaWZ5KG5hbWUsIHdyYXBwZXIobmFtZSwga3NbbmFtZV0pKVxuICAgIH0sXG4gICAgc2V0ICh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIE9iamVjdC5rZXlzKGJhc2VBcGkpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgdW5pW25hbWVdID0gYmFzZUFwaVtuYW1lXTtcbiAgfSk7XG5cbiAge1xuICAgIE9iamVjdC5rZXlzKHRvZG9BcGlzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgdW5pW25hbWVdID0gcHJvbWlzaWZ5KG5hbWUsIHRvZG9BcGlzW25hbWVdKTtcbiAgICB9KTtcbiAgICBPYmplY3Qua2V5cyhleHRyYUFwaSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIHVuaVtuYW1lXSA9IHByb21pc2lmeShuYW1lLCB0b2RvQXBpc1tuYW1lXSk7XG4gICAgfSk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhldmVudEFwaSkuZm9yRWFjaChuYW1lID0+IHtcbiAgICB1bmlbbmFtZV0gPSBldmVudEFwaVtuYW1lXTtcbiAgfSk7XG5cbiAgT2JqZWN0LmtleXMoYXBpKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgIHVuaVtuYW1lXSA9IHByb21pc2lmeShuYW1lLCBhcGlbbmFtZV0pO1xuICB9KTtcblxuICBPYmplY3Qua2V5cyhrcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICBpZiAoaGFzT3duKGtzLCBuYW1lKSB8fCBoYXNPd24ocHJvdG9jb2xzLCBuYW1lKSkge1xuICAgICAgdW5pW25hbWVdID0gcHJvbWlzaWZ5KG5hbWUsIHdyYXBwZXIobmFtZSwga3NbbmFtZV0pKTtcbiAgICB9XG4gIH0pO1xufVxuXG5rcy5jcmVhdGVBcHAgPSBjcmVhdGVBcHA7XG5rcy5jcmVhdGVQYWdlID0gY3JlYXRlUGFnZTtcbmtzLmNyZWF0ZUNvbXBvbmVudCA9IGNyZWF0ZUNvbXBvbmVudDtcbmtzLmNyZWF0ZVN1YnBhY2thZ2VBcHAgPSBjcmVhdGVTdWJwYWNrYWdlQXBwO1xua3MuY3JlYXRlUGx1Z2luID0gY3JlYXRlUGx1Z2luO1xuXG52YXIgdW5pJDEgPSB1bmk7XG5cbmV4cG9ydCBkZWZhdWx0IHVuaSQxO1xuZXhwb3J0IHsgY3JlYXRlQXBwLCBjcmVhdGVDb21wb25lbnQsIGNyZWF0ZVBhZ2UsIGNyZWF0ZVBsdWdpbiwgY3JlYXRlU3VicGFja2FnZUFwcCB9O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiKTtcbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCIpO1xudmFyIHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIik7XG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCIpO1xuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlcywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gbnVsbCA9PSBhcnIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChudWxsICE9IF9pKSB7XG4gICAgdmFyIF9zLFxuICAgICAgX2UsXG4gICAgICBfeCxcbiAgICAgIF9yLFxuICAgICAgX2FyciA9IFtdLFxuICAgICAgX24gPSAhMCxcbiAgICAgIF9kID0gITE7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChfeCA9IChfaSA9IF9pLmNhbGwoYXJyKSkubmV4dCwgMCA9PT0gaSkge1xuICAgICAgICBpZiAoT2JqZWN0KF9pKSAhPT0gX2kpIHJldHVybjtcbiAgICAgICAgX24gPSAhMTtcbiAgICAgIH0gZWxzZSBmb3IgKDsgIShfbiA9IChfcyA9IF94LmNhbGwoX2kpKS5kb25lKSAmJiAoX2Fyci5wdXNoKF9zLnZhbHVlKSwgX2Fyci5sZW5ndGggIT09IGkpOyBfbiA9ICEwKSB7XG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gITAsIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIG51bGwgIT0gX2lbXCJyZXR1cm5cIl0gJiYgKF9yID0gX2lbXCJyZXR1cm5cIl0oKSwgT2JqZWN0KF9yKSAhPT0gX3IpKSByZXR1cm47XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2FycjtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuICByZXR1cm4gYXJyMjtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5TGlrZVRvQXJyYXksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKFwiLi90b1Byb3BlcnR5S2V5LmpzXCIpO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoXCIuL3RvUHJpbWl0aXZlLmpzXCIpO1xuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90b1Byb3BlcnR5S2V5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiAobW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cyksIF90eXBlb2Yob2JqKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIi4vdHlwZW9mLmpzXCIpW1wiZGVmYXVsdFwiXTtcbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90b1ByaW1pdGl2ZSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mLmpzXCIpO1xudmFyIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IHJlcXVpcmUoXCIuL2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdC5qc1wiKTtcbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdC5iaW5kKCksIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHtcbiAgICAgIHZhciBhID0gW251bGxdO1xuICAgICAgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpO1xuICAgICAgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpO1xuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgICBpZiAoQ2xhc3MpIHNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgfVxuICByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY29uc3RydWN0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cztcbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlO1xuICB0cnkge1xuICAgIEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwidmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKFwiLi90b1Byb3BlcnR5S2V5LmpzXCIpO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3MsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0czsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiKTtcbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIik7XG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiKTtcbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCIpO1xuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzOyIsInZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiKTtcbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5LCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHM7IiwiY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5jb25zdCBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcbmNvbnN0IGRlZmF1bHREZWxpbWl0ZXJzID0gWyd7JywgJ30nXTtcbmNsYXNzIEJhc2VGb3JtYXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jYWNoZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBpbnRlcnBvbGF0ZShtZXNzYWdlLCB2YWx1ZXMsIGRlbGltaXRlcnMgPSBkZWZhdWx0RGVsaW1pdGVycykge1xuICAgICAgICBpZiAoIXZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIFttZXNzYWdlXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG9rZW5zID0gdGhpcy5fY2FjaGVzW21lc3NhZ2VdO1xuICAgICAgICBpZiAoIXRva2Vucykge1xuICAgICAgICAgICAgdG9rZW5zID0gcGFyc2UobWVzc2FnZSwgZGVsaW1pdGVycyk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZXNbbWVzc2FnZV0gPSB0b2tlbnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBpbGUodG9rZW5zLCB2YWx1ZXMpO1xuICAgIH1cbn1cbmNvbnN0IFJFX1RPS0VOX0xJU1RfVkFMVUUgPSAvXig/OlxcZCkrLztcbmNvbnN0IFJFX1RPS0VOX05BTUVEX1ZBTFVFID0gL14oPzpcXHcpKy87XG5mdW5jdGlvbiBwYXJzZShmb3JtYXQsIFtzdGFydERlbGltaXRlciwgZW5kRGVsaW1pdGVyXSkge1xuICAgIGNvbnN0IHRva2VucyA9IFtdO1xuICAgIGxldCBwb3NpdGlvbiA9IDA7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICB3aGlsZSAocG9zaXRpb24gPCBmb3JtYXQubGVuZ3RoKSB7XG4gICAgICAgIGxldCBjaGFyID0gZm9ybWF0W3Bvc2l0aW9uKytdO1xuICAgICAgICBpZiAoY2hhciA9PT0gc3RhcnREZWxpbWl0ZXIpIHtcbiAgICAgICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlOiB0ZXh0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgbGV0IHN1YiA9ICcnO1xuICAgICAgICAgICAgY2hhciA9IGZvcm1hdFtwb3NpdGlvbisrXTtcbiAgICAgICAgICAgIHdoaWxlIChjaGFyICE9PSB1bmRlZmluZWQgJiYgY2hhciAhPT0gZW5kRGVsaW1pdGVyKSB7XG4gICAgICAgICAgICAgICAgc3ViICs9IGNoYXI7XG4gICAgICAgICAgICAgICAgY2hhciA9IGZvcm1hdFtwb3NpdGlvbisrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlzQ2xvc2VkID0gY2hhciA9PT0gZW5kRGVsaW1pdGVyO1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IFJFX1RPS0VOX0xJU1RfVkFMVUUudGVzdChzdWIpXG4gICAgICAgICAgICAgICAgPyAnbGlzdCdcbiAgICAgICAgICAgICAgICA6IGlzQ2xvc2VkICYmIFJFX1RPS0VOX05BTUVEX1ZBTFVFLnRlc3Qoc3ViKVxuICAgICAgICAgICAgICAgICAgICA/ICduYW1lZCdcbiAgICAgICAgICAgICAgICAgICAgOiAndW5rbm93bic7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHZhbHVlOiBzdWIsIHR5cGUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gIGVsc2UgaWYgKGNoYXIgPT09ICclJykge1xuICAgICAgICAvLyAgIC8vIHdoZW4gZm91bmQgcmFpbHMgaTE4biBzeW50YXgsIHNraXAgdGV4dCBjYXB0dXJlXG4gICAgICAgIC8vICAgaWYgKGZvcm1hdFtwb3NpdGlvbl0gIT09ICd7Jykge1xuICAgICAgICAvLyAgICAgdGV4dCArPSBjaGFyXG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dCArPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRleHQgJiYgdG9rZW5zLnB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlOiB0ZXh0IH0pO1xuICAgIHJldHVybiB0b2tlbnM7XG59XG5mdW5jdGlvbiBjb21waWxlKHRva2VucywgdmFsdWVzKSB7XG4gICAgY29uc3QgY29tcGlsZWQgPSBbXTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGNvbnN0IG1vZGUgPSBpc0FycmF5KHZhbHVlcylcbiAgICAgICAgPyAnbGlzdCdcbiAgICAgICAgOiBpc09iamVjdCh2YWx1ZXMpXG4gICAgICAgICAgICA/ICduYW1lZCdcbiAgICAgICAgICAgIDogJ3Vua25vd24nO1xuICAgIGlmIChtb2RlID09PSAndW5rbm93bicpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXggPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2luZGV4XTtcbiAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICBjb21waWxlZC5wdXNoKHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgICAgICAgIGNvbXBpbGVkLnB1c2godmFsdWVzW3BhcnNlSW50KHRva2VuLnZhbHVlLCAxMCldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25hbWVkJzpcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJ25hbWVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21waWxlZC5wdXNoKHZhbHVlc1t0b2tlbi52YWx1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVHlwZSBvZiB0b2tlbiAnJHt0b2tlbi50eXBlfScgYW5kIGZvcm1hdCBvZiB2YWx1ZSAnJHttb2RlfScgZG9uJ3QgbWF0Y2ghYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1bmtub3duJzpcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYERldGVjdCAndW5rbm93bicgdHlwZSBvZiB0b2tlbiFgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBpbGVkO1xufVxuXG5jb25zdCBMT0NBTEVfWkhfSEFOUyA9ICd6aC1IYW5zJztcbmNvbnN0IExPQ0FMRV9aSF9IQU5UID0gJ3poLUhhbnQnO1xuY29uc3QgTE9DQUxFX0VOID0gJ2VuJztcbmNvbnN0IExPQ0FMRV9GUiA9ICdmcic7XG5jb25zdCBMT0NBTEVfRVMgPSAnZXMnO1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuY29uc3QgaGFzT3duID0gKHZhbCwga2V5KSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwga2V5KTtcbmNvbnN0IGRlZmF1bHRGb3JtYXR0ZXIgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuZnVuY3Rpb24gaW5jbHVkZShzdHIsIHBhcnRzKSB7XG4gICAgcmV0dXJuICEhcGFydHMuZmluZCgocGFydCkgPT4gc3RyLmluZGV4T2YocGFydCkgIT09IC0xKTtcbn1cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCBwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5maW5kKChwYXJ0KSA9PiBzdHIuaW5kZXhPZihwYXJ0KSA9PT0gMCk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVMb2NhbGUobG9jYWxlLCBtZXNzYWdlcykge1xuICAgIGlmICghbG9jYWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxlID0gbG9jYWxlLnRyaW0oKS5yZXBsYWNlKC9fL2csICctJyk7XG4gICAgaWYgKG1lc3NhZ2VzICYmIG1lc3NhZ2VzW2xvY2FsZV0pIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICB9XG4gICAgbG9jYWxlID0gbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGxvY2FsZS5pbmRleE9mKCd6aCcpID09PSAwKSB7XG4gICAgICAgIGlmIChsb2NhbGUuaW5kZXhPZignLWhhbnMnKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gTE9DQUxFX1pIX0hBTlM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZS5pbmRleE9mKCctaGFudCcpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBMT0NBTEVfWkhfSEFOVDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5jbHVkZShsb2NhbGUsIFsnLXR3JywgJy1oaycsICctbW8nLCAnLWNodCddKSkge1xuICAgICAgICAgICAgcmV0dXJuIExPQ0FMRV9aSF9IQU5UO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMT0NBTEVfWkhfSEFOUztcbiAgICB9XG4gICAgY29uc3QgbGFuZyA9IHN0YXJ0c1dpdGgobG9jYWxlLCBbTE9DQUxFX0VOLCBMT0NBTEVfRlIsIExPQ0FMRV9FU10pO1xuICAgIGlmIChsYW5nKSB7XG4gICAgICAgIHJldHVybiBsYW5nO1xuICAgIH1cbn1cbmNsYXNzIEkxOG4ge1xuICAgIGNvbnN0cnVjdG9yKHsgbG9jYWxlLCBmYWxsYmFja0xvY2FsZSwgbWVzc2FnZXMsIHdhdGNoZXIsIGZvcm1hdGVyLCB9KSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0gTE9DQUxFX0VOO1xuICAgICAgICB0aGlzLmZhbGxiYWNrTG9jYWxlID0gTE9DQUxFX0VOO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB7fTtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHt9O1xuICAgICAgICB0aGlzLndhdGNoZXJzID0gW107XG4gICAgICAgIGlmIChmYWxsYmFja0xvY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5mYWxsYmFja0xvY2FsZSA9IGZhbGxiYWNrTG9jYWxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybWF0ZXIgPSBmb3JtYXRlciB8fCBkZWZhdWx0Rm9ybWF0dGVyO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXMgfHwge307XG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKGxvY2FsZSB8fCBMT0NBTEVfRU4pO1xuICAgICAgICBpZiAod2F0Y2hlcikge1xuICAgICAgICAgICAgdGhpcy53YXRjaExvY2FsZSh3YXRjaGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRMb2NhbGUobG9jYWxlKSB7XG4gICAgICAgIGNvbnN0IG9sZExvY2FsZSA9IHRoaXMubG9jYWxlO1xuICAgICAgICB0aGlzLmxvY2FsZSA9IG5vcm1hbGl6ZUxvY2FsZShsb2NhbGUsIHRoaXMubWVzc2FnZXMpIHx8IHRoaXMuZmFsbGJhY2tMb2NhbGU7XG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlc1t0aGlzLmxvY2FsZV0pIHtcbiAgICAgICAgICAgIC8vIOWPr+iDveWIneWni+WMluaXtuS4jeWtmOWcqFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1t0aGlzLmxvY2FsZV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VzW3RoaXMubG9jYWxlXTtcbiAgICAgICAgLy8g5LuF5Y+R55Sf5Y+Y5YyW5pe277yM6YCa55+lXG4gICAgICAgIGlmIChvbGRMb2NhbGUgIT09IHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoZXJzLmZvckVhY2goKHdhdGNoZXIpID0+IHtcbiAgICAgICAgICAgICAgICB3YXRjaGVyKHRoaXMubG9jYWxlLCBvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0TG9jYWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGU7XG4gICAgfVxuICAgIHdhdGNoTG9jYWxlKGZuKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy53YXRjaGVycy5wdXNoKGZuKSAtIDE7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndhdGNoZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFkZChsb2NhbGUsIG1lc3NhZ2UsIG92ZXJyaWRlID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBjdXJNZXNzYWdlcyA9IHRoaXMubWVzc2FnZXNbbG9jYWxlXTtcbiAgICAgICAgaWYgKGN1ck1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGN1ck1lc3NhZ2VzLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG1lc3NhZ2UpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc093bihjdXJNZXNzYWdlcywga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyTWVzc2FnZXNba2V5XSA9IG1lc3NhZ2Vba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1tsb2NhbGVdID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmKG1lc3NhZ2UsIHZhbHVlcywgZGVsaW1pdGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRlci5pbnRlcnBvbGF0ZShtZXNzYWdlLCB2YWx1ZXMsIGRlbGltaXRlcnMpLmpvaW4oJycpO1xuICAgIH1cbiAgICB0KGtleSwgbG9jYWxlLCB2YWx1ZXMpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2U7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbG9jYWxlID0gbm9ybWFsaXplTG9jYWxlKGxvY2FsZSwgdGhpcy5tZXNzYWdlcyk7XG4gICAgICAgICAgICBsb2NhbGUgJiYgKG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2VzW2xvY2FsZV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gbG9jYWxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzT3duKG1lc3NhZ2UsIGtleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2Fubm90IHRyYW5zbGF0ZSB0aGUgdmFsdWUgb2Yga2V5cGF0aCAke2tleX0uIFVzZSB0aGUgdmFsdWUgb2Yga2V5cGF0aCBhcyBkZWZhdWx0LmApO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRlci5pbnRlcnBvbGF0ZShtZXNzYWdlW2tleV0sIHZhbHVlcykuam9pbignJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB3YXRjaEFwcExvY2FsZShhcHBWbSwgaTE4bikge1xuICAgIC8vIOmcgOimgeS/neivgSB3YXRjaCDnmoTop6blj5HlnKjnu4Tku7bmuLLmn5PkuYvliY1cbiAgICBpZiAoYXBwVm0uJHdhdGNoTG9jYWxlKSB7XG4gICAgICAgIC8vIHZ1ZTJcbiAgICAgICAgYXBwVm0uJHdhdGNoTG9jYWxlKChuZXdMb2NhbGUpID0+IHtcbiAgICAgICAgICAgIGkxOG4uc2V0TG9jYWxlKG5ld0xvY2FsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXBwVm0uJHdhdGNoKCgpID0+IGFwcFZtLiRsb2NhbGUsIChuZXdMb2NhbGUpID0+IHtcbiAgICAgICAgICAgIGkxOG4uc2V0TG9jYWxlKG5ld0xvY2FsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldERlZmF1bHRMb2NhbGUoKSB7XG4gICAgaWYgKHR5cGVvZiB1bmkgIT09ICd1bmRlZmluZWQnICYmIHVuaS5nZXRMb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIHVuaS5nZXRMb2NhbGUoKTtcbiAgICB9XG4gICAgLy8g5bCP56iL5bqP5bmz5Y+w77yMdW5pIOWSjCB1bmktaTE4biDkupLnm7jlvJXnlKjvvIzlr7zoh7Torr/pl67kuI3liLAgdW5p77yM5pWF5ZyoIGdsb2JhbCDkuIrmjILkuoYgZ2V0TG9jYWxlXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5nZXRMb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbC5nZXRMb2NhbGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIExPQ0FMRV9FTjtcbn1cbmZ1bmN0aW9uIGluaXRWdWVJMThuKGxvY2FsZSwgbWVzc2FnZXMgPSB7fSwgZmFsbGJhY2tMb2NhbGUsIHdhdGNoZXIpIHtcbiAgICAvLyDlhbzlrrnml6fniYjmnKzlhaXlj4JcbiAgICBpZiAodHlwZW9mIGxvY2FsZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgW2xvY2FsZSwgbWVzc2FnZXNdID0gW1xuICAgICAgICAgICAgbWVzc2FnZXMsXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgIF07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbG9jYWxlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyDlm6DkuLrlsI/nqIvluo/lubPlj7DvvIx1bmktaTE4biDlkowgdW5pIOS6kuebuOW8leeUqO+8jOWvvOiHtOatpOaXtuiuv+mXriB1bmkg5pe277yM5Li6IHVuZGVmaW5lZFxuICAgICAgICBsb2NhbGUgPSBnZXREZWZhdWx0TG9jYWxlKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZmFsbGJhY2tMb2NhbGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZhbGxiYWNrTG9jYWxlID1cbiAgICAgICAgICAgICh0eXBlb2YgX191bmlDb25maWcgIT09ICd1bmRlZmluZWQnICYmIF9fdW5pQ29uZmlnLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgICAgIExPQ0FMRV9FTjtcbiAgICB9XG4gICAgY29uc3QgaTE4biA9IG5ldyBJMThuKHtcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBmYWxsYmFja0xvY2FsZSxcbiAgICAgICAgbWVzc2FnZXMsXG4gICAgICAgIHdhdGNoZXIsXG4gICAgfSk7XG4gICAgbGV0IHQgPSAoa2V5LCB2YWx1ZXMpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBnZXRBcHAgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGFwcCB2aWV3XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mdW5jLWFzc2lnbiAqL1xuICAgICAgICAgICAgdCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLnQoa2V5LCB2YWx1ZXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpc1dhdGNoZWRBcHBMb2NhbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcHBWbSA9IGdldEFwcCgpLiR2bTtcbiAgICAgICAgICAgICAgICAvLyDlj6/og70kdm3ov5jkuI3lrZjlnKjvvIzmr5TlpoLlnKjmlK/ku5jlrp3lsI/nqIvluo/kuK3vvIznu4Tku7blrprkuYnovoPml6nvvIzlnKhwcm9wc+eahGRlZmF1bHTph4zkvb/nlKjkuoZ0KCnlh73mlbDvvIjlpoJ1bmktZ29vZHMtbmF277yJ77yM5q2k5pe2YXBw6L+Y5pyq5Yid5aeL5YyWXG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIC8vIFx0dHlwZTogQXJyYXksXG4gICAgICAgICAgICAgICAgLy8gXHRkZWZhdWx0ICgpIHtcbiAgICAgICAgICAgICAgICAvLyBcdFx0cmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgLy8gXHRcdFx0aWNvbjogJ3Nob3AnLFxuICAgICAgICAgICAgICAgIC8vIFx0XHRcdHRleHQ6IHQoXCJ1bmktZ29vZHMtbmF2Lm9wdGlvbnMuc2hvcFwiKSxcbiAgICAgICAgICAgICAgICAvLyBcdFx0fSwge1xuICAgICAgICAgICAgICAgIC8vIFx0XHRcdGljb246ICdjYXJ0JyxcbiAgICAgICAgICAgICAgICAvLyBcdFx0XHR0ZXh0OiB0KFwidW5pLWdvb2RzLW5hdi5vcHRpb25zLmNhcnRcIilcbiAgICAgICAgICAgICAgICAvLyBcdFx0fV1cbiAgICAgICAgICAgICAgICAvLyBcdH1cbiAgICAgICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgICAgIGlmIChhcHBWbSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDop6blj5Hlk43lupTlvI9cbiAgICAgICAgICAgICAgICAgICAgYXBwVm0uJGxvY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1dhdGNoZWRBcHBMb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2hlZEFwcExvY2FsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YXRjaEFwcExvY2FsZShhcHBWbSwgaTE4bik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udChrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0KGtleSwgdmFsdWVzKTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGkxOG4sXG4gICAgICAgIGYobWVzc2FnZSwgdmFsdWVzLCBkZWxpbWl0ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gaTE4bi5mKG1lc3NhZ2UsIHZhbHVlcywgZGVsaW1pdGVycyk7XG4gICAgICAgIH0sXG4gICAgICAgIHQoa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0KGtleSwgdmFsdWVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkKGxvY2FsZSwgbWVzc2FnZSwgb3ZlcnJpZGUgPSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gaTE4bi5hZGQobG9jYWxlLCBtZXNzYWdlLCBvdmVycmlkZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gaTE4bi53YXRjaExvY2FsZShmbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldExvY2FsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBpMThuLmdldExvY2FsZSgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRMb2NhbGUobmV3TG9jYWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gaTE4bi5zZXRMb2NhbGUobmV3TG9jYWxlKTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5jb25zdCBpc1N0cmluZyA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xubGV0IGZvcm1hdGVyO1xuZnVuY3Rpb24gaGFzSTE4bkpzb24oanNvbk9iaiwgZGVsaW1pdGVycykge1xuICAgIGlmICghZm9ybWF0ZXIpIHtcbiAgICAgICAgZm9ybWF0ZXIgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuICAgIH1cbiAgICByZXR1cm4gd2Fsa0pzb25PYmooanNvbk9iaiwgKGpzb25PYmosIGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGpzb25PYmpba2V5XTtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKGlzSTE4blN0cih2YWx1ZSwgZGVsaW1pdGVycykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBoYXNJMThuSnNvbih2YWx1ZSwgZGVsaW1pdGVycyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHBhcnNlSTE4bkpzb24oanNvbk9iaiwgdmFsdWVzLCBkZWxpbWl0ZXJzKSB7XG4gICAgaWYgKCFmb3JtYXRlcikge1xuICAgICAgICBmb3JtYXRlciA9IG5ldyBCYXNlRm9ybWF0dGVyKCk7XG4gICAgfVxuICAgIHdhbGtKc29uT2JqKGpzb25PYmosIChqc29uT2JqLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBqc29uT2JqW2tleV07XG4gICAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChpc0kxOG5TdHIodmFsdWUsIGRlbGltaXRlcnMpKSB7XG4gICAgICAgICAgICAgICAganNvbk9ialtrZXldID0gY29tcGlsZVN0cih2YWx1ZSwgdmFsdWVzLCBkZWxpbWl0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlSTE4bkpzb24odmFsdWUsIHZhbHVlcywgZGVsaW1pdGVycyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ganNvbk9iajtcbn1cbmZ1bmN0aW9uIGNvbXBpbGVJMThuSnNvblN0cihqc29uU3RyLCB7IGxvY2FsZSwgbG9jYWxlcywgZGVsaW1pdGVycywgfSkge1xuICAgIGlmICghaXNJMThuU3RyKGpzb25TdHIsIGRlbGltaXRlcnMpKSB7XG4gICAgICAgIHJldHVybiBqc29uU3RyO1xuICAgIH1cbiAgICBpZiAoIWZvcm1hdGVyKSB7XG4gICAgICAgIGZvcm1hdGVyID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcbiAgICB9XG4gICAgY29uc3QgbG9jYWxlVmFsdWVzID0gW107XG4gICAgT2JqZWN0LmtleXMobG9jYWxlcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAobmFtZSAhPT0gbG9jYWxlKSB7XG4gICAgICAgICAgICBsb2NhbGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbG9jYWxlOiBuYW1lLFxuICAgICAgICAgICAgICAgIHZhbHVlczogbG9jYWxlc1tuYW1lXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbG9jYWxlVmFsdWVzLnVuc2hpZnQoeyBsb2NhbGUsIHZhbHVlczogbG9jYWxlc1tsb2NhbGVdIH0pO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShjb21waWxlSnNvbk9iaihKU09OLnBhcnNlKGpzb25TdHIpLCBsb2NhbGVWYWx1ZXMsIGRlbGltaXRlcnMpLCBudWxsLCAyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHsgfVxuICAgIHJldHVybiBqc29uU3RyO1xufVxuZnVuY3Rpb24gaXNJMThuU3RyKHZhbHVlLCBkZWxpbWl0ZXJzKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZGVsaW1pdGVyc1swXSkgPiAtMTtcbn1cbmZ1bmN0aW9uIGNvbXBpbGVTdHIodmFsdWUsIHZhbHVlcywgZGVsaW1pdGVycykge1xuICAgIHJldHVybiBmb3JtYXRlci5pbnRlcnBvbGF0ZSh2YWx1ZSwgdmFsdWVzLCBkZWxpbWl0ZXJzKS5qb2luKCcnKTtcbn1cbmZ1bmN0aW9uIGNvbXBpbGVWYWx1ZShqc29uT2JqLCBrZXksIGxvY2FsZVZhbHVlcywgZGVsaW1pdGVycykge1xuICAgIGNvbnN0IHZhbHVlID0ganNvbk9ialtrZXldO1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgLy8g5a2Y5Zyo5Zu96ZmF5YyWXG4gICAgICAgIGlmIChpc0kxOG5TdHIodmFsdWUsIGRlbGltaXRlcnMpKSB7XG4gICAgICAgICAgICBqc29uT2JqW2tleV0gPSBjb21waWxlU3RyKHZhbHVlLCBsb2NhbGVWYWx1ZXNbMF0udmFsdWVzLCBkZWxpbWl0ZXJzKTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVWYWx1ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIOagvOW8j+WMluWbvemZheWMluivreiogFxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlTG9jYWxlcyA9IChqc29uT2JqW2tleSArICdMb2NhbGVzJ10gPSB7fSk7XG4gICAgICAgICAgICAgICAgbG9jYWxlVmFsdWVzLmZvckVhY2goKGxvY2FsVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVMb2NhbGVzW2xvY2FsVmFsdWUubG9jYWxlXSA9IGNvbXBpbGVTdHIodmFsdWUsIGxvY2FsVmFsdWUudmFsdWVzLCBkZWxpbWl0ZXJzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29tcGlsZUpzb25PYmoodmFsdWUsIGxvY2FsZVZhbHVlcywgZGVsaW1pdGVycyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY29tcGlsZUpzb25PYmooanNvbk9iaiwgbG9jYWxlVmFsdWVzLCBkZWxpbWl0ZXJzKSB7XG4gICAgd2Fsa0pzb25PYmooanNvbk9iaiwgKGpzb25PYmosIGtleSkgPT4ge1xuICAgICAgICBjb21waWxlVmFsdWUoanNvbk9iaiwga2V5LCBsb2NhbGVWYWx1ZXMsIGRlbGltaXRlcnMpO1xuICAgIH0pO1xuICAgIHJldHVybiBqc29uT2JqO1xufVxuZnVuY3Rpb24gd2Fsa0pzb25PYmooanNvbk9iaiwgd2Fsaykge1xuICAgIGlmIChpc0FycmF5KGpzb25PYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbk9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHdhbGsoanNvbk9iaiwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdChqc29uT2JqKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBqc29uT2JqKSB7XG4gICAgICAgICAgICBpZiAod2Fsayhqc29uT2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTG9jYWxlKGxvY2FsZXMpIHtcbiAgICByZXR1cm4gKGxvY2FsZSkgPT4ge1xuICAgICAgICBpZiAoIWxvY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbGUgPSBub3JtYWxpemVMb2NhbGUobG9jYWxlKSB8fCBsb2NhbGU7XG4gICAgICAgIHJldHVybiByZXNvbHZlTG9jYWxlQ2hhaW4obG9jYWxlKS5maW5kKChsb2NhbGUpID0+IGxvY2FsZXMuaW5kZXhPZihsb2NhbGUpID4gLTEpO1xuICAgIH07XG59XG5mdW5jdGlvbiByZXNvbHZlTG9jYWxlQ2hhaW4obG9jYWxlKSB7XG4gICAgY29uc3QgY2hhaW4gPSBbXTtcbiAgICBjb25zdCB0b2tlbnMgPSBsb2NhbGUuc3BsaXQoJy0nKTtcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICBjaGFpbi5wdXNoKHRva2Vucy5qb2luKCctJykpO1xuICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBjaGFpbjtcbn1cblxuZXhwb3J0IHsgQmFzZUZvcm1hdHRlciBhcyBGb3JtYXR0ZXIsIEkxOG4sIExPQ0FMRV9FTiwgTE9DQUxFX0VTLCBMT0NBTEVfRlIsIExPQ0FMRV9aSF9IQU5TLCBMT0NBTEVfWkhfSEFOVCwgY29tcGlsZUkxOG5Kc29uU3RyLCBoYXNJMThuSnNvbiwgaW5pdFZ1ZUkxOG4sIGlzSTE4blN0ciwgaXNTdHJpbmcsIG5vcm1hbGl6ZUxvY2FsZSwgcGFyc2VJMThuSnNvbiwgcmVzb2x2ZUxvY2FsZSB9O1xuIiwiLyohXG4gKiBWdWUuanMgdjIuNi4xMVxuICogKGMpIDIwMTQtMjAyMiBFdmFuIFlvdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG4vKiAgKi9cblxudmFyIGVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG5cbi8vIFRoZXNlIGhlbHBlcnMgcHJvZHVjZSBiZXR0ZXIgVk0gY29kZSBpbiBKUyBlbmdpbmVzIGR1ZSB0byB0aGVpclxuLy8gZXhwbGljaXRuZXNzIGFuZCBmdW5jdGlvbiBpbmxpbmluZy5cbmZ1bmN0aW9uIGlzVW5kZWYgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsXG59XG5cbmZ1bmN0aW9uIGlzRGVmICh2KSB7XG4gIHJldHVybiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbFxufVxuXG5mdW5jdGlvbiBpc1RydWUgKHYpIHtcbiAgcmV0dXJuIHYgPT09IHRydWVcbn1cblxuZnVuY3Rpb24gaXNGYWxzZSAodikge1xuICByZXR1cm4gdiA9PT0gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBpcyBwcmltaXRpdmUuXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlICh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHxcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJyB8fFxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG4gIClcbn1cblxuLyoqXG4gKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbi8qKlxuICogR2V0IHRoZSByYXcgdHlwZSBzdHJpbmcgb2YgYSB2YWx1ZSwgZS5nLiwgW29iamVjdCBPYmplY3RdLlxuICovXG52YXIgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gdG9SYXdUeXBlICh2YWx1ZSkge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKVxufVxuXG4vKipcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICByZXR1cm4gX3RvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZnVuY3Rpb24gaXNSZWdFeHAgKHYpIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBSZWdFeHBdJ1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbCBpcyBhIHZhbGlkIGFycmF5IGluZGV4LlxuICovXG5mdW5jdGlvbiBpc1ZhbGlkQXJyYXlJbmRleCAodmFsKSB7XG4gIHZhciBuID0gcGFyc2VGbG9hdChTdHJpbmcodmFsKSk7XG4gIHJldHVybiBuID49IDAgJiYgTWF0aC5mbG9vcihuKSA9PT0gbiAmJiBpc0Zpbml0ZSh2YWwpXG59XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZSAodmFsKSB7XG4gIHJldHVybiAoXG4gICAgaXNEZWYodmFsKSAmJlxuICAgIHR5cGVvZiB2YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiB2YWwuY2F0Y2ggPT09ICdmdW5jdGlvbidcbiAgKVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSB2YWx1ZSB0byBhIHN0cmluZyB0aGF0IGlzIGFjdHVhbGx5IHJlbmRlcmVkLlxuICovXG5mdW5jdGlvbiB0b1N0cmluZyAodmFsKSB7XG4gIHJldHVybiB2YWwgPT0gbnVsbFxuICAgID8gJydcbiAgICA6IEFycmF5LmlzQXJyYXkodmFsKSB8fCAoaXNQbGFpbk9iamVjdCh2YWwpICYmIHZhbC50b1N0cmluZyA9PT0gX3RvU3RyaW5nKVxuICAgICAgPyBKU09OLnN0cmluZ2lmeSh2YWwsIG51bGwsIDIpXG4gICAgICA6IFN0cmluZyh2YWwpXG59XG5cbi8qKlxuICogQ29udmVydCBhbiBpbnB1dCB2YWx1ZSB0byBhIG51bWJlciBmb3IgcGVyc2lzdGVuY2UuXG4gKiBJZiB0aGUgY29udmVyc2lvbiBmYWlscywgcmV0dXJuIG9yaWdpbmFsIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIgKHZhbCkge1xuICB2YXIgbiA9IHBhcnNlRmxvYXQodmFsKTtcbiAgcmV0dXJuIGlzTmFOKG4pID8gdmFsIDogblxufVxuXG4vKipcbiAqIE1ha2UgYSBtYXAgYW5kIHJldHVybiBhIGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhIGtleVxuICogaXMgaW4gdGhhdCBtYXAuXG4gKi9cbmZ1bmN0aW9uIG1ha2VNYXAgKFxuICBzdHIsXG4gIGV4cGVjdHNMb3dlckNhc2Vcbikge1xuICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGxpc3QgPSBzdHIuc3BsaXQoJywnKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbWFwW2xpc3RbaV1dID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZVxuICAgID8gZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbWFwW3ZhbC50b0xvd2VyQ2FzZSgpXTsgfVxuICAgIDogZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbWFwW3ZhbF07IH1cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHRhZyBpcyBhIGJ1aWx0LWluIHRhZy5cbiAqL1xudmFyIGlzQnVpbHRJblRhZyA9IG1ha2VNYXAoJ3Nsb3QsY29tcG9uZW50JywgdHJ1ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlLlxuICovXG52YXIgaXNSZXNlcnZlZEF0dHJpYnV0ZSA9IG1ha2VNYXAoJ2tleSxyZWYsc2xvdCxzbG90LXNjb3BlLGlzJyk7XG5cbi8qKlxuICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBhbiBhcnJheS5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlIChhcnIsIGl0ZW0pIHtcbiAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGhhc093biAob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgY2FjaGVkIHZlcnNpb24gb2YgYSBwdXJlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHJldHVybiAoZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIHZhciBoaXQgPSBjYWNoZVtzdHJdO1xuICAgIHJldHVybiBoaXQgfHwgKGNhY2hlW3N0cl0gPSBmbihzdHIpKVxuICB9KVxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbGltaXRlZCBzdHJpbmcuXG4gKi9cbnZhciBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nO1xudmFyIGNhbWVsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJyc7IH0pXG59KTtcblxuLyoqXG4gKiBDYXBpdGFsaXplIGEgc3RyaW5nLlxuICovXG52YXIgY2FwaXRhbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn0pO1xuXG4vKipcbiAqIEh5cGhlbmF0ZSBhIGNhbWVsQ2FzZSBzdHJpbmcuXG4gKi9cbnZhciBoeXBoZW5hdGVSRSA9IC9cXEIoW0EtWl0pL2c7XG52YXIgaHlwaGVuYXRlID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGh5cGhlbmF0ZVJFLCAnLSQxJykudG9Mb3dlckNhc2UoKVxufSk7XG5cbi8qKlxuICogU2ltcGxlIGJpbmQgcG9seWZpbGwgZm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBzdXBwb3J0IGl0LFxuICogZS5nLiwgUGhhbnRvbUpTIDEueC4gVGVjaG5pY2FsbHksIHdlIGRvbid0IG5lZWQgdGhpcyBhbnltb3JlXG4gKiBzaW5jZSBuYXRpdmUgYmluZCBpcyBub3cgcGVyZm9ybWFudCBlbm91Z2ggaW4gbW9zdCBicm93c2Vycy5cbiAqIEJ1dCByZW1vdmluZyBpdCB3b3VsZCBtZWFuIGJyZWFraW5nIGNvZGUgdGhhdCB3YXMgYWJsZSB0byBydW4gaW5cbiAqIFBoYW50b21KUyAxLngsIHNvIHRoaXMgbXVzdCBiZSBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBwb2x5ZmlsbEJpbmQgKGZuLCBjdHgpIHtcbiAgZnVuY3Rpb24gYm91bmRGbiAoYSkge1xuICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICByZXR1cm4gbFxuICAgICAgPyBsID4gMVxuICAgICAgICA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxuICAgICAgICA6IGZuLmNhbGwoY3R4LCBhKVxuICAgICAgOiBmbi5jYWxsKGN0eClcbiAgfVxuXG4gIGJvdW5kRm4uX2xlbmd0aCA9IGZuLmxlbmd0aDtcbiAgcmV0dXJuIGJvdW5kRm5cbn1cblxuZnVuY3Rpb24gbmF0aXZlQmluZCAoZm4sIGN0eCkge1xuICByZXR1cm4gZm4uYmluZChjdHgpXG59XG5cbnZhciBiaW5kID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiAgPyBuYXRpdmVCaW5kXG4gIDogcG9seWZpbGxCaW5kO1xuXG4vKipcbiAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICovXG5mdW5jdGlvbiB0b0FycmF5IChsaXN0LCBzdGFydCkge1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIHZhciBpID0gbGlzdC5sZW5ndGggLSBzdGFydDtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSkge1xuICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBleHRlbmQgKHRvLCBfZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gX2Zyb20pIHtcbiAgICB0b1trZXldID0gX2Zyb21ba2V5XTtcbiAgfVxuICByZXR1cm4gdG9cbn1cblxuLyoqXG4gKiBNZXJnZSBhbiBBcnJheSBvZiBPYmplY3RzIGludG8gYSBzaW5nbGUgT2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCAoYXJyKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldKSB7XG4gICAgICBleHRlbmQocmVzLCBhcnJbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogUGVyZm9ybSBubyBvcGVyYXRpb24uXG4gKiBTdHViYmluZyBhcmdzIHRvIG1ha2UgRmxvdyBoYXBweSB3aXRob3V0IGxlYXZpbmcgdXNlbGVzcyB0cmFuc3BpbGVkIGNvZGVcbiAqIHdpdGggLi4ucmVzdCAoaHR0cHM6Ly9mbG93Lm9yZy9ibG9nLzIwMTcvMDUvMDcvU3RyaWN0LUZ1bmN0aW9uLUNhbGwtQXJpdHkvKS5cbiAqL1xuZnVuY3Rpb24gbm9vcCAoYSwgYiwgYykge31cblxuLyoqXG4gKiBBbHdheXMgcmV0dXJuIGZhbHNlLlxuICovXG52YXIgbm8gPSBmdW5jdGlvbiAoYSwgYiwgYykgeyByZXR1cm4gZmFsc2U7IH07XG5cbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHNhbWUgdmFsdWUuXG4gKi9cbnZhciBpZGVudGl0eSA9IGZ1bmN0aW9uIChfKSB7IHJldHVybiBfOyB9O1xuXG4vKipcbiAqIENoZWNrIGlmIHR3byB2YWx1ZXMgYXJlIGxvb3NlbHkgZXF1YWwgLSB0aGF0IGlzLFxuICogaWYgdGhleSBhcmUgcGxhaW4gb2JqZWN0cywgZG8gdGhleSBoYXZlIHRoZSBzYW1lIHNoYXBlP1xuICovXG5mdW5jdGlvbiBsb29zZUVxdWFsIChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7IHJldHVybiB0cnVlIH1cbiAgdmFyIGlzT2JqZWN0QSA9IGlzT2JqZWN0KGEpO1xuICB2YXIgaXNPYmplY3RCID0gaXNPYmplY3QoYik7XG4gIGlmIChpc09iamVjdEEgJiYgaXNPYmplY3RCKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBpc0FycmF5QSA9IEFycmF5LmlzQXJyYXkoYSk7XG4gICAgICB2YXIgaXNBcnJheUIgPSBBcnJheS5pc0FycmF5KGIpO1xuICAgICAgaWYgKGlzQXJyYXlBICYmIGlzQXJyYXlCKSB7XG4gICAgICAgIHJldHVybiBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeShmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICAgIHJldHVybiBsb29zZUVxdWFsKGUsIGJbaV0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKClcbiAgICAgIH0gZWxzZSBpZiAoIWlzQXJyYXlBICYmICFpc0FycmF5Qikge1xuICAgICAgICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhhKTtcbiAgICAgICAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMoYik7XG4gICAgICAgIHJldHVybiBrZXlzQS5sZW5ndGggPT09IGtleXNCLmxlbmd0aCAmJiBrZXlzQS5ldmVyeShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGxvb3NlRXF1YWwoYVtrZXldLCBiW2tleV0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9IGVsc2UgaWYgKCFpc09iamVjdEEgJiYgIWlzT2JqZWN0Qikge1xuICAgIHJldHVybiBTdHJpbmcoYSkgPT09IFN0cmluZyhiKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBmaXJzdCBpbmRleCBhdCB3aGljaCBhIGxvb3NlbHkgZXF1YWwgdmFsdWUgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgYXJyYXkgKGlmIHZhbHVlIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGUgYXJyYXkgbXVzdFxuICogY29udGFpbiBhbiBvYmplY3Qgb2YgdGhlIHNhbWUgc2hhcGUpLCBvciAtMSBpZiBpdCBpcyBub3QgcHJlc2VudC5cbiAqL1xuZnVuY3Rpb24gbG9vc2VJbmRleE9mIChhcnIsIHZhbCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChsb29zZUVxdWFsKGFycltpXSwgdmFsKSkgeyByZXR1cm4gaSB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbi8qKlxuICogRW5zdXJlIGEgZnVuY3Rpb24gaXMgY2FsbGVkIG9ubHkgb25jZS5cbiAqL1xuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIEFTU0VUX1RZUEVTID0gW1xuICAnY29tcG9uZW50JyxcbiAgJ2RpcmVjdGl2ZScsXG4gICdmaWx0ZXInXG5dO1xuXG52YXIgTElGRUNZQ0xFX0hPT0tTID0gW1xuICAnYmVmb3JlQ3JlYXRlJyxcbiAgJ2NyZWF0ZWQnLFxuICAnYmVmb3JlTW91bnQnLFxuICAnbW91bnRlZCcsXG4gICdiZWZvcmVVcGRhdGUnLFxuICAndXBkYXRlZCcsXG4gICdiZWZvcmVEZXN0cm95JyxcbiAgJ2Rlc3Ryb3llZCcsXG4gICdhY3RpdmF0ZWQnLFxuICAnZGVhY3RpdmF0ZWQnLFxuICAnZXJyb3JDYXB0dXJlZCcsXG4gICdzZXJ2ZXJQcmVmZXRjaCdcbl07XG5cbi8qICAqL1xuXG5cblxudmFyIGNvbmZpZyA9ICh7XG4gIC8qKlxuICAgKiBPcHRpb24gbWVyZ2Ugc3RyYXRlZ2llcyAodXNlZCBpbiBjb3JlL3V0aWwvb3B0aW9ucylcbiAgICovXG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICBvcHRpb25NZXJnZVN0cmF0ZWdpZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXG4gICAqL1xuICBzaWxlbnQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBTaG93IHByb2R1Y3Rpb24gbW9kZSB0aXAgbWVzc2FnZSBvbiBib290P1xuICAgKi9cbiAgcHJvZHVjdGlvblRpcDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyxcblxuICAvKipcbiAgICogV2hldGhlciB0byBlbmFibGUgZGV2dG9vbHNcbiAgICovXG4gIGRldnRvb2xzOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlY29yZCBwZXJmXG4gICAqL1xuICBwZXJmb3JtYW5jZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEVycm9yIGhhbmRsZXIgZm9yIHdhdGNoZXIgZXJyb3JzXG4gICAqL1xuICBlcnJvckhhbmRsZXI6IG51bGwsXG5cbiAgLyoqXG4gICAqIFdhcm4gaGFuZGxlciBmb3Igd2F0Y2hlciB3YXJuc1xuICAgKi9cbiAgd2FybkhhbmRsZXI6IG51bGwsXG5cbiAgLyoqXG4gICAqIElnbm9yZSBjZXJ0YWluIGN1c3RvbSBlbGVtZW50c1xuICAgKi9cbiAgaWdub3JlZEVsZW1lbnRzOiBbXSxcblxuICAvKipcbiAgICogQ3VzdG9tIHVzZXIga2V5IGFsaWFzZXMgZm9yIHYtb25cbiAgICovXG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICBrZXlDb2RlczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgcmVzZXJ2ZWQgc28gdGhhdCBpdCBjYW5ub3QgYmUgcmVnaXN0ZXJlZCBhcyBhXG4gICAqIGNvbXBvbmVudC4gVGhpcyBpcyBwbGF0Zm9ybS1kZXBlbmRlbnQgYW5kIG1heSBiZSBvdmVyd3JpdHRlbi5cbiAgICovXG4gIGlzUmVzZXJ2ZWRUYWc6IG5vLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbiBhdHRyaWJ1dGUgaXMgcmVzZXJ2ZWQgc28gdGhhdCBpdCBjYW5ub3QgYmUgdXNlZCBhcyBhIGNvbXBvbmVudFxuICAgKiBwcm9wLiBUaGlzIGlzIHBsYXRmb3JtLWRlcGVuZGVudCBhbmQgbWF5IGJlIG92ZXJ3cml0dGVuLlxuICAgKi9cbiAgaXNSZXNlcnZlZEF0dHI6IG5vLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRhZyBpcyBhbiB1bmtub3duIGVsZW1lbnQuXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICovXG4gIGlzVW5rbm93bkVsZW1lbnQ6IG5vLFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hbWVzcGFjZSBvZiBhbiBlbGVtZW50XG4gICAqL1xuICBnZXRUYWdOYW1lc3BhY2U6IG5vb3AsXG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSByZWFsIHRhZyBuYW1lIGZvciB0aGUgc3BlY2lmaWMgcGxhdGZvcm0uXG4gICAqL1xuICBwYXJzZVBsYXRmb3JtVGFnTmFtZTogaWRlbnRpdHksXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBtdXN0IGJlIGJvdW5kIHVzaW5nIHByb3BlcnR5LCBlLmcuIHZhbHVlXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICovXG4gIG11c3RVc2VQcm9wOiBubyxcblxuICAvKipcbiAgICogUGVyZm9ybSB1cGRhdGVzIGFzeW5jaHJvbm91c2x5LiBJbnRlbmRlZCB0byBiZSB1c2VkIGJ5IFZ1ZSBUZXN0IFV0aWxzXG4gICAqIFRoaXMgd2lsbCBzaWduaWZpY2FudGx5IHJlZHVjZSBwZXJmb3JtYW5jZSBpZiBzZXQgdG8gZmFsc2UuXG4gICAqL1xuICBhc3luYzogdHJ1ZSxcblxuICAvKipcbiAgICogRXhwb3NlZCBmb3IgbGVnYWN5IHJlYXNvbnNcbiAgICovXG4gIF9saWZlY3ljbGVIb29rczogTElGRUNZQ0xFX0hPT0tTXG59KTtcblxuLyogICovXG5cbi8qKlxuICogdW5pY29kZSBsZXR0ZXJzIHVzZWQgZm9yIHBhcnNpbmcgaHRtbCB0YWdzLCBjb21wb25lbnQgbmFtZXMgYW5kIHByb3BlcnR5IHBhdGhzLlxuICogdXNpbmcgaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1My9zZW1hbnRpY3Mtc2NyaXB0aW5nLmh0bWwjcG90ZW50aWFsY3VzdG9tZWxlbWVudG5hbWVcbiAqIHNraXBwaW5nIFxcdTEwMDAwLVxcdUVGRkZGIGR1ZSB0byBpdCBmcmVlemluZyB1cCBQaGFudG9tSlNcbiAqL1xudmFyIHVuaWNvZGVSZWdFeHAgPSAvYS16QS1aXFx1MDBCN1xcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwM0YtXFx1MjA0MFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRC87XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWQgKHN0cikge1xuICB2YXIgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKTtcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIERlZmluZSBhIHByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBkZWYgKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIFBhcnNlIHNpbXBsZSBwYXRoLlxuICovXG52YXIgYmFpbFJFID0gbmV3IFJlZ0V4cCgoXCJbXlwiICsgKHVuaWNvZGVSZWdFeHAuc291cmNlKSArIFwiLiRfXFxcXGRdXCIpKTtcbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICBpZiAoYmFpbFJFLnRlc3QocGF0aCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFvYmopIHsgcmV0dXJuIH1cbiAgICAgIG9iaiA9IG9ialtzZWdtZW50c1tpXV07XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxufVxuXG4vKiAgKi9cblxuLy8gY2FuIHdlIHVzZSBfX3Byb3RvX18/XG52YXIgaGFzUHJvdG8gPSAnX19wcm90b19fJyBpbiB7fTtcblxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xudmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xudmFyIGluV2VleCA9IHR5cGVvZiBXWEVudmlyb25tZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhIVdYRW52aXJvbm1lbnQucGxhdGZvcm07XG52YXIgd2VleFBsYXRmb3JtID0gaW5XZWV4ICYmIFdYRW52aXJvbm1lbnQucGxhdGZvcm0udG9Mb3dlckNhc2UoKTtcbnZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xudmFyIGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKTtcbnZhciBpc0lFOSA9IFVBICYmIFVBLmluZGV4T2YoJ21zaWUgOS4wJykgPiAwO1xudmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xudmFyIGlzQW5kcm9pZCA9IChVQSAmJiBVQS5pbmRleE9mKCdhbmRyb2lkJykgPiAwKSB8fCAod2VleFBsYXRmb3JtID09PSAnYW5kcm9pZCcpO1xudmFyIGlzSU9TID0gKFVBICYmIC9pcGhvbmV8aXBhZHxpcG9kfGlvcy8udGVzdChVQSkpIHx8ICh3ZWV4UGxhdGZvcm0gPT09ICdpb3MnKTtcbnZhciBpc0Nocm9tZSA9IFVBICYmIC9jaHJvbWVcXC9cXGQrLy50ZXN0KFVBKSAmJiAhaXNFZGdlO1xudmFyIGlzUGhhbnRvbUpTID0gVUEgJiYgL3BoYW50b21qcy8udGVzdChVQSk7XG52YXIgaXNGRiA9IFVBICYmIFVBLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLyk7XG5cbi8vIEZpcmVmb3ggaGFzIGEgXCJ3YXRjaFwiIGZ1bmN0aW9uIG9uIE9iamVjdC5wcm90b3R5cGUuLi5cbnZhciBuYXRpdmVXYXRjaCA9ICh7fSkud2F0Y2g7XG5pZiAoaW5Ccm93c2VyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG9wdHMgPSB7fTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob3B0cywgJ3Bhc3NpdmUnLCAoe1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgfVxuICAgIH0pKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0LXBhc3NpdmUnLCBudWxsLCBvcHRzKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuLy8gdGhpcyBuZWVkcyB0byBiZSBsYXp5LWV2YWxlZCBiZWNhdXNlIHZ1ZSBtYXkgYmUgcmVxdWlyZWQgYmVmb3JlXG4vLyB2dWUtc2VydmVyLXJlbmRlcmVyIGNhbiBzZXQgVlVFX0VOVlxudmFyIF9pc1NlcnZlcjtcbnZhciBpc1NlcnZlclJlbmRlcmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKF9pc1NlcnZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFpbkJyb3dzZXIgJiYgIWluV2VleCAmJiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZGV0ZWN0IHByZXNlbmNlIG9mIHZ1ZS1zZXJ2ZXItcmVuZGVyZXIgYW5kIGF2b2lkXG4gICAgICAvLyBXZWJwYWNrIHNoaW1taW5nIHRoZSBwcm9jZXNzXG4gICAgICBfaXNTZXJ2ZXIgPSBnbG9iYWxbJ3Byb2Nlc3MnXSAmJiBnbG9iYWxbJ3Byb2Nlc3MnXS5lbnYuVlVFX0VOViA9PT0gJ3NlcnZlcic7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9pc1NlcnZlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gX2lzU2VydmVyXG59O1xuXG4vLyBkZXRlY3QgZGV2dG9vbHNcbnZhciBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGlzTmF0aXZlIChDdG9yKSB7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoQ3Rvci50b1N0cmluZygpKVxufVxuXG52YXIgaGFzU3ltYm9sID1cbiAgdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU3ltYm9sKSAmJlxuICB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUmVmbGVjdC5vd25LZXlzKTtcblxudmFyIF9TZXQ7XG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi8gLy8gJGZsb3ctZGlzYWJsZS1saW5lXG5pZiAodHlwZW9mIFNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU2V0KSkge1xuICAvLyB1c2UgbmF0aXZlIFNldCB3aGVuIGF2YWlsYWJsZS5cbiAgX1NldCA9IFNldDtcbn0gZWxzZSB7XG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgX1NldCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNldCAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldID09PSB0cnVlXG4gICAgfTtcbiAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAoa2V5KSB7XG4gICAgICB0aGlzLnNldFtrZXldID0gdHJ1ZTtcbiAgICB9O1xuICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcblxuICAgIHJldHVybiBTZXQ7XG4gIH0oKSk7XG59XG5cbi8qICAqL1xuXG52YXIgd2FybiA9IG5vb3A7XG52YXIgdGlwID0gbm9vcDtcbnZhciBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlID0gKG5vb3ApOyAvLyB3b3JrIGFyb3VuZCBmbG93IGNoZWNrXG52YXIgZm9ybWF0Q29tcG9uZW50TmFtZSA9IChub29wKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCc7XG4gIHZhciBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nO1xuICB2YXIgY2xhc3NpZnkgPSBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHJcbiAgICAucmVwbGFjZShjbGFzc2lmeVJFLCBmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxuICAgIC5yZXBsYWNlKC9bLV9dL2csICcnKTsgfTtcblxuICB3YXJuID0gZnVuY3Rpb24gKG1zZywgdm0pIHtcbiAgICB2YXIgdHJhY2UgPSB2bSA/IGdlbmVyYXRlQ29tcG9uZW50VHJhY2Uodm0pIDogJyc7XG5cbiAgICBpZiAoY29uZmlnLndhcm5IYW5kbGVyKSB7XG4gICAgICBjb25maWcud2FybkhhbmRsZXIuY2FsbChudWxsLCBtc2csIHZtLCB0cmFjZSk7XG4gICAgfSBlbHNlIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW1Z1ZSB3YXJuXTogXCIgKyBtc2cgKyB0cmFjZSkpO1xuICAgIH1cbiAgfTtcblxuICB0aXAgPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIltWdWUgdGlwXTogXCIgKyBtc2cgKyAoXG4gICAgICAgIHZtID8gZ2VuZXJhdGVDb21wb25lbnRUcmFjZSh2bSkgOiAnJ1xuICAgICAgKSk7XG4gICAgfVxuICB9O1xuXG4gIGZvcm1hdENvbXBvbmVudE5hbWUgPSBmdW5jdGlvbiAodm0sIGluY2x1ZGVGaWxlKSB7XG4gICAgaWYgKHZtLiRyb290ID09PSB2bSkge1xuICAgICAgaWYgKHZtLiRvcHRpb25zICYmIHZtLiRvcHRpb25zLl9fZmlsZSkgeyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICAgICAgcmV0dXJuICgnJykgKyB2bS4kb3B0aW9ucy5fX2ZpbGVcbiAgICAgIH1cbiAgICAgIHJldHVybiAnPFJvb3Q+J1xuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiB2bSA9PT0gJ2Z1bmN0aW9uJyAmJiB2bS5jaWQgIT0gbnVsbFxuICAgICAgPyB2bS5vcHRpb25zXG4gICAgICA6IHZtLl9pc1Z1ZVxuICAgICAgICA/IHZtLiRvcHRpb25zIHx8IHZtLmNvbnN0cnVjdG9yLm9wdGlvbnNcbiAgICAgICAgOiB2bTtcbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZSB8fCBvcHRpb25zLl9jb21wb25lbnRUYWc7XG4gICAgdmFyIGZpbGUgPSBvcHRpb25zLl9fZmlsZTtcbiAgICBpZiAoIW5hbWUgJiYgZmlsZSkge1xuICAgICAgdmFyIG1hdGNoID0gZmlsZS5tYXRjaCgvKFteL1xcXFxdKylcXC52dWUkLyk7XG4gICAgICBuYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIChuYW1lID8gKFwiPFwiICsgKGNsYXNzaWZ5KG5hbWUpKSArIFwiPlwiKSA6IFwiPEFub255bW91cz5cIikgK1xuICAgICAgKGZpbGUgJiYgaW5jbHVkZUZpbGUgIT09IGZhbHNlID8gKFwiIGF0IFwiICsgZmlsZSkgOiAnJylcbiAgICApXG4gIH07XG5cbiAgdmFyIHJlcGVhdCA9IGZ1bmN0aW9uIChzdHIsIG4pIHtcbiAgICB2YXIgcmVzID0gJyc7XG4gICAgd2hpbGUgKG4pIHtcbiAgICAgIGlmIChuICUgMiA9PT0gMSkgeyByZXMgKz0gc3RyOyB9XG4gICAgICBpZiAobiA+IDEpIHsgc3RyICs9IHN0cjsgfVxuICAgICAgbiA+Pj0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9O1xuXG4gIGdlbmVyYXRlQ29tcG9uZW50VHJhY2UgPSBmdW5jdGlvbiAodm0pIHtcbiAgICBpZiAodm0uX2lzVnVlICYmIHZtLiRwYXJlbnQpIHtcbiAgICAgIHZhciB0cmVlID0gW107XG4gICAgICB2YXIgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID0gMDtcbiAgICAgIHdoaWxlICh2bSAmJiB2bS4kb3B0aW9ucy5uYW1lICE9PSAnUGFnZUJvZHknKSB7XG4gICAgICAgIGlmICh0cmVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgbGFzdCA9IHRyZWVbdHJlZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAobGFzdC5jb25zdHJ1Y3RvciA9PT0gdm0uY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSsrO1xuICAgICAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRSZWN1cnNpdmVTZXF1ZW5jZSA+IDApIHtcbiAgICAgICAgICAgIHRyZWVbdHJlZS5sZW5ndGggLSAxXSA9IFtsYXN0LCBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2VdO1xuICAgICAgICAgICAgY3VycmVudFJlY3Vyc2l2ZVNlcXVlbmNlID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgIXZtLiRvcHRpb25zLmlzUmVzZXJ2ZWQgJiYgdHJlZS5wdXNoKHZtKTtcbiAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuICdcXG5cXG5mb3VuZCBpblxcblxcbicgKyB0cmVlXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHZtLCBpKSB7IHJldHVybiAoXCJcIiArIChpID09PSAwID8gJy0tLT4gJyA6IHJlcGVhdCgnICcsIDUgKyBpICogMikpICsgKEFycmF5LmlzQXJyYXkodm0pXG4gICAgICAgICAgICA/ICgoZm9ybWF0Q29tcG9uZW50TmFtZSh2bVswXSkpICsgXCIuLi4gKFwiICsgKHZtWzFdKSArIFwiIHJlY3Vyc2l2ZSBjYWxscylcIilcbiAgICAgICAgICAgIDogZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpKTsgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXCJcXG5cXG4oZm91bmQgaW4gXCIgKyAoZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpICsgXCIpXCIpXG4gICAgfVxuICB9O1xufVxuXG4vKiAgKi9cblxudmFyIHVpZCA9IDA7XG5cbi8qKlxuICogQSBkZXAgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG4gKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICovXG52YXIgRGVwID0gZnVuY3Rpb24gRGVwICgpIHtcbiAgdGhpcy5pZCA9IHVpZCsrO1xuICB0aGlzLnN1YnMgPSBbXTtcbn07XG5cbkRlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gYWRkU3ViIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gcmVtb3ZlU3ViIChzdWIpIHtcbiAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKTtcbn07XG5cbkRlcC5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgaWYgKERlcC5TaGFyZWRPYmplY3QudGFyZ2V0KSB7XG4gICAgRGVwLlNoYXJlZE9iamVjdC50YXJnZXQuYWRkRGVwKHRoaXMpO1xuICB9XG59O1xuXG5EZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSAoKSB7XG4gIC8vIHN0YWJpbGl6ZSB0aGUgc3Vic2NyaWJlciBsaXN0IGZpcnN0XG4gIHZhciBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKCk7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFjb25maWcuYXN5bmMpIHtcbiAgICAvLyBzdWJzIGFyZW4ndCBzb3J0ZWQgaW4gc2NoZWR1bGVyIGlmIG5vdCBydW5uaW5nIGFzeW5jXG4gICAgLy8gd2UgbmVlZCB0byBzb3J0IHRoZW0gbm93IHRvIG1ha2Ugc3VyZSB0aGV5IGZpcmUgaW4gY29ycmVjdFxuICAgIC8vIG9yZGVyXG4gICAgc3Vicy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmlkIC0gYi5pZDsgfSk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKCk7XG4gIH1cbn07XG5cbi8vIFRoZSBjdXJyZW50IHRhcmdldCB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZC5cbi8vIFRoaXMgaXMgZ2xvYmFsbHkgdW5pcXVlIGJlY2F1c2Ugb25seSBvbmUgd2F0Y2hlclxuLy8gY2FuIGJlIGV2YWx1YXRlZCBhdCBhIHRpbWUuXG4vLyBmaXhlZCBieSB4eHh4eHggKG52dWUgc2hhcmVkIHZ1ZXgpXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuRGVwLlNoYXJlZE9iamVjdCA9IHt9O1xuRGVwLlNoYXJlZE9iamVjdC50YXJnZXQgPSBudWxsO1xuRGVwLlNoYXJlZE9iamVjdC50YXJnZXRTdGFjayA9IFtdO1xuXG5mdW5jdGlvbiBwdXNoVGFyZ2V0ICh0YXJnZXQpIHtcbiAgRGVwLlNoYXJlZE9iamVjdC50YXJnZXRTdGFjay5wdXNoKHRhcmdldCk7XG4gIERlcC5TaGFyZWRPYmplY3QudGFyZ2V0ID0gdGFyZ2V0O1xuICBEZXAudGFyZ2V0ID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBwb3BUYXJnZXQgKCkge1xuICBEZXAuU2hhcmVkT2JqZWN0LnRhcmdldFN0YWNrLnBvcCgpO1xuICBEZXAuU2hhcmVkT2JqZWN0LnRhcmdldCA9IERlcC5TaGFyZWRPYmplY3QudGFyZ2V0U3RhY2tbRGVwLlNoYXJlZE9iamVjdC50YXJnZXRTdGFjay5sZW5ndGggLSAxXTtcbiAgRGVwLnRhcmdldCA9IERlcC5TaGFyZWRPYmplY3QudGFyZ2V0O1xufVxuXG4vKiAgKi9cblxudmFyIFZOb2RlID0gZnVuY3Rpb24gVk5vZGUgKFxuICB0YWcsXG4gIGRhdGEsXG4gIGNoaWxkcmVuLFxuICB0ZXh0LFxuICBlbG0sXG4gIGNvbnRleHQsXG4gIGNvbXBvbmVudE9wdGlvbnMsXG4gIGFzeW5jRmFjdG9yeVxuKSB7XG4gIHRoaXMudGFnID0gdGFnO1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMudGV4dCA9IHRleHQ7XG4gIHRoaXMuZWxtID0gZWxtO1xuICB0aGlzLm5zID0gdW5kZWZpbmVkO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLmZuQ29udGV4dCA9IHVuZGVmaW5lZDtcbiAgdGhpcy5mbk9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gIHRoaXMuZm5TY29wZUlkID0gdW5kZWZpbmVkO1xuICB0aGlzLmtleSA9IGRhdGEgJiYgZGF0YS5rZXk7XG4gIHRoaXMuY29tcG9uZW50T3B0aW9ucyA9IGNvbXBvbmVudE9wdGlvbnM7XG4gIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIHRoaXMucGFyZW50ID0gdW5kZWZpbmVkO1xuICB0aGlzLnJhdyA9IGZhbHNlO1xuICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG4gIHRoaXMuaXNSb290SW5zZXJ0ID0gdHJ1ZTtcbiAgdGhpcy5pc0NvbW1lbnQgPSBmYWxzZTtcbiAgdGhpcy5pc0Nsb25lZCA9IGZhbHNlO1xuICB0aGlzLmlzT25jZSA9IGZhbHNlO1xuICB0aGlzLmFzeW5jRmFjdG9yeSA9IGFzeW5jRmFjdG9yeTtcbiAgdGhpcy5hc3luY01ldGEgPSB1bmRlZmluZWQ7XG4gIHRoaXMuaXNBc3luY1BsYWNlaG9sZGVyID0gZmFsc2U7XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBjaGlsZDogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4vLyBERVBSRUNBVEVEOiBhbGlhcyBmb3IgY29tcG9uZW50SW5zdGFuY2UgZm9yIGJhY2t3YXJkcyBjb21wYXQuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xucHJvdG90eXBlQWNjZXNzb3JzLmNoaWxkLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY29tcG9uZW50SW5zdGFuY2Vcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBWTm9kZS5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG52YXIgY3JlYXRlRW1wdHlWTm9kZSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gIGlmICggdGV4dCA9PT0gdm9pZCAwICkgdGV4dCA9ICcnO1xuXG4gIHZhciBub2RlID0gbmV3IFZOb2RlKCk7XG4gIG5vZGUudGV4dCA9IHRleHQ7XG4gIG5vZGUuaXNDb21tZW50ID0gdHJ1ZTtcbiAgcmV0dXJuIG5vZGVcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHRWTm9kZSAodmFsKSB7XG4gIHJldHVybiBuZXcgVk5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgU3RyaW5nKHZhbCkpXG59XG5cbi8vIG9wdGltaXplZCBzaGFsbG93IGNsb25lXG4vLyB1c2VkIGZvciBzdGF0aWMgbm9kZXMgYW5kIHNsb3Qgbm9kZXMgYmVjYXVzZSB0aGV5IG1heSBiZSByZXVzZWQgYWNyb3NzXG4vLyBtdWx0aXBsZSByZW5kZXJzLCBjbG9uaW5nIHRoZW0gYXZvaWRzIGVycm9ycyB3aGVuIERPTSBtYW5pcHVsYXRpb25zIHJlbHlcbi8vIG9uIHRoZWlyIGVsbSByZWZlcmVuY2UuXG5mdW5jdGlvbiBjbG9uZVZOb2RlICh2bm9kZSkge1xuICB2YXIgY2xvbmVkID0gbmV3IFZOb2RlKFxuICAgIHZub2RlLnRhZyxcbiAgICB2bm9kZS5kYXRhLFxuICAgIC8vICM3OTc1XG4gICAgLy8gY2xvbmUgY2hpbGRyZW4gYXJyYXkgdG8gYXZvaWQgbXV0YXRpbmcgb3JpZ2luYWwgaW4gY2FzZSBvZiBjbG9uaW5nXG4gICAgLy8gYSBjaGlsZC5cbiAgICB2bm9kZS5jaGlsZHJlbiAmJiB2bm9kZS5jaGlsZHJlbi5zbGljZSgpLFxuICAgIHZub2RlLnRleHQsXG4gICAgdm5vZGUuZWxtLFxuICAgIHZub2RlLmNvbnRleHQsXG4gICAgdm5vZGUuY29tcG9uZW50T3B0aW9ucyxcbiAgICB2bm9kZS5hc3luY0ZhY3RvcnlcbiAgKTtcbiAgY2xvbmVkLm5zID0gdm5vZGUubnM7XG4gIGNsb25lZC5pc1N0YXRpYyA9IHZub2RlLmlzU3RhdGljO1xuICBjbG9uZWQua2V5ID0gdm5vZGUua2V5O1xuICBjbG9uZWQuaXNDb21tZW50ID0gdm5vZGUuaXNDb21tZW50O1xuICBjbG9uZWQuZm5Db250ZXh0ID0gdm5vZGUuZm5Db250ZXh0O1xuICBjbG9uZWQuZm5PcHRpb25zID0gdm5vZGUuZm5PcHRpb25zO1xuICBjbG9uZWQuZm5TY29wZUlkID0gdm5vZGUuZm5TY29wZUlkO1xuICBjbG9uZWQuYXN5bmNNZXRhID0gdm5vZGUuYXN5bmNNZXRhO1xuICBjbG9uZWQuaXNDbG9uZWQgPSB0cnVlO1xuICByZXR1cm4gY2xvbmVkXG59XG5cbi8qXG4gKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGhcbiAqIGR5bmFtaWNhbGx5IGFjY2Vzc2luZyBtZXRob2RzIG9uIEFycmF5IHByb3RvdHlwZVxuICovXG5cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xudmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90byk7XG5cbnZhciBtZXRob2RzVG9QYXRjaCA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc3BsaWNlJyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZSdcbl07XG5cbi8qKlxuICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gKi9cbm1ldGhvZHNUb1BhdGNoLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcbiAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdO1xuICBkZWYoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfXztcbiAgICB2YXIgaW5zZXJ0ZWQ7XG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgIGluc2VydGVkID0gYXJncztcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgIGluc2VydGVkID0gYXJncy5zbGljZSgyKTtcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSB7IG9iLm9ic2VydmVBcnJheShpbnNlcnRlZCk7IH1cbiAgICAvLyBub3RpZnkgY2hhbmdlXG4gICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgIHJldHVybiByZXN1bHRcbiAgfSk7XG59KTtcblxuLyogICovXG5cbnZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpO1xuXG4vKipcbiAqIEluIHNvbWUgY2FzZXMgd2UgbWF5IHdhbnQgdG8gZGlzYWJsZSBvYnNlcnZhdGlvbiBpbnNpZGUgYSBjb21wb25lbnQnc1xuICogdXBkYXRlIGNvbXB1dGF0aW9uLlxuICovXG52YXIgc2hvdWxkT2JzZXJ2ZSA9IHRydWU7XG5cbmZ1bmN0aW9uIHRvZ2dsZU9ic2VydmluZyAodmFsdWUpIHtcbiAgc2hvdWxkT2JzZXJ2ZSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIE9ic2VydmVyIGNsYXNzIHRoYXQgaXMgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGhlIHRhcmdldFxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaCB1cGRhdGVzLlxuICovXG52YXIgT2JzZXJ2ZXIgPSBmdW5jdGlvbiBPYnNlcnZlciAodmFsdWUpIHtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB0aGlzLmRlcCA9IG5ldyBEZXAoKTtcbiAgdGhpcy52bUNvdW50ID0gMDtcbiAgZGVmKHZhbHVlLCAnX19vYl9fJywgdGhpcyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGlmIChoYXNQcm90bykge1xuICAgICAgey8vIGZpeGVkIGJ5IHh4eHh4eCDlvq7kv6HlsI/nqIvluo/kvb/nlKggcGx1Z2lucyDkuYvlkI7vvIzmlbDnu4Tmlrnms5Xooqvnm7TmjqXmjILovb3liLDkuobmlbDnu4Tlr7nosaHkuIrvvIzpnIDopoHmiafooYwgY29weUF1Z21lbnQg6YC76L6RXG4gICAgICAgIGlmKHZhbHVlLnB1c2ggIT09IHZhbHVlLl9fcHJvdG9fXy5wdXNoKXtcbiAgICAgICAgICBjb3B5QXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvQXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3B5QXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgIH1cbiAgICB0aGlzLm9ic2VydmVBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YWxrKHZhbHVlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXYWxrIHRocm91Z2ggYWxsIHByb3BlcnRpZXMgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG4gKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LlxuICovXG5PYnNlcnZlci5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uIHdhbGsgKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKG9iaiwga2V5c1tpXSk7XG4gIH1cbn07XG5cbi8qKlxuICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gKi9cbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiBvYnNlcnZlQXJyYXkgKGl0ZW1zKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb2JzZXJ2ZShpdGVtc1tpXSk7XG4gIH1cbn07XG5cbi8vIGhlbHBlcnNcblxuLyoqXG4gKiBBdWdtZW50IGEgdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcbiAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG4gKi9cbmZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbiAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyYztcbiAgLyogZXNsaW50LWVuYWJsZSBuby1wcm90byAqL1xufVxuXG4vKipcbiAqIEF1Z21lbnQgYSB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG4gKiBoaWRkZW4gcHJvcGVydGllcy5cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgZGVmKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAqL1xuZnVuY3Rpb24gb2JzZXJ2ZSAodmFsdWUsIGFzUm9vdERhdGEpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBvYjtcbiAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgb2IgPSB2YWx1ZS5fX29iX187XG4gIH0gZWxzZSBpZiAoXG4gICAgc2hvdWxkT2JzZXJ2ZSAmJlxuICAgICFpc1NlcnZlclJlbmRlcmluZygpICYmXG4gICAgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IGlzUGxhaW5PYmplY3QodmFsdWUpKSAmJlxuICAgIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmXG4gICAgIXZhbHVlLl9pc1Z1ZSAmJlxuICAgICF2YWx1ZS5fX3ZfaXNNUENvbXBvbmVudFxuICApIHtcbiAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XG4gIH1cbiAgaWYgKGFzUm9vdERhdGEgJiYgb2IpIHtcbiAgICBvYi52bUNvdW50Kys7XG4gIH1cbiAgcmV0dXJuIG9iXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcmVhY3RpdmUgcHJvcGVydHkgb24gYW4gT2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZpbmVSZWFjdGl2ZSQkMSAoXG4gIG9iaixcbiAga2V5LFxuICB2YWwsXG4gIGN1c3RvbVNldHRlcixcbiAgc2hhbGxvd1xuKSB7XG4gIHZhciBkZXAgPSBuZXcgRGVwKCk7XG5cbiAgdmFyIHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIGlmIChwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjYXRlciBmb3IgcHJlLWRlZmluZWQgZ2V0dGVyL3NldHRlcnNcbiAgdmFyIGdldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LmdldDtcbiAgdmFyIHNldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LnNldDtcbiAgaWYgKCghZ2V0dGVyIHx8IHNldHRlcikgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHZhbCA9IG9ialtrZXldO1xuICB9XG5cbiAgdmFyIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKHZhbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIGlmIChEZXAuU2hhcmVkT2JqZWN0LnRhcmdldCkgeyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICAgICAgZGVwLmRlcGVuZCgpO1xuICAgICAgICBpZiAoY2hpbGRPYikge1xuICAgICAgICAgIGNoaWxkT2IuZGVwLmRlcGVuZCgpO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgZGVwZW5kQXJyYXkodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlU2V0dGVyIChuZXdWYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWw7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbiAgICAgIGlmIChuZXdWYWwgPT09IHZhbHVlIHx8IChuZXdWYWwgIT09IG5ld1ZhbCAmJiB2YWx1ZSAhPT0gdmFsdWUpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGN1c3RvbVNldHRlcikge1xuICAgICAgICBjdXN0b21TZXR0ZXIoKTtcbiAgICAgIH1cbiAgICAgIC8vICM3OTgxOiBmb3IgYWNjZXNzb3IgcHJvcGVydGllcyB3aXRob3V0IHNldHRlclxuICAgICAgaWYgKGdldHRlciAmJiAhc2V0dGVyKSB7IHJldHVybiB9XG4gICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IG5ld1ZhbDtcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICBkZXAubm90aWZ5KCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAqIHRyaWdnZXJzIGNoYW5nZSBub3RpZmljYXRpb24gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3RcbiAqIGFscmVhZHkgZXhpc3QuXG4gKi9cbmZ1bmN0aW9uIHNldCAodGFyZ2V0LCBrZXksIHZhbCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KSlcbiAgKSB7XG4gICAgd2FybigoXCJDYW5ub3Qgc2V0IHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQubGVuZ3RoID0gTWF0aC5tYXgodGFyZ2V0Lmxlbmd0aCwga2V5KTtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSwgdmFsKTtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgaWYgKGtleSBpbiB0YXJnZXQgJiYgIShrZXkgaW4gT2JqZWN0LnByb3RvdHlwZSkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgYWRkaW5nIHJlYWN0aXZlIHByb3BlcnRpZXMgdG8gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXG4gICAgICAnYXQgcnVudGltZSAtIGRlY2xhcmUgaXQgdXBmcm9udCBpbiB0aGUgZGF0YSBvcHRpb24uJ1xuICAgICk7XG4gICAgcmV0dXJuIHZhbFxuICB9XG4gIGlmICghb2IpIHtcbiAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gdmFsXG4gIH1cbiAgZGVmaW5lUmVhY3RpdmUkJDEob2IudmFsdWUsIGtleSwgdmFsKTtcbiAgb2IuZGVwLm5vdGlmeSgpO1xuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAqL1xuZnVuY3Rpb24gZGVsICh0YXJnZXQsIGtleSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KSlcbiAgKSB7XG4gICAgd2FybigoXCJDYW5ub3QgZGVsZXRlIHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICBpZiAodGFyZ2V0Ll9pc1Z1ZSB8fCAob2IgJiYgb2Iudm1Db3VudCkpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAnQXZvaWQgZGVsZXRpbmcgcHJvcGVydGllcyBvbiBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICctIGp1c3Qgc2V0IGl0IHRvIG51bGwuJ1xuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZGVsZXRlIHRhcmdldFtrZXldO1xuICBpZiAoIW9iKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgb2IuZGVwLm5vdGlmeSgpO1xufVxuXG4vKipcbiAqIENvbGxlY3QgZGVwZW5kZW5jaWVzIG9uIGFycmF5IGVsZW1lbnRzIHdoZW4gdGhlIGFycmF5IGlzIHRvdWNoZWQsIHNpbmNlXG4gKiB3ZSBjYW5ub3QgaW50ZXJjZXB0IGFycmF5IGVsZW1lbnQgYWNjZXNzIGxpa2UgcHJvcGVydHkgZ2V0dGVycy5cbiAqL1xuZnVuY3Rpb24gZGVwZW5kQXJyYXkgKHZhbHVlKSB7XG4gIGZvciAodmFyIGUgPSAodm9pZCAwKSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBlID0gdmFsdWVbaV07XG4gICAgZSAmJiBlLl9fb2JfXyAmJiBlLl9fb2JfXy5kZXAuZGVwZW5kKCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICAgIGRlcGVuZEFycmF5KGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBPcHRpb24gb3ZlcndyaXRpbmcgc3RyYXRlZ2llcyBhcmUgZnVuY3Rpb25zIHRoYXQgaGFuZGxlXG4gKiBob3cgdG8gbWVyZ2UgYSBwYXJlbnQgb3B0aW9uIHZhbHVlIGFuZCBhIGNoaWxkIG9wdGlvblxuICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG4gKi9cbnZhciBzdHJhdHMgPSBjb25maWcub3B0aW9uTWVyZ2VTdHJhdGVnaWVzO1xuXG4vKipcbiAqIE9wdGlvbnMgd2l0aCByZXN0cmljdGlvbnNcbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgc3RyYXRzLmVsID0gc3RyYXRzLnByb3BzRGF0YSA9IGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkLCB2bSwga2V5KSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJvcHRpb24gXFxcIlwiICsga2V5ICsgXCJcXFwiIGNhbiBvbmx5IGJlIHVzZWQgZHVyaW5nIGluc3RhbmNlIFwiICtcbiAgICAgICAgJ2NyZWF0aW9uIHdpdGggdGhlIGBuZXdgIGtleXdvcmQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRTdHJhdChwYXJlbnQsIGNoaWxkKVxuICB9O1xufVxuXG4vKipcbiAqIEhlbHBlciB0aGF0IHJlY3Vyc2l2ZWx5IG1lcmdlcyB0d28gZGF0YSBvYmplY3RzIHRvZ2V0aGVyLlxuICovXG5mdW5jdGlvbiBtZXJnZURhdGEgKHRvLCBmcm9tKSB7XG4gIGlmICghZnJvbSkgeyByZXR1cm4gdG8gfVxuICB2YXIga2V5LCB0b1ZhbCwgZnJvbVZhbDtcblxuICB2YXIga2V5cyA9IGhhc1N5bWJvbFxuICAgID8gUmVmbGVjdC5vd25LZXlzKGZyb20pXG4gICAgOiBPYmplY3Qua2V5cyhmcm9tKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIC8vIGluIGNhc2UgdGhlIG9iamVjdCBpcyBhbHJlYWR5IG9ic2VydmVkLi4uXG4gICAgaWYgKGtleSA9PT0gJ19fb2JfXycpIHsgY29udGludWUgfVxuICAgIHRvVmFsID0gdG9ba2V5XTtcbiAgICBmcm9tVmFsID0gZnJvbVtrZXldO1xuICAgIGlmICghaGFzT3duKHRvLCBrZXkpKSB7XG4gICAgICBzZXQodG8sIGtleSwgZnJvbVZhbCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRvVmFsICE9PSBmcm9tVmFsICYmXG4gICAgICBpc1BsYWluT2JqZWN0KHRvVmFsKSAmJlxuICAgICAgaXNQbGFpbk9iamVjdChmcm9tVmFsKVxuICAgICkge1xuICAgICAgbWVyZ2VEYXRhKHRvVmFsLCBmcm9tVmFsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvXG59XG5cbi8qKlxuICogRGF0YVxuICovXG5mdW5jdGlvbiBtZXJnZURhdGFPckZuIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm1cbikge1xuICBpZiAoIXZtKSB7XG4gICAgLy8gaW4gYSBWdWUuZXh0ZW5kIG1lcmdlLCBib3RoIHNob3VsZCBiZSBmdW5jdGlvbnNcbiAgICBpZiAoIWNoaWxkVmFsKSB7XG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIGlmICghcGFyZW50VmFsKSB7XG4gICAgICByZXR1cm4gY2hpbGRWYWxcbiAgICB9XG4gICAgLy8gd2hlbiBwYXJlbnRWYWwgJiBjaGlsZFZhbCBhcmUgYm90aCBwcmVzZW50LFxuICAgIC8vIHdlIG5lZWQgdG8gcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xuICAgIC8vIGNoZWNrIGlmIHBhcmVudFZhbCBpcyBhIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZVxuICAgIC8vIGl0IGhhcyB0byBiZSBhIGZ1bmN0aW9uIHRvIHBhc3MgcHJldmlvdXMgbWVyZ2VzLlxuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4gKCkge1xuICAgICAgcmV0dXJuIG1lcmdlRGF0YShcbiAgICAgICAgdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nID8gY2hpbGRWYWwuY2FsbCh0aGlzLCB0aGlzKSA6IGNoaWxkVmFsLFxuICAgICAgICB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nID8gcGFyZW50VmFsLmNhbGwodGhpcywgdGhpcykgOiBwYXJlbnRWYWxcbiAgICAgIClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZEluc3RhbmNlRGF0YUZuICgpIHtcbiAgICAgIC8vIGluc3RhbmNlIG1lcmdlXG4gICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gY2hpbGRWYWwuY2FsbCh2bSwgdm0pXG4gICAgICAgIDogY2hpbGRWYWw7XG4gICAgICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gcGFyZW50VmFsLmNhbGwodm0sIHZtKVxuICAgICAgICA6IHBhcmVudFZhbDtcbiAgICAgIGlmIChpbnN0YW5jZURhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShpbnN0YW5jZURhdGEsIGRlZmF1bHREYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRhXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bVxuKSB7XG4gIGlmICghdm0pIHtcbiAgICBpZiAoY2hpbGRWYWwgJiYgdHlwZW9mIGNoaWxkVmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuICAgICAgICAndGhhdCByZXR1cm5zIGEgcGVyLWluc3RhbmNlIHZhbHVlIGluIGNvbXBvbmVudCAnICtcbiAgICAgICAgJ2RlZmluaXRpb25zLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gcGFyZW50VmFsXG4gICAgfVxuICAgIHJldHVybiBtZXJnZURhdGFPckZuKHBhcmVudFZhbCwgY2hpbGRWYWwpXG4gIH1cblxuICByZXR1cm4gbWVyZ2VEYXRhT3JGbihwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSlcbn07XG5cbi8qKlxuICogSG9va3MgYW5kIHByb3BzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxuICovXG5mdW5jdGlvbiBtZXJnZUhvb2sgKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsXG4pIHtcbiAgdmFyIHJlcyA9IGNoaWxkVmFsXG4gICAgPyBwYXJlbnRWYWxcbiAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcbiAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcbiAgICAgICAgPyBjaGlsZFZhbFxuICAgICAgICA6IFtjaGlsZFZhbF1cbiAgICA6IHBhcmVudFZhbDtcbiAgcmV0dXJuIHJlc1xuICAgID8gZGVkdXBlSG9va3MocmVzKVxuICAgIDogcmVzXG59XG5cbmZ1bmN0aW9uIGRlZHVwZUhvb2tzIChob29rcykge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocmVzLmluZGV4T2YoaG9va3NbaV0pID09PSAtMSkge1xuICAgICAgcmVzLnB1c2goaG9va3NbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkxJRkVDWUNMRV9IT09LUy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gIHN0cmF0c1tob29rXSA9IG1lcmdlSG9vaztcbn0pO1xuXG4vKipcbiAqIEFzc2V0c1xuICpcbiAqIFdoZW4gYSB2bSBpcyBwcmVzZW50IChpbnN0YW5jZSBjcmVhdGlvbiksIHdlIG5lZWQgdG8gZG9cbiAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2VcbiAqIG9wdGlvbnMgYW5kIHBhcmVudCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBtZXJnZUFzc2V0cyAoXG4gIHBhcmVudFZhbCxcbiAgY2hpbGRWYWwsXG4gIHZtLFxuICBrZXlcbikge1xuICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCk7XG4gIGlmIChjaGlsZFZhbCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgYXNzZXJ0T2JqZWN0VHlwZShrZXksIGNoaWxkVmFsLCB2bSk7XG4gICAgcmV0dXJuIGV4dGVuZChyZXMsIGNoaWxkVmFsKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXNcbiAgfVxufVxuXG5BU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gIHN0cmF0c1t0eXBlICsgJ3MnXSA9IG1lcmdlQXNzZXRzO1xufSk7XG5cbi8qKlxuICogV2F0Y2hlcnMuXG4gKlxuICogV2F0Y2hlcnMgaGFzaGVzIHNob3VsZCBub3Qgb3ZlcndyaXRlIG9uZVxuICogYW5vdGhlciwgc28gd2UgbWVyZ2UgdGhlbSBhcyBhcnJheXMuXG4gKi9cbnN0cmF0cy53YXRjaCA9IGZ1bmN0aW9uIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbCxcbiAgdm0sXG4gIGtleVxuKSB7XG4gIC8vIHdvcmsgYXJvdW5kIEZpcmVmb3gncyBPYmplY3QucHJvdG90eXBlLndhdGNoLi4uXG4gIGlmIChwYXJlbnRWYWwgPT09IG5hdGl2ZVdhdGNoKSB7IHBhcmVudFZhbCA9IHVuZGVmaW5lZDsgfVxuICBpZiAoY2hpbGRWYWwgPT09IG5hdGl2ZVdhdGNoKSB7IGNoaWxkVmFsID0gdW5kZWZpbmVkOyB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWNoaWxkVmFsKSB7IHJldHVybiBPYmplY3QuY3JlYXRlKHBhcmVudFZhbCB8fCBudWxsKSB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0T2JqZWN0VHlwZShrZXksIGNoaWxkVmFsLCB2bSk7XG4gIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IHt9O1xuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICBmb3IgKHZhciBrZXkkMSBpbiBjaGlsZFZhbCkge1xuICAgIHZhciBwYXJlbnQgPSByZXRba2V5JDFdO1xuICAgIHZhciBjaGlsZCA9IGNoaWxkVmFsW2tleSQxXTtcbiAgICBpZiAocGFyZW50ICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIHBhcmVudCA9IFtwYXJlbnRdO1xuICAgIH1cbiAgICByZXRba2V5JDFdID0gcGFyZW50XG4gICAgICA/IHBhcmVudC5jb25jYXQoY2hpbGQpXG4gICAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGQpID8gY2hpbGQgOiBbY2hpbGRdO1xuICB9XG4gIHJldHVybiByZXRcbn07XG5cbi8qKlxuICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cbiAqL1xuc3RyYXRzLnByb3BzID1cbnN0cmF0cy5tZXRob2RzID1cbnN0cmF0cy5pbmplY3QgPVxuc3RyYXRzLmNvbXB1dGVkID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bSxcbiAga2V5XG4pIHtcbiAgaWYgKGNoaWxkVmFsICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgfVxuICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxuICB2YXIgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZXh0ZW5kKHJldCwgcGFyZW50VmFsKTtcbiAgaWYgKGNoaWxkVmFsKSB7IGV4dGVuZChyZXQsIGNoaWxkVmFsKTsgfVxuICByZXR1cm4gcmV0XG59O1xuc3RyYXRzLnByb3ZpZGUgPSBtZXJnZURhdGFPckZuO1xuXG4vKipcbiAqIERlZmF1bHQgc3RyYXRlZ3kuXG4gKi9cbnZhciBkZWZhdWx0U3RyYXQgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICByZXR1cm4gY2hpbGRWYWwgPT09IHVuZGVmaW5lZFxuICAgID8gcGFyZW50VmFsXG4gICAgOiBjaGlsZFZhbFxufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSBjb21wb25lbnQgbmFtZXNcbiAqL1xuZnVuY3Rpb24gY2hlY2tDb21wb25lbnRzIChvcHRpb25zKSB7XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUoa2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbXBvbmVudE5hbWUgKG5hbWUpIHtcbiAgaWYgKCFuZXcgUmVnRXhwKChcIl5bYS16QS1aXVtcXFxcLVxcXFwuMC05X1wiICsgKHVuaWNvZGVSZWdFeHAuc291cmNlKSArIFwiXSokXCIpKS50ZXN0KG5hbWUpKSB7XG4gICAgd2FybihcbiAgICAgICdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArXG4gICAgICAnc2hvdWxkIGNvbmZvcm0gdG8gdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZSBpbiBodG1sNSBzcGVjaWZpY2F0aW9uLidcbiAgICApO1xuICB9XG4gIGlmIChpc0J1aWx0SW5UYWcobmFtZSkgfHwgY29uZmlnLmlzUmVzZXJ2ZWRUYWcobmFtZSkpIHtcbiAgICB3YXJuKFxuICAgICAgJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArXG4gICAgICAnaWQ6ICcgKyBuYW1lXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEVuc3VyZSBhbGwgcHJvcHMgb3B0aW9uIHN5bnRheCBhcmUgbm9ybWFsaXplZCBpbnRvIHRoZVxuICogT2JqZWN0LWJhc2VkIGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHMgKG9wdGlvbnMsIHZtKSB7XG4gIHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG4gIGlmICghcHJvcHMpIHsgcmV0dXJuIH1cbiAgdmFyIHJlcyA9IHt9O1xuICB2YXIgaSwgdmFsLCBuYW1lO1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcykpIHtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhbCA9IHByb3BzW2ldO1xuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5hbWUgPSBjYW1lbGl6ZSh2YWwpO1xuICAgICAgICByZXNbbmFtZV0gPSB7IHR5cGU6IG51bGwgfTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB3YXJuKCdwcm9wcyBtdXN0IGJlIHN0cmluZ3Mgd2hlbiB1c2luZyBhcnJheSBzeW50YXguJyk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QocHJvcHMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICB2YWwgPSBwcm9wc1trZXldO1xuICAgICAgbmFtZSA9IGNhbWVsaXplKGtleSk7XG4gICAgICByZXNbbmFtZV0gPSBpc1BsYWluT2JqZWN0KHZhbClcbiAgICAgICAgPyB2YWxcbiAgICAgICAgOiB7IHR5cGU6IHZhbCB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgd2FybihcbiAgICAgIFwiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJwcm9wc1xcXCI6IGV4cGVjdGVkIGFuIEFycmF5IG9yIGFuIE9iamVjdCwgXCIgK1xuICAgICAgXCJidXQgZ290IFwiICsgKHRvUmF3VHlwZShwcm9wcykpICsgXCIuXCIsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbiAgb3B0aW9ucy5wcm9wcyA9IHJlcztcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgYWxsIGluamVjdGlvbnMgaW50byBPYmplY3QtYmFzZWQgZm9ybWF0XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUluamVjdCAob3B0aW9ucywgdm0pIHtcbiAgdmFyIGluamVjdCA9IG9wdGlvbnMuaW5qZWN0O1xuICBpZiAoIWluamVjdCkgeyByZXR1cm4gfVxuICB2YXIgbm9ybWFsaXplZCA9IG9wdGlvbnMuaW5qZWN0ID0ge307XG4gIGlmIChBcnJheS5pc0FycmF5KGluamVjdCkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgbm9ybWFsaXplZFtpbmplY3RbaV1dID0geyBmcm9tOiBpbmplY3RbaV0gfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChpbmplY3QpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGluamVjdCkge1xuICAgICAgdmFyIHZhbCA9IGluamVjdFtrZXldO1xuICAgICAgbm9ybWFsaXplZFtrZXldID0gaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICAgID8gZXh0ZW5kKHsgZnJvbToga2V5IH0sIHZhbClcbiAgICAgICAgOiB7IGZyb206IHZhbCB9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgd2FybihcbiAgICAgIFwiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJpbmplY3RcXFwiOiBleHBlY3RlZCBhbiBBcnJheSBvciBhbiBPYmplY3QsIFwiICtcbiAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUoaW5qZWN0KSkgKyBcIi5cIixcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSByYXcgZnVuY3Rpb24gZGlyZWN0aXZlcyBpbnRvIG9iamVjdCBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZURpcmVjdGl2ZXMgKG9wdGlvbnMpIHtcbiAgdmFyIGRpcnMgPSBvcHRpb25zLmRpcmVjdGl2ZXM7XG4gIGlmIChkaXJzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRpcnMpIHtcbiAgICAgIHZhciBkZWYkJDEgPSBkaXJzW2tleV07XG4gICAgICBpZiAodHlwZW9mIGRlZiQkMSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBkaXJzW2tleV0gPSB7IGJpbmQ6IGRlZiQkMSwgdXBkYXRlOiBkZWYkJDEgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0T2JqZWN0VHlwZSAobmFtZSwgdmFsdWUsIHZtKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICB3YXJuKFxuICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcIlwiICsgbmFtZSArIFwiXFxcIjogZXhwZWN0ZWQgYW4gT2JqZWN0LCBcIiArXG4gICAgICBcImJ1dCBnb3QgXCIgKyAodG9SYXdUeXBlKHZhbHVlKSkgKyBcIi5cIixcbiAgICAgIHZtXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvcHRpb24gb2JqZWN0cyBpbnRvIGEgbmV3IG9uZS5cbiAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAoXG4gIHBhcmVudCxcbiAgY2hpbGQsXG4gIHZtXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaGVja0NvbXBvbmVudHMoY2hpbGQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoaWxkID0gY2hpbGQub3B0aW9ucztcbiAgfVxuXG4gIG5vcm1hbGl6ZVByb3BzKGNoaWxkLCB2bSk7XG4gIG5vcm1hbGl6ZUluamVjdChjaGlsZCwgdm0pO1xuICBub3JtYWxpemVEaXJlY3RpdmVzKGNoaWxkKTtcblxuICAvLyBBcHBseSBleHRlbmRzIGFuZCBtaXhpbnMgb24gdGhlIGNoaWxkIG9wdGlvbnMsXG4gIC8vIGJ1dCBvbmx5IGlmIGl0IGlzIGEgcmF3IG9wdGlvbnMgb2JqZWN0IHRoYXQgaXNuJ3RcbiAgLy8gdGhlIHJlc3VsdCBvZiBhbm90aGVyIG1lcmdlT3B0aW9ucyBjYWxsLlxuICAvLyBPbmx5IG1lcmdlZCBvcHRpb25zIGhhcyB0aGUgX2Jhc2UgcHJvcGVydHkuXG4gIGlmICghY2hpbGQuX2Jhc2UpIHtcbiAgICBpZiAoY2hpbGQuZXh0ZW5kcykge1xuICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQuZXh0ZW5kcywgdm0pO1xuICAgIH1cbiAgICBpZiAoY2hpbGQubWl4aW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkLm1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQubWl4aW5zW2ldLCB2bSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gcGFyZW50KSB7XG4gICAgbWVyZ2VGaWVsZChrZXkpO1xuICB9XG4gIGZvciAoa2V5IGluIGNoaWxkKSB7XG4gICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XG4gICAgICBtZXJnZUZpZWxkKGtleSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1lcmdlRmllbGQgKGtleSkge1xuICAgIHZhciBzdHJhdCA9IHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdDtcbiAgICBvcHRpb25zW2tleV0gPSBzdHJhdChwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwgdm0sIGtleSk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnNcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGFuIGFzc2V0LlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJlY2F1c2UgY2hpbGQgaW5zdGFuY2VzIG5lZWQgYWNjZXNzXG4gKiB0byBhc3NldHMgZGVmaW5lZCBpbiBpdHMgYW5jZXN0b3IgY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVBc3NldCAoXG4gIG9wdGlvbnMsXG4gIHR5cGUsXG4gIGlkLFxuICB3YXJuTWlzc2luZ1xuKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBhc3NldHMgPSBvcHRpb25zW3R5cGVdO1xuICAvLyBjaGVjayBsb2NhbCByZWdpc3RyYXRpb24gdmFyaWF0aW9ucyBmaXJzdFxuICBpZiAoaGFzT3duKGFzc2V0cywgaWQpKSB7IHJldHVybiBhc3NldHNbaWRdIH1cbiAgdmFyIGNhbWVsaXplZElkID0gY2FtZWxpemUoaWQpO1xuICBpZiAoaGFzT3duKGFzc2V0cywgY2FtZWxpemVkSWQpKSB7IHJldHVybiBhc3NldHNbY2FtZWxpemVkSWRdIH1cbiAgdmFyIFBhc2NhbENhc2VJZCA9IGNhcGl0YWxpemUoY2FtZWxpemVkSWQpO1xuICBpZiAoaGFzT3duKGFzc2V0cywgUGFzY2FsQ2FzZUlkKSkgeyByZXR1cm4gYXNzZXRzW1Bhc2NhbENhc2VJZF0gfVxuICAvLyBmYWxsYmFjayB0byBwcm90b3R5cGUgY2hhaW5cbiAgdmFyIHJlcyA9IGFzc2V0c1tpZF0gfHwgYXNzZXRzW2NhbWVsaXplZElkXSB8fCBhc3NldHNbUGFzY2FsQ2FzZUlkXTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybk1pc3NpbmcgJiYgIXJlcykge1xuICAgIHdhcm4oXG4gICAgICAnRmFpbGVkIHRvIHJlc29sdmUgJyArIHR5cGUuc2xpY2UoMCwgLTEpICsgJzogJyArIGlkLFxuICAgICAgb3B0aW9uc1xuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcCAoXG4gIGtleSxcbiAgcHJvcE9wdGlvbnMsXG4gIHByb3BzRGF0YSxcbiAgdm1cbikge1xuICB2YXIgcHJvcCA9IHByb3BPcHRpb25zW2tleV07XG4gIHZhciBhYnNlbnQgPSAhaGFzT3duKHByb3BzRGF0YSwga2V5KTtcbiAgdmFyIHZhbHVlID0gcHJvcHNEYXRhW2tleV07XG4gIC8vIGJvb2xlYW4gY2FzdGluZ1xuICB2YXIgYm9vbGVhbkluZGV4ID0gZ2V0VHlwZUluZGV4KEJvb2xlYW4sIHByb3AudHlwZSk7XG4gIGlmIChib29sZWFuSW5kZXggPiAtMSkge1xuICAgIGlmIChhYnNlbnQgJiYgIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBoeXBoZW5hdGUoa2V5KSkge1xuICAgICAgLy8gb25seSBjYXN0IGVtcHR5IHN0cmluZyAvIHNhbWUgbmFtZSB0byBib29sZWFuIGlmXG4gICAgICAvLyBib29sZWFuIGhhcyBoaWdoZXIgcHJpb3JpdHlcbiAgICAgIHZhciBzdHJpbmdJbmRleCA9IGdldFR5cGVJbmRleChTdHJpbmcsIHByb3AudHlwZSk7XG4gICAgICBpZiAoc3RyaW5nSW5kZXggPCAwIHx8IGJvb2xlYW5JbmRleCA8IHN0cmluZ0luZGV4KSB7XG4gICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2hlY2sgZGVmYXVsdCB2YWx1ZVxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhbHVlID0gZ2V0UHJvcERlZmF1bHRWYWx1ZSh2bSwgcHJvcCwga2V5KTtcbiAgICAvLyBzaW5jZSB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBhIGZyZXNoIGNvcHksXG4gICAgLy8gbWFrZSBzdXJlIHRvIG9ic2VydmUgaXQuXG4gICAgdmFyIHByZXZTaG91bGRPYnNlcnZlID0gc2hvdWxkT2JzZXJ2ZTtcbiAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gICAgb2JzZXJ2ZSh2YWx1ZSk7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKHByZXZTaG91bGRPYnNlcnZlKTtcbiAgfVxuICBpZiAoXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIC8vIHNraXAgdmFsaWRhdGlvbiBmb3Igd2VleCByZWN5Y2xlLWxpc3QgY2hpbGQgY29tcG9uZW50IHByb3BzXG4gICAgIShmYWxzZSlcbiAgKSB7XG4gICAgYXNzZXJ0UHJvcChwcm9wLCBrZXksIHZhbHVlLCB2bSwgYWJzZW50KTtcbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBwcm9wLlxuICovXG5mdW5jdGlvbiBnZXRQcm9wRGVmYXVsdFZhbHVlICh2bSwgcHJvcCwga2V5KSB7XG4gIC8vIG5vIGRlZmF1bHQsIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKCFoYXNPd24ocHJvcCwgJ2RlZmF1bHQnKSkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuICB2YXIgZGVmID0gcHJvcC5kZWZhdWx0O1xuICAvLyB3YXJuIGFnYWluc3Qgbm9uLWZhY3RvcnkgZGVmYXVsdHMgZm9yIE9iamVjdCAmIEFycmF5XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzT2JqZWN0KGRlZikpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgZGVmYXVsdCB2YWx1ZSBmb3IgcHJvcCBcIicgKyBrZXkgKyAnXCI6ICcgK1xuICAgICAgJ1Byb3BzIHdpdGggdHlwZSBPYmplY3QvQXJyYXkgbXVzdCB1c2UgYSBmYWN0b3J5IGZ1bmN0aW9uICcgK1xuICAgICAgJ3RvIHJldHVybiB0aGUgZGVmYXVsdCB2YWx1ZS4nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHRoZSByYXcgcHJvcCB2YWx1ZSB3YXMgYWxzbyB1bmRlZmluZWQgZnJvbSBwcmV2aW91cyByZW5kZXIsXG4gIC8vIHJldHVybiBwcmV2aW91cyBkZWZhdWx0IHZhbHVlIHRvIGF2b2lkIHVubmVjZXNzYXJ5IHdhdGNoZXIgdHJpZ2dlclxuICBpZiAodm0gJiYgdm0uJG9wdGlvbnMucHJvcHNEYXRhICYmXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhW2tleV0gPT09IHVuZGVmaW5lZCAmJlxuICAgIHZtLl9wcm9wc1trZXldICE9PSB1bmRlZmluZWRcbiAgKSB7XG4gICAgcmV0dXJuIHZtLl9wcm9wc1trZXldXG4gIH1cbiAgLy8gY2FsbCBmYWN0b3J5IGZ1bmN0aW9uIGZvciBub24tRnVuY3Rpb24gdHlwZXNcbiAgLy8gYSB2YWx1ZSBpcyBGdW5jdGlvbiBpZiBpdHMgcHJvdG90eXBlIGlzIGZ1bmN0aW9uIGV2ZW4gYWNyb3NzIGRpZmZlcmVudCBleGVjdXRpb24gY29udGV4dFxuICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBnZXRUeXBlKHByb3AudHlwZSkgIT09ICdGdW5jdGlvbidcbiAgICA/IGRlZi5jYWxsKHZtKVxuICAgIDogZGVmXG59XG5cbi8qKlxuICogQXNzZXJ0IHdoZXRoZXIgYSBwcm9wIGlzIHZhbGlkLlxuICovXG5mdW5jdGlvbiBhc3NlcnRQcm9wIChcbiAgcHJvcCxcbiAgbmFtZSxcbiAgdmFsdWUsXG4gIHZtLFxuICBhYnNlbnRcbikge1xuICBpZiAocHJvcC5yZXF1aXJlZCAmJiBhYnNlbnQpIHtcbiAgICB3YXJuKFxuICAgICAgJ01pc3NpbmcgcmVxdWlyZWQgcHJvcDogXCInICsgbmFtZSArICdcIicsXG4gICAgICB2bVxuICAgICk7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgJiYgIXByb3AucmVxdWlyZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdHlwZSA9IHByb3AudHlwZTtcbiAgdmFyIHZhbGlkID0gIXR5cGUgfHwgdHlwZSA9PT0gdHJ1ZTtcbiAgdmFyIGV4cGVjdGVkVHlwZXMgPSBbXTtcbiAgaWYgKHR5cGUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICAgIHR5cGUgPSBbdHlwZV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZS5sZW5ndGggJiYgIXZhbGlkOyBpKyspIHtcbiAgICAgIHZhciBhc3NlcnRlZFR5cGUgPSBhc3NlcnRUeXBlKHZhbHVlLCB0eXBlW2ldKTtcbiAgICAgIGV4cGVjdGVkVHlwZXMucHVzaChhc3NlcnRlZFR5cGUuZXhwZWN0ZWRUeXBlIHx8ICcnKTtcbiAgICAgIHZhbGlkID0gYXNzZXJ0ZWRUeXBlLnZhbGlkO1xuICAgIH1cbiAgfVxuXG4gIGlmICghdmFsaWQpIHtcbiAgICB3YXJuKFxuICAgICAgZ2V0SW52YWxpZFR5cGVNZXNzYWdlKG5hbWUsIHZhbHVlLCBleHBlY3RlZFR5cGVzKSxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdmFsaWRhdG9yID0gcHJvcC52YWxpZGF0b3I7XG4gIGlmICh2YWxpZGF0b3IpIHtcbiAgICBpZiAoIXZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdJbnZhbGlkIHByb3A6IGN1c3RvbSB2YWxpZGF0b3IgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFwiJyArIG5hbWUgKyAnXCIuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbnZhciBzaW1wbGVDaGVja1JFID0gL14oU3RyaW5nfE51bWJlcnxCb29sZWFufEZ1bmN0aW9ufFN5bWJvbCkkLztcblxuZnVuY3Rpb24gYXNzZXJ0VHlwZSAodmFsdWUsIHR5cGUpIHtcbiAgdmFyIHZhbGlkO1xuICB2YXIgZXhwZWN0ZWRUeXBlID0gZ2V0VHlwZSh0eXBlKTtcbiAgaWYgKHNpbXBsZUNoZWNrUkUudGVzdChleHBlY3RlZFR5cGUpKSB7XG4gICAgdmFyIHQgPSB0eXBlb2YgdmFsdWU7XG4gICAgdmFsaWQgPSB0ID09PSBleHBlY3RlZFR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAvLyBmb3IgcHJpbWl0aXZlIHdyYXBwZXIgb2JqZWN0c1xuICAgIGlmICghdmFsaWQgJiYgdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdPYmplY3QnKSB7XG4gICAgdmFsaWQgPSBpc1BsYWluT2JqZWN0KHZhbHVlKTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdBcnJheScpIHtcbiAgICB2YWxpZCA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICB9XG4gIHJldHVybiB7XG4gICAgdmFsaWQ6IHZhbGlkLFxuICAgIGV4cGVjdGVkVHlwZTogZXhwZWN0ZWRUeXBlXG4gIH1cbn1cblxuLyoqXG4gKiBVc2UgZnVuY3Rpb24gc3RyaW5nIG5hbWUgdG8gY2hlY2sgYnVpbHQtaW4gdHlwZXMsXG4gKiBiZWNhdXNlIGEgc2ltcGxlIGVxdWFsaXR5IGNoZWNrIHdpbGwgZmFpbCB3aGVuIHJ1bm5pbmdcbiAqIGFjcm9zcyBkaWZmZXJlbnQgdm1zIC8gaWZyYW1lcy5cbiAqL1xuZnVuY3Rpb24gZ2V0VHlwZSAoZm4pIHtcbiAgdmFyIG1hdGNoID0gZm4gJiYgZm4udG9TdHJpbmcoKS5tYXRjaCgvXlxccypmdW5jdGlvbiAoXFx3KykvKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJ1xufVxuXG5mdW5jdGlvbiBpc1NhbWVUeXBlIChhLCBiKSB7XG4gIHJldHVybiBnZXRUeXBlKGEpID09PSBnZXRUeXBlKGIpXG59XG5cbmZ1bmN0aW9uIGdldFR5cGVJbmRleCAodHlwZSwgZXhwZWN0ZWRUeXBlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRUeXBlcykpIHtcbiAgICByZXR1cm4gaXNTYW1lVHlwZShleHBlY3RlZFR5cGVzLCB0eXBlKSA/IDAgOiAtMVxuICB9XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBleHBlY3RlZFR5cGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGlzU2FtZVR5cGUoZXhwZWN0ZWRUeXBlc1tpXSwgdHlwZSkpIHtcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5mdW5jdGlvbiBnZXRJbnZhbGlkVHlwZU1lc3NhZ2UgKG5hbWUsIHZhbHVlLCBleHBlY3RlZFR5cGVzKSB7XG4gIHZhciBtZXNzYWdlID0gXCJJbnZhbGlkIHByb3A6IHR5cGUgY2hlY2sgZmFpbGVkIGZvciBwcm9wIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIuXCIgK1xuICAgIFwiIEV4cGVjdGVkIFwiICsgKGV4cGVjdGVkVHlwZXMubWFwKGNhcGl0YWxpemUpLmpvaW4oJywgJykpO1xuICB2YXIgZXhwZWN0ZWRUeXBlID0gZXhwZWN0ZWRUeXBlc1swXTtcbiAgdmFyIHJlY2VpdmVkVHlwZSA9IHRvUmF3VHlwZSh2YWx1ZSk7XG4gIHZhciBleHBlY3RlZFZhbHVlID0gc3R5bGVWYWx1ZSh2YWx1ZSwgZXhwZWN0ZWRUeXBlKTtcbiAgdmFyIHJlY2VpdmVkVmFsdWUgPSBzdHlsZVZhbHVlKHZhbHVlLCByZWNlaXZlZFR5cGUpO1xuICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIHNwZWNpZnkgZXhwZWN0ZWQgdmFsdWVcbiAgaWYgKGV4cGVjdGVkVHlwZXMubGVuZ3RoID09PSAxICYmXG4gICAgICBpc0V4cGxpY2FibGUoZXhwZWN0ZWRUeXBlKSAmJlxuICAgICAgIWlzQm9vbGVhbihleHBlY3RlZFR5cGUsIHJlY2VpdmVkVHlwZSkpIHtcbiAgICBtZXNzYWdlICs9IFwiIHdpdGggdmFsdWUgXCIgKyBleHBlY3RlZFZhbHVlO1xuICB9XG4gIG1lc3NhZ2UgKz0gXCIsIGdvdCBcIiArIHJlY2VpdmVkVHlwZSArIFwiIFwiO1xuICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIHNwZWNpZnkgcmVjZWl2ZWQgdmFsdWVcbiAgaWYgKGlzRXhwbGljYWJsZShyZWNlaXZlZFR5cGUpKSB7XG4gICAgbWVzc2FnZSArPSBcIndpdGggdmFsdWUgXCIgKyByZWNlaXZlZFZhbHVlICsgXCIuXCI7XG4gIH1cbiAgcmV0dXJuIG1lc3NhZ2Vcbn1cblxuZnVuY3Rpb24gc3R5bGVWYWx1ZSAodmFsdWUsIHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09ICdTdHJpbmcnKSB7XG4gICAgcmV0dXJuIChcIlxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ051bWJlcicpIHtcbiAgICByZXR1cm4gKFwiXCIgKyAoTnVtYmVyKHZhbHVlKSkpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcIlwiICsgdmFsdWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFeHBsaWNhYmxlICh2YWx1ZSkge1xuICB2YXIgZXhwbGljaXRUeXBlcyA9IFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJ107XG4gIHJldHVybiBleHBsaWNpdFR5cGVzLnNvbWUoZnVuY3Rpb24gKGVsZW0pIHsgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IGVsZW07IH0pXG59XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbiAoKSB7XG4gIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgcmV0dXJuIGFyZ3Muc29tZShmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gZWxlbS50b0xvd2VyQ2FzZSgpID09PSAnYm9vbGVhbic7IH0pXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBoYW5kbGVFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICAvLyBEZWFjdGl2YXRlIGRlcHMgdHJhY2tpbmcgd2hpbGUgcHJvY2Vzc2luZyBlcnJvciBoYW5kbGVyIHRvIGF2b2lkIHBvc3NpYmxlIGluZmluaXRlIHJlbmRlcmluZy5cbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVleC9pc3N1ZXMvMTUwNVxuICBwdXNoVGFyZ2V0KCk7XG4gIHRyeSB7XG4gICAgaWYgKHZtKSB7XG4gICAgICB2YXIgY3VyID0gdm07XG4gICAgICB3aGlsZSAoKGN1ciA9IGN1ci4kcGFyZW50KSkge1xuICAgICAgICB2YXIgaG9va3MgPSBjdXIuJG9wdGlvbnMuZXJyb3JDYXB0dXJlZDtcbiAgICAgICAgaWYgKGhvb2tzKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmFyIGNhcHR1cmUgPSBob29rc1tpXS5jYWxsKGN1ciwgZXJyLCB2bSwgaW5mbykgPT09IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoY2FwdHVyZSkgeyByZXR1cm4gfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBnbG9iYWxIYW5kbGVFcnJvcihlLCBjdXIsICdlcnJvckNhcHR1cmVkIGhvb2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsSGFuZGxlRXJyb3IoZXJyLCB2bSwgaW5mbyk7XG4gIH0gZmluYWxseSB7XG4gICAgcG9wVGFyZ2V0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlV2l0aEVycm9ySGFuZGxpbmcgKFxuICBoYW5kbGVyLFxuICBjb250ZXh0LFxuICBhcmdzLFxuICB2bSxcbiAgaW5mb1xuKSB7XG4gIHZhciByZXM7XG4gIHRyeSB7XG4gICAgcmVzID0gYXJncyA/IGhhbmRsZXIuYXBwbHkoY29udGV4dCwgYXJncykgOiBoYW5kbGVyLmNhbGwoY29udGV4dCk7XG4gICAgaWYgKHJlcyAmJiAhcmVzLl9pc1Z1ZSAmJiBpc1Byb21pc2UocmVzKSAmJiAhcmVzLl9oYW5kbGVkKSB7XG4gICAgICByZXMuY2F0Y2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGUsIHZtLCBpbmZvICsgXCIgKFByb21pc2UvYXN5bmMpXCIpOyB9KTtcbiAgICAgIC8vIGlzc3VlICM5NTExXG4gICAgICAvLyBhdm9pZCBjYXRjaCB0cmlnZ2VyaW5nIG11bHRpcGxlIHRpbWVzIHdoZW4gbmVzdGVkIGNhbGxzXG4gICAgICByZXMuX2hhbmRsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGhhbmRsZUVycm9yKGUsIHZtLCBpbmZvKTtcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZUVycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gIGlmIChjb25maWcuZXJyb3JIYW5kbGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjb25maWcuZXJyb3JIYW5kbGVyLmNhbGwobnVsbCwgZXJyLCB2bSwgaW5mbylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpZiB0aGUgdXNlciBpbnRlbnRpb25hbGx5IHRocm93cyB0aGUgb3JpZ2luYWwgZXJyb3IgaW4gdGhlIGhhbmRsZXIsXG4gICAgICAvLyBkbyBub3QgbG9nIGl0IHR3aWNlXG4gICAgICBpZiAoZSAhPT0gZXJyKSB7XG4gICAgICAgIGxvZ0Vycm9yKGUsIG51bGwsICdjb25maWcuZXJyb3JIYW5kbGVyJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxvZ0Vycm9yKGVyciwgdm0sIGluZm8pO1xufVxuXG5mdW5jdGlvbiBsb2dFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHdhcm4oKFwiRXJyb3IgaW4gXCIgKyBpbmZvICsgXCI6IFxcXCJcIiArIChlcnIudG9TdHJpbmcoKSkgKyBcIlxcXCJcIiksIHZtKTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoKGluQnJvd3NlciB8fCBpbldlZXgpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBlcnJcbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIGNhbGxiYWNrcyA9IFtdO1xudmFyIHBlbmRpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hDYWxsYmFja3MgKCkge1xuICBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBjb3BpZXMgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gIGNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvcGllc1tpXSgpO1xuICB9XG59XG5cbi8vIEhlcmUgd2UgaGF2ZSBhc3luYyBkZWZlcnJpbmcgd3JhcHBlcnMgdXNpbmcgbWljcm90YXNrcy5cbi8vIEluIDIuNSB3ZSB1c2VkIChtYWNybykgdGFza3MgKGluIGNvbWJpbmF0aW9uIHdpdGggbWljcm90YXNrcykuXG4vLyBIb3dldmVyLCBpdCBoYXMgc3VidGxlIHByb2JsZW1zIHdoZW4gc3RhdGUgaXMgY2hhbmdlZCByaWdodCBiZWZvcmUgcmVwYWludFxuLy8gKGUuZy4gIzY4MTMsIG91dC1pbiB0cmFuc2l0aW9ucykuXG4vLyBBbHNvLCB1c2luZyAobWFjcm8pIHRhc2tzIGluIGV2ZW50IGhhbmRsZXIgd291bGQgY2F1c2Ugc29tZSB3ZWlyZCBiZWhhdmlvcnNcbi8vIHRoYXQgY2Fubm90IGJlIGNpcmN1bXZlbnRlZCAoZS5nLiAjNzEwOSwgIzcxNTMsICM3NTQ2LCAjNzgzNCwgIzgxMDkpLlxuLy8gU28gd2Ugbm93IHVzZSBtaWNyb3Rhc2tzIGV2ZXJ5d2hlcmUsIGFnYWluLlxuLy8gQSBtYWpvciBkcmF3YmFjayBvZiB0aGlzIHRyYWRlb2ZmIGlzIHRoYXQgdGhlcmUgYXJlIHNvbWUgc2NlbmFyaW9zXG4vLyB3aGVyZSBtaWNyb3Rhc2tzIGhhdmUgdG9vIGhpZ2ggYSBwcmlvcml0eSBhbmQgZmlyZSBpbiBiZXR3ZWVuIHN1cHBvc2VkbHlcbi8vIHNlcXVlbnRpYWwgZXZlbnRzIChlLmcuICM0NTIxLCAjNjY5MCwgd2hpY2ggaGF2ZSB3b3JrYXJvdW5kcylcbi8vIG9yIGV2ZW4gYmV0d2VlbiBidWJibGluZyBvZiB0aGUgc2FtZSBldmVudCAoIzY1NjYpLlxudmFyIHRpbWVyRnVuYztcblxuLy8gVGhlIG5leHRUaWNrIGJlaGF2aW9yIGxldmVyYWdlcyB0aGUgbWljcm90YXNrIHF1ZXVlLCB3aGljaCBjYW4gYmUgYWNjZXNzZWRcbi8vIHZpYSBlaXRoZXIgbmF0aXZlIFByb21pc2UudGhlbiBvciBNdXRhdGlvbk9ic2VydmVyLlxuLy8gTXV0YXRpb25PYnNlcnZlciBoYXMgd2lkZXIgc3VwcG9ydCwgaG93ZXZlciBpdCBpcyBzZXJpb3VzbHkgYnVnZ2VkIGluXG4vLyBVSVdlYlZpZXcgaW4gaU9TID49IDkuMy4zIHdoZW4gdHJpZ2dlcmVkIGluIHRvdWNoIGV2ZW50IGhhbmRsZXJzLiBJdFxuLy8gY29tcGxldGVseSBzdG9wcyB3b3JraW5nIGFmdGVyIHRyaWdnZXJpbmcgYSBmZXcgdGltZXMuLi4gc28sIGlmIG5hdGl2ZVxuLy8gUHJvbWlzZSBpcyBhdmFpbGFibGUsIHdlIHdpbGwgdXNlIGl0OlxuLyogaXN0YW5idWwgaWdub3JlIG5leHQsICRmbG93LWRpc2FibGUtbGluZSAqL1xuaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShQcm9taXNlKSkge1xuICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcC50aGVuKGZsdXNoQ2FsbGJhY2tzKTtcbiAgICAvLyBJbiBwcm9ibGVtYXRpYyBVSVdlYlZpZXdzLCBQcm9taXNlLnRoZW4gZG9lc24ndCBjb21wbGV0ZWx5IGJyZWFrLCBidXRcbiAgICAvLyBpdCBjYW4gZ2V0IHN0dWNrIGluIGEgd2VpcmQgc3RhdGUgd2hlcmUgY2FsbGJhY2tzIGFyZSBwdXNoZWQgaW50byB0aGVcbiAgICAvLyBtaWNyb3Rhc2sgcXVldWUgYnV0IHRoZSBxdWV1ZSBpc24ndCBiZWluZyBmbHVzaGVkLCB1bnRpbCB0aGUgYnJvd3NlclxuICAgIC8vIG5lZWRzIHRvIGRvIHNvbWUgb3RoZXIgd29yaywgZS5nLiBoYW5kbGUgYSB0aW1lci4gVGhlcmVmb3JlIHdlIGNhblxuICAgIC8vIFwiZm9yY2VcIiB0aGUgbWljcm90YXNrIHF1ZXVlIHRvIGJlIGZsdXNoZWQgYnkgYWRkaW5nIGFuIGVtcHR5IHRpbWVyLlxuICAgIGlmIChpc0lPUykgeyBzZXRUaW1lb3V0KG5vb3ApOyB9XG4gIH07XG59IGVsc2UgaWYgKCFpc0lFICYmIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gIGlzTmF0aXZlKE11dGF0aW9uT2JzZXJ2ZXIpIHx8XG4gIC8vIFBoYW50b21KUyBhbmQgaU9TIDcueFxuICBNdXRhdGlvbk9ic2VydmVyLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE11dGF0aW9uT2JzZXJ2ZXJDb25zdHJ1Y3Rvcl0nXG4pKSB7XG4gIC8vIFVzZSBNdXRhdGlvbk9ic2VydmVyIHdoZXJlIG5hdGl2ZSBQcm9taXNlIGlzIG5vdCBhdmFpbGFibGUsXG4gIC8vIGUuZy4gUGhhbnRvbUpTLCBpT1M3LCBBbmRyb2lkIDQuNFxuICAvLyAoIzY0NjYgTXV0YXRpb25PYnNlcnZlciBpcyB1bnJlbGlhYmxlIGluIElFMTEpXG4gIHZhciBjb3VudGVyID0gMTtcbiAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZmx1c2hDYWxsYmFja3MpO1xuICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY291bnRlcikpO1xuICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICB9KTtcbiAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMjtcbiAgICB0ZXh0Tm9kZS5kYXRhID0gU3RyaW5nKGNvdW50ZXIpO1xuICB9O1xufSBlbHNlIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShzZXRJbW1lZGlhdGUpKSB7XG4gIC8vIEZhbGxiYWNrIHRvIHNldEltbWVkaWF0ZS5cbiAgLy8gVGVjaG5pY2FsbHkgaXQgbGV2ZXJhZ2VzIHRoZSAobWFjcm8pIHRhc2sgcXVldWUsXG4gIC8vIGJ1dCBpdCBpcyBzdGlsbCBhIGJldHRlciBjaG9pY2UgdGhhbiBzZXRUaW1lb3V0LlxuICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0SW1tZWRpYXRlKGZsdXNoQ2FsbGJhY2tzKTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIEZhbGxiYWNrIHRvIHNldFRpbWVvdXQuXG4gIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KGZsdXNoQ2FsbGJhY2tzLCAwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbmV4dFRpY2sgKGNiLCBjdHgpIHtcbiAgdmFyIF9yZXNvbHZlO1xuICBjYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNiKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYi5jYWxsKGN0eCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGUsIGN0eCwgJ25leHRUaWNrJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChfcmVzb2x2ZSkge1xuICAgICAgX3Jlc29sdmUoY3R4KTtcbiAgICB9XG4gIH0pO1xuICBpZiAoIXBlbmRpbmcpIHtcbiAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICB0aW1lckZ1bmMoKTtcbiAgfVxuICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgaWYgKCFjYiAmJiB0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9KVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggUHJveHkgKi9cblxudmFyIGluaXRQcm94eTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGFsbG93ZWRHbG9iYWxzID0gbWFrZU1hcChcbiAgICAnSW5maW5pdHksdW5kZWZpbmVkLE5hTixpc0Zpbml0ZSxpc05hTiwnICtcbiAgICAncGFyc2VGbG9hdCxwYXJzZUludCxkZWNvZGVVUkksZGVjb2RlVVJJQ29tcG9uZW50LGVuY29kZVVSSSxlbmNvZGVVUklDb21wb25lbnQsJyArXG4gICAgJ01hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCwnICtcbiAgICAncmVxdWlyZScgLy8gZm9yIFdlYnBhY2svQnJvd3NlcmlmeVxuICApO1xuXG4gIHZhciB3YXJuTm9uUHJlc2VudCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgIHdhcm4oXG4gICAgICBcIlByb3BlcnR5IG9yIG1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgbm90IGRlZmluZWQgb24gdGhlIGluc3RhbmNlIGJ1dCBcIiArXG4gICAgICAncmVmZXJlbmNlZCBkdXJpbmcgcmVuZGVyLiBNYWtlIHN1cmUgdGhhdCB0aGlzIHByb3BlcnR5IGlzIHJlYWN0aXZlLCAnICtcbiAgICAgICdlaXRoZXIgaW4gdGhlIGRhdGEgb3B0aW9uLCBvciBmb3IgY2xhc3MtYmFzZWQgY29tcG9uZW50cywgYnkgJyArXG4gICAgICAnaW5pdGlhbGl6aW5nIHRoZSBwcm9wZXJ0eS4gJyArXG4gICAgICAnU2VlOiBodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9yZWFjdGl2aXR5Lmh0bWwjRGVjbGFyaW5nLVJlYWN0aXZlLVByb3BlcnRpZXMuJyxcbiAgICAgIHRhcmdldFxuICAgICk7XG4gIH07XG5cbiAgdmFyIHdhcm5SZXNlcnZlZFByZWZpeCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgIHdhcm4oXG4gICAgICBcIlByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBtdXN0IGJlIGFjY2Vzc2VkIHdpdGggXFxcIiRkYXRhLlwiICsga2V5ICsgXCJcXFwiIGJlY2F1c2UgXCIgK1xuICAgICAgJ3Byb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBcIiRcIiBvciBcIl9cIiBhcmUgbm90IHByb3hpZWQgaW4gdGhlIFZ1ZSBpbnN0YW5jZSB0byAnICtcbiAgICAgICdwcmV2ZW50IGNvbmZsaWN0cyB3aXRoIFZ1ZSBpbnRlcm5hbHMuICcgK1xuICAgICAgJ1NlZTogaHR0cHM6Ly92dWVqcy5vcmcvdjIvYXBpLyNkYXRhJyxcbiAgICAgIHRhcmdldFxuICAgICk7XG4gIH07XG5cbiAgdmFyIGhhc1Byb3h5ID1cbiAgICB0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFByb3h5KTtcblxuICBpZiAoaGFzUHJveHkpIHtcbiAgICB2YXIgaXNCdWlsdEluTW9kaWZpZXIgPSBtYWtlTWFwKCdzdG9wLHByZXZlbnQsc2VsZixjdHJsLHNoaWZ0LGFsdCxtZXRhLGV4YWN0Jyk7XG4gICAgY29uZmlnLmtleUNvZGVzID0gbmV3IFByb3h5KGNvbmZpZy5rZXlDb2Rlcywge1xuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQgKHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaXNCdWlsdEluTW9kaWZpZXIoa2V5KSkge1xuICAgICAgICAgIHdhcm4oKFwiQXZvaWQgb3ZlcndyaXRpbmcgYnVpbHQtaW4gbW9kaWZpZXIgaW4gY29uZmlnLmtleUNvZGVzOiAuXCIgKyBrZXkpKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBoYXNIYW5kbGVyID0ge1xuICAgIGhhczogZnVuY3Rpb24gaGFzICh0YXJnZXQsIGtleSkge1xuICAgICAgdmFyIGhhcyA9IGtleSBpbiB0YXJnZXQ7XG4gICAgICB2YXIgaXNBbGxvd2VkID0gYWxsb3dlZEdsb2JhbHMoa2V5KSB8fFxuICAgICAgICAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5LmNoYXJBdCgwKSA9PT0gJ18nICYmICEoa2V5IGluIHRhcmdldC4kZGF0YSkpO1xuICAgICAgaWYgKCFoYXMgJiYgIWlzQWxsb3dlZCkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldC4kZGF0YSkgeyB3YXJuUmVzZXJ2ZWRQcmVmaXgodGFyZ2V0LCBrZXkpOyB9XG4gICAgICAgIGVsc2UgeyB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXMgfHwgIWlzQWxsb3dlZFxuICAgIH1cbiAgfTtcblxuICB2YXIgZ2V0SGFuZGxlciA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiAhKGtleSBpbiB0YXJnZXQpKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0LiRkYXRhKSB7IHdhcm5SZXNlcnZlZFByZWZpeCh0YXJnZXQsIGtleSk7IH1cbiAgICAgICAgZWxzZSB7IHdhcm5Ob25QcmVzZW50KHRhcmdldCwga2V5KTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhcmdldFtrZXldXG4gICAgfVxuICB9O1xuXG4gIGluaXRQcm94eSA9IGZ1bmN0aW9uIGluaXRQcm94eSAodm0pIHtcbiAgICBpZiAoaGFzUHJveHkpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBwcm94eSBoYW5kbGVyIHRvIHVzZVxuICAgICAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcbiAgICAgIHZhciBoYW5kbGVycyA9IG9wdGlvbnMucmVuZGVyICYmIG9wdGlvbnMucmVuZGVyLl93aXRoU3RyaXBwZWRcbiAgICAgICAgPyBnZXRIYW5kbGVyXG4gICAgICAgIDogaGFzSGFuZGxlcjtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IG5ldyBQcm94eSh2bSwgaGFuZGxlcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bS5fcmVuZGVyUHJveHkgPSB2bTtcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG52YXIgc2Vlbk9iamVjdHMgPSBuZXcgX1NldCgpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIGFuIG9iamVjdCB0byBldm9rZSBhbGwgY29udmVydGVkXG4gKiBnZXR0ZXJzLCBzbyB0aGF0IGV2ZXJ5IG5lc3RlZCBwcm9wZXJ0eSBpbnNpZGUgdGhlIG9iamVjdFxuICogaXMgY29sbGVjdGVkIGFzIGEgXCJkZWVwXCIgZGVwZW5kZW5jeS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2UgKHZhbCkge1xuICBfdHJhdmVyc2UodmFsLCBzZWVuT2JqZWN0cyk7XG4gIHNlZW5PYmplY3RzLmNsZWFyKCk7XG59XG5cbmZ1bmN0aW9uIF90cmF2ZXJzZSAodmFsLCBzZWVuKSB7XG4gIHZhciBpLCBrZXlzO1xuICB2YXIgaXNBID0gQXJyYXkuaXNBcnJheSh2YWwpO1xuICBpZiAoKCFpc0EgJiYgIWlzT2JqZWN0KHZhbCkpIHx8IE9iamVjdC5pc0Zyb3plbih2YWwpIHx8IHZhbCBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZhbC5fX29iX18pIHtcbiAgICB2YXIgZGVwSWQgPSB2YWwuX19vYl9fLmRlcC5pZDtcbiAgICBpZiAoc2Vlbi5oYXMoZGVwSWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc2Vlbi5hZGQoZGVwSWQpO1xuICB9XG4gIGlmIChpc0EpIHtcbiAgICBpID0gdmFsLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7IF90cmF2ZXJzZSh2YWxbaV0sIHNlZW4pOyB9XG4gIH0gZWxzZSB7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgaSA9IGtleXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtrZXlzW2ldXSwgc2Vlbik7IH1cbiAgfVxufVxuXG52YXIgbWFyaztcbnZhciBtZWFzdXJlO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcGVyZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucGVyZm9ybWFuY2U7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoXG4gICAgcGVyZiAmJlxuICAgIHBlcmYubWFyayAmJlxuICAgIHBlcmYubWVhc3VyZSAmJlxuICAgIHBlcmYuY2xlYXJNYXJrcyAmJlxuICAgIHBlcmYuY2xlYXJNZWFzdXJlc1xuICApIHtcbiAgICBtYXJrID0gZnVuY3Rpb24gKHRhZykgeyByZXR1cm4gcGVyZi5tYXJrKHRhZyk7IH07XG4gICAgbWVhc3VyZSA9IGZ1bmN0aW9uIChuYW1lLCBzdGFydFRhZywgZW5kVGFnKSB7XG4gICAgICBwZXJmLm1lYXN1cmUobmFtZSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICBwZXJmLmNsZWFyTWFya3Moc3RhcnRUYWcpO1xuICAgICAgcGVyZi5jbGVhck1hcmtzKGVuZFRhZyk7XG4gICAgICAvLyBwZXJmLmNsZWFyTWVhc3VyZXMobmFtZSlcbiAgICB9O1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgbm9ybWFsaXplRXZlbnQgPSBjYWNoZWQoZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIHBhc3NpdmUgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJyYnO1xuICBuYW1lID0gcGFzc2l2ZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICB2YXIgb25jZSQkMSA9IG5hbWUuY2hhckF0KDApID09PSAnfic7IC8vIFByZWZpeGVkIGxhc3QsIGNoZWNrZWQgZmlyc3RcbiAgbmFtZSA9IG9uY2UkJDEgPyBuYW1lLnNsaWNlKDEpIDogbmFtZTtcbiAgdmFyIGNhcHR1cmUgPSBuYW1lLmNoYXJBdCgwKSA9PT0gJyEnO1xuICBuYW1lID0gY2FwdHVyZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgb25jZTogb25jZSQkMSxcbiAgICBjYXB0dXJlOiBjYXB0dXJlLFxuICAgIHBhc3NpdmU6IHBhc3NpdmVcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZuSW52b2tlciAoZm5zLCB2bSkge1xuICBmdW5jdGlvbiBpbnZva2VyICgpIHtcbiAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cbiAgICB2YXIgZm5zID0gaW52b2tlci5mbnM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZm5zKSkge1xuICAgICAgdmFyIGNsb25lZCA9IGZucy5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbG9uZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoY2xvbmVkW2ldLCBudWxsLCBhcmd1bWVudHMkMSwgdm0sIFwidi1vbiBoYW5kbGVyXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZXR1cm4gaGFuZGxlciByZXR1cm4gdmFsdWUgZm9yIHNpbmdsZSBoYW5kbGVyc1xuICAgICAgcmV0dXJuIGludm9rZVdpdGhFcnJvckhhbmRsaW5nKGZucywgbnVsbCwgYXJndW1lbnRzLCB2bSwgXCJ2LW9uIGhhbmRsZXJcIilcbiAgICB9XG4gIH1cbiAgaW52b2tlci5mbnMgPSBmbnM7XG4gIHJldHVybiBpbnZva2VyXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RlbmVycyAoXG4gIG9uLFxuICBvbGRPbixcbiAgYWRkLFxuICByZW1vdmUkJDEsXG4gIGNyZWF0ZU9uY2VIYW5kbGVyLFxuICB2bVxuKSB7XG4gIHZhciBuYW1lLCBkZWYkJDEsIGN1ciwgb2xkLCBldmVudDtcbiAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgZGVmJCQxID0gY3VyID0gb25bbmFtZV07XG4gICAgb2xkID0gb2xkT25bbmFtZV07XG4gICAgZXZlbnQgPSBub3JtYWxpemVFdmVudChuYW1lKTtcbiAgICBpZiAoaXNVbmRlZihjdXIpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiSW52YWxpZCBoYW5kbGVyIGZvciBldmVudCBcXFwiXCIgKyAoZXZlbnQubmFtZSkgKyBcIlxcXCI6IGdvdCBcIiArIFN0cmluZyhjdXIpLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkKSkge1xuICAgICAgaWYgKGlzVW5kZWYoY3VyLmZucykpIHtcbiAgICAgICAgY3VyID0gb25bbmFtZV0gPSBjcmVhdGVGbkludm9rZXIoY3VyLCB2bSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNUcnVlKGV2ZW50Lm9uY2UpKSB7XG4gICAgICAgIGN1ciA9IG9uW25hbWVdID0gY3JlYXRlT25jZUhhbmRsZXIoZXZlbnQubmFtZSwgY3VyLCBldmVudC5jYXB0dXJlKTtcbiAgICAgIH1cbiAgICAgIGFkZChldmVudC5uYW1lLCBjdXIsIGV2ZW50LmNhcHR1cmUsIGV2ZW50LnBhc3NpdmUsIGV2ZW50LnBhcmFtcyk7XG4gICAgfSBlbHNlIGlmIChjdXIgIT09IG9sZCkge1xuICAgICAgb2xkLmZucyA9IGN1cjtcbiAgICAgIG9uW25hbWVdID0gb2xkO1xuICAgIH1cbiAgfVxuICBmb3IgKG5hbWUgaW4gb2xkT24pIHtcbiAgICBpZiAoaXNVbmRlZihvbltuYW1lXSkpIHtcbiAgICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgICByZW1vdmUkJDEoZXZlbnQubmFtZSwgb2xkT25bbmFtZV0sIGV2ZW50LmNhcHR1cmUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbi8vIGZpeGVkIGJ5IHh4eHh4eCAobXAgcHJvcGVydGllcylcbmZ1bmN0aW9uIGV4dHJhY3RQcm9wZXJ0aWVzRnJvbVZOb2RlRGF0YShkYXRhLCBDdG9yLCByZXMsIGNvbnRleHQpIHtcbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLm1wT3B0aW9ucyAmJiBDdG9yLm9wdGlvbnMubXBPcHRpb25zLnByb3BlcnRpZXM7XG4gIGlmIChpc1VuZGVmKHByb3BPcHRpb25zKSkge1xuICAgIHJldHVybiByZXNcbiAgfVxuICB2YXIgZXh0ZXJuYWxDbGFzc2VzID0gQ3Rvci5vcHRpb25zLm1wT3B0aW9ucy5leHRlcm5hbENsYXNzZXMgfHwgW107XG4gIHZhciBhdHRycyA9IGRhdGEuYXR0cnM7XG4gIHZhciBwcm9wcyA9IGRhdGEucHJvcHM7XG4gIGlmIChpc0RlZihhdHRycykgfHwgaXNEZWYocHJvcHMpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICB2YXIgcmVzdWx0ID0gY2hlY2tQcm9wKHJlcywgcHJvcHMsIGtleSwgYWx0S2V5LCB0cnVlKSB8fFxuICAgICAgICAgIGNoZWNrUHJvcChyZXMsIGF0dHJzLCBrZXksIGFsdEtleSwgZmFsc2UpO1xuICAgICAgLy8gZXh0ZXJuYWxDbGFzc1xuICAgICAgaWYgKFxuICAgICAgICByZXN1bHQgJiZcbiAgICAgICAgcmVzW2tleV0gJiZcbiAgICAgICAgZXh0ZXJuYWxDbGFzc2VzLmluZGV4T2YoYWx0S2V5KSAhPT0gLTEgJiZcbiAgICAgICAgY29udGV4dFtjYW1lbGl6ZShyZXNba2V5XSldXG4gICAgICApIHtcbiAgICAgICAgLy8g6LWL5YC8IGV4dGVybmFsQ2xhc3Mg55yf5q2j55qE5YC8KOaooeadv+mHjCBleHRlcm5hbENsYXNzIOeahOWAvOWPr+iDveaYr+Wtl+espuS4silcbiAgICAgICAgcmVzW2tleV0gPSBjb250ZXh0W2NhbWVsaXplKHJlc1trZXldKV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZXh0cmFjdFByb3BzRnJvbVZOb2RlRGF0YSAoXG4gIGRhdGEsXG4gIEN0b3IsXG4gIHRhZyxcbiAgY29udGV4dC8vIGZpeGVkIGJ5IHh4eHh4eFxuKSB7XG4gIC8vIHdlIGFyZSBvbmx5IGV4dHJhY3RpbmcgcmF3IHZhbHVlcyBoZXJlLlxuICAvLyB2YWxpZGF0aW9uIGFuZCBkZWZhdWx0IHZhbHVlcyBhcmUgaGFuZGxlZCBpbiB0aGUgY2hpbGRcbiAgLy8gY29tcG9uZW50IGl0c2VsZi5cbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xuICBpZiAoaXNVbmRlZihwcm9wT3B0aW9ucykpIHtcbiAgICAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICByZXR1cm4gZXh0cmFjdFByb3BlcnRpZXNGcm9tVk5vZGVEYXRhKGRhdGEsIEN0b3IsIHt9LCBjb250ZXh0KVxuICB9XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGF0dHJzID0gZGF0YS5hdHRycztcbiAgdmFyIHByb3BzID0gZGF0YS5wcm9wcztcbiAgaWYgKGlzRGVmKGF0dHJzKSB8fCBpc0RlZihwcm9wcykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcbiAgICAgIHZhciBhbHRLZXkgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHZhciBrZXlJbkxvd2VyQ2FzZSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAga2V5ICE9PSBrZXlJbkxvd2VyQ2FzZSAmJlxuICAgICAgICAgIGF0dHJzICYmIGhhc093bihhdHRycywga2V5SW5Mb3dlckNhc2UpXG4gICAgICAgICkge1xuICAgICAgICAgIHRpcChcbiAgICAgICAgICAgIFwiUHJvcCBcXFwiXCIgKyBrZXlJbkxvd2VyQ2FzZSArIFwiXFxcIiBpcyBwYXNzZWQgdG8gY29tcG9uZW50IFwiICtcbiAgICAgICAgICAgIChmb3JtYXRDb21wb25lbnROYW1lKHRhZyB8fCBDdG9yKSkgKyBcIiwgYnV0IHRoZSBkZWNsYXJlZCBwcm9wIG5hbWUgaXNcIiArXG4gICAgICAgICAgICBcIiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuIFwiICtcbiAgICAgICAgICAgIFwiTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgY2FtZWxDYXNlZCBcIiArXG4gICAgICAgICAgICBcInByb3BzIG5lZWQgdG8gdXNlIHRoZWlyIGtlYmFiLWNhc2UgZXF1aXZhbGVudHMgd2hlbiB1c2luZyBpbi1ET00gXCIgK1xuICAgICAgICAgICAgXCJ0ZW1wbGF0ZXMuIFlvdSBzaG91bGQgcHJvYmFibHkgdXNlIFxcXCJcIiArIGFsdEtleSArIFwiXFxcIiBpbnN0ZWFkIG9mIFxcXCJcIiArIGtleSArIFwiXFxcIi5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrUHJvcChyZXMsIHByb3BzLCBrZXksIGFsdEtleSwgdHJ1ZSkgfHxcbiAgICAgIGNoZWNrUHJvcChyZXMsIGF0dHJzLCBrZXksIGFsdEtleSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuICAvLyBmaXhlZCBieSB4eHh4eHhcbiAgcmV0dXJuIGV4dHJhY3RQcm9wZXJ0aWVzRnJvbVZOb2RlRGF0YShkYXRhLCBDdG9yLCByZXMsIGNvbnRleHQpXG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcCAoXG4gIHJlcyxcbiAgaGFzaCxcbiAga2V5LFxuICBhbHRLZXksXG4gIHByZXNlcnZlXG4pIHtcbiAgaWYgKGlzRGVmKGhhc2gpKSB7XG4gICAgaWYgKGhhc093bihoYXNoLCBrZXkpKSB7XG4gICAgICByZXNba2V5XSA9IGhhc2hba2V5XTtcbiAgICAgIGlmICghcHJlc2VydmUpIHtcbiAgICAgICAgZGVsZXRlIGhhc2hba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChoYXNPd24oaGFzaCwgYWx0S2V5KSkge1xuICAgICAgcmVzW2tleV0gPSBoYXNoW2FsdEtleV07XG4gICAgICBpZiAoIXByZXNlcnZlKSB7XG4gICAgICAgIGRlbGV0ZSBoYXNoW2FsdEtleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyogICovXG5cbi8vIFRoZSB0ZW1wbGF0ZSBjb21waWxlciBhdHRlbXB0cyB0byBtaW5pbWl6ZSB0aGUgbmVlZCBmb3Igbm9ybWFsaXphdGlvbiBieVxuLy8gc3RhdGljYWxseSBhbmFseXppbmcgdGhlIHRlbXBsYXRlIGF0IGNvbXBpbGUgdGltZS5cbi8vXG4vLyBGb3IgcGxhaW4gSFRNTCBtYXJrdXAsIG5vcm1hbGl6YXRpb24gY2FuIGJlIGNvbXBsZXRlbHkgc2tpcHBlZCBiZWNhdXNlIHRoZVxuLy8gZ2VuZXJhdGVkIHJlbmRlciBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIHJldHVybiBBcnJheTxWTm9kZT4uIFRoZXJlIGFyZVxuLy8gdHdvIGNhc2VzIHdoZXJlIGV4dHJhIG5vcm1hbGl6YXRpb24gaXMgbmVlZGVkOlxuXG4vLyAxLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb21wb25lbnRzIC0gYmVjYXVzZSBhIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4vLyBtYXkgcmV0dXJuIGFuIEFycmF5IGluc3RlYWQgb2YgYSBzaW5nbGUgcm9vdC4gSW4gdGhpcyBjYXNlLCBqdXN0IGEgc2ltcGxlXG4vLyBub3JtYWxpemF0aW9uIGlzIG5lZWRlZCAtIGlmIGFueSBjaGlsZCBpcyBhbiBBcnJheSwgd2UgZmxhdHRlbiB0aGUgd2hvbGVcbi8vIHRoaW5nIHdpdGggQXJyYXkucHJvdG90eXBlLmNvbmNhdC4gSXQgaXMgZ3VhcmFudGVlZCB0byBiZSBvbmx5IDEtbGV2ZWwgZGVlcFxuLy8gYmVjYXVzZSBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYWxyZWFkeSBub3JtYWxpemUgdGhlaXIgb3duIGNoaWxkcmVuLlxuZnVuY3Rpb24gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4gKGNoaWxkcmVuKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbltpXSkpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBjaGlsZHJlbilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNoaWxkcmVuXG59XG5cbi8vIDIuIFdoZW4gdGhlIGNoaWxkcmVuIGNvbnRhaW5zIGNvbnN0cnVjdHMgdGhhdCBhbHdheXMgZ2VuZXJhdGVkIG5lc3RlZCBBcnJheXMsXG4vLyBlLmcuIDx0ZW1wbGF0ZT4sIDxzbG90Piwgdi1mb3IsIG9yIHdoZW4gdGhlIGNoaWxkcmVuIGlzIHByb3ZpZGVkIGJ5IHVzZXJcbi8vIHdpdGggaGFuZC13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMgLyBKU1guIEluIHN1Y2ggY2FzZXMgYSBmdWxsIG5vcm1hbGl6YXRpb25cbi8vIGlzIG5lZWRlZCB0byBjYXRlciB0byBhbGwgcG9zc2libGUgdHlwZXMgb2YgY2hpbGRyZW4gdmFsdWVzLlxuZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGRyZW4gKGNoaWxkcmVuKSB7XG4gIHJldHVybiBpc1ByaW1pdGl2ZShjaGlsZHJlbilcbiAgICA/IFtjcmVhdGVUZXh0Vk5vZGUoY2hpbGRyZW4pXVxuICAgIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbilcbiAgICAgID8gbm9ybWFsaXplQXJyYXlDaGlsZHJlbihjaGlsZHJlbilcbiAgICAgIDogdW5kZWZpbmVkXG59XG5cbmZ1bmN0aW9uIGlzVGV4dE5vZGUgKG5vZGUpIHtcbiAgcmV0dXJuIGlzRGVmKG5vZGUpICYmIGlzRGVmKG5vZGUudGV4dCkgJiYgaXNGYWxzZShub2RlLmlzQ29tbWVudClcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXlDaGlsZHJlbiAoY2hpbGRyZW4sIG5lc3RlZEluZGV4KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgdmFyIGksIGMsIGxhc3RJbmRleCwgbGFzdDtcbiAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IGNoaWxkcmVuW2ldO1xuICAgIGlmIChpc1VuZGVmKGMpIHx8IHR5cGVvZiBjID09PSAnYm9vbGVhbicpIHsgY29udGludWUgfVxuICAgIGxhc3RJbmRleCA9IHJlcy5sZW5ndGggLSAxO1xuICAgIGxhc3QgPSByZXNbbGFzdEluZGV4XTtcbiAgICAvLyAgbmVzdGVkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpIHtcbiAgICAgIGlmIChjLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYyA9IG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4oYywgKChuZXN0ZWRJbmRleCB8fCAnJykgKyBcIl9cIiArIGkpKTtcbiAgICAgICAgLy8gbWVyZ2UgYWRqYWNlbnQgdGV4dCBub2Rlc1xuICAgICAgICBpZiAoaXNUZXh0Tm9kZShjWzBdKSAmJiBpc1RleHROb2RlKGxhc3QpKSB7XG4gICAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgKGNbMF0pLnRleHQpO1xuICAgICAgICAgIGMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaC5hcHBseShyZXMsIGMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQcmltaXRpdmUoYykpIHtcbiAgICAgIGlmIChpc1RleHROb2RlKGxhc3QpKSB7XG4gICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIFNTUiBoeWRyYXRpb24gYmVjYXVzZSB0ZXh0IG5vZGVzIGFyZVxuICAgICAgICAvLyBlc3NlbnRpYWxseSBtZXJnZWQgd2hlbiByZW5kZXJlZCB0byBIVE1MIHN0cmluZ3NcbiAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgYyk7XG4gICAgICB9IGVsc2UgaWYgKGMgIT09ICcnKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgcHJpbWl0aXZlIHRvIHZub2RlXG4gICAgICAgIHJlcy5wdXNoKGNyZWF0ZVRleHRWTm9kZShjKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1RleHROb2RlKGMpICYmIGlzVGV4dE5vZGUobGFzdCkpIHtcbiAgICAgICAgLy8gbWVyZ2UgYWRqYWNlbnQgdGV4dCBub2Rlc1xuICAgICAgICByZXNbbGFzdEluZGV4XSA9IGNyZWF0ZVRleHRWTm9kZShsYXN0LnRleHQgKyBjLnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmYXVsdCBrZXkgZm9yIG5lc3RlZCBhcnJheSBjaGlsZHJlbiAobGlrZWx5IGdlbmVyYXRlZCBieSB2LWZvcilcbiAgICAgICAgaWYgKGlzVHJ1ZShjaGlsZHJlbi5faXNWTGlzdCkgJiZcbiAgICAgICAgICBpc0RlZihjLnRhZykgJiZcbiAgICAgICAgICBpc1VuZGVmKGMua2V5KSAmJlxuICAgICAgICAgIGlzRGVmKG5lc3RlZEluZGV4KSkge1xuICAgICAgICAgIGMua2V5ID0gXCJfX3ZsaXN0XCIgKyBuZXN0ZWRJbmRleCArIFwiX1wiICsgaSArIFwiX19cIjtcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFByb3ZpZGUgKHZtKSB7XG4gIHZhciBwcm92aWRlID0gdm0uJG9wdGlvbnMucHJvdmlkZTtcbiAgaWYgKHByb3ZpZGUpIHtcbiAgICB2bS5fcHJvdmlkZWQgPSB0eXBlb2YgcHJvdmlkZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBwcm92aWRlLmNhbGwodm0pXG4gICAgICA6IHByb3ZpZGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdEluamVjdGlvbnMgKHZtKSB7XG4gIHZhciByZXN1bHQgPSByZXNvbHZlSW5qZWN0KHZtLiRvcHRpb25zLmluamVjdCwgdm0pO1xuICBpZiAocmVzdWx0KSB7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKGZhbHNlKTtcbiAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCBrZXksIHJlc3VsdFtrZXldLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIFwiQXZvaWQgbXV0YXRpbmcgYW4gaW5qZWN0ZWQgdmFsdWUgZGlyZWN0bHkgc2luY2UgdGhlIGNoYW5nZXMgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICBcIm92ZXJ3cml0dGVuIHdoZW5ldmVyIHRoZSBwcm92aWRlZCBjb21wb25lbnQgcmUtcmVuZGVycy4gXCIgK1xuICAgICAgICAgICAgXCJpbmplY3Rpb24gYmVpbmcgbXV0YXRlZDogXFxcIlwiICsga2V5ICsgXCJcXFwiXCIsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sIGtleSwgcmVzdWx0W2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRvZ2dsZU9ic2VydmluZyh0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlSW5qZWN0IChpbmplY3QsIHZtKSB7XG4gIGlmIChpbmplY3QpIHtcbiAgICAvLyBpbmplY3QgaXMgOmFueSBiZWNhdXNlIGZsb3cgaXMgbm90IHNtYXJ0IGVub3VnaCB0byBmaWd1cmUgb3V0IGNhY2hlZFxuICAgIHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBrZXlzID0gaGFzU3ltYm9sXG4gICAgICA/IFJlZmxlY3Qub3duS2V5cyhpbmplY3QpXG4gICAgICA6IE9iamVjdC5rZXlzKGluamVjdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgLy8gIzY1NzQgaW4gY2FzZSB0aGUgaW5qZWN0IG9iamVjdCBpcyBvYnNlcnZlZC4uLlxuICAgICAgaWYgKGtleSA9PT0gJ19fb2JfXycpIHsgY29udGludWUgfVxuICAgICAgdmFyIHByb3ZpZGVLZXkgPSBpbmplY3Rba2V5XS5mcm9tO1xuICAgICAgdmFyIHNvdXJjZSA9IHZtO1xuICAgICAgd2hpbGUgKHNvdXJjZSkge1xuICAgICAgICBpZiAoc291cmNlLl9wcm92aWRlZCAmJiBoYXNPd24oc291cmNlLl9wcm92aWRlZCwgcHJvdmlkZUtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHNvdXJjZS5fcHJvdmlkZWRbcHJvdmlkZUtleV07XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2UgPSBzb3VyY2UuJHBhcmVudDtcbiAgICAgIH1cbiAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIGlmICgnZGVmYXVsdCcgaW4gaW5qZWN0W2tleV0pIHtcbiAgICAgICAgICB2YXIgcHJvdmlkZURlZmF1bHQgPSBpbmplY3Rba2V5XS5kZWZhdWx0O1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdHlwZW9mIHByb3ZpZGVEZWZhdWx0ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IHByb3ZpZGVEZWZhdWx0LmNhbGwodm0pXG4gICAgICAgICAgICA6IHByb3ZpZGVEZWZhdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB3YXJuKChcIkluamVjdGlvbiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgbm90IGZvdW5kXCIpLCB2bSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbi8qICAqL1xuXG5cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIHJhdyBjaGlsZHJlbiBWTm9kZXMgaW50byBhIHNsb3Qgb2JqZWN0LlxuICovXG5mdW5jdGlvbiByZXNvbHZlU2xvdHMgKFxuICBjaGlsZHJlbixcbiAgY29udGV4dFxuKSB7XG4gIGlmICghY2hpbGRyZW4gfHwgIWNoaWxkcmVuLmxlbmd0aCkge1xuICAgIHJldHVybiB7fVxuICB9XG4gIHZhciBzbG90cyA9IHt9O1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgIHZhciBkYXRhID0gY2hpbGQuZGF0YTtcbiAgICAvLyByZW1vdmUgc2xvdCBhdHRyaWJ1dGUgaWYgdGhlIG5vZGUgaXMgcmVzb2x2ZWQgYXMgYSBWdWUgc2xvdCBub2RlXG4gICAgaWYgKGRhdGEgJiYgZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLnNsb3QpIHtcbiAgICAgIGRlbGV0ZSBkYXRhLmF0dHJzLnNsb3Q7XG4gICAgfVxuICAgIC8vIG5hbWVkIHNsb3RzIHNob3VsZCBvbmx5IGJlIHJlc3BlY3RlZCBpZiB0aGUgdm5vZGUgd2FzIHJlbmRlcmVkIGluIHRoZVxuICAgIC8vIHNhbWUgY29udGV4dC5cbiAgICBpZiAoKGNoaWxkLmNvbnRleHQgPT09IGNvbnRleHQgfHwgY2hpbGQuZm5Db250ZXh0ID09PSBjb250ZXh0KSAmJlxuICAgICAgZGF0YSAmJiBkYXRhLnNsb3QgIT0gbnVsbFxuICAgICkge1xuICAgICAgdmFyIG5hbWUgPSBkYXRhLnNsb3Q7XG4gICAgICB2YXIgc2xvdCA9IChzbG90c1tuYW1lXSB8fCAoc2xvdHNbbmFtZV0gPSBbXSkpO1xuICAgICAgaWYgKGNoaWxkLnRhZyA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgICBzbG90LnB1c2guYXBwbHkoc2xvdCwgY2hpbGQuY2hpbGRyZW4gfHwgW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xvdC5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZml4ZWQgYnkgeHh4eHh4IOS4tOaXtiBoYWNrIOaOiSB1bmktYXBwIOS4reeahOW8guatpSBuYW1lIHNsb3QgcGFnZVxuICAgICAgaWYoY2hpbGQuYXN5bmNNZXRhICYmIGNoaWxkLmFzeW5jTWV0YS5kYXRhICYmIGNoaWxkLmFzeW5jTWV0YS5kYXRhLnNsb3QgPT09ICdwYWdlJyl7XG4gICAgICAgIChzbG90c1sncGFnZSddIHx8IChzbG90c1sncGFnZSddID0gW10pKS5wdXNoKGNoaWxkKTtcbiAgICAgIH1lbHNle1xuICAgICAgICAoc2xvdHMuZGVmYXVsdCB8fCAoc2xvdHMuZGVmYXVsdCA9IFtdKSkucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGlnbm9yZSBzbG90cyB0aGF0IGNvbnRhaW5zIG9ubHkgd2hpdGVzcGFjZVxuICBmb3IgKHZhciBuYW1lJDEgaW4gc2xvdHMpIHtcbiAgICBpZiAoc2xvdHNbbmFtZSQxXS5ldmVyeShpc1doaXRlc3BhY2UpKSB7XG4gICAgICBkZWxldGUgc2xvdHNbbmFtZSQxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNsb3RzXG59XG5cbmZ1bmN0aW9uIGlzV2hpdGVzcGFjZSAobm9kZSkge1xuICByZXR1cm4gKG5vZGUuaXNDb21tZW50ICYmICFub2RlLmFzeW5jRmFjdG9yeSkgfHwgbm9kZS50ZXh0ID09PSAnICdcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNjb3BlZFNsb3RzIChcbiAgc2xvdHMsXG4gIG5vcm1hbFNsb3RzLFxuICBwcmV2U2xvdHNcbikge1xuICB2YXIgcmVzO1xuICB2YXIgaGFzTm9ybWFsU2xvdHMgPSBPYmplY3Qua2V5cyhub3JtYWxTbG90cykubGVuZ3RoID4gMDtcbiAgdmFyIGlzU3RhYmxlID0gc2xvdHMgPyAhIXNsb3RzLiRzdGFibGUgOiAhaGFzTm9ybWFsU2xvdHM7XG4gIHZhciBrZXkgPSBzbG90cyAmJiBzbG90cy4ka2V5O1xuICBpZiAoIXNsb3RzKSB7XG4gICAgcmVzID0ge307XG4gIH0gZWxzZSBpZiAoc2xvdHMuX25vcm1hbGl6ZWQpIHtcbiAgICAvLyBmYXN0IHBhdGggMTogY2hpbGQgY29tcG9uZW50IHJlLXJlbmRlciBvbmx5LCBwYXJlbnQgZGlkIG5vdCBjaGFuZ2VcbiAgICByZXR1cm4gc2xvdHMuX25vcm1hbGl6ZWRcbiAgfSBlbHNlIGlmIChcbiAgICBpc1N0YWJsZSAmJlxuICAgIHByZXZTbG90cyAmJlxuICAgIHByZXZTbG90cyAhPT0gZW1wdHlPYmplY3QgJiZcbiAgICBrZXkgPT09IHByZXZTbG90cy4ka2V5ICYmXG4gICAgIWhhc05vcm1hbFNsb3RzICYmXG4gICAgIXByZXZTbG90cy4kaGFzTm9ybWFsXG4gICkge1xuICAgIC8vIGZhc3QgcGF0aCAyOiBzdGFibGUgc2NvcGVkIHNsb3RzIHcvIG5vIG5vcm1hbCBzbG90cyB0byBwcm94eSxcbiAgICAvLyBvbmx5IG5lZWQgdG8gbm9ybWFsaXplIG9uY2VcbiAgICByZXR1cm4gcHJldlNsb3RzXG4gIH0gZWxzZSB7XG4gICAgcmVzID0ge307XG4gICAgZm9yICh2YXIga2V5JDEgaW4gc2xvdHMpIHtcbiAgICAgIGlmIChzbG90c1trZXkkMV0gJiYga2V5JDFbMF0gIT09ICckJykge1xuICAgICAgICByZXNba2V5JDFdID0gbm9ybWFsaXplU2NvcGVkU2xvdChub3JtYWxTbG90cywga2V5JDEsIHNsb3RzW2tleSQxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGV4cG9zZSBub3JtYWwgc2xvdHMgb24gc2NvcGVkU2xvdHNcbiAgZm9yICh2YXIga2V5JDIgaW4gbm9ybWFsU2xvdHMpIHtcbiAgICBpZiAoIShrZXkkMiBpbiByZXMpKSB7XG4gICAgICByZXNba2V5JDJdID0gcHJveHlOb3JtYWxTbG90KG5vcm1hbFNsb3RzLCBrZXkkMik7XG4gICAgfVxuICB9XG4gIC8vIGF2b3JpYXogc2VlbXMgdG8gbW9jayBhIG5vbi1leHRlbnNpYmxlICRzY29wZWRTbG90cyBvYmplY3RcbiAgLy8gYW5kIHdoZW4gdGhhdCBpcyBwYXNzZWQgZG93biB0aGlzIHdvdWxkIGNhdXNlIGFuIGVycm9yXG4gIGlmIChzbG90cyAmJiBPYmplY3QuaXNFeHRlbnNpYmxlKHNsb3RzKSkge1xuICAgIChzbG90cykuX25vcm1hbGl6ZWQgPSByZXM7XG4gIH1cbiAgZGVmKHJlcywgJyRzdGFibGUnLCBpc1N0YWJsZSk7XG4gIGRlZihyZXMsICcka2V5Jywga2V5KTtcbiAgZGVmKHJlcywgJyRoYXNOb3JtYWwnLCBoYXNOb3JtYWxTbG90cyk7XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplU2NvcGVkU2xvdChub3JtYWxTbG90cywga2V5LCBmbikge1xuICB2YXIgbm9ybWFsaXplZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzID0gYXJndW1lbnRzLmxlbmd0aCA/IGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgOiBmbih7fSk7XG4gICAgcmVzID0gcmVzICYmIHR5cGVvZiByZXMgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHJlcylcbiAgICAgID8gW3Jlc10gLy8gc2luZ2xlIHZub2RlXG4gICAgICA6IG5vcm1hbGl6ZUNoaWxkcmVuKHJlcyk7XG4gICAgcmV0dXJuIHJlcyAmJiAoXG4gICAgICByZXMubGVuZ3RoID09PSAwIHx8XG4gICAgICAocmVzLmxlbmd0aCA9PT0gMSAmJiByZXNbMF0uaXNDb21tZW50KSAvLyAjOTY1OFxuICAgICkgPyB1bmRlZmluZWRcbiAgICAgIDogcmVzXG4gIH07XG4gIC8vIHRoaXMgaXMgYSBzbG90IHVzaW5nIHRoZSBuZXcgdi1zbG90IHN5bnRheCB3aXRob3V0IHNjb3BlLiBhbHRob3VnaCBpdCBpc1xuICAvLyBjb21waWxlZCBhcyBhIHNjb3BlZCBzbG90LCByZW5kZXIgZm4gdXNlcnMgd291bGQgZXhwZWN0IGl0IHRvIGJlIHByZXNlbnRcbiAgLy8gb24gdGhpcy4kc2xvdHMgYmVjYXVzZSB0aGUgdXNhZ2UgaXMgc2VtYW50aWNhbGx5IGEgbm9ybWFsIHNsb3QuXG4gIGlmIChmbi5wcm94eSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShub3JtYWxTbG90cywga2V5LCB7XG4gICAgICBnZXQ6IG5vcm1hbGl6ZWQsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWRcbn1cblxuZnVuY3Rpb24gcHJveHlOb3JtYWxTbG90KHNsb3RzLCBrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNsb3RzW2tleV07IH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyB2LWZvciBsaXN0cy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyTGlzdCAoXG4gIHZhbCxcbiAgcmVuZGVyXG4pIHtcbiAgdmFyIHJldCwgaSwgbCwga2V5cywga2V5O1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0ID0gbmV3IEFycmF5KHZhbC5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICByZXRbaV0gPSByZW5kZXIodmFsW2ldLCBpLCBpLCBpKTsgLy8gZml4ZWQgYnkgeHh4eHh4XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgcmV0ID0gbmV3IEFycmF5KHZhbCk7XG4gICAgZm9yIChpID0gMDsgaSA8IHZhbDsgaSsrKSB7XG4gICAgICByZXRbaV0gPSByZW5kZXIoaSArIDEsIGksIGksIGkpOyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgIGlmIChoYXNTeW1ib2wgJiYgdmFsW1N5bWJvbC5pdGVyYXRvcl0pIHtcbiAgICAgIHJldCA9IFtdO1xuICAgICAgdmFyIGl0ZXJhdG9yID0gdmFsW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgIHZhciByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICB3aGlsZSAoIXJlc3VsdC5kb25lKSB7XG4gICAgICAgIHJldC5wdXNoKHJlbmRlcihyZXN1bHQudmFsdWUsIHJldC5sZW5ndGgsIGksIGkrKykpOyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICAgICAgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgIHJldCA9IG5ldyBBcnJheShrZXlzLmxlbmd0aCk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgcmV0W2ldID0gcmVuZGVyKHZhbFtrZXldLCBrZXksIGksIGkpOyAvLyBmaXhlZCBieSB4eHh4eHhcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKCFpc0RlZihyZXQpKSB7XG4gICAgcmV0ID0gW107XG4gIH1cbiAgKHJldCkuX2lzVkxpc3QgPSB0cnVlO1xuICByZXR1cm4gcmV0XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgPHNsb3Q+XG4gKi9cbmZ1bmN0aW9uIHJlbmRlclNsb3QgKFxuICBuYW1lLFxuICBmYWxsYmFjayxcbiAgcHJvcHMsXG4gIGJpbmRPYmplY3Rcbikge1xuICB2YXIgc2NvcGVkU2xvdEZuID0gdGhpcy4kc2NvcGVkU2xvdHNbbmFtZV07XG4gIHZhciBub2RlcztcbiAgaWYgKHNjb3BlZFNsb3RGbikgeyAvLyBzY29wZWQgc2xvdFxuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgaWYgKGJpbmRPYmplY3QpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFpc09iamVjdChiaW5kT2JqZWN0KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdzbG90IHYtYmluZCB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0JyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBwcm9wcyA9IGV4dGVuZChleHRlbmQoe30sIGJpbmRPYmplY3QpLCBwcm9wcyk7XG4gICAgfVxuICAgIC8vIGZpeGVkIGJ5IHh4eHh4eCBhcHAtcGx1cyBzY29wZWRTbG90XG4gICAgbm9kZXMgPSBzY29wZWRTbG90Rm4ocHJvcHMsIHRoaXMsIHByb3BzLl9pKSB8fCBmYWxsYmFjaztcbiAgfSBlbHNlIHtcbiAgICBub2RlcyA9IHRoaXMuJHNsb3RzW25hbWVdIHx8IGZhbGxiYWNrO1xuICB9XG5cbiAgdmFyIHRhcmdldCA9IHByb3BzICYmIHByb3BzLnNsb3Q7XG4gIGlmICh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnLCB7IHNsb3Q6IHRhcmdldCB9LCBub2RlcylcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbm9kZXNcbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIGZpbHRlcnNcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUZpbHRlciAoaWQpIHtcbiAgcmV0dXJuIHJlc29sdmVBc3NldCh0aGlzLiRvcHRpb25zLCAnZmlsdGVycycsIGlkLCB0cnVlKSB8fCBpZGVudGl0eVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaXNLZXlOb3RNYXRjaCAoZXhwZWN0LCBhY3R1YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZWN0KSkge1xuICAgIHJldHVybiBleHBlY3QuaW5kZXhPZihhY3R1YWwpID09PSAtMVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBleHBlY3QgIT09IGFjdHVhbFxuICB9XG59XG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIGNoZWNraW5nIGtleUNvZGVzIGZyb20gY29uZmlnLlxuICogZXhwb3NlZCBhcyBWdWUucHJvdG90eXBlLl9rXG4gKiBwYXNzaW5nIGluIGV2ZW50S2V5TmFtZSBhcyBsYXN0IGFyZ3VtZW50IHNlcGFyYXRlbHkgZm9yIGJhY2t3YXJkcyBjb21wYXRcbiAqL1xuZnVuY3Rpb24gY2hlY2tLZXlDb2RlcyAoXG4gIGV2ZW50S2V5Q29kZSxcbiAga2V5LFxuICBidWlsdEluS2V5Q29kZSxcbiAgZXZlbnRLZXlOYW1lLFxuICBidWlsdEluS2V5TmFtZVxuKSB7XG4gIHZhciBtYXBwZWRLZXlDb2RlID0gY29uZmlnLmtleUNvZGVzW2tleV0gfHwgYnVpbHRJbktleUNvZGU7XG4gIGlmIChidWlsdEluS2V5TmFtZSAmJiBldmVudEtleU5hbWUgJiYgIWNvbmZpZy5rZXlDb2Rlc1trZXldKSB7XG4gICAgcmV0dXJuIGlzS2V5Tm90TWF0Y2goYnVpbHRJbktleU5hbWUsIGV2ZW50S2V5TmFtZSlcbiAgfSBlbHNlIGlmIChtYXBwZWRLZXlDb2RlKSB7XG4gICAgcmV0dXJuIGlzS2V5Tm90TWF0Y2gobWFwcGVkS2V5Q29kZSwgZXZlbnRLZXlDb2RlKVxuICB9IGVsc2UgaWYgKGV2ZW50S2V5TmFtZSkge1xuICAgIHJldHVybiBoeXBoZW5hdGUoZXZlbnRLZXlOYW1lKSAhPT0ga2V5XG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIG1lcmdpbmcgdi1iaW5kPVwib2JqZWN0XCIgaW50byBhIFZOb2RlJ3MgZGF0YS5cbiAqL1xuZnVuY3Rpb24gYmluZE9iamVjdFByb3BzIChcbiAgZGF0YSxcbiAgdGFnLFxuICB2YWx1ZSxcbiAgYXNQcm9wLFxuICBpc1N5bmNcbikge1xuICBpZiAodmFsdWUpIHtcbiAgICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAndi1iaW5kIHdpdGhvdXQgYXJndW1lbnQgZXhwZWN0cyBhbiBPYmplY3Qgb3IgQXJyYXkgdmFsdWUnLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB0b09iamVjdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgaGFzaDtcbiAgICAgIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBrZXkgPT09ICdjbGFzcycgfHxcbiAgICAgICAgICBrZXkgPT09ICdzdHlsZScgfHxcbiAgICAgICAgICBpc1Jlc2VydmVkQXR0cmlidXRlKGtleSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGFzaCA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHR5cGUgPSBkYXRhLmF0dHJzICYmIGRhdGEuYXR0cnMudHlwZTtcbiAgICAgICAgICBoYXNoID0gYXNQcm9wIHx8IGNvbmZpZy5tdXN0VXNlUHJvcCh0YWcsIHR5cGUsIGtleSlcbiAgICAgICAgICAgID8gZGF0YS5kb21Qcm9wcyB8fCAoZGF0YS5kb21Qcm9wcyA9IHt9KVxuICAgICAgICAgICAgOiBkYXRhLmF0dHJzIHx8IChkYXRhLmF0dHJzID0ge30pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW1lbGl6ZWRLZXkgPSBjYW1lbGl6ZShrZXkpO1xuICAgICAgICB2YXIgaHlwaGVuYXRlZEtleSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgICBpZiAoIShjYW1lbGl6ZWRLZXkgaW4gaGFzaCkgJiYgIShoeXBoZW5hdGVkS2V5IGluIGhhc2gpKSB7XG4gICAgICAgICAgaGFzaFtrZXldID0gdmFsdWVba2V5XTtcblxuICAgICAgICAgIGlmIChpc1N5bmMpIHtcbiAgICAgICAgICAgIHZhciBvbiA9IGRhdGEub24gfHwgKGRhdGEub24gPSB7fSk7XG4gICAgICAgICAgICBvblsoXCJ1cGRhdGU6XCIgKyBrZXkpXSA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmFsdWVba2V5XSA9ICRldmVudDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIGxvb3AoIGtleSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0YVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIHN0YXRpYyB0cmVlcy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyU3RhdGljIChcbiAgaW5kZXgsXG4gIGlzSW5Gb3Jcbikge1xuICB2YXIgY2FjaGVkID0gdGhpcy5fc3RhdGljVHJlZXMgfHwgKHRoaXMuX3N0YXRpY1RyZWVzID0gW10pO1xuICB2YXIgdHJlZSA9IGNhY2hlZFtpbmRleF07XG4gIC8vIGlmIGhhcyBhbHJlYWR5LXJlbmRlcmVkIHN0YXRpYyB0cmVlIGFuZCBub3QgaW5zaWRlIHYtZm9yLFxuICAvLyB3ZSBjYW4gcmV1c2UgdGhlIHNhbWUgdHJlZS5cbiAgaWYgKHRyZWUgJiYgIWlzSW5Gb3IpIHtcbiAgICByZXR1cm4gdHJlZVxuICB9XG4gIC8vIG90aGVyd2lzZSwgcmVuZGVyIGEgZnJlc2ggdHJlZS5cbiAgdHJlZSA9IGNhY2hlZFtpbmRleF0gPSB0aGlzLiRvcHRpb25zLnN0YXRpY1JlbmRlckZuc1tpbmRleF0uY2FsbChcbiAgICB0aGlzLl9yZW5kZXJQcm94eSxcbiAgICBudWxsLFxuICAgIHRoaXMgLy8gZm9yIHJlbmRlciBmbnMgZ2VuZXJhdGVkIGZvciBmdW5jdGlvbmFsIGNvbXBvbmVudCB0ZW1wbGF0ZXNcbiAgKTtcbiAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX3N0YXRpY19fXCIgKyBpbmRleCksIGZhbHNlKTtcbiAgcmV0dXJuIHRyZWVcbn1cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3Igdi1vbmNlLlxuICogRWZmZWN0aXZlbHkgaXQgbWVhbnMgbWFya2luZyB0aGUgbm9kZSBhcyBzdGF0aWMgd2l0aCBhIHVuaXF1ZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIG1hcmtPbmNlIChcbiAgdHJlZSxcbiAgaW5kZXgsXG4gIGtleVxuKSB7XG4gIG1hcmtTdGF0aWModHJlZSwgKFwiX19vbmNlX19cIiArIGluZGV4ICsgKGtleSA/IChcIl9cIiArIGtleSkgOiBcIlwiKSksIHRydWUpO1xuICByZXR1cm4gdHJlZVxufVxuXG5mdW5jdGlvbiBtYXJrU3RhdGljIChcbiAgdHJlZSxcbiAga2V5LFxuICBpc09uY2Vcbikge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRyZWVbaV0gJiYgdHlwZW9mIHRyZWVbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1hcmtTdGF0aWNOb2RlKHRyZWVbaV0sIChrZXkgKyBcIl9cIiArIGkpLCBpc09uY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtYXJrU3RhdGljTm9kZSh0cmVlLCBrZXksIGlzT25jZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFya1N0YXRpY05vZGUgKG5vZGUsIGtleSwgaXNPbmNlKSB7XG4gIG5vZGUuaXNTdGF0aWMgPSB0cnVlO1xuICBub2RlLmtleSA9IGtleTtcbiAgbm9kZS5pc09uY2UgPSBpc09uY2U7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBiaW5kT2JqZWN0TGlzdGVuZXJzIChkYXRhLCB2YWx1ZSkge1xuICBpZiAodmFsdWUpIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgICd2LW9uIHdpdGhvdXQgYXJndW1lbnQgZXhwZWN0cyBhbiBPYmplY3QgdmFsdWUnLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb24gPSBkYXRhLm9uID0gZGF0YS5vbiA/IGV4dGVuZCh7fSwgZGF0YS5vbikgOiB7fTtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSBvbltrZXldO1xuICAgICAgICB2YXIgb3VycyA9IHZhbHVlW2tleV07XG4gICAgICAgIG9uW2tleV0gPSBleGlzdGluZyA/IFtdLmNvbmNhdChleGlzdGluZywgb3VycykgOiBvdXJzO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0YVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gcmVzb2x2ZVNjb3BlZFNsb3RzIChcbiAgZm5zLCAvLyBzZWUgZmxvdy92bm9kZVxuICByZXMsXG4gIC8vIHRoZSBmb2xsb3dpbmcgYXJlIGFkZGVkIGluIDIuNlxuICBoYXNEeW5hbWljS2V5cyxcbiAgY29udGVudEhhc2hLZXlcbikge1xuICByZXMgPSByZXMgfHwgeyAkc3RhYmxlOiAhaGFzRHluYW1pY0tleXMgfTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc2xvdCA9IGZuc1tpXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzbG90KSkge1xuICAgICAgcmVzb2x2ZVNjb3BlZFNsb3RzKHNsb3QsIHJlcywgaGFzRHluYW1pY0tleXMpO1xuICAgIH0gZWxzZSBpZiAoc2xvdCkge1xuICAgICAgLy8gbWFya2VyIGZvciByZXZlcnNlIHByb3h5aW5nIHYtc2xvdCB3aXRob3V0IHNjb3BlIG9uIHRoaXMuJHNsb3RzXG4gICAgICBpZiAoc2xvdC5wcm94eSkge1xuICAgICAgICBzbG90LmZuLnByb3h5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJlc1tzbG90LmtleV0gPSBzbG90LmZuO1xuICAgIH1cbiAgfVxuICBpZiAoY29udGVudEhhc2hLZXkpIHtcbiAgICAocmVzKS4ka2V5ID0gY29udGVudEhhc2hLZXk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gYmluZER5bmFtaWNLZXlzIChiYXNlT2JqLCB2YWx1ZXMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIga2V5ID0gdmFsdWVzW2ldO1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkpIHtcbiAgICAgIGJhc2VPYmpbdmFsdWVzW2ldXSA9IHZhbHVlc1tpICsgMV07XG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGtleSAhPT0gJycgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICAvLyBudWxsIGlzIGEgc3BlY2lhbCB2YWx1ZSBmb3IgZXhwbGljaXRseSByZW1vdmluZyBhIGJpbmRpbmdcbiAgICAgIHdhcm4oXG4gICAgICAgIChcIkludmFsaWQgdmFsdWUgZm9yIGR5bmFtaWMgZGlyZWN0aXZlIGFyZ3VtZW50IChleHBlY3RlZCBzdHJpbmcgb3IgbnVsbCk6IFwiICsga2V5KSxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJhc2VPYmpcbn1cblxuLy8gaGVscGVyIHRvIGR5bmFtaWNhbGx5IGFwcGVuZCBtb2RpZmllciBydW50aW1lIG1hcmtlcnMgdG8gZXZlbnQgbmFtZXMuXG4vLyBlbnN1cmUgb25seSBhcHBlbmQgd2hlbiB2YWx1ZSBpcyBhbHJlYWR5IHN0cmluZywgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgY2FzdFxuLy8gdG8gc3RyaW5nIGFuZCBjYXVzZSB0aGUgdHlwZSBjaGVjayB0byBtaXNzLlxuZnVuY3Rpb24gcHJlcGVuZE1vZGlmaWVyICh2YWx1ZSwgc3ltYm9sKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gc3ltYm9sICsgdmFsdWUgOiB2YWx1ZVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5zdGFsbFJlbmRlckhlbHBlcnMgKHRhcmdldCkge1xuICB0YXJnZXQuX28gPSBtYXJrT25jZTtcbiAgdGFyZ2V0Ll9uID0gdG9OdW1iZXI7XG4gIHRhcmdldC5fcyA9IHRvU3RyaW5nO1xuICB0YXJnZXQuX2wgPSByZW5kZXJMaXN0O1xuICB0YXJnZXQuX3QgPSByZW5kZXJTbG90O1xuICB0YXJnZXQuX3EgPSBsb29zZUVxdWFsO1xuICB0YXJnZXQuX2kgPSBsb29zZUluZGV4T2Y7XG4gIHRhcmdldC5fbSA9IHJlbmRlclN0YXRpYztcbiAgdGFyZ2V0Ll9mID0gcmVzb2x2ZUZpbHRlcjtcbiAgdGFyZ2V0Ll9rID0gY2hlY2tLZXlDb2RlcztcbiAgdGFyZ2V0Ll9iID0gYmluZE9iamVjdFByb3BzO1xuICB0YXJnZXQuX3YgPSBjcmVhdGVUZXh0Vk5vZGU7XG4gIHRhcmdldC5fZSA9IGNyZWF0ZUVtcHR5Vk5vZGU7XG4gIHRhcmdldC5fdSA9IHJlc29sdmVTY29wZWRTbG90cztcbiAgdGFyZ2V0Ll9nID0gYmluZE9iamVjdExpc3RlbmVycztcbiAgdGFyZ2V0Ll9kID0gYmluZER5bmFtaWNLZXlzO1xuICB0YXJnZXQuX3AgPSBwcmVwZW5kTW9kaWZpZXI7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCAoXG4gIGRhdGEsXG4gIHByb3BzLFxuICBjaGlsZHJlbixcbiAgcGFyZW50LFxuICBDdG9yXG4pIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gIC8vIGVuc3VyZSB0aGUgY3JlYXRlRWxlbWVudCBmdW5jdGlvbiBpbiBmdW5jdGlvbmFsIGNvbXBvbmVudHNcbiAgLy8gZ2V0cyBhIHVuaXF1ZSBjb250ZXh0IC0gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIGNvcnJlY3QgbmFtZWQgc2xvdCBjaGVja1xuICB2YXIgY29udGV4dFZtO1xuICBpZiAoaGFzT3duKHBhcmVudCwgJ191aWQnKSkge1xuICAgIGNvbnRleHRWbSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICBjb250ZXh0Vm0uX29yaWdpbmFsID0gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIC8vIHRoZSBjb250ZXh0IHZtIHBhc3NlZCBpbiBpcyBhIGZ1bmN0aW9uYWwgY29udGV4dCBhcyB3ZWxsLlxuICAgIC8vIGluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSBhcmUgYWJsZSB0byBnZXQgYSBob2xkIHRvIHRoZVxuICAgIC8vIHJlYWwgY29udGV4dCBpbnN0YW5jZS5cbiAgICBjb250ZXh0Vm0gPSBwYXJlbnQ7XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgcGFyZW50ID0gcGFyZW50Ll9vcmlnaW5hbDtcbiAgfVxuICB2YXIgaXNDb21waWxlZCA9IGlzVHJ1ZShvcHRpb25zLl9jb21waWxlZCk7XG4gIHZhciBuZWVkTm9ybWFsaXphdGlvbiA9ICFpc0NvbXBpbGVkO1xuXG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5saXN0ZW5lcnMgPSBkYXRhLm9uIHx8IGVtcHR5T2JqZWN0O1xuICB0aGlzLmluamVjdGlvbnMgPSByZXNvbHZlSW5qZWN0KG9wdGlvbnMuaW5qZWN0LCBwYXJlbnQpO1xuICB0aGlzLnNsb3RzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcyQxLiRzbG90cykge1xuICAgICAgbm9ybWFsaXplU2NvcGVkU2xvdHMoXG4gICAgICAgIGRhdGEuc2NvcGVkU2xvdHMsXG4gICAgICAgIHRoaXMkMS4kc2xvdHMgPSByZXNvbHZlU2xvdHMoY2hpbGRyZW4sIHBhcmVudClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzJDEuJHNsb3RzXG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzY29wZWRTbG90cycsICh7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCAoKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplU2NvcGVkU2xvdHMoZGF0YS5zY29wZWRTbG90cywgdGhpcy5zbG90cygpKVxuICAgIH1cbiAgfSkpO1xuXG4gIC8vIHN1cHBvcnQgZm9yIGNvbXBpbGVkIGZ1bmN0aW9uYWwgdGVtcGxhdGVcbiAgaWYgKGlzQ29tcGlsZWQpIHtcbiAgICAvLyBleHBvc2luZyAkb3B0aW9ucyBmb3IgcmVuZGVyU3RhdGljKClcbiAgICB0aGlzLiRvcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyBwcmUtcmVzb2x2ZSBzbG90cyBmb3IgcmVuZGVyU2xvdCgpXG4gICAgdGhpcy4kc2xvdHMgPSB0aGlzLnNsb3RzKCk7XG4gICAgdGhpcy4kc2NvcGVkU2xvdHMgPSBub3JtYWxpemVTY29wZWRTbG90cyhkYXRhLnNjb3BlZFNsb3RzLCB0aGlzLiRzbG90cyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5fc2NvcGVJZCkge1xuICAgIHRoaXMuX2MgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xuICAgICAgdmFyIHZub2RlID0gY3JlYXRlRWxlbWVudChjb250ZXh0Vm0sIGEsIGIsIGMsIGQsIG5lZWROb3JtYWxpemF0aW9uKTtcbiAgICAgIGlmICh2bm9kZSAmJiAhQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgdm5vZGUuZm5TY29wZUlkID0gb3B0aW9ucy5fc2NvcGVJZDtcbiAgICAgICAgdm5vZGUuZm5Db250ZXh0ID0gcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZub2RlXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoY29udGV4dFZtLCBhLCBiLCBjLCBkLCBuZWVkTm9ybWFsaXphdGlvbik7IH07XG4gIH1cbn1cblxuaW5zdGFsbFJlbmRlckhlbHBlcnMoRnVuY3Rpb25hbFJlbmRlckNvbnRleHQucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudCAoXG4gIEN0b3IsXG4gIHByb3BzRGF0YSxcbiAgZGF0YSxcbiAgY29udGV4dFZtLFxuICBjaGlsZHJlblxuKSB7XG4gIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xuICB2YXIgcHJvcHMgPSB7fTtcbiAgdmFyIHByb3BPcHRpb25zID0gb3B0aW9ucy5wcm9wcztcbiAgaWYgKGlzRGVmKHByb3BPcHRpb25zKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9wT3B0aW9ucykge1xuICAgICAgcHJvcHNba2V5XSA9IHZhbGlkYXRlUHJvcChrZXksIHByb3BPcHRpb25zLCBwcm9wc0RhdGEgfHwgZW1wdHlPYmplY3QpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNEZWYoZGF0YS5hdHRycykpIHsgbWVyZ2VQcm9wcyhwcm9wcywgZGF0YS5hdHRycyk7IH1cbiAgICBpZiAoaXNEZWYoZGF0YS5wcm9wcykpIHsgbWVyZ2VQcm9wcyhwcm9wcywgZGF0YS5wcm9wcyk7IH1cbiAgfVxuXG4gIHZhciByZW5kZXJDb250ZXh0ID0gbmV3IEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0KFxuICAgIGRhdGEsXG4gICAgcHJvcHMsXG4gICAgY2hpbGRyZW4sXG4gICAgY29udGV4dFZtLFxuICAgIEN0b3JcbiAgKTtcblxuICB2YXIgdm5vZGUgPSBvcHRpb25zLnJlbmRlci5jYWxsKG51bGwsIHJlbmRlckNvbnRleHQuX2MsIHJlbmRlckNvbnRleHQpO1xuXG4gIGlmICh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgcmV0dXJuIGNsb25lQW5kTWFya0Z1bmN0aW9uYWxSZXN1bHQodm5vZGUsIGRhdGEsIHJlbmRlckNvbnRleHQucGFyZW50LCBvcHRpb25zLCByZW5kZXJDb250ZXh0KVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgdmFyIHZub2RlcyA9IG5vcm1hbGl6ZUNoaWxkcmVuKHZub2RlKSB8fCBbXTtcbiAgICB2YXIgcmVzID0gbmV3IEFycmF5KHZub2Rlcy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSBjbG9uZUFuZE1hcmtGdW5jdGlvbmFsUmVzdWx0KHZub2Rlc1tpXSwgZGF0YSwgcmVuZGVyQ29udGV4dC5wYXJlbnQsIG9wdGlvbnMsIHJlbmRlckNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvbmVBbmRNYXJrRnVuY3Rpb25hbFJlc3VsdCAodm5vZGUsIGRhdGEsIGNvbnRleHRWbSwgb3B0aW9ucywgcmVuZGVyQ29udGV4dCkge1xuICAvLyAjNzgxNyBjbG9uZSBub2RlIGJlZm9yZSBzZXR0aW5nIGZuQ29udGV4dCwgb3RoZXJ3aXNlIGlmIHRoZSBub2RlIGlzIHJldXNlZFxuICAvLyAoZS5nLiBpdCB3YXMgZnJvbSBhIGNhY2hlZCBub3JtYWwgc2xvdCkgdGhlIGZuQ29udGV4dCBjYXVzZXMgbmFtZWQgc2xvdHNcbiAgLy8gdGhhdCBzaG91bGQgbm90IGJlIG1hdGNoZWQgdG8gbWF0Y2guXG4gIHZhciBjbG9uZSA9IGNsb25lVk5vZGUodm5vZGUpO1xuICBjbG9uZS5mbkNvbnRleHQgPSBjb250ZXh0Vm07XG4gIGNsb25lLmZuT3B0aW9ucyA9IG9wdGlvbnM7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgKGNsb25lLmRldnRvb2xzTWV0YSA9IGNsb25lLmRldnRvb2xzTWV0YSB8fCB7fSkucmVuZGVyQ29udGV4dCA9IHJlbmRlckNvbnRleHQ7XG4gIH1cbiAgaWYgKGRhdGEuc2xvdCkge1xuICAgIChjbG9uZS5kYXRhIHx8IChjbG9uZS5kYXRhID0ge30pKS5zbG90ID0gZGF0YS5zbG90O1xuICB9XG4gIHJldHVybiBjbG9uZVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzICh0bywgZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgIHRvW2NhbWVsaXplKGtleSldID0gZnJvbVtrZXldO1xuICB9XG59XG5cbi8qICAqL1xuXG4vKiAgKi9cblxuLyogICovXG5cbi8qICAqL1xuXG4vLyBpbmxpbmUgaG9va3MgdG8gYmUgaW52b2tlZCBvbiBjb21wb25lbnQgVk5vZGVzIGR1cmluZyBwYXRjaFxudmFyIGNvbXBvbmVudFZOb2RlSG9va3MgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQgKHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICBpZiAoXG4gICAgICB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSAmJlxuICAgICAgIXZub2RlLmNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCAmJlxuICAgICAgdm5vZGUuZGF0YS5rZWVwQWxpdmVcbiAgICApIHtcbiAgICAgIC8vIGtlcHQtYWxpdmUgY29tcG9uZW50cywgdHJlYXQgYXMgYSBwYXRjaFxuICAgICAgdmFyIG1vdW50ZWROb2RlID0gdm5vZGU7IC8vIHdvcmsgYXJvdW5kIGZsb3dcbiAgICAgIGNvbXBvbmVudFZOb2RlSG9va3MucHJlcGF0Y2gobW91bnRlZE5vZGUsIG1vdW50ZWROb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNoaWxkID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlKFxuICAgICAgICB2bm9kZSxcbiAgICAgICAgYWN0aXZlSW5zdGFuY2VcbiAgICAgICk7XG4gICAgICBjaGlsZC4kbW91bnQoaHlkcmF0aW5nID8gdm5vZGUuZWxtIDogdW5kZWZpbmVkLCBoeWRyYXRpbmcpO1xuICAgIH1cbiAgfSxcblxuICBwcmVwYXRjaDogZnVuY3Rpb24gcHJlcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBvcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IG9sZFZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgIHVwZGF0ZUNoaWxkQ29tcG9uZW50KFxuICAgICAgY2hpbGQsXG4gICAgICBvcHRpb25zLnByb3BzRGF0YSwgLy8gdXBkYXRlZCBwcm9wc1xuICAgICAgb3B0aW9ucy5saXN0ZW5lcnMsIC8vIHVwZGF0ZWQgbGlzdGVuZXJzXG4gICAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxuICAgICAgb3B0aW9ucy5jaGlsZHJlbiAvLyBuZXcgY2hpbGRyZW5cbiAgICApO1xuICB9LFxuXG4gIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0ICh2bm9kZSkge1xuICAgIHZhciBjb250ZXh0ID0gdm5vZGUuY29udGV4dDtcbiAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICBpZiAoIWNvbXBvbmVudEluc3RhbmNlLl9pc01vdW50ZWQpIHtcbiAgICAgIGNhbGxIb29rKGNvbXBvbmVudEluc3RhbmNlLCAnb25TZXJ2aWNlQ3JlYXRlZCcpO1xuICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdvblNlcnZpY2VBdHRhY2hlZCcpO1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuX2lzTW91bnRlZCA9IHRydWU7XG4gICAgICBjYWxsSG9vayhjb21wb25lbnRJbnN0YW5jZSwgJ21vdW50ZWQnKTtcbiAgICB9XG4gICAgaWYgKHZub2RlLmRhdGEua2VlcEFsaXZlKSB7XG4gICAgICBpZiAoY29udGV4dC5faXNNb3VudGVkKSB7XG4gICAgICAgIC8vIHZ1ZS1yb3V0ZXIjMTIxMlxuICAgICAgICAvLyBEdXJpbmcgdXBkYXRlcywgYSBrZXB0LWFsaXZlIGNvbXBvbmVudCdzIGNoaWxkIGNvbXBvbmVudHMgbWF5XG4gICAgICAgIC8vIGNoYW5nZSwgc28gZGlyZWN0bHkgd2Fsa2luZyB0aGUgdHJlZSBoZXJlIG1heSBjYWxsIGFjdGl2YXRlZCBob29rc1xuICAgICAgICAvLyBvbiBpbmNvcnJlY3QgY2hpbGRyZW4uIEluc3RlYWQgd2UgcHVzaCB0aGVtIGludG8gYSBxdWV1ZSB3aGljaCB3aWxsXG4gICAgICAgIC8vIGJlIHByb2Nlc3NlZCBhZnRlciB0aGUgd2hvbGUgcGF0Y2ggcHJvY2VzcyBlbmRlZC5cbiAgICAgICAgcXVldWVBY3RpdmF0ZWRDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZSwgdHJ1ZSAvKiBkaXJlY3QgKi8pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95ICh2bm9kZSkge1xuICAgIHZhciBjb21wb25lbnRJbnN0YW5jZSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgIGlmICghY29tcG9uZW50SW5zdGFuY2UuX2lzRGVzdHJveWVkKSB7XG4gICAgICBpZiAoIXZub2RlLmRhdGEua2VlcEFsaXZlKSB7XG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLiRkZXN0cm95KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWFjdGl2YXRlQ2hpbGRDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UsIHRydWUgLyogZGlyZWN0ICovKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciBob29rc1RvTWVyZ2UgPSBPYmplY3Qua2V5cyhjb21wb25lbnRWTm9kZUhvb2tzKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50IChcbiAgQ3RvcixcbiAgZGF0YSxcbiAgY29udGV4dCxcbiAgY2hpbGRyZW4sXG4gIHRhZ1xuKSB7XG4gIGlmIChpc1VuZGVmKEN0b3IpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgYmFzZUN0b3IgPSBjb250ZXh0LiRvcHRpb25zLl9iYXNlO1xuXG4gIC8vIHBsYWluIG9wdGlvbnMgb2JqZWN0OiB0dXJuIGl0IGludG8gYSBjb25zdHJ1Y3RvclxuICBpZiAoaXNPYmplY3QoQ3RvcikpIHtcbiAgICBDdG9yID0gYmFzZUN0b3IuZXh0ZW5kKEN0b3IpO1xuICB9XG5cbiAgLy8gaWYgYXQgdGhpcyBzdGFnZSBpdCdzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIGFuIGFzeW5jIGNvbXBvbmVudCBmYWN0b3J5LFxuICAvLyByZWplY3QuXG4gIGlmICh0eXBlb2YgQ3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB3YXJuKChcIkludmFsaWQgQ29tcG9uZW50IGRlZmluaXRpb246IFwiICsgKFN0cmluZyhDdG9yKSkpLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBhc3luYyBjb21wb25lbnRcbiAgdmFyIGFzeW5jRmFjdG9yeTtcbiAgaWYgKGlzVW5kZWYoQ3Rvci5jaWQpKSB7XG4gICAgYXN5bmNGYWN0b3J5ID0gQ3RvcjtcbiAgICBDdG9yID0gcmVzb2x2ZUFzeW5jQ29tcG9uZW50KGFzeW5jRmFjdG9yeSwgYmFzZUN0b3IpO1xuICAgIGlmIChDdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIHJldHVybiBhIHBsYWNlaG9sZGVyIG5vZGUgZm9yIGFzeW5jIGNvbXBvbmVudCwgd2hpY2ggaXMgcmVuZGVyZWRcbiAgICAgIC8vIGFzIGEgY29tbWVudCBub2RlIGJ1dCBwcmVzZXJ2ZXMgYWxsIHRoZSByYXcgaW5mb3JtYXRpb24gZm9yIHRoZSBub2RlLlxuICAgICAgLy8gdGhlIGluZm9ybWF0aW9uIHdpbGwgYmUgdXNlZCBmb3IgYXN5bmMgc2VydmVyLXJlbmRlcmluZyBhbmQgaHlkcmF0aW9uLlxuICAgICAgcmV0dXJuIGNyZWF0ZUFzeW5jUGxhY2Vob2xkZXIoXG4gICAgICAgIGFzeW5jRmFjdG9yeSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIHRhZ1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGRhdGEgPSBkYXRhIHx8IHt9O1xuXG4gIC8vIHJlc29sdmUgY29uc3RydWN0b3Igb3B0aW9ucyBpbiBjYXNlIGdsb2JhbCBtaXhpbnMgYXJlIGFwcGxpZWQgYWZ0ZXJcbiAgLy8gY29tcG9uZW50IGNvbnN0cnVjdG9yIGNyZWF0aW9uXG4gIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvcik7XG5cbiAgLy8gdHJhbnNmb3JtIGNvbXBvbmVudCB2LW1vZGVsIGRhdGEgaW50byBwcm9wcyAmIGV2ZW50c1xuICBpZiAoaXNEZWYoZGF0YS5tb2RlbCkpIHtcbiAgICB0cmFuc2Zvcm1Nb2RlbChDdG9yLm9wdGlvbnMsIGRhdGEpO1xuICB9XG5cbiAgLy8gZXh0cmFjdCBwcm9wc1xuICB2YXIgcHJvcHNEYXRhID0gZXh0cmFjdFByb3BzRnJvbVZOb2RlRGF0YShkYXRhLCBDdG9yLCB0YWcsIGNvbnRleHQpOyAvLyBmaXhlZCBieSB4eHh4eHhcblxuICAvLyBmdW5jdGlvbmFsIGNvbXBvbmVudFxuICBpZiAoaXNUcnVlKEN0b3Iub3B0aW9ucy5mdW5jdGlvbmFsKSkge1xuICAgIHJldHVybiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50KEN0b3IsIHByb3BzRGF0YSwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pXG4gIH1cblxuICAvLyBleHRyYWN0IGxpc3RlbmVycywgc2luY2UgdGhlc2UgbmVlZHMgdG8gYmUgdHJlYXRlZCBhc1xuICAvLyBjaGlsZCBjb21wb25lbnQgbGlzdGVuZXJzIGluc3RlYWQgb2YgRE9NIGxpc3RlbmVyc1xuICB2YXIgbGlzdGVuZXJzID0gZGF0YS5vbjtcbiAgLy8gcmVwbGFjZSB3aXRoIGxpc3RlbmVycyB3aXRoIC5uYXRpdmUgbW9kaWZpZXJcbiAgLy8gc28gaXQgZ2V0cyBwcm9jZXNzZWQgZHVyaW5nIHBhcmVudCBjb21wb25lbnQgcGF0Y2guXG4gIGRhdGEub24gPSBkYXRhLm5hdGl2ZU9uO1xuXG4gIGlmIChpc1RydWUoQ3Rvci5vcHRpb25zLmFic3RyYWN0KSkge1xuICAgIC8vIGFic3RyYWN0IGNvbXBvbmVudHMgZG8gbm90IGtlZXAgYW55dGhpbmdcbiAgICAvLyBvdGhlciB0aGFuIHByb3BzICYgbGlzdGVuZXJzICYgc2xvdFxuXG4gICAgLy8gd29yayBhcm91bmQgZmxvd1xuICAgIHZhciBzbG90ID0gZGF0YS5zbG90O1xuICAgIGRhdGEgPSB7fTtcbiAgICBpZiAoc2xvdCkge1xuICAgICAgZGF0YS5zbG90ID0gc2xvdDtcbiAgICB9XG4gIH1cblxuICAvLyBpbnN0YWxsIGNvbXBvbmVudCBtYW5hZ2VtZW50IGhvb2tzIG9udG8gdGhlIHBsYWNlaG9sZGVyIG5vZGVcbiAgaW5zdGFsbENvbXBvbmVudEhvb2tzKGRhdGEpO1xuXG4gIC8vIHJldHVybiBhIHBsYWNlaG9sZGVyIHZub2RlXG4gIHZhciBuYW1lID0gQ3Rvci5vcHRpb25zLm5hbWUgfHwgdGFnO1xuICB2YXIgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgKFwidnVlLWNvbXBvbmVudC1cIiArIChDdG9yLmNpZCkgKyAobmFtZSA/IChcIi1cIiArIG5hbWUpIDogJycpKSxcbiAgICBkYXRhLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0LFxuICAgIHsgQ3RvcjogQ3RvciwgcHJvcHNEYXRhOiBwcm9wc0RhdGEsIGxpc3RlbmVyczogbGlzdGVuZXJzLCB0YWc6IHRhZywgY2hpbGRyZW46IGNoaWxkcmVuIH0sXG4gICAgYXN5bmNGYWN0b3J5XG4gICk7XG5cbiAgcmV0dXJuIHZub2RlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUgKFxuICB2bm9kZSwgLy8gd2Uga25vdyBpdCdzIE1vdW50ZWRDb21wb25lbnRWTm9kZSBidXQgZmxvdyBkb2Vzbid0XG4gIHBhcmVudCAvLyBhY3RpdmVJbnN0YW5jZSBpbiBsaWZlY3ljbGUgc3RhdGVcbikge1xuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBfaXNDb21wb25lbnQ6IHRydWUsXG4gICAgX3BhcmVudFZub2RlOiB2bm9kZSxcbiAgICBwYXJlbnQ6IHBhcmVudFxuICB9O1xuICAvLyBjaGVjayBpbmxpbmUtdGVtcGxhdGUgcmVuZGVyIGZ1bmN0aW9uc1xuICB2YXIgaW5saW5lVGVtcGxhdGUgPSB2bm9kZS5kYXRhLmlubGluZVRlbXBsYXRlO1xuICBpZiAoaXNEZWYoaW5saW5lVGVtcGxhdGUpKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBpbmxpbmVUZW1wbGF0ZS5yZW5kZXI7XG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBpbmxpbmVUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnM7XG4gIH1cbiAgcmV0dXJuIG5ldyB2bm9kZS5jb21wb25lbnRPcHRpb25zLkN0b3Iob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gaW5zdGFsbENvbXBvbmVudEhvb2tzIChkYXRhKSB7XG4gIHZhciBob29rcyA9IGRhdGEuaG9vayB8fCAoZGF0YS5ob29rID0ge30pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzVG9NZXJnZS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBob29rc1RvTWVyZ2VbaV07XG4gICAgdmFyIGV4aXN0aW5nID0gaG9va3Nba2V5XTtcbiAgICB2YXIgdG9NZXJnZSA9IGNvbXBvbmVudFZOb2RlSG9va3Nba2V5XTtcbiAgICBpZiAoZXhpc3RpbmcgIT09IHRvTWVyZ2UgJiYgIShleGlzdGluZyAmJiBleGlzdGluZy5fbWVyZ2VkKSkge1xuICAgICAgaG9va3Nba2V5XSA9IGV4aXN0aW5nID8gbWVyZ2VIb29rJDEodG9NZXJnZSwgZXhpc3RpbmcpIDogdG9NZXJnZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VIb29rJDEgKGYxLCBmMikge1xuICB2YXIgbWVyZ2VkID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAvLyBmbG93IGNvbXBsYWlucyBhYm91dCBleHRyYSBhcmdzIHdoaWNoIGlzIHdoeSB3ZSB1c2UgYW55XG4gICAgZjEoYSwgYik7XG4gICAgZjIoYSwgYik7XG4gIH07XG4gIG1lcmdlZC5fbWVyZ2VkID0gdHJ1ZTtcbiAgcmV0dXJuIG1lcmdlZFxufVxuXG4vLyB0cmFuc2Zvcm0gY29tcG9uZW50IHYtbW9kZWwgaW5mbyAodmFsdWUgYW5kIGNhbGxiYWNrKSBpbnRvXG4vLyBwcm9wIGFuZCBldmVudCBoYW5kbGVyIHJlc3BlY3RpdmVseS5cbmZ1bmN0aW9uIHRyYW5zZm9ybU1vZGVsIChvcHRpb25zLCBkYXRhKSB7XG4gIHZhciBwcm9wID0gKG9wdGlvbnMubW9kZWwgJiYgb3B0aW9ucy5tb2RlbC5wcm9wKSB8fCAndmFsdWUnO1xuICB2YXIgZXZlbnQgPSAob3B0aW9ucy5tb2RlbCAmJiBvcHRpb25zLm1vZGVsLmV2ZW50KSB8fCAnaW5wdXQnXG4gIDsoZGF0YS5hdHRycyB8fCAoZGF0YS5hdHRycyA9IHt9KSlbcHJvcF0gPSBkYXRhLm1vZGVsLnZhbHVlO1xuICB2YXIgb24gPSBkYXRhLm9uIHx8IChkYXRhLm9uID0ge30pO1xuICB2YXIgZXhpc3RpbmcgPSBvbltldmVudF07XG4gIHZhciBjYWxsYmFjayA9IGRhdGEubW9kZWwuY2FsbGJhY2s7XG4gIGlmIChpc0RlZihleGlzdGluZykpIHtcbiAgICBpZiAoXG4gICAgICBBcnJheS5pc0FycmF5KGV4aXN0aW5nKVxuICAgICAgICA/IGV4aXN0aW5nLmluZGV4T2YoY2FsbGJhY2spID09PSAtMVxuICAgICAgICA6IGV4aXN0aW5nICE9PSBjYWxsYmFja1xuICAgICkge1xuICAgICAgb25bZXZlbnRdID0gW2NhbGxiYWNrXS5jb25jYXQoZXhpc3RpbmcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBvbltldmVudF0gPSBjYWxsYmFjaztcbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIFNJTVBMRV9OT1JNQUxJWkUgPSAxO1xudmFyIEFMV0FZU19OT1JNQUxJWkUgPSAyO1xuXG4vLyB3cmFwcGVyIGZ1bmN0aW9uIGZvciBwcm92aWRpbmcgYSBtb3JlIGZsZXhpYmxlIGludGVyZmFjZVxuLy8gd2l0aG91dCBnZXR0aW5nIHllbGxlZCBhdCBieSBmbG93XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50IChcbiAgY29udGV4dCxcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgbm9ybWFsaXphdGlvblR5cGUsXG4gIGFsd2F5c05vcm1hbGl6ZVxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpIHx8IGlzUHJpbWl0aXZlKGRhdGEpKSB7XG4gICAgbm9ybWFsaXphdGlvblR5cGUgPSBjaGlsZHJlbjtcbiAgICBjaGlsZHJlbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoaXNUcnVlKGFsd2F5c05vcm1hbGl6ZSkpIHtcbiAgICBub3JtYWxpemF0aW9uVHlwZSA9IEFMV0FZU19OT1JNQUxJWkU7XG4gIH1cbiAgcmV0dXJuIF9jcmVhdGVFbGVtZW50KGNvbnRleHQsIHRhZywgZGF0YSwgY2hpbGRyZW4sIG5vcm1hbGl6YXRpb25UeXBlKVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlRWxlbWVudCAoXG4gIGNvbnRleHQsXG4gIHRhZyxcbiAgZGF0YSxcbiAgY2hpbGRyZW4sXG4gIG5vcm1hbGl6YXRpb25UeXBlXG4pIHtcbiAgaWYgKGlzRGVmKGRhdGEpICYmIGlzRGVmKChkYXRhKS5fX29iX18pKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgXCJBdm9pZCB1c2luZyBvYnNlcnZlZCBkYXRhIG9iamVjdCBhcyB2bm9kZSBkYXRhOiBcIiArIChKU09OLnN0cmluZ2lmeShkYXRhKSkgKyBcIlxcblwiICtcbiAgICAgICdBbHdheXMgY3JlYXRlIGZyZXNoIHZub2RlIGRhdGEgb2JqZWN0cyBpbiBlYWNoIHJlbmRlciEnLFxuICAgICAgY29udGV4dFxuICAgICk7XG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG4gIC8vIG9iamVjdCBzeW50YXggaW4gdi1iaW5kXG4gIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZihkYXRhLmlzKSkge1xuICAgIHRhZyA9IGRhdGEuaXM7XG4gIH1cbiAgaWYgKCF0YWcpIHtcbiAgICAvLyBpbiBjYXNlIG9mIGNvbXBvbmVudCA6aXMgc2V0IHRvIGZhbHN5IHZhbHVlXG4gICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICB9XG4gIC8vIHdhcm4gYWdhaW5zdCBub24tcHJpbWl0aXZlIGtleVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIGlzRGVmKGRhdGEpICYmIGlzRGVmKGRhdGEua2V5KSAmJiAhaXNQcmltaXRpdmUoZGF0YS5rZXkpXG4gICkge1xuICAgIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdBdm9pZCB1c2luZyBub24tcHJpbWl0aXZlIHZhbHVlIGFzIGtleSwgJyArXG4gICAgICAgICd1c2Ugc3RyaW5nL251bWJlciB2YWx1ZSBpbnN0ZWFkLicsXG4gICAgICAgIGNvbnRleHRcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8vIHN1cHBvcnQgc2luZ2xlIGZ1bmN0aW9uIGNoaWxkcmVuIGFzIGRlZmF1bHQgc2NvcGVkIHNsb3RcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmXG4gICAgdHlwZW9mIGNoaWxkcmVuWzBdID09PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIGRhdGEuc2NvcGVkU2xvdHMgPSB7IGRlZmF1bHQ6IGNoaWxkcmVuWzBdIH07XG4gICAgY2hpbGRyZW4ubGVuZ3RoID0gMDtcbiAgfVxuICBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IEFMV0FZU19OT1JNQUxJWkUpIHtcbiAgICBjaGlsZHJlbiA9IG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgfSBlbHNlIGlmIChub3JtYWxpemF0aW9uVHlwZSA9PT0gU0lNUExFX05PUk1BTElaRSkge1xuICAgIGNoaWxkcmVuID0gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICB9XG4gIHZhciB2bm9kZSwgbnM7XG4gIGlmICh0eXBlb2YgdGFnID09PSAnc3RyaW5nJykge1xuICAgIHZhciBDdG9yO1xuICAgIG5zID0gKGNvbnRleHQuJHZub2RlICYmIGNvbnRleHQuJHZub2RlLm5zKSB8fCBjb25maWcuZ2V0VGFnTmFtZXNwYWNlKHRhZyk7XG4gICAgaWYgKGNvbmZpZy5pc1Jlc2VydmVkVGFnKHRhZykpIHtcbiAgICAgIC8vIHBsYXRmb3JtIGJ1aWx0LWluIGVsZW1lbnRzXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBpc0RlZihkYXRhKSAmJiBpc0RlZihkYXRhLm5hdGl2ZU9uKSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIlRoZSAubmF0aXZlIG1vZGlmaWVyIGZvciB2LW9uIGlzIG9ubHkgdmFsaWQgb24gY29tcG9uZW50cyBidXQgaXQgd2FzIHVzZWQgb24gPFwiICsgdGFnICsgXCI+LlwiKSxcbiAgICAgICAgICBjb250ZXh0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAgICAgY29uZmlnLnBhcnNlUGxhdGZvcm1UYWdOYW1lKHRhZyksIGRhdGEsIGNoaWxkcmVuLFxuICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCghZGF0YSB8fCAhZGF0YS5wcmUpICYmIGlzRGVmKEN0b3IgPSByZXNvbHZlQXNzZXQoY29udGV4dC4kb3B0aW9ucywgJ2NvbXBvbmVudHMnLCB0YWcpKSkge1xuICAgICAgLy8gY29tcG9uZW50XG4gICAgICB2bm9kZSA9IGNyZWF0ZUNvbXBvbmVudChDdG9yLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbiwgdGFnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdW5rbm93biBvciB1bmxpc3RlZCBuYW1lc3BhY2VkIGVsZW1lbnRzXG4gICAgICAvLyBjaGVjayBhdCBydW50aW1lIGJlY2F1c2UgaXQgbWF5IGdldCBhc3NpZ25lZCBhIG5hbWVzcGFjZSB3aGVuIGl0c1xuICAgICAgLy8gcGFyZW50IG5vcm1hbGl6ZXMgY2hpbGRyZW5cbiAgICAgIHZub2RlID0gbmV3IFZOb2RlKFxuICAgICAgICB0YWcsIGRhdGEsIGNoaWxkcmVuLFxuICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dFxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gZGlyZWN0IGNvbXBvbmVudCBvcHRpb25zIC8gY29uc3RydWN0b3JcbiAgICB2bm9kZSA9IGNyZWF0ZUNvbXBvbmVudCh0YWcsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICByZXR1cm4gdm5vZGVcbiAgfSBlbHNlIGlmIChpc0RlZih2bm9kZSkpIHtcbiAgICBpZiAoaXNEZWYobnMpKSB7IGFwcGx5TlModm5vZGUsIG5zKTsgfVxuICAgIGlmIChpc0RlZihkYXRhKSkgeyByZWdpc3RlckRlZXBCaW5kaW5ncyhkYXRhKTsgfVxuICAgIHJldHVybiB2bm9kZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseU5TICh2bm9kZSwgbnMsIGZvcmNlKSB7XG4gIHZub2RlLm5zID0gbnM7XG4gIGlmICh2bm9kZS50YWcgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgIC8vIHVzZSBkZWZhdWx0IG5hbWVzcGFjZSBpbnNpZGUgZm9yZWlnbk9iamVjdFxuICAgIG5zID0gdW5kZWZpbmVkO1xuICAgIGZvcmNlID0gdHJ1ZTtcbiAgfVxuICBpZiAoaXNEZWYodm5vZGUuY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGlzRGVmKGNoaWxkLnRhZykgJiYgKFxuICAgICAgICBpc1VuZGVmKGNoaWxkLm5zKSB8fCAoaXNUcnVlKGZvcmNlKSAmJiBjaGlsZC50YWcgIT09ICdzdmcnKSkpIHtcbiAgICAgICAgYXBwbHlOUyhjaGlsZCwgbnMsIGZvcmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gcmVmICM1MzE4XG4vLyBuZWNlc3NhcnkgdG8gZW5zdXJlIHBhcmVudCByZS1yZW5kZXIgd2hlbiBkZWVwIGJpbmRpbmdzIGxpa2UgOnN0eWxlIGFuZFxuLy8gOmNsYXNzIGFyZSB1c2VkIG9uIHNsb3Qgbm9kZXNcbmZ1bmN0aW9uIHJlZ2lzdGVyRGVlcEJpbmRpbmdzIChkYXRhKSB7XG4gIGlmIChpc09iamVjdChkYXRhLnN0eWxlKSkge1xuICAgIHRyYXZlcnNlKGRhdGEuc3R5bGUpO1xuICB9XG4gIGlmIChpc09iamVjdChkYXRhLmNsYXNzKSkge1xuICAgIHRyYXZlcnNlKGRhdGEuY2xhc3MpO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0UmVuZGVyICh2bSkge1xuICB2bS5fdm5vZGUgPSBudWxsOyAvLyB0aGUgcm9vdCBvZiB0aGUgY2hpbGQgdHJlZVxuICB2bS5fc3RhdGljVHJlZXMgPSBudWxsOyAvLyB2LW9uY2UgY2FjaGVkIHRyZWVzXG4gIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG4gIHZhciBwYXJlbnRWbm9kZSA9IHZtLiR2bm9kZSA9IG9wdGlvbnMuX3BhcmVudFZub2RlOyAvLyB0aGUgcGxhY2Vob2xkZXIgbm9kZSBpbiBwYXJlbnQgdHJlZVxuICB2YXIgcmVuZGVyQ29udGV4dCA9IHBhcmVudFZub2RlICYmIHBhcmVudFZub2RlLmNvbnRleHQ7XG4gIHZtLiRzbG90cyA9IHJlc29sdmVTbG90cyhvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiwgcmVuZGVyQ29udGV4dCk7XG4gIHZtLiRzY29wZWRTbG90cyA9IGVtcHR5T2JqZWN0O1xuICAvLyBiaW5kIHRoZSBjcmVhdGVFbGVtZW50IGZuIHRvIHRoaXMgaW5zdGFuY2VcbiAgLy8gc28gdGhhdCB3ZSBnZXQgcHJvcGVyIHJlbmRlciBjb250ZXh0IGluc2lkZSBpdC5cbiAgLy8gYXJncyBvcmRlcjogdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUsIGFsd2F5c05vcm1hbGl6ZVxuICAvLyBpbnRlcm5hbCB2ZXJzaW9uIGlzIHVzZWQgYnkgcmVuZGVyIGZ1bmN0aW9ucyBjb21waWxlZCBmcm9tIHRlbXBsYXRlc1xuICB2bS5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCBmYWxzZSk7IH07XG4gIC8vIG5vcm1hbGl6YXRpb24gaXMgYWx3YXlzIGFwcGxpZWQgZm9yIHRoZSBwdWJsaWMgdmVyc2lvbiwgdXNlZCBpblxuICAvLyB1c2VyLXdyaXR0ZW4gcmVuZGVyIGZ1bmN0aW9ucy5cbiAgdm0uJGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudCh2bSwgYSwgYiwgYywgZCwgdHJ1ZSk7IH07XG5cbiAgLy8gJGF0dHJzICYgJGxpc3RlbmVycyBhcmUgZXhwb3NlZCBmb3IgZWFzaWVyIEhPQyBjcmVhdGlvbi5cbiAgLy8gdGhleSBuZWVkIHRvIGJlIHJlYWN0aXZlIHNvIHRoYXQgSE9DcyB1c2luZyB0aGVtIGFyZSBhbHdheXMgdXBkYXRlZFxuICB2YXIgcGFyZW50RGF0YSA9IHBhcmVudFZub2RlICYmIHBhcmVudFZub2RlLmRhdGE7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwgJyRhdHRycycsIHBhcmVudERhdGEgJiYgcGFyZW50RGF0YS5hdHRycyB8fCBlbXB0eU9iamVjdCwgZnVuY3Rpb24gKCkge1xuICAgICAgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCAmJiB3YXJuKFwiJGF0dHJzIGlzIHJlYWRvbmx5LlwiLCB2bSk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sICckbGlzdGVuZXJzJywgb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAhaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ICYmIHdhcm4oXCIkbGlzdGVuZXJzIGlzIHJlYWRvbmx5LlwiLCB2bSk7XG4gICAgfSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sICckYXR0cnMnLCBwYXJlbnREYXRhICYmIHBhcmVudERhdGEuYXR0cnMgfHwgZW1wdHlPYmplY3QsIG51bGwsIHRydWUpO1xuICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCAnJGxpc3RlbmVycycsIG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyB8fCBlbXB0eU9iamVjdCwgbnVsbCwgdHJ1ZSk7XG4gIH1cbn1cblxudmFyIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IG51bGw7XG5cbmZ1bmN0aW9uIHJlbmRlck1peGluIChWdWUpIHtcbiAgLy8gaW5zdGFsbCBydW50aW1lIGNvbnZlbmllbmNlIGhlbHBlcnNcbiAgaW5zdGFsbFJlbmRlckhlbHBlcnMoVnVlLnByb3RvdHlwZSk7XG5cbiAgVnVlLnByb3RvdHlwZS4kbmV4dFRpY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICByZXR1cm4gbmV4dFRpY2soZm4sIHRoaXMpXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdmFyIHJlZiA9IHZtLiRvcHRpb25zO1xuICAgIHZhciByZW5kZXIgPSByZWYucmVuZGVyO1xuICAgIHZhciBfcGFyZW50Vm5vZGUgPSByZWYuX3BhcmVudFZub2RlO1xuXG4gICAgaWYgKF9wYXJlbnRWbm9kZSkge1xuICAgICAgdm0uJHNjb3BlZFNsb3RzID0gbm9ybWFsaXplU2NvcGVkU2xvdHMoXG4gICAgICAgIF9wYXJlbnRWbm9kZS5kYXRhLnNjb3BlZFNsb3RzLFxuICAgICAgICB2bS4kc2xvdHMsXG4gICAgICAgIHZtLiRzY29wZWRTbG90c1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgcGFyZW50IHZub2RlLiB0aGlzIGFsbG93cyByZW5kZXIgZnVuY3Rpb25zIHRvIGhhdmUgYWNjZXNzXG4gICAgLy8gdG8gdGhlIGRhdGEgb24gdGhlIHBsYWNlaG9sZGVyIG5vZGUuXG4gICAgdm0uJHZub2RlID0gX3BhcmVudFZub2RlO1xuICAgIC8vIHJlbmRlciBzZWxmXG4gICAgdmFyIHZub2RlO1xuICAgIHRyeSB7XG4gICAgICAvLyBUaGVyZSdzIG5vIG5lZWQgdG8gbWFpbnRhaW4gYSBzdGFjayBiZWNhdXNlIGFsbCByZW5kZXIgZm5zIGFyZSBjYWxsZWRcbiAgICAgIC8vIHNlcGFyYXRlbHkgZnJvbSBvbmUgYW5vdGhlci4gTmVzdGVkIGNvbXBvbmVudCdzIHJlbmRlciBmbnMgYXJlIGNhbGxlZFxuICAgICAgLy8gd2hlbiBwYXJlbnQgY29tcG9uZW50IGlzIHBhdGNoZWQuXG4gICAgICBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgPSB2bTtcbiAgICAgIHZub2RlID0gcmVuZGVyLmNhbGwodm0uX3JlbmRlclByb3h5LCB2bS4kY3JlYXRlRWxlbWVudCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIFwicmVuZGVyXCIpO1xuICAgICAgLy8gcmV0dXJuIGVycm9yIHJlbmRlciByZXN1bHQsXG4gICAgICAvLyBvciBwcmV2aW91cyB2bm9kZSB0byBwcmV2ZW50IHJlbmRlciBlcnJvciBjYXVzaW5nIGJsYW5rIGNvbXBvbmVudFxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHZtLiRvcHRpb25zLnJlbmRlckVycm9yKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdm5vZGUgPSB2bS4kb3B0aW9ucy5yZW5kZXJFcnJvci5jYWxsKHZtLl9yZW5kZXJQcm94eSwgdm0uJGNyZWF0ZUVsZW1lbnQsIGUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIFwicmVuZGVyRXJyb3JcIik7XG4gICAgICAgICAgdm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgPSBudWxsO1xuICAgIH1cbiAgICAvLyBpZiB0aGUgcmV0dXJuZWQgYXJyYXkgY29udGFpbnMgb25seSBhIHNpbmdsZSBub2RlLCBhbGxvdyBpdFxuICAgIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSAmJiB2bm9kZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZub2RlID0gdm5vZGVbMF07XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSB2bm9kZSBpbiBjYXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gZXJyb3JlZCBvdXRcbiAgICBpZiAoISh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnTXVsdGlwbGUgcm9vdCBub2RlcyByZXR1cm5lZCBmcm9tIHJlbmRlciBmdW5jdGlvbi4gUmVuZGVyIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICdzaG91bGQgcmV0dXJuIGEgc2luZ2xlIHJvb3Qgbm9kZS4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2bm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgICB9XG4gICAgLy8gc2V0IHBhcmVudFxuICAgIHZub2RlLnBhcmVudCA9IF9wYXJlbnRWbm9kZTtcbiAgICByZXR1cm4gdm5vZGVcbiAgfTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGVuc3VyZUN0b3IgKGNvbXAsIGJhc2UpIHtcbiAgaWYgKFxuICAgIGNvbXAuX19lc01vZHVsZSB8fFxuICAgIChoYXNTeW1ib2wgJiYgY29tcFtTeW1ib2wudG9TdHJpbmdUYWddID09PSAnTW9kdWxlJylcbiAgKSB7XG4gICAgY29tcCA9IGNvbXAuZGVmYXVsdDtcbiAgfVxuICByZXR1cm4gaXNPYmplY3QoY29tcClcbiAgICA/IGJhc2UuZXh0ZW5kKGNvbXApXG4gICAgOiBjb21wXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFzeW5jUGxhY2Vob2xkZXIgKFxuICBmYWN0b3J5LFxuICBkYXRhLFxuICBjb250ZXh0LFxuICBjaGlsZHJlbixcbiAgdGFnXG4pIHtcbiAgdmFyIG5vZGUgPSBjcmVhdGVFbXB0eVZOb2RlKCk7XG4gIG5vZGUuYXN5bmNGYWN0b3J5ID0gZmFjdG9yeTtcbiAgbm9kZS5hc3luY01ldGEgPSB7IGRhdGE6IGRhdGEsIGNvbnRleHQ6IGNvbnRleHQsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGFnOiB0YWcgfTtcbiAgcmV0dXJuIG5vZGVcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUFzeW5jQ29tcG9uZW50IChcbiAgZmFjdG9yeSxcbiAgYmFzZUN0b3Jcbikge1xuICBpZiAoaXNUcnVlKGZhY3RvcnkuZXJyb3IpICYmIGlzRGVmKGZhY3RvcnkuZXJyb3JDb21wKSkge1xuICAgIHJldHVybiBmYWN0b3J5LmVycm9yQ29tcFxuICB9XG5cbiAgaWYgKGlzRGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgcmV0dXJuIGZhY3RvcnkucmVzb2x2ZWRcbiAgfVxuXG4gIHZhciBvd25lciA9IGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZTtcbiAgaWYgKG93bmVyICYmIGlzRGVmKGZhY3Rvcnkub3duZXJzKSAmJiBmYWN0b3J5Lm93bmVycy5pbmRleE9mKG93bmVyKSA9PT0gLTEpIHtcbiAgICAvLyBhbHJlYWR5IHBlbmRpbmdcbiAgICBmYWN0b3J5Lm93bmVycy5wdXNoKG93bmVyKTtcbiAgfVxuXG4gIGlmIChpc1RydWUoZmFjdG9yeS5sb2FkaW5nKSAmJiBpc0RlZihmYWN0b3J5LmxvYWRpbmdDb21wKSkge1xuICAgIHJldHVybiBmYWN0b3J5LmxvYWRpbmdDb21wXG4gIH1cblxuICBpZiAob3duZXIgJiYgIWlzRGVmKGZhY3Rvcnkub3duZXJzKSkge1xuICAgIHZhciBvd25lcnMgPSBmYWN0b3J5Lm93bmVycyA9IFtvd25lcl07XG4gICAgdmFyIHN5bmMgPSB0cnVlO1xuICAgIHZhciB0aW1lckxvYWRpbmcgPSBudWxsO1xuICAgIHZhciB0aW1lclRpbWVvdXQgPSBudWxsXG5cbiAgICA7KG93bmVyKS4kb24oJ2hvb2s6ZGVzdHJveWVkJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlKG93bmVycywgb3duZXIpOyB9KTtcblxuICAgIHZhciBmb3JjZVJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJDb21wbGV0ZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gb3duZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAob3duZXJzW2ldKS4kZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlbmRlckNvbXBsZXRlZCkge1xuICAgICAgICBvd25lcnMubGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKHRpbWVyTG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lckxvYWRpbmcpO1xuICAgICAgICAgIHRpbWVyTG9hZGluZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWVyVGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lclRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVyVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlc29sdmUgPSBvbmNlKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vIGNhY2hlIHJlc29sdmVkXG4gICAgICBmYWN0b3J5LnJlc29sdmVkID0gZW5zdXJlQ3RvcihyZXMsIGJhc2VDdG9yKTtcbiAgICAgIC8vIGludm9rZSBjYWxsYmFja3Mgb25seSBpZiB0aGlzIGlzIG5vdCBhIHN5bmNocm9ub3VzIHJlc29sdmVcbiAgICAgIC8vIChhc3luYyByZXNvbHZlcyBhcmUgc2hpbW1lZCBhcyBzeW5jaHJvbm91cyBkdXJpbmcgU1NSKVxuICAgICAgaWYgKCFzeW5jKSB7XG4gICAgICAgIGZvcmNlUmVuZGVyKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3duZXJzLmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgcmVqZWN0ID0gb25jZShmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiRmFpbGVkIHRvIHJlc29sdmUgYXN5bmMgY29tcG9uZW50OiBcIiArIChTdHJpbmcoZmFjdG9yeSkpICtcbiAgICAgICAgKHJlYXNvbiA/IChcIlxcblJlYXNvbjogXCIgKyByZWFzb24pIDogJycpXG4gICAgICApO1xuICAgICAgaWYgKGlzRGVmKGZhY3RvcnkuZXJyb3JDb21wKSkge1xuICAgICAgICBmYWN0b3J5LmVycm9yID0gdHJ1ZTtcbiAgICAgICAgZm9yY2VSZW5kZXIodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgcmVzID0gZmFjdG9yeShyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgaWYgKGlzT2JqZWN0KHJlcykpIHtcbiAgICAgIGlmIChpc1Byb21pc2UocmVzKSkge1xuICAgICAgICAvLyAoKSA9PiBQcm9taXNlXG4gICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgICAgcmVzLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1Byb21pc2UocmVzLmNvbXBvbmVudCkpIHtcbiAgICAgICAgcmVzLmNvbXBvbmVudC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgaWYgKGlzRGVmKHJlcy5lcnJvcikpIHtcbiAgICAgICAgICBmYWN0b3J5LmVycm9yQ29tcCA9IGVuc3VyZUN0b3IocmVzLmVycm9yLCBiYXNlQ3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWYocmVzLmxvYWRpbmcpKSB7XG4gICAgICAgICAgZmFjdG9yeS5sb2FkaW5nQ29tcCA9IGVuc3VyZUN0b3IocmVzLmxvYWRpbmcsIGJhc2VDdG9yKTtcbiAgICAgICAgICBpZiAocmVzLmRlbGF5ID09PSAwKSB7XG4gICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lckxvYWRpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGltZXJMb2FkaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkgJiYgaXNVbmRlZihmYWN0b3J5LmVycm9yKSkge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yY2VSZW5kZXIoZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZXMuZGVsYXkgfHwgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWYocmVzLnRpbWVvdXQpKSB7XG4gICAgICAgICAgdGltZXJUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lclRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbiAgICAgICAgICAgICAgICAgID8gKFwidGltZW91dCAoXCIgKyAocmVzLnRpbWVvdXQpICsgXCJtcylcIilcbiAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHJlcy50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHN5bmMgPSBmYWxzZTtcbiAgICAvLyByZXR1cm4gaW4gY2FzZSByZXNvbHZlZCBzeW5jaHJvbm91c2x5XG4gICAgcmV0dXJuIGZhY3RvcnkubG9hZGluZ1xuICAgICAgPyBmYWN0b3J5LmxvYWRpbmdDb21wXG4gICAgICA6IGZhY3RvcnkucmVzb2x2ZWRcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaXNBc3luY1BsYWNlaG9sZGVyIChub2RlKSB7XG4gIHJldHVybiBub2RlLmlzQ29tbWVudCAmJiBub2RlLmFzeW5jRmFjdG9yeVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCAoY2hpbGRyZW4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjaGlsZHJlbltpXTtcbiAgICAgIGlmIChpc0RlZihjKSAmJiAoaXNEZWYoYy5jb21wb25lbnRPcHRpb25zKSB8fCBpc0FzeW5jUGxhY2Vob2xkZXIoYykpKSB7XG4gICAgICAgIHJldHVybiBjXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEV2ZW50cyAodm0pIHtcbiAgdm0uX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZtLl9oYXNIb29rRXZlbnQgPSBmYWxzZTtcbiAgLy8gaW5pdCBwYXJlbnQgYXR0YWNoZWQgZXZlbnRzXG4gIHZhciBsaXN0ZW5lcnMgPSB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICBpZiAobGlzdGVuZXJzKSB7XG4gICAgdXBkYXRlQ29tcG9uZW50TGlzdGVuZXJzKHZtLCBsaXN0ZW5lcnMpO1xuICB9XG59XG5cbnZhciB0YXJnZXQ7XG5cbmZ1bmN0aW9uIGFkZCAoZXZlbnQsIGZuKSB7XG4gIHRhcmdldC4kb24oZXZlbnQsIGZuKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlJDEgKGV2ZW50LCBmbikge1xuICB0YXJnZXQuJG9mZihldmVudCwgZm4pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPbmNlSGFuZGxlciAoZXZlbnQsIGZuKSB7XG4gIHZhciBfdGFyZ2V0ID0gdGFyZ2V0O1xuICByZXR1cm4gZnVuY3Rpb24gb25jZUhhbmRsZXIgKCkge1xuICAgIHZhciByZXMgPSBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXMgIT09IG51bGwpIHtcbiAgICAgIF90YXJnZXQuJG9mZihldmVudCwgb25jZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnMgKFxuICB2bSxcbiAgbGlzdGVuZXJzLFxuICBvbGRMaXN0ZW5lcnNcbikge1xuICB0YXJnZXQgPSB2bTtcbiAgdXBkYXRlTGlzdGVuZXJzKGxpc3RlbmVycywgb2xkTGlzdGVuZXJzIHx8IHt9LCBhZGQsIHJlbW92ZSQxLCBjcmVhdGVPbmNlSGFuZGxlciwgdm0pO1xuICB0YXJnZXQgPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGV2ZW50c01peGluIChWdWUpIHtcbiAgdmFyIGhvb2tSRSA9IC9eaG9vazovO1xuICBWdWUucHJvdG90eXBlLiRvbiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdm0uJG9uKGV2ZW50W2ldLCBmbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICh2bS5fZXZlbnRzW2V2ZW50XSB8fCAodm0uX2V2ZW50c1tldmVudF0gPSBbXSkpLnB1c2goZm4pO1xuICAgICAgLy8gb3B0aW1pemUgaG9vazpldmVudCBjb3N0IGJ5IHVzaW5nIGEgYm9vbGVhbiBmbGFnIG1hcmtlZCBhdCByZWdpc3RyYXRpb25cbiAgICAgIC8vIGluc3RlYWQgb2YgYSBoYXNoIGxvb2t1cFxuICAgICAgaWYgKGhvb2tSRS50ZXN0KGV2ZW50KSkge1xuICAgICAgICB2bS5faGFzSG9va0V2ZW50ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZtXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kb25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGZ1bmN0aW9uIG9uICgpIHtcbiAgICAgIHZtLiRvZmYoZXZlbnQsIG9uKTtcbiAgICAgIGZuLmFwcGx5KHZtLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBvbi5mbiA9IGZuO1xuICAgIHZtLiRvbihldmVudCwgb24pO1xuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJG9mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIC8vIGFsbFxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdm0uX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgLy8gYXJyYXkgb2YgZXZlbnRzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKHZhciBpJDEgPSAwLCBsID0gZXZlbnQubGVuZ3RoOyBpJDEgPCBsOyBpJDErKykge1xuICAgICAgICB2bS4kb2ZmKGV2ZW50W2kkMV0sIGZuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICAvLyBzcGVjaWZpYyBldmVudFxuICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcbiAgICBpZiAoIWNicykge1xuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIGlmICghZm4pIHtcbiAgICAgIHZtLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXG4gICAgdmFyIGNiO1xuICAgIHZhciBpID0gY2JzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjYiA9IGNic1tpXTtcbiAgICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICAgIGNicy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2bVxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbG93ZXJDYXNlRXZlbnQgPSBldmVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGxvd2VyQ2FzZUV2ZW50ICE9PSBldmVudCAmJiB2bS5fZXZlbnRzW2xvd2VyQ2FzZUV2ZW50XSkge1xuICAgICAgICB0aXAoXG4gICAgICAgICAgXCJFdmVudCBcXFwiXCIgKyBsb3dlckNhc2VFdmVudCArIFwiXFxcIiBpcyBlbWl0dGVkIGluIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgKGZvcm1hdENvbXBvbmVudE5hbWUodm0pKSArIFwiIGJ1dCB0aGUgaGFuZGxlciBpcyByZWdpc3RlcmVkIGZvciBcXFwiXCIgKyBldmVudCArIFwiXFxcIi4gXCIgK1xuICAgICAgICAgIFwiTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgeW91IGNhbm5vdCB1c2UgXCIgK1xuICAgICAgICAgIFwidi1vbiB0byBsaXN0ZW4gdG8gY2FtZWxDYXNlIGV2ZW50cyB3aGVuIHVzaW5nIGluLURPTSB0ZW1wbGF0ZXMuIFwiICtcbiAgICAgICAgICBcIllvdSBzaG91bGQgcHJvYmFibHkgdXNlIFxcXCJcIiArIChoeXBoZW5hdGUoZXZlbnQpKSArIFwiXFxcIiBpbnN0ZWFkIG9mIFxcXCJcIiArIGV2ZW50ICsgXCJcXFwiLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcbiAgICBpZiAoY2JzKSB7XG4gICAgICBjYnMgPSBjYnMubGVuZ3RoID4gMSA/IHRvQXJyYXkoY2JzKSA6IGNicztcbiAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgdmFyIGluZm8gPSBcImV2ZW50IGhhbmRsZXIgZm9yIFxcXCJcIiArIGV2ZW50ICsgXCJcXFwiXCI7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoY2JzW2ldLCB2bSwgYXJncywgdm0sIGluZm8pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcbn1cblxuLyogICovXG5cbnZhciBhY3RpdmVJbnN0YW5jZSA9IG51bGw7XG52YXIgaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNldEFjdGl2ZUluc3RhbmNlKHZtKSB7XG4gIHZhciBwcmV2QWN0aXZlSW5zdGFuY2UgPSBhY3RpdmVJbnN0YW5jZTtcbiAgYWN0aXZlSW5zdGFuY2UgPSB2bTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBhY3RpdmVJbnN0YW5jZSA9IHByZXZBY3RpdmVJbnN0YW5jZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0TGlmZWN5Y2xlICh2bSkge1xuICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xuXG4gIC8vIGxvY2F0ZSBmaXJzdCBub24tYWJzdHJhY3QgcGFyZW50XG4gIHZhciBwYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgaWYgKHBhcmVudCAmJiAhb3B0aW9ucy5hYnN0cmFjdCkge1xuICAgIHdoaWxlIChwYXJlbnQuJG9wdGlvbnMuYWJzdHJhY3QgJiYgcGFyZW50LiRwYXJlbnQpIHtcbiAgICAgIHBhcmVudCA9IHBhcmVudC4kcGFyZW50O1xuICAgIH1cbiAgICBwYXJlbnQuJGNoaWxkcmVuLnB1c2godm0pO1xuICB9XG5cbiAgdm0uJHBhcmVudCA9IHBhcmVudDtcbiAgdm0uJHJvb3QgPSBwYXJlbnQgPyBwYXJlbnQuJHJvb3QgOiB2bTtcblxuICB2bS4kY2hpbGRyZW4gPSBbXTtcbiAgdm0uJHJlZnMgPSB7fTtcblxuICB2bS5fd2F0Y2hlciA9IG51bGw7XG4gIHZtLl9pbmFjdGl2ZSA9IG51bGw7XG4gIHZtLl9kaXJlY3RJbmFjdGl2ZSA9IGZhbHNlO1xuICB2bS5faXNNb3VudGVkID0gZmFsc2U7XG4gIHZtLl9pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICB2bS5faXNCZWluZ0Rlc3Ryb3llZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBsaWZlY3ljbGVNaXhpbiAoVnVlKSB7XG4gIFZ1ZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uICh2bm9kZSwgaHlkcmF0aW5nKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2YXIgcHJldkVsID0gdm0uJGVsO1xuICAgIHZhciBwcmV2Vm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgdmFyIHJlc3RvcmVBY3RpdmVJbnN0YW5jZSA9IHNldEFjdGl2ZUluc3RhbmNlKHZtKTtcbiAgICB2bS5fdm5vZGUgPSB2bm9kZTtcbiAgICAvLyBWdWUucHJvdG90eXBlLl9fcGF0Y2hfXyBpcyBpbmplY3RlZCBpbiBlbnRyeSBwb2ludHNcbiAgICAvLyBiYXNlZCBvbiB0aGUgcmVuZGVyaW5nIGJhY2tlbmQgdXNlZC5cbiAgICBpZiAoIXByZXZWbm9kZSkge1xuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHZtLiRlbCA9IHZtLl9fcGF0Y2hfXyh2bS4kZWwsIHZub2RlLCBoeWRyYXRpbmcsIGZhbHNlIC8qIHJlbW92ZU9ubHkgKi8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB1cGRhdGVzXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18ocHJldlZub2RlLCB2bm9kZSk7XG4gICAgfVxuICAgIHJlc3RvcmVBY3RpdmVJbnN0YW5jZSgpO1xuICAgIC8vIHVwZGF0ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxuICAgIGlmIChwcmV2RWwpIHtcbiAgICAgIHByZXZFbC5fX3Z1ZV9fID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHZtLiRlbCkge1xuICAgICAgdm0uJGVsLl9fdnVlX18gPSB2bTtcbiAgICB9XG4gICAgLy8gaWYgcGFyZW50IGlzIGFuIEhPQywgdXBkYXRlIGl0cyAkZWwgYXMgd2VsbFxuICAgIGlmICh2bS4kdm5vZGUgJiYgdm0uJHBhcmVudCAmJiB2bS4kdm5vZGUgPT09IHZtLiRwYXJlbnQuX3Zub2RlKSB7XG4gICAgICB2bS4kcGFyZW50LiRlbCA9IHZtLiRlbDtcbiAgICB9XG4gICAgLy8gdXBkYXRlZCBob29rIGlzIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyIHRvIGVuc3VyZSB0aGF0IGNoaWxkcmVuIGFyZVxuICAgIC8vIHVwZGF0ZWQgaW4gYSBwYXJlbnQncyB1cGRhdGVkIGhvb2suXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgIHZtLl93YXRjaGVyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRkZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVEZXN0cm95Jyk7XG4gICAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSB0cnVlO1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50XG4gICAgdmFyIHBhcmVudCA9IHZtLiRwYXJlbnQ7XG4gICAgaWYgKHBhcmVudCAmJiAhcGFyZW50Ll9pc0JlaW5nRGVzdHJveWVkICYmICF2bS4kb3B0aW9ucy5hYnN0cmFjdCkge1xuICAgICAgcmVtb3ZlKHBhcmVudC4kY2hpbGRyZW4sIHZtKTtcbiAgICB9XG4gICAgLy8gdGVhcmRvd24gd2F0Y2hlcnNcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgIHZtLl93YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgfVxuICAgIHZhciBpID0gdm0uX3dhdGNoZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2bS5fd2F0Y2hlcnNbaV0udGVhcmRvd24oKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlZmVyZW5jZSBmcm9tIGRhdGEgb2JcbiAgICAvLyBmcm96ZW4gb2JqZWN0IG1heSBub3QgaGF2ZSBvYnNlcnZlci5cbiAgICBpZiAodm0uX2RhdGEuX19vYl9fKSB7XG4gICAgICB2bS5fZGF0YS5fX29iX18udm1Db3VudC0tO1xuICAgIH1cbiAgICAvLyBjYWxsIHRoZSBsYXN0IGhvb2suLi5cbiAgICB2bS5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIC8vIGludm9rZSBkZXN0cm95IGhvb2tzIG9uIGN1cnJlbnQgcmVuZGVyZWQgdHJlZVxuICAgIHZtLl9fcGF0Y2hfXyh2bS5fdm5vZGUsIG51bGwpO1xuICAgIC8vIGZpcmUgZGVzdHJveWVkIGhvb2tcbiAgICBjYWxsSG9vayh2bSwgJ2Rlc3Ryb3llZCcpO1xuICAgIC8vIHR1cm4gb2ZmIGFsbCBpbnN0YW5jZSBsaXN0ZW5lcnMuXG4gICAgdm0uJG9mZigpO1xuICAgIC8vIHJlbW92ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxuICAgIGlmICh2bS4kZWwpIHtcbiAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gbnVsbDtcbiAgICB9XG4gICAgLy8gcmVsZWFzZSBjaXJjdWxhciByZWZlcmVuY2UgKCM2NzU5KVxuICAgIGlmICh2bS4kdm5vZGUpIHtcbiAgICAgIHZtLiR2bm9kZS5wYXJlbnQgPSBudWxsO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRDb21wb25lbnQgKFxuICB2bSxcbiAgcHJvcHNEYXRhLFxuICBsaXN0ZW5lcnMsXG4gIHBhcmVudFZub2RlLFxuICByZW5kZXJDaGlsZHJlblxuKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGRldGVybWluZSB3aGV0aGVyIGNvbXBvbmVudCBoYXMgc2xvdCBjaGlsZHJlblxuICAvLyB3ZSBuZWVkIHRvIGRvIHRoaXMgYmVmb3JlIG92ZXJ3cml0aW5nICRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbi5cblxuICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgZHluYW1pYyBzY29wZWRTbG90cyAoaGFuZC13cml0dGVuIG9yIGNvbXBpbGVkIGJ1dCB3aXRoXG4gIC8vIGR5bmFtaWMgc2xvdCBuYW1lcykuIFN0YXRpYyBzY29wZWQgc2xvdHMgY29tcGlsZWQgZnJvbSB0ZW1wbGF0ZSBoYXMgdGhlXG4gIC8vIFwiJHN0YWJsZVwiIG1hcmtlci5cbiAgdmFyIG5ld1Njb3BlZFNsb3RzID0gcGFyZW50Vm5vZGUuZGF0YS5zY29wZWRTbG90cztcbiAgdmFyIG9sZFNjb3BlZFNsb3RzID0gdm0uJHNjb3BlZFNsb3RzO1xuICB2YXIgaGFzRHluYW1pY1Njb3BlZFNsb3QgPSAhIShcbiAgICAobmV3U2NvcGVkU2xvdHMgJiYgIW5ld1Njb3BlZFNsb3RzLiRzdGFibGUpIHx8XG4gICAgKG9sZFNjb3BlZFNsb3RzICE9PSBlbXB0eU9iamVjdCAmJiAhb2xkU2NvcGVkU2xvdHMuJHN0YWJsZSkgfHxcbiAgICAobmV3U2NvcGVkU2xvdHMgJiYgdm0uJHNjb3BlZFNsb3RzLiRrZXkgIT09IG5ld1Njb3BlZFNsb3RzLiRrZXkpXG4gICk7XG5cbiAgLy8gQW55IHN0YXRpYyBzbG90IGNoaWxkcmVuIGZyb20gdGhlIHBhcmVudCBtYXkgaGF2ZSBjaGFuZ2VkIGR1cmluZyBwYXJlbnQnc1xuICAvLyB1cGRhdGUuIER5bmFtaWMgc2NvcGVkIHNsb3RzIG1heSBhbHNvIGhhdmUgY2hhbmdlZC4gSW4gc3VjaCBjYXNlcywgYSBmb3JjZWRcbiAgLy8gdXBkYXRlIGlzIG5lY2Vzc2FyeSB0byBlbnN1cmUgY29ycmVjdG5lc3MuXG4gIHZhciBuZWVkc0ZvcmNlVXBkYXRlID0gISEoXG4gICAgcmVuZGVyQ2hpbGRyZW4gfHwgICAgICAgICAgICAgICAvLyBoYXMgbmV3IHN0YXRpYyBzbG90c1xuICAgIHZtLiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiB8fCAgLy8gaGFzIG9sZCBzdGF0aWMgc2xvdHNcbiAgICBoYXNEeW5hbWljU2NvcGVkU2xvdFxuICApO1xuXG4gIHZtLiRvcHRpb25zLl9wYXJlbnRWbm9kZSA9IHBhcmVudFZub2RlO1xuICB2bS4kdm5vZGUgPSBwYXJlbnRWbm9kZTsgLy8gdXBkYXRlIHZtJ3MgcGxhY2Vob2xkZXIgbm9kZSB3aXRob3V0IHJlLXJlbmRlclxuXG4gIGlmICh2bS5fdm5vZGUpIHsgLy8gdXBkYXRlIGNoaWxkIHRyZWUncyBwYXJlbnRcbiAgICB2bS5fdm5vZGUucGFyZW50ID0gcGFyZW50Vm5vZGU7XG4gIH1cbiAgdm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuID0gcmVuZGVyQ2hpbGRyZW47XG5cbiAgLy8gdXBkYXRlICRhdHRycyBhbmQgJGxpc3RlbmVycyBoYXNoXG4gIC8vIHRoZXNlIGFyZSBhbHNvIHJlYWN0aXZlIHNvIHRoZXkgbWF5IHRyaWdnZXIgY2hpbGQgdXBkYXRlIGlmIHRoZSBjaGlsZFxuICAvLyB1c2VkIHRoZW0gZHVyaW5nIHJlbmRlclxuICB2bS4kYXR0cnMgPSBwYXJlbnRWbm9kZS5kYXRhLmF0dHJzIHx8IGVtcHR5T2JqZWN0O1xuICB2bS4kbGlzdGVuZXJzID0gbGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0O1xuXG4gIC8vIHVwZGF0ZSBwcm9wc1xuICBpZiAocHJvcHNEYXRhICYmIHZtLiRvcHRpb25zLnByb3BzKSB7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKGZhbHNlKTtcbiAgICB2YXIgcHJvcHMgPSB2bS5fcHJvcHM7XG4gICAgdmFyIHByb3BLZXlzID0gdm0uJG9wdGlvbnMuX3Byb3BLZXlzIHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wS2V5c1tpXTtcbiAgICAgIHZhciBwcm9wT3B0aW9ucyA9IHZtLiRvcHRpb25zLnByb3BzOyAvLyB3dGYgZmxvdz9cbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhLCB2bSk7XG4gICAgfVxuICAgIHRvZ2dsZU9ic2VydmluZyh0cnVlKTtcbiAgICAvLyBrZWVwIGEgY29weSBvZiByYXcgcHJvcHNEYXRhXG4gICAgdm0uJG9wdGlvbnMucHJvcHNEYXRhID0gcHJvcHNEYXRhO1xuICB9XG4gIFxuICAvLyBmaXhlZCBieSB4eHh4eHggdXBkYXRlIHByb3BlcnRpZXMobXAgcnVudGltZSlcbiAgdm0uXyR1cGRhdGVQcm9wZXJ0aWVzICYmIHZtLl8kdXBkYXRlUHJvcGVydGllcyh2bSk7XG4gIFxuICAvLyB1cGRhdGUgbGlzdGVuZXJzXG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycyB8fCBlbXB0eU9iamVjdDtcbiAgdmFyIG9sZExpc3RlbmVycyA9IHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XG4gIHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgPSBsaXN0ZW5lcnM7XG4gIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMpO1xuXG4gIC8vIHJlc29sdmUgc2xvdHMgKyBmb3JjZSB1cGRhdGUgaWYgaGFzIGNoaWxkcmVuXG4gIGlmIChuZWVkc0ZvcmNlVXBkYXRlKSB7XG4gICAgdm0uJHNsb3RzID0gcmVzb2x2ZVNsb3RzKHJlbmRlckNoaWxkcmVuLCBwYXJlbnRWbm9kZS5jb250ZXh0KTtcbiAgICB2bS4kZm9yY2VVcGRhdGUoKTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50ID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNJbkluYWN0aXZlVHJlZSAodm0pIHtcbiAgd2hpbGUgKHZtICYmICh2bSA9IHZtLiRwYXJlbnQpKSB7XG4gICAgaWYgKHZtLl9pbmFjdGl2ZSkgeyByZXR1cm4gdHJ1ZSB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQgKHZtLCBkaXJlY3QpIHtcbiAgaWYgKGRpcmVjdCkge1xuICAgIHZtLl9kaXJlY3RJbmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChpc0luSW5hY3RpdmVUcmVlKHZtKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9IGVsc2UgaWYgKHZtLl9kaXJlY3RJbmFjdGl2ZSkge1xuICAgIHJldHVyblxuICB9XG4gIGlmICh2bS5faW5hY3RpdmUgfHwgdm0uX2luYWN0aXZlID09PSBudWxsKSB7XG4gICAgdm0uX2luYWN0aXZlID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQodm0uJGNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdhY3RpdmF0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWFjdGl2YXRlQ2hpbGRDb21wb25lbnQgKHZtLCBkaXJlY3QpIHtcbiAgaWYgKGRpcmVjdCkge1xuICAgIHZtLl9kaXJlY3RJbmFjdGl2ZSA9IHRydWU7XG4gICAgaWYgKGlzSW5JbmFjdGl2ZVRyZWUodm0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgaWYgKCF2bS5faW5hY3RpdmUpIHtcbiAgICB2bS5faW5hY3RpdmUgPSB0cnVlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm0uJGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWFjdGl2YXRlQ2hpbGRDb21wb25lbnQodm0uJGNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdkZWFjdGl2YXRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxIb29rICh2bSwgaG9vaykge1xuICAvLyAjNzU3MyBkaXNhYmxlIGRlcCBjb2xsZWN0aW9uIHdoZW4gaW52b2tpbmcgbGlmZWN5Y2xlIGhvb2tzXG4gIHB1c2hUYXJnZXQoKTtcbiAgdmFyIGhhbmRsZXJzID0gdm0uJG9wdGlvbnNbaG9va107XG4gIHZhciBpbmZvID0gaG9vayArIFwiIGhvb2tcIjtcbiAgaWYgKGhhbmRsZXJzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGludm9rZVdpdGhFcnJvckhhbmRsaW5nKGhhbmRsZXJzW2ldLCB2bSwgbnVsbCwgdm0sIGluZm8pO1xuICAgIH1cbiAgfVxuICBpZiAodm0uX2hhc0hvb2tFdmVudCkge1xuICAgIHZtLiRlbWl0KCdob29rOicgKyBob29rKTtcbiAgfVxuICBwb3BUYXJnZXQoKTtcbn1cblxuLyogICovXG5cbnZhciBNQVhfVVBEQVRFX0NPVU5UID0gMTAwO1xuXG52YXIgcXVldWUgPSBbXTtcbnZhciBhY3RpdmF0ZWRDaGlsZHJlbiA9IFtdO1xudmFyIGhhcyA9IHt9O1xudmFyIGNpcmN1bGFyID0ge307XG52YXIgd2FpdGluZyA9IGZhbHNlO1xudmFyIGZsdXNoaW5nID0gZmFsc2U7XG52YXIgaW5kZXggPSAwO1xuXG4vKipcbiAqIFJlc2V0IHRoZSBzY2hlZHVsZXIncyBzdGF0ZS5cbiAqL1xuZnVuY3Rpb24gcmVzZXRTY2hlZHVsZXJTdGF0ZSAoKSB7XG4gIGluZGV4ID0gcXVldWUubGVuZ3RoID0gYWN0aXZhdGVkQ2hpbGRyZW4ubGVuZ3RoID0gMDtcbiAgaGFzID0ge307XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY2lyY3VsYXIgPSB7fTtcbiAgfVxuICB3YWl0aW5nID0gZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLy8gQXN5bmMgZWRnZSBjYXNlICM2NTY2IHJlcXVpcmVzIHNhdmluZyB0aGUgdGltZXN0YW1wIHdoZW4gZXZlbnQgbGlzdGVuZXJzIGFyZVxuLy8gYXR0YWNoZWQuIEhvd2V2ZXIsIGNhbGxpbmcgcGVyZm9ybWFuY2Uubm93KCkgaGFzIGEgcGVyZiBvdmVyaGVhZCBlc3BlY2lhbGx5XG4vLyBpZiB0aGUgcGFnZSBoYXMgdGhvdXNhbmRzIG9mIGV2ZW50IGxpc3RlbmVycy4gSW5zdGVhZCwgd2UgdGFrZSBhIHRpbWVzdGFtcFxuLy8gZXZlcnkgdGltZSB0aGUgc2NoZWR1bGVyIGZsdXNoZXMgYW5kIHVzZSB0aGF0IGZvciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4vLyBhdHRhY2hlZCBkdXJpbmcgdGhhdCBmbHVzaC5cbnZhciBjdXJyZW50Rmx1c2hUaW1lc3RhbXAgPSAwO1xuXG4vLyBBc3luYyBlZGdlIGNhc2UgZml4IHJlcXVpcmVzIHN0b3JpbmcgYW4gZXZlbnQgbGlzdGVuZXIncyBhdHRhY2ggdGltZXN0YW1wLlxudmFyIGdldE5vdyA9IERhdGUubm93O1xuXG4vLyBEZXRlcm1pbmUgd2hhdCBldmVudCB0aW1lc3RhbXAgdGhlIGJyb3dzZXIgaXMgdXNpbmcuIEFubm95aW5nbHksIHRoZVxuLy8gdGltZXN0YW1wIGNhbiBlaXRoZXIgYmUgaGktcmVzIChyZWxhdGl2ZSB0byBwYWdlIGxvYWQpIG9yIGxvdy1yZXNcbi8vIChyZWxhdGl2ZSB0byBVTklYIGVwb2NoKSwgc28gaW4gb3JkZXIgdG8gY29tcGFyZSB0aW1lIHdlIGhhdmUgdG8gdXNlIHRoZVxuLy8gc2FtZSB0aW1lc3RhbXAgdHlwZSB3aGVuIHNhdmluZyB0aGUgZmx1c2ggdGltZXN0YW1wLlxuLy8gQWxsIElFIHZlcnNpb25zIHVzZSBsb3ctcmVzIGV2ZW50IHRpbWVzdGFtcHMsIGFuZCBoYXZlIHByb2JsZW1hdGljIGNsb2NrXG4vLyBpbXBsZW1lbnRhdGlvbnMgKCM5NjMyKVxuaWYgKGluQnJvd3NlciAmJiAhaXNJRSkge1xuICB2YXIgcGVyZm9ybWFuY2UgPSB3aW5kb3cucGVyZm9ybWFuY2U7XG4gIGlmIChcbiAgICBwZXJmb3JtYW5jZSAmJlxuICAgIHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgPT09ICdmdW5jdGlvbicgJiZcbiAgICBnZXROb3coKSA+IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpLnRpbWVTdGFtcFxuICApIHtcbiAgICAvLyBpZiB0aGUgZXZlbnQgdGltZXN0YW1wLCBhbHRob3VnaCBldmFsdWF0ZWQgQUZURVIgdGhlIERhdGUubm93KCksIGlzXG4gICAgLy8gc21hbGxlciB0aGFuIGl0LCBpdCBtZWFucyB0aGUgZXZlbnQgaXMgdXNpbmcgYSBoaS1yZXMgdGltZXN0YW1wLFxuICAgIC8vIGFuZCB3ZSBuZWVkIHRvIHVzZSB0aGUgaGktcmVzIHZlcnNpb24gZm9yIGV2ZW50IGxpc3RlbmVyIHRpbWVzdGFtcHMgYXNcbiAgICAvLyB3ZWxsLlxuICAgIGdldE5vdyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpOyB9O1xuICB9XG59XG5cbi8qKlxuICogRmx1c2ggYm90aCBxdWV1ZXMgYW5kIHJ1biB0aGUgd2F0Y2hlcnMuXG4gKi9cbmZ1bmN0aW9uIGZsdXNoU2NoZWR1bGVyUXVldWUgKCkge1xuICBjdXJyZW50Rmx1c2hUaW1lc3RhbXAgPSBnZXROb3coKTtcbiAgZmx1c2hpbmcgPSB0cnVlO1xuICB2YXIgd2F0Y2hlciwgaWQ7XG5cbiAgLy8gU29ydCBxdWV1ZSBiZWZvcmUgZmx1c2guXG4gIC8vIFRoaXMgZW5zdXJlcyB0aGF0OlxuICAvLyAxLiBDb21wb25lbnRzIGFyZSB1cGRhdGVkIGZyb20gcGFyZW50IHRvIGNoaWxkLiAoYmVjYXVzZSBwYXJlbnQgaXMgYWx3YXlzXG4gIC8vICAgIGNyZWF0ZWQgYmVmb3JlIHRoZSBjaGlsZClcbiAgLy8gMi4gQSBjb21wb25lbnQncyB1c2VyIHdhdGNoZXJzIGFyZSBydW4gYmVmb3JlIGl0cyByZW5kZXIgd2F0Y2hlciAoYmVjYXVzZVxuICAvLyAgICB1c2VyIHdhdGNoZXJzIGFyZSBjcmVhdGVkIGJlZm9yZSB0aGUgcmVuZGVyIHdhdGNoZXIpXG4gIC8vIDMuIElmIGEgY29tcG9uZW50IGlzIGRlc3Ryb3llZCBkdXJpbmcgYSBwYXJlbnQgY29tcG9uZW50J3Mgd2F0Y2hlciBydW4sXG4gIC8vICAgIGl0cyB3YXRjaGVycyBjYW4gYmUgc2tpcHBlZC5cbiAgcXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5pZCAtIGIuaWQ7IH0pO1xuXG4gIC8vIGRvIG5vdCBjYWNoZSBsZW5ndGggYmVjYXVzZSBtb3JlIHdhdGNoZXJzIG1pZ2h0IGJlIHB1c2hlZFxuICAvLyBhcyB3ZSBydW4gZXhpc3Rpbmcgd2F0Y2hlcnNcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcXVldWUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgd2F0Y2hlciA9IHF1ZXVlW2luZGV4XTtcbiAgICBpZiAod2F0Y2hlci5iZWZvcmUpIHtcbiAgICAgIHdhdGNoZXIuYmVmb3JlKCk7XG4gICAgfVxuICAgIGlkID0gd2F0Y2hlci5pZDtcbiAgICBoYXNbaWRdID0gbnVsbDtcbiAgICB3YXRjaGVyLnJ1bigpO1xuICAgIC8vIGluIGRldiBidWlsZCwgY2hlY2sgYW5kIHN0b3AgY2lyY3VsYXIgdXBkYXRlcy5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBoYXNbaWRdICE9IG51bGwpIHtcbiAgICAgIGNpcmN1bGFyW2lkXSA9IChjaXJjdWxhcltpZF0gfHwgMCkgKyAxO1xuICAgICAgaWYgKGNpcmN1bGFyW2lkXSA+IE1BWF9VUERBVEVfQ09VTlQpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnWW91IG1heSBoYXZlIGFuIGluZmluaXRlIHVwZGF0ZSBsb29wICcgKyAoXG4gICAgICAgICAgICB3YXRjaGVyLnVzZXJcbiAgICAgICAgICAgICAgPyAoXCJpbiB3YXRjaGVyIHdpdGggZXhwcmVzc2lvbiBcXFwiXCIgKyAod2F0Y2hlci5leHByZXNzaW9uKSArIFwiXFxcIlwiKVxuICAgICAgICAgICAgICA6IFwiaW4gYSBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9uLlwiXG4gICAgICAgICAgKSxcbiAgICAgICAgICB3YXRjaGVyLnZtXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8ga2VlcCBjb3BpZXMgb2YgcG9zdCBxdWV1ZXMgYmVmb3JlIHJlc2V0dGluZyBzdGF0ZVxuICB2YXIgYWN0aXZhdGVkUXVldWUgPSBhY3RpdmF0ZWRDaGlsZHJlbi5zbGljZSgpO1xuICB2YXIgdXBkYXRlZFF1ZXVlID0gcXVldWUuc2xpY2UoKTtcblxuICByZXNldFNjaGVkdWxlclN0YXRlKCk7XG5cbiAgLy8gY2FsbCBjb21wb25lbnQgdXBkYXRlZCBhbmQgYWN0aXZhdGVkIGhvb2tzXG4gIGNhbGxBY3RpdmF0ZWRIb29rcyhhY3RpdmF0ZWRRdWV1ZSk7XG4gIGNhbGxVcGRhdGVkSG9va3ModXBkYXRlZFF1ZXVlKTtcblxuICAvLyBkZXZ0b29sIGhvb2tcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChkZXZ0b29scyAmJiBjb25maWcuZGV2dG9vbHMpIHtcbiAgICBkZXZ0b29scy5lbWl0KCdmbHVzaCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxVcGRhdGVkSG9va3MgKHF1ZXVlKSB7XG4gIHZhciBpID0gcXVldWUubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIHdhdGNoZXIgPSBxdWV1ZVtpXTtcbiAgICB2YXIgdm0gPSB3YXRjaGVyLnZtO1xuICAgIGlmICh2bS5fd2F0Y2hlciA9PT0gd2F0Y2hlciAmJiB2bS5faXNNb3VudGVkICYmICF2bS5faXNEZXN0cm95ZWQpIHtcbiAgICAgIGNhbGxIb29rKHZtLCAndXBkYXRlZCcpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFF1ZXVlIGEga2VwdC1hbGl2ZSBjb21wb25lbnQgdGhhdCB3YXMgYWN0aXZhdGVkIGR1cmluZyBwYXRjaC5cbiAqIFRoZSBxdWV1ZSB3aWxsIGJlIHByb2Nlc3NlZCBhZnRlciB0aGUgZW50aXJlIHRyZWUgaGFzIGJlZW4gcGF0Y2hlZC5cbiAqL1xuZnVuY3Rpb24gcXVldWVBY3RpdmF0ZWRDb21wb25lbnQgKHZtKSB7XG4gIC8vIHNldHRpbmcgX2luYWN0aXZlIHRvIGZhbHNlIGhlcmUgc28gdGhhdCBhIHJlbmRlciBmdW5jdGlvbiBjYW5cbiAgLy8gcmVseSBvbiBjaGVja2luZyB3aGV0aGVyIGl0J3MgaW4gYW4gaW5hY3RpdmUgdHJlZSAoZS5nLiByb3V0ZXItdmlldylcbiAgdm0uX2luYWN0aXZlID0gZmFsc2U7XG4gIGFjdGl2YXRlZENoaWxkcmVuLnB1c2godm0pO1xufVxuXG5mdW5jdGlvbiBjYWxsQWN0aXZhdGVkSG9va3MgKHF1ZXVlKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICBxdWV1ZVtpXS5faW5hY3RpdmUgPSB0cnVlO1xuICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQocXVldWVbaV0sIHRydWUgLyogdHJ1ZSAqLyk7XG4gIH1cbn1cblxuLyoqXG4gKiBQdXNoIGEgd2F0Y2hlciBpbnRvIHRoZSB3YXRjaGVyIHF1ZXVlLlxuICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkIHVubGVzcyBpdCdzXG4gKiBwdXNoZWQgd2hlbiB0aGUgcXVldWUgaXMgYmVpbmcgZmx1c2hlZC5cbiAqL1xuZnVuY3Rpb24gcXVldWVXYXRjaGVyICh3YXRjaGVyKSB7XG4gIHZhciBpZCA9IHdhdGNoZXIuaWQ7XG4gIGlmIChoYXNbaWRdID09IG51bGwpIHtcbiAgICBoYXNbaWRdID0gdHJ1ZTtcbiAgICBpZiAoIWZsdXNoaW5nKSB7XG4gICAgICBxdWV1ZS5wdXNoKHdhdGNoZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBhbHJlYWR5IGZsdXNoaW5nLCBzcGxpY2UgdGhlIHdhdGNoZXIgYmFzZWQgb24gaXRzIGlkXG4gICAgICAvLyBpZiBhbHJlYWR5IHBhc3QgaXRzIGlkLCBpdCB3aWxsIGJlIHJ1biBuZXh0IGltbWVkaWF0ZWx5LlxuICAgICAgdmFyIGkgPSBxdWV1ZS5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKGkgPiBpbmRleCAmJiBxdWV1ZVtpXS5pZCA+IHdhdGNoZXIuaWQpIHtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgICAgcXVldWUuc3BsaWNlKGkgKyAxLCAwLCB3YXRjaGVyKTtcbiAgICB9XG4gICAgLy8gcXVldWUgdGhlIGZsdXNoXG4gICAgaWYgKCF3YWl0aW5nKSB7XG4gICAgICB3YWl0aW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIWNvbmZpZy5hc3luYykge1xuICAgICAgICBmbHVzaFNjaGVkdWxlclF1ZXVlKCk7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbmV4dFRpY2soZmx1c2hTY2hlZHVsZXJRdWV1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG5cblxudmFyIHVpZCQyID0gMDtcblxuLyoqXG4gKiBBIHdhdGNoZXIgcGFyc2VzIGFuIGV4cHJlc3Npb24sIGNvbGxlY3RzIGRlcGVuZGVuY2llcyxcbiAqIGFuZCBmaXJlcyBjYWxsYmFjayB3aGVuIHRoZSBleHByZXNzaW9uIHZhbHVlIGNoYW5nZXMuXG4gKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cbiAqL1xudmFyIFdhdGNoZXIgPSBmdW5jdGlvbiBXYXRjaGVyIChcbiAgdm0sXG4gIGV4cE9yRm4sXG4gIGNiLFxuICBvcHRpb25zLFxuICBpc1JlbmRlcldhdGNoZXJcbikge1xuICB0aGlzLnZtID0gdm07XG4gIGlmIChpc1JlbmRlcldhdGNoZXIpIHtcbiAgICB2bS5fd2F0Y2hlciA9IHRoaXM7XG4gIH1cbiAgdm0uX3dhdGNoZXJzLnB1c2godGhpcyk7XG4gIC8vIG9wdGlvbnNcbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZXAgPSAhIW9wdGlvbnMuZGVlcDtcbiAgICB0aGlzLnVzZXIgPSAhIW9wdGlvbnMudXNlcjtcbiAgICB0aGlzLmxhenkgPSAhIW9wdGlvbnMubGF6eTtcbiAgICB0aGlzLnN5bmMgPSAhIW9wdGlvbnMuc3luYztcbiAgICB0aGlzLmJlZm9yZSA9IG9wdGlvbnMuYmVmb3JlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVlcCA9IHRoaXMudXNlciA9IHRoaXMubGF6eSA9IHRoaXMuc3luYyA9IGZhbHNlO1xuICB9XG4gIHRoaXMuY2IgPSBjYjtcbiAgdGhpcy5pZCA9ICsrdWlkJDI7IC8vIHVpZCBmb3IgYmF0Y2hpbmdcbiAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICB0aGlzLmRpcnR5ID0gdGhpcy5sYXp5OyAvLyBmb3IgbGF6eSB3YXRjaGVyc1xuICB0aGlzLmRlcHMgPSBbXTtcbiAgdGhpcy5uZXdEZXBzID0gW107XG4gIHRoaXMuZGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgdGhpcy5uZXdEZXBJZHMgPSBuZXcgX1NldCgpO1xuICB0aGlzLmV4cHJlc3Npb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG4gICAgPyBleHBPckZuLnRvU3RyaW5nKClcbiAgICA6ICcnO1xuICAvLyBwYXJzZSBleHByZXNzaW9uIGZvciBnZXR0ZXJcbiAgaWYgKHR5cGVvZiBleHBPckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5nZXR0ZXIgPSBleHBPckZuO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZ2V0dGVyID0gcGFyc2VQYXRoKGV4cE9yRm4pO1xuICAgIGlmICghdGhpcy5nZXR0ZXIpIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gbm9vcDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJGYWlsZWQgd2F0Y2hpbmcgcGF0aDogXFxcIlwiICsgZXhwT3JGbiArIFwiXFxcIiBcIiArXG4gICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXG4gICAgICAgICdGb3IgZnVsbCBjb250cm9sLCB1c2UgYSBmdW5jdGlvbiBpbnN0ZWFkLicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgfVxuICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5XG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHRoaXMuZ2V0KCk7XG59O1xuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0ICgpIHtcbiAgcHVzaFRhcmdldCh0aGlzKTtcbiAgdmFyIHZhbHVlO1xuICB2YXIgdm0gPSB0aGlzLnZtO1xuICB0cnkge1xuICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIChcImdldHRlciBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgLy8gXCJ0b3VjaFwiIGV2ZXJ5IHByb3BlcnR5IHNvIHRoZXkgYXJlIGFsbCB0cmFja2VkIGFzXG4gICAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gICAgaWYgKHRoaXMuZGVlcCkge1xuICAgICAgdHJhdmVyc2UodmFsdWUpO1xuICAgIH1cbiAgICBwb3BUYXJnZXQoKTtcbiAgICB0aGlzLmNsZWFudXBEZXBzKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59O1xuXG4vKipcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIGFkZERlcCAoZGVwKSB7XG4gIHZhciBpZCA9IGRlcC5pZDtcbiAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoaWQpKSB7XG4gICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKTtcbiAgICB0aGlzLm5ld0RlcHMucHVzaChkZXApO1xuICAgIGlmICghdGhpcy5kZXBJZHMuaGFzKGlkKSkge1xuICAgICAgZGVwLmFkZFN1Yih0aGlzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuY2xlYW51cERlcHMgPSBmdW5jdGlvbiBjbGVhbnVwRGVwcyAoKSB7XG4gIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHZhciBkZXAgPSB0aGlzLmRlcHNbaV07XG4gICAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoZGVwLmlkKSkge1xuICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRtcCA9IHRoaXMuZGVwSWRzO1xuICB0aGlzLmRlcElkcyA9IHRoaXMubmV3RGVwSWRzO1xuICB0aGlzLm5ld0RlcElkcyA9IHRtcDtcbiAgdGhpcy5uZXdEZXBJZHMuY2xlYXIoKTtcbiAgdG1wID0gdGhpcy5kZXBzO1xuICB0aGlzLmRlcHMgPSB0aGlzLm5ld0RlcHM7XG4gIHRoaXMubmV3RGVwcyA9IHRtcDtcbiAgdGhpcy5uZXdEZXBzLmxlbmd0aCA9IDA7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZXIgaW50ZXJmYWNlLlxuICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHRoaXMubGF6eSkge1xuICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHRoaXMuc3luYykge1xuICAgIHRoaXMucnVuKCk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVXYXRjaGVyKHRoaXMpO1xuICB9XG59O1xuXG4vKipcbiAqIFNjaGVkdWxlciBqb2IgaW50ZXJmYWNlLlxuICogV2lsbCBiZSBjYWxsZWQgYnkgdGhlIHNjaGVkdWxlci5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gcnVuICgpIHtcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5nZXQoKTtcbiAgICBpZiAoXG4gICAgICB2YWx1ZSAhPT0gdGhpcy52YWx1ZSB8fFxuICAgICAgLy8gRGVlcCB3YXRjaGVycyBhbmQgd2F0Y2hlcnMgb24gT2JqZWN0L0FycmF5cyBzaG91bGQgZmlyZSBldmVuXG4gICAgICAvLyB3aGVuIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZSwgYmVjYXVzZSB0aGUgdmFsdWUgbWF5XG4gICAgICAvLyBoYXZlIG11dGF0ZWQuXG4gICAgICBpc09iamVjdCh2YWx1ZSkgfHxcbiAgICAgIHRoaXMuZGVlcFxuICAgICkge1xuICAgICAgLy8gc2V0IG5ldyB2YWx1ZVxuICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnVzZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHRoaXMudm0sIChcImNhbGxiYWNrIGZvciB3YXRjaGVyIFxcXCJcIiArICh0aGlzLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSB2YWx1ZSBvZiB0aGUgd2F0Y2hlci5cbiAqIFRoaXMgb25seSBnZXRzIGNhbGxlZCBmb3IgbGF6eSB3YXRjaGVycy5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiBldmFsdWF0ZSAoKSB7XG4gIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpO1xuICB0aGlzLmRpcnR5ID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIERlcGVuZCBvbiBhbGwgZGVwcyBjb2xsZWN0ZWQgYnkgdGhpcyB3YXRjaGVyLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiBkZXBlbmQgKCkge1xuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB0aGlzLmRlcHNbaV0uZGVwZW5kKCk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJzY3JpYmVyIGxpc3QuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnRlYXJkb3duID0gZnVuY3Rpb24gdGVhcmRvd24gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG4gICAgLy8gdGhpcyBpcyBhIHNvbWV3aGF0IGV4cGVuc2l2ZSBvcGVyYXRpb24gc28gd2Ugc2tpcCBpdFxuICAgIC8vIGlmIHRoZSB2bSBpcyBiZWluZyBkZXN0cm95ZWQuXG4gICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICByZW1vdmUodGhpcy52bS5fd2F0Y2hlcnMsIHRoaXMpO1xuICAgIH1cbiAgICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufTtcblxuLyogICovXG5cbnZhciBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24gPSB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBub29wLFxuICBzZXQ6IG5vb3Bcbn07XG5cbmZ1bmN0aW9uIHByb3h5ICh0YXJnZXQsIHNvdXJjZUtleSwga2V5KSB7XG4gIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXNbc291cmNlS2V5XVtrZXldXG4gIH07XG4gIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG4gICAgdGhpc1tzb3VyY2VLZXldW2tleV0gPSB2YWw7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbn1cblxuZnVuY3Rpb24gaW5pdFN0YXRlICh2bSkge1xuICB2bS5fd2F0Y2hlcnMgPSBbXTtcbiAgdmFyIG9wdHMgPSB2bS4kb3B0aW9ucztcbiAgaWYgKG9wdHMucHJvcHMpIHsgaW5pdFByb3BzKHZtLCBvcHRzLnByb3BzKTsgfVxuICBpZiAob3B0cy5tZXRob2RzKSB7IGluaXRNZXRob2RzKHZtLCBvcHRzLm1ldGhvZHMpOyB9XG4gIGlmIChvcHRzLmRhdGEpIHtcbiAgICBpbml0RGF0YSh2bSk7XG4gIH0gZWxzZSB7XG4gICAgb2JzZXJ2ZSh2bS5fZGF0YSA9IHt9LCB0cnVlIC8qIGFzUm9vdERhdGEgKi8pO1xuICB9XG4gIGlmIChvcHRzLmNvbXB1dGVkKSB7IGluaXRDb21wdXRlZCh2bSwgb3B0cy5jb21wdXRlZCk7IH1cbiAgaWYgKG9wdHMud2F0Y2ggJiYgb3B0cy53YXRjaCAhPT0gbmF0aXZlV2F0Y2gpIHtcbiAgICBpbml0V2F0Y2godm0sIG9wdHMud2F0Y2gpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRQcm9wcyAodm0sIHByb3BzT3B0aW9ucykge1xuICB2YXIgcHJvcHNEYXRhID0gdm0uJG9wdGlvbnMucHJvcHNEYXRhIHx8IHt9O1xuICB2YXIgcHJvcHMgPSB2bS5fcHJvcHMgPSB7fTtcbiAgLy8gY2FjaGUgcHJvcCBrZXlzIHNvIHRoYXQgZnV0dXJlIHByb3BzIHVwZGF0ZXMgY2FuIGl0ZXJhdGUgdXNpbmcgQXJyYXlcbiAgLy8gaW5zdGVhZCBvZiBkeW5hbWljIG9iamVjdCBrZXkgZW51bWVyYXRpb24uXG4gIHZhciBrZXlzID0gdm0uJG9wdGlvbnMuX3Byb3BLZXlzID0gW107XG4gIHZhciBpc1Jvb3QgPSAhdm0uJHBhcmVudDtcbiAgLy8gcm9vdCBpbnN0YW5jZSBwcm9wcyBzaG91bGQgYmUgY29udmVydGVkXG4gIGlmICghaXNSb290KSB7XG4gICAgdG9nZ2xlT2JzZXJ2aW5nKGZhbHNlKTtcbiAgfVxuICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgga2V5ICkge1xuICAgIGtleXMucHVzaChrZXkpO1xuICAgIHZhciB2YWx1ZSA9IHZhbGlkYXRlUHJvcChrZXksIHByb3BzT3B0aW9ucywgcHJvcHNEYXRhLCB2bSk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGh5cGhlbmF0ZWRLZXkgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgIGlmIChpc1Jlc2VydmVkQXR0cmlidXRlKGh5cGhlbmF0ZWRLZXkpIHx8XG4gICAgICAgICAgY29uZmlnLmlzUmVzZXJ2ZWRBdHRyKGh5cGhlbmF0ZWRLZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiXFxcIlwiICsgaHlwaGVuYXRlZEtleSArIFwiXFxcIiBpcyBhIHJlc2VydmVkIGF0dHJpYnV0ZSBhbmQgY2Fubm90IGJlIHVzZWQgYXMgY29tcG9uZW50IHByb3AuXCIpLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZpbmVSZWFjdGl2ZSQkMShwcm9wcywga2V5LCB2YWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlzUm9vdCAmJiAhaXNVcGRhdGluZ0NoaWxkQ29tcG9uZW50KSB7XG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYodm0ubXBIb3N0ID09PSAnbXAtYmFpZHUnIHx8IHZtLm1wSG9zdCA9PT0gJ21wLWt1YWlzaG91JyB8fCB2bS5tcEhvc3QgPT09ICdtcC14aHMnKXsvL+eZvuW6puOAgeW/q+aJi+OAgeWwj+e6ouS5piBvYnNlcnZlciDlnKggc2V0RGF0YSBjYWxsYmFjayDkuYvlkI7op6blj5HvvIznm7TmjqXlv73nlaXor6Ugd2FyblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9maXhlZCBieSB4eHh4eHggX19uZXh0X3RpY2tfcGVuZGluZyx1bmk6Ly9mb3JtLWZpZWxkIOaXtuS4jeWRiuitplxuICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAga2V5ID09PSAndmFsdWUnICYmIFxuICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodm0uJG9wdGlvbnMuYmVoYXZpb3JzKSAmJlxuICAgICAgICAgICAgICAgIHZtLiRvcHRpb25zLmJlaGF2aW9ycy5pbmRleE9mKCd1bmk6Ly9mb3JtLWZpZWxkJykgIT09IC0xXG4gICAgICAgICAgICAgICl7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodm0uX2dldEZvcm1EYXRhKXtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgJHBhcmVudCA9IHZtLiRwYXJlbnQ7XG4gICAgICAgICAgICB3aGlsZSgkcGFyZW50KXtcbiAgICAgICAgICAgICAgaWYoJHBhcmVudC5fX25leHRfdGlja19wZW5kaW5nKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gIFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRwYXJlbnQgPSAkcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICBcIkF2b2lkIG11dGF0aW5nIGEgcHJvcCBkaXJlY3RseSBzaW5jZSB0aGUgdmFsdWUgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICBcIm92ZXJ3cml0dGVuIHdoZW5ldmVyIHRoZSBwYXJlbnQgY29tcG9uZW50IHJlLXJlbmRlcnMuIFwiICtcbiAgICAgICAgICAgIFwiSW5zdGVhZCwgdXNlIGEgZGF0YSBvciBjb21wdXRlZCBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcHJvcCdzIFwiICtcbiAgICAgICAgICAgIFwidmFsdWUuIFByb3AgYmVpbmcgbXV0YXRlZDogXFxcIlwiICsga2V5ICsgXCJcXFwiXCIsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbmVSZWFjdGl2ZSQkMShwcm9wcywga2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIC8vIHN0YXRpYyBwcm9wcyBhcmUgYWxyZWFkeSBwcm94aWVkIG9uIHRoZSBjb21wb25lbnQncyBwcm90b3R5cGVcbiAgICAvLyBkdXJpbmcgVnVlLmV4dGVuZCgpLiBXZSBvbmx5IG5lZWQgdG8gcHJveHkgcHJvcHMgZGVmaW5lZCBhdFxuICAgIC8vIGluc3RhbnRpYXRpb24gaGVyZS5cbiAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICBwcm94eSh2bSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3BzT3B0aW9ucykgbG9vcCgga2V5ICk7XG4gIHRvZ2dsZU9ic2VydmluZyh0cnVlKTtcbn1cblxuZnVuY3Rpb24gaW5pdERhdGEgKHZtKSB7XG4gIHZhciBkYXRhID0gdm0uJG9wdGlvbnMuZGF0YTtcbiAgZGF0YSA9IHZtLl9kYXRhID0gdHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbidcbiAgICA/IGdldERhdGEoZGF0YSwgdm0pXG4gICAgOiBkYXRhIHx8IHt9O1xuICBpZiAoIWlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICBkYXRhID0ge307XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgJ2RhdGEgZnVuY3Rpb25zIHNob3VsZCByZXR1cm4gYW4gb2JqZWN0OlxcbicgK1xuICAgICAgJ2h0dHBzOi8vdnVlanMub3JnL3YyL2d1aWRlL2NvbXBvbmVudHMuaHRtbCNkYXRhLU11c3QtQmUtYS1GdW5jdGlvbicsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbiAgLy8gcHJveHkgZGF0YSBvbiBpbnN0YW5jZVxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgdmFyIG1ldGhvZHMgPSB2bS4kb3B0aW9ucy5tZXRob2RzO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChtZXRob2RzICYmIGhhc093bihtZXRob2RzLCBrZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBkYXRhIHByb3BlcnR5LlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXkpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIFwiVGhlIGRhdGEgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGFscmVhZHkgZGVjbGFyZWQgYXMgYSBwcm9wLiBcIiArXG4gICAgICAgIFwiVXNlIHByb3AgZGVmYXVsdCB2YWx1ZSBpbnN0ZWFkLlwiLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFpc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgIHByb3h5KHZtLCBcIl9kYXRhXCIsIGtleSk7XG4gICAgfVxuICB9XG4gIC8vIG9ic2VydmUgZGF0YVxuICBvYnNlcnZlKGRhdGEsIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG59XG5cbmZ1bmN0aW9uIGdldERhdGEgKGRhdGEsIHZtKSB7XG4gIC8vICM3NTczIGRpc2FibGUgZGVwIGNvbGxlY3Rpb24gd2hlbiBpbnZva2luZyBkYXRhIGdldHRlcnNcbiAgcHVzaFRhcmdldCgpO1xuICB0cnkge1xuICAgIHJldHVybiBkYXRhLmNhbGwodm0sIHZtKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaGFuZGxlRXJyb3IoZSwgdm0sIFwiZGF0YSgpXCIpO1xuICAgIHJldHVybiB7fVxuICB9IGZpbmFsbHkge1xuICAgIHBvcFRhcmdldCgpO1xuICB9XG59XG5cbnZhciBjb21wdXRlZFdhdGNoZXJPcHRpb25zID0geyBsYXp5OiB0cnVlIH07XG5cbmZ1bmN0aW9uIGluaXRDb21wdXRlZCAodm0sIGNvbXB1dGVkKSB7XG4gIC8vICRmbG93LWRpc2FibGUtbGluZVxuICB2YXIgd2F0Y2hlcnMgPSB2bS5fY29tcHV0ZWRXYXRjaGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIC8vIGNvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGp1c3QgZ2V0dGVycyBkdXJpbmcgU1NSXG4gIHZhciBpc1NTUiA9IGlzU2VydmVyUmVuZGVyaW5nKCk7XG5cbiAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgdmFyIHVzZXJEZWYgPSBjb21wdXRlZFtrZXldO1xuICAgIHZhciBnZXR0ZXIgPSB0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJyA/IHVzZXJEZWYgOiB1c2VyRGVmLmdldDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBnZXR0ZXIgPT0gbnVsbCkge1xuICAgICAgd2FybihcbiAgICAgICAgKFwiR2V0dGVyIGlzIG1pc3NpbmcgZm9yIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIi5cIiksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghaXNTU1IpIHtcbiAgICAgIC8vIGNyZWF0ZSBpbnRlcm5hbCB3YXRjaGVyIGZvciB0aGUgY29tcHV0ZWQgcHJvcGVydHkuXG4gICAgICB3YXRjaGVyc1trZXldID0gbmV3IFdhdGNoZXIoXG4gICAgICAgIHZtLFxuICAgICAgICBnZXR0ZXIgfHwgbm9vcCxcbiAgICAgICAgbm9vcCxcbiAgICAgICAgY29tcHV0ZWRXYXRjaGVyT3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjb21wb25lbnQtZGVmaW5lZCBjb21wdXRlZCBwcm9wZXJ0aWVzIGFyZSBhbHJlYWR5IGRlZmluZWQgb24gdGhlXG4gICAgLy8gY29tcG9uZW50IHByb3RvdHlwZS4gV2Ugb25seSBuZWVkIHRvIGRlZmluZSBjb21wdXRlZCBwcm9wZXJ0aWVzIGRlZmluZWRcbiAgICAvLyBhdCBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgaWYgKCEoa2V5IGluIHZtKSkge1xuICAgICAgZGVmaW5lQ29tcHV0ZWQodm0sIGtleSwgdXNlckRlZik7XG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoa2V5IGluIHZtLiRkYXRhKSB7XG4gICAgICAgIHdhcm4oKFwiVGhlIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlZmluZWQgaW4gZGF0YS5cIiksIHZtKTtcbiAgICAgIH0gZWxzZSBpZiAodm0uJG9wdGlvbnMucHJvcHMgJiYga2V5IGluIHZtLiRvcHRpb25zLnByb3BzKSB7XG4gICAgICAgIHdhcm4oKFwiVGhlIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlZmluZWQgYXMgYSBwcm9wLlwiKSwgdm0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVDb21wdXRlZCAoXG4gIHRhcmdldCxcbiAga2V5LFxuICB1c2VyRGVmXG4pIHtcbiAgdmFyIHNob3VsZENhY2hlID0gIWlzU2VydmVyUmVuZGVyaW5nKCk7XG4gIGlmICh0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSBzaG91bGRDYWNoZVxuICAgICAgPyBjcmVhdGVDb21wdXRlZEdldHRlcihrZXkpXG4gICAgICA6IGNyZWF0ZUdldHRlckludm9rZXIodXNlckRlZik7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IG5vb3A7XG4gIH0gZWxzZSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IHVzZXJEZWYuZ2V0XG4gICAgICA/IHNob3VsZENhY2hlICYmIHVzZXJEZWYuY2FjaGUgIT09IGZhbHNlXG4gICAgICAgID8gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIoa2V5KVxuICAgICAgICA6IGNyZWF0ZUdldHRlckludm9rZXIodXNlckRlZi5nZXQpXG4gICAgICA6IG5vb3A7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IHVzZXJEZWYuc2V0IHx8IG5vb3A7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPT09IG5vb3ApIHtcbiAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgd2FybihcbiAgICAgICAgKFwiQ29tcHV0ZWQgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBhc3NpZ25lZCB0byBidXQgaXQgaGFzIG5vIHNldHRlci5cIiksXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVkR2V0dGVyIChrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXB1dGVkR2V0dGVyICgpIHtcbiAgICB2YXIgd2F0Y2hlciA9IHRoaXMuX2NvbXB1dGVkV2F0Y2hlcnMgJiYgdGhpcy5fY29tcHV0ZWRXYXRjaGVyc1trZXldO1xuICAgIGlmICh3YXRjaGVyKSB7XG4gICAgICBpZiAod2F0Y2hlci5kaXJ0eSkge1xuICAgICAgICB3YXRjaGVyLmV2YWx1YXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAoRGVwLlNoYXJlZE9iamVjdC50YXJnZXQpIHsvLyBmaXhlZCBieSB4eHh4eHhcbiAgICAgICAgd2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRjaGVyLnZhbHVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdldHRlckludm9rZXIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXB1dGVkR2V0dGVyICgpIHtcbiAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCB0aGlzKVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRNZXRob2RzICh2bSwgbWV0aG9kcykge1xuICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiBtZXRob2RzW2tleV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIHR5cGUgXFxcIlwiICsgKHR5cGVvZiBtZXRob2RzW2tleV0pICsgXCJcXFwiIGluIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbi4gXCIgK1xuICAgICAgICAgIFwiRGlkIHlvdSByZWZlcmVuY2UgdGhlIGZ1bmN0aW9uIGNvcnJlY3RseT9cIixcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BzICYmIGhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkIGFzIGEgcHJvcC5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICgoa2V5IGluIHZtKSAmJiBpc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgY29uZmxpY3RzIHdpdGggYW4gZXhpc3RpbmcgVnVlIGluc3RhbmNlIG1ldGhvZC4gXCIgK1xuICAgICAgICAgIFwiQXZvaWQgZGVmaW5pbmcgY29tcG9uZW50IG1ldGhvZHMgdGhhdCBzdGFydCB3aXRoIF8gb3IgJC5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB2bVtrZXldID0gdHlwZW9mIG1ldGhvZHNba2V5XSAhPT0gJ2Z1bmN0aW9uJyA/IG5vb3AgOiBiaW5kKG1ldGhvZHNba2V5XSwgdm0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRXYXRjaCAodm0sIHdhdGNoKSB7XG4gIGZvciAodmFyIGtleSBpbiB3YXRjaCkge1xuICAgIHZhciBoYW5kbGVyID0gd2F0Y2hba2V5XTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoYW5kbGVyKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVdhdGNoZXIodm0sIGtleSwgaGFuZGxlcltpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVdhdGNoZXIodm0sIGtleSwgaGFuZGxlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdhdGNoZXIgKFxuICB2bSxcbiAgZXhwT3JGbixcbiAgaGFuZGxlcixcbiAgb3B0aW9uc1xuKSB7XG4gIGlmIChpc1BsYWluT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgb3B0aW9ucyA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IGhhbmRsZXIuaGFuZGxlcjtcbiAgfVxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgaGFuZGxlciA9IHZtW2hhbmRsZXJdO1xuICB9XG4gIHJldHVybiB2bS4kd2F0Y2goZXhwT3JGbiwgaGFuZGxlciwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XG4gIC8vIGZsb3cgc29tZWhvdyBoYXMgcHJvYmxlbXMgd2l0aCBkaXJlY3RseSBkZWNsYXJlZCBkZWZpbml0aW9uIG9iamVjdFxuICAvLyB3aGVuIHVzaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSwgc28gd2UgaGF2ZSB0byBwcm9jZWR1cmFsbHkgYnVpbGQgdXBcbiAgLy8gdGhlIG9iamVjdCBoZXJlLlxuICB2YXIgZGF0YURlZiA9IHt9O1xuICBkYXRhRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2RhdGEgfTtcbiAgdmFyIHByb3BzRGVmID0ge307XG4gIHByb3BzRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3Byb3BzIH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZGF0YURlZi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnQXZvaWQgcmVwbGFjaW5nIGluc3RhbmNlIHJvb3QgJGRhdGEuICcgK1xuICAgICAgICAnVXNlIG5lc3RlZCBkYXRhIHByb3BlcnRpZXMgaW5zdGVhZC4nLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH07XG4gICAgcHJvcHNEZWYuc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgd2FybihcIiRwcm9wcyBpcyByZWFkb25seS5cIiwgdGhpcyk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRkYXRhJywgZGF0YURlZik7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJHByb3BzJywgcHJvcHNEZWYpO1xuXG4gIFZ1ZS5wcm90b3R5cGUuJHNldCA9IHNldDtcbiAgVnVlLnByb3RvdHlwZS4kZGVsZXRlID0gZGVsO1xuXG4gIFZ1ZS5wcm90b3R5cGUuJHdhdGNoID0gZnVuY3Rpb24gKFxuICAgIGV4cE9yRm4sXG4gICAgY2IsXG4gICAgb3B0aW9uc1xuICApIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIGlmIChpc1BsYWluT2JqZWN0KGNiKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKVxuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVzZXIgPSB0cnVlO1xuICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5pbW1lZGlhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNiLmNhbGwodm0sIHdhdGNoZXIudmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoZXJyb3IsIHZtLCAoXCJjYWxsYmFjayBmb3IgaW1tZWRpYXRlIHdhdGNoZXIgXFxcIlwiICsgKHdhdGNoZXIuZXhwcmVzc2lvbikgKyBcIlxcXCJcIikpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gdW53YXRjaEZuICgpIHtcbiAgICAgIHdhdGNoZXIudGVhcmRvd24oKTtcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG52YXIgdWlkJDMgPSAwO1xuXG5mdW5jdGlvbiBpbml0TWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIC8vIGEgdWlkXG4gICAgdm0uX3VpZCA9IHVpZCQzKys7XG5cbiAgICB2YXIgc3RhcnRUYWcsIGVuZFRhZztcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcucGVyZm9ybWFuY2UgJiYgbWFyaykge1xuICAgICAgc3RhcnRUYWcgPSBcInZ1ZS1wZXJmLXN0YXJ0OlwiICsgKHZtLl91aWQpO1xuICAgICAgZW5kVGFnID0gXCJ2dWUtcGVyZi1lbmQ6XCIgKyAodm0uX3VpZCk7XG4gICAgICBtYXJrKHN0YXJ0VGFnKTtcbiAgICB9XG5cbiAgICAvLyBhIGZsYWcgdG8gYXZvaWQgdGhpcyBiZWluZyBvYnNlcnZlZFxuICAgIHZtLl9pc1Z1ZSA9IHRydWU7XG4gICAgLy8gbWVyZ2Ugb3B0aW9uc1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuX2lzQ29tcG9uZW50KSB7XG4gICAgICAvLyBvcHRpbWl6ZSBpbnRlcm5hbCBjb21wb25lbnQgaW5zdGFudGlhdGlvblxuICAgICAgLy8gc2luY2UgZHluYW1pYyBvcHRpb25zIG1lcmdpbmcgaXMgcHJldHR5IHNsb3csIGFuZCBub25lIG9mIHRoZVxuICAgICAgLy8gaW50ZXJuYWwgY29tcG9uZW50IG9wdGlvbnMgbmVlZHMgc3BlY2lhbCB0cmVhdG1lbnQuXG4gICAgICBpbml0SW50ZXJuYWxDb21wb25lbnQodm0sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bS4kb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcbiAgICAgICAgcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyh2bS5jb25zdHJ1Y3RvciksXG4gICAgICAgIG9wdGlvbnMgfHwge30sXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpbml0UHJveHkodm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2bS5fcmVuZGVyUHJveHkgPSB2bTtcbiAgICB9XG4gICAgLy8gZXhwb3NlIHJlYWwgc2VsZlxuICAgIHZtLl9zZWxmID0gdm07XG4gICAgaW5pdExpZmVjeWNsZSh2bSk7XG4gICAgaW5pdEV2ZW50cyh2bSk7XG4gICAgaW5pdFJlbmRlcih2bSk7XG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVDcmVhdGUnKTtcbiAgICAhdm0uXyRmYWxsYmFjayAmJiBpbml0SW5qZWN0aW9ucyh2bSk7IC8vIHJlc29sdmUgaW5qZWN0aW9ucyBiZWZvcmUgZGF0YS9wcm9wcyAgXG4gICAgaW5pdFN0YXRlKHZtKTtcbiAgICAhdm0uXyRmYWxsYmFjayAmJiBpbml0UHJvdmlkZSh2bSk7IC8vIHJlc29sdmUgcHJvdmlkZSBhZnRlciBkYXRhL3Byb3BzXG4gICAgIXZtLl8kZmFsbGJhY2sgJiYgY2FsbEhvb2sodm0sICdjcmVhdGVkJyk7ICAgICAgXG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcucGVyZm9ybWFuY2UgJiYgbWFyaykge1xuICAgICAgdm0uX25hbWUgPSBmb3JtYXRDb21wb25lbnROYW1lKHZtLCBmYWxzZSk7XG4gICAgICBtYXJrKGVuZFRhZyk7XG4gICAgICBtZWFzdXJlKChcInZ1ZSBcIiArICh2bS5fbmFtZSkgKyBcIiBpbml0XCIpLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICB9XG5cbiAgICBpZiAodm0uJG9wdGlvbnMuZWwpIHtcbiAgICAgIHZtLiRtb3VudCh2bS4kb3B0aW9ucy5lbCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0SW50ZXJuYWxDb21wb25lbnQgKHZtLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gdm0uJG9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHZtLmNvbnN0cnVjdG9yLm9wdGlvbnMpO1xuICAvLyBkb2luZyB0aGlzIGJlY2F1c2UgaXQncyBmYXN0ZXIgdGhhbiBkeW5hbWljIGVudW1lcmF0aW9uLlxuICB2YXIgcGFyZW50Vm5vZGUgPSBvcHRpb25zLl9wYXJlbnRWbm9kZTtcbiAgb3B0cy5wYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcbiAgb3B0cy5fcGFyZW50Vm5vZGUgPSBwYXJlbnRWbm9kZTtcblxuICB2YXIgdm5vZGVDb21wb25lbnRPcHRpb25zID0gcGFyZW50Vm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgb3B0cy5wcm9wc0RhdGEgPSB2bm9kZUNvbXBvbmVudE9wdGlvbnMucHJvcHNEYXRhO1xuICBvcHRzLl9wYXJlbnRMaXN0ZW5lcnMgPSB2bm9kZUNvbXBvbmVudE9wdGlvbnMubGlzdGVuZXJzO1xuICBvcHRzLl9yZW5kZXJDaGlsZHJlbiA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy5jaGlsZHJlbjtcbiAgb3B0cy5fY29tcG9uZW50VGFnID0gdm5vZGVDb21wb25lbnRPcHRpb25zLnRhZztcblxuICBpZiAob3B0aW9ucy5yZW5kZXIpIHtcbiAgICBvcHRzLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyO1xuICAgIG9wdHMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyAoQ3Rvcikge1xuICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgaWYgKEN0b3Iuc3VwZXIpIHtcbiAgICB2YXIgc3VwZXJPcHRpb25zID0gcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyhDdG9yLnN1cGVyKTtcbiAgICB2YXIgY2FjaGVkU3VwZXJPcHRpb25zID0gQ3Rvci5zdXBlck9wdGlvbnM7XG4gICAgaWYgKHN1cGVyT3B0aW9ucyAhPT0gY2FjaGVkU3VwZXJPcHRpb25zKSB7XG4gICAgICAvLyBzdXBlciBvcHRpb24gY2hhbmdlZCxcbiAgICAgIC8vIG5lZWQgdG8gcmVzb2x2ZSBuZXcgb3B0aW9ucy5cbiAgICAgIEN0b3Iuc3VwZXJPcHRpb25zID0gc3VwZXJPcHRpb25zO1xuICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSBsYXRlLW1vZGlmaWVkL2F0dGFjaGVkIG9wdGlvbnMgKCM0OTc2KVxuICAgICAgdmFyIG1vZGlmaWVkT3B0aW9ucyA9IHJlc29sdmVNb2RpZmllZE9wdGlvbnMoQ3Rvcik7XG4gICAgICAvLyB1cGRhdGUgYmFzZSBleHRlbmQgb3B0aW9uc1xuICAgICAgaWYgKG1vZGlmaWVkT3B0aW9ucykge1xuICAgICAgICBleHRlbmQoQ3Rvci5leHRlbmRPcHRpb25zLCBtb2RpZmllZE9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhzdXBlck9wdGlvbnMsIEN0b3IuZXh0ZW5kT3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIG9wdGlvbnMuY29tcG9uZW50c1tvcHRpb25zLm5hbWVdID0gQ3RvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnNcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyAoQ3Rvcikge1xuICB2YXIgbW9kaWZpZWQ7XG4gIHZhciBsYXRlc3QgPSBDdG9yLm9wdGlvbnM7XG4gIHZhciBzZWFsZWQgPSBDdG9yLnNlYWxlZE9wdGlvbnM7XG4gIGZvciAodmFyIGtleSBpbiBsYXRlc3QpIHtcbiAgICBpZiAobGF0ZXN0W2tleV0gIT09IHNlYWxlZFtrZXldKSB7XG4gICAgICBpZiAoIW1vZGlmaWVkKSB7IG1vZGlmaWVkID0ge307IH1cbiAgICAgIG1vZGlmaWVkW2tleV0gPSBsYXRlc3Rba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vZGlmaWVkXG59XG5cbmZ1bmN0aW9uIFZ1ZSAob3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICEodGhpcyBpbnN0YW5jZW9mIFZ1ZSlcbiAgKSB7XG4gICAgd2FybignVnVlIGlzIGEgY29uc3RydWN0b3IgYW5kIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgYG5ld2Aga2V5d29yZCcpO1xuICB9XG4gIHRoaXMuX2luaXQob3B0aW9ucyk7XG59XG5cbmluaXRNaXhpbihWdWUpO1xuc3RhdGVNaXhpbihWdWUpO1xuZXZlbnRzTWl4aW4oVnVlKTtcbmxpZmVjeWNsZU1peGluKFZ1ZSk7XG5yZW5kZXJNaXhpbihWdWUpO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdFVzZSAoVnVlKSB7XG4gIFZ1ZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgdmFyIGluc3RhbGxlZFBsdWdpbnMgPSAodGhpcy5faW5zdGFsbGVkUGx1Z2lucyB8fCAodGhpcy5faW5zdGFsbGVkUGx1Z2lucyA9IFtdKSk7XG4gICAgaWYgKGluc3RhbGxlZFBsdWdpbnMuaW5kZXhPZihwbHVnaW4pID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLy8gYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgYXJncy51bnNoaWZ0KHRoaXMpO1xuICAgIGlmICh0eXBlb2YgcGx1Z2luLmluc3RhbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHBsdWdpbi5pbnN0YWxsLmFwcGx5KHBsdWdpbiwgYXJncyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICAgIGluc3RhbGxlZFBsdWdpbnMucHVzaChwbHVnaW4pO1xuICAgIHJldHVybiB0aGlzXG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0TWl4aW4kMSAoVnVlKSB7XG4gIFZ1ZS5taXhpbiA9IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh0aGlzLm9wdGlvbnMsIG1peGluKTtcbiAgICByZXR1cm4gdGhpc1xuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEV4dGVuZCAoVnVlKSB7XG4gIC8qKlxuICAgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcbiAgICogY2lkLiBUaGlzIGVuYWJsZXMgdXMgdG8gY3JlYXRlIHdyYXBwZWQgXCJjaGlsZFxuICAgKiBjb25zdHJ1Y3RvcnNcIiBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZSBhbmQgY2FjaGUgdGhlbS5cbiAgICovXG4gIFZ1ZS5jaWQgPSAwO1xuICB2YXIgY2lkID0gMTtcblxuICAvKipcbiAgICogQ2xhc3MgaW5oZXJpdGFuY2VcbiAgICovXG4gIFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5kT3B0aW9ucykge1xuICAgIGV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zIHx8IHt9O1xuICAgIHZhciBTdXBlciA9IHRoaXM7XG4gICAgdmFyIFN1cGVySWQgPSBTdXBlci5jaWQ7XG4gICAgdmFyIGNhY2hlZEN0b3JzID0gZXh0ZW5kT3B0aW9ucy5fQ3RvciB8fCAoZXh0ZW5kT3B0aW9ucy5fQ3RvciA9IHt9KTtcbiAgICBpZiAoY2FjaGVkQ3RvcnNbU3VwZXJJZF0pIHtcbiAgICAgIHJldHVybiBjYWNoZWRDdG9yc1tTdXBlcklkXVxuICAgIH1cblxuICAgIHZhciBuYW1lID0gZXh0ZW5kT3B0aW9ucy5uYW1lIHx8IFN1cGVyLm9wdGlvbnMubmFtZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBuYW1lKSB7XG4gICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUobmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIFN1YiA9IGZ1bmN0aW9uIFZ1ZUNvbXBvbmVudCAob3B0aW9ucykge1xuICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICB9O1xuICAgIFN1Yi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyLnByb3RvdHlwZSk7XG4gICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcbiAgICBTdWIuY2lkID0gY2lkKys7XG4gICAgU3ViLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG4gICAgICBTdXBlci5vcHRpb25zLFxuICAgICAgZXh0ZW5kT3B0aW9uc1xuICAgICk7XG4gICAgU3ViWydzdXBlciddID0gU3VwZXI7XG5cbiAgICAvLyBGb3IgcHJvcHMgYW5kIGNvbXB1dGVkIHByb3BlcnRpZXMsIHdlIGRlZmluZSB0aGUgcHJveHkgZ2V0dGVycyBvblxuICAgIC8vIHRoZSBWdWUgaW5zdGFuY2VzIGF0IGV4dGVuc2lvbiB0aW1lLCBvbiB0aGUgZXh0ZW5kZWQgcHJvdG90eXBlLiBUaGlzXG4gICAgLy8gYXZvaWRzIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxscyBmb3IgZWFjaCBpbnN0YW5jZSBjcmVhdGVkLlxuICAgIGlmIChTdWIub3B0aW9ucy5wcm9wcykge1xuICAgICAgaW5pdFByb3BzJDEoU3ViKTtcbiAgICB9XG4gICAgaWYgKFN1Yi5vcHRpb25zLmNvbXB1dGVkKSB7XG4gICAgICBpbml0Q29tcHV0ZWQkMShTdWIpO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGZ1cnRoZXIgZXh0ZW5zaW9uL21peGluL3BsdWdpbiB1c2FnZVxuICAgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmQ7XG4gICAgU3ViLm1peGluID0gU3VwZXIubWl4aW47XG4gICAgU3ViLnVzZSA9IFN1cGVyLnVzZTtcblxuICAgIC8vIGNyZWF0ZSBhc3NldCByZWdpc3RlcnMsIHNvIGV4dGVuZGVkIGNsYXNzZXNcbiAgICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXG4gICAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgU3ViW3R5cGVdID0gU3VwZXJbdHlwZV07XG4gICAgfSk7XG4gICAgLy8gZW5hYmxlIHJlY3Vyc2l2ZSBzZWxmLWxvb2t1cFxuICAgIGlmIChuYW1lKSB7XG4gICAgICBTdWIub3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gU3ViO1xuICAgIH1cblxuICAgIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyIG9wdGlvbnMgYXQgZXh0ZW5zaW9uIHRpbWUuXG4gICAgLy8gbGF0ZXIgYXQgaW5zdGFudGlhdGlvbiB3ZSBjYW4gY2hlY2sgaWYgU3VwZXIncyBvcHRpb25zIGhhdmVcbiAgICAvLyBiZWVuIHVwZGF0ZWQuXG4gICAgU3ViLnN1cGVyT3B0aW9ucyA9IFN1cGVyLm9wdGlvbnM7XG4gICAgU3ViLmV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zO1xuICAgIFN1Yi5zZWFsZWRPcHRpb25zID0gZXh0ZW5kKHt9LCBTdWIub3B0aW9ucyk7XG5cbiAgICAvLyBjYWNoZSBjb25zdHJ1Y3RvclxuICAgIGNhY2hlZEN0b3JzW1N1cGVySWRdID0gU3ViO1xuICAgIHJldHVybiBTdWJcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdFByb3BzJDEgKENvbXApIHtcbiAgdmFyIHByb3BzID0gQ29tcC5vcHRpb25zLnByb3BzO1xuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBwcm94eShDb21wLnByb3RvdHlwZSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQkMSAoQ29tcCkge1xuICB2YXIgY29tcHV0ZWQgPSBDb21wLm9wdGlvbnMuY29tcHV0ZWQ7XG4gIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgIGRlZmluZUNvbXB1dGVkKENvbXAucHJvdG90eXBlLCBrZXksIGNvbXB1dGVkW2tleV0pO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0QXNzZXRSZWdpc3RlcnMgKFZ1ZSkge1xuICAvKipcbiAgICogQ3JlYXRlIGFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzLlxuICAgKi9cbiAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIFZ1ZVt0eXBlXSA9IGZ1bmN0aW9uIChcbiAgICAgIGlkLFxuICAgICAgZGVmaW5pdGlvblxuICAgICkge1xuICAgICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZSA9PT0gJ2NvbXBvbmVudCcpIHtcbiAgICAgICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUoaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnY29tcG9uZW50JyAmJiBpc1BsYWluT2JqZWN0KGRlZmluaXRpb24pKSB7XG4gICAgICAgICAgZGVmaW5pdGlvbi5uYW1lID0gZGVmaW5pdGlvbi5uYW1lIHx8IGlkO1xuICAgICAgICAgIGRlZmluaXRpb24gPSB0aGlzLm9wdGlvbnMuX2Jhc2UuZXh0ZW5kKGRlZmluaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnZGlyZWN0aXZlJyAmJiB0eXBlb2YgZGVmaW5pdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRlZmluaXRpb24gPSB7IGJpbmQ6IGRlZmluaXRpb24sIHVwZGF0ZTogZGVmaW5pdGlvbiB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF0gPSBkZWZpbml0aW9uO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblxuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG4vKiAgKi9cblxuXG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUgKG9wdHMpIHtcbiAgcmV0dXJuIG9wdHMgJiYgKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcpXG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHBhdHRlcm4sIG5hbWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0dGVybikpIHtcbiAgICByZXR1cm4gcGF0dGVybi5pbmRleE9mKG5hbWUpID4gLTFcbiAgfSBlbHNlIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGF0dGVybi5zcGxpdCgnLCcpLmluZGV4T2YobmFtZSkgPiAtMVxuICB9IGVsc2UgaWYgKGlzUmVnRXhwKHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4udGVzdChuYW1lKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBwcnVuZUNhY2hlIChrZWVwQWxpdmVJbnN0YW5jZSwgZmlsdGVyKSB7XG4gIHZhciBjYWNoZSA9IGtlZXBBbGl2ZUluc3RhbmNlLmNhY2hlO1xuICB2YXIga2V5cyA9IGtlZXBBbGl2ZUluc3RhbmNlLmtleXM7XG4gIHZhciBfdm5vZGUgPSBrZWVwQWxpdmVJbnN0YW5jZS5fdm5vZGU7XG4gIGZvciAodmFyIGtleSBpbiBjYWNoZSkge1xuICAgIHZhciBjYWNoZWROb2RlID0gY2FjaGVba2V5XTtcbiAgICBpZiAoY2FjaGVkTm9kZSkge1xuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKGNhY2hlZE5vZGUuY29tcG9uZW50T3B0aW9ucyk7XG4gICAgICBpZiAobmFtZSAmJiAhZmlsdGVyKG5hbWUpKSB7XG4gICAgICAgIHBydW5lQ2FjaGVFbnRyeShjYWNoZSwga2V5LCBrZXlzLCBfdm5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcnVuZUNhY2hlRW50cnkgKFxuICBjYWNoZSxcbiAga2V5LFxuICBrZXlzLFxuICBjdXJyZW50XG4pIHtcbiAgdmFyIGNhY2hlZCQkMSA9IGNhY2hlW2tleV07XG4gIGlmIChjYWNoZWQkJDEgJiYgKCFjdXJyZW50IHx8IGNhY2hlZCQkMS50YWcgIT09IGN1cnJlbnQudGFnKSkge1xuICAgIGNhY2hlZCQkMS5jb21wb25lbnRJbnN0YW5jZS4kZGVzdHJveSgpO1xuICB9XG4gIGNhY2hlW2tleV0gPSBudWxsO1xuICByZW1vdmUoa2V5cywga2V5KTtcbn1cblxudmFyIHBhdHRlcm5UeXBlcyA9IFtTdHJpbmcsIFJlZ0V4cCwgQXJyYXldO1xuXG52YXIgS2VlcEFsaXZlID0ge1xuICBuYW1lOiAna2VlcC1hbGl2ZScsXG4gIGFic3RyYWN0OiB0cnVlLFxuXG4gIHByb3BzOiB7XG4gICAgaW5jbHVkZTogcGF0dGVyblR5cGVzLFxuICAgIGV4Y2x1ZGU6IHBhdHRlcm5UeXBlcyxcbiAgICBtYXg6IFtTdHJpbmcsIE51bWJlcl1cbiAgfSxcblxuICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkICgpIHtcbiAgICB0aGlzLmNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmtleXMgPSBbXTtcbiAgfSxcblxuICBkZXN0cm95ZWQ6IGZ1bmN0aW9uIGRlc3Ryb3llZCAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuY2FjaGUpIHtcbiAgICAgIHBydW5lQ2FjaGVFbnRyeSh0aGlzLmNhY2hlLCBrZXksIHRoaXMua2V5cyk7XG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdGhpcy4kd2F0Y2goJ2luY2x1ZGUnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICBwcnVuZUNhY2hlKHRoaXMkMSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIG1hdGNoZXModmFsLCBuYW1lKTsgfSk7XG4gICAgfSk7XG4gICAgdGhpcy4kd2F0Y2goJ2V4Y2x1ZGUnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICBwcnVuZUNhY2hlKHRoaXMkMSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICFtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICB2YXIgc2xvdCA9IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgdmFyIHZub2RlID0gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZChzbG90KTtcbiAgICB2YXIgY29tcG9uZW50T3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgaWYgKGNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgIC8vIGNoZWNrIHBhdHRlcm5cbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjb21wb25lbnRPcHRpb25zKTtcbiAgICAgIHZhciByZWYgPSB0aGlzO1xuICAgICAgdmFyIGluY2x1ZGUgPSByZWYuaW5jbHVkZTtcbiAgICAgIHZhciBleGNsdWRlID0gcmVmLmV4Y2x1ZGU7XG4gICAgICBpZiAoXG4gICAgICAgIC8vIG5vdCBpbmNsdWRlZFxuICAgICAgICAoaW5jbHVkZSAmJiAoIW5hbWUgfHwgIW1hdGNoZXMoaW5jbHVkZSwgbmFtZSkpKSB8fFxuICAgICAgICAvLyBleGNsdWRlZFxuICAgICAgICAoZXhjbHVkZSAmJiBuYW1lICYmIG1hdGNoZXMoZXhjbHVkZSwgbmFtZSkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHZub2RlXG4gICAgICB9XG5cbiAgICAgIHZhciByZWYkMSA9IHRoaXM7XG4gICAgICB2YXIgY2FjaGUgPSByZWYkMS5jYWNoZTtcbiAgICAgIHZhciBrZXlzID0gcmVmJDEua2V5cztcbiAgICAgIHZhciBrZXkgPSB2bm9kZS5rZXkgPT0gbnVsbFxuICAgICAgICAvLyBzYW1lIGNvbnN0cnVjdG9yIG1heSBnZXQgcmVnaXN0ZXJlZCBhcyBkaWZmZXJlbnQgbG9jYWwgY29tcG9uZW50c1xuICAgICAgICAvLyBzbyBjaWQgYWxvbmUgaXMgbm90IGVub3VnaCAoIzMyNjkpXG4gICAgICAgID8gY29tcG9uZW50T3B0aW9ucy5DdG9yLmNpZCArIChjb21wb25lbnRPcHRpb25zLnRhZyA/IChcIjo6XCIgKyAoY29tcG9uZW50T3B0aW9ucy50YWcpKSA6ICcnKVxuICAgICAgICA6IHZub2RlLmtleTtcbiAgICAgIGlmIChjYWNoZVtrZXldKSB7XG4gICAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gY2FjaGVba2V5XS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgLy8gbWFrZSBjdXJyZW50IGtleSBmcmVzaGVzdFxuICAgICAgICByZW1vdmUoa2V5cywga2V5KTtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWNoZVtrZXldID0gdm5vZGU7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAvLyBwcnVuZSBvbGRlc3QgZW50cnlcbiAgICAgICAgaWYgKHRoaXMubWF4ICYmIGtleXMubGVuZ3RoID4gcGFyc2VJbnQodGhpcy5tYXgpKSB7XG4gICAgICAgICAgcHJ1bmVDYWNoZUVudHJ5KGNhY2hlLCBrZXlzWzBdLCBrZXlzLCB0aGlzLl92bm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdm5vZGUuZGF0YS5rZWVwQWxpdmUgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdm5vZGUgfHwgKHNsb3QgJiYgc2xvdFswXSlcbiAgfVxufTtcblxudmFyIGJ1aWx0SW5Db21wb25lbnRzID0ge1xuICBLZWVwQWxpdmU6IEtlZXBBbGl2ZVxufTtcblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRHbG9iYWxBUEkgKFZ1ZSkge1xuICAvLyBjb25maWdcbiAgdmFyIGNvbmZpZ0RlZiA9IHt9O1xuICBjb25maWdEZWYuZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uZmlnOyB9O1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNvbmZpZ0RlZi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnRG8gbm90IHJlcGxhY2UgdGhlIFZ1ZS5jb25maWcgb2JqZWN0LCBzZXQgaW5kaXZpZHVhbCBmaWVsZHMgaW5zdGVhZC4nXG4gICAgICApO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZSwgJ2NvbmZpZycsIGNvbmZpZ0RlZik7XG5cbiAgLy8gZXhwb3NlZCB1dGlsIG1ldGhvZHMuXG4gIC8vIE5PVEU6IHRoZXNlIGFyZSBub3QgY29uc2lkZXJlZCBwYXJ0IG9mIHRoZSBwdWJsaWMgQVBJIC0gYXZvaWQgcmVseWluZyBvblxuICAvLyB0aGVtIHVubGVzcyB5b3UgYXJlIGF3YXJlIG9mIHRoZSByaXNrLlxuICBWdWUudXRpbCA9IHtcbiAgICB3YXJuOiB3YXJuLFxuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIG1lcmdlT3B0aW9uczogbWVyZ2VPcHRpb25zLFxuICAgIGRlZmluZVJlYWN0aXZlOiBkZWZpbmVSZWFjdGl2ZSQkMVxuICB9O1xuXG4gIFZ1ZS5zZXQgPSBzZXQ7XG4gIFZ1ZS5kZWxldGUgPSBkZWw7XG4gIFZ1ZS5uZXh0VGljayA9IG5leHRUaWNrO1xuXG4gIC8vIDIuNiBleHBsaWNpdCBvYnNlcnZhYmxlIEFQSVxuICBWdWUub2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBvYnNlcnZlKG9iaik7XG4gICAgcmV0dXJuIG9ialxuICB9O1xuXG4gIFZ1ZS5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIFZ1ZS5vcHRpb25zW3R5cGUgKyAncyddID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfSk7XG5cbiAgLy8gdGhpcyBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBcImJhc2VcIiBjb25zdHJ1Y3RvciB0byBleHRlbmQgYWxsIHBsYWluLW9iamVjdFxuICAvLyBjb21wb25lbnRzIHdpdGggaW4gV2VleCdzIG11bHRpLWluc3RhbmNlIHNjZW5hcmlvcy5cbiAgVnVlLm9wdGlvbnMuX2Jhc2UgPSBWdWU7XG5cbiAgZXh0ZW5kKFZ1ZS5vcHRpb25zLmNvbXBvbmVudHMsIGJ1aWx0SW5Db21wb25lbnRzKTtcblxuICBpbml0VXNlKFZ1ZSk7XG4gIGluaXRNaXhpbiQxKFZ1ZSk7XG4gIGluaXRFeHRlbmQoVnVlKTtcbiAgaW5pdEFzc2V0UmVnaXN0ZXJzKFZ1ZSk7XG59XG5cbmluaXRHbG9iYWxBUEkoVnVlKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckaXNTZXJ2ZXInLCB7XG4gIGdldDogaXNTZXJ2ZXJSZW5kZXJpbmdcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRzc3JDb250ZXh0Jywge1xuICBnZXQ6IGZ1bmN0aW9uIGdldCAoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gdGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dFxuICB9XG59KTtcblxuLy8gZXhwb3NlIEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0IGZvciBzc3IgcnVudGltZSBoZWxwZXIgaW5zdGFsbGF0aW9uXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnRnVuY3Rpb25hbFJlbmRlckNvbnRleHQnLCB7XG4gIHZhbHVlOiBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dFxufSk7XG5cblZ1ZS52ZXJzaW9uID0gJzIuNi4xMSc7XG5cbi8qKlxuICogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1RlbmNlbnQvd2VzdG9yZS9tYXN0ZXIvcGFja2FnZXMvd2VzdG9yZS91dGlscy9kaWZmLmpzXG4gKi9cbnZhciBBUlJBWVRZUEUgPSAnW29iamVjdCBBcnJheV0nO1xudmFyIE9CSkVDVFRZUEUgPSAnW29iamVjdCBPYmplY3RdJztcbnZhciBOVUxMVFlQRSA9ICdbb2JqZWN0IE51bGxdJztcbnZhciBVTkRFRklORURUWVBFID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG4vLyBjb25zdCBGVU5DVElPTlRZUEUgPSAnW29iamVjdCBGdW5jdGlvbl0nXG5cbmZ1bmN0aW9uIGRpZmYoY3VycmVudCwgcHJlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHN5bmNLZXlzKGN1cnJlbnQsIHByZSk7XG4gICAgX2RpZmYoY3VycmVudCwgcHJlLCAnJywgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHN5bmNLZXlzKGN1cnJlbnQsIHByZSkge1xuICAgIGlmIChjdXJyZW50ID09PSBwcmUpIHsgcmV0dXJuIH1cbiAgICB2YXIgcm9vdEN1cnJlbnRUeXBlID0gdHlwZShjdXJyZW50KTtcbiAgICB2YXIgcm9vdFByZVR5cGUgPSB0eXBlKHByZSk7XG4gICAgaWYgKHJvb3RDdXJyZW50VHlwZSA9PSBPQkpFQ1RUWVBFICYmIHJvb3RQcmVUeXBlID09IE9CSkVDVFRZUEUpIHtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoY3VycmVudCkubGVuZ3RoID49IE9iamVjdC5rZXlzKHByZSkubGVuZ3RoKXtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gY3VycmVudFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50W2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN5bmNLZXlzKGN1cnJlbnRWYWx1ZSwgcHJlW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm9vdEN1cnJlbnRUeXBlID09IEFSUkFZVFlQRSAmJiByb290UHJlVHlwZSA9PSBBUlJBWVRZUEUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQubGVuZ3RoID49IHByZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHN5bmNLZXlzKGN1cnJlbnRbaW5kZXhdLCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBudWxsT3JVbmRlZmluZWQoY3VycmVudFR5cGUsIHByZVR5cGUpIHtcbiAgICBpZihcbiAgICAgICAgKGN1cnJlbnRUeXBlID09PSBOVUxMVFlQRSB8fCBjdXJyZW50VHlwZSA9PT0gVU5ERUZJTkVEVFlQRSkgJiYgXG4gICAgICAgIChwcmVUeXBlID09PSBOVUxMVFlQRSB8fCBwcmVUeXBlID09PSBVTkRFRklORURUWVBFKVxuICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gX2RpZmYoY3VycmVudCwgcHJlLCBwYXRoLCByZXN1bHQpIHtcbiAgICBpZiAoY3VycmVudCA9PT0gcHJlKSB7IHJldHVybiB9XG4gICAgdmFyIHJvb3RDdXJyZW50VHlwZSA9IHR5cGUoY3VycmVudCk7XG4gICAgdmFyIHJvb3RQcmVUeXBlID0gdHlwZShwcmUpO1xuICAgIGlmIChyb290Q3VycmVudFR5cGUgPT0gT0JKRUNUVFlQRSkge1xuICAgICAgICBpZiAocm9vdFByZVR5cGUgIT0gT0JKRUNUVFlQRSB8fCBPYmplY3Qua2V5cyhjdXJyZW50KS5sZW5ndGggPCBPYmplY3Qua2V5cyhwcmUpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2V0UmVzdWx0KHJlc3VsdCwgcGF0aCwgY3VycmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgga2V5ICkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBjdXJyZW50W2tleV07XG4gICAgICAgICAgICAgICAgdmFyIHByZVZhbHVlID0gcHJlW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUeXBlID0gdHlwZShjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIHZhciBwcmVUeXBlID0gdHlwZShwcmVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9IEFSUkFZVFlQRSAmJiBjdXJyZW50VHlwZSAhPSBPQkpFQ1RUWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IHByZVtrZXldICYmIG51bGxPclVuZGVmaW5lZChjdXJyZW50VHlwZSwgcHJlVHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5LCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VHlwZSA9PSBBUlJBWVRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZVR5cGUgIT0gQVJSQVlUWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCAocGF0aCA9PSAnJyA/ICcnIDogcGF0aCArIFwiLlwiKSArIGtleSwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUubGVuZ3RoIDwgcHJlVmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KHJlc3VsdCwgKHBhdGggPT0gJycgPyAnJyA6IHBhdGggKyBcIi5cIikgKyBrZXksIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGlmZihpdGVtLCBwcmVWYWx1ZVtpbmRleF0sIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5ICsgJ1snICsgaW5kZXggKyAnXScsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRUeXBlID09IE9CSkVDVFRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZVR5cGUgIT0gT0JKRUNUVFlQRSB8fCBPYmplY3Qua2V5cyhjdXJyZW50VmFsdWUpLmxlbmd0aCA8IE9iamVjdC5rZXlzKHByZVZhbHVlKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdChyZXN1bHQsIChwYXRoID09ICcnID8gJycgOiBwYXRoICsgXCIuXCIpICsga2V5LCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgc3ViS2V5IGluIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kaWZmKGN1cnJlbnRWYWx1ZVtzdWJLZXldLCBwcmVWYWx1ZVtzdWJLZXldLCAocGF0aCA9PSAnJyA/ICcnIDogcGF0aCArIFwiLlwiKSArIGtleSArICcuJyArIHN1YktleSwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjdXJyZW50KSBsb29wKCBrZXkgKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm9vdEN1cnJlbnRUeXBlID09IEFSUkFZVFlQRSkge1xuICAgICAgICBpZiAocm9vdFByZVR5cGUgIT0gQVJSQVlUWVBFKSB7XG4gICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Lmxlbmd0aCA8IHByZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBfZGlmZihpdGVtLCBwcmVbaW5kZXhdLCBwYXRoICsgJ1snICsgaW5kZXggKyAnXScsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRSZXN1bHQocmVzdWx0LCBwYXRoLCBjdXJyZW50KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFJlc3VsdChyZXN1bHQsIGssIHYpIHtcbiAgICAvLyBpZiAodHlwZSh2KSAhPSBGVU5DVElPTlRZUEUpIHtcbiAgICAgICAgcmVzdWx0W2tdID0gdjtcbiAgICAvLyB9XG59XG5cbmZ1bmN0aW9uIHR5cGUob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBmbHVzaENhbGxiYWNrcyQxKHZtKSB7XG4gICAgaWYgKHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcyAmJiB2bS5fX25leHRfdGlja19jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5WVUVfQVBQX0RFQlVHKSB7XG4gICAgICAgICAgICB2YXIgbXBJbnN0YW5jZSA9IHZtLiRzY29wZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJyArICgrbmV3IERhdGUpICsgJ11bJyArIChtcEluc3RhbmNlLmlzIHx8IG1wSW5zdGFuY2Uucm91dGUpICsgJ11bJyArIHZtLl91aWQgK1xuICAgICAgICAgICAgICAgICddOmZsdXNoQ2FsbGJhY2tzWycgKyB2bS5fX25leHRfdGlja19jYWxsYmFja3MubGVuZ3RoICsgJ10nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29waWVzID0gdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgICAgICB2bS5fX25leHRfdGlja19jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3BpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvcGllc1tpXSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYXNSZW5kZXJXYXRjaGVyKHZtKSB7XG4gICAgcmV0dXJuIHF1ZXVlLmZpbmQoZnVuY3Rpb24gKHdhdGNoZXIpIHsgcmV0dXJuIHZtLl93YXRjaGVyID09PSB3YXRjaGVyOyB9KVxufVxuXG5mdW5jdGlvbiBuZXh0VGljayQxKHZtLCBjYikge1xuICAgIC8vMS5uZXh0VGljayDkuYvliY0g5beyIHNldERhdGEg5LiUIHNldERhdGEg6L+Y5pyq5Zue6LCD5a6M5oiQXG4gICAgLy8yLm5leHRUaWNrIOS5i+WJjeWtmOWcqCByZW5kZXIgd2F0Y2hlclxuICAgIGlmICghdm0uX19uZXh0X3RpY2tfcGVuZGluZyAmJiAhaGFzUmVuZGVyV2F0Y2hlcih2bSkpIHtcbiAgICAgICAgaWYocHJvY2Vzcy5lbnYuVlVFX0FQUF9ERUJVRyl7XG4gICAgICAgICAgICB2YXIgbXBJbnN0YW5jZSA9IHZtLiRzY29wZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbJyArICgrbmV3IERhdGUpICsgJ11bJyArIChtcEluc3RhbmNlLmlzIHx8IG1wSW5zdGFuY2Uucm91dGUpICsgJ11bJyArIHZtLl91aWQgK1xuICAgICAgICAgICAgICAgICddOm5leHRWdWVUaWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRUaWNrKGNiLCB2bSlcbiAgICB9ZWxzZXtcbiAgICAgICAgaWYocHJvY2Vzcy5lbnYuVlVFX0FQUF9ERUJVRyl7XG4gICAgICAgICAgICB2YXIgbXBJbnN0YW5jZSQxID0gdm0uJHNjb3BlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1snICsgKCtuZXcgRGF0ZSkgKyAnXVsnICsgKG1wSW5zdGFuY2UkMS5pcyB8fCBtcEluc3RhbmNlJDEucm91dGUpICsgJ11bJyArIHZtLl91aWQgK1xuICAgICAgICAgICAgICAgICddOm5leHRNUFRpY2snKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgX3Jlc29sdmU7XG4gICAgaWYgKCF2bS5fX25leHRfdGlja19jYWxsYmFja3MpIHtcbiAgICAgICAgdm0uX19uZXh0X3RpY2tfY2FsbGJhY2tzID0gW107XG4gICAgfVxuICAgIHZtLl9fbmV4dF90aWNrX2NhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNiLmNhbGwodm0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCAnbmV4dFRpY2snKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChfcmVzb2x2ZSkge1xuICAgICAgICAgICAgX3Jlc29sdmUodm0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgaWYgKCFjYiAmJiB0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gY2xlYXJJbnN0YW5jZShrZXksIHZhbHVlKSB7XG4gIC8vIOeugOaYk+WOu+mZpCBWdWUg5ZKM5bCP56iL5bqP57uE5Lu25a6e5L6LXG4gIGlmICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZS5faXNWdWUgfHwgdmFsdWUuX192X2lzTVBDb21wb25lbnQpIHtcbiAgICAgIHJldHVybiB7fVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVcbn1cblxuZnVuY3Rpb24gY2xvbmVXaXRoRGF0YSh2bSkge1xuICAvLyDnoa7kv53lvZPliY0gdm0g5omA5pyJ5pWw5o2u6KKr5ZCM5q2lXG4gIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgZGF0YUtleXMgPSBbXS5jb25jYXQoXG4gICAgT2JqZWN0LmtleXModm0uX2RhdGEgfHwge30pLFxuICAgIE9iamVjdC5rZXlzKHZtLl9jb21wdXRlZFdhdGNoZXJzIHx8IHt9KSk7XG5cbiAgZGF0YUtleXMucmVkdWNlKGZ1bmN0aW9uKHJldCwga2V5KSB7XG4gICAgcmV0W2tleV0gPSB2bVtrZXldO1xuICAgIHJldHVybiByZXRcbiAgfSwgcmV0KTtcblxuICAvLyB2dWUtY29tcG9zaXRpb24tYXBpXG4gIHZhciBjb21wb3NpdGlvbkFwaVN0YXRlID0gdm0uX19jb21wb3NpdGlvbl9hcGlfc3RhdGVfXyB8fCB2bS5fX3NlY3JldF92ZmFfc3RhdGVfXztcbiAgdmFyIHJhd0JpbmRpbmdzID0gY29tcG9zaXRpb25BcGlTdGF0ZSAmJiBjb21wb3NpdGlvbkFwaVN0YXRlLnJhd0JpbmRpbmdzO1xuICBpZiAocmF3QmluZGluZ3MpIHtcbiAgICBPYmplY3Qua2V5cyhyYXdCaW5kaW5ncykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXRba2V5XSA9IHZtW2tleV07XG4gICAgfSk7XG4gIH1cblxuICAvL1RPRE8g6ZyA6KaB5oqK5peg55So5pWw5o2u5aSE55CG5o6J77yM5q+U5aaCIGxpc3Q9PmwwIOWImSBsaXN0IOmcgOimgeenu+mZpO+8jOWQpuWImeWkmuS8oOi+k+S4gOS7veaVsOaNrlxuICBPYmplY3QuYXNzaWduKHJldCwgdm0uJG1wLmRhdGEgfHwge30pO1xuICBpZiAoXG4gICAgQXJyYXkuaXNBcnJheSh2bS4kb3B0aW9ucy5iZWhhdmlvcnMpICYmXG4gICAgdm0uJG9wdGlvbnMuYmVoYXZpb3JzLmluZGV4T2YoJ3VuaTovL2Zvcm0tZmllbGQnKSAhPT0gLTFcbiAgKSB7IC8vZm9ybS1maWVsZFxuICAgIHJldFsnbmFtZSddID0gdm0ubmFtZTtcbiAgICByZXRbJ3ZhbHVlJ10gPSB2bS52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJldCwgY2xlYXJJbnN0YW5jZSkpXG59XG5cbnZhciBwYXRjaCA9IGZ1bmN0aW9uKG9sZFZub2RlLCB2bm9kZSkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAodm5vZGUgPT09IG51bGwpIHsgLy9kZXN0cm95XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHRoaXMubXBUeXBlID09PSAncGFnZScgfHwgdGhpcy5tcFR5cGUgPT09ICdjb21wb25lbnQnKSB7XG4gICAgdmFyIG1wSW5zdGFuY2UgPSB0aGlzLiRzY29wZTtcbiAgICB2YXIgZGF0YSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBjbG9uZVdpdGhEYXRhKHRoaXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBkYXRhLl9fd2Vidmlld0lkX18gPSBtcEluc3RhbmNlLmRhdGEuX193ZWJ2aWV3SWRfXztcbiAgICB2YXIgbXBEYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgLy/ku4XlkIzmraUgZGF0YSDkuK3mnInnmoTmlbDmja5cbiAgICAgIG1wRGF0YVtrZXldID0gbXBJbnN0YW5jZS5kYXRhW2tleV07XG4gICAgfSk7XG4gICAgdmFyIGRpZmZEYXRhID0gdGhpcy4kc2hvdWxkRGlmZkRhdGEgPT09IGZhbHNlID8gZGF0YSA6IGRpZmYoZGF0YSwgbXBEYXRhKTtcbiAgICBpZiAoT2JqZWN0LmtleXMoZGlmZkRhdGEpLmxlbmd0aCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52LlZVRV9BUFBfREVCVUcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1snICsgKCtuZXcgRGF0ZSkgKyAnXVsnICsgKG1wSW5zdGFuY2UuaXMgfHwgbXBJbnN0YW5jZS5yb3V0ZSkgKyAnXVsnICsgdGhpcy5fdWlkICtcbiAgICAgICAgICAnXeW3rumHj+abtOaWsCcsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGlmZkRhdGEpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19uZXh0X3RpY2tfcGVuZGluZyA9IHRydWU7XG4gICAgICBtcEluc3RhbmNlLnNldERhdGEoZGlmZkRhdGEsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcyQxLl9fbmV4dF90aWNrX3BlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgZmx1c2hDYWxsYmFja3MkMSh0aGlzJDEpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsdXNoQ2FsbGJhY2tzJDEodGhpcyk7XG4gICAgfVxuICB9XG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gY3JlYXRlRW1wdHlSZW5kZXIoKSB7XG5cbn1cblxuZnVuY3Rpb24gbW91bnRDb21wb25lbnQkMShcbiAgdm0sXG4gIGVsLFxuICBoeWRyYXRpbmdcbikge1xuICBpZiAoIXZtLm1wVHlwZSkgey8vbWFpbi5qcyDkuK3nmoQgbmV3IFZ1ZVxuICAgIHJldHVybiB2bVxuICB9XG4gIGlmICh2bS5tcFR5cGUgPT09ICdhcHAnKSB7XG4gICAgdm0uJG9wdGlvbnMucmVuZGVyID0gY3JlYXRlRW1wdHlSZW5kZXI7XG4gIH1cbiAgaWYgKCF2bS4kb3B0aW9ucy5yZW5kZXIpIHtcbiAgICB2bS4kb3B0aW9ucy5yZW5kZXIgPSBjcmVhdGVFbXB0eVJlbmRlcjtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoKHZtLiRvcHRpb25zLnRlbXBsYXRlICYmIHZtLiRvcHRpb25zLnRlbXBsYXRlLmNoYXJBdCgwKSAhPT0gJyMnKSB8fFxuICAgICAgICB2bS4kb3B0aW9ucy5lbCB8fCBlbCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdZb3UgYXJlIHVzaW5nIHRoZSBydW50aW1lLW9ubHkgYnVpbGQgb2YgVnVlIHdoZXJlIHRoZSB0ZW1wbGF0ZSAnICtcbiAgICAgICAgICAnY29tcGlsZXIgaXMgbm90IGF2YWlsYWJsZS4gRWl0aGVyIHByZS1jb21waWxlIHRoZSB0ZW1wbGF0ZXMgaW50byAnICtcbiAgICAgICAgICAncmVuZGVyIGZ1bmN0aW9ucywgb3IgdXNlIHRoZSBjb21waWxlci1pbmNsdWRlZCBidWlsZC4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdGYWlsZWQgdG8gbW91bnQgY29tcG9uZW50OiB0ZW1wbGF0ZSBvciByZW5kZXIgZnVuY3Rpb24gbm90IGRlZmluZWQuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgIXZtLl8kZmFsbGJhY2sgJiYgY2FsbEhvb2sodm0sICdiZWZvcmVNb3VudCcpO1xuXG4gIHZhciB1cGRhdGVDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdm0uX3VwZGF0ZSh2bS5fcmVuZGVyKCksIGh5ZHJhdGluZyk7XG4gIH07XG5cbiAgLy8gd2Ugc2V0IHRoaXMgdG8gdm0uX3dhdGNoZXIgaW5zaWRlIHRoZSB3YXRjaGVyJ3MgY29uc3RydWN0b3JcbiAgLy8gc2luY2UgdGhlIHdhdGNoZXIncyBpbml0aWFsIHBhdGNoIG1heSBjYWxsICRmb3JjZVVwZGF0ZSAoZS5nLiBpbnNpZGUgY2hpbGRcbiAgLy8gY29tcG9uZW50J3MgbW91bnRlZCBob29rKSwgd2hpY2ggcmVsaWVzIG9uIHZtLl93YXRjaGVyIGJlaW5nIGFscmVhZHkgZGVmaW5lZFxuICBuZXcgV2F0Y2hlcih2bSwgdXBkYXRlQ29tcG9uZW50LCBub29wLCB7XG4gICAgYmVmb3JlOiBmdW5jdGlvbiBiZWZvcmUoKSB7XG4gICAgICBpZiAodm0uX2lzTW91bnRlZCAmJiAhdm0uX2lzRGVzdHJveWVkKSB7XG4gICAgICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlVXBkYXRlJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB0cnVlIC8qIGlzUmVuZGVyV2F0Y2hlciAqLyk7XG4gIGh5ZHJhdGluZyA9IGZhbHNlO1xuICByZXR1cm4gdm1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIHJlbmRlckNsYXNzIChcbiAgc3RhdGljQ2xhc3MsXG4gIGR5bmFtaWNDbGFzc1xuKSB7XG4gIGlmIChpc0RlZihzdGF0aWNDbGFzcykgfHwgaXNEZWYoZHluYW1pY0NsYXNzKSkge1xuICAgIHJldHVybiBjb25jYXQoc3RhdGljQ2xhc3MsIHN0cmluZ2lmeUNsYXNzKGR5bmFtaWNDbGFzcykpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuICcnXG59XG5cbmZ1bmN0aW9uIGNvbmNhdCAoYSwgYikge1xuICByZXR1cm4gYSA/IGIgPyAoYSArICcgJyArIGIpIDogYSA6IChiIHx8ICcnKVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlDbGFzcyAodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN0cmluZ2lmeUFycmF5KHZhbHVlKVxuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3RyaW5naWZ5T2JqZWN0KHZhbHVlKVxuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuICcnXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeUFycmF5ICh2YWx1ZSkge1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciBzdHJpbmdpZmllZDtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoaXNEZWYoc3RyaW5naWZpZWQgPSBzdHJpbmdpZnlDbGFzcyh2YWx1ZVtpXSkpICYmIHN0cmluZ2lmaWVkICE9PSAnJykge1xuICAgICAgaWYgKHJlcykgeyByZXMgKz0gJyAnOyB9XG4gICAgICByZXMgKz0gc3RyaW5naWZpZWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5T2JqZWN0ICh2YWx1ZSkge1xuICB2YXIgcmVzID0gJyc7XG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZVtrZXldKSB7XG4gICAgICBpZiAocmVzKSB7IHJlcyArPSAnICc7IH1cbiAgICAgIHJlcyArPSBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbnZhciBwYXJzZVN0eWxlVGV4dCA9IGNhY2hlZChmdW5jdGlvbiAoY3NzVGV4dCkge1xuICB2YXIgcmVzID0ge307XG4gIHZhciBsaXN0RGVsaW1pdGVyID0gLzsoPyFbXihdKlxcKSkvZztcbiAgdmFyIHByb3BlcnR5RGVsaW1pdGVyID0gLzooLispLztcbiAgY3NzVGV4dC5zcGxpdChsaXN0RGVsaW1pdGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHZhciB0bXAgPSBpdGVtLnNwbGl0KHByb3BlcnR5RGVsaW1pdGVyKTtcbiAgICAgIHRtcC5sZW5ndGggPiAxICYmIChyZXNbdG1wWzBdLnRyaW0oKV0gPSB0bXBbMV0udHJpbSgpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxuLy8gbm9ybWFsaXplIHBvc3NpYmxlIGFycmF5IC8gc3RyaW5nIHZhbHVlcyBpbnRvIE9iamVjdFxuZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVCaW5kaW5nIChiaW5kaW5nU3R5bGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYmluZGluZ1N0eWxlKSkge1xuICAgIHJldHVybiB0b09iamVjdChiaW5kaW5nU3R5bGUpXG4gIH1cbiAgaWYgKHR5cGVvZiBiaW5kaW5nU3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlU3R5bGVUZXh0KGJpbmRpbmdTdHlsZSlcbiAgfVxuICByZXR1cm4gYmluZGluZ1N0eWxlXG59XG5cbi8qICAqL1xuXG52YXIgTVBfTUVUSE9EUyA9IFsnY3JlYXRlU2VsZWN0b3JRdWVyeScsICdjcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcicsICdzZWxlY3RBbGxDb21wb25lbnRzJywgJ3NlbGVjdENvbXBvbmVudCddO1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQob2JqLCBwYXRoKSB7XG4gIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgdmFyIGtleSA9IHBhcnRzWzBdO1xuICBpZiAoa2V5LmluZGV4T2YoJ19fJG4nKSA9PT0gMCkgeyAvL251bWJlciBpbmRleFxuICAgIGtleSA9IHBhcnNlSW50KGtleS5yZXBsYWNlKCdfXyRuJywgJycpKTtcbiAgfVxuICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIG9ialtrZXldXG4gIH1cbiAgcmV0dXJuIGdldFRhcmdldChvYmpba2V5XSwgcGFydHMuc2xpY2UoMSkuam9pbignLicpKVxufVxuXG5mdW5jdGlvbiBpbnRlcm5hbE1peGluKFZ1ZSkge1xuXG4gIFZ1ZS5jb25maWcuZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZXJyLCB2bSwgaW5mbykge1xuICAgIFZ1ZS51dGlsLndhcm4oKFwiRXJyb3IgaW4gXCIgKyBpbmZvICsgXCI6IFxcXCJcIiArIChlcnIudG9TdHJpbmcoKSkgKyBcIlxcXCJcIiksIHZtKTtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICB2YXIgYXBwID0gdHlwZW9mIGdldEFwcCA9PT0gJ2Z1bmN0aW9uJyAmJiBnZXRBcHAoKTtcbiAgICBpZiAoYXBwICYmIGFwcC5vbkVycm9yKSB7XG4gICAgICBhcHAub25FcnJvcihlcnIpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgb2xkRW1pdCA9IFZ1ZS5wcm90b3R5cGUuJGVtaXQ7XG5cbiAgVnVlLnByb3RvdHlwZS4kZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuJHNjb3BlICYmIGV2ZW50KSB7XG4gICAgICB2YXIgdHJpZ2dlckV2ZW50ID0gdGhpcy4kc2NvcGVbJ190cmlnZ2VyRXZlbnQnXSB8fCB0aGlzLiRzY29wZVsndHJpZ2dlckV2ZW50J107XG4gICAgICBpZiAodHJpZ2dlckV2ZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwodGhpcy4kc2NvcGUsIGV2ZW50LCB7XG4gICAgICAgICAgICBfX2FyZ3NfXzogdG9BcnJheShhcmd1bWVudHMsIDEpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2xkRW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kbmV4dFRpY2sgPSBmdW5jdGlvbihmbikge1xuICAgIHJldHVybiBuZXh0VGljayQxKHRoaXMsIGZuKVxuICB9O1xuXG4gIE1QX01FVEhPRFMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgVnVlLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgaWYgKHRoaXMuJHNjb3BlICYmIHRoaXMuJHNjb3BlW21ldGhvZF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlW21ldGhvZF0oYXJncylcbiAgICAgIH1cbiAgICAgIC8vIG1wLWFsaXBheVxuICAgICAgaWYgKHR5cGVvZiBteSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAobWV0aG9kID09PSAnY3JlYXRlU2VsZWN0b3JRdWVyeScpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICAgICAgcmV0dXJuIG15LmNyZWF0ZVNlbGVjdG9yUXVlcnkoYXJncylcbiAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnY3JlYXRlSW50ZXJzZWN0aW9uT2JzZXJ2ZXInKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gICAgICAgIHJldHVybiBteS5jcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcihhcmdzKVxuICAgICAgfVxuICAgICAgLy8gVE9ETyBtcC1hbGlwYXkg5pqC5LiN5pSv5oyBIHNlbGVjdEFsbENvbXBvbmVudHMsc2VsZWN0Q29tcG9uZW50XG4gICAgfTtcbiAgfSk7XG5cbiAgVnVlLnByb3RvdHlwZS5fX2luaXRfcHJvdmlkZSA9IGluaXRQcm92aWRlO1xuXG4gIFZ1ZS5wcm90b3R5cGUuX19pbml0X2luamVjdGlvbnMgPSBpbml0SW5qZWN0aW9ucztcblxuICBWdWUucHJvdG90eXBlLl9fY2FsbF9ob29rID0gZnVuY3Rpb24oaG9vaywgYXJncykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gIzc1NzMgZGlzYWJsZSBkZXAgY29sbGVjdGlvbiB3aGVuIGludm9raW5nIGxpZmVjeWNsZSBob29rc1xuICAgIHB1c2hUYXJnZXQoKTtcbiAgICB2YXIgaGFuZGxlcnMgPSB2bS4kb3B0aW9uc1tob29rXTtcbiAgICB2YXIgaW5mbyA9IGhvb2sgKyBcIiBob29rXCI7XG4gICAgdmFyIHJldDtcbiAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIHJldCA9IGludm9rZVdpdGhFcnJvckhhbmRsaW5nKGhhbmRsZXJzW2ldLCB2bSwgYXJncyA/IFthcmdzXSA6IG51bGwsIHZtLCBpbmZvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZtLl9oYXNIb29rRXZlbnQpIHtcbiAgICAgIHZtLiRlbWl0KCdob29rOicgKyBob29rLCBhcmdzKTtcbiAgICB9XG4gICAgcG9wVGFyZ2V0KCk7XG4gICAgcmV0dXJuIHJldFxuICB9O1xuXG4gIFZ1ZS5wcm90b3R5cGUuX19zZXRfbW9kZWwgPSBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUsIG1vZGlmaWVycykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1vZGlmaWVycykpIHtcbiAgICAgIGlmIChtb2RpZmllcnMuaW5kZXhPZigndHJpbScpICE9PSAtMSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllcnMuaW5kZXhPZignbnVtYmVyJykgIT09IC0xKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5fbih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSB0aGlzO1xuICAgIH1cbiAgICAvLyDop6PlhrPliqjmgIHlsZ7mgKfmt7vliqBcbiAgICBWdWUuc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS5fX3NldF9zeW5jID0gZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRhcmdldCA9IHRoaXM7XG4gICAgfVxuICAgIC8vIOino+WGs+WKqOaAgeWxnuaAp+a3u+WKoFxuICAgIFZ1ZS5zZXQodGFyZ2V0LCBrZXksIHZhbHVlKTtcbiAgfTtcblxuICBWdWUucHJvdG90eXBlLl9fZ2V0X29yaWcgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoaXRlbSkpIHtcbiAgICAgIHJldHVybiBpdGVtWyckb3JpZyddIHx8IGl0ZW1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLl9fZ2V0X3ZhbHVlID0gZnVuY3Rpb24oZGF0YVBhdGgsIHRhcmdldCkge1xuICAgIHJldHVybiBnZXRUYXJnZXQodGFyZ2V0IHx8IHRoaXMsIGRhdGFQYXRoKVxuICB9O1xuXG5cbiAgVnVlLnByb3RvdHlwZS5fX2dldF9jbGFzcyA9IGZ1bmN0aW9uKGR5bmFtaWNDbGFzcywgc3RhdGljQ2xhc3MpIHtcbiAgICByZXR1cm4gcmVuZGVyQ2xhc3Moc3RhdGljQ2xhc3MsIGR5bmFtaWNDbGFzcylcbiAgfTtcblxuICBWdWUucHJvdG90eXBlLl9fZ2V0X3N0eWxlID0gZnVuY3Rpb24oZHluYW1pY1N0eWxlLCBzdGF0aWNTdHlsZSkge1xuICAgIGlmICghZHluYW1pY1N0eWxlICYmICFzdGF0aWNTdHlsZSkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIHZhciBkeW5hbWljU3R5bGVPYmogPSBub3JtYWxpemVTdHlsZUJpbmRpbmcoZHluYW1pY1N0eWxlKTtcbiAgICB2YXIgc3R5bGVPYmogPSBzdGF0aWNTdHlsZSA/IGV4dGVuZChzdGF0aWNTdHlsZSwgZHluYW1pY1N0eWxlT2JqKSA6IGR5bmFtaWNTdHlsZU9iajtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVPYmopLm1hcChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gKChoeXBoZW5hdGUobmFtZSkpICsgXCI6XCIgKyAoc3R5bGVPYmpbbmFtZV0pKTsgfSkuam9pbignOycpXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS5fX21hcCA9IGZ1bmN0aW9uKHZhbCwgaXRlcmF0ZWUpIHtcbiAgICAvL1RPRE8g5pqC5LiN6ICD6JmRIHN0cmluZ1xuICAgIHZhciByZXQsIGksIGwsIGtleXMsIGtleTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXQgPSBuZXcgQXJyYXkodmFsLmxlbmd0aCk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICByZXRbaV0gPSBpdGVyYXRlZSh2YWxbaV0sIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgICByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIHJldFtrZXldID0gaXRlcmF0ZWUodmFsW2tleV0sIGtleSwgaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0ID0gbmV3IEFycmF5KHZhbCk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdmFsOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIC8vIOesrOS4gOS4quWPguaVsOaaguaXtuS7jeWSjOWwj+eoi+W6j+S4gOiHtFxuICAgICAgICByZXRbaV0gPSBpdGVyYXRlZShpLCBpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gICAgcmV0dXJuIFtdXG4gIH07XG5cbn1cblxuLyogICovXG5cbnZhciBMSUZFQ1lDTEVfSE9PS1MkMSA9IFtcbiAgICAvL0FwcFxuICAgICdvbkxhdW5jaCcsXG4gICAgJ29uU2hvdycsXG4gICAgJ29uSGlkZScsXG4gICAgJ29uVW5pTlZpZXdNZXNzYWdlJyxcbiAgICAnb25QYWdlTm90Rm91bmQnLFxuICAgICdvblRoZW1lQ2hhbmdlJyxcbiAgICAnb25FcnJvcicsXG4gICAgJ29uVW5oYW5kbGVkUmVqZWN0aW9uJyxcbiAgICAvL1BhZ2VcbiAgICAnb25Jbml0JyxcbiAgICAnb25Mb2FkJyxcbiAgICAvLyAnb25TaG93JyxcbiAgICAnb25SZWFkeScsXG4gICAgLy8gJ29uSGlkZScsXG4gICAgJ29uVW5sb2FkJyxcbiAgICAnb25QdWxsRG93blJlZnJlc2gnLFxuICAgICdvblJlYWNoQm90dG9tJyxcbiAgICAnb25UYWJJdGVtVGFwJyxcbiAgICAnb25BZGRUb0Zhdm9yaXRlcycsXG4gICAgJ29uU2hhcmVUaW1lbGluZScsXG4gICAgJ29uU2hhcmVBcHBNZXNzYWdlJyxcbiAgICAnb25SZXNpemUnLFxuICAgICdvblBhZ2VTY3JvbGwnLFxuICAgICdvbk5hdmlnYXRpb25CYXJCdXR0b25UYXAnLFxuICAgICdvbkJhY2tQcmVzcycsXG4gICAgJ29uTmF2aWdhdGlvbkJhclNlYXJjaElucHV0Q2hhbmdlZCcsXG4gICAgJ29uTmF2aWdhdGlvbkJhclNlYXJjaElucHV0Q29uZmlybWVkJyxcbiAgICAnb25OYXZpZ2F0aW9uQmFyU2VhcmNoSW5wdXRDbGlja2VkJyxcbiAgICAvL0NvbXBvbmVudFxuICAgIC8vICdvblJlYWR5JywgLy8g5YW85a655pen54mI5pys77yM5bqU6K+l56e76Zmk6K+l5LqL5Lu2XG4gICAgJ29uUGFnZVNob3cnLFxuICAgICdvblBhZ2VIaWRlJyxcbiAgICAnb25QYWdlUmVzaXplJyxcbiAgICAnb25VcGxvYWREb3V5aW5WaWRlbydcbl07XG5mdW5jdGlvbiBsaWZlY3ljbGVNaXhpbiQxKFZ1ZSkge1xuXG4gICAgLy9maXhlZCB2dWUtY2xhc3MtY29tcG9uZW50XG4gICAgdmFyIG9sZEV4dGVuZCA9IFZ1ZS5leHRlbmQ7XG4gICAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uKGV4dGVuZE9wdGlvbnMpIHtcbiAgICAgICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdmFyIG1ldGhvZHMgPSBleHRlbmRPcHRpb25zLm1ldGhvZHM7XG4gICAgICAgIGlmIChtZXRob2RzKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtZXRob2RzKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKExJRkVDWUNMRV9IT09LUyQxLmluZGV4T2YobWV0aG9kTmFtZSkhPT0tMSkge1xuICAgICAgICAgICAgICAgICAgICBleHRlbmRPcHRpb25zW21ldGhvZE5hbWVdID0gbWV0aG9kc1ttZXRob2ROYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1ldGhvZHNbbWV0aG9kTmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2xkRXh0ZW5kLmNhbGwodGhpcywgZXh0ZW5kT3B0aW9ucylcbiAgICB9O1xuXG4gICAgdmFyIHN0cmF0ZWdpZXMgPSBWdWUuY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcbiAgICB2YXIgbWVyZ2VIb29rID0gc3RyYXRlZ2llcy5jcmVhdGVkO1xuICAgIExJRkVDWUNMRV9IT09LUyQxLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgICAgICAgc3RyYXRlZ2llc1tob29rXSA9IG1lcmdlSG9vaztcbiAgICB9KTtcblxuICAgIFZ1ZS5wcm90b3R5cGUuX19saWZlY3ljbGVfaG9va3NfXyA9IExJRkVDWUNMRV9IT09LUyQxO1xufVxuXG4vKiAgKi9cblxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBwYXRjaCBmdW5jdGlvblxuVnVlLnByb3RvdHlwZS5fX3BhdGNoX18gPSBwYXRjaDtcblxuLy8gcHVibGljIG1vdW50IG1ldGhvZFxuVnVlLnByb3RvdHlwZS4kbW91bnQgPSBmdW5jdGlvbihcbiAgICBlbCAsXG4gICAgaHlkcmF0aW5nIFxuKSB7XG4gICAgcmV0dXJuIG1vdW50Q29tcG9uZW50JDEodGhpcywgZWwsIGh5ZHJhdGluZylcbn07XG5cbmxpZmVjeWNsZU1peGluJDEoVnVlKTtcbmludGVybmFsTWl4aW4oVnVlKTtcblxuLyogICovXG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZTtcbiIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyBJTVBPUlRBTlQ6IERvIE5PVCB1c2UgRVMyMDE1IGZlYXR1cmVzIGluIHRoaXMgZmlsZSAoZXhjZXB0IGZvciBtb2R1bGVzKS5cbi8vIFRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgc2NyaXB0RXhwb3J0cyxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyLCAvKiBzZXJ2ZXIgb25seSAqL1xuICBzaGFkb3dNb2RlLCAvKiB2dWUtY2xpIG9ubHkgKi9cbiAgY29tcG9uZW50cywgLy8gZml4ZWQgYnkgeHh4eHh4IGF1dG8gY29tcG9uZW50c1xuICByZW5kZXJqcyAvLyBmaXhlZCBieSB4eHh4eHggcmVuZGVyanNcbikge1xuICAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdEV4cG9ydHMgPT09ICdmdW5jdGlvbidcbiAgICA/IHNjcmlwdEV4cG9ydHMub3B0aW9uc1xuICAgIDogc2NyaXB0RXhwb3J0c1xuXG4gIC8vIGZpeGVkIGJ5IHh4eHh4eCBhdXRvIGNvbXBvbmVudHNcbiAgaWYgKGNvbXBvbmVudHMpIHtcbiAgICBpZiAoIW9wdGlvbnMuY29tcG9uZW50cykge1xuICAgICAgb3B0aW9ucy5jb21wb25lbnRzID0ge31cbiAgICB9XG4gICAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgICBmb3IgKHZhciBuYW1lIGluIGNvbXBvbmVudHMpIHtcbiAgICAgIGlmIChoYXNPd24uY2FsbChjb21wb25lbnRzLCBuYW1lKSAmJiAhaGFzT3duLmNhbGwob3B0aW9ucy5jb21wb25lbnRzLCBuYW1lKSkge1xuICAgICAgICBvcHRpb25zLmNvbXBvbmVudHNbbmFtZV0gPSBjb21wb25lbnRzW25hbWVdXG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGZpeGVkIGJ5IHh4eHh4eCByZW5kZXJqc1xuICBpZiAocmVuZGVyanMpIHtcbiAgICAocmVuZGVyanMuYmVmb3JlQ3JlYXRlIHx8IChyZW5kZXJqcy5iZWZvcmVDcmVhdGUgPSBbXSkpLnVuc2hpZnQoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzW3JlbmRlcmpzLl9fbW9kdWxlXSA9IHRoaXNcbiAgICB9KTtcbiAgICAob3B0aW9ucy5taXhpbnMgfHwgKG9wdGlvbnMubWl4aW5zID0gW10pKS5wdXNoKHJlbmRlcmpzKVxuICB9XG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAocmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSByZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHN0YXRpY1JlbmRlckZuc1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZVxuICB9XG5cbiAgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoZnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZVxuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gJ2RhdGEtdi0nICsgc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlXG4gICAgICA/IGZ1bmN0aW9uICgpIHsgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgdGhpcy4kcm9vdC4kb3B0aW9ucy5zaGFkb3dSb290KSB9XG4gICAgICA6IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyBmb3IgdGVtcGxhdGUtb25seSBob3QtcmVsb2FkIGJlY2F1c2UgaW4gdGhhdCBjYXNlIHRoZSByZW5kZXIgZm4gZG9lc24ndFxuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgbm9ybWFsaXplclxuICAgICAgb3B0aW9ucy5faW5qZWN0U3R5bGVzID0gaG9va1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIHZhciBvcmlnaW5hbFJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVuZGVyKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9