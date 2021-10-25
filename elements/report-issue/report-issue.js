'use strict';

Polymer({
  is: 'report-issue',
  behaviors: [Polymer.LocalizationBehavior],
  properties: {
    title: String,
    body: String,
    isLoading: Boolean,
    projectType: String,
    isReportDone: { type: Boolean, value: false },
    issueUrl: String
  },
  send: function send() {
    var _this = this;

    if (!formIssue.checkValidity()) {
      formIssue.reportValidity();
      return;
    }

    this.isLoading = true;

    GitHubLoader.reportIssue({
      title: this.title,
      email: this.email,
      description: this.body,
      url: document.location.href,
      mode: this.projectType,
      project: this.project(),
      browser: platform.name,
      os: (platform.os || '').toString(),
      course: window.COURSE()
    }).then(function (response) {
      _this.title = "";
      _this.body = "";

      _this.isReportDone = true;
      _this.issueUrl = response.url;
    }).catch(function () {
      alert(_this.localize("report-bug-error"));
    }).always(function () {
      _this.isLoading = false;
    });
  },
  project: function project() {
    return document.querySelector("gbs-editor-toolbar").projectName;
  },
  reset: function reset() {
    this.issueUrl = undefined;
    this.isReportDone = false;
  }
});