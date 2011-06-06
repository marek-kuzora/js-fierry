class pkg.HeaderAction extends pkg.DomAction

  create_node: ->
    node = document.createElement('h1')
    node.className = @_ref.classes.join(' ')
    
    return node

pkg.register_action 'dom:h1', pkg.HeaderAction
