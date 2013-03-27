specs = [
  "map_spec.js",
  "a_star_spec.js",
]

requirejs specs, ->
  jasmineEnv = jasmine.getEnv()
  jasmineEnv.updateInterval = 1000
  htmlReporter = new jasmine.HtmlReporter()
  jasmineEnv.addReporter(htmlReporter)
  jasmineEnv.specfilter = (spec) ->
    htmlReporter.specFilter(spec)

  currentWindowOnload = window.onload;
  if document.readyState == "complete"
    jasmineEnv.execute()
  else
    window.onload = ->
      if currentWindowOnload
        currentWindowOnload
      jasmineEnv.execute()

