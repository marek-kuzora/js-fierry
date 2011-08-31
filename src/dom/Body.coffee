class pkg.Body extends pkg.Abstract

  constructor: ->
    @node = document.body

  attach: -> throw new Error 'Illegal operation'
  detach: -> throw new Error 'Illegal operation'
