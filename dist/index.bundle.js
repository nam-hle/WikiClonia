/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([51,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export customStyle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MenuHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Menu; });
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var _material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _asset_theme_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





var customStyle = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  menu: {
    position: "relative",
    fontSize: 12
  },
  menu__content: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    width: 300,
    maxHeight: 500,
    overflow: "auto",
    backgroundColor: "white",
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
  },
  menu__header: {
    display: "flex",
    alignItems: "center",
    padding: 8,
    paddingLeft: 20,
    fontWeight: "bold",
    backgroundColor: _asset_theme_js__WEBPACK_IMPORTED_MODULE_3__[/* Theme */ "a"].headerBackgroundColor,
    cursor: "default"
  },
  menu__item: {
    display: "grid",
    gridTemplateColumns: "30px 1fr",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderTop: "1px solid ".concat(_asset_theme_js__WEBPACK_IMPORTED_MODULE_3__[/* Theme */ "a"].borderColor),
    color: _asset_theme_js__WEBPACK_IMPORTED_MODULE_3__[/* Theme */ "a"].textColor,
    backgroundColor: _asset_theme_js__WEBPACK_IMPORTED_MODULE_3__[/* Theme */ "a"].backgroundColor,
    "&:hover": {
      backgroundColor: _asset_theme_js__WEBPACK_IMPORTED_MODULE_3__[/* Theme */ "a"].headerBackgroundColor
    }
  },
  item__text: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "-apple-system, Helvetica Neue, sans-serif",
    fontWeight: function fontWeight(props) {
      return props.choose ? 600 : "inherit";
    }
  },
  hidden: {
    display: "none"
  }
});
var MenuHeader = function MenuHeader(_ref) {
  var text = _ref.text;
  var classes = customStyle();
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classes["menu__header"]
  }, text);
};
var MenuItem = function MenuItem(Content) {
  return function (props) {
    var id = props.id,
        choose = props.choose,
        _onClick = props.onClick;
    var classes = customStyle({
      choose: choose
    });
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "#",
      className: classes["menu__item"],
      onClick: function onClick() {
        return _onClick(id);
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, choose && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Check__WEBPACK_IMPORTED_MODULE_0___default.a, {
      fontSize: "small"
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Content, _extends({
      className: classes["item__text"]
    }, props, {
      id: id
    })));
  };
};
var Menu = function Menu(title, Content) {
  return __signature__(function (_ref2) {
    var onClick = _ref2.onClick,
        chooseItem = _ref2.chooseItem;
    var classes = customStyle();
    var contentRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
    var buttonRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);

    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
        _useState2 = _slicedToArray(_useState, 2),
        open = _useState2[0],
        setOpen = _useState2[1];

    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
      function handleClickOutside(event) {
        if (contentRef.current && !contentRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
          setOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return function () {
        return document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [contentRef]);

    var handleClick = function handleClick() {
      return setOpen(!open);
    };

    var handleClose = function handleClose(chooseItem) {
      onClick(chooseItem);
      setOpen(false);
    };

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "".concat(classes["menu"])
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      ref: buttonRef,
      onClick: handleClick
    }, title)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      ref: contentRef,
      className: "".concat(classes["menu__content"], " ").concat(open ? "" : classes["hidden"])
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Content, {
      chooseItem: chooseItem,
      handleClose: handleClose
    })));
  }, "useRef{contentRef}\nuseRef{buttonRef}\nuseState{[open, setOpen](false)}\nuseEffect{}");
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(customStyle, "customStyle", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Menu/index.js");
  reactHotLoader.register(MenuHeader, "MenuHeader", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Menu/index.js");
  reactHotLoader.register(MenuItem, "MenuItem", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Menu/index.js");
  reactHotLoader.register(Menu, "Menu", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Menu/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Theme; });
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var Theme = {
  borderColor: "#E3E5E8",
  textColor: "#5B5B5B",
  backgroundColor: "#fff",
  headerBackgroundColor: "#F6F8FA"
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Theme, "Theme", "/Users/hoangnam/Dev/Templates/ReactJS/src/asset/theme.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _templateObject2() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var getContrast = function getContrast(hexcolor) {
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split(_templateObject2()).map(function (hex) {
      return hex + hex;
    }).join(_templateObject());
  }

  var r = parseInt(hexcolor.substr(0, 2), 16),
      g = parseInt(hexcolor.substr(2, 2), 16),
      b = parseInt(hexcolor.substr(4, 2), 16),
      yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

var style = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
  root: {
    display: "inline-block",
    fontSize: 12,
    padding: "0 8px",
    margin: "0 4px",
    backgroundColor: function backgroundColor(props) {
      return "#" + props.color;
    },
    color: function color(props) {
      return getContrast(props.color);
    },
    cursor: "pointer"
  }
});

