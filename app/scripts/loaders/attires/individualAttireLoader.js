class IndividualAttireLoader extends Loader {
  constructor() {
    super();
    this.attireLoader = new AttireLoader();
  }

  save(context) {
    const attire = context.boards.attire;
    if (!attire) return;

    const zip = new JSZip();
    this.attireLoader.writeToZip(attire, zip);

    zip.generateAsync({ type: "blob" }).then(content => {
      this._saveBlob(content, `${attire.name}.gbat`);
    });
  }

  read(context, event, callback) {
    const { file, fileName } = this._readLocalFile(event);

    JSZip.loadAsync(file).then(zip => {
      this.attireLoader.readFromZip(context, zip, callback);
    });
  }
}
