Polymer
  is: '#GRUNT_COMPONENT_NAME'

  properties:
    cellIndex: Number
    rowIndex: Number
    cell: Object
    table: Array
    attire: Object
    boom: Boolean
    backgroundUrl: String
    header:
      type: Object
      notify: true
    options: Object

  listeners:
    click: "_leftClick"

  observers: [
    '_updateStyles(table.*, attire.*, rowIndex, cellIndex, header.*, boom)'
  ]

  ready: ->
    @_validateData()

  cssClass: (header) ->
    return "" if not header?
    isHeader = @x() is header.x and @y() is header.y

    if isHeader and not @boom then "gh" else ""

  x: -> @cellIndex
  y: -> @domHost.getRowNumber @table, @rowIndex

  _leftClick: (event) ->
    return if not @options.editable

    if @domHost.isCtrlPressed()
      @header = { x: @x(), y: @y() }
      @fire "board-changed"

  _validateData: ->
    throw new Error("The table is required") if not @table?
    throw new Error("The header is required") if not @header?
    throw new Error("The options are required") if not @options?

    throw new Error("The cell is required") if not @cell?
    throw new Error("The coordinates are required") if not @cellIndex? or not @rowIndex?

  _updateStyles: ({ base: table }, { base: attire }, rowIndex, cellIndex, { base: header }, boom) ->
    cell = table[rowIndex]?[cellIndex]
    return if not cell? or not header?

    # \--- (._.) ---/ ~~ ~ ~ --> o
    x = cellIndex                 #\
    y = table.length - 1 - rowIndex #\
    isHeader = x is header.x and y is header.y
    # --- .|*|*|.--- <<<<<<<<<<<<<<   x

    url = @$.dresser.getImage cell, isHeader, attire

    @customStyle["--stones-visibility"] = if url? or boom then "hidden" else "visible"
    if url? then @customStyle["--background-url"] = "url(#{url})"
    else delete @customStyle["--background-url"]

    @updateStyles()
