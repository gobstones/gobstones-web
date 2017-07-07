"use strict";

describe('LibraryLoader', function () {
  var loader;

  beforeEach(function () {
    loader = new LibraryLoader();
  });

  it("can retrieve the file to store", function () {
    var context = {
      editor: {
        code: {
          library: "The library code"
        }
      },
      getProjectName: function getProjectName() {
        return "sarasa";
      }
    };

    expect(loader.getFiles(context)).toEqual([{
      content: "The library code",
      name: "sarasa.library.gbs"
    }]);
  });

  it("runs the code and calls the callback after reading", function () {
    var callback = sinon.spy();
    var setCode = sinon.spy();
    var runCode = sinon.spy();

    var context = {
      editor: {
        setCode: setCode,
        onRunCode: runCode
      }
    };

    loader._readText = sinon.stub().callsArgWith(1, "AContent", "AFileName");
    loader.read(context, null, callback);

    expect(callback.called).toBeTruthy();
    expect(setCode.calledWith("AContent", "library")).toBeTruthy();
    expect(runCode.called).toBeTruthy();
  });
});
//# sourceMappingURL=libraryLoader.spec.js.map
