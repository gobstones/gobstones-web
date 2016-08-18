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

        this.scaleBoardAndPutInCenter(this.DEFAULT_PERCENTAGE, boardCssClass);
      }, 0);
    });

    this.beResponsive(panelCssClass, boardCssClass);
  }

  beResponsive(panelCssClass, boardCssClass) {
    $(window).resize(() => {
      // keep aspect ratio on window resize:
      const documentWidth = $(document).width()
      if (!this.lastSize) {
        this.lastSize = documentWidth;
        return;
      }

      const leftPanel = $(panelCssClass);
      const percentage = leftPanel.width() / this.lastSize;

      leftPanel.width(percentage * documentWidth);
      this.lastSize = documentWidth;

      // adapt board size to panel:
      this.scaleBoardAndPutInCenter(percentage, boardCssClass);
    });
  }

  scaleBoardAndPutInCenter(percentage, boardCssClass) {
    const scaleDiff = -(percentage / this.DEFAULT_PERCENTAGE) + 1
    const scale = this.INITIAL_SCALE + scaleDiff;
    // $(boardCssClass).css("transform", `scale(${scale})`); // TODO

    const middleY = ($(document).height() - this.TOOLBAR_HEIGHT) / 2;
    const offsetY = $(boardCssClass).height() / 2;
    $(boardCssClass).css("margin-top", `${middleY - offsetY}px`);
  }
}
