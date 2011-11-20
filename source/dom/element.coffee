Behavior = require '../view/behavior'


class Element extends Behavior
  
  create: ($) ->
    $.pnode = $.parent.node
    $.node  = document.createElement($.type)

  # When textContent instead of innerHTML, user cant code &nbsp; :/
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


return new Element()
