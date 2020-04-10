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
/******/ 	deferredModules.push([73,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main; });
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

// const s =
//   // "but the idea is much older. [[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}'' (farm cat hole) in [[Rincón de Ademuz]], Valencia, Spain]] In rural areas, cat doors";
//   // "==Dog stiles== [[File:Dog door demonstration - geograph.org.uk - 718920.jpg|thumb|left|A man lets a dog through the lift-up hatch at a stile in [[Medway]], [[England]].|247x247px]]";
// "[[File:Doggy door exit.JPG|thumb|A dog exiting through a pet door]]\nA '''pet door''' or '''pet flap''' (also referred to in more specific terms, such as '''cat flap''', '''cat door''', '''dog door''', or '''doggy door''') is a small opening to allow [[pet]]s to enter and exit a building on their own without needing a human to open the door.  Originally simple holes, the modern form is a hinged and often spring-loaded panel or flexible flap, and some are electronically controlled.  They offer a degree of protection against wind, rain, and larger-bodied intruders entering the dwelling. Similar hatches can let dogs through fences at stiles. A related concept is the '''pet gate''', which is easy for humans to open but acts as a secure pet barrier, as well as the '''automated left- or right-handed pet doors'''.<ref>{{Cite web|url=http://www.gizmag.com/passive-house-petwalk-door/31162/|title=World's first Passive House-certified pet door unveiled at Ecobuild 2014|website=www.gizmag.com|access-date=2016-07-07}}</ref>\n\n==Purpose==\nA pet door is found to be convenient by many owners of companion animals, especially dogs and cats, because it lets the pets come and go as they please, reducing the need for pet-owners to let or take the pet outside manually, and curtailing unwanted behaviour such as loud vocalisation to be let outside, scratching on doors or walls, and (especially in the case of dogs) [[Excretion|excreting]] in the house. They also help to ensure that a pet left outdoors can safely get back into the house in the case of inclement weather.\n\n==Features==\n[[File:Cat flap.jpg|thumb|A cat flap in action]]\nThe simplest type are bottom-weighted flaps hung from the top of the opening, which swing shut on their own, but may be spring-aided to increase wind resistance. These flaps often feature magnets around the edges to help keep the door closed against weather and wind. Some pet doors have side-mounted hinges and swing open like saloon doors. These pet doors usually have a spring or other contrivance to force their closure after the pet has gone through. Instead of a rubber flap, saloon style doors are often made from plastic, acrylic, or plexiglass, and the panels are fitted with weather seal to help keep weather outside.\n\nAnother common feature is an adjustable catch to restrict the opening of the device to either one direction or the other; for example, to allow the pet to come in for the night, but not go out again until the owner releases the catch the next morning. Some pets, mostly cats with their retractile claws and flexible paws, learn to circumvent one-way pet doors, especially the \"flap-within-flap\" design.\n\nMost also have a locking mechanism of some kind, and can be closed off by sliding a rigid plate into parallel rails on the left and right of the interior side of the pet door, useful during bad weather or when the owners are traveling with their pets.\n\nPet doors are generally designed to be safe for any pet.  The panels are often designed with soft [[Polyvinyl chloride|vinyl]] that does not trap or injure the animal. Cheap, easily replaceable pet doors are made from plastic and may not always be robust enough for large, boisterous pets.\n\nPet doors are most often fitted in a plywood or plastic paneled door, into which it is straightforward to cut a large round hole, but can also be fitted in brickwork or (if a sealed unit is obtained with the hole already provided) in a double glazed door.  The latter is a relatively expensive option but may be the only alternative in some cases. Removable pet doors suitable for [[sliding glass door]]s are also available.\n\nInnovation has contributed to a new generation of more expensive pet doors making use of specific materials, automation, time control devices, and/or sophisticated sensors to deal with common problems like poor insulation and drafts, higher noise levels, insufficient pet safety and access difficulties.<ref>{{Cite web|url=http://www.trendhunter.com/trends/pet-door|title=Automated Pet Doors : pet door|access-date=2016-07-07}}</ref><ref>{{Cite web|url=http://www.ubergizmo.com/2014/03/petwalk-automatic-pet-door-prevents-wet-paw-marks-around-the-home/|title=PetWALK Automatic Pet Door Prevents Wet Paw Marks Around The Home|date=2014-03-13|website=Ubergizmo|language=en-US|access-date=2016-07-07}}</ref>\n\n==History==\nThe ''[[Oxford English Dictionary]]'' records the first use of the phrase \"cat flap\" in 1957 and \"cat door\" in 1959,<ref>''Oxford English Dictionary'' (full ed.), 2005.</ref> but the idea is much older.\n\n[[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}'' (farm cat hole) in [[Rincón de Ademuz]], Valencia, Spain]]\nIn rural areas, cat doors (often simple holes) in the walls, doors or even roofs of grain and flour storage spaces have long been used to welcome [[feral cat]]s to hunt rodent pests that feed on these stores. Human semi-domestication of [[wildcat]]s dates back to at least 7,500 BC in [[Cyprus]],<ref name=\"NatGeo 2004\">{{cite web\n |title=Oldest Known Pet Cat? 9500-year-old Burial Found on Cyprus\n |url= http://news.nationalgeographic.com/news/2004/04/0408_040408_oldestpetcat.html\n |accessdate=March 6, 2007\n |date=April 8, 2004\n |work=National Geographic News\n |publisher=National Geographic Society\n}}</ref> and the domestic cat was a part of everyday life in grain-dependent [[ancient Egypt]] (ca. 6,000 BC onward).  In modern times, this function is mostly lost, but in some rural areas, such as [[Valencia, Spain|Valencia]], Spain, and [[Vaunage]], France, farm cat doors and holes ({{lang-es|gateras}}, {{lang-fr|chatières}}) are still common.\n\nThe 14th-century [[English literature|English]] writer [[Geoffrey Chaucer]] described a simple cat hole in the \"Miller's Tale\" from his ''[[Canterbury Tales]]'' (late 14th century). In the narrative, a servant whose knocks go unanswered uses the cat door to peek in:<blockquote>{{lang|enm|An hole he foond, ful lowe upon a bord<br />Ther as the cat was wont in for to crepe,<br />And at the hole he looked in ful depe,<br />And at the last he hadde of hym a sighte.}}</blockquote>\n\nIn an apparent [[Early modern period|early modern]] example of [[urban legend]], the invention of the pet door was attributed to [[Isaac Newton]] (1642&ndash;1727) in a story (authored anonymously and published in a column of anecdotes in 1893) to the effect that Newton foolishly made a large hole for his adult cat and a small one for her kittens, not realizing the kittens could use the large hole as well.<ref>{{Cite web\n |title=Random Readings: Philosophy and Common Sense\n |author=Anonymous (\"The Country Parson\")<!--Not to be confused with Frank A. Clark who used that name in the 1960s!-->\n |editor=E. H. Sears & Rufus Ellis\n |work=The Monthly Religious Magazine\n |year=1863\n |volume=29-30\n |page=298\n |publisher=Leonard C. Bowles Press\n |location=Boston, MA\n |url= https://books.google.com/books?id=PXYUAAAAYAAJ&pg=PA298\n}}</ref> Two Newton biographers cite passages saying that Newton kept \"neither cat nor dog in his chamber\".<ref>Brodetsky, S. (2007) [first pub. 1927]. ''Sir Isaac Newton''. Upton Press. p. 100. {{ISBN|1406769991}}.</ref><ref>More, Louis Trenchard (1937). ''Isaac Newton: a Biography''. C. Scribner's Sons.</ref> Yet over 60 years earlier, a member of Newton's alma mater Trinity College, one J. M. F. Wright, reported this same story (from an unknown source) in his 1827 memoir, adding: \"Whether this account be true or false, indisputably true is it that there are in the door to this day two plugged holes of the proper dimensions for the respective egresses of cat and kitten.\"<ref>Wright, J. F. M. (1827). ''Alma Mater''. Volume 1. p. 17.</ref>\n\nModern cat flaps are popular in some countries, even in urban environments, particularly the [[United Kingdom]] where it is estimated that about 74% of cats have access to the outdoors.<ref>{{cite web|url=http://www.petplan.co.uk/petcensus/censusinfo.pdf |title=Petplan Pet Census 2011 |publisher=Petplan |page=15 |accessdate=September 11, 2012}}</ref>\n\nDog doors are common in suburban North America, where they mostly lead to fenced-in yards.  Pet doors are also common between suburban homes and their attached garages, so that pet-related mess (cat box, dog food, etc.) can be kept in the garage with pets having free access.\n\n==Electronic pet doors==\n[[File:Wall mounted catflap.jpg|thumb|200px|A [[Integrated circuit|microchip]]-enabled, selective-access cat and small dog door running through a wall]]\nSeveral types of pet doors that allow selective access are available. The advantages of this type of pet door over simpler models are improved weather resistance, and home security against strays and other unwanted animals. Some use a [[permanent magnet]] mounted on the pet's collar to activate a matching [[electromagnet]]ic mechanism that unlatches the door panel when the magnet comes within range; several pets can be fitted with collars that match the same door. Pet doors with [[Consumer IR|infrared]] locks open only when a collar-mounted device transmits the correct code to the latch's receiver, allowing owners to have multiple flaps that different pets can use, e.g. a small cat flap to the back yard and a large dog door accessing a [[dog run]].  Either type can be used to selectively allow one pet outside access, while denying it to another (e.g., an ill animal that needs to stay indoors).\n\nSome of the newest models use [[radio-frequency identification]] to electronically read a pet's [[Microchip implant (animal)|microchip implant]]. This removes the need for a cat to wear a collar, which could become lost. Other high-end doors use a key with RFID. The key is attached to the pet's collar, and the electric door only opens for the assigned keys.\n\n==Dog stiles==\n[[File:Dog door demonstration - geograph.org.uk - 718920.jpg|thumb|left|A man lets a dog through the lift-up hatch at a stile in [[Medway]], [[England]].|247x247px]]\nIn [[England]], [[Ireland]], and other areas with large numbers of livestock fences and walls in areas through which people walk on footpaths, [[stile]]s often have wooden, lift-up dog hatchways next to them, because dogs are not good at climbing stile steps and are often too heavy to lift over a fence.\n\n==Pet gates==\nA related idea to the pet door is the pet gate, an easily human-operated portal that keeps pets in (or out) and thwarts their attempts to open it by using a thumb-operated switch or a smooth door handle, and which is tall enough that it cannot be jumped over by the type of pet for which it was designed. Styles vary, but they are typically made of wooden or metal bars or a wire lattice, and have adjustable widths so that they can be used to span arbitrary entrances, hallways or windows. Common uses are to keep pets inside while ventilating a room by opening an unscreened door, or keeping pets out of a baby's room or a dining area.{{clear|left}}\n\n==Pet barriers==\nPet barriers are typically made of fabric and are especially used to secure staircases.<ref>{{cite web|last1=Woods|first1=Amanda|title=7 Important Measures to Pet Proof Your Home|url=https://medium.com/@woodsamanda399/7-important-measures-to-pet-proof-your-home-bdd3e33ae4c8|accessdate=23 August 2017}}</ref> They are available in banister-to-banister and wall-to-banister options and are customizable and portable.\n\n== References ==\n{{reflist}}\n\n{{Commons category|Pet doors}}\n\n[[Category:Door furniture]]\n[[Category:Pet equipment]]";
// //
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
  return /^\s*(.*)\s*$/g.exec(string)[1];
}; // let debug = false;


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
      var _ref = [pair.slice(0, equalIndex), trimAll(pair.slice(equalIndex + 1))],
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
};

