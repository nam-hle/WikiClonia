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
/******/ 		0: 0
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
/******/ 	deferredModules.push([81,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return usePageContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useMetaData; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WikiWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _useFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





var usePageContent = function usePageContent(title, setLoading) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      pageContent = _useState2[0],
      setPageContent = _useState2[1];

  var pageContentFetcher = Object(_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* pageContentParams */ "d"])(title)), {
    location: "pageContent"
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _pageContentFetcher$r, _pageContentFetcher$r2, _pageContentFetcher$r3;

    var response = (_pageContentFetcher$r = pageContentFetcher.response) === null || _pageContentFetcher$r === void 0 ? void 0 : (_pageContentFetcher$r2 = _pageContentFetcher$r.parse) === null || _pageContentFetcher$r2 === void 0 ? void 0 : (_pageContentFetcher$r3 = _pageContentFetcher$r2.wikitext) === null || _pageContentFetcher$r3 === void 0 ? void 0 : _pageContentFetcher$r3["*"];

    if (response) {
      setPageContent(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* parseWikiText */ "e"])(response));
      setLoading(false);
    }
  }, [pageContentFetcher.response, title]);
  return {
    pageContent: pageContent
  };
};

__signature__(usePageContent, "useState{[pageContent, setPageContent](null)}\nuseFetch{pageContentFetcher}\nuseEffect{}", function () {
  return [_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]];
});

var useImages = function useImages(title) {
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      images = _useState4[0],
      setImages = _useState4[1];

  var imageFetch = Object(_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* imageParams */ "b"])(title)), {
    location: "useImages"
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _imageFetch$response, _imageFetch$response$;

    var imgs = (_imageFetch$response = imageFetch.response) === null || _imageFetch$response === void 0 ? void 0 : (_imageFetch$response$ = _imageFetch$response.query) === null || _imageFetch$response$ === void 0 ? void 0 : _imageFetch$response$.pages,
        res = {};

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

var useMetaData = function useMetaData(title) {
  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      date = _useState6[0],
      setDate = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState7, 2),
      creator = _useState8[0],
      setCreator = _useState8[1];

  var dateFetcher = Object(_useFetch_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* metaDataParams */ "c"])(title)), {
    location: "useMetaData"
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _dateFetcher$response, _dateFetcher$response2;

    var response = (_dateFetcher$response = dateFetcher.response) === null || _dateFetcher$response === void 0 ? void 0 : (_dateFetcher$response2 = _dateFetcher$response.query) === null || _dateFetcher$response2 === void 0 ? void 0 : _dateFetcher$response2.pages,
        dateResponse,
        creatorResponse;

    if (response) {
      for (var _i = 0, _Object$keys = Object.keys(response); _i < _Object$keys.length; _i++) {
        var _response$pageID;

        var pageID = _Object$keys[_i];
        var revisions = response === null || response === void 0 ? void 0 : (_response$pageID = response[pageID]) === null || _response$pageID === void 0 ? void 0 : _response$pageID.revisions;

        if (revisions === null || revisions === void 0 ? void 0 : revisions.length) {
          dateResponse = revisions[0].timestamp;
          creatorResponse = revisions[0].user;
        }
      }

      var dateObject = new Date(dateResponse);
      var _ref = [dateObject.getDate(), dateObject.toLocaleString("default", {
        month: "long"
      }), dateObject.getFullYear()],
          dateOfMonth = _ref[0],
          month = _ref[1],
          year = _ref[2];
      setCreator(creatorResponse);
      setDate("".concat(month, " ").concat(dateOfMonth, ", ").concat(year));
    }
  }, [dateFetcher.response]);
  return {
    date: date,
    creator: creator
  };
};

__signature__(useMetaData, "useState{[date, setDate](null)}\nuseState{[creator, setCreator](null)}\nuseFetch{dateFetcher}\nuseEffect{}", function () {
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
  reactHotLoader.register(useMetaData, "useMetaData", "/Users/hoangnam/Dev/Templates/ReactJS/src/hooks/useWiki.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);
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

 // const log = async mess => Promise.resolve(console.log(mess));

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
  }, [url]);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagesContext; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61);
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71);
/* harmony import */ var _hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(75);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(195);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(196);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_8__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






 // import { BarLoader as Loader } from "react-spinners";



var ImagesContext = react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext(null);

var Article = function Article(_ref) {
  var _useParams, _ref2;

  var force_title = _ref.force_title;
  var title = force_title ? force_title : (_useParams = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* useParams */ "h"])()) === null || _useParams === void 0 ? void 0 : _useParams.title;
  var images = Object(_hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* useImages */ "a"])(title);
  var metaData = Object(_hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* useMetaData */ "b"])(title);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(false),
      _React$useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _usePageContent = Object(_hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* usePageContent */ "c"])(title, setLoading),
      pageContent = _usePageContent.pageContent;

  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(function () {
    setLoading(true);
  }, [title]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ImagesContext.Provider, {
    value: {
      images: images
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_5__["SkeletonTheme"], {
    color: "transparent"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "article"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "hero"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "hero__title"
  }, title.replace(/_/g, " ")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "hero__credit"
  }, "Created on ".concat(metaData.date, " by ").concat(metaData.creator, " | ").concat((_ref2 = (pageContent === null || pageContent === void 0 ? void 0 : pageContent.wordCount) / 300) === null || _ref2 === void 0 ? void 0 : _ref2.toFixed(0), " min read").toUpperCase()), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    content: pageContent === null || pageContent === void 0 ? void 0 : pageContent.children,
    loading: loading
  })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Navigation__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    headings: pageContent === null || pageContent === void 0 ? void 0 : pageContent.headings
  })));
};

