# // TODO: Make a package for gobstones-interpreter's GBB reader and use it
`
var stringUtils = {
  splitByLines: function (string) {
    return string.split(/\r\n|\r|\n/);
  },

  scan: function (string, regExp) {
    if (!regExp.global) {
      throw new Error('The regExp must be global (with "g" flag)');
    }
    var m = [];
    var r = m;
    m = regExp.exec(string);
    while (m) {
      m.shift();
      r.push(m);
      m = regExp.exec(string);
    }
    return r;
  }
};

var gbbReader = {
};

gbbReader.fromString = function (gbbString) {
  var gbbCode = this._try(gbbString);

  var rawLines = stringUtils.splitByLines(gbbCode).map(function(line) {
    return line.trim();
  });

  var lines = rawLines.filter(function (line) {
    return !/GBB\/(\d\.)+\d$/.test(line) && line !== '';
  });

  return this._buildBoard(lines);
};

gbbReader._buildBoard = function (lines) {
  var dimensions = this._getDimensions(lines);
  var header = this._getHeader(lines);

  try {
    var board = {
      width: dimensions[0],
      height: dimensions[1],
      head: { x: header[0], y: header[1] },
      table: []
    };
    for (var i = board.height - 1; i >= 0; i--) {
      board.table[i] = [];
      for (var j = 0; j < board.width; j++) {
        board.table[i][j] = {};
      }
    }
    this._putCells(lines, board);

    return board;
  } catch (err) {
    var error = new Error('Error building the board');
    error.inner = err;
    throw error;
  }
};

gbbReader._getDimensions = function (lines) {
  var dimensions = this._try(
    lines[0].match(/^size (\d+) (\d+)$/)
  , 'dimensions');
  return this._getPositionOf(dimensions);
};

gbbReader._getHeader = function (lines) {
  var header = this._try(
    lines[lines.length - 1].match(/^head (\d+) (\d+)$/)
  , 'header');
  return this._getPositionOf(header);
};

gbbReader._putCells = function (lines, board) {
  var CELL_REGEXP = /^cell (\d+) (\d+)/;

  var cellLines = lines.filter(function (line) {
    return CELL_REGEXP.test(line);
  });

  cellLines.forEach(function (line) {
    var cell = line.match(CELL_REGEXP);
    var position = this._getPositionOf(cell, line);

    var x = position[0];
    var y = position[1];
    this._putBalls(x, y, line, board);
  }.bind(this));
};

gbbReader._putBalls = function (x, y, line, board) {
  var values = stringUtils.scan(line, /(Azul|Negro|Rojo|Verde) (\d+)/g);
  var getAmount = function (color) {
    var value = values.filter(function (it) {
      return it[0] === color;
    });
    return parseInt((value[0] || {})[1] || 0, 0);
  };

  const cell = board.table[board.height - 1 - y][x];
  cell.blue = getAmount('Azul');
  cell.black = getAmount('Negro');
  cell.red = getAmount('Rojo');
  cell.green = getAmount('Verde');
};

gbbReader._getPositionOf = function (source, element) {
  source = source || {};

  return [
    this._try(source[1], element), this._try(source[2], element)
  ].map(function (it) {
    return parseInt(it, 0);
  });
};

gbbReader._try = function (value, thingToParse) {
  if (!value) {
    throw new Error('Error parsing ' + (thingToParse || 'GBB file'));
  }
  return value;
};
`

# ---
window.GobstonesBoard =
  attireProvider: null
  defaultAttire: null

  getAttire: (name) ->
    if not @attireProvider?
      throw new Error("You need to provide an attire provider with GobstonesBoard.setAttireProvider")
    @attireProvider.get name

  setAttireProvider: (attireProvider) ->
    if not attireProvider?.get
      throw new Error("Attire providers must have a `get` method");
    @attireProvider = attireProvider
    @updateAllBoards()

  setDefaultAttire: (@defaultAttire) ->
    @updateAllBoards()

  updateAllBoards: ->
    document.querySelectorAll("gs-board").forEach (board) =>
      board.detectAttire()

# ---

