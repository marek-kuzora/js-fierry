pkg.INSTANCE = new pkg.Storage()

core.get = (arr) ->
  return pkg.INSTANCE.get(arr)

core.set = (arr, val) ->
  pkg.INSTANCE.set(arr, val)

core.register = (arr, fn) ->
  pkg.INSTANCE.register(arr, fn)

core.unregister = (arr, fn) ->
  pkg.INSTANCE.unregister(arr, fn)

core.register_rule = (path) ->
  pkg.INSTANCE.register_rule(path)

core.notifier = new pkg.Notifier()
core.async(core.notifier.notify, 10)
