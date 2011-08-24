#
# Registry mixin. Enables clients to collect arguments 
# in a map-oriented way. The arguments can be registered &
# retrieved by specyfing their name.
#
# Configuration:
# - Boolean override 
#   - the argument can be overrided by another one that 
#     has exactly the same name. False by default.
# - Boolean nullable
#   - the retrieved argument can be null or undefined.
#     False by default.
#
core.register_mixin 'registry', (cls, conf) ->

  #
  # Registers the argument. Will throw an error if argument
  # with the given name is already registered and the registry
  # does not support overriding.
  #
  # @param String name
  # @param Any arg
  #
  cls::register = (name, arg) ->
    map = @_registry_map ?= {}

    unless conf.override
      assert !map[name]?, "Element #{name} already registered."
    map[name] = arg

  #
  # Retrieves argument from the registry. Will throw an error 
  # if argument for the given name is not found and the registry
  # is not nullable.
  #
  cls::retrieve = (name) ->
    map = @_registry_map ?= {}

    unless conf.nullable
      assert map[name]?, "Element #{name} not found."
    return map[name]
