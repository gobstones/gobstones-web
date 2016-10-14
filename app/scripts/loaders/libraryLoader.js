class LibraryLoader extends Loader {
  save(context) {
    const code = context.editor.code.library;
    this._saveFile(context, code, "library", "gbs");
  }

  read(context, event, callback) {
    this._read(event, (code) => {
      this._setAndRunCode(context, code, "library");
      callback();
    });
  }
}
