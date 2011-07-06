pkg.DAO_INSTANCE = new core.Dao()
pkg.STORAGE_INSTANCE = new core.Storage()
pkg.NOTIFIER_INSTANCE = new storage.Notifier()


dao.is = (o) ->
  return pkg.DAO_INSTANCE.is(o)

dao.create = (is_global, str, arr, instance) ->
  return pkg.DAO_INSTANCE.create(is_global, str, arr, instance)

dao.compile = (raw) ->
  return pkg.DAO_INSTANCE.compile(raw)

core.get = (str, instance, no_evaluate) ->
  return pkg.DAO_INSTANCE.get(str, instance, no_evaluate)

core.set = (str, v, instance, no_evaluate) ->
  pkg.DAO_INSTANCE.set(str, v, instance, no_evaluate)

core.register = (str, fn, instance) ->
  pkg.DAO_INSTANCE.get_dao(str, instance).register(fn)

core.unregister = (str, fn, instance) ->
  pkg.DAO_INSTANCE.get_dao(str, instance).unregister(fn)
  

storage.get = (arr) ->
  return pkg.STORAGE_INSTANCE.get(arr)

storage.set = (arr, str, v) ->
  pkg.STORAGE_INSTANCE.set(arr, str, v)

storage.register = (arr, str, fn) ->
  pkg.STORAGE_INSTANCE.register(arr, str, fn)

storage.unregister = (arr, str, fn) ->
  pkg.STORAGE_INSTANCE.unregister(arr, str, fn)

storage.disable_notify = (arr, str) ->
  pkg.STORAGE_INSTANCE.disable_notify(arr, str)

storage.enable_noitfy = (arr, str) ->
  pkg.STORAGE_INSTANCE.enable_noitfy(arr, str)

storage.register_rule = (raw) ->
  pkg.STORAGE_INSTANCE.register_rule(raw)


#
# Binding Storage clear to the application shutdown.
#
behavior 'stop', ->
  pkg.STORAGE_INSTANCE._clear()

#
# Scheduling asynchronous, periodic notifications.
#
core.async(pkg.NOTIFIER_INSTANCE.notify, 10, true)


# TODO remove!
# Potrzeba testow na pewno na tworzenie samego dao
# Potem testow na pobieranie danych...
# I testow na utworzenie & pobranie tego, co trzeba
# Plain mam, complex use-case tez trzeba.
behavior 'start', ->
  core.storage.set(['user'], 'user', {name: 'Bilbo', surname: 'Baggins', status: 'guest'})
  core.storage.get(['user'])
