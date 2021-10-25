/* global Blockly, goog */
/* eslint camelcase: "off" */

/*
 * Blockly code generator for Gobstones
 */
goog.require('Blockly.Generator');

Blockly.GobstonesLanguage = new Blockly.Generator('GobstonesLanguage');

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/GobstonesLanguage/Reference/Operators/Operator_Precedence
 */
Blockly.GobstonesLanguage.ORDER_ATOMIC = 0;					 // 0 "" ...
Blockly.GobstonesLanguage.ORDER_NEW = 1.1;						// new
Blockly.GobstonesLanguage.ORDER_MEMBER = 1.2;				 // . []
Blockly.GobstonesLanguage.ORDER_FUNCTION_CALL = 2;		// ()
Blockly.GobstonesLanguage.ORDER_INCREMENT = 3;				// ++
Blockly.GobstonesLanguage.ORDER_DECREMENT = 3;				// --
Blockly.GobstonesLanguage.ORDER_BITWISE_NOT = 4.1;		// ~
Blockly.GobstonesLanguage.ORDER_UNARY_PLUS = 4.2;		 // +
Blockly.GobstonesLanguage.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.GobstonesLanguage.ORDER_LOGICAL_NOT = 4.4;		// !
Blockly.GobstonesLanguage.ORDER_TYPEOF = 4.5;				 // typeof
Blockly.GobstonesLanguage.ORDER_VOID = 4.6;					 // void
Blockly.GobstonesLanguage.ORDER_DELETE = 4.7;				 // delete
Blockly.GobstonesLanguage.ORDER_DIVISION = 5.1;			 // /
Blockly.GobstonesLanguage.ORDER_MULTIPLICATION = 5.2; // *
Blockly.GobstonesLanguage.ORDER_MODULUS = 5.3;				// %
Blockly.GobstonesLanguage.ORDER_SUBTRACTION = 6.1;		// -
Blockly.GobstonesLanguage.ORDER_ADDITION = 6.2;			 // +
Blockly.GobstonesLanguage.ORDER_BITWISE_SHIFT = 7;		// << >> >>>
Blockly.GobstonesLanguage.ORDER_RELATIONAL = 8;			 // < <= > >=
Blockly.GobstonesLanguage.ORDER_IN = 8;							 // in
Blockly.GobstonesLanguage.ORDER_INSTANCEOF = 8;			 // instanceof
Blockly.GobstonesLanguage.ORDER_EQUALITY = 9;				 // == != === !==
Blockly.GobstonesLanguage.ORDER_BITWISE_AND = 10;		 // &
Blockly.GobstonesLanguage.ORDER_BITWISE_XOR = 11;		 // ^
Blockly.GobstonesLanguage.ORDER_BITWISE_OR = 12;			// |
Blockly.GobstonesLanguage.ORDER_LOGICAL_AND = 13;		 // &&
Blockly.GobstonesLanguage.ORDER_LOGICAL_OR = 14;			// ||
Blockly.GobstonesLanguage.ORDER_CONDITIONAL = 15;		 // ?:
Blockly.GobstonesLanguage.ORDER_ASSIGNMENT = 16;			// = += -= *= /= %= <<= >>= ...
Blockly.GobstonesLanguage.ORDER_COMMA = 17;					 // ,
Blockly.GobstonesLanguage.ORDER_NONE = 99;						// (...)


Blockly.GobstonesLanguage.addPragma = function(block, str){
	if(!str || !Blockly.GobstonesLanguage.shouldAddRegionPragma) return str;
	// add newLine if block is a command or definition
	const newLine = str[str.length-1] === '\n' ? '\n' : '';
	return `/*@BEGIN_REGION@${block.id}@*/${newLine}${str}/*@END_REGION@*/${newLine}`;
};
// Gobstones pragma BEGIN_REGION should avoid char 'at' ( @ )
Blockly.utils.genUid.soup_ = Blockly.utils.genUid.soup_.replace(/@/g,"a");

function getCustomTeacherDropdownValue(block) {
  // TODO: Hackeada de compromiso

  try {
    const getCustomTeacherDropdown = (field) => field.name === 'custom_teacher_dropdown';

    const input = block.inputList.find((input) =>
      input.fieldRow.some(getCustomTeacherDropdown)
    );
    const field = input.fieldRow.find(getCustomTeacherDropdown);

    return field.getValue();
  } catch(e) {
    return null;
  }
}