Polymer
  is: '#GRUNT_COMPONENT_NAME'

  properties:
    table: Array
    # ^ [[{ red: 2, blue: 1 }, { black: 3 }], [...]]

    size:
      type: Object
      value: { x: 2, y: 2 }
      observer: "_updateSize"
    # ^ if `table` exists, this field is ignored

    header:
      type: Object
      value: { x: 0, y: 0 }

    options: Object
    # ^ { editable: false }

    boom:
      type: Boolean
      value: false

    gbb:
      type: String

    attire:
      type: Object
      observer: '_notifyAttireChanged'

    attireSrc:
      type: String

    noAttire:
      type: Boolean
      value: false

    withoutHeader:
      type: Boolean
      value: false

  observers: [
    '_updateStyles(table.*, header.*, attire.*)'
  ]

  ready: ->
    @_setBorderOn()
    @_readGbb()
    @_initializeTable()
    @_initializeOptions()

  attached: ->
    setTimeout(@detectAttire.bind(this))

  _notifyAttireChanged: ->
    @fire 'board-attire-changed'

  getRowNumber: (table, rowIndex) ->
    table.length - 1 - rowIndex

  isCtrlPressed: ->
    @$.keyTracker.isPressed "Control" || @$.keyTracker.isPressed "Meta"

  isShiftPressed: ->
    @$.keyTracker.isPressed "Shift"

  setStonesNumber: (cell, color, amount) ->
    @table[cell.rowIndex][cell.cellIndex][color] = amount
    @fire "board-changed"

  fillTable: ->
    return if not @table?

    limit = (array, limit) -> array.slice 0, limit
    table = @table.slice().reverse()
    for i in [0 ... @size.y]
      for j in [0 ... @size.x]
        table[i] ?= []
        table[i] = limit table[i], @size.x
        table[i][j] ?= {}
    table = limit table, @size.y
    @table = table.reverse()
    @_forceHeaderSet()

  update: (table, header) ->
    @table = table
    @header = header
    @_setSizeFromTable()
    @fillTable()

  detectAttire: ->
    if @attireSrc
      @attire = GobstonesBoard.getAttire @attireSrc
    else if GobstonesBoard.defaultAttire and not @noAttire
      @attire = GobstonesBoard.defaultAttire

  _initializeTable: ->
    if @table?
      @_setSizeFromTable()
    else
      @table = []
      @fillTable()

  _setSizeFromTable: ->
    @size =
      x: @table[0]?.length || 0
      y: @table.length || 0

  _initializeOptions: ->
    @options ?= {}
    @options.editable ?= false

  _updateSize: ->
    @columnIndexes = [0 ... @size.x]
    @fire "board-changed"

  _forceHeaderSet: ->
    x = Math.min @header.x, (@size.x - 1)
    y = Math.min @header.y, (@size.y - 1)

    @header = null
    @header = { x, y }

  _readGbb: ->
    gbb = Polymer.dom(@).textContent
    return if not gbb? or gbb.indexOf("GBB") < 0
    @gbb = gbb

    { @table, head: @header, width, height } = gbbReader.fromString @gbb
    @size.x = width
    @size.y = height

  _updateStyles: (uTable, uHeader, uAttire) ->
    table = uTable?.base
    header = uHeader?.base
    attire = uAttire?.base
    return unless table? and header?

    if attire? and attire.enabled then @_setBorderOff()
    else @_setBorderOn()
    @_updateBorderImages attire
    @updateStyles()

    this.querySelectorAll("gs-cell").forEach (cell) ->
      cell.updateCellStyles table, header, attire

  _setBorderOn: ->
    @customStyle["--cell-padding"] = "2px"
    @customStyle["--cell-border"] = "solid #888 1px"

  _setBorderOff: ->
    @customStyle["--cell-padding"] = "0 0"
    @customStyle["--cell-border"] = "none"

  _updateBorderImages: (attire) ->
    url = (border) =>
      link = attire?.borders?[border]
      if attire?.enabled and link? then "url(#{link})"

    @customStyle["--top-left-background-url"] = url "topLeft"
    @customStyle["--top-right-background-url"] = url "topRight"
    @customStyle["--bottom-left-background-url"] = url "bottomLeft"
    @customStyle["--bottom-right-background-url"] = url "bottomRight"
    @customStyle["--left-background-url"] = url "left"
    @customStyle["--top-background-url"] = url "top"
    @customStyle["--right-background-url"] = url "right"
    @customStyle["--bottom-background-url"] = url "bottom"


