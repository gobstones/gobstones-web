Polymer
  is: '#GRUNT_COMPONENT_NAME'

  ready: ->
    @_pressedKeys = []

    @_listenTo "keydown", (ev) =>
      key = ev.key || ev.keyIdentifier
      @_pressedKeys.push key if not @isPressed key

    @_listenTo "keyup", (ev) =>
      key = ev.key || ev.keyIdentifier
      @_pressedKeys.splice @_indexOf(key), 1 if @isPressed key

    window.addEventListener "blur", =>
      @_pressedKeys = []

  isPressed: (key) ->
    @_indexOf(key) isnt -1

  _indexOf: (key) ->
    @_pressedKeys.indexOf key

  _listenTo: (eventName, handler) ->
    window.addEventListener eventName, handler
