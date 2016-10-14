class CodeLoader extends Loader {
  getFile(context) {
    const code = context.editor.code.main;
    return this._getFile(context, code, "code", "gbs");
  }

  read(context, event, callback) {
    this._read(event, (code, fileName) => {
      context.setProjectName(fileName);
      this._setAndRunCode(context, code);
      callback();
    });
  }
}
