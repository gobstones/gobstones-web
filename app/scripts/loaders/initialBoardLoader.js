class InitialBoardLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".board.gbb";
  }

  getFile(context) {
    const panel = context.boards;
    return this._getFile(context, new Parser().buildGbb(panel.initialState, panel.size));
  }

  readContent(context, content, fileName) {
    const panel = context.boards;
    const board = new Parser().readGbb(content);
    const initialState = panel.initialState;

    panel.sizeX = board.sizeX;
    panel.sizeY = board.sizeY;
    panel.setInitialState({
      table: board.toView(),
      header: { x: board.x, y: board.y }
    });
  }
}
