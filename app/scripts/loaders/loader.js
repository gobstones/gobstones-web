class Loader {
  save(context) {
    this._saveText(this.getFile(context));
  }

  read(context, event, callback) {
    this._readText(event, (content, fileName) => {
      if (!content || !fileName)
        return this._clean(event);

      this._readContent(context, content, fileName);
      callback();
    });
  }

  readIfNeeded(context, path, getContent) {
    if (_.endsWith(path, this.SUFFIX)) {
      getContent().then(content => {
        this.readContentForProject(context, content);
      });
    }
  }

  readContentForProject(context, content) {
    this._readContent(context, content);
  }

  getFile(context) {
    return {
      content: this._buildFile(context),
      name: context.getProjectName() + this.SUFFIX
    };
  }

  // SUFFIX; <<abstract>>
  // _buildFile(context); <<abstract>>
  // _readContent(context, content, fileName); <<abstract>>

  _setCode(context, code, mode) {
    context.editor.setCode(code, mode);
  }

  _runCode(context) {
    context.editor.onRunCode();
  }

  _setAndRunCode(context, code, mode) {
    this._setCode(context, code, mode);
    this._runCode();
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
      callback(content, fileName);
    };
    reader.readAsText(file);
  }

  _readLocalFile(event) {
    const file = _.first(event.target.files);
    const fileName = _.first(file.name.split("."));

    this._clean(event);
    return { file: file, fileName: fileName };
  }

  _clean(event) {
    event.target.value = null;
  }
}
