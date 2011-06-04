#
# Registers handler for the action with the given name.
# @param String name
# @param {} handler
#
pkg.register_action = (name, handler) ->
  rtm.push {type: 'dj.action', name: name, handler: handler}
