app = core.app = new core.App()
runtime = core.runtime = new core.Runtime()

#
# Binding Runtime setup on application startup.
#
app.add_behavior 'start', ->
  runtime._setup()
