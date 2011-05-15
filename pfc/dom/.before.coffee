group
  name: 'dom'
  before: ->
    @stub = dom.$('stub')
  after: ->
    @stub = dom.replace_html(@stub)
    
group
  name: 'dom.replace'
  min_arg: 2500
