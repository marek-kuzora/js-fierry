pkg.DAO_INSTANCE = new core.Dao()
pkg.STORAGE_INSTANCE = new core.Storage()
pkg.NOTIFIER_INSTANCE = new storage.Notifier()


dao.is = (o) ->
  return pkg.DAO_INSTANCE.is(o)

dao.get = (str, instance, no_evaluate) ->
  return pkg.DAO_INSTANCE.get(str, instance, no_evaluate)

dao.set = (str, v, instance, no_evaluate) ->
  pkg.DAO_INSTANCE.set(str, v, instance, no_evaluate)

dao.create = (is_global, str, arr, instance) ->
  return pkg.DAO_INSTANCE.cache_dao(is_global, str, arr, instance)


storage.get = (arr) ->
  return pkg.STORAGE_INSTANCE.get(arr)

storage.set = (arr, str, v) ->
  return pkg.STORAGE_INSTANCE.set(arr, str, v)

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


core.async(pkg.NOTIFIER_INSTANCE.notify, 10)
