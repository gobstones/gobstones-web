class LibraryLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".library.gbs";
  }

  _buildFile(context) {
    return context.editor.code.library;
  }

  _readContent(context, content, fileName) {
    this._setCode(context, content, "library");
  }
}
