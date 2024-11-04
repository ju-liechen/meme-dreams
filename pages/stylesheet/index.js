import {
  TextInput,
  Textarea,
  SelectInput,
  DatePickerSelect,
  RadioButton,
  Checkbox,
  FileUpload,
} from 'components/inputs'
import { Button } from 'components/button'
import { Popover } from 'components/popover'
import { Pagination } from 'components/pagination/pagination'
import { Progress } from 'components/progress-bar/progress-bar'

const Stylesheet = () => {
  return (
    <div
      className="container"
      style={{
        maxWidth: '600px',
      }}
    >
      <h1>Stylesheet</h1>
      <h2>Form Fields</h2>
      <TextInput label="text input" placeholder="Type here" />
      <TextInput
        label="text input w/ error"
        value="invalid entry"
        error="Im broken"
      />
      <Textarea label="text area" />
      <Textarea
        label="text area w/ error"
        value="Some text"
        error="Too little text"
      />
      <SelectInput
        label="Select field"
        placeholder="Select an option"
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ]}
      />

      <SelectInput
        label="Select field w/ error"
        placeholder="Select an option"
        value={2}
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ]}
        error="Wrong choice"
      />
      <DatePickerSelect label="DatePicker" Placeholder="Select a date" />
      <DatePickerSelect
        value="2024-04-20"
        label="DatePicker w/ error"
        error="Wrong date"
      />
      <RadioButton label="Radio Button" />
      <RadioButton label="Radio Button (selected)" checked={true} />
      <Checkbox label="checkbox" name="test" />
      <Checkbox label="checkbox (selected)" name="test" checked={true} />
      <FileUpload label="Upload file" />

      <h2>Buttons</h2>
      <Button variation="primary">Primary Button</Button>
      <Button variation="secondary">Secondary Button</Button>
      <Button variation="outline">Outline Button</Button>
      <Button variation="icon" icon="chevron-down" iconPosition="left">
        Icon button
      </Button>
      <Button variation="outline" icon="search">
        Outline button w/ Icon
      </Button>
      <Button
        isLoading="true"
        variation="outline"
        loadingText="Im in a loading state"
      >
        Button text
      </Button>
      <Button variation="secondary" size="small">
        Small button
      </Button>
      <br />
      <br />
      <Button fullWidth>Full width button</Button>

      <h2>Popover component</h2>
      <div
        style={{
          width: '200px',
          border: '1px solid grey',
          padding: '20px',
          background: '#efefef',
        }}
      >
        <Popover trigger="Click me">
          <p>I go inside the popover</p>
        </Popover>
      </div>

      <h2>Pagination</h2>
      <Pagination totalPages={5} currentPage={2} />

      <h2>Progress</h2>
      <Progress progress={33} />
    </div>
  )
}

Stylesheet.Layouts = ['BaseLayout']
export default Stylesheet
