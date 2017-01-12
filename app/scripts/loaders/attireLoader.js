class AttireLoader extends Loader {
  constructor() {
    super();
    this.SUFFIX = ".attire.json";
  }

  _buildFile(context) {
    const attire = context.boards.attire;
    return this._serialize(attire);
  }

  _readContent(context, content) {
    this._setAttire(context, content, () => {
      context.boards.showAttire = true;
    });
  }

  readContentForProject(context, content) {
    this._setAttire(context, content);
  }

  _setAttire(context, content, then) {
    const attire = this._deserialize(content);
    if (attire && attire.name && attire.rules) {
      context.boards.addOrSetAttire(attire);
      if (then) then();
    }
  }

  _serialize(attire) {
    return JSON.stringify(this._transform(attire), null, 2);
  }

  _deserialize(json) {
    return this._transform(JSON.parse(json));
  }

  _transform(attire) {
    return _.omit(attire, "enabled");
  }
}
