group
  name: 'dom'
  before: ->
    @stub = dom.$('stub')
  after: ->
    @stub = dom.replace_html(@stub)
