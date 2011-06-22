pkg.STORAGE_INSTANCE = new storage.Global()
pkg.NOTIFIER_INSTANCE = new storage.Notifier()

core.async(pkg.NOTIFIER_INSTANCE.notify, 10)
