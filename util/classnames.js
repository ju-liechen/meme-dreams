export const classnames = (...namesArray) =>
  (Array.isArray(namesArray[0]) ? namesArray[0] : namesArray)
    .filter(Boolean)
    .join(' ')
    .trim()