var ReferenceParser = function ReferenceParser(plain) {
  var children = /*#__PURE__*/_wrapRegExp(/^<ref[\0-=\?-\uFFFF]*>([\0-\uFFFF]*)<\/ref>$/gi, {
    children: 1
  }).exec(plain)[1];

  return [null, main(children).children];
};

var internalParse = function internalParse(element, content, plain) {
  if (element.elementName == "Reference") {
    return ReferenceParser(plain);
  } else if (element.elementName == "Template") {
    if (/^{{[Cc]ite/g.test(plain)) {
      return CiteParser(plain);
    } // console.log("@@");


    return [null, _toConsumableArray(content)];
  } else if (element.elementName == "Link") {
    var match;
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

    if (match = R_ARTICLE.exec(plain)) {
      // console.log("Will parse ", plain);
      var fullUrl = match[1],
          nonePipe = !match[2],
          trailingPipe = match[2] && !match[3],
          displayText = match[3],
          suffixStr = match[4] || ""; // Manipulate the url

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

      var urlMatch = /^((\w+):)?(([\w\-,. ]+)( \((.+)\))|([\w\-. ]+)( \((.+)\)|, (.+))?)$/.exec(fullUrl);
      if (urlMatch === null) return content;
      namespace = capitalize(urlMatch[1] || "");
      rootUrl = urlMatch[4] || urlMatch[7];
      disambiguation = urlMatch[5] || urlMatch[8] || "";

      if ("File:" != namespace) {
        url = namespace + capitalizeFirst(rootUrl) + disambiguation;
        url = url.replace(/ /g, "_"); // convert to valid URL

        displayText = nonePipe ? fullUrl : trailingPipe ? rootUrl : displayText;
        displayText += suffixStr;
        return [{
          type: "wikiLink",
          url: url,
          displayText: displayText
        }, null];
      }
    } // For handling format like:
    // [[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}''
    // in [[Rincón de Ademuz]]


    var chunks = plain.slice(2, -2).split("|");
    var first = chunks[0];
    var R_MEDIA = /^(File|Image|Media):(.*)$/i;

    if (match = R_MEDIA.exec(first)) {
      var type = "media",
          supType = capitalizeFirst(match[1]),
          _rootUrl = capitalizeFirst(match[2]),
          _url = "".concat(supType, ":").concat(_rootUrl);

      var meta = {
        type: type,
        supType: supType,
        url: _url
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

          var _match = void 0;

          if (_match = R_ATTRIBUTE.exec(chunk)) {
            options.push({
              key: _match[1],
              value: _match[2]
            });
          } else options.push(chunk);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

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
  endToken: "'''''",
  allowElements: []
},
    Bold = {
  elementName: "Bold",
  startToken: "'''",
  endToken: "'''",
  allowElements: []
},
    Italic = {
  elementName: "Italic",
  startToken: "''",
  endToken: "''",
  allowElements: []
},
    Obj = {
  elementName: "Link",
  startToken: "[[",
  endToken: "]]",
  allowElements: [Bold, Italic]
},
    Heading = {
  elementName: "Heading",
  startToken: "==",
  endToken: "==",
  allowElements: []
},
    Reference = {
  elementName: "Reference",
  startToken: "<ref",
  endToken: "</ref>",
  allowElements: []
},
    Template = {
  elementName: "Template",
  startToken: "{{",
  endToken: "}}",
  allowElements: []
},
    BlockQuote = {
  elementName: "Block Quote",
  startToken: "<blockquote>",
  endToken: "</blockquote>",
  allowElements: [Italic, Bold, BoldItalic]
},
    Global = {
  elementName: "Global",
  startToken: null,
  endToken: null,
  allowElements: [Bold, Italic, Obj, Heading, Reference, BlockQuote, Template]
};
Obj.allowElements.push(Obj);
Italic.allowElements.push(Obj);
Reference.allowElements.push(Template);

var parse = function parse(s, l, i, e) {
  // console.log(`Begin parse from |${s.substr(i, 10)}| with ${e.name}`);
  var buffer = "",
      plain = "",
      cur,
      res = [],
      options = {},
      referenceIndex = 0;
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

        res.push(cur);
        break;
      }
    }

    if (!has) {
      if (endToken && taste(s, endToken, i)) {
        i += endToken.length;
        plain += endToken; // perform get suffix string when parsing Link

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

        break;
      }

      plain += s[i];
      buffer += s[i++];
    }
  }

  if (buffer) res.push({
    elementName: "Text",
    text: buffer
  }); // let meta, children;

  var _internalParse = internalParse(e, res, plain, options),
      _internalParse2 = _slicedToArray(_internalParse, 2),
      meta = _internalParse2[0],
      children = _internalParse2[1];

  if (!meta) meta = {};
  return [i, children === null ? _objectSpread({
    elementName: elementName
  }, meta) : _objectSpread({
    elementName: elementName,
    children: children
  }, meta), plain];
};

var main = function main(s) {
  return parse(s, null, 0, Global)[1];
}; // const main = s => parse(s, null, 0, Global)[1];
// console.log(
//   JSON.stringify(
//     main(
//       "[[File:Doggy door exit.JPG|thumb|A dog exiting through a pet door]]\nA '''pet door''' or '''pet flap''' (also referred to in more specific terms, such as '''cat flap''', '''cat door''', '''dog door''', or '''doggy door''') is a small opening to allow [[pet]]s to enter and exit a building on their own without needing a human to open the door.  Originally simple holes, the modern form is a hinged and often spring-loaded panel or flexible flap, and some are electronically controlled.  They offer a degree of protection against wind, rain, and larger-bodied intruders entering the dwelling. Similar hatches can let dogs through fences at stiles. A related concept is the '''pet gate''', which is easy for humans to open but acts as a secure pet barrier, as well as the '''automated left- or right-handed pet doors'''.<ref>{{Cite web|url=http://www.gizmag.com/passive-house-petwalk-door/31162/|title=World's first Passive House-certified pet door unveiled at Ecobuild 2014|website=www.gizmag.com|access-date=2016-07-07}}</ref>\n\n==Purpose==\nA pet door is found to be convenient by many owners of companion animals, especially dogs and cats, because it lets the pets come and go as they please, reducing the need for pet-owners to let or take the pet outside manually, and curtailing unwanted behaviour such as loud vocalisation to be let outside, scratching on doors or walls, and (especially in the case of dogs) [[Excretion|excreting]] in the house. They also help to ensure that a pet left outdoors can safely get back into the house in the case of inclement weather.\n\n==Features==\n[[File:Cat flap.jpg|thumb|A cat flap in action]]\nThe simplest type are bottom-weighted flaps hung from the top of the opening, which swing shut on their own, but may be spring-aided to increase wind resistance. These flaps often feature magnets around the edges to help keep the door closed against weather and wind. Some pet doors have side-mounted hinges and swing open like saloon doors. These pet doors usually have a spring or other contrivance to force their closure after the pet has gone through. Instead of a rubber flap, saloon style doors are often made from plastic, acrylic, or plexiglass, and the panels are fitted with weather seal to help keep weather outside.\n\nAnother common feature is an adjustable catch to restrict the opening of the device to either one direction or the other; for example, to allow the pet to come in for the night, but not go out again until the owner releases the catch the next morning. Some pets, mostly cats with their retractile claws and flexible paws, learn to circumvent one-way pet doors, especially the \"flap-within-flap\" design.\n\nMost also have a locking mechanism of some kind, and can be closed off by sliding a rigid plate into parallel rails on the left and right of the interior side of the pet door, useful during bad weather or when the owners are traveling with their pets.\n\nPet doors are generally designed to be safe for any pet.  The panels are often designed with soft [[Polyvinyl chloride|vinyl]] that does not trap or injure the animal. Cheap, easily replaceable pet doors are made from plastic and may not always be robust enough for large, boisterous pets.\n\nPet doors are most often fitted in a plywood or plastic paneled door, into which it is straightforward to cut a large round hole, but can also be fitted in brickwork or (if a sealed unit is obtained with the hole already provided) in a double glazed door.  The latter is a relatively expensive option but may be the only alternative in some cases. Removable pet doors suitable for [[sliding glass door]]s are also available.\n\nInnovation has contributed to a new generation of more expensive pet doors making use of specific materials, automation, time control devices, and/or sophisticated sensors to deal with common problems like poor insulation and drafts, higher noise levels, insufficient pet safety and access difficulties.<ref>{{Cite web|url=http://www.trendhunter.com/trends/pet-door|title=Automated Pet Doors : pet door|access-date=2016-07-07}}</ref><ref>{{Cite web|url=http://www.ubergizmo.com/2014/03/petwalk-automatic-pet-door-prevents-wet-paw-marks-around-the-home/|title=PetWALK Automatic Pet Door Prevents Wet Paw Marks Around The Home|date=2014-03-13|website=Ubergizmo|language=en-US|access-date=2016-07-07}}</ref>\n\n==History==\nThe ''[[Oxford English Dictionary]]'' records the first use of the phrase \"cat flap\" in 1957 and \"cat door\" in 1959,<ref>''Oxford English Dictionary'' (full ed.), 2005.</ref> but the idea is much older.\n\n[[File:Gatera de ademuz.jpg|thumb|left|A ''{{lang|es|gatera}}'' (farm cat hole) in [[Rincón de Ademuz]], Valencia, Spain]]\nIn rural areas, cat doors (often simple holes) in the walls, doors or even roofs of grain and flour storage spaces have long been used to welcome [[feral cat]]s to hunt rodent pests that feed on these stores. Human semi-domestication of [[wildcat]]s dates back to at least 7,500 BC in [[Cyprus]],<ref name=\"NatGeo 2004\">{{cite web\n |title=Oldest Known Pet Cat? 9500-year-old Burial Found on Cyprus\n |url= http://news.nationalgeographic.com/news/2004/04/0408_040408_oldestpetcat.html\n |accessdate=March 6, 2007\n |date=April 8, 2004\n |work=National Geographic News\n |publisher=National Geographic Society\n}}</ref> and the domestic cat was a part of everyday life in grain-dependent [[ancient Egypt]] (ca. 6,000 BC onward).  In modern times, this function is mostly lost, but in some rural areas, such as [[Valencia, Spain|Valencia]], Spain, and [[Vaunage]], France, farm cat doors and holes ({{lang-es|gateras}}, {{lang-fr|chatières}}) are still common.\n\nThe 14th-century [[English literature|English]] writer [[Geoffrey Chaucer]] described a simple cat hole in the \"Miller's Tale\" from his ''[[Canterbury Tales]]'' (late 14th century). In the narrative, a servant whose knocks go unanswered uses the cat door to peek in:<blockquote>{{lang|enm|An hole he foond, ful lowe upon a bord<br />Ther as the cat was wont in for to crepe,<br />And at the hole he looked in ful depe,<br />And at the last he hadde of hym a sighte.}}</blockquote>\n\nIn an apparent [[Early modern period|early modern]] example of [[urban legend]], the invention of the pet door was attributed to [[Isaac Newton]] (1642&ndash;1727) in a story (authored anonymously and published in a column of anecdotes in 1893) to the effect that Newton foolishly made a large hole for his adult cat and a small one for her kittens, not realizing the kittens could use the large hole as well.<ref>{{Cite web\n |title=Random Readings: Philosophy and Common Sense\n |author=Anonymous (\"The Country Parson\")<!--Not to be confused with Frank A. Clark who used that name in the 1960s!-->\n |editor=E. H. Sears & Rufus Ellis\n |work=The Monthly Religious Magazine\n |year=1863\n |volume=29-30\n |page=298\n |publisher=Leonard C. Bowles Press\n |location=Boston, MA\n |url= https://books.google.com/books?id=PXYUAAAAYAAJ&pg=PA298\n}}</ref> Two Newton biographers cite passages saying that Newton kept \"neither cat nor dog in his chamber\".<ref>Brodetsky, S. (2007) [first pub. 1927]. ''Sir Isaac Newton''. Upton Press. p. 100. {{ISBN|1406769991}}.</ref><ref>More, Louis Trenchard (1937). ''Isaac Newton: a Biography''. C. Scribner's Sons.</ref> Yet over 60 years earlier, a member of Newton's alma mater Trinity College, one J. M. F. Wright, reported this same story (from an unknown source) in his 1827 memoir, adding: \"Whether this account be true or false, indisputably true is it that there are in the door to this day two plugged holes of the proper dimensions for the respective egresses of cat and kitten.\"<ref>Wright, J. F. M. (1827). ''Alma Mater''. Volume 1. p. 17.</ref>\n\nModern cat flaps are popular in some countries, even in urban environments, particularly the [[United Kingdom]] where it is estimated that about 74% of cats have access to the outdoors.<ref>{{cite web|url=http://www.petplan.co.uk/petcensus/censusinfo.pdf |title=Petplan Pet Census 2011 |publisher=Petplan |page=15 |accessdate=September 11, 2012}}</ref>\n\nDog doors are common in suburban North America, where they mostly lead to fenced-in yards.  Pet doors are also common between suburban homes and their attached garages, so that pet-related mess (cat box, dog food, etc.) can be kept in the garage with pets having free access.\n\n==Electronic pet doors==\n[[File:Wall mounted catflap.jpg|thumb|200px|A [[Integrated circuit|microchip]]-enabled, selective-access cat and small dog door running through a wall]]\nSeveral types of pet doors that allow selective access are available. The advantages of this type of pet door over simpler models are improved weather resistance, and home security against strays and other unwanted animals. Some use a [[permanent magnet]] mounted on the pet's collar to activate a matching [[electromagnet]]ic mechanism that unlatches the door panel when the magnet comes within range; several pets can be fitted with collars that match the same door. Pet doors with [[Consumer IR|infrared]] locks open only when a collar-mounted device transmits the correct code to the latch's receiver, allowing owners to have multiple flaps that different pets can use, e.g. a small cat flap to the back yard and a large dog door accessing a [[dog run]].  Either type can be used to selectively allow one pet outside access, while denying it to another (e.g., an ill animal that needs to stay indoors).\n\nSome of the newest models use [[radio-frequency identification]] to electronically read a pet's [[Microchip implant (animal)|microchip implant]]. This removes the need for a cat to wear a collar, which could become lost. Other high-end doors use a key with RFID. The key is attached to the pet's collar, and the electric door only opens for the assigned keys.\n\n==Dog stiles==\n[[File:Dog door demonstration - geograph.org.uk - 718920.jpg|thumb|left|A man lets a dog through the lift-up hatch at a stile in [[Medway]], [[England]].|247x247px]]\nIn [[England]], [[Ireland]], and other areas with large numbers of livestock fences and walls in areas through which people walk on footpaths, [[stile]]s often have wooden, lift-up dog hatchways next to them, because dogs are not good at climbing stile steps and are often too heavy to lift over a fence.\n\n==Pet gates==\nA related idea to the pet door is the pet gate, an easily human-operated portal that keeps pets in (or out) and thwarts their attempts to open it by using a thumb-operated switch or a smooth door handle, and which is tall enough that it cannot be jumped over by the type of pet for which it was designed. Styles vary, but they are typically made of wooden or metal bars or a wire lattice, and have adjustable widths so that they can be used to span arbitrary entrances, hallways or windows. Common uses are to keep pets inside while ventilating a room by opening an unscreened door, or keeping pets out of a baby's room or a dining area.{{clear|left}}\n\n==Pet barriers==\nPet barriers are typically made of fabric and are especially used to secure staircases.<ref>{{cite web|last1=Woods|first1=Amanda|title=7 Important Measures to Pet Proof Your Home|url=https://medium.com/@woodsamanda399/7-important-measures-to-pet-proof-your-home-bdd3e33ae4c8|accessdate=23 August 2017}}</ref> They are available in banister-to-banister and wall-to-banister options and are customizable and portable.\n\n== References ==\n{{reflist}}\n\n{{Commons category|Pet doors}}\n\n[[Category:Door furniture]]\n[[Category:Pet equipment]]",
//       null,
//       0
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
  reactHotLoader.register(CiteParser, "CiteParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(ReferenceParser, "ReferenceParser", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(internalParse, "internalParse", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(BoldItalic, "BoldItalic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Bold, "Bold", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Italic, "Italic", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Obj, "Obj", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Heading, "Heading", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Reference, "Reference", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Template, "Template", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(BlockQuote, "BlockQuote", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(Global, "Global", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(parse, "parse", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
  reactHotLoader.register(main, "main", "/Users/hoangnam/Dev/Templates/ReactJS/src/wiki_parser/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)(module)))

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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)(module)))

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wiki_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
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


 // const Data = React.createContext({});
// const Image = ({ url, options, caption }) => {
//   useEffect(() => {
//     var url =
//       "http://en.wikipedia.org/w/api.php?action=query&titles=Pet_door&prop=pageimages&format=json&origin=*";
//     fetch(url)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(_text => {})
//       .catch(function(error) {
//         console.log(error);
//       });
//   }, []);
// };
//
//

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
  // if (typeof props.children === "string") {
  //   return <span>{props.children}</span>;
  // }
  console.log(props);

  if (Array.isArray(props.children)) {
    // console.log("array");
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
  }, attribute.title)); //{

  /*return <span>{JSON.stringify(props)}</span>;*/
  //}
};

var Element = function Element(_ref3) {
  var props = _ref3.props,
      images = _ref3.images;
  var elementName = props.elementName,
      children = props.children;

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

  if (elementName == "Block Quote") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("blockquote", null, renderChildren);
  }

  if (elementName == "Heading") {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, renderChildren);
  }

  if (elementName == "Link") {
    var type = props.type;

    if (type == "wikiLink") {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://en.wikipedia.org/wiki/" + props.url
      }, props.displayText);
    }

    if (type == "media") {
      if (images[props.url]) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          style: {
            "float": "left",
            height: "80px"
          },
          src: images[props.url].url
        });
      }
    }
  } else if (elementName == "Reference") {
    // console.log(props);
    if (props.children && props.children.length && props.children[0].attribute && props.children[0].attribute.url) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: props.children[0].attribute.url
      }, props.referenceIndex));
    }

    return (//<span>
      //        {content.innerHTML.map((e, i) => (
      // {/*<Element key={i} props={e} />*/}
      // ))}
      // </span>
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: props
      }, props.referenceIndex))
    );
  }

  return JSON.stringify(props);
};