__signature__(Article, "useParams{}\nuseImages{images}\nuseMetaData{metaData}\nuseState{[loading, setLoading](false)}\nusePageContent{{ pageContent }}\nuseEffect{}", function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* useParams */ "h"], _hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* useImages */ "a"], _hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* useMetaData */ "b"], _hooks_useWiki_js__WEBPACK_IMPORTED_MODULE_4__[/* usePageContent */ "c"]];
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

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PairPipe; });
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var Comment = {
  elementName: "Comment",
  startToken: "<!--",
  endToken: ["-->"],
  allowedChildren: []
},
    HightLight = {
  elementName: "HightLight",
  startToken: "<syntaxhighlight",
  endToken: ["</syntaxhighlight>"],
  allowedChildren: []
},
    Code = {
  elementName: "Code",
  startToken: "<code>",
  endToken: ["</code>"],
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
  allowedChildren: [Code, HightLight, Comment, Gallery, Break, BoldItalic, Bold, Italic, Link, ExternalLink, Heading6, Heading5, Heading4, Heading3, Heading2, Heading1, Reference, BlockQuote, Template]
};
Link.allowedChildren.push(Link);
Italic.allowedChildren.push(Link);
Reference.allowedChildren.push(Break, Template);
Template.allowedChildren.push(Template, Reference, Link);
PairPipe.allowedChildren = Global.allowedChildren;

for (var _i = 0, _arr = [Heading6, Heading5, Heading4, Heading3, Heading2, Heading1]; _i < _arr.length; _i++) {
  var heading = _arr[_i];
  heading.allowedChildren.push(Template);
}


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Comment, "Comment", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(HightLight, "HightLight", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Code, "Code", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Break, "Break", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(BoldItalic, "BoldItalic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Bold, "Bold", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Italic, "Italic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Gallery, "Gallery", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Link, "Link", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(ExternalLink, "ExternalLink", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Heading1, "Heading1", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Heading2, "Heading2", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Heading3, "Heading3", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Heading4, "Heading4", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Heading5, "Heading5", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Heading6, "Heading6", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Reference, "Reference", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Template, "Template", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(BlockQuote, "BlockQuote", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(PairPipe, "PairPipe", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
  reactHotLoader.register(Global, "Global", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/elements.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return tasteStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return capitalizeFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return capitalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return trimQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clean; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var tasteStr = function tasteStr(s, t, i) {
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
    if (!value || Array.isArray(value) && !value.length || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === "object" && !Object.keys(value).length) continue;
    res[key] = value;
  }

  return res;
};


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(tasteStr, "tasteStr", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/utils.js");
  reactHotLoader.register(capitalizeFirst, "capitalizeFirst", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/utils.js");
  reactHotLoader.register(capitalize, "capitalize", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/utils.js");
  reactHotLoader.register(trimQuote, "trimQuote", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/utils.js");
  reactHotLoader.register(clean, "clean", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/utils.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(80);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};







var App = function App() {
  console.log("[App] Render");
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Menu__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* Switch */ "d"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* Route */ "b"], {
    exact: true,
    path: "/"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* Redirect */ "a"], {
    to: "/home"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[/* Route */ "b"], {
    path: "/:title"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Article__WEBPACK_IMPORTED_MODULE_1__[/* default */ "b"], null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Footer__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null));
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

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






var override =  true ? {
  name: "1nf60na-override",
  styles: "margin:20vh auto;;label:override;"
} : undefined;

var Content = function Content(_ref) {
  var content = _ref.content,
      loading = _ref.loading;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wiki-content"
  }, !loading && content ? content.map(function (element) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Elements__WEBPACK_IMPORTED_MODULE_1__[/* Element */ "a"], {
      key: Object(uuid__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(),
      props: element
    });
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_3__["GridLoader"], {
    css: override,
    color: getComputedStyle(document.documentElement).getPropertyValue("--text-color")
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

  reactHotLoader.register(override, "override", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Content/index.js");
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

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export Text */
/* unused harmony export Template */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);
/* harmony import */ var prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(176);
/* harmony import */ var prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_clike__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(177);
/* harmony import */ var prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_markup__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(178);
/* harmony import */ var prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_javascript__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(179);
/* harmony import */ var prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prismjs_components_prism_ruby__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(180);
/* harmony import */ var prismjs_components_prism_ruby__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_ruby__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prismjs_components_prism_java__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(181);
/* harmony import */ var prismjs_components_prism_java__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_java__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var prismjs_components_prism_ada__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(182);
/* harmony import */ var prismjs_components_prism_ada__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prismjs_components_prism_ada__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(183);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_numbers_prism_line_numbers_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(184);
/* harmony import */ var prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_line_numbers_prism_line_numbers__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(185);
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_toolbar_prism_toolbar_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(186);
/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_toolbar_prism_toolbar__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var prismjs_plugins_show_language_prism_show_language__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(187);
/* harmony import */ var prismjs_plugins_show_language_prism_show_language__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_show_language_prism_show_language__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(188);
/* harmony import */ var prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(prismjs_themes_prism_okaidia_css__WEBPACK_IMPORTED_MODULE_18__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};


 // import { Link, Switch, Route } from "react-router-dom";




 // import "prismjs/themes/prism-tomorrow.css";














var Text = function Text(_ref) {
  var text = _ref.text;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, text.replace("\n\n", "\n"));
};

var Heading = function Heading(_ref2) {
  var className = _ref2.className,
      id = _ref2.id,
      text = _ref2.text,
      level = _ref2.level,
      indices = _ref2.indices;
  var heading = react__WEBPACK_IMPORTED_MODULE_0___default.a.useRef();

  if (1 === level) {
    var indexLevel = "" + indices[0];
    if (indexLevel < 10) indexLevel = "0" + indexLevel;
    var tensIndexLevel = indexLevel[0],
        onesIndexLvel = indexLevel[1];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      ref: heading,
      className: className,
      id: id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "heading__index heading__tens"
    }, tensIndexLevel), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "heading__index heading__ones"
    }, onesIndexLvel), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "heading__text"
    }, text));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: heading,
    className: className,
    id: id
  }, text);
};

__signature__(Heading, "useRef{heading}");

var WikiLink = function WikiLink(_ref3) {
  var url = _ref3.url,
      displayText = _ref3.displayText;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Tooltip__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    url: url
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* Link */ "b"], {
    to: "/" + url,
    onClick: function onClick() {
      document.body.scrollTop = 0;
    }
  }, displayText.map(function (e) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
      key: Object(uuid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(),
      props: e
    });
  })));
};

