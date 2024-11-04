import Case from 'case'
import { connectByRef } from '../util/connect-by-ref'
import * as Inputs from '/components/inputs'

export const TextInput = connectByRef(Inputs.TextInput)
export const Checkbox = connectByRef(Inputs.Checkbox)
export const RadioButton = connectByRef(
  Inputs.RadioButton,
  // override the default props since radio auto label should be based
  // on the value rather than the name
  ({name, error, props}) =>
    ({name, error, label: Case.capital(props.value || '')})
)
// TODO: get these other inputs working
// export const DatePickerSelect = connectByRef(Inputs.DatePickerSelect)
// export const SelectInput = connectByRef(Inputs.SelectInput)
// export const FileUpload = connectByRef(Inputs.FileUpload)
