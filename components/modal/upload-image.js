import { useForm, Form, SubmitButton } from 'components/form'
import { Button } from 'components/button'
import { Modal } from 'components/modal'

import { classnames } from 'util/classnames'
import { useStore } from 'util/store'
import styles from './upload-image.module.scss'

export function UploadImage() {
  const setModal = useStore((state) => state.setModal)
  const setModalState = useStore((state) => state.setModalState)
  const setNotification = useStore((state) => state.setNotification)

  function closeModal() {
    setModalState({})
    setModal(null)
  }

  const methods = useForm({
    onSubmit: async () => {
      console.log('submitted')
      setNotification({
        type: 'success',
        text: 'Uploaded image successfully!',
      })
      closeModal()
    } 
  })

  return (
    <Modal variant="medium" onClose={closeModal}>
      <Form className={styles['content-wrapper']} methods={methods}>
        <div className={styles['header-wrapper']}>
          <h2 className={classnames(['modal-title', styles.title])}>
            Upload an image
          </h2>
          <span className={styles.body}>
            Don't let your memes be dreams; upload your own image.
          </span>
        </div>
        <div className={styles.actions}>
          <Button
            fullWidth
            type="button"
            onClick={() => closeModal()}
            variation="outline"
          >
            Close
          </Button>
          <SubmitButton
            fullWidth
            disabled={true}
          >
            Currently unavailable
            {/* RapidAPI uploadImage endpoint is currently not working */}
          </SubmitButton>
        </div>
      </Form>
    </Modal>
  )
}