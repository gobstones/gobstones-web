class Stylist {
  constructor() {
    this.DEFAULT_PERCENTAGE = 0.6;
    this.TOOLBAR_HEIGHT = 102;
    this.BOARD_CSS_CLASS = ".theBoard";
    this.BOARD_CONTAINER_CSS_CLASS = ".theBoardContainer";
    this.BOARD_CONTAINER_OFFSET = 8;
    this.LEFT_PANEL_CSS_CLASS = ".panel-left";
  }

  setPanelAsResizable(boardDimensions) {
    const boardSize = this._getBoardSize(boardDimensions);

    $(document).ready(() => {
      this._makeResizable();
      setTimeout(() => {
        $(`${this.LEFT_PANEL_CSS_CLASS} .ui-resizable-s`).hide();
        $(`${this.LEFT_PANEL_CSS_CLASS} .ui-resizable-se`).hide();

        this._saveBoardSize(boardSize);
        this._scaleAndCenterBoard(this.DEFAULT_PERCENTAGE, boardSize);
      }, 0);
    });

    $(window).resize(() => {
      this._beResponsive(boardSize);
    });
  }

  updateBoardSize(boardDimensions) {
    const boardSize = this._getBoardSize(boardDimensions);

    const scale = this._getScale(this._getPercentage(), boardSize);
    this._saveBoardSize(boardSize);

    this._beResponsive(boardSize);
  }

  _beResponsive(boardSize) {
    var percentage = this._keepAspectRatioOnWindowResize(this.LEFT_PANEL_CSS_CLASS);
    this._scaleAndCenterBoard(percentage, boardSize);
  }

  _keepAspectRatioOnWindowResize() {
    const documentWidth = $(document).width()
    if (!this.lastDocumentWidth) {
      this.lastDocumentWidth = documentWidth;
      return this.DEFAULT_PERCENTAGE;
    }

    const percentage = this._getPercentage();

    const leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
    leftPanel.width(documentWidth * percentage);
    this.lastDocumentWidth = documentWidth;

    return percentage;
  }

  _scaleAndCenterBoard(percentage, boardSize) {
    const scale = this._getScale(percentage, boardSize);
    $(this.BOARD_CSS_CLASS).css("transform", `scale(${scale})`);
    this._centerBoard(percentage, boardSize, scale);
  }

  _centerBoard(percentage, boardSize, scale) {
    // center vertically
    const middleY = (this._getRightPanelHeight()) / 2;
    const offsetY = this.currentBoardHeight / 2;
    $(this.BOARD_CSS_CLASS).css("margin-top", `${middleY - offsetY}px`);

    // center horizontally
    $(".theBoardContainer").width(0); // avoid increasing container width
    const panelWidth = this._getRightPanelWidth(percentage);
    const middleX = panelWidth / 2;
    const offsetX = this.BOARD_CONTAINER_OFFSET + (this.currentBoardWidth * scale) / 2;
    $(this.BOARD_CONTAINER_CSS_CLASS).css("margin-left", `${middleX - offsetX}px`);
  }

  _makeResizable() {
    $(this.LEFT_PANEL_CSS_CLASS).resizable({
      resizeHeight: false
    });
  }

  _saveBoardSize(boardSize) {
    this.currentBoardWidth = boardSize.width;
    this.currentBoardHeight = boardSize.height;
  }

  _getBoardSize(boardDimensions) {
    return {
      width: 39 + boardDimensions.x * 59,
      height: 39 + boardDimensions.y * 59
    };
  }

  _getPercentage() {
    const leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
    return leftPanel.width() / this.lastDocumentWidth;
  }

  _getRightPanelWidth(percentage) {
    return $(document).width() * (1 - percentage);
  }

  _getRightPanelHeight() {
    return $(document).height() - this.TOOLBAR_HEIGHT;
  }

  _getScale(percentage, boardSize) {
    const panelWidth = this._getRightPanelWidth(percentage);
    const scaleX = panelWidth / this.currentBoardWidth;

    const panelHeight = this._getRightPanelHeight();
    const scaleY = panelHeight / this.currentBoardHeight;

    return Math.min(scaleX, scaleY)
  }
}
