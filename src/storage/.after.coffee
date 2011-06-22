pkg.STORAGE_INSTANCE = new pkg.Storage()
pkg.NOTIFIER_INSTANCE = new pkg.Notifier()

core.async(pkg.NOTIFIER_INSTANCE.notify, 10)
