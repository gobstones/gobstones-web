/* global Blockly */

Blockly.translations = Blockly.translations || {} ;
Blockly.translations.enMsgs = {
// Commands
// ========
    // Builtin
    'GBS_DROP_MSG': '%1 Drop %2',
    'GBS_DROP_TOOLTIP': 'Drop a stone of the given color in the current cell.',
    'GBS_GRAB_MSG': '%1 Grab %2',
    'GBS_GRAB_TOOLTIP': 'Grab a stone of the given color from the current cell.',
    'GBS_MOVE_MSG': '%1 Move %2',
    'GBS_MOVE_TOOLTIP': 'Move the head one cell to the given direction.',
    'GBS_MOVETOEDGE_MSG': '%1 Move to edge %2',
    'GBS_MOVETOEDGE_TOOLTIP': 'Move the head to the cell at the border in the given direction.',
    'GBS_CLEANBOARD_MSG': '%1 Clean board',
    'GBS_CLEANBOARD_TOOLTIP': 'Remove all stones from the board, the head stays at the current cell.',
    'GBS_BOOM_MSG': '%1 Do BOOM!, because %2 %3',
    'GBS_BOOM_INPUT_MOTIVE_MSG': 'add reason...',
    'GBS_BOOM_TOOLTIP': 'Make the head explode, stating a given reason.',
    'GBS_COMPLETE_MSG': 'COMPLETE',
    'GBS_COMPLETE_TOOLTIP': 'You have to replace this block with your solution',
    // Repetitions
    'GBS_REPEAT_MSG_1': 'repeat',
    'GBS_REPEAT_MSG_2': 'times',
    'GBS_REPEAT_TOOLTIP': 'Repite una serie de comandos una cantidad determinada de veces',
    'GBS_WHILE_MSG': 'repeat while',
    'GBS_WHILE_TOOLTIP': 'Repite una serie de comandos mientras que la condición dada sea verdadera.',
    'GBS_UNTIL_MSG': 'repeat until ',
    'GBS_UNTIL_TOOLTIP': 'Repite una serie de comandos hasta que la condición dada sea verdadera.',
    'GBS_FOREACH_MSG': 'repeat for each %1 %2 %3',
    'GBS_FOREACH_INDEX_MSG': 'element',
    'GBS_FOREACH_IN_MSG': 'in',
    'GBS_FOREACH_TOOLTIP': 'Repite tantas veces como elementos haya en la lista dada, y para cada iteración, llama con el nombre del indice al elemento en dicha posición de la lista.',
    // Alternatives
    'CONTROLS_IF_MSG_ELSE': 'else',
    'CONTROLS_IF_MSG_ELSEIF': 'else, if',
    'CONTROLS_IF_MSG_IF': 'if',
    'CONTROLS_IF_MSG_THEN': '',
    'GBS_IF_SIMPLE_TOOLTIP': 'Realiza una secuencia de comandos solo si se cumple la condición dada.',
    'GBS_IF_FULL_MSG': 'si %1 entonces, sino',
    'GBS_IF_FULL_TOOLTIP': 'Realiza la primera secuencia de comandos solo si se cumple la condición dada, caso contrario realiza la segunda secuencia de comandos.',
    'GBS_IF_MULTI_MSG': 'si %1 entonces, sino si %2, sino si %3, sino',
    'GBS_IF_MULTI_TOOLTIP': 'Realiza la secuencia de comandos que sigue a aquella condición que se cumple, ignorando el resto de las secuencia de comandos',
    'GBS_SWITCH_MSG': 'switch %1 case',
    'GBS_SWITCH_TOOLTIP': 'Realiza la secuencia de comandos que se asocia al valor del elemento dado.',
    // Assignment
    'GBS_ASSIGNMENT_MSG': '%1 Remember that %2 %3 is %4 %5',
    'GBS_VARIABLE_NAME_MSG': 'a variable',
    'GBS_VARIABLE_NAME_TOOLTIP': 'variable`s name',
// Expressions
// ===========
    //
    'GBS_LITERAL_SELECTOR_TOOLTIP': 'Pick a value',
    // Literals
    'GBS_COLOR_TYPE_NAME': 'Color',
    'GBS_COLOR_BLUE_MSG': 'Blue',
    'GBS_COLOR_BLACK_MSG': 'Black',
    'GBS_COLOR_RED_MSG': 'Red',
    'GBS_COLOR_GREEN_MSG': 'Green',
    'GBS_DIR_TYPE_NAME': 'Direction',
    'GBS_DIR_NORTH_MSG': 'North',
    'GBS_DIR_EAST_MSG': 'East',
    'GBS_DIR_SOUTH_MSG': 'South',
    'GBS_DIR_WEST_MSG': 'West',
    'GBS_BOOL_TYPE_NAME': 'Bool',
    'GBS_BOOL_TRUE_MSG': 'True',
    'GBS_BOOL_FALSE_MSG': 'False',
    'GBS_NUMBER_MSG': '%1',
    'GBS_NUMBER_TOOLTIP': 'Describe un número',
    'GBS_LIST_NIL_MSG': 'La lista vacía',
    'GBS_LIST_NIL_TOOLTIP': 'Describe la lista vacía',
    'GBS_LIST_ENUMERATED_MSG': 'La lista con: %1, %2, %3, ...',
    'GBS_LIST_ENUMERATED_TOOLTIP': 'Describe la lista que contiene a los elementos dados',
    'GBS_LIST_RANGE_MSG': 'El rango desde %1 hasta %2',
    'GBS_LIST_RANGE_TOOLTIP': 'Describe la lista que contiene a los elementos desde el primero al último',
    'GBS_LIST_RANGE_BY_MSG': 'El rango desde %1 hasta %2 salteado de a %3',
    'GBS_LIST_RANGE_BY_TOOLTIP': 'Describe la lista que contiene a los elementos desde el primero al último, tomados en saltos de a la cantidad indicada.',
    // Builtin
    'GBS_NUMSTONES_MSG': 'number of stones',
    'GBS_NUMSTONES_TOOLTIP': 'Describe el número de bolitas del color indicado',
    'GBS_HASSTONES_MSG': 'has stones',
    'GBS_HASSTONES_TOOLTIP': 'Indica si hay bolitas del color dado.',
    'GBS_CANMOVE_MSG': 'can move',
    'GBS_CANMOVE_TOOLTIP': 'Indica si se puede mover el cabezal una celda hacia la dirección dada.',
    'GBS_HEAD_MSG': 'primero de $1',
    'GBS_TAIL_MSG': 'sin el primero de %1',
    'GBS_ISEMPTY_MSG': 'está vacía %1',
    // Enumeration
    'GBS_NEXT_MSG': 'next',
    'GBS_PREVIOUS_MSG': 'previous',
    'GBS_OPPOSITE_MSG': 'opposite',
    // Aritmetic
    'GBS_ADD_MSG': '%1 + %2',
    'GBS_ADD_TOOLTIP': 'Desribe la suma de los número dados.',
    'GBS_SUB_MSG': '%1 - %2',
    'GBS_SUB_TOOLTIP': 'Desribe la resta de los número dados.',
    'GBS_MUL_MSG': '%1 * %2',
    'GBS_MUL_TOOLTIP': 'Desribe la multiplicación de los número dados.',
    'GBS_DIV_MSG': '%1 / %2',
    'GBS_DIV_TOOLTIP': 'Desribe el resultado de la división entera de los número dados.',
    'GBS_MOD_MSG': '%1 % %2',
    'GBS_MOD_TOOLTIP': 'Desribe el resto de la división entera de los número dados.',
    'GBS_POW_MSG': '%1 ^ %2',
    'GBS_POW_TOOLTIP': 'Desribe el resultado de elevar el primero de los número a la potencia dada por el segundo número.',
    // Comparing
    'GBS_EQ_MSG': '%1 == %2',
    'GBS_EQ_TOOLTIP': 'Indica si el primer elemento es igual al segundo',
    'GBS_NEQ_MSG': '%1 /= %2',
    'GBS_NEQ_TOOLTIP': 'Indica si el primer elemento es distinto al segundo',
    'GBS_LT_MSG': '%1 < %2',
    'GBS_LT_TOOLTIP': 'Indica si el primer elemento es menor al segundo',
    'GBS_GT_MSG': '%1 > %2',
    'GBS_GT_TOOLTIP': 'Indica si el primer elemento es mayor al segundo',
    'GBS_LEQ_MSG': '%1 <= %2',
    'GBS_LEQ_TOOLTIP': 'Indica si el primer elemento es menor o igual al segundo',
    'GBS_GEQ_MSG': '%1 <= %2',
    'GBS_GEQ_TOOLTIP': 'Indica si el primer elemento es mayor o igual al segundo',
    // Logical
    'GBS_AND_MSG': 'and',
    'GBS_AND_TOOLTIP': 'Describe la conjunción lógica de dos booleanos dados.',
    'GBS_OR_MSG': 'or',
    'GBS_OR_TOOLTIP': 'Describe la disyunción lógica de dos booleanos dados.',
    'GBS_NOT_MSG': 'not',
    'GBS_NOT_TOOLTIP': 'Describe la conjunción lógica del booleano dado.',
    // Alternatives
    'GBS_CHOOSE_MSG_1': 'choose',
    'GBS_CHOOSE_MSG_2': 'when',
    'GBS_CHOOSE_TOOLTIP': 'Describe la expresión que se asocia a la primer condición que resulte verdadera, o la del caso contrario, en caso de que ninguna se cumpla.',
    'GBS_OTHERWISE': 'otherwise',
    'GBS_MATCHING_MSG': 'si %1 es igual a %2 describir %3, %4 en caso contrario',
    'GBS_MATCHING_TOOLTIP': 'Describe la expresión que se asocia al valor que tenga la expresión dada.',
// Definitions
// ===========
    // Program
    'GBS_PROGRAM_MSG': 'program',
    'GBS_PROGRAM_TOOLTIP': 'Defines a new program.',
    'GBS_INTERACTIVEPROGRAM_MSG': 'interactive program',
    'GBS_INTERACTIVEPROGRAM_TOOLTIP': 'Defines a new interactive program.',
    'GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_TIMEOUT_MSG': 'Add timeout.',
    'GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_TIMEOUT_TOOLTIP': 'Add a timeout in milliseconds.',
    'GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_INIT_MSG': 'Add initialization.',
    'GBS_INTERACTIVEPROGRAM_CONTEXT_ADD_INIT_TOOLTIP': 'Add an initialization block.',
    // Procedures
    'PROCEDURES_DEFNORETURN_PROCEDURE': 'do something',
    'GBS_PROCEDURE_SIMPLE_MSG': 'procedimiento $1',
    'GBS_PROCEDURE_SIMPLE_TOOLTIP': 'Define un nuevo procedimiento símple.',
    'GBS_PROCEDURE_PARAMS_MSG': 'procedimiento $1 con',
    'GBS_PROCEDURE_PARAMS_TOOLTIP': 'Define un nuevo procedimiento con parámetros.',
    // Functions
    'GBS_FUNCTION_SIMPLE_MSG': 'función $1',
    'GBS_FUNCTION_SIMPLE_TOOLTIP': 'Define una función simple.',
    'GBS_FUNCTION_SIMPLE_PARAM_MSG': 'función $1 con',
    'GBS_FUNCTION_SIMPLE_PARAM_TOOLTIP': 'Define una función simple con parámetros.',
    'GBS_FUNCTION_PROCESSING_MSG': 'función $1',
    'GBS_FUNCTION_PROCESSING_TOOLTIP': 'Define una función con procesamiento.',
    'GBS_FUNCTION_PROCESSING_PARAM_MSG': 'función $1 con',
    'GBS_FUNCTION_PROCESSING_PARAM_TOOLTIP': 'Define una función con procesamiento con parámetros',


// Other
// =====
    'GBS_PROCEDURE_ARG_SOMETHING': 'Do something',
    'GBS_FUNCTION_ARG_SOMETHING': 'something',
    'GBS_FUNCTION_ARG_DEFINES': 'Defines that',
    'GBS_FUNCTION_ARG_EQUAL_TO': 'equals to',

    'GBS_TOOLTIPS_DELETE': 'Delete',
    'GBS_TOOLTIPS_ONINIT': 'On inicialization:',
    'GBS_TOOLTIPS_ONPUSH': 'On push ',
    'GBS_TOOLTIPS_ONPUSH_DEFINED': 'On push ',
    'GBS_TOOLTIPS_ONTIMEOUT': 'On being inactive %{timeout} milliseconds',
    'GBS_TOOLTIPS_ADD_MODIFIER': 'Add modifier',
    'GBS_TOOLTIPS_CLEAN_MODIFIER': 'Clean modifiers',

    'GBS_TOOLTIPS_KEY_LETTER': 'Letter',
    'GBS_TOOLTIPS_KEY_NUMBER': 'Number',
    'GBS_TOOLTIPS_KEY_SPECIAL': 'Key',

    'GBS_TOOLTIPS_KEY_SPACE': 'Space',
    'GBS_TOOLTIPS_KEY_ENTER': 'Enter',
    'GBS_TOOLTIPS_KEY_BACKSPACE': 'Backspace',
    'GBS_TOOLTIPS_KEY_DEL': 'Supr',
    'GBS_TOOLTIPS_KEY_INSERT': 'Insert',
    'GBS_TOOLTIPS_KEY_TAB': 'Tab',
    'GBS_TOOLTIPS_KEY_ESCAPE': 'Esc',

    'GBS_TOOLTIPS_IFS_ADD_ELSEIF': 'Add "else, if" branch',
    'GBS_TOOLTIPS_IFS_CLEAN_BRANCHES': 'Clean "else, if" branches',

    'GBS_TOOLTIPS_OPERATOR_ADD': 'Add element',
    'GBS_TOOLTIPS_OPERATOR_REMOVE': 'Remove element',
    'GBS_TOOLTIPS_OPTIONS_ADD': 'Add option',
    'GBS_TOOLTIPS_OPTIONS_REMOVE': 'Remove option',
    'GBS_TOOLTIPS_OPTIONS_OR_ELSE': 'or else',
    'GBS_TOOLTIPS_VARS_GET': 'Obtain variable',
    'GBS_TOOLTIPS_VARS_CREATE': 'Crear ${varname}',

    'GBS_TOOLTIPS_SHOW_STEP_OFF': '✗ Show step by step',
    'GBS_TOOLTIPS_SHOW_STEP_ON': '✓ Show step by step',

    // proceds-blockly
    'PROCEDURES_DEFNORETURN_COMMENT': 'Describes the procedure...',
    'PROCEDURES_DEFNORETURN_PROCEDURE': 'Do something',
    'PROCEDURES_DEFNORETURN_TITLE': 'Define',
    'PROCEDURES_DEFNORETURN_NOPARAMS': '',
    'PROCEDURES_DEFRETURN_NOPARAMS': '',
    'PROCEDURES_DEFRETURN_COMMENT': 'Describes the function...',
    'PROCEDURES_DEFRETURN_PROCEDURE': 'return something',
    'PROCEDURES_DEFRETURN_TITLE': 'Define',
    'PROCEDURES_BEFORE_PARAMS': 'with',
    'PROCEDURES_DEFNORETURN_TOOLTIP': 'Creates a procedure.',
    'PROCEDURES_DEFRETURN_TOOLTIP': 'Creates a function.',
    'PROCEDURES_ADD_PARAMETER': 'Add parameter',
    'PROCEDURES_ADD_PARAMETER_PROMPT': 'Enter the parameter name',
    'PROCEDURES_REMOVE_PARAMETER': 'Remove parameter',
    'PROCEDURES_PARAMETER': 'parameter',
}
// Initialize default message if not defined
Blockly.translations.en = function() {
  for (var key in Blockly.translations.enMsgs) {
    Blockly.Msg[key] = Blockly.translations.enMsgs[key]
  }
}
// Initialize default message if not defined
if (!Blockly.GBS_DROP_MSG) {
  Blockly.translations.en(),
  Blockly.translations.defaultLanguage = 'en';
}

