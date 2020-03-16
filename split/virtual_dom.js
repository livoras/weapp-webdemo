var __virtualDOM__ =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _virtual_node = __webpack_require__(1);
	
	var _virtual_node2 = _interopRequireDefault(_virtual_node);
	
	var _virtual_text = __webpack_require__(11);
	
	var _virtual_text2 = _interopRequireDefault(_virtual_text);
	
	var _data_manager = __webpack_require__(12);
	
	var _data_manager2 = _interopRequireDefault(_data_manager);
	
	var _utils = __webpack_require__(2);
	
	var _calc = __webpack_require__(14);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	var _comp_api = __webpack_require__(19);
	
	var _bridge = __webpack_require__(18);
	
	var _intersection = __webpack_require__(34);
	
	var _ban = __webpack_require__(23);
	
	var _save_restore_view = __webpack_require__(24);
	
	var _save_restore_view2 = _interopRequireDefault(_save_restore_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	if (/wechatdevtools/.test(navigator.userAgent)) (0, _bridge.setInDevtoolsWebView)();
	if ((0, _bridge.inDevtoolsWebview)()) exparser.globalOptions.writeExtraInfoToAttr = true;
	(0, _comp_api.initViewThread)();
	(0, _ban.initBannedListener)();
	
	/* eslint-disable no-use-before-define */
	
	// 将编译结果转换为VD格式的虚拟树
	var _createVirtualTree = function _createVirtualTree(obj) {
	  if ((0, _utils.isString)(obj) || Number(obj) === obj && Number(obj) % 1 === 0) {
	    return new _virtual_text2.default(String(obj));
	  }
	
	  var children = [];
	  obj.children.forEach(function (child) {
	    children.push(_createVirtualTree(child));
	  });
	  return new _virtual_node2.default(obj.tag, obj.attr, obj.n, obj.wxKey, obj.wxVkey, obj.wxXCkey, obj.extraAttr, children);
	};
	
	/**
	 * usage:
	 * init:
	 * let virtualTree = VirtualDom.createVirtualTree(generateFunc, data)
	 * let DOMTree = virtualDOM.render(virtualTree)
	 *
	 * reRender:
	 * let newVirtualTree = VirtualDom.createVirtualTree(generateFunc, data)
	 * const patches = VirtualDom.diff(virtualTree, newVirtualTree)
	 * VirtualDom.apply(patches, DOMTree)
	 * virtualTree = newVirtualTree
	 */
	
	var VirtualDOM = function () {
	  function VirtualDOM() {
	    _classCallCheck(this, VirtualDOM);
	  }
	
	  _createClass(VirtualDOM, null, [{
	    key: 'createVirtualTree',
	    value: function createVirtualTree(generateFunc, data) {
	      var vtObj = generateFunc(_data_manager2.default.getAppData(), data);
	      vtObj.tag = 'body';
	      return _createVirtualTree(vtObj);
	    }
	  }, {
	    key: 'render',
	    value: function render(virtualTree) {
	      return virtualTree.render();
	    }
	  }, {
	    key: 'diff',
	    value: function diff(virtualTree, newVirtualTree) {
	      return virtualTree.diff(newVirtualTree);
	    }
	  }, {
	    key: 'apply',
	    value: function apply(patches, DOMTree) {
	      return patches.apply(DOMTree);
	    }
	  }, {
	    key: 'getMergeDataFunc',
	    value: function getMergeDataFunc() {
	      return _data_manager2.default.mergeData;
	    }
	  }, {
	    key: 'startInitRender',
	    value: function startInitRender(customComponentMode) {
	      wx._checkDeviceWidth();
	      this.customComponentMode = customComponentMode;
	      if (customComponentMode) {
	        (0, _comp_api.runComponentDef)();
	        _tree_manager2.default.instance.operationFlow.unblock();
	      }
	    }
	  }]);
	
	  return VirtualDOM;
	}();
	
	VirtualDOM.customComponentMode = false;
	VirtualDOM.CustomComponent = _comp_api.CustomComponent;
	VirtualDOM.getNodeById = _comp_api.getNodeById;
	VirtualDOM.getNodeId = _comp_api.getNodeId;
	VirtualDOM.getRootNodeId = _comp_api.getRootNodeId;
	VirtualDOM.scheduleIntersectionUpdate = _intersection.scheduleIntersectionUpdate;
	VirtualDOM.addIntersectionObserver = _intersection.addIntersectionObserver;
	VirtualDOM.removeIntersectionObserver = _intersection.removeIntersectionObserver;
	VirtualDOM.callSavedLifeTimes = _save_restore_view2.default.callSavedLifeTimes;
	VirtualDOM.callRestoredLifeTimes = _save_restore_view2.default.callRestoredLifeTimes;
	VirtualDOM.getComponentCount = _calc.getComponentCount;
	
	module.exports = VirtualDOM;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _prop_utils = __webpack_require__(3);
	
	var _diff_utils = __webpack_require__(6);
	
	var _virtual_text = __webpack_require__(11);
	
	var _virtual_text2 = _interopRequireDefault(_virtual_text);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualNode = function () {
	  /**
	  * @synopsis Construcor of VirtualNode
	  *
	  * @param {string} tagName - Tag name of the node
	  * @param {!Object} props - Properties of the node
	  * @param {!Array<VirtualNode|string>} children - Children of the node
	  */
	  function VirtualNode(tagName, props, newProps, wxKey, wxVkey, wxXCkey, extraAttr, children) {
	    _classCallCheck(this, VirtualNode);
	
	    this.tagName = tagName || 'div';
	    this.props = props || {};
	    this.children = children || [];
	    this.newProps = newProps || [];
	    this.extraAttr = extraAttr;
	
	    // only for <wx-virtual/> node
	    this.wxVkey = wxVkey;
	    this.wxXCkey = wxXCkey;
	
	    /**
	     * Key to identify node when diffing.
	     * {string}
	     */
	    if ((0, _utils.isUndefined)(wxKey) || (0, _utils.isNull)(wxKey)) {
	      this.wxKey = undefined;
	    } else {
	      this.wxKey = String(wxKey);
	    }
	
	    /**
	     * Count of descendants.
	     * {number}
	     */
	    this.descendants = 0;
	    for (var i = 0; i < this.children.length; ++i) {
	      var child = this.children[i];
	      if ((0, _utils.isVirtualNode)(child)) {
	        this.descendants += child.descendants;
	      } else if ((0, _utils.isString)(child)) {
	        this.children[i] = new _virtual_text2.default(child);
	      } else if (!(0, _utils.isVirtualText)(child)) {
	        console.log('invalid child', tagName, props, children, child);
	      }
	      ++this.descendants;
	    }
	  }
	
	  _createClass(VirtualNode, [{
	    key: 'render',
	    value: function render() {
	      var domNode = null;
	      if (this.tagName !== 'virtual') {
	        domNode = exparser.createElement(this.tagName);
	      } else {
	        var virtualTagName = 'virtual';
	        if (this.wxXCkey === 1 || this.wxXCkey === 3) virtualTagName = 'wx:if';else if (this.wxXCkey === 2 || this.wxXCkey === 4) virtualTagName = 'wx:for';
	        domNode = exparser.VirtualNode.create(virtualTagName);
	        domNode.__wxVkey__ = this.wxVkey;
	      }
	      if (this.extraAttr) {
	        for (var k in this.extraAttr) {
	          domNode.setAttribute(k, this.extraAttr[k]);
	        }
	      }
	      (0, _prop_utils.applyProperties)(domNode, this.props);
	
	      this.children.forEach(function (child) {
	        var childNode = child.render();
	        domNode.appendChild(childNode);
	      });
	      return domNode;
	    }
	
	    /**
	    * @synopsis Diffing with new tree to get patches
	    *
	    * @param newTree {VirtualNode}
	    * @return {VirtualPatches}
	    */
	
	  }, {
	    key: 'diff',
	    value: function diff(newTree) {
	      return (0, _diff_utils.diff)(this, newTree);
	    }
	  }]);
	
	  return VirtualNode;
	}();
	
	VirtualNode.prototype.type = 'WxVirtualNode';
	
	exports.default = VirtualNode;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var isObject = exports.isObject = function isObject(x) {
	  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	};
	
	var isEmptyObject = exports.isEmptyObject = function isEmptyObject(x) {
	  for (var p in x) {
	    return false;
	  }
	  return true;
	};
	
	var isVirtualNode = exports.isVirtualNode = function isVirtualNode(x) {
	  return x && x.type === 'WxVirtualNode';
	};
	
	var isVirtualText = exports.isVirtualText = function isVirtualText(x) {
	  return x && x.type === 'WxVirtualText';
	};
	
	var isUndefined = exports.isUndefined = function isUndefined(x) {
	  return Object.prototype.toString.call(x) === '[object Undefined]';
	};
	
	var isNull = exports.isNull = function isNull(x) {
	  return Object.prototype.toString.call(x) === '[object Null]';
	};
	
	var isString = exports.isString = function isString(x) {
	  return Object.prototype.toString.call(x) === "[object String]";
	};
	
	var isArray = exports.isArray = function isArray(x) {
	  if (Array.isArray) {
	    return Array.isArray(x);
	  } else {
	    return Object.prototype.toString.call(x) === "[object Array]";
	  }
	};
	
	var getPrototype = exports.getPrototype = function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value);
	  } else if (value.__proto__) {
	    return value.__proto__;
	  } else if (value.constructor) {
	    return value.constructor.prototype;
	  } else {
	    return undefined;
	  }
	};
	
	var getDataType = exports.getDataType = function getDataType(data) {
	  return Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
	};
	
	var getPageConfig = exports.getPageConfig = function getPageConfig() {
	  var config = {};
	  if (window.__wxConfig && window.__wxConfig.window) {
	    config = window.__wxConfig.window;
	  } else {
	    var globalWindowConfig = {};
	    if (window.__wxConfig && window.__wxConfig.global && window.__wxConfig.global.window) {
	      globalWindowConfig = window.__wxConfig.global.window;
	    }
	
	    var pageWindowConfig = {};
	    if (window.__wxConfig && window.__wxConfig.page && window.__wxConfig.page[window.__route__] && window.__wxConfig.page[window.__route__].window) {
	      pageWindowConfig = window.__wxConfig.page[window.__route__].window;
	    }
	    config = _extends({}, globalWindowConfig, pageWindowConfig);
	  }
	  return config;
	};
	
	var getWxmlVersionTag = exports.getWxmlVersionTag = function getWxmlVersionTag(fieldName) {
	  var wxmlVersionInfo = (typeof window === 'undefined' ? global : window).__wcc_version_info__;
	  if (!wxmlVersionInfo) return undefined;
	  return wxmlVersionInfo[fieldName];
	};
	
	var guid = exports.guid = function guid() {
	  return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1);
	};
	
	var dfsComponents = exports.dfsComponents = function dfsComponents(node, shadowRootOrder, cb) {
	  if (node instanceof exparser.Component) {
	    if (shadowRootOrder > 0) cb(node);
	    if (shadowRootOrder && node.shadowRoot instanceof exparser.Element) {
	      dfsComponents(node.shadowRoot, shadowRootOrder, cb);
	    }
	    if (shadowRootOrder < 0) cb(node);
	  }
	  var children = node.childNodes;
	  for (var i = 0; i < children.length; i++) {
	    if (children[i] instanceof exparser.Element) dfsComponents(children[i], shadowRootOrder, cb);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeProperty = exports.applyProperties = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _case_map = __webpack_require__(4);
	
	var _constants = __webpack_require__(5);
	
	var dataRE = /^data-/;
	var transformRpx = wx.transformRpx;
	
	var convertEventTarget = function convertEventTarget(target) {
	  return {
	    id: target.id,
	    offsetLeft: target.$$.offsetLeft,
	    offsetTop: target.$$.offsetTop,
	    dataset: target.dataset
	  };
	};
	
	var convertTouches = function convertTouches(touches) {
	  if (touches) {
	    var r = [];
	    for (var i = 0; i < touches.length; i++) {
	      var touch = touches[i];
	      r.push({
	        identifier: touch.identifier,
	        pageX: touch.pageX,
	        pageY: touch.pageY,
	        clientX: touch.clientX,
	        clientY: touch.clientY,
	        force: touch.force || 0
	      });
	    }
	    return r;
	  }
	};
	
	var bindEvent = function bindEvent(node, bindName, value, noBubble, capture) {
	  var evNameField = capture ? '__wxEventCaptureHandleName' : '__wxEventHandleName';
	  if (!node[evNameField]) {
	    node[evNameField] = Object.create(null);
	  }
	  if (node[evNameField][bindName] === undefined) {
	    node.addListener(bindName, function (e) {
	      if (!node[evNameField][bindName]) {
	        return;
	      }
	      e._hasListeners = true;
	      window.wx.publishPageEvent(node[evNameField][bindName], {
	        type: e.type,
	        timeStamp: e.timeStamp,
	        target: convertEventTarget(e.target),
	        currentTarget: convertEventTarget(this),
	        detail: e.detail,
	        touches: convertTouches(e.touches),
	        changedTouches: convertTouches(e.changedTouches),
	        _requireActive: e._requireActive
	      });
	      if (noBubble) {
	        return false;
	      }
	    }, { capture: capture });
	  }
	  node[evNameField][bindName] = value;
	};
	
	/**
	* @synopsis Apply props to given element node.
	*
	* @param node {!Element} - Element node.
	* @param props {!Object} - Props need to apply to node.
	*/
	var applyProperties = exports.applyProperties = function applyProperties(node, props) {
	  node.dataset = node.dataset || {};
	  for (var propName in props) {
	    var propValue = props[propName];
	    var matches = null;
	
	    var hasProperty = exparser.Component.hasProperty(node, propName);
	
	    if (dataRE.test(propName)) {
	      var setName = (0, _case_map.dashToCamelCase)(propName.substring(5).toLowerCase());
	      node.dataset[setName] = propValue;
	      node.$$.setAttribute(propName, propValue);
	    } else if (propName === 'id') {
	      node.$$.id = propValue == undefined ? '' : propValue; // TODO remove this compatibility
	      node.id = propValue == undefined ? '' : propValue;
	    } else if (propName === 'class') {
	      node.class = propValue == undefined ? '' : propValue;
	    } else if (propValue === undefined) {
	      removeProperty(node, propName);
	    } else if (propName === 'style') {
	      (function () {
	        var _ref = node.animationStyle || {},
	            transition = _ref.transition,
	            transform = _ref.transform,
	            transitionProperty = _ref.transitionProperty,
	            transformOrigin = _ref.transformOrigin;
	
	        // styleObj 把原有的 transition, transform, transitionProperty, transformOrigin 合并进来，因为这几个样式是由 animation 属性写入的
	
	
	        var styleObj = {
	          transition: transition,
	          transform: transform,
	          transitionProperty: transitionProperty,
	          transformOrigin: transformOrigin
	        };
	        styleObj['-webkit-transition'] = styleObj.transition;
	        styleObj['-webkit-transform'] = styleObj.transform;
	        styleObj['-webkit-transition-property'] = styleObj.transitionProperty;
	        styleObj['-webkit-transform-origin'] = styleObj.transformOrigin;
	
	        node.setNodeStyle(transformRpx(propValue, true) + Object.keys(styleObj).filter(function (key) {
	          // 把空的动画属性过滤掉
	          if (/transform|transition/i.test(key) && styleObj[key] === '' || // 过滤掉空的动画属性
	          key.trim() === '' || styleObj[key] === undefined || styleObj[key] === '' || !isNaN(parseInt(key))) {
	            return false;
	          }
	          return true;
	        }).map(function (key) {
	          var newKey = key.replace(/([A-Z]{1})/g, function (v) {
	            return '-' + v.toLowerCase();
	          });
	          return newKey + ':' + styleObj[key];
	        }).join(';'));
	      })();
	    } else if (hasProperty) {
	      if (_constants.INLINE_STYLE.indexOf(propName) !== -1) {
	        node[propName] = transformRpx(propValue, true);
	      } else {
	        node[propName] = propValue;
	      }
	      // eslint-disable-next-line no-cond-assign
	    } else if (matches = propName.match(/^(capture-)?(bind|catch):?(.+)$/)) {
	      bindEvent(node, matches[3], propValue, matches[2] === 'catch', matches[1]);
	    } else if (propName.slice(0, 2) === 'on') {
	      bindEvent(node, propName.slice(2), propValue, false, false);
	    } else if (propName === 'animation') {
	      if (propValue !== null && (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) === 'object' && propValue.actions && propValue.actions.length > 0) {
	        (function () {
	          var step = function step() {
	            if (index < length) {
	              var _wx$animationToStyle = wx.animationToStyle(actions[index]),
	                  transition = _wx$animationToStyle.transition,
	                  transitionProperty = _wx$animationToStyle.transitionProperty,
	                  transform = _wx$animationToStyle.transform,
	                  transformOrigin = _wx$animationToStyle.transformOrigin,
	                  style = _wx$animationToStyle.style;
	
	              node.$$.style.transition = transition;
	              node.$$.style.transitionProperty = transitionProperty;
	              node.$$.style.transform = transform;
	              node.$$.style.transformOrigin = transformOrigin;
	              node.$$.style.webkitTransition = transition;
	              node.$$.style.webkitTransitionProperty = transitionProperty;
	              node.$$.style.webkitTransform = transform;
	              node.$$.style.webkitTransformOrigin = transformOrigin;
	              for (var key in style) {
	                node.$$.style[key] = transformRpx(' ' + style[key], true); // transformRpx 一定要空格开头才能匹配
	              }
	
	              node.animationStyle = {
	                transition: transition,
	                transform: transform,
	                transitionProperty: transitionProperty,
	                transformOrigin: transformOrigin
	              };
	            }
	          };
	
	          var index = 0;
	          var actions = propValue.actions;
	          var length = propValue.actions.length;
	          node.addListener('transitionend', function () {
	            index += 1;
	            step();
	          });
	          step();
	        })();
	      }
	    }
	  }
	};
	
	/**
	* @synopsis Remove props from given element node.
	*
	* @param node {!Element} - Element node.
	* @param propName {string} - Prop name.
	* @private
	*/
	var removeProperty = exports.removeProperty = function removeProperty(node, propName) {
	  var hasProperty = exparser.Component.hasProperty(node, propName);
	
	  if (hasProperty) {
	    node[propName] = undefined;
	  } else if (propName.slice(0, 4) === 'bind') {
	    bindEvent(node, propName.slice(4), '');
	  } else if (propName.slice(0, 5) === 'catch') {
	    bindEvent(node, propName.slice(5), '', true);
	  } else if (propName.slice(0, 2) === 'on') {
	    bindEvent(node, propName.slice(2), '');
	  } else if (propName === 'style') {
	    node.$$.removeAttribute(propName);
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var caseMap = {};
	var rx = {
	  dashToCamel: /-[a-z]/g,
	  camelToDash: /([A-Z])/g
	};
	
	var dashToCamelCase = exports.dashToCamelCase = function dashToCamelCase(dash) {
	  if (caseMap[dash]) {
	    return caseMap[dash];
	  }
	  return caseMap[dash] = dash.indexOf('-') <= 0 ? dash : dash.replace(rx.dashToCamel, function (s) {
	    return s[1].toUpperCase();
	  });
	};
	
	var camelToDashCase = exports.camelToDashCase = function camelToDashCase(camel) {
	  return caseMap[camel] || (caseMap[camel] = camel.replace(rx.camelToDash, '-$1').toLowerCase());
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PATCH_TYPE = exports.PATCH_TYPE = {
	  NONE: 0,
	  TEXT: 1,
	  VNODE: 2,
	  PROPS: 3,
	  REORDER: 4,
	  INSERT: 5,
	  REMOVE: 6
	};
	
	var WX_KEY = exports.WX_KEY = 'wxKey';
	
	var RPX_RATE = exports.RPX_RATE = 20;
	
	var BASE_DEVICE_WIDTH = exports.BASE_DEVICE_WIDTH = 750;
	
	var INLINE_STYLE = exports.INLINE_STYLE = ['placeholderStyle', 'hoverStyle', 'style'];
	
	var SYNC_EVENT_NAME = exports.SYNC_EVENT_NAME = {
	  WX_EVENT: 11,
	  REQUEST_SAVE: 12,
	  COMPONENT_DEF: 21,
	  SAVE_STATE: 22,
	  RESTORE_STATE: 23,
	  LAYOUT_READY: 31,
	  FLOW_DEPTH: 2,
	  FLOW_INITIAL_CREATION: 3,
	  FLOW_UPDATE: 6,
	  FLOW_APPLY_PROPERTY: 4,
	  FLOW_MINIPULATE_CHILD: 7,
	  FLOW_CREATE_NODE: 5,
	  FLOW_REPEAT: 9,
	  BANNING_MAP: 90
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.appendPatch = exports.diffProps = exports.diffChildren = exports.diffNode = exports.diff = undefined;
	
	var _virtual_patch = __webpack_require__(7);
	
	var _virtual_patch2 = _interopRequireDefault(_virtual_patch);
	
	var _virtual_patches = __webpack_require__(8);
	
	var _virtual_patches2 = _interopRequireDefault(_virtual_patches);
	
	var _utils = __webpack_require__(2);
	
	var _list_diff = __webpack_require__(10);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var diff = exports.diff = function diff(oldTree, newTree) {
	  var patches = {};
	  diffNode(oldTree, newTree, patches, 0);
	  return new _virtual_patches2.default(oldTree, patches);
	};
	
	// IDEA do not keep the old node tree, directly comparing with exparser tree
	
	/**
	 * @synopsis
	 *
	 * @param oldNode
	 * @param newNode
	 * @param patches
	 * @param index
	 * @private export for test
	 */
	var diffNode = exports.diffNode = function diffNode(oldNode, newNode, patches, index) {
	  if (oldNode === newNode) {
	    return;
	  }
	
	  var apply = patches[index];
	  if (newNode == null) {
	    apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.REMOVE, oldNode));
	  } else if ((0, _utils.isVirtualNode)(newNode)) {
	    if ((0, _utils.isVirtualNode)(oldNode)) {
	      if (oldNode.tagName === newNode.tagName && oldNode.wxKey === newNode.wxKey) {
	        if (oldNode.tagName === 'virtual' && oldNode.wxVkey !== newNode.wxVkey) {
	          apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.VNODE, oldNode, newNode));
	        } else {
	          var propsPatch = diffProps(newNode.props, newNode.newProps);
	          if (propsPatch) {
	            apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.PROPS, oldNode, propsPatch));
	          }
	          apply = diffChildren(oldNode, newNode, patches, apply, index);
	        }
	      } else {
	        apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.VNODE, oldNode, newNode));
	      }
	    } else {
	      apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.VNODE, oldNode, newNode));
	    }
	  } else if ((0, _utils.isVirtualText)(newNode)) {
	    if (newNode.text !== oldNode.text) {
	      apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.TEXT, oldNode, newNode));
	    }
	  } else {
	    console.log('unknow node type', oldNode, newNode);
	    throw {
	      message: 'unknow node type',
	      node: newNode
	    };
	  }
	
	  if (apply) {
	    patches[index] = apply;
	  }
	};
	
	/**
	 * @synopsis
	 *
	 * @param oldTree
	 * @param newTree
	 * @param patches
	 * @param apply
	 * @param index
	 * @private export for test
	 */
	var diffChildren = exports.diffChildren = function diffChildren(oldTree, newTree, patches, apply, index) {
	  var oldChildren = oldTree.children;
	  var diffs = (0, _list_diff.listDiff)(oldChildren, newTree.children);
	  var newChildren = diffs.children;
	
	  var childNumber = oldChildren.length > newChildren.length ? oldChildren.length : newChildren.length;
	
	  for (var i = 0; i < childNumber; ++i) {
	    var oldChild = oldChildren[i];
	    var newChild = newChildren[i];
	    ++index;
	
	    if (!oldChild) {
	      if (newChild) {
	        // Excess nodes in b need to be added
	        apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.INSERT, oldChild, newChild));
	      }
	    } else {
	      diffNode(oldChild, newChild, patches, index);
	    }
	
	    if ((0, _utils.isVirtualNode)(oldChild)) {
	      index += oldChild.descendants;
	    }
	  }
	
	  if (diffs.moves) {
	    apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.REORDER, oldTree, diffs.moves));
	  }
	
	  return apply;
	};
	
	/**
	 * @synopsis
	 *
	 * @param props {Object}
	 * @param newKeys {Array}
	 * @private export for test
	 */
	var diffProps = exports.diffProps = function diffProps(props, newKeys) {
	  var diff = {};
	
	  for (var i = 0; i < newKeys.length; i++) {
	    var key = newKeys[i];
	    diff[key] = props[key];
	  }
	  // console.log(JSON.stringify(oldProps))
	  // console.log(JSON.stringify(newProps))
	  // console.log(JSON.stringify(diff))
	  return (0, _utils.isEmptyObject)(diff) ? undefined : diff;
	};
	
	/**
	 * @synopsis Append patch to patches
	 *
	 * @param patches
	 * @param patch
	 * @private export for test
	 */
	var appendPatch = exports.appendPatch = function appendPatch(patches, patch) {
	  if (patches) {
	    patches.push(patch);
	    return patches;
	  } else {
	    return [patch];
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _prop_utils = __webpack_require__(3);
	
	var _constants = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualPatch = function () {
	  function VirtualPatch(type, vNode, patch) {
	    _classCallCheck(this, VirtualPatch);
	
	    this.type = Number(type);
	    this.vNode = vNode;
	    this.patch = patch;
	  }
	
	  _createClass(VirtualPatch, [{
	    key: 'apply',
	    value: function apply(domNode) {
	      switch (this.type) {
	        case _constants.PATCH_TYPE.TEXT:
	          return VirtualPatch.stringPatch(domNode, this.patch);
	        case _constants.PATCH_TYPE.VNODE:
	          return VirtualPatch.vNodePatch(domNode, this.patch);
	        case _constants.PATCH_TYPE.PROPS:
	          return VirtualPatch.applyProperties(domNode, this.patch, this.vNode.props);
	        case _constants.PATCH_TYPE.REORDER:
	          return VirtualPatch.reorderChildren(domNode, this.patch);
	        case _constants.PATCH_TYPE.INSERT:
	          return VirtualPatch.insertNode(domNode, this.patch);
	        case _constants.PATCH_TYPE.REMOVE:
	          return VirtualPatch.removeNode(domNode);
	        default:
	          return domNode;
	      }
	    }
	  }], [{
	    key: 'stringPatch',
	    value: function stringPatch(domNode, vText) {
	      var parentNode = domNode.parentNode;
	      var newNode = vText.render();
	      if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	      }
	      return newNode;
	    }
	  }, {
	    key: 'vNodePatch',
	    value: function vNodePatch(domNode, vNode) {
	      var parentNode = domNode.parentNode;
	      var newNode = vNode.render();
	
	      if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	      }
	
	      return newNode;
	    }
	  }, {
	    key: 'applyProperties',
	    value: function applyProperties(domNode, newProps, oldProps) {
	      (0, _prop_utils.applyProperties)(domNode, newProps, oldProps);
	      return domNode;
	    }
	  }, {
	    key: 'reorderChildren',
	    value: function reorderChildren(domNode, moves) {
	      var removes = moves.removes,
	          inserts = moves.inserts;
	
	      var children = domNode.childNodes;
	      var keyMap = {};
	
	      removes.forEach(function (remove) {
	        var node = children[remove.index];
	        if (remove.key) {
	          keyMap[remove.key] = node;
	        }
	        domNode.removeChild(node);
	      });
	
	      inserts.forEach(function (insert) {
	        var node = keyMap[insert.key];
	        domNode.insertBefore(node, children[insert.index]);
	      });
	
	      return domNode;
	    }
	  }, {
	    key: 'insertNode',
	    value: function insertNode(parentNode, vNode) {
	      var newNode = vNode.render();
	
	      if (parentNode) {
	        parentNode.appendChild(newNode);
	      }
	
	      return parentNode;
	    }
	  }, {
	    key: 'removeNode',
	    value: function removeNode(domNode) {
	      var parentNode = domNode.parentNode;
	
	      if (parentNode) {
	        parentNode.removeChild(domNode);
	      }
	
	      return null;
	    }
	  }]);
	
	  return VirtualPatch;
	}();
	
	exports.default = VirtualPatch;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dom_index = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualPatches = function () {
	  function VirtualPatches(oldTree, patches) {
	    _classCallCheck(this, VirtualPatches);
	
	    this.oldTree = oldTree;
	
	    this.patches = patches;
	
	    this.patchIndexes = Object.keys(this.patches).map(function (key) {
	      return Number(key);
	    });
	  }
	
	  _createClass(VirtualPatches, [{
	    key: 'apply',
	    value: function apply(domTree) {
	      var _this = this;
	
	      if (this.patchIndexes.length === 0) {
	        // empty patch
	        return domTree;
	      }
	
	      var indexesToDom = (0, _dom_index.getDomIndex)(domTree, this.oldTree, this.patchIndexes);
	
	      this.patchIndexes.forEach(function (index) {
	        var domNode = indexesToDom[index];
	        if (domNode) {
	          var patchList = _this.patches[index];
	          patchList.forEach(function (patch) {
	            patch.apply(domNode);
	          });
	        }
	      });
	      return domTree;
	    }
	  }]);
	
	  return VirtualPatches;
	}();
	
	exports.default = VirtualPatches;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getDomIndex = exports.getDomIndex = function getDomIndex(domTree, vTree, patchIndexes) {
	  if (!patchIndexes || patchIndexes.length == 0) {
	    return {};
	  } else {
	    patchIndexes = patchIndexes.sort(function (a, b) {
	      return a - b;
	    });
	    var indexesToDom = {};
	    mapIndexToDom(domTree, vTree, patchIndexes, indexesToDom, 0);
	    return indexesToDom;
	  }
	};
	
	var mapIndexToDom = exports.mapIndexToDom = function mapIndexToDom(domNode, vNode, patchIndexes, indexesToDom, index) {
	  if (domNode) {
	    if (oneOfIndexesInRange(patchIndexes, index, index)) {
	      indexesToDom[index] = domNode;
	    }
	    var vChildren = vNode.children;
	    if (vChildren) {
	      var domChildren = domNode.childNodes;
	
	      for (var i = 0; i < vChildren.length; ++i) {
	        var vChild = vChildren[i];
	        ++index;
	        var nextIndex = index + (vChild.descendants || 0);
	        if (oneOfIndexesInRange(patchIndexes, index, nextIndex)) {
	          mapIndexToDom(domChildren[i], vChild, patchIndexes, indexesToDom, index);
	        }
	        index = nextIndex;
	      }
	    }
	  }
	};
	
	var oneOfIndexesInRange = exports.oneOfIndexesInRange = function oneOfIndexesInRange(indexes, left, right) {
	  var minIndex = 0;
	  var maxIndex = indexes.length - 1;
	  while (minIndex <= maxIndex) {
	    var currentIndex = maxIndex + minIndex >> 1;
	    var currentItem = indexes[currentIndex];
	    if (currentItem < left) {
	      minIndex = currentIndex + 1;
	    } else if (currentItem > right) {
	      maxIndex = currentIndex - 1;
	    } else {
	      return true;
	    }
	  }
	  return false;
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getItemKey = exports.makeKeyAndFreeIndexes = exports.listDiff = undefined;
	
	var _utils = __webpack_require__(2);
	
	/**
	* @synopsis Diff two list in O(N)
	* @param {!Array} oldList - Original List.
	* @param {!Array} newList - List new certain insertion, removes, or moves
	* @param {string|function} key - Key to identify item
	* @return {Object{children, moves}} - moves is a list of actions that telling how to remove and insert
	*/
	var listDiff = exports.listDiff = function listDiff(oldList, newList) {
	  function remove(arr, index, key) {
	    arr.splice(index, 1);
	    return { index: index, key: key };
	  }
	
	  // Step 1. If no key index, just return new list and no move.
	
	  var _makeKeyAndFreeIndexe = makeKeyAndFreeIndexes(oldList),
	      oldKeyIndexes = _makeKeyAndFreeIndexe.keyIndexes,
	      oldFreeIndexes = _makeKeyAndFreeIndexe.freeIndexes;
	
	  if ((0, _utils.isEmptyObject)(oldKeyIndexes)) {
	    return {
	      children: newList,
	      moves: null
	    };
	  }
	
	  var _makeKeyAndFreeIndexe2 = makeKeyAndFreeIndexes(newList),
	      newKeyIndexes = _makeKeyAndFreeIndexe2.keyIndexes,
	      newFreeIndexes = _makeKeyAndFreeIndexe2.freeIndexes;
	
	  if ((0, _utils.isEmptyObject)(newKeyIndexes)) {
	    return {
	      children: newList,
	      moves: null
	    };
	  }
	
	  var children = [];
	  var freeIndex = 0;
	  var deletedItemCount = 0;
	
	  // Step 2. Pass to check item in old list: if it's removed or not.
	  for (var i = 0; i < oldList.length; ++i) {
	    var item = oldList[i];
	    var itemKey = getItemKey(item);
	    if (itemKey) {
	      if (newKeyIndexes.hasOwnProperty(itemKey)) {
	        // Match up the old keys
	        var itemIndex = newKeyIndexes[itemKey];
	        children.push(newList[itemIndex]);
	      } else {
	        // Remove old keyed items
	        ++deletedItemCount;
	        children.push(null);
	      }
	    } else {
	      // free item, just match other free item in new list or null
	      if (freeIndex < newFreeIndexes.length) {
	        var _itemIndex = newFreeIndexes[freeIndex];
	        children.push(newList[_itemIndex]);
	        ++freeIndex;
	      } else {
	        ++deletedItemCount;
	        children.push(null);
	      }
	    }
	  }
	
	  // Step 3. Pass to check item in new list: if it's new
	  var lastFreeItemIndex = newFreeIndexes[freeIndex] || newList.length;
	  for (var _i = 0; _i < newList.length; ++_i) {
	    var _item = newList[_i];
	
	    if (getItemKey(_item)) {
	      if (!oldKeyIndexes.hasOwnProperty(getItemKey(_item))) {
	        children.push(_item);
	      }
	    } else if (_i >= lastFreeItemIndex) {
	      children.push(_item);
	    }
	  }
	
	  // Step 4. Make simulate list as same as new list.
	  // currentList have all item in newList and oldList
	  // currentList List used to simulate remove and insert item operation
	  var currentList = children.slice(0);
	  var currentIndex = 0;
	  var removes = [];
	  var inserts = [];
	  for (var newIndex = 0; newIndex < newList.length;) {
	    var newItem = newList[newIndex];
	    var newItemKey = getItemKey(newItem);
	    var currentItem = currentList[currentIndex];
	    var currentItemKey = getItemKey(currentItem);
	
	    // remove null items
	    while (currentItem === null) {
	      removes.push(remove(currentList, currentIndex, currentItemKey));
	      currentItem = currentList[currentIndex];
	      currentItemKey = getItemKey(currentItem);
	    }
	
	    // Attention: currentItem and newItem always exist
	    if (currentItemKey === newItemKey) {
	      // 1. same key(with same key or both without key), then compare next items
	      ++currentIndex;
	      ++newIndex;
	    } else if (newItemKey) {
	      // 2. newItem has key, must match it!
	      if (currentItemKey) {
	        // 2.1 currentItem has key
	        if (newKeyIndexes[currentItemKey] === newIndex + 1) {
	          // 2.1.1 next newItem has same key with currentItem
	          // insert will put this key in right place
	          inserts.push({ key: newItemKey, index: newIndex });
	        } else {
	          // 2.1.2 next newItem has diff key with currentItem
	          // move current currentItem and compare with next currentItem
	          removes.push(remove(currentList, currentIndex, currentItemKey));
	          currentItem = currentList[currentIndex];
	          if (currentItem && getItemKey(currentItem) === newItemKey) {
	            // 2.1.2.1 next currentItem has same key with new item
	            ++currentIndex;
	          } else {
	            // 2.1.2.2 next currentItem has diff key with new itm
	            inserts.push({ key: newItemKey, index: newIndex });
	          }
	        }
	      } else {
	        // 2.2 currentItem has no key
	        inserts.push({ key: newItemKey, index: newIndex });
	      }
	      ++newIndex;
	    } else {
	      // 3. newItem has no key and currentItem has key.
	      removes.push(remove(currentList, currentIndex, currentItemKey));
	    }
	  }
	
	  // Step 5. remove all the remaining nodes from currentList
	  while (currentIndex < currentList.length) {
	    var _currentItem = currentList[currentIndex];
	    var _currentItemKey = getItemKey(_currentItem);
	    removes.push(remove(currentList, currentIndex, _currentItemKey));
	  }
	
	  // Step *. if the only moves we have are deletes
	  // then we can just let the delete patch remove these items.
	  if (removes.length === deletedItemCount && inserts.length == 0) {
	    return {
	      children: children,
	      moves: null
	    };
	  }
	
	  return {
	    children: children,
	    moves: { removes: removes, inserts: inserts }
	  };
	};
	
	/**
	* @synopsis Covert list to key-item keyIndex and free-item object.
	* @param {Array} list
	* @param {String|Function} key
	* @return {Object{keyIndexes, freeIndexes}}
	* @private
	*/
	var makeKeyAndFreeIndexes = exports.makeKeyAndFreeIndexes = function makeKeyAndFreeIndexes(list) {
	  var keyIndexes = {};
	  var freeIndexes = [];
	  for (var index = 0; index < list.length; ++index) {
	    var item = list[index];
	    var itemKey = getItemKey(item);
	    if (!itemKey) {
	      freeIndexes.push(index);
	    } else if (keyIndexes.hasOwnProperty(itemKey)) {
	      console.warn('For developer:Do not set same key {' + itemKey + '} in wx:key.');
	      clearItemKey(item);
	      freeIndexes.push(index);
	    } else {
	      keyIndexes[itemKey] = index;
	    }
	  }
	  return { keyIndexes: keyIndexes, freeIndexes: freeIndexes };
	};
	
	/**
	* @synopsis To get item key.
	* @param {Object} item
	* @return {string} Item key.
	* @private
	*/
	var getItemKey = exports.getItemKey = function getItemKey(item) {
	  if (!item) {
	    return undefined;
	  }
	  return item.wxKey;
	};
	
	var clearItemKey = function clearItemKey(item) {
	  item.wxKey = undefined;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualText = function () {
	  function VirtualText(text) {
	    _classCallCheck(this, VirtualText);
	
	    this.text = String(text);
	  }
	
	  _createClass(VirtualText, [{
	    key: "render",
	    value: function render(renderOptions) {
	      var doc = renderOptions ? renderOptions.document || exparser : exparser;
	      return doc.createTextNode(this.text);
	    }
	  }]);
	
	  return VirtualText;
	}();
	
	VirtualText.prototype.type = "WxVirtualText";
	
	exports.default = VirtualText;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path_parser = __webpack_require__(13);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var appData = {};
	
	var DataManager = function () {
	  function DataManager() {
	    _classCallCheck(this, DataManager);
	  }
	
	  _createClass(DataManager, null, [{
	    key: 'getAppData',
	    value: function getAppData() {
	      return appData;
	    }
	  }, {
	    key: 'mergeData',
	    value: function mergeData(appData, newData) {
	      if (newData === null) {
	        return appData;
	      }
	      var returnData = JSON.parse(JSON.stringify(appData));
	
	      for (var path in newData) {
	        var pathes = (0, _path_parser.parsePath)(path);
	        var value = newData[path];
	
	        var _getObjectByPath = (0, _path_parser.getObjectByPath)(appData, pathes, false),
	            obj = _getObjectByPath.obj,
	            key = _getObjectByPath.key;
	
	        var _getObjectByPath2 = (0, _path_parser.getObjectByPath)(returnData, pathes, true),
	            returnObj = _getObjectByPath2.obj,
	            returnKey = _getObjectByPath2.key,
	            changed = _getObjectByPath2.changed;
	
	        if (obj) {
	          obj[key] = newData[path];
	        }
	        if (returnObj) {
	          if (changed) {
	            returnObj[returnKey] = newData[path];
	          } else {
	            returnObj[returnKey] = {
	              __value__: newData[path],
	              __wxspec__: true
	            };
	          }
	        }
	      }
	      return returnData;
	    }
	  }]);
	
	  return DataManager;
	}();
	
	exports.default = DataManager;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getObjectByPath = exports.parsePath = undefined;
	
	var _utils = __webpack_require__(2);
	
	var parsePath = exports.parsePath = function parsePath(pathStr) {
	  var length = pathStr.length;
	  var path = [];
	  var variabal = '';
	  var number = 0;
	  var hasNumber = false;
	  var inBracket = false;
	  for (var i = 0; i < length; i++) {
	    var c = pathStr[i];
	    if (c === '\\') {
	      if (i + 1 < length && (pathStr[i + 1] === '.' || pathStr[i + 1] === '[' || pathStr[i + 1] === ']')) {
	        variabal += pathStr[i + 1];
	        i++;
	      } else {
	        variabal += '\\';
	      }
	    } else if (c === '.') {
	      if (variabal) {
	        path.push(variabal);
	        variabal = '';
	      }
	    } else if (c === '[') {
	      if (variabal) {
	        path.push(variabal);
	        variabal = '';
	      }
	      if (path.length === 0) {
	        throw new Error('path can not start with []: ' + pathStr);
	      }
	      inBracket = true;
	      hasNumber = false;
	    } else if (c === ']') {
	      if (!hasNumber) {
	        throw new Error('must have number in []: ' + pathStr);
	      }
	      inBracket = false;
	      path.push(number);
	      number = 0;
	    } else if (inBracket) {
	      if (c < '0' || c > '9') {
	        throw new Error('only number 0-9 could inside []: ' + pathStr);
	      }
	      hasNumber = true;
	      number = number * 10 + c.charCodeAt(0) - 48;
	    } else {
	      variabal += c;
	    }
	  }
	  if (variabal) {
	    path.push(variabal);
	  }
	  if (path.length === 0) {
	    throw new Error('path can not be empty');
	  }
	  return path;
	};
	
	var getObjectByPath = exports.getObjectByPath = function getObjectByPath(obj, path, wxSpec) {
	  var lastObj = void 0,
	      lastKey = void 0;
	  var currentObj = obj;
	  var changed = false;
	
	  for (var i = 0; i < path.length; i++) {
	    if (Number(path[i]) === path[i] && path[i] % 1 === 0) {
	      if ((0, _utils.getDataType)(currentObj) !== 'Array') {
	        if (wxSpec && !changed) {
	          changed = true;
	          lastObj[lastKey] = {
	            __value__: [],
	            __wxspec__: true
	          };
	          currentObj = lastObj[lastKey].__value__;
	        } else {
	          lastObj[lastKey] = [];
	          currentObj = lastObj[lastKey];
	        }
	      }
	    } else if ((0, _utils.getDataType)(currentObj) !== 'Object') {
	      if (wxSpec && !changed) {
	        changed = true;
	        lastObj[lastKey] = {
	          __value__: {},
	          __wxspec__: true
	        };
	        currentObj = lastObj[lastKey].__value__;
	      } else {
	        lastObj[lastKey] = {};
	        currentObj = lastObj[lastKey];
	      }
	    }
	
	    lastKey = path[i];
	    lastObj = currentObj;
	    currentObj = currentObj[path[i]];
	    if (currentObj && currentObj.__wxspec__) {
	      currentObj = currentObj.__value__;
	      changed = true;
	    }
	  }
	  return { obj: lastObj, key: lastKey, changed: changed };
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dfs = function dfs(elem, countMap, inComponent) {
	  if (elem instanceof exparser.Element) {
	    if (elem instanceof exparser.VirtualNode || elem instanceof exparser.NativeNode) {
	      dfs(elem.childNodes, countMap, inComponent);
	    } else if (elem instanceof exparser.Component) {
	      if (elem !== window.__DOMTree__) {
	        if (exparser.Component.getComponentOptions(elem).domain === '//') {
	          // 内置组件
	          countMap.rootInternalCompCount++;
	
	          if (inComponent) countMap.invisibleCount++;
	        } else {
	          // 自定义组件
	          countMap.rootCustomCompCount++;
	
	          countMap.invisibleCount++;
	          inComponent = true;
	        }
	      }
	
	      dfs(elem.shadowRoot.childNodes, countMap, inComponent);
	    }
	  } else if (elem instanceof Array) {
	    for (var i = 0, len = elem.length; i < len; i++) {
	      dfs(elem[i], countMap, inComponent);
	    }
	  }
	};
	
	var getComponentCount = exports.getComponentCount = function getComponentCount() {
	  var countMap = {
	    rootCustomCompCount: 0,
	    rootInternalCompCount: 0,
	    invisibleCount: 0 // 自定义组件下的内置组件归属于自定义组件，用来计算白屏程度
	  };
	  dfs(window.__DOMTree__, countMap, false);
	
	  var rootCustomCompCount = countMap.rootCustomCompCount,
	      rootInternalCompCount = countMap.rootInternalCompCount,
	      invisibleCount = countMap.invisibleCount;
	
	  var rootCompCount = rootCustomCompCount + rootInternalCompCount;
	
	  // 计算无法恢复的组件比率，即白屏程度
	  var rootCustomCompRatio = rootCompCount ? ~~(invisibleCount * 100 / rootCompCount) : 0;
	
	  return {
	    rootCompCount: rootCompCount,
	    rootCustomCompCount: rootCustomCompCount,
	    rootCustomCompRatio: rootCustomCompRatio,
	    rootInternalCompCount: rootInternalCompCount
	  };
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _node_id = __webpack_require__(16);
	
	var _node_id2 = _interopRequireDefault(_node_id);
	
	var _operation_flow = __webpack_require__(17);
	
	var _operation_flow2 = _interopRequireDefault(_operation_flow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// 每个view及其在data侧对应的管理单元是一个TreeManager，事实上是一个操作流和节点ID分配器的组合
	
	var idTmMap = {};
	
	var TreeManager = function () {
	  function TreeManager(viewId) {
	    _classCallCheck(this, TreeManager);
	
	    this.flowInited = false;
	    this.root = null;
	    this.usedDef = null;
	    this.statesData = null;
	    this.layoutReadyFuncs = [];
	    this.operationFlow = new _operation_flow2.default(viewId, this);
	    this.nodeId = new _node_id2.default();
	    this.rootNodeId = '';
	    this.rootCompName = '';
	  }
	
	  _createClass(TreeManager, null, [{
	    key: 'create',
	    value: function create(viewId) {
	      var ret = new TreeManager(viewId);
	      ret.viewId = viewId;
	      idTmMap[viewId] = ret;
	      return ret;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(viewId) {
	      delete idTmMap[viewId];
	    }
	  }, {
	    key: 'get',
	    value: function get(viewId) {
	      return idTmMap[viewId];
	    }
	  }, {
	    key: 'listViewId',
	    value: function listViewId() {
	      var ret = [];
	      for (var k in idTmMap) {
	        ret.push(idTmMap[k].viewId);
	      }
	      return ret;
	    }
	  }]);
	
	  return TreeManager;
	}();
	
	exports.default = TreeManager;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* eslint-disable class-methods-use-this */
	var nodeIdManager = function () {
	  function nodeIdManager() {
	    _classCallCheck(this, nodeIdManager);
	
	    this._idNodeMap = {};
	  }
	
	  _createClass(nodeIdManager, [{
	    key: 'getAll',
	    value: function getAll() {
	      return this._idNodeMap;
	    }
	  }, {
	    key: 'getNodeById',
	    value: function getNodeById(id) {
	      return this._idNodeMap[id];
	    }
	  }, {
	    key: 'getNodeId',
	    value: function getNodeId(node) {
	      return node.__wxTmplId;
	    }
	  }, {
	    key: 'allocNodeId',
	    value: function allocNodeId(node, assignId) {
	      var id = assignId || (0, _utils.guid)();
	      node.__wxTmplId = id;
	      this._idNodeMap[node.__wxTmplId] = node;
	      return id;
	    }
	  }, {
	    key: 'addNode',
	    value: function addNode() {
	      // do nothing
	    }
	  }, {
	    key: 'removeNode',
	    value: function removeNode(node) {
	      if (node.__wxTmplId) delete this._idNodeMap[node.__wxTmplId];
	      if (node.childNodes) {
	        for (var i = 0; i < node.childNodes.length; i++) {
	          this.removeNode(node.childNodes[i]);
	        }
	      }
	      if (node.shadowRoot instanceof exparser.Element) this.removeNode(node.shadowRoot);
	    }
	  }]);
	
	  return nodeIdManager;
	}();
	
	exports.default = nodeIdManager;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(5);
	
	var _bridge = __webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// VD操作流同步模块，用于在两侧同步各种VD操作
	
	var OperationIterator = function () {
	  function OperationIterator(treeManager, arr, startCb) {
	    _classCallCheck(this, OperationIterator);
	
	    this._treeManager = treeManager;
	    this._arr = arr;
	    this._depth = 0;
	    this._startCb = startCb;
	  }
	
	  _createClass(OperationIterator, [{
	    key: 'nextStep',
	    value: function nextStep() {
	      while (this._arr[0][0] === _constants.SYNC_EVENT_NAME.FLOW_DEPTH) {
	        this._startCb(this._treeManager);
	      }
	      if (this._arr[0][0] === _constants.SYNC_EVENT_NAME.FLOW_REPEAT) {
	        var loopSeg = this._arr[0][2];
	        if (! --this._arr[0][1]) this._arr.shift();
	        return [loopSeg];
	      }
	      return this._arr.shift();
	    }
	  }, {
	    key: 'expectStart',
	    value: function expectStart() {
	      var step = this._arr.shift();
	      this._depth++;
	      if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_DEPTH || step[1] !== this._depth) {
	        throw new Error('Expect START descriptor with depth ' + this._depth + ' but get another');
	      }
	    }
	  }, {
	    key: 'expectEnd',
	    value: function expectEnd() {
	      while (this._arr[0][0] === _constants.SYNC_EVENT_NAME.FLOW_DEPTH && this._arr[0][1] !== this._depth - 1) {
	        this._startCb(this._treeManager);
	      }
	      var step = this._arr.shift();
	      this._depth--;
	      if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_DEPTH || step[1] !== this._depth) {
	        throw new Error('Expect END descriptor with depth ' + this._depth + ' but get another');
	      }
	    }
	  }, {
	    key: 'getQueueLength',
	    value: function getQueueLength() {
	      return this._arr.length;
	    }
	  }, {
	    key: 'getDepth',
	    value: function getDepth() {
	      return this._depth;
	    }
	  }]);
	
	  return OperationIterator;
	}();
	
	/* eslint-disable class-methods-use-this */
	
	
	var OperationFlow = function () {
	  function OperationFlow(viewId, treeManager) {
	    var _this = this;
	
	    _classCallCheck(this, OperationFlow);
	
	    this._viewId = viewId;
	    this._treeManager = treeManager;
	    this._depth = 0;
	    this._curWinSize = 0;
	    this._received = [];
	    this._cache = [];
	    this._blocked = [];
	    var listener = function listener(data, ev) {
	      _this._received.push([ev].concat(data));
	      if (ev === _constants.SYNC_EVENT_NAME.FLOW_DEPTH) {
	        _this._depth = data[0];
	        if (_this._depth === 0) {
	          var ret = _this._received;
	          _this._received = [];
	          if (_this._blocked) {
	            _this._blocked.push(ret);
	          } else {
	            _this.iterator = new OperationIterator(_this._treeManager, ret, OperationFlow._startCb);
	            OperationFlow._startCb(_this._treeManager);
	            document.dispatchEvent(new CustomEvent('pageReRender', {}));
	            (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.LAYOUT_READY, []);
	          }
	        }
	      }
	    };
	    for (var k in _constants.SYNC_EVENT_NAME) {
	      if (k.slice(0, 5) !== 'FLOW_') continue;
	      (0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME[k], listener, viewId);
	    }
	  }
	
	  _createClass(OperationFlow, [{
	    key: 'unblock',
	    value: function unblock() {
	      if (!this._blocked) return;
	      while (this._blocked.length) {
	        try {
	          var ret = this._blocked.shift();
	          this.iterator = new OperationIterator(this._treeManager, ret, OperationFlow._startCb);
	          OperationFlow._startCb(this._treeManager);
	          document.dispatchEvent(new CustomEvent('pageReRender', {}));
	          (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.LAYOUT_READY, []);
	        } catch (error) {
	          console.error(error.message);
	          Reporter.errorReport({
	            key: 'webviewScriptError',
	            error: error
	          });
	        }
	      }
	      this._blocked = null;
	    }
	  }, {
	    key: 'start',
	    value: function start(timestamp) {
	      this.flush();
	      this._depth++;
	      (0, _bridge.queueSendingData)(_constants.SYNC_EVENT_NAME.FLOW_DEPTH, [this._depth, timestamp], this._viewId);
	    }
	  }, {
	    key: 'dedupe',
	    value: function dedupe() {
	      var cache = this._cache;
	      if (!this._curWinSize) {
	        // detect window
	        var found = 0;
	        if (cache.length > 2 && cache[0][0] === cache[1][0] && cache[0][0] === cache[2][0]) {
	          found = 1;
	        }
	        if (found) {
	          // found
	          var loopSeg = cache[0][0];
	          cache.splice(0, 3);
	          this.flush();
	          this._curWinSize = 1;
	          cache.unshift([_constants.SYNC_EVENT_NAME.FLOW_REPEAT, 3, loopSeg]);
	        } else {
	          // no found
	          if (cache.length > 3) {
	            var data = cache.pop();
	            var ev = data.shift();
	            (0, _bridge.queueSendingData)(ev, data, this._viewId);
	          }
	        }
	      } else {
	        // match window
	        if (cache.length === 2) {
	          var _loopSeg = cache[1][2];
	          if (cache[0][0] !== _loopSeg) {
	            // match failed
	            var _data = cache.pop();
	            var _ev = _data.shift();
	            (0, _bridge.queueSendingData)(_ev, _data, this._viewId);
	          } else {
	            // matched
	            cache.shift();
	            cache[0][1]++;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'push',
	    value: function push(data) {
	      this._cache.unshift(data);
	      if (data.length !== 1) this.flush();else this.dedupe();
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {
	      this._curWinSize = 0;
	      while (this._cache.length) {
	        var data = this._cache.pop();
	        var ev = data.shift();
	        (0, _bridge.queueSendingData)(ev, data, this._viewId);
	      }
	    }
	  }, {
	    key: 'end',
	    value: function end() {
	      this.flush();
	      this._depth--;
	      (0, _bridge.queueSendingData)(_constants.SYNC_EVENT_NAME.FLOW_DEPTH, this._depth, this._viewId);
	      if (this._depth === 0) {
	        (0, _bridge.flushSendingData)();
	      }
	    }
	  }], [{
	    key: 'setStartOperation',
	    value: function setStartOperation(cb) {
	      OperationFlow._startCb = cb;
	    }
	  }]);
	
	  return OperationFlow;
	}();
	/* eslint-enable class-methods-use-this */
	
	exports.default = OperationFlow;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var funcs = {};
	var bootstrapReceived = -1;
	var bootstrapFunc = null;
	var isView = false;
	var isInDevtoolsWebview = false;
	
	var isDataThread = exports.isDataThread = function isDataThread() {
	  return typeof __virtualDOMDataThread__ !== 'undefined' && __virtualDOMDataThread__;
	};
	
	var inDevtoolsWebview = exports.inDevtoolsWebview = function inDevtoolsWebview() {
	  return isInDevtoolsWebview;
	};
	
	var setInDevtoolsWebView = exports.setInDevtoolsWebView = function setInDevtoolsWebView() {
	  isInDevtoolsWebview = true;
	};
	
	var tunnel = null;
	var sendDataQueue = null;
	var sendDataQueueViewId = null;
	
	var setTunnel = function setTunnel() {
	  tunnel = isDataThread() ? __appServiceSDK__._virtualDOMTunnel : __webViewSDK__._virtualDOMTunnel;
	  tunnel.onVdSync(function (queue, viewId) {
	    recvData(queue, viewId);
	  });
	  tunnel.onVdSyncBatch(function (queue, viewId) {
	    for (var i = 0; i < queue.length; i++) {
	      recvData(queue[i], viewId);
	    }
	  });
	};
	
	if (isDataThread() && typeof __clientsubcontext !== 'undefined' && __clientsubcontext) {
	  // 运行在子域时需要等待子域初始化完成才能获取 __appServiceSDK__ 变量
	  __subContextEngine__.onInitReady(setTunnel);
	} else {
	  setTunnel();
	}
	
	var queueSendingData = exports.queueSendingData = function queueSendingData(ev, data, viewId) {
	  // console.info('SEND[]', ev, JSON.stringify(data))
	  if (viewId !== sendDataQueueViewId) flushSendingData();
	  sendDataQueueViewId = viewId;
	  if (!sendDataQueue) {
	    sendDataQueue = [[ev].concat(data)];
	  } else {
	    sendDataQueue.push([ev].concat(data));
	  }
	};
	
	var flushSendingData = exports.flushSendingData = function flushSendingData() {
	  if (sendDataQueue) tunnel.vdSyncBatch(sendDataQueue, sendDataQueueViewId !== undefined ? [sendDataQueueViewId] : undefined);
	  sendDataQueue = null;
	  sendDataQueueViewId = null;
	};
	
	var sendData = exports.sendData = function sendData(ev, data, viewId) {
	  // console.info('SEND', ev, JSON.stringify(data))
	  tunnel.vdSync([ev].concat(data), viewId !== undefined ? [viewId] : undefined);
	};
	
	var setDataListener = exports.setDataListener = function setDataListener(ev, func, viewId) {
	  if (ev === '') {
	    bootstrapFunc = func;
	    if (bootstrapReceived >= 0) bootstrapFunc(bootstrapReceived);
	    return;
	  }
	  viewId = viewId || 0;
	  if (!funcs[viewId]) funcs[viewId] = {};
	  funcs[viewId][ev] = func;
	};
	
	var removeDataListeners = exports.removeDataListeners = function removeDataListeners(viewId) {
	  delete funcs[viewId];
	};
	
	var recvData = function recvData(data, viewId) {
	  var ev = data.shift();
	  // console.info('RECV', ev, JSON.stringify(data))
	  if (ev === '') {
	    bootstrapReceived = viewId;
	    if (bootstrapFunc) bootstrapFunc(viewId);
	    return;
	  }
	  viewId = viewId || 0;
	  if (!funcs[viewId]) return;
	  var func = funcs[viewId][ev];
	  if (func) func(data, ev);
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeView = exports.attachView = exports.addView = exports.runComponentDef = exports.initViewThread = exports.getRootNodeId = exports.getNodeId = exports.getNodeById = exports.Page = exports.Component = exports.Behavior = exports.publishDomainComponents = exports.getDomainByPluginId = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.CustomComponent = CustomComponent;
	
	var _constants = __webpack_require__(5);
	
	var _bridge = __webpack_require__(18);
	
	var _tmpl = __webpack_require__(20);
	
	var _route_utils = __webpack_require__(32);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	var _operation_flow = __webpack_require__(17);
	
	var _operation_flow2 = _interopRequireDefault(_operation_flow);
	
	var _utils = __webpack_require__(2);
	
	var _deep_copy = __webpack_require__(31);
	
	var _save_restore_view = __webpack_require__(24);
	
	var _save_restore_view2 = _interopRequireDefault(_save_restore_view);
	
	var _save_restore_data = __webpack_require__(33);
	
	var _ban = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 实现了Page和Component构造器
	
	var BEHAVIOR_OPTIONS = {
	  lazyRegistration: true,
	  publicProperties: true
	};
	var COMPONENT_OPTIONS = {
	  domain: '/',
	  writeOnly: false,
	  allowInWriteOnly: false,
	  lazyRegistration: true,
	  classPrefix: '',
	  addGlobalClass: false,
	  templateEngine: _tmpl.Tmpl,
	  renderingMode: 'full',
	  multipleSlots: false,
	  publicProperties: true,
	  reflectToAttributes: false,
	  writeFieldsToNode: false,
	  writeIdToDOM: false
	};
	var COMPONENT_OPTIONS_VIEW = {
	  domain: '/',
	  writeOnly: false,
	  allowInWriteOnly: false,
	  lazyRegistration: true,
	  classPrefix: '',
	  addGlobalClass: false,
	  renderingMode: 'full',
	  templateEngine: _tmpl.Tmpl,
	  multipleSlots: false,
	  publicProperties: true,
	  reflectToAttributes: false,
	  writeFieldsToNode: false,
	  writeIdToDOM: false
	};
	
	var callerExparserNodeMap = typeof WeakMap !== 'undefined' ? new WeakMap() : {}; // 在 data 侧总是有 WeakMap 所以不会有问题；在 view 侧这个并不会用到
	var extractedComponentDef = {};
	var componentAliases = {};
	var extractedBehaviorDef = {};
	var extractedUsing = {};
	var extractedBehaviorImports = {};
	var behaviorIdInc = 1;
	
	var PROTOCOL = /^[-+a-z]+:\/\//i;
	
	// simple utils
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var generateClassPrefixMap = function generateClassPrefixMap(paths) {
	  // 根据组件文件路径名生成类名前缀，尽可能短
	  var groups = {};
	  var pathSlices = {};
	  var newGroupNames = [];
	  for (var i = 0; i < paths.length; i++) {
	    var path = paths[i];
	    var slices = pathSlices[path] = path.split(/[^a-z0-9]+/i);
	    var slice = slices[slices.length - 1];
	    if (hasOwnProperty.call(groups, slice)) {
	      groups[slice].push(path);
	      newGroupNames.push(slice);
	    } else {
	      groups[slice] = [path];
	    }
	  }
	  for (var len = 2; newGroupNames.length; len++) {
	    var groupNames = newGroupNames;
	    newGroupNames = [];
	    for (var j = 0; j < groupNames.length; j++) {
	      var groupName = groupNames[j];
	      if (!hasOwnProperty.call(groups, groupName)) continue;
	      var _paths = groups[groupName];
	      delete groups[groupName];
	      for (var _i = 0; _i < _paths.length; _i++) {
	        var _path = _paths[_i];
	        var _slices = pathSlices[_path];
	        var _slice = _slices.slice(-len).join('-');
	        if (hasOwnProperty.call(groups, _slice)) {
	          groups[_slice].push(_path);
	          if (_slice !== groupName) newGroupNames.push(_slice);
	        } else {
	          groups[_slice] = [_path];
	        }
	      }
	    }
	  }
	  var map = {};
	  for (var _groupName in groups) {
	    var group = groups[_groupName];
	    var mappedName = Number(_groupName[0]) >= 0 ? 'x-' + _groupName : _groupName;
	    if (group.length === 1) {
	      map[group[0]] = mappedName;
	    } else {
	      for (var _i2 = 0; _i2 < group.length; _i2++) {
	        map[group[_i2]] = mappedName + '-' + _i2;
	      }
	    }
	  }
	  return map;
	};
	
	var pathRelative = function pathRelative(base, name) {
	  if (PROTOCOL.test(name)) return name;
	  var protocolMatch = base.match(PROTOCOL);
	  var protocol = '';
	  if (protocolMatch) {
	    protocol = protocolMatch[0];
	    base = base.slice(protocol.length);
	  }
	  if (name.indexOf('/') === 0) base = '';
	  var baseSlices = base.split('/');
	  baseSlices.pop();
	  var slices = name.split('/');
	  while (slices.length) {
	    var slice = slices.shift();
	    if (slice === '' || slice === '.') continue;
	    if (slice === '..') {
	      baseSlices.pop();
	      continue;
	    }
	    baseSlices.push(slice);
	  }
	  return protocol + baseSlices.join('/');
	};
	
	var getUsingByPath = function getUsingByPath(path, codeMap) {
	  var pageConfig = codeMap[path + '.json'] || {};
	  var ret = {};
	  var usingDef = pageConfig.usingComponents;
	  for (var k in usingDef) {
	    ret['wx-' + k] = pathRelative(path, String(usingDef[k]));
	  }return ret;
	};
	
	var processRelationPaths = function processRelationPaths(path, relations) {
	  for (var k in relations) {
	    var relation = relations[k];
	    relation.target = relation.target != null ? String(relation.target) : pathRelative(path, String(k));
	  }
	  return relations;
	};
	
	var getGenericsByPath = function getGenericsByPath(path, codeMap) {
	  var pageConfig = codeMap[path + '.json'] || {};
	  var ret = {};
	  var genericsDef = pageConfig.componentGenerics;
	  for (var k in genericsDef) {
	    var genericConfig = genericsDef[k];
	    if ((typeof genericConfig === 'undefined' ? 'undefined' : _typeof(genericConfig)) === 'object') {
	      ret['wx-' + k] = {
	        default: pathRelative(path, String(genericConfig.default || ''))
	      };
	    } else if (genericConfig != null) {
	      ret['wx-' + k] = {};
	    }
	  }
	  return ret;
	};
	
	// domain plugin alias
	
	var getDomainByPluginId = exports.getDomainByPluginId = function getDomainByPluginId(pluginId, pluginVersion) {
	  return pluginId + '/' + pluginVersion;
	};
	
	var publishDomainComponent = function publishDomainComponent(domain, compPath, alias) {
	  var pluginInfo = compPath.match(/^plugin-private:\/\/(.*?)\//);
	  if (!pluginInfo) return false;
	  var pluginId = pluginInfo[1];
	  var pluginVersion = '0';
	  if (getDomainByPluginId(pluginId, pluginVersion) !== domain) return false;
	  var aliasInfo = alias.match(/^plugin:\/\/(.*?)\//);
	  if (!aliasInfo) return false;
	  var aliasPluginId = aliasInfo[1];
	  var aliasVersion = '0';
	  if (getDomainByPluginId(aliasPluginId, aliasVersion) !== domain) return false;
	  if (exparser.Component._list[alias]) {
	    console.error('"' + alias + '" has been used as another component or page. Please do not register multiple components or pages with the same alias.');
	    return false;
	  }
	  exparser.Component._list[alias] = exparser.Component._list[compPath];
	  componentAliases[alias] = compPath;
	  return true;
	};
	
	var publishDomainComponents = exports.publishDomainComponents = function publishDomainComponents(domain, compMap) {
	  for (var k in compMap) {
	    publishDomainComponent(domain, compMap[k], k);
	  }
	};
	
	// search definitions
	
	var recurseUsedBehaviors = function recurseUsedBehaviors(ret, compName, compFounded) {
	  if (compName.slice(0, 5) === 'wx://') return;
	  var def = extractedBehaviorDef[compName];
	  if (!def) throw new Error('"' + compName + '" is not a behavior registered by Behavior()');
	  ret[0].unshift(def);
	  compFounded[compName] = true;
	  var behKeys = extractedBehaviorImports[def.is];
	  if (behKeys) {
	    for (var i = 0; i < behKeys.length; i++) {
	      var beh = behKeys[i];
	      if (!compFounded[beh]) recurseUsedBehaviors(ret, beh, compFounded);
	    }
	  }
	};
	
	var recurseUsedComponents = function recurseUsedComponents(ret, compName, compFounded, usingBy) {
	  if (hasOwnProperty.call(componentAliases, compName)) compName = componentAliases[compName];
	  var def = extractedComponentDef[compName];
	  if (!def) throw new Error('Component is not found in path "' + compName + '"' + (usingBy ? ' (using by "' + usingBy + '")' : ''));
	  if (compName.slice(0, 5) !== 'wx://') ret[1].unshift(def);
	  compFounded[compName] = true;
	  var using = extractedUsing[def.is];
	  for (var k in using) {
	    var comp = using[k];
	    if (!compFounded[comp]) recurseUsedComponents(ret, comp, compFounded, compName);
	  }
	  var behKeys = extractedBehaviorImports[def.is];
	  if (behKeys) {
	    for (var i = 0; i < behKeys.length; i++) {
	      var beh = behKeys[i];
	      if (!compFounded[beh]) recurseUsedBehaviors(ret, beh, compFounded);
	    }
	  }
	};
	
	var extractCompDef = function extractCompDef(def, tmplPath) {
	  var props = {};
	  for (var k in def.properties) {
	    var prop = def.properties[k];
	    if (prop === null) {
	      props[k] = {
	        type: null
	      };
	    } else if (prop === Number || prop === String || prop === Boolean || prop === Object || prop === Array) {
	      props[k] = {
	        type: prop.name
	      };
	    } else {
	      if (prop.public === undefined || prop.public) {
	        props[k] = {
	          type: prop.type === null ? null : prop.type.name,
	          value: prop.value
	        };
	      }
	    }
	  }
	  return {
	    is: def.is,
	    using: def.using,
	    generics: def.generics,
	    behaviors: def.behaviors,
	    data: def.data,
	    properties: props,
	    externalClasses: def.externalClasses,
	    template: tmplPath,
	    options: {
	      domain: def.options.domain,
	      writeOnly: def.options.writeOnly || undefined,
	      multipleSlots: def.options.multipleSlots || undefined,
	      writeIdToDOM: def.options.writeIdToDOM || undefined
	    }
	  };
	};
	
	var filterBehaviors = function filterBehaviors(def) {
	  if (!def.behaviors) {
	    def.behaviors = null;
	    return;
	  }
	  var behaviors = [];
	  for (var j = 0; j < def.behaviors.length; j++) {
	    var behaviorName = String(def.behaviors[j]);
	    if (behaviorName[0] !== '/' && behaviorName.slice(0, 5) !== 'wx://') throw new Error('Behaviors should be constructed with Behavior()');
	    behaviors.push(behaviorName);
	  }
	  def.behaviors = behaviors;
	  extractedBehaviorImports[def.is] = behaviors;
	};
	
	// constructor defs
	
	var Behavior = exports.Behavior = function Behavior(def) {
	  def.is = '/' + behaviorIdInc++ + '/' + (0, _utils.guid)();
	  filterBehaviors(def);
	  def.options = BEHAVIOR_OPTIONS;
	  extractedBehaviorDef[def.is] = extractCompDef(def);
	  exparser.registerBehavior(def);
	  return def.is;
	};
	
	var getExparserNodePluginId = function getExparserNodePluginId(node) {
	  return exparser.Component.getComponentOptions(node).domain.split('/', 1)[0];
	};
	
	var getExparserNode = function getExparserNode(caller) {
	  return callerExparserNodeMap.get(caller);
	};
	
	var getSelectComponentResult = function getSelectComponentResult(hostDomain, selected, caller) {
	  var selectedDomain = exparser.Component.getComponentOptions(selected).domain;
	  var selectedFilter = exparser.Component.getMethod(selected, '__export__');
	  var defaultResult = selectedDomain === hostDomain ? exparser.Element.getMethodCaller(selected) : null;
	  if (selectedFilter) {
	    var arg = selectedDomain === hostDomain ? caller : null;
	    var res = selectedFilter.call(selected, arg);
	    return res === undefined ? defaultResult : res;
	  }
	  return defaultResult;
	};
	
	var selectComponent = function selectComponent(caller, selector, multi) {
	  var host = getExparserNode(caller);
	  var hostDomain = exparser.Component.getComponentOptions(host).domain;
	  var node = host.shadowRoot;
	  if (multi) {
	    var _selected = node.querySelectorAll(selector);
	    return _selected.map(function (n) {
	      return getSelectComponentResult(hostDomain, n, caller);
	    });
	  }
	  var selected = node.querySelector(selector);
	  if (!selected) return null;
	  return getSelectComponentResult(hostDomain, selected, caller);
	};
	
	var getRelationNodes = function getRelationNodes(caller, relationKey) {
	  var node = getExparserNode(caller);
	  var res = node.getRelationNodes(relationKey);
	  if (res === null) return null;
	  return res.map(function (n) {
	    return exparser.Element.getMethodCaller(n);
	  });
	};
	
	// base class
	function CustomComponent() {}
	var ComponentPrototype = CustomComponent.prototype = Object.create(Object.prototype, {
	  is: {
	    get: function get() {
	      return getExparserNode(this).is;
	    },
	    set: function set() {}
	  },
	  id: {
	    get: function get() {
	      var node = getExparserNode(this);
	      if (exparser.Component.getComponentOptions(node).writeOnly) return '';
	      return node.id;
	    },
	    set: function set() {}
	  },
	  dataset: {
	    get: function get() {
	      var node = getExparserNode(this);
	      if (exparser.Component.getComponentOptions(node).writeOnly) return null;
	      return node.dataset;
	    },
	    set: function set() {}
	  },
	  properties: {
	    get: function get() {
	      return this.__data__;
	    },
	    set: function set() {}
	  },
	  data: {
	    get: function get() {
	      return this.__data__;
	    },
	    set: function set() {}
	  },
	  setData: {
	    value: function value(newData, callback) {
	      var exparserNode = getExparserNode(this);
	      var tm = exparserNode.__treeManager__;
	      if (typeof callback === 'function') {
	        tm.layoutReadyFuncs.push(callback.bind(this));
	      }
	      return exparserNode.setData(newData);
	    }
	  },
	  replaceDataOnPath: {
	    value: function value(path, newData) {
	      return getExparserNode(this).replaceDataOnPath(path, newData);
	    }
	  },
	  mergeDataOnPath: {
	    value: function value(path, newData) {
	      return getExparserNode(this).mergeDataOnPath(path, newData);
	    }
	  },
	  applyDataUpdates: {
	    value: function value() {
	      return getExparserNode(this).applyDataUpdates();
	    }
	  },
	  hasBehavior: {
	    value: function value(behavior) {
	      return getExparserNode(this).hasBehavior(behavior);
	    }
	  },
	  triggerEvent: {
	    value: function value(name, detail, options) {
	      return getExparserNode(this).triggerEvent(name, detail, options);
	    }
	  },
	  createSelectorQuery: {
	    value: function value() {
	      return __appServiceSDK__._createSelectorQuery({}, getExparserNodePluginId(getExparserNode(this))).in(this);
	    }
	  },
	  createIntersectionObserver: {
	    value: function value(options) {
	      return __appServiceSDK__._createIntersectionObserver(this, options, getExparserNodePluginId(getExparserNode(this)));
	    }
	  },
	  selectComponent: {
	    value: function value(selector) {
	      var node = getExparserNode(this);
	      if (exparser.Component.getComponentOptions(node).writeOnly) return null;
	      return selectComponent(this, selector, false);
	    }
	  },
	  selectAllComponents: {
	    value: function value(selector) {
	      var node = getExparserNode(this);
	      if (exparser.Component.getComponentOptions(node).writeOnly) return [];
	      return selectComponent(this, selector, true);
	    }
	  },
	  getRelationNodes: {
	    value: function value(relationKey) {
	      return getRelationNodes(this, relationKey);
	    }
	  }
	});
	
	var registerSimpleComponent = function registerSimpleComponent(def, is, json, domain, codeMap) {
	  var compDef = {
	    is: is,
	    using: getUsingByPath(is, codeMap),
	    properties: def.properties,
	    externalClasses: def.externalClasses,
	    options: COMPONENT_OPTIONS
	  };
	  var userOptions = def.options || {};
	  compDef.options = COMPONENT_OPTIONS;
	  compDef.options.multipleSlots = userOptions.multipleSlots || false;
	  compDef.options.writeOnly = true;
	  compDef.options.writeIdToDOM = false;
	  compDef.options.domain = 'simple://' + (domain || '/');
	  extractedComponentDef[is] = extractCompDef(compDef, is + '.wxml');
	  return compDef.is;
	};
	
	/* eslint-disable no-invalid-this */
	var registerByDef = function registerByDef(def, codeMap) {
	  // register to exparser
	  def.using = extractedUsing[def.is] = getUsingByPath(def.is, codeMap);
	  def.generics = getGenericsByPath(def.is, codeMap);
	  filterBehaviors(def);
	  var wxmlPath = def.is + '.wxml';
	  def.template = {
	    func: codeMap[wxmlPath] || null
	  };
	  extractedComponentDef[def.is] = extractCompDef(def, wxmlPath);
	  var compDef = exparser.registerElement(def);
	  // create caller prototype
	  var ret = Object.create(ComponentPrototype, {
	    constructor: {
	      value: CustomComponent
	    }
	  });
	  exparser.Behavior.prepare(compDef.behavior);
	  var defMethods = compDef.behavior.methods;
	  for (var k in defMethods) {
	    ret[k] = defMethods[k];
	  }
	  return ret;
	};
	
	var Component = exports.Component = function Component(def, domain, wxAppCode, wxAppCurrentFile) {
	  var filePath = wxAppCurrentFile || __wxAppCurrentFile__;
	  var codeMap = wxAppCode || __wxAppCode__;
	  var json = codeMap[filePath + 'on'];
	  if (!filePath || !json) {
	    console.error('Component constructors should be called while initialization. A constructor call has been ignored.');
	    return;
	  }
	  if (json.component && json.component.type === 'simple') {
	    var is = filePath.slice(0, -3);
	    registerSimpleComponent(def, is, json, domain, codeMap);
	    return is;
	  }
	  var compDef = {
	    is: filePath.slice(0, -3),
	    properties: def.properties,
	    data: def.data,
	    methods: def.methods,
	    behaviors: def.behaviors,
	    created: def.created,
	    attached: def.attached,
	    ready: def.ready,
	    moved: def.moved,
	    detached: def.detached,
	    saved: def.saved,
	    restored: def.restored,
	    relations: def.relations ? processRelationPaths(filePath, def.relations) : undefined,
	    externalClasses: def.externalClasses,
	    options: COMPONENT_OPTIONS,
	    initiator: function initiator() {
	      this.__customConstructor__ = Component;
	      var compCaller = Object.create(compCallerProto);
	      callerExparserNodeMap.set(compCaller, this);
	      exparser.Element.setMethodCaller(this, compCaller);
	      Object.defineProperties(compCaller, {
	        '__viewData__': {
	          value: this.data,
	          writable: true,
	          enumerable: false
	        },
	        '__data__': {
	          value: (0, _deep_copy.deepCopy)(this.data, false),
	          writable: true,
	          enumerable: false
	        },
	        '__wxWebviewId__': {
	          value: this.__treeManager__.viewId,
	          writable: true,
	          enumerable: false
	        }
	      });
	    }
	  };
	  var userOptions = def.options || {};
	  compDef.options = COMPONENT_OPTIONS;
	  compDef.options.multipleSlots = userOptions.multipleSlots || false;
	  compDef.options.writeOnly = userOptions.writeOnly || false;
	  compDef.options.writeIdToDOM = false;
	  compDef.options.domain = (userOptions.writeOnly ? 'wo://' : '') + (domain || '/');
	  var compCallerProto = registerByDef(compDef, codeMap, Component);
	  return compDef.is;
	};
	
	var Page = exports.Page = function Page(def, domain, wxAppCode, wxAppCurrentFile) {
	  var filePath = wxAppCurrentFile || __wxAppCurrentFile__;
	  if (!filePath) {
	    console.error('Page constructors should be called while initialization. A constructor call has been ignored.');
	    return;
	  }
	  var codeMap = wxAppCode || __wxAppCode__;
	  var freeData = Object.create(null);
	  var methods = Object.create(null);
	  for (var k in def) {
	    if (k === 'data') continue;
	    if (typeof def[k] === 'function') {
	      methods[k] = def[k];
	    } else {
	      freeData[k] = def[k];
	    }
	  }
	  var compDef = {
	    is: filePath.slice(0, -3),
	    data: def.data,
	    methods: methods,
	    options: COMPONENT_OPTIONS,
	    initiator: function initiator() {
	      this.__customConstructor__ = Page;
	      var compCaller = Object.create(compCallerProto);
	      callerExparserNodeMap.set(compCaller, this);
	      exparser.Element.setMethodCaller(this, compCaller);
	      Object.defineProperties(compCaller, {
	        '__viewData__': {
	          value: this.data,
	          writable: true,
	          enumerable: false
	        },
	        '__data__': {
	          value: (0, _deep_copy.deepCopy)(this.data, false),
	          writable: true,
	          enumerable: false
	        },
	        '__wxWebviewId__': {
	          value: this.__treeManager__.viewId,
	          writable: true,
	          enumerable: false
	        }
	      });
	      // TODO 看起来下面这句是没必要的，因为怕出问题，这里先留着（而且这里赋的值是 undefined ）
	      compCaller.__wxExparserNodeId__ = this.__treeManager__.nodeId.getNodeId(this);
	    }
	  };
	  compDef.options.multipleSlots = false;
	  compDef.options.writeOnly = false;
	  compDef.options.writeIdToDOM = true;
	  compDef.options.domain = domain || '/';
	  var compCallerProto = registerByDef(compDef, codeMap, Page);
	  compCallerProto.__freeData__ = freeData;
	  return compDef.is;
	};
	
	// node id interfaces
	var getNodeById = exports.getNodeById = function getNodeById(id, webviewId) {
	  if ((0, _bridge.isDataThread)()) {
	    var tm = _tree_manager2.default.get(webviewId);
	    return tm ? tm.nodeId.getNodeById(id) : null;
	  }
	  if (!_tree_manager2.default.instance) return null;
	  return _tree_manager2.default.instance.nodeId.getNodeById(id);
	};
	var getNodeId = exports.getNodeId = function getNodeId(node, webviewId) {
	  if ((0, _bridge.isDataThread)()) {
	    var tm = _tree_manager2.default.get(webviewId);
	    return tm.nodeId.getNodeId(node);
	  }
	  if (!_tree_manager2.default.instance) return '';
	  return _tree_manager2.default.instance.nodeId.getNodeId(node);
	};
	var getRootNodeId = exports.getRootNodeId = function getRootNodeId(webviewId) {
	  if ((0, _bridge.isDataThread)()) {
	    var tm = _tree_manager2.default.get(webviewId);
	    if (!tm) return '';
	    return tm.rootNodeId;
	  }
	  return _tree_manager2.default.instance.rootNodeId;
	};
	
	// listen to sync event flow, meaningful in view thread
	var flowUpdate = function flowUpdate(tm) {
	  if (!tm.flowInited) return flowInit(tm);
	  var operationIterator = tm.operationFlow.iterator;
	  operationIterator.expectStart();
	  var step = operationIterator.nextStep();
	  if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_UPDATE) throw new Error('Expect FLOW_UPDATE but get another');
	  var node = tm.nodeId.getNodeById(step[1]);
	  var changes = step[2];
	  if (node && changes.length) {
	    exparser.Component.getDataProxy(node).setChanges(changes);
	    node.applyDataUpdates();
	  }
	  operationIterator.expectEnd();
	};
	var flowInit = function flowInit(tm) {
	  tm.flowInited = true;
	  var operationIterator = tm.operationFlow.iterator;
	  operationIterator.expectStart();
	  var step = operationIterator.nextStep();
	  if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION) {
	    tm.flowInited = false;
	    throw new Error('Expect FLOW_INITIAL_CREATION but get another (ignoring data updates)');
	  }
	  var tagName = step[1];
	  tm.rootNodeId = step[2];
	  if (tm.rootNodeId == null) tm.rootNodeId = -1; // HACK compatible with old appservice (may occur in iOS <= 6.6.1)
	  var root = window.__DOMTree__ = exparser.createElement('body', exparser.Component._list[tagName]);
	  tm.nodeId.allocNodeId(root, tm.rootNodeId);
	  root.setAttribute('is', tagName);
	  if (_save_restore_view2.default.restoring) {
	    var statesData = _save_restore_view2.default.idDataMap[tm.nodeId.getNodeId(root)];
	    exparser.Component.replaceWholeData(root, statesData);
	    _save_restore_view2.default.callRestoredLifeTimes(_save_restore_view2.default.restoring);
	    _save_restore_view2.default.restoring = null;
	    _save_restore_view2.default.idDataMap = null;
	  }
	  step = operationIterator.nextStep();
	  if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION) throw new Error('Expect FLOW_INITIAL_CREATION but get another');
	  tm.nodeId.addNode(root);
	  document.body = root.$$;
	  exparser.Element.pretendAttached(root);
	  operationIterator.expectEnd();
	};
	var initViewThread = exports.initViewThread = function initViewThread() {
	  _operation_flow2.default.setStartOperation(flowUpdate);
	  _tree_manager2.default.instance = new _tree_manager2.default(0);
	};
	
	// in view thread and usingCustomComponents mode, waiting SYNC_EVENT_NAME.COMPONENT_DEF to get custom component defs
	var TYPE_STRING_NAME = {
	  String: String,
	  Number: Number,
	  Boolean: Boolean,
	  Object: Object,
	  Array: Array,
	  null: null
	};
	var onComponentDef = function onComponentDef(data) {
	  _save_restore_view2.default.registerSavingListener();
	  _tree_manager2.default.instance.flowInited = false;
	
	  var _data = _slicedToArray(data, 4),
	      behDefs = _data[0],
	      compDefs = _data[1],
	      rootCompName = _data[2],
	      compAliases = _data[3];
	  // register all behaviors
	
	
	  for (var i = 0; i < behDefs.length; i++) {
	    var def = behDefs[i];
	    def.options = BEHAVIOR_OPTIONS;
	    exparser.registerBehavior(def);
	  }
	  // collect all component names for generating short names
	  var compNames = [];
	  for (var _i3 = 0; _i3 < compDefs.length; _i3++) {
	    compNames.push(compDefs[_i3].is);
	  }
	  var shortNameMap = generateClassPrefixMap(compNames);
	  // register all components and insert their css
	  var platform = wx.getPlatform(); // HACK compatible with old appservice (may occur in iOS <= 6.6.1)
	  for (var _i4 = 0; _i4 < compDefs.length; _i4++) {
	    var _def = compDefs[_i4];
	    for (var k in _def.properties) {
	      _def.properties[k].type = TYPE_STRING_NAME[_def.properties[k].type];
	    }
	    var compName = _def.is;
	    var classPrefix = compName === rootCompName ? '' : shortNameMap[_def.is];
	    var options = _def.options;
	    var workAsOldPage = !!(options.writeIdToDOM && _def.is === rootCompName);
	    _def.options = COMPONENT_OPTIONS_VIEW;
	    _def.options.classPrefix = classPrefix;
	    _def.options.multipleSlots = options.multipleSlots || false;
	    _def.options.writeOnly = options.writeOnly || false;
	    _def.options.writeIdToDOM = workAsOldPage;
	    _def.options.domain = options.domain;
	    _def.template = {
	      func: __wxAppCode__[_def.template]
	
	      // HACK compatible with old appservice (may occur in iOS <= 6.6.1)
	    };if (platform === 'ios') {
	      var needFilter = false;
	      for (var _k in _def.using) {
	        if (_k.slice(0, 3) !== 'wx-') {
	          needFilter = true;
	          break;
	        }
	      }
	      if (needFilter) {
	        var newUsing = {};
	        for (var _k2 in _def.using) {
	          newUsing['wx-' + _k2] = _def.using[_k2];
	        }
	        _def.using = newUsing;
	      }
	    }
	
	    exparser.registerElement(_def);
	    var insertWxss = __wxAppCode__[_def.is + '.wxss'];
	    if (insertWxss && _def.is !== rootCompName) insertWxss(classPrefix && classPrefix + '--', { allowIllegalSelector: workAsOldPage });
	  }
	  // register aliases
	  if (compAliases == null) compAliases = {}; // HACK compatible with old appservice (may occur in iOS <= 6.6.1)
	  for (var _k3 in compAliases) {
	    exparser.Component._list[_k3] = exparser.Component._list[compAliases[_k3]];
	  }
	};
	var isGenerateFuncReady = false;
	var componentDefData = null;
	(0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.COMPONENT_DEF, function (data) {
        console.log(isGeneratFuncRead, "??")
	  if (!isGenerateFuncReady) {
	    componentDefData = data;
	  } else {
	    onComponentDef(data);
	  }
	}, 0);
	var runComponentDef = exports.runComponentDef = function runComponentDef() {
	  isGenerateFuncReady = true;
	
	  if (componentDefData) {
	    onComponentDef(componentDefData);
	    componentDefData = null;
	  }
	};
	
	var doDataThreadInitCreation = function doDataThreadInitCreation(viewId, tm, rootCompName) {
	  // do initial creation, this function should only execute on data thread
	  rootCompName = (0, _route_utils.convertRouteToComponentAlias)(rootCompName);
	  var usedDef = [[], [], rootCompName, componentAliases];
	  recurseUsedComponents(usedDef, rootCompName, Object.create(null), '');
	  (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.COMPONENT_DEF, usedDef, viewId);
	  (0, _ban.sendBannedMap)(viewId);
	  tm.rootCompName = rootCompName;
	  tm.rootNodeId = (0, _utils.guid)();
	  tm.operationFlow.start();
	  tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION, rootCompName, tm.rootNodeId]);
	  var root = exparser.createElement('body', exparser.Component._list[rootCompName], tm);
	  tm.root = root;
	  tm.usedDef = usedDef;
	  var caller = exparser.Element.getMethodCaller(root);
	  caller.__wxExparserNodeId__ = tm.nodeId.allocNodeId(root, tm.rootNodeId);
	  tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION]);
	  tm.nodeId.addNode(root);
	  return root;
	};
	
	var registerDataEventListener = function registerDataEventListener(viewId, tm) {
	  (0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.WX_EVENT, function (data) {
	    var e = data[2];
	    var funcName = data[1];
	    var host = tm.nodeId.getNodeById(data[0]);
	    if (!host) return;
	    var caller = exparser.Element.getMethodCaller(host);
	    if (e._requireActive) {
	      /* globals __appServiceEngine__:false */
	      var currentPages = __appServiceEngine__.getCurrentPagesByDomain('');
	      var requireActivePage = currentPages[currentPages.length - 1];
	      if (requireActivePage.__wxWebviewId__ !== viewId) {
	        return;
	      }
	    }
	    if (typeof caller[funcName] !== 'function') {
	      console.warn('Component "' + host.is + '" does not have a method "' + funcName + '" to handle event "' + e.type + '".');
	    } else {
	      exparser.safeCallback('Event Handler', caller[funcName], caller, [e]);
	    }
	  }, viewId);
	  (0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.LAYOUT_READY, function () {
	    var funcs = tm.layoutReadyFuncs;
	    tm.layoutReadyFuncs = [];
	    for (var i = 0; i < funcs.length; i++) {
	      funcs[i]();
	    }
	  }, viewId);
	  (0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.REQUEST_SAVE, function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 1),
	        statesData = _ref2[0];
	
	    (0, _save_restore_data.saveView)(viewId, statesData);
	  }, viewId);
	};
	
	// data thread API provided to SDK
	var addView = exports.addView = function addView(viewId, rootCompPath) {
	  var tm = _tree_manager2.default.create(viewId);
	  tm.operationFlow.unblock();
	  registerDataEventListener(viewId, tm);
	  var ret = doDataThreadInitCreation(viewId, tm, rootCompPath);
	  return ret;
	};
	var attachView = exports.attachView = function attachView(viewId) {
	  var tm = _tree_manager2.default.get(viewId);
	  if (!tm) return;
	  exparser.Element.pretendAttached(tm.root);
	  tm.root.__treeManager__.operationFlow.end();
	};
	var removeView = exports.removeView = function removeView(viewId) {
	  var tm = _tree_manager2.default.get(viewId);
	  if (!tm) return;
	  exparser.Element.pretendDetached(tm.root);
	  _tree_manager2.default.destroy(viewId);
	  (0, _bridge.removeDataListeners)(viewId);
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tmpl = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(5);
	
	var _virtual_node = __webpack_require__(21);
	
	var _virtual_node2 = _interopRequireDefault(_virtual_node);
	
	var _virtual_text = __webpack_require__(29);
	
	var _virtual_text2 = _interopRequireDefault(_virtual_text);
	
	var _utils = __webpack_require__(2);
	
	var _bridge = __webpack_require__(18);
	
	var _merger = __webpack_require__(30);
	
	var _deep_copy = __webpack_require__(31);
	
	var _save_restore_view = __webpack_require__(24);
	
	var _save_restore_view2 = _interopRequireDefault(_save_restore_view);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_VIRTUAL_TREE = {
	  tag: 'shadow',
	  children: []
	
	  // 让VD作为exparser模版引擎工作的wrapper
	
	};var createElement = function createElement(tagName, gfNode, children) {
	  if (tagName === 'wx-slot') {
	    tagName = 'slot';
	  }
	  return new _virtual_node2.default(tagName, gfNode, children);
	};
	
	var createVirtualTree = function createVirtualTree(obj) {
	  if ((0, _utils.isString)(obj) || Number(obj) === obj && Number(obj) % 1 === 0) {
	    return new _virtual_text2.default(String(obj));
	  }
	  var children = [];
	  obj.children.forEach(function (child) {
	    children.push(createVirtualTree(child));
	  });
	  var tagName = obj.tag === 'wx-slot' ? 'slot' : obj.tag;
	  return createElement(tagName, obj, children);
	};
	
	var getVirtualTree = function getVirtualTree(func, data) {
	  var vtObj = func ? func(data, null, global) : DEFAULT_VIRTUAL_TREE;
	  vtObj.tag = 'shadow';
	  return createVirtualTree(vtObj);
	};
	
	// eslint-disable-next-line no-unused-vars
	var createTmpl = function createTmpl(behavior, initValues, componentOptions) {
	  var tmpl = new Tmpl();
	  tmpl._initValues = initValues;
	  tmpl._data = initValues;
	  tmpl._generateFunc = behavior.template.func;
	  tmpl._virtualTree = getVirtualTree(tmpl._generateFunc, tmpl._data);
	  tmpl._isSimpleComponent = componentOptions.domain.slice(0, 9) === 'simple://';
	  return tmpl;
	};
	
	var collectIdMapAndSlots = function collectIdMapAndSlots(node, idMap, slots) {
	  var children = node.childNodes;
	  for (var i = 0; i < children.length; i++) {
	    var child = children[i];
	    if (child instanceof exparser.TextNode) continue;
	    if (child.__id) idMap[child.__id] = child;
	    if (child.__slotName !== undefined) slots[child.__slotName] = child;
	    collectIdMapAndSlots(child, idMap, slots);
	  }
	};
	
	var Tmpl = exports.Tmpl = function () {
	  function Tmpl() {
	    _classCallCheck(this, Tmpl);
	  }
	
	  _createClass(Tmpl, [{
	    key: 'createInstance',
	
	    // eslint-disable-next-line no-unused-vars
	    value: function createInstance(elem, customArgs) {
	      // 构建 shadow root
	      var inst = new TmplInstance();
	      var tm = customArgs;
	      if (!(0, _bridge.isDataThread)()) {
	        tm = _tree_manager2.default.instance;
	      }
	      inst._generateFunc = this._generateFunc;
	      inst.data = (0, _deep_copy.deepCopy)(this._initValues);
	      inst.idMap = Object.create(null);
	      inst.slots = Object.create(null);
	      if (_save_restore_view2.default.restoring) {
	        if (_save_restore_view2.default.compIdArrIndex >= _save_restore_view2.default.compIdArr.length) throw new Error('Component count unmatched while page recovering');
	        tm.nodeId.allocNodeId(elem, _save_restore_view2.default.compIdArr[_save_restore_view2.default.compIdArrIndex++]);
	        var statesData = _save_restore_view2.default.idDataMap[tm.nodeId.getNodeId(elem)];
	        inst._virtualTree = getVirtualTree(this._generateFunc, statesData);
	      } else {
	        inst._virtualTree = this._virtualTree;
	      }
	      inst.shadowRoot = inst._virtualTree.render(elem, null, customArgs);
	      collectIdMapAndSlots(inst.shadowRoot, inst.idMap, inst.slots);
	      inst.listeners = [];
	      if (!this._isSimpleComponent) elem.__component__ = true;
	      if ((0, _bridge.isDataThread)()) {
	        elem.__treeManager__ = tm;
	        inst.shadowRoot.__treeManager__ = tm;
	        tm.layoutReadyFuncs.push(function () {
	          elem.triggerLifeTime('ready');
	        });
	      }
	      return inst;
	    }
	  }]);
	
	  return Tmpl;
	}();
	
	Tmpl.create = createTmpl;
	
	var TmplInstance = function () {
	  function TmplInstance() {
	    _classCallCheck(this, TmplInstance);
	  }
	
	  _createClass(TmplInstance, [{
	    key: 'updateValues',
	    value: function updateValues(node, data, changedPaths, changedValues, changes, inferredData) {
	      if (_save_restore_view2.default.restoring) return;
	      // NOTE filter is not supported because changing props in component impl is not encouraged
	
	      // generate sync bit
	      var tm = null;
	      if (!inferredData && (0, _bridge.isDataThread)()) {
	        tm = node.__treeManager__;
	        tm.operationFlow.start(Date.now());
	        var filteredChanges = [];
	        changes.forEach(function (item) {
	          if (item[2] !== undefined) filteredChanges.push(item);else console.error('Setting data field "' + item[1].join('.') + '" to undefined is invalid.');
	        });
	        tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_UPDATE, tm.nodeId.getNodeId(node), filteredChanges]);
	        (0, _merger.mergeData)(exparser.Element.getMethodCaller(node).__data__, filteredChanges, changedValues, false);
	      } else if ((0, _bridge.isDataThread)()) {
	        (0, _merger.mergeData)(exparser.Element.getMethodCaller(node).__data__, changes, changedValues, true);
	      }
	
	      // prepare data
	      var needClonedData = !(0, _utils.getWxmlVersionTag)('propValueDeepCopy');
	      var mergedData = (0, _merger.mergeDataWithSpec)(data, changes, true, false, needClonedData);
	      var newVirtualTree = getVirtualTree(this._generateFunc, mergedData);
	      (0, _merger.mergeDataWithSpec)(data, changes, false, !inferredData, false);
	
	      // apply changes
	      var patches = this._virtualTree.diff(newVirtualTree);
	      this._virtualTree = newVirtualTree;
	      patches.apply(this.shadowRoot);
	
	      // generate sync bit
	      if (!inferredData && (0, _bridge.isDataThread)()) {
	        tm.operationFlow.end();
	      }
	    }
	  }]);

	  return TmplInstance;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(5);
	
	var _utils = __webpack_require__(2);
	
	var _prop_utils_custom = __webpack_require__(22);
	
	var _diff_utils_custom = __webpack_require__(25);
	
	var _virtual_text = __webpack_require__(29);
	
	var _virtual_text2 = _interopRequireDefault(_virtual_text);
	
	var _bridge = __webpack_require__(18);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	var _ban = __webpack_require__(23);
	
	var _save_restore_view = __webpack_require__(24);
	
	var _save_restore_view2 = _interopRequireDefault(_save_restore_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global wxConsole: false */
	
	var domainAppearedInPage = {};
	
	var reportPluginNodeCreation = function reportPluginNodeCreation(node, tm) {
	  var domain = exparser.Component.getComponentOptions(node).domain;
	  if (domain === '/' || domain === '//' || !domain) return;
	  var pluginId = domain.split('/', 1)[0];
	  var viewId = tm.viewId;
	  if (!domainAppearedInPage[viewId]) domainAppearedInPage[viewId] = {};
	  if (domainAppearedInPage[viewId][pluginId]) return;
	  domainAppearedInPage[pluginId] = true;
	  var version = __appServiceSDK__.pluginInfos[pluginId].version;
	
	  wxConsole.log('[Plugin] plugin ' + pluginId + ' ver ' + version + ' used in page ' + tm.rootCompName);
	
	  var value = [pluginId, // pluginId
	  version, // pluginVersion
	  tm.rootCompName].map(encodeURIComponent).join(',');
	
	  if (typeof Reporter === 'undefined') return;
	
	  Reporter.reportKeyValue({
	    key: 'PluginDisplay',
	    value: value
	  });
	  Reporter.reportIDKey({
	    key: 'pluginDisplayInPage'
	  });
	};
	
	var VirtualNode = function () {
	  /**
	  * @synopsis Construcor of VirtualNode
	  *
	  * @param {string} tagName - Tag name of the node
	  * @param {!Object} props - Properties of the node
	  * @param {!Array<VirtualNode|string>} children - Children of the node
	  */
	  function VirtualNode(tagName, gfNode, children) {
	    _classCallCheck(this, VirtualNode);
	
	    this.tagName = tagName || '';
	    this.props = gfNode.attr || {};
	    this.specProps = gfNode.raw || {};
	    this.children = children || [];
	    this.newProps = gfNode.n || [];
	    this.wxVkey = gfNode.wxVkey;
	    this.wxXCkey = gfNode.wxXCkey;
	    this.generics = gfNode.generics;
	    this.extraAttr = gfNode.extraAttr;
	
	    /**
	     * Key to identify node when diffing.
	     * {string}
	     */
	    var wxKey = gfNode.wxKey;
	    if ((0, _utils.isUndefined)(wxKey) || (0, _utils.isNull)(wxKey)) {
	      this.wxKey = undefined;
	    } else {
	      this.wxKey = String(wxKey);
	    }
	
	    /**
	     * Count of descendants.
	     * {number}
	     */
	    this.descendants = 0;
	    for (var i = 0; i < this.children.length; ++i) {
	      var child = this.children[i];
	      if ((0, _utils.isVirtualNode)(child)) {
	        this.descendants += child.descendants;
	      } else if ((0, _utils.isString)(child)) {
	        this.children[i] = new _virtual_text2.default(child);
	      } else if (!(0, _utils.isVirtualText)(child)) {
	        // eslint-disable-next-line no-console
	        console.log('invalid child', tagName, this.props, children, child);
	      }
	      ++this.descendants;
	    }
	  }
	
	  // eslint-disable-next-line complexity
	
	
	  _createClass(VirtualNode, [{
	    key: 'render',
	    value: function render(shadowRootHost, shadowRoot, tm) {
	      var domNode = null;
	      if (this.tagName === 'shadow') {
	        shadowRoot = domNode = exparser.ShadowRoot.create(shadowRootHost);
	
	        if (shadowRootHost.__createdInOwnerShadowRoot && shadowRootHost.__createdInOwnerShadowRoot.__childrenPropsFilter) {
	          // inherit the children props filter from owner shadow root
	          if (shadowRoot.__childrenPropsFilter) {
	            for (var k in shadowRootHost.__createdInOwnerShadowRoot.__childrenPropsFilter) {
	              if (shadowRoot.__childrenPropsFilter[k]) continue;
	              shadowRoot.__childrenPropsFilter[k] = shadowRootHost.__createdInOwnerShadowRoot.__childrenPropsFilter[k];
	            }
	          } else {
	            shadowRoot.__childrenPropsFilter = shadowRootHost.__createdInOwnerShadowRoot.__childrenPropsFilter;
	          }
	        }
	      } else if (this.tagName === 'virtual') {
	        var virtualTagName = 'virtual';
	        if (this.wxXCkey === 1 || this.wxXCkey === 3) virtualTagName = 'wx:if';else if (this.wxXCkey === 2 || this.wxXCkey === 4) virtualTagName = 'wx:for';
	        domNode = exparser.VirtualNode.create(virtualTagName);
	        exparser.Element.setInheritSlots(domNode);
	        if ((0, _bridge.isDataThread)()) domNode.__treeManager__ = tm;else domNode.__wxVkey__ = this.wxVkey;
	      } else if (this.tagName === 'slot') {
	        domNode = exparser.VirtualNode.create('slot');
	        exparser.Element.setSlotName(domNode, '');
	      } else {
	        var _isCustomComp = shadowRoot.tagNameUsed(this.tagName);
	        if ((0, _bridge.isDataThread)() && !_isCustomComp) {
	          // wx-comp 在 data 侧被渲染为 exparser.VirtualNode
	          domNode = exparser.VirtualNode.create(this.tagName);
	          domNode.__treeManager__ = tm;
	        } else {
	          // 创建组件节点
	          domNode = shadowRoot.createComponent(this.tagName, undefined, this.generics, tm);
	          // 在 data 侧创建插件节点时触发上报
	          if ((0, _bridge.isDataThread)()) reportPluginNodeCreation(domNode, tm);
	        }
	      }
	      if (this.wxXCkey === 3 || this.wxXCkey === 4) {
	        // 未被剪枝的 wx:if 和 wx:for
	        domNode.__wxDynamicSync__ = this.wxXCkey === 4 ? 'wx:for' : 'wx:if';
	      }
	
	      if (this.extraAttr) {
	        for (var _k in this.extraAttr) {
	          domNode.setAttribute(_k, this.extraAttr[_k]);
	        }
	      }
	
	      // sync bit
	      var isCustomComp = domNode.__component__;
	      if (isCustomComp) {
	        if ((0, _bridge.isDataThread)()) {
	          exparser.Element.getMethodCaller(domNode).__wxExparserNodeId__ = tm.nodeId.allocNodeId(domNode, '');
	          tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_CREATE_NODE, tm.nodeId.getNodeId(domNode)]);
	        } else {
	          tm = _tree_manager2.default.instance;
	          if (_save_restore_view2.default.restoring) {
	            var statesData = _save_restore_view2.default.idDataMap[tm.nodeId.getNodeId(domNode)];
	            exparser.Component.replaceWholeData(domNode, statesData);
	          } else {
	            var operationIterator = tm.operationFlow.iterator;
	            var step = operationIterator.nextStep();
	            if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_CREATE_NODE) throw new Error('Expect FLOW_CREATE_NODE but get another');
	            tm.nodeId.allocNodeId(domNode, step[1]);
	          }
	          if ((0, _bridge.inDevtoolsWebview)()) domNode.setAttribute('exparser:info-custom-component', domNode.__componentInstanceId);
	          (0, _ban.checkAndBanComponent)(domNode);
	          domNode.setAttribute('is', domNode.is);
	        }
	      }
	
	      (0, _prop_utils_custom.applyProperties)(domNode, this.props, this.specProps);
	
	      this.children.forEach(function (child) {
	        var childNode = child.render(null, shadowRoot, tm);
	        domNode.appendChild(childNode);
	      });
	      return domNode;
	    }
	
	    /**
	    * @synopsis Diffing with new tree to get patches
	    *
	    * @param newTree {VirtualNode}
	    * @return {VirtualPatches}
	    */
	
	  }, {
	    key: 'diff',
	    value: function diff(newTree) {
	      return (0, _diff_utils_custom.diff)(this, newTree);
	    }
	  }]);
	
	  return VirtualNode;
	}();
	
	VirtualNode.prototype.type = 'WxVirtualNode';
	
	exports.default = VirtualNode;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.applyProperties = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _constants = __webpack_require__(5);
	
	var _case_map = __webpack_require__(4);
	
	var _bridge = __webpack_require__(18);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	var _ban = __webpack_require__(23);
	
	var _save_restore_view = __webpack_require__(24);
	
	var _save_restore_view2 = _interopRequireDefault(_save_restore_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable dot-notation */
	
	var transformRpx = typeof wx !== 'undefined' && wx.transformRpx;
	var getComponentOptions = exparser.Component.getComponentOptions;
	
	var getExparserNode = function getExparserNode(caller) {
	  if ((0, _bridge.isDataThread)() && caller instanceof exparser.Component) {
	    return _tree_manager2.default.get(caller.__wxWebviewId__).nodeId.getNodeById(caller.__wxExparserNodeId__);
	  }
	  return caller;
	};
	
	var convertEventTargetWithPos = function convertEventTargetWithPos(targetCaller, inWriteOnly, currentTargetCaller) {
	  var target = getExparserNode(targetCaller);
	  if (currentTargetCaller && target instanceof exparser.VirtualNode) {
	    // 如果 target 是 slot 且 slot 未设置 id 和 dataset，则兼容以前的逻辑：target === currentTarget
	    if (!target.id && !Object.getOwnPropertyNames(target.dataset).length) {
	      target = getExparserNode(currentTargetCaller);
	    }
	  }
	  return {
	    id: inWriteOnly ? '' : target.id,
	    offsetLeft: target.$$ && !inWriteOnly ? target.$$.offsetLeft : 0,
	    offsetTop: target.$$ && !inWriteOnly ? target.$$.offsetTop : 0,
	    dataset: inWriteOnly ? {} : target.dataset
	  };
	};
	
	var convertEventTarget = function convertEventTarget(targetCaller, inWriteOnly, currentTargetCaller) {
	  var target = getExparserNode(targetCaller);
	  if (currentTargetCaller && target instanceof exparser.VirtualNode) {
	    // 如果 target 是 slot 且 slot 未设置 id 和 dataset，则兼容以前的逻辑：target === currentTarget
	    if (!target.id && !Object.getOwnPropertyNames(target.dataset).length) {
	      target = getExparserNode(currentTargetCaller);
	    }
	  }
	  return {
	    id: inWriteOnly ? '' : target.id,
	    dataset: inWriteOnly ? {} : target.dataset
	  };
	};
	
	var convertTouches = function convertTouches(touches) {
	  if (touches) {
	    var r = [];
	    for (var i = 0; i < touches.length; i++) {
	      var touch = touches[i];
	      r.push({
	        identifier: touch.identifier,
	        pageX: touch.pageX,
	        pageY: touch.pageY,
	        clientX: touch.clientX,
	        clientY: touch.clientY,
	        force: touch.force || 0
	      });
	    }
	    return r;
	  }
	  return undefined;
	};
	
	var bindEvent = function bindEvent(tm, node, bindName, value, noBubble, capture) {
	  var evNameField = capture ? '__wxEventCaptureHandleName' : '__wxEventHandleName';
	  if (!node[evNameField]) {
	    node[evNameField] = Object.create(null);
	  }
	  if (!node[evNameField]) {
	    node[evNameField] = Object.create(null);
	  }
	  if (node[evNameField][bindName] === undefined) {
	    node.addListener(bindName, function (e) {
	      /* eslint-disable no-invalid-this */
	      var funcName = node[evNameField][bindName];
	      if (!funcName) return;
	      e._hasListeners = true;
	      var shadowRoot = node.ownerShadowRoot;
	      if (shadowRoot) {
	        var host = shadowRoot.getHostNode();
	        var inWriteOnly = exparser.Component.getComponentOptions(host).writeOnly;
	        if (!inWriteOnly || e._allowWriteOnly) {
	          if ((0, _bridge.isDataThread)()) {
	            // 处理自定义组件触发的事件
	            var caller = exparser.Element.getMethodCaller(host);
	            if (typeof caller[funcName] !== 'function') {
	              console.warn('Component "' + host.is + '" does not have a method "' + funcName + '" to handle event "' + e.type + '".');
	            } else {
	              caller[funcName]({
	                type: e.type,
	                timeStamp: e.timeStamp,
	                target: convertEventTarget(e.target, inWriteOnly, this),
	                currentTarget: convertEventTarget(this, inWriteOnly, null),
	                detail: e.detail,
	                touches: e.touches,
	                changedTouches: e.changedTouches,
	                _requireActive: e._requireActive
	              });
	            }
	          } else {
	            // 处理wx组件触发的事件
	            var evObj = {
	              type: e.type,
	              timeStamp: e.timeStamp,
	              target: convertEventTargetWithPos(e.target, inWriteOnly, this),
	              currentTarget: convertEventTargetWithPos(this, inWriteOnly, null),
	              detail: e.detail,
	              touches: convertTouches(e.touches),
	              changedTouches: convertTouches(e.changedTouches),
	              _requireActive: e._requireActive
	            };
	            (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.WX_EVENT, [tm.nodeId.getNodeId(host), funcName, evObj]);
	          }
	        }
	      }
	      if (noBubble) {
	        // eslint-disable-next-line consistent-return
	        return false;
	      }
	      /* eslint-enable no-invalid-this */
	    }, { capture: capture });
	  }
	  node[evNameField][bindName] = value == null ? '' : String(value);
	};
	
	/**
	* @synopsis Apply props to given element node.
	*
	* @param node {!Element} - Element node.
	* @param props {!Object} - Props need to apply to node.
	*/
	/* eslint-disable complexity */
	var applyProperties = exports.applyProperties = function applyProperties(node, props, specProps) {
	  var tm = (0, _bridge.isDataThread)() ? node.__treeManager__ : _tree_manager2.default.instance;
	  node.dataset = node.dataset || {};
	  var hasDelayedProps = false;
	
	  var isComponentNode = node instanceof exparser.Component;
	  var isWxComp = isComponentNode && getComponentOptions(node).domain === '//';
	  var nodeDataProxy = exparser.Component.getDataProxy(node);
	
	  for (var propName in props) {
	    var propValue = props[propName];
	    var matches = null;
	
	    // for <slot>, accept name as slot name
	    if (node.is === 'slot' && node instanceof exparser.VirtualNode && propName === 'name') {
	      exparser.Element.setSlotName(node, propValue);
	      continue;
	    }
	
	    // for exparser-native properties, set directly to exparser element
	    if (propName === 'id') {
	      // eslint-disable-next-line eqeqeq
	      node.id = propValue == undefined ? '' : propValue;
	      continue;
	    }
	    if (propName === 'slot') {
	      // eslint-disable-next-line eqeqeq
	      node.slot = propValue == undefined ? '' : propValue;
	      continue;
	    }
	
	    // for class, set it with classList API
	    if (isComponentNode && propName === 'class') {
	      node.class = propValue;
	      continue;
	    }
	
	    // for style, convert and set it
	    if (isComponentNode && propName === 'style') {
	      if (node.$$) {
	        (function () {
	          var _ref = node.__animationStyle || {},
	              transition = _ref.transition,
	              transform = _ref.transform,
	              transitionProperty = _ref.transitionProperty,
	              transformOrigin = _ref.transformOrigin;
	
	          // styleObj 把原有的 transition, transform, transitionProperty, transformOrigin 合并进来，因为这几个样式是由 animation 属性写入的
	
	
	          var styleObj = {
	            transition: transition,
	            transform: transform,
	            transitionProperty: transitionProperty,
	            transformOrigin: transformOrigin
	          };
	          styleObj['-webkit-transition'] = styleObj.transition;
	          styleObj['-webkit-transform'] = styleObj.transform;
	          styleObj['-webkit-transition-property'] = styleObj.transitionProperty;
	          styleObj['-webkit-transform-origin'] = styleObj.transformOrigin;
	
	          node.setNodeStyle(transformRpx(propValue, true) + Object.keys(styleObj).filter(function (key) {
	            // 把空的动画属性过滤掉
	            if (/transform|transition/i.test(key) && styleObj[key] === '' || // 过滤掉空的动画属性
	            key.trim() === '' || styleObj[key] === undefined || styleObj[key] === '' || !isNaN(parseInt(key))) {
	              return false;
	            }
	            return true;
	          }).map(function (key) {
	            var newKey = key.replace(/([A-Z]{1})/g, function (v) {
	              return '-' + v.toLowerCase();
	            });
	            return newKey + ':' + styleObj[key];
	          }).join(';'));
	
	          if (node.__banned) {
	            (0, _ban.banComponentNode)(node);
	          }
	        })();
	      }
	      continue;
	    }
	
	    // for public properties of custom elements, delay and set once at the end
	    var hasProperty = isComponentNode && exparser.Component.hasPublicProperty(node, propName);
	    if (hasProperty) {
	      if (isWxComp || !_save_restore_view2.default.restoring) {
	        nodeDataProxy.scheduleReplace([propName], propValue, specProps[propName]);
	        if (isWxComp) nodeDataProxy.doUpdates();else hasDelayedProps = true;
	      }
	      continue;
	    }
	
	    // for data-*, set it to a simulated dataset
	    if (/^data-/.test(propName)) {
	      var setName = (0, _case_map.dashToCamelCase)(propName.slice(5).toLowerCase());
	      node.dataset[setName] = propValue;
	      node.setAttribute(propName, propValue);
	      continue;
	    }
	
	    // for event listeners, register it
	    // eslint-disable-next-line no-cond-assign
	    if (matches = propName.match(/^(capture-)?(bind|catch):?(.+)$/)) {
	      bindEvent(tm, node, matches[3], propValue, matches[2] === 'catch', matches[1]);
	      if ((0, _bridge.inDevtoolsWebview)() && !(0, _bridge.isDataThread)()) node.setAttribute('exparser:info-attr-' + propName, propValue);
	      continue;
	    }
	    if (propName.slice(0, 2) === 'on') {
	      bindEvent(tm, node, propName.slice(2), propValue, false, false);
	      continue;
	    }
	
	    // for animation, run as global attribute
	    if (isComponentNode && propName === 'animation') {
	      if (node.$$ && propValue !== null && (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) === 'object' && propValue.actions && propValue.actions.length > 0) {
	        (function () {
	
	          // eslint-disable-next-line no-inner-declarations, no-loop-func
	          var step = function step() {
	            if (index < length) {
	              var _wx$animationToStyle = wx.animationToStyle(actions[index]),
	                  transition = _wx$animationToStyle.transition,
	                  transitionProperty = _wx$animationToStyle.transitionProperty,
	                  transform = _wx$animationToStyle.transform,
	                  transformOrigin = _wx$animationToStyle.transformOrigin,
	                  style = _wx$animationToStyle.style;
	
	              node.$$.style.transition = transition;
	              node.$$.style.transitionProperty = transitionProperty;
	              node.$$.style.transform = transform;
	              node.$$.style.transformOrigin = transformOrigin;
	              node.$$.style.webkitTransition = transition;
	              node.$$.style.webkitTransitionProperty = transitionProperty;
	              node.$$.style.webkitTransform = transform;
	              node.$$.style.webkitTransformOrigin = transformOrigin;
	              for (var key in style) {
	                node.$$.style[key] = transformRpx(' ' + style[key], true); // transformRpx 一定要空格开头才能匹配
	              }
	
	              node.__animationStyle = {
	                transition: transition,
	                transform: transform,
	                transitionProperty: transitionProperty,
	                transformOrigin: transformOrigin
	              };
	
	              if (node.__banned) {
	                (0, _ban.banComponentNode)(node);
	              }
	            }
	          };
	
	          var index = 0;
	          var actions = propValue.actions;
	          var length = propValue.actions.length;
	          node.addListener('transitionend', function () {
	            index += 1;
	            step();
	          });
	          step();
	        })();
	      }
	      continue;
	    }
	
	    // for external classes of custom elements, set it directly
	    var dashPropName = (0, _case_map.camelToDashCase)(propName);
	    var hasExternalClass = isComponentNode && node.hasExternalClass(dashPropName);
	    if (hasExternalClass) {
	      node.setExternalClass(dashPropName, propValue);
	      continue;
	    }
	  }
	
	  if (hasDelayedProps) {
	    nodeDataProxy.doUpdates(true);
	  }
	
	  // sync bit
	  if (node.__component__ && !_save_restore_view2.default.restoring) {
	    if ((0, _bridge.isDataThread)()) {
	      tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_APPLY_PROPERTY]);
	    } else {
	      var operationIterator = tm.operationFlow.iterator;
	      var step = operationIterator.nextStep();
	      if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_APPLY_PROPERTY) throw new Error('Expect FLOW_APPLY_PROPERTY but get another');
	    }
	  }
	};
	/* eslint-enable complexity */

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initBannedListener = exports.checkAndBanComponent = exports.banNode = exports.banComponentNode = exports.sendBannedMap = exports.initBannedMap = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _constants = __webpack_require__(5);
	
	var _bridge = __webpack_require__(18);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 插件封禁逻辑
	
	var bannedPluginInfoMap = null;
	var bannedCompDef = null;
	
	var initBannedMap = exports.initBannedMap = function initBannedMap(map) {
	  if (Object.keys(map).length === 0) return;
	  bannedPluginInfoMap = map;
	  _tree_manager2.default.listViewId().forEach(function (viewId) {
	    (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.BANNING_MAP, [map], viewId);
	  });
	};
	
	var sendBannedMap = exports.sendBannedMap = function sendBannedMap(viewId) {
	  if (!bannedPluginInfoMap) return;
	  (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.BANNING_MAP, [bannedPluginInfoMap], viewId);
	};
	
	var banComponentNode = exports.banComponentNode = function banComponentNode(node) {
	  // 这里目前用 display:none 来隐藏（事实上这样会破坏布局）
	  node.$$.style.display = 'none';
	};
	
	var appendShadowBannedHint = function appendShadowBannedHint(shadowRoot, info) {
	  if (!bannedCompDef) {
	    bannedCompDef = exparser.registerElement({
	      options: {
	        renderingMode: 'native'
	      }
	    });
	  }
	  var elem = exparser.createElement('wx-hint', bannedCompDef);
	  var div = document.createElement('div');
	  div.innerHTML = info.hint;
	  elem.$$.appendChild(div);
	  shadowRoot.appendChild(elem, shadowRoot.childNodes[0]); // HACK 这里绕过VD直接插了一个节点，可能会有问题
	};
	
	var banNode = exports.banNode = function banNode(node) {
	  var dfsChildren = function dfsChildren(node) {
	    // 找所有非 virtual 子节点
	    if (node instanceof exparser.Component) {
	      banComponentNode(node);
	    } else if (node instanceof exparser.VirtualNode) {
	      node.childNodes.forEach(function (node) {
	        dfsChildren(node);
	      });
	    } else if (node instanceof exparser.TextNode) {
	      node.textContent = '';
	    }
	    node.__banned = true;
	  };
	  dfsChildren(node);
	};
	
	var banShadowRoot = function banShadowRoot(shadowRoot, info) {
	  banNode(shadowRoot);
	  appendShadowBannedHint(shadowRoot, info);
	};
	
	var checkAndBanComponent = exports.checkAndBanComponent = function checkAndBanComponent(node) {
	  if (!bannedPluginInfoMap) return;
	  var domain = exparser.Component.getComponentOptions(node).domain;
	  var pluginId = domain.split('/', 1)[0];
	  var shadowRoot = node.shadowRoot;
	  if (bannedPluginInfoMap[pluginId]) {
	    banShadowRoot(shadowRoot, bannedPluginInfoMap[pluginId]);
	  }
	};
	
	var receivedBannedMap = function receivedBannedMap(map) {
	  if (bannedPluginInfoMap) return;
	  bannedPluginInfoMap = map;
	  // 遍历组件节点树来查找所有非法组件实例
	  var dfsNodes = function dfsNodes(root) {
	    if (root instanceof exparser.Component) {
	      var domain = exparser.Component.getComponentOptions(root).domain;
	      if (domain !== '//') {
	        var pluginId = domain.split('/', 1)[0];
	        var shadowRoot = root.shadowRoot;
	        if (bannedPluginInfoMap[pluginId]) {
	          banShadowRoot(shadowRoot, bannedPluginInfoMap[pluginId]);
	        } else {
	          dfsNodes(shadowRoot);
	        }
	      }
	    }
	    if (root instanceof exparser.Element) {
	      root.childNodes.forEach(function (node) {
	        dfsNodes(node);
	      });
	    }
	  };
	  dfsNodes(window.__DOMTree__);
	};
	
	var initBannedListener = exports.initBannedListener = function initBannedListener() {
	  (0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.BANNING_MAP, function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 1),
	        map = _ref2[0];
	
	    receivedBannedMap(map);
	  });
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.restorePageState = exports.savePageState = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _constants = __webpack_require__(5);
	
	var _bridge = __webpack_require__(18);
	
	var _utils = __webpack_require__(2);
	
	var _calc = __webpack_require__(14);
	
	// 数据分片相关
	var splitData = {
	  id: null,
	  prev: null,
	  data: []
	};
	
	(0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.SAVE_STATE, function () {
	  if (typeof wx.webViewReadyToTerminate === 'function') wx.webViewReadyToTerminate({});
	});
	
	(0, _bridge.setDataListener)(_constants.SYNC_EVENT_NAME.RESTORE_STATE, function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 3),
	      statesData = _ref2[0],
	      idDataMap = _ref2[1],
	      compIdArr = _ref2[2];
	
	  if (statesData && statesData.isSplitData) {
	    // 处理分片数据
	    var _statesData$splitInfo = statesData.splitInfo,
	        id = _statesData$splitInfo.id,
	        index = _statesData$splitInfo.index,
	        total = _statesData$splitInfo.total,
	        data = _statesData$splitInfo.data;
	
	
	    if (index !== 1 && (index !== splitData.prev + 1 || id !== splitData.id)) {
	      // 不是预期的分片序号 或 不是预期的分片id
	      splitData.id = null;
	      splitData.prev = null;
	      splitData.data = [];
	      return;
	    } else if (index === total) {
	      // 到达最后一个分片
	      splitData.data.push(data);
	      var restoredData = splitData.data.join('');
	      try {
	        restoredData = JSON.parse(restoredData);
	      } catch (err) {
	        console.error('Expected parse completed data with split data but got error');
	        // eslint-disable-next-line no-undef
	        Reporter.errorReport({
	          key: 'webviewScriptError',
	          error: new Error('Expected parse completed data with split data but got error')
	        });
	        restoredData = null;
	      }
	
	      splitData.id = null;
	      splitData.prev = null;
	      splitData.data = [];
	      if (!restoredData) return;
	
	      // 还原数据
	      statesData = restoredData[0];
	      idDataMap = restoredData[1];
	      compIdArr = restoredData[2];
	    } else {
	      // 其他正常分片
	      splitData.id = id;
	      splitData.prev = index;
	      splitData.data.push(data);
	      return;
	    }
	  }
	
	  states.restoring = statesData || {};
	  states.idDataMap = idDataMap;
	  states.compIdArr = compIdArr;
	  states.compIdArrIndex = 0;
	});
	
	var savePageState = exports.savePageState = function savePageState(statesData) {
	  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	  statesData.__page__ = {
	    scrollTop: scrollTop
	  };
	};
	
	var restorePageState = exports.restorePageState = function restorePageState(statesData) {
	  var state = statesData.__page__;
	  if (state) {
	    var scrollTop = parseInt(state.scrollTop, 10);
	
	    requestAnimationFrame(function () {
	      document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
	    });
	  }
	};
	
	var callSavedLifeTimes = function callSavedLifeTimes(statesData) {
	  savePageState(statesData);
	  (0, _utils.dfsComponents)(window.__DOMTree__, 1, function (node) {
	    node.triggerLifeTime('saved', [statesData]);
	  });
	};
	
	var callRestoredLifeTimes = function callRestoredLifeTimes(statesData) {
	  restorePageState(statesData);
	  (0, _utils.dfsComponents)(window.__DOMTree__, 1, function (node) {
	    node.triggerLifeTime('restored', [statesData]);
	  });
	};
	
	var saveStates = function saveStates() {
	  __webViewSDK__.publish('recycleStatistics', (0, _calc.getComponentCount)()); // 回收统计并上报
	
	  var statesData = {};
	  callSavedLifeTimes(statesData);
	  (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.REQUEST_SAVE, statesData);
	};
	
	var registerSavingListener = function registerSavingListener() {
	  window.__forceSaveStates__ = saveStates;
	  if (typeof wx.onWebViewWillManuallyTerminate === 'function') wx.onWebViewWillManuallyTerminate(saveStates);
	};
	
	var states = {
	  restoring: null,
	  idDataMap: null,
	  compIdArr: null,
	  compIdArrIndex: 0,
	  registerSavingListener: registerSavingListener,
	  callSavedLifeTimes: callSavedLifeTimes,
	  callRestoredLifeTimes: callRestoredLifeTimes
	};
	
	exports.default = states;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.appendPatch = exports.diffProps = exports.diffChildren = exports.diffNode = exports.diff = undefined;
	
	var _virtual_patch = __webpack_require__(26);
	
	var _virtual_patch2 = _interopRequireDefault(_virtual_patch);
	
	var _virtual_patches = __webpack_require__(27);
	
	var _virtual_patches2 = _interopRequireDefault(_virtual_patches);
	
	var _utils = __webpack_require__(2);
	
	var _list_diff_custom = __webpack_require__(28);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable no-use-before-define */
	
	var diff = exports.diff = function diff(oldTree, newTree) {
	  var patches = {};
	  diffNode(oldTree, newTree, patches, 0);
	  return new _virtual_patches2.default(oldTree, patches);
	};
	
	// IDEA do not keep the old node tree, directly comparing with exparser tree
	
	/**
	 * @synopsis
	 *
	 * @param oldNode
	 * @param newNode
	 * @param patches
	 * @param index
	 * @private export for test
	 */
	var diffNode = exports.diffNode = function diffNode(oldNode, newNode, patches, index) {
	  if (oldNode === newNode) {
	    return;
	  }
	
	  var apply = patches[index];
	  if (newNode == null) {
	    apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.REMOVE, oldNode));
	  } else if ((0, _utils.isVirtualNode)(newNode)) {
	    if ((0, _utils.isVirtualNode)(oldNode)) {
	      if (oldNode.tagName === newNode.tagName && oldNode.wxKey === newNode.wxKey) {
	        if (oldNode.tagName === 'virtual' && oldNode.wxVkey !== newNode.wxVkey) {
	          apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.VNODE, oldNode, newNode));
	        } else {
	          var propsPatch = diffProps(newNode.props, newNode.newProps);
	          if (propsPatch) {
	            apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.PROPS, oldNode, propsPatch, newNode));
	          }
	          apply = diffChildren(oldNode, newNode, patches, apply, index);
	        }
	      } else {
	        apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.VNODE, oldNode, newNode));
	      }
	    } else {
	      apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.VNODE, oldNode, newNode));
	    }
	  } else if ((0, _utils.isVirtualText)(newNode)) {
	    if (newNode.text !== oldNode.text) {
	      apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.TEXT, oldNode, newNode));
	    }
	  } else {
	    throw new Error('unknow node type');
	  }
	
	  if (apply) {
	    patches[index] = apply;
	  }
	};
	
	/**
	 * @synopsis
	 *
	 * @param oldTree
	 * @param newTree
	 * @param patches
	 * @param apply
	 * @param index
	 * @private export for test
	 */
	var diffChildren = exports.diffChildren = function diffChildren(oldTree, newTree, patches, apply, index) {
	  var wxmlCustomCompMode = (0, _utils.getWxmlVersionTag)('customComponents') || true;
	  var needOrderDiff = !wxmlCustomCompMode || oldTree.tagName === 'virtual' && oldTree.wxXCkey >= 1 && oldTree.wxXCkey <= 4; // 只有wx:if和wx:for需要使用listDiff算法
	  var oldChildren = oldTree.children;
	  var diffs = needOrderDiff ? (0, _list_diff_custom.listDiff)(oldChildren, newTree.children) : { children: newTree.children, moves: null };
	  var newChildren = diffs.children;
	
	  for (var i = 0; i < oldChildren.length; ++i) {
	    var oldChild = oldChildren[i];
	    var newChild = newChildren[i];
	    ++index;
	
	    if (newChild) {
	      diffNode(oldChild, newChild, patches, index);
	    }
	
	    if ((0, _utils.isVirtualNode)(oldChild)) {
	      index += oldChild.descendants;
	    }
	  }
	
	  if (diffs.moves) {
	    apply = appendPatch(apply, new _virtual_patch2.default(_constants.PATCH_TYPE.REORDER, oldTree, diffs.moves, newTree));
	  }
	
	  return apply;
	};
	
	/**
	 * @synopsis
	 *
	 * @param props {Object}
	 * @param newKeys {Array}
	 * @private export for test
	 */
	var diffProps = exports.diffProps = function diffProps(props, newKeys) {
	  var diff = {};
	
	  for (var i = 0; i < newKeys.length; i++) {
	    var key = newKeys[i];
	    diff[key] = props[key];
	  }
	  // console.log(JSON.stringify(oldProps))
	  // console.log(JSON.stringify(newProps))
	  // console.log(JSON.stringify(diff))
	  return (0, _utils.isEmptyObject)(diff) ? undefined : diff;
	};
	
	/**
	 * @synopsis Append patch to patches
	 *
	 * @param patches
	 * @param patch
	 * @private export for test
	 */
	var appendPatch = exports.appendPatch = function appendPatch(patches, patch) {
	  if (patches) {
	    patches.push(patch);
	    return patches;
	  }
	  return [patch];
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(5);
	
	var _prop_utils_custom = __webpack_require__(22);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	var _bridge = __webpack_require__(18);
	
	var _ban = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var syncChildManipulation = function syncChildManipulation(tm) {
	  if ((0, _bridge.isDataThread)()) {
	    tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_MINIPULATE_CHILD]);
	  } else {
	    var operationIterator = tm.operationFlow.iterator;
	    var step = operationIterator.nextStep();
	    if (step[0] !== _constants.SYNC_EVENT_NAME.FLOW_MINIPULATE_CHILD) throw new Error('Expect FLOW_MINIPULATE_CHILD but get another');
	  }
	};
	
	var VirtualPatch = function () {
	  function VirtualPatch(type, vNode, patch, newVNode) {
	    _classCallCheck(this, VirtualPatch);
	
	    this.type = Number(type);
	    this.vNode = vNode;
	    this.patch = patch;
	    this.newVNode = newVNode;
	  }
	
	  _createClass(VirtualPatch, [{
	    key: 'apply',
	    value: function apply(domNode) {
	      switch (this.type) {
	        case _constants.PATCH_TYPE.TEXT:
	          return VirtualPatch.stringPatch(domNode, this.patch);
	        case _constants.PATCH_TYPE.VNODE:
	          return VirtualPatch.vNodePatch(domNode, this.patch);
	        case _constants.PATCH_TYPE.PROPS:
	          return VirtualPatch.applyProperties(domNode, this.patch, this.newVNode.specProps);
	        case _constants.PATCH_TYPE.REORDER:
	          return VirtualPatch.reorderChildren(domNode, this.patch, this.newVNode.children);
	        case _constants.PATCH_TYPE.INSERT:
	          return VirtualPatch.insertNode(domNode, this.patch);
	        case _constants.PATCH_TYPE.REMOVE:
	          return VirtualPatch.removeNode(domNode);
	        default:
	          return domNode;
	      }
	    }
	  }], [{
	    key: 'stringPatch',
	    value: function stringPatch(domNode, vText) {
	      var parentNode = domNode.parentNode;
	      var newNode = vText.render();
	      if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	      }
	      if (domNode.__banned) {
	        (0, _ban.banNode)(newNode);
	      }
	      return newNode;
	    }
	  }, {
	    key: 'vNodePatch',
	    value: function vNodePatch(domNode, vNode) {
	      var tm = (0, _bridge.isDataThread)() ? domNode.__treeManager__ : _tree_manager2.default.instance;
	      var parentNode = domNode.parentNode;
	      var newNode = vNode.render(null, parentNode.ownerShadowRoot, tm);
	
	      if (parentNode && newNode !== domNode) {
	        if (parentNode.__wxDynamicSync__ === 'wx:for' || domNode.__wxDynamicSync__ === 'wx:if') {
	          tm.nodeId.addNode(newNode);
	          parentNode.replaceChild(newNode, domNode);
	          syncChildManipulation(tm);
	          tm.nodeId.removeNode(domNode);
	        } else {
	          parentNode.replaceChild(newNode, domNode);
	        }
	        if (domNode.__banned) {
	          (0, _ban.banNode)(newNode);
	        }
	      }
	
	      return newNode;
	    }
	  }, {
	    key: 'applyProperties',
	    value: function applyProperties(domNode, newProps, specProps) {
	      (0, _prop_utils_custom.applyProperties)(domNode, newProps, specProps);
	      return domNode;
	    }
	  }, {
	    key: 'reorderChildren',
	    value: function reorderChildren(domNode, moves, newChildren) {
	      var tm = (0, _bridge.isDataThread)() ? domNode.__treeManager__ : _tree_manager2.default.instance;
	      var removes = moves.removes,
	          inserts = moves.inserts;
	
	      var children = domNode.childNodes;
	
	      var insertNodes = [];
	      inserts.forEach(function (insert) {
	        insertNodes.push({
	          node: insert.oldIndex !== undefined ? children[insert.oldIndex] : null,
	          before: insert.pos >= 0 ? children[insert.pos] : undefined,
	          index: insert.index
	        });
	      });
	
	      removes.forEach(function (index) {
	        var node = children[index];
	        domNode.removeChild(node);
	        if (domNode.__wxDynamicSync__ === 'wx:for') {
	          syncChildManipulation(tm);
	          tm.nodeId.removeNode(node);
	        }
	      });
	
	      insertNodes.forEach(function (insert) {
	        var node = insert.node,
	            before = insert.before,
	            index = insert.index;
	
	        if (node === null) {
	          node = newChildren[index].render(null, domNode.ownerShadowRoot, tm);
	        }
	        if (domNode.__wxDynamicSync__ === 'wx:for') {
	          tm.nodeId.addNode(node);
	          domNode.insertBefore(node, before);
	          syncChildManipulation(tm);
	        } else {
	          domNode.insertBefore(node, before);
	        }
	      });
	
	      if (domNode.__banned) {
	        (0, _ban.banNode)(domNode);
	      }
	
	      return domNode;
	    }
	  }, {
	    key: 'insertNode',
	    value: function insertNode(parentNode, vNode) {
	      var tm = (0, _bridge.isDataThread)() ? parentNode.__treeManager__ : _tree_manager2.default.instance;
	      var newNode = vNode.render(null, parentNode.ownerShadowRoot, tm);
	
	      if (parentNode) {
	        if (parentNode.__wxDynamicSync__ === 'wx:for' || newNode.__wxDynamicSync__ === 'wx:if') {
	          tm.nodeId.addNode(newNode);
	          parentNode.appendChild(newNode);
	          syncChildManipulation(tm);
	        } else {
	          parentNode.appendChild(newNode);
	        }
	      }
	
	      if (parentNode.__banned) {
	        (0, _ban.banNode)(newNode);
	      }
	
	      return parentNode;
	    }
	  }, {
	    key: 'removeNode',
	    value: function removeNode(domNode) {
	      var tm = (0, _bridge.isDataThread)() ? domNode.__treeManager__ : _tree_manager2.default.instance;
	      var parentNode = domNode.parentNode;
	
	      if (parentNode) {
	        parentNode.removeChild(domNode);
	        if (parentNode.__wxDynamicSync__ === 'wx:for' || domNode.__wxDynamicSync__ === 'wx:if') {
	          syncChildManipulation(tm);
	          tm.nodeId.removeNode(domNode);
	        }
	      }
	
	      return null;
	    }
	  }]);
	
	  return VirtualPatch;
	}();
	
	exports.default = VirtualPatch;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dom_index = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualPatches = function () {
	  function VirtualPatches(oldTree, patches) {
	    _classCallCheck(this, VirtualPatches);
	
	    this.oldTree = oldTree;
	
	    this.patches = patches;
	
	    this.patchIndexes = Object.keys(this.patches).map(function (key) {
	      return Number(key);
	    });
	  }
	
	  _createClass(VirtualPatches, [{
	    key: 'apply',
	    value: function apply(domTree) {
	      var _this = this;
	
	      if (this.patchIndexes.length === 0) {
	        // empty patch
	        return domTree;
	      }
	
	      var indexesToDom = (0, _dom_index.getDomIndex)(domTree, this.oldTree, this.patchIndexes);
	
	      this.patchIndexes.forEach(function (index) {
	        var domNode = indexesToDom[index];
	        if (domNode) {
	          var patchList = _this.patches[index];
	          patchList.forEach(function (patch) {
	            patch.apply(domNode);
	          });
	        }
	      });
	      return domTree;
	    }
	  }]);
	
	  return VirtualPatches;
	}();
	
	exports.default = VirtualPatches;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable complexity, no-use-before-define */
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	* @synopsis Diff two list in O(N)
	* @param {!Array} oldList - Original List.
	* @param {!Array} newList - List new certain insertion, removes, or moves
	* @param {string|function} key - Key to identify item
	* @return {Object{children, moves}} - moves is a list of actions that telling how to remove and insert
	*/
	var listDiff = exports.listDiff = function listDiff(oldList, newList) {
	  // Step 1. If no key index, just return new list and no move.
	  var _makeKeyAndFreeIndexe = makeKeyAndFreeIndexes(oldList),
	      oldKeyIndexes = _makeKeyAndFreeIndexe.keyIndexes;
	
	  var _makeKeyAndFreeIndexe2 = makeKeyAndFreeIndexes(newList),
	      newKeyIndexes = _makeKeyAndFreeIndexe2.keyIndexes,
	      newFreeIndexes = _makeKeyAndFreeIndexe2.freeIndexes;
	
	  var children = [];
	  var removes = [];
	  var inserts = [];
	  var freeIndex = 0;
	  var deletedItemCount = 0;
	
	  // Step 2. Pass to check item in old list: if it's removed or not.
	  for (var i = 0; i < oldList.length; ++i) {
	    var item = oldList[i];
	    var itemKey = getItemKey(item);
	    if (itemKey) {
	      if (hasOwnProperty.call(newKeyIndexes, itemKey)) {
	        // Match up the old keys
	        var itemIndex = newKeyIndexes[itemKey];
	        children.push(newList[itemIndex]);
	      } else {
	        // Remove old keyed items
	        removes.push(i - deletedItemCount);
	        ++deletedItemCount;
	        children.push(null);
	      }
	    } else {
	      // free item, just match other free item in new list or null
	      if (freeIndex < newFreeIndexes.length) {
	        var _itemIndex = newFreeIndexes[freeIndex];
	        children.push(newList[_itemIndex]);
	        ++freeIndex;
	      } else {
	        removes.push(i - deletedItemCount);
	        ++deletedItemCount;
	        children.push(null);
	      }
	    }
	  }
	
	  // Step 4. Collect inserts (and moves), preserving the old index and new index.
	  var currentList = children;
	  var currentIndex = 0;
	  var stables = [];
	  for (var newIndex = 0; newIndex < newList.length;) {
	    var newItem = newList[newIndex];
	    var newItemKey = getItemKey(newItem);
	    var currentItem = currentList[currentIndex];
	    var currentItemKey = getItemKey(currentItem);
	
	    // remove null items
	    while (currentItem === null) {
	      ++currentIndex;
	      currentItem = currentList[currentIndex];
	      currentItemKey = getItemKey(currentItem);
	    }
	
	    // Attention: currentItem may be undefined (currentIndex === currentList.length)
	    if (currentIndex >= currentList.length) {
	      // 0. if exceeds current list, just insert
	      inserts.push({ oldIndex: oldKeyIndexes[newItemKey], index: newIndex, pos: -1 });
	      ++currentIndex;
	      ++newIndex;
	    } else if (currentItemKey === newItemKey) {
	      // 1. same key(with same key or both without key), then compare next items
	      stables.push(currentIndex);
	      ++currentIndex;
	      ++newIndex;
	    } else if (newItemKey) {
	      // 2. newItem has key but not matched insert it
	      if (currentItemKey) {
	        // 2.1 currentItem has key
	        if (newKeyIndexes[currentItemKey] === newIndex + 1) {
	          // 2.1.1 next newItem has same key with currentItem
	          // insert will put this key in right place
	          inserts.push({ oldIndex: oldKeyIndexes[newItemKey], index: newIndex, pos: currentIndex });
	        } else {
	          // 2.1.2 next newItem has diff key with currentItem
	          // move current currentItem and compare with next currentItem
	          ++currentIndex;
	          currentItem = currentList[currentIndex];
	          if (currentItem && getItemKey(currentItem) === newItemKey) {
	            // 2.1.2.1 next currentItem has same key with new item
	            stables.push(currentIndex);
	            ++currentIndex;
	          } else {
	            // 2.1.2.2 next currentItem has diff key with new itm
	            --currentIndex;
	            inserts.push({ oldIndex: oldKeyIndexes[newItemKey], index: newIndex, pos: currentIndex });
	          }
	        }
	      } else {
	        // 2.2 currentItem has no key
	        inserts.push({ oldIndex: oldKeyIndexes[newItemKey], index: newIndex, pos: currentIndex });
	      }
	      ++newIndex;
	    } else {
	      // 3. newItem has no key and currentItem has key.
	      ++currentIndex;
	    }
	  }
	
	  // step 5. move all insert indexes to stable points
	  var stableIndex = 0;
	  for (var _i = 0; _i < inserts.length; _i++) {
	    var _currentIndex = inserts[_i].pos;
	    if (_currentIndex === -1) break;
	    while (stableIndex < stables.length && _currentIndex > stables[stableIndex]) {
	      stableIndex++;
	    }
	    if (stableIndex >= stables.length) {
	      inserts[_i].pos = -1;
	    } else {
	      inserts[_i].pos = stables[stableIndex];
	    }
	  }
	
	  return {
	    children: children,
	    moves: { removes: removes, inserts: inserts }
	  };
	};
	
	/**
	* @synopsis Covert list to key-item keyIndex and free-item object.
	* @param {Array} list
	* @param {String|Function} key
	* @return {Object{keyIndexes, freeIndexes}}
	* @private
	*/
	var makeKeyAndFreeIndexes = exports.makeKeyAndFreeIndexes = function makeKeyAndFreeIndexes(list) {
	  var keyIndexes = {};
	  var freeIndexes = [];
	  for (var index = 0; index < list.length; ++index) {
	    var item = list[index];
	    var itemKey = getItemKey(item);
	    if (!itemKey) {
	      freeIndexes.push(index);
	    } else if (hasOwnProperty.call(keyIndexes, itemKey)) {
	      console.warn("For developer:Do not set same key \"" + itemKey + "\" in wx:key.");
	      clearItemKey(item);
	      freeIndexes.push(index);
	    } else {
	      keyIndexes[itemKey] = index;
	    }
	  }
	  return { keyIndexes: keyIndexes, freeIndexes: freeIndexes };
	};
	
	/**
	* @synopsis To get item key.
	* @param {Object} item
	* @return {string} Item key.
	* @private
	*/
	var getItemKey = exports.getItemKey = function getItemKey(item) {
	  if (!item) {
	    return undefined;
	  }
	  return item.wxKey;
	};
	
	var clearItemKey = function clearItemKey(item) {
	  item.wxKey = undefined;
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualText = function () {
	  function VirtualText(text) {
	    _classCallCheck(this, VirtualText);
	
	    this.text = String(text);
	  }
	
	  _createClass(VirtualText, [{
	    key: "render",
	    value: function render() {
	      var domNode = exparser.createTextNode(this.text);
	      return domNode;
	    }
	  }]);
	
	  return VirtualText;
	}();
	
	VirtualText.prototype.type = "WxVirtualText";
	
	exports.default = VirtualText;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeDataWithSpec = exports.mergeData = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _deep_copy = __webpack_require__(31);
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var mergeData = exports.mergeData = function mergeData(data, changes, changedValues, withDeepCopy) {
	  for (var i = 0; i < changes.length; i++) {
	    var changeInfo = changes[i];
	    var path = changeInfo[1];
	    var newData = changeInfo[2];
	    var curData = data;
	    var curSlice = path[0];
	    for (var j = 1; j < path.length; j++) {
	      var nextSlice = path[j];
	      if (typeof nextSlice === 'number' && isFinite(nextSlice)) {
	        if (!hasOwnProperty.call(curData, curSlice) || !(curData[curSlice] instanceof Array)) {
	          curData[curSlice] = [];
	        }
	      } else {
	        if (!hasOwnProperty.call(curData, curSlice) || curData[curSlice] === null || _typeof(curData[curSlice]) !== 'object' || curData[curSlice] instanceof Array) {
	          curData[curSlice] = {};
	        }
	      }
	      curData = curData[curSlice];
	      curSlice = nextSlice;
	    }
	    var oldData = curData[curSlice];
	    curData[curSlice] = withDeepCopy ? (0, _deep_copy.deepCopy)(newData) : newData;
	    changedValues[i] = [curData[curSlice], oldData];
	  }
	};
	
	var mergeDataWithSpec = exports.mergeDataWithSpec = function mergeDataWithSpec(data, changes, useSpecField, withDeepCopy, deepCopyRoot) {
	  var root = deepCopyRoot ? (0, _deep_copy.deepCopy)(data) : data;
	  for (var i = 0; i < changes.length; i++) {
	    var changeInfo = changes[i];
	    var path = changeInfo[1];
	    var value = changeInfo[2];
	    var specValue = changeInfo[3];
	    var node = root;
	    var field = path[0];
	    for (var j = 1; j < path.length; j++) {
	      node = node[field];
	      if (node != null && node.__wxspec__) node = node.__value__;
	      field = path[j];
	      if (node != null && !hasOwnProperty.call(node, field)) {
	        node = null;
	        break;
	      }
	    }
	    if (node != null && hasOwnProperty.call(node, field)) {
	      if (useSpecField) {
	        if (specValue != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value instanceof Array === specValue instanceof Array) {
	          node[field] = {
	            __value__: specValue,
	            __wxspec__: true
	          };
	        } else if (node[field] == null || !node[field].__wxspec__) {
	          node[field] = {
	            __value__: node[field],
	            __wxspec__: true
	          };
	        }
	      } else {
	        node[field] = withDeepCopy ? (0, _deep_copy.deepCopy)(value, false) : value;
	      }
	    }
	  }
	  return root;
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var deepCopyField = function deepCopyField(src, visited) {
	  var srcType = typeof src === 'undefined' ? 'undefined' : _typeof(src);
	  if (srcType === 'object' && src !== null) {
	    var dest = visited ? visited.get(src) : undefined;
	    if (dest !== undefined) return dest;
	    if (src instanceof Array) {
	      dest = [];
	      if (visited) visited.set(src, dest);
	      for (var i = 0; i < src.length; i++) {
	        dest[i] = deepCopyField(src[i], visited);
	      }
	    } else {
	      dest = {};
	      if (visited) visited.set(src, dest);
	      for (var k in src) {
	        if (hasOwnProperty.call(src, k)) {
	          dest[k] = deepCopyField(src[k], visited);
	        }
	      }
	    }
	    return dest;
	  }
	  if (srcType === 'symbol') return undefined;
	  return src;
	};
	
	var deepCopy = exports.deepCopy = function deepCopy(src, withRecursive) {
	  var visited = withRecursive && typeof WeakMap !== 'undefined' ? new WeakMap() : null;
	  return deepCopyField(src, visited);
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// get plugin subPackage prefix
	var pluginSubPackagePrefix = null;
	
	/* global __wxConfig: false */
	
	var initPluginSubPackagePrefix = function initPluginSubPackagePrefix() {
	  if (typeof __wxConfig === 'undefined') return;
	  pluginSubPackagePrefix = {};
	  if (__wxConfig.subPackages && __wxConfig.subPackages.length) {
	    __wxConfig.subPackages.forEach(function (item) {
	      if (!item) {
	        return;
	      }
	
	      var prefix = item.root || '';
	
	      if (prefix && prefix.slice(-1) !== '/') {
	        prefix += '/';
	      }
	      if (item.plugins) {
	        for (var k in item.plugins) {
	          if (!Object.prototype.hasOwnProperty.call(item.plugins, k)) {
	            continue;
	          }
	
	          var appid = item.plugins[k] && item.plugins[k].provider;
	
	          if (appid) {
	            pluginSubPackagePrefix[appid] = prefix;
	          }
	        }
	      }
	    });
	  }
	};
	
	var convertRouteToComponentAlias = exports.convertRouteToComponentAlias = function convertRouteToComponentAlias(route) {
	  var matches = route.match(/(?:^|\/)__(wx|plugin)__\/(.*)$/);
	
	  if (!matches) {
	    return route;
	  }
	  if (matches[1] === 'wx') {
	    return 'wx://' + matches[2];
	  }
	  return 'plugin-private://' + matches[2];
	};
	
	var convertComponentAliasToRoute = exports.convertComponentAliasToRoute = function convertComponentAliasToRoute(alias) {
	  if (!pluginSubPackagePrefix) {
	    initPluginSubPackagePrefix();
	  }
	  var normalizedAlias = exparser.Component._list[alias] ? exparser.Component._list[alias].is || alias : alias;
	  var ret = normalizedAlias
	  // eslint-disable-next-line no-unused-vars
	  .replace(/^plugin-private:\/\/([0-9a-zA-Z]+)\//, function (match, appid) {
	    return (pluginSubPackagePrefix[appid] || '') + '__plugin__/' + appid + '/';
	  }).replace(/^wx:\/\//, '__wx__/');
	
	  return ret;
	};
	
	var getPluginRoutePrefix = exports.getPluginRoutePrefix = function getPluginRoutePrefix(appid) {
	  if (!pluginSubPackagePrefix) {
	    initPluginSubPackagePrefix();
	  }
	  return (pluginSubPackagePrefix[appid] || '') + '__plugin__/' + appid + '/';
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.restoreView = exports.saveView = undefined;
	
	var _constants = __webpack_require__(5);
	
	var _bridge = __webpack_require__(18);
	
	var _utils = __webpack_require__(2);
	
	var _tree_manager = __webpack_require__(15);
	
	var _tree_manager2 = _interopRequireDefault(_tree_manager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var splitLimit = 1024 * 341; // 分片传输数据的长度，暂定为 0.33 Mb
	var splitId = Date.now();
	
	var saveView = exports.saveView = function saveView(viewId, statesData) {
	  var tm = _tree_manager2.default.get(viewId);
	  if (!tm) return;
	  tm.statesData = statesData;
	  (0, _utils.dfsComponents)(tm.root, 1, function (node) {
	    node.triggerLifeTime('saved');
	  });
	  (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.SAVE_STATE, [], viewId);
	};
	
	var restoreView = exports.restoreView = function restoreView(viewId) {
	  var tm = _tree_manager2.default.get(viewId);
	  if (!tm) return;
	  var idNodeMap = tm.nodeId.getAll();
	  var idDataMap = {};
	  var compIdArr = [];
	  (0, _utils.dfsComponents)(tm.root, 1, function (node) {
	    var compId = tm.nodeId.getNodeId(node);
	    compIdArr.push(compId);
	    idDataMap[compId] = idNodeMap[compId].data;
	  });
	
	  var restoredData = [tm.statesData || {}, idDataMap, compIdArr];
	  var dataString = JSON.stringify(restoredData);
	  var totalLength = dataString.length;
	
	  // restored 状态，序列化数据判断是否需要分片处理
	  if (totalLength > splitLimit) {
	    // 数据分片
	    var splitList = [];
	    var beginIndex = 0;
	
	    while (totalLength > beginIndex) {
	      splitList.push(dataString.substr(beginIndex, splitLimit));
	      beginIndex += splitLimit;
	    }
	
	    // 发送分片数据
	    var id = ++splitId;
	
	    for (var i = 0, len = splitList.length; i < len; i++) {
	      (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.RESTORE_STATE, [{
	        isSplitData: true,
	        splitInfo: {
	          id: id,
	          index: i + 1,
	          total: len,
	          data: splitList[i]
	        }
	      }], viewId);
	    }
	  } else {
	    (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.RESTORE_STATE, restoredData, viewId);
	  }
	
	  tm.statesData = undefined;
	  (0, _bridge.sendData)(_constants.SYNC_EVENT_NAME.COMPONENT_DEF, tm.usedDef, viewId);
	  var root = tm.root;
	  tm.operationFlow.start();
	  tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION, root.is, tm.nodeId.getNodeId(root)]);
	  tm.operationFlow.push([_constants.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION]);
	  tm.operationFlow.end();
	  (0, _utils.dfsComponents)(tm.root, 1, function (node) {
	    node.triggerLifeTime('restored');
	  });
	};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.scheduleIntersectionUpdate = exports.removeIntersectionObserver = exports.addIntersectionObserver = undefined;
	
	var _utils = __webpack_require__(2);
	
	// 搜集所有的intersection监听器
	var intersectionListeners = {};
	var targetObservers = {};
	var listenerIdCountMap = {};
	
	// 检测intersection
	var filterBoundingFields = function filterBoundingFields(rect) {
	  return {
	    left: rect.left,
	    top: rect.top,
	    right: rect.right,
	    bottom: rect.bottom,
	    width: rect.width,
	    height: rect.height
	  };
	};
	var measureIntersect = function measureIntersect(baseRect, newRect) {
	  var rect = {
	    left: baseRect.left < newRect.left ? newRect.left : baseRect.left,
	    top: baseRect.top < newRect.top ? newRect.top : baseRect.top,
	    right: baseRect.right > newRect.right ? newRect.right : baseRect.right,
	    bottom: baseRect.bottom > newRect.bottom ? newRect.bottom : baseRect.bottom,
	    width: 0,
	    height: 0
	  };
	  if (rect.right > rect.left) {
	    rect.width = rect.right - rect.left;
	  } else {
	    rect.right = rect.left = rect.bottom = rect.top = 0;
	  }
	  if (rect.bottom > rect.top) {
	    rect.height = rect.bottom - rect.top;
	  } else {
	    rect.right = rect.left = rect.bottom = rect.top = 0;
	  }
	  return rect;
	};
	var measureRelativeRect = function measureRelativeRect(relatives) {
	  var clientWidth = document.documentElement.clientWidth;
	  var clientHeight = document.documentElement.clientHeight;
	  var retRect = null;
	  for (var i = 0; i < relatives.length; i++) {
	    var _relatives$i = relatives[i],
	        node = _relatives$i.node,
	        margins = _relatives$i.margins;
	
	    var boundingRect = node ? node.$$.getBoundingClientRect() : { left: 0, top: 0, right: clientWidth, bottom: clientHeight, width: clientWidth, height: clientHeight };
	    var rect = {
	      left: boundingRect.left - margins.left,
	      top: boundingRect.top - margins.top,
	      right: boundingRect.right + margins.right,
	      bottom: boundingRect.bottom + margins.bottom
	    };
	    if (retRect) retRect = measureIntersect(retRect, rect);else retRect = rect;
	  }
	  return retRect;
	};
	var updateTargetIntersection = function updateTargetIntersection(listenerInfo) {
	  var targetNode = listenerInfo.targetNode,
	      relatives = listenerInfo.relatives,
	      thresholds = listenerInfo.thresholds,
	      minWidthOrHeight = listenerInfo.minWidthOrHeight,
	      cb = listenerInfo.cb,
	      currentRatio = listenerInfo.currentRatio;
	
	  var relativeRect = measureRelativeRect(relatives);
	  var targetRect = filterBoundingFields(targetNode.$$.getBoundingClientRect());
	  if (targetRect.right - targetRect.left < minWidthOrHeight) {
	    targetRect.right = targetRect.left + minWidthOrHeight;
	    targetRect.width = minWidthOrHeight;
	  }
	  if (targetRect.bottom - targetRect.top < minWidthOrHeight) {
	    targetRect.bottom = targetRect.top + minWidthOrHeight;
	    targetRect.height = minWidthOrHeight;
	  }
	  var intersectRect = measureIntersect(relativeRect, targetRect);
	  var targetArea = targetRect.width * targetRect.height;
	  var intersectRatio = targetArea ? intersectRect.width * intersectRect.height / targetArea : 0;
	  listenerInfo.currentRatio = intersectRatio;
	
	  var needCb = currentRatio === undefined;
	  // NOTE in this algorithm, if three adjacent detects are <threshold, ==thresholds, and >thresholds, it will trigger cb 2 times
	  if (intersectRatio !== currentRatio) {
	    // eslint-disable-next-line consistent-return
	    thresholds.forEach(function (threshold) {
	      if (needCb) return false;
	      if (intersectRatio <= threshold && currentRatio >= threshold) needCb = true;else if (intersectRatio >= threshold && currentRatio <= threshold) needCb = true;
	    });
	  }
	
	  if (needCb) {
	    cb.call(targetNode, {
	      id: targetNode.id,
	      dataset: targetNode.dataset,
	      time: Date.now(),
	      boundingClientRect: targetRect,
	      intersectionRatio: intersectRatio,
	      intersectionRect: filterBoundingFields(intersectRect),
	      relativeRect: relativeRect
	    });
	  }
	};
	var updateIntersections = function updateIntersections() {
	  for (var k in intersectionListeners) {
	    updateTargetIntersection(intersectionListeners[k]);
	  }
	};
	
	// 注册/注销需要执行intersection检测的节点
	var normalizeMarginRect = function normalizeMarginRect(margins) {
	  margins = margins || {};
	  return {
	    left: margins.left || 0,
	    top: margins.top || 0,
	    right: margins.right || 0,
	    bottom: margins.bottom || 0
	  };
	};
	var observeIntersection = function observeIntersection(targetNodes, relatives, thresholds, initialRatio, minWidthOrHeight, cb) {
	  var listenerGroupId = (0, _utils.guid)();
	  if (!targetNodes.length || !relatives.length) return listenerGroupId;
	  var nodesCount = targetNodes.length;
	  listenerIdCountMap[listenerGroupId] = nodesCount;
	  targetNodes.forEach(function (targetNode, i) {
	    var listenerId = listenerGroupId + '#' + i;
	    var listenerInfo = {
	      targetNode: targetNode,
	      relatives: relatives,
	      thresholds: thresholds,
	      currentRatio: initialRatio,
	      minWidthOrHeight: minWidthOrHeight,
	      cb: cb
	    };
	    var observer = exparser.Observer.create(function (e) {
	      if (e.status === 'attached') {
	        intersectionListeners[listenerId] = listenerInfo;
	        requestAnimationFrame(function () {
	          updateTargetIntersection(listenerInfo);
	        });
	      } else if (e.status === 'detached') {
	        delete intersectionListeners[listenerId];
	        observer.disconnect();
	        delete targetObservers[listenerId];
	        nodesCount--;
	        if (!nodesCount) delete listenerIdCountMap[listenerGroupId];
	      }
	    });
	    targetObservers[listenerId] = observer;
	    observer.observe(targetNode, { attachStatus: true });
	    if (exparser.Element.isAttached(targetNode)) {
	      intersectionListeners[listenerId] = listenerInfo;
	      requestAnimationFrame(function () {
	        updateTargetIntersection(listenerInfo);
	      });
	    }
	  });
	  return listenerGroupId;
	};
	
	// 注册/注销的外部接口
	var addIntersectionObserver = exports.addIntersectionObserver = function addIntersectionObserver(shadowRoot, targetSelector, relativeInfo, options, cb) {
	  options = options || {};
	  var targetNodes = null;
	  if (options.observeAll) {
	    targetNodes = shadowRoot.querySelectorAll(targetSelector);
	  } else {
	    var selected = shadowRoot.querySelector(targetSelector);
	    if (selected) targetNodes = [selected];else targetNodes = [];
	  }
	  if (!targetNodes.length) console.warn('For developer:Node "' + targetSelector + '" is not found. Intersection observer will not trigger.');
	  var relatives = [];
	  relativeInfo.forEach(function (rel) {
	    var selector = rel.selector,
	        margins = rel.margins;
	
	    var node = selector == null ? null : shadowRoot.querySelector(selector);
	    if (!node && selector != null) console.warn('For developer:Node "' + selector + '" is not found. The relative node for intersection observer will be ignored.');else relatives.push({ node: node, margins: normalizeMarginRect(margins) });
	  });
	  if (!relatives.length) console.warn('For developer:Intersection observer will be ignored because no relative nodes are found.');
	  return observeIntersection(targetNodes, relatives, options.thresholds || [0], options.initialRatio || 0, options.minWidthOrHeight || 0, cb);
	};
	var removeIntersectionObserver = exports.removeIntersectionObserver = function removeIntersectionObserver(listenerGroupId) {
	  var count = listenerIdCountMap[listenerIdCountMap];
	  delete listenerIdCountMap[listenerIdCountMap];
	  for (var i = 0; i < count; i++) {
	    var listenerId = listenerGroupId + '#' + i;
	    var observer = targetObservers[listenerId];
	    if (!observer) break;
	    delete intersectionListeners[listenerId];
	    observer.disconnect();
	    delete targetObservers[listenerId];
	  }
	};
	
	// 控制监测的频率
	var intersectionUpdateScheduled = false;
	var scheduleIntersectionUpdate = exports.scheduleIntersectionUpdate = function scheduleIntersectionUpdate() {
	  if (intersectionUpdateScheduled) return;
	  intersectionUpdateScheduled = true;
	  requestAnimationFrame(function () {
	    intersectionUpdateScheduled = false;
	    updateIntersections();
	  });
	};
	
	// 决定检测intersection的时机
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  // 因为在 ./animation.js 中，动画期间会触发pageReRender，所以动画事件不需要单独监听
	  document.addEventListener('pageReRender', function () {
	    scheduleIntersectionUpdate();
	  });
	  window.addEventListener('scroll', function () {
	    scheduleIntersectionUpdate();
	  }, { capture: true, passive: true });
	}

/***/ })
/******/ ]);
//# sourceMappingURL=virtual_dom.js.map