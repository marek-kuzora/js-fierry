Behavior = require '../view/behavior'


class Tag extends Behavior

  create: ($) ->
    $.node = $.parent.node
    $.node.tags ?= {}

  # Tags to $.value.split(' ') + jakis caching aby tego nie wyznaczac niepotrzebnie!
  update: ($)->
    @_erase_tags($.tags, $.old_value) if $.old_value
    @_insert_tags($.tags, $.value) if $.value

    $.old_value = $.value
    $.node.setAttribute('class', Object.keys($.tags))

  dispose: ($) ->
    @_erase_tags($.tags, $.old_value) if $.old_value
    $.node.setAttribute('class', Object.keys($.tags))

  _insert_tags: (h, tags) ->
    (h[v] = 1 if not ++h[v]) for v in tags
    return

  _erase_tags: (h, tags) ->
    (delete h[v] if --h[v] == 0) for v in tags
    return


return new Tag()
