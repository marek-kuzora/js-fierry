rtm.register_executor 'dj.action'

  services:
    actions: 'dj.actions'

  #
  # Registers handler for the action with the given name.
  # @param {type, name, handler} request
  #
  run: (req) ->
    @actions.register(req.name, req.handler)
