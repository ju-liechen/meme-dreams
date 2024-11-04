export const env = (name, description) => {
  const value = process.env[name]
  const isServer = typeof window === 'undefined'
  if (!value && (name.startsWith('NEXT_PUBLIC') || isServer)) {
    console.warn('WARNING Missing environment variable: ', name, description || '')
  }
  return value
}

