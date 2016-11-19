class Parser {
  constructor() {
    const { Context, Board, getParser, gbb } = window.gsWeblangCore;

    this.Context = Context;
    this.Board = Board;
    this.gsParser = getParser();
    this.gbb = gbb;
  }

  parse(sourceCode) {
    return _.last(this.gsParser.parseProgram(sourceCode));
  }

  interpret(ast, initialState) {
    const context = this._createContext(initialState);
    return ast.interpret(context);
  }

  readGbb(gbb) {
    return this.gbb.reader.fromString(gbb);
  }

  buildGbb(initialState, size) {
    return gbb.builder.build(
      new this.Board(size.x, size.y).fromView(initialState.table)
    );
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
