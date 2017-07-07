"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParserAndBoardAdapter = function () {
  function ParserAndBoardAdapter() {
    _classCallCheck(this, ParserAndBoardAdapter);
  }

  _createClass(ParserAndBoardAdapter, [{
    key: "adaptToBoard",
    value: function adaptToBoard(table) {
      return gsWeblangCore.viewAdapter.toView(table);
    }
  }, {
    key: "adaptToParser",
    value: function adaptToParser(table) {
      return gsWeblangCore.viewAdapter.toModel(table);
    }
  }]);

  return ParserAndBoardAdapter;
}();

;