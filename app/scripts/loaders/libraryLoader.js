class LibraryLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".library.gbs";
  }

  getFile(context) {
    const code = context.editor.code.library;
    return this._getFile(context, code);
  }

  readContent(context, content, fileName) {
    this._setCode(context, content, "library");
  }
}
