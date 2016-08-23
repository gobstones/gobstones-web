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
    this.currentBoardWidth = boardSize.width;
    this.currentBoardHeight = boardSize.height;

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
    const middleY = ($(document).height() - this.TOOLBAR_HEIGHT) / 2;
    const offsetY = this.currentBoardHeight / 2;
    $(this.BOARD_CSS_CLASS).css("margin-top", `${middleY - offsetY}px`);

    // center horizontally
    $(".theBoardContainer").width(0); // avoid increasing container width
    const panelWidth = this._getRightPanelWidth($(document).width(), percentage);
    const middleX = panelWidth / 2;
    const offsetX = this.BOARD_CONTAINER_OFFSET + (this.currentBoardWidth * scale) / 2;
    $(this.BOARD_CONTAINER_CSS_CLASS).css("margin-left", `${middleX - offsetX}px`);
  }

  _makeResizable() {
    const documentWidth = $(document).width()
    $(this.LEFT_PANEL_CSS_CLASS).resizable({
      resizeHeight: false
    });
  }

  _getBoardSize(boardDimensions) {
    return {
      width: 39 + boardDimensions.x * 59,
      height: 39 + boardDimensions.y * 59
    };
  }

  _getRightPanelWidth(documentWidth, percentage) {
    return documentWidth * (1 - percentage);
  }

  _getPercentage() {
    const leftPanel = $(this.LEFT_PANEL_CSS_CLASS);
    return leftPanel.width() / this.lastDocumentWidth;
  }

  _getScale(percentage, boardSize) {
    // scaleY
    const documentWidth = $(document).width()
    const panelWidth = this._getRightPanelWidth(documentWidth, percentage);

    if (!this.currentBoardWidth) this.currentBoardWidth = boardSize.width;
    const scaleX = panelWidth / this.currentBoardWidth;

    // scaleY
    const documentHeight = $(document).height()
    const panelHeight = documentHeight - this.TOOLBAR_HEIGHT;
    if (!this.currentBoardHeight) this.currentBoardHeight = boardSize.height;
    const scaleY = panelHeight / this.currentBoardHeight;

    return Math.min(scaleX, scaleY)
  }
}
