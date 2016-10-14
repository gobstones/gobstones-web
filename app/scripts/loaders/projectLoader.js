class ProjectLoader extends Loader {
  constructor() {
    super();

    this.loaders = [
      new CodeLoader,
      new LibraryLoader,
      new ClothingLoader
    ];
  }

  save(context) {
    var files = this.loaders.map(loader => loader.getFile(context));

    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file.content);
    });
    zip.generateAsync({ type: "blob" }).then(content => {
      this._saveBlob(content, `${context.getProjectName()}.gbp`);
    });
  }

  read(context, event, callback) {
    // this._read(event, (code, fileName) => {
    //   context.setProjectName(fileName);
    //   this._setAndRunCode(context, code);
    //   callback();
    // });
  }
}
