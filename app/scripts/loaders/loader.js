class Loader {
  _setAndRunCode(context, code, mode) {
    context.editor.setCode(code, mode);
    context.editor.onRunCode();
  }

  _saveFile(context, content, type, extension) {
    this._save(
      content,
      `${context.getProjectName()}.${type}.${extension}`
    );
  }

  _save(content, name) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
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
