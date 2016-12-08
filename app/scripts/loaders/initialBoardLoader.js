class InitialBoardLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".board.gbb";
  }

  _buildFile(context) {
    const panel = context.boards;
    return new Parser().buildGbb(panel.initialState, panel.size);
  }

  _readContent(context, content) {
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
