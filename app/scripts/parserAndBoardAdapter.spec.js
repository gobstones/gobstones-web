describe('ParserAndBoardAdapter', function() {

  describe("adaptToBoard", function() {

    it("can adapt to the board's model", function() {
      parserModel = [
        [[0, 3], [0, 0]], // blue - 1st row - 2nd row
        [[0, 0], [0, 4]], // red
        [[1, 0], [0, 0]], // black
        [[0, 0], [5, 0]] //green
      ];

      boardModel = [
        [ c(3, 0, 0, 0), c(0, 4, 0, 0) ], // last row  - 1st col - 2nd col
        [ c(0, 0, 1, 0), c(0, 0, 0, 5) ]  // first row - 1st col - 2nd col
      ]

      expect(
        new ParserAndBoardAdapter().adaptToBoard(parserModel)
      ).toEqual(boardModel);
    });

  });

  c = function(blue, red, black, green) {
    return { blue: blue, red: red, black: black, green: green };
  };

});
