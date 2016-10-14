class CodeLoader extends Loader {
  getFile(context) {
    const code = context.editor.code.main;
    return this._getFile(context, code, "code", "gbs");
  }

  readContent(context, content, fileName) {
    context.setProjectName(fileName);
    this._setAndRunCode(context, content);
  }
}
