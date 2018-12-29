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
