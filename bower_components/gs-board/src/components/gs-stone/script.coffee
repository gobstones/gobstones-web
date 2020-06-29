Polymer
  is: '#GRUNT_COMPONENT_NAME'

  properties:
    color: String
    amount:
      type: Number
      value: 0
      notify: true
      observer: "_sanitizeAmount"
    options: Object

  listeners:
    click: "_leftClick"
    contextmenu: "_rightClick"

  ready: ->
    @_sanitizeAmount()
    throw new Error("The options are required") if not @options?

  amountText: (amount) ->
    if @hasBigAmount amount then "*" else amount

  cssClass: (color, amount) ->
    if @options.editable
      if amount > 0 then "gbs_pointer" else "gbs_ghost-#{color}"
    else ""

  hasBigAmount: (amount) =>
    amount > 99

  _sanitizeAmount: ->
    unless typeof @amount is "number" and @amount >= 0
      @amount = 0

  _leftClick: (event) ->
    cell = @domHost
    board = cell.domHost
    return if not @options.editable or board.isCtrlPressed()

    @amount += @_clickAmount()
    board.setStonesNumber cell, @color, @amount
    event.stopPropagation()

  _rightClick: (event) ->
    cell = @domHost
    board = cell.domHost
    return if not @options.editable

    @amount -= @_clickAmount()
    board.setStonesNumber cell, @color, @amount
    event.preventDefault()

  _clickAmount: ->
    if @domHost.domHost.isShiftPressed() then 10 else 1
