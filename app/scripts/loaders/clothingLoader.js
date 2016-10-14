class ClothingLoader extends Loader {
  getFile(context) {
    const clothing = context.boards.clothing;
    return this._getFile(context, JSON.stringify(clothing), "clothing", "json");
  }

  read(context, event, callback) {
    this._read(event, (json) => {
      const clothing = JSON.parse(json);
      if (clothing && clothing.name && clothing.rules)
        context.boards.addOrSetClothing(clothing);
      callback();
    });
  }
}
