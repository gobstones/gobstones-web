describe('ParserAndBoardAdapter', function() {

  var adapter;

  beforeEach(function() {
    adapter = new ParserAndBoardAdapter();
  })

  parserModel = function() {
    return [
      [[0, 3], [0, 0]], // blue  - columns - rows
      [[0, 0], [0, 4]], // red   - columns - rows
      [[1, 0], [0, 0]], // black - columns - rows
      [[0, 0], [5, 0]] //  green - columns - rows
    ];
  };

  boardModel = function() {
    return [
      [ c(3, 0, 0, 0), c(0, 4, 0, 0) ], // 2nd row - columns - colors
      [ c(0, 0, 1, 0), c(0, 0, 0, 5) ]  // 1st row - columns - colors
    ];
  };

  it("can adapt to the board model", function() {
    expect(
      adapter.adaptToBoard(parserModel())
    ).toEqual(boardModel());
  });

  it("can adapt to the parser model", function() {
    expect(
      adapter.adaptToParser(boardModel())
    ).toEqual(parserModel());
  });

  c = function(blue, red, black, green) {
    return { blue: blue, red: red, black: black, green: green };
  };

});