/**
 * Retorna la función que representa la llamada a un procedimiento o funcion F(arg1, arg2, ...)
 * Importante: los arg son input values, no fields.
 */
function callGenerator(name, args = [], newLine, order) {
	return function (block) {
		var code = name + '(';
		var sep = '';
		args.forEach(function (arg) {
      const value = getCustomTeacherDropdownValue(block) || Blockly.GobstonesLanguage.valueToCode(
        block,
        arg,
        Blockly.GobstonesLanguage.ORDER_NONE
      );

			code += sep + value;
			sep = ', ';
		});
		code += newLine ? ')\n' : ')';
		return order ? [code, order] : code;
	};
}

/**
 * Retorna la funcion que genera el codigo para un bloque tipo PROC(arg1, arg2, ...)
 */
function procBlockCodeGenerator(procName, args) {
	return callGenerator(procName, args, true);
}
window.procBlockCodeGenerator = procBlockCodeGenerator;

/**
 * Retorna la funcion que genera el codigo para un bloque tipo function(arg1, arg2, ...)
 */
function functionBlockCodeGenerator(procName, args) {
	return callGenerator(procName, args, false, Blockly.GobstonesLanguage.ORDER_FUNCTION_CALL);
}
window.functionBlockCodeGenerator = functionBlockCodeGenerator;

/**
 * Retorna la funcion que genera el codigo para un bloque tipo Expr(arg1, arg2, ...)
 */
function exprParamsBlockCodeGenerator(expr, args) {
	return callGenerator(expr, args, false, Blockly.GobstonesLanguage.ORDER_FUNCTION_CALL);
}

/**
 * Retorna la funcion que genera el codigo para un bloque tipo selector de literales
 */
function literalSelectorBlockCodeGenerator(type) {
	return function(block) {
		return [block.getFieldValue(type + 'Dropdown'), Blockly.GobstonesLanguage.ORDER_ATOMIC];
	};
}

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.GobstonesLanguage.finish = function (code) {
	// Convert the definitions dictionary into a list.
	var definitions = [];
	for (var name in Blockly.GobstonesLanguage.definitions_) {
		if (name !== undefined) {
			definitions.push(Blockly.GobstonesLanguage.definitions_[name]);
		}
	}
	// Clean up temporary data.
	delete Blockly.GobstonesLanguage.definitions_;
	delete Blockly.GobstonesLanguage.functionNames_;
	Blockly.GobstonesLanguage.variableDB_.reset();
	return definitions.join('\n') + '\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.	A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.GobstonesLanguage.scrubNakedValue = function (line) {
	return line;
};

/**
 * Encode a string as a properly escaped GobstonesLanguage string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} GobstonesLanguage string.
 * @private
 */
Blockly.GobstonesLanguage.quote_ = function (string) {
	// Can't use goog.string.quote since Google's style guide recommends
	// JS string literals use single quotes.
	string = string.replace(/\\/g, '\\\\')
						.replace(/\n/g, '\\\n')
						.replace(/'/g, '\\\'');
	return '\'' + string + '\'';
};

/**
 * Common tasks for generating GobstonesLanguage from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The GobstonesLanguage code created for this block.
 * @return {string} GobstonesLanguage code with comments and subsequent blocks added.
 * @private
 */
