class Stylist {
  constructor() {
    this.DEFAULT_PERCENTAGE = 0.6;
    this.TOOLBAR_HEIGHT = 102;
    this.BOARD_CSS_CLASS = ".theBoard";
    this.PANEL_CSS_CLASS = ".panel-left";
  }

  setPanelAsResizable(boardDimensions) {
    const boardSize = this._getBoardSize(boardDimensions);

    $(document).ready(() => {
      this._makeResizable();
      setTimeout(() => {
        $(`${this.PANEL_CSS_CLASS} .ui-resizable-s`).hide();
        $(`${this.PANEL_CSS_CLASS} .ui-resizable-se`).hide();

        this._scaleAndCenterBoard(this.DEFAULT_PERCENTAGE, boardSize);
      }, 0);
    });

    $(window).resize(() => {
      this._makeResizable();
      this._beResponsive(boardSize);
    });
  }

  updateBoardSize(boardDimensions) {
    const boardSize = this._getBoardSize(boardDimensions);

    const scale = this._getScale(this._getPercentage(), boardSize);
    this.currentBoardWidth = boardSize.width;
    this.currentBoardHeight = boardSize.height;

    this._beResponsive(boardSize);
  }

  _getBoardSize(boardDimensions) {
    return {
      width: 39 + boardDimensions.x * 59,
      height: 39 + boardDimensions.y * 59
    };
  }

  _beResponsive(boardSize) {
    var percentage = this._keepAspectRatioOnWindowResize(this.PANEL_CSS_CLASS);
    this._scaleAndCenterBoard(percentage, boardSize);
  }

  _getPercentage() {
    const leftPanel = $(this.PANEL_CSS_CLASS);
    return leftPanel.width() / this.lastDocumentWidth;
  }

  _keepAspectRatioOnWindowResize() {
    const documentWidth = $(document).width()
    if (!this.lastDocumentWidth) {
      this.lastDocumentWidth = documentWidth;
      return this.DEFAULT_PERCENTAGE;
    }

    const percentage = this._getPercentage();

    const leftPanel = $(this.PANEL_CSS_CLASS);
    leftPanel.width(percentage * documentWidth);
    this.lastDocumentWidth = documentWidth;
    return percentage;
  }

  _scaleAndCenterBoard(percentage, boardSize) {
    const scale = this._getScale(percentage, boardSize);
    $(this.BOARD_CSS_CLASS).css("transform", `scale(${scale})`);
    this._centerBoard(boardSize);
  }

  _makeResizable() {
    const documentWidth = $(document).width()
    $(this.PANEL_CSS_CLASS).resizable({
      maxWidth: documentWidth * this.DEFAULT_PERCENTAGE,
      resizeHeight: false
    });
  }

  _getScale(percentage, boardSize) {
    // scaleY
    const documentWidth = $(document).width()
    const panelWidth = documentWidth * (1 - percentage);
    if (!this.currentBoardWidth) this.currentBoardWidth = boardSize.width;
    const scaleX = panelWidth / this.currentBoardWidth;

    // scaleY
    const documentHeight = $(document).height()
    const panelHeight = documentHeight - this.TOOLBAR_HEIGHT;
    if (!this.currentBoardHeight) this.currentBoardHeight = boardSize.height;
    const scaleY = panelHeight / this.currentBoardHeight;

    return Math.min(scaleX, scaleY)
  }

  _centerBoard(boardSize) {
    const middleY = ($(document).height() - this.TOOLBAR_HEIGHT) / 2;
    const offsetY = this.currentBoardHeight / 2;
    $(this.BOARD_CSS_CLASS).css("margin-top", `${middleY - offsetY}px`);

    $(".theBoardContainer").width(0);
  }
}
