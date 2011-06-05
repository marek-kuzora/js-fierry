class pkg.ExistingDomAction extends pkg.AbstractAction

  #
  # Overrides the default parent constructor.
  # - this action does not have store any parent.
  # - this action does not track its siblings.
  #
  constructor: (ref) ->
    @_ref = ref
    @_nodes = []

pkg.register_action 'existing_dom', pkg.ExistingDomAction
