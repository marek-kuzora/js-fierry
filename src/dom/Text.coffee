class pkg.Span extends pkg.Abstract
  get_element_type: -> 'span'
  
class pkg.Anchor extends pkg.Abstract
  get_element_type: -> 'a'

  get_attribute_type: (name) ->
    return pkg.ATTRIBUTE if name in pkg.ANCHOR_ATTRIBUTES
    return super

class pkg.Paragraph extends pkg.Abstract
  get_element_type: -> 'p'

class pkg.Preformatted extends pkg.Abstract
  get_element_type: -> 'pre'

class pkg.Emphasize extends pkg.Abstract
  get_element_type: -> 'em'

class pkg.Strong extends pkg.Abstract
  get_element_type: -> 'strong'

class pkg.Bold extends pkg.Abstract
  get_element_type: -> 'b'

class pkg.Italic extends pkg.Abstract
  get_element_type: -> 'i'

pkg.ELEMENTS['span']   = (p, a) -> new pkg.Span(p, a)
pkg.ELEMENTS['a']      = (p, a) -> new pkg.Anchor(p, a)
pkg.ELEMENTS['p']      = (p, a) -> new pkg.Paragraph(p, a)
pkg.ELEMENTS['pre']    = (p, a) -> new pkg.Preformatted(p, a)
pkg.ELEMENTS['em']     = (p, a) -> new pkg.Emphasize(p, a)
pkg.ELEMENTS['strong'] = (p, a) -> new pkg.Strong(p, a)
pkg.ELEMENTS['b']      = (p, a) -> new pkg.Bold(p, a)
pkg.ELEMENTS['i']      = (p, a) -> new pkg.Italic(p, a)