var Template = function Template(_ref4) {
  var props = _ref4.props;
  if (props.type == "N/A" || props.type == "Infobox") return "";
  var attribute = props.attribute;

  if (props.type == "multipleImages") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "wiki-gallery"
    }, props.images && props.images.map(function (e) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
        key: Object(uuid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(),
        props: e
      });
    }));
  }

  if (props.type == "cite") return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "wiki-cite",
    href: attribute.url
  }, "\"".concat(attribute.title, "\"")), ". ", props.subType == "web" && attribute.publisher && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "".concat(attribute.publisher, ". ")), props.subType == "web" && attribute.accessdate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Retrieved ".concat(attribute.accessdate, ". ")));

  if (props.type == "footnote") {
    return ""; // return (
    //   <sup className="wiki-footnote">
    //     {props?.children?.map(e => (
    //       <Element key={uuidv4()} props={e} />
    //     ))}
    //   </sup>
    // );
  }

  return "<--N/A" + JSON.stringify(props) + "-->";
};

var Image = function Image(_ref5) {
  var id = _ref5.id,
      src = _ref5.src,
      _float = _ref5["float"],
      caption = _ref5.caption;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wiki-img__container ".concat(_float)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    id: id,
    className: "lazyload wiki-img__image",
    "data-src": src
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wiki-img__caption"
  }, (caption === null || caption === void 0 ? void 0 : caption.map(function (e) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
      key: Object(uuid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(),
      props: e
    });
  })) || "")));
};

var HightLight = function HightLight(_ref6) {
  var code = _ref6.code,
      language = _ref6.language;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", {
    className: language ? "language-".concat(language) : "",
    dangerouslySetInnerHTML: {
      __html: prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_5___default.a.highlight(code.trim(), prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_5___default.a.languages[language] || prismjs_components_prism_core__WEBPACK_IMPORTED_MODULE_5___default.a.languages.js, language)
    }
  }));
};

var Element = function Element(_ref7) {
  var props = _ref7.props;
  if (props === null) throw new Error("Create element withou props");
  var elementName = props.elementName,
      children = props.children;
  if (elementName == "Comment") return "";

  if (elementName == "ExternalLink") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "https://en.wikipedia.org/wiki/" + props.url
    }, props.displayText);
  }

  if (elementName == "Break") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null);
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
    renderChildren = children.map(function (e) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
        key: Object(uuid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(),
        props: e
      });
    });
  }

  if (elementName == "Code") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", {
      className: "wiki-code"
    }, renderChildren);
  }

  if (elementName == "HightLight") {
    // console.count();
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HightLight, {
      code: props.code,
      language: props.language
    }); // return (
    //   <PrismCode
    //     code={props.code}
    //     language={props.language}
    //     plugins={["line-numbers"]}
    //   />
    // );
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Heading, props);
  }

  if (elementName == "Gallery") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "wiki-gallery"
    }, props.images.map(function (e) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
        key: Object(uuid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(),
        props: e
      });
    }));
  }

  if (elementName == "Link") {
    var type = props.type;

    if (type == "wikiLink") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WikiLink, {
        url: props.url,
        displayText: props.displayText
      });
    }

    if (type == "media") {
      var _valueImages$images;

      var valueImages = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(_Article__WEBPACK_IMPORTED_MODULE_1__[/* ImagesContext */ "a"]);

      if ((props === null || props === void 0 ? void 0 : props.url) && (valueImages === null || valueImages === void 0 ? void 0 : (_valueImages$images = valueImages.images) === null || _valueImages$images === void 0 ? void 0 : _valueImages$images[props.url])) {
        var _props$options;

        var _float2 = !props.multipleImage && (props === null || props === void 0 ? void 0 : (_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.indexOf("left")) > -1 ? "fl-left" : "fl-right";

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Image, {
          id: props.url,
          src: valueImages.images[props.url].url,
          "float": _float2,
          caption: props.caption
        });
      }
    }
  } else if (elementName == "Reference") {
    var _props$children, _props$children$, _props$children$$attr;

    if (props && ((_props$children = props.children) === null || _props$children === void 0 ? void 0 : (_props$children$ = _props$children[0]) === null || _props$children$ === void 0 ? void 0 : (_props$children$$attr = _props$children$.attribute) === null || _props$children$$attr === void 0 ? void 0 : _props$children$$attr.url)) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: props.children[0].attribute.url
      }, props.referenceIndex));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: props
    }, props.referenceIndex));
  }

  return "";
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
  reactHotLoader.register(Image, "Image", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(HightLight, "HightLight", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
  reactHotLoader.register(Element, "Element", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Elements/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WikiWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(175);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_6__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








var extractSummary = function extractSummary(json) {
  var _json$query, _json$query2, _json$query2$normaliz, _json$query2$normaliz2, _extract;

  var maxchar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var content = json === null || json === void 0 ? void 0 : (_json$query = json.query) === null || _json$query === void 0 ? void 0 : _json$query.pages,
      extract = null,
      title = json === null || json === void 0 ? void 0 : (_json$query2 = json.query) === null || _json$query2 === void 0 ? void 0 : (_json$query2$normaliz = _json$query2.normalized) === null || _json$query2$normaliz === void 0 ? void 0 : (_json$query2$normaliz2 = _json$query2$normaliz[0]) === null || _json$query2$normaliz2 === void 0 ? void 0 : _json$query2$normaliz2.to;

  for (var key in content) {
    var _content$key;

    extract = (_content$key = content[key]) === null || _content$key === void 0 ? void 0 : _content$key.extract;
  }

  extract = ((_extract = extract) === null || _extract === void 0 ? void 0 : _extract.substr(0, maxchar)) + "...";
  return {
    extract: extract,
    title: title
  };
};

var override =  true ? {
  name: "1g5hr90-override",
  styles: "width:50%;margin:0 auto;height:10vh;maxheight:100px;display:flex;justify-content:center;align-items:center;;label:override;"
} : undefined;

var Tooltip = function Tooltip(props) {
  var url = props.url,
      children = props.children;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      summary = _useState2[0],
      setSummary = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      title = _useState4[0],
      setTitle = _useState4[1];

  var handleMouseIn = function handleMouseIn() {
    return setShow(true);
  };

  var handleMouseOut = function handleMouseOut() {
    return setShow(false);
  };

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      show = _useState6[0],
      setShow = _useState6[1];

  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(function () {
    var source = axios__WEBPACK_IMPORTED_MODULE_4___default.a.CancelToken.source();

    if (show && !summary) {
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_2__[/* summaryParams */ "g"])(url)), {
        cancelToken: source.token
      }).then(function (response) {
        return response.data;
      }).then(function (json) {
        var _extractSummary = extractSummary(json),
            extract = _extractSummary.extract,
            title = _extractSummary.title;

        setSummary(extract);
        setTitle(title || url);
      })["catch"](function () {});
    }

    return function () {
      return source.cancel("");
    };
  }, [show]);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
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
  }, title) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_3__["BarLoader"], {
    css: override,
    color: getComputedStyle(document.documentElement).getPropertyValue("--text-color")
  }), summary), react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.toArray(children));
};

