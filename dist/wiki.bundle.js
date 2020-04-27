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
/******/ 		4: 0
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
/******/ 	deferredModules.push([120,0,3]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(121);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_WikiApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_WikiApp__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null), document.getElementById("wikiapp"));

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return parseWikiText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pageContentParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return imageParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return summaryParams; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wiki_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



var parseWikiText = function parseWikiText(response) {
  var _response$parse, _response$parse$wikit;

  return Object(_wiki_parser__WEBPACK_IMPORTED_MODULE_1__[/* main */ "a"])(response === null || response === void 0 ? void 0 : (_response$parse = response.parse) === null || _response$parse === void 0 ? void 0 : (_response$parse$wikit = _response$parse.wikitext) === null || _response$parse$wikit === void 0 ? void 0 : _response$parse$wikit["*"]);
};

var buildURL = function buildURL(params) {
  return "https://en.wikipedia.org/w/api.php?" + new URLSearchParams(_objectSpread({}, params, {
    format: "json",
    origin: "*"
  }));
};

var pageContentParams = function pageContentParams(title) {
  return {
    action: "parse",
    prop: "wikitext",
    page: title
  };
};

var imageParams = function imageParams(title) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  return {
    action: "query",
    prop: "imageinfo",
    titles: title,
    generator: "images",
    gimlimit: limit,
    iiprop: "url|dimensions"
  };
};

var summaryParams = function summaryParams(title) {
  return {
    action: "query",
    prop: "extracts",
    exsentences: 2,
    exintro: true,
    explaintext: true,
    exsectionformat: "plain",
    redirects: 1,
    titles: title
  };
};


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(parseWikiText, "parseWikiText", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
  reactHotLoader.register(buildURL, "buildURL", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
  reactHotLoader.register(pageContentParams, "pageContentParams", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
  reactHotLoader.register(imageParams, "imageParams", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
  reactHotLoader.register(summaryParams, "summaryParams", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



var useFetch = function useFetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      response = _useState2[0],
      setResponse = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState5, 2),
      isLoading = _useState6[0],
      setIsLoading = _useState6[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var res, json;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setIsLoading(true);
                _context.prev = 1;
                _context.next = 4;
                return fetch(url, options);

              case 4:
                res = _context.sent;
                _context.next = 7;
                return res.json();

              case 7:
                json = _context.sent;
                setResponse(json);
                setIsLoading(false);
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                setError(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 12]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, []);
  return {
    response: response,
    error: error,
    isLoading: isLoading
  };
};

__signature__(useFetch, "useState{[response, setResponse](null)}\nuseState{[error, setError](null)}\nuseState{[isLoading, setIsLoading](false)}\nuseEffect{}");

var _default = useFetch;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useFetch, "useFetch", "/Users/hoangnam/Dev/Templates/ReactJS/src/hooks/useFetch.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/hooks/useFetch.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return usePageContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useImages; });
/* unused harmony export useSummary */
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WikiWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _useFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





var usePageContent = function usePageContent(title) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      pageContent = _useState2[0],
      setPageContent = _useState2[1];

  var pageContentFetcher = Object(_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* pageContentParams */ "c"])(title)));
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setPageContent(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* parseWikiText */ "d"])(pageContentFetcher.response));
  }, [pageContentFetcher.response]);
  return pageContent;
};

__signature__(usePageContent, "useState{[pageContent, setPageContent](null)}\nuseFetch{pageContentFetcher}\nuseEffect{}", function () {
  return [_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]];
});

var useImages = function useImages(title) {
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      images = _useState4[0],
      setImages = _useState4[1];

  var imageFetch = Object(_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* imageParams */ "b"])(title)));
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _imageFetch$response, _imageFetch$response$;

    var imgs = (_imageFetch$response = imageFetch.response) === null || _imageFetch$response === void 0 ? void 0 : (_imageFetch$response$ = _imageFetch$response.query) === null || _imageFetch$response$ === void 0 ? void 0 : _imageFetch$response$.pages,
        res = {}; // return object {filename: {url, width, height}}

    for (var key in imgs) {
      var _imgs$key, _imgs$key$imageinfo;

      var _imgs$key$imageinfo$ = (_imgs$key = imgs[key]) === null || _imgs$key === void 0 ? void 0 : (_imgs$key$imageinfo = _imgs$key.imageinfo) === null || _imgs$key$imageinfo === void 0 ? void 0 : _imgs$key$imageinfo[0],
          url = _imgs$key$imageinfo$.url,
          width = _imgs$key$imageinfo$.width,
          height = _imgs$key$imageinfo$.height;

      res[imgs[key].title] = {
        url: url,
        width: width,
        height: height
      };
    }

    setImages(res);
  }, [imageFetch.response]);
  return images;
};

__signature__(useImages, "useState{[images, setImages](null)}\nuseFetch{imageFetch}\nuseEffect{}", function () {
  return [_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]];
});

var useSummary = function useSummary(title, show) {
  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      summary = _useState6[0],
      setSummary = _useState6[1];

  var summaryFetch = Object(_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* summaryParams */ "e"])(title)), {
    show: show
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _summaryFetch$respons, _summaryFetch$respons2;

    var pages = (_summaryFetch$respons = summaryFetch.response) === null || _summaryFetch$respons === void 0 ? void 0 : (_summaryFetch$respons2 = _summaryFetch$respons.query) === null || _summaryFetch$respons2 === void 0 ? void 0 : _summaryFetch$respons2.pages;

    if (pages) {
      var extract = null;

      for (var key in pages) {
        var _pages$key;

        extract = (_pages$key = pages[key]) === null || _pages$key === void 0 ? void 0 : _pages$key.extract;
      }

      setSummary(extract);
    }
  }, [summaryFetch.response, show]);
  return summary;
};

__signature__(useSummary, "useState{[summary, setSummary](null)}\nuseFetch{summaryFetch}\nuseEffect{}", function () {
  return [_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]];
});


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(usePageContent, "usePageContent", "/Users/hoangnam/Dev/Templates/ReactJS/src/hooks/useWiki.js");
  reactHotLoader.register(useImages, "useImages", "/Users/hoangnam/Dev/Templates/ReactJS/src/hooks/useWiki.js");
  reactHotLoader.register(useSummary, "useSummary", "/Users/hoangnam/Dev/Templates/ReactJS/src/hooks/useWiki.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagesContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(82);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(89);
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(92);
/* harmony import */ var _hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(34);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(166);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_6__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};







 // import { Tooltip } from "react-lightweight-tooltip";
// import Sidebar from "./../SideBar";
// import Reference from "./../Reference";

var ImagesContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null);
var titles = [// "Pet_door"
"New_York_City", "The_Last_Supper_(Leonardo)", "Leonardo_da_Vinci", "Mona_Lisa", "Renaissance"];
var title = titles[Math.floor(Math.random() * titles.length)];

var Article = function Article() {
  var pageContent = Object(_hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* usePageContent */ "b"])(title);
  var images = Object(_hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* useImages */ "a"])(title); // get references
  // useEffect(() => {
  //   if (parsed.children) {
  //     let res = [];
  //     for (const element of parsed.children) {
  //       if (element.elementName == "Reference") {
  //         res.push(element);
  //       }
  //     }
  //     setReferences(res);
  //   }
  // }, [parsed]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ImagesContext.Provider, {
    value: {
      images: images
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__["SkeletonTheme"], {
    color: "#202020",
    highlightColor: "#444"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "article"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hero"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hero__title"
  }, title.replace(/_/g, " ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hero__credit"
  }, "From Wikipedia, the free encyclopedia"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    content: pageContent === null || pageContent === void 0 ? void 0 : pageContent.children
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Navigation__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    headings: pageContent === null || pageContent === void 0 ? void 0 : pageContent.headings
  })));
};

__signature__(Article, "usePageContent{pageContent}\nuseImages{images}", function () {
  return [_hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* usePageContent */ "b"], _hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* useImages */ "a"]];
});

var _default = Article;
/* harmony default export */ __webpack_exports__["b"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ImagesContext, "ImagesContext", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(titles, "titles", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(title, "title", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(Article, "Article", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var App = function App() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Article__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], null);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var Content = function Content(_ref) {
  var content = _ref.content,
      images = _ref.images;
  if (!content) return "Loading...";
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, content.map(function (element, index) {
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

  reactHotLoader.register(Content, "Content", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export Text */
/* unused harmony export Template */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(84);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



 // import { useSummary } from "./../../../hooks/useWiki.js";

var Text = function Text(_ref) {
  var text = _ref.text;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      splitText = _useState2[0],
      setSplitText = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var paragraphs = text.split("\n\n"),
        res = [];

    for (var i = 0; i < paragraphs.length; i++) {
      res.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        key: -i - 1
      }, paragraphs[i]));

      if (i < paragraphs.length - 1) {
        res.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
          key: i
        }));
      }
    }

    setSplitText(res);
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, splitText);
};

