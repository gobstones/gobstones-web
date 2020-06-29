"use strict";

// <<abstract>>:
// FILENAME;
// buildContent(context);
// readContent(context, content);
window.SingleFileComponent = {
  getFiles: function getFiles(context) {
    return [{
      content: this.buildContent(context),
      name: this.FILENAME
    }];
  },

  shouldHandle: function shouldHandle(path) {
    return path === this.FILENAME;
  },

  readProjectContent: function readProjectContent(context, content) {
    this.readContent(context, content);
  }
};