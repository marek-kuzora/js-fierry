Behavior = require '../view/behavior'


class Attribute extends Behavior

  create: ($) ->
    $.node = $.parent.node

  update: ($) ->
    $.node.setAttribute($.type, $.value)
      
  dispose: ($) ->
    $.node.setAttribute($.type, $.parent.get($.type))


return new Attribute()
