"use strict";

Polymer({
  is: 'results-inspector',
  behaviors: [Polymer.LocalizationBehavior],
  properties: {
    result: Object
  },

  adaptType: function adaptType(result) {
    return result && result.value && result.value.type || "";
  },
  adaptValue: function adaptValue(result) {
    var actualReturnValue = result && result.actualReturnValue;
    if (!actualReturnValue) return "";

    var format = function format(node) {
      var indentLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var type = node.type().toString();
      var isList = _.startsWith(type, "List");
      var isTuple = _.startsWith(type, "Tuple");

      if (isList || isTuple) {
        var property = isList ? "elements" : "components";
        var openSymbol = isList ? "[" : "(";
        var closeSymbol = isList ? "]" : ")";

        return _.repeat(" ", indentLevel) + openSymbol + "\n" + node[property].map(function (it) {
          return format(it, indentLevel + 2);
        }).join(",\n") + "\n" + _.repeat(" ", indentLevel) + closeSymbol;
      }

      return _.repeat(" ", indentLevel) + node.toString();
    };

    return format(actualReturnValue);
  }
});