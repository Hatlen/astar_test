(function() {

  require(["script_spec", "test_spec"], function() {
    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
  });

}).call(this);