__signature__(Tooltip, "useState{[summary, setSummary](null)}\nuseState{[title, setTitle](null)}\nuseState{[show, setShow](false)}\nuseEffect{}");

var _default = Tooltip;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(extractSummary, "extractSummary", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
  reactHotLoader.register(override, "override", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
  reactHotLoader.register(Tooltip, "Tooltip", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Tooltip/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(95);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(42);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var convert_units__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(20);
/* harmony import */ var convert_units__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(convert_units__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35);
/* harmony import */ var _analyser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(68);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5);










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _templateObject3() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4___default()([" "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_4___default()(["----"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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




 // var convert = require("convert-units");

var UNITS = convert_units__WEBPACK_IMPORTED_MODULE_9___default()().list();
var ABBR_UNITS = convert_units__WEBPACK_IMPORTED_MODULE_9___default()().list().map(function (unit) {
  return unit.abbr;
});

var createTextElement = function createTextElement(text) {
  return {
    elementName: "Text",
    text: text
  };
};

var CiteParser = function CiteParser(plain) {
  var R_CITE = /*#__PURE__*/_wrapRegExp(/\{\{cite ([0-9A-Z_a-z]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\|?([\0-\uFFFF]*)\}\}$/gi, {
    subType: 1,
    remain: 2
  });

  var match = R_CITE.exec(plain);
  if (!match) return;
  var _match$groups = match.groups,
      subType = _match$groups.subType,
      remain = _match$groups.remain;
  var attribute = {};

  var _iterator = _createForOfIteratorHelper(remain.split("|")),
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
  // console.log(plain);
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
      toUnit = null,
      answer = null,
      fromUnit;
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
  // console.log(plain);
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
    var _match$groups2 = match.groups;
    remain = _match$groups2.remain;
    refgroup = _match$groups2.refgroup;
    refgroup = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* trimQuote */ "e"])(refgroup);
  } // 3. Try extract refname


  var R_NAME = /*#__PURE__*/_wrapRegExp(/^name *= *("[\0-!\$-\.0-<\?-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-\uFFFF]*)$/gi, {
    refname: 1,
    remain: 2
  });

  if ((match = R_NAME.exec(remain)) !== null) {
    var _match$groups3 = match.groups;
    remain = _match$groups3.remain;
    refname = _match$groups3.refname;
    refname = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* trimQuote */ "e"])(refname);
  } // 4.1. Reuse Reference


  if (/^\s*\/>$/.exec(remain)) {
    return {
      type: "reuse",
      refname: refname,
      refgroup: refgroup
    };
  } // 4.2. Firstuse Reference
  // console.log(remain);


  var R_FIRSTUSE = /*#__PURE__*/_wrapRegExp(/^>([\0-\uFFFF]+)<\/ref>$/gi, {
    children: 1
  });

  if ((match = R_FIRSTUSE.exec(remain)) === null) {
    console.warn("Firstuse Reference Error " + remain);
    return {
      type: "firstuse",
      refname: "",
      refgroup: "",
      children: []
    };
  }

  children = main(match.groups.children).children;
  refname = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* trimQuote */ "e"])(refname);
  refgroup = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* trimQuote */ "e"])(refgroup);
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
  var _match$groups4 = match.groups;
  subType = _match$groups4.subType;
  remain = _match$groups4.remain;

  // 2. Extract group footnote
  var R_GROUP = /*#__PURE__*/_wrapRegExp(/^group=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)\|([\0-\uFFFF]+)$/, {
    fnGroup: 1,
    remain: 2
  });

  if ((match = R_GROUP.exec(remain)) !== null) {
    var _match$groups5 = match.groups;
    fnGroup = _match$groups5.fnGroup;
    remain = _match$groups5.remain;
  } // 3. Extract name footnote


  var R_NAME = /*#__PURE__*/_wrapRegExp(/^name=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)(\|([\0-\uFFFF]+))?$/, {
    fnName: 1,
    remain: 3
  });

  if ((match = R_NAME.exec(remain)) !== null) {
    var _match$groups6 = match.groups;
    fnName = _match$groups6.fnName;
    remain = _match$groups6.remain;
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
  var R_GALLERY = /*#__PURE__*/_wrapRegExp(/<gallery[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-=\?-\uFFFF]+)?>([\0-\uFFFF]+)<\/gallery>/gi, {
    attr: 1,
    content: 2
  });

  var match,
      attr,
      content,
      attributes = {};
  if ((match = R_GALLERY.exec(plain)) === null) throw "Gallery Syntax Error" + plain;
  var _match$groups7 = match.groups;
  attr = _match$groups7.attr;
  content = _match$groups7.content;

  var R_PAIR = /*#__PURE__*/_wrapRegExp(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([0-9A-Z_a-z]+)=("[\0-!\$-&\(-\.0-<@-\[\]-\uFFFF]+"|[\0-\x1F!\$-&\(-\.0-<@-\[\]-\uFFFF]+)/g, {
    key: 1,
    value: 2
  });

  while ((match = R_PAIR.exec(attr)) !== null) {
    var _match$groups8 = match.groups,
        key = _match$groups8.key,
        value = _match$groups8.value;
    attributes[key] = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* trimQuote */ "e"])(value);
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

  var R_KEY = /*#__PURE__*/_wrapRegExp(/^[\t-\r \|\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(([\n \/-9A-Z_a-z]|\x2D)+)= *([\0-\uFFFF]*)$/, {
    key: 1,
    remain: 3
  }); // const R_EMPTY_VALUE = /^[\|\s]*(?<key>[\w \-\/]+)=\s*(?<remain>[\s\S]*)$/;


  while (remain) {
    if ((match = R_KEY.exec(remain)) === null) {
      // if ((match = R_EMPTY_VALUE.exec(remain)) === null) {
      // console.log(remain.replace(/\n/g, "@").replace(/ /g, "%"));
      throw "@Key PairPipe Syntax Error," + remain.replace(/\n/g, "@").replace(/ /g, "%");
    } // ({ remain } = match.groups);
    // continue;
    // }


    var _match$groups9 = match.groups;
    key = _match$groups9.key;
    remain = _match$groups9.remain;
    key = key.trim();

    var _parse = parse(remain, null, 0, _elements__WEBPACK_IMPORTED_MODULE_10__[/* PairPipe */ "b"]);

    var _parse2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3___default()(_parse, 3);

    nextIndex = _parse2[0];
    parsedPlain = _parse2[2];
    remain = remain.substr(nextIndex);
    var value = parsedPlain;
    match = /*#__PURE__*/_wrapRegExp(/^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([\0-\uFFFF]+?)[\t-\r \|\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/, {
      value: 1
    }).exec(value);
    if (match === null) throw "Value PairPipe Syntax Error ".concat(value);
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

    var _match$groups10 = match.groups,
        imageKey = _match$groups10.imageKey,
        imageID = _match$groups10.imageID;
    imageID = +imageID - 1;
    if (images[imageID] === undefined) images[imageID] = {};

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
      multipleImage: true,
      options: Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* clean */ "c"])(_objectSpread({}, image, {
        image: null,
        caption: null,
        url: null
      })),
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
  var _match$groups11 = match.groups;
  subtype = _match$groups11.subtype;
  remain = _match$groups11.remain;
  subtype = subtype.trim();

  var _iterator5 = _createForOfIteratorHelper(remain.split(_templateObject2())),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var section = _step5.value;
      sections.push(parsePairPipe(section));
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

var InternalLinkParser = function InternalLinkParser(plain, content) {
  var match;
  var R_ARTICLE = /^\[\[([^|]+)(\|([^|]+)?)?\]\](\w+)?$/;

  if (match = R_ARTICLE.exec(plain)) {
    var fullUrl = match[1],
        nonePipe = !match[2],
        trailingPipe = match[2] && !match[3],
        displayText = match[3],
        suffixStr = match[4] || ""; // console.log({
    //   fullUrl,
    //   nonePipe,
    //   trailingPipe,
    //   displayText,
    //   suffixStr
    // });
    // Manipulate the url

    var namespace, disambiguation, rootUrl, url; //
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

    namespace = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* capitalize */ "a"])(urlMatch[1] || "");
    rootUrl = urlMatch[4] || urlMatch[7] || urlMatch[11];
    disambiguation = urlMatch[5] || urlMatch[8] || "";

    if ("File:" != namespace) {
      url = namespace + Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* capitalizeFirst */ "b"])(rootUrl) + disambiguation;
      url = url.replace(/ /g, "_"); // convert to valid URL

      displayText = nonePipe ? fullUrl : trailingPipe ? rootUrl : displayText;

      if (suffixStr) {
        displayText += suffixStr;
      }

      displayText = [{
        elementName: "Text",
        text: displayText
      }];
      return {
        type: "wikiLink",
        url: url,
        displayText: displayText
      };
    }
  } // For handling format like:
  // [[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}''
  // in [[Rincón de Ademuz]]


  var chunks = plain.slice(2, -2).split("|");
  var first = chunks[0];
  var R_MEDIA = /^(File|Image|Media):(.*)$/i;

  if (match = R_MEDIA.exec(first)) {
    var type = "media",
        supType = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* capitalizeFirst */ "b"])(match[1]),
        _rootUrl = Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* capitalizeFirst */ "b"])(match[2]),
        _url = "".concat(supType, ":").concat(_rootUrl);

    var meta = {
      type: type,
      supType: supType,
      url: _url
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

        var _match = void 0;

        if (_match = R_ATTRIBUTE.exec(chunk)) {
          options.push({
            key: _match[1],
            value: _match[2]
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
  } // throw new Error("Internal Link Syntax Error" + plain);


  return {
    children: content
  };
};

var TemplateParser = function TemplateParser(plain) {
  if (/^{{convert/i.test(plain)) return ConvertParser(plain);
  if (/^{{multiple image/i.test(plain)) return MultipleImageParser(plain);
  if (/^{{Infobox \w+/i.test(plain)) return InfoboxParser(plain);
  if (/^{{cite/i.test(plain)) return CiteParser(plain);
  if (/^{{(refn|efn|sfn|efn-\w{2})\|/i.test(plain)) return FootnoteParser(plain);

  if (/^{{lang-\w+\|/i.test(plain)) {
    var text = /\|(.*)}}$/.exec(plain)[1];
    return {
      elementName: "Italic",
      children: [createTextElement(text)]
    };
  }

  if (/^{{IPAc?-\w+\|/gi.test(plain)) {
    var _text = /\|(.*)}}$/.exec(plain)[1];
    return createTextElement("[" + _text + "]");
  }

  return {
    type: "N/A",
    children: [{
      elementName: "Text",
      text: "N/A"
    }]
  };
};

var ExternalLinkParer = function ExternalLinkParer(plain) {
  var R_EXTERNAL = /*#__PURE__*/_wrapRegExp(/^\[([\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uFEFE\uFF00-\uFFFF]+)( ([\0-\uFFFF]+))?\]$/gi, {
    url: 1,
    displayText: 3
  });

  var url,
      displayText,
      match = R_EXTERNAL.exec(plain);
  if (match === null) throw new Error("ExternalLink Syntax Error");
  var _match$groups12 = match.groups;
  url = _match$groups12.url;
  displayText = _match$groups12.displayText;
  return {
    url: url,
    displayText: displayText
  };
};

var HightLightParser = function HightLightParser(plain) {
  var R = /*#__PURE__*/_wrapRegExp(/^<syntaxhighlight([\0-=\?-\uFFFF]*)>([\0-\uFFFF]*)<\/syntaxhighlight>$/, {
    meta: 1,
    code: 2
  });

  var match;

  if ((match = R.exec(plain)) === null) {
    throw "HightLightParser error:" + plain;
  }

  var _match$groups13 = match.groups,
      meta = _match$groups13.meta,
      code = _match$groups13.code,
      language = null;

  if ((match = /*#__PURE__*/_wrapRegExp(/lang="([\0-!#-\uFFFF]+)"/, {
    language: 1
  }).exec(meta)) !== null) {
    language = match.groups.language;
  } // console.log({ meta, code });


  return {
    language: language,
    code: code
  };
};

var internalParse = function internalParse(element, content, plain) {
  var elementName = element.elementName;
  if (elementName == "HightLight") return HightLightParser(plain);
  if (elementName == "Reference") return ReferenceParser(plain);
  if (elementName == "Gallery") return GalleryParser(plain);
  if (elementName == "Link") return InternalLinkParser(plain, content);
  if (elementName == "Template") return TemplateParser(plain);
  if (elementName == "ExternalLink") return ExternalLinkParer(plain);
  return {
    children: content
  };
};

var parse = function parse(str, strlen, index, targetElement) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    headings: true
  };
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
  var elementName = targetElement.elementName,
      startToken = targetElement.startToken,
      endToken = targetElement.endToken,
      allowedChildren = targetElement.allowedChildren;
  index += startToken === null ? 0 : startToken.length;
  plain += startToken === null ? "" : startToken;

  while (index < strlen) {
    hasSelfClose = false;
    has = false;

    var _iterator7 = _createForOfIteratorHelper(allowedChildren),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var matchElement = _step7.value;
        if (!Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* tasteStr */ "d"])(str, matchElement.startToken, index)) continue;
        has = true;
        if (buffer) content.push(createTextElement(buffer));
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
        if (matchElement.elementName == "Reference") nextElement.referenceIndex = ++referenceIndex;
        if (/^Heading/.exec(nextElement.elementName) !== null) headings.push(nextElement);
        if (nextElement.elementName == "Link" && nextElement.type == "media" && nextElement.supType == "File") images.push(nextElement);
        if (nextElement.elementName == "Gallery") images.push.apply(images, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(nextElement.images));
        break;
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    if (hasSelfClose) continue;

    if (!has) {
      if (endToken) {
        var catchEndToken = false;

        var _iterator8 = _createForOfIteratorHelper(endToken),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var eToken = _step8.value;

            if (Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* tasteStr */ "d"])(str, eToken, index)) {
              catchEndToken = true;
              index += eToken.length;
              plain += eToken;

              if (targetElement.elementName == "Link") {
                while (index < strlen) {
                  var nowiki = "<nowiki />";

                  if (Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* tasteStr */ "d"])(str, nowiki, index)) {
                    index += nowiki.length;
                    break;
                  } else if (/\w/.test(str[index])) {
                    plain += str[index++];
                  } else break;
                }
              }
            } // end tasteStr

          } // end for endToken

        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }

        if (catchEndToken) break;
      } // end if endToken


      if (index < strlen) {
        plain += str[index];
        buffer += str[index++];
      }
    } // end not has

  }

  if (buffer) content.push(createTextElement(buffer));
  var wordCount;

  if (targetElement.elementName === "Global") {
    wordCount = content.reduce(function (acc, curr) {
      return acc + (curr.elementName === "Text" ? curr.text.split(_templateObject3()).length : 0);
    }, 0);
  }

  var res = [index, Object(_utils__WEBPACK_IMPORTED_MODULE_12__[/* clean */ "c"])(_objectSpread({
    elementName: elementName,
    headings: opts.headings ? Object(_analyser__WEBPACK_IMPORTED_MODULE_11__[/* analyseHeadings */ "a"])(headings) : null,
    wordCount: wordCount,
    images: images
  }, internalParse(targetElement, content, plain, options))), plain];
  return res;
};

var main = function main(str, opts) {
  return str ? parse(str, null, 0, _elements__WEBPACK_IMPORTED_MODULE_10__[/* Global */ "a"], opts)[1] : "";
};


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UNITS, "UNITS", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ABBR_UNITS, "ABBR_UNITS", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(createTextElement, "createTextElement", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(CiteParser, "CiteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ConvertParser, "ConvertParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ReferenceParser, "ReferenceParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(FootnoteParser, "FootnoteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(GalleryParser, "GalleryParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(parsePairPipe, "parsePairPipe", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(MultipleImageParser, "MultipleImageParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(InfoboxParser, "InfoboxParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(InternalLinkParser, "InternalLinkParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(TemplateParser, "TemplateParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ExternalLinkParer, "ExternalLinkParer", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(HightLightParser, "HightLightParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(internalParse, "internalParse", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
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

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return analyseHeadings; });
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var extractHeadingText = function extractHeadingText(heading) {
  return heading.children.reduce(function (acc, child) {
    return acc + ("Text" === child.elementName ? child.text : "");
  }, "");
};

var analyseHeadings = function analyseHeadings(headings) {
  if (!headings.length) return null;

  var getLevel = function getLevel(heading) {
    return +/^Heading(\d)$/.exec(heading.elementName)[1];
  };

  var currentLevel = 0,
      res = {},
      currentHeading = res;
  res.indices = [];

  var _iterator = _createForOfIteratorHelper(headings),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var heading = _step.value;
      var level = getLevel(heading),
          headingText = extractHeadingText(heading).trim(),
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
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return res;
};


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(extractHeadingText, "extractHeadingText", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/analyser.js");
  reactHotLoader.register(analyseHeadings, "analyseHeadings", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/analyser.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asset_images_left_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var _asset_images_right_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(193);
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
    headingsRef.current.scrollLeft = direction == "right" ? Math.min(maxPos, pos + slideWidth) : Math.max(0, pos - slideWidth);
  };

  var handle2 = function handle2(id) {
    var heading = document.getElementById(id);
    var button = document.getElementById(id + "__btn");
    var navigation = document.getElementsByClassName("navigation__headings")[0];
    var _ref2 = [button.offsetWidth, button.offsetLeft],
        buttonWidth = _ref2[0],
        buttonPosition = _ref2[1];
    var _ref3 = [navigation.clientWidth, navigation.scrollLeft],
        navigationClientWidth = _ref3[0],
        navigationScrollLeft = _ref3[1];
    var buttonMin = buttonPosition,
        buttonMax = buttonPosition + buttonWidth;
    var windowMin = navigationScrollLeft,
        windowMax = navigationScrollLeft + navigationClientWidth;

    if (buttonMin > windowMax || buttonMax < windowMin) {
      console.log("out of bound");
    } else if (buttonMin >= windowMin && buttonMax <= windowMax) {
      console.log("entire");
    } else {
      var delta = buttonWidth * 0.5;

      if (buttonMin < windowMin) {
        delta += windowMin - buttonMin;
        navigation.scrollLeft -= delta;
      } else {
        delta += buttonMax - windowMax;
        navigation.scrollLeft += delta;
      }
    }

    var body = document.body;
    body.scrollTop = heading.offsetTop - document.getElementsByClassName("menu")[0].clientHeight;
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "navigation-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  }, headings === null || headings === void 0 ? void 0 : headings.childrenHeadings.map(function (heading, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      key: index,
      onClick: function onClick() {
        return handle2(heading.id);
      },
      id: heading.id + "__btn"
    }, heading.text);
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      return handle("right");
    },
    className: "navigation__button navigation__right-button"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_asset_images_right_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null)))));
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 72:
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

