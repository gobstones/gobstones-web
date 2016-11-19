class AttireLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".attire.json";
  }

  getFile(context) {
    const attire = context.boards.attire;
    return this._getFile(context, JSON.stringify(attire));
  }

  readContent(context, content, fileName) {
    const attire = JSON.parse(content);
    if (attire && attire.name && attire.rules)
      context.boards.addOrSetAttire(attire);
  }
}
