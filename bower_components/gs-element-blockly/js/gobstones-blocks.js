/* global Blockly */

function isADefaultName(text, defaults) {
  for (var test of defaults) {
    if (text.startsWith(test)) {
      var ending = text.substring(text.indexOf(test) + test.length);
      if (!ending) return true;
      try { var number = parseInt(ending); } catch(e) { var number = null; }
      if (typeof(number) === 'number') {
        return number;
      }
    }
  }
  return false;
}
function updateProcedBlocklyLanguage() {
    if (this.getInput(0)) {
      this.getInput(0).fieldRow[0].setText(Blockly.Msg.GBS_FUNCTION_ARG_DEFINES);
      var ending = isADefaultName(this.getInput(0).fieldRow[1].getText(), [
        Blockly.translations.esMsgs.GBS_FUNCTION_ARG_SOMETHING,
        Blockly.translations.enMsgs.GBS_FUNCTION_ARG_SOMETHING
      ])
      if (ending) {
        this.getInput(0).fieldRow[1].setText(
          Blockly.Msg.GBS_FUNCTION_ARG_SOMETHING +
          (typeof(ending)==='number' ? ending : ''));
      }
      ending = isADefaultName(this.getInput(0).fieldRow[1].getText(), [
        Blockly.translations.esMsgs.GBS_PROCEDURE_ARG_SOMETHING,
        Blockly.translations.enMsgs.GBS_PROCEDURE_ARG_SOMETHING
      ])
      if (ending) {
        this.getInput(0).fieldRow[1].setText(
          Blockly.Msg.GBS_PROCEDURE_ARG_SOMETHING +
          (typeof(ending)==='number' ? ending : ''));
      }
      if (this.getInput(0).fieldRow[3]) {
        this.getInput(0).fieldRow[3].setText(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
      }
      if (this.getInput(0).fieldRow[4]) {
        this.getInput(0).fieldRow[4].setText(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
      }
    }
    if (this.getInput('RETURN')) {
      this.getInput('RETURN').fieldRow[0].setText(Blockly.Msg.GBS_FUNCTION_ARG_EQUAL_TO);
    }
}



// Initialize proceds-blockly creating new custom functions
initProcedsBlockly("Statement", (makeProcedureInit, makeUpdateParams, makeProcedureDomToMutation, makeProcedureCustomMenu) => {
  Blockly.Blocks['DefinicionDeFuncionDeclarativa'] = {
    init: makeProcedureInit(
      true, true, true,
      Blockly.Msg.GBS_FUNCTION_ARG_SOMETHING,
      Blockly.Msg.GBS_FUNCTION_ARG_DEFINES,
      Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT,
      Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP,
      Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL,
      Blockly.Msg.GBS_FUNCTION_ARG_EQUALS
    ),
    setStatements_: Blockly.Blocks['procedures_defreturn'].setStatements_,
    updateParams_: makeUpdateParams(),
    mutationToDom: Blockly.Blocks['procedures_defreturn'].mutationToDom,
    domToMutation: makeProcedureDomToMutation(),
    decompose: Blockly.Blocks['procedures_defreturn'].decompose,
    compose: Blockly.Blocks['procedures_defreturn'].compose,
    getProcedureDef: Blockly.Blocks['procedures_defreturn'].getProcedureDef,
    getVars: Blockly.Blocks['procedures_defreturn'].getVars,
    renameVar: Blockly.Blocks['procedures_defreturn'].renameVar,
    customContextMenu: makeProcedureCustomMenu(true),
    callType_: 'procedures_callreturndeclarative',
    onchange: updateProcedBlocklyLanguage
  };

  Blockly.Blocks['procedures_callreturndeclarative'] = {
    init: Blockly.Blocks['procedures_callreturn'].init,
    getProcedureCall: Blockly.Blocks['procedures_callreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callreturn'].renameProcedure,
    setProcedureParameters_: Blockly.Blocks['procedures_callreturn'].setProcedureParameters_,
    updateShape_: Blockly.Blocks['procedures_callreturn'].updateShape_,
    mutationToDom: Blockly.Blocks['procedures_callreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callreturn'].domToMutation,
    renameVar: Blockly.Blocks['procedures_callreturn'].renameVar,
    onchange: Blockly.Blocks['procedures_callreturn'].onchange,
    customContextMenu: Blockly.Blocks['procedures_callreturn'].customContextMenu,
    defType_: 'DefinicionDeFuncionDeclarativa',
  };

  Blockly.Blocks['DefinicionDeFuncionSimpleConParametrosDeclarativa'] = {
    init: makeProcedureInit(
      true, false, true,
      Blockly.Msg.GBS_FUNCTION_ARG_SOMETHING,
      Blockly.Msg.GBS_FUNCTION_ARG_DEFINES,
      Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT,
      Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP,
      Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL,
      Blockly.Msg.GBS_FUNCTION_ARG_EQUALS
    ),
    setStatements_: Blockly.Blocks['procedures_defreturn'].setStatements_,
    updateParams_: makeUpdateParams(),
    mutationToDom: Blockly.Blocks['procedures_defreturn'].mutationToDom,
    domToMutation: makeProcedureDomToMutation(),
    decompose: Blockly.Blocks['procedures_defreturn'].decompose,
    compose: Blockly.Blocks['procedures_defreturn'].compose,
    getProcedureDef: Blockly.Blocks['procedures_defreturn'].getProcedureDef,
    getVars: Blockly.Blocks['procedures_defreturn'].getVars,
    renameVar: Blockly.Blocks['procedures_defreturn'].renameVar,
    customContextMenu: makeProcedureCustomMenu(true),
    callType_: 'procedures_callreturndeclarativesimplewithparams',
    onchange: updateProcedBlocklyLanguage
  };

  Blockly.Blocks['procedures_callreturndeclarativesimplewithparams'] = {
    init: Blockly.Blocks['procedures_callreturn'].init,
    getProcedureCall: Blockly.Blocks['procedures_callreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callreturn'].renameProcedure,
    setProcedureParameters_: Blockly.Blocks['procedures_callreturn'].setProcedureParameters_,
    updateShape_: Blockly.Blocks['procedures_callreturn'].updateShape_,
    mutationToDom: Blockly.Blocks['procedures_callreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callreturn'].domToMutation,
    renameVar: Blockly.Blocks['procedures_callreturn'].renameVar,
    onchange: Blockly.Blocks['procedures_callreturn'].onchange,
    customContextMenu: Blockly.Blocks['procedures_callreturn'].customContextMenu,
    defType_: 'DefinicionDeFuncionSimpleConParametrosDeclarativa',
  };

  Blockly.Blocks['DefinicionDeFuncionSimpleDeclarativa'] = {
    init: makeProcedureInit(
      true, false, false,
      Blockly.Msg.GBS_FUNCTION_ARG_SOMETHING,
      Blockly.Msg.GBS_FUNCTION_ARG_DEFINES,
      Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT,
      Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP,
      Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL,
      Blockly.Msg.GBS_FUNCTION_ARG_EQUALS
    ),
    setStatements_: Blockly.Blocks['procedures_defreturn'].setStatements_,
    updateParams_: makeUpdateParams(),
    mutationToDom: Blockly.Blocks['procedures_defreturn'].mutationToDom,
    domToMutation: makeProcedureDomToMutation(),
    decompose: Blockly.Blocks['procedures_defreturn'].decompose,
    compose: Blockly.Blocks['procedures_defreturn'].compose,
    getProcedureDef: Blockly.Blocks['procedures_defreturn'].getProcedureDef,
    getVars: Blockly.Blocks['procedures_defreturn'].getVars,
    renameVar: Blockly.Blocks['procedures_defreturn'].renameVar,
    customContextMenu: makeProcedureCustomMenu(false),
    callType_: 'procedures_callreturndeclarativesimple',
    onchange: updateProcedBlocklyLanguage
  };

  Blockly.Blocks['procedures_callreturndeclarativesimple'] = {
    init: Blockly.Blocks['procedures_callreturn'].init,
    getProcedureCall: Blockly.Blocks['procedures_callreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callreturn'].renameProcedure,
    setProcedureParameters_: Blockly.Blocks['procedures_callreturn'].setProcedureParameters_,
    updateShape_: Blockly.Blocks['procedures_callreturn'].updateShape_,
    mutationToDom: Blockly.Blocks['procedures_callreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callreturn'].domToMutation,
    renameVar: Blockly.Blocks['procedures_callreturn'].renameVar,
    onchange: Blockly.Blocks['procedures_callreturn'].onchange,
    customContextMenu: Blockly.Blocks['procedures_callreturn'].customContextMenu,
    defType_: 'DefinicionDeFuncionSimpleDeclarativa',
  };
});

Blockly.CUSTOM_COLORS = {"globalHsvSaturation":0.45,"globalHsvValue":0.65,"primitiveCommand":"#1d3c99","assignation":"#051d66","controlStructure":"#0f2b80","literalExpression":"#1d992c","primitiveExpression":"#1d992c","operator":"#0f801c","program":"#8d1bb3","interactiveProgram":"#6e158c","interactiveBinding":"#a11fcc","procedure":"#935ba6","function":"#745380","primitiveProcedure":"#2e4fb3","primitiveFunction":"#2eb33e","procedure_call":"#355bcc","function_call":"#35cc47","variable":"#056610","parameter":"#056610","complete":"#ff0000","H":{"commands":225,"expressions":127,"definitions":285},"S":{"assignation":95,"variable":95,"parameter":95,"primitiveCommand":81,"literalExpression":81,"primitiveExpression":81,"controlStructure":88,"operator":88,"procedure_call":74,"function_call":74,"primitiveProcedure":74,"primitiveFunction":74,"program":85,"interactiveProgram":85,"interactiveBinding":85,"procedure":45,"function":35,"complete":99},"V":{"assignation":40,"variable":40,"parameter":40,"primitiveCommand":60,"literalExpression":60,"primitiveExpression":60,"controlStructure":50,"operator":50,"procedure_call":80,"function_call":80,"primitiveProcedure":70,"primitiveFunction":70,"program":70,"interactiveProgram":55,"interactiveBinding":80,"procedure":65,"function":50,"complete":99}};
Blockly.AVAILABLE_ICONS = ["bool-false.svg","bool-true.svg","clean.png","color-azul.svg","color-negro.svg","color-rojo.svg","color-verde.svg","direccion-este.svg","direccion-norte.svg","direccion-oeste.svg","direccion-sur.svg","hand.png","minus.png","plus.png"];
const EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const ATOMICALLY = (action) => {
  try {
    Blockly.Events.disabled_ = 1;
    action();
  } finally {
    Blockly.Events.disabled_ = 0;
  }
}

const getOptions = (block) => {
  const parentWorkspace = block.workspace.options.parentWorkspace;
  return parentWorkspace && parentWorkspace.options || block.workspace.options
}
const hasLocalMedia = (name) => Blockly.AVAILABLE_ICONS.includes(name)
const getLocalMediaUrl = (block, name) =>
  hasLocalMedia(name)
    ? getOptions(block).localMedia + name + (getOptions(block).localMediaSuffix || "")
    : EMPTY_GIF;
const getLocalMediaSize = (name) => hasLocalMedia(name) ? 16 : 0;

/**
 * Create the svg representation of a block and render
 * @name {!string} name of the parameter.
 * @this Blockly.Block
 */
Blockly.createBlockSvg = function(workspace, name, f) {
  var newBlock = workspace.newBlock(name);
  //newBlock.setEditable(false);
  f(newBlock);
  newBlock.initSvg();
  newBlock.render();
};

const createVariable = (parent, name, callback = () => {}) => {
  const workspace = parent.workspace;
  Blockly.createBlockSvg(workspace, 'variables_get', b => {
    ATOMICALLY(() => {
      b.setFieldValue(name, 'VAR');
      const posParent = parent.getRelativeToSurfaceXY();
      const pos = b.getRelativeToSurfaceXY();
      b.moveBy(posParent.x - pos.x + parent.width + 16, posParent.y - pos.y + b.height + 6);
      callback(b);
    });
  });
}

const triggerRefresh = (block) => {
  getOptions(block).parentController.onBlocklyWorkspaceUpdate();
};

// ---

Blockly.Blocks.Program = {
  init: function () {
    this.jsonInit({
      "type": "Program",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "field_label",
          "text": "%{BKY_GBS_PROGRAM_MSG}"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "program",
          "check": ["Statement"]
        }
      ]
    })
    this.setColour(Blockly.CUSTOM_COLORS.Program || Blockly.CUSTOM_COLORS.program);
    this.setDeletable(true);
    this.setEditable(true);
    this.setMovable(true);
  },

  setDisabledAndUpdateTimestamp: function(disabled) {
    this.setDisabled(disabled);
    if (!disabled) this.$timestamp = Date.now();
  },

  mutationToDom: function() {
    var container = document.createElement("mutation");
    container.setAttribute("timestamp", this.$timestamp || Date.now());
    return container;
  },

  domToMutation: function(xmlElement) {
    const timestamp = xmlElement.getAttribute("timestamp");
    this.$timestamp = timestamp || Date.now();
  },

};

