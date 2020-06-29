"use strict";

Polymer({
  is: 'report-issue',
  behaviors: [Polymer.LocalizationBehavior],
  properties: {
    title: String,
    body: String,
    isLoading: Boolean
  },

  send: function send() {
    var _this = this;

    this.isLoading = true;

    var body = this.body + "\n----------\nEmail: " + (this.email || "?") + "\nURL: " + document.location.href + "\nProject: " + document.querySelector("gbs-editor-toolbar").projectName;

    GitHubLoader.reportIssue(this.title, body).then(function () {
      _this.title = "";
      _this.body = "";
      document.querySelector("#reportIssueModal").close();
      alert(_this.localize("report-bug-success"));
    }).catch(function () {
      alert(_this.localize("report-bug-error"));
    }).always(function () {
      _this.isLoading = false;
    });
  }
});