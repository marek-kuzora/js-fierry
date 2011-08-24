#
# Module providing functionality for counting average array's
# value, generating random floats/integers and summing running
# multiple of multiple operations.
#
Env.math =

  #
  # Returns average from array of numbers.
  #
  # @param Array arr
  #
  avg: (arr) ->
    sum = 0
    sum += i for i in arr
    return sum / arr.length

  #
  # Returns randomly generated number. 
  # If the max argument is specified, the method returns int 
  # ranging from 0 to max. Otherwise it returns random float 
  # ranging from 0 to 1.
  #
  # @param Integer max.
  #
  rand: (max) ->
    return Math.random() * max << 0 if max
    return Math.random()

  #
  # Sums running time of multiple operations, where each time 
  # is given in thousands operations per milisecond.
  #
  # @param Float[] ops - array of k_ops/ms.
  #
  ops_per_ms: (ops...) ->
    sum = 0
    sum += 1 / (op * 1000) for op in ops
    return 1 / sum / 1000