Blockly.Blocks.InteractiveProgram = {
  init: function () {
    this.jsonInit({
      "type": "InteractiveProgram",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "field_label",
          "text": "%{BKY_GBS_INTERACTIVEPROGRAM_MSG}"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "interactiveprogram",
          "check": ["InteractiveBinding"]
        }
      ]
    });
    this.setColour(Blockly.CUSTOM_COLORS.InteractiveProgram || Blockly.CUSTOM_COLORS.interactiveProgram);
    this.setDeletable(true);
    this.setEditable(true);
    this.setMovable(true);
  },

  customContextMenu: function(options) {
    options.unshift({ text: Blockly.Msg.GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_TIMEOUT_MSG, enabled: !this.$timeout, callback: () => {
      let x = prompt(Blockly.Msg.GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_TIMEOUT_TOOLTIP);
      if (isNaN(parseInt(x)) || parseInt(x) <= 0) return;
      x = parseInt(x);

      this._addTimeout(x);
    }});

    options.unshift({ text: Blockly.Msg.GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_INIT_MSG, enabled: !this.$init, callback: () => {
      this._addInit();
    }});
  },

  setDisabledAndUpdateTimestamp: function(disabled) {
    this.setDisabled(disabled);
    if (!disabled) this.$timestamp = Date.now();
  },

  mutationToDom: function() {
    var container = document.createElement("mutation");
    if (this.$init) container.setAttribute("init", this.$init);
    if (this.$timeout) container.setAttribute("timeout", this.$timeout);

    container.setAttribute("timestamp", this.$timestamp || Date.now());
    return container;
  },

  domToMutation: function(xmlElement) {
    const init = xmlElement.getAttribute("init");
    const timeout = xmlElement.getAttribute("timeout");
    const timestamp = xmlElement.getAttribute("timestamp");

    if (init) this._addInit()
    if (timeout) this._addTimeout(parseInt(timeout));
    this.$timestamp = timestamp || Date.now();
  },

  _addInit() {
    this.$init = true;

    const icon = "minus.png";
    var removeButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, icon),
      getLocalMediaSize(icon),
      getLocalMediaSize(icon),
      "",
      function() {
        this.$init = false;
        this.removeInput("initlabel");
        this.removeInput("init");
        this.removeInput("statementsLabel");
        triggerRefresh(this);
      }.bind(this)
    );
    setTimeout(() => { removeButton.setTooltip("%{BKY_GBS_TOOLTIPS_DELETE}"); });

    this.appendDummyInput("initlabel").appendField('%{BKY_GBS_TOOLTIPS_ONINIT}').appendField(removeButton);
    this.appendStatementInput('init').setCheck(["Statement"]);
    this.appendDummyInput("statementsLabel").appendField('%{BKY_GBS_TOOLTIPS_ONPUSH}');
    this.moveInputBefore("init", "interactiveprogram");
    this.moveInputBefore("initlabel", "init");
    this.moveInputBefore("statementsLabel", "interactiveprogram");
    triggerRefresh(this);
  },

  _addTimeout(timeout) {
    this.$timeout = timeout;

    const icon = "minus.png";
    var removeButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, icon),
      getLocalMediaSize(icon),
      getLocalMediaSize(icon),
      "",
      function() {
        this.$timeout = undefined;
        this.removeInput("timeoutlabel");
        this.removeInput("timeout");
        triggerRefresh(this);
      }.bind(this)
    );
    setTimeout(() => { removeButton.setTooltip("%{BKY_GBS_TOOLTIPS_DELETE}"); });

    this.appendDummyInput("timeoutlabel").appendField(Blockly.Msg.GBS_TOOLTIPS_ONTIMEOUT.replace('${timeout}', timeout)).appendField(removeButton);
    this.appendStatementInput('timeout').setCheck(["Statement"]);
    triggerRefresh(this);
  }
};

