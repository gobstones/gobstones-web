(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("gobstones-interpreter", [], factory);
	else if(typeof exports === 'object')
		exports["gobstones-interpreter"] = factory();
	else
		root["gobstones-interpreter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = i18n;
exports.i18nWithLanguage = i18nWithLanguage;
exports.i18nPosition = i18nPosition;

var _es = __webpack_require__(7);

var _en = __webpack_require__(11);

var _pt = __webpack_require__(12);

var CURRENT_LANGUAGE = 'es';

var dictionaries = {
  'es': _es.LOCALE_ES,
  'en': _en.LOCALE_EN,
  'pt': _pt.LOCALE_PT
};

function i18n(message) {
  return dictionaries[CURRENT_LANGUAGE][message];
}

function i18nWithLanguage(code, thunk) {
  if (!(code in dictionaries)) {
    throw Error('Invalid language code: ' + code);
  }
  var oldLanguage = CURRENT_LANGUAGE;
  CURRENT_LANGUAGE = code;
  try {
    return thunk();
  } finally {
    CURRENT_LANGUAGE = oldLanguage;
  }
}

function i18nPosition(position) {
  return i18n('<position>')(position.filename, position.line, position.column);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GbsRuntimeError = exports.GbsSyntaxError = exports.GbsWarning = exports.GbsInterpreterException = undefined;

var _i18n = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Base class for signalling conditions */
var GbsInterpreterException = exports.GbsInterpreterException = function (_Error) {
  _inherits(GbsInterpreterException, _Error);

  /* Note: position should typically be an instance of SourceReader */
  function GbsInterpreterException(startPos, endPos, errorType, reason, args) {
    _classCallCheck(this, GbsInterpreterException);

    var _this = _possibleConstructorReturn(this, (GbsInterpreterException.__proto__ || Object.getPrototypeOf(GbsInterpreterException)).call(this, reason, startPos.filename, startPos.row));

    _this.isGobstonesException = true;
    _this.startPos = startPos;
    _this.endPos = endPos;
    _this.reason = reason;
    _this.args = args;

    _this.message = reason === 'boom-called' ? args[0] : (0, _i18n.i18n)(errorType + ':' + reason);

    if (args.length > 0 && typeof _this.message === 'function') {
      _this.message = _this.message.apply(null, args);
    }
    return _this;
  }

  return GbsInterpreterException;
}(Error);

var GbsWarning = exports.GbsWarning = function (_GbsInterpreterExcept) {
  _inherits(GbsWarning, _GbsInterpreterExcept);

  function GbsWarning(startPos, endPos, reason, args) {
    _classCallCheck(this, GbsWarning);

    return _possibleConstructorReturn(this, (GbsWarning.__proto__ || Object.getPrototypeOf(GbsWarning)).call(this, startPos, endPos, 'warning', reason, args));
  }

  return GbsWarning;
}(GbsInterpreterException);

var GbsSyntaxError = exports.GbsSyntaxError = function (_GbsInterpreterExcept2) {
  _inherits(GbsSyntaxError, _GbsInterpreterExcept2);

  function GbsSyntaxError(startPos, endPos, reason, args) {
    _classCallCheck(this, GbsSyntaxError);

    return _possibleConstructorReturn(this, (GbsSyntaxError.__proto__ || Object.getPrototypeOf(GbsSyntaxError)).call(this, startPos, endPos, 'errmsg', reason, args));
  }

  return GbsSyntaxError;
}(GbsInterpreterException);

var GbsRuntimeError = exports.GbsRuntimeError = function (_GbsInterpreterExcept3) {
  _inherits(GbsRuntimeError, _GbsInterpreterExcept3);

  function GbsRuntimeError(startPos, endPos, reason, args) {
    _classCallCheck(this, GbsRuntimeError);

    return _possibleConstructorReturn(this, (GbsRuntimeError.__proto__ || Object.getPrototypeOf(GbsRuntimeError)).call(this, startPos, endPos, 'errmsg', reason, args));
  }

  return GbsRuntimeError;
}(GbsInterpreterException);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ASTConstructorDeclaration = exports.ASTFieldBinding = exports.ASTExprFunctionCall = exports.ASTExprStructureUpdate = exports.ASTExprStructure = exports.ASTExprTuple = exports.ASTExprRange = exports.ASTExprList = exports.ASTExprMatching = exports.ASTExprChoose = exports.ASTExprConstantString = exports.ASTExprConstantNumber = exports.ASTExprVariable = exports.ASTPatternTimeout = exports.ASTPatternTuple = exports.ASTPatternStructure = exports.ASTPatternNumber = exports.ASTPatternVariable = exports.ASTPatternWildcard = exports.ASTStmtProcedureCall = exports.ASTStmtAssignTuple = exports.ASTStmtAssignVariable = exports.ASTMatchingBranch = exports.ASTSwitchBranch = exports.ASTStmtSwitch = exports.ASTStmtWhile = exports.ASTStmtForeach = exports.ASTStmtRepeat = exports.ASTStmtIf = exports.ASTStmtReturn = exports.ASTStmtBlock = exports.ASTDefType = exports.ASTDefFunction = exports.ASTDefProcedure = exports.ASTDefInteractiveProgram = exports.ASTDefProgram = exports.ASTMain = exports.ASTNode = exports.N_ConstructorDeclaration = exports.N_FieldBinding = exports.N_MatchingBranch = exports.N_SwitchBranch = exports.N_ExprFunctionCall = exports.N_ExprStructureUpdate = exports.N_ExprStructure = exports.N_ExprTuple = exports.N_ExprRange = exports.N_ExprList = exports.N_ExprMatching = exports.N_ExprChoose = exports.N_ExprConstantString = exports.N_ExprConstantNumber = exports.N_ExprVariable = exports.N_PatternTimeout = exports.N_PatternTuple = exports.N_PatternStructure = exports.N_PatternNumber = exports.N_PatternVariable = exports.N_PatternWildcard = exports.N_StmtProcedureCall = exports.N_StmtAssignTuple = exports.N_StmtAssignVariable = exports.N_StmtSwitch = exports.N_StmtWhile = exports.N_StmtForeach = exports.N_StmtRepeat = exports.N_StmtIf = exports.N_StmtReturn = exports.N_StmtBlock = exports.N_DefType = exports.N_DefFunction = exports.N_DefProcedure = exports.N_DefInteractiveProgram = exports.N_DefProgram = exports.N_Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reader = __webpack_require__(6);

var _token = __webpack_require__(3);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var N_Main = exports.N_Main = Symbol.for('N_Main');
/* Definitions */
var N_DefProgram = exports.N_DefProgram = Symbol.for('N_DefProgram');
var N_DefInteractiveProgram = exports.N_DefInteractiveProgram = Symbol.for('N_DefInteractiveProgram');
var N_DefProcedure = exports.N_DefProcedure = Symbol.for('N_DefProcedure');
var N_DefFunction = exports.N_DefFunction = Symbol.for('N_DefFunction');
var N_DefType = exports.N_DefType = Symbol.for('N_DefType');
/* Statements */
var N_StmtBlock = exports.N_StmtBlock = Symbol.for('N_StmtBlock');
var N_StmtReturn = exports.N_StmtReturn = Symbol.for('N_StmtReturn');
var N_StmtIf = exports.N_StmtIf = Symbol.for('N_StmtIf');
var N_StmtRepeat = exports.N_StmtRepeat = Symbol.for('N_StmtRepeat');
var N_StmtForeach = exports.N_StmtForeach = Symbol.for('N_StmtForeach');
var N_StmtWhile = exports.N_StmtWhile = Symbol.for('N_StmtWhile');
var N_StmtSwitch = exports.N_StmtSwitch = Symbol.for('N_StmtSwitch');
var N_StmtAssignVariable = exports.N_StmtAssignVariable = Symbol.for('N_StmtAssignVariable');
var N_StmtAssignTuple = exports.N_StmtAssignTuple = Symbol.for('N_StmtAssignTuple');
var N_StmtProcedureCall = exports.N_StmtProcedureCall = Symbol.for('N_StmtProcedureCall');
/* Patterns */
var N_PatternWildcard = exports.N_PatternWildcard = Symbol.for('N_PatternWildcard');
var N_PatternVariable = exports.N_PatternVariable = Symbol.for('N_PatternVariable');
var N_PatternNumber = exports.N_PatternNumber = Symbol.for('N_PatternNumber');
var N_PatternStructure = exports.N_PatternStructure = Symbol.for('N_PatternStructure');
var N_PatternTuple = exports.N_PatternTuple = Symbol.for('N_PatternTuple');
var N_PatternTimeout = exports.N_PatternTimeout = Symbol.for('N_PatternTimeout');
/* Expressions */
var N_ExprVariable = exports.N_ExprVariable = Symbol.for('N_ExprVariable');
var N_ExprConstantNumber = exports.N_ExprConstantNumber = Symbol.for('N_ExprConstantNumber');
var N_ExprConstantString = exports.N_ExprConstantString = Symbol.for('N_ExprConstantString');
var N_ExprChoose = exports.N_ExprChoose = Symbol.for('N_ExprChoose');
var N_ExprMatching = exports.N_ExprMatching = Symbol.for('N_ExprMatching');
var N_ExprList = exports.N_ExprList = Symbol.for('N_ExprList');
var N_ExprRange = exports.N_ExprRange = Symbol.for('N_ExprRange');
var N_ExprTuple = exports.N_ExprTuple = Symbol.for('N_ExprTuple');
var N_ExprStructure = exports.N_ExprStructure = Symbol.for('N_ExprStructure');
var N_ExprStructureUpdate = exports.N_ExprStructureUpdate = Symbol.for('N_ExprStructureUpdate');
var N_ExprFunctionCall = exports.N_ExprFunctionCall = Symbol.for('N_ExprFunctionCall');
/* SwitchBranch: pattern -> body */
var N_SwitchBranch = exports.N_SwitchBranch = Symbol.for('N_SwitchBranch');
/* MatchingBranch: pattern -> body */
var N_MatchingBranch = exports.N_MatchingBranch = Symbol.for('N_MatchingBranch');
/* FieldBinding: fieldName <- value */
var N_FieldBinding = exports.N_FieldBinding = Symbol.for('N_FieldBinding');
/* ConstructorDeclaration */
var N_ConstructorDeclaration = exports.N_ConstructorDeclaration = Symbol.for('N_ConstructorDeclaration');

/* Helper functions for the ASTNode toString method */

function indent(string) {
  var lines = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = string.split('\n')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      lines.push('  ' + line);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return lines.join('\n');
}

var showASTs = void 0; /* Forward declaration (for ESLint) */

function showAST(node) {
  if (node === null) {
    return 'null';
  } else if (node instanceof Array) {
    return '[\n' + showASTs(node).join(',\n') + '\n]';
  } else if (node instanceof _token.Token) {
    return node.toString();
  } else {
    var tag = Symbol.keyFor(node.tag).substring(2);
    return tag + '(\n' + showASTs(node.children).join(',\n') + '\n)';
  }
}

showASTs = function showASTs(nodes) {
  var res = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var node = _step2.value;

      res.push(indent(showAST(node)));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return res;
};

/* An instance of ASTNode represents a node of the abstract syntax tree.
 * - tag should be a node tag symbol.
 * - children should be (recursively) a possibly empty array of ASTNode's.
 * - startPos and endPos represent the starting and ending
 *   position of the code fragment in the source code, to aid error
 *   reporting.
 */

var ASTNode = exports.ASTNode = function () {
  function ASTNode(tag, children) {
    _classCallCheck(this, ASTNode);

    this._tag = tag;
    this._children = children;
    this._startPos = _reader.UnknownPosition;
    this._endPos = _reader.UnknownPosition;
    this._attributes = {};

    /* Assert this invariant to protect against common mistakes. */
    if (!(children instanceof Array)) {
      throw Error('The children of an ASTNode should be an array.');
    }
  }

  _createClass(ASTNode, [{
    key: 'toMulangLike',
    value: function toMulangLike() {
      return {
        tag: this._tag.toString().replace(/(^Symbol\(|\)$)/g, ''),
        contents: this._children.map(function (node) {
          if (node === null) {
            return 'null';
          } else if (node instanceof Array) {
            return new ASTNode(Symbol('?'), node).toMulangLike().contents;
          } else if (node instanceof ASTNode) {
            return node.toMulangLike();
          } else if (node instanceof _token.Token) {
            return node.toString();
          } else {
            return '?';
          }
        })
      };
    }
  }, {
    key: 'toString',
    value: function toString() {
      return showAST(this);
    }
  }, {
    key: 'tag',
    get: function get() {
      return this._tag;
    }
  }, {
    key: 'children',
    get: function get() {
      return this._children;
    }
  }, {
    key: 'startPos',
    set: function set(position) {
      this._startPos = position;
    },
    get: function get() {
      return this._startPos;
    }
  }, {
    key: 'endPos',
    set: function set(position) {
      this._endPos = position;
    },
    get: function get() {
      return this._endPos;
    }
  }, {
    key: 'attributes',
    get: function get() {
      return this._attributes;
    },
    set: function set(attributes) {
      this._attributes = attributes;
    }
  }]);

  return ASTNode;
}();

/* Main */

var ASTMain = exports.ASTMain = function (_ASTNode) {
  _inherits(ASTMain, _ASTNode);

  function ASTMain(definitions) {
    _classCallCheck(this, ASTMain);

    return _possibleConstructorReturn(this, (ASTMain.__proto__ || Object.getPrototypeOf(ASTMain)).call(this, N_Main, definitions));
  }

  _createClass(ASTMain, [{
    key: 'definitions',
    get: function get() {
      return this._children;
    }
  }]);

  return ASTMain;
}(ASTNode);

/* Definitions */

var ASTDefProgram = exports.ASTDefProgram = function (_ASTNode2) {
  _inherits(ASTDefProgram, _ASTNode2);

  function ASTDefProgram(body) {
    _classCallCheck(this, ASTDefProgram);

    return _possibleConstructorReturn(this, (ASTDefProgram.__proto__ || Object.getPrototypeOf(ASTDefProgram)).call(this, N_DefProgram, [body]));
  }

  _createClass(ASTDefProgram, [{
    key: 'body',
    get: function get() {
      return this.children[0];
    }
  }]);

  return ASTDefProgram;
}(ASTNode);

var ASTDefInteractiveProgram = exports.ASTDefInteractiveProgram = function (_ASTNode3) {
  _inherits(ASTDefInteractiveProgram, _ASTNode3);

  function ASTDefInteractiveProgram(branches) {
    _classCallCheck(this, ASTDefInteractiveProgram);

    return _possibleConstructorReturn(this, (ASTDefInteractiveProgram.__proto__ || Object.getPrototypeOf(ASTDefInteractiveProgram)).call(this, N_DefInteractiveProgram, branches));
  }

  _createClass(ASTDefInteractiveProgram, [{
    key: 'branches',
    get: function get() {
      return this.children;
    }
  }]);

  return ASTDefInteractiveProgram;
}(ASTNode);

var ASTDefProcedure = exports.ASTDefProcedure = function (_ASTNode4) {
  _inherits(ASTDefProcedure, _ASTNode4);

  function ASTDefProcedure(name, parameters, body) {
    _classCallCheck(this, ASTDefProcedure);

    return _possibleConstructorReturn(this, (ASTDefProcedure.__proto__ || Object.getPrototypeOf(ASTDefProcedure)).call(this, N_DefProcedure, [name, parameters, body]));
  }

  _createClass(ASTDefProcedure, [{
    key: 'name',
    get: function get() {
      return this.children[0];
    }
  }, {
    key: 'parameters',
    get: function get() {
      return this.children[1];
    }
  }, {
    key: 'body',
    get: function get() {
      return this.children[2];
    }
  }]);

  return ASTDefProcedure;
}(ASTNode);

var ASTDefFunction = exports.ASTDefFunction = function (_ASTNode5) {
  _inherits(ASTDefFunction, _ASTNode5);

  function ASTDefFunction(name, parameters, body) {
    _classCallCheck(this, ASTDefFunction);

    return _possibleConstructorReturn(this, (ASTDefFunction.__proto__ || Object.getPrototypeOf(ASTDefFunction)).call(this, N_DefFunction, [name, parameters, body]));
  }

  _createClass(ASTDefFunction, [{
    key: 'name',
    get: function get() {
      return this.children[0];
    }
  }, {
    key: 'parameters',
    get: function get() {
      return this.children[1];
    }
  }, {
    key: 'body',
    get: function get() {
      return this.children[2];
    }
  }]);

  return ASTDefFunction;
}(ASTNode);

var ASTDefType = exports.ASTDefType = function (_ASTNode6) {
  _inherits(ASTDefType, _ASTNode6);

  function ASTDefType(typeName, constructorDeclarations) {
    _classCallCheck(this, ASTDefType);

    return _possibleConstructorReturn(this, (ASTDefType.__proto__ || Object.getPrototypeOf(ASTDefType)).call(this, N_DefType, [typeName, constructorDeclarations]));
  }

  _createClass(ASTDefType, [{
    key: 'typeName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'constructorDeclarations',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTDefType;
}(ASTNode);

/* Statements */

var ASTStmtBlock = exports.ASTStmtBlock = function (_ASTNode7) {
  _inherits(ASTStmtBlock, _ASTNode7);

  function ASTStmtBlock(statements) {
    _classCallCheck(this, ASTStmtBlock);

    return _possibleConstructorReturn(this, (ASTStmtBlock.__proto__ || Object.getPrototypeOf(ASTStmtBlock)).call(this, N_StmtBlock, statements));
  }

  _createClass(ASTStmtBlock, [{
    key: 'statements',
    get: function get() {
      return this.children;
    }
  }]);

  return ASTStmtBlock;
}(ASTNode);

var ASTStmtReturn = exports.ASTStmtReturn = function (_ASTNode8) {
  _inherits(ASTStmtReturn, _ASTNode8);

  function ASTStmtReturn(result) {
    _classCallCheck(this, ASTStmtReturn);

    return _possibleConstructorReturn(this, (ASTStmtReturn.__proto__ || Object.getPrototypeOf(ASTStmtReturn)).call(this, N_StmtReturn, [result]));
  }

  _createClass(ASTStmtReturn, [{
    key: 'result',
    get: function get() {
      return this.children[0];
    }
  }]);

  return ASTStmtReturn;
}(ASTNode);

var ASTStmtIf = exports.ASTStmtIf = function (_ASTNode9) {
  _inherits(ASTStmtIf, _ASTNode9);

  // Note: elseBlock may be null
  function ASTStmtIf(condition, thenBlock, elseBlock) {
    _classCallCheck(this, ASTStmtIf);

    return _possibleConstructorReturn(this, (ASTStmtIf.__proto__ || Object.getPrototypeOf(ASTStmtIf)).call(this, N_StmtIf, [condition, thenBlock, elseBlock]));
  }

  _createClass(ASTStmtIf, [{
    key: 'condition',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'thenBlock',
    get: function get() {
      return this._children[1];
    }
  }, {
    key: 'elseBlock',
    get: function get() {
      return this._children[2];
    }
  }]);

  return ASTStmtIf;
}(ASTNode);

var ASTStmtRepeat = exports.ASTStmtRepeat = function (_ASTNode10) {
  _inherits(ASTStmtRepeat, _ASTNode10);

  function ASTStmtRepeat(times, body) {
    _classCallCheck(this, ASTStmtRepeat);

    return _possibleConstructorReturn(this, (ASTStmtRepeat.__proto__ || Object.getPrototypeOf(ASTStmtRepeat)).call(this, N_StmtRepeat, [times, body]));
  }

  _createClass(ASTStmtRepeat, [{
    key: 'times',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'body',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTStmtRepeat;
}(ASTNode);

var ASTStmtForeach = exports.ASTStmtForeach = function (_ASTNode11) {
  _inherits(ASTStmtForeach, _ASTNode11);

  function ASTStmtForeach(pattern, range, body) {
    _classCallCheck(this, ASTStmtForeach);

    return _possibleConstructorReturn(this, (ASTStmtForeach.__proto__ || Object.getPrototypeOf(ASTStmtForeach)).call(this, N_StmtForeach, [pattern, range, body]));
  }

  _createClass(ASTStmtForeach, [{
    key: 'pattern',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'range',
    get: function get() {
      return this._children[1];
    }
  }, {
    key: 'body',
    get: function get() {
      return this._children[2];
    }
  }]);

  return ASTStmtForeach;
}(ASTNode);

var ASTStmtWhile = exports.ASTStmtWhile = function (_ASTNode12) {
  _inherits(ASTStmtWhile, _ASTNode12);

  function ASTStmtWhile(condition, body) {
    _classCallCheck(this, ASTStmtWhile);

    return _possibleConstructorReturn(this, (ASTStmtWhile.__proto__ || Object.getPrototypeOf(ASTStmtWhile)).call(this, N_StmtWhile, [condition, body]));
  }

  _createClass(ASTStmtWhile, [{
    key: 'condition',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'body',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTStmtWhile;
}(ASTNode);

var ASTStmtSwitch = exports.ASTStmtSwitch = function (_ASTNode13) {
  _inherits(ASTStmtSwitch, _ASTNode13);

  function ASTStmtSwitch(subject, branches) {
    _classCallCheck(this, ASTStmtSwitch);

    return _possibleConstructorReturn(this, (ASTStmtSwitch.__proto__ || Object.getPrototypeOf(ASTStmtSwitch)).call(this, N_StmtSwitch, [subject, branches]));
  }

  _createClass(ASTStmtSwitch, [{
    key: 'subject',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'branches',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTStmtSwitch;
}(ASTNode);

var ASTSwitchBranch = exports.ASTSwitchBranch = function (_ASTNode14) {
  _inherits(ASTSwitchBranch, _ASTNode14);

  function ASTSwitchBranch(pattern, body) {
    _classCallCheck(this, ASTSwitchBranch);

    return _possibleConstructorReturn(this, (ASTSwitchBranch.__proto__ || Object.getPrototypeOf(ASTSwitchBranch)).call(this, N_SwitchBranch, [pattern, body]));
  }

  _createClass(ASTSwitchBranch, [{
    key: 'pattern',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'body',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTSwitchBranch;
}(ASTNode);

var ASTMatchingBranch = exports.ASTMatchingBranch = function (_ASTNode15) {
  _inherits(ASTMatchingBranch, _ASTNode15);

  function ASTMatchingBranch(pattern, body) {
    _classCallCheck(this, ASTMatchingBranch);

    return _possibleConstructorReturn(this, (ASTMatchingBranch.__proto__ || Object.getPrototypeOf(ASTMatchingBranch)).call(this, N_MatchingBranch, [pattern, body]));
  }

  _createClass(ASTMatchingBranch, [{
    key: 'pattern',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'body',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTMatchingBranch;
}(ASTNode);

var ASTStmtAssignVariable = exports.ASTStmtAssignVariable = function (_ASTNode16) {
  _inherits(ASTStmtAssignVariable, _ASTNode16);

  function ASTStmtAssignVariable(variable, value) {
    _classCallCheck(this, ASTStmtAssignVariable);

    return _possibleConstructorReturn(this, (ASTStmtAssignVariable.__proto__ || Object.getPrototypeOf(ASTStmtAssignVariable)).call(this, N_StmtAssignVariable, [variable, value]));
  }

  _createClass(ASTStmtAssignVariable, [{
    key: 'variable',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'value',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTStmtAssignVariable;
}(ASTNode);

var ASTStmtAssignTuple = exports.ASTStmtAssignTuple = function (_ASTNode17) {
  _inherits(ASTStmtAssignTuple, _ASTNode17);

  function ASTStmtAssignTuple(variables, value) {
    _classCallCheck(this, ASTStmtAssignTuple);

    return _possibleConstructorReturn(this, (ASTStmtAssignTuple.__proto__ || Object.getPrototypeOf(ASTStmtAssignTuple)).call(this, N_StmtAssignTuple, [variables, value]));
  }

  _createClass(ASTStmtAssignTuple, [{
    key: 'variables',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'value',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTStmtAssignTuple;
}(ASTNode);

var ASTStmtProcedureCall = exports.ASTStmtProcedureCall = function (_ASTNode18) {
  _inherits(ASTStmtProcedureCall, _ASTNode18);

  function ASTStmtProcedureCall(procedureName, args) {
    _classCallCheck(this, ASTStmtProcedureCall);

    return _possibleConstructorReturn(this, (ASTStmtProcedureCall.__proto__ || Object.getPrototypeOf(ASTStmtProcedureCall)).call(this, N_StmtProcedureCall, [procedureName, args]));
  }

  _createClass(ASTStmtProcedureCall, [{
    key: 'procedureName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'args',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTStmtProcedureCall;
}(ASTNode);

/* Patterns */

var ASTPatternWildcard = exports.ASTPatternWildcard = function (_ASTNode19) {
  _inherits(ASTPatternWildcard, _ASTNode19);

  function ASTPatternWildcard() {
    _classCallCheck(this, ASTPatternWildcard);

    return _possibleConstructorReturn(this, (ASTPatternWildcard.__proto__ || Object.getPrototypeOf(ASTPatternWildcard)).call(this, N_PatternWildcard, []));
  }

  _createClass(ASTPatternWildcard, [{
    key: 'boundVariables',
    get: function get() {
      return [];
    }
  }]);

  return ASTPatternWildcard;
}(ASTNode);

var ASTPatternVariable = exports.ASTPatternVariable = function (_ASTNode20) {
  _inherits(ASTPatternVariable, _ASTNode20);

  function ASTPatternVariable(variableName) {
    _classCallCheck(this, ASTPatternVariable);

    return _possibleConstructorReturn(this, (ASTPatternVariable.__proto__ || Object.getPrototypeOf(ASTPatternVariable)).call(this, N_PatternVariable, [variableName]));
  }

  _createClass(ASTPatternVariable, [{
    key: 'variableName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'boundVariables',
    get: function get() {
      return [this._children[0]];
    }
  }]);

  return ASTPatternVariable;
}(ASTNode);

var ASTPatternNumber = exports.ASTPatternNumber = function (_ASTNode21) {
  _inherits(ASTPatternNumber, _ASTNode21);

  function ASTPatternNumber(number) {
    _classCallCheck(this, ASTPatternNumber);

    return _possibleConstructorReturn(this, (ASTPatternNumber.__proto__ || Object.getPrototypeOf(ASTPatternNumber)).call(this, N_PatternNumber, [number]));
  }

  _createClass(ASTPatternNumber, [{
    key: 'number',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'boundVariables',
    get: function get() {
      return [];
    }
  }]);

  return ASTPatternNumber;
}(ASTNode);

var ASTPatternStructure = exports.ASTPatternStructure = function (_ASTNode22) {
  _inherits(ASTPatternStructure, _ASTNode22);

  function ASTPatternStructure(constructorName, parameters) {
    _classCallCheck(this, ASTPatternStructure);

    return _possibleConstructorReturn(this, (ASTPatternStructure.__proto__ || Object.getPrototypeOf(ASTPatternStructure)).call(this, N_PatternStructure, [constructorName, parameters]));
  }

  _createClass(ASTPatternStructure, [{
    key: 'constructorName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'boundVariables',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTPatternStructure;
}(ASTNode);

var ASTPatternTuple = exports.ASTPatternTuple = function (_ASTNode23) {
  _inherits(ASTPatternTuple, _ASTNode23);

  function ASTPatternTuple(parameters) {
    _classCallCheck(this, ASTPatternTuple);

    return _possibleConstructorReturn(this, (ASTPatternTuple.__proto__ || Object.getPrototypeOf(ASTPatternTuple)).call(this, N_PatternTuple, parameters));
  }

  _createClass(ASTPatternTuple, [{
    key: 'boundVariables',
    get: function get() {
      return this._children;
    }
  }]);

  return ASTPatternTuple;
}(ASTNode);

var ASTPatternTimeout = exports.ASTPatternTimeout = function (_ASTNode24) {
  _inherits(ASTPatternTimeout, _ASTNode24);

  function ASTPatternTimeout(timeout) {
    _classCallCheck(this, ASTPatternTimeout);

    return _possibleConstructorReturn(this, (ASTPatternTimeout.__proto__ || Object.getPrototypeOf(ASTPatternTimeout)).call(this, N_PatternTimeout, [timeout]));
  }

  _createClass(ASTPatternTimeout, [{
    key: 'boundVariables',
    get: function get() {
      return [];
    }
  }, {
    key: 'timeout',
    get: function get() {
      return parseInt(this._children[0].value, 10);
    }
  }]);

  return ASTPatternTimeout;
}(ASTNode);

/* Expressions */

var ASTExprVariable = exports.ASTExprVariable = function (_ASTNode25) {
  _inherits(ASTExprVariable, _ASTNode25);

  function ASTExprVariable(variableName) {
    _classCallCheck(this, ASTExprVariable);

    return _possibleConstructorReturn(this, (ASTExprVariable.__proto__ || Object.getPrototypeOf(ASTExprVariable)).call(this, N_ExprVariable, [variableName]));
  }

  _createClass(ASTExprVariable, [{
    key: 'variableName',
    get: function get() {
      return this._children[0];
    }
  }]);

  return ASTExprVariable;
}(ASTNode);

var ASTExprConstantNumber = exports.ASTExprConstantNumber = function (_ASTNode26) {
  _inherits(ASTExprConstantNumber, _ASTNode26);

  function ASTExprConstantNumber(number) {
    _classCallCheck(this, ASTExprConstantNumber);

    return _possibleConstructorReturn(this, (ASTExprConstantNumber.__proto__ || Object.getPrototypeOf(ASTExprConstantNumber)).call(this, N_ExprConstantNumber, [number]));
  }

  _createClass(ASTExprConstantNumber, [{
    key: 'number',
    get: function get() {
      return this._children[0];
    }
  }]);

  return ASTExprConstantNumber;
}(ASTNode);

var ASTExprConstantString = exports.ASTExprConstantString = function (_ASTNode27) {
  _inherits(ASTExprConstantString, _ASTNode27);

  function ASTExprConstantString(string) {
    _classCallCheck(this, ASTExprConstantString);

    return _possibleConstructorReturn(this, (ASTExprConstantString.__proto__ || Object.getPrototypeOf(ASTExprConstantString)).call(this, N_ExprConstantString, [string]));
  }

  _createClass(ASTExprConstantString, [{
    key: 'string',
    get: function get() {
      return this._children[0];
    }
  }]);

  return ASTExprConstantString;
}(ASTNode);

var ASTExprChoose = exports.ASTExprChoose = function (_ASTNode28) {
  _inherits(ASTExprChoose, _ASTNode28);

  function ASTExprChoose(condition, trueExpr, falseExpr) {
    _classCallCheck(this, ASTExprChoose);

    return _possibleConstructorReturn(this, (ASTExprChoose.__proto__ || Object.getPrototypeOf(ASTExprChoose)).call(this, N_ExprChoose, [condition, trueExpr, falseExpr]));
  }

  _createClass(ASTExprChoose, [{
    key: 'condition',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'trueExpr',
    get: function get() {
      return this._children[1];
    }
  }, {
    key: 'falseExpr',
    get: function get() {
      return this._children[2];
    }
  }]);

  return ASTExprChoose;
}(ASTNode);

var ASTExprMatching = exports.ASTExprMatching = function (_ASTNode29) {
  _inherits(ASTExprMatching, _ASTNode29);

  function ASTExprMatching(subject, branches) {
    _classCallCheck(this, ASTExprMatching);

    return _possibleConstructorReturn(this, (ASTExprMatching.__proto__ || Object.getPrototypeOf(ASTExprMatching)).call(this, N_ExprMatching, [subject, branches]));
  }

  _createClass(ASTExprMatching, [{
    key: 'subject',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'branches',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTExprMatching;
}(ASTNode);

var ASTExprList = exports.ASTExprList = function (_ASTNode30) {
  _inherits(ASTExprList, _ASTNode30);

  function ASTExprList(elements) {
    _classCallCheck(this, ASTExprList);

    return _possibleConstructorReturn(this, (ASTExprList.__proto__ || Object.getPrototypeOf(ASTExprList)).call(this, N_ExprList, elements));
  }

  _createClass(ASTExprList, [{
    key: 'elements',
    get: function get() {
      return this._children;
    }
  }]);

  return ASTExprList;
}(ASTNode);

var ASTExprRange = exports.ASTExprRange = function (_ASTNode31) {
  _inherits(ASTExprRange, _ASTNode31);

  // Note: second may be null
  function ASTExprRange(first, second, last) {
    _classCallCheck(this, ASTExprRange);

    return _possibleConstructorReturn(this, (ASTExprRange.__proto__ || Object.getPrototypeOf(ASTExprRange)).call(this, N_ExprRange, [first, second, last]));
  }

  _createClass(ASTExprRange, [{
    key: 'first',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'second',
    get: function get() {
      return this._children[1];
    }
  }, {
    key: 'last',
    get: function get() {
      return this._children[2];
    }
  }]);

  return ASTExprRange;
}(ASTNode);

var ASTExprTuple = exports.ASTExprTuple = function (_ASTNode32) {
  _inherits(ASTExprTuple, _ASTNode32);

  function ASTExprTuple(elements) {
    _classCallCheck(this, ASTExprTuple);

    return _possibleConstructorReturn(this, (ASTExprTuple.__proto__ || Object.getPrototypeOf(ASTExprTuple)).call(this, N_ExprTuple, elements));
  }

  _createClass(ASTExprTuple, [{
    key: 'elements',
    get: function get() {
      return this.children;
    }
  }]);

  return ASTExprTuple;
}(ASTNode);

var ASTExprStructure = exports.ASTExprStructure = function (_ASTNode33) {
  _inherits(ASTExprStructure, _ASTNode33);

  function ASTExprStructure(constructorName, fieldBindings) {
    _classCallCheck(this, ASTExprStructure);

    return _possibleConstructorReturn(this, (ASTExprStructure.__proto__ || Object.getPrototypeOf(ASTExprStructure)).call(this, N_ExprStructure, [constructorName, fieldBindings]));
  }

  _createClass(ASTExprStructure, [{
    key: 'fieldNames',
    value: function fieldNames() {
      var names = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.fieldBindings[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var fieldBinding = _step3.value;

          names.push(fieldBinding.fieldName.value);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return names;
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'fieldBindings',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTExprStructure;
}(ASTNode);

var ASTExprStructureUpdate = exports.ASTExprStructureUpdate = function (_ASTNode34) {
  _inherits(ASTExprStructureUpdate, _ASTNode34);

  function ASTExprStructureUpdate(constructorName, original, fieldBindings) {
    _classCallCheck(this, ASTExprStructureUpdate);

    return _possibleConstructorReturn(this, (ASTExprStructureUpdate.__proto__ || Object.getPrototypeOf(ASTExprStructureUpdate)).call(this, N_ExprStructureUpdate, [constructorName, original, fieldBindings]));
  }

  _createClass(ASTExprStructureUpdate, [{
    key: 'fieldNames',
    value: function fieldNames() {
      var names = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.fieldBindings[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var fieldBinding = _step4.value;

          names.push(fieldBinding.fieldName.value);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return names;
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'original',
    get: function get() {
      return this._children[1];
    }
  }, {
    key: 'fieldBindings',
    get: function get() {
      return this._children[2];
    }
  }]);

  return ASTExprStructureUpdate;
}(ASTNode);

var ASTExprFunctionCall = exports.ASTExprFunctionCall = function (_ASTNode35) {
  _inherits(ASTExprFunctionCall, _ASTNode35);

  function ASTExprFunctionCall(functionName, args) {
    _classCallCheck(this, ASTExprFunctionCall);

    return _possibleConstructorReturn(this, (ASTExprFunctionCall.__proto__ || Object.getPrototypeOf(ASTExprFunctionCall)).call(this, N_ExprFunctionCall, [functionName, args]));
  }

  _createClass(ASTExprFunctionCall, [{
    key: 'functionName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'args',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTExprFunctionCall;
}(ASTNode);

var ASTFieldBinding = exports.ASTFieldBinding = function (_ASTNode36) {
  _inherits(ASTFieldBinding, _ASTNode36);

  function ASTFieldBinding(fieldName, value) {
    _classCallCheck(this, ASTFieldBinding);

    return _possibleConstructorReturn(this, (ASTFieldBinding.__proto__ || Object.getPrototypeOf(ASTFieldBinding)).call(this, N_FieldBinding, [fieldName, value]));
  }

  _createClass(ASTFieldBinding, [{
    key: 'fieldName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'value',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTFieldBinding;
}(ASTNode);

var ASTConstructorDeclaration = exports.ASTConstructorDeclaration = function (_ASTNode37) {
  _inherits(ASTConstructorDeclaration, _ASTNode37);

  function ASTConstructorDeclaration(constructorName, fieldNames) {
    _classCallCheck(this, ASTConstructorDeclaration);

    return _possibleConstructorReturn(this, (ASTConstructorDeclaration.__proto__ || Object.getPrototypeOf(ASTConstructorDeclaration)).call(this, N_ConstructorDeclaration, [constructorName, fieldNames]));
  }

  _createClass(ASTConstructorDeclaration, [{
    key: 'constructorName',
    get: function get() {
      return this._children[0];
    }
  }, {
    key: 'fieldNames',
    get: function get() {
      return this._children[1];
    }
  }]);

  return ASTConstructorDeclaration;
}(ASTNode);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Token tags are constant symbols */
var T_EOF = exports.T_EOF = Symbol.for('T_EOF'); // End of file
var T_NUM = exports.T_NUM = Symbol.for('T_NUM'); // Number
var T_STRING = exports.T_STRING = Symbol.for('T_STRING'); // String constant
var T_UPPERID = exports.T_UPPERID = Symbol.for('T_UPPERID'); // Uppercase identifier
var T_LOWERID = exports.T_LOWERID = Symbol.for('T_LOWERID'); // Lowercase identifier

/* Keywords */
var T_PROGRAM = exports.T_PROGRAM = Symbol.for('T_PROGRAM');
var T_INTERACTIVE = exports.T_INTERACTIVE = Symbol.for('T_INTERACTIVE');
var T_PROCEDURE = exports.T_PROCEDURE = Symbol.for('T_PROCEDURE');
var T_FUNCTION = exports.T_FUNCTION = Symbol.for('T_FUNCTION');
var T_RETURN = exports.T_RETURN = Symbol.for('T_RETURN');
var T_IF = exports.T_IF = Symbol.for('T_IF');
var T_THEN = exports.T_THEN = Symbol.for('T_THEN');
var T_ELSEIF = exports.T_ELSEIF = Symbol.for('T_ELSEIF');
var T_ELSE = exports.T_ELSE = Symbol.for('T_ELSE');
var T_CHOOSE = exports.T_CHOOSE = Symbol.for('T_CHOOSE');
var T_WHEN = exports.T_WHEN = Symbol.for('T_WHEN');
var T_OTHERWISE = exports.T_OTHERWISE = Symbol.for('T_OTHERWISE');
var T_MATCHING = exports.T_MATCHING = Symbol.for('T_MATCHING');
var T_SELECT = exports.T_SELECT = Symbol.for('T_SELECT');
var T_ON = exports.T_ON = Symbol.for('T_ON');
var T_REPEAT = exports.T_REPEAT = Symbol.for('T_REPEAT');
var T_FOREACH = exports.T_FOREACH = Symbol.for('T_FOREACH');
var T_IN = exports.T_IN = Symbol.for('T_IN');
var T_WHILE = exports.T_WHILE = Symbol.for('T_WHILE');
var T_SWITCH = exports.T_SWITCH = Symbol.for('T_SWITCH');
var T_TO = exports.T_TO = Symbol.for('T_TO');
var T_LET = exports.T_LET = Symbol.for('T_LET');
var T_NOT = exports.T_NOT = Symbol.for('T_NOT');
var T_DIV = exports.T_DIV = Symbol.for('T_DIV');
var T_MOD = exports.T_MOD = Symbol.for('T_MOD');
var T_TYPE = exports.T_TYPE = Symbol.for('T_TYPE');
var T_IS = exports.T_IS = Symbol.for('T_IS');
var T_RECORD = exports.T_RECORD = Symbol.for('T_RECORD');
var T_VARIANT = exports.T_VARIANT = Symbol.for('T_VARIANT');
var T_CASE = exports.T_CASE = Symbol.for('T_CASE');
var T_FIELD = exports.T_FIELD = Symbol.for('T_FIELD');
var T_UNDERSCORE = exports.T_UNDERSCORE = Symbol.for('T_UNDERSCORE');
var T_TIMEOUT = exports.T_TIMEOUT = Symbol.for('T_TIMEOUT');

/* Symbols */
var T_LPAREN = exports.T_LPAREN = Symbol.for('T_LPAREN');
var T_RPAREN = exports.T_RPAREN = Symbol.for('T_RPAREN');
var T_LBRACE = exports.T_LBRACE = Symbol.for('T_LBRACE');
var T_RBRACE = exports.T_RBRACE = Symbol.for('T_RBRACE');
var T_LBRACK = exports.T_LBRACK = Symbol.for('T_LBRACK');
var T_RBRACK = exports.T_RBRACK = Symbol.for('T_RBRACK');
var T_COMMA = exports.T_COMMA = Symbol.for('T_COMMA');
var T_SEMICOLON = exports.T_SEMICOLON = Symbol.for('T_SEMICOLON');
var T_ELLIPSIS = exports.T_ELLIPSIS = Symbol.for('T_ELLIPSIS');
var T_RANGE = exports.T_RANGE = Symbol.for('T_RANGE');
var T_GETS = exports.T_GETS = Symbol.for('T_GETS');
var T_PIPE = exports.T_PIPE = Symbol.for('T_PIPE');
var T_ARROW = exports.T_ARROW = Symbol.for('T_ARROW');
var T_ASSIGN = exports.T_ASSIGN = Symbol.for('T_ASSIGN');
var T_EQ = exports.T_EQ = Symbol.for('T_EQ');
var T_NE = exports.T_NE = Symbol.for('T_NE');
var T_LE = exports.T_LE = Symbol.for('T_LE');
var T_GE = exports.T_GE = Symbol.for('T_GE');
var T_LT = exports.T_LT = Symbol.for('T_LT');
var T_GT = exports.T_GT = Symbol.for('T_GT');
var T_AND = exports.T_AND = Symbol.for('T_AND');
var T_OR = exports.T_OR = Symbol.for('T_OR');
var T_CONCAT = exports.T_CONCAT = Symbol.for('T_CONCAT');
var T_PLUS = exports.T_PLUS = Symbol.for('T_PLUS');
var T_MINUS = exports.T_MINUS = Symbol.for('T_MINUS');
var T_TIMES = exports.T_TIMES = Symbol.for('T_TIMES');
var T_POW = exports.T_POW = Symbol.for('T_POW');

/* A token is given by:
 * - A token tag (e.g. T_LOWERID, T_NUM).
 * - Possibly, a value (e.g. 'nroBolitas', 8).
 *   When the value is irrelevant, we provide null by convention.
 * - Two positions, representing its location in the source. */

var Token = exports.Token = function () {
  function Token(tag, value, startPos, endPos) {
    _classCallCheck(this, Token);

    this._tag = tag;
    this._value = value;
    this._startPos = startPos;
    this._endPos = endPos;
  }

  _createClass(Token, [{
    key: 'toString',
    value: function toString() {
      var tag = Symbol.keyFor(this._tag).substring(2);
      switch (tag) {
        case 'NUM':case 'STRING':case 'UPPERID':case 'LOWERID':
          return tag + '("' + this._value + '")';
        default:
          return tag;
      }
    }
  }, {
    key: 'tag',
    get: function get() {
      return this._tag;
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }, {
    key: 'startPos',
    get: function get() {
      return this._startPos;
    }
  }, {
    key: 'endPos',
    get: function get() {
      return this._endPos;
    }
  }]);

  return Token;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimePrimitives = exports.RuntimeState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.boolFromValue = boolFromValue;
exports.typesWithOpposite = typesWithOpposite;
exports.typesWithOrder = typesWithOrder;

var _i18n = __webpack_require__(0);

var _value = __webpack_require__(5);

var _exceptions = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * This module provides the runtime support for the execution of a program.
 *
 * The runtime support includes:
 *
 * - A definition of a class RuntimeState, representing the global state
 *   of a program.
 *
 * - A definition of a class RuntimePrimitives, representing the available
 *   primitive functions.
 *
 * This file is a particular implementation, in which RuntimeState
 * represents a Gobstones board, and RuntimePrimitives are the primitives
 * functions and procedures available in Gobstones.
 *
 * Potential variants of the language might have a different notion of
 * global state, and different available primitives.
 */

function fail(startPos, endPos, reason, args) {
  throw new _exceptions.GbsRuntimeError(startPos, endPos, reason, args);
}

function boolEnum() {
  return [(0, _i18n.i18n)('CONS:False'), (0, _i18n.i18n)('CONS:True')];
}

function colorEnum() {
  return [(0, _i18n.i18n)('CONS:Color0'), (0, _i18n.i18n)('CONS:Color1'), (0, _i18n.i18n)('CONS:Color2'), (0, _i18n.i18n)('CONS:Color3')];
}

function dirEnum() {
  return [(0, _i18n.i18n)('CONS:Dir0'), (0, _i18n.i18n)('CONS:Dir1'), (0, _i18n.i18n)('CONS:Dir2'), (0, _i18n.i18n)('CONS:Dir3')];
}

/* Enumeration of all the constructors of the Event type, including
 * INIT and TIMEOUT. */
function keyEventEnum() {
  var modifiers = ['', 'CTRL_', 'ALT_', 'SHIFT_', 'CTRL_ALT_', 'CTRL_SHIFT_', 'ALT_SHIFT_', 'CTRL_ALT_SHIFT_'];
  var charKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var specialKeys = ['SPACE', 'RETURN', 'TAB', 'BACKSPACE', 'ESCAPE', 'INSERT', 'DELETE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  var symbolKeys = ['AMPERSAND', 'ASTERISK', 'AT', 'BACKSLASH', 'CARET', 'COLON', 'DOLLAR', 'EQUALS', 'EXCLAIM', 'GREATER', 'HASH', 'LESS', 'PERCENT', 'PLUS', 'SEMICOLON', 'SLASH', 'QUESTION', 'QUOTE', 'QUOTEDBL', 'UNDERSCORE', 'LEFTPAREN', 'RIGHTPAREN', 'LEFTBRACKET', 'RIGHTBRACKET', 'LEFTBRACE', 'RIGHTBRACE'];
  var arrowKeys = ['LEFT', 'RIGHT', 'UP', 'DOWN'];
  var keys = charKeys.concat(specialKeys).concat(symbolKeys).concat(arrowKeys);

  var eventNames = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = modifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var modifier = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          eventNames.push('K_' + modifier + key);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return eventNames;
}

var KEY_EVENT_ENUM = keyEventEnum();

function eventEnum() {
  return [(0, _i18n.i18n)('CONS:INIT'), (0, _i18n.i18n)('CONS:TIMEOUT')].concat(KEY_EVENT_ENUM);
}

function toEnum(enumeration, name) {
  return enumeration.indexOf(name);
}

function fromEnum(enumeration, index) {
  return enumeration[index];
}

function dirOpposite(dirName) {
  return fromEnum(dirEnum(), (toEnum(dirEnum(), dirName) + 2) % 4);
}

function dirNext(dirName) {
  return fromEnum(dirEnum(), (toEnum(dirEnum(), dirName) + 1) % 4);
}

function dirPrev(dirName) {
  return fromEnum(dirEnum(), (toEnum(dirEnum(), dirName) + 3) % 4);
}

function colorNext(colorName) {
  return fromEnum(colorEnum(), (toEnum(colorEnum(), colorName) + 1) % 4);
}

function colorPrev(colorName) {
  return fromEnum(colorEnum(), (toEnum(colorEnum(), colorName) + 3) % 4);
}

/*
 * An instance of RuntimeState represents the current global state of
 * a program. In the case of Gobstones, it is a Gobstones board.
 *
 * It MUST implement the following methods:
 *
 *   this.clone() ~~> returns a copy of the state
 *
 */

var RuntimeState = exports.RuntimeState = function () {
  function RuntimeState() {
    _classCallCheck(this, RuntimeState);

    /*
     * The board is represented as a list of columns, so that board[x] is the
     * x-th column and board[x][y] is the cell at (x, y).
     *
     * By default, create an empty 9x9 board.
     */
    this._width = 11;
    this._height = 7;
    this._board = [];
    for (var x = 0; x < this._width; x++) {
      var column = [];
      for (var y = 0; y < this._height; y++) {
        column.push(this._emptyCell());
      }
      this._board.push(column);
    }
    this._head = { 'x': 0, 'y': 0 };
  }

  _createClass(RuntimeState, [{
    key: 'clone',
    value: function clone() {
      var newState = new RuntimeState();
      newState._width = this._width;
      newState._height = this._height;
      newState._board = [];
      for (var x = 0; x < this._width; x++) {
        var column = [];
        for (var y = 0; y < this._height; y++) {
          var cell = {};
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = colorEnum()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var colorName = _step3.value;

              cell[colorName] = this._board[x][y][colorName];
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          column.push(cell);
        }
        newState._board.push(column);
      }
      newState._head = { 'x': this._head.x, 'y': this._head.y };
      return newState;
    }

    /* Dump the state to a Jboard data structure */

  }, {
    key: 'dump',
    value: function dump() {
      var jboard = {};
      jboard.width = this._width;
      jboard.height = this._height;
      jboard.head = [this._head.x, this._head.y];
      jboard.board = [];
      for (var x = 0; x < this._width; x++) {
        var column = [];
        for (var y = 0; y < this._height; y++) {
          var cell = {};
          cell['a'] = this._board[x][y][(0, _i18n.i18n)('CONS:Color0')].asNumber();
          cell['n'] = this._board[x][y][(0, _i18n.i18n)('CONS:Color1')].asNumber();
          cell['r'] = this._board[x][y][(0, _i18n.i18n)('CONS:Color2')].asNumber();
          cell['v'] = this._board[x][y][(0, _i18n.i18n)('CONS:Color3')].asNumber();
          column.push(cell);
        }
        jboard.board.push(column);
      }
      return jboard;
    }

    /* Load the state from a Jboard data structure */

  }, {
    key: 'load',
    value: function load(jboard) {
      this._width = jboard.width;
      this._height = jboard.height;
      this._head.x = jboard.head[0];
      this._head.y = jboard.head[1];
      this._board = [];
      for (var x = 0; x < this._width; x++) {
        var row = [];
        for (var y = 0; y < this._height; y++) {
          var cell = jboard.board[x][y];
          var newCell = {};
          newCell[(0, _i18n.i18n)('CONS:Color0')] = new _value.ValueInteger(cell['a']);
          newCell[(0, _i18n.i18n)('CONS:Color1')] = new _value.ValueInteger(cell['n']);
          newCell[(0, _i18n.i18n)('CONS:Color2')] = new _value.ValueInteger(cell['r']);
          newCell[(0, _i18n.i18n)('CONS:Color3')] = new _value.ValueInteger(cell['v']);
          row.push(newCell);
        }
        this._board.push(row);
      }
    }

    /* Gobstones specific methods */

  }, {
    key: 'putStone',
    value: function putStone(colorName) {
      var n = this._board[this._head.x][this._head.y][colorName];
      n = n.add(new _value.ValueInteger(1));
      this._board[this._head.x][this._head.y][colorName] = n;
    }
  }, {
    key: 'removeStone',
    value: function removeStone(colorName) {
      var n = this._board[this._head.x][this._head.y][colorName];
      if (n.le(new _value.ValueInteger(0))) {
        throw Error('Cannot remove stone.');
      }
      n = n.sub(new _value.ValueInteger(1));
      this._board[this._head.x][this._head.y][colorName] = n;
    }
  }, {
    key: 'numStones',
    value: function numStones(colorName) {
      return this._board[this._head.x][this._head.y][colorName];
    }
  }, {
    key: 'move',
    value: function move(dirName) {
      if (!this.canMove(dirName)) {
        throw Error('Cannot move.');
      }
      var delta = this._deltaForDirection(dirName);
      this._head.x += delta[0];
      this._head.y += delta[1];
    }
  }, {
    key: 'goToEdge',
    value: function goToEdge(dirName) {
      if (dirName === (0, _i18n.i18n)('CONS:Dir0')) {
        this._head.y = this._height - 1;
      } else if (dirName === (0, _i18n.i18n)('CONS:Dir1')) {
        this._head.x = this._width - 1;
      } else if (dirName === (0, _i18n.i18n)('CONS:Dir2')) {
        this._head.y = 0;
      } else if (dirName === (0, _i18n.i18n)('CONS:Dir3')) {
        this._head.x = 0;
      } else {
        throw Error('Invalid direction: ' + dirName);
      }
    }
  }, {
    key: 'emptyBoardContents',
    value: function emptyBoardContents() {
      for (var x = 0; x < this._width; x++) {
        for (var y = 0; y < this._height; y++) {
          this._board[x][y] = this._emptyCell();
        }
      }
    }
  }, {
    key: 'canMove',
    value: function canMove(dirName) {
      var delta = this._deltaForDirection(dirName);
      var x = this._head.x + delta[0];
      var y = this._head.y + delta[1];
      return 0 <= x && x < this._width && 0 <= y && y < this._height;
    }
  }, {
    key: '_deltaForDirection',
    value: function _deltaForDirection(dirName) {
      var delta = void 0;
      if (dirName === (0, _i18n.i18n)('CONS:Dir0')) {
        delta = [0, 1];
      } else if (dirName === (0, _i18n.i18n)('CONS:Dir1')) {
        delta = [1, 0];
      } else if (dirName === (0, _i18n.i18n)('CONS:Dir2')) {
        delta = [0, -1];
      } else if (dirName === (0, _i18n.i18n)('CONS:Dir3')) {
        delta = [-1, 0];
      } else {
        throw Error('Invalid direction: ' + dirName);
      }
      return delta;
    }
  }, {
    key: '_emptyCell',
    value: function _emptyCell() {
      var cell = {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = colorEnum()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var colorName = _step4.value;

          cell[colorName] = new _value.ValueInteger(0);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return cell;
    }
  }]);

  return RuntimeState;
}();

var PrimitiveOperation = function () {
  function PrimitiveOperation(argumentTypes, argumentValidator, implementation) {
    _classCallCheck(this, PrimitiveOperation);

    this._argumentTypes = argumentTypes;
    this._argumentValidator = argumentValidator;
    this._implementation = implementation;
  }

  _createClass(PrimitiveOperation, [{
    key: 'nargs',
    value: function nargs() {
      return this._argumentTypes.length;
    }
  }, {
    key: 'call',
    value: function call(globalState, args) {
      return this._implementation.apply(null, [globalState].concat(args));
    }

    /* Check that the arguments are valid according to the validator.
     * The validator should be a function receiving a start and end
     * positions, and a list of arguments.
     * It should throw a GbsRuntimeError if the arguments are invalid.
     */

  }, {
    key: 'validateArguments',
    value: function validateArguments(startPos, endPos, globalState, args) {
      this._argumentValidator(startPos, endPos, globalState, args);
    }
  }, {
    key: 'argumentTypes',
    get: function get() {
      return this._argumentTypes;
    }
  }]);

  return PrimitiveOperation;
}();

/* Casting Gobstones values to JavaScript values and vice-versa */

var typeAny = new _value.TypeAny();

var typeInteger = new _value.TypeInteger();

var typeString = new _value.TypeString();

function typeBool() {
  return new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {});
}

var typeListAny = new _value.TypeList(new _value.TypeAny());

function valueFromBool(bool) {
  if (bool) {
    return new _value.ValueStructure((0, _i18n.i18n)('TYPE:Bool'), (0, _i18n.i18n)('CONS:True'), {});
  } else {
    return new _value.ValueStructure((0, _i18n.i18n)('TYPE:Bool'), (0, _i18n.i18n)('CONS:False'), {});
  }
}

function boolFromValue(value) {
  return value.constructorName === (0, _i18n.i18n)('CONS:True');
}

function typeColor() {
  return new _value.TypeStructure((0, _i18n.i18n)('TYPE:Color'), {});
}

function valueFromColor(colorName) {
  return new _value.ValueStructure((0, _i18n.i18n)('TYPE:Color'), colorName, {});
}

function colorFromValue(value) {
  return value.constructorName;
}

function typeDir() {
  return new _value.TypeStructure((0, _i18n.i18n)('TYPE:Dir'), {});
}

function valueFromDir(dirName) {
  return new _value.ValueStructure((0, _i18n.i18n)('TYPE:Dir'), dirName, {});
}

function dirFromValue(value) {
  return value.constructorName;
}

/* Argument validators */

function noValidation(startPos, endPos, globalState, args) {
  /* No validation */
}

function isInteger(x) {
  return (0, _value.joinTypes)(x.type(), typeInteger) !== null;
}

function isBool(x) {
  return (0, _value.joinTypes)(x.type(), typeBool()) !== null;
}

function isColor(x) {
  return (0, _value.joinTypes)(x.type(), typeColor()) !== null;
}

function isDir(x) {
  return (0, _value.joinTypes)(x.type(), typeDir()) !== null;
}

function typesWithOpposite() {
  return [typeInteger, typeBool(), typeDir()];
}

function typesWithOrder() {
  return [typeInteger, typeBool(), typeColor(), typeDir()];
}

/* Generic operations */

function enumIndex(value) {
  if (isBool(value)) {
    if (boolFromValue(value)) {
      return 1;
    } else {
      return 0;
    }
  } else if (isColor(value)) {
    return toEnum(colorEnum(), colorFromValue(value));
  } else if (isDir(value)) {
    return toEnum(dirEnum(), dirFromValue(value));
  } else {
    throw Error('Value should be Bool, Color or Dir.');
  }
}

function genericLE(a, b) {
  if (isInteger(a)) {
    return valueFromBool(a.le(b));
  } else {
    var indexA = enumIndex(a);
    var indexB = enumIndex(b);
    return valueFromBool(indexA <= indexB);
  }
}

function genericGE(a, b) {
  if (isInteger(a)) {
    return valueFromBool(a.ge(b));
  } else {
    var indexA = enumIndex(a);
    var indexB = enumIndex(b);
    return valueFromBool(indexA >= indexB);
  }
}

function genericLT(a, b) {
  if (isInteger(a)) {
    return valueFromBool(a.lt(b));
  } else {
    var indexA = enumIndex(a);
    var indexB = enumIndex(b);
    return valueFromBool(indexA < indexB);
  }
}

function genericGT(a, b) {
  if (isInteger(a)) {
    return valueFromBool(a.gt(b));
  } else {
    var indexA = enumIndex(a);
    var indexB = enumIndex(b);
    return valueFromBool(indexA > indexB);
  }
}

function genericNext(a) {
  if (isInteger(a)) {
    return a.add(new _value.ValueInteger(1));
  } else if (isBool(a)) {
    if (boolFromValue(a)) {
      return valueFromBool(false);
    } else {
      return valueFromBool(true);
    }
  } else if (isColor(a)) {
    return valueFromColor(colorNext(colorFromValue(a)));
  } else if (isDir(a)) {
    return valueFromDir(dirNext(dirFromValue(a)));
  } else {
    throw Error('genericNext: value has no next.');
  }
}

function genericPrev(a) {
  if (isInteger(a)) {
    return a.sub(new _value.ValueInteger(1));
  } else if (isBool(a)) {
    if (boolFromValue(a)) {
      return valueFromBool(false);
    } else {
      return valueFromBool(true);
    }
  } else if (isColor(a)) {
    return valueFromColor(colorPrev(colorFromValue(a)));
  } else if (isDir(a)) {
    return valueFromDir(dirPrev(dirFromValue(a)));
  } else {
    throw Error('genericPrev: value has no prev.');
  }
}

function genericOpposite(a) {
  if (isInteger(a)) {
    return a.negate();
  } else if (isBool(a)) {
    return valueFromBool(!boolFromValue(a));
  } else if (isDir(a)) {
    return valueFromDir(dirOpposite(dirFromValue(a)));
  } else {
    throw Error('genericOpposite: value has no opposite.');
  }
}
/* Validate that the type of 'x' is among the given list of types */
function validateTypeAmong(startPos, endPos, x, types) {
  /* Succeed if the type of x is in the list 'types' */
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = types[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var type = _step5.value;

      if ((0, _value.joinTypes)(x.type(), type) !== null) {
        return;
      }
    }
    /* Report error */
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  fail(startPos, endPos, 'expected-value-of-some-type-but-got', [types, x.type()]);
}

/* Validate that the types of 'x' and 'y' are compatible */
function validateCompatibleTypes(startPos, endPos, x, y) {
  if ((0, _value.joinTypes)(x.type(), y.type()) === null) {
    fail(startPos, endPos, 'expected-values-to-have-compatible-types', [x.type(), y.type()]);
  }
}

/* Runtime primitives */

var RuntimePrimitives = exports.RuntimePrimitives = function () {
  function RuntimePrimitives() {
    _classCallCheck(this, RuntimePrimitives);

    /* this._primitiveTypes is a dictionary indexed by type names.
     *
     * this._primitiveTypes[typeName] is a dictionary indexed by
     * the constructor names of the given type.
     *
     * this._primitiveTypes[typeName][constructorName]
     * is a list of field names.
     */
    this._primitiveTypes = {};

    /* this._primitiveProcedures and this._primitiveFunctions
     * are dictionaries indexed by the name of the primitive operation
     * (procedure or function). Their value is an instance of
     * PrimitiveOperation.
     */
    this._primitiveProcedures = {};
    this._primitiveFunctions = {};

    /* --Primitive types-- */

    /* Booleans */
    this._primitiveTypes[(0, _i18n.i18n)('TYPE:Bool')] = {};
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = boolEnum()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var boolName = _step6.value;

        this._primitiveTypes[(0, _i18n.i18n)('TYPE:Bool')][boolName] = [];
      }

      /* Colors */
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    this._primitiveTypes[(0, _i18n.i18n)('TYPE:Color')] = {};
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = colorEnum()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var colorName = _step7.value;

        this._primitiveTypes[(0, _i18n.i18n)('TYPE:Color')][colorName] = [];
      }

      /* Directions */
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    this._primitiveTypes[(0, _i18n.i18n)('TYPE:Dir')] = {};
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = dirEnum()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var dirName = _step8.value;

        this._primitiveTypes[(0, _i18n.i18n)('TYPE:Dir')][dirName] = [];
      }

      /* Events */
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return) {
          _iterator8.return();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }

    this._primitiveTypes[(0, _i18n.i18n)('TYPE:Event')] = {};
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = eventEnum()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var eventName = _step9.value;

        this._primitiveTypes[(0, _i18n.i18n)('TYPE:Event')][eventName] = [];
      }

      /* --Primitive procedures-- */
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9.return) {
          _iterator9.return();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:TypeCheck')] = new PrimitiveOperation([typeAny, typeAny, typeString], function (startPos, endPos, globalState, args) {
      var v1 = args[0];
      var v2 = args[1];
      var errorMessage = args[2];
      if ((0, _value.joinTypes)(v1.type(), v2.type()) === null) {
        fail(startPos, endPos, 'typecheck-failed', [errorMessage.string, v1.type(), v2.type()]);
      }
    }, function (globalState, color) {
      return null;
    });

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:PutStone')] = new PrimitiveOperation([typeColor()], noValidation, function (globalState, color) {
      globalState.putStone(colorFromValue(color));
      return null;
    });

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:RemoveStone')] = new PrimitiveOperation([typeColor()], function (startPos, endPos, globalState, args) {
      var colorName = colorFromValue(args[0]);
      if (globalState.numStones(colorName).le(new _value.ValueInteger(0))) {
        fail(startPos, endPos, 'cannot-remove-stone', [colorName]);
      }
    }, function (globalState, color) {
      globalState.removeStone(colorFromValue(color));
      return null;
    });

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:Move')] = new PrimitiveOperation([typeDir()], function (startPos, endPos, globalState, args) {
      var dirName = dirFromValue(args[0]);
      if (!globalState.canMove(dirName)) {
        fail(startPos, endPos, 'cannot-move-to', [dirName]);
      }
    }, function (globalState, dir) {
      globalState.move(dirFromValue(dir));
      return null;
    });

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:GoToEdge')] = new PrimitiveOperation([typeDir()], noValidation, function (globalState, dir) {
      globalState.goToEdge(dirFromValue(dir));
      return null;
    });

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:EmptyBoardContents')] = new PrimitiveOperation([], noValidation, function (globalState, dir) {
      globalState.emptyBoardContents();
      return null;
    });

    this._primitiveProcedures['_FAIL'] =
    /* Procedure that always fails */
    new PrimitiveOperation([typeString], function (startPos, endPos, globalState, args) {
      fail(startPos, endPos, args[0].string, []);
    }, function (globalState, errMsg) {
      /* Unreachable */
      return null;
    });

    /* --Primitive functions-- */

    this._primitiveFunctions['_makeRange'] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var first = args[0];
      var last = args[1];
      validateCompatibleTypes(startPos, endPos, first, last);
      validateTypeAmong(startPos, endPos, first, typesWithOrder());
      validateTypeAmong(startPos, endPos, last, typesWithOrder());
    }, function (globalState, first, last) {
      var current = first;
      if (boolFromValue(genericGT(current, last))) {
        return new _value.ValueList([]);
      }
      var result = [];
      while (boolFromValue(genericLT(current, last))) {
        result.push(current);
        current = genericNext(current);
      }
      result.push(current);
      return new _value.ValueList(result);
    });

    this._primitiveFunctions['not'] = new PrimitiveOperation([typeBool()], noValidation, function (globalState, x) {
      return valueFromBool(!boolFromValue(x));
    });

    this._primitiveFunctions['&&'] = new PrimitiveOperation([typeAny, typeAny], noValidation,
    /*
     * This function is a stub so the linter recognizes '&&'
     * as a defined primitive function of arity 2.
     *
     * The implementation of '&&' is treated specially by the
     * compiler to account for short-circuiting.
     */
    function (globalState, x, y) {
      throw Error('The function "&&" should never be called');
    });

    this._primitiveFunctions['||'] = new PrimitiveOperation([typeAny, typeAny], noValidation,
    /*
     * This function is a stub so the linter recognizes '||'
     * as a defined primitive function of arity 2.
     *
     * The implementation of '||' is treated specially by the
     * compiler to account for short-circuiting.
     */
    function (globalState, x, y) {
      throw Error('The function "||" should never be called');
    });

    this._primitiveFunctions['_makeRangeWithSecond'] = new PrimitiveOperation([typeAny, typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var first = args[0];
      var last = args[1];
      var second = args[2];
      validateTypeAmong(startPos, endPos, first, [typeInteger]);
      validateTypeAmong(startPos, endPos, last, [typeInteger]);
      validateTypeAmong(startPos, endPos, second, [typeInteger]);
    }, function (globalState, first, last, second) {
      var delta = second.sub(first);
      if (delta.lt(new _value.ValueInteger(1))) {
        return new _value.ValueList([]);
      }
      var current = first;
      var result = [];
      while (current.le(last)) {
        result.push(current);
        current = current.add(delta);
      }
      return new _value.ValueList(result);
    });

    this._primitiveFunctions['_unsafeListLength'] = new PrimitiveOperation([typeAny], noValidation, function (globalState, list) {
      return new _value.ValueInteger(list.length());
    });

    this._primitiveFunctions['_unsafeListNth'] = new PrimitiveOperation([typeAny, typeAny], noValidation, function (globalState, list, index) {
      return list.elements[index.asNumber()];
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:numStones')] = new PrimitiveOperation([typeColor()], noValidation, function (globalState, color) {
      return globalState.numStones(colorFromValue(color));
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:anyStones')] = new PrimitiveOperation([typeColor()], noValidation, function (globalState, color) {
      var num = globalState.numStones(colorFromValue(color));
      return valueFromBool(num.gt(new _value.ValueInteger(0)));
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:canMove')] = new PrimitiveOperation([typeDir()], noValidation, function (globalState, dir) {
      return valueFromBool(globalState.canMove(dirFromValue(dir)));
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:next')] = new PrimitiveOperation([typeAny], function (startPos, endPos, globalState, args) {
      var value = args[0];
      validateTypeAmong(startPos, endPos, value, typesWithOrder());
    }, function (globalState, value) {
      return genericNext(value);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:prev')] = new PrimitiveOperation([typeAny], function (startPos, endPos, globalState, args) {
      var value = args[0];
      validateTypeAmong(startPos, endPos, value, typesWithOrder());
    }, function (globalState, value) {
      return genericPrev(value);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:opposite')] = new PrimitiveOperation([typeAny], function (startPos, endPos, globalState, args) {
      var value = args[0];
      validateTypeAmong(startPos, endPos, value, typesWithOpposite());
    }, function (globalState, value) {
      return genericOpposite(value);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:minBool')] = new PrimitiveOperation([], noValidation, function (globalState) {
      return valueFromBool(false);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:maxBool')] = new PrimitiveOperation([], noValidation, function (globalState) {
      return valueFromBool(true);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:minColor')] = new PrimitiveOperation([], noValidation, function (globalState) {
      return valueFromColor(colorEnum()[0]);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:maxColor')] = new PrimitiveOperation([], noValidation, function (globalState) {
      return valueFromColor(colorEnum()[colorEnum().length - 1]);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:minDir')] = new PrimitiveOperation([], noValidation, function (globalState) {
      return valueFromDir(dirEnum()[0]);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:maxDir')] = new PrimitiveOperation([], noValidation, function (globalState) {
      return valueFromDir(dirEnum()[dirEnum().length - 1]);
    });

    /* Arithmetic operators */

    this._primitiveFunctions['+'] = new PrimitiveOperation([typeInteger, typeInteger], noValidation, function (globalState, a, b) {
      return a.add(b);
    });

    this._primitiveFunctions['-'] = new PrimitiveOperation([typeInteger, typeInteger], noValidation, function (globalState, a, b) {
      return a.sub(b);
    });

    this._primitiveFunctions['*'] = new PrimitiveOperation([typeInteger, typeInteger], noValidation, function (globalState, a, b) {
      return a.mul(b);
    });

    this._primitiveFunctions['div'] = new PrimitiveOperation([typeInteger, typeInteger], function (startPos, endPos, globalState, args) {
      var b = args[1];
      if (b.eq(new _value.ValueInteger(0))) {
        fail(startPos, endPos, 'cannot-divide-by-zero', []);
      }
    }, function (globalState, a, b) {
      return a.div(b);
    });

    this._primitiveFunctions['mod'] = new PrimitiveOperation([typeInteger, typeInteger], function (startPos, endPos, globalState, args) {
      var b = args[1];
      if (b.eq(new _value.ValueInteger(0))) {
        fail(startPos, endPos, 'cannot-divide-by-zero', []);
      }
    }, function (globalState, a, b) {
      return a.mod(b);
    });

    this._primitiveFunctions['^'] = new PrimitiveOperation([typeInteger, typeInteger], function (startPos, endPos, globalState, args) {
      var b = args[1];
      if (b.lt(new _value.ValueInteger(0))) {
        fail(startPos, endPos, 'negative-exponent', []);
      }
    }, function (globalState, a, b) {
      return a.pow(b);
    });

    this._primitiveFunctions['-(unary)'] = new PrimitiveOperation([typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      validateTypeAmong(startPos, endPos, a, typesWithOpposite());
    }, function (globalState, a) {
      return genericOpposite(a);
    });

    /* Relational operators */

    this._primitiveFunctions['=='] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
    }, function (globalState, a, b) {
      return valueFromBool(a.equal(b));
    });

    this._primitiveFunctions['/='] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
    }, function (globalState, a, b) {
      return valueFromBool(!a.equal(b));
    });

    this._primitiveFunctions['<='] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
      validateTypeAmong(startPos, endPos, a, typesWithOrder());
      validateTypeAmong(startPos, endPos, b, typesWithOrder());
    }, function (globalState, a, b) {
      return genericLE(a, b);
    });

    this._primitiveFunctions['>='] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
      validateTypeAmong(startPos, endPos, a, typesWithOrder());
      validateTypeAmong(startPos, endPos, b, typesWithOrder());
    }, function (globalState, a, b) {
      return genericGE(a, b);
    });

    this._primitiveFunctions['<'] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
      validateTypeAmong(startPos, endPos, a, typesWithOrder());
      validateTypeAmong(startPos, endPos, b, typesWithOrder());
    }, function (globalState, a, b) {
      return genericLT(a, b);
    });

    this._primitiveFunctions['>'] = new PrimitiveOperation([typeAny, typeAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
      validateTypeAmong(startPos, endPos, a, typesWithOrder());
      validateTypeAmong(startPos, endPos, b, typesWithOrder());
    }, function (globalState, a, b) {
      return genericGT(a, b);
    });

    /* User-triggered failure */

    this._primitiveProcedures[(0, _i18n.i18n)('PRIM:BOOM')] = new PrimitiveOperation([typeString], function (startPos, endPos, globalState, args) {
      fail(startPos, endPos, 'boom-called', [args[0].string]);
    }, function (globalState, msg) {
      throw Error('Should not be reachable.');
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:boom')] = this._primitiveProcedures[(0, _i18n.i18n)('PRIM:BOOM')];

    /* List operators */
    this._primitiveFunctions['++'] = new PrimitiveOperation([typeListAny, typeListAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      var b = args[1];
      validateCompatibleTypes(startPos, endPos, a, b);
    }, function (globalState, a, b) {
      return a.append(b);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:isEmpty')] = new PrimitiveOperation([typeListAny], noValidation, function (globalState, a) {
      return valueFromBool(a.length() === 0);
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:head')] = new PrimitiveOperation([typeListAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      if (a.length() === 0) {
        fail(startPos, endPos, 'list-cannot-be-empty', []);
      }
    }, function (globalState, a) {
      return a.head();
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:tail')] = new PrimitiveOperation([typeListAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      if (a.length() === 0) {
        fail(startPos, endPos, 'list-cannot-be-empty', []);
      }
    }, function (globalState, a) {
      return a.tail();
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:oldTail')] = this._primitiveFunctions[(0, _i18n.i18n)('PRIM:tail')];

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:init')] = new PrimitiveOperation([typeListAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      if (a.length() === 0) {
        fail(startPos, endPos, 'list-cannot-be-empty', []);
      }
    }, function (globalState, a) {
      return a.init();
    });

    this._primitiveFunctions[(0, _i18n.i18n)('PRIM:last')] = new PrimitiveOperation([typeListAny], function (startPos, endPos, globalState, args) {
      var a = args[0];
      if (a.length() === 0) {
        fail(startPos, endPos, 'list-cannot-be-empty', []);
      }
    }, function (globalState, a) {
      return a.last();
    });
  }

  /* Types */

  _createClass(RuntimePrimitives, [{
    key: 'types',
    value: function types() {
      var typeNames = [];
      for (var typeName in this._primitiveTypes) {
        typeNames.push(typeName);
      }
      return typeNames;
    }
  }, {
    key: 'typeConstructors',
    value: function typeConstructors(typeName) {
      if (!(typeName in this._primitiveTypes)) {
        throw Error('Not a primitive type: ' + typeName);
      }
      var constructorNames = [];
      for (var constructorName in this._primitiveTypes[typeName]) {
        constructorNames.push(constructorName);
      }
      return constructorNames;
    }
  }, {
    key: 'constructorFields',
    value: function constructorFields(typeName, constructorName) {
      if (!(typeName in this._primitiveTypes)) {
        throw Error('Not a primitive type: ' + typeName);
      }
      if (!(constructorName in this._primitiveTypes[typeName])) {
        throw Error('Not a primitive constructor: ' + constructorName);
      }
      return this._primitiveTypes[typeName][constructorName];
    }

    /* Operations */

  }, {
    key: 'isOperation',
    value: function isOperation(primitiveName) {
      return primitiveName in this._primitiveProcedures || primitiveName in this._primitiveFunctions;
    }
  }, {
    key: 'getOperation',
    value: function getOperation(primitiveName) {
      if (primitiveName in this._primitiveProcedures) {
        return this._primitiveProcedures[primitiveName];
      } else if (primitiveName in this._primitiveFunctions) {
        return this._primitiveFunctions[primitiveName];
      } else {
        throw Error(primitiveName + ' is not a primitive.');
      }
    }

    /* Procedures */

  }, {
    key: 'procedures',
    value: function procedures() {
      var procedureNames = [];
      for (var procedureName in this._primitiveProcedures) {
        procedureNames.push(procedureName);
      }
      return procedureNames;
    }
  }, {
    key: 'isProcedure',
    value: function isProcedure(primitiveName) {
      return primitiveName in this._primitiveProcedures;
    }

    /* Functions */

  }, {
    key: 'functions',
    value: function functions() {
      var functionNames = [];
      for (var functionName in this._primitiveFunctions) {
        functionNames.push(functionName);
      }
      return functionNames;
    }
  }, {
    key: 'isFunction',
    value: function isFunction(primitiveName) {
      return primitiveName in this._primitiveFunctions;
    }
  }]);

  return RuntimePrimitives;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueStructure = exports.ValueList = exports.ValueTuple = exports.ValueString = exports.ValueInteger = exports.Value = exports.V_Structure = exports.V_List = exports.V_Tuple = exports.V_String = exports.V_Integer = exports.TypeStructure = exports.TypeList = exports.TypeTuple = exports.TypeString = exports.TypeInteger = exports.TypeAny = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.joinTypes = joinTypes;

var _i18n = __webpack_require__(0);

var _bigint = __webpack_require__(13);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Each value has a type.
 *
 * A type is a tree, represented with instances of Type (or its subclasses).
 * We write:
 *   r(c1, ..., cN)
 * for a tree whose root is r and whose children are c1, ..., cN.
 *
 * The type of a value may be one of the following:
 *   new TypeAny()                      (unknown)
 *   new TypeInteger()
 *   new TypeString()
 *   new TypeTuple([t1, ..., tN])
 *     where ti is the type of the i-th component.
 *   new TypeList(t)
 *     where t is the type of the elements.
 *   new TypeStructure(typeName, cases)
 *     where typeName is the name of the type (e.g. 'Bool').
 *     Moreover, cases is an object of the following "type":
 *       Map String (Map String Type)
 *     more precisely,
 *     - cases is dictionary indexed by constructor names,
 *     - if c is a constructor name, cases[c] is a dictionary
 *       indexed by field name,
 *     - if f is a field name, cases[c][f] is the type of the
 *       field f for the constructor c.
 *
 *     For example, consider the following type definition:
 *       type A is variant {
 *         case B {
 *           field x
 *           field y
 *         }
 *         case C {
 *           field z
 *         }
 *       }
 *
 *    Then the following expression in Gobstones:
 *      [B(x <- 1, y <- "foo")]
 *    is a list whose type is represented as:
 *      new TypeList(
 *        new TypeStructure('A', {
 *          'B': {'x': new TypeInteger(), 'y': new TypeString()}
 *        })
 *      )
 *
 *    The following expression in Gobstones:
 *      [B(x <- 1, y <- "foo"), C(z <- "bar")]
 *    is a list whose type is represented as:
 *      new TypeList(
 *        new TypeStructure('A', {
 *          'B': {'x': new TypeInteger(), 'y': new TypeString()},
 *          'C': {'z': new TypeString()},
 *        })
 *      )
 */
var Ty_Any = Symbol.for('Ty_Any');
var Ty_Integer = Symbol.for('Ty_Integer');
var Ty_String = Symbol.for('Ty_String');
var Ty_Tuple = Symbol.for('Ty_Tuple');
var Ty_List = Symbol.for('Ty_List');
var Ty_Structure = Symbol.for('Ty_Structure');

var Type = function () {
  function Type(tag) {
    _classCallCheck(this, Type);

    this._tag = tag;
  }

  _createClass(Type, [{
    key: 'isAny',
    value: function isAny() {
      return false;
    }
  }, {
    key: 'isInteger',
    value: function isInteger() {
      return false;
    }
  }, {
    key: 'isString',
    value: function isString() {
      return false;
    }
  }, {
    key: 'isTuple',
    value: function isTuple() {
      return false;
    }
  }, {
    key: 'isList',
    value: function isList() {
      return false;
    }
  }, {
    key: 'isStructure',
    value: function isStructure() {
      return false;
    }
  }, {
    key: 'isBoolean',
    value: function isBoolean() {
      return false;
    }
  }, {
    key: 'isColor',
    value: function isColor() {
      return false;
    }
  }, {
    key: 'isDirection',
    value: function isDirection() {
      return false;
    }
  }, {
    key: 'tag',
    get: function get() {
      return this._tag;
    }
  }]);

  return Type;
}();

var TypeAny = exports.TypeAny = function (_Type) {
  _inherits(TypeAny, _Type);

  function TypeAny() {
    _classCallCheck(this, TypeAny);

    return _possibleConstructorReturn(this, (TypeAny.__proto__ || Object.getPrototypeOf(TypeAny)).call(this, Ty_Any));
  }

  _createClass(TypeAny, [{
    key: 'toString',
    value: function toString() {
      return '?';
    }
  }, {
    key: 'isAny',
    value: function isAny() {
      return true;
    }
  }]);

  return TypeAny;
}(Type);

var TypeInteger = exports.TypeInteger = function (_Type2) {
  _inherits(TypeInteger, _Type2);

  function TypeInteger() {
    _classCallCheck(this, TypeInteger);

    return _possibleConstructorReturn(this, (TypeInteger.__proto__ || Object.getPrototypeOf(TypeInteger)).call(this, Ty_Integer));
  }

  _createClass(TypeInteger, [{
    key: 'toString',
    value: function toString() {
      return (0, _i18n.i18n)('TYPE:Integer');
    }
  }, {
    key: 'isInteger',
    value: function isInteger() {
      return true;
    }
  }]);

  return TypeInteger;
}(Type);

var TypeString = exports.TypeString = function (_Type3) {
  _inherits(TypeString, _Type3);

  function TypeString() {
    _classCallCheck(this, TypeString);

    return _possibleConstructorReturn(this, (TypeString.__proto__ || Object.getPrototypeOf(TypeString)).call(this, Ty_String));
  }

  _createClass(TypeString, [{
    key: 'toString',
    value: function toString() {
      return (0, _i18n.i18n)('TYPE:String');
    }
  }, {
    key: 'isString',
    value: function isString() {
      return true;
    }
  }]);

  return TypeString;
}(Type);

var TypeTuple = exports.TypeTuple = function (_Type4) {
  _inherits(TypeTuple, _Type4);

  function TypeTuple(componentTypes) {
    _classCallCheck(this, TypeTuple);

    var _this4 = _possibleConstructorReturn(this, (TypeTuple.__proto__ || Object.getPrototypeOf(TypeTuple)).call(this, Ty_Tuple));

    _this4._componentTypes = componentTypes;
    return _this4;
  }

  _createClass(TypeTuple, [{
    key: 'toString',
    value: function toString() {
      var strings = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._componentTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var t = _step.value;

          strings.push(t.toString());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return (0, _i18n.i18n)('TYPE:Tuple') + '(' + strings.join(', ') + ')';
    }
  }, {
    key: 'isTuple',
    value: function isTuple() {
      return true;
    }
  }, {
    key: 'componentTypes',
    get: function get() {
      return this._componentTypes;
    }
  }]);

  return TypeTuple;
}(Type);

var TypeList = exports.TypeList = function (_Type5) {
  _inherits(TypeList, _Type5);

  function TypeList(contentType) {
    _classCallCheck(this, TypeList);

    var _this5 = _possibleConstructorReturn(this, (TypeList.__proto__ || Object.getPrototypeOf(TypeList)).call(this, Ty_List));

    _this5._contentType = contentType;
    return _this5;
  }

  _createClass(TypeList, [{
    key: 'toString',
    value: function toString() {
      var suffix = '';
      if (!this._contentType.isAny()) {
        suffix = '(' + this._contentType.toString() + ')';
      }
      return (0, _i18n.i18n)('TYPE:List') + suffix;
    }
  }, {
    key: 'isList',
    value: function isList() {
      return true;
    }
  }, {
    key: 'contentType',
    get: function get() {
      return this._contentType;
    }
  }]);

  return TypeList;
}(Type);

var TypeStructure = exports.TypeStructure = function (_Type6) {
  _inherits(TypeStructure, _Type6);

  function TypeStructure(typeName, cases) {
    _classCallCheck(this, TypeStructure);

    var _this6 = _possibleConstructorReturn(this, (TypeStructure.__proto__ || Object.getPrototypeOf(TypeStructure)).call(this, Ty_Structure));

    _this6._typeName = typeName;
    _this6._cases = cases;
    return _this6;
  }

  _createClass(TypeStructure, [{
    key: 'toString',
    value: function toString() {
      var caseStrings = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = sortedKeys(this._cases)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var constructorName = _step2.value;

          var fieldTypes = this._cases[constructorName];
          var fieldStrings = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = sortedKeys(fieldTypes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var fieldName = _step3.value;

              fieldStrings.push(fieldName + ' <- ' + fieldTypes[fieldName].toString());
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          if (fieldStrings.length !== 0) {
            caseStrings.push(constructorName + '(' + fieldStrings.join(', ') + ')');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (caseStrings.length === 0) {
        return this._typeName;
      } else {
        return this._typeName + ' { ' + caseStrings.join(' | ') + ' }';
      }
    }
  }, {
    key: 'isStructure',
    value: function isStructure() {
      return true;
    }
  }, {
    key: 'isBoolean',
    value: function isBoolean() {
      return this._typeName === (0, _i18n.i18n)('TYPE:Bool');
    }
  }, {
    key: 'isColor',
    value: function isColor() {
      return this._typeName === (0, _i18n.i18n)('TYPE:Color');
    }
  }, {
    key: 'isDirection',
    value: function isDirection() {
      return this._typeName === (0, _i18n.i18n)('TYPE:Dir');
    }
  }, {
    key: 'typeName',
    get: function get() {
      return this._typeName;
    }
  }, {
    key: 'cases',
    get: function get() {
      return this._cases;
    }
  }]);

  return TypeStructure;
}(Type);

/* Attempts to calculate the "join" of two types.
 *
 * To join two types:
 * - any occurrence of TypeAny() may be replaced by an arbitrary type,
 * - structures of the same type built with different constructors
 *   are joinable,
 * - structures of the same type built with the same constructors
 *   are joinable if their matching fields are joinable.
 *
 * If the types are joinable, return their join.
 * If the types are not joinable, return null.
 */

/* Forward definition of mutually recursive functions (for ESLint) */


var joinTupleTypes = void 0;
var joinListTypes = void 0;
var joinStructureTypes = void 0;
var joinFields = void 0;

function joinTypes(type1, type2) {
  if (type1 === null || type2 === null) {
    return null;
  } else if (type1.tag === Ty_Any) {
    return type2;
  } else if (type2.tag === Ty_Any) {
    return type1;
  } else if (type1.tag === Ty_Integer && type2.tag === Ty_Integer) {
    return type1;
  } else if (type1.tag === Ty_String && type2.tag === Ty_String) {
    return type1;
  } else if (type1.tag === Ty_Tuple && type2.tag === Ty_Tuple) {
    return joinTupleTypes(type1, type2);
  } else if (type1.tag === Ty_List && type2.tag === Ty_List) {
    return joinListTypes(type1, type2);
  } else if (type1.tag === Ty_Structure && type2.tag === Ty_Structure) {
    return joinStructureTypes(type1, type2);
  } else {
    /* Otherwise the types are not joinable */
    return null;
  }
}

joinTupleTypes = function joinTupleTypes(type1, type2) {
  if (type1.componentTypes.length !== type2.componentTypes.length) {
    /* Tuples are of different length */
    return null;
  }
  var joinedComponents = [];
  for (var i = 0; i < type1.componentTypes.length; i++) {
    var t1 = type1.componentTypes[i];
    var t2 = type2.componentTypes[i];
    var tj = joinTypes(t1, t2);
    if (tj === null) {
      /* Cannot join the i-th component */
      return null;
    }
    joinedComponents.push(tj);
  }
  return new TypeTuple(joinedComponents);
};

joinListTypes = function joinListTypes(type1, type2) {
  var joinedContent = joinTypes(type1.contentType, type2.contentType);
  if (joinedContent === null) {
    /* Cannot join the contents of the lists */
    return null;
  }
  return new TypeList(joinedContent);
};

/*
 * The join of two structures is quite like a least common multiple.
 * We must:
 * - Check that they are structures of the same type.
 * - Include all the non-common constructors verbatim
 *   (with "non-common" we mean those that are in type1
 *   but not in type2 or vice-versa).
 * - For all common constructors, we must recursively join
 *   the types of their respective fields.
 */
joinStructureTypes = function joinStructureTypes(type1, type2) {
  if (type1.typeName !== type2.typeName) {
    return null;
  }

  var joinedCases = {};

  /* Include all the non-common constructors */
  function joinCommon(typeA, typeB) {
    for (var constructorName in typeA.cases) {
      if (!(constructorName in typeB.cases)) {
        joinedCases[constructorName] = typeA.cases[constructorName];
      }
    }
  }
  joinCommon(type1, type2);
  joinCommon(type2, type1);

  /* Include all the common constructors */
  for (var constructorName in type1.cases) {
    if (constructorName in type2.cases) {
      var joinedFields = joinFields(type1.cases[constructorName], type2.cases[constructorName]);
      if (joinedFields === null) {
        return null;
      }
      joinedCases[constructorName] = joinedFields;
    }
  }

  return new TypeStructure(type1.typeName, joinedCases);
};

joinFields = function joinFields(fields1, fields2) {
  /* Ensure that they have the same set of fields */
  function checkIncluded(fieldsA, fieldsB) {
    for (var fieldName in fieldsA) {
      if (!(fieldName in fieldsB)) {
        throw Error('Join fields: structures built using the same constructor ' + 'should have the same set of fields.');
      }
    }
  }
  checkIncluded(fields1, fields2);
  checkIncluded(fields2, fields1);

  /* Recursively join the types of the common fields */
  var joinedFields = {};
  for (var fieldName in fields1) {
    var type1 = fields1[fieldName];
    var type2 = fields2[fieldName];
    var joinedTypes = joinTypes(type1, type2);
    if (joinedTypes === null) {
      return null;
    }
    joinedFields[fieldName] = joinedTypes;
  }
  return joinedFields;
};

/* Helper function */

function sortedKeys(dictionary) {
  var keys = [];
  for (var key in dictionary) {
    keys.push(key);
  }
  return keys.sort();
}

/* Value tags */
var V_Integer = exports.V_Integer = Symbol.for('V_Integer');
var V_String = exports.V_String = Symbol.for('V_String');
var V_Tuple = exports.V_Tuple = Symbol.for('V_Tuple');
var V_List = exports.V_List = Symbol.for('V_List');
var V_Structure = exports.V_Structure = Symbol.for('V_Structure');

var Value = exports.Value = function () {
  function Value(tag) {
    _classCallCheck(this, Value);

    this._tag = tag;
  }

  _createClass(Value, [{
    key: 'type',
    value: function type() {
      return new Type('?', []);
    }
  }, {
    key: 'isInteger',
    value: function isInteger() {
      return this.type().isInteger();
    }
  }, {
    key: 'isString',
    value: function isString() {
      return this.type().isString();
    }
  }, {
    key: 'isTuple',
    value: function isTuple() {
      return this.type().isTuple();
    }
  }, {
    key: 'isList',
    value: function isList() {
      return this.type().isList();
    }
  }, {
    key: 'isStructure',
    value: function isStructure() {
      return this.type().isStructure();
    }
  }, {
    key: 'isBoolean',
    value: function isBoolean() {
      return this.type().isBoolean();
    }
  }, {
    key: 'tag',
    get: function get() {
      return this._tag;
    }
  }]);

  return Value;
}();

var ValueInteger = exports.ValueInteger = function (_Value) {
  _inherits(ValueInteger, _Value);

  function ValueInteger(number) {
    _classCallCheck(this, ValueInteger);

    var _this7 = _possibleConstructorReturn(this, (ValueInteger.__proto__ || Object.getPrototypeOf(ValueInteger)).call(this, V_Integer));

    if (typeof number === 'number') {
      _this7._number = number.toString();
    } else if (typeof number === 'string') {
      _this7._number = number;
    } else {
      throw Error('Integer value must be constructed with an integer or a string');
    }
    return _this7;
  }

  _createClass(ValueInteger, [{
    key: 'toString',
    value: function toString() {
      return this._number;
    }
  }, {
    key: 'type',
    value: function type() {
      return new TypeInteger();
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      return other.tag === V_Integer && this.number === other.number;
    }
  }, {
    key: 'add',
    value: function add(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return new ValueInteger(a.add(b).toString());
    }
  }, {
    key: 'sub',
    value: function sub(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return new ValueInteger(a.subtract(b).toString());
    }
  }, {
    key: 'mul',
    value: function mul(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return new ValueInteger(a.multiply(b).toString());
    }

    /* Gobstones calculates quotients using
     * modulo (i.e.truncating towards minus infinity)
     * rather than
     * remainder (i.e.truncating towards 0).
     *
     * We need to adjust the result to match the standard Gobstones
     * semantics, namely:
     *
     * if a and b have the same sign, then
     *   a div b  =  abs(a) / abs(b)
     *
     * if a and b have different signs, then
     *   a div b  =  -((abs(a) + abs(b) - 1) / abs(b))
     *
     * Here "div" denotes the official Gobstones division operator,
     * while "/" denotes the JavaScript/bigint implementation.
     */

  }, {
    key: 'div',
    value: function div(other) {
      var z = new ValueInteger(0);
      if (this.gt(z) === other.gt(z)) {
        /* Same sign */
        var a = (0, _bigint.Integer)(this.abs()._number);
        var b = (0, _bigint.Integer)(other.abs()._number);
        return new ValueInteger(a.divide(b).toString());
      } else {
        /* Different sign */
        var inc = other.abs().sub(new ValueInteger(1));
        var _a = (0, _bigint.Integer)(this.abs().add(inc)._number);
        var _b = (0, _bigint.Integer)(other.abs()._number);
        return new ValueInteger(_a.divide(_b).negate().toString());
      }
    }

    /* Calculate the modulus from the equation a = qb + r,
     * i.e.  r = a - qb */

  }, {
    key: 'mod',
    value: function mod(other) {
      var q = this.div(other);
      return this.sub(q.mul(other));
    }

    /* Assumes that 'other' is non-negative */

  }, {
    key: 'pow',
    value: function pow(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return new ValueInteger(a.pow(b).toString());
    }
  }, {
    key: 'eq',
    value: function eq(other) {
      return this.equal(other);
    }
  }, {
    key: 'ne',
    value: function ne(other) {
      return !this.equal(other);
    }
  }, {
    key: 'le',
    value: function le(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return a.leq(b);
    }
  }, {
    key: 'lt',
    value: function lt(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return a.lt(b);
    }
  }, {
    key: 'ge',
    value: function ge(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return a.geq(b);
    }
  }, {
    key: 'gt',
    value: function gt(other) {
      var a = (0, _bigint.Integer)(this._number);
      var b = (0, _bigint.Integer)(other._number);
      return a.gt(b);
    }
  }, {
    key: 'negate',
    value: function negate() {
      var a = (0, _bigint.Integer)(this._number);
      return new ValueInteger(a.negate().toString());
    }
  }, {
    key: 'abs',
    value: function abs() {
      if (this.gt(new ValueInteger(0))) {
        return this;
      } else {
        return this.negate();
      }
    }
  }, {
    key: 'asNumber',
    value: function asNumber() {
      return parseInt(this._number, 10);
    }
  }, {
    key: 'number',
    get: function get() {
      return this._number;
    }
  }]);

  return ValueInteger;
}(Value);

var ValueString = exports.ValueString = function (_Value2) {
  _inherits(ValueString, _Value2);

  function ValueString(string) {
    _classCallCheck(this, ValueString);

    var _this8 = _possibleConstructorReturn(this, (ValueString.__proto__ || Object.getPrototypeOf(ValueString)).call(this, V_String));

    _this8._string = string;
    return _this8;
  }

  _createClass(ValueString, [{
    key: 'toString',
    value: function toString() {
      var res = ['"'];
      for (var i = 0; i < this._string.length; i++) {
        var chr = this._string[i];
        switch (chr) {
          case '"':
            res.push('\\');
            res.push('"');
            break;
          case '\\':
            res.push('\\');
            res.push('\\');
            break;
          case '\x07':
            res.push('\\');
            res.push('a');
            break;
          case '\b':
            res.push('\\');
            res.push('b');
            break;
          case '\f':
            res.push('\\');
            res.push('f');
            break;
          case '\n':
            res.push('\\');
            res.push('n');
            break;
          case '\r':
            res.push('\\');
            res.push('r');
            break;
          case '\t':
            res.push('\\');
            res.push('t');
            break;
          case '\v':
            res.push('\\');
            res.push('v');
            break;
          default:
            res.push(chr);
            break;
        }
      }
      res.push('"');
      return res.join('');
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      return other.tag === V_String && this.string === other.string;
    }
  }, {
    key: 'type',
    value: function type() {
      return new TypeString();
    }
  }, {
    key: 'string',
    get: function get() {
      return this._string;
    }
  }]);

  return ValueString;
}(Value);

var ValueTuple = exports.ValueTuple = function (_Value3) {
  _inherits(ValueTuple, _Value3);

  function ValueTuple(components) {
    _classCallCheck(this, ValueTuple);

    var _this9 = _possibleConstructorReturn(this, (ValueTuple.__proto__ || Object.getPrototypeOf(ValueTuple)).call(this, V_Tuple));

    _this9._components = components;
    _this9._type = _this9._inferType();
    return _this9;
  }

  _createClass(ValueTuple, [{
    key: 'toString',
    value: function toString() {
      var res = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._components[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var component = _step4.value;

          res.push(component.toString());
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return '(' + res.join(', ') + ')';
    }
  }, {
    key: 'size',
    value: function size() {
      return this._components.length;
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      if (other.tag !== V_Tuple) {
        return false;
      }
      if (this.components.length !== other.components.length) {
        return false;
      }
      for (var i = 0; i < this.components.length; i++) {
        if (!this.components[i].equal(other.components[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'type',
    value: function type() {
      return this._type;
    }
  }, {
    key: '_inferType',
    value: function _inferType() {
      var componentTypes = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._components[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var component = _step5.value;

          componentTypes.push(component.type());
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return new TypeTuple(componentTypes);
    }
  }, {
    key: 'components',
    get: function get() {
      return this._components;
    }
  }]);

  return ValueTuple;
}(Value);

var ValueList = exports.ValueList = function (_Value4) {
  _inherits(ValueList, _Value4);

  function ValueList(elements) {
    _classCallCheck(this, ValueList);

    var _this10 = _possibleConstructorReturn(this, (ValueList.__proto__ || Object.getPrototypeOf(ValueList)).call(this, V_List));

    _this10._elements = elements;
    _this10._type = _this10._inferType();
    return _this10;
  }

  _createClass(ValueList, [{
    key: 'toString',
    value: function toString() {
      var res = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this._elements[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var element = _step6.value;

          res.push(element.toString());
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return '[' + res.join(', ') + ']';
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      if (other.tag !== V_List) {
        return false;
      }
      if (this.elements.length !== other.elements.length) {
        return false;
      }
      for (var i = 0; i < this.elements.length; i++) {
        if (!this.elements[i].equal(other.elements[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'type',
    value: function type() {
      return this._type;
    }
  }, {
    key: 'length',
    value: function length() {
      return this._elements.length;
    }
  }, {
    key: '_inferType',
    value: function _inferType() {
      var contentType = new TypeAny();
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this._elements[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var element = _step7.value;

          contentType = joinTypes(contentType, element.type());
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return new TypeList(contentType);
    }
  }, {
    key: 'append',
    value: function append(other) {
      var allElements = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.elements[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var elem = _step8.value;

          allElements.push(elem);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = other.elements[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _elem = _step9.value;

          allElements.push(_elem);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return new ValueList(allElements);
    }
  }, {
    key: 'head',
    value: function head() {
      return this.elements[0];
    }
  }, {
    key: 'tail',
    value: function tail() {
      var elements = [];
      for (var i = 1; i < this.elements.length; i++) {
        elements.push(this.elements[i]);
      }
      return new ValueList(elements);
    }
  }, {
    key: 'init',
    value: function init() {
      var elements = [];
      for (var i = 0; i < this.elements.length - 1; i++) {
        elements.push(this.elements[i]);
      }
      return new ValueList(elements);
    }
  }, {
    key: 'last',
    value: function last() {
      return this.elements[this.elements.length - 1];
    }
  }, {
    key: 'elements',
    get: function get() {
      return this._elements;
    }
  }]);

  return ValueList;
}(Value);

/* An instance of ValueStructure represents a 'structure' i.e.  a value
 * inhabiting an 'inductive' datatype.
 *
 * This includes built-in enumerations (e.g. booleans), the "event" type
 * received by an interactive program, and user-defined records and variants.
 *
 * The second parameter "fields" should be a dictionary mapping field names to
 * values
 */


var ValueStructure = exports.ValueStructure = function (_Value5) {
  _inherits(ValueStructure, _Value5);

  function ValueStructure(typeName, constructorName, fields) {
    _classCallCheck(this, ValueStructure);

    var _this11 = _possibleConstructorReturn(this, (ValueStructure.__proto__ || Object.getPrototypeOf(ValueStructure)).call(this, V_Structure));

    _this11._typeName = typeName;
    _this11._constructorName = constructorName;
    _this11._fields = fields;
    return _this11;
  }

  _createClass(ValueStructure, [{
    key: 'toString',
    value: function toString() {
      var res = [];
      var fieldNames = this.fieldNames();
      if (fieldNames.length === 0) {
        return this._constructorName;
      }
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = fieldNames[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var fieldName = _step10.value;

          res.push(fieldName + ' <- ' + this.fields[fieldName].toString());
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      return this._constructorName + '(' + res.join(', ') + ')';
    }
  }, {
    key: 'fieldNames',
    value: function fieldNames() {
      return sortedKeys(this._fields);
    }
  }, {
    key: '_clone',
    value: function _clone() {
      var newFields = {};
      for (var fieldName in this._fields) {
        newFields[fieldName] = this._fields[fieldName];
      }
      return new ValueStructure(this._typeName, this._constructorName, newFields);
    }
  }, {
    key: 'updateFields',
    value: function updateFields(fields) {
      var newStructure = this._clone();
      for (var fieldName in fields) {
        newStructure.fields[fieldName] = fields[fieldName];
      }
      return newStructure;
    }
  }, {
    key: 'equal',
    value: function equal(other) {
      if (other.tag !== V_Structure) {
        return false;
      }
      if (this.constructorName !== other.constructorName) {
        return false;
      }
      var fieldNames = this.fieldNames();
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = fieldNames[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var fieldName = _step11.value;

          if (!this.fields[fieldName].equal(other.fields[fieldName])) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      return true;
    }
  }, {
    key: 'type',
    value: function type() {
      var fieldTypes = {};
      for (var fieldName in this._fields) {
        fieldTypes[fieldName] = this._fields[fieldName].type();
      }
      var cases = {};
      cases[this._constructorName] = fieldTypes;
      return new TypeStructure(this._typeName, cases);
    }
  }, {
    key: 'typeName',
    get: function get() {
      return this._typeName;
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this._constructorName;
    }
  }, {
    key: 'fields',
    get: function get() {
      return this._fields;
    }
  }]);

  return ValueStructure;
}(Value);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* A SourceReader represents the current position in a source file.
 * It keeps track of line and column numbers.
 * Methods are non-destructive. For example:
 *
 *     let r = new SourceReader('foo.gbs', 'if\n(True)');
 *
 *     r.peek();                       // ~~> 'i'
 *     r = r.consumeCharacter();       // Note: returns a new file reader.
 *
 *     r.peek();                       // ~~> 'f'
 *     r = r.consumeCharacter();
 *
 *     r.peek();                       // ~~> '\n'
 *     r = r.consumeCharacter('\n');
 *
 *     r.line();                       // ~~> 2
 */
var SourceReader = exports.SourceReader = function () {
  function SourceReader(filename, string) {
    _classCallCheck(this, SourceReader);

    this._filename = filename; // Filename
    this._string = string; // Source of the current file
    this._index = 0; // Index in the current file
    this._line = 1; // Line in the current file
    this._column = 1; // Column in the current file
    this._regions = []; // Lexical (static) stack of regions
  }

  _createClass(SourceReader, [{
    key: '_clone',
    value: function _clone() {
      var r = new SourceReader(this._filename, this._string);
      r._index = this._index;
      r._line = this._line;
      r._column = this._column;
      r._regions = this._regions;
      return r;
    }
  }, {
    key: 'consumeCharacter',


    /* Consume one character */
    value: function consumeCharacter() {
      var r = this._clone();
      if (r.peek() === '\n') {
        r._line++;
        r._column = 1;
      } else {
        r._column++;
      }
      r._index++;
      return r;
    }

    /* Consume characters from the input, one per each character in the string
     * (the contents of the string are ignored). */

  }, {
    key: 'consumeString',
    value: function consumeString(string) {
      var r = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ = _step.value;

          r = r.consumeCharacter();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return r;
    }

    /* Returns the SourceReader after consuming an 'invisible' character.
     * Invisible characters affect the index but not the line or column.
     */

  }, {
    key: 'consumeInvisibleCharacter',
    value: function consumeInvisibleCharacter() {
      var r = this._clone();
      r._index++;
      return r;
    }

    /* Consume 'invisible' characters from the input, one per each character
     * in the string */

  }, {
    key: 'consumeInvisibleString',
    value: function consumeInvisibleString(string) {
      var r = this;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = string[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ = _step2.value;

          r = r.consumeInvisibleCharacter();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return r;
    }

    /* Return true if the substring occurs at the current point. */

  }, {
    key: 'startsWith',
    value: function startsWith(sub) {
      var i = this._index;
      var j = this._index + sub.length;
      return j <= this._string.length && this._string.substring(i, j) === sub;
    }

    /* Return true if we have reached the end of the current file */

  }, {
    key: 'eof',
    value: function eof() {
      return this._index >= this._string.length;
    }

    /* Return the current character, assuming we have not reached EOF */

  }, {
    key: 'peek',
    value: function peek() {
      return this._string[this._index];
    }

    /* Push a region to the stack of regions (non-destructively) */

  }, {
    key: 'beginRegion',
    value: function beginRegion(region) {
      var r = this._clone();
      r._regions = [region].concat(r._regions);
      return r;
    }

    /* Pop a region from the stack of regions (non-destructively) */

  }, {
    key: 'endRegion',
    value: function endRegion() {
      var r = this._clone();
      if (r._regions.length > 0) {
        r._regions = r._regions.slice(1);
      }
      return r;
    }
  }, {
    key: 'filename',
    get: function get() {
      return this._filename;
    }
  }, {
    key: 'line',
    get: function get() {
      return this._line;
    }
  }, {
    key: 'column',
    get: function get() {
      return this._column;
    }
  }, {
    key: 'region',
    get: function get() {
      if (this._regions.length > 0) {
        return this._regions[0];
      } else {
        return '';
      }
    }
  }]);

  return SourceReader;
}();

/* Return a source reader that represents an unknown position */


var UnknownPosition = exports.UnknownPosition = new SourceReader('(?)', '');

/* An instance of MultifileReader represents a scanner for reading
 * source code from a list of files.
 */

var MultifileReader = exports.MultifileReader = function () {

  /* The 'input' parameter should be either:
   * (1) a string. e.g.  'program {}', or
   * (2) a map from filenames to strings, e.g.
   *     {
   *       'foo.gbs': 'program { P() }',
   *       'bar.gbs': 'procedure P() {}',
   *     }
   */
  function MultifileReader(input) {
    _classCallCheck(this, MultifileReader);

    if (typeof input === 'string') {
      input = { '(?)': input };
    }
    this._filenames = Object.keys(input);
    this._filenames.sort();
    this._input = input;
    this._index = 0;
  }

  /* Return true if there are more files */


  _createClass(MultifileReader, [{
    key: 'moreFiles',
    value: function moreFiles() {
      return this._index + 1 < this._filenames.length;
    }

    /* Advance to the next file */

  }, {
    key: 'nextFile',
    value: function nextFile() {
      this._index++;
    }

    /* Return a SourceReader for the current files */

  }, {
    key: 'readCurrentFile',
    value: function readCurrentFile() {
      if (this._index < this._filenames.length) {
        var filename = this._filenames[this._index];
        return new SourceReader(filename, this._input[filename]);
      } else {
        return new SourceReader('(?)', '');
      }
    }
  }]);

  return MultifileReader;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function keyword(palabra) {
  return 'la palabra clave "' + palabra + '"';
}

function pluralize(n, singular, plural) {
  if (n === 0) {
    return 'ningún ' + singular;
  } else if (n === 1) {
    return 'un ' + singular;
  } else {
    return n.toString() + ' ' + plural;
  }
}

function ordinalNumber(n) {
  var units = ['', 'primer', 'segundo', 'tercer', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno'];
  if (1 <= n <= 9) {
    return units[n];
  } else {
    return '#' + n.toString();
  }
}

function describeType(type) {
  if (type.isInteger()) {
    return ['m', 'número', 'números'];
  } else if (type.isBoolean()) {
    return ['m', 'booleano', 'booleanos'];
  } else if (type.isColor()) {
    return ['m', 'color', 'colores'];
  } else if (type.isDirection()) {
    return ['f', 'dirección', 'direcciones'];
  } else if (type.isList() && type.contentType.isAny()) {
    return ['f', 'lista', 'listas'];
  } else if (type.isList()) {
    var description = describeType(type.contentType);
    if (description === null) {
      return null;
    } else {
      var plural = description[2];
      return ['f', 'lista de ' + plural, 'listas de ' + plural];
    }
  } else {
    return null;
  }
}

function describeTypeSingular(type) {
  var description = describeType(type);
  if (description === null) {
    return type.toString();
  } else {
    var singular = description[1];
    return singular;
  }
}

function typeAsNoun(type) {
  var description = describeType(type);
  if (description === null) {
    return 'un valor de tipo ' + type.toString();
  } else {
    var gender = description[0];
    var singular = description[1];
    if (gender === 'm') {
      return 'un ' + singular;
    } else {
      return 'una ' + singular;
    }
  }
}

function typeAsQualifierSingular(type) {
  var description = describeType(type);
  if (description === null) {
    return 'de tipo ' + type.toString();
  } else {
    var gender = description[0];
    var singular = description[1];
    if (gender === 'm') {
      return 'un ' + singular;
    } else {
      return 'una ' + singular;
    }
  }
}

function typeAsQualifierPlural(type) {
  var description = describeType(type);
  if (description === null) {
    return 'de tipo ' + type.toString();
  } else {
    var gender = description[0];
    var plural = description[2];
    if (gender === 'm') {
      return plural;
    } else {
      return plural;
    }
  }
}

function listOfTypes(types) {
  var typeStrings = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var type = _step.value;

      typeStrings.push(describeTypeSingular(type));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return typeStrings.join(', ');
}

function openingDelimiterName(delimiter) {
  if (delimiter === '(' || delimiter === ')') {
    return 'un paréntesis abierto "("';
  } else if (delimiter === '[' || delimiter === ']') {
    return 'un corchete abierto "["';
  } else if (delimiter === '{' || delimiter === '}') {
    return 'una llave abierta "{"';
  } else {
    return delimiter;
  }
}

function formatTypes(string, type1, type2) {
  var result = '';
  for (var i = 0; i < string.length; i++) {
    if (string[i] === '%' && i + 1 < string.length) {
      if (string[i + 1] === '%') {
        result += '%';
        i++;
      } else if (string[i + 1] === '1') {
        result += typeAsNoun(type1);
        i++;
      } else if (string[i + 1] === '2') {
        result += typeAsNoun(type2);
        i++;
      } else {
        result += '%';
      }
    } else {
      result += string[i];
    }
  }
  return result;
}

var LOCALE_ES = exports.LOCALE_ES = {

  /* Descriptions of syntactic constructions and tokens */
  'definition': 'una definición (de programa, función, procedimiento, o tipo)',
  'pattern': 'un patrón (comodín "_", constructor aplicado a variables, o tupla)',
  'statement': 'un comando',
  'expression': 'una expresión',
  'procedure call': 'una invocación a un procedimiento',
  'field name': 'el nombre de un campo',
  'T_EOF': 'el final del archivo',
  'T_NUM': 'un número',
  'T_STRING': 'una cadena (string)',
  'T_UPPERID': 'un identificador con mayúsculas',
  'T_LOWERID': 'un identificador con minúsculas',
  'T_PROGRAM': keyword('program'),
  'T_INTERACTIVE': keyword('interactive'),
  'T_PROCEDURE': keyword('procedure'),
  'T_FUNCTION': keyword('function'),
  'T_RETURN': keyword('return'),
  'T_IF': keyword('if'),
  'T_THEN': keyword('then'),
  'T_ELSE': keyword('else'),
  'T_REPEAT': keyword('repeat'),
  'T_FOREACH': keyword('foreach'),
  'T_IN': keyword('in'),
  'T_WHILE': keyword('while'),
  'T_SWITCH': keyword('switch'),
  'T_TO': keyword('to'),
  'T_LET': keyword('let'),
  'T_NOT': keyword('not'),
  'T_DIV': keyword('div'),
  'T_MOD': keyword('mod'),
  'T_TYPE': keyword('type'),
  'T_IS': keyword('is'),
  'T_CHOOSE': keyword('choose'),
  'T_WHEN': keyword('when'),
  'T_OTHERWISE': keyword('otherwise'),
  'T_MATCHING': keyword('matching'),
  'T_SELECT': keyword('select'),
  'T_ON': keyword('on'),
  'T_RECORD': keyword('record'),
  'T_VARIANT': keyword('variant'),
  'T_CASE': keyword('case'),
  'T_FIELD': keyword('field'),
  'T_UNDERSCORE': 'un guión bajo ("_")',
  'T_LPAREN': 'un paréntesis izquierdo ("(")',
  'T_RPAREN': 'un paréntesis derecho (")")',
  'T_LBRACE': 'una llave izquierda ("{")',
  'T_RBRACE': 'una llave derecha ("}")',
  'T_LBRACK': 'un corchete izquierdo ("[")',
  'T_RBRACK': 'un corchete derecho ("]")',
  'T_COMMA': 'una coma (",")',
  'T_SEMICOLON': 'un punto y coma (";")',
  'T_RANGE': 'un separador de rango ("..")',
  'T_GETS': 'una flecha hacia la izquierda ("<-")',
  'T_PIPE': 'una barra vertical ("|")',
  'T_ARROW': 'una flecha ("->")',
  'T_ASSIGN': 'un operador de asignación (":=")',
  'T_EQ': 'una comparación por igualdad ("==")',
  'T_NE': 'una comparación por desigualdad ("/=")',
  'T_LE': 'un menor o igual ("<=")',
  'T_GE': 'un mayor o igual (">=")',
  'T_LT': 'un menor estricto ("<")',
  'T_GT': 'un mayor estricto (">")',
  'T_AND': 'el "y" lógico ("&&")',
  'T_OR': 'el "o" lógico ("||")',
  'T_CONCAT': 'el operador de concatenación de listas ("++")',
  'T_PLUS': 'el operador de suma ("+")',
  'T_MINUS': 'el operador de resta ("-")',
  'T_TIMES': 'el operador de producto ("*")',
  'T_POW': 'el operador de potencia ("^")',

  /* Local name categories */
  'LocalVariable': 'variable',
  'LocalIndex': 'índice',
  'LocalParameter': 'parámetro',

  /* Descriptions of value types */
  'V_Integer': 'un número',
  'V_String': 'una cadena',
  'V_Tuple': 'una tupla',
  'V_List': 'una lista',
  'V_Structure': 'una estructura',

  /* Lexer */
  'errmsg:unclosed-multiline-comment': 'El comentario se abre pero nunca se cierra.',

  'errmsg:unclosed-string-constant': 'La comilla que abre no tiene una comilla que cierra correspondiente.',

  'errmsg:numeric-constant-should-not-have-leading-zeroes': 'Las constantes numéricas no se pueden escribir con ceros a la ' + 'izquierda.',

  'errmsg:identifier-must-start-with-alphabetic-character': 'Los identificadores deben empezar con un caracter alfabético ' + '(a...z,A...Z).',

  'errmsg:unknown-token': function errmsgUnknownToken(symbol) {
    return 'Símbolo desconocido en la entrada: "' + symbol + '".';
  },

  'warning:empty-pragma': 'Directiva pragma vacía.',

  'warning:unknown-pragma': function warningUnknownPragma(pragmaName) {
    return 'Directiva pragma desconocida: "' + pragmaName + '".';
  },

  'errmsg:unmatched-opening-delimiter': function errmsgUnmatchedOpeningDelimiter(delimiter) {
    return 'Se encontró ' + openingDelimiterName(delimiter) + ' pero nunca se cierra.';
  },

  'errmsg:unmatched-closing-delimiter': function errmsgUnmatchedClosingDelimiter(delimiter) {
    return 'Se encontró un "' + delimiter + '" ' + 'pero no había ' + openingDelimiterName(delimiter) + '.';
  },

  'errmsg:unknown-language-option': function errmsgUnknownLanguageOption(option) {
    return 'Opción desconocida. "' + option + '".';
  },

  /* Parser */
  'errmsg:empty-source': 'El programa está vacío.',

  'errmsg:expected-but-found': function errmsgExpectedButFound(expected, found) {
    return 'Se esperaba ' + expected + '.\n' + 'Se encontró: ' + found + '.';
  },

  'errmsg:pattern-number-cannot-be-negative-zero': 'El patrón numérico no puede ser "-0".',

  'errmsg:return-tuple-cannot-be-empty': 'El return tiene que devolver algo.',

  'errmsg:pattern-tuple-cannot-be-singleton': 'El patrón para una tupla no puede tener una sola componente. ' + 'Las tuplas tienen 0, 2, 3, o más componentes, pero no 1.',

  'errmsg:assignment-tuple-cannot-be-singleton': 'La asignación a una tupla no puede constar de una sola componente. ' + 'Las tuplas tienen 0, 2, 3, o más componentes, pero no 1.',

  'errmsg:operators-are-not-associative': function errmsgOperatorsAreNotAssociative(op1, op2) {
    return 'La expresión usa ' + op1 + ' y ' + op2 + ', pero estos operadores no se pueden asociar. ' + 'Quizás faltan paréntesis.';
  },

  'errmsg:obsolete-tuple-assignment': 'Se esperaba un comando pero se encontró un paréntesis izquierdo. ' + 'Nota: la sintaxis de asignación de tuplas "(x1, ..., xN) := y" ' + 'está obsoleta. Usar "let (x1, ..., xN) := y".',

  /* Linter */
  'errmsg:program-already-defined': function errmsgProgramAlreadyDefined(pos1, pos2) {
    return 'Ya había un programa definido en ' + pos1 + '.\n' + 'No se puede definir un programa en ' + pos2 + '.';
  },

  'errmsg:procedure-already-defined': function errmsgProcedureAlreadyDefined(name, pos1, pos2) {
    return 'El procedimiento "' + name + '" está definido dos veces: ' + 'en ' + pos1 + ' y en ' + pos2 + '.';
  },

  'errmsg:function-already-defined': function errmsgFunctionAlreadyDefined(name, pos1, pos2) {
    return 'La función "' + name + '" está definida dos veces: ' + 'en ' + pos1 + ' y en ' + pos2 + '.';
  },

  'errmsg:type-already-defined': function errmsgTypeAlreadyDefined(name, pos1, pos2) {
    return 'El tipo "' + name + '" está definido dos veces: ' + 'en ' + pos1 + ' y en ' + pos2 + '.';
  },

  'errmsg:constructor-already-defined': function errmsgConstructorAlreadyDefined(name, pos1, pos2) {
    return 'El constructor "' + name + '" está definido dos veces: ' + 'en ' + pos1 + ' y en ' + pos2 + '.';
  },

  'errmsg:repeated-field-name': function errmsgRepeatedFieldName(constructorName, fieldName) {
    return 'El campo "' + fieldName + '" no puede estar repetido ' + 'para el constructor "' + constructorName + '".';
  },

  'errmsg:function-and-field-cannot-have-the-same-name': function errmsgFunctionAndFieldCannotHaveTheSameName(name, posFunction, posField) {
    return 'El nombre "' + name + '" se usa ' + 'para una función en ' + posFunction + ' y ' + 'para un campo en ' + posField + '.';
  },

  'errmsg:source-should-have-a-program-definition':
  /* Note: the code may actually be completely empty, but
   * we avoid this technicality since the message could be
   * confusing. */
  'El código debe tener una definición de "program { ... }".',

  'errmsg:procedure-should-not-have-return': function errmsgProcedureShouldNotHaveReturn(name) {
    return 'El procedimiento "' + name + '" ' + 'no debería tener un comando "return".';
  },

  'errmsg:function-should-have-return': function errmsgFunctionShouldHaveReturn(name) {
    return 'La función "' + name + '" debería tener un comando "return".';
  },

  'errmsg:return-statement-not-allowed-here': 'El comando "return" solo puede aparecer como el último comando ' + 'de una función o como el último comando del programa.',

  'errmsg:local-name-conflict': function errmsgLocalNameConflict(name, oldCat, oldPos, newCat, newPos) {
    return 'Conflicto de nombres: "' + name + '" se usa dos veces: ' + 'como ' + oldCat + ' en ' + oldPos + ', y ' + 'como ' + newCat + ' en ' + newPos + '.';
  },

  'errmsg:repeated-variable-in-tuple-assignment': function errmsgRepeatedVariableInTupleAssignment(name) {
    return 'La variable "' + name + '" está repetida en la asignación ' + 'de tuplas.';
  },

  'errmsg:constructor-used-as-procedure': function errmsgConstructorUsedAsProcedure(name, type) {
    return 'El procedimiento "' + name + '" no está definido. ' + 'El nombre "' + name + '" es el nombre de un constructor ' + 'del tipo "' + type + '".';
  },

  'errmsg:undefined-procedure': function errmsgUndefinedProcedure(name) {
    return 'El procedimiento "' + name + '" no está definido.';
  },

  'errmsg:undefined-function': function errmsgUndefinedFunction(name) {
    return 'La función "' + name + '" no está definida.';
  },

  'errmsg:procedure-arity-mismatch': function errmsgProcedureArityMismatch(name, expected, received) {
    return 'El procedimiento "' + name + '" espera recibir ' + LOCALE_ES['<n>-parameters'](expected) + ' pero se lo invoca con ' + LOCALE_ES['<n>-arguments'](received) + '.';
  },

  'errmsg:function-arity-mismatch': function errmsgFunctionArityMismatch(name, expected, received) {
    return 'La función "' + name + '" espera recibir ' + LOCALE_ES['<n>-parameters'](expected) + ' pero se la invoca con ' + LOCALE_ES['<n>-arguments'](received) + '.';
  },

  'errmsg:structure-pattern-arity-mismatch': function errmsgStructurePatternArityMismatch(name, expected, received) {
    return 'El constructor "' + name + '" tiene ' + LOCALE_ES['<n>-fields'](expected) + ' pero el patrón tiene ' + LOCALE_ES['<n>-parameters'](received) + '.';
  },

  'errmsg:type-used-as-constructor': function errmsgTypeUsedAsConstructor(name, constructorNames) {
    var msg = void 0;
    if (constructorNames.length === 0) {
      msg = '(no tiene constructores).';
    } else if (constructorNames.length === 1) {
      msg = '(tiene un constructor: ' + constructorNames[0] + ').';
    } else {
      msg = '(sus constructores son: ' + constructorNames.join(', ') + ').';
    }
    return 'El constructor "' + name + '" no está definido. ' + 'El nombre "' + name + '" es el nombre de un tipo ' + msg;
  },

  'errmsg:procedure-used-as-constructor': function errmsgProcedureUsedAsConstructor(name) {
    return 'El constructor "' + name + '" no está definido. ' + 'El nombre "' + name + '" es el nombre de un procedimiento.';
  },

  'errmsg:undeclared-constructor': function errmsgUndeclaredConstructor(name) {
    return 'El constructor "' + name + '" no está definido.';
  },

  'errmsg:wildcard-pattern-should-be-last': 'El comodín "_" debe estar en la última rama.',

  'errmsg:variable-pattern-should-be-last': function errmsgVariablePatternShouldBeLast(name) {
    return 'El patrón variable "' + name + '" tiene debe estar en la última rama.';
  },

  'errmsg:numeric-pattern-repeats-number': function errmsgNumericPatternRepeatsNumber(number) {
    return 'Hay dos ramas distintas para el número "' + number + '".';
  },

  'errmsg:structure-pattern-repeats-constructor': function errmsgStructurePatternRepeatsConstructor(name) {
    return 'Hay dos ramas distintas para el constructor "' + name + '".';
  },

  'errmsg:structure-pattern-repeats-tuple-arity': function errmsgStructurePatternRepeatsTupleArity(arity) {
    return 'Hay dos ramas distintas para las tuplas de ' + arity.toString() + ' componentes.';
  },

  'errmsg:structure-pattern-repeats-timeout': 'Hay dos ramas distintas para el TIMEOUT.',

  'errmsg:pattern-does-not-match-type': function errmsgPatternDoesNotMatchType(expectedType, patternType) {
    return 'Los patrones tienen que ser todos del mismo tipo. ' + 'El patrón debería ser de tipo ' + expectedType + 'pero es de tipo ' + patternType + '.';
  },

  'errmsg:patterns-in-interactive-program-must-be-events': 'Los patrones de un "interactive program" deben ser eventos.',

  'errmsg:patterns-in-interactive-program-cannot-be-variables': 'El patrón no puede ser una variable.',

  'errmsg:patterns-in-switch-must-not-be-events': 'El patrón no puede ser un evento.',

  'errmsg:structure-construction-repeated-field': function errmsgStructureConstructionRepeatedField(constructorName, fieldName) {
    return 'El campo "' + fieldName + '" está repetido en ' + 'la instanciación del constructor "' + constructorName + '".';
  },

  'errmsg:structure-construction-invalid-field': function errmsgStructureConstructionInvalidField(constructorName, fieldName) {
    return 'El campo "' + fieldName + '" no es un campo válido ' + 'para el constructor "' + constructorName + '".';
  },

  'errmsg:structure-construction-missing-field': function errmsgStructureConstructionMissingField(constructorName, fieldName) {
    return 'Falta darle valor al campo "' + fieldName + '" ' + 'del constructor "' + constructorName + '".';
  },

  'errmsg:structure-construction-cannot-be-an-event': function errmsgStructureConstructionCannotBeAnEvent(constructorName) {
    return 'El constructor "' + constructorName + '" corresponde a un ' + 'evento, y solamente se puede manejar implícitamente ' + 'en un programa interactivo (el usuario no puede construir ' + 'instancias).';
  },

  'errmsg:forbidden-extension-destructuring-foreach': 'El índice de la repetición indexada debe ser un identificador.',

  'errmsg:forbidden-extension-allow-recursion': function errmsgForbiddenExtensionAllowRecursion(cycle) {
    var msg = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = cycle[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var call = _step2.value;

        msg.push('  ' + call.caller + ' llama a ' + call.callee + ' (' + call.location.startPos.filename.toString() + ':' + call.location.startPos.line.toString() + ':' + call.location.startPos.column.toString() + ')');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return 'La recursión está deshabilitada. ' + 'Hay un ciclo en las invocaciones:\n' + msg.join('\n');
  },

  'errmsg:patterns-in-foreach-must-not-be-events': 'El patrón de un foreach no puede ser un evento.',

  /* Runtime errors (virtual machine) */
  'errmsg:ellipsis': 'El programa todavía no está completo.',

  'errmsg:undefined-variable': function errmsgUndefinedVariable(variableName) {
    return 'La variable "' + variableName + '" no está definida.';
  },

  'errmsg:too-few-arguments': function errmsgTooFewArguments(routineName) {
    return 'Faltan argumentos para "' + routineName + '".';
  },

  'errmsg:expected-structure-but-got': function errmsgExpectedStructureButGot(constructorName, valueTag) {
    return 'Se esperaba una estructura construida ' + 'con el constructor "' + constructorName + '", ' + 'pero se recibió ' + valueTag + '.';
  },

  'errmsg:expected-constructor-but-got': function errmsgExpectedConstructorButGot(constructorNameExpected, constructorNameReceived) {
    return 'Se esperaba una estructura construida ' + 'con el constructor "' + constructorNameExpected + '", ' + 'pero el constructor recibido es ' + constructorNameReceived + '".';
  },

  'errmsg:incompatible-types-on-assignment': function errmsgIncompatibleTypesOnAssignment(variableName, oldType, newType) {
    return 'La variable "' + variableName + '" ' + 'contenía ' + typeAsNoun(oldType) + ', ' + 'no se le puede asignar ' + typeAsNoun(newType) + '".';
  },

  'errmsg:incompatible-types-on-list-creation': function errmsgIncompatibleTypesOnListCreation(index, oldType, newType) {
    return 'Todos los elementos de una lista deben ser del mismo tipo. ' + 'Los elementos son ' + typeAsQualifierPlural(oldType) + ', ' + 'pero el elemento en la posición ' + index.toString() + ' ' + 'es ' + typeAsQualifierSingular(newType) + '.';
  },

  'errmsg:incompatible-types-on-structure-update': function errmsgIncompatibleTypesOnStructureUpdate(fieldName, oldType, newType) {
    return 'El campo "' + fieldName + '" es ' + typeAsQualifierSingular(oldType) + '. ' + 'No se lo puede actualizar con ' + typeAsNoun(newType) + '.';
  },

  'errmsg:expected-tuple-value-but-got': function errmsgExpectedTupleValueButGot(receivedType) {
    return 'Se esperaba una tupla pero se recibió ' + typeAsNoun(receivedType) + '.';
  },

  'errmsg:tuple-component-out-of-bounds': function errmsgTupleComponentOutOfBounds(size, index) {
    return 'Índice fuera de rango. ' + 'La tupla es de tamaño ' + size.toString() + ' y ' + 'el índice es ' + index.toString() + '.';
  },

  'errmsg:expected-structure-value-but-got': function errmsgExpectedStructureValueButGot(receivedType) {
    return 'Se esperaba una estructura pero se recibió ' + typeAsNoun(receivedType) + '.';
  },

  'errmsg:structure-field-not-present': function errmsgStructureFieldNotPresent(fieldNames, missingFieldName) {
    return 'La estructura no tiene un campo "' + missingFieldName + '". ' + 'Los campos son: [' + fieldNames.join(', ') + '].';
  },

  'errmsg:primitive-does-not-exist': function errmsgPrimitiveDoesNotExist(primitiveName) {
    return 'La operación primitiva "' + primitiveName + '" ' + 'no existe o no está disponible.';
  },

  'errmsg:primitive-arity-mismatch': function errmsgPrimitiveArityMismatch(name, expected, received) {
    return 'La operación "' + name + '" espera recibir ' + LOCALE_ES['<n>-parameters'](expected) + ' pero se la invoca con ' + LOCALE_ES['<n>-arguments'](received) + '.';
  },

  'errmsg:primitive-argument-type-mismatch': function errmsgPrimitiveArgumentTypeMismatch(name, parameterIndex, numArgs, expectedType, receivedType) {
    var msg = 'El ';
    if (numArgs > 1) {
      msg += ordinalNumber(parameterIndex) + ' ';
    }
    msg += 'parámetro ';
    msg += 'de "' + name + '" ';
    msg += 'debería ser ' + typeAsQualifierSingular(expectedType) + ' ';
    msg += 'pero es ' + typeAsQualifierSingular(receivedType) + '.';
    return msg;
  },

  'errmsg:expected-value-of-type-but-got': function errmsgExpectedValueOfTypeButGot(expectedType, receivedType) {
    return 'Se esperaba ' + typeAsNoun(expectedType) + ' ' + 'pero se recibió ' + typeAsNoun(receivedType) + '.';
  },

  'errmsg:expected-value-of-some-type-but-got': function errmsgExpectedValueOfSomeTypeButGot(expectedTypes, receivedType) {
    return 'Se esperaba un valor de alguno de los siguientes tipos: ' + listOfTypes(expectedTypes) + '. ' + 'Pero se recibió ' + typeAsNoun(receivedType) + '.';
  },

  'errmsg:expected-values-to-have-compatible-types': function errmsgExpectedValuesToHaveCompatibleTypes(type1, type2) {
    return 'Los tipos de las expresiones no coinciden: ' + 'la primera es ' + typeAsQualifierSingular(type1) + ' ' + 'y la segunda es ' + typeAsQualifierSingular(type2) + '.';
  },

  'errmsg:switch-does-not-match': 'El valor analizado no coincide con ninguna de las ramas del switch.',

  'errmsg:foreach-pattern-does-not-match': 'El elemento no coincide con el patrón esperado por el foreach.',

  'errmsg:cannot-divide-by-zero': 'No se puede dividir por cero.',

  'errmsg:negative-exponent': 'El exponente de la potencia no puede ser negativo.',

  'errmsg:list-cannot-be-empty': 'La lista no puede ser vacía.',

  'errmsg:timeout': function errmsgTimeout(millisecs) {
    return 'La ejecución del programa demoró más de ' + millisecs.toString() + 'ms.';
  },

  /* Typecheck */
  'errmsg:typecheck-failed': function errmsgTypecheckFailed(errorMessage, type1, type2) {
    return formatTypes(errorMessage, type1, type2);
  },

  /* Board operations */
  'errmsg:cannot-move-to': function errmsgCannotMoveTo(dirName) {
    return 'No se puede mover hacia la dirección ' + dirName + ': cae afuera del tablero.';
  },

  'errmsg:cannot-remove-stone': function errmsgCannotRemoveStone(dirName) {
    return 'No se puede sacar una bolita de color ' + dirName + ': no hay bolitas de ese color.';
  },

  /* Runtime */

  'TYPE:Integer': 'Number',
  'TYPE:String': 'String',
  'TYPE:Tuple': '',
  'TYPE:List': 'List',

  'TYPE:Event': 'Event',
  'CONS:INIT': 'INIT',
  'CONS:TIMEOUT': 'TIMEOUT',

  'TYPE:Bool': 'Bool',
  'CONS:False': 'False',
  'CONS:True': 'True',

  'TYPE:Color': 'Color',
  'CONS:Color0': 'Azul',
  'CONS:Color1': 'Negro',
  'CONS:Color2': 'Rojo',
  'CONS:Color3': 'Verde',

  'TYPE:Dir': 'Dir',
  'CONS:Dir0': 'Norte',
  'CONS:Dir1': 'Este',
  'CONS:Dir2': 'Sur',
  'CONS:Dir3': 'Oeste',

  'PRIM:TypeCheck': 'TypeCheck',
  'PRIM:BOOM': 'BOOM',
  'PRIM:boom': 'boom',

  'PRIM:PutStone': 'Poner',
  'PRIM:RemoveStone': 'Sacar',
  'PRIM:Move': 'Mover',
  'PRIM:GoToEdge': 'IrAlBorde',
  'PRIM:EmptyBoardContents': 'VaciarTablero',
  'PRIM:numStones': 'nroBolitas',
  'PRIM:anyStones': 'hayBolitas',
  'PRIM:canMove': 'puedeMover',
  'PRIM:next': 'siguiente',
  'PRIM:prev': 'previo',
  'PRIM:opposite': 'opuesto',
  'PRIM:minBool': 'minBool',
  'PRIM:maxBool': 'maxBool',
  'PRIM:minColor': 'minColor',
  'PRIM:maxColor': 'maxColor',
  'PRIM:minDir': 'minDir',
  'PRIM:maxDir': 'maxDir',

  'PRIM:isEmpty': 'esVacía',
  'PRIM:head': 'primero',
  'PRIM:tail': 'sinElPrimero',
  'PRIM:oldTail': 'resto',
  'PRIM:init': 'comienzo',
  'PRIM:last': 'último',

  /* Helpers */
  '<alternative>': function alternative(strings) {
    return 'alguna de las siguientes alternativas:\n' + strings.map(function (s) {
      return '  ' + s;
    }).join('\n');
  },
  '<position>': function position(filename, line, column) {
    return filename + ':' + line.toString() + ':' + column.toString();
  },
  '<n>-parameters': function nParameters(n) {
    return pluralize(n, 'parámetro', 'parámetros');
  },
  '<n>-arguments': function nArguments(n) {
    return pluralize(n, 'argumento', 'argumentos');
  },
  '<n>-fields': function nFields(n) {
    return pluralize(n, 'campo', 'campos');
  },
  '<pattern-type>': function patternType(_patternType) {
    if (_patternType === 'Event') {
      return 'evento del programa interactivo';
    } else if (_patternType.substring(0, 7) === '_TUPLE_') {
      return 'tupla de ' + _patternType.substring(7) + ' componentes';
    } else {
      return _patternType;
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SymbolTable = exports.LocalIndex = exports.LocalParameter = exports.LocalVariable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _i18n = __webpack_require__(0);

var _exceptions = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Description of a field */
var FieldDescriptor = function () {
  function FieldDescriptor(typeName, constructorName, index) {
    _classCallCheck(this, FieldDescriptor);

    this._typeName = typeName;
    this._constructorName = constructorName;
    this._index = index;
  }

  _createClass(FieldDescriptor, [{
    key: 'typeName',
    get: function get() {
      return this._typeName;
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this._constructorName;
    }
  }, {
    key: 'index',
    get: function get() {
      return this._index;
    }
  }]);

  return FieldDescriptor;
}();

/* Local name categories */


var LocalVariable = exports.LocalVariable = Symbol.for('LocalVariable');
var LocalParameter = exports.LocalParameter = Symbol.for('LocalParameter');
var LocalIndex = exports.LocalIndex = Symbol.for('LocalIndex');

/* Description of a local name */

var LocalNameDescriptor = function () {
  function LocalNameDescriptor(category, position) {
    _classCallCheck(this, LocalNameDescriptor);

    this._category = category;
    this._position = position;
  }

  _createClass(LocalNameDescriptor, [{
    key: 'category',
    get: function get() {
      return this._category;
    }
  }, {
    key: 'position',
    get: function get() {
      return this._position;
    }
  }]);

  return LocalNameDescriptor;
}();

function fail(startPos, endPos, reason, args) {
  throw new _exceptions.GbsSyntaxError(startPos, endPos, reason, args);
}

/* A symbol table keeps track of definitions, associating:
 * - procedure and function names to their code
 * - type definitions, constructors, and fields
 */

var SymbolTable = exports.SymbolTable = function () {
  function SymbolTable() {
    _classCallCheck(this, SymbolTable);

    this._program = null;

    /* true iff the program is interactive */
    this._isInteractiveProgram = false;

    /* Each procedure name is mapped to its definition */
    this._procedures = {};

    /* Each procedure name is mapped to its parameters */
    this._procedureParameters = {};

    /* Each function name is mapped to its definition */
    this._functions = {};

    /* Each function name is mapped to its parameters */
    this._functionParameters = {};

    /* Each type name is mapped to its definition */
    this._types = {};

    /* Each type name is mapped to a list of constructor names */
    this._typeConstructors = {};

    /* Each constructor name is mapped to its declaration */
    this._constructors = {};

    /* Each constructor name is mapped to its type name */
    this._constructorType = {};

    /* Each constructor name is mapped to a list of field names */
    this._constructorFields = {};

    /* Each field name is mapped to a list of field descriptors.
     * Each field descriptor is of the form
     *   new FieldDescriptor(typeName, constructorName, index)
     * where
     * - 'typeName' is the name of a type
     * - 'constructorName' is the name of a constructor of the given type
     * - 'index' is the index of the given field with respect to the
     *   given constructor (starting from 0)
     */
    this._fields = {};

    /* Local names include parameters, indices and variables,
     * which are only meaningful within a routine.
     *
     * Local names may be bound/referenced in the following places:
     * - formal parameters,
     * - indices of a "foreach",
     * - pattern matching (formal parameters of a "switch"),
     * - assignments and tuple assignments,
     * - reading local variables.
     *
     * _localNames maps a name to a descriptor of the form:
     *   new LocalNameDescriptor(category, position)
     */
    this._localNames = {};
  }

  _createClass(SymbolTable, [{
    key: 'isInteractiveProgram',
    value: function isInteractiveProgram() {
      return this._isInteractiveProgram;
    }
  }, {
    key: 'isProcedure',
    value: function isProcedure(name) {
      return name in this._procedures;
    }
  }, {
    key: 'allProcedureNames',
    value: function allProcedureNames() {
      var names = [];
      for (var name in this._procedures) {
        names.push(name);
      }
      return names.sort();
    }
  }, {
    key: 'procedureDefinition',
    value: function procedureDefinition(name) {
      if (this.isProcedure(name)) {
        return this._procedures[name];
      } else {
        throw Error('Undefined procedure.');
      }
    }
  }, {
    key: 'procedureParameters',
    value: function procedureParameters(name) {
      if (this.isProcedure(name)) {
        return this._procedureParameters[name];
      } else {
        throw Error('Undefined procedure.');
      }
    }
  }, {
    key: 'isFunction',
    value: function isFunction(name) {
      return name in this._functions;
    }
  }, {
    key: 'allFunctionNames',
    value: function allFunctionNames() {
      var names = [];
      for (var name in this._functions) {
        names.push(name);
      }
      return names.sort();
    }
  }, {
    key: 'functionDefinition',
    value: function functionDefinition(name) {
      if (this.isFunction(name)) {
        return this._functions[name];
      } else {
        throw Error('Undefined function.');
      }
    }
  }, {
    key: 'functionParameters',
    value: function functionParameters(name) {
      if (this.isFunction(name)) {
        return this._functionParameters[name];
      } else {
        throw Error('Undefined function.');
      }
    }
  }, {
    key: 'isType',
    value: function isType(name) {
      return name in this._types;
    }
  }, {
    key: 'typeDefinition',
    value: function typeDefinition(name) {
      if (this.isType(name)) {
        return this._types[name];
      } else {
        throw Error('Undefined type.');
      }
    }
  }, {
    key: 'typeConstructors',
    value: function typeConstructors(name) {
      if (this.isType(name)) {
        return this._typeConstructors[name];
      } else {
        throw Error('Undefined type.');
      }
    }
  }, {
    key: 'isConstructor',
    value: function isConstructor(name) {
      return name in this._constructors;
    }
  }, {
    key: 'constructorDeclaration',
    value: function constructorDeclaration(name) {
      if (this.isConstructor(name)) {
        return this._constructors[name];
      } else {
        throw Error('Undefined constructor.');
      }
    }
  }, {
    key: 'constructorType',
    value: function constructorType(name) {
      if (this.isConstructor(name)) {
        return this._constructorType[name];
      } else {
        throw Error('Undefined constructor.');
      }
    }
  }, {
    key: 'constructorFields',
    value: function constructorFields(name) {
      if (this.isConstructor(name)) {
        return this._constructorFields[name];
      } else {
        throw Error('Undefined constructor.');
      }
    }
  }, {
    key: 'isField',
    value: function isField(name) {
      return name in this._fields;
    }
  }, {
    key: 'fieldDescriptor',
    value: function fieldDescriptor(name) {
      if (this.isField(name)) {
        return this._fields[name];
      } else {
        throw Error('Undefined field.');
      }
    }
  }, {
    key: 'defProgram',
    value: function defProgram(definition) {
      if (this._program !== null) {
        fail(definition.startPos, definition.endPos, 'program-already-defined', [(0, _i18n.i18nPosition)(this._program.startPos), (0, _i18n.i18nPosition)(definition.startPos)]);
      }
      this._program = definition;
    }
  }, {
    key: 'defInteractiveProgram',
    value: function defInteractiveProgram(definition) {
      this.defProgram(definition);
      this._isInteractiveProgram = true;
    }
  }, {
    key: 'defProcedure',
    value: function defProcedure(definition) {
      var name = definition.name.value;
      if (name in this._procedures) {
        fail(definition.name.startPos, definition.name.endPos, 'procedure-already-defined', [name, (0, _i18n.i18nPosition)(this._procedures[name].startPos), (0, _i18n.i18nPosition)(definition.startPos)]);
      }
      var parameters = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = definition.parameters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parameter = _step.value;

          parameters.push(parameter.value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._procedures[name] = definition;
      this._procedureParameters[name] = parameters;
    }
  }, {
    key: 'defFunction',
    value: function defFunction(definition) {
      var name = definition.name.value;
      if (name in this._functions) {
        fail(definition.name.startPos, definition.name.endPos, 'function-already-defined', [name, (0, _i18n.i18nPosition)(this._functions[name].startPos), (0, _i18n.i18nPosition)(definition.startPos)]);
      } else if (name in this._fields) {
        var fieldPos = this._constructors[this._fields[name][0].constructorName].startPos;
        fail(definition.name.startPos, definition.name.endPos, 'function-and-field-cannot-have-the-same-name', [name, (0, _i18n.i18nPosition)(definition.startPos), (0, _i18n.i18nPosition)(fieldPos)]);
      }
      var parameters = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = definition.parameters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var parameter = _step2.value;

          parameters.push(parameter.value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._functions[name] = definition;
      this._functionParameters[name] = parameters;
    }
  }, {
    key: 'defType',
    value: function defType(definition) {
      var typeName = definition.typeName.value;
      if (typeName in this._types) {
        fail(definition.typeName.startPos, definition.typeName.endPos, 'type-already-defined', [typeName, (0, _i18n.i18nPosition)(this._types[typeName].startPos), (0, _i18n.i18nPosition)(definition.startPos)]);
      }
      this._types[typeName] = definition;
      var constructorNames = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = definition.constructorDeclarations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var constructorDeclaration = _step3.value;

          this._declareConstructor(typeName, constructorDeclaration);
          constructorNames.push(constructorDeclaration.constructorName.value);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this._typeConstructors[typeName] = constructorNames;
    }
  }, {
    key: '_declareConstructor',
    value: function _declareConstructor(typeName, constructorDeclaration) {
      var constructorName = constructorDeclaration.constructorName.value;
      if (constructorName in this._constructors) {
        fail(constructorDeclaration.constructorName.startPos, constructorDeclaration.constructorName.endPos, 'constructor-already-defined', [constructorName, (0, _i18n.i18nPosition)(this._constructors[constructorName].startPos), (0, _i18n.i18nPosition)(constructorDeclaration.startPos)]);
      }
      this._constructors[constructorName] = constructorDeclaration;
      this._constructorType[constructorName] = typeName;

      var constructorFields = {};
      var fieldNames = [];
      var index = 0;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = constructorDeclaration.fieldNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var fieldName = _step4.value;

          if (fieldName.value in constructorFields) {
            fail(fieldName.startPos, fieldName.endPos, 'repeated-field-name', [constructorName, fieldName.value]);
          }
          constructorFields[fieldName.value] = true;
          fieldNames.push(fieldName.value);
          this._declareField(fieldName.startPos, fieldName.endPos, typeName, constructorName, fieldName.value, index);
          index++;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this._constructorFields[constructorName] = fieldNames;
    }
  }, {
    key: '_declareField',
    value: function _declareField(startPos, endPos, typeName, constructorName, fieldName, index) {
      if (fieldName in this._functions) {
        fail(startPos, endPos, 'function-and-field-cannot-have-the-same-name', [fieldName, (0, _i18n.i18nPosition)(this._functions[fieldName].startPos), (0, _i18n.i18nPosition)(startPos)]);
      }
      if (!(fieldName in this._fields)) {
        this._fields[fieldName] = [];
      }
      this._fields[fieldName].push(new FieldDescriptor(typeName, constructorName, index));
    }

    /* Adds a new local name, failing if it already exists. */

  }, {
    key: 'addNewLocalName',
    value: function addNewLocalName(localName, category) {
      if (localName.value in this._localNames) {
        fail(localName.startPos, localName.endPos, 'local-name-conflict', [localName.value, (0, _i18n.i18n)(Symbol.keyFor(this._localNames[localName.value].category)), (0, _i18n.i18nPosition)(this._localNames[localName.value].position), (0, _i18n.i18n)(Symbol.keyFor(category)), (0, _i18n.i18nPosition)(localName.startPos)]);
      }
      this.setLocalName(localName, category);
    }

    /* Sets a local name.
     * It fails if it already exists with a different category. */

  }, {
    key: 'setLocalName',
    value: function setLocalName(localName, category) {
      if (localName.value in this._localNames && this._localNames[localName.value].category !== category) {
        fail(localName.startPos, localName.endPos, 'local-name-conflict', [localName.value, (0, _i18n.i18n)(Symbol.keyFor(this._localNames[localName.value].category)), (0, _i18n.i18nPosition)(this._localNames[localName.value].position), (0, _i18n.i18n)(Symbol.keyFor(category)), (0, _i18n.i18nPosition)(localName.startPos)]);
      }
      this._localNames[localName.value] = new LocalNameDescriptor(category, localName.startPos);
    }

    /* Removes a local name. */

  }, {
    key: 'removeLocalName',
    value: function removeLocalName(localName) {
      delete this._localNames[localName.value];
    }

    /* Removes all local names. */

  }, {
    key: 'exitScope',
    value: function exitScope() {
      this._localNames = {};
    }

    /* Get the attribute dictionary for a global name.
     *
     * A global name is the names of a global definition:
     *   - the string 'program'
     *   - any procedure name (e.g. 'P')
     *   - any function name (e.g. 'f')
     *   - any type name (e.g. 'A')
     *
     * The result is a dictionary of attributes.
     *
     */

  }, {
    key: 'getAttributes',
    value: function getAttributes(globalName) {
      if (globalName === 'program' && this._program !== null) {
        return this._program.attributes;
      } else if (globalName in this._procedures) {
        return this._procedures[globalName].attributes;
      } else if (globalName in this._functions) {
        return this._functions[globalName].attributes;
      } else if (globalName in this._types) {
        return this._types[globalName].attributes;
      } else {
        return {};
      }
    }
  }, {
    key: 'program',
    get: function get() {
      return this._program;
    }
  }]);

  return SymbolTable;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ITypeCheck = exports.IRestoreState = exports.ISaveState = exports.IPrimitiveCall = exports.IPop = exports.IDup = exports.IAdd = exports.IReadStructureFieldPop = exports.IReadStructureField = exports.IReadTupleComponent = exports.IUpdateStructure = exports.IMakeStructure = exports.IMakeList = exports.IMakeTuple = exports.IReturn = exports.ICall = exports.IJumpIfTuple = exports.IJumpIfStructure = exports.IJumpIfFalse = exports.IJump = exports.ILabel = exports.IUnsetVariable = exports.ISetVariable = exports.IPushVariable = exports.IPushString = exports.IPushInteger = exports.Instruction = exports.Code = exports.I_TypeCheck = exports.I_RestoreState = exports.I_SaveState = exports.I_PrimitiveCall = exports.I_Pop = exports.I_Dup = exports.I_Add = exports.I_ReadStructureFieldPop = exports.I_ReadStructureField = exports.I_ReadTupleComponent = exports.I_UpdateStructure = exports.I_MakeStructure = exports.I_MakeList = exports.I_MakeTuple = exports.I_Return = exports.I_Call = exports.I_JumpIfTuple = exports.I_JumpIfStructure = exports.I_JumpIfFalse = exports.I_Jump = exports.I_Label = exports.I_UnsetVariable = exports.I_SetVariable = exports.I_PushVariable = exports.I_PushString = exports.I_PushInteger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reader = __webpack_require__(6);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Opcodes are constant symbols */
var I_PushInteger = exports.I_PushInteger = Symbol.for('I_PushInteger');
var I_PushString = exports.I_PushString = Symbol.for('I_PushString');
var I_PushVariable = exports.I_PushVariable = Symbol.for('I_PushVariable');
var I_SetVariable = exports.I_SetVariable = Symbol.for('I_SetVariable');
var I_UnsetVariable = exports.I_UnsetVariable = Symbol.for('I_UnsetVariable');
var I_Label = exports.I_Label = Symbol.for('I_Label');
var I_Jump = exports.I_Jump = Symbol.for('I_Jump');
var I_JumpIfFalse = exports.I_JumpIfFalse = Symbol.for('I_JumpIfFalse');
var I_JumpIfStructure = exports.I_JumpIfStructure = Symbol.for('I_JumpIfStructure');
var I_JumpIfTuple = exports.I_JumpIfTuple = Symbol.for('I_JumpIfTuple');
var I_Call = exports.I_Call = Symbol.for('I_Call');
var I_Return = exports.I_Return = Symbol.for('I_Return');
var I_MakeTuple = exports.I_MakeTuple = Symbol.for('I_MakeTuple');
var I_MakeList = exports.I_MakeList = Symbol.for('I_MakeList');
var I_MakeStructure = exports.I_MakeStructure = Symbol.for('I_MakeStructure');
var I_UpdateStructure = exports.I_UpdateStructure = Symbol.for('I_UpdateStructure');
var I_ReadTupleComponent = exports.I_ReadTupleComponent = Symbol.for('I_ReadTupleComponent');
var I_ReadStructureField = exports.I_ReadStructureField = Symbol.for('I_ReadStructureField');
var I_ReadStructureFieldPop = exports.I_ReadStructureFieldPop = Symbol.for('I_ReadStructureFieldPop');
var I_Add = exports.I_Add = Symbol.for('I_Add');
var I_Dup = exports.I_Dup = Symbol.for('I_Dup');
var I_Pop = exports.I_Pop = Symbol.for('I_Pop');
var I_PrimitiveCall = exports.I_PrimitiveCall = Symbol.for('I_PrimitiveCall');
var I_SaveState = exports.I_SaveState = Symbol.for('I_SaveState');
var I_RestoreState = exports.I_RestoreState = Symbol.for('I_RestoreState');
var I_TypeCheck = exports.I_TypeCheck = Symbol.for('I_TypeCheck');

var Code = exports.Code = function () {
  function Code(instructions) {
    _classCallCheck(this, Code);

    this._instructions = instructions;
  }

  _createClass(Code, [{
    key: 'toString',
    value: function toString() {
      var res = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._instructions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instruction = _step.value;

          res.push(instruction.toString());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return res.join('\n');
    }
  }, {
    key: 'produce',
    value: function produce(instruction) {
      this._instructions.push(instruction);
    }

    /* Return the instruction at the given location */

  }, {
    key: 'at',
    value: function at(ip) {
      if (0 <= ip && ip < this._instructions.length) {
        return this._instructions[ip];
      } else {
        throw Error('Code: instruction pointer out of range.');
      }
    }

    /* Return a dictionary mapping label names to their corresponding
     * instruction pointers. */

  }, {
    key: 'labelTargets',
    value: function labelTargets() {
      var labelTargets = {};
      for (var i = 0; i < this._instructions.length; i++) {
        if (this._instructions[i].opcode === I_Label) {
          var label = this._instructions[i].label;
          if (label in labelTargets) {
            throw Error('Code: label "' + label + '" is repeated.');
          }
          labelTargets[label] = i;
        }
      }
      return labelTargets;
    }
  }]);

  return Code;
}();

function argToString(arg) {
  if (arg instanceof Array) {
    var res = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = arg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var elem = _step2.value;

        res.push(argToString(elem));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return '[' + res.join(', ') + ']';
  } else {
    return arg.toString();
  }
}

var Instruction = exports.Instruction = function () {
  function Instruction(opcode, args) {
    _classCallCheck(this, Instruction);

    this._opcode = opcode;
    this._args = args;
    this._startPos = _reader.UnknownPosition;
    this._endPos = _reader.UnknownPosition;
  }

  _createClass(Instruction, [{
    key: 'toString',
    value: function toString() {
      var opcode = Symbol.keyFor(this._opcode).substring(2);
      var sargs = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var arg = _step3.value;

          sargs.push(argToString(arg));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return '  ' + opcode + ' ' + sargs.join(', ');
    }
  }, {
    key: 'opcode',
    get: function get() {
      return this._opcode;
    }
  }, {
    key: 'args',
    get: function get() {
      return this._args;
    }
  }, {
    key: 'startPos',
    set: function set(position) {
      this._startPos = position;
    },
    get: function get() {
      return this._startPos;
    }
  }, {
    key: 'endPos',
    set: function set(position) {
      this._endPos = position;
    },
    get: function get() {
      return this._endPos;
    }
  }]);

  return Instruction;
}();

/* Push a constant on the stack. */

var IPushInteger = exports.IPushInteger = function (_Instruction) {
  _inherits(IPushInteger, _Instruction);

  function IPushInteger(number) {
    _classCallCheck(this, IPushInteger);

    return _possibleConstructorReturn(this, (IPushInteger.__proto__ || Object.getPrototypeOf(IPushInteger)).call(this, I_PushInteger, [number]));
  }

  _createClass(IPushInteger, [{
    key: 'number',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IPushInteger;
}(Instruction);

var IPushString = exports.IPushString = function (_Instruction2) {
  _inherits(IPushString, _Instruction2);

  function IPushString(string) {
    _classCallCheck(this, IPushString);

    return _possibleConstructorReturn(this, (IPushString.__proto__ || Object.getPrototypeOf(IPushString)).call(this, I_PushString, [string]));
  }

  _createClass(IPushString, [{
    key: 'string',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IPushString;
}(Instruction);

/* Push a local index/variable/parameter on the stack. */


var IPushVariable = exports.IPushVariable = function (_Instruction3) {
  _inherits(IPushVariable, _Instruction3);

  function IPushVariable(variableName) {
    _classCallCheck(this, IPushVariable);

    return _possibleConstructorReturn(this, (IPushVariable.__proto__ || Object.getPrototypeOf(IPushVariable)).call(this, I_PushVariable, [variableName]));
  }

  _createClass(IPushVariable, [{
    key: 'variableName',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IPushVariable;
}(Instruction);

/* Set a local index/variable/parameter to the value on the top of the stack. */


var ISetVariable = exports.ISetVariable = function (_Instruction4) {
  _inherits(ISetVariable, _Instruction4);

  function ISetVariable(variableName) {
    _classCallCheck(this, ISetVariable);

    return _possibleConstructorReturn(this, (ISetVariable.__proto__ || Object.getPrototypeOf(ISetVariable)).call(this, I_SetVariable, [variableName]));
  }

  _createClass(ISetVariable, [{
    key: 'variableName',
    get: function get() {
      return this._args[0];
    }
  }]);

  return ISetVariable;
}(Instruction);

/* Unset a local index/variable/parameter.
 * This should be used to avoid the variable being used after the end
 * of its scope.
 *
 * E.g. "i" should have no value after the end of the foreach:
 *
 *   foreach i in [1,2,3] {
 *   }
 *   x := i
 */


var IUnsetVariable = exports.IUnsetVariable = function (_Instruction5) {
  _inherits(IUnsetVariable, _Instruction5);

  function IUnsetVariable(variableName) {
    _classCallCheck(this, IUnsetVariable);

    return _possibleConstructorReturn(this, (IUnsetVariable.__proto__ || Object.getPrototypeOf(IUnsetVariable)).call(this, I_UnsetVariable, [variableName]));
  }

  _createClass(IUnsetVariable, [{
    key: 'variableName',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IUnsetVariable;
}(Instruction);

/* Pseudo-instruction to mark the target of a jump. */


var ILabel = exports.ILabel = function (_Instruction6) {
  _inherits(ILabel, _Instruction6);

  function ILabel(label) {
    _classCallCheck(this, ILabel);

    return _possibleConstructorReturn(this, (ILabel.__proto__ || Object.getPrototypeOf(ILabel)).call(this, I_Label, [label]));
  }

  _createClass(ILabel, [{
    key: 'toString',
    value: function toString() {
      return this.label + ':';
    }
  }, {
    key: 'label',
    get: function get() {
      return this._args[0];
    }
  }]);

  return ILabel;
}(Instruction);

/* Unconditional jump. */


var IJump = exports.IJump = function (_Instruction7) {
  _inherits(IJump, _Instruction7);

  function IJump(targetLabel) {
    _classCallCheck(this, IJump);

    return _possibleConstructorReturn(this, (IJump.__proto__ || Object.getPrototypeOf(IJump)).call(this, I_Jump, [targetLabel]));
  }

  _createClass(IJump, [{
    key: 'targetLabel',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IJump;
}(Instruction);

/* Jump if the top of the stack is False.
 * Pops the top of the stack. */


var IJumpIfFalse = exports.IJumpIfFalse = function (_Instruction8) {
  _inherits(IJumpIfFalse, _Instruction8);

  function IJumpIfFalse(targetLabel) {
    _classCallCheck(this, IJumpIfFalse);

    return _possibleConstructorReturn(this, (IJumpIfFalse.__proto__ || Object.getPrototypeOf(IJumpIfFalse)).call(this, I_JumpIfFalse, [targetLabel]));
  }

  _createClass(IJumpIfFalse, [{
    key: 'targetLabel',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IJumpIfFalse;
}(Instruction);

/* Jump if the top of the stack is a structure built using the given
 * constructor. Does NOT pop the top of the stack. */


var IJumpIfStructure = exports.IJumpIfStructure = function (_Instruction9) {
  _inherits(IJumpIfStructure, _Instruction9);

  function IJumpIfStructure(constructorName, targetLabel) {
    _classCallCheck(this, IJumpIfStructure);

    return _possibleConstructorReturn(this, (IJumpIfStructure.__proto__ || Object.getPrototypeOf(IJumpIfStructure)).call(this, I_JumpIfStructure, [constructorName, targetLabel]));
  }

  _createClass(IJumpIfStructure, [{
    key: 'constructorName',
    get: function get() {
      return this._args[0];
    }
  }, {
    key: 'targetLabel',
    get: function get() {
      return this._args[1];
    }
  }]);

  return IJumpIfStructure;
}(Instruction);

/* Jump if the top of the stack is an n-tuple of the given size.
 * Does NOT pop the top of the stack. */


var IJumpIfTuple = exports.IJumpIfTuple = function (_Instruction10) {
  _inherits(IJumpIfTuple, _Instruction10);

  function IJumpIfTuple(size, targetLabel) {
    _classCallCheck(this, IJumpIfTuple);

    return _possibleConstructorReturn(this, (IJumpIfTuple.__proto__ || Object.getPrototypeOf(IJumpIfTuple)).call(this, I_JumpIfTuple, [size, targetLabel]));
  }

  _createClass(IJumpIfTuple, [{
    key: 'size',
    get: function get() {
      return this._args[0];
    }
  }, {
    key: 'targetLabel',
    get: function get() {
      return this._args[1];
    }
  }]);

  return IJumpIfTuple;
}(Instruction);

/* Call a subroutine (procedure or function).
 * The arguments are expected to be located in the stack
 * with the last one at the top.
 *
 * The arguments are popped from the current frame and pushed
 * onto the new frame.
 */


var ICall = exports.ICall = function (_Instruction11) {
  _inherits(ICall, _Instruction11);

  function ICall(targetLabel, nargs) {
    _classCallCheck(this, ICall);

    return _possibleConstructorReturn(this, (ICall.__proto__ || Object.getPrototypeOf(ICall)).call(this, I_Call, [targetLabel, nargs]));
  }

  _createClass(ICall, [{
    key: 'targetLabel',
    get: function get() {
      return this._args[0];
    }
  }, {
    key: 'nargs',
    get: function get() {
      return this._args[1];
    }
  }]);

  return ICall;
}(Instruction);

/* Return from a routine to the caller.
 * If returning a value (from a function or program),
 * it must be on the top of the stack. */


var IReturn = exports.IReturn = function (_Instruction12) {
  _inherits(IReturn, _Instruction12);

  function IReturn() {
    _classCallCheck(this, IReturn);

    return _possibleConstructorReturn(this, (IReturn.__proto__ || Object.getPrototypeOf(IReturn)).call(this, I_Return, []));
  }

  return IReturn;
}(Instruction);

/* Make a tuple of the given size.
 * The components are expected to be located in the stack
 * with the last one at the top. */


var IMakeTuple = exports.IMakeTuple = function (_Instruction13) {
  _inherits(IMakeTuple, _Instruction13);

  function IMakeTuple(size) {
    _classCallCheck(this, IMakeTuple);

    return _possibleConstructorReturn(this, (IMakeTuple.__proto__ || Object.getPrototypeOf(IMakeTuple)).call(this, I_MakeTuple, [size]));
  }

  _createClass(IMakeTuple, [{
    key: 'size',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IMakeTuple;
}(Instruction);

/* Make a list of the given size.
 * The elements are expected to be located in the stack
 * with the last one at the top. */


var IMakeList = exports.IMakeList = function (_Instruction14) {
  _inherits(IMakeList, _Instruction14);

  function IMakeList(size) {
    _classCallCheck(this, IMakeList);

    return _possibleConstructorReturn(this, (IMakeList.__proto__ || Object.getPrototypeOf(IMakeList)).call(this, I_MakeList, [size]));
  }

  _createClass(IMakeList, [{
    key: 'size',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IMakeList;
}(Instruction);

/* Make a structure using the given constructor and the given fields.
 * The values of the fields are expected to be located in the stack
 * with the last one at the top. */


var IMakeStructure = exports.IMakeStructure = function (_Instruction15) {
  _inherits(IMakeStructure, _Instruction15);

  function IMakeStructure(typeName, constructorName, fieldNames) {
    _classCallCheck(this, IMakeStructure);

    return _possibleConstructorReturn(this, (IMakeStructure.__proto__ || Object.getPrototypeOf(IMakeStructure)).call(this, I_MakeStructure, [typeName, constructorName, fieldNames]));
  }

  _createClass(IMakeStructure, [{
    key: 'typeName',
    get: function get() {
      return this._args[0];
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this._args[1];
    }
  }, {
    key: 'fieldNames',
    get: function get() {
      return this._args[2];
    }
  }]);

  return IMakeStructure;
}(Instruction);

/* Update a structure built using the given constructor with the given
 * fields.
 * The stack should have a structure built using the given constructor,
 * followed by the values of the fields that are expected.
 * The last field should be at the top. */


var IUpdateStructure = exports.IUpdateStructure = function (_Instruction16) {
  _inherits(IUpdateStructure, _Instruction16);

  function IUpdateStructure(typeName, constructorName, fieldNames) {
    _classCallCheck(this, IUpdateStructure);

    return _possibleConstructorReturn(this, (IUpdateStructure.__proto__ || Object.getPrototypeOf(IUpdateStructure)).call(this, I_UpdateStructure, [typeName, constructorName, fieldNames]));
  }

  _createClass(IUpdateStructure, [{
    key: 'typeName',
    get: function get() {
      return this._args[0];
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this._args[1];
    }
  }, {
    key: 'fieldNames',
    get: function get() {
      return this._args[2];
    }
  }]);

  return IUpdateStructure;
}(Instruction);

/* Read the n-th component from the tuple at the top of the stack.
 * Does not pop the tuple. */


var IReadTupleComponent = exports.IReadTupleComponent = function (_Instruction17) {
  _inherits(IReadTupleComponent, _Instruction17);

  function IReadTupleComponent(index) {
    _classCallCheck(this, IReadTupleComponent);

    return _possibleConstructorReturn(this, (IReadTupleComponent.__proto__ || Object.getPrototypeOf(IReadTupleComponent)).call(this, I_ReadTupleComponent, [index]));
  }

  _createClass(IReadTupleComponent, [{
    key: 'index',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IReadTupleComponent;
}(Instruction);

/* Read the given field from the structure at the top of the stack.
 * Does not pop the structure. */


var IReadStructureField = exports.IReadStructureField = function (_Instruction18) {
  _inherits(IReadStructureField, _Instruction18);

  function IReadStructureField(fieldName) {
    _classCallCheck(this, IReadStructureField);

    return _possibleConstructorReturn(this, (IReadStructureField.__proto__ || Object.getPrototypeOf(IReadStructureField)).call(this, I_ReadStructureField, [fieldName]));
  }

  _createClass(IReadStructureField, [{
    key: 'fieldName',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IReadStructureField;
}(Instruction);

/* Read the given field from the structure at the top of the stack.
 * Pop the structure. */


var IReadStructureFieldPop = exports.IReadStructureFieldPop = function (_Instruction19) {
  _inherits(IReadStructureFieldPop, _Instruction19);

  function IReadStructureFieldPop(fieldName) {
    _classCallCheck(this, IReadStructureFieldPop);

    return _possibleConstructorReturn(this, (IReadStructureFieldPop.__proto__ || Object.getPrototypeOf(IReadStructureFieldPop)).call(this, I_ReadStructureFieldPop, [fieldName]));
  }

  _createClass(IReadStructureFieldPop, [{
    key: 'fieldName',
    get: function get() {
      return this._args[0];
    }
  }]);

  return IReadStructureFieldPop;
}(Instruction);

/* Add the topmost elements of the stack (used mostly for testing/debugging) */


var IAdd = exports.IAdd = function (_Instruction20) {
  _inherits(IAdd, _Instruction20);

  function IAdd() {
    _classCallCheck(this, IAdd);

    return _possibleConstructorReturn(this, (IAdd.__proto__ || Object.getPrototypeOf(IAdd)).call(this, I_Add, []));
  }

  return IAdd;
}(Instruction);

/* Duplicate the top of the stack (there should be at least one element) */


var IDup = exports.IDup = function (_Instruction21) {
  _inherits(IDup, _Instruction21);

  function IDup() {
    _classCallCheck(this, IDup);

    return _possibleConstructorReturn(this, (IDup.__proto__ || Object.getPrototypeOf(IDup)).call(this, I_Dup, []));
  }

  return IDup;
}(Instruction);

/* Pop the top of the stack (there should be at least one element) */


var IPop = exports.IPop = function (_Instruction22) {
  _inherits(IPop, _Instruction22);

  function IPop() {
    _classCallCheck(this, IPop);

    return _possibleConstructorReturn(this, (IPop.__proto__ || Object.getPrototypeOf(IPop)).call(this, I_Pop, []));
  }

  return IPop;
}(Instruction);

/* Call a primitive function.
 *
 * The arguments are expected to be located in the stack
 * with the last one at the top.
 *
 * Note: the compiler relies on various primitive functions.
 * For example, the operation to make a range is a primitive
 * function:
 *
 *   function _makeRange(start, end)
 *
 * So is the function that checks whether the top of the stack is a list,
 * etc. (required to compile a "foreach"), and so on.
 */


var IPrimitiveCall = exports.IPrimitiveCall = function (_Instruction23) {
  _inherits(IPrimitiveCall, _Instruction23);

  function IPrimitiveCall(primitiveName, nargs) {
    _classCallCheck(this, IPrimitiveCall);

    return _possibleConstructorReturn(this, (IPrimitiveCall.__proto__ || Object.getPrototypeOf(IPrimitiveCall)).call(this, I_PrimitiveCall, [primitiveName, nargs]));
  }

  _createClass(IPrimitiveCall, [{
    key: 'primitiveName',
    get: function get() {
      return this._args[0];
    }
  }, {
    key: 'nargs',
    get: function get() {
      return this._args[1];
    }
  }]);

  return IPrimitiveCall;
}(Instruction);

/* Save the global state (when entering a function) */


var ISaveState = exports.ISaveState = function (_Instruction24) {
  _inherits(ISaveState, _Instruction24);

  function ISaveState() {
    _classCallCheck(this, ISaveState);

    return _possibleConstructorReturn(this, (ISaveState.__proto__ || Object.getPrototypeOf(ISaveState)).call(this, I_SaveState, []));
  }

  return ISaveState;
}(Instruction);

/* Restore the global state (when leaving a function) */


var IRestoreState = exports.IRestoreState = function (_Instruction25) {
  _inherits(IRestoreState, _Instruction25);

  function IRestoreState() {
    _classCallCheck(this, IRestoreState);

    return _possibleConstructorReturn(this, (IRestoreState.__proto__ || Object.getPrototypeOf(IRestoreState)).call(this, I_RestoreState, []));
  }

  return IRestoreState;
}(Instruction);

/* Check that the top of the stack has the given type.
 * Does not pop the top of the stack. */


var ITypeCheck = exports.ITypeCheck = function (_Instruction26) {
  _inherits(ITypeCheck, _Instruction26);

  function ITypeCheck(type) {
    _classCallCheck(this, ITypeCheck);

    return _possibleConstructorReturn(this, (ITypeCheck.__proto__ || Object.getPrototypeOf(ITypeCheck)).call(this, I_TypeCheck, [type]));
  }

  _createClass(ITypeCheck, [{
    key: 'type',
    get: function get() {
      return this._args[0];
    }
  }]);

  return ITypeCheck;
}(Instruction);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GobstonesInterpreterAPI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = __webpack_require__(4);

var _runner = __webpack_require__(14);

var _i18n = __webpack_require__(0);

var _board_formats = __webpack_require__(21);

var _value = __webpack_require__(5);

var _ast = __webpack_require__(2);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_INFINITE_LOOP_TIMEOUT = 3000; /* millisecs */
var DEFAULT_LANGUAGE = 'es';

/* load a board in the API format into a fresh RuntimeState */
function apiboardToState(apiboard) {
  var state = new _runtime.RuntimeState();
  state.load((0, _board_formats.apiboardToJboard)(apiboard));
  return state;
}

/* Dump a RuntimeState to a board in the API format */
function apiboardFromState(state) {
  return (0, _board_formats.apiboardFromJboard)(state.dump());
}

/* Backwards-compatible type/value with special cases for some types */
function apivalueFromValue(value) {
  var composedValue = function composedValue(componentKind) {
    var elements = value[componentKind].map(function (it) {
      var apiValue = apivalueFromValue(it);
      var value = apiValue && apiValue.value;

      return value;
    });

    return {
      type: value.type().toString(),
      value: elements
    };
  };

  if (value === null) {
    return null;
  }
  if (value.isInteger()) {
    return {
      type: (0, _i18n.i18n)('TYPE:Integer'),
      value: value.asNumber()
    };
  } else if (value.isBoolean()) {
    return {
      type: (0, _i18n.i18n)('TYPE:Bool'),
      value: (0, _runtime.boolFromValue)(value)
    };
  } else if (value.isString()) {
    return {
      type: (0, _i18n.i18n)('TYPE:String'),
      value: value.string
    };
  } else if (value.isTuple()) {
    return composedValue('components');
  } else if (value.isList()) {
    return composedValue('elements');
  } else if (value.isStructure()) {
    return {
      type: value.typeName,
      value: value.toString()
    };
  } else {
    return {
      type: value.type().toString(),
      value: value.toString()
    };
  }
}

var GobstonesInterpreterError = function GobstonesInterpreterError(exception) {
  _classCallCheck(this, GobstonesInterpreterError);

  this.message = exception.message;
  this.reason = {
    code: exception.reason,
    detail: exception.args
  };
  this.on = {
    range: {
      start: {
        row: exception.startPos.line,
        column: exception.startPos.column
      },
      end: {
        row: exception.endPos.line,
        column: exception.endPos.column
      }
    },
    region: exception.startPos.region
  };
};

var ParseError = function (_GobstonesInterpreter) {
  _inherits(ParseError, _GobstonesInterpreter);

  function ParseError(exception) {
    _classCallCheck(this, ParseError);

    return _possibleConstructorReturn(this, (ParseError.__proto__ || Object.getPrototypeOf(ParseError)).call(this, exception));
  }

  return ParseError;
}(GobstonesInterpreterError);

var ExecutionError = function (_GobstonesInterpreter2) {
  _inherits(ExecutionError, _GobstonesInterpreter2);

  function ExecutionError(exception, snapshots, regionStack) {
    _classCallCheck(this, ExecutionError);

    var _this2 = _possibleConstructorReturn(this, (ExecutionError.__proto__ || Object.getPrototypeOf(ExecutionError)).call(this, exception));

    var isTimeout = _this2.reason.code === 'timeout';
    _this2.snapshots = isTimeout ? [snapshots[snapshots.length - 1]] : snapshots;
    _this2.on.regionStack = regionStack;
    return _this2;
  }

  return ExecutionError;
}(GobstonesInterpreterError);

var NormalExecutionResult = function NormalExecutionResult(finalBoard, snapshots, returnValue) {
  _classCallCheck(this, NormalExecutionResult);

  this.finalBoard = finalBoard;
  this.snapshots = snapshots;
  this.returnValue = apivalueFromValue(returnValue);

  /* Actual return value */
  this.actualReturnValue = returnValue;
};

var InteractiveExecutionResult = function () {
  function InteractiveExecutionResult(state) {
    _classCallCheck(this, InteractiveExecutionResult);

    this.keys = this._collectKeyNames(state);
    this.timeout = this._timeoutValue(state);
    this.onInit = this._onInitFunction(state);
    this.onKey = this._onKeyFunction(state);
    this.onTimeout = this._onTimeoutFunction(state);
  }

  _createClass(InteractiveExecutionResult, [{
    key: '_hasInit',
    value: function _hasInit(state) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = state.runner.symbolTable.program.branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var branch = _step.value;

          var p = branch.pattern;
          if (p.tag === _ast.N_PatternStructure && p.constructorName.value === (0, _i18n.i18n)('CONS:INIT')) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: '_hasTimeout',
    value: function _hasTimeout(state) {
      return this.timeout !== null;
    }
  }, {
    key: '_collectKeyNames',
    value: function _collectKeyNames(state) {
      var keys = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = state.runner.symbolTable.program.branches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var branch = _step2.value;

          var p = branch.pattern;
          if (p.tag === _ast.N_PatternStructure && p.constructorName.value !== (0, _i18n.i18n)('CONS:INIT')) {
            keys.push(p.constructorName.value);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return keys;
    }
  }, {
    key: '_timeoutValue',
    value: function _timeoutValue(state) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = state.runner.symbolTable.program.branches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var branch = _step3.value;

          if (branch.pattern.tag === _ast.N_PatternTimeout) {
            return branch.pattern.timeout;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return null;
    }

    /* Return a function that, when called, continues running
     * the interactive program feeding it with the INIT event.
     *
     * If the interactive program does not have an entry for the
     * INIT event, the returned function has no effect.
     */

  }, {
    key: '_onInitFunction',
    value: function _onInitFunction(state) {
      if (this._hasInit(state)) {
        var self = this;
        return function () {
          return (0, _i18n.i18nWithLanguage)(state.language, function () {
            return self._onEvent(state, new _value.ValueStructure((0, _i18n.i18n)('TYPE:Event'), (0, _i18n.i18n)('CONS:INIT')));
          });
        };
      } else {
        return function () {
          return (0, _i18n.i18nWithLanguage)(state.language, function () {
            return apiboardFromState(state.runner.globalState);
          });
        };
      }
    }

    /* Return a function that, when called, continues running
     * the interactive program feeding it with the TIMEOUT event.
     *
     * If the interactive program does not have an entry for the
     * TIMEOUT event, the returned function has no effect.
     */

  }, {
    key: '_onTimeoutFunction',
    value: function _onTimeoutFunction(state) {
      if (this._hasTimeout(state)) {
        var self = this;
        return function () {
          return (0, _i18n.i18nWithLanguage)(state.language, function () {
            return self._onEvent(state, new _value.ValueStructure((0, _i18n.i18n)('TYPE:Event'), (0, _i18n.i18n)('CONS:TIMEOUT')));
          });
        };
      } else {
        return function () {
          return (0, _i18n.i18nWithLanguage)(state.language, function () {
            return apiboardFromState(state.runner.globalState);
          });
        };
      }
    }

    /* Return a function that, when called with a key code, continues running
     * the interactive program feeding it with the given key event.
     *
     * If the interactive program does not have an entry for the given
     * key, this results in a runtime error.
     */

  }, {
    key: '_onKeyFunction',
    value: function _onKeyFunction(state) {
      var self = this;
      return function (keyCode) {
        return (0, _i18n.i18nWithLanguage)(state.language, function () {
          return self._onEvent(state, new _value.ValueStructure((0, _i18n.i18n)('TYPE:Event'), keyCode));
        });
      };
    }

    /* Continue running the interactive program feeding it with the given
     * eventValue.
     * On success, return a Board.
     * On failure, return an ExecutionError. */

  }, {
    key: '_onEvent',
    value: function _onEvent(state, eventValue) {
      return (0, _i18n.i18nWithLanguage)(state.language, function () {
        try {
          state.runner.executeEventWithTimeout(eventValue, state.infiniteLoopTimeout);
          return apiboardFromState(state.runner.globalState);
        } catch (exception) {
          if (exception.isGobstonesException === undefined) {
            throw exception;
          }
          return new ExecutionError(exception, [], state.runner.regionStack());
        }
      });
    }
  }]);

  return InteractiveExecutionResult;
}();

var SnapshotTaker = function () {
  function SnapshotTaker(runner) {
    _classCallCheck(this, SnapshotTaker);

    this._runner = runner;
    this._snapshots = [];
  }

  _createClass(SnapshotTaker, [{
    key: 'takeSnapshot',
    value: function takeSnapshot(routineName, position, callStack, globalState) {
      if (this._shouldTakeSnapshot(routineName, callStack)) {
        this._snapshots.push(this._snapshot(routineName, position, callStack, globalState));
      }
    }
  }, {
    key: 'snapshots',
    value: function snapshots() {
      return this._snapshots;
    }
  }, {
    key: '_snapshot',
    value: function _snapshot(routineName, position, callStack, globalState) {
      var snapshot = {};
      snapshot.contextNames = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = callStack[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var stackFrame = _step4.value;

          var name = stackFrame.routineName;
          if (name !== 'program') {
            name = name + '-' + stackFrame.uniqueFrameId.toString();
          }
          snapshot.contextNames.push(name);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      snapshot.board = apiboardFromState(globalState);
      snapshot.region = position.region;
      snapshot.regionStack = this._runner.regionStack();
      return snapshot;
    }
  }, {
    key: '_shouldTakeSnapshot',
    value: function _shouldTakeSnapshot(routineName, callStack) {
      var routineNameStack = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = callStack[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var stackFrame = _step5.value;

          routineNameStack.push(stackFrame.routineName);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (this._runner.primitives.isProcedure(routineName)) {
        /* A primitive procedure must be recorded if there are no
         * atomic routines anywhere in the call stack. */
        return this._noAtomicRoutines(routineNameStack);
      } else {
        /* Other routines must be recorded if they have the 'recorded'
         * attribute, and, moreover, there are no atomic routines other
         * than the last one in the call stack. */
        routineNameStack.pop();
        return this._isRecorded(routineName) && this._noAtomicRoutines(routineNameStack);
      }
    }
  }, {
    key: '_noAtomicRoutines',
    value: function _noAtomicRoutines(routineNameStack) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = routineNameStack[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var routineName = _step6.value;

          if (this._isAtomic(routineName)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return true;
    }
  }, {
    key: '_isAtomic',
    value: function _isAtomic(routineName) {
      if (routineName === 'program') {
        return false;
      } else if (this._runner.primitives.isProcedure(routineName)) {
        /* Primitive procedure */
        return false;
      } else if (this._runner.symbolTable.isProcedure(routineName)) {
        /* User-defined procedure */
        return false;
      } else {
        /* Function */
        return true;
      }
    }
  }, {
    key: '_isRecorded',
    value: function _isRecorded(routineName) {
      if (routineName === 'program') {
        return true;
      } else if (this._runner.primitives.isProcedure(routineName)) {
        /* Primitive procedure */
        return true;
      } else if (this._runner.symbolTable.isProcedure(routineName)) {
        /* User-defined procedure */
        return false;
      } else {
        /* Function */
        return false;
      }
    }
  }]);

  return SnapshotTaker;
}();

var ParseResult = function () {
  function ParseResult(state) {
    _classCallCheck(this, ParseResult);

    if (state.runner.symbolTable.program === null) {
      this.program = null;
    } else if (state.runner.symbolTable.isInteractiveProgram()) {
      this.program = this._resultForInteractiveProgram(state);
    } else {
      this.program = this._resultForProgram(state);
    }
    this.declarations = this._collectDeclarations(state.runner);
    this.getAttributes = function (globalName) {
      return state.runner.symbolTable.getAttributes(globalName);
    };
  }

  _createClass(ParseResult, [{
    key: '_resultForProgram',
    value: function _resultForProgram(state) {
      var program = {};
      program.alias = 'program';
      program.interpret = function (board) {
        var snapshotTaker = new SnapshotTaker(state.runner);

        return (0, _i18n.i18nWithLanguage)(state.language, function () {
          try {
            state.runner.compile();
            state.runner.executeWithTimeoutTakingSnapshots(apiboardToState(board), state.infiniteLoopTimeout, snapshotTaker.takeSnapshot.bind(snapshotTaker));

            var finalBoard = apiboardFromState(state.runner.globalState);
            var returnValue = state.runner.result;
            return new NormalExecutionResult(finalBoard, snapshotTaker.snapshots(), returnValue);
          } catch (exception) {
            if (exception.isGobstonesException === undefined) {
              throw exception;
            }

            return new ExecutionError(exception, snapshotTaker.snapshots(), state.runner.regionStack());
          }
        });
      };
      return program;
    }
  }, {
    key: '_resultForInteractiveProgram',
    value: function _resultForInteractiveProgram(state) {
      var program = {};
      program.alias = 'interactiveProgram';
      program.interpret = function (board) {
        return (0, _i18n.i18nWithLanguage)(state.language, function () {
          try {
            state.runner.compile();
            state.runner.initializeVirtualMachine(apiboardToState(board));
            return new InteractiveExecutionResult(state);
          } catch (exception) {
            if (exception.isGobstonesException === undefined) {
              throw exception;
            }
            return new ExecutionError(exception, [], state.runner.regionStack());
          }
        });
      };
      return program;
    }
  }, {
    key: '_collectDeclarations',
    value: function _collectDeclarations(runner) {
      var declarations = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = runner.symbolTable.allProcedureNames()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var name = _step7.value;

          if (runner.primitives.isProcedure(name)) {
            continue; /* Skip primitive procedures */
          }
          declarations.push({
            alias: 'procedureDeclaration',
            name: name
          });
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = runner.symbolTable.allFunctionNames()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _name = _step8.value;

          if (runner.primitives.isFunction(_name)) {
            continue; /* Skip primitive functions */
          }
          declarations.push({
            alias: 'functionDeclaration',
            name: _name
          });
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return declarations;
    }
  }]);

  return ParseResult;
}();

var GobstonesInterpreterAPI = exports.GobstonesInterpreterAPI = function GobstonesInterpreterAPI() {
  _classCallCheck(this, GobstonesInterpreterAPI);

  /* Internal state of the interpreter */
  var state = {
    infiniteLoopTimeout: DEFAULT_INFINITE_LOOP_TIMEOUT,
    language: DEFAULT_LANGUAGE,
    runner: new _runner.Runner()
  };

  this.config = {
    setLanguage: function setLanguage(code) {
      state.language = code;
    },
    setInfiniteLoopTimeout: function setInfiniteLoopTimeout(milliseconds) {
      state.infiniteLoopTimeout = milliseconds;
    },
    setXGobstonesEnabled: function setXGobstonesEnabled(isEnabled) {
      /* TODO */
    }
  };

  this.gbb = {
    /* Convert a string representing a board in GBB format
     * to a board in the "API" format. */
    read: function read(gbb) {
      return (0, _board_formats.apiboardFromJboard)((0, _board_formats.gbbToJboard)(gbb));
    },
    /* Convert a board in the "API" format to a string representing
     * a board in GBB format. */
    write: function write(apiboard) {
      return (0, _board_formats.gbbFromJboard)((0, _board_formats.apiboardToJboard)(apiboard));
    }
  };

  this.getAst = function (sourceCode) {
    return this._withState(sourceCode, false, function (state) {
      return state.runner.abstractSyntaxTree.toMulangLike();
    });
  };

  this.parse = function (sourceCode) {
    return this._withState(sourceCode, true, function (state) {
      return new ParseResult(state);
    });
  };

  this._withState = function (sourceCode, useLinter, action) {
    return (0, _i18n.i18nWithLanguage)(state.language, function () {
      try {
        state.runner.initialize();
        state.runner.parse(sourceCode);
        /* Disable checking whether there is a main 'program' present. */
        state.runner.enableLintCheck('source-should-have-a-program-definition', false);
        if (useLinter) state.runner.lint();
        return action(state);
      } catch (exception) {
        if (exception.isGobstonesException === undefined) {
          throw exception;
        }
        return new ParseError(exception);
      }
    });
  };
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_EN = undefined;

var _es = __webpack_require__(7);

var LOCALE_EN = exports.LOCALE_EN = {};

for (var key in _es.LOCALE_ES) {
  LOCALE_EN[key] = _es.LOCALE_ES[key];
}

LOCALE_EN['TYPE:Color'] = 'Color';
LOCALE_EN['CONS:Color0'] = 'Blue';
LOCALE_EN['CONS:Color1'] = 'Black';
LOCALE_EN['CONS:Color2'] = 'Red';
LOCALE_EN['CONS:Color3'] = 'Green';

LOCALE_EN['TYPE:Dir'] = 'Dir';
LOCALE_EN['CONS:Dir0'] = 'North';
LOCALE_EN['CONS:Dir1'] = 'East';
LOCALE_EN['CONS:Dir2'] = 'South';
LOCALE_EN['CONS:Dir3'] = 'West';

LOCALE_EN['PRIM:PutStone'] = 'Drop';
LOCALE_EN['PRIM:RemoveStone'] = 'Grab';
LOCALE_EN['PRIM:Move'] = 'Move';
LOCALE_EN['PRIM:GoToEdge'] = 'GoToEdge';
LOCALE_EN['PRIM:EmptyBoardContents'] = 'EmptyBoardContents';
LOCALE_EN['PRIM:numStones'] = 'numStones';
LOCALE_EN['PRIM:anyStones'] = 'anyStones';
LOCALE_EN['PRIM:canMove'] = 'canMove';
LOCALE_EN['PRIM:next'] = 'next';
LOCALE_EN['PRIM:prev'] = 'prev';
LOCALE_EN['PRIM:opposite'] = 'opposite';
LOCALE_EN['PRIM:minBool'] = 'minBool';
LOCALE_EN['PRIM:maxBool'] = 'maxBool';
LOCALE_EN['PRIM:minColor'] = 'minColor';
LOCALE_EN['PRIM:maxColor'] = 'maxColor';
LOCALE_EN['PRIM:minDir'] = 'minDir';
LOCALE_EN['PRIM:maxDir'] = 'maxDir';

LOCALE_EN['PRIM:head'] = 'head';
LOCALE_EN['PRIM:tail'] = 'tail';
LOCALE_EN['PRIM:oldTail'] = 'tail';
LOCALE_EN['PRIM:init'] = 'init';
LOCALE_EN['PRIM:last'] = 'last';

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LOCALE_PT = undefined;

var _es = __webpack_require__(7);

function keyword(palabra) {
    return '‘a palavra chave "' + palabra + '"';
}

function pluralize(n, singular, plural) {
    if (n === 0) {
        return 'nenhum ' + singular;
    } else if (n === 1) {
        return 'um ' + singular;
    } else {
        return n.toString() + ' ' + plural;
    }
}

var LOCALE_PT = exports.LOCALE_PT = {};

for (var key in _es.LOCALE_ES) {
    LOCALE_PT[key] = _es.LOCALE_ES[key];
}

/* Descriptions of syntactic constructions and tokens */
LOCALE_PT['definition'] = 'uma definição (de programa, função, procedimento, ou tipo)';
LOCALE_PT['pattern'] = 'um padrão (comodín "_", construtor aplicado a variáveis, ou tupla)';
LOCALE_PT['statement'] = 'um comando';
LOCALE_PT['expression'] = 'uma expressão';
LOCALE_PT['procedure call'] = 'uma invocação a um procedimento';
LOCALE_PT['field name'] = 'o nome de um campo';
LOCALE_PT['T_EOF'] = 'o fim do arquivo';
LOCALE_PT['T_NUM'] = 'um número';
LOCALE_PT['T_STRING'] = 'uma corrente (string)';
LOCALE_PT['T_UPPERID'] = 'um identificador com maiúsculas';
LOCALE_PT['T_LOWERID'] = 'um identificador com minúsculas';
LOCALE_PT['T_PROGRAM'] = keyword('program');
LOCALE_PT['T_INTERACTIVE'] = keyword('interactive');
LOCALE_PT['T_PROCEDURE'] = keyword('procedure');
LOCALE_PT['T_FUNCTION'] = keyword('function');
LOCALE_PT['T_RETURN'] = keyword('return');
LOCALE_PT['T_IF'] = keyword('if');
LOCALE_PT['T_THEN'] = keyword('then');
LOCALE_PT['T_ELSE'] = keyword('else');
LOCALE_PT['T_REPEAT'] = keyword('repeat');
LOCALE_PT['T_FOREACH'] = keyword('foreach');
LOCALE_PT['T_IN'] = keyword('in');
LOCALE_PT['T_WHILE'] = keyword('while');
LOCALE_PT['T_SWITCH'] = keyword('switch');
LOCALE_PT['T_TO'] = keyword('to');
LOCALE_PT['T_LET'] = keyword('let');
LOCALE_PT['T_NOT'] = keyword('not');
LOCALE_PT['T_DIV'] = keyword('div');
LOCALE_PT['T_MOD'] = keyword('mod');
LOCALE_PT['T_TYPE'] = keyword('type');
LOCALE_PT['T_IS'] = keyword('is');
LOCALE_PT['T_RECORD'] = keyword('record');
LOCALE_PT['T_VARIANT'] = keyword('variant');
LOCALE_PT['T_CASE'] = keyword('case');
LOCALE_PT['T_FIELD'] = keyword('field');
LOCALE_PT['T_UNDERSCORE'] = 'um sublinhado ("_")';
LOCALE_PT['T_LPAREN'] = 'um parênteses esquerdo ("(")';
LOCALE_PT['T_RPAREN'] = 'um parênteses direito (")")';
LOCALE_PT['T_LBRACE'] = 'uma chave esquerda ("{")';
LOCALE_PT['T_RBRACE'] = 'uma chave direita ("}")';
LOCALE_PT['T_LBRACK'] = 'um colchete esquerdo ("[")';
LOCALE_PT['T_RBRACK'] = 'um colchete direito ("]")';
LOCALE_PT['T_COMMA'] = 'uma vírgula  (",")';
LOCALE_PT['T_SEMICOLON'] = 'um ponto e vírgula (";")';
LOCALE_PT['T_RANGE'] = 'um separador de intervalo ("..")';
LOCALE_PT['T_GETS'] = 'uma flecha para a esquerda ("<-")';
LOCALE_PT['T_PIPE'] = 'uma barra vertical ("|")';
LOCALE_PT['T_ARROW'] = 'uma flecha ("->")';
LOCALE_PT['T_ASSIGN'] = 'um operador de designação  (":=")';
LOCALE_PT['T_EQ'] = 'uma comparação por igualdade ("==")';
LOCALE_PT['T_NE'] = 'uma comparação por desigualdade ("/=")';
LOCALE_PT['T_LE'] = 'um menor ou igual ("<=")';
LOCALE_PT['T_GE'] = 'um maior ou igual (">=")';
LOCALE_PT['T_LT'] = 'um menor estrito ("<")';
LOCALE_PT['T_GT'] = 'um maior estrito (">")';
LOCALE_PT['T_AND'] = 'o "e" lógico ("&&")';
LOCALE_PT['T_OR'] = 'o "ou" lógico ("||")';
LOCALE_PT['T_CONCAT'] = 'o operador de concatenação de listas ("++")';
LOCALE_PT['T_PLUS'] = 'o operador de soma ("+")';
LOCALE_PT['T_MINUS'] = 'o operador de diferença ("-")';
LOCALE_PT['T_TIMES'] = 'o operador de produto ("*")';
LOCALE_PT['T_POW'] = 'o operador de potência ("^")';

/* Local name categories */
LOCALE_PT['LocalVariable'] = 'variável';
LOCALE_PT['LocalIndex'] = 'índice';
LOCALE_PT['LocalParameter'] = 'parâmetro';

/* Descriptions of value types */
LOCALE_PT['V_Integer'] = 'um número';
LOCALE_PT['V_String'] = 'uma cadeia';
LOCALE_PT['V_Tuple'] = 'uma tupla';
LOCALE_PT['V_List'] = 'uma lista';
LOCALE_PT['V_Structure'] = 'uma estrutura';

/* Lexer */
LOCALE_PT['errmsg:unclosed-multiline-comment'] = 'O comentário abre mas nunca fecha.';

LOCALE_PT['errmsg:unclosed-string-constant'] = 'As aspas que abrem não possuem as aspas correspondentes que fecham.';

LOCALE_PT['errmsg:numeric-constant-should-not-have-leading-zeroes'] = 'As constantes numéricas não podem ser escritas com zeros à ' + 'esquerda.';

LOCALE_PT['errmsg:identifier-must-start-with-alphabetic-character'] = 'Os identificadores devem começar com um caractere alfabético ' + '(a...z,A...Z).';

LOCALE_PT['errmsg:unknown-token'] = function (symbol) {
    return 'Símbolo desconhecido na entrada: "' + symbol + '".';
};

LOCALE_PT['warning:empty-pragma'] = 'Diretiva pragma vazia.';

LOCALE_PT['warning:unknown-pragma'] = function (pragmaName) {
    return 'Diretiva pragma desconhecida: "' + pragmaName + '".';
};

/* Parser */
LOCALE_PT['errmsg:empty-source'] = 'O programa está vazio.';

LOCALE_PT['errmsg:expected-but-found'] = function (expected, found) {
    return 'Esperava-se ' + expected + '.\n' + 'Encontrado: ' + found + '.';
};

LOCALE_PT['errmsg:pattern-number-cannot-be-negative-zero'] = 'O padrão numérico não pode ser "-0".';

LOCALE_PT['errmsg:pattern-tuple-cannot-be-singleton'] = 'O padrão para uma tupla não pode ter apenas um componente. ' + 'As tuplas têm 0, 2, 3, ou mais componentes, mas não 1.';

LOCALE_PT['errmsg:assignment-tuple-cannot-be-singleton'] = 'A designação a uma tupla não pode ser ' + ' constituída por apenas um componente. ' + 'As tuplas têm 0, 2, 3, ou mais componentes, mas não 1.';

LOCALE_PT['errmsg:operators-are-not-associative'] = function (op1, op2) {
    return 'A expressão usa ' + op1 + ' e ' + op2 + ', mas estes operadores não podem ser associados. ' + 'Talvez faltam parênteses.';
};

LOCALE_PT['errmsg:obsolete-tuple-assignment'] = 'Esperava-se um comando mas não foi encontrado um parênteses esquerdo. ' + 'Nota: a sintaxe de designação de tuplas "(x1, ..., xN) := y" ' + 'está obsoleta. Usar "let (x1, ..., xN) := y".';

/* Linter */
LOCALE_PT['errmsg:program-already-defined'] = function (pos1, pos2) {
    return 'Já havia um programa definido em ' + pos1 + '.\n' + 'Não é possível definir um programa em ' + pos2 + '.';
};

LOCALE_PT['errmsg:procedure-already-defined'] = function (name, pos1, pos2) {
    return 'O procedimiento "' + name + '" está definido duas vezes: ' + 'em ' + pos1 + ' e em ' + pos2 + '.';
};

LOCALE_PT['errmsg:function-already-defined'] = function (name, pos1, pos2) {
    return 'A função "' + name + '" está definida duas vezes: ' + 'em ' + pos1 + ' e em ' + pos2 + '.';
};

LOCALE_PT['errmsg:type-already-defined'] = function (name, pos1, pos2) {
    return 'O tipo "' + name + '" está definido duas vezes: ' + 'em ' + pos1 + ' e em ' + pos2 + '.';
};

LOCALE_PT['errmsg:constructor-already-defined'] = function (name, pos1, pos2) {
    return 'O construtor "' + name + '" está definido duas vezes: ' + 'em ' + pos1 + ' e em ' + pos2 + '.';
};

LOCALE_PT['errmsg:repeated-field-name'] = function (constructorName, fieldName) {
    return 'O campo "' + fieldName + '" não pode estar repetido ' + 'para o construtor "' + constructorName + '".';
};

LOCALE_PT['errmsg:function-and-field-cannot-have-the-same-name'] = function (name, posFunction, posField) {
    return 'O nome "' + name + '" usa-se ' + 'para uma função em ' + posFunction + ' e ' + 'para um campo em ' + posField + '.';
};

LOCALE_PT['errmsg:source-should-have-a-program-definition'] =
/* Note: the code may actually be completely empty, but
 * we avoid this technicality since the message could be
 * confusing. */
'O código deve ter uma definição de "program { ... }".';

LOCALE_PT['errmsg:procedure-should-not-have-return'] = function (name) {
    return 'O procedimento "' + name + '" ' + 'não deveria ter um comando "return".';
};

LOCALE_PT['errmsg:function-should-have-return'] = function (name) {
    return 'A função "' + name + '" deveria ter um comando "return".';
};

LOCALE_PT['errmsg:return-statement-not-allowed-here'] = 'O comando "return"  pode aparecer apenas como o último comando ' + 'de uma função ou como o último comando do programa.';

LOCALE_PT['errmsg:local-name-conflict'] = function (name, oldCat, oldPos, newCat, newPos) {
    return 'Conflito de nomes: "' + name + '" se usa duas vezes: ' + 'como ' + oldCat + ' em ' + oldPos + ', e ' + 'como ' + newCat + ' em ' + newPos + '.';
};

LOCALE_PT['errmsg:repeated-variable-in-tuple-assignment'] = function (name) {
    return 'La variável "' + name + '" está repetida na designação ' + 'de tuplas.';
};

LOCALE_PT['errmsg:constructor-used-as-procedure'] = function (name, type) {
    return 'O procedimento "' + name + '" não está definido. ' + 'O nome "' + name + '" é o nome de um construtor ' + 'do tipo "' + type + '".';
};

LOCALE_PT['errmsg:undefined-procedure'] = function (name) {
    return 'O procedimento "' + name + '" não está definido.';
};

LOCALE_PT['errmsg:undefined-function'] = function (name) {
    return 'A função "' + name + '" não está definida.';
};

LOCALE_PT['errmsg:procedure-arity-mismatch'] = function (name, expected, received) {
    return 'O procedimento "' + name + '" espera receber ' + _es.LOCALE_ES['<n>-parameters'](expected) + ' mas é invocado com ' + _es.LOCALE_ES['<n>-arguments'](received) + '.';
};

LOCALE_PT['errmsg:function-arity-mismatch'] = function (name, expected, received) {
    return 'A função "' + name + '" espera receber ' + _es.LOCALE_ES['<n>-parameters'](expected) + ' mas é invocado com ' + _es.LOCALE_ES['<n>-arguments'](received) + '.';
};

LOCALE_PT['errmsg:structure-pattern-arity-mismatch'] = function (name, expected, received) {
    return 'O construtor "' + name + '" tem ' + _es.LOCALE_ES['<n>-fields'](expected) + ' mas o padrão tem ' + _es.LOCALE_ES['<n>-parameters'](received) + '.';
};

LOCALE_PT['errmsg:type-used-as-constructor'] = function (name, constructorNames) {
    var msg = void 0;
    if (constructorNames.length === 0) {
        msg = '(não tem construtores).';
    } else if (constructorNames.length === 1) {
        msg = '(tem um construtor: ' + constructorNames[0] + ').';
    } else {
        msg = '(seus construtores são: ' + constructorNames.join(', ') + ').';
    }
    return 'O construtor "' + name + '" não está definido. ' + 'O nome "' + name + '" é o nome de um tipo ' + msg;
};

LOCALE_PT['errmsg:procedure-used-as-constructor'] = function (name) {
    return 'O construtor "' + name + '" não está definido. ' + 'O nome "' + name + '" é o nome de um procedimento.';
};

LOCALE_PT['errmsg:undeclared-constructor'] = function (name) {
    return 'O construtor "' + name + '" não está definido.';
};

LOCALE_PT['errmsg:wildcard-pattern-should-be-last'] = 'O comodín "_" tem que ser o último ramo do switch.';

LOCALE_PT['errmsg:numeric-pattern-repeats-number'] = function (number) {
    return 'Tem dois ramos diferentes para o número "' + number + '".';
};

LOCALE_PT['errmsg:structure-pattern-repeats-constructor'] = function (name) {
    return 'Há dois ramos distintos para o construtor "' + name + '".';
};

LOCALE_PT['errmsg:structure-pattern-repeats-tuple-arity'] = function (arity) {
    return 'Há dois ramos distintos para as tuplas de ' + arity.toString() + ' componentes.';
};

LOCALE_PT['errmsg:structure-pattern-repeats-timeout'] = 'Há dois ramos distintos para o TIMEOUT.';

LOCALE_PT['errmsg:pattern-does-not-match-type'] = function (expectedType, patternType) {
    return 'Os padrões devem ser todos do mesmo tipo. ' + 'O padrão deveria ser de tipo "' + expectedType + '" ' + 'pero es de tipo "' + patternType + '".';
};

LOCALE_PT['errmsg:patterns-in-interactive-program-must-be-events'] = 'Os padrões de um "interactive program" devem ser eventos.';

LOCALE_PT['errmsg:patterns-in-switch-must-not-be-events'] = 'Os padrões de um "switch" não podem ser eventos.';

LOCALE_PT['errmsg:structure-construction-repeated-field'] = function (constructorName, fieldName) {
    return 'O campo "' + fieldName + '" está repetido em ' + 'a instanciação do construtor "' + constructorName + '".';
};

LOCALE_PT['errmsg:structure-construction-invalid-field'] = function (constructorName, fieldName) {
    return 'O campo "' + fieldName + '" não é um campo válido ' + 'para o construtor "' + constructorName + '".';
};

LOCALE_PT['errmsg:structure-construction-missing-field'] = function (constructorName, fieldName) {
    return 'Falta dar valor ao campo "' + fieldName + '" ' + 'do construtor "' + constructorName + '".';
};

LOCALE_PT['errmsg:structure-construction-cannot-be-an-event'] = function (constructorName) {
    return 'O construtor "' + constructorName + '" corresponde a um ' + 'evento, e só pode ser administrado implicitamente ' + 'em um programa interativo (o usuário não pode construir ' + 'instâncias).';
};

/* Runtime errors (virtual machine) */
LOCALE_PT['errmsg:undefined-variable'] = function (variableName) {
    return 'A variável "' + variableName + '" não está definida.';
};

LOCALE_PT['errmsg:too-few-arguments'] = function (routineName) {
    return 'Faltam argumentos para "' + routineName + '".';
};

LOCALE_PT['errmsg:expected-structure-but-got'] = function (constructorName, valueTag) {
    return 'Esperava-se uma estrutura construída ' + 'com o construtor "' + constructorName + '", ' + 'mas foi recebido ' + valueTag + '.';
};

LOCALE_PT['errmsg:expected-constructor-but-got'] = function (constructorNameExpected, constructorNameReceived) {
    return 'Esperava-se uma estrutura construída ' + 'com o construtor "' + constructorNameExpected + '", ' + 'mas o construtor recebido é ' + constructorNameReceived + '".';
};

LOCALE_PT['errmsg:incompatible-types-on-assignment'] = function (variableName, oldType, newType) {
    return 'A variável "' + variableName + '" ' + 'continha un valor do tipo ' + oldType + ', ' + 'não é possível designar um valor de tipo ' + newType + '".';
};

LOCALE_PT['errmsg:incompatible-types-on-list-creation'] = function (index, oldType, newType) {
    return 'Todos os elementos de uma lista devem ser do mesmo tipo. ' + 'Os elementos são do tipo ' + oldType + ', ' + 'mas o elemento na posição ' + index.toString() + ' ' + 'é do tipo ' + newType + '.';
};

LOCALE_PT['errmsg:incompatible-types-on-structure-update'] = function (fieldName, oldType, newType) {
    return 'O campo "' + fieldName + '" é do tipo ' + oldType + '. ' + 'Não pode ser atualizado com um valor do tipo ' + newType + '.';
};

LOCALE_PT['errmsg:expected-tuple-value-but-got'] = function (receivedType) {
    return 'Esperava-se uma tupla mas um valor não foi recebido ' + 'de tipo ' + receivedType + '.';
};

LOCALE_PT['errmsg:tuple-component-out-of-bounds'] = function (size, index) {
    return 'Índice fora do intervalo. ' + 'A tupla é do tamanho ' + size.toString() + ' e ' + 'o índice é ' + index.toString() + '.';
};

LOCALE_PT['errmsg:expected-structure-value-but-got'] = function (receivedType) {
    return 'Se esperaba una estructura pero se recibió un valor ' + 'de tipo ' + receivedType + '.';
};

LOCALE_PT['errmsg:structure-field-not-present'] = function (fieldNames, missingFieldName) {
    return 'A estrutura não possui um campo "' + missingFieldName + '". ' + 'Os campos são: [' + fieldNames.join(', ') + '].';
};

LOCALE_PT['errmsg:primitive-does-not-exist'] = function (primitiveName) {
    return 'A operação primitiva "' + primitiveName + '" ' + 'não existe ou não está disponível.';
};

LOCALE_PT['errmsg:primitive-arity-mismatch'] = function (name, expected, received) {
    return 'A operação "' + name + '" espera receber ' + _es.LOCALE_ES['<n>-parameters'](expected) + ' mas é invocada com ' + _es.LOCALE_ES['<n>-arguments'](received) + '.';
};

LOCALE_PT['errmsg:primitive-argument-type-mismatch'] = function (name, parameterIndex, expectedType, receivedType) {
    return 'O parâmetro #' + parameterIndex.toString() + ' ' + 'da operação "' + name + '" ' + 'deveria ser do tipo ' + expectedType + ' ' + 'mas o argumento é do tipo ' + receivedType + '.';
};

LOCALE_PT['errmsg:expected-value-of-type-but-got'] = function (expectedType, receivedType) {
    return 'Esperava-se um valor do tipo ' + expectedType + ' ' + 'mas foi recebido um valor do tipo ' + receivedType + '.';
};

LOCALE_PT['errmsg:expected-value-of-some-type-but-got'] = function (expectedTypes, receivedType) {
    return 'Esperava-se um valor de algum dos seguintes tipos: ' + expectedTypes.join(', ') + '; mas foi recebido um valor do tipo ' + receivedType + '.';
};

LOCALE_PT['errmsg:expected-values-to-have-compatible-types'] = function (type1, type2) {
    return 'Os tipos dos valores devem ser compatíveis, ' + 'mas um é do tipo ' + type1 + ' ' + 'e o outro é do tipo ' + type2 + '.';
};

LOCALE_PT['errmsg:switch-does-not-match'] = 'O valor analisado não coincide com nenhum dos ramos do switch.';

LOCALE_PT['errmsg:cannot-divide-by-zero'] = 'Não é possível dividir por zero.';

LOCALE_PT['errmsg:list-cannot-be-empty'] = 'A lista não pode ser vazia.';

LOCALE_PT['errmsg:timeout'] = function (millisecs) {
    return 'A execução do programa demorou mais de ' + millisecs.toString() + 'ms.';
};

/* Board operations */
LOCALE_PT['errmsg:cannot-move-to'] = function (dirName) {
    return 'Não é possível mover para a direção ' + dirName + ': cai fora do tabuleiro.';
};

LOCALE_PT['errmsg:cannot-remove-stone'] = function (dirName) {
    return 'Não é posível retirar uma pedra de cor ' + dirName + ': não há pedras dessa cor.';
};

/* Runtime */

LOCALE_PT['TYPE:Color'] = 'Cor';
LOCALE_PT['CONS:Color0'] = 'Azul';
LOCALE_PT['CONS:Color1'] = 'Preto';
LOCALE_PT['CONS:Color2'] = 'Vermelho';
LOCALE_PT['CONS:Color3'] = 'Verde';

LOCALE_PT['TYPE:Dir'] = 'Dir';
LOCALE_PT['CONS:Dir0'] = 'Norte';
LOCALE_PT['CONS:Dir1'] = 'Leste';
LOCALE_PT['CONS:Dir2'] = 'Sul';
LOCALE_PT['CONS:Dir3'] = 'Oeste';

LOCALE_PT['PRIM:PutStone'] = 'Colocar';
LOCALE_PT['PRIM:RemoveStone'] = 'Retirar';
LOCALE_PT['PRIM:Move'] = 'Mover';
LOCALE_PT['PRIM:GoToEdge'] = 'IrABorda';
LOCALE_PT['PRIM:EmptyBoardContents'] = 'EsvaziarTabuleiro';
LOCALE_PT['PRIM:numStones'] = 'nroPedras';
LOCALE_PT['PRIM:anyStones'] = 'haPedras';
LOCALE_PT['PRIM:canMove'] = 'podeMover';
LOCALE_PT['PRIM:next'] = 'seguinte';
LOCALE_PT['PRIM:prev'] = 'previo';
LOCALE_PT['PRIM:opposite'] = 'oposto';
LOCALE_PT['PRIM:minBool'] = 'minBool';
LOCALE_PT['PRIM:maxBool'] = 'maxBool';
LOCALE_PT['PRIM:minColor'] = 'minCor';
LOCALE_PT['PRIM:maxColor'] = 'maxCor';
LOCALE_PT['PRIM:minDir'] = 'minDir';
LOCALE_PT['PRIM:maxDir'] = 'maxDir';

LOCALE_PT['PRIM:head'] = 'primeiro';
LOCALE_PT['PRIM:tail'] = 'resto';
LOCALE_PT['PRIM:oldTail'] = 'resto';
LOCALE_PT['PRIM:init'] = 'comeco';
LOCALE_PT['PRIM:last'] = 'ultimo';

/* Helpers */
LOCALE_PT['<alternative>'] = function (strings) {
    return 'alguma das seguintes alternativas:\n' + strings.map(function (s) {
        return '  ' + s;
    }).join('\n');
};
LOCALE_PT['<position>'] = function (filename, line, column) {
    return filename + ':' + line.toString() + ':' + column.toString();
};
LOCALE_PT['<n>-parameters'] = function (n) {
    return pluralize(n, 'parâmetro', 'parâmetros');
};
LOCALE_PT['<n>-arguments'] = function (n) {
    return pluralize(n, 'argumento', 'argumentos');
};
LOCALE_PT['<n>-fields'] = function (n) {
    return pluralize(n, 'campo', 'campos');
};
LOCALE_PT['<pattern-type>'] = function (patternType) {
    if (patternType === 'Event') {
        return 'evento do programa interativo';
    } else if (patternType.substring(0, 7) === '_TUPLE_') {
        return 'tupla de ' + patternType.substring(7) + ' componentes';
    } else {
        return patternType;
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Integer = Integer;
/* eslint-disable */

/* This file is taken and slightly adapted from
 * http://peterolson.github.io/BigInteger.js/BigInteger.js */

var BASE = 1e7,
    LOG_BASE = 7,
    MAX_INT = 9007199254740992,
    MAX_INT_ARR = smallToArray(MAX_INT),
    LOG_MAX_INT = Math.log(MAX_INT);

function Integer(v, radix) {
    if (typeof v === "undefined") return Integer[0];
    if (typeof radix !== "undefined") return +radix === 10 ? parseValue(v) : parseBase(v, radix);
    return parseValue(v);
}

function BigInteger(value, sign) {
    this.value = value;
    this.sign = sign;
    this.isSmall = false;
}
BigInteger.prototype = Object.create(Integer.prototype);

function SmallInteger(value) {
    this.value = value;
    this.sign = value < 0;
    this.isSmall = true;
}
SmallInteger.prototype = Object.create(Integer.prototype);

function isPrecise(n) {
    return -MAX_INT < n && n < MAX_INT;
}

function smallToArray(n) {
    // For performance reasons doesn't reference BASE, need to change this function if BASE changes
    if (n < 1e7) return [n];
    if (n < 1e14) return [n % 1e7, Math.floor(n / 1e7)];
    return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
}

function arrayToSmall(arr) {
    // If BASE changes this function may need to change
    trim(arr);
    var length = arr.length;
    if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
        switch (length) {
            case 0:
                return 0;
            case 1:
                return arr[0];
            case 2:
                return arr[0] + arr[1] * BASE;
            default:
                return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
        }
    }
    return arr;
}

function trim(v) {
    var i = v.length;
    while (v[--i] === 0) {}
    v.length = i + 1;
}

function createArray(length) {
    // function shamelessly stolen from Yaffle's library https://github.com/Yaffle/BigInteger
    var x = new Array(length);
    var i = -1;
    while (++i < length) {
        x[i] = 0;
    }
    return x;
}

function truncate(n) {
    if (n > 0) return Math.floor(n);
    return Math.ceil(n);
}

function add(a, b) {
    // assumes a and b are arrays with a.length >= b.length
    var l_a = a.length,
        l_b = b.length,
        r = new Array(l_a),
        carry = 0,
        base = BASE,
        sum,
        i;
    for (i = 0; i < l_b; i++) {
        sum = a[i] + b[i] + carry;
        carry = sum >= base ? 1 : 0;
        r[i] = sum - carry * base;
    }
    while (i < l_a) {
        sum = a[i] + carry;
        carry = sum === base ? 1 : 0;
        r[i++] = sum - carry * base;
    }
    if (carry > 0) r.push(carry);
    return r;
}

function addAny(a, b) {
    if (a.length >= b.length) return add(a, b);
    return add(b, a);
}

function addSmall(a, carry) {
    // assumes a is array, carry is number with 0 <= carry < MAX_INT
    var l = a.length,
        r = new Array(l),
        base = BASE,
        sum,
        i;
    for (i = 0; i < l; i++) {
        sum = a[i] - base + carry;
        carry = Math.floor(sum / base);
        r[i] = sum - carry * base;
        carry += 1;
    }
    while (carry > 0) {
        r[i++] = carry % base;
        carry = Math.floor(carry / base);
    }
    return r;
}

BigInteger.prototype.add = function (v) {
    var n = parseValue(v);
    if (this.sign !== n.sign) {
        return this.subtract(n.negate());
    }
    var a = this.value,
        b = n.value;
    if (n.isSmall) {
        return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
    }
    return new BigInteger(addAny(a, b), this.sign);
};
BigInteger.prototype.plus = BigInteger.prototype.add;

SmallInteger.prototype.add = function (v) {
    var n = parseValue(v);
    var a = this.value;
    if (a < 0 !== n.sign) {
        return this.subtract(n.negate());
    }
    var b = n.value;
    if (n.isSmall) {
        if (isPrecise(a + b)) return new SmallInteger(a + b);
        b = smallToArray(Math.abs(b));
    }
    return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
};
SmallInteger.prototype.plus = SmallInteger.prototype.add;

function subtract(a, b) {
    // assumes a and b are arrays with a >= b
    var a_l = a.length,
        b_l = b.length,
        r = new Array(a_l),
        borrow = 0,
        base = BASE,
        i,
        difference;
    for (i = 0; i < b_l; i++) {
        difference = a[i] - borrow - b[i];
        if (difference < 0) {
            difference += base;
            borrow = 1;
        } else borrow = 0;
        r[i] = difference;
    }
    for (i = b_l; i < a_l; i++) {
        difference = a[i] - borrow;
        if (difference < 0) difference += base;else {
            r[i++] = difference;
            break;
        }
        r[i] = difference;
    }
    for (; i < a_l; i++) {
        r[i] = a[i];
    }
    trim(r);
    return r;
}

function subtractAny(a, b, sign) {
    var value;
    if (compareAbs(a, b) >= 0) {
        value = subtract(a, b);
    } else {
        value = subtract(b, a);
        sign = !sign;
    }
    value = arrayToSmall(value);
    if (typeof value === "number") {
        if (sign) value = -value;
        return new SmallInteger(value);
    }
    return new BigInteger(value, sign);
}

function subtractSmall(a, b, sign) {
    // assumes a is array, b is number with 0 <= b < MAX_INT
    var l = a.length,
        r = new Array(l),
        carry = -b,
        base = BASE,
        i,
        difference;
    for (i = 0; i < l; i++) {
        difference = a[i] + carry;
        carry = Math.floor(difference / base);
        difference %= base;
        r[i] = difference < 0 ? difference + base : difference;
    }
    r = arrayToSmall(r);
    if (typeof r === "number") {
        if (sign) r = -r;
        return new SmallInteger(r);
    }return new BigInteger(r, sign);
}

BigInteger.prototype.subtract = function (v) {
    var n = parseValue(v);
    if (this.sign !== n.sign) {
        return this.add(n.negate());
    }
    var a = this.value,
        b = n.value;
    if (n.isSmall) return subtractSmall(a, Math.abs(b), this.sign);
    return subtractAny(a, b, this.sign);
};
BigInteger.prototype.minus = BigInteger.prototype.subtract;

SmallInteger.prototype.subtract = function (v) {
    var n = parseValue(v);
    var a = this.value;
    if (a < 0 !== n.sign) {
        return this.add(n.negate());
    }
    var b = n.value;
    if (n.isSmall) {
        return new SmallInteger(a - b);
    }
    return subtractSmall(b, Math.abs(a), a >= 0);
};
SmallInteger.prototype.minus = SmallInteger.prototype.subtract;

BigInteger.prototype.negate = function () {
    return new BigInteger(this.value, !this.sign);
};
SmallInteger.prototype.negate = function () {
    var sign = this.sign;
    var small = new SmallInteger(-this.value);
    small.sign = !sign;
    return small;
};

BigInteger.prototype.abs = function () {
    return new BigInteger(this.value, false);
};
SmallInteger.prototype.abs = function () {
    return new SmallInteger(Math.abs(this.value));
};

function multiplyLong(a, b) {
    var a_l = a.length,
        b_l = b.length,
        l = a_l + b_l,
        r = createArray(l),
        base = BASE,
        product,
        carry,
        i,
        a_i,
        b_j;
    for (i = 0; i < a_l; ++i) {
        a_i = a[i];
        for (var j = 0; j < b_l; ++j) {
            b_j = b[j];
            product = a_i * b_j + r[i + j];
            carry = Math.floor(product / base);
            r[i + j] = product - carry * base;
            r[i + j + 1] += carry;
        }
    }
    trim(r);
    return r;
}

function multiplySmall(a, b) {
    // assumes a is array, b is number with |b| < BASE
    var l = a.length,
        r = new Array(l),
        base = BASE,
        carry = 0,
        product,
        i;
    for (i = 0; i < l; i++) {
        product = a[i] * b + carry;
        carry = Math.floor(product / base);
        r[i] = product - carry * base;
    }
    while (carry > 0) {
        r[i++] = carry % base;
        carry = Math.floor(carry / base);
    }
    return r;
}

function shiftLeft(x, n) {
    var r = [];
    while (n-- > 0) {
        r.push(0);
    }return r.concat(x);
}

function multiplyKaratsuba(x, y) {
    var n = Math.max(x.length, y.length);

    if (n <= 30) return multiplyLong(x, y);
    n = Math.ceil(n / 2);

    var b = x.slice(n),
        a = x.slice(0, n),
        d = y.slice(n),
        c = y.slice(0, n);

    var ac = multiplyKaratsuba(a, c),
        bd = multiplyKaratsuba(b, d),
        abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));

    var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
    trim(product);
    return product;
}

// The following function is derived from a surface fit of a graph plotting the performance difference
// between long multiplication and karatsuba multiplication versus the lengths of the two arrays.
function useKaratsuba(l1, l2) {
    return -0.012 * l1 - 0.012 * l2 + 0.000015 * l1 * l2 > 0;
}

BigInteger.prototype.multiply = function (v) {
    var n = parseValue(v),
        a = this.value,
        b = n.value,
        sign = this.sign !== n.sign,
        abs;
    if (n.isSmall) {
        if (b === 0) return Integer[0];
        if (b === 1) return this;
        if (b === -1) return this.negate();
        abs = Math.abs(b);
        if (abs < BASE) {
            return new BigInteger(multiplySmall(a, abs), sign);
        }
        b = smallToArray(abs);
    }
    if (useKaratsuba(a.length, b.length)) // Karatsuba is only faster for certain array sizes
        return new BigInteger(multiplyKaratsuba(a, b), sign);
    return new BigInteger(multiplyLong(a, b), sign);
};

BigInteger.prototype.times = BigInteger.prototype.multiply;

function multiplySmallAndArray(a, b, sign) {
    // a >= 0
    if (a < BASE) {
        return new BigInteger(multiplySmall(b, a), sign);
    }
    return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
}
SmallInteger.prototype._multiplyBySmall = function (a) {
    if (isPrecise(a.value * this.value)) {
        return new SmallInteger(a.value * this.value);
    }
    return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
};
BigInteger.prototype._multiplyBySmall = function (a) {
    if (a.value === 0) return Integer[0];
    if (a.value === 1) return this;
    if (a.value === -1) return this.negate();
    return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
};
SmallInteger.prototype.multiply = function (v) {
    return parseValue(v)._multiplyBySmall(this);
};
SmallInteger.prototype.times = SmallInteger.prototype.multiply;

function square(a) {
    var l = a.length,
        r = createArray(l + l),
        base = BASE,
        product,
        carry,
        i,
        a_i,
        a_j;
    for (i = 0; i < l; i++) {
        a_i = a[i];
        for (var j = 0; j < l; j++) {
            a_j = a[j];
            product = a_i * a_j + r[i + j];
            carry = Math.floor(product / base);
            r[i + j] = product - carry * base;
            r[i + j + 1] += carry;
        }
    }
    trim(r);
    return r;
}

BigInteger.prototype.square = function () {
    return new BigInteger(square(this.value), false);
};

SmallInteger.prototype.square = function () {
    var value = this.value * this.value;
    if (isPrecise(value)) return new SmallInteger(value);
    return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
};

function divMod1(a, b) {
    // Left over from previous version. Performs faster than divMod2 on smaller input sizes.
    var a_l = a.length,
        b_l = b.length,
        base = BASE,
        result = createArray(b.length),
        divisorMostSignificantDigit = b[b_l - 1],

    // normalization
    lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
        remainder = multiplySmall(a, lambda),
        divisor = multiplySmall(b, lambda),
        quotientDigit,
        shift,
        carry,
        borrow,
        i,
        l,
        q;
    if (remainder.length <= a_l) remainder.push(0);
    divisor.push(0);
    divisorMostSignificantDigit = divisor[b_l - 1];
    for (shift = a_l - b_l; shift >= 0; shift--) {
        quotientDigit = base - 1;
        if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
            quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
        }
        // quotientDigit <= base - 1
        carry = 0;
        borrow = 0;
        l = divisor.length;
        for (i = 0; i < l; i++) {
            carry += quotientDigit * divisor[i];
            q = Math.floor(carry / base);
            borrow += remainder[shift + i] - (carry - q * base);
            carry = q;
            if (borrow < 0) {
                remainder[shift + i] = borrow + base;
                borrow = -1;
            } else {
                remainder[shift + i] = borrow;
                borrow = 0;
            }
        }
        while (borrow !== 0) {
            quotientDigit -= 1;
            carry = 0;
            for (i = 0; i < l; i++) {
                carry += remainder[shift + i] - base + divisor[i];
                if (carry < 0) {
                    remainder[shift + i] = carry + base;
                    carry = 0;
                } else {
                    remainder[shift + i] = carry;
                    carry = 1;
                }
            }
            borrow += carry;
        }
        result[shift] = quotientDigit;
    }
    // denormalization
    remainder = divModSmall(remainder, lambda)[0];
    return [arrayToSmall(result), arrayToSmall(remainder)];
}

function divMod2(a, b) {
    // Implementation idea shamelessly stolen from Silent Matt's library http://silentmatt.com/biginteger/
    // Performs faster than divMod1 on larger input sizes.
    var a_l = a.length,
        b_l = b.length,
        result = [],
        part = [],
        base = BASE,
        guess,
        xlen,
        highx,
        highy,
        check;
    while (a_l) {
        part.unshift(a[--a_l]);
        trim(part);
        if (compareAbs(part, b) < 0) {
            result.push(0);
            continue;
        }
        xlen = part.length;
        highx = part[xlen - 1] * base + part[xlen - 2];
        highy = b[b_l - 1] * base + b[b_l - 2];
        if (xlen > b_l) {
            highx = (highx + 1) * base;
        }
        guess = Math.ceil(highx / highy);
        do {
            check = multiplySmall(b, guess);
            if (compareAbs(check, part) <= 0) break;
            guess--;
        } while (guess);
        result.push(guess);
        part = subtract(part, check);
    }
    result.reverse();
    return [arrayToSmall(result), arrayToSmall(part)];
}

function divModSmall(value, lambda) {
    var length = value.length,
        quotient = createArray(length),
        base = BASE,
        i,
        q,
        remainder,
        divisor;
    remainder = 0;
    for (i = length - 1; i >= 0; --i) {
        divisor = remainder * base + value[i];
        q = truncate(divisor / lambda);
        remainder = divisor - q * lambda;
        quotient[i] = q | 0;
    }
    return [quotient, remainder | 0];
}

function divModAny(self, v) {
    var value,
        n = parseValue(v);
    var a = self.value,
        b = n.value;
    var quotient;
    if (b === 0) throw new Error("Cannot divide by zero");
    if (self.isSmall) {
        if (n.isSmall) {
            return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
        }
        return [Integer[0], self];
    }
    if (n.isSmall) {
        if (b === 1) return [self, Integer[0]];
        if (b == -1) return [self.negate(), Integer[0]];
        var abs = Math.abs(b);
        if (abs < BASE) {
            value = divModSmall(a, abs);
            quotient = arrayToSmall(value[0]);
            var remainder = value[1];
            if (self.sign) remainder = -remainder;
            if (typeof quotient === "number") {
                if (self.sign !== n.sign) quotient = -quotient;
                return [new SmallInteger(quotient), new SmallInteger(remainder)];
            }
            return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
        }
        b = smallToArray(abs);
    }
    var comparison = compareAbs(a, b);
    if (comparison === -1) return [Integer[0], self];
    if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];

    // divMod1 is faster on smaller input sizes
    if (a.length + b.length <= 200) value = divMod1(a, b);else value = divMod2(a, b);

    quotient = value[0];
    var qSign = self.sign !== n.sign,
        mod = value[1],
        mSign = self.sign;
    if (typeof quotient === "number") {
        if (qSign) quotient = -quotient;
        quotient = new SmallInteger(quotient);
    } else quotient = new BigInteger(quotient, qSign);
    if (typeof mod === "number") {
        if (mSign) mod = -mod;
        mod = new SmallInteger(mod);
    } else mod = new BigInteger(mod, mSign);
    return [quotient, mod];
}

BigInteger.prototype.divmod = function (v) {
    var result = divModAny(this, v);
    return {
        quotient: result[0],
        remainder: result[1]
    };
};
SmallInteger.prototype.divmod = BigInteger.prototype.divmod;

BigInteger.prototype.divide = function (v) {
    return divModAny(this, v)[0];
};
SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;

BigInteger.prototype.mod = function (v) {
    return divModAny(this, v)[1];
};
SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;

BigInteger.prototype.pow = function (v) {
    var n = parseValue(v),
        a = this.value,
        b = n.value,
        value,
        x,
        y;
    if (b === 0) return Integer[1];
    if (a === 0) return Integer[0];
    if (a === 1) return Integer[1];
    if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
    if (n.sign) {
        return Integer[0];
    }
    if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
    if (this.isSmall) {
        if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate(value));
    }
    x = this;
    y = Integer[1];
    while (true) {
        if (b & 1 === 1) {
            y = y.times(x);
            --b;
        }
        if (b === 0) break;
        b /= 2;
        x = x.square();
    }
    return y;
};
SmallInteger.prototype.pow = BigInteger.prototype.pow;

BigInteger.prototype.modPow = function (exp, mod) {
    exp = parseValue(exp);
    mod = parseValue(mod);
    if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
    var r = Integer[1],
        base = this.mod(mod);
    while (exp.isPositive()) {
        if (base.isZero()) return Integer[0];
        if (exp.isOdd()) r = r.multiply(base).mod(mod);
        exp = exp.divide(2);
        base = base.square().mod(mod);
    }
    return r;
};
SmallInteger.prototype.modPow = BigInteger.prototype.modPow;

function compareAbs(a, b) {
    if (a.length !== b.length) {
        return a.length > b.length ? 1 : -1;
    }
    for (var i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
    }
    return 0;
}

BigInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
        a = this.value,
        b = n.value;
    if (n.isSmall) return 1;
    return compareAbs(a, b);
};
SmallInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
        a = Math.abs(this.value),
        b = n.value;
    if (n.isSmall) {
        b = Math.abs(b);
        return a === b ? 0 : a > b ? 1 : -1;
    }
    return -1;
};

BigInteger.prototype.compare = function (v) {
    // See discussion about comparison with Infinity:
    // https://github.com/peterolson/BigInteger.js/issues/61
    if (v === Infinity) {
        return -1;
    }
    if (v === -Infinity) {
        return 1;
    }

    var n = parseValue(v),
        a = this.value,
        b = n.value;
    if (this.sign !== n.sign) {
        return n.sign ? 1 : -1;
    }
    if (n.isSmall) {
        return this.sign ? -1 : 1;
    }
    return compareAbs(a, b) * (this.sign ? -1 : 1);
};
BigInteger.prototype.compareTo = BigInteger.prototype.compare;

SmallInteger.prototype.compare = function (v) {
    if (v === Infinity) {
        return -1;
    }
    if (v === -Infinity) {
        return 1;
    }

    var n = parseValue(v),
        a = this.value,
        b = n.value;
    if (n.isSmall) {
        return a == b ? 0 : a > b ? 1 : -1;
    }
    if (a < 0 !== n.sign) {
        return a < 0 ? -1 : 1;
    }
    return a < 0 ? 1 : -1;
};
SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;

BigInteger.prototype.equals = function (v) {
    return this.compare(v) === 0;
};
SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;

BigInteger.prototype.notEquals = function (v) {
    return this.compare(v) !== 0;
};
SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;

BigInteger.prototype.greater = function (v) {
    return this.compare(v) > 0;
};
SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;

BigInteger.prototype.lesser = function (v) {
    return this.compare(v) < 0;
};
SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;

BigInteger.prototype.greaterOrEquals = function (v) {
    return this.compare(v) >= 0;
};
SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;

BigInteger.prototype.lesserOrEquals = function (v) {
    return this.compare(v) <= 0;
};
SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;

BigInteger.prototype.isEven = function () {
    return (this.value[0] & 1) === 0;
};
SmallInteger.prototype.isEven = function () {
    return (this.value & 1) === 0;
};

BigInteger.prototype.isOdd = function () {
    return (this.value[0] & 1) === 1;
};
SmallInteger.prototype.isOdd = function () {
    return (this.value & 1) === 1;
};

BigInteger.prototype.isPositive = function () {
    return !this.sign;
};
SmallInteger.prototype.isPositive = function () {
    return this.value > 0;
};

BigInteger.prototype.isNegative = function () {
    return this.sign;
};
SmallInteger.prototype.isNegative = function () {
    return this.value < 0;
};

BigInteger.prototype.isUnit = function () {
    return false;
};
SmallInteger.prototype.isUnit = function () {
    return Math.abs(this.value) === 1;
};

BigInteger.prototype.isZero = function () {
    return false;
};
SmallInteger.prototype.isZero = function () {
    return this.value === 0;
};
BigInteger.prototype.isDivisibleBy = function (v) {
    var n = parseValue(v);
    var value = n.value;
    if (value === 0) return false;
    if (value === 1) return true;
    if (value === 2) return this.isEven();
    return this.mod(n).equals(Integer[0]);
};
SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;

function isBasicPrime(v) {
    var n = v.abs();
    if (n.isUnit()) return false;
    if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
    if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
    if (n.lesser(25)) return true;
    // we don't know if it's prime: let the other functions figure it out
}

BigInteger.prototype.isPrime = function () {
    var isPrime = isBasicPrime(this);
    if (isPrime !== undefined) return isPrime;
    var n = this.abs(),
        nPrev = n.prev();
    var a = [2, 3, 5, 7, 11, 13, 17, 19],
        b = nPrev,
        d,
        t,
        i,
        x;
    while (b.isEven()) {
        b = b.divide(2);
    }for (i = 0; i < a.length; i++) {
        x = bigInt(a[i]).modPow(b, n);
        if (x.equals(Integer[1]) || x.equals(nPrev)) continue;
        for (t = true, d = b; t && d.lesser(nPrev); d = d.multiply(2)) {
            x = x.square().mod(n);
            if (x.equals(nPrev)) t = false;
        }
        if (t) return false;
    }
    return true;
};
SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;

BigInteger.prototype.isProbablePrime = function (iterations) {
    var isPrime = isBasicPrime(this);
    if (isPrime !== undefined) return isPrime;
    var n = this.abs();
    var t = iterations === undefined ? 5 : iterations;
    // use the Fermat primality test
    for (var i = 0; i < t; i++) {
        var a = bigInt.randBetween(2, n.minus(2));
        if (!a.modPow(n.prev(), n).isUnit()) return false; // definitely composite
    }
    return true; // large chance of being prime
};
SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;

BigInteger.prototype.modInv = function (n) {
    var t = bigInt.zero,
        newT = bigInt.one,
        r = parseValue(n),
        newR = this.abs(),
        q,
        lastT,
        lastR;
    while (!newR.equals(bigInt.zero)) {
        q = r.divide(newR);
        lastT = t;
        lastR = r;
        t = newT;
        r = newR;
        newT = lastT.subtract(q.multiply(newT));
        newR = lastR.subtract(q.multiply(newR));
    }
    if (!r.equals(1)) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
    if (t.compare(0) === -1) {
        t = t.add(n);
    }
    if (this.isNegative()) {
        return t.negate();
    }
    return t;
};

SmallInteger.prototype.modInv = BigInteger.prototype.modInv;

BigInteger.prototype.next = function () {
    var value = this.value;
    if (this.sign) {
        return subtractSmall(value, 1, this.sign);
    }
    return new BigInteger(addSmall(value, 1), this.sign);
};
SmallInteger.prototype.next = function () {
    var value = this.value;
    if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
    return new BigInteger(MAX_INT_ARR, false);
};

BigInteger.prototype.prev = function () {
    var value = this.value;
    if (this.sign) {
        return new BigInteger(addSmall(value, 1), true);
    }
    return subtractSmall(value, 1, this.sign);
};
SmallInteger.prototype.prev = function () {
    var value = this.value;
    if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
    return new BigInteger(MAX_INT_ARR, true);
};

var powersOfTwo = [1];
while (powersOfTwo[powersOfTwo.length - 1] <= BASE) {
    powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
}var powers2Length = powersOfTwo.length,
    highestPower2 = powersOfTwo[powers2Length - 1];

function shift_isSmall(n) {
    return (typeof n === "number" || typeof n === "string") && +Math.abs(n) <= BASE || n instanceof BigInteger && n.value.length <= 1;
}

BigInteger.prototype.shiftLeft = function (n) {
    if (!shift_isSmall(n)) {
        throw new Error(String(n) + " is too large for shifting.");
    }
    n = +n;
    if (n < 0) return this.shiftRight(-n);
    var result = this;
    while (n >= powers2Length) {
        result = result.multiply(highestPower2);
        n -= powers2Length - 1;
    }
    return result.multiply(powersOfTwo[n]);
};
SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;

BigInteger.prototype.shiftRight = function (n) {
    var remQuo;
    if (!shift_isSmall(n)) {
        throw new Error(String(n) + " is too large for shifting.");
    }
    n = +n;
    if (n < 0) return this.shiftLeft(-n);
    var result = this;
    while (n >= powers2Length) {
        if (result.isZero()) return result;
        remQuo = divModAny(result, highestPower2);
        result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
        n -= powers2Length - 1;
    }
    remQuo = divModAny(result, powersOfTwo[n]);
    return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
};
SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;

function bitwise(x, y, fn) {
    y = parseValue(y);
    var xSign = x.isNegative(),
        ySign = y.isNegative();
    var xRem = xSign ? x.not() : x,
        yRem = ySign ? y.not() : y;
    var xBits = [],
        yBits = [];
    var xStop = false,
        yStop = false;
    while (!xStop || !yStop) {
        if (xRem.isZero()) {
            // virtual sign extension for simulating two's complement
            xStop = true;
            xBits.push(xSign ? 1 : 0);
        } else if (xSign) xBits.push(xRem.isEven() ? 1 : 0); // two's complement for negative numbers
        else xBits.push(xRem.isEven() ? 0 : 1);

        if (yRem.isZero()) {
            yStop = true;
            yBits.push(ySign ? 1 : 0);
        } else if (ySign) yBits.push(yRem.isEven() ? 1 : 0);else yBits.push(yRem.isEven() ? 0 : 1);

        xRem = xRem.over(2);
        yRem = yRem.over(2);
    }
    var result = [];
    for (var i = 0; i < xBits.length; i++) {
        result.push(fn(xBits[i], yBits[i]));
    }var sum = bigInt(result.pop()).negate().times(bigInt(2).pow(result.length));
    while (result.length) {
        sum = sum.add(bigInt(result.pop()).times(bigInt(2).pow(result.length)));
    }
    return sum;
}

BigInteger.prototype.not = function () {
    return this.negate().prev();
};
SmallInteger.prototype.not = BigInteger.prototype.not;

BigInteger.prototype.and = function (n) {
    return bitwise(this, n, function (a, b) {
        return a & b;
    });
};
SmallInteger.prototype.and = BigInteger.prototype.and;

BigInteger.prototype.or = function (n) {
    return bitwise(this, n, function (a, b) {
        return a | b;
    });
};
SmallInteger.prototype.or = BigInteger.prototype.or;

BigInteger.prototype.xor = function (n) {
    return bitwise(this, n, function (a, b) {
        return a ^ b;
    });
};
SmallInteger.prototype.xor = BigInteger.prototype.xor;

var LOBMASK_I = 1 << 30,
    LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
function roughLOB(n) {
    // get lowestOneBit (rough)
    // SmallInteger: return Min(lowestOneBit(n), 1 << 30)
    // BigInteger: return Min(lowestOneBit(n), 1 << 14) [BASE=1e7]
    var v = n.value,
        x = typeof v === "number" ? v | LOBMASK_I : v[0] + v[1] * BASE | LOBMASK_BI;
    return x & -x;
}

function max(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    return a.greater(b) ? a : b;
}
function min(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    return a.lesser(b) ? a : b;
}
function gcd(a, b) {
    a = parseValue(a).abs();
    b = parseValue(b).abs();
    if (a.equals(b)) return a;
    if (a.isZero()) return b;
    if (b.isZero()) return a;
    var c = Integer[1],
        d,
        t;
    while (a.isEven() && b.isEven()) {
        d = Math.min(roughLOB(a), roughLOB(b));
        a = a.divide(d);
        b = b.divide(d);
        c = c.multiply(d);
    }
    while (a.isEven()) {
        a = a.divide(roughLOB(a));
    }
    do {
        while (b.isEven()) {
            b = b.divide(roughLOB(b));
        }
        if (a.greater(b)) {
            t = b;b = a;a = t;
        }
        b = b.subtract(a);
    } while (!b.isZero());
    return c.isUnit() ? a : a.multiply(c);
}
function lcm(a, b) {
    a = parseValue(a).abs();
    b = parseValue(b).abs();
    return a.divide(gcd(a, b)).multiply(b);
}
function randBetween(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    var low = min(a, b),
        high = max(a, b);
    var range = high.subtract(low);
    if (range.isSmall) return low.add(Math.round(Math.random() * range));
    var length = range.value.length - 1;
    var result = [],
        restricted = true;
    for (var i = length; i >= 0; i--) {
        var top = restricted ? range.value[i] : BASE;
        var digit = truncate(Math.random() * top);
        result.unshift(digit);
        if (digit < top) restricted = false;
    }
    result = arrayToSmall(result);
    return low.add(typeof result === "number" ? new SmallInteger(result) : new BigInteger(result, false));
}
var parseBase = function parseBase(text, base) {
    var length = text.length;
    var i;
    var absBase = Math.abs(base);
    for (var i = 0; i < length; i++) {
        var c = text[i].toLowerCase();
        if (c === "-") continue;
        if (/[a-z0-9]/.test(c)) {
            if (/[0-9]/.test(c) && +c >= absBase) {
                if (c === "1" && absBase === 1) continue;
                throw new Error(c + " is not a valid digit in base " + base + ".");
            } else if (c.charCodeAt(0) - 87 >= absBase) {
                throw new Error(c + " is not a valid digit in base " + base + ".");
            }
        }
    }
    if (2 <= base && base <= 36) {
        if (length <= LOG_MAX_INT / Math.log(base)) {
            var result = parseInt(text, base);
            if (isNaN(result)) {
                throw new Error(c + " is not a valid digit in base " + base + ".");
            }
            return new SmallInteger(parseInt(text, base));
        }
    }
    base = parseValue(base);
    var digits = [];
    var isNegative = text[0] === "-";
    for (i = isNegative ? 1 : 0; i < text.length; i++) {
        var c = text[i].toLowerCase(),
            charCode = c.charCodeAt(0);
        if (48 <= charCode && charCode <= 57) digits.push(parseValue(c));else if (97 <= charCode && charCode <= 122) digits.push(parseValue(c.charCodeAt(0) - 87));else if (c === "<") {
            var start = i;
            do {
                i++;
            } while (text[i] !== ">");
            digits.push(parseValue(text.slice(start + 1, i)));
        } else throw new Error(c + " is not a valid character");
    }
    return parseBaseFromArray(digits, base, isNegative);
};

function parseBaseFromArray(digits, base, isNegative) {
    var val = Integer[0],
        pow = Integer[1],
        i;
    for (i = digits.length - 1; i >= 0; i--) {
        val = val.add(digits[i].times(pow));
        pow = pow.times(base);
    }
    return isNegative ? val.negate() : val;
}

function stringify(digit) {
    var v = digit.value;
    if (typeof v === "number") v = [v];
    if (v.length === 1 && v[0] <= 35) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(v[0]);
    }
    return "<" + v + ">";
}
function toBase(n, base) {
    base = bigInt(base);
    if (base.isZero()) {
        if (n.isZero()) return "0";
        throw new Error("Cannot convert nonzero numbers to base 0.");
    }
    if (base.equals(-1)) {
        if (n.isZero()) return "0";
        if (n.isNegative()) return new Array(1 - n).join("10");
        return "1" + new Array(+n).join("01");
    }
    var minusSign = "";
    if (n.isNegative() && base.isPositive()) {
        minusSign = "-";
        n = n.abs();
    }
    if (base.equals(1)) {
        if (n.isZero()) return "0";
        return minusSign + new Array(+n + 1).join(1);
    }
    var out = [];
    var left = n,
        divmod;
    while (left.isNegative() || left.compareAbs(base) >= 0) {
        divmod = left.divmod(base);
        left = divmod.quotient;
        var digit = divmod.remainder;
        if (digit.isNegative()) {
            digit = base.minus(digit).abs();
            left = left.next();
        }
        out.push(stringify(digit));
    }
    out.push(stringify(left));
    return minusSign + out.reverse().join("");
}

BigInteger.prototype.toString = function (radix) {
    if (radix === undefined) radix = 10;
    if (radix !== 10) return toBase(this, radix);
    var v = this.value,
        l = v.length,
        str = String(v[--l]),
        zeros = "0000000",
        digit;
    while (--l >= 0) {
        digit = String(v[l]);
        str += zeros.slice(digit.length) + digit;
    }
    var sign = this.sign ? "-" : "";
    return sign + str;
};
SmallInteger.prototype.toString = function (radix) {
    if (radix === undefined) radix = 10;
    if (radix != 10) return toBase(this, radix);
    return String(this.value);
};

BigInteger.prototype.valueOf = function () {
    return +this.toString();
};
BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;

SmallInteger.prototype.valueOf = function () {
    return this.value;
};
SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;

function parseStringValue(v) {
    if (isPrecise(+v)) {
        var x = +v;
        if (x === truncate(x)) return new SmallInteger(x);
        throw "Invalid integer: " + v;
    }
    var sign = v[0] === "-";
    if (sign) v = v.slice(1);
    var split = v.split(/e/i);
    if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
    if (split.length === 2) {
        var exp = split[1];
        if (exp[0] === "+") exp = exp.slice(1);
        exp = +exp;
        if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
        var text = split[0];
        var decimalPlace = text.indexOf(".");
        if (decimalPlace >= 0) {
            exp -= text.length - decimalPlace - 1;
            text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
        }
        if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
        text += new Array(exp + 1).join("0");
        v = text;
    }
    var isValid = /^([0-9][0-9]*)$/.test(v);
    if (!isValid) throw new Error("Invalid integer: " + v);
    var r = [],
        max = v.length,
        l = LOG_BASE,
        min = max - l;
    while (max > 0) {
        r.push(+v.slice(min, max));
        min -= l;
        if (min < 0) min = 0;
        max -= l;
    }
    trim(r);
    return new BigInteger(r, sign);
}

function parseNumberValue(v) {
    if (isPrecise(v)) {
        if (v !== truncate(v)) throw new Error(v + " is not an integer.");
        return new SmallInteger(v);
    }
    return parseStringValue(v.toString());
}

function parseValue(v) {
    if (typeof v === "number") {
        return parseNumberValue(v);
    }
    if (typeof v === "string") {
        return parseStringValue(v);
    }
    return v;
}
// Pre-define numbers in range [-999,999]
for (var i = 0; i < 1000; i++) {
    Integer[i] = new SmallInteger(i);
    if (i > 0) Integer[-i] = new SmallInteger(-i);
}
// Backwards compatibility
Integer.one = Integer[1];
Integer.zero = Integer[0];
Integer.minusOne = Integer[-1];
Integer.max = max;
Integer.min = min;
Integer.gcd = gcd;
Integer.lcm = lcm;
Integer.isInstance = function (x) {
    return x instanceof BigInteger || x instanceof SmallInteger;
};
Integer.randBetween = randBetween;

Integer.fromArray = function (digits, base, isNegative) {
    return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parser = __webpack_require__(15);

var _linter = __webpack_require__(17);

var _symtable = __webpack_require__(8);

var _compiler = __webpack_require__(19);

var _runtime = __webpack_require__(4);

var _vm = __webpack_require__(20);

var _reader = __webpack_require__(6);

var _token = __webpack_require__(3);

var _ast = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* This module is a façade for all the combined functionality of the
 * parser/compiler/vm
 */

function tok(tag, value) {
  return new _token.Token(tag, value, _reader.UnknownPosition, _reader.UnknownPosition);
}

var Runner = exports.Runner = function () {
  function Runner() {
    _classCallCheck(this, Runner);

    this.initialize();
  }

  _createClass(Runner, [{
    key: 'initialize',
    value: function initialize() {
      this._ast = null;
      this._primitives = new _runtime.RuntimePrimitives();
      this._symtable = this._newSymtableWithPrimitives();
      this._linter = new _linter.Linter(this._symtable);
      this._code = null;
      this._vm = null;
      this._result = null;
    }

    /* Parse, compile, and run a program in the default global state
     * (typically an empty 9x9 board in Gobstones).
     * Return the return value of the program, ignoring the final state.
     * A GbsInterpreterException may be thrown.
     */

  }, {
    key: 'run',
    value: function run(input) {
      return this.runState(input, new _runtime.RuntimeState()).result;
    }

    /* Parse, compile, and run a program in the given initial state.
     * Return an object of the form
     *   {'result': r, 'state': s]
     * where r is the result of the program and s is the final state.
     * A GbsInterpreterException may be thrown.
     */

  }, {
    key: 'runState',
    value: function runState(input, initialState) {
      this.parse(input);
      this.lint();
      this.compile();
      this.execute(initialState);
      return { 'result': this._result, 'state': this._vm.globalState() };
    }
  }, {
    key: 'parse',
    value: function parse(input) {
      var parser = new _parser.Parser(input);
      this._ast = parser.parse();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parser.getLanguageOptions()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var option = _step.value;

          this._setLanguageOption(option);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'enableLintCheck',
    value: function enableLintCheck(linterCheckId, enabled) {
      this._linter.enableCheck(linterCheckId, enabled);
    }
  }, {
    key: 'lint',
    value: function lint() {
      this._symtable = this._linter.lint(this._ast);
    }
  }, {
    key: 'compile',
    value: function compile() {
      this._code = new _compiler.Compiler(this._symtable).compile(this._ast);
    }
  }, {
    key: 'initializeVirtualMachine',
    value: function initializeVirtualMachine(initialState) {
      this._vm = new _vm.VirtualMachine(this._code, initialState);
    }
  }, {
    key: 'execute',
    value: function execute(initialState) {
      this.executeWithTimeout(initialState, 0);
    }
  }, {
    key: 'executeWithTimeout',
    value: function executeWithTimeout(initialState, millisecs) {
      this.executeWithTimeoutTakingSnapshots(initialState, millisecs, null);
    }
  }, {
    key: 'executeWithTimeoutTakingSnapshots',
    value: function executeWithTimeoutTakingSnapshots(initialState, millisecs, snapshotCallback) {
      this.initializeVirtualMachine(initialState);
      this._result = this._vm.runWithTimeoutTakingSnapshots(millisecs, snapshotCallback);
    }
  }, {
    key: 'executeEventWithTimeout',
    value: function executeEventWithTimeout(eventValue, millisecs) {
      this._result = this._vm.runEventWithTimeout(eventValue, millisecs);
    }
  }, {
    key: '_setLanguageOption',


    /* Evaluate language options set by the LANGUAGE pragma */
    value: function _setLanguageOption(option) {
      if (option === 'DestructuringForeach') {
        this.enableLintCheck('forbidden-extension-destructuring-foreach', false);
      } else if (option === 'AllowRecursion') {
        this.enableLintCheck('forbidden-extension-allow-recursion', false);
      } else {
        throw Error('Unknown language option: ' + option);
      }
    }

    /* Dynamic stack of regions */

  }, {
    key: 'regionStack',
    value: function regionStack() {
      return this._vm.regionStack();
    }

    /* Create a new symbol table, including definitions for all the primitive
     * types and operations (which come from RuntimePrimitives) */

  }, {
    key: '_newSymtableWithPrimitives',
    value: function _newSymtableWithPrimitives() {
      var symtable = new _symtable.SymbolTable();

      /* Populate symbol table with primitive types */
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._primitives.types()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var type = _step2.value;

          symtable.defType(this._astDefType(type));
        }

        /* Populate symbol table with primitive procedures */
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._primitives.procedures()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var procedureName = _step3.value;

          symtable.defProcedure(this._astDefProcedure(procedureName));
        }

        /* Populate symbol table with primitive functions */
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._primitives.functions()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var functionName = _step4.value;

          symtable.defFunction(this._astDefFunction(functionName));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return symtable;
    }
  }, {
    key: '_astDefType',
    value: function _astDefType(type) {
      var constructorDeclarations = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._primitives.typeConstructors(type)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _constructor = _step5.value;

          constructorDeclarations.push(this._astConstructorDeclaration(type, _constructor));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return new _ast.ASTDefType(tok(_token.T_UPPERID, type), constructorDeclarations);
    }
  }, {
    key: '_astDefProcedure',
    value: function _astDefProcedure(procedureName) {
      var nargs = this._primitives.getOperation(procedureName).nargs();
      var parameters = [];
      for (var i = 1; i <= nargs; i++) {
        parameters.push(tok(_token.T_LOWERID, 'x' + i.toString()));
      }
      return new _ast.ASTDefProcedure(tok(_token.T_LOWERID, procedureName), parameters, new _ast.ASTStmtBlock([]));
    }
  }, {
    key: '_astDefFunction',
    value: function _astDefFunction(functionName) {
      var nargs = this._primitives.getOperation(functionName).nargs();
      var parameters = [];
      for (var i = 1; i <= nargs; i++) {
        parameters.push(tok(_token.T_LOWERID, 'x' + i.toString()));
      }
      return new _ast.ASTDefFunction(tok(_token.T_LOWERID, functionName), parameters, new _ast.ASTStmtBlock([]));
    }
  }, {
    key: '_astConstructorDeclaration',
    value: function _astConstructorDeclaration(type, constructor) {
      var fields = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this._primitives.constructorFields(type, constructor)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var field = _step6.value;

          fields.push(tok(_token.T_LOWERID, field));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return new _ast.ASTConstructorDeclaration(tok(_token.T_UPPERID, constructor), fields);
    }
  }, {
    key: 'abstractSyntaxTree',
    get: function get() {
      return this._ast;
    }
  }, {
    key: 'primitives',
    get: function get() {
      return this._primitives;
    }
  }, {
    key: 'symbolTable',
    get: function get() {
      return this._symtable;
    }
  }, {
    key: 'virtualMachineCode',
    get: function get() {
      return this._code;
    }
  }, {
    key: 'result',
    get: function get() {
      return this._result;
    }
  }, {
    key: 'globalState',
    get: function get() {
      return this._vm.globalState();
    }
  }]);

  return Runner;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exceptions = __webpack_require__(1);

var _lexer = __webpack_require__(16);

var _i18n = __webpack_require__(0);

var _token = __webpack_require__(3);

var _ast = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Infix = Symbol.for('Infix');
var InfixL = Symbol.for('InfixL');
var InfixR = Symbol.for('InfixR');
var Prefix = Symbol.for('Prefix');

var PrecedenceLevel = function () {
  /* Operators should be a dictionary mapping operator tags to
   * their function names */
  function PrecedenceLevel(fixity, operators) {
    _classCallCheck(this, PrecedenceLevel);

    this._fixity = fixity;
    this._operators = operators;
  }

  _createClass(PrecedenceLevel, [{
    key: 'isOperator',
    value: function isOperator(token) {
      return Symbol.keyFor(token.tag) in this._operators;
    }
  }, {
    key: 'functionName',
    value: function functionName(token) {
      return new _token.Token(_token.T_LOWERID, this._operators[Symbol.keyFor(token.tag)], token.startPos, token.endPos);
    }
  }, {
    key: 'fixity',
    get: function get() {
      return this._fixity;
    }
  }]);

  return PrecedenceLevel;
}();

/* OPERATORS is a list of precedence levels.
 * Precedence levels are ordered from lesser to greater precedence.
 */


var OPERATORS = [
/* Logical operators */
new PrecedenceLevel(InfixR, {
  'T_OR': '||'
}), new PrecedenceLevel(InfixR, {
  'T_AND': '&&'
}), new PrecedenceLevel(Prefix, {
  'T_NOT': 'not'
}),
/* Relational operators */
new PrecedenceLevel(Infix, {
  'T_EQ': '==',
  'T_NE': '/=',
  'T_LE': '<=',
  'T_GE': '>=',
  'T_LT': '<',
  'T_GT': '>'
}),
/* List concatenation */
new PrecedenceLevel(InfixL, {
  'T_CONCAT': '++'
}),
/* Additive operators */
new PrecedenceLevel(InfixL, {
  'T_PLUS': '+',
  'T_MINUS': '-'
}),
/* Multiplicative operators */
new PrecedenceLevel(InfixL, {
  'T_TIMES': '*'
}),
/* Division operators */
new PrecedenceLevel(InfixL, {
  'T_DIV': 'div',
  'T_MOD': 'mod'
}),
/* Exponential operators */
new PrecedenceLevel(InfixR, {
  'T_POW': '^'
}),
/* Unary minus */
new PrecedenceLevel(Prefix, {
  'T_MINUS': '-(unary)'
})];

function fail(startPos, endPos, reason, args) {
  throw new _exceptions.GbsSyntaxError(startPos, endPos, reason, args);
}

/* Represents a parser for a Gobstones/XGobstones program.
 * It is structured as a straightforward recursive-descent parser.
 *
 * The parameter 'input' may be either a string or a dictionary
 * mapping filenames to strings.
 *
 * All the "parseFoo" methods agree to the following convention:
 * - parseFoo returns an AST for a Foo construction,
 * - parseFoo consumes a fragment of the input by successively requesting
 *   the next token from the lexer,
 * - when calling parseFoo, the current token should already be located
 *   on the first token of the corresponding construction,
 * - when parseFoo returns, the current token is already located on
 *   the following token, after the corresponding construction.
 */

var Parser = exports.Parser = function () {
  function Parser(input) {
    _classCallCheck(this, Parser);

    this._lexer = new _lexer.Lexer(input);
    this._nextToken();
  }

  /* Return the AST that results from parsing a full program */


  _createClass(Parser, [{
    key: 'parse',
    value: function parse() {
      var definitions = [];
      while (this._currentToken.tag !== _token.T_EOF) {
        definitions.push(this._parseDefinition());
      }
      return new _ast.ASTMain(definitions);
    }

    /* Return the list of all language options collected by the tokenizer.
     * Language options are set by the LANGUAGE pragma. */

  }, {
    key: 'getLanguageOptions',
    value: function getLanguageOptions() {
      return this._lexer.getLanguageOptions();
    }

    /** Definitions **/

  }, {
    key: '_parseDefinition',
    value: function _parseDefinition() {
      switch (this._currentToken.tag) {
        case _token.T_PROGRAM:
          return this._parseDefProgram();
        case _token.T_INTERACTIVE:
          return this._parseDefInteractiveProgram();
        case _token.T_PROCEDURE:
          return this._parseDefProcedure();
        case _token.T_FUNCTION:
          return this._parseDefFunction();
        case _token.T_TYPE:
          return this._parseDefType();
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('definition'), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }
  }, {
    key: '_parseDefProgram',
    value: function _parseDefProgram() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_PROGRAM);
      var attributes = this._lexer.getPendingAttributes();
      var block = this._parseStmtBlock();
      var result = new _ast.ASTDefProgram(block);
      result.startPos = startPos;
      result.endPos = block.endPos;
      result.attributes = attributes;
      return result;
    }
  }, {
    key: '_parseDefInteractiveProgram',
    value: function _parseDefInteractiveProgram() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_INTERACTIVE);
      this._match(_token.T_PROGRAM);
      var attributes = this._lexer.getPendingAttributes();
      this._match(_token.T_LBRACE);
      var branches = this._parseSwitchBranches();
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RBRACE);
      var result = new _ast.ASTDefInteractiveProgram(branches);
      result.startPos = startPos;
      result.endPos = endPos;
      result.attributes = attributes;
      return result;
    }
  }, {
    key: '_parseDefProcedure',
    value: function _parseDefProcedure() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_PROCEDURE);
      var name = this._parseUpperid();
      this._match(_token.T_LPAREN);
      var parameters = this._parseLoweridSeq();
      this._match(_token.T_RPAREN);
      var attributes = this._lexer.getPendingAttributes();
      var block = this._parseStmtBlock();
      var result = new _ast.ASTDefProcedure(name, parameters, block);
      result.startPos = startPos;
      result.endPos = block.endPos;
      result.attributes = attributes;
      return result;
    }
  }, {
    key: '_parseDefFunction',
    value: function _parseDefFunction() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_FUNCTION);
      var name = this._currentToken;
      this._match(_token.T_LOWERID);
      this._match(_token.T_LPAREN);
      var parameters = this._parseLoweridSeq();
      this._match(_token.T_RPAREN);
      var attributes = this._lexer.getPendingAttributes();
      var block = this._parseStmtBlock();
      var result = new _ast.ASTDefFunction(name, parameters, block);
      result.startPos = startPos;
      result.endPos = block.endPos;
      result.attributes = attributes;
      return result;
    }
  }, {
    key: '_parseDefType',
    value: function _parseDefType() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_TYPE);
      var typeName = this._parseUpperid();
      this._match(_token.T_IS);
      switch (this._currentToken.tag) {
        case _token.T_RECORD:
          return this._parseDefTypeRecord(startPos, typeName);
        case _token.T_VARIANT:
          return this._parseDefTypeVariant(startPos, typeName);
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')([(0, _i18n.i18n)('T_RECORD'), (0, _i18n.i18n)('T_VARIANT')]), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }
  }, {
    key: '_parseDefTypeRecord',
    value: function _parseDefTypeRecord(startPos, typeName) {
      this._match(_token.T_RECORD);
      var attributes = this._lexer.getPendingAttributes();
      this._match(_token.T_LBRACE);
      var fieldNames = this._parseFieldNames();
      var endPos = this._currentToken.startPos;
      this._matchExpected(_token.T_RBRACE, [_token.T_FIELD, _token.T_RBRACE]);
      var result = new _ast.ASTDefType(typeName, [new _ast.ASTConstructorDeclaration(typeName, fieldNames)]);
      result.startPos = startPos;
      result.endPos = endPos;
      result.attributes = attributes;
      return result;
    }
  }, {
    key: '_parseDefTypeVariant',
    value: function _parseDefTypeVariant(startPos, typeName) {
      var constructorDeclarations = [];
      this._match(_token.T_VARIANT);
      var attributes = this._lexer.getPendingAttributes();
      this._match(_token.T_LBRACE);
      while (this._currentToken.tag === _token.T_CASE) {
        constructorDeclarations.push(this._parseConstructorDeclaration());
      }
      var endPos = this._currentToken.startPos;
      this._matchExpected(_token.T_RBRACE, [_token.T_CASE, _token.T_RBRACE]);
      var result = new _ast.ASTDefType(typeName, constructorDeclarations);
      result.startPos = startPos;
      result.endPos = endPos;
      result.attributes = attributes;
      return result;
    }
  }, {
    key: '_parseConstructorDeclaration',
    value: function _parseConstructorDeclaration() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_CASE);
      var constructorName = this._parseUpperid();
      this._match(_token.T_LBRACE);
      var fieldNames = this._parseFieldNames();
      var endPos = this._currentToken.startPos;
      this._matchExpected(_token.T_RBRACE, [_token.T_FIELD, _token.T_RBRACE]);
      var result = new _ast.ASTConstructorDeclaration(constructorName, fieldNames);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parseFieldNames',
    value: function _parseFieldNames() {
      var fieldNames = [];
      while (this._currentToken.tag === _token.T_FIELD) {
        this._match(_token.T_FIELD);
        fieldNames.push(this._parseLowerid());
      }
      return fieldNames;
    }

    /** Statements **/

    /* Statement, optionally followed by semicolon */

  }, {
    key: '_parseStatement',
    value: function _parseStatement() {
      var statement = this._parsePureStatement();
      if (this._currentToken.tag === _token.T_SEMICOLON) {
        this._match(_token.T_SEMICOLON);
      }
      return statement;
    }

    /* Statement (not followed by semicolon) */

  }, {
    key: '_parsePureStatement',
    value: function _parsePureStatement() {
      switch (this._currentToken.tag) {
        case _token.T_ELLIPSIS:
          return this._parseStmtEllipsis();
        case _token.T_RETURN:
          return this._parseStmtReturn();
        case _token.T_IF:
          return this._parseStmtIf(true /* expectInitialIf */);
        case _token.T_REPEAT:
          return this._parseStmtRepeat();
        case _token.T_FOREACH:
          return this._parseStmtForeach();
        case _token.T_WHILE:
          return this._parseStmtWhile();
        case _token.T_SWITCH:
          return this._parseStmtSwitch();
        case _token.T_LET:
          return this._parseStmtLet();
        case _token.T_LBRACE:
          return this._parseStmtBlock();
        case _token.T_LOWERID:
          return this._parseStmtAssignVariable();
        case _token.T_UPPERID:
          return this._parseStmtProcedureCall();
        case _token.T_LPAREN:
          /* Special error for rejecting tuple assignments
           *   (x1, ..., xN) := expression
           * in favour of
           *   let (x1, ..., xN) := expression
           */
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'obsolete-tuple-assignment', []);
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('statement'), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }
  }, {
    key: '_parseStmtBlock',
    value: function _parseStmtBlock() {
      var startPos = this._currentToken.startPos;
      var statements = [];
      this._match(_token.T_LBRACE);
      while (this._currentToken.tag !== _token.T_RBRACE) {
        statements.push(this._parseStatement());
        if (this._currentToken === _token.T_SEMICOLON) {
          this._match(_token.T_SEMICOLON);
        }
      }
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RBRACE);
      var result = new _ast.ASTStmtBlock(statements);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parseStmtEllipsis',
    value: function _parseStmtEllipsis() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_ELLIPSIS);
      var result = new _ast.ASTStmtProcedureCall(new _token.Token(_token.T_UPPERID, (0, _i18n.i18n)('PRIM:BOOM'), startPos, startPos), [new _ast.ASTExprConstantString(new _token.Token(_token.T_STRING, (0, _i18n.i18n)('errmsg:ellipsis')))]);
      result.startPos = startPos;
      result.endPos = this._currentToken.startPos;
      return result;
    }
  }, {
    key: '_parseStmtReturn',
    value: function _parseStmtReturn() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_RETURN);
      var tuple = this._parseExprTuple(false /* possiblyEmpty */);
      var result = new _ast.ASTStmtReturn(tuple);
      result.startPos = startPos;
      result.endPos = tuple.endPos;
      return result;
    }
  }, {
    key: '_parseStmtIf',
    value: function _parseStmtIf(expectInitialIf) {
      var startPos = this._currentToken.startPos;
      if (expectInitialIf) {
        this._match(_token.T_IF);
      }

      this._match(_token.T_LPAREN);
      var condition = this._parseExpression();
      this._match(_token.T_RPAREN);
      /* Optional 'then' */
      if (this._currentToken.tag === _token.T_THEN) {
        this._match(_token.T_THEN);
      }
      var thenBlock = this._parseStmtBlock();

      var endPos = void 0;
      var elseBlock = void 0;
      if (this._currentToken.tag === _token.T_ELSEIF) {
        this._match(_token.T_ELSEIF);
        elseBlock = this._parseStmtIf(false /* expectInitialIf */);
        endPos = elseBlock.endPos;
      } else if (this._currentToken.tag === _token.T_ELSE) {
        this._match(_token.T_ELSE);
        elseBlock = this._parseStmtBlock();
        endPos = elseBlock.endPos;
      } else {
        elseBlock = null;
        endPos = thenBlock.endPos;
      }
      var result = new _ast.ASTStmtIf(condition, thenBlock, elseBlock);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parseStmtRepeat',
    value: function _parseStmtRepeat() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_REPEAT);
      this._match(_token.T_LPAREN);
      var times = this._parseExpression();
      this._match(_token.T_RPAREN);
      var body = this._parseStmtBlock();
      var result = new _ast.ASTStmtRepeat(times, body);
      result.startPos = startPos;
      result.endPos = body.endPos;
      return result;
    }
  }, {
    key: '_parseStmtForeach',
    value: function _parseStmtForeach() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_FOREACH);
      var pattern = this._parsePattern();
      this._match(_token.T_IN);
      var range = this._parseExpression();
      var body = this._parseStmtBlock();
      var result = new _ast.ASTStmtForeach(pattern, range, body);
      result.startPos = startPos;
      result.endPos = body.endPos;
      return result;
    }
  }, {
    key: '_parseStmtWhile',
    value: function _parseStmtWhile() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_WHILE);
      this._match(_token.T_LPAREN);
      var condition = this._parseExpression();
      this._match(_token.T_RPAREN);
      var body = this._parseStmtBlock();
      var result = new _ast.ASTStmtWhile(condition, body);
      result.startPos = startPos;
      result.endPos = body.endPos;
      return result;
    }
  }, {
    key: '_parseStmtSwitch',
    value: function _parseStmtSwitch() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_SWITCH);
      this._match(_token.T_LPAREN);
      var subject = this._parseExpression();
      this._match(_token.T_RPAREN);
      if (this._currentToken.tag === _token.T_TO) {
        this._match(_token.T_TO);
      }
      this._match(_token.T_LBRACE);
      var branches = this._parseSwitchBranches();
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RBRACE);
      var result = new _ast.ASTStmtSwitch(subject, branches);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parseStmtLet',
    value: function _parseStmtLet() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_LET);
      var result = void 0;
      if (this._currentToken.tag === _token.T_LOWERID) {
        result = this._parseStmtAssignVariable();
      } else if (this._currentToken.tag === _token.T_LPAREN) {
        result = this._parseStmtAssignTuple();
      } else {
        fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')((0, _i18n.i18n)('T_LOWERID'), (0, _i18n.i18n)('T_LPAREN')), (0, _i18n.i18n)(Symbol.keyfor(this._currentToken.tag))]);
      }
      result.startPos = startPos;
      return result;
    }
  }, {
    key: '_parseStmtAssignVariable',
    value: function _parseStmtAssignVariable() {
      var variable = this._parseLowerid();
      this._match(_token.T_ASSIGN);
      var value = this._parseExpression();
      var result = new _ast.ASTStmtAssignVariable(variable, value);
      result.startPos = variable.startPos;
      result.endPos = value.endPos;
      return result;
    }
  }, {
    key: '_parseStmtAssignTuple',
    value: function _parseStmtAssignTuple() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_LPAREN);
      var variables = this._parseLoweridSeq();
      if (variables.length === 1) {
        fail(startPos, this._currentToken.endPos, 'assignment-tuple-cannot-be-singleton', []);
      }
      this._match(_token.T_RPAREN);
      this._match(_token.T_ASSIGN);
      var value = this._parseExpression();
      var result = new _ast.ASTStmtAssignTuple(variables, value);
      result.startPos = startPos;
      result.endPos = value.endPos;
      return result;
    }
  }, {
    key: '_parseStmtProcedureCall',
    value: function _parseStmtProcedureCall() {
      var _this = this;

      var procedureName = this._parseUpperid();
      this._match(_token.T_LPAREN);
      var args = this._parseDelimitedSeq(_token.T_RPAREN, _token.T_COMMA, function () {
        return _this._parseExpression();
      });
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RPAREN);
      var result = new _ast.ASTStmtProcedureCall(procedureName, args);
      result.startPos = procedureName.startPos;
      result.endPos = endPos;
      return result;
    }

    /** Patterns **/

  }, {
    key: '_parsePattern',
    value: function _parsePattern() {
      switch (this._currentToken.tag) {
        case _token.T_UNDERSCORE:
          return this._parsePatternWildcard();
        case _token.T_LOWERID:
          return this._parsePatternVariable();
        case _token.T_NUM:case _token.T_MINUS:
          return this._parsePatternNumber();
        case _token.T_UPPERID:
          return this._parsePatternStructure();
        case _token.T_LPAREN:
          return this._parsePatternTuple();
        case _token.T_TIMEOUT:
          return this._parsePatternTimeout();
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('pattern'), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }
  }, {
    key: '_parsePatternWildcard',
    value: function _parsePatternWildcard() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_UNDERSCORE);
      var result = new _ast.ASTPatternWildcard();
      var endPos = startPos;
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parsePatternVariable',
    value: function _parsePatternVariable() {
      var startPos = this._currentToken.startPos;
      var id = this._parseLowerid();
      var result = new _ast.ASTPatternVariable(id);
      result.startPos = startPos;
      result.endPos = id.endPos;
      return result;
    }
  }, {
    key: '_parsePatternNumber',
    value: function _parsePatternNumber() {
      var startPos = this._currentToken.startPos;
      var sign = '';
      if (this._currentToken.tag === _token.T_MINUS) {
        this._match(_token.T_MINUS);
        sign = '-';
      }
      var number = this._currentToken;
      this._match(_token.T_NUM);
      var value = sign + number.value;
      if (value === '-0') {
        fail(startPos, number.endPos, 'pattern-number-cannot-be-negative-zero', []);
      }
      number = new _token.Token(_token.T_NUM, value, number.startPos, number.endPos);
      var result = new _ast.ASTPatternNumber(number);
      result.startPos = startPos;
      result.endPos = number.endPos;
      return result;
    }
  }, {
    key: '_parsePatternStructure',
    value: function _parsePatternStructure() {
      var startPos = this._currentToken.startPos;
      var endPos = this._currentToken.startPos;
      var constructor = this._parseUpperid();
      var parameters = void 0;
      if (this._currentToken.tag === _token.T_LPAREN) {
        this._match(_token.T_LPAREN);
        parameters = this._parseLoweridSeq();
        endPos = this._currentToken.startPos;
        this._match(_token.T_RPAREN);
      } else {
        parameters = [];
      }
      var result = new _ast.ASTPatternStructure(constructor, parameters);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parsePatternTuple',
    value: function _parsePatternTuple() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_LPAREN);
      var parameters = this._parseLoweridSeq();
      if (parameters.length === 1) {
        fail(startPos, this._currentToken.endPos, 'pattern-tuple-cannot-be-singleton', []);
      }
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RPAREN);
      var result = new _ast.ASTPatternTuple(parameters);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parsePatternTimeout',
    value: function _parsePatternTimeout() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_TIMEOUT);
      this._match(_token.T_LPAREN);
      var timeout = this._currentToken;
      this._match(_token.T_NUM);
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RPAREN);
      var result = new _ast.ASTPatternTimeout(timeout);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }

    /** Expressions **/

  }, {
    key: '_parseExpression',
    value: function _parseExpression() {
      return this._parseExprOperator(0);
    }

    /* Read an expression of the given level.
     *
     * If the list OPERATORS of precedence levels has N elements, then:
     * - Expressions of level 0 are arbitrary expressions.
     * - Expressions of level N are atomic expressions.
     * - In general, expressions of level I involve operators
     *   of levels I, I+1, ..., N-1,
     *   and they can only include operators of the lower levels
     *   by surrounding them in parentheses.
     */

  }, {
    key: '_parseExprOperator',
    value: function _parseExprOperator(level) {
      if (level === OPERATORS.length) {
        return this._parseExprAtom();
      }
      switch (OPERATORS[level].fixity) {
        case Infix:
          return this._parseExprOperatorInfix(level);
        case InfixL:
          return this._parseExprOperatorInfixL(level);
        case InfixR:
          return this._parseExprOperatorInfixR(level);
        case Prefix:
          return this._parseExprOperatorPrefix(level);
        default:
          throw Error('Invalid operator.');
      }
    }
  }, {
    key: '_parseExprOperatorInfix',
    value: function _parseExprOperatorInfix(level) {
      var left = this._parseExprOperator(level + 1);
      if (OPERATORS[level].isOperator(this._currentToken)) {
        var op = this._currentToken;
        this._nextToken();
        var right = this._parseExprOperator(level + 1);

        /* Check that it is not used associatively */
        if (OPERATORS[level].isOperator(this._currentToken)) {
          fail(this._currentToken.startPos, this._currentToken.endPos, 'operators-are-not-associative', [(0, _i18n.i18n)(Symbol.keyFor(op.tag)), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
        }

        var result = new _ast.ASTExprFunctionCall(OPERATORS[level].functionName(op), [left, right]);
        result.startPos = left.startPos;
        result.endPos = right.endPos;
        return result;
      } else {
        return left;
      }
    }
  }, {
    key: '_parseExprOperatorInfixL',
    value: function _parseExprOperatorInfixL(level) {
      var result = this._parseExprOperator(level + 1);
      while (OPERATORS[level].isOperator(this._currentToken)) {
        var op = this._currentToken;
        this._nextToken();
        var right = this._parseExprOperator(level + 1);
        var result2 = new _ast.ASTExprFunctionCall(OPERATORS[level].functionName(op), [result, right]);
        result2.startPos = result.startPos;
        result2.endPos = right.endPos;
        result = result2;
      }
      return result;
    }
  }, {
    key: '_parseExprOperatorInfixR',
    value: function _parseExprOperatorInfixR(level) {
      var left = this._parseExprOperator(level + 1);
      if (OPERATORS[level].isOperator(this._currentToken)) {
        var op = this._currentToken;
        this._nextToken();
        var right = this._parseExprOperator(level); /* same level */
        var result = new _ast.ASTExprFunctionCall(OPERATORS[level].functionName(op), [left, right]);
        result.startPos = left.startPos;
        result.endPos = right.endPos;
        return result;
      } else {
        return left;
      }
    }
  }, {
    key: '_parseExprOperatorPrefix',
    value: function _parseExprOperatorPrefix(level) {
      if (OPERATORS[level].isOperator(this._currentToken)) {
        var op = this._currentToken;
        this._nextToken();
        var inner = this._parseExprOperator(level); /* same level */
        var result = new _ast.ASTExprFunctionCall(OPERATORS[level].functionName(op), [inner]);
        result.startPos = op.startPos;
        result.endPos = inner.endPos;
        return result;
      } else {
        return this._parseExprOperator(level + 1);
      }
    }

    /* Parse an atomic expression.
     * I.e. all the operators must be surrounded by parentheses */

  }, {
    key: '_parseExprAtom',
    value: function _parseExprAtom() {
      switch (this._currentToken.tag) {
        case _token.T_ELLIPSIS:
          return this._parseExprEllipsis();
        case _token.T_LOWERID:
          return this._parseExprVariableOrFunctionCall();
        case _token.T_NUM:
          return this._parseExprConstantNumber();
        case _token.T_STRING:
          return this._parseExprConstantString();
        case _token.T_CHOOSE:
          return this._parseExprChoose(true /* expectInitialChoose */);
        case _token.T_MATCHING:
          return this._parseExprMatching();
        case _token.T_UPPERID:
          return this._parseExprStructureOrStructureUpdate();
        case _token.T_LPAREN:
          return this._parseExprTuple(true /* possiblyEmpty */);
        case _token.T_LBRACK:
          return this._parseExprListOrRange();
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('expression'), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }
  }, {
    key: '_parseExprEllipsis',
    value: function _parseExprEllipsis() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_ELLIPSIS);
      var result = new _ast.ASTExprFunctionCall(new _token.Token(_token.T_LOWERID, (0, _i18n.i18n)('PRIM:boom'), startPos, startPos), [new _ast.ASTExprConstantString(new _token.Token(_token.T_STRING, (0, _i18n.i18n)('errmsg:ellipsis')))]);
      result.startPos = startPos;
      result.endPos = this._currentToken.startPos;
      return result;
    }
  }, {
    key: '_parseExprVariableOrFunctionCall',
    value: function _parseExprVariableOrFunctionCall() {
      var id = this._parseLowerid();
      var result = void 0;
      var endPos = void 0;
      if (this._currentToken.tag === _token.T_LPAREN) {
        this._match(_token.T_LPAREN);
        var args = this._parseExpressionSeq(_token.T_RPAREN);
        result = new _ast.ASTExprFunctionCall(id, args);
        endPos = this._currentToken.startPos;
        this._match(_token.T_RPAREN);
      } else {
        result = new _ast.ASTExprVariable(id);
        endPos = id.endPos;
      }
      result.startPos = id.startPos;
      result.endPos = endPos;
      return result;
    }
  }, {
    key: '_parseExprConstantNumber',
    value: function _parseExprConstantNumber() {
      var number = this._currentToken;
      this._match(_token.T_NUM);
      var result = new _ast.ASTExprConstantNumber(number);
      result.startPos = number.startPos;
      result.endPos = number.endPos;
      return result;
    }
  }, {
    key: '_parseExprConstantString',
    value: function _parseExprConstantString() {
      var string = this._currentToken;
      this._match(_token.T_STRING);
      var result = new _ast.ASTExprConstantString(string);
      result.startPos = string.startPos;
      result.endPos = string.endPos;
      return result;
    }
  }, {
    key: '_parseExprChoose',
    value: function _parseExprChoose(expectInitialChoose) {
      var startPos = this._currentToken.startPos;
      if (expectInitialChoose) {
        this._match(_token.T_CHOOSE);
      }
      var expr1 = this._parseExpression();
      if (this._currentToken.tag === _token.T_WHEN) {
        this._match(_token.T_WHEN);
        this._match(_token.T_LPAREN);
        var condition = this._parseExpression();
        this._match(_token.T_RPAREN);
        var expr2 = this._parseExprChoose(false /* expectInitialChoose */);
        var result = new _ast.ASTExprChoose(condition, expr1, expr2);
        result.startPos = startPos;
        result.endPos = expr2.endPos;
        return result;
      } else {
        var endPos = this._currentToken.endPos;
        this._match(_token.T_OTHERWISE);
        expr1.startPos = startPos;
        expr1.endPos = endPos;
        return expr1;
      }
    }
  }, {
    key: '_parseExprMatching',
    value: function _parseExprMatching() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_MATCHING);
      this._match(_token.T_LPAREN);
      var subject = this._parseExpression();
      this._match(_token.T_RPAREN);
      this._match(_token.T_SELECT);
      var branches = this._parseMatchingBranches();
      var result = new _ast.ASTExprMatching(subject, branches);
      result.startPos = startPos;
      result.endPos = result.endPos;
      return result;
    }

    /*
     * Parse any of the following constructions:
     * (1) Structure with no arguments: "Norte"
     * (2) Structure with no arguments and explicit parentheses: "Nil()"
     * (3) Structure with arguments: "Coord(x <- 1, y <- 2)"
     * (4) Update structure with arguments: "Coord(expression | x <- 2)"
     *
     * Deciding between (3) and (4) unfortunately cannot be done with one
     * token of lookahead, so after reading the constructor and a left
     * parenthesis we resort to the following workaround:
     *
     * - Parse an expression.
     * - If the next token is GETS ("<-") we are in case (3).
     *   We must then ensure that the expression is just a variable
     *   and recover its name.
     * - If the next token is PIPE ("|") we are in case (4), and we go on.
     */

  }, {
    key: '_parseExprStructureOrStructureUpdate',
    value: function _parseExprStructureOrStructureUpdate() {
      var constructorName = this._parseUpperid();
      if (this._currentToken.tag !== _token.T_LPAREN) {
        /* Structure with no arguments, e.g. "Norte" */
        var result = new _ast.ASTExprStructure(constructorName, []);
        result.startPos = constructorName.startPos;
        result.endPos = constructorName.endPos;
        return result;
      }
      this._match(_token.T_LPAREN);
      if (this._currentToken.tag === _token.T_RPAREN) {
        /* Structure with no arguments with explicit parentheses,
         * e.g. "Nil()" */
        var _result = new _ast.ASTExprStructure(constructorName, []);
        var endPos = this._currentToken.startPos;
        this._match(_token.T_RPAREN);
        _result.startPos = constructorName.startPos;
        _result.endPos = endPos;
        return _result;
      }
      var subject = this._parseExpression();
      switch (this._currentToken.tag) {
        case _token.T_GETS:
          if (subject.tag !== _ast.N_ExprVariable) {
            fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('T_PIPE'), (0, _i18n.i18n)('T_GETS')]);
          }
          return this._parseStructure(constructorName, subject.variableName);
        case _token.T_PIPE:
          return this._parseStructureUpdate(constructorName, subject);
        case _token.T_COMMA:case _token.T_RPAREN:
          /* Issue a specific error message to deal with a common
           * programming error, namely calling a procedure name
           * where an expression is expected. */
          return fail(constructorName.startPos, constructorName.endPos, 'expected-but-found', [(0, _i18n.i18n)('expression'), (0, _i18n.i18n)('procedure call')]);
        default:
          var expected = void 0;
          if (subject.tag === _ast.N_ExprVariable) {
            expected = (0, _i18n.i18n)('<alternative>')([(0, _i18n.i18n)('T_GETS'), (0, _i18n.i18n)('T_PIPE')]);
          } else {
            expected = (0, _i18n.i18n)('T_PIPE');
          }
          return fail(constructorName.startPos, constructorName.endPos, 'expected-but-found', [expected, (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }

    /* Parse a structure   A(x1 <- expr1, ..., xN <- exprN)
     * where N >= 1,
     * assuming that  "A(x1" has already been read.
     *
     * - constructorName and fieldName1 correspond to "A" and "x1"
     *   respectively.
     */

  }, {
    key: '_parseStructure',
    value: function _parseStructure(constructorName, fieldName1) {
      var _this2 = this;

      /* Read "<- expr1" */
      this._match(_token.T_GETS);
      var value1 = this._parseExpression();
      var fieldBinding1 = new _ast.ASTFieldBinding(fieldName1, value1);
      fieldBinding1.startPos = fieldName1.startPos;
      fieldBinding1.endPos = value1.endPos;
      /* Read "x2 <- expr2, ..., xN <- exprN" (this might be empty) */
      var fieldBindings = this._parseNonEmptyDelimitedSeq(_token.T_RPAREN, _token.T_COMMA, [fieldBinding1], function () {
        return _this2._parseFieldBinding();
      });
      /* Read ")" */
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RPAREN);
      /* Return an ExprStructure node */
      var result = new _ast.ASTExprStructure(constructorName, fieldBindings);
      result.startPos = constructorName.startPos;
      result.endPos = endPos;
      return result;
    }

    /* Parse a structure update  A(e | x1 <- expr1, ..., xN <- exprN)
     * where N >= 1,
     * assuming that "A(e" has already been read.
     *
     * constructorName and original correspond to "A" and "e"
     * respectively.
     */

  }, {
    key: '_parseStructureUpdate',
    value: function _parseStructureUpdate(constructorName, original) {
      var _this3 = this;

      /* Read "|" */
      this._match(_token.T_PIPE);
      /* Read "x2 <- expr2, ..., xN <- exprN" (this might be empty) */
      var fieldBindings = this._parseDelimitedSeq(_token.T_RPAREN, _token.T_COMMA, function () {
        return _this3._parseFieldBinding();
      });
      /* Read ")" */
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RPAREN);
      /* Return an ExprStructureUpdate node */
      var result = new _ast.ASTExprStructureUpdate(constructorName, original, fieldBindings);
      result.startPos = constructorName.startPos;
      result.endPos = endPos;
      return result;
    }

    /* Read a list
     *   [expr1, ..., exprN]
     * a range expression
     *   [first .. last]
     * or a range expression with step
     *   [first, second .. last]
     */

  }, {
    key: '_parseExprListOrRange',
    value: function _parseExprListOrRange() {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_LBRACK);
      if (this._currentToken.tag === _token.T_RBRACK) {
        return this._parseExprListRemainder(startPos, []);
      }
      var first = this._parseExpression();
      switch (this._currentToken.tag) {
        case _token.T_RBRACK:
          return this._parseExprListRemainder(startPos, [first]);
        case _token.T_RANGE:
          return this._parseExprRange(startPos, first, null);
        case _token.T_COMMA:
          this._match(_token.T_COMMA);
          var second = this._parseExpression();
          switch (this._currentToken.tag) {
            case _token.T_RBRACK:
            case _token.T_COMMA:
              return this._parseExprListRemainder(startPos, [first, second]);
            case _token.T_RANGE:
              return this._parseExprRange(startPos, first, second);
            default:
              return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')([(0, _i18n.i18n)('T_COMMA'), (0, _i18n.i18n)('T_RANGE'), (0, _i18n.i18n)('T_RBRACK')]), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
          }
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')([(0, _i18n.i18n)('T_COMMA'), (0, _i18n.i18n)('T_RANGE'), (0, _i18n.i18n)('T_RBRACK')]), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }

    /* Read the end of a list "[expr1, ..., exprN]" assumming we have
     * already read "[expr1, ..., exprK" up to some point K >= 1.
     * - startPos is the position of "["
     * - prefix is the list of elements we have already read
     */

  }, {
    key: '_parseExprListRemainder',
    value: function _parseExprListRemainder(startPos, prefix) {
      var _this4 = this;

      var elements = this._parseNonEmptyDelimitedSeq(_token.T_RBRACK, _token.T_COMMA, prefix, function () {
        return _this4._parseExpression();
      });
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RBRACK);
      var result = new _ast.ASTExprList(elements);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }

    /* Read a range "[first..last]" or "[first,second..last]"
     * assumming we are left to read "..last]"
     * - startPos is the position of "[".
     * - second may be null */

  }, {
    key: '_parseExprRange',
    value: function _parseExprRange(startPos, first, second) {
      this._match(_token.T_RANGE);
      var last = this._parseExpression();
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RBRACK);
      var result = new _ast.ASTExprRange(first, second, last);
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }

    /* Read a list of expressions separated by commas and delimited
     * by parentheses. If there is a single expression, return the
     * expression itself. If there are 0 or >=2 expressions, return
     * a tuple.
     */

  }, {
    key: '_parseExprTuple',
    value: function _parseExprTuple(possiblyEmpty) {
      var startPos = this._currentToken.startPos;
      this._match(_token.T_LPAREN);
      var expressionList = this._parseExpressionSeq(_token.T_RPAREN);
      var endPos = this._currentToken.startPos;
      this._match(_token.T_RPAREN);

      if (!possiblyEmpty && expressionList === 0) {
        fail(startPos, endPos, 'return-tuple-cannot-be-empty', []);
      }

      var result = void 0;
      if (expressionList.length === 1) {
        result = expressionList[0];
      } else {
        result = new _ast.ASTExprTuple(expressionList);
      }
      result.startPos = startPos;
      result.endPos = endPos;
      return result;
    }

    /** SwitchBranch **/

  }, {
    key: '_parseSwitchBranches',
    value: function _parseSwitchBranches() {
      var branches = [];
      while (this._currentToken.tag !== _token.T_RBRACE) {
        branches.push(this._parseSwitchBranch());
      }
      return branches;
    }
  }, {
    key: '_parseSwitchBranch',
    value: function _parseSwitchBranch() {
      var pattern = this._parsePattern();
      this._match(_token.T_ARROW);
      var body = this._parseStmtBlock();
      var result = new _ast.ASTSwitchBranch(pattern, body);
      result.startPos = pattern.startPos;
      result.endPos = body.endPos;
      return result;
    }

    /** MatchingBranch **/

  }, {
    key: '_parseMatchingBranches',
    value: function _parseMatchingBranches() {
      var branches = [];
      while (this._currentToken.tag !== _token.T_OTHERWISE) {
        branches.push(this._parseMatchingBranch());
      }
      this._match(_token.T_OTHERWISE);
      return branches;
    }
  }, {
    key: '_parseMatchingBranch',
    value: function _parseMatchingBranch() {
      var body = this._parseExpression();
      switch (this._currentToken.tag) {
        case _token.T_ON:
          {
            this._match(_token.T_ON);
            var pattern = this._parsePattern();
            var result = new _ast.ASTMatchingBranch(pattern, body);
            result.startPos = body.startPos;
            result.endPos = pattern.endPos;
            return result;
          }
        case _token.T_OTHERWISE:
          {
            var _pattern = new _ast.ASTPatternWildcard();
            _pattern.startPos = this._currentToken.startPos;
            _pattern.endPos = this._currentToken.endPos;
            var _result2 = new _ast.ASTMatchingBranch(_pattern, body);
            _result2.startPos = body.startPos;
            _result2.endPos = this._currentToken.endPos;
            return _result2;
          }
        default:
          return fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')([(0, _i18n.i18n)('T_ON'), (0, _i18n.i18n)('T_OTHERWISE')]), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
    }

    /** FieldBinding **/

  }, {
    key: '_parseFieldBinding',
    value: function _parseFieldBinding() {
      var fieldName = this._parseLowerid();
      this._match(_token.T_GETS);
      var value = this._parseExpression();
      var result = new _ast.ASTFieldBinding(fieldName, value);
      result.startPos = fieldName.startPos;
      result.endPos = value.endPos;
      return result;
    }

    /** Helpers **/

    /* Advance to the next token */

  }, {
    key: '_nextToken',
    value: function _nextToken() {
      this._currentToken = this._lexer.nextToken();
    }

    /* Check that the current token has the expected tag.
     * Then advance to the next token. */

  }, {
    key: '_match',
    value: function _match(tokenTag) {
      if (this._currentToken.tag !== tokenTag) {
        fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)(Symbol.keyFor(tokenTag)), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
      this._nextToken();
    }

    /* Check that the current token has the expected tag.
     * Then advance to the next token.
     * Otherwise report that any of the alternatives in the tagList
     * was expected.
     */

  }, {
    key: '_matchExpected',
    value: function _matchExpected(tokenTag, tagList) {
      if (this._currentToken.tag !== tokenTag) {
        fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')(tagList.map(function (tag) {
          return (0, _i18n.i18n)(Symbol.keyFor(tag));
        })), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
      this._nextToken();
    }

    /* Parse a delimited list:
     *   rightDelimiter: token tag for the right delimiter
     *   separator: token tag for the separator
     *   parseElement: function that parses one element */

  }, {
    key: '_parseDelimitedSeq',
    value: function _parseDelimitedSeq(rightDelimiter, separator, parseElement) {
      if (this._currentToken.tag === rightDelimiter) {
        return []; /* Empty case */
      }
      var first = parseElement();
      return this._parseNonEmptyDelimitedSeq(rightDelimiter, separator, [first], parseElement);
    }

    /* Parse a delimited list, assuming the first elements are already given.
     *   rightDelimiter: token tag for the right delimiter
     *   separator: token tag for the separator
     *   prefix: non-empty list of all the first elements (already given)
     *   parseElement: function that parses one element */

  }, {
    key: '_parseNonEmptyDelimitedSeq',
    value: function _parseNonEmptyDelimitedSeq(rightDelimiter, separator, prefix, parseElement) {
      var list = prefix;
      while (this._currentToken.tag === separator) {
        this._match(separator);
        list.push(parseElement());
      }
      if (this._currentToken.tag !== rightDelimiter) {
        fail(this._currentToken.startPos, this._currentToken.endPos, 'expected-but-found', [(0, _i18n.i18n)('<alternative>')([(0, _i18n.i18n)(Symbol.keyFor(separator)), (0, _i18n.i18n)(Symbol.keyFor(rightDelimiter))]), (0, _i18n.i18n)(Symbol.keyFor(this._currentToken.tag))]);
      }
      return list;
    }
  }, {
    key: '_parseLowerid',
    value: function _parseLowerid() {
      var lowerid = this._currentToken;
      this._match(_token.T_LOWERID);
      return lowerid;
    }
  }, {
    key: '_parseUpperid',
    value: function _parseUpperid() {
      var upperid = this._currentToken;
      this._match(_token.T_UPPERID);
      return upperid;
    }
  }, {
    key: '_parseLoweridSeq',
    value: function _parseLoweridSeq() {
      var _this5 = this;

      return this._parseDelimitedSeq(_token.T_RPAREN, _token.T_COMMA, function () {
        return _this5._parseLowerid();
      });
    }

    /* Parse a list of expressions delimited by the given right delimiter
     * e.g. T_RPAREN or T_RBRACK, without consuming the delimiter. */

  }, {
    key: '_parseExpressionSeq',
    value: function _parseExpressionSeq(rightDelimiter) {
      var _this6 = this;

      return this._parseDelimitedSeq(rightDelimiter, _token.T_COMMA, function () {
        return _this6._parseExpression();
      });
    }
  }]);

  return Parser;
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lexer = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _i18n = __webpack_require__(0);

var _exceptions = __webpack_require__(1);

var _reader = __webpack_require__(6);

var _token = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isWhitespace(chr) {
  return chr === ' ' || chr === '\t' || chr === '\r' || chr === '\n';
}

function isDigit(chr) {
  return '0' <= chr && chr <= '9';
}

/* We define a character to be alphabetic if it has two distinct forms:
 * an uppercase form and a lowercase form.
 *
 * This accepts alphabetic Unicode characters but rejects numbers and symbols.
 */
function isAlpha(chr) {
  return chr.toUpperCase(chr) !== chr.toLowerCase();
}

/* An uppercase character is an alphabetic character that coincides with
 * its uppercase form */
function isUpper(chr) {
  return isAlpha(chr) && chr.toUpperCase() === chr;
}

/* A lowercase character is an alphabetic character that coincides with
 * its lowercase form */
function isLower(chr) {
  return isAlpha(chr) && chr.toLowerCase() === chr;
}

function isIdent(chr) {
  return isAlpha(chr) || isDigit(chr) || chr === '_' || chr === "'";
}

var KEYWORDS = {
  'program': _token.T_PROGRAM,
  'interactive': _token.T_INTERACTIVE,
  'procedure': _token.T_PROCEDURE,
  'function': _token.T_FUNCTION,
  'return': _token.T_RETURN,
  /* Control structures */
  'if': _token.T_IF,
  'then': _token.T_THEN,
  'elseif': _token.T_ELSEIF,
  'else': _token.T_ELSE,
  'choose': _token.T_CHOOSE,
  'when': _token.T_WHEN,
  'otherwise': _token.T_OTHERWISE,
  'repeat': _token.T_REPEAT,
  'foreach': _token.T_FOREACH,
  'in': _token.T_IN,
  'while': _token.T_WHILE,
  'switch': _token.T_SWITCH,
  'to': _token.T_TO,
  'matching': _token.T_MATCHING,
  'select': _token.T_SELECT,
  'on': _token.T_ON,
  /* Assignment */
  'let': _token.T_LET,
  /* Operators */
  'not': _token.T_NOT,
  'div': _token.T_DIV,
  'mod': _token.T_MOD,
  /* Records/variants */
  'type': _token.T_TYPE,
  'is': _token.T_IS,
  'record': _token.T_RECORD,
  'variant': _token.T_VARIANT,
  'case': _token.T_CASE,
  'field': _token.T_FIELD,
  /* Default case in a switch/match */
  '_': _token.T_UNDERSCORE
};

/* Pattern for timeouts in an interactive program */
KEYWORDS[(0, _i18n.i18n)('CONS:TIMEOUT')] = _token.T_TIMEOUT;

/* Note: the order is relevant so that the 'maximal munch' rule applies. */
var SYMBOLS = [
/* Various delimiters */
['(', _token.T_LPAREN], [')', _token.T_RPAREN], ['{', _token.T_LBRACE], ['}', _token.T_RBRACE], ['[', _token.T_LBRACK], // For lists and ranges
[']', _token.T_RBRACK], [',', _token.T_COMMA], [';', _token.T_SEMICOLON], ['...', _token.T_ELLIPSIS], // For intentionally incomplete programs
/* Range operator */
['..', _token.T_RANGE],
/* Assignment */
[':=', _token.T_ASSIGN],
/* Logical operators */
['&&', _token.T_AND], ['||', _token.T_OR],
/* Fields */
['<-', _token.T_GETS], // Field initializer, e.g. Coord(x <- 1, y <- 2)
['|', _token.T_PIPE], // Field update, e.g. Coord(c | x <- 2)
/* Pattern matching */
['->', _token.T_ARROW], // For the branches of a switch
/* Relational operators */
['==', _token.T_EQ], ['/=', _token.T_NE], ['<=', _token.T_LE], ['>=', _token.T_GE], ['<', _token.T_LT], ['>', _token.T_GT],
/* Functions */
['++', _token.T_CONCAT], ['+', _token.T_PLUS], ['-', _token.T_MINUS], ['*', _token.T_TIMES], ['^', _token.T_POW]];

/* Valid language options accepted by the LANGUAGE pragma */
var LANGUAGE_OPTIONS = ['DestructuringForeach', 'AllowRecursion'];

function leadingZeroes(string) {
  return string.length >= 0 && string[0] === '0';
}

function fail(startPos, endPos, reason, args) {
  throw new _exceptions.GbsSyntaxError(startPos, endPos, reason, args);
}

var CLOSING_DELIMITERS = {
  '(': ')',
  '[': ']',
  '{': '}'
};

/* An instance of Lexer scans source code for tokens.
 * Example:
 *
 *     let tok = new Lexer('if (a)');
 *     tok.nextToken(); // ~~> new Token(T_IF, null, ...)
 *     tok.nextToken(); // ~~> new Token(T_LPAREN, null, ...)
 *     tok.nextToken(); // ~~> new Token(T_LOWERID, 'a', ...)
 *     tok.nextToken(); // ~~> new Token(T_RPAREN, null, ...)
 *     tok.nextToken(); // ~~> new Token(T_EOF, null, ...)
 *
 * The 'input' parameter is either a string or a mapping
 * from filenames to strings.
 */

var Lexer = exports.Lexer = function () {
  function Lexer(input) {
    _classCallCheck(this, Lexer);

    this._multifileReader = new _reader.MultifileReader(input);
    this._reader = this._multifileReader.readCurrentFile();
    this._warnings = [];

    /* A stack of tokens '(', '[' and '{', to provide more helpful
     * error reporting if delimiters are not balanced. */
    this._delimiterStack = [];

    /* A dictionary of pending attributes, set by the ATTRIBUTE pragma.
     * Pending attributes are used by the parser to decorate any procedure
     * or function definition. */
    this._pendingAttributes = {};

    /* A list of language options, enabled by the LANGUAGE pragma.
     * Language options are interpreted by the runner to initialize.
     * the remaining modules (linter, compiler, runtime, ...)
     * accordingly. */
    this._languageOptions = [];
  }

  /* Return the next token from the input */


  _createClass(Lexer, [{
    key: 'nextToken',
    value: function nextToken() {
      if (!this._findNextToken()) {
        var token = new _token.Token(_token.T_EOF, null, this._reader, this._reader);
        this._checkBalancedDelimiters(token);
        return token;
      }
      if (isDigit(this._reader.peek())) {
        var startPos = this._reader;
        var value = this._readStringWhile(isDigit);
        var endPos = this._reader;
        if (leadingZeroes(value) && value.length > 1) {
          return fail(startPos, endPos, 'numeric-constant-should-not-have-leading-zeroes', []);
        }
        return new _token.Token(_token.T_NUM, value, startPos, endPos);
      } else if (isIdent(this._reader.peek())) {
        var _startPos = this._reader;
        var _value = this._readStringWhile(isIdent);
        var _endPos = this._reader;
        if (_value in KEYWORDS) {
          return new _token.Token(KEYWORDS[_value], _value, _startPos, _endPos);
        } else if (isUpper(_value[0])) {
          return new _token.Token(_token.T_UPPERID, _value, _startPos, _endPos);
        } else if (isLower(_value[0])) {
          return new _token.Token(_token.T_LOWERID, _value, _startPos, _endPos);
        } else {
          return fail(_startPos, _endPos, 'identifier-must-start-with-alphabetic-character', []);
        }
      } else if (this._reader.peek() === '"') {
        return this._readStringConstant();
      } else {
        return this._readSymbol();
      }
    }

    /* When tokenization is done, this function returns the list of all
     * the warnings collected during tokenization */

  }, {
    key: 'warnings',
    value: function warnings() {
      return this._warnings;
    }

    /* Skip whitespace and advance through files until the start of the next
     * token is found. Return false if EOF is found. */

  }, {
    key: '_findNextToken',
    value: function _findNextToken() {
      for (;;) {
        this._ignoreWhitespaceAndComments();
        if (!this._reader.eof()) {
          break;
        }
        if (this._multifileReader.moreFiles()) {
          this._multifileReader.nextFile();
          this._reader = this._multifileReader.readCurrentFile();
        } else {
          return false;
        }
      }
      return true;
    }

    /* Read a string while the given condition holds for the current
     * character */

  }, {
    key: '_readStringWhile',
    value: function _readStringWhile(condition) {
      var result = [];
      while (!this._reader.eof()) {
        if (!condition(this._reader.peek())) {
          break;
        }
        result.push(this._reader.peek());
        this._reader = this._reader.consumeCharacter();
      }
      return result.join('');
    }

    /* Reads a quote-delimited string constant.
     * Escapes are recognized. */

  }, {
    key: '_readStringConstant',
    value: function _readStringConstant() {
      var startPos = this._reader;
      var result = [];
      this._reader = this._reader.consumeCharacter();
      while (!this._reader.eof()) {
        var c = this._reader.peek();
        if (c === '"') {
          this._reader = this._reader.consumeCharacter();
          return new _token.Token(_token.T_STRING, result.join(''), startPos, this._reader);
        } else if (c === '\\') {
          this._reader = this._reader.consumeCharacter();
          if (this._reader.eof()) {
            break;
          }
          var c2 = this._reader.peek();
          this._reader = this._reader.consumeCharacter();
          switch (c2) {
            case 'a':
              result.push('\x07');
              break;
            case 'b':
              result.push('\b');
              break;
            case 'f':
              result.push('\f');
              break;
            case 'n':
              result.push('\n');
              break;
            case 'r':
              result.push('\r');
              break;
            case 't':
              result.push('\t');
              break;
            case 'v':
              result.push('\x0B');
              break;
            default:
              result.push(c2);
              break;
          }
        } else {
          result.push(c);
          this._reader = this._reader.consumeCharacter();
        }
      }
      return fail(startPos, this._reader, 'unclosed-string-constant', []);
    }

    /* Read a symbol */

  }, {
    key: '_readSymbol',
    value: function _readSymbol() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = SYMBOLS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              symbol = _step$value[0],
              tag = _step$value[1];

          if (this._reader.startsWith(symbol)) {
            var startPos = this._reader;
            this._reader = this._reader.consumeString(symbol);
            var endPos = this._reader;
            var token = new _token.Token(tag, symbol, startPos, endPos);
            this._checkBalancedDelimiters(token);
            return token;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return fail(this._reader, this._reader, 'unknown-token', [this._reader.peek()]);
    }
  }, {
    key: '_ignoreWhitespaceAndComments',
    value: function _ignoreWhitespaceAndComments() {
      while (this._ignoreWhitespace() || this._ignoreComments()) {
        /* continue */
      }
    }
  }, {
    key: '_ignoreWhitespace',
    value: function _ignoreWhitespace() {
      if (!this._reader.eof() && isWhitespace(this._reader.peek())) {
        this._reader = this._reader.consumeCharacter();
        return true;
      } else {
        return false;
      }
    }

    /* Skips comments and pragmas, returns false if there are no comments */

  }, {
    key: '_ignoreComments',
    value: function _ignoreComments() {
      if (this._startSingleLineComment()) {
        this._ignoreSingleLineComment();
        return true;
      } else if (this._reader.startsWith('/*@')) {
        var startPos = this._reader;
        this._evaluatePragma(startPos, this._readInvisiblePragma('/*', '*/', '@'));
        return true;
      } else if (this._reader.startsWith('{-')) {
        this._ignoreMultilineComment('{-', '-}');
        return true;
      } else if (this._reader.startsWith('/*')) {
        this._ignoreMultilineComment('/*', '*/');
        return true;
      } else {
        return false;
      }
    }

    /* Returns true if a single-line comment starts here */

  }, {
    key: '_startSingleLineComment',
    value: function _startSingleLineComment() {
      return this._reader.startsWith('--') || this._reader.startsWith('//') || this._reader.startsWith('#');
    }

    /* Skips a single-line comment */

  }, {
    key: '_ignoreSingleLineComment',
    value: function _ignoreSingleLineComment() {
      while (!this._reader.eof()) {
        this._reader = this._reader.consumeCharacter();
        if (this._reader.peek() === '\n') {
          break;
        }
      }
    }

    /* Skips a multiline comment with the given left/right delimiters.
     * Multi-line comments may be nested. */

  }, {
    key: '_ignoreMultilineComment',
    value: function _ignoreMultilineComment(left, right) {
      var nesting = 0;
      var startPos = this._reader;
      while (!this._reader.eof()) {
        if (this._reader.startsWith(left)) {
          this._reader = this._reader.consumeString(left);
          nesting++;
        } else if (this._reader.startsWith(right)) {
          this._reader = this._reader.consumeString(right);
          nesting--;
          if (nesting === 0) {
            return;
          }
        } else {
          this._reader = this._reader.consumeCharacter();
        }
      }
      fail(startPos, this._reader, 'unclosed-multiline-comment', []);
    }

    /* Read a pragma. A pragma is a comment delimited by the
     * given left   / *
     * and right    * /
     * comment delimiters.
     * It has N >= 0 parts delimited by the pragma delimiter   @
     *   @part1@part2@...@partN@
     */

  }, {
    key: '_readInvisiblePragma',
    value: function _readInvisiblePragma(left, right, pragmaDelim) {
      var pragma = [];
      var startPos = this._reader;
      this._reader = this._reader.consumeInvisibleString(left);
      this._reader = this._reader.consumeInvisibleString(pragmaDelim);
      while (!this._reader.eof()) {
        pragma.push(this._readInvisibleStringUntilDelimiter(pragmaDelim));
        this._reader = this._reader.consumeInvisibleString(pragmaDelim);
        if (this._reader.startsWith(right)) {
          this._reader = this._reader.consumeInvisibleString(right);
          return pragma;
        }
      }
      return fail(startPos, this._reader, 'unclosed-multiline-comment', []);
    }

    /* Read an invisible string until the given delimiter is found */

  }, {
    key: '_readInvisibleStringUntilDelimiter',
    value: function _readInvisibleStringUntilDelimiter(delimiter) {
      var startPos = this._reader;
      var result = [];
      while (!this._reader.eof()) {
        if (this._reader.peek() === delimiter) {
          return result.join('');
        }
        result.push(this._reader.peek());
        this._reader = this._reader.consumeInvisibleCharacter();
      }
      return fail(startPos, this._reader, 'unclosed-multiline-comment', []);
    }
  }, {
    key: '_evaluatePragma',
    value: function _evaluatePragma(startPos, pragma) {
      if (pragma.length === 0) {
        this._emitWarning(startPos, this._reader, 'empty-pragma', []);
      } else if (pragma[0] === 'BEGIN_REGION') {
        var region = pragma[1];
        this._reader = this._reader.beginRegion(region);
      } else if (pragma[0] === 'END_REGION') {
        this._reader = this._reader.endRegion();
      } else if (pragma[0] === 'ATTRIBUTE' && pragma.length >= 2) {
        var key = pragma[1];
        var value = pragma.slice(2, pragma.length).join('@');
        this.setAttribute(key, value);
      } else if (pragma[0] === 'LANGUAGE' && pragma.length === 2) {
        var languageOption = pragma[1];
        this.addLanguageOption(languageOption);
      } else {
        this._emitWarning(startPos, this._reader, 'unknown-pragma', [pragma[0]]);
      }
    }
  }, {
    key: '_emitWarning',
    value: function _emitWarning(startPos, endPos, reason, args) {
      this._warnings.push(new _exceptions.GbsWarning(startPos, endPos, reason, args));
    }

    /* Check that reading a delimiter keeps the delimiter stack balanced. */

  }, {
    key: '_checkBalancedDelimiters',
    value: function _checkBalancedDelimiters(token) {
      if (token.tag === _token.T_EOF && this._delimiterStack.length > 0) {
        var openingDelimiter = this._delimiterStack.pop();
        fail(openingDelimiter.startPos, openingDelimiter.endPos, 'unmatched-opening-delimiter', [openingDelimiter.value]);
      } else if (token.tag === _token.T_LPAREN || token.tag === _token.T_LBRACE || token.tag === _token.T_LBRACK) {
        this._delimiterStack.push(token);
      } else if (token.tag === _token.T_RPAREN || token.tag === _token.T_RBRACE || token.tag === _token.T_RBRACK) {
        if (this._delimiterStack.length === 0) {
          fail(token.startPos, token.endPos, 'unmatched-closing-delimiter', [token.value]);
        }
        var _openingDelimiter = this._delimiterStack.pop();
        if (CLOSING_DELIMITERS[_openingDelimiter.value] !== token.value) {
          fail(_openingDelimiter.startPos, _openingDelimiter.endPos, 'unmatched-opening-delimiter', [_openingDelimiter.value]);
        }
      }
    }

    /*
     * Interface for handling attributes.
     *
     * The pragma ATTRIBUTE@key@value
     * establishes the attribute given by <key> to <value>.
     *
     * Whenever the parser finds a definition of the following kinds:
     *   procedure
     *   function
     *   program
     *   interactive program
     *   type
     * it gets decorated with the pending attributes.
     */

  }, {
    key: 'getPendingAttributes',
    value: function getPendingAttributes() {
      var a = this._pendingAttributes;
      this._pendingAttributes = {};
      return a;
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(key, value) {
      this._pendingAttributes[key] = value;
    }

    /*
     * Interface for handling language options.
     *
     * The pragma LANGUAGE@option sets the given option.
     *
     * The runner module reads these options to initialize the
     * linter/compiler/runtime.
     */

  }, {
    key: 'getLanguageOptions',
    value: function getLanguageOptions() {
      return this._languageOptions;
    }
  }, {
    key: 'addLanguageOption',
    value: function addLanguageOption(option) {
      if (LANGUAGE_OPTIONS.indexOf(option) !== -1) {
        this._languageOptions.push(option);
      } else {
        fail(this._reader, this._reader, 'unknown-language-option', [option]);
      }
    }
  }]);

  return Lexer;
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Linter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ast = __webpack_require__(2);

var _symtable = __webpack_require__(8);

var _exceptions = __webpack_require__(1);

var _i18n = __webpack_require__(0);

var _recursion_checker = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isBlockWithReturn(stmt) {
  return stmt.tag === _ast.N_StmtBlock && stmt.statements.length > 0 && stmt.statements.slice(-1)[0].tag === _ast.N_StmtReturn;
}

function fail(startPos, endPos, reason, args) {
  throw new _exceptions.GbsSyntaxError(startPos, endPos, reason, args);
}

/* A semantic analyzer receives
 *   a symbol table (instance of SymbolTable)
 *   an abstract syntax tree (the output of a parser)
 *
 * Then:
 *
 * - It performs semantic checks (linting) to ensure that the
 *   program is well-formed.
 *
 * - It builds a symbol table with information on global identifiers
 *   such as procedures, functions, types, constructors, and fields.
 *
 * - The semantic analysis is structured as a recursive visit over the
 *   AST.
 *
 * We assume that the AST is the valid output of a parser.
 */

var Linter = exports.Linter = function () {
  function Linter(symtable) {
    _classCallCheck(this, Linter);

    this._symtable = symtable;

    /* All checks performed by the linter have an entry in this dictionary.
     * The value of a check indicates whether it is enabled (true) or
     * disabled (false).
     *
     * If a check is disabled, it does not produce a syntax error.
     */
    this._enabledLinterChecks = {
      // Linter options
      'source-should-have-a-program-definition': true,
      'procedure-should-not-have-return': true,
      'function-should-have-return': true,
      'return-statement-not-allowed-here': true,
      'wildcard-pattern-should-be-last': true,
      'variable-pattern-should-be-last': true,
      'structure-pattern-repeats-constructor': true,
      'structure-pattern-repeats-tuple-arity': true,
      'structure-pattern-repeats-timeout': true,
      'pattern-does-not-match-type': true,
      'patterns-in-interactive-program-must-be-events': true,
      'patterns-in-interactive-program-cannot-be-variables': true,
      'patterns-in-switch-must-not-be-events': true,
      'patterns-in-foreach-must-not-be-events': true,
      'repeated-variable-in-tuple-assignment': true,
      'constructor-used-as-procedure': true,
      'undefined-procedure': true,
      'procedure-arity-mismatch': true,
      'numeric-pattern-repeats-number': true,
      'structure-pattern-arity-mismatch': true,
      'structure-construction-repeated-field': true,
      'structure-construction-invalid-field': true,
      'structure-construction-missing-field': true,
      'structure-construction-cannot-be-an-event': true,
      'undefined-function': true,
      'function-arity-mismatch': true,
      'type-used-as-constructor': true,
      'procedure-used-as-constructor': true,
      'undeclared-constructor': true,
      // Extensions
      'forbidden-extension-destructuring-foreach': true,
      'forbidden-extension-allow-recursion': true
    };
  }

  _createClass(Linter, [{
    key: 'lint',
    value: function lint(ast) {
      this._lintMain(ast);
      return this._symtable;
    }
  }, {
    key: '_ensureLintCheckExists',
    value: function _ensureLintCheckExists(linterCheckId) {
      if (!(linterCheckId in this._enabledLinterChecks)) {
        throw Error('Linter check "' + linterCheckId + '" does not exist.');
      }
    }
  }, {
    key: 'enableCheck',
    value: function enableCheck(linterCheckId, enabled) {
      this._ensureLintCheckExists(linterCheckId);
      this._enabledLinterChecks[linterCheckId] = enabled;
    }
  }, {
    key: '_lintCheck',
    value: function _lintCheck(startPos, endPos, reason, args) {
      this._ensureLintCheckExists(reason);
      if (this._enabledLinterChecks[reason]) {
        fail(startPos, endPos, reason, args);
      }
    }
  }, {
    key: '_lintMain',
    value: function _lintMain(ast) {
      /* Collect all definitions into the symbol table.
       * This should be done all together, before linting individual
       * definitions, so all the names of types, constructors, fields, etc.
       * are already known when checking statements and expressions. */
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ast.definitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var definition = _step.value;

          this._addDefinitionToSymbolTable(definition);
        }

        /* The source should either be empty or have exactly one program */
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (ast.definitions.length > 0 && this._symtable.program === null) {
        this._lintCheck(ast.startPos, ast.endPos, 'source-should-have-a-program-definition', []);
      }

      /* Lint individual definitions */
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = ast.definitions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _definition = _step2.value;

          this._lintDefinition(_definition);
        }

        /* Disable recursion */
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._disableRecursion(ast);
    }
  }, {
    key: '_addDefinitionToSymbolTable',
    value: function _addDefinitionToSymbolTable(definition) {
      switch (definition.tag) {
        case _ast.N_DefProgram:
          return this._symtable.defProgram(definition);
        case _ast.N_DefInteractiveProgram:
          return this._symtable.defInteractiveProgram(definition);
        case _ast.N_DefProcedure:
          return this._symtable.defProcedure(definition);
        case _ast.N_DefFunction:
          return this._symtable.defFunction(definition);
        case _ast.N_DefType:
          return this._symtable.defType(definition);
        default:
          throw Error('Unknown definition: ' + Symbol.keyFor(definition.tag));
      }
    }

    /** Definitions **/

  }, {
    key: '_lintDefinition',
    value: function _lintDefinition(definition) {
      switch (definition.tag) {
        case _ast.N_DefProgram:
          return this._lintDefProgram(definition);
        case _ast.N_DefInteractiveProgram:
          return this._lintDefInteractiveProgram(definition);
        case _ast.N_DefProcedure:
          return this._lintDefProcedure(definition);
        case _ast.N_DefFunction:
          return this._lintDefFunction(definition);
        case _ast.N_DefType:
          return this._lintDefType(definition);
        default:
          throw Error('Linter: Definition not implemented: ' + Symbol.keyFor(definition.tag));
      }
    }
  }, {
    key: '_lintDefProgram',
    value: function _lintDefProgram(definition) {
      /* Lint body */
      this._lintStmtBlock(definition.body, true /* allowReturn */);

      /* Remove all local names */
      this._symtable.exitScope();
    }
  }, {
    key: '_lintDefInteractiveProgram',
    value: function _lintDefInteractiveProgram(definition) {
      /* Lint all branches */
      this._lintSwitchBranches(definition.branches, true /* isInteractiveProgram */
      );
    }
  }, {
    key: '_lintDefProcedure',
    value: function _lintDefProcedure(definition) {
      /* Check that it does not have a return statement */
      if (isBlockWithReturn(definition.body)) {
        this._lintCheck(definition.startPos, definition.endPos, 'procedure-should-not-have-return', [definition.name.value]);
      }

      /* Add parameters as local names */
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = definition.parameters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var parameter = _step3.value;

          this._symtable.addNewLocalName(parameter, _symtable.LocalParameter);
        }

        /* Lint body */
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this._lintStmtBlock(definition.body, false /* !allowReturn */);

      /* Remove all local names */
      this._symtable.exitScope();
    }
  }, {
    key: '_lintDefFunction',
    value: function _lintDefFunction(definition) {
      /* Check that it has a return statement */
      if (!isBlockWithReturn(definition.body)) {
        this._lintCheck(definition.startPos, definition.endPos, 'function-should-have-return', [definition.name.value]);
      }

      /* Add parameters as local names */
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = definition.parameters[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var parameter = _step4.value;

          this._symtable.addNewLocalName(parameter, _symtable.LocalParameter);
        }

        /* Lint body */
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this._lintStmtBlock(definition.body, true /* allowReturn */);

      /* Remove all local names */
      this._symtable.exitScope();
    }
  }, {
    key: '_lintDefType',
    value: function _lintDefType(definition) {}
    /* No restrictions */


    /** Statements **/

  }, {
    key: '_lintStatement',
    value: function _lintStatement(statement) {
      switch (statement.tag) {
        case _ast.N_StmtBlock:
          /* Do not allow return in nested blocks */
          return this._lintStmtBlock(statement, false /* !allowReturn */);
        case _ast.N_StmtReturn:
          return this._lintStmtReturn(statement);
        case _ast.N_StmtIf:
          return this._lintStmtIf(statement);
        case _ast.N_StmtRepeat:
          return this._lintStmtRepeat(statement);
        case _ast.N_StmtForeach:
          return this._lintStmtForeach(statement);
        case _ast.N_StmtWhile:
          return this._lintStmtWhile(statement);
        case _ast.N_StmtSwitch:
          return this._lintStmtSwitch(statement);
        case _ast.N_StmtAssignVariable:
          return this._lintStmtAssignVariable(statement);
        case _ast.N_StmtAssignTuple:
          return this._lintStmtAssignTuple(statement);
        case _ast.N_StmtProcedureCall:
          return this._lintStmtProcedureCall(statement);
        default:
          throw Error('Linter: Statement not implemented: ' + Symbol.keyFor(statement.tag));
      }
    }
  }, {
    key: '_lintStmtBlock',
    value: function _lintStmtBlock(block, allowReturn) {
      var i = 0;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = block.statements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var statement = _step5.value;

          var returnAllowed = allowReturn && i === block.statements.length - 1;
          if (!returnAllowed && statement.tag === _ast.N_StmtReturn) {
            this._lintCheck(statement.startPos, statement.endPos, 'return-statement-not-allowed-here', []);
          }
          this._lintStatement(statement);
          i++;
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: '_lintStmtReturn',
    value: function _lintStmtReturn(statement) {
      this._lintExpression(statement.result);
    }
  }, {
    key: '_lintStmtIf',
    value: function _lintStmtIf(statement) {
      this._lintExpression(statement.condition);
      this._lintStatement(statement.thenBlock);
      if (statement.elseBlock !== null) {
        this._lintStatement(statement.elseBlock);
      }
    }
  }, {
    key: '_lintStmtRepeat',
    value: function _lintStmtRepeat(statement) {
      this._lintExpression(statement.times);
      this._lintStatement(statement.body);
    }
  }, {
    key: '_lintStmtForeach',
    value: function _lintStmtForeach(statement) {
      this._lintStmtForeachPattern(statement.pattern);
      this._lintExpression(statement.range);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = statement.pattern.boundVariables[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var variable = _step6.value;

          this._symtable.addNewLocalName(variable, _symtable.LocalIndex);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      this._lintStatement(statement.body);
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = statement.pattern.boundVariables[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _variable = _step7.value;

          this._symtable.removeLocalName(_variable);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  }, {
    key: '_lintStmtForeachPattern',
    value: function _lintStmtForeachPattern(pattern) {
      /* If "DestructuringForeach" is disabled, forbid complex patterns.
       * Allow only variable patterns (indices). */
      if (pattern.tag !== _ast.N_PatternVariable) {
        this._lintCheck(pattern.startPos, pattern.endPos, 'forbidden-extension-destructuring-foreach', []);
      }

      /* Check that the pattern itself is well-formed */
      this._lintPattern(pattern);

      /* The pattern in a foreach cannot be an event */
      var patternType = this._patternType(pattern);
      if (patternType === (0, _i18n.i18n)('TYPE:Event')) {
        this._lintCheck(pattern.startPos, pattern.endPos, 'patterns-in-foreach-must-not-be-events', []);
      }
    }
  }, {
    key: '_lintStmtWhile',
    value: function _lintStmtWhile(statement) {
      this._lintExpression(statement.condition);
      this._lintStatement(statement.body);
    }
  }, {
    key: '_lintStmtSwitch',
    value: function _lintStmtSwitch(statement) {
      this._lintExpression(statement.subject);
      this._lintSwitchBranches(statement.branches, false /* !isInteractiveProgram */
      );
    }
  }, {
    key: '_lintSwitchBranches',
    value: function _lintSwitchBranches(branches, isInteractiveProgram) {
      this._lintBranches(branches, isInteractiveProgram, false /* isMatching */);
    }
  }, {
    key: '_lintBranches',
    value: function _lintBranches(branches, isInteractiveProgram, isMatching) {
      /* Check that each pattern is well-formed */
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = branches[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var branch = _step8.value;

          this._lintPattern(branch.pattern);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      this._branchesCheckWildcardAndVariable(branches);
      this._branchesCheckNoRepeats(branches);
      this._branchesCheckCompatible(branches);
      if (isInteractiveProgram) {
        this._branchesCheckTypeEvent(branches);
      } else {
        this._branchesCheckTypeNotEvent(branches);
      }

      /* Lint recursively each branch */
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = branches[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _branch = _step9.value;

          this._lintBranchBody(_branch, isMatching);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }

    /* Check that there is at most one wildcard/variable pattern at the end */

  }, {
    key: '_branchesCheckWildcardAndVariable',
    value: function _branchesCheckWildcardAndVariable(branches) {
      var i = 0;
      var n = branches.length;
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = branches[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var branch = _step10.value;

          if (branch.pattern.tag === _ast.N_PatternWildcard && i !== n - 1) {
            this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'wildcard-pattern-should-be-last', []);
          }
          if (branch.pattern.tag === _ast.N_PatternVariable && i !== n - 1) {
            this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'variable-pattern-should-be-last', [branch.pattern.variableName.value]);
          }
          i++;
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }

    /* Check that there are no repeated constructors in a sequence
     * of branches. */

  }, {
    key: '_branchesCheckNoRepeats',
    value: function _branchesCheckNoRepeats(branches) {
      var coveredNumbers = {};
      var coveredConstructors = {};
      var coveredTuples = {};
      var coveredTimeout = false;
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = branches[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var branch = _step11.value;

          switch (branch.pattern.tag) {
            case _ast.N_PatternWildcard:case _ast.N_PatternVariable:
              /* Already checked in _switchBranchesCheckWildcardAndVariable */
              break;
            case _ast.N_PatternNumber:
              var number = branch.pattern.number.value;
              if (number in coveredNumbers) {
                this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'numeric-pattern-repeats-number', [number]);
              }
              coveredNumbers[number] = true;
              break;
            case _ast.N_PatternStructure:
              var constructorName = branch.pattern.constructorName.value;
              if (constructorName in coveredConstructors) {
                this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'structure-pattern-repeats-constructor', [constructorName]);
              }
              coveredConstructors[constructorName] = true;
              break;
            case _ast.N_PatternTuple:
              var arity = branch.pattern.boundVariables.length;
              if (arity in coveredTuples) {
                this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'structure-pattern-repeats-tuple-arity', [arity]);
              }
              coveredTuples[arity] = true;
              break;
            case _ast.N_PatternTimeout:
              if (coveredTimeout) {
                this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'structure-pattern-repeats-timeout', []);
              }
              coveredTimeout = true;
              break;
            default:
              throw Error('Linter: pattern "' + Symbol.keyFor(branch.pattern.tag) + '" not implemented.');
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }
    }

    /* Check that constructors are compatible,
     * i.e. that they belong to the same type */

  }, {
    key: '_branchesCheckCompatible',
    value: function _branchesCheckCompatible(branches) {
      var expectedType = null;
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = branches[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var branch = _step12.value;

          var patternType = this._patternType(branch.pattern);
          if (expectedType === null) {
            expectedType = patternType;
          } else if (patternType !== null && expectedType !== patternType) {
            this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'pattern-does-not-match-type', [(0, _i18n.i18n)('<pattern-type>')(expectedType), (0, _i18n.i18n)('<pattern-type>')(patternType)]);
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }

    /* Check that there are patterns are of type Event */

  }, {
    key: '_branchesCheckTypeEvent',
    value: function _branchesCheckTypeEvent(branches) {
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = branches[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var branch = _step13.value;

          var patternType = this._patternType(branch.pattern);
          if (patternType !== null && patternType !== (0, _i18n.i18n)('TYPE:Event')) {
            this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'patterns-in-interactive-program-must-be-events', []);
          }
          if (branch.pattern.tag === _ast.N_PatternVariable) {
            this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'patterns-in-interactive-program-cannot-be-variables', []);
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    }

    /* Check that there are no patterns of type Event */

  }, {
    key: '_branchesCheckTypeNotEvent',
    value: function _branchesCheckTypeNotEvent(branches) {
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = branches[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var branch = _step14.value;

          var patternType = this._patternType(branch.pattern);
          if (patternType === (0, _i18n.i18n)('TYPE:Event')) {
            this._lintCheck(branch.pattern.startPos, branch.pattern.endPos, 'patterns-in-switch-must-not-be-events', []);
          }
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14.return) {
            _iterator14.return();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }
    }

    /* Recursively lint the body of each branch. Locally bind variables. */

  }, {
    key: '_lintBranchBody',
    value: function _lintBranchBody(branch, isMatching) {
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = branch.pattern.boundVariables[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var variable = _step15.value;

          this._symtable.addNewLocalName(variable, _symtable.LocalParameter);
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15.return) {
            _iterator15.return();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      if (isMatching) {
        this._lintExpression(branch.body);
      } else {
        this._lintStatement(branch.body);
      }
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = branch.pattern.boundVariables[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _variable2 = _step16.value;

          this._symtable.removeLocalName(_variable2);
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }
    }

    /* Return a description of the type of a pattern */

  }, {
    key: '_patternType',
    value: function _patternType(pattern) {
      switch (pattern.tag) {
        case _ast.N_PatternWildcard:case _ast.N_PatternVariable:
          return null;
        case _ast.N_PatternNumber:
          return (0, _i18n.i18n)('TYPE:Integer');
        case _ast.N_PatternStructure:
          return this._symtable.constructorType(pattern.constructorName.value);
        case _ast.N_PatternTuple:
          return '_TUPLE_' + pattern.boundVariables.length.toString();
        case _ast.N_PatternTimeout:
          return (0, _i18n.i18n)('TYPE:Event');
        default:
          throw Error('Linter: pattern "' + Symbol.keyFor(pattern.tag) + '" not implemented.');
      }
    }
  }, {
    key: '_lintStmtAssignVariable',
    value: function _lintStmtAssignVariable(statement) {
      this._symtable.setLocalName(statement.variable, _symtable.LocalVariable);
      this._lintExpression(statement.value);
    }
  }, {
    key: '_lintStmtAssignTuple',
    value: function _lintStmtAssignTuple(statement) {
      var variables = {};
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = statement.variables[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var variable = _step17.value;

          this._symtable.setLocalName(variable, _symtable.LocalVariable);
          if (variable.value in variables) {
            this._lintCheck(variable.startPos, variable.endPos, 'repeated-variable-in-tuple-assignment', [variable.value]);
          }
          variables[variable.value] = true;
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17.return) {
            _iterator17.return();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      this._lintExpression(statement.value);
    }
  }, {
    key: '_lintStmtProcedureCall',
    value: function _lintStmtProcedureCall(statement) {
      var name = statement.procedureName.value;

      /* Check that it is a procedure */
      if (!this._symtable.isProcedure(name)) {
        if (this._symtable.isConstructor(name)) {
          this._lintCheck(statement.startPos, statement.endPos, 'constructor-used-as-procedure', [name, this._symtable.constructorType(name)]);
        } else {
          this._lintCheck(statement.startPos, statement.endPos, 'undefined-procedure', [name]);
        }
      }

      /* Check that the number of argument coincides */
      var expected = this._symtable.procedureParameters(name).length;
      var received = statement.args.length;
      if (expected !== received) {
        this._lintCheck(statement.startPos, statement.endPos, 'procedure-arity-mismatch', [name, expected, received]);
      }

      /* Check all the arguments */
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = statement.args[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var argument = _step18.value;

          this._lintExpression(argument);
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18.return) {
            _iterator18.return();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }
    }

    /** Patterns **/

  }, {
    key: '_lintPattern',
    value: function _lintPattern(pattern) {
      switch (pattern.tag) {
        case _ast.N_PatternWildcard:
          return this._lintPatternWildcard(pattern);
        case _ast.N_PatternVariable:
          return this._lintPatternVariable(pattern);
        case _ast.N_PatternNumber:
          return this._lintPatternNumber(pattern);
        case _ast.N_PatternStructure:
          return this._lintPatternStructure(pattern);
        case _ast.N_PatternTuple:
          return this._lintPatternTuple(pattern);
        case _ast.N_PatternTimeout:
          return this._lintPatternTimeout(pattern);
        default:
          throw Error('Linter: pattern "' + Symbol.keyFor(pattern.tag) + '" not implemented.');
      }
    }
  }, {
    key: '_lintPatternWildcard',
    value: function _lintPatternWildcard(pattern) {
      /* No restrictions */
    }
  }, {
    key: '_lintPatternVariable',
    value: function _lintPatternVariable(pattern) {
      /* No restrictions */
    }
  }, {
    key: '_lintPatternNumber',
    value: function _lintPatternNumber(pattern) {
      /* No restrictions */
    }
  }, {
    key: '_lintPatternStructure',
    value: function _lintPatternStructure(pattern) {
      var name = pattern.constructorName.value;

      /* Check that the constructor exists */
      if (!this._symtable.isConstructor(name)) {
        this._failExpectedConstructorButGot( // throws
        pattern.startPos, pattern.endPos, name);
        return;
      }

      /* Check that the number of parameters match.
       * Note: constructor patterns with 0 arguments are always allowed.
       */
      var expected = this._symtable.constructorFields(name).length;
      var received = pattern.boundVariables.length;
      if (received > 0 && expected !== received) {
        this._lintCheck(pattern.startPos, pattern.endPos, 'structure-pattern-arity-mismatch', [name, expected, received]);
      }
    }
  }, {
    key: '_lintPatternTuple',
    value: function _lintPatternTuple(pattern) {
      /* No restrictions */
    }
  }, {
    key: '_lintPatternTimeout',
    value: function _lintPatternTimeout(pattern) {}
    /* No restrictions */


    /** Expressions **/

  }, {
    key: '_lintExpression',
    value: function _lintExpression(expression) {
      switch (expression.tag) {
        case _ast.N_ExprVariable:
          return this._lintExprVariable(expression);
        case _ast.N_ExprConstantNumber:
          return this._lintExprConstantNumber(expression);
        case _ast.N_ExprConstantString:
          return this._lintExprConstantString(expression);
        case _ast.N_ExprChoose:
          return this._lintExprChoose(expression);
        case _ast.N_ExprMatching:
          return this._lintExprMatching(expression);
        case _ast.N_ExprList:
          return this._lintExprList(expression);
        case _ast.N_ExprRange:
          return this._lintExprRange(expression);
        case _ast.N_ExprTuple:
          return this._lintExprTuple(expression);
        case _ast.N_ExprStructure:
          return this._lintExprStructure(expression);
        case _ast.N_ExprStructureUpdate:
          return this._lintExprStructureUpdate(expression);
        case _ast.N_ExprFunctionCall:
          return this._lintExprFunctionCall(expression);
        default:
          throw Error('Linter: Expression not implemented: ' + Symbol.keyFor(expression.tag));
      }
    }
  }, {
    key: '_lintExprVariable',
    value: function _lintExprVariable(expression) {
      /* No restrictions.
       * Note: the restriction that a variable is defined before it is used
       * is a dynamic constraint . */
    }
  }, {
    key: '_lintExprConstantNumber',
    value: function _lintExprConstantNumber(expression) {
      /* No restrictions */
    }
  }, {
    key: '_lintExprConstantString',
    value: function _lintExprConstantString(expression) {
      /* No restrictions */
    }
  }, {
    key: '_lintExprChoose',
    value: function _lintExprChoose(expression) {
      this._lintExpression(expression.condition);
      this._lintExpression(expression.trueExpr);
      this._lintExpression(expression.falseExpr);
    }
  }, {
    key: '_lintExprMatching',
    value: function _lintExprMatching(expression) {
      this._lintExpression(expression.subject);
      this._lintMatchingBranches(expression.branches);
    }
  }, {
    key: '_lintMatchingBranches',
    value: function _lintMatchingBranches(branches) {
      this._lintBranches(branches, false /* !isInteractiveProgram */
      , true /* isMatching */
      );
    }
  }, {
    key: '_lintExprList',
    value: function _lintExprList(expression) {
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = expression.elements[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var element = _step19.value;

          this._lintExpression(element);
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19.return) {
            _iterator19.return();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
      }
    }
  }, {
    key: '_lintExprRange',
    value: function _lintExprRange(expression) {
      this._lintExpression(expression.first);
      if (expression.second !== null) {
        this._lintExpression(expression.second);
      }
      this._lintExpression(expression.last);
    }
  }, {
    key: '_lintExprTuple',
    value: function _lintExprTuple(expression) {
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = expression.elements[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var element = _step20.value;

          this._lintExpression(element);
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20.return) {
            _iterator20.return();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }
    }
  }, {
    key: '_lintExprStructure',
    value: function _lintExprStructure(expression) {
      this._lintExprStructureOrUpdate(expression, null);
    }
  }, {
    key: '_lintExprStructureUpdate',
    value: function _lintExprStructureUpdate(expression) {
      this._lintExprStructureOrUpdate(expression, expression.original);
    }

    /* Check a structure construction: C(x1 <- e1, ..., xN <- eN)
     * or a structure update: C(original | x1 <- e1, ..., xN <- eN).
     *
     * If original is null, it is a structure construction.
     * If original is not null, it is the updated expression.
     * */

  }, {
    key: '_lintExprStructureOrUpdate',
    value: function _lintExprStructureOrUpdate(expression, original) {
      /* Check that constructor exists */
      var constructorName = expression.constructorName.value;
      if (!this._symtable.isConstructor(constructorName)) {
        this._failExpectedConstructorButGot( // throws
        expression.startPos, expression.endPos, constructorName);
        return;
      }

      this._checkStructureTypeNotEvent(constructorName, expression);
      this._checkStructureNoRepeatedFields(constructorName, expression);
      this._checkStructureBindingsCorrect(constructorName, expression);

      /* If it is a structure construction, check that the fields are complete */
      if (original === null) {
        this._checkStructureBindingsComplete(constructorName, expression);
      }

      /* If it is an update, recursively check the original expression */
      if (original !== null) {
        this._lintExpression(original);
      }

      /* Recursively check expressions in field bindings */
      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = expression.fieldBindings[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var fieldBinding = _step21.value;

          this._lintExpression(fieldBinding.value);
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21.return) {
            _iterator21.return();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
      }
    }

    /* Check that there are no repeated fields in a structure
     * construction/update */

  }, {
    key: '_checkStructureNoRepeatedFields',
    value: function _checkStructureNoRepeatedFields(constructorName, expression) {
      var declaredFields = expression.fieldNames();
      var seen = {};
      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = declaredFields[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var fieldName = _step22.value;

          if (fieldName in seen) {
            this._lintCheck(expression.startPos, expression.endPos, 'structure-construction-repeated-field', [constructorName, fieldName]);
          }
          seen[fieldName] = true;
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22.return) {
            _iterator22.return();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
      }
    }

    /* Check that all bindings in a structure construction/update
     * correspond to existing fields */

  }, {
    key: '_checkStructureBindingsCorrect',
    value: function _checkStructureBindingsCorrect(constructorName, expression) {
      var declaredFields = expression.fieldNames();
      var constructorFields = this._symtable.constructorFields(constructorName);
      var _iteratorNormalCompletion23 = true;
      var _didIteratorError23 = false;
      var _iteratorError23 = undefined;

      try {
        for (var _iterator23 = declaredFields[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
          var fieldName = _step23.value;

          if (constructorFields.indexOf(fieldName) === -1) {
            this._lintCheck(expression.startPos, expression.endPos, 'structure-construction-invalid-field', [constructorName, fieldName]);
          }
        }
      } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion23 && _iterator23.return) {
            _iterator23.return();
          }
        } finally {
          if (_didIteratorError23) {
            throw _iteratorError23;
          }
        }
      }
    }

    /* Check that bindings in a structure construction/update
     * cover all existing fields */

  }, {
    key: '_checkStructureBindingsComplete',
    value: function _checkStructureBindingsComplete(constructorName, expression) {
      var declaredFields = expression.fieldNames();
      var constructorFields = this._symtable.constructorFields(constructorName);
      var _iteratorNormalCompletion24 = true;
      var _didIteratorError24 = false;
      var _iteratorError24 = undefined;

      try {
        for (var _iterator24 = constructorFields[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
          var fieldName = _step24.value;

          if (declaredFields.indexOf(fieldName) === -1) {
            this._lintCheck(expression.startPos, expression.endPos, 'structure-construction-missing-field', [constructorName, fieldName]);
          }
        }
      } catch (err) {
        _didIteratorError24 = true;
        _iteratorError24 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion24 && _iterator24.return) {
            _iterator24.return();
          }
        } finally {
          if (_didIteratorError24) {
            throw _iteratorError24;
          }
        }
      }
    }

    /* Check that a structure construction/update does not involve
     * constructors of the Event type, which should only be
     * handled implicitly in an interactive program. */

  }, {
    key: '_checkStructureTypeNotEvent',
    value: function _checkStructureTypeNotEvent(constructorName, expression) {
      var constructorType = this._symtable.constructorType(constructorName);
      if (constructorType === (0, _i18n.i18n)('TYPE:Event')) {
        this._lintCheck(expression.startPos, expression.endPos, 'structure-construction-cannot-be-an-event', [constructorName]);
      }
    }
  }, {
    key: '_lintExprFunctionCall',
    value: function _lintExprFunctionCall(expression) {
      /* Check that it is a function or a field */
      var name = expression.functionName.value;
      if (!this._symtable.isFunction(name) && !this._symtable.isField(name)) {
        this._lintCheck(expression.startPos, expression.endPos, 'undefined-function', [name]);
      }

      /* Check that the number of argument coincides */
      var expected = void 0;
      if (this._symtable.isFunction(name)) {
        expected = this._symtable.functionParameters(name).length;
      } else {
        /* Fields always have exactly one parameter */
        expected = 1;
      }
      var received = expression.args.length;
      if (expected !== received) {
        this._lintCheck(expression.startPos, expression.endPos, 'function-arity-mismatch', [name, expected, received]);
      }

      /* Recursively check arguments */
      var _iteratorNormalCompletion25 = true;
      var _didIteratorError25 = false;
      var _iteratorError25 = undefined;

      try {
        for (var _iterator25 = expression.args[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
          var argument = _step25.value;

          this._lintExpression(argument);
        }
      } catch (err) {
        _didIteratorError25 = true;
        _iteratorError25 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion25 && _iterator25.return) {
            _iterator25.return();
          }
        } finally {
          if (_didIteratorError25) {
            throw _iteratorError25;
          }
        }
      }
    }
  }, {
    key: '_disableRecursion',
    value: function _disableRecursion(ast) {
      if (this._enabledLinterChecks['forbidden-extension-allow-recursion']) {
        var cycle = new _recursion_checker.RecursionChecker().callCycle(ast);
        if (cycle !== null) {
          this._lintCheck(cycle[0].location.startPos, cycle[0].location.endPos, 'forbidden-extension-allow-recursion', [cycle]);
        }
      }
    }

    /* Throw a syntax error indicating that we expected the name of a
     * constructor, but we got a name which is not a constructor.
     *
     * If the name is a type or a procedure, provide a more helpful
     * error message. (Coinciding constructor and procedure names are
     * not forbidden, but it is probably a mistake). */

  }, {
    key: '_failExpectedConstructorButGot',
    value: function _failExpectedConstructorButGot(startPos, endPos, name) {
      if (this._symtable.isType(name)) {
        this._lintCheck(startPos, endPos, 'type-used-as-constructor', [name, this._symtable.typeConstructors(name)]);
      } else if (this._symtable.isProcedure(name)) {
        this._lintCheck(startPos, endPos, 'procedure-used-as-constructor', [name]);
      } else {
        this._lintCheck(startPos, endPos, 'undeclared-constructor', [name]);
      }
    }
  }]);

  return Linter;
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecursionChecker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ast = __webpack_require__(2);

var _token = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecursionChecker = exports.RecursionChecker = function () {

  /*
   * Each routine call (i.e. procedure or function call) in the source
   * code is of the form:
   *    R(e1, ..., en)
   * where R is the identifier for the routine.
   *
   * The token R is called the 'location' of the call.
   * Observe that the location includes not only the name of the
   * routine but also its position in the source code.
   *
   * The call graph is a dictionary whose keys are strings
   * and whose values are again dictionaries.
   * The outer and the inner dictionaries are indexed by routine names
   * in such a way that:
   *
   *   _callGraph[F][G]
   *
   * is the location of the first call to G inside the body of F.
   */
  function RecursionChecker() {
    _classCallCheck(this, RecursionChecker);

    this._currentRoutine = null;
    this._callGraph = {};
  }

  /*
   * If there is a cycle in the call graph (using either procedure calls
   * or function calls), return a list:
   *   [c1, ..., cn]
   * where ci is the i-th call involved in a cycle.
   * A call is of the form:
   *   {caller: F , callee: G, location: L}
   * where F is the name (string) of the caller,
   *       G is the name (string) of the callee,
   *   and L is the location of the call.
   *
   * Otherwise return null.
   */


  _createClass(RecursionChecker, [{
    key: 'callCycle',
    value: function callCycle(ast) {
      /* Build the call graph */
      this._visitNode(ast);

      /* Find a cycle in the call graph */
      return this._findCallCycle();
    }

    /* Visitor -- build the call graph */

  }, {
    key: '_addEdge',
    value: function _addEdge(caller, callee) {
      if (!(caller in this._callGraph)) {
        this._callGraph[caller] = {};
      }
      if (!(callee.value in this._callGraph[caller])) {
        this._callGraph[caller][callee.value] = callee;
      }
    }
  }, {
    key: '_visitNode',
    value: function _visitNode(node) {
      if (node === null || node instanceof _token.Token) {
        /* Skip */
      } else if (node instanceof Array) {
        this._visitNodes(node);
      } else {
        this._visitTaggedNode(node);
      }
    }
  }, {
    key: '_visitNodes',
    value: function _visitNodes(nodes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          this._visitNode(node);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_visitTaggedNode',
    value: function _visitTaggedNode(node) {
      switch (node.tag) {
        case _ast.N_DefProgram:
        case _ast.N_DefInteractiveProgram:
          this._visitProgramDefinition(node);
          break;
        case _ast.N_DefProcedure:
        case _ast.N_DefFunction:
          this._visitRoutineDefinition(node);
          break;
        case _ast.N_StmtProcedureCall:
          this._visitProcedureCall(node);
          break;
        case _ast.N_ExprFunctionCall:
          this._visitFunctionCall(node);
          break;
      }
      this._visitNodes(node.children);
    }
  }, {
    key: '_visitProgramDefinition',
    value: function _visitProgramDefinition(node) {
      this._currentRoutine = 'program';
    }
  }, {
    key: '_visitRoutineDefinition',
    value: function _visitRoutineDefinition(node) {
      this._currentRoutine = node.name.value;
    }
  }, {
    key: '_visitProcedureCall',
    value: function _visitProcedureCall(node) {
      this._addEdge(this._currentRoutine, node.procedureName);
    }
  }, {
    key: '_visitFunctionCall',
    value: function _visitFunctionCall(node) {
      this._addEdge(this._currentRoutine, node.functionName);
    }

    /* Find a cycle in the call graph */

  }, {
    key: '_findCallCycle',
    value: function _findCallCycle() {
      var visited = {};
      var parents = {};
      for (var f in this._callGraph) {
        visited[f] = true;
        parents[f] = true;
        var cycle = this._findCallCycleFrom(visited, parents, [], f);
        if (cycle != null) {
          return cycle;
        }
        delete parents[f];
      }
      return null;
    }
  }, {
    key: '_findCallCycleFrom',
    value: function _findCallCycleFrom(visited, parents, path, f) {
      for (var g in this._callGraph[f]) {
        path.push({
          'caller': f,
          'callee': g,
          'location': this._callGraph[f][g]
        });
        if (g in parents) {
          while (path[0].caller !== g) {
            path.shift();
          }
          path.push();
          return path; /* Cycle */
        }
        if (!(g in visited)) {
          visited[g] = true;
          parents[g] = true;
          var cycle = this._findCallCycleFrom(visited, parents, path, g);
          if (cycle !== null) {
            return cycle;
          }
          delete parents[g];
        }
        path.pop();
      }
      return null;
    }
  }]);

  return RecursionChecker;
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compiler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ast = __webpack_require__(2);

var _instruction = __webpack_require__(9);

var _value = __webpack_require__(5);

var _runtime = __webpack_require__(4);

var _i18n = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * A compiler receives a symbol table (instance of SymbolTable).
 *
 * The method this.compile(ast) receives an abstract syntax tree
 * (the output of a parser).
 *
 * The AST is expected to have been linted against the given symbol table.
 *
 * The compiler produces an instance of Code, representing code for the
 * virtual machine.
 *
 * Compiling a program should never throw an exception.
 * Exceptions thrown in this module correspond to assertions,
 * i.e. internal errors that should never occur.
 * - Static conditions should be checked beforehand during the
 *   parsing and linting phases.
 * - Runtime conditions are to be checked later, during execution.
 */
var Compiler = exports.Compiler = function () {
  function Compiler(symtable) {
    _classCallCheck(this, Compiler);

    this._symtable = symtable;
    this._code = new _instruction.Code([]);
    this._nextLabel = 0;
    this._nextVariable = 0;
    this._primitives = new _runtime.RuntimePrimitives();
  }

  _createClass(Compiler, [{
    key: 'compile',
    value: function compile(ast) {
      this._compileMain(ast);
      return this._code;
    }
  }, {
    key: '_compileMain',
    value: function _compileMain(ast) {
      /* Accept the empty source */
      if (ast.definitions.length === 0) {
        this._produce(ast.startPos, ast.endPos, new _instruction.IReturn());
        return;
      }

      /* Compile the program (or interactive program) */
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ast.definitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var definition = _step.value;

          if (definition.tag === _ast.N_DefProgram) {
            this._compileDefProgram(definition);
          } else if (definition.tag === _ast.N_DefInteractiveProgram) {
            this._compileDefInteractiveProgram(definition);
          }
        }

        /* Compile procedures and functions */
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = ast.definitions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _definition = _step2.value;

          if (_definition.tag === _ast.N_DefProcedure) {
            this._compileDefProcedure(_definition);
          } else if (_definition.tag === _ast.N_DefFunction) {
            this._compileDefFunction(_definition);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: '_compileDefProgram',
    value: function _compileDefProgram(definition) {
      this._compileStatement(definition.body);
      this._produce(definition.startPos, definition.endPos, new _instruction.IReturn());
    }

    /* An interactive program is compiled as a switch statement
     * followed by a Return instruction. */

  }, {
    key: '_compileDefInteractiveProgram',
    value: function _compileDefInteractiveProgram(definition) {
      this._compileMatchBranches(definition, false /* isMatching */);
      this._produce(definition.startPos, definition.endPos, new _instruction.IReturn());
    }

    /* A procedure definition:
     *
     *   procedure P(x1, ..., xN) {
     *     <body>
     *   }
     *
     * is compiled as follows:
     *
     *   P:
     *     SetVariable x1
     *     ...
     *     SetVariable xN
     *     <body>
     *     Return
     */

  }, {
    key: '_compileDefProcedure',
    value: function _compileDefProcedure(definition) {
      this._produce(definition.startPos, definition.endPos, new _instruction.ILabel(definition.name.value));
      for (var i = 0; i < definition.parameters.length; i++) {
        var parameterName = definition.parameters[i].value;
        this._produce(definition.startPos, definition.endPos, new _instruction.ISetVariable(parameterName));
      }
      this._compileStatement(definition.body);
      this._produce(definition.startPos, definition.endPos, new _instruction.IReturn());
    }

    /* A function definition:
     *
     *   function f(x1, ..., xN) {
     *     <body>
     *   }
     *
     * is compiled as follows:
     *
     *   f:
     *     SaveState
     *     SetVariable x1
     *     ...
     *     SetVariable xN
     *     <body>
     *     RestoreState
     *     Return
     */

  }, {
    key: '_compileDefFunction',
    value: function _compileDefFunction(definition) {
      this._produceList(definition.startPos, definition.endPos, [new _instruction.ILabel(definition.name.value), new _instruction.ISaveState()]);
      for (var i = 0; i < definition.parameters.length; i++) {
        var parameterName = definition.parameters[i].value;
        this._produce(definition.startPos, definition.endPos, new _instruction.ISetVariable(parameterName));
      }
      this._compileStatement(definition.body);
      this._produceList(definition.startPos, definition.endPos, [new _instruction.IRestoreState(), new _instruction.IReturn()]);
    }

    /* Statements are compiled to VM instructions that start and end
     * with an empty local stack. The stack may grow and shrink during the
     * execution of a statement, but it should be empty by the end.
     *
     * The only exception to this rule is the "return" statement, which
     * pushes a single value on the stack.
     */

  }, {
    key: '_compileStatement',
    value: function _compileStatement(statement) {
      switch (statement.tag) {
        case _ast.N_StmtBlock:
          return this._compileStmtBlock(statement);
        case _ast.N_StmtReturn:
          return this._compileStmtReturn(statement);
        case _ast.N_StmtIf:
          return this._compileStmtIf(statement);
        case _ast.N_StmtRepeat:
          return this._compileStmtRepeat(statement);
        case _ast.N_StmtForeach:
          return this._compileStmtForeach(statement);
        case _ast.N_StmtWhile:
          return this._compileStmtWhile(statement);
        case _ast.N_StmtSwitch:
          return this._compileStmtSwitch(statement);
        case _ast.N_StmtAssignVariable:
          return this._compileStmtAssignVariable(statement);
        case _ast.N_StmtAssignTuple:
          return this._compileStmtAssignTuple(statement);
        case _ast.N_StmtProcedureCall:
          return this._compileStmtProcedureCall(statement);
        default:
          throw Error('Compiler: Statement not implemented: ' + Symbol.keyFor(statement.tag));
      }
    }
  }, {
    key: '_compileStmtBlock',
    value: function _compileStmtBlock(block) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = block.statements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var statement = _step3.value;

          this._compileStatement(statement);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    /* Merely push the return value in the stack.
     * The "new IReturn()" instruction itself is produced by the
     * methods:
     *   _compileDefProgram
     *   _compileDefInteractiveProgram
     *   _compileDefProcedure
     *   _compileDefFunction
     * */

  }, {
    key: '_compileStmtReturn',
    value: function _compileStmtReturn(statement) {
      return this._compileExpression(statement.result);
    }

    /*
     * If without else:
     *
     *   <condition>
     *   TypeCheck Bool
     *   JumpIfFalse labelElse
     *   <thenBranch>
     *   labelElse:
     *
     * If with else:
     *
     *   <condition>
     *   TypeCheck Bool
     *   JumpIfFalse labelElse
     *   <thenBranch>
     *   Jump labelEnd
     *   labelElse:
     *   <elseBranch>
     *   labelEnd:
     */

  }, {
    key: '_compileStmtIf',
    value: function _compileStmtIf(statement) {
      this._compileExpression(statement.condition);
      this._produce(statement.condition.startPos, statement.condition.endPos, new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})));
      var labelElse = this._freshLabel();
      this._produce(statement.startPos, statement.endPos, new _instruction.IJumpIfFalse(labelElse));
      this._compileStatement(statement.thenBlock);
      if (statement.elseBlock === null) {
        this._produce(statement.startPos, statement.endPos, new _instruction.ILabel(labelElse));
      } else {
        var labelEnd = this._freshLabel();
        this._produceList(statement.startPos, statement.endPos, [new _instruction.IJump(labelEnd), new _instruction.ILabel(labelElse)]);
        this._compileStatement(statement.elseBlock);
        this._produce(statement.startPos, statement.endPos, new _instruction.ILabel(labelEnd));
      }
    }

    /* <times>
     * TypeCheck Integer
     * labelStart:
     *   Dup                     ;\
     *   PushInteger 0           ;| if not positive, end
     *   PrimitiveCall ">", 2    ;|
     *   JumpIfFalse labelEnd    ;/
     *   <body>
     *   PushInteger 1           ;\ subtract 1
     *   PrimitiveCall "-", 2    ;/
     * Jump labelStart
     * labelEnd:
     * Pop                       ; pop the remaining number
     */

  }, {
    key: '_compileStmtRepeat',
    value: function _compileStmtRepeat(statement) {
      this._compileExpression(statement.times);
      this._produce(statement.times.startPos, statement.times.endPos, new _instruction.ITypeCheck(new _value.TypeInteger()));
      var labelStart = this._freshLabel();
      var labelEnd = this._freshLabel();
      this._produceList(statement.startPos, statement.endPos, [new _instruction.ILabel(labelStart), new _instruction.IDup(), new _instruction.IPushInteger(0), new _instruction.IPrimitiveCall('>', 2), new _instruction.IJumpIfFalse(labelEnd)]);
      this._compileStatement(statement.body);
      this._produceList(statement.startPos, statement.endPos, [new _instruction.IPushInteger(1), new _instruction.IPrimitiveCall('-', 2), new _instruction.IJump(labelStart), new _instruction.ILabel(labelEnd), new _instruction.IPop()]);
    }

    /* <range>                   ;\ _list = temporary variable
     * TypeCheck List(Any)       ;| holding the list we are ranging over
     * SetVariable _list         ;/
     *
     * PushVariable _list                    ;\ _n = temporary variable
     * PrimitiveCall "_unsafeListLength", 1  ;| holding the total length
     * SetVariable _n                        ;/ of the list
     *
     * PushInteger 0             ;\ _pos = temporary variable holding the
     * SetVariable _pos          ;/ current index inside the list
     *
     * labelStart:
     *   PushVariable _pos       ;\
     *   PushVariable _n         ;| if out of the bounds of the list, end
     *   PrimitiveCall "<", 2    ;|
     *   JumpIfFalse labelEnd    ;/
     *
     *   PushVariable _list                    ;\ get the `pos`-th element of the
     *   PushVariable _pos                     ;| list and match the value
     *   PrimitiveCall "_unsafeListNth", 2     ;| with the pattern of the foreach
     *   [match with the pattern or fail]      ;/
     *
     *   <body>
     *
     *   PushVariable _pos       ;\
     *   PushInteger 1           ;| add 1 to the current index
     *   PrimitiveCall "+", 2    ;|
     *   SetVariable _pos        ;/
     *
     * Jump labelStart
     * labelEnd:
     * UnsetVariable _list
     * UnsetVariable _n
     * UnsetVariable _pos
     * [unset all the variables bound by the pattern]
     */

  }, {
    key: '_compileStmtForeach',
    value: function _compileStmtForeach(statement) {
      var labelStart = this._freshLabel();
      var labelEnd = this._freshLabel();
      var list = this._freshVariable();
      var pos = this._freshVariable();
      var n = this._freshVariable();

      this._compileExpression(statement.range);
      this._produceList(statement.range.startPos, statement.range.endPos, [new _instruction.ITypeCheck(new _value.TypeList(new _value.TypeAny())), new _instruction.ISetVariable(list), new _instruction.IPushVariable(list), new _instruction.IPrimitiveCall('_unsafeListLength', 1), new _instruction.ISetVariable(n)]);
      this._produceList(statement.startPos, statement.endPos, [new _instruction.IPushInteger(0), new _instruction.ISetVariable(pos), new _instruction.ILabel(labelStart), new _instruction.IPushVariable(pos), new _instruction.IPushVariable(n), new _instruction.IPrimitiveCall('<', 2), new _instruction.IJumpIfFalse(labelEnd), new _instruction.IPushVariable(list), new _instruction.IPushVariable(pos), new _instruction.IPrimitiveCall('_unsafeListNth', 2)]);
      this._compileMatchForeachPatternOrFail(statement.pattern);
      this._compileStatement(statement.body);
      this._produceList(statement.startPos, statement.endPos, [new _instruction.IPushVariable(pos), new _instruction.IPushInteger(1), new _instruction.IPrimitiveCall('+', 2), new _instruction.ISetVariable(pos), new _instruction.IJump(labelStart), new _instruction.ILabel(labelEnd), new _instruction.IUnsetVariable(list), new _instruction.IUnsetVariable(n), new _instruction.IUnsetVariable(pos)]);
      this._compilePatternUnbind(statement.pattern);
    }

    /* Attempt to match the pattern against the top of the stack.
     * If the pattern matches, bind its variables.
     * Otherwise, issue an error message.
     * Always pops the top of the stack.
     */

  }, {
    key: '_compileMatchForeachPatternOrFail',
    value: function _compileMatchForeachPatternOrFail(pattern) {
      switch (pattern.tag) {
        case _ast.N_PatternWildcard:
          this._produce(pattern.startPos, pattern.endPos, new _instruction.IPop());
          return;
        case _ast.N_PatternVariable:
          this._produce(pattern.startPos, pattern.endPos, new _instruction.ISetVariable(pattern.variableName.value));
          return;
        default:
          /* Attempt to match, issuing an error message if there is no match:
           *
           *   [if subject matches pattern, jump to L]
           *   [error message: no match]
           * L:
           *   [bind pattern to subject]
           *   [pop subject]
           */
          var label = this._freshLabel();
          this._compilePatternCheck(pattern, label);
          this._produceList(pattern.startPos, pattern.endPos, [new _instruction.IPushString('foreach-pattern-does-not-match'), new _instruction.IPrimitiveCall('_FAIL', 1), new _instruction.ILabel(label)]);
          this._compilePatternBind(pattern);
          this._produce(pattern.startPos, pattern.endPos, new _instruction.IPop());
          return;
      }
    }

    /* labelStart:
     * <condition>
     * TypeCheck Bool
     * JumpIfFalse labelEnd
     * <body>
     * Jump labelStart
     * labelEnd:
     */

  }, {
    key: '_compileStmtWhile',
    value: function _compileStmtWhile(statement) {
      var labelStart = this._freshLabel();
      var labelEnd = this._freshLabel();
      this._produce(statement.startPos, statement.endPos, new _instruction.ILabel(labelStart));
      this._compileExpression(statement.condition);
      this._produceList(statement.startPos, statement.endPos, [new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})), new _instruction.IJumpIfFalse(labelEnd)]);
      this._compileStatement(statement.body);
      this._produceList(statement.startPos, statement.endPos, [new _instruction.IJump(labelStart), new _instruction.ILabel(labelEnd)]);
    }

    /* If the branches of the switch are:
     *    pattern1 -> body1
     *    ...      -> ...
     *    patternN -> bodyN
     * the switch construction is compiled as follows:
     *
     * <subject>
     *   [if matches pattern1, jump to label1]
     *   ...
     *   [if matches patternN, jump to labelN]
     *   [error message: no match]
     *
     * label1:
     *   [bind parameters in pattern1]
     *   [pop subject]
     *   <body1>
     *   [unbind parameters in pattern1]
     *   Jump labelEnd
     * ...
     * labelN:
     *   [bind parameters in patternN]
     *   [pop subject]
     *   <bodyN>
     *   [unbind parameters in patternN]
     *   Jump labelEnd
     * labelEnd:
     */

  }, {
    key: '_compileStmtSwitch',
    value: function _compileStmtSwitch(statement) {
      /* Compile the subject */
      this._compileExpression(statement.subject);
      this._compileMatchBranches(statement, false /* !isMatching */);
    }
  }, {
    key: '_compileMatchBranches',
    value: function _compileMatchBranches(statement, isMatching) {
      var branchLabels = [];
      /* Attempt to match each pattern */
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = statement.branches[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _branch = _step4.value;

          var _label = this._freshLabel();
          branchLabels.push(_label);
          this._compilePatternCheck(_branch.pattern, _label);
        }

        /* Issue an error message if there is no match */
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this._produceList(statement.startPos, statement.endPos, [new _instruction.IPushString('switch-does-not-match'), new _instruction.IPrimitiveCall('_FAIL', 1)]);

      /* Compile each branch */
      var labelEnd = this._freshLabel();
      for (var i = 0; i < branchLabels.length; i++) {
        var branch = statement.branches[i];
        var label = branchLabels[i];
        this._produce(branch.startPos, branch.endPos, new _instruction.ILabel(label));
        this._compilePatternBind(branch.pattern);
        this._produce(branch.startPos, branch.endPos, new _instruction.IPop());
        if (isMatching) {
          this._compileExpression(branch.body);
        } else {
          this._compileStatement(branch.body);
        }
        this._compilePatternUnbind(branch.pattern);
        this._produce(branch.startPos, branch.endPos, new _instruction.IJump(labelEnd));
      }
      this._produce(statement.startPos, statement.endPos, new _instruction.ILabel(labelEnd));
    }
  }, {
    key: '_compileStmtAssignVariable',
    value: function _compileStmtAssignVariable(statement) {
      this._compileExpression(statement.value);
      this._produce(statement.startPos, statement.endPos, new _instruction.ISetVariable(statement.variable.value));
    }
  }, {
    key: '_compileStmtAssignTuple',
    value: function _compileStmtAssignTuple(statement) {
      this._compileExpression(statement.value);

      /* Check that the value is indeed a tuple of the expected length */
      var anys = [];
      for (var index = 0; index < statement.variables.length; index++) {
        anys.push(new _value.TypeAny());
      }
      var expectedType = new _value.TypeTuple(anys);
      this._produce(statement.startPos, statement.endPos, new _instruction.ITypeCheck(expectedType));

      /* Assign each variable */
      for (var _index = 0; _index < statement.variables.length; _index++) {
        this._produceList(statement.startPos, statement.endPos, [new _instruction.IReadTupleComponent(_index), new _instruction.ISetVariable(statement.variables[_index].value)]);
      }

      /* Pop the tuple */
      this._produce(statement.startPos, statement.endPos, new _instruction.IPop());
    }

    /* There are two cases:
     * (1) The procedure is a built-in primitive.
     * (2) The procedure is a user-defined procedure.
     */

  }, {
    key: '_compileStmtProcedureCall',
    value: function _compileStmtProcedureCall(statement) {
      var procedureName = statement.procedureName.value;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = statement.args[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var argument = _step5.value;

          this._compileExpression(argument);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (this._primitives.isProcedure(procedureName)) {
        this._compileStmtProcedureCallPrimitive(statement);
      } else if (this._symtable.isProcedure(procedureName)) {
        this._compileStmtProcedureCallUserDefined(statement);
      } else {
        throw Error('Compiler: ' + procedureName + ' is an undefined procedure.');
      }
    }
  }, {
    key: '_compileStmtProcedureCallPrimitive',
    value: function _compileStmtProcedureCallPrimitive(statement) {
      this._produce(statement.startPos, statement.endPos, new _instruction.IPrimitiveCall(statement.procedureName.value, statement.args.length));
    }
  }, {
    key: '_compileStmtProcedureCallUserDefined',
    value: function _compileStmtProcedureCallUserDefined(statement) {
      this._produce(statement.startPos, statement.endPos, new _instruction.ICall(statement.procedureName.value, statement.args.length));
    }

    /* Pattern checks are instructions that check whether the
     * top of the stack has the expected form (matching a given pattern)
     * and, in that case, branching to the given label.
     * The top of the stack is never popped.
     * The arguments of a pattern are not bound by this instruction.
     */

  }, {
    key: '_compilePatternCheck',
    value: function _compilePatternCheck(pattern, targetLabel) {
      switch (pattern.tag) {
        case _ast.N_PatternWildcard:
          return this._compilePatternCheckWildcard(pattern, targetLabel);
        case _ast.N_PatternVariable:
          return this._compilePatternCheckVariable(pattern, targetLabel);
        case _ast.N_PatternNumber:
          return this._compilePatternCheckNumber(pattern, targetLabel);
        case _ast.N_PatternStructure:
          return this._compilePatternCheckStructure(pattern, targetLabel);
        case _ast.N_PatternTuple:
          return this._compilePatternCheckTuple(pattern, targetLabel);
        case _ast.N_PatternTimeout:
          return this._compilePatternCheckTimeout(pattern, targetLabel);
        default:
          throw Error('Compiler: Pattern check not implemented: ' + Symbol.keyFor(pattern.tag));
      }
    }
  }, {
    key: '_compilePatternCheckWildcard',
    value: function _compilePatternCheckWildcard(pattern, targetLabel) {
      this._produce(pattern.startPos, pattern.endPos, new _instruction.IJump(targetLabel));
    }
  }, {
    key: '_compilePatternCheckVariable',
    value: function _compilePatternCheckVariable(pattern, targetLabel) {
      this._produce(pattern.startPos, pattern.endPos, new _instruction.IJump(targetLabel));
    }
  }, {
    key: '_compilePatternCheckNumber',
    value: function _compilePatternCheckNumber(pattern, targetLabel) {
      this._produceList(pattern.startPos, pattern.endPos, [new _instruction.IDup(), new _instruction.ITypeCheck(new _value.TypeInteger()), new _instruction.IPushInteger(pattern.number.value), new _instruction.IPrimitiveCall('/=', 2), new _instruction.IJumpIfFalse(targetLabel)]);
    }
  }, {
    key: '_compilePatternCheckStructure',
    value: function _compilePatternCheckStructure(pattern, targetLabel) {
      /* Check that the type of the value coincides with the type
       * of the constructor */
      var constructorName = pattern.constructorName.value;
      var typeName = this._symtable.constructorType(constructorName);
      var expectedType = new _value.TypeStructure(typeName, {});
      this._produce(pattern.startPos, pattern.endPos, new _instruction.ITypeCheck(expectedType));

      /* Jump if the value matches */
      this._produce(pattern.startPos, pattern.endPos, new _instruction.IJumpIfStructure(constructorName, targetLabel));
    }
  }, {
    key: '_compilePatternCheckTuple',
    value: function _compilePatternCheckTuple(pattern, targetLabel) {
      /* Check that the type of the value coincides with the type
       * of the tuple */
      var anys = [];
      for (var i = 0; i < pattern.boundVariables.length; i++) {
        anys.push(new _value.TypeAny());
      }
      var expectedType = new _value.TypeTuple(anys);
      this._produce(pattern.startPos, pattern.endPos, new _instruction.ITypeCheck(expectedType));

      /* Jump if the value matches */
      this._produce(pattern.startPos, pattern.endPos, new _instruction.IJumpIfTuple(pattern.boundVariables.length, targetLabel));
    }
  }, {
    key: '_compilePatternCheckTimeout',
    value: function _compilePatternCheckTimeout(pattern, targetLabel) {
      this._produce(pattern.startPos, pattern.endPos, new _instruction.IJumpIfStructure((0, _i18n.i18n)('CONS:TIMEOUT'), targetLabel));
    }

    /* Pattern binding are instructions that bind the parameters
     * of a pattern to the corresponding parts of the value currently
     * at the top of the stack. The value at the top of the stack
     * is never popped (it must be duplicated if necessary).
     */

  }, {
    key: '_compilePatternBind',
    value: function _compilePatternBind(pattern) {
      switch (pattern.tag) {
        case _ast.N_PatternWildcard:
          return; /* No parameters to bind */
        case _ast.N_PatternVariable:
          this._compilePatternBindVariable(pattern);
          return;
        case _ast.N_PatternNumber:
          return; /* No parameters to bind */
        case _ast.N_PatternStructure:
          this._compilePatternBindStructure(pattern);
          return;
        case _ast.N_PatternTuple:
          this._compilePatternBindTuple(pattern);
          return;
        case _ast.N_PatternTimeout:
          return; /* No parameters to bind */
        default:
          throw Error('Compiler: Pattern binding not implemented: ' + Symbol.keyFor(pattern.tag));
      }
    }
  }, {
    key: '_compilePatternBindVariable',
    value: function _compilePatternBindVariable(pattern) {
      this._produceList(pattern.startPos, pattern.endPos, [new _instruction.IDup(), new _instruction.ISetVariable(pattern.variableName.value)]);
    }
  }, {
    key: '_compilePatternBindStructure',
    value: function _compilePatternBindStructure(pattern) {
      /* Allow structure pattern with no parameters, even if the constructor
       * has parameters */
      if (pattern.boundVariables.length === 0) {
        return;
      }

      var constructorName = pattern.constructorName.value;
      var fieldNames = this._symtable.constructorFields(constructorName);
      for (var i = 0; i < fieldNames.length; i++) {
        var variable = pattern.boundVariables[i];
        var fieldName = fieldNames[i];
        this._produceList(pattern.startPos, pattern.endPos, [new _instruction.IReadStructureField(fieldName), new _instruction.ISetVariable(variable.value)]);
      }
    }
  }, {
    key: '_compilePatternBindTuple',
    value: function _compilePatternBindTuple(pattern) {
      for (var index = 0; index < pattern.boundVariables.length; index++) {
        var variable = pattern.boundVariables[index];
        this._produceList(pattern.startPos, pattern.endPos, [new _instruction.IReadTupleComponent(index), new _instruction.ISetVariable(variable.value)]);
      }
    }

    /* Pattern unbinding are instructions that unbind the parameters
     * of a pattern. */

  }, {
    key: '_compilePatternUnbind',
    value: function _compilePatternUnbind(pattern) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = pattern.boundVariables[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var variable = _step6.value;

          this._produceList(pattern.startPos, pattern.endPos, [new _instruction.IUnsetVariable(variable.value)]);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    /* Expressions are compiled to instructions that make the size
     * of the local stack grow in exactly one.
     * The stack may grow and shrink during the evaluation of an
     * expression, but an expression should not consume values
     * that were present on the stack before its evaluation started.
     * In the end the stack should have exactly one more value than
     * at the start.
     */

  }, {
    key: '_compileExpression',
    value: function _compileExpression(expression) {
      switch (expression.tag) {
        case _ast.N_ExprVariable:
          return this._compileExprVariable(expression);
        case _ast.N_ExprConstantNumber:
          return this._compileExprConstantNumber(expression);
        case _ast.N_ExprConstantString:
          return this._compileExprConstantString(expression);
        case _ast.N_ExprChoose:
          return this._compileExprChoose(expression);
        case _ast.N_ExprMatching:
          return this._compileExprMatching(expression);
        case _ast.N_ExprList:
          return this._compileExprList(expression);
        case _ast.N_ExprRange:
          return this._compileExprRange(expression);
        case _ast.N_ExprTuple:
          return this._compileExprTuple(expression);
        case _ast.N_ExprStructure:
          return this._compileExprStructure(expression);
        case _ast.N_ExprStructureUpdate:
          return this._compileExprStructureUpdate(expression);
        case _ast.N_ExprFunctionCall:
          return this._compileExprFunctionCall(expression);
        default:
          throw Error('Compiler: Expression not implemented: ' + Symbol.keyFor(expression.tag));
      }
    }
  }, {
    key: '_compileExprVariable',
    value: function _compileExprVariable(expression) {
      this._produce(expression.startPos, expression.endPos, new _instruction.IPushVariable(expression.variableName.value));
    }
  }, {
    key: '_compileExprConstantNumber',
    value: function _compileExprConstantNumber(expression) {
      this._produce(expression.startPos, expression.endPos, new _instruction.IPushInteger(expression.number.value));
    }
  }, {
    key: '_compileExprConstantString',
    value: function _compileExprConstantString(expression) {
      this._produce(expression.startPos, expression.endPos, new _instruction.IPushString(expression.string.value));
    }

    /*
     * An expression of the form:
     *
     *   choose a when (cond) b otherwise
     *
     * is compiled similarly as a statement of the form:
     *
     *   if (cond) { a } else { b }
     *
     * Recall that a 'choose' with many branches:
     *
     *   choose a1 when (cond1)
     *          ...
     *          aN when (condN)
     *          b  otherwise
     *
     * is actually parsed as a sequence of nested binary choose
     * constructions:
     *
     *   choose a1 when (cond1)
     *          (
     *            ...
     *            choose aN when (condN)
     *                    b otherwise
     *            ...
     *          ) otherwise
     *
     */

  }, {
    key: '_compileExprChoose',
    value: function _compileExprChoose(expression) {
      this._compileExpression(expression.condition);
      this._produce(expression.condition.startPos, expression.condition.endPos, new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})));
      var labelOtherwise = this._freshLabel();
      this._produce(expression.startPos, expression.endPos, new _instruction.IJumpIfFalse(labelOtherwise));
      this._compileExpression(expression.trueExpr);
      var labelEnd = this._freshLabel();
      this._produceList(expression.startPos, expression.endPos, [new _instruction.IJump(labelEnd), new _instruction.ILabel(labelOtherwise)]);
      this._compileExpression(expression.falseExpr);
      this._produce(expression.startPos, expression.endPos, new _instruction.ILabel(labelEnd));
    }
  }, {
    key: '_compileExprMatching',
    value: function _compileExprMatching(expression) {
      this._compileExpression(expression.subject);
      this._compileMatchBranches(expression, true /* isMatching */);
    }
  }, {
    key: '_compileExprList',
    value: function _compileExprList(expression) {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = expression.elements[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var element = _step7.value;

          this._compileExpression(element);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      this._produce(expression.startPos, expression.endPos, new _instruction.IMakeList(expression.elements.length));
    }

    /*
     * Range expresions [first..last] and [first,second..last]
     * are compiled by calling the primitive functions
     *   _makeRange
     *   _makeRangeWithSecond
     */

  }, {
    key: '_compileExprRange',
    value: function _compileExprRange(expression) {
      this._compileExpression(expression.first);
      this._compileExpression(expression.last);
      if (expression.second === null) {
        this._produce(expression.startPos, expression.endPos, new _instruction.IPrimitiveCall('_makeRange', 2));
      } else {
        this._compileExpression(expression.second);
        this._produce(expression.startPos, expression.endPos, new _instruction.IPrimitiveCall('_makeRangeWithSecond', 3));
      }
    }
  }, {
    key: '_compileExprTuple',
    value: function _compileExprTuple(expression) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = expression.elements[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var element = _step8.value;

          this._compileExpression(element);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      this._produce(expression.startPos, expression.endPos, new _instruction.IMakeTuple(expression.elements.length));
    }
  }, {
    key: '_compileExprStructure',
    value: function _compileExprStructure(expression) {
      var fieldNames = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = expression.fieldBindings[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var fieldBinding = _step9.value;

          this._compileExpression(fieldBinding.value);
          fieldNames.push(fieldBinding.fieldName.value);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var constructorName = expression.constructorName.value;
      var typeName = this._symtable.constructorType(constructorName);
      this._produce(expression.startPos, expression.endPos, new _instruction.IMakeStructure(typeName, constructorName, fieldNames));
    }
  }, {
    key: '_compileExprStructureUpdate',
    value: function _compileExprStructureUpdate(expression) {
      this._compileExpression(expression.original);
      var fieldNames = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = expression.fieldBindings[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var fieldBinding = _step10.value;

          this._compileExpression(fieldBinding.value);
          fieldNames.push(fieldBinding.fieldName.value);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      var constructorName = expression.constructorName.value;
      var typeName = this._symtable.constructorType(constructorName);
      this._produce(expression.startPos, expression.endPos, new _instruction.IUpdateStructure(typeName, constructorName, fieldNames));
    }

    /* There are four cases:
     * (1) The function is '&&' or '||' which must be considered separately
     *     to account for short-circuting.
     * (2) The function is a built-in primitive.
     * (3) The function is a user-defined function.
     * (4) The function is an observer / field accessor.
     */

  }, {
    key: '_compileExprFunctionCall',
    value: function _compileExprFunctionCall(expression) {
      var functionName = expression.functionName.value;
      if (functionName === '&&') {
        this._compileExprFunctionCallAnd(expression);
      } else if (functionName === '||') {
        this._compileExprFunctionCallOr(expression);
      } else {
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = expression.args[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var argument = _step11.value;

            this._compileExpression(argument);
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
              _iterator11.return();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }

        if (this._primitives.isFunction(functionName)) {
          this._compileExprFunctionCallPrimitive(expression);
        } else if (this._symtable.isFunction(functionName)) {
          this._compileExprFunctionCallUserDefined(expression);
        } else if (this._symtable.isField(functionName)) {
          this._compileExprFunctionCallFieldAccessor(expression);
        } else {
          throw Error('Compiler: ' + functionName + ' is an undefined function.');
        }
      }
    }

    /* <expr1>
     * TypeCheck Bool
     * JumpIfStructure 'False' labelEnd
     * Pop
     * <expr2>
     * TypeCheck Bool
     * labelEnd:
     */

  }, {
    key: '_compileExprFunctionCallAnd',
    value: function _compileExprFunctionCallAnd(expression) {
      var expr1 = expression.args[0];
      var expr2 = expression.args[1];
      var labelEnd = this._freshLabel();
      this._compileExpression(expr1);
      this._produceList(expression.startPos, expression.endPos, [new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})), new _instruction.IJumpIfStructure((0, _i18n.i18n)('CONS:False'), labelEnd), new _instruction.IPop()]);
      this._compileExpression(expr2);
      this._produceList(expression.startPos, expression.endPos, [new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})), new _instruction.ILabel(labelEnd)]);
    }

    /* <expr1>
     * TypeCheck Bool
     * JumpIfStructure 'True' labelEnd
     * Pop
     * <expr2>
     * TypeCheck Bool
     * labelEnd:
     */

  }, {
    key: '_compileExprFunctionCallOr',
    value: function _compileExprFunctionCallOr(expression) {
      var expr1 = expression.args[0];
      var expr2 = expression.args[1];
      var labelEnd = this._freshLabel();
      this._compileExpression(expr1);
      this._produceList(expression.startPos, expression.endPos, [new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})), new _instruction.IJumpIfStructure((0, _i18n.i18n)('CONS:True'), labelEnd), new _instruction.IPop()]);
      this._compileExpression(expr2);
      this._produceList(expression.startPos, expression.endPos, [new _instruction.ITypeCheck(new _value.TypeStructure((0, _i18n.i18n)('TYPE:Bool'), {})), new _instruction.ILabel(labelEnd)]);
    }
  }, {
    key: '_compileExprFunctionCallPrimitive',
    value: function _compileExprFunctionCallPrimitive(expression) {
      this._produce(expression.startPos, expression.endPos, new _instruction.IPrimitiveCall(expression.functionName.value, expression.args.length));
    }
  }, {
    key: '_compileExprFunctionCallUserDefined',
    value: function _compileExprFunctionCallUserDefined(expression) {
      this._produce(expression.startPos, expression.endPos, new _instruction.ICall(expression.functionName.value, expression.args.length));
    }
  }, {
    key: '_compileExprFunctionCallFieldAccessor',
    value: function _compileExprFunctionCallFieldAccessor(expression) {
      this._produceList(expression.startPos, expression.endPos, [new _instruction.IReadStructureFieldPop(expression.functionName.value)]);
    }

    /* Helpers */

    /* Produce the given instruction, setting its starting and ending
     * position to startPos and endPos respectively */

  }, {
    key: '_produce',
    value: function _produce(startPos, endPos, instruction) {
      instruction.startPos = startPos;
      instruction.endPos = endPos;
      this._code.produce(instruction);
    }
  }, {
    key: '_produceList',
    value: function _produceList(startPos, endPos, instructions) {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = instructions[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var instruction = _step12.value;

          this._produce(startPos, endPos, instruction);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }

    /* Create a fresh label name */

  }, {
    key: '_freshLabel',
    value: function _freshLabel() {
      var label = '_l' + this._nextLabel.toString();
      this._nextLabel++;
      return label;
    }

    /* Create a fresh local variable name */

  }, {
    key: '_freshVariable',
    value: function _freshVariable() {
      var v = '_v' + this._nextVariable.toString();
      this._nextVariable++;
      return v;
    }
  }]);

  return Compiler;
}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualMachine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _instruction = __webpack_require__(9);

var _value = __webpack_require__(5);

var _exceptions = __webpack_require__(1);

var _i18n = __webpack_require__(0);

var _runtime = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Conditions that may occur on runtime */
var RT_ExitProgram = Symbol.for('RT_ExitProgram');

/* Instances of RuntimeCondition represent conditions that may occur
 * during runtime (e.g. program termination or timeout). */

var RuntimeCondition = function (_Error) {
  _inherits(RuntimeCondition, _Error);

  function RuntimeCondition(tag) {
    _classCallCheck(this, RuntimeCondition);

    var _this = _possibleConstructorReturn(this, (RuntimeCondition.__proto__ || Object.getPrototypeOf(RuntimeCondition)).call(this, Symbol.keyFor(tag)));

    _this.tag = tag;
    return _this;
  }

  return RuntimeCondition;
}(Error);

/* Runtime condition to mark the end of an execution */


var RuntimeExitProgram = function (_RuntimeCondition) {
  _inherits(RuntimeExitProgram, _RuntimeCondition);

  function RuntimeExitProgram(returnValue) {
    _classCallCheck(this, RuntimeExitProgram);

    var _this2 = _possibleConstructorReturn(this, (RuntimeExitProgram.__proto__ || Object.getPrototypeOf(RuntimeExitProgram)).call(this, RT_ExitProgram));

    _this2.returnValue = returnValue;
    return _this2;
  }

  return RuntimeExitProgram;
}(RuntimeCondition);

function fail(startPos, endPos, reason, args) {
  throw new _exceptions.GbsRuntimeError(startPos, endPos, reason, args);
}

/* An instance of Frame represents the local execution context of a
 * function or procedure (a.k.a. "activation record" or "stack frame").
 *
 * It includes:
 * - the name of the current routine:
 *   + 'program' for the main program
 *   + the name of the current procedure or function
 * - the current instruction pointer
 * - a stack of local values
 * - a map from local names to values
 *
 * Each local variable has a type and a value.
 * - The actual type of the current value held by a variable
 *   should always be an instance of the type.
 * - The type of a variable should be the join of all the
 *   types held historically by the variable.
 * - The Frame does not impose these conditions.
 */

var Frame = function () {
  function Frame(frameId, routineName, instructionPointer) {
    _classCallCheck(this, Frame);

    this._routineName = routineName;
    this._instructionPointer = instructionPointer;
    this._variableTypes = {};
    this._variables = {};
    this._stack = [];

    /* The unique frame identifier is used to uniquely identify
     * a function call during a stack trace. This is used in the
     * API to generate snapshots. */
    this._uniqueFrameId = frameId;
  }

  _createClass(Frame, [{
    key: 'setVariable',


    /* Precondition:
     *   Let oldType = this._variableTypes[name]
     *   if this._variableTypes[name] is defined.
     *   Otherwise, let oldType = new TypeAny().
     *   Then the following condition must hold:
     *     type = joinTypes(value.type(), oldType) */
    value: function setVariable(name, type, value) {
      this._variableTypes[name] = type;
      this._variables[name] = value;
    }
  }, {
    key: 'unsetVariable',
    value: function unsetVariable(name, value) {
      delete this._variables[name];
    }
  }, {
    key: 'getVariableType',
    value: function getVariableType(name) {
      if (name in this._variableTypes) {
        return this._variableTypes[name];
      } else {
        return new _value.TypeAny();
      }
    }
  }, {
    key: 'getVariable',
    value: function getVariable(name) {
      if (name in this._variables) {
        return this._variables[name];
      } else {
        return null;
      }
    }
  }, {
    key: 'stackEmpty',
    value: function stackEmpty() {
      return this._stack.length === 0;
    }
  }, {
    key: 'pushValue',
    value: function pushValue(value) {
      this._stack.push(value);
    }
  }, {
    key: 'stackTop',
    value: function stackTop() {
      if (this._stack.length === 0) {
        throw Error('VM: no value at the top of the stack; the stack is empty.');
      }
      return this._stack[this._stack.length - 1];
    }
  }, {
    key: 'popValue',
    value: function popValue() {
      if (this._stack.length === 0) {
        throw Error('VM: no value to pop; the stack is empty.');
      }
      return this._stack.pop();
    }
  }, {
    key: 'routineName',
    get: function get() {
      return this._routineName;
    }
  }, {
    key: 'uniqueFrameId',
    get: function get() {
      return this._uniqueFrameId;
    }
  }, {
    key: 'instructionPointer',
    get: function get() {
      return this._instructionPointer;
    },
    set: function set(value) {
      this._instructionPointer = value;
    }
  }]);

  return Frame;
}();

/*
 * Receives an instance of Code, representing a program for the virtual
 * machine, and sets it up for running.
 *
 * Then it implements the following interface:
 *
 *   vm.run();    Run the program until termination.
 *                If the program returns a value, this method
 *                returns it. Otherwise it returns null.
 */


var VirtualMachine = exports.VirtualMachine = function () {
  function VirtualMachine(code, initialState) {
    _classCallCheck(this, VirtualMachine);

    this._code = code;

    /* "this._labelTargets" is a dictionary mapping label names to
     * the corresponding instruction pointers.
     *
     * It is calculated automatically from code.
     */
    this._labelTargets = this._code.labelTargets();

    this._nextFrameId = 0;

    /* A "call stack" is a stack of frames.
     *
     * The topmost element of the stack (i.e. the last element of the list)
     * is the execution context of the current function.
     *
     * The previous element is the execution context of the caller, and so on.
     *
     * During the execution of a program the call stack should never
     * become empty.
     */
    this._callStack = [];
    this._callStack.push(this._newFrame('program', 0 /* instructionPointer */));

    /* The global state is the data that is available globally.
     *
     * In Gobstones, the global state is the board. The VM module
     * should not be aware of the actual implementation or nature of
     * the global state.
     *
     * We have a stack of global states.
     *
     * The instruction 'SaveState' saves the current global state.
     * It should be called whenever entering a user-defined function
     * in Gobstones.
     *
     * The instruction 'RestoreState' restores the previous global state.
     * It should be called whenever leaving a user-defined function
     * in Gobstones.
     */
    this._globalStateStack = [initialState];

    /* The following dictionary maps names of primitives to their
     * implementation.
     *
     * A primitive always receives 1 + n parameters, the first one being
     * the board.
     */
    this._primitives = new _runtime.RuntimePrimitives();

    /*
     * A "snapshot callback" is a function that takes snapshots.
     *
     *   snapshotCallback(routineName, position, callStack, globalState)
     *
     *   routineName:
     *     It is the name of the routine that triggers the
     *     snapshot, it might be:
     *     - 'program' for the main program,
     *     - the name of a primitive procedure or function,
     *     - the name of a user-defined procedure or function.
     *
     *   position:
     *     The position in the source code for this snapshot.
     *
     *   callStack:
     *     The current call stack.
     *
     *   globalState:
     *     The current global state.
     *
     * Snapshots
     * If _snapshotCallback is null, the VM does not take snapshots.
     */
    this._snapshotCallback = null;
  }

  _createClass(VirtualMachine, [{
    key: 'run',
    value: function run() {
      return this.runWithTimeout(0);
    }

    /* Run the program, throwing an exception if the given timeout is met.
     * If millisecs is 0, the program is run indefinitely. */

  }, {
    key: 'runWithTimeout',
    value: function runWithTimeout(millisecs) {
      return this.runWithTimeoutTakingSnapshots(millisecs, null);
    }

    /* Restart the program from the beginning, with the given eventValue
     * at the top of the stack.
     *
     * This is used for interactive programs, which work by iteratively
     * making calls to this function.
     */

  }, {
    key: 'runEventWithTimeout',
    value: function runEventWithTimeout(eventValue, millisecs) {
      this._callStack = [this._newFrame('program', 0 /* instructionPointer */)];
      this._currentFrame().pushValue(eventValue);
      return this.runWithTimeout(millisecs);
    }

    /* Run the program, throwing an exception if the given timeout is met.
     * If millisecs is 0, the program is run indefinitely.
     *
     * Snapshots are taken:
     * - At the very start of the program.
     * - At the end of the program.
     * - After calling any primitive procedure or function.
     * - Whenever reaching an I_Return instruction from any routine.
     *
     * The snapshotCallback function receives:
     * - The current call stack (list of frames).
     * - The current global state.
     */

  }, {
    key: 'runWithTimeoutTakingSnapshots',
    value: function runWithTimeoutTakingSnapshots(millisecs, snapshotCallback) {
      var startTime = new Date().getTime();
      this._snapshotCallback = snapshotCallback;
      this._takeSnapshot('program');
      try {
        while (true) {
          this._step();
          this._timeoutIfNeeded(startTime, millisecs);
        }
      } catch (condition) {
        if (condition.tag === RT_ExitProgram) {
          return condition.returnValue;
        } else {
          throw condition;
        }
      }
    }
  }, {
    key: '_newFrame',
    value: function _newFrame(routineName, instructionPointer) {
      var frameId = this._nextFrameId;
      this._nextFrameId++;
      return new Frame(frameId, routineName, instructionPointer);
    }
  }, {
    key: '_timeoutIfNeeded',
    value: function _timeoutIfNeeded(startTime, millisecs) {
      if (millisecs > 0 && new Date().getTime() - startTime > millisecs) {
        var instruction = this._currentInstruction();
        fail(instruction.startPos, instruction.endPos, 'timeout', [millisecs]);
      }
    }
  }, {
    key: '_takeSnapshot',
    value: function _takeSnapshot(routineName) {
      if (this._snapshotCallback !== null) {
        var instruction = this._currentInstruction();
        this._snapshotCallback(routineName, instruction.startPos, this._callStack, this.globalState());
      }
    }
  }, {
    key: 'globalState',
    value: function globalState() {
      return this._globalStateStack[this._globalStateStack.length - 1];
    }
  }, {
    key: 'setGlobalState',
    value: function setGlobalState(globalState) {
      this._globalStateStack[this._globalStateStack.length - 1] = globalState;
    }

    /* Return the current frame, which is the top of the call stack */

  }, {
    key: '_currentFrame',
    value: function _currentFrame() {
      return this._callStack[this._callStack.length - 1];
    }

    /* Return the current instruction, given by the instruction pointer
     * of the current activation record */

  }, {
    key: '_currentInstruction',
    value: function _currentInstruction() {
      return this._code.at(this._currentFrame().instructionPointer);
    }

    /* Execute a single instruction.
     *
     * If the program finishes, it throws an exception
     *   RuntimeExitProgram(returnValue)
     */

  }, {
    key: '_step',
    value: function _step() {
      switch (this._currentInstruction().opcode) {
        case _instruction.I_PushInteger:
          return this._stepPushInteger();
        case _instruction.I_PushString:
          return this._stepPushString();
        case _instruction.I_PushVariable:
          return this._stepPushVariable();
        case _instruction.I_SetVariable:
          return this._stepSetVariable();
        case _instruction.I_UnsetVariable:
          return this._stepUnsetVariable();
        case _instruction.I_Label:
          return this._stepLabel();
        case _instruction.I_Jump:
          return this._stepJump();
        case _instruction.I_JumpIfFalse:
          return this._stepJumpIfFalse();
        case _instruction.I_JumpIfStructure:
          return this._stepJumpIfStructure();
        case _instruction.I_JumpIfTuple:
          return this._stepJumpIfTuple();
        case _instruction.I_Call:
          return this._stepCall();
        case _instruction.I_Return:
          return this._stepReturn();
        case _instruction.I_MakeTuple:
          return this._stepMakeTuple();
        case _instruction.I_MakeList:
          return this._stepMakeList();
        case _instruction.I_MakeStructure:
          return this._stepMakeStructure();
        case _instruction.I_UpdateStructure:
          return this._stepUpdateStructure();
        case _instruction.I_ReadTupleComponent:
          return this._stepReadTupleComponent();
        case _instruction.I_ReadStructureField:
          return this._stepReadStructureField();
        case _instruction.I_ReadStructureFieldPop:
          return this._stepReadStructureFieldPop();
        case _instruction.I_Add:
          return this._stepAdd();
        case _instruction.I_Dup:
          return this._stepDup();
        case _instruction.I_Pop:
          return this._stepPop();
        case _instruction.I_PrimitiveCall:
          return this._stepPrimitiveCall();
        case _instruction.I_SaveState:
          return this._stepSaveState();
        case _instruction.I_RestoreState:
          return this._stepRestoreState();
        case _instruction.I_TypeCheck:
          return this._stepTypeCheck();
        default:
          throw Error('VM: opcode ' + Symbol.keyFor(this._currentInstruction().opcode) + ' not implemented');
      }
    }
  }, {
    key: '_stepPushInteger',
    value: function _stepPushInteger() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      frame.pushValue(new _value.ValueInteger(instruction.number));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepPushString',
    value: function _stepPushString() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      frame.pushValue(new _value.ValueString(instruction.string));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepPushVariable',
    value: function _stepPushVariable() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var value = frame.getVariable(instruction.variableName);
      if (value === null) {
        fail(instruction.startPos, instruction.endPos, 'undefined-variable', [instruction.variableName]);
      }
      frame.pushValue(value);
      frame.instructionPointer++;
    }
  }, {
    key: '_stepSetVariable',
    value: function _stepSetVariable() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var newValue = frame.popValue();

      /* Check that types are compatible */
      var oldType = frame.getVariableType(instruction.variableName);
      var valType = newValue.type();
      var newType = (0, _value.joinTypes)(oldType, valType);
      if (newType === null) {
        fail(instruction.startPos, instruction.endPos, 'incompatible-types-on-assignment', [instruction.variableName, oldType, valType]);
      }

      /* Proceed with assignment */
      frame.setVariable(instruction.variableName, newType, newValue);
      frame.instructionPointer++;
    }
  }, {
    key: '_stepUnsetVariable',
    value: function _stepUnsetVariable() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      frame.unsetVariable(instruction.variableName);
      frame.instructionPointer++;
    }
  }, {
    key: '_stepLabel',
    value: function _stepLabel() {
      /* Ignore pseudo-instruction */
      var frame = this._currentFrame();
      frame.instructionPointer++;
    }
  }, {
    key: '_stepJump',
    value: function _stepJump() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      frame.instructionPointer = this._labelTargets[instruction.targetLabel];
    }
  }, {
    key: '_stepJumpIfFalse',
    value: function _stepJumpIfFalse() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var value = frame.popValue(); /* Pop the value */
      if (value.tag === _value.V_Structure && value.constructorName === 'False') {
        frame.instructionPointer = this._labelTargets[instruction.targetLabel];
      } else {
        frame.instructionPointer++;
      }
    }
  }, {
    key: '_stepJumpIfStructure',
    value: function _stepJumpIfStructure() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var value = frame.stackTop(); /* Do not pop the value */
      if (value.tag === _value.V_Structure && value.constructorName === instruction.constructorName) {
        frame.instructionPointer = this._labelTargets[instruction.targetLabel];
      } else {
        frame.instructionPointer++;
      }
    }
  }, {
    key: '_stepJumpIfTuple',
    value: function _stepJumpIfTuple() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var value = frame.stackTop(); /* Do not pop the value */
      if (value.tag === _value.V_Tuple && value.size() === instruction.size) {
        frame.instructionPointer = this._labelTargets[instruction.targetLabel];
      } else {
        frame.instructionPointer++;
      }
    }
  }, {
    key: '_stepCall',
    value: function _stepCall() {
      var callerFrame = this._currentFrame();
      var instruction = this._currentInstruction();

      /* Create a new stack frame for the callee */
      var newFrame = this._newFrame(instruction.targetLabel, this._labelTargets[instruction.targetLabel]);
      this._callStack.push(newFrame);

      /* Pop arguments from caller's frame and push them into callee's frame */
      for (var i = 0; i < instruction.nargs; i++) {
        if (callerFrame.stackEmpty()) {
          fail(instruction.startPos, instruction.endPos, 'too-few-arguments', [instruction.targetLabel]);
        }
        newFrame.pushValue(callerFrame.popValue());
      }
    }
  }, {
    key: '_stepReturn',
    value: function _stepReturn() {
      var innerFrame = this._currentFrame();

      var returnValue = void 0;
      if (innerFrame.stackEmpty()) {
        returnValue = null;
      } else {
        /* Take a snapshot when leaving a routine other than the program */
        this._takeSnapshot(innerFrame.routineName);

        returnValue = innerFrame.popValue();
        if (!innerFrame.stackEmpty()) {
          throw Error('VM: stack should be empty');
        }
      }

      this._callStack.pop();
      if (this._callStack.length === 0) {
        /* There are no more frames in the call stack, which means
         * that we are returning from the main program. */
        throw new RuntimeExitProgram(returnValue);
      } else {
        /* There are further frames in the call stack, which means
         * that we are returning from a function. */
        var outerFrame = this._currentFrame();
        if (returnValue !== null) {
          outerFrame.pushValue(returnValue);
        }
        outerFrame.instructionPointer++;
      }
    }
  }, {
    key: '_stepMakeTuple',
    value: function _stepMakeTuple() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();

      var elements = [];
      for (var i = 0; i < instruction.size; i++) {
        elements.unshift(frame.popValue());
      }
      frame.pushValue(new _value.ValueTuple(elements));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepMakeList',
    value: function _stepMakeList() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();

      var elements = [];
      for (var i = 0; i < instruction.size; i++) {
        elements.unshift(frame.popValue());
      }

      /* Check that the types of the elements are compatible */
      var contentType = new _value.TypeAny();
      var index = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion = (_step2 = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step2.value;

          var oldType = contentType;
          var newType = element.type();
          contentType = (0, _value.joinTypes)(oldType, newType);
          if (contentType === null) {
            fail(instruction.startPos, instruction.endPos, 'incompatible-types-on-list-creation', [index, oldType, newType]);
          }
          index++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      frame.pushValue(new _value.ValueList(elements));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepMakeStructure',
    value: function _stepMakeStructure() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();

      var fields = {};
      var n = instruction.fieldNames.length;
      for (var i = 0; i < n; i++) {
        var fieldName = instruction.fieldNames[n - i - 1];
        fields[fieldName] = frame.popValue();
      }
      frame.pushValue(new _value.ValueStructure(instruction.typeName, instruction.constructorName, fields));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepUpdateStructure',
    value: function _stepUpdateStructure() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();

      var newFields = {};
      var newFieldNames = [];
      var n = instruction.fieldNames.length;
      for (var i = 0; i < n; i++) {
        var fieldName = instruction.fieldNames[n - i - 1];
        newFields[fieldName] = frame.popValue();
        newFieldNames.unshift(fieldName);
      }

      /* Check that it is a structure and built with the same constructor */
      var structure = frame.popValue();
      if (structure.tag !== _value.V_Structure) {
        fail(instruction.startPos, instruction.endPos, 'expected-structure-but-got', [instruction.constructorName, (0, _i18n.i18n)(Symbol.keyFor(structure.tag))]);
      }
      if (structure.constructorName !== instruction.constructorName) {
        fail(instruction.startPos, instruction.endPos, 'expected-constructor-but-got', [instruction.constructorName, structure.constructorName]);
      }
      if (structure.typeName !== instruction.typeName) {
        throw Error('VM: UpdateStructure instruction does not match type.');
      }

      /* Check that the types of the fields are compatible */
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = newFieldNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion2 = (_step3 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _fieldName = _step3.value;

          var oldType = structure.fields[_fieldName].type();
          var newType = newFields[_fieldName].type();
          if ((0, _value.joinTypes)(oldType, newType) === null) {
            fail(instruction.startPos, instruction.endPos, 'incompatible-types-on-structure-update', [_fieldName, oldType, newType]);
          }
        }

        /* Proceed with structure update */
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      frame.pushValue(structure.updateFields(newFields));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepReadTupleComponent',
    value: function _stepReadTupleComponent() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var tuple = frame.stackTop();
      if (tuple.tag !== _value.V_Tuple) {
        fail(instruction.startPos, instruction.endPos, 'expected-tuple-value-but-got', [tuple.type()]);
      }
      if (instruction.index >= tuple.size()) {
        fail(instruction.startPos, instruction.endPos, 'tuple-component-out-of-bounds', [tuple.size(), instruction.index]);
      }
      frame.pushValue(tuple.components[instruction.index]);
      frame.instructionPointer++;
    }
  }, {
    key: '_stepReadStructureFieldGeneric',
    value: function _stepReadStructureFieldGeneric(shouldPopStructure) {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var structure = void 0;
      if (shouldPopStructure) {
        structure = frame.popValue();
      } else {
        structure = frame.stackTop();
      }
      if (structure.tag !== _value.V_Structure) {
        fail(instruction.startPos, instruction.endPos, 'expected-structure-value-but-got', [structure.type()]);
      }
      if (!(instruction.fieldName in structure.fields)) {
        fail(instruction.startPos, instruction.endPos, 'structure-field-not-present', [structure.fieldNames(), instruction.fieldName]);
      }
      frame.pushValue(structure.fields[instruction.fieldName]);
      frame.instructionPointer++;
    }
  }, {
    key: '_stepReadStructureField',
    value: function _stepReadStructureField() {
      this._stepReadStructureFieldGeneric(false); /* Do not pop the structure */
    }
  }, {
    key: '_stepReadStructureFieldPop',
    value: function _stepReadStructureFieldPop() {
      this._stepReadStructureFieldGeneric(true); /* Pop the structure */
    }

    /* Instruction used for testing/debugging */

  }, {
    key: '_stepAdd',
    value: function _stepAdd() {
      var frame = this._currentFrame();
      var v1 = frame.popValue();
      var v2 = frame.popValue();
      frame.pushValue(v1.add(v2));
      frame.instructionPointer++;
    }
  }, {
    key: '_stepDup',
    value: function _stepDup() {
      var frame = this._currentFrame();
      var value = frame.popValue();
      frame.pushValue(value);
      frame.pushValue(value);
      frame.instructionPointer++;
    }
  }, {
    key: '_stepPop',
    value: function _stepPop() {
      var frame = this._currentFrame();
      frame.popValue();
      frame.instructionPointer++;
    }
  }, {
    key: '_stepPrimitiveCall',
    value: function _stepPrimitiveCall() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();

      /* Pop arguments from stack */
      var args = [];
      for (var i = 0; i < instruction.nargs; i++) {
        args.unshift(frame.popValue());
      }

      /* Check that the primitive exists */
      if (!this._primitives.isOperation(instruction.primitiveName)) {
        fail(instruction.startPos, instruction.endPos, 'primitive-does-not-exist', [instruction.primitiveName]);
      }

      var primitive = this._primitives.getOperation(instruction.primitiveName);

      /* Check that the number of expected parameters coincides with
       * the actual arguments provided */
      if (primitive.argumentTypes.length !== instruction.nargs) {
        fail(instruction.startPos, instruction.endPos, 'primitive-arity-mismatch', [instruction.primitiveName, primitive.argumentTypes.length, instruction.nargs]);
      }

      /* Check that the types of all parameters coincide with the types of the
       * actual arguments */
      for (var _i = 0; _i < instruction.nargs; _i++) {
        var expectedType = primitive.argumentTypes[_i];
        var receivedType = args[_i].type();
        if ((0, _value.joinTypes)(expectedType, receivedType) === null) {
          fail(instruction.startPos, instruction.endPos, 'primitive-argument-type-mismatch', [instruction.primitiveName, _i + 1, instruction.nargs, expectedType, receivedType]);
        }
      }

      /* Validate the arguments using the primitive-specific validator */
      primitive.validateArguments(instruction.startPos, instruction.endPos, this.globalState(), args);

      /* Proceed to call the primitive operation */
      var result = primitive.call(this.globalState(), args); /* mutates 'args' */
      if (result !== null) {
        frame.pushValue(result);
      }

      /* Take a snapshot after calling the primitive operation */
      this._takeSnapshot(instruction.primitiveName);

      frame.instructionPointer++;
    }
  }, {
    key: '_stepSaveState',
    value: function _stepSaveState() {
      var frame = this._currentFrame();
      this._globalStateStack.push(this.globalState().clone());
      frame.instructionPointer++;
    }
  }, {
    key: '_stepRestoreState',
    value: function _stepRestoreState() {
      var frame = this._currentFrame();
      this._globalStateStack.pop();
      if (this._globalStateStack.length === 0) {
        throw Error('RestoreState: the stack of global states is empty.');
      }
      frame.instructionPointer++;
    }
  }, {
    key: '_stepTypeCheck',
    value: function _stepTypeCheck() {
      var frame = this._currentFrame();
      var instruction = this._currentInstruction();
      var expectedType = instruction.type;
      var receivedType = frame.stackTop().type();
      if ((0, _value.joinTypes)(expectedType, receivedType) === null) {
        fail(instruction.startPos, instruction.endPos, 'expected-value-of-type-but-got', [expectedType, receivedType]);
      }
      frame.instructionPointer++;
    }

    /* Return the current dynamic stack of regions */

  }, {
    key: 'regionStack',
    value: function regionStack() {
      var regionStack = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._callStack[Symbol.iterator](), _step4; !(_iteratorNormalCompletion3 = (_step4 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var stackFrame = _step4.value;

          var instruction = this._code.at(stackFrame.instructionPointer);
          regionStack.push(instruction.startPos.region);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return regionStack;
    }
  }]);

  return VirtualMachine;
}();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.apiboardFromJboard = apiboardFromJboard;
exports.apiboardToJboard = apiboardToJboard;
exports.gbbFromJboard = gbbFromJboard;
exports.gbbToJboard = gbbToJboard;
exports.readJboardFromFile = readJboardFromFile;
exports.writeJboardToFile = writeJboardToFile;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * A board format FMT is a pair of two functions:
 *
 *   fromJboard : jboard -> string
 *   toJboard   : string -> jboard
 *
 * where "string" is a string in the given format, and
 * "jboard" is the internal format produced/consumed by
 * the RuntimeState class in src/runtime.js.
 *
 * Internal format:
 *   jboard.width  = width of the board
 *   jboard.height = height of the board
 *   jboard.head   = array [x, y] with the position of the head
 *   jboard.board  = array of <width> elements,
 *                   each of which is an array of <height> elements,
 *                   each of which is a cell, of the form
 *                     {"a": na, "n": nn, "r": nr, "v": nv}
 *                   in such a way that:
 *                     jboard.board[x][y].a = number of blue  stones at (x, y)
 *                     jboard.board[x][y].n = number of black stones at (x, y)
 *                     jboard.board[x][y].r = number of red   stones at (x, y)
 *                     jboard.board[x][y].v = number of green stones at (x, y)
 */

var BoardFormat = function () {
  function BoardFormat(formatName, description, extension, fromJboard, toJboard) {
    _classCallCheck(this, BoardFormat);

    this._formatName = formatName;
    this._description = description;
    this._extension = extension;
    this._fromJboard = fromJboard;
    this._toJboard = toJboard;
  }

  _createClass(BoardFormat, [{
    key: 'formatName',
    get: function get() {
      return this._formatName;
    }
  }, {
    key: 'description',
    get: function get() {
      return this._description;
    }
  }, {
    key: 'extension',
    get: function get() {
      return this._extension;
    }
  }, {
    key: 'fromJboard',
    get: function get() {
      return this._fromJboard;
    }
  }, {
    key: 'toJboard',
    get: function get() {
      return this._toJboard;
    }
  }]);

  return BoardFormat;
}();

function apiboardFromJboard(jboard) {
  var apiboard = {};
  apiboard.head = { x: jboard.head[0], y: jboard.head[1] };
  apiboard.width = jboard.width;
  apiboard.height = jboard.height;
  apiboard.table = [];
  for (var y = 0; y < jboard.height; y++) {
    var row = [];
    for (var x = 0; x < jboard.width; x++) {
      var cellO = jboard.board[x][y];
      var cell = {};
      if (cellO.a > 0) {
        cell.blue = cellO.a;
      }
      if (cellO.n > 0) {
        cell.black = cellO.n;
      }
      if (cellO.r > 0) {
        cell.red = cellO.r;
      }
      if (cellO.v > 0) {
        cell.green = cellO.v;
      }
      row.push(cell);
    }
    apiboard.table.unshift(row);
  }
  return apiboard;
}

function apiboardToJboard(apiboard) {
  var jboard = {};
  jboard.head = [apiboard.head.x, apiboard.head.y];
  jboard.width = apiboard.width;
  jboard.height = apiboard.height;
  jboard.board = [];
  for (var x = 0; x < jboard.width; x++) {
    var column = [];
    for (var y = 0; y < jboard.height; y++) {
      var cell = apiboard.table[jboard.height - y - 1][x];
      var ca = 'blue' in cell ? cell.blue : 0;
      var cn = 'black' in cell ? cell.black : 0;
      var cr = 'red' in cell ? cell.red : 0;
      var cv = 'green' in cell ? cell.green : 0;
      column.push({
        'a': ca,
        'n': cn,
        'r': cr,
        'v': cv
      });
    }
    jboard.board.push(column);
  }
  return jboard;
}

function gsboardFromJboard(jboard) {
  var gsboard = {};
  gsboard.x = jboard.head[0];
  gsboard.y = jboard.head[1];
  gsboard.sizeX = jboard.width;
  gsboard.sizeY = jboard.height;
  gsboard.table = [];
  for (var y = 0; y < jboard.height; y++) {
    var row = [];
    for (var x = 0; x < jboard.width; x++) {
      var cell = jboard.board[x][y];
      row.push({
        'blue': cell.a,
        'black': cell.n,
        'red': cell.r,
        'green': cell.v
      });
    }
    gsboard.table.unshift(row);
  }
  return JSON.stringify(gsboard);
}

function gsboardToJboard(gsBoardString) {
  var gsboard = JSON.parse(gsBoardString);
  var jboard = {};
  jboard.head = [gsboard.x, gsboard.y];
  jboard.width = gsboard.sizeX;
  jboard.height = gsboard.sizeY;
  jboard.board = [];
  for (var x = 0; x < jboard.width; x++) {
    var column = [];
    for (var y = 0; y < jboard.height; y++) {
      var cell = gsboard.table[jboard.height - y - 1][x];
      column.push({
        'a': cell.blue,
        'n': cell.black,
        'r': cell.red,
        'v': cell.green
      });
    }
    jboard.board.push(column);
  }
  return jboard;
}

function gbbFromJboard(jboard) {
  var gbb = [];
  gbb.push('GBB/1.0');
  gbb.push('size' + ' ' + jboard.width.toString() + ' ' + jboard.height.toString());
  for (var y = 0; y < jboard.height; y++) {
    for (var x = 0; x < jboard.width; x++) {
      var cell = jboard.board[x][y];
      if (cell.a + cell.n + cell.r + cell.v === 0) {
        continue;
      }
      var c = 'cell ' + x.toString() + ' ' + y.toString();
      if (cell.a > 0) {
        c += ' Azul ' + cell.a.toString();
      }
      if (cell.n > 0) {
        c += ' Negro ' + cell.n.toString();
      }
      if (cell.r > 0) {
        c += ' Rojo ' + cell.r.toString();
      }
      if (cell.v > 0) {
        c += ' Verde ' + cell.v.toString();
      }
      gbb.push(c);
    }
  }
  gbb.push('head' + ' ' + jboard.head[0].toString() + ' ' + jboard.head[1].toString());
  return gbb.join('\n') + '\n';
}

function gbbToJboard(gbb) {
  var i = 0;
  var jboard = {};

  function isWhitespace(x) {
    return x === ' ' || x === '\t' || x === '\r' || x === '\n';
  }

  function isNumeric(str) {
    for (var _i = 0; _i < str.length; _i++) {
      if ('0123456789'.indexOf(str[_i]) === -1) {
        return false;
      }
    }
    return str.length > 0;
  }

  function skipWhitespace() {
    /* Skip whitespace */
    while (i < gbb.length && isWhitespace(gbb[i])) {
      i++;
    }
  }

  function readToken() {
    var t = [];
    skipWhitespace();
    while (i < gbb.length && !isWhitespace(gbb[i])) {
      t.push(gbb[i]);
      i++;
    }
    return t.join('');
  }

  function readN(errmsg) {
    var t = readToken();
    if (!isNumeric(t)) {
      throw Error(errmsg);
    }
    t = parseInt(t, 10);
    if (t < 0) {
      throw Error(errmsg);
    }
    return t;
  }

  function readRange(a, b, errmsg) {
    var t = readN(errmsg);
    if (t < a || t >= b) {
      throw Error(errmsg);
    }
    return t;
  }

  if (readToken() !== 'GBB/1.0') {
    throw Error('GBB/1.0: Board not in GBB/1.0 format.');
  }
  if (readToken() !== 'size') {
    throw Error('GBB/1.0: Board lacks a size declaration.');
  }
  jboard.width = readN('GBB/1.0: Board width is not a number.');
  jboard.height = readN('GBB/1.0: Board height is not a number.');
  if (jboard.width <= 0 || jboard.height <= 0) {
    throw Error('GBB/1.0: Board size should be positive.');
  }
  jboard.head = [0, 0];
  jboard.board = [];
  for (var _i2 = 0; _i2 < jboard.width; _i2++) {
    var row = [];
    for (var j = 0; j < jboard.height; j++) {
      row.push({ 'a': 0, 'n': 0, 'r': 0, 'v': 0 });
    }
    jboard.board.push(row);
  }

  var headDeclared = false;
  var cellDeclared = {};
  var colores = {
    'Azul': 'a',
    'A': 'a',
    'Negro': 'n',
    'N': 'n',
    'Rojo': 'r',
    'R': 'r',
    'Verde': 'v',
    'V': 'v'
  };

  while (i < gbb.length) {
    var op = readToken();
    if (op === '') {
      break;
    } else if (op === 'head') {
      if (headDeclared) {
        throw Error('GBB/1.0: Head position cannot be declared twice.');
      }
      headDeclared = true;
      var hx = readRange(0, jboard.width, 'GBB/1.0: Invalid head position.');
      var hy = readRange(0, jboard.height, 'GBB/1.0: Invalid head position.');
      jboard.head = [hx, hy];
    } else if (op === 'cell') {
      var cx = readRange(0, jboard.width, 'GBB/1.0: Invalid cell position.');
      var cy = readRange(0, jboard.height, 'GBB/1.0: Invalid cell position.');
      if ([cx, cy] in cellDeclared) {
        throw Error('GBB/1.0: Cell cannot be declared twice.');
      }
      cellDeclared[[cx, cy]] = true;

      var colorDeclared = {};
      while (i < gbb.length) {
        var color = readToken();
        if (!(color in colores)) {
          i -= color.length;
          break;
        }
        var colorId = colores[color];
        if (colorId in colorDeclared) {
          throw Error('GBB/1.0: Color cannot be declared twice.');
        }
        var n = readN('GBB/1.0: Invalid amount of stones.');
        jboard.board[cx][cy][colorId] = n;
      }
    } else {
      throw Error('GBB/1.0: Malformed board: unknown command "' + op + '".');
    }
  }
  return jboard;
}

var BOARD_FORMAT_LIST = [new BoardFormat('jboard', 'Representation of a board as a JavaScript object for internal usage.', 'jboard', JSON.stringify, JSON.parse), new BoardFormat('gs-weblang-cli-json-board', 'Representation of a board as a Javascript object' + ' used by the gs-weblang-cli tool.', 'json', gsboardFromJboard, gsboardToJboard), new BoardFormat('gbb', 'GBB/1.0', 'gbb', gbbFromJboard, gbbToJboard)];

var DEFAULT_FORMAT = exports.DEFAULT_FORMAT = 'gs-weblang-cli-json-board';
var BOARD_FORMATS = exports.BOARD_FORMATS = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = BOARD_FORMAT_LIST[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var boardFormat = _step.value;

    BOARD_FORMATS[boardFormat.formatName] = boardFormat;
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function fileExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function fileBoardFormat(filename) {
  var extension = fileExtension(filename);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = BOARD_FORMAT_LIST[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var fmt = _step2.value;

      if (extension === fmt.extension) {
        return fmt;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return BOARD_FORMATS[DEFAULT_FORMAT];
}

var fs = __webpack_require__(22);

function readJboardFromFile(filename) {
  var format = fileBoardFormat(filename);
  var contents = fs.readFileSync(filename, 'utf8');
  return format.toJboard(contents);
}

function writeJboardToFile(filename, jboard) {
  var format = fileBoardFormat(filename);
  var contents = format.fromJboard(jboard);
  fs.writeFileSync(filename, contents, 'utf8');
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);
});
//# sourceMappingURL=gobstones-interpreter.js.map