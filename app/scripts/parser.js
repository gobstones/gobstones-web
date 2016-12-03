class Parser {
  constructor() {
    const { Context, Board, getParser, gbb } = window.gsWeblangCore;

    this.Context = Context;
    this.gsParser = getParser();
    this.gbb = gbb;
    this.Board = Board;
  }

  parse(sourceCode) {
    return this.gsParser.parse(sourceCode).program;
  }

  interpret(ast, initialState) {
    const context = this._createContext(initialState);
    return ast.interpret(context);
  }

  readGbb(gbb) {
    return this.gbb.reader.fromString(gbb);
  }

  buildGbb(initialState, size) {
    var board = new this.Board(size.x, size.y).fromView(initialState.table);
    board.x = initialState.header.x;
    board.y = initialState.header.y;
    return this.gbb.builder.build(board);
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
