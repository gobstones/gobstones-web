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

    attire:
      type: Object

  observers: [
    '_updateStyles(attire.*)'
  ]

  ready: ->
    @_setBorderOn()
    @_initializeTable()
    @_initializeOptions()

  getRowNumber: (table, rowIndex) ->
    table.length - 1 - rowIndex

  isCtrlPressed: ->
    @$.keyTracker.isPressed "Control"

  isShiftPressed: ->
    @$.keyTracker.isPressed "Shift"

  boomCssClass: (boom) ->
    if boom then "boom" else ""

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

  update: (table, header) ->
    @table = table
    @header = header
    @_setSizeFromTable()
    @fillTable()

  _updateStyles: ({ base: attire }) ->
    if attire? and attire.enabled then @_setBorderOff()
    else @_setBorderOn()
    @updateStyles()

  _setBorderOn: ->
    @customStyle["--cell-padding"] = "2px"
    @customStyle["--cell-border"] = "solid #888 1px"

  _setBorderOff: ->
    @customStyle["--cell-padding"] = "0 0"
    @customStyle["--cell-border"] = "none"