var Label = function Label(_ref) {
  var name = _ref.name,
      color = _ref.color,
      _onClick = _ref.onClick;
  var classes = style({
    color: color
  });
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: classes.root,
    onClick: function onClick() {
      return _onClick(name);
    }
  }, " ".concat(name, " "));
};

var _default = Label;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getContrast, "getContrast", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Label/index.js");
  reactHotLoader.register(style, "style", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Label/index.js");
  reactHotLoader.register(Label, "Label", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Label/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Label/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _Issue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var parse_link_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46);
/* harmony import */ var parse_link_header__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(parse_link_header__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SortMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47);
/* harmony import */ var _LabelMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








var range = function range(_from, _to) {
  return _toConsumableArray(Array(_to - _from + 1)).map(function (_, i) {
    return i + _from;
  });
};

var BASE_URL = "https://api.github.com/repos/facebook/create-react-app/issues?state=all&per_page=15";

var PaginationButtonGroup = function PaginationButtonGroup(_ref) {
  var currentPage = _ref.currentPage,
      maxPage = _ref.maxPage,
      _onClick = _ref.onClick;

  var calculate = function calculate(curPage) {
    var minPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var maxPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
    if (maxPage - minPage <= 8) return _toConsumableArray(range(minPage, maxPage));
    var closeToLeft = curPage - 2 - (minPage + 1) <= 2,
        closeToRight = maxPage - 1 - (curPage + 2) <= 2;

    if (closeToLeft) {
      return closeToRight ? [range(minPage, maxPage)] : [].concat(_toConsumableArray(range(minPage, curPage + 2)), [0], _toConsumableArray(range(maxPage - 1, maxPage)));
    }

    if (closeToRight) return [].concat(_toConsumableArray(range(minPage, minPage + 1)), [0], _toConsumableArray(range(curPage - 2, maxPage)));
    return [].concat(_toConsumableArray(range(minPage, minPage + 1)), [0], _toConsumableArray(range(curPage - 2, curPage + 2)), [0], _toConsumableArray(range(maxPage - 1, maxPage)));
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    style: {
      alignSelf: "center",
      marginTop: 20
    },
    color: "primary",
    "aria-label": "outlined primary button group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "outlined",
    color: "primary",
    disabled: currentPage == 1,
    onClick: function onClick() {
      return _onClick("prev");
    }
  }, "Previous"), calculate(currentPage, 1, maxPage).map(function (page, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
      key: index,
      variant: currentPage == page ? "contained" : "outlined",
      color: "primary",
      onClick: function onClick() {
        return _onClick(page);
      },
      disabled: page == 0
    }, page ? page : "...");
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "outlined",
    color: "primary",
    disabled: currentPage == maxPage,
    onClick: function onClick() {
      return _onClick("next");
    }
  }, "Next"));
};

