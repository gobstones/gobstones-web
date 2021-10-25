"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PrimitiveTools = {
  features: ["Comandos primitivos", "Direcciones y colores"],
  blocks: ["ComandosPrimitivos", "Color", "Direccion", "ExpresionesPrimitivas"]
};

// eslint-disable-next-line no-unused-vars
var ActivityTypes = {
  withoutDomain: _.merge({}, PrimitiveTools, {
    name: "Sin dominio",
    settings: {
      board: {
        visible_edition: true,
        collapse_toolbox: false,
        user_permissions: {
          can_change_initial_board: false,
          can_change_initial_board_source: false,
          can_edit_board: false,
          can_view_size_section: false,
          can_view_attire_section: true
        }
      },
      attire: {
        visible: false,
        user_permissions: {
          can_toggle_visibility: true
        }
      }
    }
  }),
  withDomain: {
    name: "Con dominio",
    features: [],
    blocks: [],
    settings: {
      board: {
        visible_edition: true,
        collapse_toolbox: false,
        user_permissions: {
          can_change_initial_board: false,
          can_change_initial_board_source: false,
          can_edit_board: false,
          can_view_size_section: false,
          can_view_attire_section: true
        }
      },
      attire: {
        visible: true,
        user_permissions: {
          can_toggle_visibility: false
        }
      }
    }
  },
  representation: _.merge({}, PrimitiveTools, {
    name: "De representación",
    settings: {
      board: {
        visible_edition: true,
        collapse_toolbox: false,
        user_permissions: {
          can_change_initial_board: true,
          can_change_initial_board_source: true,
          can_edit_board: false,
          can_view_size_section: false,
          can_view_attire_section: true
        }
      },
      attire: {
        visible: true,
        user_permissions: {
          can_toggle_visibility: true
        }
      }
    }
  }),
  free: _.merge({}, PrimitiveTools, {
    name: "Libre",
    settings: {
      board: {
        visible_edition: true,
        collapse_toolbox: false,
        user_permissions: {
          can_change_initial_board: true,
          can_change_initial_board_source: true,
          can_edit_board: true,
          can_view_size_section: true,
          can_view_attire_section: true
        }
      },
      attire: {
        visible: true,
        user_permissions: {
          can_toggle_visibility: true
        }
      }
    }
  })
};

var initial = {
  name: "Inicial",
  features: ["Procedimientos simples"],
  blocks: ["DefinicionDeProcedimientoSimple", "ProcedimientosPrimitivos", "MisProcedimientos"]
};

var medium = {
  name: "Media",
  features: [].concat(_toConsumableArray(initial.features), ["Procedimientos con parámetros", "Expresiones y literales numéricos", "Expresiones booleanas", "Repetición simple", "Alternativa condicional", "Funciones simples"]),
  blocks: [].concat(_toConsumableArray(initial.blocks), ["DefinicionDeProcedimientoParametrizado", "Numero", "OperadorNumerico", "OperadorLogico", "OperadorDeComparacion", "OperadorDeNegacion", "RepeticionSimple", "Alternativas", "DefinicionDeFuncionSimple", "MisFunciones", "FuncionesPrimitivas"])
};

var advanced = {
  name: "Avanzada",
  features: [].concat(_toConsumableArray(medium.features), ["Funciones con procesamiento", "Repetición condicional"]),
  blocks: [].concat(_toConsumableArray(medium.blocks), ["DefinicionDeFuncionSimpleParametrizada", "DefinicionDeFuncionParametrizada", "RepeticionCondicional", "Asignacion", "Booleano"])
};

var free = {
  name: "Libre",
  features: [].concat(_toConsumableArray(advanced.features), ["Listas"]),
  blocks: []
};

// eslint-disable-next-line no-unused-vars
var Toolboxes = {
  initial: initial,
  medium: medium,
  advanced: advanced,
  free: free
};

// eslint-disable-next-line no-unused-vars
var ExecutionTypes = {
  sequential: {
    id: "sequential",
    name: "Secuencial",
    features: [],
    blocks: [],
    initialCode: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n          <block type=\"Program\" deletable=\"false\" x=\"30\" y=\"30\"></block>\n        </xml>"
  },
  interactive: {
    id: "interactive",
    name: "Interactiva",
    features: ["Eventos"],
    blocks: ["Eventos"],
    initialCode: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n          <block type=\"InteractiveProgram\" deletable=\"false\" x=\"30\" y=\"30\"></block>\n        </xml>"
  }
};

// eslint-disable-next-line no-unused-vars
var ConstructionModes = {
  blocks: { id: "blocks", name: "Bloques", canRestrictTools: true },
  text: { id: "text", name: "Texto", canRestrictTools: false }
};