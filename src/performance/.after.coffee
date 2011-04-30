#
# Global instance of pkg.Registry
#
pkg.INSTANCE = new pkg.Registry()

#
# Registers the performance group.
# @param group - {name, *parent, *args, *before, *after}
#
api.registerGroup = (group) ->
  pkg.INSTANCE.registerGroup(group)


#
# Registers the performance test case.
# @param test - {group, name, run, *args, *before, *after, *retry}
#
api.registerTest = (test) ->
  pkg.INSTANCE.registerTest(test)

#
# Runs the tests corresponding to the given group/test names.
# @param arguments - unprocessed array of group/test names.
#
api.run = () ->
  runner = new pkg.Runner(pkg.INSTANCE, arguments)
  listener = new pkg.ProgressListener()

  runner.subscribe("tests.found", listener.tests_found)
  runner.subscribe("test.finished", listener.test_finished)
  runner.subscribe("tests.finished", listener.tests_finished)

  runner.run()
