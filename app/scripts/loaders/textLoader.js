class TextLoader extends Loader {
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