// -------------------------------------
// Programa interactivo
// -------------------------------------

const modifiers = [
  [ 'SHIFT', 'SHIFT' ],
  [ 'CTRL', 'CTRL' ],
  [ 'ALT', 'ALT' ]
];

const getModifiersInput = (block) => block.inputList[1];
const getModifierFields = (block) => getModifiersInput(block).fieldRow.slice(2);
const getModifierDropdownFields = (block) => getModifierFields(block).filter(it => it.constructor === Blockly.FieldDropdown);
const getModifierValues = (block) => getModifierDropdownFields(block).map(it => it.getValue());
const getAvailableModifiers = (block) => {
  const currentModifiers = getModifierValues(block);

  return modifiers.filter(it =>
    currentModifiers.indexOf(it[1]) === -1
  );
};
const updateModifierMenuGenerators = (block, nameToIgnore) => {
  const availableModifiers = getAvailableModifiers(block);
  const dropdowns = getModifierDropdownFields(block);

  for (var dropdown of dropdowns) {
    if (dropdown.name !== nameToIgnore)
      dropdown.menuGenerator_ = modifiers.filter(it => {
        return it[1] === dropdown.getValue() || availableModifiers.some(availableModifier => availableModifier[1] === it[1])
      });

  }
}

createInteractiveBinding = (name, keys) => {
  return {
    init: function () {
      this.jsonInit({
        message0: "%1 %2 %3 %4",
        type: "InteractiveBinding",
        previousStatement: "InteractiveBinding",
        nextStatement: "InteractiveBinding",
        args0: [
          {
            "type": "field_label",
            "text": "%{BKY_GBS_TOOLTIPS_ONPUSH}" + name
          },
          { "type": "input_dummy" },
          {
            "type": "field_label",
            "text": "➣"
          },
          {
            type: "field_dropdown",
            name: "InteractiveBindingDropdownKey",
            options: keys.map(it => [it.name, it.code]),
          }
        ],
        colour: Blockly.CUSTOM_COLORS.InteractiveBinding || Blockly.CUSTOM_COLORS.interactiveBinding
      });

      this.appendStatementInput('block').setCheck(["Statement"]);

      const self = this;
      const input = this.inputList[0];
      const plusIcon = "plus.png";
      const cleanIcon = "clean.png";
      const addModifier = new Blockly.FieldImage(
        getLocalMediaUrl(this, plusIcon),
        getLocalMediaSize(plusIcon),
        getLocalMediaSize(plusIcon),
        "",
        function() {
          const modifiersCount = getModifierFields(self).length / 2;
          if (modifiersCount >= modifiers.length) return;

          self._addModifier();
        }
      );
      setTimeout(() => { addModifier.setTooltip("%{BKY_GBS_TOOLTIPS_ADD_MODIFIER}"); });
      input.appendField(addModifier);

      const cleanModifiers = new Blockly.FieldImage(
        getLocalMediaUrl(this, cleanIcon),
        getLocalMediaSize(cleanIcon),
        getLocalMediaSize(cleanIcon),
        "",
        function() {
          self._cleanModifiers();
        }
      );
      setTimeout(() => { addModifier.setTooltip("%{BKY_GBS_TOOLTIPS_CLEAN_MODIFIER}"); });
      input.appendField(cleanModifiers);
    },

    customContextMenu: function(options) {
      const modifiersCount = getModifierFields(this).length / 2;

      options.unshift({ text: `%{BKY_GBS_TOOLTIPS_CLEAN_MODIFIER}`, enabled: modifiersCount > 0, callback: () => {
        this._cleanModifiers();
      }});
      options.unshift({ text: `%{BKY_GBS_TOOLTIPS_ADD_MODIFIER}`, enabled: modifiersCount < modifiers.length, callback: () => {
        this._addModifier();
      }});
    },

    mutationToDom: function() {
      var container = document.createElement("mutation");
      container.setAttribute("modifierscount", getModifierValues(this).length.toString());
      return container;
    },

    domToMutation: function(xmlElement) {
      const $modifiersCount = xmlElement.getAttribute("modifierscount");
      if ($modifiersCount) {
        const count = parseInt($modifiersCount);
        for (var i = 0; i < count; i++)
          this._addModifier();
      }

      setTimeout(() => {
        updateModifierMenuGenerators(this);
      }, 0);
    },

    _addModifier() {
      const availableModifiers = getAvailableModifiers(this);

      const self = this;
      const id = getModifierValues(this).length + 1;
      const labelName = "l" + id;
      const dropdownName = "d" + id;

      getModifiersInput(this).appendField("+").appendField(new Blockly.FieldDropdown(availableModifiers, (newValue) => {
        setTimeout(() => {
          updateModifierMenuGenerators(self, dropdownName)
        }, 0);
      }));

      const addedFields = getModifierFields(this).slice(-2);
      addedFields[0].name = labelName;
      addedFields[1].name = dropdownName;

      updateModifierMenuGenerators(this, dropdownName);
      triggerRefresh(this);
    },

    _cleanModifiers() {
      const fieldsToRemove = getModifierFields(this);

      for (var field of fieldsToRemove)
        getModifiersInput(this).removeField(field.name);
      triggerRefresh(this);
    }
  }
};

