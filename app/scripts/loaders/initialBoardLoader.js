class InitialBoardLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".board.gbb";
  }

  getFile(context) {
    //console.log(context.boards);
    //console.log(context.boards.initialStateEditor);
  }

  readContent(context, content, fileName) {
    const board = new Parser().readGbb(content);
    const initialState = context.boards.initialState;

    context.boards.sizeX = board.sizeX;
    context.boards.sizeY = board.sizeY;
    context.boards.setInitialState({
      table: board.toView(),
      header: { x: board.x, y: board.y }
    });
  }
}
