"use strict";

Polymer({
  is: "activity-settings",
  properties: {
    executionTypeIndex: {
      type: Number,
      value: 0
    },
    executionType: {
      type: Object,
      computed: "_computeSelectedItem(allExecutionTypes, executionTypeIndex)"
    },
    allExecutionTypes: {
      type: Array,
      value: _.values(ExecutionTypes)
    },
    allConstructionModes: {
      type: Object,
      value: ConstructionModes
    }
  },

  loadFromFile: function loadFromFile() {
    window.BUS.fire("load-project-from-file");
  },

  showTemplatesCourse: function showTemplatesCourse() {
    window.BUS.fire("load-course", 'gobstonescursos/templates-GobstonesTeacher');
  },
  notifySettingsBlocks: function notifySettingsBlocks() {
    this.fire('activity-settings-update', { constructionMode: ConstructionModes.blocks, executionType: this.executionType });
    window.BUS.fire('activity-settings-update', { constructionMode: ConstructionModes.blocks, executionType: this.executionType });
  },
  notifySettingsText: function notifySettingsText() {
    this.fire('activity-settings-update', { constructionMode: ConstructionModes.text, executionType: this.executionType });
    window.BUS.fire('activity-settings-update', { constructionMode: ConstructionModes.text, executionType: this.executionType });
  },
  _computeSelectedItem: function _computeSelectedItem(items, index) {
    return items[index];
  }
});