class CodeLoader extends Loader {
  save(context) {
    const code = context.editor.code.main;
    this._saveFile(context, code, "code", "gbs");
  }

  read(context, event, callback) {
    this._read(event, (code, fileName) => {
      context.setProjectName(fileName);
      this._setAndRunCode(context, code);
      callback();
    });
  }
}
