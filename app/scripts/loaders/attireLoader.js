class AttireLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".attire.json";
  }

  _buildFile(context) {
    const attire = context.boards.attire;
    return this._serialize(attire);
  }

  _readContent(context, content, fileName) {
    const attire = this._deserialize(content);
    if (attire && attire.name && attire.rules) {
      context.boards.addOrSetAttire(attire);
      context.boards.showAttire = true;
    }
  }

  _serialize(attire) {
    return JSON.stringify(this._transform(attire));
  }

  _deserialize(json) {
    return this._transform(JSON.parse(json));
  }

  _transform(attire) {
    return _.omit(attire, "enabled");
  }
}
