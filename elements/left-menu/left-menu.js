"use strict";

Polymer({
  is: 'left-menu',
  behaviors: [Polymer.LocalizationBehavior, Polymer.LoaderBehavior],
  properties: {
    projectType: String
  },

  attached: function attached() {
    this.setUpLoaders(this._isCodeProject(this.projectType) ? {
      Code: new CodeLoader(),
      Library: new LibraryLoader(),
      InitialBoard: new InitialBoardLoader(),
      Attire: new IndividualAttireLoader()
    } : {
      Code: new CodeBlocksLoader(),
      Library: new LibraryBlocksLoader(),
      InitialBoard: new InitialBoardLoader(),
      Attire: new IndividualAttireLoader(),
      AppendBlocks: new AppendBlocksLoader(),
      GeneratedCode: new CodeLoader()
    }); // ;(
  },

  _isCodeProject: function _isCodeProject(projectType) {
    return projectType === "code";
  }
});