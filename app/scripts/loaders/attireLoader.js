class AttireLoader extends Loader {
  getFile(context) {
    const attire = context.boards.attire;
    return this._getFile(context, JSON.stringify(attire), "attire", "json");
  }

  readContent(context, content, fileName) {
    const attire = JSON.parse(content);
    if (attire && attire.name && attire.rules)
      context.boards.addOrSetAttire(attire);
  }
}
