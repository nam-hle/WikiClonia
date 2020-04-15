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
/******/ 		3: 0
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
/******/ 	deferredModules.push([78,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export Text */
/* unused harmony export Template */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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

 // import { trimAll } from "./../../../wiki_parser";

var Text = function Text(_ref) {
  var text = _ref.text;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
      _useState2 = _slicedToArray(_useState, 2),
      splitText = _useState2[0],
      setSplitText = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var paragraphs = text.split("\n\n"),
        res = [];

    for (var i = 0; i < paragraphs.length; i++) {
      res.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        key: -i - 1
      }, paragraphs[i]));

      if (i < paragraphs.length - 1) {
        res.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
          key: i
        }));
      }
    }

    setSplitText(res);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, splitText);
};

__signature__(Text, "useState{[splitText, setSplitText](\"\")}\nuseEffect{}");

var Template = function Template(_ref2) {
  var props = _ref2.props;

  if (Array.isArray(props.children)) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, props.children.map(function (e, i) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
        key: i,
        props: e
      });
    }));
  }

  var attribute = props.attribute;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "wiki-cite",
    href: attribute.url
  }, "\"".concat(attribute.title, "\"")), ". ", props.subType == "web" && attribute.publisher && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "".concat(attribute.publisher, ". ")), props.subType == "web" && attribute.accessdate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Retrieved ".concat(attribute.accessdate, ". ")));
};
var Element = function Element(_ref3) {
  var props = _ref3.props,
      images = _ref3.images;
  var elementName = props.elementName,
      children = props.children;

  if (elementName == "ExternalLink") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "https://en.wikipedia.org/wiki/" + props.url
    }, props.displayText);
  }

  if (elementName == "Text") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Text, {
      text: props.text
    });
  }

  if (elementName == "Template") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Template, {
      props: props
    });
  }

  var renderChildren;

  if (Array.isArray(children)) {
    renderChildren = children.map(function (e, i) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
        key: i,
        props: e
      });
    });
  }

  if (elementName == "Bold") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "wiki-bold"
    }, renderChildren);
  }

  if (elementName == "Italic") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "wiki-italic"
    }, renderChildren);
  }

  if (elementName == "BoldItalic") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "wiki-italic wiki-bold"
    }, renderChildren);
  }

  if (elementName == "Block Quote") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("blockquote", null, renderChildren);
  }

  if (elementName.slice(0, -1) == "Heading") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: props.className,
      id: props.id
    }, props.text);
  } // if (elementName == "Heading2") {
  //   return <h3>{renderChildren}</h3>;
  // }


  if (elementName == "Link") {
    var type = props.type;

    if (type == "wikiLink") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://en.wikipedia.org/wiki/" + props.url
      }, props.displayText);
    }

    if (type == "media") {
      if (props && props.url && images && images[props.url]) {
        var _float = props.options.indexOf("left") > -1 ? "fl-left" : "fl-right";

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "wiki-img__container ".concat(_float)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "wiki-img__image",
          src: images[props.url].url
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "wiki-img__caption"
        }, props.caption.map(function (e, i) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
            key: i,
            props: e
          });
        }))));
      }
    }
  } else if (elementName == "Reference") {
    if (props.children && props.children.length && props.children[0].attribute && props.children[0].attribute.url) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: props.children[0].attribute.url
      }, props.referenceIndex));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: props
    }, props.referenceIndex));
  }

  return JSON.stringify(props);
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Text, "Text", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(Template, "Template", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(Element, "Element", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Article__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null);
};

var _default = App;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wiki_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var _SideBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(58);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








