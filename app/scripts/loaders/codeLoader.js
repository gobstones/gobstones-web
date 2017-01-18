class CodeLoader extends TextLoader {
  constructor() {
    super();
    this.SUFFIX = ".code.gbs";
  }

  _buildFile(context) {
    return context.editor.code.main;
  }

  _readContent(context, content, fileName) {
    context.setProjectName(fileName);
    this._setCode(context, content);
  }

  readContentForProject(context, content) {
    this._setCode(context, content);
  }
}
