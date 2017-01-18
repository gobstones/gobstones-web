class BlobLoader extends Loader {
  _saveBlob(content, name) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name);
  }

  _readLocalFile(event) {
    const file = _.first(event.target.files);
    const fileName = _.first(file.name.split("."));

    this._clean(event);
    return { file: file, fileName: fileName };
  }
}
