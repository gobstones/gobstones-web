"use strict";

var DEFAULT_DESCRIPTION = "# Proyecto x.y: Nombre del ejercicio\nDescripci\xF3n del ejercicio.\n\n## Tablero esperado\n\n<center>\n  <gs-board>\n    GBB/1.0\n    size 3 3\n    cell 0 0 Azul 2\n    cell 1 2 Rojo 7\n    head 1 1\n  </gs-board>\n</center>\n\n[Enunciado en PDF][PDF]\n\n[PDF]: https://link-a-un-pdf \"Enunciado de 'Simulando repartir caramelos' en PDF\"";

Polymer({
  is: 'description-editor',

  ready: function ready() {
    var _this = this;

    this.async(function () {
      _this.simplemde = new SimpleMDE({
        element: _this.$$("#markdown-editor"),
        autofocus: true,
        spellChecker: false,
        hideIcons: ["side-by-side", "fullscreen", "guide"],
        previewRender: function previewRender(plainText) {
          // (using showdown instead of the default markdown parser)
          var compiledHtml = document.querySelector("#gobstones-ide").compileMd(plainText);
          return compiledHtml;
        }
      });
    });

    this.stylist = new Stylist();
    this.stylist.setUpMarkdownEditorCustomizations();

    this.async(function () {
      _this.setDescription(DEFAULT_DESCRIPTION);
    });
  },

  getDescription: function getDescription() {
    return this.simplemde.value();
  },

  setDescription: function setDescription(content) {
    this.simplemde.value(content);
  },

  reset: function reset() {
    this.simplemde.value("");
  }
});