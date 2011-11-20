/export 3x div:html
  /div
  /div
  /div


/export 6x div + article:html
  /div
    /article

  /div
    /article

  /div
    /article


/export 30x div + article + section:html
  # Moglbym tutaj fajnego fora napisac - potem trza podpiac to!
  /div
    /article
      /section
      /section
    /article
      /section
      /section
    /article
      /section
      /section

  /div
    /article
      /section
      /section
    /article
      /section
      /section
    /article
      /section
      /section

  /div
    /article
      /section
      /section
    /article
      /section
      /section
    /article
      /section
      /section


/export 3x div + text:html
  /div 'hello'
  /div 'world'
  /div 'etc'


/export 1x div + 3x attributes:html
  /div
    /title     'title'
    /lang      'pl-PL'
    /draggable true


/export 3x div + 1x attribute:html
  /div
    /title 'title'
  /div
    /title 'title'
  /div
    /title 'title'

/export 1x div + 3x styles:html
  /div
    /color      'red'
    /border     'solid 1px gold'
    /background 'gray'

/export 3x div + 1x style:html
  /div
    /color 'red'
  /div
    /color 'red'
  /div
    /color 'red'

/export 1x div + 3x tags:html
  /div
    /tag 'header'
    /tag 'content'
    /tag 'footer'