Blockly.GobstonesLanguage.scrub_ = function (block, code) {
	var commentCode = '';
	var comment;
	// Only collect comments for blocks that aren't inline.
	if (!block.outputConnection || !block.outputConnection.targetConnection) {
		// Collect comment for this block.
		comment = block.getCommentText();
		comment = Blockly.utils.wrap(comment, Blockly.GobstonesLanguage.COMMENT_WRAP - 3);
		if (comment) {
			if (block.getProcedureDef) {
				// Use a comment block for function comments.
				commentCode += '//\n' +
					Blockly.GobstonesLanguage.prefixLines(comment + '\n', '// ') +
					'//\n';
			} else {
				commentCode += Blockly.GobstonesLanguage.prefixLines(comment + '\n', '// ');
			}
		}
		// Collect comments for all value arguments.
		// Don't collect comments for nested statements.
		for (var i = 0; i < block.inputList.length; i++) {
			if (block.inputList[i].type === Blockly.INPUT_VALUE) {
				var childBlock = block.inputList[i].connection.targetBlock();
				if (childBlock) {
					comment = Blockly.GobstonesLanguage.allNestedComments(childBlock);
					if (comment) {
						commentCode += Blockly.GobstonesLanguage.prefixLines(comment, '// ');
					}
				}
			}
		}
	}
	var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	var nextCode = Blockly.GobstonesLanguage.blockToCode(nextBlock);
	return Blockly.GobstonesLanguage.addPragma(block,commentCode + code) + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} optDelta Value to add.
 * @param {boolean=} optNegate Whether to negate the value.
 * @param {number=} optOrder The highest order acting on this value.
 * @return {string|number}
 */
Blockly.GobstonesLanguage.getAdjusted = function (block, atId, optDelta, optNegate,
		optOrder) {
	var delta = optDelta || 0;
	var order = optOrder || Blockly.GobstonesLanguage.ORDER_NONE;
	if (Blockly.GobstonesLanguage.ONE_BASED_INDEXING) {
		delta--;
	}
	var defaultAtIndex = Blockly.GobstonesLanguage.ONE_BASED_INDEXING ? '1' : '0';
	var at;
	var innerOrder;
	if (delta > 0) {
		at = Blockly.GobstonesLanguage.valueToCode(block, atId,
				Blockly.GobstonesLanguage.ORDER_ADDITION) || defaultAtIndex;
	} else if (delta < 0) {
		at = Blockly.GobstonesLanguage.valueToCode(block, atId,
				Blockly.GobstonesLanguage.ORDER_SUBTRACTION) || defaultAtIndex;
	} else if (optNegate) {
		at = Blockly.GobstonesLanguage.valueToCode(block, atId,
				Blockly.GobstonesLanguage.ORDER_UNARY_NEGATION) || defaultAtIndex;
	} else {
		at = Blockly.GobstonesLanguage.valueToCode(block, atId, order) ||
				defaultAtIndex;
	}

	if (Blockly.isNumber(at)) {
		// If the index is a naked number, adjust it right now.
		at = parseFloat(at) + delta;
		if (optNegate) {
			at = -at;
		}
	} else {
		// If the index is dynamic, adjust it in code.
		if (delta > 0) {
			at = at + ' + ' + delta;
			innerOrder = Blockly.GobstonesLanguage.ORDER_ADDITION;
		} else if (delta < 0) {
			at = at + ' - ' + -delta;
			innerOrder = Blockly.GobstonesLanguage.ORDER_SUBTRACTION;
		}
		if (optNegate) {
			if (delta) {
				at = '-(' + at + ')';
			} else {
				at = '-' + at;
			}
			innerOrder = Blockly.GobstonesLanguage.ORDER_UNARY_NEGATION;
		}
		innerOrder = Math.floor(innerOrder);
		order = Math.floor(order);
		if (innerOrder && order >= innerOrder) {
			at = '(' + at + ')';
		}
	}
	return at;
};

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.GobstonesLanguage.init = function () {
	// Create a dictionary of definitions to be printed before the code.
	Blockly.GobstonesLanguage.definitions_ = Object.create(null);
	// Create a dictionary mapping desired function names in definitions_
	// to actual function names (to avoid collisions with user functions).
	Blockly.GobstonesLanguage.functionNames_ = Object.create(null);

	if (Blockly.GobstonesLanguage.variableDB_) {
		Blockly.GobstonesLanguage.variableDB_.reset();
	} else {
		Blockly.GobstonesLanguage.variableDB_ =
				new Blockly.Names(Blockly.GobstonesLanguage.RESERVED_WORDS_);

		// Gobstones lets ñáéíóú, so Blockly's safeName should be rewritten.
		// In the process, makes everything CamelCase which is Gobstones' default.
		Blockly.GobstonesLanguage.variableDB_.safeName_ = function(name) {
		  if (!name) return 'unnamed';

		  //Get rid of unwanted chars
		  var safe = name.replace(/[^\wáéíóúÁÉÍÓÚñÑ ]/g, '')

		  //Escape initial numbers
		  if ('0123456789'.indexOf(safe[0]) != -1) safe = 'my ' + safe;

		  // Join spaces capitalizing in the process: ¡Gobstones is CamelCase!
		  // Leave first char as user wanted, for now...
		  safe = safe.split(' ').map((word, i) =>
				!word | i == 0 ? word : word[0].toUpperCase() + word.slice(1)
		  	).join('');

		  return safe;
		};
	}
};