/***/ 73:
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

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _asset_images_menu_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77);
/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(199);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_3__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






var Menu = function Menu() {
  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(function () {
    var toggle = document.getElementById("theme-switch");

    var switcher = function switcher(e) {
      e.preventDefault();

      if (document.body.classList.contains("funky")) {
        toggle.innerText = "LIGHT MODE";
        document.body.classList.remove("funky");
      } else {
        toggle.innerText = "DARK MODE";
        document.body.classList.add("funky");
      }
    };

    toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener("click", switcher);
    return function () {
      return toggle.removeEventListener("click", switcher);
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__logo"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "logo-wiki"
  }, "Wiki"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "logo-pedia"
  }, "pedia"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "logo-icon"
  }, "W")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchBar__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    className: "menu__search"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "menu__main"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button"
  }, "VIEW SOURCE"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button",
    id: "theme-switch"
  }, "LIGHT MODE"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "menu__button menu__icon"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_asset_images_menu_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null)))));
};

__signature__(Menu, "useEffect{}");

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

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M492 236H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20zM492 76H20C8.954 76 0 84.954 0 96s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20zM492 396H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20z"
});

function SvgMenu(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", _extends({
    viewBox: "0 0 512 512"
  }, props), _ref);
}

/* harmony default export */ __webpack_exports__["a"] = (SvgMenu);

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _asset_images_search_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(198);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _WikiWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};










