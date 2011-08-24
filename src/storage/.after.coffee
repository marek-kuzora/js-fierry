pkg.DAO = new core.Dao()
pkg.STORAGE = new core.Storage()


core.get = (str, instance, no_evaluate) ->
  return pkg.DAO.get(str, instance, no_evaluate)

core.set = (str, v, instance, no_evaluate) ->
  pkg.DAO.set(str, v, instance, no_evaluate)


dao.is = (o) ->
  return pkg.DAO.is(o)

dao.create = (is_global, str, arr, instance) ->
  return pkg.DAO.create(is_global, str, arr, instance)

dao.compile = (raw) ->
  return pkg.DAO.compile(raw)

dao.subscribe = (str, fn, instance) ->
  pkg.DAO._retrieve_dao(str, instance).subscribe(fn)

dao.unsubscribe = (str, fn, instance) ->
  pkg.DAO._retrieve_dao(str, instance).unsubscribe(fn)
  

storage.get = (arr) ->
  return pkg.STORAGE.get(arr)

storage.set = (arr, str, v) ->
  pkg.STORAGE.set(arr, str, v)

storage.subscribe = (arr, str, fn) ->
  pkg.STORAGE.subscribe(arr, str, fn)

storage.unsubscribe = (arr, str, fn) ->
  pkg.STORAGE.unsubscribe(arr, str, fn)

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
