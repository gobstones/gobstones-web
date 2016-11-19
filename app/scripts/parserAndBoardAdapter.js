class ParserAndBoardAdapter {
  adaptToBoard(table) {
    return gsWeblangCore.viewAdapter.toView(table);
  }

  adaptToParser(table) {
    return gsWeblangCore.viewAdapter.toModel(table);
  }
}
