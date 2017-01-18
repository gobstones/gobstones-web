class TextLoader extends Loader {
  // <<abstract>>:
  // getFile(context); -> { name, content }
  // readContent(context, content, fileName);
  // TODO: Usar esta nueva interfaz

  save(context) {
    this._saveText(this.getFile(context));
  }

  read(context, event, callback) {
    this._readText(event, (content, fileName) => {
      if (!content || !fileName)
        return this._clean(event);

      this.readContent(context, content, fileName);
      callback();
    });
  }

  _saveText({ content, name }) {
    this._saveBlob(new Blob([content], { type: "text/plain" }), name);
  }

  _readText(event, callback) {
    const { file, fileName } = this._readLocalFile(event);

    const reader = new FileReader();
    reader.onload = function(){
      const content = reader.result;
      callback(content, fileName);
    };
    reader.readAsText(file);
  }
}
