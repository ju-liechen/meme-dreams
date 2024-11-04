import { useCallback, forwardRef, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Icon } from 'components/icon'
import { Progress } from 'components/progress-bar'
import { useStore } from 'util/store'
import { classnames } from 'util/classnames'
import { ErrorMessage } from '../error-message'

import styles from './file-upload.module.scss'

export const FileUpload = forwardRef(
  (
    {
      acceptedFileTypes = {
        'image/png': ['.png'],
      },
      multiple = false,
      id,
      label,
      error,
      className,
      callback,
      uploadHook,
      disabled,
      icon,
      iconVariation = 'stroked',
      caption = 'Click to add or drag file to upload',
      instructionsText,
      ...passedProps
    },
    ref,
  ) => {
    const [fileInfo, setFileInfo] = useState({
      name: '',
      type: '',
      file: '',
    })
    const [fileLoaded, setFileLoaded] = useState()
    const [isUploading, setIsUploading] = useState(false)
    const [uploadComplete, setUploadComplete] = useState(false)
    const [progress, setProgress] = useState(0)
    const onChangeCallback = passedProps.onChange
    const filteredProps = { ...passedProps }
    delete filteredProps.onChange

    const uploadProgressCallback = (event) => {
      const newProgress =
        event.loaded > 0 ? (event.loaded / event.total) * 100 : 0
      setProgress(newProgress)
    }

    const { uploadFile, status, uploadedUrl } =
      typeof uploadHook === 'function' ? uploadHook(uploadProgressCallback) : {}

    const onDrop = useCallback(
      (acceptedFiles) => {
        if (disabled) return
        acceptedFiles.forEach((file) => {
          setFileInfo({
            name: file.name,
            type: file.type.split('/')[0],
            file,
          })
          const reader = new FileReader()
          reader.onabort = () => {
            setFileInfo({
              name: '',
              type: '',
              file: null,
            })
            console.log('file reading was aborted')
          }
          reader.onerror = () => {
            setFileInfo({
              name: '',
              type: '',
            })
            console.log('file reading has failed')
          }
          reader.onloadend = () => {
            setFileLoaded(true)
            if (callback && typeof callback === 'function') {
              callback(file)
            } else {
              handleFileUpload(file)
            }
          }
          reader.readAsArrayBuffer(file)
        })
      },
      [disabled, callback],
    )

    async function handleFileUpload(file) {
      if (!uploadHook) {
        console.error('Upload function not provided!')
        return
      }
      try {
        setIsUploading(true)
        await uploadFile(file)
      } catch (error) {
        console.error('Error uploading file:', error)
        handleFileReset()
      }
    }

    const onError = (error, fileRejections) => {
      console.error('Dropzone error:', error)
      fileRejections.forEach((file) => {
        console.error('File rejection:', file)
      })
    }

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      onDrop,
      onError,
      accept: acceptedFileTypes,
      multiple,
    })

    const captionText = isDragReject
      ? 'This file type is not supported. Add a different file.'
      : caption

    const handleFileReset = () => {
      // Clear the local state
      setFileInfo({
        name: '',
        type: '',
        file: null,
      })
      setFileLoaded(false)
      setUploadComplete(false)
      setProgress(0)
      setIsUploading(false)
    }

    useEffect(() => {
      const uploadSuccessful = [200, 204].includes(status)
      if (status === 'error') {
        setProgress(1)
        setIsUploading(false)
        return
      }
      if (status === 'uploading') return
      if (uploadSuccessful) {
        setIsUploading(false)
        setUploadComplete(true)
        if (onChangeCallback) {
          const file = {
            name: fileInfo.name,
            type: fileInfo.type,
            url: uploadedUrl,
          }
          onChangeCallback(file)
          handleFileReset()
        }
      }
    }, [status, uploadedUrl])

    useEffect(() => {
      if (!fileLoaded) return
      if (onChangeCallback) {
        const file = {
          name: fileInfo.name,
          type: fileInfo.type,
        }
        onChangeCallback(file)
      }
    }, [fileLoaded, fileInfo])

    return (
      <div
        className={classnames([
          styles.root,
          className,
          uploadComplete ? styles.complete : styles.incomplete,
          disabled ? styles.disabled : null,
          isDragActive ? styles.active : '',
          isDragAccept ? styles.accept : '',
          isDragReject ? styles.reject : '',
          error ? styles.error : '',
        ])}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <div
          className={classnames([
            styles.container,
            isUploading || fileLoaded ? styles['is-loading'] : null,
          ])}
        >
          {isUploading || fileLoaded || uploadComplete ? (
            <div className={styles.progress}>
              <div className={styles['progress-row']}>
                <Icon
                  name={uploadComplete ? 'file' : 'upload'}
                  variation="stroked"
                  className={styles['progress-icon']}
                />
                {isUploading ? (
                  <Progress
                    progress={progress}
                    className={styles['progress-bar']}
                    displayText={fileInfo.name}
                  />
                ) : uploadComplete ? (
                  <>
                    <span className={styles['file-name']}>{fileInfo.name}</span>
                    <button
                      className={classnames([
                        'button-reset',
                        styles['file-close'],
                      ])}
                      onClick={handleFileReset}
                      type="button"
                    >
                      <Icon
                        className={styles['file-close-icon']}
                        name="close"
                        variation="stroked"
                      />
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            <div className={styles.landing} {...getRootProps()}>
              <input
                {...getInputProps()}
                {...filteredProps}
                type="file"
                style={{ display: 'none' }}
                className={styles.input}
              />
              <p className={styles['landing-caption']}>
                {icon ? (
                  <Icon
                    name={
                      isDragAccept
                        ? 'check'
                        : isDragReject || error
                        ? 'warning'
                        : icon
                    }
                    variation={iconVariation}
                    className={classnames([
                      styles.icon,
                      isDragAccept ? 'filled' : null,
                    ])}
                  />
                ) : null}
                <span className={styles.caption}>{captionText}</span>
                <span className={styles['instructions-text']}>
                  {instructionsText}
                </span>
              </p>
            </div>
          )}
        </div>
        {error && (
          <ErrorMessage className={styles['error-message']}>
            {error}
          </ErrorMessage>
        )}
      </div>
    )
  },
)

FileUpload.displayName = 'File Uploader'
