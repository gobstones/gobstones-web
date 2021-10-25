goog.provide('Blockly.ErrorInforming');

Blockly.ErrorInforming = {};

Blockly.ErrorInforming.addToWorkspace = function(workspace){
    workspace.showBlockError = Blockly.ErrorInforming.showBlockError;
    workspace.removeBlockErrors = Blockly.ErrorInforming.removeBlockErrors;

    this.addCssToDocument(Blockly.ErrorInforming.CssContent.join('\n'));
}

Blockly.ErrorInforming.addToBlock = function(block,errorKind){
    Blockly.utils.addClass(block.getSvgRoot(), errorKind.cssClass());
    block.setWarningText(errorKind.description());
    block.warning.setVisible(true);
    block.removeError = function(){ // For later removal
        Blockly.utils.removeClass(this.getSvgRoot(),errorKind.cssClass());
        this.setWarningText(); // setting no warning makes it remove warning
    };
};

// Kinds of errors:

Blockly.ErrorInforming.Error = function(desc, cssClass){

    this._desc = desc;

    this.description = function(){
        return this._desc || "¿Habrá un problema cerca de aquí?";
    };

    this._cssClass = cssClass;
    
    this.cssClass = function(){
        return this._cssClass || "blocklyGenericError";
    }
};

Blockly.ErrorInforming.INCOMPLETE_ERROR = function(errorKind){
    return new Blockly.ErrorInforming.Error(
        'Falta completar por aquí...',
        'blocklyIncompleteError'
    );
};


Blockly.ErrorInforming.TYPE_ERROR = function(errorKind){ 
    const error = new Blockly.ErrorInforming.Error('','blocklyTypeError');
    error.description = function(){
        return "¿Problema de tipos?\n Aquí se esperaba " + errorKind.expectedType + ", pero se encontró " + errorKind.actualType;
    };
    return error;
};

// Most languages have primitives / commands whose high-level logic has preconditions
// to execute. For example, if moving thorugh a path, command "move" executed in a border
// could throw an error. It is one possible kind of runtime error.
Blockly.ErrorInforming.PRECONDITION_ERROR = function(errorKind){
    return new Blockly.ErrorInforming.Error(
        errorKind.description,
        'blocklyPreconditionError'
    );
};


/**
 * Method to be mixed into a Blockly Workspace object.
 * Adds posibility of showing different types of errors to a block.
 * `blockId` is the block ID where the error should appear
 * 
 * `errorKind` is either a string with the description or an object with a kind of error.
 * Next are examples with the existent error kinds.
 * 
 * Examples:
 * * `workspace.showBlockError('a1s2', 'Hey, here is an error')`
 * * `workspace.showBlockError('a1s2', { kind: 'INCOMPLETE_ERROR'} )`
 * * `workspace.showBlockError('a1s2', { kind: 'TYPE_ERROR', expectedType:'string', actualType: 'boolean' })`
 * * `workspace.showBlockError('a1s2', { kind: 'PRECONDITION_ERROR', description: "Susan can't move right" })`
 */
Blockly.ErrorInforming.showBlockError = function(blockId, errorKind = Blockly.ErrorInforming.GENERIC_ERROR) {
    Blockly.ErrorInforming.addToBlock(
        this.getBlockById(blockId),
        Blockly.ErrorInforming.sanitizeKind(errorKind));
};

Blockly.ErrorInforming.sanitizeKind = function(errorKind){
    if (!errorKind || typeof errorKind == 'string') return new Blockly.ErrorInforming.Error(errorKind);
    if(!errorKind.kind) throw new Error("kind ID missing from errorKind object");
    return Blockly.ErrorInforming[errorKind.kind](errorKind);
};

/**
 * Method to be mixed into a Blockly Workspace object.
 * Removes all errors present in the workspace
 * @example workspace.removeBlockErrors()
 */
Blockly.ErrorInforming.removeBlockErrors = function(){
    this.getAllBlocks().forEach(b => {if (b.removeError) b.removeError()});
};

Blockly.ErrorInforming.addCssToDocument = function (cssText) {
    var cssNode = document.createElement('style');
    document.head.insertBefore(cssNode, document.head.lastChild);
  
    var cssTextNode = document.createTextNode(cssText);
    cssNode.appendChild(cssTextNode);
    Blockly.Css.styleSheet_ = cssNode.sheet;
}

Blockly.ErrorInforming.CssContent = [
    '.blocklyGenericError>.blocklyPath {',
        'stroke: #f60;',
        'stroke-width: 4px;',
        'stroke-opacity: .7;',
    '}',

    '.blocklyIncompleteError>.blocklyPath {',
        'stroke: #f60;',
        'stroke-width: 3px;',
    '}',
    
    '.blocklyTypeError>.blocklyPath {',
        'stroke: #f00;',
        'stroke-width: 3px;',
    '}',

    '.blocklyPreconditionError>.blocklyPath {',
        'stroke: #f88;',
        'stroke-width: 3px;',
    '}',
];