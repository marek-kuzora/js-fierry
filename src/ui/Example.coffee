ui.into document.body, [
  type: 'div'
  attrs:
    id: 'cokolwiek'
    class: 'fafa'
  content: [
    type: 'span'
    attrs:
      text: 'title'
      font: 'ui'
    content: [
      type: 'span'
      attrs:
        text: '!'
        font: 'b'
    ]
  ,
    type: 'br'
  ,
    type: 'span'
    attrs:
      text: 'some text'
  ]
,
  type: 'div'
]

ui.into document.body

ui.append 'div'
  id: 'cokolwiek'
  class: 'fafa'

  ui.append 'span'
    text: 'title'
    font: 'ui'

    ui.append 'span'
      text: '!'
      font: 'b'

  ui.append 'br'

  ui.append 'span'
    text: 'some text'

ui.append 'div'

# Template definition
ui.define 'template'

ui.cond
  if: current_user.is_logged()

  ui.append 'span'
    text: current_user.email

ui.loop
  item: i
  array: '..data'

# Musze zbudowac tak, aby mozna bylo wielokrotnie go wykonywac!
