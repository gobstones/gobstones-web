class CodeLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".code.gbs"
  }

  getFile(context) {
    const code = context.editor.code.main;
    return this._getFile(context, code);
  }

  readContent(context, content, fileName) {
    context.setProjectName(fileName);
    this._setCode(context, content);
  }

  readContentForProject(context, content) {
    this._setCode(context, content);
  }
}