__signature__(Text, "useState{[splitText, setSplitText](\"\")}\nuseEffect{}");

var Heading = function Heading(_ref2) {
  var className = _ref2.className,
      id = _ref2.id,
      text = _ref2.text;
  var heading = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef();

  var isElementInViewport = function isElementInViewport() {
    // console.log("text");
    var el = heading.current; // Special bonus for those using jQuery

    var rect = el.getBoundingClientRect();
    var res = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (res) {
      console.log(text);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    window.addEventListener("scroll", isElementInViewport);
    return function () {
      return window.removeEventListener("scroll", isElementInViewport);
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    ref: heading,
    className: className,
    id: id
  }, text);
};

__signature__(Heading, "useRef{heading}\nuseEffect{}");

var WikiLink = function WikiLink(_ref3) {
  var url = _ref3.url,
      displayText = _ref3.displayText;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Tooltip__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    url: url
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "https://en.wikipedia.org/wiki/" + url
  }, displayText.map(function (e, i) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Element, {
      key: i,
      props: e
    });
  })));
};

var Template = function Template(_ref4) {
  var props = _ref4.props;
  if (props.type == "N/A" || props.type == "Infobox") return "";

  if (Array.isArray(props.children)) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, props.children.map(function (e, i) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Element, {
        key: i,
        props: e
      });
    }));
  }

  var attribute = props.attribute; // console.log(props);

  if (props.type == "multipleImages") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "wiki-gallery"
    }, props.images && props.images.map(function (e, i) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Element, {
        key: i,
        props: e
      });
    }));
  }

  if (props.type == "cite") return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "wiki-cite",
    href: attribute.url
  }, "\"".concat(attribute.title, "\"")), ". ", props.subType == "web" && attribute.publisher && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "".concat(attribute.publisher, ". ")), props.subType == "web" && attribute.accessdate && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Retrieved ".concat(attribute.accessdate, ". ")));
  return "<--N/A" + JSON.stringify(props) + "-->";
};
var Element = function Element(_ref5) {
  var props = _ref5.props;
  var elementName = props.elementName,
      children = props.children;
  if (elementName == "Comment") return "";

  if (elementName == "ExternalLink") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "https://en.wikipedia.org/wiki/" + props.url
    }, props.displayText);
  }

  if (elementName == "Break") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null);
  }

  if (elementName == "Text") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Text, {
      text: props.text
    });
  }

  if (elementName == "Template") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Template, {
      props: props
    });
  }

  var renderChildren;

  if (Array.isArray(children)) {
    renderChildren = children.map(function (e, i) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Element, {
        key: i,
        props: e
      });
    });
  }

  if (elementName == "Bold") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "wiki-bold"
    }, renderChildren);
  }

  if (elementName == "Italic") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "wiki-italic"
    }, renderChildren);
  }

  if (elementName == "BoldItalic") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "wiki-italic wiki-bold"
    }, renderChildren);
  }

  if (elementName == "Block Quote") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("blockquote", null, renderChildren);
  }

  if (elementName.slice(0, -1) == "Heading") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Heading, props);
  }

  if (elementName == "Gallery") {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "wiki-gallery"
    }, props.images.map(function (e, i) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Element, {
        key: i,
        props: e
      });
    }));
  }

  if (elementName == "Link") {
    var type = props.type;

    if (type == "wikiLink") {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(WikiLink, {
        url: props.url,
        displayText: props.displayText
      });
    }

    if (type == "media") {
      var valueImages = react__WEBPACK_IMPORTED_MODULE_1___default.a.useContext(_Article__WEBPACK_IMPORTED_MODULE_2__[/* ImagesContext */ "a"]);

      if (props && props.url && valueImages && valueImages.images[props.url]) {
        var _float = props.options && props.options.indexOf("left") > -1 ? "fl-left" : "fl-right";

        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "wiki-img__container ".concat(_float)
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
          id: props.url,
          className: "lazyload wiki-img__image",
          "data-src": valueImages.images[props.url].url
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "wiki-img__caption"
        }, props.caption ? props.caption.map(function (e, i) {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Element, {
            key: i,
            props: e
          });
        }) : "")));
      }
    }
  } else if (elementName == "Reference") {
    if (props.children && props.children.length && props.children[0].attribute && props.children[0].attribute.url) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
        href: props.children[0].attribute.url
      }, props.referenceIndex));
    }

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: props
    }, props.referenceIndex));
  }

  return JSON.stringify(props);
};

__signature__(Element, "useContext{valueImages}");

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Text, "Text", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(Heading, "Heading", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(WikiLink, "WikiLink", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(Template, "Template", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(Element, "Element", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WikiWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(161);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_4__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






var extractSummary = function extractSummary(json) {
  var _json$query, _json$query2, _json$query2$normaliz, _json$query2$normaliz2;

  var maxchar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var content = (_json$query = json.query) === null || _json$query === void 0 ? void 0 : _json$query.pages,
      extract = null,
      title = (_json$query2 = json.query) === null || _json$query2 === void 0 ? void 0 : (_json$query2$normaliz = _json$query2.normalized) === null || _json$query2$normaliz === void 0 ? void 0 : (_json$query2$normaliz2 = _json$query2$normaliz[0]) === null || _json$query2$normaliz2 === void 0 ? void 0 : _json$query2$normaliz2.to;

  for (var key in content) {
    var _content$key;

    extract = (_content$key = content[key]) === null || _content$key === void 0 ? void 0 : _content$key.extract;
  }

  extract = extract.substr(0, maxchar) + "...";
  return {
    extract: extract,
    title: title
  };
};

var Tooltip = function Tooltip(props) {
  var url = props.url,
      children = props.children;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      summary = _useState4[0],
      setSummary = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      title = _useState6[0],
      setTitle = _useState6[1];

  var handleMouseIn = function handleMouseIn() {
    return setShow(true);
  };

  var handleMouseOut = function handleMouseOut() {
    return setShow(false);
  };

  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(function () {
    if (show && !summary) {
      fetch(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* summaryParams */ "e"])(url))).then(function (response) {
        return response.json();
      }).then(function (json) {
        var _extractSummary = extractSummary(json),
            extract = _extractSummary.extract,
            title = _extractSummary.title;

        setSummary(extract);
        setTitle(title || url);
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }, [show]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "tooltip",
    onMouseOver: handleMouseIn,
    onMouseLeave: handleMouseOut
  }, show && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "tooltip-content top"
  }, title ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    style: {
      marginTop: 0,
      marginBottom: "5rem"
    },
    className: "tooltip-title"
  }, title) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3___default.a, {
    height: 100,
    duration: 1
  }), summary), react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.toArray(children));
};

__signature__(Tooltip, "useState{[show, setShow](false)}\nuseState{[summary, setSummary](null)}\nuseState{[title, setTitle](null)}\nuseEffect{}");

var _default = Tooltip;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(extractSummary, "extractSummary", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
  reactHotLoader.register(Tooltip, "Tooltip", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main; });
