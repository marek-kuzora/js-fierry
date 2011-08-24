group '/utils.math'


group 'round'

test 'Math.round',
  run: ->
    x = Math.round(12.3456)

test 'Binary shift',
  run: ->
    x = 12.3456 << 0

test 'Double complement',
  run: ->
    x = ~~12.3456