Blockly.Blocks.InteractiveLetterBinding = createInteractiveBinding("%{BKY_GBS_TOOLTIPS_KEY_LETTER}", [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
].map(it => ({ code: it, name: it })));

Blockly.Blocks.InteractiveNumberBinding = createInteractiveBinding("%{BKY_GBS_TOOLTIPS_KEY_NUMBER}", [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
].map(it => ({ code: it, name: it })));

Blockly.Blocks.InteractiveKeyBinding = createInteractiveBinding("%{BKY_GBS_TOOLTIPS_KEY_SPECIAL}", [
  { code: 'LEFT', name: '←' },
  { code: 'RIGHT', name: '→' },
  { code: 'UP', name: '↑' },
  { code: 'DOWN', name: '↓' },
  { code: 'MINUS', name: '-' },
  { code: 'SPACE', name: '%{BKY_GBS_TOOLTIPS_KEY_SPACE}' },
  { code: 'RETURN', name: '%{BKY_GBS_TOOLTIPS_KEY_ENTER}' },
  { code: 'TAB', name: '%{BKY_GBS_TOOLTIPS_KEY_TAB}' },
  { code: 'BACKSPACE', name: '%{BKY_GBS_TOOLTIPS_KEY_BACKSPACE}' },
  { code: 'DELETE', name: '%{BKY_GBS_TOOLTIPS_KEY_DEL}' },
  { code: 'ESCAPE', name: '%{BKY_GBS_TOOLTIPS_KEY_ESCAPE}' },
  { code: 'INSERT', name: '%{BKY_GBS_TOOLTIPS_KEY_INSERT}' },
  { code: 'F1', name: 'F1' },
  { code: 'F2', name: 'F2' },
  { code: 'F3', name: 'F3' },
  { code: 'F4', name: 'F4' },
  { code: 'F5', name: 'F5' },
  { code: 'F6', name: 'F6' },
  { code: 'F7', name: 'F7' },
  { code: 'F8', name: 'F8' },
  { code: 'F9', name: 'F9' },
  { code: 'F10', name: 'F10' },
  { code: 'F11', name: 'F11' },
  { code: 'F12', name: 'F12' }
]);

// ------------------------------------------------------
// Control de flujo de ejecucion:
// ------------------------------------------------------

Blockly.Blocks.RepeticionSimple = {
  init: function () {
    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
    });

    this.setColour(Blockly.CUSTOM_COLORS.RepeticionSimple || Blockly.CUSTOM_COLORS.controlStructure);
    this.appendValueInput('count')
      .appendField(Blockly.Msg.GBS_REPEAT_MSG_1);
    this.appendDummyInput()
      .appendField(Blockly.Msg.GBS_REPEAT_MSG_2);
    this.appendStatementInput('block').setCheck(["Statement"]);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.RepeticionCondicional = {
  init: function () {
    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
    });

    this.setColour(Blockly.CUSTOM_COLORS.RepeticionCondicional || Blockly.CUSTOM_COLORS.controlStructure);
    this.appendValueInput('condicion')
      .appendField(Blockly.Msg.GBS_UNTIL_MSG);
    this.appendStatementInput('block').setCheck(["Statement"]);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.RepeticionCondicionalReal = {
  init: function () {
    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
    });

    this.setColour(Blockly.CUSTOM_COLORS.RepeticionCondicional || Blockly.CUSTOM_COLORS.controlStructure);
    this.appendValueInput('condicion')
      .appendField(Blockly.Msg.GBS_UNTIL_MSG);
    this.appendStatementInput('block').setCheck(["Statement"]);
    this.setInputsInline(true);
  }
};

Blockly.Blocks.AlternativaSimple = {
  init: function () {
    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement"
    });

    this.setColour(Blockly.CUSTOM_COLORS.AlternativaSimple || Blockly.CUSTOM_COLORS.controlStructure);
    this.appendValueInput('condicion')
      .appendField(Blockly.Msg["CONTROLS_IF_MSG_IF"]);
    this.appendStatementInput('block').setCheck(["Statement"]);
    this.setInputsInline(true);
  }
};

delete Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN.compose;
delete Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN.decompose;
Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN.updateShape_ = function() {
  // Delete everything.
  if (this.getInput('block2')) {
    this.removeInput('block2');
  }
  var i = 1;
  while (this.getInput('IF' + i)) {
    this.removeInput('IF' + i);
    this.removeInput('DO' + i);
    i++;
  }
  // Rebuild block.
  for (var i = 1; i <= this.elseifCount_; i++) {
    this.appendValueInput('IF' + i)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
    this.appendStatementInput('DO' + i)
        .setCheck(["Statement"])
  }
  if (this.elseCount_) {
    this.appendStatementInput('block2')
      .setCheck(["Statement"])
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
  }

  triggerRefresh(this);
};
Blockly.Extensions.registerMutator(
  "controls_if_mutator_without_ui",
  Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN,
  null,
  []
);

