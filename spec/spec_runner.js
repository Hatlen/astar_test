(function() {
  var specs;

  specs = ["map_spec.js", "a_star_spec.js"];

  requirejs(specs, function() {
    var currentWindowOnload, htmlReporter, jasmineEnv;

    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specfilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
    currentWindowOnload = window.onload;
    if (document.readyState === "complete") {
      return jasmineEnv.execute();
    } else {
      return window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload;
        }
        return jasmineEnv.execute();
      };
    }
  });

}).call(this);
