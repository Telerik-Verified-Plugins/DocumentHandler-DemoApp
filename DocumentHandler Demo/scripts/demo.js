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
            function(msg) {console.log('DocumentHandler success: ' + msg)},
              function(errorcode) {
                if (errorcode == 2) {
                  alert('File not found, please check the URL.');
                } else if (errorcode == 53) {
                  alert('No app that handles this file type.');
                } else {
                  alert('Unknown error. Code: ' + error);
                }
              },
              // loading one of our GitHub hosted sample files
              'https://github.com/Telerik-Verified-Plugins/DocumentHandler/raw/master/samplefiles/sample.' + extension
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