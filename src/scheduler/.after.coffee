#
# Global instance of pkg.Scheduler.
#
pkg.INSTANCE = new pkg.Scheduler()
pkg.INSTANCE.start()

#
# Executes given function asynchronously.
# Will stop after first execution if the function is defined as 'once'.  
# @param fn - Function
# @param delay - time to invoke [ms].
# @param periodic - Boolean
#
core.async = (fn, delay, periodic) ->
  return pkg.INSTANCE.async(fn, delay, periodic)

#
# Executes function asynchronously for each item of the array.
# Will stop when array is empty.
# @param arr - Array
# @param fn - Function
#
core.async_array = (arr, fn) ->
  return pkg.INSTANCE.async_array(arr, fn)
