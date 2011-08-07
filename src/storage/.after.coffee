pkg.DAO = new core.Dao()
pkg.STORAGE = new core.Storage()
pkg.NOTIFIER = new storage.Notifier()


core.get = (str, instance, no_evaluate) ->
  return pkg.DAO.get(str, instance, no_evaluate)

core.set = (str, v, instance, no_evaluate) ->
  pkg.DAO.set(str, v, instance, no_evaluate)

core.register = (str, fn, instance) ->
  pkg.DAO._retrieve_dao(str, instance).register(fn)

core.unregister = (str, fn, instance) ->
  pkg.DAO._retrieve_dao(str, instance).unregister(fn)


dao.is = (o) ->
  return pkg.DAO.is(o)

dao.create = (is_global, str, arr, instance) ->
  return pkg.DAO.create(is_global, str, arr, instance)

dao.compile = (raw) ->
  return pkg.DAO.compile(raw)
  

storage.get = (arr) ->
  return pkg.STORAGE.get(arr)

storage.set = (arr, str, v) ->
  pkg.STORAGE.set(arr, str, v)

storage.register = (arr, str, fn) ->
  pkg.STORAGE.register(arr, str, fn)

storage.unregister = (arr, str, fn) ->
  pkg.STORAGE.unregister(arr, str, fn)

storage.disable_notify = (arr, str) ->
  pkg.STORAGE.disable_notify(arr, str)

storage.enable_noitfy = (arr, str) ->
  pkg.STORAGE.enable_noitfy(arr, str)

storage.register_rule = (raw) ->
  pkg.STORAGE.register_rule(raw)


#
# Binding Storage clear to the application shutdown.
#
behavior 'stop', ->
  pkg.STORAGE._clear()

#
# Scheduling asynchronous, periodic notifications.
#
core.async(pkg.NOTIFIER.notify, 10, true)
