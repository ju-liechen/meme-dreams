import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'


import { axiosClient } from 'util/axios-client'
import { useStore } from 'util/store'
import { Button } from 'components/button'
import { Form, useForm, SubmitButton, SelectInput, TextInput } from 'components/form'
import { Tooltip } from 'components/tooltip'

import styles from './home.module.scss'

const getFonts= () => {
  return useQuery({
    queryKey: ['fonts'],
    queryFn: async () => {
      const response = await axiosClient.get('fonts')
      return response.data
    },
    staleTime: 1000 * 60 * 60, // 1 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}

const getImages= () => {
  return useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await axiosClient.get('images')
      return response.data
    },
    staleTime: 1000 * 60 * 60, // 1 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  })
}


const useGenerateMeme = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosClient.get(
        `/meme?font_size=${data.fontSize}&top=${data.topText}&font=${data.font}&bottom=${data.bottomText}&meme=${data.imageName}`, {
        responseType: 'arraybuffer',
      })
      const base64Image = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`
      return base64Image
    }
  })
}

const formatFileName = (...args) => {
  return args
    .filter(Boolean)
    .map((str) => str.trim().replace(/\s+/g, '-'))
    .join('-')
    .replace(/^-+|-+$/g, '');
}

const Index = () => {
  const setNotification = useStore((state) => state.setNotification)
  const { mutate: generateMeme, data: meme, isLoading: isGenerating, error } = useGenerateMeme()
  const { data: fonts, isLoading: fontsLoading, error: fontsError } = getFonts()
  const { data: images, isLoading: imagesLoading, error: imagesError } = getImages()
  const [fileName, setFileName] = useState('')

  const { setValue, handleSubmit, ...methods } = useForm({
    onSubmit: async (data) => {
      const memeData = {
        font: data.font === '' ? 'Impact' : data.font,
        fontSize: data.fontSize === '' ? 50 : data.fontSize,
        imageName: data.imageName === '' ? 'Condescending-Wonka' : data.imageName,
        topText: data.topText === '' ? ' ' : data.topText,
        bottomText: data.bottomText === '' ? ' ' : data.bottomText,
      }

      generateMeme(memeData, {
        onSuccess: (response) => {
          setFileName(formatFileName(memeData.topText, memeData.bottomText, memeData.imageName))
          setNotification({
            type: 'success',
            text: 'Meme generated successfully!',
          })
        },
        onError: (error) => {
          console.log('Error generating meme: ', error)
          setNotification({
            type: 'error',
            text: 'Error generating meme :(',
          })
        },
      })
    },
    resolver: yupResolver(
      y.object().shape({
        topText: y.string(),
        bottomText: y.string().test(
          'at-least-one',
          'At least one of top or bottom text is required',
          function (value) {
            const { topText } = this.parent
            return value?.trim() || topText?.trim()
          }
        ),
      })
    )
  })

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputs}>
          <Form methods={methods}>
            <SelectInput
              name="font"
              label="Font"
              type="text"
              placeholder="Impact"
              options={fonts?.map((font) => ({ value: font, label: font, }))}
              onValueChange={(value) => setValue("font", value)}
              className={styles.select}
            />
            <TextInput
              name="fontSize"
              label="Font Size"
              type=""
              placeholder="50"
            />
            <TextInput
                name="topText"
                label="Top Text"
                type="text"
            />
            <TextInput
                name="bottomText"
                label="Bottom Text"
                type="text"
            />
            <SelectInput
              name="imageName"
              label="Image Name"
              type="text"
              placeholder="Condescending-Wonka"
              options={images?.map((image) => ({ value: image, label: image, }))}
              onValueChange={(value) => setValue("imageName", value)}
            />
            <SubmitButton className={styles['submit-btn']}>
              Generate
            </SubmitButton>
          </Form>
        </div>
        <div className={styles.picture}>
          {(() => {
            if (isGenerating) return <p>Generating meme...</p>
            if (error) return <p>Error: {error.message}</p>
            if (meme) return <GeneratedImage base64Image={meme} altText={fileName} />
            return <p>Some sort of animation</p> 
          })()}
        </div>
      </div>
    </div>
  )
}

Index.Layouts = ['BaseLayout']
export default Index

const GeneratedImage = ({ base64Image, altText }) => {
  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = base64Image
    link.download = `${altText || 'meme-dreams-generated-image'}.png`
    link.click()
  }

  return (
    <div className={styles['image-container']}>
      <img src={base64Image} alt={altText} className={styles['generated-img']} />
      <Tooltip label="Download">
        <Button
          icon="download"
          hideText
          className={styles['action-btn']}
          onClick={downloadImage}
        />
      </Tooltip>
    </div>
  )
}