export function isProtectedPath(pathname, pathArray) {
  return pathArray.reduce(
    (acc, curr) => (pathname === curr ? true : acc),
    false
  )
}

export function* makeTaglineIterator(taglinesArray) {
  let count = 0
  while (count < Infinity) {
    yield taglinesArray[count++ % taglinesArray.length]
  }
}

export function validateEmail(string) {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string)
}
