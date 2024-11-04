export const debounce = (fn, wait) => {
  var timeout
  return (...args) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}
