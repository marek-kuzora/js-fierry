Behavior = require '/fierry/view/behavior'


#
# Root for performance testing of DOM action hierarchies.
#
class Html extends Behavior

  create: ($) ->
    $.node = document.createElement('div')


return new Html()