var SearchItem = function SearchItem(_ref2) {
  var title = _ref2.title,
      description = _ref2.description;
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__[/* useHistory */ "g"])();
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "searchbar__item",
    onMouseDown: function onMouseDown() {
      document.body.scrollTop = 0;
      history.push("/" + encodeURIComponent(title));
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "searchbar__title"
  }, title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/" + encodeURIComponent(title),
    className: "searchbar__overview",
    dangerouslySetInnerHTML: {
      __html: description
    }
  }));
};

__signature__(SearchItem, "useHistory{history}", function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_7__[/* useHistory */ "g"]];
});

var SearchResults = function SearchResults(_ref3) {
  var results = _ref3.results,
      _ref = _ref3._ref;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    ref: _ref,
    className: "searchbar__results"
  }, results && results.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SearchItem, {
      key: Object(uuid__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(),
      title: item.title,
      description: item.description
    });
  }));
};

var SeachBar = function SeachBar() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      movies = _useState2[0],
      setMovies = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var inputRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef(null);
  var searchResultsRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(function () {
    var reveal = function reveal() {
      searchResultsRef.current.classList.add("show");
    };

    var hidden = function hidden() {
      searchResultsRef.current.classList.remove("show");
    };

    inputRef.current.addEventListener("focus", reveal);
    inputRef.current.addEventListener("blur", hidden);
    return function () {
      inputRef.current.removeEventListener("focus", reveal);
      inputRef.current.removeEventListener("blur", hidden);
    };
  }, []);
  react__WEBPACK_IMPORTED_MODULE_1___default.a.useEffect(function () {
    var source = axios__WEBPACK_IMPORTED_MODULE_8___default.a.CancelToken.source();

    if (!value) {
      setMovies([]);
    } else {
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_5__[/* buildURL */ "a"])(Object(_WikiWrapper__WEBPACK_IMPORTED_MODULE_5__[/* searchParams */ "f"])(value)), {
        cancelToken: source.token
      }).then(function (response) {
        return response.data;
      }).then(function (json) {
        var _json$query, _json$query$search;

        var title = json === null || json === void 0 ? void 0 : (_json$query = json.query) === null || _json$query === void 0 ? void 0 : (_json$query$search = _json$query.search) === null || _json$query$search === void 0 ? void 0 : _json$query$search.map(function (movie) {
          return {
            title: movie.title,
            description: movie.snippet
          };
        });
        setMovies(title);
      })["catch"](function (thrown) {
        if (axios__WEBPACK_IMPORTED_MODULE_8___default.a.isCancel(thrown)) {
          console.log("Request canceled", thrown.message);
        } else {// handle error
        }
      });
    }

    return function () {
      return source.cancel("Canlling in cleanup");
    };
  }, [value]);

  var onChangeHandler = function onChangeHandler(e) {
    return setValue(e.target.value);
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "menu__search"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "menu__search-icon"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_asset_images_search_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "menu__searchbar"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    ref: inputRef,
    onChange: function onChange(e) {
      return onChangeHandler(e);
    },
    value: value,
    type: "text",
    placeholder: "Search Wikipedia",
    className: "menu__search-input"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SearchResults, {
    _ref: searchResultsRef,
    results: movies
  })));
};