var Article = function Article() {
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      content = _useState4[0],
      setContent = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState6 = _slicedToArray(_useState5, 2),
      images = _useState6[0],
      setImages = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState8 = _slicedToArray(_useState7, 2),
      references = _useState8[0],
      setReferences = _useState8[1]; // get main content


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var url = "https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&format=json&prop=wikitext&origin=*";
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (_text) {
      setContent(Object(_wiki_parser__WEBPACK_IMPORTED_MODULE_1__[/* main */ "a"])(_text.parse.wikitext["*"]).children);
      console.log(Object(_wiki_parser__WEBPACK_IMPORTED_MODULE_1__[/* main */ "a"])(_text.parse.wikitext["*"]));
    })["catch"](function (error) {
      console.log(error);
    });
  }, []); // get references

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var res = [];

    var _iterator = _createForOfIteratorHelper(content),
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
  }, [content]); // get images

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var url = "https://en.wikipedia.org/w/api.php?action=query&titles=Pet_door&generator=images&gimlimit=10&prop=imageinfo&iiprop=url|dimensions|mime&format=json&origin=*";
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
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, function () {
    var res = [];

    for (var index = 0; index < content.length; index++) {
      var element = content[index];
      res.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
        key: index,
        props: element,
        images: images
      })); // console.log(element);

      if (element.elementName == "Heading" && element.children[0].text == " References ") {
        break;
      }
    }

    return res;
  }(), references.map(function (reference, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "wiki-ref",
      key: index
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, reference.referenceIndex + ". "), function () {
      return reference.children.map(function (child, childrenIndex) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Element, {
          key: childrenIndex,
          props: child
        });
      });
    }());
  }));
};

__signature__(Article, "useState{[content, setContent]([])}\nuseState{[images, setImages]({})}\nuseState{[references, setReferences]([])}\nuseEffect{}\nuseEffect{}\nuseEffect{}");

var _default = Article;
/* harmony default export */ __webpack_exports__["a"] = (_default); // {content.map((element, index) => {
//         if (element.elementName == "Reference" && element.children[0] == " References ")
//         return <Element key={index} props={element} images={images} />;
//       })}

;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Text, "Text", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(Template, "Template", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(Element, "Element", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(Article, "Article", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
  reactHotLoader.register(_default, "default", "/Users/hoangnam/Dev/Templates/ReactJS/src/components/WikiApp/Article/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)(module)))

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);
/* harmony import */ var _components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_WikiApp_style_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_WikiApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_WikiApp__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null), document.getElementById("wikiapp"));

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=wiki.bundle.js.map