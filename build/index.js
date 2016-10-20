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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _app = __webpack_require__(2);

	var _app2 = _interopRequireDefault(_app);

	var port = process.env.PORT || 4000;

	_app2['default'].listen(port, function () {
	  console.log('Starting server on port', port);
	});

	exports['default'] = _app2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _serverSlotGame = __webpack_require__(3);

	var _serverSlotGame2 = _interopRequireDefault(_serverSlotGame);

	var _serverGame = __webpack_require__(4);

	var _serverGame2 = _interopRequireDefault(_serverGame);

	var app = (0, _express2['default'])();

	//Game interface
	app.use('/', _express2['default']['static'](__dirname + '/public'));

	app.get('/game/:_id', function (req, res) {
	  var _slotGame = new _serverSlotGame2['default']();
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(_slotGame.getGame(req.params._id)));
	});

	app.get('/spin', function (req, res) {
	  var _game = new _serverGame2['default']();
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(_game.spin()));
	});

	exports['default'] = app;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var SlotGame = (function () {
	  function SlotGame() {
	    _classCallCheck(this, SlotGame);

	    this._games = [{ id: 1, name: "Fruit Loops", symbols: [{ id: 'symbol_0' }, { id: 'symbol_1' }, { id: 'symbol_2' }, { id: 'symbol_3' }, { id: 'symbol_4' }, { id: 'symbol_5' }] }, { id: 2, name: "Fruit Loops (NEW)", symbols: [{ id: 'symbol_0' }, { id: 'symbol_1' }, { id: 'symbol_2' }, { id: 'symbol_3' }, { id: 'symbol_4' }, { id: 'symbol_5' }] }, { id: 3, name: "Fruit Loops (EDIT)", symbols: [{ id: 'symbol_0' }, { id: 'symbol_1' }, { id: 'symbol_2' }, { id: 'symbol_3' }, { id: 'symbol_4' }, { id: 'symbol_5' }] }, { id: 4, name: "Fruit Loops (LIVE)", symbols: [{ id: 'symbol_0' }, { id: 'symbol_1' }, { id: 'symbol_2' }, { id: 'symbol_3' }, { id: 'symbol_4' }, { id: 'symbol_5' }] }];
	  }

	  _createClass(SlotGame, [{
	    key: 'getGame',
	    value: function getGame(id) {
	      return { id: 2, name: "Fruit Loops", symbols: [{ id: 'symbol_0' }, { id: 'symbol_1' }, { id: 'symbol_2' }, { id: 'symbol_3' }, { id: 'symbol_4' }, { id: 'symbol_5' }] };
	    }
	  }]);

	  return SlotGame;
	})();

	;

	exports['default'] = SlotGame;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = (function () {
	  function Game() {
	    _classCallCheck(this, Game);
	  }

	  _createClass(Game, [{
	    key: "spin",
	    value: function spin() {
	      return {
	        reel1: parseInt(Math.random() * 6),
	        reel2: parseInt(Math.random() * 6),
	        reel3: parseInt(Math.random() * 6),
	        bonus: parseInt(Math.random() * 2)
	      };
	    }
	  }]);

	  return Game;
	})();

	;

	exports["default"] = Game;
	module.exports = exports["default"];

/***/ }
/******/ ]);