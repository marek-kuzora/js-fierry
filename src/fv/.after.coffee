pkg.REGISTRY = new pkg.Registry()
pkg.VIEW     = new pkg.View(pkg.REGISTRY)

#
# Registers action handler for the given scopes.
# Function takes variable number of arguments:
# - first argument is expectedto be a String scope.
# - arguments between first & last are expected to be a String scope.
# - last argument is expected to be {} handler.
#
# @param String... scopes
# @param {} handler
#
pkg.register = (args...) ->
  pkg.REGISTRY.register(args...)

#
# Selects the view to execute on application startup.
# The view must exist.
#
# @param String name
#
app.load = (name) ->
  pkg.VIEW.load(name)

#
# Registers view definition with the given name.
#
# @param String name
# @param {} view
#
app.register = (name, view) ->
  pkg.VIEW.register(name, view)

#
# Registers execute/dispose view behavior.
#
app.add_behavior('start', pkg.VIEW.on_start)
app.add_behavior('stop', pkg.VIEW.on_stop)
