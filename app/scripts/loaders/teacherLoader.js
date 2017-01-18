class TeacherLoader extends TextLoader {
  constructor() {
    super();
    this.SUFFIX = ".teacher.gbs";
  }

  _buildFile(context) {
    return context.editor.code.teacher;
  }

  _readContent(context, content) {
    this._setCode(context, content, "teacher");
  }
}
