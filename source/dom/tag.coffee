Behavior = require '../view/behavior'


class Tag extends Behavior

  create: ($) ->
    $.node = $.parent.node
    $.node.tags ?= {}

  update: ($)->
    $.value = $.value.split(' ')

    @_erase_tags($.node.tags, $.old_value) if $.old_value
    @_insert_tags($.node.tags, $.value)    if $.value
    @_set_tags($)

    $.old_value = $.value

  dispose: ($) ->
    @_erase_tags($.node.tags, $.old_value) if $.old_value
    @_set_tags($)

  _insert_tags: (h, tags) ->
    (h[v] = 1 if not ++h[v]) for v in tags
    return

  _erase_tags: (h, tags) ->
    (delete h[v] if --h[v] == 0) for v in tags
    return

  _set_tags: ($) ->
    $.node.setAttribute('class', Object.keys($.node.tags).join(' '))


return new Tag()