var App = function App() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPage = _useState4[0],
      setCurrentPage = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(20),
      _useState6 = _slicedToArray(_useState5, 2),
      maxPage = _useState6[0],
      setMaxPage = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
      _useState8 = _slicedToArray(_useState7, 2),
      attrSort = _useState8[0],
      setAttrSort = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
      _useState10 = _slicedToArray(_useState9, 2),
      label = _useState10[0],
      setLabel = _useState10[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var sort = "",
        direction = "";

    if (attrSort != "") {
      sort = attrSort.includes("updated") ? "updated" : attrSort.includes("commented") ? "comments" : "created";
      direction = attrSort.includes("Least") || attrSort.includes("Oldest") ? "asc" : "desc";
    }

    fetch(BASE_URL + "&page=".concat(currentPage) + (attrSort == "" ? "&q=" : "&sort=".concat(sort, "&direction=").concat(direction)) + (label == "" ? "" : "&labels=".concat(label)), {
      headers: new Headers({
        Authorization: "token 4c26b78d331d8e988cdd5811b5d235872b8f1fe0"
      })
    }).then(function (response) {
      var links = parse_link_header__WEBPACK_IMPORTED_MODULE_4___default()(response.headers.get("Link"));
      if (links.last && maxPage != +links.last.page) setMaxPage(+links.last.page);
      return response.json();
    }).then(function (_data) {
      return setData(_data);
    })["catch"](function (error) {
      return console.error(error);
    });
  }, [currentPage, attrSort, label]);

  var handlePaginationButtonClick = function handlePaginationButtonClick(page) {
    if (page == "prev") {
      setCurrentPage(currentPage - 1);
    } else if (page == "next") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(+page);
    }
  };

  var handleSortButtonClick = function handleSortButtonClick(attr) {
    return setAttrSort(attrSort == attr ? "" : attr);
  };

  var handleLabelButtonClick = function handleLabelButtonClick(newLabel) {
    return setLabel(newLabel === label ? "" : newLabel);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var url = // "https://en.wikipedia.org/w/api.php?action=query&titles=Albert%20Einstein&format=json&prop=images";
    "https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&format=json&prop=wikitext&origin=*"; // var params = {
    //   action: "parse",
    //   page: "Pet_door",
    //   prop: "wikitext",
    //   formatversion: "2",
    //   fomat: "json"
    // };
    // url = url + "?origin=*";
    // Object.keys(params).forEach(function(key) {
    //   url += "&" + key + "=" + params[key];
    // });
    // console.log(url);

    fetch(url).then(function (response) {
      // console.log(response);
      return response.json();
    }) // .then(function(response) {
    //   // var pages = response.query.pages;
    // console.log(response);
    //   // for (var p in pages) {
    //   //   console.log(pages[p].revisions);
    //   // }
    //   //
    // })
    ["catch"](function (error) {
      console.log(error);
    });
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "app"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "main "
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "filters"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Author"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LabelMenu__WEBPACK_IMPORTED_MODULE_6__[/* LabelMenu */ "a"], {
    chooseItem: label,
    onClick: handleLabelButtonClick
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Projects"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Milestones"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Assignee"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SortMenu__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    chooseItem: attrSort,
    onClick: handleSortButtonClick
  })), data.length && data.map(function (issue) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Issue__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _extends({
      onClick: handleLabelButtonClick,
      key: issue.id
    }, issue));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PaginationButtonGroup, {
    style: {
      "margin-top": "20px"
    },
    maxPage: maxPage,
    currentPage: currentPage,
    onClick: function onClick(page) {
      return handlePaginationButtonClick(page);
    }
  }));
};

__signature__(App, "useState{[data, setData]([])}\nuseState{[currentPage, setCurrentPage](1)}\nuseState{[maxPage, setMaxPage](20)}\nuseState{[attrSort, setAttrSort](\"\")}\nuseState{[label, setLabel](\"\")}\nuseEffect{}\nuseEffect{}");

var _default = App;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(range, "range", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/GitHubApp/index.js");
  reactHotLoader.register(BASE_URL, "BASE_URL", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/GitHubApp/index.js");
  reactHotLoader.register(PaginationButtonGroup, "PaginationButtonGroup", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/GitHubApp/index.js");
  reactHotLoader.register(App, "App", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/GitHubApp/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/GitHubApp/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _IssueTooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






dayjs__WEBPACK_IMPORTED_MODULE_1___default.a.extend(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2___default.a);
/* eslint babel/camelcase: "off" */

var Issue = function Issue(_ref) {
  var onClick = _ref.onClick,
      number = _ref.number,
      title = _ref.title,
      labels = _ref.labels,
      created_at = _ref.created_at,
      user = _ref.user,
      body = _ref.body;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "issue"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "icon"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    className: "octicon octicon-issue-opened open",
    viewBox: "0 0 14 16",
    version: "1.1",
    width: "14",
    height: "16",
    "aria-hidden": "true"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    fillRule: "evenodd",
    style: {
      fill: "#28A745"
    },
    d: "M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "header",
    style: {
      display: "inline"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueTooltip__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    created_at: created_at,
    number: number,
    body: body,
    labels: labels,
    title: title
  }), labels.map(function (label, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Label__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      onClick: onClick,
      key: index,
      name: label.name,
      color: label.color
    });
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "info"
  }, "#".concat(number), " opened", " ", dayjs__WEBPACK_IMPORTED_MODULE_1___default()().from(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(created_at)).replace(" in", ""), " ", "ago by ", user.login));
};

var _default = Issue;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Issue, "Issue", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Issue/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/Issue/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_5__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};







