class pkg.AbstractDom

  create: (o) ->
    #importy?

  #update: (o, value) ->
  #  return unless value?

  #  o.forbid_children = true
  #  o.node.appendChild(document.createTextNode(value))

  finalize: (o) ->
    if !o.parent.finalized
      o.parent.node.appendChild(o.node)

  #dispose: (o) ->
  #  o.parent.node.removeChild(o.node)


class pkg.Div extends pkg.AbstractDom

  create: (o) ->
    o.node = document.createElement('div')


class pkg.Span extends pkg.AbstractDom

  create: (o) ->
    o.node = document.createElement('span')


class pkg.Link extends pkg.AbstractDom

  create: (o) ->
    o.node = document.createElement('a')

class pkg.Root

  create: (o) ->
    #o.node = document.body
