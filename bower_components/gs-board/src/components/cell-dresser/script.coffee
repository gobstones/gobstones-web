Polymer
  is: '#GRUNT_COMPONENT_NAME'

  getRule: (cell, isHeader, attire)->
    if not attire? or not attire.enabled then return

    attire?.rules
      .filter(
        (rule) => @_doesSatisfyRule cell, isHeader, rule
      )[0]

  _doesSatisfyRule: (cell, isHeader, rule) ->
    itSatisfies = (color) =>
      @_doesSatisfyQuantity(cell[color], rule.when[color]) and
      @_doesSatisfyHeader(isHeader, rule.when.head)

    ["red", "blue", "green", "black"]
    .reduce((previousCondition, color) =>
      previousCondition and itSatisfies color
    , true)

  _doesSatisfyQuantity: (quantity = 0, expectedQuantity) ->
    switch expectedQuantity
      when "*"
        true
      when "+"
        quantity > 0
      else
        quantity is expectedQuantity

  _doesSatisfyHeader: (isHeader, expectedHeader) ->
    not expectedHeader? or expectedHeader is isHeader