__signature__(SeachBar, "useState{[movies, setMovies]([])}\nuseState{[value, setValue](\"\")}\nuseRef{inputRef}\nuseRef{searchResultsRef}\nuseEffect{}\nuseEffect{}");

var _default = SeachBar;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SearchItem, "SearchItem", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SearchBar/index.js");
  reactHotLoader.register(SearchResults, "SearchResults", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SearchBar/index.js");
  reactHotLoader.register(SeachBar, "SeachBar", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SearchBar/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/SearchBar/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 79:
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

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return parseWikiText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return pageContentParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return imageParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return summaryParams; });
/* unused harmony export revisionParams */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return metaDataParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return searchParams; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wiki_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);


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
  console.log("[PARSE] Begin");
  var res = Object(_wiki_parser__WEBPACK_IMPORTED_MODULE_1__[/* main */ "a"])(response);
  console.log("[PARSE] End");
  return res;
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

var revisionParams = function revisionParams(title) {
  return {
    action: "query",
    prop: "revisions",
    titles: title,
    rvprop: "user|comment|content|tags|timestamp",
    rvlimit: "5",
    format: "json"
  };
};

var metaDataParams = function metaDataParams(title) {
  return {
    action: "query",
    prop: "revisions",
    rvlimit: 1,
    rvprop: "timestamp|user|userid",
    rvdir: "newer",
    titles: title
  };
};

