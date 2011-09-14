group '/view'

#
# Root for empty action pfc testing
#
class Dummy extends view.Behavior
  get_behavior: (type) ->
    return pkg.Dummy_1 if type is 'dummy-1'
    return pkg.Dummy_2 if type is 'dummy-2'
    return pkg.Dummy_3 if type is 'dummy-3'

class Dummy_1 extends Dummy
class Dummy_2 extends Dummy

pkg.Dummy_1 = new Dummy_1()
pkg.Dummy_2 = new Dummy_2()
pkg.Dummy_3 = new Dummy_2()

view.register_root 'dummy', new Dummy()


#
# Root for DOM action pfc testing.
#
class HtmlRoot extends view.Behavior

  create: ($) ->
    $.node = document.createElement('div')

  get_behavior: (type) ->
    return dom.ELEMENTS[type]

view.register_root 'html-root', new HtmlRoot()
