class Stylist {
  constructor() {
    this.DEFAULT_PERCENTAGE = 0.6;
    this.INITIAL_SCALE = 1;
    this.TOOLBAR_HEIGHT = 64;
  }

  setPanelAsResizable(panelCssClass, boardCssClass) {
    $(document).ready(() => {
      $(panelCssClass).resizable({
        resizeHeight: false
      });

      setTimeout(() => {
        $(`${panelCssClass} .ui-resizable-s`).hide();
        $(`${panelCssClass} .ui-resizable-se`).hide();

        this.scaleAndCenterBoard(this.DEFAULT_PERCENTAGE, boardCssClass);
      }, 0);
    });

    this.beResponsive(panelCssClass, boardCssClass);
  }

  beResponsive(panelCssClass, boardCssClass) {
    $(window).resize(() => {
      var percentage = this.keepAspectRatioOnWindowResize(panelCssClass);
      this.scaleAndCenterBoard(percentage, boardCssClass);
    });
  }

  keepAspectRatioOnWindowResize(panelCssClass) {
    const documentWidth = $(document).width()
    if (!this.lastSize) {
      this.lastSize = documentWidth;
      return this.DEFAULT_PERCENTAGE;
    }

    const leftPanel = $(panelCssClass);
    const percentage = leftPanel.width() / this.lastSize;

    leftPanel.width(percentage * documentWidth);
    this.lastSize = documentWidth;
    return percentage;
  }

  scaleAndCenterBoard(percentage, boardCssClass) {
    const scaleDiff = -(percentage / this.DEFAULT_PERCENTAGE) + 1
    const scale = this.INITIAL_SCALE + scaleDiff;
    $(boardCssClass).css("transform", `scale(${scale})`);
    this.centerBoardVertically(scale, boardCssClass);
  }

  centerBoardVertically(scale, boardCssClass) {
    const originalHeight = $(boardCssClass).height() / scale;
    const middleY = ($(document).height() - this.TOOLBAR_HEIGHT) / 2;
    const offsetY = originalHeight / 2;
    $(boardCssClass).css("margin-top", `${middleY - offsetY}px`);
  }
}
