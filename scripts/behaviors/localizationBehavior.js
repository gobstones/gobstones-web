"use strict";

Polymer.MyLocalizationBehavior = {
    attached: function attached() {
        this.loadResources(this.resolveUrl("../../locales.json"));
        this.language = "es";
    }
};

Polymer.LocalizationBehavior = [Polymer.AppLocalizeBehavior, Polymer.MyLocalizationBehavior];