Blockly.Blocks.AlternativaCompleta = {
  init: function () {
    this.jsonInit({
      "type": "Statement",
      "previousStatement": "Statement",
      "nextStatement": "Statement",
      "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
      "args0": [
        {
          "type": "input_value",
          "name": "condicion"
        }
      ],
      "message1": "%{BKY_CONTROLS_IF_MSG_THEN} %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "block1",
          "check": ["Statement"]
        }
      ],
      "colour": "%{BKY_LOGIC_HUE}",
      "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
      "mutator": "controls_if_mutator_without_ui",
      "extensions": ["controls_if_tooltip"]
    });

    this.setColour(Blockly.CUSTOM_COLORS.AlternativaCompleta || Blockly.CUSTOM_COLORS.controlStructure);
    this.setInputsInline(true);

    this.elseCount_++;
    this.updateShape_();
  },
  customContextMenu: function(options) {
    options.unshift({ text: Blockly.Msg.GBS_TOOLTIPS_IFS_CLEAN_BRANCHES, enabled: true, callback: () => {
      this.elseifCount_ = 0;

      this.updateShape_();
    }});

    options.unshift({ text: Blockly.Msg.GBS_TOOLTIPS_IFS_ADD_ELSEIF, enabled: true, callback: () => {
      this.elseifCount_++;

      const valueConnections = [null];
      const statementConnections = [null];
      const elseStatementConnection = this.getInput("block2").connection.targetConnection;
      let k;
      let input;

      k = 1;
      while (input = this.getInput("IF" + k)) {
        valueConnections.push(input.connection.targetConnection);
        k++;
      }

      k = 1;
      while (input = this.getInput("DO" + k)) {
        statementConnections.push(input.connection.targetConnection);
        k++;
      }

      this.updateShape_();

      // Reconnect any child blocks.
      for (var i = 1; i <= this.elseifCount_; i++) {
        Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
        Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
      }
      Blockly.Mutator.reconnect(elseStatementConnection, this, 'block2');
    }});
  }
};

// ------------------------------------------------------
// Comandos:
// ------------------------------------------------------

Blockly.Blocks.Poner = {
  init: function () {
    const icon = "putStone.png";

    this.jsonInit({
      message0: '%{BKY_GBS_DROP_MSG}',
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
      args0: [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
        {
          type: 'input_value',
          name: 'COLOR'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.Poner || Blockly.CUSTOM_COLORS.primitiveCommand,
      tooltip: '%{BKY_GBS_DROP_TOOLTIP}',
      inputsInline: true
    });
  }
};

Blockly.Blocks.Sacar = {
  init: function () {
    const icon = "removeStone.png";

    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
      message0: '%{BKY_GBS_GRAB_MSG}',
      args0: [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
        {
          type: 'input_value',
          name: 'COLOR'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.Sacar || Blockly.CUSTOM_COLORS.primitiveCommand,
      tooltip: '%{BKY_GBS_GRAB_TOOLTIP}',
      inputsInline: true
    });
  }
};

Blockly.Blocks.Mover = {
  init: function () {
    const icon = "move.png";

    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
      message0: '%{BKY_GBS_MOVE_MSG}',
      args0: [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
        {
          type: 'input_value',
          name: 'DIRECCION'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.Mover || Blockly.CUSTOM_COLORS.primitiveCommand,
      tooltip: '%{BKY_GBS_MOVE_TOOLTIP}',
      inputsInline: true
    });
  }
};

Blockly.Blocks.IrAlBorde = {
  init: function () {
    const icon = "goToEdge.png";

    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
      message0: '%{BKY_GBS_MOVETOEDGE_MSG}',
      args0: [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
        {
          type: 'input_value',
          name: 'DIRECCION'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.IrAlBorde || Blockly.CUSTOM_COLORS.primitiveCommand,
      tooltip: '%{BKY_GBS_MOVETOEDGE_TOOLTIP}',
      inputsInline: true
    });
  }
};

Blockly.Blocks.VaciarTablero = {
  init: function () {
    const icon = "emptyBoard.png";

    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
      message0: '%{BKY_GBS_CLEANBOARD_MSG}',
      args0: [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
      ],
      colour: Blockly.CUSTOM_COLORS.VaciarTablero || Blockly.CUSTOM_COLORS.primitiveCommand,
      tooltip: '%{BKY_GBS_CLEANBOARD_TOOLTIP}',
      inputsInline: true
    });
  }
};

Blockly.Blocks.BOOM = {
  init: function () {
    const icon = "boom.png";

    this.jsonInit({
      "type": "Statement",
      "previousStatement": "Statement",
      "nextStatement": "Statement",
      "lastDummyAlign0": "RIGHT",
      "message0": "%{BKY_GBS_BOOM_MSG}",
      "args0": [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "field_input",
          "name": "boomDescription",
          "text": "%{BKY_GBS_BOOM_INPUT_MOTIVE_MSG}"
        }
      ],
      "inputsInline": false,
      "colour": Blockly.CUSTOM_COLORS.BOOM || Blockly.CUSTOM_COLORS.primitiveCommand,
      "tooltip": "%{BKY_GBS_BOOM_TOOLTIP}"
    });
  }
};

Blockly.Blocks.makeShadowEventListener = function(event){
  if(event.blockId == this.id && event.newParentId){
      this.setShadow(true);
  }
};

Blockly.Blocks.ComandoCompletar = {
  init: function () {
    this.jsonInit({
      "type": "Statement",
      "previousStatement": "Statement",
      "nextStatement": "Statement",
      "lastDummyAlign0": "RIGHT",
      "message0": "%{BKY_GBS_COMPLETE_MSG}",
      "colour": Blockly.CUSTOM_COLORS.ComandoCompletar || Blockly.CUSTOM_COLORS.complete,
      "tooltip": "%{BKY_GBS_COMPLETE_TOOLTIP}"
    });
  },

  onchange: Blockly.Blocks.makeShadowEventListener
};

Blockly.Blocks.AsociacionDeTeclaCompletar = {
  init: function () {
    this.jsonInit({
      "type": "InteractiveBinding",
      "previousStatement": "InteractiveBinding",
      "nextStatement": "InteractiveBinding",
      "lastDummyAlign0": "RIGHT",
      "message0": "%{BKY_GBS_COMPLETE_MSG}",
      "colour": Blockly.CUSTOM_COLORS.AsociacionDeTeclaCompletar || Blockly.CUSTOM_COLORS.complete,
      "tooltip": "%{BKY_GBS_COMPLETE_TOOLTIP}"
    });
  },

  onchange: Blockly.Blocks.makeShadowEventListener
};

// ------------------------------------------------------
// Expresiones:
// ------------------------------------------------------

function deepCopyObj(aObject) {
  var bObject, v, k;
  bObject = Array.isArray(aObject) ? [] : {};
  for (k in aObject) {
    v = aObject[k];
    bObject[k] = (typeof v === "object") ? deepCopyObj(v) : v;
  }
  return bObject;
}

const oldMathNumber = Blockly.Blocks.math_number;
Blockly.Blocks.math_number = deepCopyObj(Blockly.Blocks.math_number);
Blockly.Blocks.math_number.init = function() {
  oldMathNumber.init.call(this);

  const icon = "number.png";
  var iconField = new Blockly.FieldImage(
    getLocalMediaUrl(this, icon),
    getLocalMediaSize(icon),
    getLocalMediaSize(icon)
  );
  this.inputList[0].insertFieldAt(0, iconField);
  this.setColour(Blockly.CUSTOM_COLORS.math_number || Blockly.CUSTOM_COLORS.literalExpression);
}

