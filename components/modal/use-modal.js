
const WARNING = `
Unable to locate modal. Make sure to provide an id to useModal, and to pass the result of useModal along to a Modal component.

const modal = useModal('my-identifier')

return <Modal {...modal}>
  <h1>Example</h1>
  <button onClick={() => modal.close()}>Close modal</button>
</Modal>
`.trim()

export const useModal = (id) => {
  return {
    open: () => {
      const modal = document.getElementById(id)
      if (!modal) console.warn(WARNING)
      modal.classList.add('open')
      document.querySelectorAll('.modal').forEach(openModal => {
        openModal !== modal && openModal.classList.remove('open')
      })
    },
    close: () => {
      const modal = document.getElementById(id)
      if (!modal) console.warn(WARNING)
      modal.classList.remove('open')
    },
    id,
  }
}
