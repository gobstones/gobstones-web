class Loader {
  save(context) {
    this._saveText(this.getFile(context));
  }

  read(context, event, callback) {
    this._readText(event, (code, fileName) => {
      this.readContent(context, code, fileName);
      callback();
    });
  }

  // getFile(context); <<abstract>>
  // readContent(context, content, fileName); <<abstract>>

  _setAndRunCode(context, code, mode) {
    context.editor.setCode(code, mode);
    context.editor.onRunCode();
  }

  _getFile(context, content, type, extension) {
    return {
      content: content,
      name: `${context.getProjectName()}.${type}.${extension}`
    };
  }

  _saveText({ content, name }) {
    this._saveBlob(new Blob([content], { type: "text/plain" }), name);
  }

  _saveBlob(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  }

  _readText(event, callback) {
    const { file, fileName } = this._readLocalFile(event);

    const reader = new FileReader();
    reader.onload = function(){
      const content = reader.result;
      input.value = null;
      callback(content, fileName);
    };
    reader.readAsText(file);
  }

  _readLocalFile(event) {
    const input = event.target;
    const file = input.files[0];
    const fileName = file.name.split(".")[0];

    return { file: file, fileName: fileName };
  }
}
