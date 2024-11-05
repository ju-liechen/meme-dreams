import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'


import { axiosClient } from 'util/axios-client'
import { useStore } from 'util/store'
import { Button } from 'components/button'
import { Form, useForm, SubmitButton, TextInput } from 'components/form'
import { Tooltip } from 'components/tooltip'

import styles from './home.module.scss'

// Example useQuery if GET request:
// import { useQuery } from '@tanstack/react-query'
// const getMeme = () => {
//   return useQuery({
//     queryKey: ['meme'],
//     queryFn: async (data) => {
//       const response = await axiosClient.get(`/meme?font_size=${data.fontSize}&top=${data.topText}&font=${data.font}&bottom=${data.bottomText}&meme=${data.imageName}`)
//       return response.data
//     },
//     enabled: false,
//   })
// }


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

const Index = () => {
  const setNotification = useStore((state) => state.setNotification)
  const { mutate: generateMeme, data: meme, isLoading: isGenerating, error } = useGenerateMeme()
  const methods = useForm({
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
        topText: y.string().required('Top text is required'),
        bottomText: y.string(),
      })
    ),
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        <Form methods={methods}>
          <TextInput
            name="font"
            label="Font"
            type="text"
            placeholder="Impact"
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
          <TextInput
            name="imageName"
            label="Image Name"
            type="text"
            placeholder="Condescending-Wonka"
          />
          <SubmitButton>
            Generate
          </SubmitButton>
        </Form>
      </div>
      <div className={styles.picture}>
        {(() => {
          if (isGenerating) return <p>Generating meme...</p>
          if (error) return <p>Error: {error.message}</p>
          if (meme) return <GeneratedImage base64Image={meme} altText="Generated meme"/>
          return <p>Some sort of animation</p> 
        })()}
      </div>
    </div>
  )
}

Index.Layouts = ['BaseLayout']
export default Index

const GeneratedImage = ({ base64Image, altText }) => {
  return (
    <div className={styles['image-container']}>
      <img src={base64Image} alt={altText} className={styles['generated-img']} />
      <Tooltip label="Download">
        <Button
          icon="download"
          hideText
          className={styles['action-btn']}
        />
      </Tooltip>
    </div>
  )
}