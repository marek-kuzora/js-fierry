api._registry = new pkg.Registry()

api.registerTest = (test) ->
  api._registry.registerTest(test)

api.registerGroup = (group) ->
  api._registry.registerGroup(group)

api.run = () ->
  runner = new pkg.Runner(api._registry, arguments)
  listener = new pkg.PfcListener()

  runner.subscribe("tests.found", listener.onTestsFound)
  runner.subscribe("test.finished", listener.onTestFinished)
  runner.subscribe("tests.finished", listener.onTestsFinished)

  runner.run()
