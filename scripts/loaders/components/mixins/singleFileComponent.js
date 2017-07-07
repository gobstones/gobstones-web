"use strict";

// <<abstract>>:
// SUFFIX;
// buildContent(context);
// readContent(context, content);
window.SingleFileComponent = {
  getFiles: function getFiles(context) {
    return [{
      content: this.buildContent(context),
      name: context.getProjectName() + this.SUFFIX
    }];
  },

  shouldHandle: function shouldHandle(path) {
    return _.endsWith(path, this.SUFFIX);
  },

  readProjectContent: function readProjectContent(context, content) {
    this.readContent(context, content);
  }
};