/* unused harmony export clean */
/* unused harmony export trimQuote */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(86);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(122);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(61);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(87);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var convert_units__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29);
/* harmony import */ var convert_units__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(convert_units__WEBPACK_IMPORTED_MODULE_9__);










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4___default()(["----"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4___default()(["|"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8___default()(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

 //
// var convert = require("convert-units");

var UNITS = convert_units__WEBPACK_IMPORTED_MODULE_9___default()().list();
var ABBR_UNITS = convert_units__WEBPACK_IMPORTED_MODULE_9___default()().list().map(function (unit) {
  return unit.abbr;
});

var taste = function taste(s, t, i) {
  return s[i] == t[0] && s.substr(i, t.length) == t;
};

var capitalizeFirst = function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var capitalize = function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

var trimQuote = function trimQuote(str) {
  return str && '"' == str[0] && '"' == str[str.length - 1] ? str.slice(1, str.length - 1) : str;
};

var clean = function clean(obj) {
  var res = {};

  for (var key in obj) {
    var value = obj[key];
    if (value === null || value === undefined || Array.isArray(value) && value.length === 0 || Object.keys(value).length === 0 && value.constructor === Object) continue;
    res[key] = value;
  }

  return res;
};

var CiteParser = function CiteParser(plain) {
  var R_CITE = /*#__PURE__*/_wrapRegExp(/\{\{cite ([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\|?([\0-\uFFFF]*)\}\}$/gi, {
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

  return {
    type: "cite",
    subType: subType,
    attribute: attribute
  };
};

var ConvertParser = function ConvertParser(plain) {
  var toMetric = function toMetric(fromUnit) {
    var res = null;

    try {
      var _iterator2 = _createForOfIteratorHelper(convert_units__WEBPACK_IMPORTED_MODULE_9___default()().from(fromUnit).possibilities()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _toUnit = _step2.value;
          var fromSystem = convert_units__WEBPACK_IMPORTED_MODULE_9___default()().describe(_toUnit).system;
          if ("metric" == fromSystem) res = _toUnit;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } catch (_unused) {
      return null;
    }

    return res;
  };

  var toAbbr = function toAbbr(str) {
    if (/^°?[CF]$/.test(str)) return str;
    var lower = str.toLowerCase();

    var _iterator3 = _createForOfIteratorHelper(UNITS),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var unit = _step3.value;
        if (unit.abbr.toLowerCase() == lower || unit.singular.toLowerCase() == lower || unit.plural.toLowerCase() == lower) return unit.abbr;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return str;
  };

  var tokens = plain.slice(2, -2).split(_templateObject()),
      numbers = null,
      fromUnit,
      toUnit = null,
      answer = null;
  tokens.shift();
  numbers = tokens.shift();
  fromUnit = toAbbr(tokens.shift());

  if (/^°?C$/.test(fromUnit)) {
    fromUnit = "°C";
    toUnit = "°F";
    answer = +numbers / (5 / 9) + 32;
  } else if (/^°?F$/.test(fromUnit)) {
    fromUnit = "°F";
    toUnit = "°C";
    answer = (+numbers - 32) * (5 / 9);
  } else {
    if (tokens.length && ABBR_UNITS.indexOf(tokens[0]) != -1) {
      toUnit = tokens.shift();
    }

    if (!toUnit) toUnit = toMetric(fromUnit);

    if (numbers && toUnit && fromUnit) {
      try {
        answer = convert_units__WEBPACK_IMPORTED_MODULE_9___default()(+numbers).from(fromUnit).to(toUnit);
      } catch (_unused2) {
        return {
          elementName: "Text",
          text: "".concat(numbers, " ").concat(fromUnit)
        };
      }
    }
  }

  answer = answer ? answer.toFixed(2) : null;

  if (fromUnit && toUnit && answer !== null) {
    return {
      elementName: "Text",
      text: "".concat(numbers, " ").concat(fromUnit, " (").concat(answer, " ").concat(toUnit, ")")
    };
  }

  return {
    elementName: "Text",
    text: "".concat(numbers, " ").concat(fromUnit)
  };
};

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
    var _match$groups = match.groups;
    remain = _match$groups.remain;
    refgroup = _match$groups.refgroup;
    refgroup = trimQuote(refgroup);
  } // 3. Try extract refname


  var R_NAME = /*#__PURE__*/_wrapRegExp(/^name *= *("[\0-!\$-\.0-<\?-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-\uFFFF]*)$/gi, {
    refname: 1,
    remain: 2
  });

  if ((match = R_NAME.exec(remain)) !== null) {
    var _match$groups2 = match.groups;
    remain = _match$groups2.remain;
    refname = _match$groups2.refname;
    refname = trimQuote(refname);
  } // 4.1. Reuse Reference


  if (/^\s*\/>$/.exec(remain)) {
    return {
      type: "reuse",
      refname: refname,
      refgroup: refgroup
    };
  } // 4.2. Firstuse Reference


  var R_FIRSTUSE = /*#__PURE__*/_wrapRegExp(/^>([\0-\uFFFF]+)<\/ref>$/gi, {
    children: 1
  });

  if ((match = R_FIRSTUSE.exec(remain)) === null) {
    throw "Firstuse Reference Error " + remain;
  }

  children = main(match.groups.children).children;
  refname = trimQuote(refname);
  refgroup = trimQuote(refgroup);
  return {
    type: "firstuse",
    refname: refname,
    refgroup: refgroup,
    children: children
  };
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
  var _match$groups3 = match.groups;
  subType = _match$groups3.subType;
  remain = _match$groups3.remain;

  // 2. Extract group footnote
  var R_GROUP = /*#__PURE__*/_wrapRegExp(/^group=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)\|([\0-\uFFFF]+)$/, {
    fnGroup: 1,
    remain: 2
  });

  if ((match = R_GROUP.exec(remain)) !== null) {
    var _match$groups4 = match.groups;
    fnGroup = _match$groups4.fnGroup;
    remain = _match$groups4.remain;
  } // 3. Extract name footnote


  var R_NAME = /*#__PURE__*/_wrapRegExp(/^name=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)(\|([\0-\uFFFF]+))?$/, {
    fnName: 1,
    remain: 3
  });

  if ((match = R_NAME.exec(remain)) !== null) {
    var _match$groups5 = match.groups;
    fnName = _match$groups5.fnName;
    remain = _match$groups5.remain;
  } // 4. Parse real content footnote


  children = remain ? main(remain).children : []; // NOTE: numering foonote will be done in analyseReference function

  return {
    type: type,
    subType: subType,
    fnName: fnName,
    fnGroup: fnGroup,
    children: children
  };
};

var GalleryParser = function GalleryParser(plain) {
  var R_GALLERY = /*#__PURE__*/_wrapRegExp(/<gallery[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+([\0-=\?-\uFFFF]+)?>([\0-\uFFFF]+)<\/gallery>/gi, {
    attr: 1,
    content: 2
  });

  var match,
      attr,
      content,
      attributes = {};
  if ((match = R_GALLERY.exec(plain)) === null) throw "Gallery Syntax Error";
  var _match$groups6 = match.groups;
  attr = _match$groups6.attr;
  content = _match$groups6.content;

  var R_PAIR = /*#__PURE__*/_wrapRegExp(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9A-Z_a-z]+)=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)/g, {
    key: 1,
    value: 2
  });

  while ((match = R_PAIR.exec(attr)) !== null) {
    var _match$groups7 = match.groups,
        key = _match$groups7.key,
        value = _match$groups7.value;
    attributes[key] = trimQuote(value);
  }

  var images = [];

  var _iterator4 = _createForOfIteratorHelper(content.split("\n")),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var image = _step4.value;
      if (/^\s*$/g.exec(image)) continue;
      image = /^\s*([\s\S]+)\s*$/g.exec(image)[0];
      images.push(main("[[".concat(image, "]]")).children[0]);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return {
    attributes: attributes,
    images: images
  };
};

var parsePairPipe = function parsePairPipe(plain) {
  var res = {},
      remain = plain,
      key,
      nextIndex,
      parsedPlain,
      match;

  var R_KEY = /*#__PURE__*/_wrapRegExp(/^[\t-\r \|\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*=([\0-\uFFFF]*)$/, {
    key: 1,
    remain: 2
  });

  while (remain) {
    if ((match = R_KEY.exec(remain)) === null) throw "PairPipe Syntax Error " + remain;
    var _match$groups8 = match.groups;
    key = _match$groups8.key;
    remain = _match$groups8.remain;

    var _parse = parse(remain, null, 0, PairPipe);

    var _parse2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_parse, 3);

    nextIndex = _parse2[0];
    parsedPlain = _parse2[2];
    remain = remain.substr(nextIndex);
    var value = parsedPlain;
    match = /*#__PURE__*/_wrapRegExp(/^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-\uFFFF]+?)[\t-\r \|\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/, {
      value: 1
    }).exec(value);
    if (match === null) throw "Infobox Syntax Error ".concat(value);
    value = match.groups.value;
    res[key] = value == "|" ? "" : value;
  }

  return res;
};

var MultipleImageParser = function MultipleImageParser(plain) {
  var R_MULTIPLE_IMAGES = /*#__PURE__*/_wrapRegExp(/^\{\{multiple image[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\|([\0-\uFFFF]+)\}\}$/gi, {
    remain: 1
  });

  var match = R_MULTIPLE_IMAGES.exec(plain),
      attributes = {},
      images = [];
  if (match === null) throw "MultipleImageParser Error " + plain;
  var remain = match.groups.remain;

  var R_KEY_IMAGE = /*#__PURE__*/_wrapRegExp(/^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\\_a-z]+)([0-9]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/i, {
    imageKey: 1,
    imageID: 2
  });

  var pairs = parsePairPipe(remain);

  for (var _i = 0, _Object$keys = Object.keys(pairs); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var value = pairs[key];

    if ((match = R_KEY_IMAGE.exec(key)) === null) {
      attributes[key] = value;
      continue;
    }

    var _match$groups9 = match.groups,
        imageKey = _match$groups9.imageKey,
        imageID = _match$groups9.imageID;
    imageID = +imageID - 1;
    if (images[imageID] === undefined) images.push({});

    if ("image" == imageKey) {
      images[imageID].url = "File:" + value.trim();
    } else if ("caption" == imageKey) {
      images[imageID].caption = main(value).children;
    } else images[imageID][imageKey] = value;
  }

  images = images.map(function (image) {
    return {
      elementName: "Link",
      type: "media",
      supType: "File",
      url: image.url,
      options: [],
      caption: image.caption || [{
        elementName: "Text",
        text: ""
      }]
    };
  });
  return {
    type: "multipleImages",
    images: images,
    attributes: attributes
  };
};

var InfoboxParser = function InfoboxParser(plain) {
  var R_INFO = /*#__PURE__*/_wrapRegExp(/^\{\{Infobox ([\0-\{\}-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\|([\0-\uFFFF]+)\}\}$/gi, {
    subtype: 1,
    remain: 2
  });

  var match = R_INFO.exec(plain),
      subtype,
      remain,
      sections = [];
  if (match === null) throw "Infobox Syntax Error" + plain;
  var _match$groups10 = match.groups;
  subtype = _match$groups10.subtype;
  remain = _match$groups10.remain;

  var _iterator5 = _createForOfIteratorHelper(remain.split(_templateObject2())),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var section = _step5.value;
      // console.log(section);
      // console.log("--------------");
      var attributes = parsePairPipe(section); // clean leading space and trailing "|" and "---"
      // for (const key of Object.keys(attributes)) {
      //   let value = attributes[key];
      //   match = /^(?<content>[\s\S]+?)[\|\s]*$/.exec(value);
      //   if (match === null) throw `Infobox Syntax Error ${value}`;
      //   content = match.groups.content;
      //   attributes[key] = content == "|" ? "" : content;
      // }

      sections.push(attributes);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return {
    type: "Infobox",
    subtype: subtype,
    sections: sections
  };
};

var internalParse = function internalParse(element, content, plain) {
  if (element.elementName == "Reference") {
    return ReferenceParser(plain);
  }

  if (element.elementName == "Gallery") return GalleryParser(plain);

  if (element.elementName == "ExternalLink") {
    var R_EXTERNAL = /*#__PURE__*/_wrapRegExp(/^\[([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)( ([\0-\uFFFF]+))?\]$/gi, {
      url: 1,
      displayText: 3
    });

    var match, url, displayText;

    if ((match = R_EXTERNAL.exec(plain)) !== null) {
      var _match$groups11 = match.groups;
      url = _match$groups11.url;
      displayText = _match$groups11.displayText;
      return {
        url: url,
        displayText: displayText
      };
    } else {
      throw "ExternalLink Grammar Error";
    }
  }

  if (element.elementName == "Template") {
    if (/^{{[Cc]ite/g.test(plain)) {
      return CiteParser(plain);
    } else if (/^{{(refn|efn|efn-(la|ua|lr|ur|lg))\|/.test(plain)) {
      return FootnoteParser(plain);
    } else if (/^{{lang-\w+\|/gi.test(plain)) {
      var text = /\|(.*)}}$/.exec(plain)[1];
      return {
        elementName: "Italic",
        children: [{
          elementName: "Text",
          text: text
        }]
      };
    } else if (/^{{IPA-\w+\|/gi.test(plain)) {
      var _text = /\|(.*)}}$/.exec(plain)[1];
      return {
        elementName: "Text",
        text: "[" + _text + "]"
      };
    } else if (/^{{convert/gi.test(plain)) {
      return ConvertParser(plain);
    } else if (/^{{multiple image/gi.test(plain)) {
      return MultipleImageParser(plain);
    } else if (/^{{Infobox \w+/gi.test(plain)) {
      return InfoboxParser(plain);
    }

    return {
      type: "N/A",
      // children: [{ elementName: "Text", text: `<--N/A--${plain}-->` }]
      children: [{
        elementName: "Text",
        text: "N/A"
      }]
    };
  }

  if (element.elementName == "Link") {
    // console.log({ plain });
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
      var fullUrl = _match[1],
          nonePipe = !_match[2],
          trailingPipe = _match[2] && !_match[3],
          _displayText = _match[3],
          suffixStr = _match[4] || ""; // console.log({
      //   fullUrl,
      //   nonePipe,
      //   trailingPipe,
      //   displayText,
      //   suffixStr
      // });
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
      // let urlMatch = /^(:?(\w+):)?
      // (
      //   ([\w\-,.#\"\(\) ]+)( \((.+)\))
      //   |
      //   ([\w\-.#\"\(\) ]+)( \((.+)\)|, (.+))?
      // )$/.exec(
      //   fullUrl
      // );
      // ([\w\-,.#\"\(\) ]+)( \((.+)\))


      var urlMatch = /^(:?(\w+):)?(([^\(]+)( \((.+)\))|([^,(]+)( \((.+)\)|, (.+))?|([\s\S]*))$/.exec(fullUrl);

      if (urlMatch === null) {
        // console.log("@");
        return content;
      }

      namespace = capitalize(urlMatch[1] || "");
      rootUrl = urlMatch[4] || urlMatch[7] || urlMatch[11];
      disambiguation = urlMatch[5] || urlMatch[8] || "";

      if ("File:" != namespace) {
        _url = namespace + capitalizeFirst(rootUrl) + disambiguation;
        _url = _url.replace(/ /g, "_"); // convert to valid URL

        _displayText = nonePipe ? fullUrl : trailingPipe ? rootUrl : _displayText;

        if (suffixStr) {
          _displayText += suffixStr;
        }

        _displayText = [{
          elementName: "Text",
          text: _displayText
        }];
        return {
          type: "wikiLink",
          url: _url,
          displayText: _displayText
        };
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
          caption = [];
      var R_OPTION = /^(border|frame(less)?|thumb(nail)?|((\d+)?x)?\d+px|upright[ =]\d+\.\d+|upright=?|left|right|cent(er|re)|none|baseline|sub|super|top|text-top|middle|bottom|text-bottom|(alt|page|class|lang|link)=.+)$/i,
          R_ATTRIBUTE = /^(alt|page|class|lang|link)=(.*$)/i;

      var _iterator6 = _createForOfIteratorHelper(chunks.slice(1)),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var chunk = _step6.value;

          // console.log(chunk);
          if (!R_OPTION.test(chunk)) {
            caption.push(chunk);
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
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      caption = main(caption.join("|")).children;
      return _objectSpread({}, meta, {
        options: options,
        caption: caption
      });
    }
  }

  return {
    children: content
  };
};

var Comment = {
  elementName: "Comment",
  startToken: "<!--",
  endToken: ["-->"],
  allowedChildren: []
},
    Break = {
  elementName: "Break",
  startToken: "<br />",
  endToken: [],
  allowedChildren: [],
  selfClose: true
},
    BoldItalic = {
  elementName: "BoldItalic",
  startToken: "'''''",
  endToken: ["'''''"],
  allowedChildren: []
},
    Bold = {
  elementName: "Bold",
  startToken: "'''",
  endToken: ["'''"],
  allowedChildren: []
},
    Italic = {
  elementName: "Italic",
  startToken: "''",
  endToken: ["''"],
  allowedChildren: []
},
    Gallery = {
  elementName: "Gallery",
  startToken: "<gallery",
  endToken: ["</gallery>"],
  allowedChildren: []
},
    Link = {
  elementName: "Link",
  startToken: "[[",
  endToken: ["]]"],
  allowedChildren: [Bold, Italic]
},
    ExternalLink = {
  elementName: "ExternalLink",
  startToken: "[",
  endToken: ["]"],
  allowedChildren: []
},
    Heading1 = {
  elementName: "Heading1",
  startToken: "==",
  endToken: ["=="],
  allowedChildren: []
},
    Heading2 = {
  elementName: "Heading2",
  startToken: "===",
  endToken: ["==="],
  allowedChildren: []
},
    Heading3 = {
  elementName: "Heading3",
  startToken: "====",
  endToken: ["===="],
  allowedChildren: []
},
    Heading4 = {
  elementName: "Heading4",
  startToken: "=====",
  endToken: ["====="],
  allowedChildren: []
},
    Heading5 = {
  elementName: "Heading5",
  startToken: "======",
  endToken: ["======"],
  allowedChildren: []
},
    Heading6 = {
  elementName: "Heading6",
  startToken: "=======",
  endToken: ["======="],
  allowedChildren: []
},
    Reference = {
  elementName: "Reference",
  startToken: "<ref",
  endToken: ["</ref>", "/>"],
  allowedChildren: []
},
    Template = {
  elementName: "Template",
  startToken: "{{",
  endToken: ["}}"],
  allowedChildren: []
},
    BlockQuote = {
  elementName: "Block Quote",
  startToken: "<blockquote>",
  endToken: ["</blockquote>"],
  allowedChildren: [Italic, Bold, BoldItalic]
},
    PairPipe = {
  elementName: "PairPipe",
  startToken: null,
  endToken: ["|"],
  allowedChildren: []
},
    Global = {
  elementName: "Global",
  startToken: null,
  endToken: null,
  allowedChildren: [Comment, Gallery, Break, BoldItalic, Bold, Italic, Link, ExternalLink, Heading6, Heading5, Heading4, Heading3, Heading2, Heading1, Reference, BlockQuote, Template]
};
Link.allowedChildren.push(Link);
Italic.allowedChildren.push(Link);
Reference.allowedChildren.push(Break, Template);
Template.allowedChildren.push(Template, Reference, Link);
PairPipe.allowedChildren = Global.allowedChildren;

var analyseHeadings = function analyseHeadings(headings) {
  if (!headings.length) return null;

  var getLevel = function getLevel(heading) {
    return +/^Heading(\d)$/.exec(heading.elementName)[1];
  };

  var currentLevel = 0,
      res = {},
      currentHeading = res;
  res.indices = [];

  var _iterator7 = _createForOfIteratorHelper(headings),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var heading = _step7.value;
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
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  return res;
};

var parse = function parse(str, strlen, index, e) {
  var buffer = "",
      has,
      plain = "",
      nextElement,
      content = [],
      options = {},
      referenceIndex = 0,
      images = [],
      headings = [],
      nextPlain,
      hasSelfClose;
  strlen = strlen === null ? str.length : strlen;
  var elementName = e.elementName,
      startToken = e.startToken,
      endToken = e.endToken,
      allowedChildren = e.allowedChildren;
  index += startToken === null ? 0 : startToken.length;
  plain += startToken === null ? "" : startToken;

  while (index < strlen) {
    // console.log(index);
    hasSelfClose = false;
    has = false;

    var _iterator8 = _createForOfIteratorHelper(allowedChildren),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var matchElement = _step8.value;
        if (!taste(str, matchElement.startToken, index)) continue;
        has = true;
        if (buffer) content.push({
          elementName: "Text",
          text: buffer
        });
        buffer = "";

        if (hasSelfClose = matchElement.selfClose) {
          content.push({
            elementName: matchElement.elementName
          });
          plain += matchElement.startToken;
          index += matchElement.startToken.length;
          break;
        }

        var _parse3 = parse(str, strlen, index, matchElement);

        var _parse4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_parse3, 3);

        index = _parse4[0];
        nextElement = _parse4[1];
        nextPlain = _parse4[2];
        plain += nextPlain;
        content.push(nextElement);

        if (matchElement.elementName == "Reference") {
          nextElement.referenceIndex = ++referenceIndex;
        }

        if (/^Heading/.exec(nextElement.elementName) !== null) {
          headings.push(nextElement);
        }

        if (nextElement.elementName == "Link" && nextElement.type == "media" && nextElement.supType == "File") {
          images.push(nextElement);
        }

        if (nextElement.elementName == "Gallery") {
          images.push.apply(images, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(nextElement.images));
        }

        break;
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    if (hasSelfClose) continue;

    if (!has) {
      if (endToken) {
        var catchEndToken = false;

        var _iterator9 = _createForOfIteratorHelper(endToken),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var eToken = _step9.value;

            if (taste(str, eToken, index)) {
              catchEndToken = true;
              index += eToken.length;
              plain += eToken;

              if (e.elementName == "Link") {
                while (index < strlen) {
                  var nowiki = "<nowiki />";

                  if (taste(str, nowiki, index)) {
                    index += nowiki.length;
                    break;
                  } else if (/\w/.test(str[index])) {
                    plain += str[index++];
                  } else break;
                }
              }
            } // end taste

          } // end for endToken

        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }

        if (catchEndToken) break;
      } // end if endToken


      if (index < strlen) {
        plain += str[index];
        buffer += str[index++];
      }
    } // end not has

  }

  if (buffer) content.push({
    elementName: "Text",
    text: buffer
  });
  var res = [index, clean(_objectSpread({
    elementName: elementName,
    headings: analyseHeadings(headings),
    images: images
  }, internalParse(e, content, plain, options))), plain]; // if (elementName == "Gallery")
  //   console.dir({ parsed: JSON.stringify(res[1]), plain });

  return res;
};

var main = function main(str) {
  return str ? parse(str, null, 0, Global)[1] : "";
}; // const second = str => parse(str, null, 0, PairPipe)[1];


 // console.log(
//   JSON.stringify(
//     main(
//       `{{Redirect2|NYC|New York, New York|4=New York City (disambiguation)|5=and|6=NYC (disambiguation)|7=and|8=New York, New York (disambiguation)}}
// {{Use mdy dates|date=January 2020}}
// {{Short description|Largest city in the United States}}
// <!-- Don't add a particular image size to most images of this article; it will be reverted. The images need to be able to customize from personal preferences. -->
// {{Infobox settlement
// | name                     = New York<!-- DO NOT change without discussion -->
// | official_name            = <!-- DO NOT add to this parameter without consensus -->
// | settlement_type          = [[City (New York)|City]]
// | named_for                = [[James II of England|James, Duke of York]]
// |image_skyline             = {{multiple image
// | border                   = infobox
// | total_width              = 290
// | image_style              = border:1;
// | perrow                   = 1/3/2/2
// | image1                   = Lower Manhattan skyline - June 2017.jpg
// | image2                   = Central park pond.jpg
// | image3                   = Unisphere Flushing Meadows Queens.jpg
// | image4                   = Brooklyn Bridge, west tower (7433306334).jpg
// | image5                   = LadyLiberty02.jpg
// | image6                   = Times_square_night.jpg
// | image7                   = Midtown Manhattan 2019.jpg
// | image8                   = Manhattan Bridge 2 (6214831091).jpg
// }}
// | image_caption            = From top, left to right: [[Lower Manhattan]], [[Central Park]], the [[Unisphere]], the [[Brooklyn Bridge]], [[Statue of Liberty]], [[Times Square]], [[Midtown Manhattan]], [[Manhattan Bridge]]
// | image_flag               = Flag of New York City.svg
// | image_seal               = Seal_of_New_York_City_BW.svg
// | image_blank_emblem       = NYC Logo Wolff Olins.svg
// | blank_emblem_type        = [[Wordmark]]
// | nickname                 = ''See [[Nicknames of New York City]]''
// <!-- maps and coordinates -->
// | image_map                = {{Maplink|frame=yes|plain=y|frame-width=290|frame-height=270|frame-align=center|stroke-width=3|zoom=9|frame-lat=40.7|frame-long=-73.944|type=shape-inverse|stroke-color=#808080|id=Q60|title=New York City}}
// | mapsize                  =
// | map_caption              = Interactive map outlining New York City
// | pushpin_map              = New York#USA#North America
// | pushpin_relief           = 1
// |pushpin_mapsize           = 290px
// | pushpin_map_caption      = Location within the state of New York##Location within the United States##Location within North America
// | pushpin_label            = New York
// | pushpin_label_position   = left
// | coordinates              = {{coord|40.661|N|73.944|W|region:US-NY|format=dms|display=inline,title}}
// | coor_pinpoint            = <!-- to specify exact location of coordinates (was coor_type) -->
// | coordinates_footnotes    =<ref name="GR1">{{cite web |url=https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html |publisher=[[United States Census Bureau]] |accessdate=April 23, 2011 |date=February 12, 2011 |title=US Gazetteer files: 2010, 2000, and 1990}}</ref>
// | subdivision_type         = Country
// | subdivision_name         = {{nowrap|{{flag|United States}}}}
// | subdivision_type2        = State
// | subdivision_name2        = {{flag|New York}}
// ----
// | subdivision_type3        = [[List of regions of the United States|Region]]
// | subdivision_name3        = [[Mid-Atlantic (United States)|Mid-Atlantic]]
// | subdivision_type4        = [[County (United States)|Constituent counties]] ([[Boroughs of New York City|boroughs]])
// | subdivision_name4        = [[The Bronx|Bronx (The Bronx)]]<br />[[Brooklyn|Kings (Brooklyn)]]<br />[[Manhattan|New York (Manhattan)]]<br />[[Queens|Queens (Queens)]]<br />[[Staten Island|Richmond (Staten Island)]]
// ----
// | subdivision_type5        = [[Colony|Historic colonies]]
// | subdivision_name5        = [[New Netherland]]<br />[[Province of New York]]
// | established_title        = Settled
// | established_date         = 1624
// | established_title1       = [[City of Greater New York|Consolidated]]
// | established_date1        = 1898
// | established_title2       =
// | government_footnotes     =
// | government_type          = [[Mayor–council government|Mayor–Council]]
// | governing_body           = [[New York City Council]]
// | leader_title             = [[Mayor of New York City|Mayor]]
// | leader_name              = [[Bill de Blasio]] ([[Democratic Party (United States)|D]])
// | total_type               = Total
// | unit_pref                = Imperial
// | area_footnotes           =<ref name="GR1" />
// | area_total_sq_mi         = 468.484
// | area_land_sq_mi          = 302.643
// | area_water_sq_mi         = 165.841
// | area_metro_sq_mi         = 13318
// | elevation_footnotes      =<ref name="GR3">{{cite web |url=http://geonames.usgs.gov |accessdate=January 31, 2008 |title=US Board on Geographic Names |publisher=[[United States Geological Survey]] |date=June 23, 2018}} Search for feature ID 975772.</ref>
// | elevation_m              = 10
// | elevation_ft             = 33
// | population_rank          = [[List of United States cities by population|1st in the U.S.]]
// | population_density_sq_mi = 27,751
// | population_as_of         = [[2010 United States Census|2010]]
// | population_total         = 8175133
// | population_footnotes     =<ref name=Census2010>[https://www.census.gov Community Facts for New York City] , [[United States Census Bureau]]. Retrieved May 26, 2017.</ref>
// | population_est           = 8398748
// | pop_est_as_of            = 2018
// | pop_est_footnotes        =<ref name=2018Estimate />
// | population_blank1_title  = [[Metropolitan statistical area|MSA (2018)]]
// | population_blank1        = 19,979,477<ref name="MetroEst">{{cite web|url=https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2017—Metropolitan Statistical Area; and for Puerto Rico—2017 Population Estimates|publisher=U.S. Census Bureau|accessdate=March 24, 2018|archive-url=https://archive.today/20200213005215/https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|archive-date=February 13, 2020|url-status=dead}}</ref> ([[List of metropolitan statistical areas|1st]])
// | population_blank2_title  = [[New York metropolitan area|CSA (2018)]]
// | population_blank2        = 22,679,948<ref name=CombinedEst>{{cite web |url=https://www.census.gov |title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2018—Combined Statistical Area; and for Puerto Rico—2017 Population Estimates |publisher=U.S. Census Bureau |accessdate=April 27, 2018 }}</ref> ([[List of Combined Statistical Areas|1st]])
// | population_demonym       = New Yorker
// | blank6_name              = [[GDP]] (City, 2018)
// | blank6_info              = $842.3&nbsp;billion<ref name="bea.gov">[https://www.bea.gov/system/files/2019-12/lagdp1219.pdf ''Local Area Gross Domestic Product, 2018''], [[Bureau of Economic Analysis]], released December 17, 2019. Accessed December 12, 2019.</ref> (1st)
// | blank7_name              = [[Gross metropolitan product|GMP]] (Metro, 2020)
// | blank7_info              = $2.0&nbsp;trillion<ref name="NYCMetroGMP">{{cite web|url=https://www.statista.com/statistics/183808/gmp-of-the-20-biggest-metro-areas/|title=U.S. metro areas—ranked by Gross Metropolitan Product (GMP) 2020 {{!}} Statistic|website=Statista|accessdate=May 31, 2019}}</ref> (1st)
// | timezone1                = [[Eastern Time Zone|EST]]
// | utc_offset1              = −05:00
// | timezone1_DST            = [[Eastern Time Zone|EDT]]
// | utc_offset1_DST          = −04:00
// | postal_code_type         = [[ZIP Code]]s
// | postal_code              = 100xx–104xx, 11004–05, 111xx–114xx, 116xx
// | area_code                = [[Area codes 212, 646, and 332|212/646/332]], [[Area codes 718, 347, and 929|718/347/929]], [[Area code 917|917]]
// | blank_name               = [[Federal Information Processing Standards|FIPS code]]
// | blank_info               = 36-51000
// | blank1_name              = [[Geographic Names Information System|GNIS]] feature ID
// | blank1_info              = 975772
// | blank2_name              = Major airports
// | blank2_info              = [[John F. Kennedy International Airport]], [[Newark Liberty International Airport]], [[LaGuardia Airport]]
// | blank4_name              = [[Commuter rail]]
// | blank4_info              = [[LIRR]], [[Metro-North]], [[NJ Transit Rail Operations|NJ Transit]]
// | blank5_name              = [[Rapid transit]]
// | blank5_info              = [[New York City Subway|Subway]], [[Staten Island Railway]], [[PATH (rail system)|PATH]]
// | blank_name_sec2          = Largest [[Boroughs of New York City|borough]] by area
// | blank_info_sec2          = [[Queens]] {{convert|109|sqmi|km2}}
// | blank1_name_sec2         = Largest borough by population
// | blank1_info_sec2         = [[Brooklyn]] (2015 est 2,636,735)<ref name=BrooklynQuickFacts>{{cite web |title=State & County QuickFacts—Kings County (Brooklyn Borough), New York |url=http://quickfacts.census.gov/qfd/states/36/36047.html |publisher=United States Census Bureau |accessdate=March 24, 2016 |archiveurl=https://web.archive.org/web/20160217175357/http://quickfacts.census.gov/qfd/states/36/36047.html |archivedate=February 17, 2016}}</ref>
// | blank2_name_sec2         = Largest borough by [[GDP]] (2018)
// | blank2_info_sec2         = [[Manhattan]] $600.2 billion<ref name="bea.gov"/>
// | website                  = [https://www.nyc.gov/ NYC.gov]
// | population_density_km2   = 10,715
// }}
// {{Regions of New York}}
// '''New York City''' ('''NYC'''), often called the '''City of New York''' or simply '''New York''' `
//     ),
//     null,
//     2
//   )
// );
// console.log(
//   JSON.stringify(
//     main(`{{Infobox settlement
// | name                     = New York<!-- DO NOT change without discussion -->
// | official_name            = <!-- DO NOT add to this parameter without consensus -->
// | settlement_type          = [[City (New York)|City]]
// | named_for                = [[James II of England|James, Duke of York]]
// |image_skyline             = {{multiple image
// | border                   = infobox
// | total_width              = 290
// | image_style              = border:1;
// | perrow                   = 1/3/2/2
// | image1                   = Lower Manhattan skyline - June 2017.jpg
// | image2                   = Central park pond.jpg
// | image3                   = Unisphere Flushing Meadows Queens.jpg
// | image4                   = Brooklyn Bridge, west tower (7433306334).jpg
// | image5                   = LadyLiberty02.jpg
// | image6                   = Times_square_night.jpg
// | image7                   = Midtown Manhattan 2019.jpg
// | image8                   = Manhattan Bridge 2 (6214831091).jpg
// }}
// | image_caption            = From top, left to right: [[Lower Manhattan]], [[Central Park]], the [[Unisphere]], the [[Brooklyn Bridge]], [[Statue of Liberty]], [[Times Square]], [[Midtown Manhattan]], [[Manhattan Bridge]]
// | image_flag               = Flag of New York City.svg
// | image_seal               = Seal_of_New_York_City_BW.svg
// | image_blank_emblem       = NYC Logo Wolff Olins.svg
// | blank_emblem_type        = [[Wordmark]]
// | nickname                 = ''See [[Nicknames of New York City]]''
// <!-- maps and coordinates -->
// | image_map                = {{Maplink|frame=yes|plain=y|frame-width=290|frame-height=270|frame-align=center|stroke-width=3|zoom=9|frame-lat=40.7|frame-long=-73.944|type=shape-inverse|stroke-color=#808080|id=Q60|title=New York City}}
// | mapsize                  =
// | map_caption              = Interactive map outlining New York City
// | pushpin_map              = New York#USA#North America
// | pushpin_relief           = 1
// |pushpin_mapsize           = 290px
// | pushpin_map_caption      = Location within the state of New York##Location within the United States##Location within North America
// | pushpin_label            = New York
// | pushpin_label_position   = left
// | coordinates              = {{coord|40.661|N|73.944|W|region:US-NY|format=dms|display=inline,title}}
// | coor_pinpoint            = <!-- to specify exact location of coordinates (was coor_type) -->
// | coordinates_footnotes    =<ref name="GR1">{{cite web |url=https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html |publisher=[[United States Census Bureau]] |accessdate=April 23, 2011 |date=February 12, 2011 |title=US Gazetteer files: 2010, 2000, and 1990}}</ref>
// | subdivision_type         = Country
// | subdivision_name         = {{nowrap|{{flag|United States}}}}
// | subdivision_type2        = State
// | subdivision_name2        = {{flag|New York}}
// ----
// | subdivision_type3        = [[List of regions of the United States|Region]]
// | subdivision_name3        = [[Mid-Atlantic (United States)|Mid-Atlantic]]
// | subdivision_type4        = [[County (United States)|Constituent counties]] ([[Boroughs of New York City|boroughs]])
// | subdivision_name4        = [[The Bronx|Bronx (The Bronx)]]<br />[[Brooklyn|Kings (Brooklyn)]]<br />[[Manhattan|New York (Manhattan)]]<br />[[Queens|Queens (Queens)]]<br />[[Staten Island|Richmond (Staten Island)]]
// ----
// | subdivision_type5        = [[Colony|Historic colonies]]
// | subdivision_name5        = [[New Netherland]]<br />[[Province of New York]]
// | established_title        = Settled
// | established_date         = 1624
// | established_title1       = [[City of Greater New York|Consolidated]]
// | established_date1        = 1898
// | established_title2       =
// | government_footnotes     =
// | government_type          = [[Mayor–council government|Mayor–Council]]
// | governing_body           = [[New York City Council]]
// | leader_title             = [[Mayor of New York City|Mayor]]
// | leader_name              = [[Bill de Blasio]] ([[Democratic Party (United States)|D]])
// | total_type               = Total
// | unit_pref                = Imperial
// | area_footnotes           =<ref name="GR1" />
// | area_total_sq_mi         = 468.484
// | area_land_sq_mi          = 302.643
// | area_water_sq_mi         = 165.841
// | area_metro_sq_mi         = 13318
// | elevation_footnotes      =<ref name="GR3">{{cite web |url=http://geonames.usgs.gov |accessdate=January 31, 2008 |title=US Board on Geographic Names |publisher=[[United States Geological Survey]] |date=June 23, 2018}} Search for feature ID 975772.</ref>
// | elevation_m              = 10
// | elevation_ft             = 33
// | population_rank          = [[List of United States cities by population|1st in the U.S.]]
// | population_density_sq_mi = 27,751
// | population_as_of         = [[2010 United States Census|2010]]
// | population_total         = 8175133
// | population_footnotes     =<ref name=Census2010>[https://www.census.gov Community Facts for New York City] , [[United States Census Bureau]]. Retrieved May 26, 2017.</ref>
// | population_est           = 8398748
// | pop_est_as_of            = 2018
// | pop_est_footnotes        =<ref name=2018Estimate />
// | population_blank1_title  = [[Metropolitan statistical area|MSA (2018)]]
// | population_blank1        = 19,979,477<ref name="MetroEst">{{cite web|url=https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2017—Metropolitan Statistical Area; and for Puerto Rico—2017 Population Estimates|publisher=U.S. Census Bureau|accessdate=March 24, 2018|archive-url=https://archive.today/20200213005215/https://factfinder.census.gov/bkmk/table/1.0/en/PEP/2017/GCTPEPANNR.US24PR|archive-date=February 13, 2020|url-status=dead}}</ref> ([[List of metropolitan statistical areas|1st]])
// | population_blank2_title  = [[New York metropolitan area|CSA (2018)]]
// | population_blank2        = 22,679,948<ref name=CombinedEst>{{cite web |url=https://www.census.gov |title=Annual Estimates of the Resident Population: April 1, 2010 to July 1, 2018—Combined Statistical Area; and for Puerto Rico—2017 Population Estimates |publisher=U.S. Census Bureau |accessdate=April 27, 2018 }}</ref> ([[List of Combined Statistical Areas|1st]])
// | population_demonym       = New Yorker
// | blank6_name              = [[GDP]] (City, 2018)
// | blank6_info              = $842.3&nbsp;billion<ref name="bea.gov">[https://www.bea.gov/system/files/2019-12/lagdp1219.pdf ''Local Area Gross Domestic Product, 2018''], [[Bureau of Economic Analysis]], released December 17, 2019. Accessed December 12, 2019.</ref> (1st)
// | blank7_name              = [[Gross metropolitan product|GMP]] (Metro, 2020)
// | blank7_info              = $2.0&nbsp;trillion<ref name="NYCMetroGMP">{{cite web|url=https://www.statista.com/statistics/183808/gmp-of-the-20-biggest-metro-areas/|title=U.S. metro areas—ranked by Gross Metropolitan Product (GMP) 2020 {{!}} Statistic|website=Statista|accessdate=May 31, 2019}}</ref> (1st)
// | timezone1                = [[Eastern Time Zone|EST]]
// | utc_offset1              = −05:00
// | timezone1_DST            = [[Eastern Time Zone|EDT]]
// | utc_offset1_DST          = −04:00
// | postal_code_type         = [[ZIP Code]]s
// | postal_code              = 100xx–104xx, 11004–05, 111xx–114xx, 116xx
// | area_code                = [[Area codes 212, 646, and 332|212/646/332]], [[Area codes 718, 347, and 929|718/347/929]], [[Area code 917|917]]
// | blank_name               = [[Federal Information Processing Standards|FIPS code]]
// | blank_info               = 36-51000
// | blank1_name              = [[Geographic Names Information System|GNIS]] feature ID
// | blank1_info              = 975772
// | blank2_name              = Major airports
// | blank2_info              = [[John F. Kennedy International Airport]], [[Newark Liberty International Airport]], [[LaGuardia Airport]]
// | blank4_name              = [[Commuter rail]]
// | blank4_info              = [[LIRR]], [[Metro-North]], [[NJ Transit Rail Operations|NJ Transit]]
// | blank5_name              = [[Rapid transit]]
// | blank5_info              = [[New York City Subway|Subway]], [[Staten Island Railway]], [[PATH (rail system)|PATH]]
// | blank_name_sec2          = Largest [[Boroughs of New York City|borough]] by area
// | blank_info_sec2          = [[Queens]] {{convert|109|sqmi|km2}}
// | blank1_name_sec2         = Largest borough by population
// | blank1_info_sec2         = [[Brooklyn]] (2015 est 2,636,735)<ref name=BrooklynQuickFacts>{{cite web |title=State & County QuickFacts—Kings County (Brooklyn Borough), New York |url=http://quickfacts.census.gov/qfd/states/36/36047.html |publisher=United States Census Bureau |accessdate=March 24, 2016 |archiveurl=https://web.archive.org/web/20160217175357/http://quickfacts.census.gov/qfd/states/36/36047.html |archivedate=February 17, 2016}}</ref>
// | blank2_name_sec2         = Largest borough by [[GDP]] (2018)
// | blank2_info_sec2         = [[Manhattan]] $600.2 billion<ref name="bea.gov"/>
// | website                  = [https://www.nyc.gov/ NYC.gov]
// | population_density_km2   = 10,715
// }}`),
//     null,
//     2
//   )
// );
// let s = `align = right
//  | direction = vertical
//  | image1 = New York City Marathon 2014 (15082977714).jpg
//  | width1 = 225
//  | caption1 = The [[New York City Marathon|New York Marathon]] is the largest marathon in the world.<ref name="NYCMarathonWorld'sLargest">{{cite web |url=http://www.runnersworld.com/new-york-city-marathon/2017-new-york-city-marathon-entrants-by-the-numbers |title=2017 New York City Marathon Entrants By the Numbers—Applications for the world's largest race were at an all-time high for 2017 |author=Kit Fox |publisher=Runner's World—Rodale Inc |date=March 2, 2017 |accessdate=May 10, 2017}}</ref>
//  | alt1 = Three runners in a race down a street where onlookers are cheering behind barriers.
//  | image2 = Arthur ashe stadium interior.jpg
//  | width2 = 225
//  | caption2 = The [[U.S. Open (tennis)|U.S. Open Tennis Championships]] are held every August and September in [[Flushing Meadows-Corona Park]], Queens.
//  | alt2 = A tennis stadium pack with fans watching a grass court.
//  | image3 = Citi Field 2011.JPG
//  | width3 = 225
//  | caption3 = [[Citi Field]], also in Flushing Meadows-Corona Park, has been home to the [[New York Mets]] since 2009.
//  | alt3 = A baseball stadium from behind home plate in the evening.`;
// console.log(parsePairPipe(s));

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UNITS, "UNITS", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ABBR_UNITS, "ABBR_UNITS", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(taste, "taste", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(capitalizeFirst, "capitalizeFirst", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(capitalize, "capitalize", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(trimQuote, "trimQuote", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(clean, "clean", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(CiteParser, "CiteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ConvertParser, "ConvertParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ReferenceParser, "ReferenceParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(FootnoteParser, "FootnoteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(GalleryParser, "GalleryParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(parsePairPipe, "parsePairPipe", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(MultipleImageParser, "MultipleImageParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(InfoboxParser, "InfoboxParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(internalParse, "internalParse", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Comment, "Comment", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Break, "Break", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(BoldItalic, "BoldItalic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Bold, "Bold", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Italic, "Italic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Gallery, "Gallery", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
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
  reactHotLoader.register(PairPipe, "PairPipe", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asset_images_search_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
/* harmony import */ var _asset_images_profile_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(163);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






var Menu = function Menu() {
  // const [position, setPosition] = React.useState(document.body.scrollTop);
  // React.useEffect(() => {
  //   function handleClickOutside() {
  //     setPosition(document.body.scrollTop);
  //   }
  //   window.addEventListener("scroll", handleClickOutside);
  //   return () => window.removeEventListener("scroll", handleClickOutside);
  // }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__left"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "logo-wiki"
  }, "Wiki"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "logo-pedia"
  }, "pedia")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__main"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button button--choose"
  }, "Article"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button"
  }, "Talk"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button button--choose"
  }, "Read"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button"
  }, "View source"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button"
  }, "View history")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__search-icon"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_asset_images_search_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__right"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    placeholder: "Search Wikipedia",
    className: "menu__search-input"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__profile-icon"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_asset_images_profile_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null))));
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M10.607 192.803l62.401-62.402c13.063 10.67 29.263 16.475 46.356 16.475h.002c19.614 0 38.058-7.639 51.927-21.509 13.871-13.87 21.511-32.313 21.51-51.931-.001-19.616-7.64-38.058-21.509-51.928C157.425 7.639 138.982 0 119.365 0 99.749 0 81.307 7.639 67.437 21.509 53.565 35.38 45.927 53.823 45.928 73.44c0 17.094 5.805 33.294 16.475 46.355L0 182.197l10.607 10.606zM60.928 73.44c-.001-15.611 6.078-30.287 17.116-41.324C89.081 21.078 103.756 15 119.365 15c15.61 0 30.285 6.078 41.322 17.115s17.116 25.712 17.116 41.322c0 15.611-6.078 30.286-17.116 41.324-11.037 11.038-25.712 17.116-41.321 17.116-15.61-.001-30.286-6.079-41.323-17.116C67.006 103.724 60.928 89.05 60.928 73.44z"
});

function SvgSearch(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    viewBox: "0 0 192.804 192.804"
  }, props), _ref);
}

/* harmony default export */ __webpack_exports__["a"] = (SvgSearch);

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M100.594.002C45.119.002 0 45.12 0 100.593c0 55.469 45.122 100.591 100.598 100.591 55.465 0 100.587-45.122 100.587-100.591C201.182 45.12 156.059.002 100.594.002zm-27.5 81.469l.204-.225c.82-.598 1.22-1.528 1.07-2.505-2.029-12.19-.698-17.272-.251-18.546C77.66 49.33 88.769 44.301 90.952 43.414a11.093 11.093 0 012.19-.576l.258-.057 1.789-.097.014.111.412-.039c.372-.039.723-.093 1.163-.183l.394-.086c.351.004 4.678.551 11.102 2.523l4.466 1.539c8.167 2.412 11.928 6.904 12.623 7.805 6.539 7.412 4.792 18.599 3.167 24.608a2.509 2.509 0 00.329 2.044l.372.458c.476.644.898 3.128-.523 8.407-.268 1.6-.859 2.902-1.739 3.783a2.573 2.573 0 00-.637 1.321c-2.208 12.963-13.825 27.461-26.065 27.461-10.386 0-22.243-13.342-24.376-27.45a2.575 2.575 0 00-.669-1.389c-.891-.916-1.453-2.244-1.797-4.209-1.025-3.705-1.132-6.679-.331-7.917zM49.778 137.68c.451-.573 2.96-3.514 8.042-5.451 4.466-1.374 15.504-5.039 21.541-9.416.283-.154.562-.444.791-.684a49.053 49.053 0 012.423-2.459l.562-.533.573.537c5.315 5.014 11.198 7.763 16.559 7.763 5.637 0 11.452-2.441 16.821-7.061l.422-.365 1.138.555c1.016.934 2.781 2.215 3.6 2.609l1.045.508-.107.115.465.283a44.004 44.004 0 003.335 1.804c1.278.562 2.344.981 3.454 1.342.93.301 5.898 1.972 11.549 4.585l1.077.322c5.522 2.115 7.977 5.053 8.224 5.361 6.553 9.72 9.072 27.854 10.006 37.961-17.128 13.911-38.677 21.57-60.697 21.57-22.035 0-43.587-7.662-60.708-21.573.917-10.076 3.411-28.156 9.885-37.773zm105.705-2.985l-.347-.404c-1.632-2.033-5.222-4.899-10.443-6.9l-.823-.247a117.918 117.918 0 00-11.757-4.645l-.14.412.036-.444a32.672 32.672 0 01-2.874-1.127c-5.952-2.924-6.71-4.627-6.839-5.021l-.297-.676.261-.616c4.474-5.583 7.612-12.086 8.815-18.213l.15-.372c1.26-1.575 2.054-3.436 2.369-5.476 1.417-5.128 1.485-8.904.2-11.535l-.122-.268.068-.293c1.589-6.642 3.114-19.097-4.513-27.754-1.206-1.525-5.826-6.685-14.956-9.359l-4.438-1.525c-7.383-2.273-12-2.766-12.601-2.77-.497 0-.913.047-1.539.193l-.587.1a6.652 6.652 0 00-.998-.072c-2.358 0-4.914 1.02-5.035 1.063-2.555 1.07-15.543 7.065-19.655 19.791-.676 1.8-2.076 7.301-.279 19.344l.057.34-.211.283c-1.847 2.477-1.99 6.506-.444 11.921.39 2.398 1.174 4.313 2.337 5.766l.2.429c1.124 6.292 3.926 12.515 8.099 17.991l.361.487-.329.49c-.179.251-.308.53-.351.73-1.031 2.931-12.544 8.07-22.647 11.159-7.383 2.791-10.508 7.258-10.508 7.258-6.259 9.291-9.126 24.923-10.44 36.723-19.787-18.245-31.104-44.023-31.104-70.865 0-53.171 43.258-96.429 96.436-96.429 53.171 0 96.436 43.258 96.436 96.429 0 26.845-11.334 52.634-31.122 70.89-1.346-11.89-4.245-27.586-10.426-36.788z",
  fill: "#010002"
});

function SvgProfile(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    viewBox: "0 0 201.185 201.185"
  }, props), _ref);
}

/* harmony default export */ __webpack_exports__["a"] = (SvgProfile);

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asset_images_left_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93);
/* harmony import */ var _asset_images_right_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(164);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






var Navigation = function Navigation(_ref) {
  var headings = _ref.headings;
  var headingsRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var handle = function handle(direction) {
    var width = headingsRef.current.scrollWidth;
    var pos = headingsRef.current.scrollLeft;
    var visibleWidth = headingsRef.current.clientWidth;
    var maxPos = width - visibleWidth;
    var slideWidth = maxPos * 0.15;
    console.log({
      width: width,
      pos: pos,
      visibleWidth: visibleWidth,
      maxPos: maxPos
    });
    headingsRef.current.scrollLeft = direction == "right" ? Math.min(maxPos, pos + slideWidth) : Math.max(0, pos - slideWidth);
  };

  var handle2 = function handle2(id) {
    var heading = document.getElementById(id);
    var body = document.body;
    body.scrollTop = heading.offsetTop - document.getElementsByClassName("menu")[0].offsetHeight;
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "navigation"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "navigation__content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      return handle("left");
    },
    className: "navigation__button navigation__left-button"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_asset_images_left_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: headingsRef,
    className: "navigation__headings"
  }, headings && headings.childrenHeadings.map(function (heading, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      key: index,
      onClick: function onClick() {
        return handle2(heading.id);
      }
    }, heading.text);
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      return handle("right");
    },
    className: "navigation__button navigation__right-button"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_asset_images_right_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null))));
};

