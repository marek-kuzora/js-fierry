Behavior = require '/fierry/view/behavior'


class Root extends Behavior

  create: ($) ->
    $.node = document.body


return new Root()
