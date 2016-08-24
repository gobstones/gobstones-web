class Stylist {
  constructor() {
    this.DEFAULT_PERCENTAGE = 0.6;
    this.TOOLBAR_HEIGHT = 64;
    this.TOOLBAR_AND_SIZE_SELECTOR_HEIGHT = this.TOOLBAR_HEIGHT + 38;
    this.CELL_SIZE = 59;
    this.BOARD_CSS_CLASS = ".theBoard";
    this.BOARD_CONTAINER_CSS_CLASS = ".theBoardContainer";
    this.BOARD_CONTAINER_OFFSET = 8;
    this.BOARD_CONTAINER_VERTICAL_MARGIN = 20;
    this.LEFT_PANEL_CSS_CLASS = ".panel-left";
  }

  correctEditorHeight(editor) {
    const fixHeight = () => {
      const lineHeight = editor.renderer.lineHeight;

      const availableLines = ($(document).height() - this.TOOLBAR_HEIGHT) / editor.renderer.lineHeight;
      console.log("availableLines", availableLines);
      editor.setOption("minLines", availableLines);
      editor.setOption("maxLines", availableLines);
    }

    setTimeout(fixHeight);
    $(window).resize(fixHeight);
  }

  setPanelAsResizable(boardDimensions) {
    $(document).ready(() => {
      this._makeResizable();
      setTimeout(() => {
        $(`${this.LEFT_PANEL_CSS_CLASS} .ui-resizable-s`).hide();
        $(`${this.LEFT_PANEL_CSS_CLASS} .ui-resizable-se`).hide();

        this.updateBoardSize(boardDimensions);
      }, 0);
    });

    $(window).resize(() => {
      this._beResponsive();
    });
  }

  updateBoardSize(boardDimensions) {
    this._saveBoardSize(boardDimensions);
    this._beResponsive();
  }

  _beResponsive() {
    var percentage = this._keepAspectRatioOnWindowResize(this.LEFT_PANEL_CSS_CLASS);
    this._scaleAndCenterBoard(percentage);
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

  _scaleAndCenterBoard(percentage) {
    const scale = this._getScale(percentage);
    $(this.BOARD_CSS_CLASS).css("transform", `scale(${scale})`);
    this._centerBoard(percentage, scale);
  }

  _centerBoard(percentage, scale) {
    // center vertically
    const middleY = (this._getRightPanelHeight()) / 2;
    const offsetY = this.currentBoardHeight / 2;
    $(this.BOARD_CSS_CLASS).css("margin-top", `${middleY - offsetY}px`);

    // center horizontally
    $(".theBoardContainer").width(0); // avoid increasing container width
    const panelWidth = this._getRightPanelWidth(percentage);
    const middleX = panelWidth / 2;
    const microMarginFix = - (-0.000975862 * this.boardDimensions.x + 0.131475862) * this.CELL_SIZE * scale;
    const offsetX = this.BOARD_CONTAINER_OFFSET + (this.currentBoardWidth * scale) / 2 + microMarginFix;

    $(this.BOARD_CONTAINER_CSS_CLASS).css("margin-left", `${middleX - offsetX}px`);
  }

  _makeResizable() {
    $(this.LEFT_PANEL_CSS_CLASS).resizable({
      resizeHeight: false
    });
  }

  _saveBoardSize(boardDimensions) {
    const boardSize = this._getBoardSize(boardDimensions);
    this.currentBoardWidth = boardSize.width;
    this.currentBoardHeight = boardSize.height;
    this.boardDimensions = boardDimensions;
  }

  _getBoardSize(boardDimensions) {
    return {
      width: 39 + boardDimensions.x * this.CELL_SIZE,
      height: 39 + boardDimensions.y * this.CELL_SIZE
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
    return $(document).height() - this.TOOLBAR_AND_SIZE_SELECTOR_HEIGHT - this.BOARD_CONTAINER_VERTICAL_MARGIN;
  }

  _getScale(percentage) {
    const panelWidth = this._getRightPanelWidth(percentage);
    const scaleX = panelWidth / this.currentBoardWidth;

    const panelHeight = this._getRightPanelHeight();
    const scaleY = panelHeight / this.currentBoardHeight;

    return Math.min(scaleX, scaleY)
  }
}
