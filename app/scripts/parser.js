class Parser {
  constructor() {
    const {
      tokens, interpreter, lexer: Lexer,
      parser: Parser, grammar: Grammar,
      context: Context
    } = window.gsWeblangCore;

    this.Context = Context;
    this.grammar = Grammar(Parser, new Lexer(), tokens, interpreter);
  }

  parse(sourceCode) {
    return this.grammar.parseProgram(sourceCode);
  }

  interpret(ast, initialState) {
    const context = this._createContext(initialState);
    this.grammar.interpret(ast, context);
    return context;
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
