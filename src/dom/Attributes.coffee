class AbstractAttribute extends view.Behavior

  create: ($) ->
    $.node = $.parent.node


class Attribute extends AbstractAttribute

  update: ($) ->
    $.node.setAttribute($.type, $.value)
      
  dispose: ($) ->
    $.node.setAttribute($.type, $.parent.get($.type))


class Tag extends AbstractAttribute

  update: -> ($) ->
    $.parent.set('class', $.value, $.uid)
    $.node.setAttribute('class', @_get_tags($))

  dispose: -> ($) ->
    $.parent.remove('class', $.uid)
    $.node.setAttribute('class', @_get_tags($))

  _get_tags: ($) ->
    tags = for tag in $.parent.get_all('class') when tag?
      if lang.array(tag) then tag.join(' ') else tag
    return tags.join(' ')


class Style extends AbstractAttribute

  update: ($)->
    $.node.style[$.type] = $.value

  dispose: ($) ->
    $.node.style[$.type] = $.parent.get($.type)


class Event extends AbstractAttribute

  update: ($) ->
    $.node.removeEventListener($.old_value) if $.old_value
    $.node.addEventListener($.value) if $.value

    $.old_value = $.value

  dispose: ($) ->
    $.node.removeEventListener($.value) if $.old_value

pkg.Tag = new Tag()
pkg.Style = new Style()
pkg.Event = new Event()
pkg.Attribute = new Attribute()