dayjs__WEBPACK_IMPORTED_MODULE_5___default.a.extend(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_4___default.a);
var CustomTooltip = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(function () {
  return {
    tooltip: {
      maxWidth: 500,
      padding: 16,
      backgroundColor: "white",
      boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)"
    }
  };
})(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
/* eslint babel/camelcase: "off" */

var IssueTooltip = function IssueTooltip(_ref) {
  var created_at = _ref.created_at,
      number = _ref.number,
      body = _ref.body,
      labels = _ref.labels,
      title = _ref.title;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CustomTooltip, {
    arrow: true,
    title: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "issue__tooltip"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "issue__tooltip-header"
    }, "facebook/create-react-app on " + dayjs__WEBPACK_IMPORTED_MODULE_5___default()(created_at).format("MMM DD")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "issue__tooltip-title"
    }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "issue__tooltip-number"
    }, " #" + number), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "issue__tooltip-body"
    }, body && body.split(" ").map(function (s, i) {
      return i > 20 ? "" : s;
    }).join(" ") + "..."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), labels.map(function (label, index) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Label__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        key: index,
        name: label.name,
        color: label.color
      });
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "issue__title"
  }, title));
};

var _default = IssueTooltip;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CustomTooltip, "CustomTooltip", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/IssueTooltip/index.js");
  reactHotLoader.register(IssueTooltip, "IssueTooltip", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/IssueTooltip/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/IssueTooltip/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



var SortMenuItem = Object(_Menu__WEBPACK_IMPORTED_MODULE_1__[/* MenuItem */ "c"])(function (_ref) {
  var id = _ref.id;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, id);
});

var SortMenuContent = function SortMenuContent(_ref2) {
  var chooseItem = _ref2.chooseItem,
      handleClose = _ref2.handleClose;
  var data = ["Newest", "Oldest", "Most commented", "Least commented", "Recently updated", "Least recently updated"];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu__WEBPACK_IMPORTED_MODULE_1__[/* MenuHeader */ "b"], {
    text: "Sort by"
  }), data.map(function (id, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SortMenuItem, {
      key: index,
      id: id,
      choose: id == chooseItem,
      onClick: handleClose
    });
  }));
};

var SortedMenu = Object(_Menu__WEBPACK_IMPORTED_MODULE_1__[/* Menu */ "a"])("Sort", SortMenuContent);
var _default = SortedMenu;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SortMenuItem, "SortMenuItem", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/SortMenu/index.js");
  reactHotLoader.register(SortMenuContent, "SortMenuContent", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/SortMenu/index.js");
  reactHotLoader.register(SortedMenu, "SortedMenu", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/SortMenu/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/SortMenu/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export MenuContent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabelMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var style = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  "color-box": {
    display: "inline-block",
    height: 15,
    width: 15,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: function backgroundColor(props) {
      return props.color;
    }
  }
});
var LabelMenuItem = Object(_Menu__WEBPACK_IMPORTED_MODULE_1__[/* MenuItem */ "c"])(function (_ref) {
  var id = _ref.id,
      color = _ref.color;
  var classes = style({
    color: color
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.content
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes["color-box"]
  }), id);
});
var MenuContent = function MenuContent(_ref2) {
  var chooseItem = _ref2.chooseItem,
      handleClose = _ref2.handleClose;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      labels = _useState2[0],
      setLabels = _useState2[1];

  var authorization = new Headers({
    Authorization: "token 4c26b78d331d8e988cdd5811b5d235872b8f1fe0"
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetch("https://api.github.com/repos/facebook/create-react-app/labels", {
      headers: authorization
    }).then(function (response) {
      return response.json();
    }).then(function (labels) {
      return setLabels(labels);
    })["catch"](function (error) {
      return console.error(error);
    });
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu__WEBPACK_IMPORTED_MODULE_1__[/* MenuHeader */ "b"], {
    text: "Filter by label"
  }), labels.map(function (label, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LabelMenuItem, {
      key: index,
      id: label.name,
      color: "#" + label.color,
      choose: label.name == chooseItem,
      onClick: handleClose
    });
  }));
};

__signature__(MenuContent, "useState{[labels, setLabels]([])}\nuseEffect{}");

var LabelMenu = Object(_Menu__WEBPACK_IMPORTED_MODULE_1__[/* Menu */ "a"])("Labels", MenuContent);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(style, "style", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/LabelMenu/index.js");
  reactHotLoader.register(LabelMenuItem, "LabelMenuItem", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/LabelMenu/index.js");
  reactHotLoader.register(MenuContent, "MenuContent", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/LabelMenu/index.js");
  reactHotLoader.register(LabelMenu, "LabelMenu", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/LabelMenu/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_GitHubApp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_GitHubApp__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null), document.getElementById("app"));

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map