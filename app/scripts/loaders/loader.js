class Loader {
  save(context) {
    this._saveText(this.getFile(context));
  }

  // getFile(context); <<abstract>>

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

  _read(event, callback) {
    const input = event.target;

    const fileName = input.files[0].name.split(".")[0];

    const reader = new FileReader();
    reader.onload = function(){
      const content = reader.result;
      input.value = null;
      callback(content, fileName);
    };
    reader.readAsText(input.files[0]);
  }
}
