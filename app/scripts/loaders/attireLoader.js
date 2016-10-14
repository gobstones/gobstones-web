class AttireLoader extends Loader {
  getFile(context) {
    const attire = context.boards.attire;
    return this._getFile(context, JSON.stringify(attire), "attire", "json");
  }

  read(context, event, callback) {
    this._read(event, (json) => {
      const attire = JSON.parse(json);
      if (attire && attire.name && attire.rules)
        context.boards.addOrSetAttire(attire);
      callback();
    });
  }
}
