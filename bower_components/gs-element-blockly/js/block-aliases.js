Blockly.GobstonesLanguage.blockIDAliases = {
  "ComandosPrimitivos": "Comandos primitivos",
  "ProcedimientosPrimitivos": "Procedimientos primitivos",
  "ExpresionesPrimitivas": "Expresiones primitivas",
  "FuncionesPrimitivas": "Funciones primitivas",
  "Color":"ColorSelector",
  "Direccion":"DireccionSelector",
  "Numero":"math_number",
  "Booleano":"BoolSelector",
  "CategoriaAsignacion":"Asignación"
};

Blockly.GobstonesLanguage.aliasForBlockID = function(id){
  return  this.blockIDAliases[id] || id;
};

Blockly.GobstonesLanguage.aliasesFor = function (blockOrCategoryID){
  var aliases = [blockOrCategoryID];
  for (alias in this.blockIDAliases) {
    if(this.blockIDAliases[alias] === blockOrCategoryID){
      aliases.push(alias);
    }
  }
  return aliases;
};
