/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
/******/ })
/************************************************************************/
/******/ ({

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = () => {
    chrome.runtime.onInstalled.addListener(function(details) {
        if (details.reason === 'install') {
            chrome.tabs.create({url: `chrome-extension://${chrome.runtime.id}/src/options/index.html`});
        }
    });
};




/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = () => {
    chrome.alarms.onAlarm.addListener(function (alarm) {
        if (alarm.name === "reminder") {
            runIfTrackerOpen(function () {
                alert("Hey y'all, it's time to send out your WWLTW email!");
            });
        }
    });
};

const runIfTrackerOpen = (callback) => {
    chrome.tabs.query({url: ["http://www.pivotaltracker.com/*", "https://www.pivotaltracker.com/*"]}, function (tabs) {
        if (tabs.length > 0) {
            callback();
        }
    });
};


/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__send_event__ = __webpack_require__(130);


/* harmony default export */ __webpack_exports__["a"] = () => {
    chrome.runtime.onMessage.addListener(
        function (request, sender, callback) {
            if (request.setAlarm) {
                chrome.alarms.create('reminder', {when: request.setAlarm});
                callback({alarmReceived: request.setAlarm});
                return;
            }
            if (request.eventType) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__send_event__["a" /* default */])(request.eventType);
            }
        }
    );
};


/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (eventType) => {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', "UA-92911260-2", 'auto');
    ga('set', 'checkProtocolTask', null);
    ga('require', 'displayfeatures');
    ga('send', 'event', 'modal', eventType);
};

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alarm_listener__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_listener__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_listener_for_first_install__ = __webpack_require__(114);




__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__alarm_listener__["a" /* default */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event_listener__["a" /* default */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__add_listener_for_first_install__["a" /* default */])();


/***/ })

/******/ });