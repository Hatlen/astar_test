require ["script_spec", "test_spec"], ->
  jasmine.getEnv().addReporter(new jasmine.TrivialReporter())
  jasmine.getEnv().execute()
  return
