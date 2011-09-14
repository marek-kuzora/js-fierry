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


pkg.ELEMENTS['div']     = new pkg.Div()
pkg.ELEMENTS['nav']     = new pkg.Nav()
pkg.ELEMENTS['aside']   = new pkg.Aside()
pkg.ELEMENTS['header']  = new pkg.Header()
pkg.ELEMENTS['footer']  = new pkg.Footer()
pkg.ELEMENTS['article'] = new pkg.Article()
pkg.ELEMENTS['section'] = new pkg.Section()
