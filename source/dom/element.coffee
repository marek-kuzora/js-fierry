Behavior = require '../view/behavior'


class Element extends Behavior
  
  create: ($) ->
    $.pnode = $.parent.node
    $.node  = document.createElement($.type)

  update: ($) ->
    $.text_node = $.value?
    $.node.textContent = $.value if $.text_node

  finalize: ($) ->
    if $.parent.text_node
      throw new Error 'Cannot attach elements to text node.'

    if $.parent.finalized
      return $.pnode.injectBefore($.node, $.parent.find (nodes) ->
        i = nodes.indexOf($)
        l = nodes.length

        while i++ < l when nodes[i].node instanceof Abstract
          return nodes[i].node
      )
    return $.pnode.appendChild($.node)

  dispose: ($) ->
    $.pnode.removeChild($.node)

#  get_behavior: (type) ->
#    return pkg.ELEMENTS[type] if type of pkg.ELEMENTS
#    return pkg.Tag            if type is pkg.TAG
#
#    return pkg.Attribute      if type in pkg.ATTRIBUTES
#    return pkg.Event          if type in pkg.EVENTS
#    return pkg.Style


return new Element()
