class pkg.ExistingDomAction extends pkg.AbstractAction

  #
  # Overrides the default parent constructor.
  # - this action does not have store any parent.
  # - this action does not track its siblings.
  #
  constructor: (ref) ->
    @_ref = ref
    @_nodes = []

  #
  # Returns reference to HTMLElement represented by the action.
  #
  get_dom_reference: ->
    return @_ref.dom

  #
  # Creates the action's child nodes.
  # - This method is unsupported in ExistingDomAction.
  #
  create_nodes: ->
    throw new Error 'Unsupported method'

  #
  # Attaches action to its parent.
  # - This method is unsupported in ExistingDomAction.
  #
  attach: ->
    throw new Error 'Unsupported method'

  #
  # Detaches action from its parent.
  # - This method is unsupported in ExistingDomAction.
  #
  detach: ->
    throw new Error 'Unsupported method'


pkg.register_action 'existing_dom', pkg.ExistingDomAction
