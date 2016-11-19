class Parser {
  constructor() {
    const { Context, getParser } = window.gsWeblangCore;

    this.Context = Context;
    this.gsParser = getParser();
  }

  parse(sourceCode) {
    return _.last(this.gsParser.parseProgram(sourceCode));
  }

  interpret(ast, initialState) {
    const context = this._createContext(initialState);
    return ast.interpret(context);
  }

  _createContext(initialState) {
    const context = new this.Context();
    context.board().sizeX = initialState.size.x;
    context.board().sizeY = initialState.size.y;
    context.init();

    _.assign(context.board(), {
      x: initialState.header.x,
      y: initialState.header.y,
      table: initialState.table
    });

    return context;
  }
}
