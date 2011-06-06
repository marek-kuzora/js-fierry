class pkg.DivAction extends pkg.DomAction

  create_node: ->
    node = document.createElement('div')
    node.id = @_ref.id if @_ref.id

    return node

pkg.register_action 'dom:div', pkg.DivAction
