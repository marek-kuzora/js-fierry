#
# Registers handler for the action with the given name.
# @param String name
# @param {} handler
#
pkg.register_action = (name, handler) ->
  rtm.execute_on_service 'dj.actions', -> @register name, handler