Blockly.GobstonesLanguage.Poner = procBlockCodeGenerator('Poner', ['COLOR']);
Blockly.GobstonesLanguage.Sacar = procBlockCodeGenerator('Sacar', ['COLOR']);
Blockly.GobstonesLanguage.Mover = procBlockCodeGenerator('Mover', ['DIRECCION']);
Blockly.GobstonesLanguage.IrAlBorde = procBlockCodeGenerator('IrAlBorde', ['DIRECCION']);
Blockly.GobstonesLanguage.VaciarTablero = procBlockCodeGenerator('VaciarTablero');
Blockly.GobstonesLanguage.BOOM = function(block) {
	var desc = block.getFieldValue('boomDescription');
	var sinComillasEnvolventes = desc;
	if (desc[0] === "\"" && desc[desc.length-1] === "\"") {
		sinComillasEnvolventes = desc.substring(1, desc.length-1);
 	}
	return 'BOOM("' + sinComillasEnvolventes.replace(/"/g, "'") + '")\n';
};


Blockly.GobstonesLanguage.ComandoCompletar = b => 'BOOM("El programa todavía no está completo")\n';
Blockly.GobstonesLanguage.ExpresionCompletar = b => ['boom("El programa todavía no está completo")',Blockly.GobstonesLanguage.ORDER_FUNCTION_CALL];
Blockly.GobstonesLanguage.AsociacionDeTeclaCompletar = b => ''

Blockly.GobstonesLanguage.ColorSelector = literalSelectorBlockCodeGenerator('Color');
Blockly.GobstonesLanguage.DireccionSelector = literalSelectorBlockCodeGenerator('Direccion');
Blockly.GobstonesLanguage.BoolSelector = literalSelectorBlockCodeGenerator('Bool');

Blockly.GobstonesLanguage.List = function(block) {
  const elements = block
    .inputList
    .filter((it) => it.name.startsWith("element"))
    .map((it) => Blockly.GobstonesLanguage.valueToCode(block, it.name, Blockly.GobstonesLanguage.ORDER_NONE))
    .join(", ");
  const code = `[${elements}]`;

  return [code, Blockly.GobstonesLanguage.ORDER_ATOMIC];
};

Blockly.GobstonesLanguage.AlternativaEnExpresiones = function(block) {
  const elements = block
    .inputList
    .filter((it) => it.name.startsWith("element"))
    .map((it) => {
    	const id = it.name.match(/element(\d+)/)[1];
      const value = Blockly.GobstonesLanguage.valueToCode(block, it.name, Blockly.GobstonesLanguage.ORDER_NONE);
      const conditionValue = Blockly.GobstonesLanguage.valueToCode(block, `condition${id}`, Blockly.GobstonesLanguage.ORDER_NONE);

      return `${value} when (${conditionValue})`;
    })
    .join("\n  ");

  const otherwise = Blockly.GobstonesLanguage.valueToCode(block, "otherwise", Blockly.GobstonesLanguage.ORDER_NONE);
  const code = `\n  choose ${elements}\n  ${otherwise} otherwise\n`;

  return [code, Blockly.GobstonesLanguage.ORDER_ATOMIC];
};

Blockly.GobstonesLanguage.ForEach = function (block) {
  let body = Blockly.GobstonesLanguage.statementToCode(block, 'block');
  var varName = formatCallName(block.getFieldValue('varName'), false, Blockly.VARIABLE_CATEGORY_NAME);
  var list = Blockly.GobstonesLanguage.valueToCode(block, 'list', Blockly.GobstonesLanguage.ORDER_NONE) || '';

  return `foreach ${varName} in ${list} {\n${body}}\n`;
};

Blockly.GobstonesLanguage.OperadorDeComparacion = function (block) {
	var code =
		(Blockly.GobstonesLanguage.valueToCode(block, 'arg1', Blockly.GobstonesLanguage.ORDER_RELATIONAL) || '()') +
' ' +
		block.getFieldValue('RELATION') +
		' ' +
		(Blockly.GobstonesLanguage.valueToCode(block, 'arg2', Blockly.GobstonesLanguage.ORDER_RELATIONAL) || '()');
	return [code, Blockly.GobstonesLanguage.ORDER_RELATIONAL];
};

Blockly.GobstonesLanguage.OperadorNumerico = function (block) {
	var code = (Blockly.GobstonesLanguage.valueToCode(block, 'arg1',
		Blockly.GobstonesLanguage.ORDER_MODULUS) || '()') +
		' ' + block.getFieldValue('OPERATOR') + ' ' +
		(Blockly.GobstonesLanguage.valueToCode(block, 'arg2',
			Blockly.GobstonesLanguage.ORDER_MODULUS) || '()')
		;
	return [code, Blockly.GobstonesLanguage.ORDER_MODULUS];
};

Blockly.GobstonesLanguage.OperadorLogico = function(block) {
  // Operations 'and', 'or'.
	var operator = block.getFieldValue('OPERATOR');
	if (operator === "AND") operator = "&&";
	var order = (operator == '&&') ? Blockly.GobstonesLanguage.ORDER_LOGICAL_AND : Blockly.GobstonesLanguage.ORDER_LOGICAL_OR;
	var argument0 = Blockly.GobstonesLanguage.valueToCode(block, 'arg1', order) || '()';
	var argument1 = Blockly.GobstonesLanguage.valueToCode(block, 'arg2', order) || '()';
/* Este código lo comento porque creo que prefiero que estalle gobstones web
	if (!argument0 && !argument1) {
		// If there are no arguments, then the return value is false.
		argument0 = 'False';
		argument1 = 'False';
	} else {
		// Single missing arguments have no effect on the return value.
		var defaultArgument = (operator == '&&') ? 'True' : 'False';
		if (!argument0) {
			argument0 = defaultArgument;
		}
		if (!argument1) {
			argument1 = defaultArgument;
		}
	}
*/
	var code = argument0 + ' ' + operator + ' ' + argument1;
	return [code, order];
};

Blockly.GobstonesLanguage.OperadoresDeEnumeracion = function(block) {
  return exprParamsBlockCodeGenerator(block.getFieldValue('OPERATOR'), ['VALUE'])(block);
};

Blockly.GobstonesLanguage.not = exprParamsBlockCodeGenerator('not',['VALUE']);
Blockly.GobstonesLanguage.siguiente = exprParamsBlockCodeGenerator('siguiente',['VALUE']);
Blockly.GobstonesLanguage.previo = exprParamsBlockCodeGenerator('previo',['VALUE']);
Blockly.GobstonesLanguage.opuesto = exprParamsBlockCodeGenerator('opuesto',['VALUE']);

Blockly.GobstonesLanguage.math_number = function (block) {
	// Numeric value.
	var code = parseFloat(block.getFieldValue('NUM'));
	return [code, Blockly.GobstonesLanguage.ORDER_ATOMIC];
};

Blockly.GobstonesLanguage.Program = function (block) {
	let program = Blockly.GobstonesLanguage.statementToCode(block, 'program');
	let codigo = `program {\n${program}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.InteractiveProgram = function (block) {
	let program = Blockly.GobstonesLanguage.statementToCode(block, 'interactiveprogram');

	let init = '';
	if (block.$init)
		init = `  INIT -> {\n${Blockly.GobstonesLanguage.statementToCode(block, 'init')}  }\n`;

	let timeout = '';
	if (block.$timeout)
		timeout = `  TIMEOUT(${block.$timeout}) -> {\n${Blockly.GobstonesLanguage.statementToCode(block, 'timeout')}  }\n`;

	let codigo = `interactive program {\n${init}${program}${timeout}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.InteractiveLetterBinding = function (block) {
	let key = block.getFieldValue('InteractiveBindingDropdownKey');

	const order = ["CTRL", "ALT", "SHIFT"];
	const modifier = block.inputList[1]
		.fieldRow
		.slice(2)
		.filter(it => it.constructor === Blockly.FieldDropdown)
		.map(it => order.indexOf(it.getValue()))
		.sort()
		.map(it => order[it])
		.join("_");

	if (modifier !== "")
		key = modifier + "_" + key;

	const code = Blockly.GobstonesLanguage.statementToCode(block, 'block');

	return `K_${key} -> {\n${code}}\n`;
};
Blockly.GobstonesLanguage.InteractiveNumberBinding = Blockly.GobstonesLanguage.InteractiveLetterBinding;
Blockly.GobstonesLanguage.InteractiveKeyBinding = Blockly.GobstonesLanguage.InteractiveLetterBinding;

Blockly.GobstonesLanguage.RepeticionSimple = function (block) {
	let body = Blockly.GobstonesLanguage.statementToCode(block, 'block');
	var count = Blockly.GobstonesLanguage.valueToCode(block, 'count',
	Blockly.GobstonesLanguage.ORDER_NONE) || '';

	let codigo = `repeat(${count}) {\n${body}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.RepeticionCondicional = function (block) {
	let body = Blockly.GobstonesLanguage.statementToCode(block, 'block');
	var condicion = Blockly.GobstonesLanguage.valueToCode(block, 'condicion',
	Blockly.GobstonesLanguage.ORDER_NONE) || '';

	let codigo = `while (not (${condicion})) {\n${body}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.RepeticionCondicionalReal = function (block) {
	let body = Blockly.GobstonesLanguage.statementToCode(block, 'block');
	var condicion = Blockly.GobstonesLanguage.valueToCode(block, 'condicion',
	Blockly.GobstonesLanguage.ORDER_NONE) || '';

	let codigo = `while (${condicion}) {\n${body}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.AlternativaSimple = function (block) {
	let body = Blockly.GobstonesLanguage.statementToCode(block, 'block');
	var condicion = Blockly.GobstonesLanguage.valueToCode(block, 'condicion',
	Blockly.GobstonesLanguage.ORDER_NONE) || '';

	let codigo = `if (${condicion}) {\n${body}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.AlternativaCompleta = function (block) {
	const elseIfCount = block.elseifCount_;
	let body1 = Blockly.GobstonesLanguage.statementToCode(block, 'block1');
	let body2 = Blockly.GobstonesLanguage.statementToCode(block, 'block2');

	const elseIfBodies = Array.apply(null, Array(elseIfCount))
		.map(function (_, i) {
			const id = i + 1;
			return {
				condition: Blockly.GobstonesLanguage.valueToCode(block, "IF" + id,
	Blockly.GobstonesLanguage.ORDER_NONE),
				body: Blockly.GobstonesLanguage.statementToCode(block, "DO" + id)
			};
		}).map(function({ condition, body }) {
			return ` elseif (${condition}) {\n${body}}`;
		}).join("");

	var condicion = Blockly.GobstonesLanguage.valueToCode(block, 'condicion',
	Blockly.GobstonesLanguage.ORDER_NONE) || '';

	let codigo = `if (${condicion}) {\n${body1}}${elseIfBodies} else {\n${body2}}\n`;
	return codigo;
};

Blockly.GobstonesLanguage.hayBolitas = exprParamsBlockCodeGenerator('hayBolitas', ['VALUE']);
Blockly.GobstonesLanguage.nroBolitas = exprParamsBlockCodeGenerator('nroBolitas', ['VALUE']);
Blockly.GobstonesLanguage.puedeMover = exprParamsBlockCodeGenerator('puedeMover', ['VALUE']);

var formatCallName = function (name, capitalizeFirst, type = Blockly.PROCEDURE_CATEGORY_NAME) {
	if(!name) throw new Error(type + " name is empty");
	var safe = Blockly.GobstonesLanguage.variableDB_.getName(name, type);
	return (capitalizeFirst ? safe[0].toUpperCase() : safe[0].toLowerCase()) + safe.slice(1);
};

var makeParameterList = function (block) {
	return block.arguments_
		.map(arg => formatCallName(arg, false, Blockly.VARIABLE_CATEGORY_NAME))
		.join(', ');
};

Blockly.GobstonesLanguage.procedures_defnoreturn = function (block) {
  var name = formatCallName(block.getFieldValue('NAME'),true);
  var body = Blockly.GobstonesLanguage.statementToCode(block, 'STACK');

  var code = 'procedure ' + name + '(' + makeParameterList(block) + ') {\n' + body + '}\n';
  if (block.$isAtomic) code = "/*@ATTRIBUTE@atomic@*/" + "\n" + code;

	code = Blockly.GobstonesLanguage.scrub_(block, code);
	Blockly.GobstonesLanguage.definitions_[name] = code;

	return null;
};

Blockly.GobstonesLanguage.procedures_defreturn = function (block) {
	var name = formatCallName(block.getFieldValue('NAME'),false);
	var body = Blockly.GobstonesLanguage.statementToCode(block, 'STACK');
	var returnValue = Blockly.GobstonesLanguage.valueToCode(block, 'RETURN');

	var code = 'function ' + name + '(' + makeParameterList(block) + ') {\n' +
		body + '  return (' + returnValue + ')\n}\n';

	code = Blockly.GobstonesLanguage.scrub_(block, code);
	Blockly.GobstonesLanguage.definitions_[name] = code;

	return null;
};

Blockly.GobstonesLanguage.procedures_defnoreturnnoparams = Blockly.GobstonesLanguage.procedures_defnoreturn;
Blockly.GobstonesLanguage.procedures_defreturnsimplewithparams = Blockly.GobstonesLanguage.procedures_defreturn;
Blockly.GobstonesLanguage.procedures_defreturnsimple = Blockly.GobstonesLanguage.procedures_defreturn;
Blockly.GobstonesLanguage.DefinicionDeFuncionDeclarativa = Blockly.GobstonesLanguage.procedures_defreturn;
Blockly.GobstonesLanguage.DefinicionDeFuncionSimpleConParametrosDeclarativa = Blockly.GobstonesLanguage.procedures_defreturn;
Blockly.GobstonesLanguage.DefinicionDeFuncionSimpleDeclarativa = Blockly.GobstonesLanguage.procedures_defreturn;

var procedureCall = function(block, capitalizeFirst, newLine) {
	var procName = formatCallName(block.getFieldValue('NAME'),capitalizeFirst);
	var args = [];
	for (var i = 0; i < block.arguments_.length; i++) {
		args[i] = Blockly.GobstonesLanguage.valueToCode(block, 'ARG' + i,
			Blockly.GobstonesLanguage.ORDER_COMMA) || '';
	}
	var code = procName + '(' + args.join(', ') + ')' + (newLine ? '\n' : '');
	return code;
}

Blockly.GobstonesLanguage.procedures_callnoreturn = function (block) {
	return procedureCall(block, true, true);
};
Blockly.GobstonesLanguage.procedures_callreturn = function (block) {
	return [procedureCall(block, false), Blockly.GobstonesLanguage.ORDER_FUNCTION_CALL];
};

Blockly.GobstonesLanguage.procedures_callnoreturnnoparams = Blockly.GobstonesLanguage.procedures_callnoreturn;
Blockly.GobstonesLanguage.procedures_callreturnsimplewithparams = Blockly.GobstonesLanguage.procedures_callreturn;
Blockly.GobstonesLanguage.procedures_callreturnsimple = Blockly.GobstonesLanguage.procedures_callreturn;
Blockly.GobstonesLanguage.procedures_callreturndeclarative = Blockly.GobstonesLanguage.procedures_callreturn;
Blockly.GobstonesLanguage.procedures_callreturndeclarativesimplewithparams = Blockly.GobstonesLanguage.procedures_callreturn;
Blockly.GobstonesLanguage.procedures_callreturndeclarativesimple = Blockly.GobstonesLanguage.procedures_callreturn;

Blockly.GobstonesLanguage.variables_get = function (block) {
	var code = formatCallName(block.getFieldValue('VAR'),false,Blockly.VARIABLE_CATEGORY_NAME);
	return [code, Blockly.GobstonesLanguage.ORDER_ATOMIC];
};

Blockly.GobstonesLanguage.Asignacion = function(block) {
  var varValue = Blockly.GobstonesLanguage.valueToCode(block, 'varValue', Blockly.GobstonesLanguage.ORDER_ASSIGNMENT);
  var code = formatCallName(block.getFieldValue('varName'),false,Blockly.VARIABLE_CATEGORY_NAME)  +
  	' := ' + varValue + '\n';
  return code;
};