__signature__(Navigation, "useRef{headingsRef}");

var _default = Navigation;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Navigation, "Navigation", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Navigation/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Navigation/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0zm0 490.667C126.604 490.667 21.333 385.396 21.333 256S126.604 21.333 256 21.333 490.667 126.604 490.667 256 385.396 490.667 256 490.667z"
});

var _ref2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M306.208 131.125c-4.167-4.167-10.917-4.167-15.083 0L173.792 248.458c-4.167 4.167-4.167 10.917 0 15.083l117.333 117.333a10.634 10.634 0 007.542 3.125c2.729 0 5.458-1.042 7.542-3.125 4.167-4.167 4.167-10.917 0-15.083L196.417 256l109.792-109.792c4.166-4.166 4.166-10.916-.001-15.083z"
});

function SvgLeft(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    className: "left_svg__navigation__icon left_svg__icon-left",
    viewBox: "0 0 512 512"
  }, props), _ref, _ref2);
}

/* harmony default export */ __webpack_exports__["a"] = (SvgLeft);

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0zm0 490.667C126.604 490.667 21.333 385.396 21.333 256S126.604 21.333 256 21.333 490.667 126.604 490.667 256 385.396 490.667 256 490.667z"
});

var _ref2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M220.875 131.125c-4.167-4.167-10.917-4.167-15.083 0-4.167 4.167-4.167 10.917 0 15.083L315.583 256 205.792 365.792c-4.167 4.167-4.167 10.917 0 15.083a10.634 10.634 0 007.542 3.125c2.729 0 5.458-1.042 7.542-3.125l117.333-117.333c4.167-4.167 4.167-10.917 0-15.083L220.875 131.125z"
});

function SvgRight(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    className: "right_svg__navigation__icon right_svg__icon-right",
    viewBox: "0 0 512 512"
  }, props), _ref, _ref2);
}

/* harmony default export */ __webpack_exports__["a"] = (SvgRight);

/***/ })

/******/ });
//# sourceMappingURL=wiki.bundle.js.map