var Article = function Article() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState2 = _slicedToArray(_useState, 2),
      images = _useState2[0],
      setImages = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      references = _useState4[0],
      setReferences = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState6 = _slicedToArray(_useState5, 2),
      parsed = _useState6[0],
      setParsed = _useState6[1]; // get main content


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var url = "https://en.wikipedia.org/w/api.php?action=parse&page=The_Last_Supper_(Leonardo)&format=json&prop=wikitext&origin=*";
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (_text) {
      var rawText = _text.parse.wikitext["*"];
      var startIndex = rawText.indexOf("'''''The Last Supper'''''");
      var cutoffText = rawText.slice(startIndex);
      setParsed(Object(_wiki_parser__WEBPACK_IMPORTED_MODULE_1__[/* main */ "a"])(cutoffText));
    })["catch"](function (error) {
      console.log(error);
    });
  }, []); // get references

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (parsed.children) {
      var res = [];

      var _iterator = _createForOfIteratorHelper(parsed.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;

          if (element.elementName == "Reference") {
            res.push(element);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      setReferences(res);
    }
  }, [parsed]); // get images

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var url = "https://en.wikipedia.org/w/api.php?action=query&titles=The_Last_Supper_(Leonardo)&generator=images&gimlimit=500&prop=imageinfo&iiprop=url|dimensions|mime&format=json&origin=*";
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      var imgs = data.query.pages,
          res = {};

      for (var key in imgs) {
        res[imgs[key].title] = imgs[key].imageinfo[0];
      }

      setImages(res);
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "article"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SideBar__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    headings: parsed.headings
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hero"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hero__title"
  }, "The Last Supper"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hero__credit"
  }, "From Wikipedia, the free encyclopedia"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    content: parsed.children,
    images: images
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Reference__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    references: references
  }))));
};

__signature__(Article, "useState{[images, setImages]({})}\nuseState{[references, setReferences]([])}\nuseState{[parsed, setParsed]({})}\nuseEffect{}\nuseEffect{}\nuseEffect{}");

var _default = Article;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Article, "Article", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main; });
/* unused harmony export clean */
/* unused harmony export trimQuote */
/* unused harmony export trimAll */
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var taste = function taste(s, t, i) {
  return s[i] == t[0] && s.substr(i, t.length) == t;
};

var capitalizeFirst = function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var capitalize = function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

var trimAll = function trimAll(string) {
  return /^\s*([\s\S]+)\s*$/g.exec(string)[1];
};

var trimQuote = function trimQuote(str) {
  return '"' == str[0] && '"' == str[str.length - 1] ? str.slice(1, str.length - 1) : str;
};

var clean = function clean(obj) {
  var res = {};

  for (var key in obj) {
    var value = obj[key];
    if (value === null || value === undefined || Array.isArray(value) && value.length === 0 || Object.keys(value).length === 0 && value.constructor === Object) continue;
    res[key] = value;
  }

  return res;
}; //
// const toUperRoman = number => {
//   const romanNumList = {
//     M: 1000,
//     CM: 900,
//     D: 500,
//     CD: 400,
//     C: 100,
//     XC: 90,
//     L: 50,
//     XV: 40,
//     X: 10,
//     IX: 9,
//     V: 5,
//     IV: 4,
//     I: 1
//   };
//   let roman = "",
//     a;
//   if (number < 1 || number > 3999) throw "Enter a number between 1 and 3999";
//   for (let key in romanNumList) {
//     a = Math.floor(number / romanNumList[key]);
//     if (a >= 0) for (let i = 0; i < a; i++) roman += key;
//     number = number % romanNumList[key];
//   }
//   return roman;
// };
// const toLowerRoman = num => toUperRoman(num).toLowerCase();