Blockly.Blocks.ExpresionCompletar = {
  init: function () {
    this.jsonInit({
      "type": "completar_expression",
      "message0": "%{BKY_GBS_COMPLETE_MSG}",
      "output": "any",
      "colour": Blockly.CUSTOM_COLORS.ExpresionCompletar || Blockly.CUSTOM_COLORS.complete,
      "tooltip": "%{BKY_GBS_COMPLETE_TOOLTIP}"
    });
  },

  onchange: Blockly.Blocks.makeShadowEventListener
};

function createLiteralSelectorBlock(type,values){
  return {
    init: function () {
      this.jsonInit({
        type: type,
        message0: "%1 %2",
        args0: [
          {
            "type": "field_image",
            "src": "",
            "width": 16,
            "height": 16
          },
          {
            type: "field_dropdown",
            name: type + "Dropdown",
            options: values.map(e => [Blockly.Msg[e[0]] || e[1], e[1]])
          }
        ],
        output: type,
        colour: Blockly.CUSTOM_COLORS[`${type}Selector`] || Blockly.CUSTOM_COLORS.literalExpression,
        tooltip: "%{BKY_GBS_LITERAL_SELECTOR_TOOLTIP}",
      });

      this.initialized = false;
    },

    afterInit: function() {
      if (!this.initialized) {
        this.options = values.map(e => [Blockly.Msg[e[0]] || e[1], e[1]])
        this.initialized = true;
      }
    },

    onchange: function(event) {
      this.afterInit();
      const [image, dropdown] = this.inputList[0].fieldRow;
      const value = dropdown.getValue();

      image.setValue(getLocalMediaUrl(this, `${type.toLowerCase()}-${value.toLowerCase()}.svg`));
    }
  };
}

Blockly.Blocks.ColorSelector =
  createLiteralSelectorBlock(
    'Color', [
      ['GBS_COLOR_BLUE_MSG', 'Azul'],
      ['GBS_COLOR_BLACK_MSG', 'Negro'],
      ['GBS_COLOR_RED_MSG', 'Rojo'],
      ['GBS_COLOR_GREEN_MSG', 'Verde']
    ]);

Blockly.Blocks.DireccionSelector =
  createLiteralSelectorBlock(
    'Direccion',[
      ['GBS_DIR_NORTH_MSG', 'Norte'],
      ['GBS_DIR_EAST_MSG', 'Este'],
      ['GBS_DIR_SOUTH_MSG', 'Sur'],
      ['GBS_DIR_WEST_MSG', 'Oeste']
    ]);
Blockly.Blocks.BoolSelector =
  createLiteralSelectorBlock(
    'Bool', [
      ['GBS_BOOL_FALSE_MSG', 'False'],
      ['GBS_BOOL_TRUE_MSG', 'True'],
    ]);

Blockly.Blocks.List = {
  init: function () {
    const type = "List";

    this.jsonInit({
      type: type,
      message0: "[",
      args0: [],
      output: type,
      colour: Blockly.CUSTOM_COLORS.list || Blockly.CUSTOM_COLORS.literalExpression,
      inputsInline: false
    });

    this._addAddButton();
    this.length = 0;
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('length', this.length);
    return container;
  },

  domToMutation: function(xmlElement) {
    var length = parseInt(xmlElement.getAttribute('length')) || 0;
    for (let i = 0; i < length; i++) this._addElement();
  },

  _addElement: function() {
    this.length++;
    this._removeAddButton();
    const input = this.appendValueInput('element' + this.length);
    this._addRemoveButtonFor(input);
    this._addAddButton();
    triggerRefresh(this);
  },

  _removeElement: function(input) {
    this.removeInput(input.name);
    this.length--;

    let id = 1;
    for (let input of this.inputList) {
      if (input.name.startsWith("element")) {
        input.name = "element" + id;
        id++;
      }
    }
    triggerRefresh(this);
  },

  _addAddButton: function() {
    const icon = "plus.png";
    var addButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, icon),
      getLocalMediaSize(icon),
      getLocalMediaSize(icon),
      "",
      function() {
        this._addElement();
      }.bind(this)
    );
    setTimeout(() => { addButton.setTooltip("%{BKY_GBS_TOOLTIPS_OPERATOR_ADD}"); });

    const input = this.appendDummyInput();
    input.appendField(addButton);
    input.name = "addButton";

    const closingBracket = this.appendDummyInput();
    closingBracket.appendField("]");
    closingBracket.name = "closingBracket";
  },

  _removeAddButton: function() {
    this.removeInput("addButton")
    this.removeInput("closingBracket");
  },

  _addRemoveButtonFor: function(input) {
    const icon = "minus.png";
    var removeButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, icon),
      getLocalMediaSize(icon),
      getLocalMediaSize(icon),
      "",
      function() {
        this._removeElement(input);
      }.bind(this)
    );
    setTimeout(() => { removeButton.setTooltip("%{BKY_GBS_TOOLTIPS_OPERATOR_ADD}"); });
    input.appendField(removeButton);
  }
};

Blockly.Blocks.AlternativaEnExpresiones = {
  init: function () {
    this.jsonInit({
      message0: "",
      args0: [],
      output: "*",
      colour: Blockly.CUSTOM_COLORS.AlternativaEnExpresiones || Blockly.CUSTOM_COLORS.operator,
      inputsInline: true
    });
    this.length = 0;

    this._addOtherwise();
    this._addElement();
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('extrabranches', this.length - 1);
    return container;
  },

  domToMutation: function(xmlElement) {
    var extraBranches = parseInt(xmlElement.getAttribute('extrabranches')) || 0;
    for (let i = 0; i < extraBranches; i++) this._addElement();
  },

  _addElement: function() {
    this.length++;
    this._removeOtherwise();
    this._removeAddButton();

    if (this.length > 1) this._addNewline("newline" + this.length);
    this.appendDummyInput().appendField(Blockly.Msg.GBS_CHOOSE_MSG_1).name = "label1" + this.length;
    const input1 = this.appendValueInput('element' + this.length);
    this.appendDummyInput().appendField(Blockly.Msg.GBS_CHOOSE_MSG_2).name = "label2" + this.length;
    const input2 = this.appendValueInput('condition' + this.length);

    if (this.length > 1) this._addRemoveButtonFor(this.length, input2);
    this._addAddButton();
    this._addOtherwise();
    triggerRefresh(this);
  },

  _removeElement: function(n) {
    const elements = ["label1", Blockly.Msg.GBS_CHOOSE_MSG_1, "label2", Blockly.Msg.GBS_CHOOSE_MSG_2, "newline"];
    elements.forEach((element) => this.removeInput(element + n));
    this.length--;

    let id;
    elements.forEach((element) => {
      id = 1;
      for (let input of this.inputList) {
        if (input.name.startsWith(element)) {
          input.name = element + (id + (element === "newline" ? 1 : 0));
          id++;
        }
      }
    });

    triggerRefresh(this);
  },

  _addAddButton: function() {
    const icon = "plus.png";
    var addButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, icon),
      getLocalMediaSize(icon),
      getLocalMediaSize(icon),
      "",
      function() {
        this._addElement();
      }.bind(this)
    );
    setTimeout(() => { addButton.setTooltip("%{BKY_GBS_TOOLTIPS_OPTIONS_ADD}"); });

    const input = this.appendDummyInput();
    input.appendField(addButton);
    input.name = "addButton";
  },

  _removeAddButton: function() {
    this.removeInput("addButton")
    this.removeInput("closingBracket");
  },

  _addOtherwise: function() {
    this._addNewline("otherwiseNewline");

    const textInput = this.appendDummyInput();
    textInput.appendField(Blockly.Msg.GBS_OTHERWISE);
    textInput.name = "otherwiseText";

    this.appendValueInput("otherwise");
  },

  _removeOtherwise: function() {
    this.removeInput("otherwiseText");
    this.removeInput("otherwise");
    this.removeInput("otherwiseNewline");
  },

  _addNewline: function(name) {
    this.appendStatementInput(name).setCheck(["NEWLINE"]);
  },

  _addRemoveButtonFor: function(n, input) {
    const icon = "minus.png";
    var removeButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, icon),
      getLocalMediaSize(icon),
      getLocalMediaSize(icon),
      "",
      function() {
        this._removeElement(parseInt(input.name.replace(/\D/g,'')));
      }.bind(this)
    );
    setTimeout(() => { removeButton.setTooltip("%{BKY_GBS_TOOLTIPS_OPTIONS_REMOVE}"); });
    input.appendField(removeButton);
  }
};

