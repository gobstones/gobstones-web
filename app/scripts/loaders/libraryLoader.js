class LibraryLoader extends Loader {
  getFile(context) {
    const code = context.editor.code.library;
    return this._getFile(context, code, "library", "gbs");
  }

  readContent(context, content, fileName) {
    this._setAndRunCode(context, content, "library");
  }
}
