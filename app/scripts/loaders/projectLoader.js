class ProjectLoader extends BlobLoader {
  constructor() {
    super();

    this.loaders = [
      new CodeLoader,
      new LibraryLoader,
      new TeacherLoader,
      new InitialBoardLoader
    ];
    // Loaders must understand:
    // - SUFFIX
    // - readContentForProject(context, content)

    this.attireLoader = new ProjectAttireLoader("attires/");
    this.ATTIRES_FOLDER = "attires/";
  }

  save(context) {
    const files = this.loaders.map(loader => loader.getFile(context));

    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file.content);
    });

    this.attireLoader.writeToZip(context, zip);

    zip.generateAsync({ type: "blob" }).then(content => {
      this._saveBlob(content, `${context.getProjectName()}.gbp`);
    });
  }

  read(context, event, callback) {
    const { file, fileName } = this._readLocalFile(event);

    JSZip.loadAsync(file).then(zip => {
      zip.forEach((relativePath, zipEntry) => {
        this._loadComponent(context, relativePath, zipEntry);
      });

      context.setProjectName(fileName);
      context.editor.setAsDirty();

      this.attireLoader.readFromZip(context, zip);
      callback();
    });
  }

  _loadComponent(context, relativePath, zipEntry) {
    this.loaders.forEach(loader => {
      const getContent = () => zipEntry.async("string");
      this._callComponentIfNeeded(loader, context, relativePath, getContent);
    });
  }

  _callComponentIfNeeded(loader, context, path, getContent) {
    if (_.endsWith(path, loader.SUFFIX)) {
      getContent().then(content => {
        loader.readContentForProject(context, content);
      });
    }
  }
}
