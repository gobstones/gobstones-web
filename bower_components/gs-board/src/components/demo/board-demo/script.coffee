model = table: [
  [ {}, {}, {}, {} ]
  [ {}, {}, {}, {} ]
  [ { black: 1 }, { blue: 87493312 }, { green: 2 }, {} ]
  [ { red: 3, black: 4 }, {}, {}, {} ]
]

modelWithAttire = table: [
  [ { green: 1 }, {}, {}, { blue: 1 } ]
  [ {}, { red: 4, black: 1 }, { red: 4, black: 2 }, {} ]
  [ {}, { red: 4 }, { red: 4, black: 3 }, {} ]
  [ { red: 1 }, {}, {}, { black: 1 } ]
]

Polymer
  is: '#GRUNT_COMPONENT_NAME'

  properties:

    model:
      type: Object
      value: model
      notify: true
    modelWithAttire:
      type: Object
      value: modelWithAttire
      notify: true
    jsonModel:
      type: Object
      value: model
    attire:
      type: Object

  ready: ->
    @attire = {
      "enabled": true,
      "rules": [
        {
          "when": { "blue": "*", "black": "+", "red": 4, "green": "*" },
          "image": "https://cloud.githubusercontent.com/assets/1631752/19217961/ef2e0d4c-8dea-11e6-960d-69585778f89d.png"
        },

        {
          "when": { "blue": 0, "black": 0, "red": 0, "green": 0 },
          "image": "https://cloud.githubusercontent.com/assets/1631752/19217956/ef1d928c-8dea-11e6-8b53-8d2495cdd3e9.png"
        },

        {
          "when": { "blue": 0, "black": 0, "red": 0, "green": 1 },
          "image": "https://cloud.githubusercontent.com/assets/1631752/19217959/ef27e822-8dea-11e6-9bb0-57892593c9d8.png"
        },

        {
          "when": { "blue": 1, "black": 0, "red": 0, "green": 0 },
          "image": "https://cloud.githubusercontent.com/assets/1631752/19217958/ef245892-8dea-11e6-80f4-aeb5d1862b1c.png"
        },

        {
          "when": { "blue": 0, "black": 1, "red": 0, "green": 0 },
          "image": "https://cloud.githubusercontent.com/assets/1631752/19217957/ef20120a-8dea-11e6-825c-23e7773269b0.png"
        },

        {
          "when": { "blue": 0, "black": 0, "red": 1, "green": 0 },
          "image": "https://cloud.githubusercontent.com/assets/1631752/19217960/ef2ad3c0-8dea-11e6-8434-ff9152b76f3b.png"
        }
      ]
    }

    setInterval(() =>
      @set "attire.enabled", not @attire.enabled
      console.log "Toggling attire view"
    , 2000)


  listeners:
    'jsoneditor.change': '_jsonChange'

  _jsonChange: ->
    @async @_forceRender, 0

  _forceRender: ->
    @model = null
    @async @_setModel, 0

  _setModel: ->
    @model = model
