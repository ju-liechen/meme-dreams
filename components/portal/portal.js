import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export const Portal = ({ children, className, id = 'portal-root' }) => {
  const [el, setEl] = useState(null)

  useEffect(() => {
    const tempEl = document.createElement('div')
    const portalRoot = document.body
    portalRoot.appendChild(tempEl)
    tempEl.setAttribute('id', id)
    tempEl.setAttribute('class', className)

    setEl(tempEl)

    return () => {
      portalRoot.removeChild(tempEl)
    }
  }, [])

  if (!el) return null

  return ReactDOM.createPortal(children, el)
}
