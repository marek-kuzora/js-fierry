app = core.app = new core.App()
core.runtime = new core.Runtime()

#
# Runtime will setup itself on application startup.
#
app.add_start_handler(core.runtime.setup)