Blockly.Blocks.ForEach = {
  init: function () {
    this.jsonInit({
      type: "Statement",
      previousStatement: "Statement",
      nextStatement: "Statement",
        message0: '%{BKY_GBS_FOREACH_MSG}',
        args0: [
          {
            "type": "field_input",
            "name": "varName",
            "text": "%{BKY_GBS_FOREACH_INDEX_MSG}"
          },
          {
            type: 'input_dummy'
          },
          {
            "type": "field_label",
            "text": "%{BKY_GBS_FOREACH_IN_MSG}"
          },
        ]
    });

    var self = this;

    const nameField = this.getField("varName");
    nameField.setValidator(function(name) {
      // Strip leading and trailing whitespace. Beyond this, all names are legal.
      name = name.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');

      var oldName = this.text_;
      if (oldName != name) {
        // Rename any callers.
        var blocks = this.sourceBlock_.workspace.getAllBlocks(false);
        for (var i = 0; i < blocks.length; i++) {
          if (blocks[i].$parent === self.id) {
            blocks[i].setFieldValue(name, "VAR")
          }
        }
      }

      return name;
    });

    this.setColour(Blockly.CUSTOM_COLORS.ForEach || Blockly.CUSTOM_COLORS.controlStructure);
    this.appendValueInput('list');
    this.appendStatementInput('block').setCheck(["Statement"]);
    this.setInputsInline(true);

    const handIcon = "hand.png";
    var createGetterButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, handIcon),
      getLocalMediaSize(handIcon),
      getLocalMediaSize(handIcon),
      "",
      function() {
        var name = self.getFieldValue('varName');
        createVariable(self, name, (block) => {
          block.$parent = self.id;
        });
      }
    );
    setTimeout(() => { createGetterButton.setTooltip("%{BKY_GBS_TOOLTIPS_VARS_GET}"); });

    this.inputList[0].appendField(createGetterButton);
  }
};

function createSingleParameterExpressionBlock(blockText,returnType, colorType = "operator"){
  return {
    init: function () {
      this.jsonInit({
        message0: blockText + ' %1',
        args0: [
          {
            type: 'input_value',
            name: 'VALUE'
          }
        ],
        colour: Blockly.CUSTOM_COLORS[this.type] || Blockly.CUSTOM_COLORS[colorType],
        inputsInline: true,
        output: returnType
      })
    }
  };
}

Blockly.Blocks.hayBolitas = createSingleParameterExpressionBlock('%{BKY_GBS_HASSTONES_MSG}','Bool', "primitiveExpression");
Blockly.Blocks.puedeMover = createSingleParameterExpressionBlock('%{BKY_GBS_CANMOVE_MSG}','Bool', "primitiveExpression");
Blockly.Blocks.nroBolitas = createSingleParameterExpressionBlock('%{BKY_GBS_NUMSTONES_MSG}','Number', "primitiveExpression");

// ------------------------------------------------------
// Operaciones:
// ------------------------------------------------------

