import { TextInput, SubmitButton, Checkbox, RadioButton, Form, useForm } from '/components/form'
import { Checkbox as ManualCheckbox } from '/components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

export default {
  title: 'Components/Form/Form',
  component: Form,
  tags: ['autodocs'],
}

const wait = async (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))

const Template = () => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        textInput: y.string().required('Text Input is a required field'),
      })
    ),
    onSubmit: async (data) => {
      await wait(3000)
      alert(`onSubmit: ${JSON.stringify(data)}`)
    }
  })
  const data = methods.watch()
  return <div>
    <Form methods={methods} >
      <TextInput name='textInput' />
      <TextInput name='nested.nestedInputExample' />
      <Checkbox name='automaticCheckbox' />
      <ManualCheckbox label='Manual Checkbox' {...methods.register('manualCheckbox')} />
      <fieldset>
        <RadioButton name='color' value='red' />
        <RadioButton name='color' value='green' />
        <RadioButton name='color' value='blue' />
      </fieldset>
      <SubmitButton>Submit</SubmitButton>
    </Form>
    <div style={{padding: '1em', border: '1px solid #efefef', borderRadius: '1em', marginTop: '2em'}} >
      <p style={{fontStyle: 'italic', fontSize: '12px'}} >Preview of the form data that will be included in onSubmit</p>
      <pre style={{padding: '1em', backgroundColor: '#efefef', borderRadius: '0.5em'}} >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  </div>
}

export const Default = Template.bind({})
Default.args = {}
