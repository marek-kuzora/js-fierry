roots    = require '/source/view/roots'
Behavior = require '/source/view/behavior'

#
# Registers main group.
#
group '/view'


#
# Root for empty action pfc testing
#
class Dummy extends Behavior
  get_behavior: (type) ->
    return Dummy_1 if type is 'dummy-1'
    return Dummy_2 if type is 'dummy-2'
    return Dummy_3 if type is 'dummy-3'

class Dummy_1 extends Dummy
class Dummy_2 extends Dummy
class Dummy_3 extends Dummy

Dummy_1 = new Dummy_1()
Dummy_2 = new Dummy_2()
Dummy_3 = new Dummy_3()

roots.register 'dummy', new Dummy()


#
# Root for DOM action pfc testing.
#
class HtmlRoot extends Behavior

  create: ($) ->
    $.node = document.createElement('div')

  get_behavior: (type) ->
    return dom.ELEMENTS[type]

roots.register 'html-root', new HtmlRoot()


#
# Require test cases.
#
require 'view/create'
require 'view/new_create'
