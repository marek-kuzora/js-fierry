class pkg.Div extends pkg.Abstract
  get_element_type: -> 'div'

class pkg.Nav extends pkg.Abstract
  get_element_type: -> 'nav'

class pkg.Aside extends pkg.Abstract
  get_element_type: -> 'aside'

class pkg.Header extends pkg.Abstract
  get_element_type: -> 'header'

class pkg.Footer extends pkg.Abstract
  get_element_type: -> 'footer'

class pkg.Article extends pkg.Abstract
  get_element_type: -> 'article'

class pkg.Section extends pkg.Abstract
  get_element_type: -> 'section'


pkg.ELEMENTS['div']     = (p, a) -> new pkg.Div(p, a)
pkg.ELEMENTS['nav']     = (p, a) -> new pkg.Nav(p, a)
pkg.ELEMENTS['aside']   = (p, a) -> new pkg.Aside(p, a)
pkg.ELEMENTS['header']  = (p, a) -> new pkg.Header(p, a)
pkg.ELEMENTS['footer']  = (p, a) -> new pkg.Footer(p, a)
pkg.ELEMENTS['article'] = (p, a) -> new pkg.Article(p, a)
pkg.ELEMENTS['section'] = (p, a) -> new pkg.Section(p, a)

