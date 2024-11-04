import { FormProvider } from 'react-hook-form'

/**
 * TODO: Improve the global form error
 *
 * This Form component should always be used with useForm found in
 * /components/utils/use-form
 *
 * Look at the story code to see how it works with inputs.
 *
 * What this component does:
 *
 * - Sets the FormProvider context so that inputs inside of it 
 *   can access things like register and form errors directly inside
 *   of them rather than having them passed down as props. See react-hook-form
 *   docs on FormProvider for more information.
 * - Shows the form-level formError if there is one.
 * - Passes along the onSubmit which is returned by /components/utils/use-form
 *
 */
export const Form = ({methods, children, ...props}) =>
  <FormProvider {...methods} >
    <form onSubmit={methods.onSubmit} {...props} >
      {methods.formState.errors.root?.formError && <h4>{methods.formState.errors.root?.formError?.message}</h4>}
      {children}
    </form>
  </FormProvider>

