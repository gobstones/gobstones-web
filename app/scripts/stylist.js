class Stylist {
  setPanelAsResizable(cssClass) {
    $(document).ready(function() {
      $(cssClass).resizable({
        resizeHeight: false
      });

      setTimeout(function() {
        $(`${cssClass} .ui-resizable-s`).hide();
        $(`${cssClass} .ui-resizable-se`).hide();

      }, 0);
    });

    this.keepAspectRatioOnWindowResize(cssClass);
  }

  keepAspectRatioOnWindowResize(cssClass) {
    $(window).resize(() => {
      let documentWidth = $(document).width()
      if (!this.lastSize) {
        this.lastSize = documentWidth;
        return;
      }

      let leftPanel = $(cssClass);
      let percentage = leftPanel.width() / this.lastSize;

      leftPanel.width(percentage * documentWidth);
      this.lastSize = documentWidth;
    });
  }
}
