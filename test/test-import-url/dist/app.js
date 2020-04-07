/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "https://cdn.wetest.qq.com/fsight-component//dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__filename) {console.log(1, __filename, __webpack_require__.p);\nconsole.log(\"development\");\nvar load = __webpack_require__(/*! little-loader */ \"./node_modules/little-loader/lib/little-loader.js\");\n\nload(\"http://example.com/foo.js\", function (err) {\n  // ... your code ...\n});\nconsole.log(__filename);\n/* WEBPACK VAR INJECTION */}.call(this, \"/index.js\"))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/little-loader/lib/little-loader.js":
/*!*********************************************************!*\
  !*** ./node_modules/little-loader/lib/little-loader.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Script loading is difficult thanks to IE. We need callbacks to fire\n * immediately following the script's execution, with no other scripts\n * running in between. If other scripts on the page are able to run\n * between our script and its callback, bad things can happen, such as\n * `jQuery.noConflict` not being called in time, resulting in plugins\n * latching onto our version of jQuery, etc.\n *\n * For IE<10 we use a relatively well-documented \"preloading\" strategy,\n * which ensures that the script is ready to execute *before* appending\n * it to the DOM. That way when it is finally appended, it is\n * executed immediately.\n *\n * References:\n * - http://www.html5rocks.com/en/tutorials/speed/script-loading/\n * - http://blog.getify.com/ie11-please-bring-real-script-preloading-back/\n * - https://github.com/jrburke/requirejs/issues/526\n * - https://connect.microsoft.com/IE/feedback/details/729164/\n *           ie10-dynamic-script-element-fires-loaded-readystate-prematurely\n */\n(function () {\n\n  // Global state.\n  var pendingScripts = {};\n  var scriptCounter = 0;\n\n  /**\n   * Insert script into the DOM\n   *\n   * @param {Object} script Script DOM object\n   * @returns {void}\n   */\n  var _addScript = function (script) {\n    // Get the first script element, we're just going to use it\n    // as a reference for where to insert ours. Do NOT try to do\n    // this just once at the top and then re-use the same script\n    // as a reference later. Some weird loaders *remove* script\n    // elements after the browser has executed their contents,\n    // so the same reference might not have a parentNode later.\n    var firstScript = document.getElementsByTagName(\"script\")[0];\n\n    // Append the script to the DOM, triggering execution.\n    firstScript.parentNode.insertBefore(script, firstScript);\n  };\n\n  /**\n   * Load Script.\n   *\n   * @param {String}            src       URI of script\n   * @param {Function|Object}   callback  (Optional) Called on script load completion,\n   *                                      or options object\n   * @param {Object}            context   (Optional) Callback context (`this`)\n   * @returns {void}\n   */\n  var _lload = function (src, callback, context) {\n    /*eslint max-statements: [2, 32]*/\n    var setup;\n\n    if (callback && typeof callback !== \"function\") {\n      context = callback.context || context;\n      setup = callback.setup;\n      callback = callback.callback;\n    }\n\n    var script = document.createElement(\"script\");\n    var done = false;\n    var err;\n    var _cleanup; // _must_ be set below.\n\n    /**\n     * Final handler for error or completion.\n     *\n     * **Note**: Will only be called _once_.\n     *\n     * @returns {void}\n     */\n    var _finish = function () {\n      // Only call once.\n      if (done) { return; }\n      done = true;\n\n      // Internal cleanup.\n      _cleanup();\n\n      // Callback.\n      if (callback) {\n        callback.call(context, err);\n      }\n    };\n\n    /**\n     * Error handler\n     *\n     * @returns {void}\n     */\n    var _error = function () {\n      err = new Error(src || \"EMPTY\");\n      _finish();\n    };\n\n    if (script.readyState && !(\"async\" in script)) {\n      /*eslint-disable consistent-return*/\n\n      // This section is only for IE<10. Some other old browsers may\n      // satisfy the above condition and enter this branch, but we don't\n      // support those browsers anyway.\n\n      var id = scriptCounter++;\n      var isReady = { loaded: true, complete: true };\n      var inserted = false;\n\n      // Clear out listeners, state.\n      _cleanup = function () {\n        script.onreadystatechange = script.onerror = null;\n        pendingScripts[id] = void 0;\n      };\n\n      // Attach the handler before setting src, otherwise we might\n      // miss events (consider that IE could fire them synchronously\n      // upon setting src, for example).\n      script.onreadystatechange = function () {\n        var firstState = script.readyState;\n\n        // Protect against any errors from state change randomness.\n        if (err) { return; }\n\n        if (!inserted && isReady[firstState]) {\n          inserted = true;\n\n          // Append to DOM.\n          _addScript(script);\n        }\n\n        // --------------------------------------------------------------------\n        //                       GLORIOUS IE8 HACKAGE!!!\n        // --------------------------------------------------------------------\n        //\n        // Oh IE8, how you disappoint. IE8 won't call `script.onerror`, so\n        // we have to resort to drastic measures.\n        // See, e.g. http://www.quirksmode.org/dom/events/error.html#t02\n        //\n        // As with all things development, there's a Stack Overflow comment that\n        // asserts the following combinations of state changes in IE8 indicate a\n        // script load error. And crazily, it seems to work!\n        //\n        // http://stackoverflow.com/a/18840568/741892\n        //\n        // The `script.readyState` transitions we're interested are:\n        //\n        // * If state starts as `loaded`\n        // * Call `script.children`, which _should_ change state to `complete`\n        // * If state is now `loading`, then **we have a load error**\n        //\n        // For the reader's amusement, here is HeadJS's catalog of various\n        // `readyState` transitions in normal operation for IE:\n        // https://github.com/headjs/headjs/blob/master/src/2.0.0/load.js#L379-L419\n        if (firstState === \"loaded\") {\n          // The act of accessing the property should change the script's\n          // `readyState`.\n          //\n          // And, oh yeah, this hack is so hacky-ish we need the following\n          // eslint disable...\n          /*eslint-disable no-unused-expressions*/\n          script.children;\n          /*eslint-enable no-unused-expressions*/\n\n          if (script.readyState === \"loading\") {\n            // State transitions indicate we've hit the load error.\n            //\n            // **Note**: We are not intending to _return_ a value, just have\n            // a shorter short-circuit code path here.\n            return _error();\n          }\n        }\n\n        // It's possible for readyState to be \"complete\" immediately\n        // after we insert (and execute) the script in the branch\n        // above. So check readyState again here and react without\n        // waiting for another onreadystatechange.\n        if (script.readyState === \"complete\") {\n          _finish();\n        }\n      };\n\n      // Onerror handler _may_ work here.\n      script.onerror = _error;\n\n      // Since we're not appending the script to the DOM yet, the\n      // reference to our script element might get garbage collected\n      // when this function ends, without onreadystatechange ever being\n      // fired. This has been witnessed to happen. Adding it to\n      // `pendingScripts` ensures this can't happen.\n      pendingScripts[id] = script;\n\n      // call the setup callback to mutate the script tag\n      if (setup) {\n        setup.call(context, script);\n      }\n\n      // This triggers a request for the script, but its contents won't\n      // be executed until we append it to the DOM.\n      script.src = src;\n\n      // In some cases, the readyState is already \"loaded\" immediately\n      // after setting src. It's a lie! Don't append to the DOM until\n      // the onreadystatechange event says so.\n\n    } else {\n      // This section is for modern browsers, including IE10+.\n\n      // Clear out listeners.\n      _cleanup = function () {\n        script.onload = script.onerror = null;\n      };\n\n      script.onerror = _error;\n      script.onload = _finish;\n      script.async = true;\n      script.charset = \"utf-8\";\n\n      // call the setup callback to mutate the script tag\n      if (setup) {\n        setup.call(context, script);\n      }\n\n      script.src = src;\n\n      // Append to DOM.\n      _addScript(script);\n    }\n  };\n\n  // UMD wrapper.\n  /*global define:false*/\n  if (true) {\n    // CommonJS\n    module.exports = _lload;\n\n  } else {}\n}());\n\n\n//# sourceURL=webpack:///./node_modules/little-loader/lib/little-loader.js?");

/***/ })

/******/ });