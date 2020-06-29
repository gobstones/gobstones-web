"use strict";

Polymer.MyLocalizationBehavior = {
  attached: function attached() {
    this.loadResources(this.resolveUrl("../../locales.json"));

    this.language = window.STORAGE.getItem("language") || "es";
  }
};

Polymer.LocalizationBehavior = [Polymer.AppLocalizeBehavior, Polymer.MyLocalizationBehavior];