var CiteParser = function CiteParser(plain) {
  var R_CITE = /*#__PURE__*/_wrapRegExp(/\{\{cite ([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\|([\0-\uFFFF]*)\}\}$/gi, {
    subType: 1,
    attributes: 2
  });

  var _R_CITE$exec$groups = R_CITE.exec(plain).groups,
      subType = _R_CITE$exec$groups.subType,
      attributes = _R_CITE$exec$groups.attributes,
      attribute = {};

  var _iterator = _createForOfIteratorHelper(attributes.split("|")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pair = _step.value;
      var equalIndex = pair.indexOf("=");
      var _ref = [pair.slice(0, equalIndex), pair.slice(equalIndex + 1).trim()],
          key = _ref[0],
          value = _ref[1];
      attribute[key] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [{
    type: "cite",
    subType: subType,
    attribute: attribute
  }, null];
}; // <ref name=manchester2002>''LibreOffice for Starters'', First Edition, Flexible Minds, Manchester, 2002, p. 18</ref>
// <ref name=manchester2002 />


var ReferenceParser = function ReferenceParser(plain) {
  var refname,
      refgroup,
      children,
      match,
      remain = plain; // 1. Extract tag name

  var R_HEAD = /*#__PURE__*/_wrapRegExp(/^<ref(erences)? *([\0-\uFFFF]*)$/gi, {
    remain: 2
  });

  if ((match = R_HEAD.exec(plain)) === null) throw "Reference Synxtax Error " + plain;
  remain = match.groups.remain; // 2. Try extract refgroup

  var R_GROUP = /*#__PURE__*/_wrapRegExp(/^group *= *("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-\uFFFF]*)$/gi, {
    refgroup: 1,
    remain: 2
  });

  if ((match = R_GROUP.exec(remain)) !== null) {
    remain = match.groups.remain;
    refgroup = match.groups.refgroup;
  } // 3. Try extract refname


  var R_NAME = /*#__PURE__*/_wrapRegExp(/^name *= *("[\0-!\$-&\(-\.0-<\?-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-\uFFFF]*)$/gi, {
    refname: 1,
    remain: 2
  });

  if ((match = R_NAME.exec(remain)) !== null) {
    remain = match.groups.remain;
    refname = match.groups.refname;
  } // 4.1. Reuse Reference


  if (/^\s*\/>$/.exec(remain)) {
    return [{
      type: "reuse",
      refname: refname,
      refgroup: refgroup
    }, []];
  } // 4.2. Firstuse Reference


  var R_FIRSTUSE = /*#__PURE__*/_wrapRegExp(/^>([\0-\uFFFF]+)<\/ref>$/gi, {
    children: 1
  });

  if ((match = R_FIRSTUSE.exec(remain)) === null) {
    throw "Firstuse Reference Error " + remain;
  }

  children = main(match.groups.children).children;
  if (refname) refname = trimQuote(refname);
  if (refgroup) refgroup = trimQuote(refgroup);
  return [{
    type: "firstuse",
    refname: refname,
    refgroup: refgroup
  }, children];
};

var FootnoteParser = function FootnoteParser(plain) {
  var match,
      remain,
      fnGroup,
      fnName,
      subType,
      children,
      type = "footnote"; // 1. Extract subType footnote

  var R_FOOTNOTE = /*#__PURE__*/_wrapRegExp(/^\{\{([\0-\{\}-\uFFFF]+)\|([\0-\uFFFF]+)\}\}$/, {
    subType: 1,
    remain: 2
  });

  if ((match = R_FOOTNOTE.exec(plain)) === null) throw "Footnote Error";
  subType = match.groups.subType;
  remain = match.groups.remain; // 2. Extract group footnote

  var R_GROUP = /*#__PURE__*/_wrapRegExp(/^group=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)\|([\0-\uFFFF]+)$/, {
    fnGroup: 1,
    remain: 2
  });

  if ((match = R_GROUP.exec(remain)) !== null) {
    fnGroup = match.groups.fnGroup;
    remain = match.groups.remain;
  } // 3. Extract name footnote


  var R_NAME = /*#__PURE__*/_wrapRegExp(/^name=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)(\|([\0-\uFFFF]+))?$/, {
    fnName: 1,
    remain: 3
  });

  if ((match = R_NAME.exec(remain)) !== null) {
    fnName = match.groups.fnName;
    remain = match.groups.remain;
  } // 4. Parse real content footnote


  children = remain ? main(remain).children : []; // NOTE: numering foonote will be done in analyseReference function

  return [{
    type: type,
    subType: subType,
    fnName: fnName,
    fnGroup: fnGroup
  }, children];
};

var internalParse = function internalParse(element, content, plain) {
  if (element.elementName == "Reference") {
    return ReferenceParser(plain);
  } else if (element.elementName == "ExternalLink") {
    var R_EXTERNAL = /*#__PURE__*/_wrapRegExp(/^\[([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)( ([\0-\uFFFF]+))?\]$/gi, {
      url: 1,
      displayText: 3
    });

    var match, url, displayText;

    if ((match = R_EXTERNAL.exec(plain)) !== null) {
      var _ref2 = [match.groups.url, match.groups.displayText];
      url = _ref2[0];
      displayText = _ref2[1];
      return [{
        url: url,
        displayText: displayText
      }, []];
    } else {
      throw "ExternalLink Grammar Error";
    }
  } else if (element.elementName == "Template") {
    if (/^{{[Cc]ite/g.test(plain)) {
      return CiteParser(plain);
    } else if (/^{{(refn|efn|efn-(la|ua|lr|ur|lg))\|/.test(plain)) {
      return FootnoteParser(plain);
    } else if (/^{{lang-\w+\|/gi.test(plain)) {
      var text = /\|(.*)}}$/.exec(plain)[1];
      return [{
        type: "lang"
      }, [{
        elementName: "Italic",
        children: [{
          elementName: "Text",
          text: text
        }]
      }]];
    } else if (/^{{IPA-\w+\|/gi.test(plain)) {
      var _text = /\|(.*)}}$/.exec(plain)[1];
      return [{
        type: "lang"
      }, [{
        elementName: "Text",
        text: "[" + _text + "]"
      }]];
    }

    return [null, [{
      elementName: "Text",
      text: "{{N/A: ".concat(plain, "}}")
    }]];
  } else if (element.elementName == "Link") {
    var _match;
    /********************************
     *          FREE LINK
     *******************************/

    /*
    /* ^
    /*  \[\[            startTokent
    /*  ([^|]+)         fullUrl
    /*  (\|([^|]+)?)?   optinal (pipe and optinal display text)
    /*  \]\]            endToken
    /*  (\w+)?          suffixStr
    /* $
    */


    var R_ARTICLE = /^\[\[([^|]+)(\|([^|]+)?)?\]\](\w+)?$/;

    if (_match = R_ARTICLE.exec(plain)) {
      // console.log("Will parse ", plain);
      var fullUrl = _match[1],
          nonePipe = !_match[2],
          trailingPipe = _match[2] && !_match[3],
          _displayText = _match[3],
          suffixStr = _match[4] || ""; // if ("[[Bokmål]]" == plain)
      //   console.log({
      //     fullUrl,
      //     nonePipe,
      //     trailingPipe,
      //     displayText,
      //     suffixStr
      //   });
      // Manipulate the url

      var namespace, disambiguation, rootUrl, _url; //
      // ^
      //  ((\w+):)?   namespace?
      //  (
      //      ([\w\-,. ]+)( \((.+)\))  commas has priority over parantheses
      //    |
      //      ([\w\-. ]+)
      //      (
      //          \((.+)\)          trailing parentheses
      //        |
      //          , (.+)            trailing comma
      //      )?
      //  )
      // $


      var urlMatch = /^((\w+):)?(([\w\-,. ]+)( \((.+)\))|([\w\-. ]+)( \((.+)\)|, (.+))?)$/.exec(fullUrl);
      if (urlMatch === null) return content;
      namespace = capitalize(urlMatch[1] || "");
      rootUrl = urlMatch[4] || urlMatch[7];
      disambiguation = urlMatch[5] || urlMatch[8] || "";

      if ("File:" != namespace) {
        _url = namespace + capitalizeFirst(rootUrl) + disambiguation;
        _url = _url.replace(/ /g, "_"); // convert to valid URL

        _displayText = nonePipe ? fullUrl : trailingPipe ? rootUrl : _displayText;
        _displayText += suffixStr;
        return [{
          type: "wikiLink",
          url: _url,
          displayText: _displayText
        }, null];
      }
    } // For handling format like:
    // [[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}''
    // in [[Rincón de Ademuz]]


    var chunks = plain.slice(2, -2).split("|");
    var first = chunks[0];
    var R_MEDIA = /^(File|Image|Media):(.*)$/i;

    if (_match = R_MEDIA.exec(first)) {
      var type = "media",
          supType = capitalizeFirst(_match[1]),
          _rootUrl = capitalizeFirst(_match[2]),
          _url2 = "".concat(supType, ":").concat(_rootUrl);

      var meta = {
        type: type,
        supType: supType,
        url: _url2
      },
          options = [],
          caption = "";
      var R_OPTION = /^(border|frame(less)?|thumb(nail)?|((\d+)?x)?\d+px|upright[ =]\d+\.\d+|upright=?|left|right|cent(er|re)|none|baseline|sub|super|top|text-top|middle|bottom|text-bottom|(alt|page|class|lang|link)=.+)$/i,
          R_ATTRIBUTE = /^(alt|page|class|lang|link)=(.*$)/i;

      var _iterator2 = _createForOfIteratorHelper(chunks.slice(1)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var chunk = _step2.value;

          if (!R_OPTION.test(chunk)) {
            caption += chunk;
            continue;
          }

          var _match2 = void 0;

          if (_match2 = R_ATTRIBUTE.exec(chunk)) {
            options.push({
              key: _match2[1],
              value: _match2[2]
            });
          } else options.push(chunk);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      caption = main(caption).children;
      meta = _objectSpread({}, meta, {
        options: options,
        caption: caption
      });
      return [meta, null];
    }

    return [null, content];
  }

  return [null, _toConsumableArray(content)];
};

var BoldItalic = {
  elementName: "BoldItalic",
  startToken: "'''''",
  endToken: ["'''''"],
  allowElements: []
},
    Bold = {
  elementName: "Bold",
  startToken: "'''",
  endToken: ["'''"],
  allowElements: []
},
    Italic = {
  elementName: "Italic",
  startToken: "''",
  endToken: ["''"],
  allowElements: []
},
    Link = {
  elementName: "Link",
  startToken: "[[",
  endToken: ["]]"],
  allowElements: [Bold, Italic]
},
    ExternalLink = {
  elementName: "ExternalLink",
  startToken: "[",
  endToken: ["]"],
  allowElements: []
},
    Heading1 = {
  elementName: "Heading1",
  startToken: "==",
  endToken: ["=="],
  allowElements: []
},
    Heading2 = {
  elementName: "Heading2",
  startToken: "===",
  endToken: ["==="],
  allowElements: []
},
    Heading3 = {
  elementName: "Heading3",
  startToken: "====",
  endToken: ["===="],
  allowElements: []
},
    Heading4 = {
  elementName: "Heading4",
  startToken: "=====",
  endToken: ["====="],
  allowElements: []
},
    Heading5 = {
  elementName: "Heading5",
  startToken: "======",
  endToken: ["======"],
  allowElements: []
},
    Heading6 = {
  elementName: "Heading6",
  startToken: "=======",
  endToken: ["======="],
  allowElements: []
},
    Reference = {
  elementName: "Reference",
  startToken: "<ref",
  endToken: ["</ref>", "/>"],
  allowElements: []
},
    Template = {
  elementName: "Template",
  startToken: "{{",
  endToken: ["}}"],
  allowElements: []
},
    BlockQuote = {
  elementName: "Block Quote",
  startToken: "<blockquote>",
  endToken: ["</blockquote>"],
  allowElements: [Italic, Bold, BoldItalic]
},
    Global = {
  elementName: "Global",
  startToken: null,
  endToken: null,
  allowElements: [BoldItalic, Bold, Italic, Link, ExternalLink, Heading6, Heading5, Heading4, Heading3, Heading2, Heading1, Reference, BlockQuote, Template]
};
Link.allowElements.push(Link);
Italic.allowElements.push(Link);
Reference.allowElements.push(Template);
Template.allowElements.push(Template, Reference, Link);

var analyseHeadings = function analyseHeadings(headings) {
  var getLevel = function getLevel(heading) {
    return +/^Heading(\d)$/.exec(heading.elementName)[1];
  };

  var currentLevel = 0,
      res = {},
      currentHeading = res;
  res.indices = [];

  var _iterator3 = _createForOfIteratorHelper(headings),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var heading = _step3.value;
      var level = getLevel(heading),
          headingText = heading.children[0].text.trim(),
          headingId = headingText.replace(/\s/, "") + "_" + level; // add metadata

      heading.level = level;
      heading.text = headingText;
      heading.id = headingId;
      heading.className = "wiki-heading-" + level;
      heading.indices = currentHeading.indices.slice(); // connect heading to heading tree

      if (level > currentLevel) {
        heading.indices.push(1);
        if (!currentHeading.childrenHeadings) currentHeading.childrenHeadings = [];
        heading.parentHeading = currentHeading;
        currentHeading.childrenHeadings.push(heading);
      } else if (level == currentLevel) {
        heading.indices[heading.indices.length - 1]++;
        var parent = currentHeading.parentHeading;
        parent.childrenHeadings.push(heading);
        heading.parentHeading = parent;
      } else {
        heading.indices = heading.indices.slice(0, level);
        heading.indices[heading.indices.length - 1]++;
        var grandParent = currentHeading.parentHeading.parentHeading;
        grandParent.childrenHeadings.push(heading);
        heading.parentHeading = grandParent;
      }

      currentHeading = heading;
      currentLevel = level;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return res;
};

var parse = function parse(s, l, i, e) {
  var buffer = "",
      plain = "",
      cur,
      res = [],
      options = {},
      referenceIndex = 0,
      headings = [];
  l = l === null ? s.length : l;
  var elementName = e.elementName,
      startToken = e.startToken,
      endToken = e.endToken,
      allowElements = e.allowElements;
  i += startToken === null ? 0 : startToken.length;
  plain += startToken === null ? "" : startToken;

  while (i < l) {
    var has = false;

    for (var j = 0; j < allowElements.length; j++) {
      var element = allowElements[j];

      if (taste(s, element.startToken, i)) {
        if (buffer) res.push({
          elementName: "Text",
          text: buffer
        });
        buffer = "";
        has = true;
        var curPlain = void 0;

        var _parse = parse(s, l, i, element);

        var _parse2 = _slicedToArray(_parse, 3);

        i = _parse2[0];
        cur = _parse2[1];
        curPlain = _parse2[2];
        plain += curPlain;

        if (element.elementName == "Reference") {
          cur.referenceIndex = ++referenceIndex;
        }

        if (/^Heading/.exec(cur.elementName) !== null) {
          headings.push(cur);
        }

        res.push(cur);
        break;
      }
    }

    if (!has) {
      if (endToken) {
        var catchEndToken = false;

        var _iterator4 = _createForOfIteratorHelper(endToken),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var eToken = _step4.value;

            if (taste(s, eToken, i)) {
              catchEndToken = true;
              i += eToken.length;
              plain += eToken; // perform get suffix string when parsing Link

              if (elementName == "Link") {
                while (i < l) {
                  var nowiki = "<nowiki />";

                  if (taste(s, nowiki, i)) {
                    i += nowiki.length;
                    break;
                  } else if (/\w/.test(s[i])) {
                    plain += s[i++];
                  } else break;
                }
              }
            } // end taste

          } // end for endToken

        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (catchEndToken) break;
      } // end if endToken


      plain += s[i];
      buffer += s[i++];
    } // end not has

  }

  if (buffer) res.push({
    elementName: "Text",
    text: buffer
  });

  var _internalParse = internalParse(e, res, plain, options),
      _internalParse2 = _slicedToArray(_internalParse, 2),
      meta = _internalParse2[0],
      children = _internalParse2[1];

  headings = headings.length ? analyseHeadings(headings) : null;
  return [i, clean(_objectSpread({
    elementName: elementName,
    children: children,
    headings: headings
  }, meta)), plain];
};

var main = function main(s) {
  return parse(s, null, 0, Global)[1];
};

 // console.log(
//   JSON.stringify(
//     main(
//       `'''''The Last Supper''''' ({{lang-it|Il Cenacolo}} {{IPA-it|il tʃeˈnaːkolo|}} or ''L'Ultima Cena'' {{IPA-it|ˈlultima ˈtʃeːna|}}) is a late 15th-century [[mural]] painting by Italian artist [[Leonardo da Vinci]] housed by the [[refectory]] of the Convent of [[Santa Maria delle Grazie (Milan)|Santa Maria delle Grazie]] in [[Milan]], [[Italy]]. It is one of the Western world's most recognizable paintings.<ref>{{cite web |url=https://www.sciencedaily.com/releases/2010/03/100331091143.htm |title=Leonardo Da Vinci's 'The Last Supper' reveals more secrets |publisher=sciencedaily.com |accessdate=3 March 2014}}</ref>`
//     ),
//     null,
//     2
//   )
// );

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(taste, "taste", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(capitalizeFirst, "capitalizeFirst", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(capitalize, "capitalize", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(trimAll, "trimAll", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(trimQuote, "trimQuote", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(clean, "clean", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(CiteParser, "CiteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ReferenceParser, "ReferenceParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(FootnoteParser, "FootnoteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(internalParse, "internalParse", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(BoldItalic, "BoldItalic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Bold, "Bold", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Italic, "Italic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Link, "Link", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ExternalLink, "ExternalLink", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading1, "Heading1", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading2, "Heading2", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading3, "Heading3", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading4, "Heading4", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading5, "Heading5", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading6, "Heading6", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Reference, "Reference", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Template, "Template", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(BlockQuote, "BlockQuote", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Global, "Global", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(analyseHeadings, "analyseHeadings", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(parse, "parse", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(main, "main", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



var Heading = function Heading(_ref) {
  var heading = _ref.heading;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    style: {
      paddingLeft: "".concat(heading.level * 16, "rem")
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#" + heading.id,
    className: "heading-" + (heading.level == 1 ? "primary" : "secondary")
  }, heading.indices.join(".") + ". " + heading.text)), heading.childrenHeadings && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, heading.childrenHeadings.map(function (child, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Heading, {
      key: index,
      heading: child
    });
  })));
};

var Sidebar = function Sidebar(_ref2) {
  var headings = _ref2.headings;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sidebar"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sidebar__title"
  }, "TABLE OF CONTENT"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, headings && headings.childrenHeadings.map(function (child, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Heading, {
      key: index,
      heading: child
    });
  })));
};

var _default = Sidebar;
/* harmony default export */ __webpack_exports__["a"] = (_default); // {headings &&
//   Object.keys(headings).map((h1, i) => {
//     let h2s = headings[h1];
//     return (
//       <Fragment key={i}>
//         <div className="sidebar__item" key={h1}>
//           <div className="sidebar__h1">{`${i + 1}. ` + h1}</div>
//           <div className="sidebar__h2s">
//             {h2s.map((h2, j) => (
//               <div className="sidebar__h2" key={h2}>
//                 {`${i + 1}.${j + 1}. ` + h2}
//               </div>
//             ))}
//           </div>
//         </div>
//       </Fragment>
//     );
//   })}

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Heading, "Heading", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SideBar/index.js");
  reactHotLoader.register(Sidebar, "Sidebar", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SideBar/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SideBar/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var Reference = function Reference(_ref) {
  var references = _ref.references;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, references.map(function (reference, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "wiki-ref",
      key: index
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, reference.referenceIndex + ". "), reference.children && reference.children.map(function (child, childIndex) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Elements__WEBPACK_IMPORTED_MODULE_1__[/* Element */ "a"], {
        key: childIndex,
        props: child
      });
    }));
  }));
};

var _default = Reference;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Reference, "Reference", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Reference/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Reference/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var find = function find(array, predicate) {
  var index = 0,
      length = array.length;

  for (; index < length; index++) {
    if (predicate(array[index])) return index;
  }

  return length;
};

var predicate = function predicate(element) {
  return element.elementName == "Heading1" && element.children[0].text == " References ";
};

var Content = function Content(_ref) {
  var content = _ref.content,
      images = _ref.images;
  if (!content) return "Loading...";
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, content.slice(0, find(content, predicate)).map(function (element, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Elements__WEBPACK_IMPORTED_MODULE_1__[/* Element */ "a"], {
      key: index,
      props: element,
      images: images
    });
  }));
};

var _default = Content;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(find, "find", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
  reactHotLoader.register(predicate, "predicate", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
  reactHotLoader.register(Content, "Content", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



var Menu = function Menu() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    style: {
      width: "100%",
      height: 40,
      backgroundColor: "#6A6A6A"
    }
  });
};

var _default = Menu;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Menu, "Menu", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Menu/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Menu/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_WikiApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_WikiApp__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null), document.getElementById("wikiapp"));

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=wiki.bundle.js.map