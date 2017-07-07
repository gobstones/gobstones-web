"use strict";

describe('CodeLoader', function () {
  var loader;

  beforeEach(function () {
    loader = new CodeLoader();
  });

  it("can retrieve the file to store", function () {
    var context = {
      editor: {
        code: {
          main: "The main code"
        }
      },
      getProjectName: function getProjectName() {
        return "sarasa";
      }
    };

    expect(loader.getFiles(context)).toEqual([{
      content: "The main code",
      name: "sarasa.code.gbs"
    }]);
  });

  it("sets the project's name, runs the code and calls the callback after reading", function () {
    var setProjectName = sinon.spy();
    var callback = sinon.spy();
    var setCode = sinon.spy();
    var runCode = sinon.spy();

    var context = {
      editor: {
        setCode: setCode,
        onRunCode: runCode
      },
      setProjectName: setProjectName
    };

    loader._readText = sinon.stub().callsArgWith(1, "AContent", "AFileName");
    loader.read(context, null, callback);

    expect(setProjectName.calledWith("AFileName")).toBeTruthy();
    expect(callback.called).toBeTruthy();
    expect(setCode.calledWith("AContent")).toBeTruthy();
    expect(runCode.called).toBeTruthy();
  });
});
//# sourceMappingURL=codeLoader.spec.js.map
