(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

      handlePDF: function () {
        this.handleFile('pdf');
      },

      handleDOC: function () {
        this.handleFile('doc');
      },

      handleDOCX: function () {
        this.handleFile('docx');
      },

      handleRTF: function () {
        this.handleFile('rtf');
      },

      handleTXT: function () {
        this.handleFile('txt');
      },

      handleUnknown: function () {
        this.handleFile('blah');
      },

      handleFile: function (extension) {
          if (!this.checkSimulator()) {
            handleDocumentWithURL(
            function(msg) {alert('success: ' + msg)},
              function(error) {
                if (error == 53) {
                  alert('No app that handles this file type.');
                } else {
                  alert('Generic error: ' + error);
                }
              },
              'http://www.x-services.nl/samplefiles/sample.' + extension
            );
          }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.handleDocumentWithURL === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);