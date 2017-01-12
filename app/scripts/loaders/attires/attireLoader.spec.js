describe('AttireLoader', function() {

  var loader;

  beforeEach(function() {
    loader = new AttireLoader();
  })

  it("can retrieve the file to store", function() {
    var context = {
      boards: {
        attire: { aJSON: "example" }
      },
      getProjectName: function() { return "sarasa" }
    };

    expect(loader.getFile(context)).toEqual({
      content: '{"aJSON":"example"}',
      name: "sarasa.attire.json"
    });
  });

  it("sets the attire if the json is coherent and calls the callback after reading", function() {
    var callback = sinon.spy();
    var addOrSetAttire = sinon.spy();

    var context = {
      boards: {
        addOrSetAttire: addOrSetAttire
      }
    };

    var example = {
      name: "Example",
      rules: []
    };
    loader._readText = sinon.stub().callsArgWith(1, JSON.stringify(example, null, 2), "AFileName");
    loader.read(context, null, callback);

    expect(callback.called).toBeTruthy();
    expect(addOrSetAttire.calledWith(example)).toBeTruthy();
  });

  it("doesn't do anything if the json is invalid", function() {
    var addOrSetAttire = sinon.spy();

    var context = {
      boards: {
        addOrSetAttire: addOrSetAttire
      }
    };

    var example = '{ "invalid": "data" }'
    loader._readText = sinon.stub().callsArgWith(1, example, "AFileName");
    loader.read(context, null, function() {});

    expect(addOrSetAttire.called).toBeFalsy();
  });

});
