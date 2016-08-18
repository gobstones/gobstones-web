class Stylist {
  constructor() {
    this.DEFAULT_PERCENTAGE = 0.6;
    this.INITIAL_SCALE = 1;
  }

  setPanelAsResizable(panelCssClass, boardCssClass) {
    $(document).ready(() => {
      $(panelCssClass).resizable({
        resizeHeight: false
      });

      setTimeout(() => {
        $(`${panelCssClass} .ui-resizable-s`).hide();
        $(`${panelCssClass} .ui-resizable-se`).hide();

        this.scaleBoard(this.DEFAULT_PERCENTAGE);
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
      // // TODO: this.scaleBoard(percentage, boardCssClass);
    });
  }

  scaleBoard(percentage, boardCssClass) {
    const scaleDiff = -(percentage / this.DEFAULT_PERCENTAGE) + 1
    const scale = this.INITIAL_SCALE + scaleDiff;
    $(".gbs_board").css("transform", `scale(${scale})`);
  }
}
