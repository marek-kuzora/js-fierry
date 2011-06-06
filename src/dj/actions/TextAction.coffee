class pkg.TextAction extends pkg.DomAction

  create_node: ->
    node = document.createElement('span')
    node.innerHTML = @_attrs.text
    
    return node

pkg.register_action 'dom:text', pkg.TextAction

