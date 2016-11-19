class AttireLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".attire.json";
  }

  _buildFile(context) {
    const attire = context.boards.attire;
    return JSON.stringify(attire);
  }

  _readContent(context, content, fileName) {
    const attire = JSON.parse(content);
    if (attire && attire.name && attire.rules)
      context.boards.addOrSetAttire(attire);
  }
}