Blockly.Blocks.OperadorDeComparacion = {
  init: function () {
    this.jsonInit({
      message0: '%1 %2 %3 %4',
      args0: [
        {
          type: 'input_value',
          name: 'arg1'
        },
        {
          type: 'field_dropdown',
          name: 'RELATION',
          options: [['==', '=='], ['/=', '/='], ['<=', '<='], ['<', '<'], ['>=', '>='], ['>', '>']]
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_value',
          name: 'arg2'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.OperadorDeComparacion || Blockly.CUSTOM_COLORS.operator,
      inputsInline: false,
      output: 'Bool'
    });
  }
};

Blockly.Blocks.OperadorNumerico = {
  init: function () {
    this.jsonInit({
      message0: '%1 %2 %3 %4',
      args0: [
        {
          type: 'input_value',
          name: 'arg1'
        },
        {
          type: 'field_dropdown',
          name: 'OPERATOR',
          options: [['+', '+'], ['-', '-'], ['*', '*'], ['div', 'div'], ['mod', 'mod'], ['^', '^']]
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_value',
          name: 'arg2'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.OperadorNumerico || Blockly.CUSTOM_COLORS.operator,
      inputsInline: false,
      output: 'Number'
    });
  }
};

Blockly.Blocks.OperadorLogico = {
  init: function () {
    this.jsonInit({
      message0: '%1 %2 %3 %4',
      args0: [
        {
          type: 'input_value',
          name: 'arg1'
        },
        {
          type: 'field_dropdown',
          name: 'OPERATOR',
          options: [['%{BKY_GBS_AND_MSG}', 'AND'], ['%{BKY_GBS_OR_MSG}', '||']]
        },
        {
          type: 'input_dummy'
        },
        {
          type: 'input_value',
          name: 'arg2'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.OperadorLogico || Blockly.CUSTOM_COLORS.operator,
      inputsInline: false,
      output: 'Bool'
    });
  }
};

Blockly.Blocks.Asignacion = {
  init: function () {
    const icon = "assignation.png";

    this.jsonInit({
      "type": "asignacion",
      "message0": "%{BKY_GBS_ASSIGNMENT_MSG}",
      "args0": [
        {
          "type": "field_image",
          "src": getLocalMediaUrl(this, icon),
          "width": getLocalMediaSize(icon),
          "height": getLocalMediaSize(icon)
        },
        {
        "type": "field_input",
        "name": "varName",
        "text": "%{BKY_GBS_VARIABLE_NAME_MSG}",
        "class": Blockly.Procedures.rename
        },
        {
        "type": "input_dummy"
        },
        {
        "type": "input_dummy"
        },
        {
        "type": "input_value",
        "name": "varValue"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.CUSTOM_COLORS.Asignacion || Blockly.CUSTOM_COLORS.assignation,
      "tooltip": "",
      "helpUrl": ""
    });

    var self = this;

    const handIcon = "hand.png";
    var createGetterButton = new Blockly.FieldImage(
      getLocalMediaUrl(this, handIcon),
      getLocalMediaSize(handIcon),
      getLocalMediaSize(handIcon),
      "",
      function() {
        var name = self.getFieldValue('varName');
        self.createVariableBlock(name);
      }
    );
    setTimeout(() => { createGetterButton.setTooltip("%{BKY_GBS_TOOLTIPS_VARS_GET}"); });

    this.appendDummyInput().appendField(createGetterButton);
  },

  customContextMenu: function(options) {
    var name = this.getFieldValue('varName');

    options.unshift({ text: Blockly.Msg.GBS_TOOLTIPS_VARS_CREATE.replace('${name}', name), enabled: true, callback: () => {
      this.createVariableBlock(name);
    }});
  },

  createVariableBlock: function(name) {
    return createVariable(this, name);
  }
};


Blockly.Blocks.variables_get = {
  init: function () {
    this.jsonInit({
      "type": "variables_get",
      "message0": "%1",
      "args0": [
        {
        "type": "field_input",
        "name": "VAR",
        "text": "%{BKY_GBS_VARIABLE_NAME_TOOLTIP}"
        }
      ],
      "output": null,
      "colour": Blockly.CUSTOM_COLORS.variable,
      "tooltip": "",
      "helpUrl": "",
    });
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('var', this.getFieldValue('VAR'));
    if (this.$parent) container.setAttribute("parent", this.$parent);
    return container;
  },
  domToMutation: function(xmlElement) {
    var var_name = xmlElement.getAttribute('var');
    this.setFieldValue(var_name, 'VAR');
    this.$parent = xmlElement.getAttribute("parent") || null;
  },

  onchange: function(event){
    if (this.$parent) {
      this.getField("VAR").EDITABLE = false;
      this.setColour(Blockly.CUSTOM_COLORS.parameter);
    } else {
      this.setColour(Blockly.CUSTOM_COLORS.variable);
    }

    if (event.blockId == this.id && event.type == Blockly.Events.BLOCK_DELETE) {
      // do something with parent
    }
  }
};

Blockly.Blocks.OperadoresDeEnumeracion = {
  init: function () {
    this.jsonInit({
      message0: '%1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'OPERATOR',
          options: [['%{BKY_GBS_NEXT_MSG}', 'siguiente'], ['%{BKY_GBS_PREVIOUS_MSG}', 'previo'], ['%{BKY_GBS_OPPOSITE_MSG}', 'opuesto']]
        },
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      colour: Blockly.CUSTOM_COLORS.OperadoresDeEnumeracion || Blockly.CUSTOM_COLORS.operator,
      inputsInline: true,
      output: "*"
    })
  }
};

Blockly.Blocks.not = createSingleParameterExpressionBlock('%{BKY_GBS_NOT_MSG}','Bool');
Blockly.Blocks.siguiente = createSingleParameterExpressionBlock('%{BKY_GBS_NEXT_MSG}','*');
Blockly.Blocks.previo = createSingleParameterExpressionBlock('%{BKY_GBS_PREVIOUS_MSG}','*');
Blockly.Blocks.opuesto = createSingleParameterExpressionBlock('%{BKY_GBS_OPPOSITE_MSG}','*');

// Removing "/" from the block id character set to avoid syntax errors
Blockly.utils.genUid.soup_ = Blockly.utils.genUid.soup_.replace("/", "");

// Necesario para sanitizar nombres de procedimientos.
// En la interfaz de bloques de gobstones por ahora vamos a dejar pasar sólo espacios y letras con tilde
Blockly.Blocks.GobstonesSanitizer = function(name){
  return name.replace(/[^A-Za-z0-9ÁÉÍÓÚÑáéíóúñ_ ]/g,'');
};

Blockly.Procedures.OldRename = Blockly.Procedures.rename;
Blockly.Procedures.rename = function(name){
  return Blockly.Procedures.OldRename.call(this,
    Blockly.Blocks.GobstonesSanitizer(name));
};

// Necesario para sanitizar nombres de parámetros.
// En la interfaz de bloques de gobstones por ahora vamos a dejar pasar sólo espacios y letras con tilde
// Mirá, mirá cómo rompo el encapsulamiento y repito código, mirá.
Blockly.Blocks.procedures_mutatorarg.validator_old = Blockly.Blocks.procedures_mutatorarg.validator_;
Blockly.Blocks.procedures_mutatorarg.validator_ = function(name){
  return Blockly.Blocks.procedures_mutatorarg.validator_old.call(this,
    Blockly.Blocks.GobstonesSanitizer(name));
};

// Enable/Disable atomic
const oldProceduresCustomContextMenu = Blockly.Blocks.procedures_defnoreturn.customContextMenu
Blockly.Blocks.procedures_defnoreturn.customContextMenu = function(options) {
  oldProceduresCustomContextMenu.call(this, options);

  const block = this;
  options.splice(1, 0, {
    enabled: true,
    text: block.$isAtomic ? Blockly.Msg.GBS_TOOLTIPS_SHOW_STEP_OFF : Blockly.Msg.GBS_TOOLTIPS_SHOW_STEP_ON,
    callback: function() {
      block.$isAtomic = !block.$isAtomic;
      triggerRefresh(block);
    }
  })
}
const oldProceduresMutationToDom = Blockly.Blocks['procedures_defnoreturn'].mutationToDom;
Blockly.Blocks.procedures_defnoreturn.mutationToDom = function() {
  const container = oldProceduresMutationToDom.call(this);
  container.setAttribute("isatomic", this.$isAtomic ? "true" : "false");
  return container;
}
const oldProceduresDomToMutation = Blockly.Blocks['procedures_defnoreturn'].domToMutation;
Blockly.Blocks.procedures_defnoreturn.domToMutation = function(xmlElement) {
  const isAtomic = xmlElement.getAttribute("isatomic");
  this.$isAtomic = isAtomic === "true";

  return oldProceduresDomToMutation.call(this, xmlElement);
}

Blockly.Blocks.procedures_callreturn.onchange = updateProcedBlocklyLanguage;
Blockly.Blocks.procedures_defnoreturn.onchange = updateProcedBlocklyLanguage;
Blockly.Blocks.procedures_callnoreturnnoparams.onchange = updateProcedBlocklyLanguage;
Blockly.Blocks.procedures_defnoreturnnoparams.onchange = updateProcedBlocklyLanguage;