var searchParams = function searchParams(string) {
  return {
    action: "query",
    list: "search",
    srsearch: string,
    srprop: "size|wordcount|titlesnippet|categorysnippet|snippet",
    utf8: ""
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
  reactHotLoader.register(revisionParams, "revisionParams", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
  reactHotLoader.register(metaDataParams, "metaDataParams", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
  reactHotLoader.register(searchParams, "searchParams", "/Users/hoangnam/Dev/Templates/ReactJS/src/WikiWrapper/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(200);
/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_1__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




var Footer = function Footer() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "footer"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter subfooter__about-project"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter__title"
  }, "ABOUT PROJECT"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter__content"
  }, "This project redefines the way we use wikipedia entirely. From actual wikitext format in each article, we parse and convert it into new beautiful websites with React library.", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, "Source"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter subfooter__about-me"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter__title"
  }, "ABOUT ME"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter__content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/"
  }, "GitHub"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://stackoverflow.com"
  }, "Stack Overflow"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://facebook.com"
  }, "Facebook"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://google.com"
  }, "Mail"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter subfooter__quick-links"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter__title"
  }, "QUICK LINKS"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "subfooter__content"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, "Home"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, "Top of page"))));
};

var _default = Footer;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Footer, "Footer", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Footer/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Footer/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_WikiApp_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82);
/* harmony import */ var _components_WikiApp_normalize_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_WikiApp_normalize_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_WikiApp_theme_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83);
/* harmony import */ var _components_WikiApp_theme_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_WikiApp_theme_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(59);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_WikiApp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(60);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.render(react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* BrowserRouter */ "a"], null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_WikiApp__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null)), document.getElementById("wikiapp"));

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

/******/ });