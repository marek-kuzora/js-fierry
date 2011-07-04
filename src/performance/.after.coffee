#
# Global instance of pkg.Registry
#
pkg.INSTANCE = new pkg.Registry()
pkg.ENVS = new pkg.Environments()

#
# Registers the performance group.
# @param group - {name, *parent, *args, *before, *after}
#
pfc.register_group = (group) ->
  pkg.INSTANCE.register_group(group)

#
# Registers the performance test case.
# @param test - {group, name, run, *args, *before, *after, *retry}
#
pfc.register_test = (test) ->
  pkg.INSTANCE.register_test(test)

#
# Runs the tests corresponding to the given group/test names.
# @param arguments - unprocessed array of group/test names.
#
pfc.run = () ->
  runner = new pkg.Runner(pkg.INSTANCE, arguments)
  listener = new pkg.ProgressListener()

  runner.subscribe("tests.found", listener.tests_found)
  runner.subscribe("test.finished", listener.test_finished)
  runner.subscribe("tests.finished", listener.tests_finished)

  runner.run()
