#
# Global instance of pkg.Registry
#
pkg.INSTANCE = new pkg.Registry()
pkg.ENVS = new pkg.Environments()

#
# Registers the performance group.
# @param group - {name, *parent, *args, *before, *after}
#
pfc.register_group = (group, arg) ->
  pkg.INSTANCE.register_group(group, arg)

#
# Registers the performance test case.
# @param test - {group, name, run, *args, *before, *after, *retry}
#
pfc.register_test = (test, arg) ->
  pkg.INSTANCE.register_test(test, arg)

#
# Registers performance test cases that are already registed to another group.
# @param name - group name from which to import test cases.
#
pfc.register_tests_from = (name) ->
  pkg.INSTANCE.register_tests_from(name)

#
# Registers environment with the given name.
#
# @param String name
# @param {} env
#
pfc.register_environment = (name, env) ->
  pkg.ENVS.register(name, env)

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
