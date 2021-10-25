"use strict";

Polymer({
  is: "project-feature",
  properties: {
    name: {
      type: String
    },
    enabled: {
      type: Boolean,
      default: false
    }
  }
});