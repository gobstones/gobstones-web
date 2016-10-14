class LibraryLoader extends Loader {
  getFile(context) {
    const code = context.editor.code.library;
    return this._getFile(context, code, "library", "gbs");
  }

  read(context, event, callback) {
    this._read(event, (code) => {
      this._setAndRunCode(context, code, "library");
      callback();
    });
  }
}
