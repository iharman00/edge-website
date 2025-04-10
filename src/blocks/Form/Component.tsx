'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { Card, CardContent } from '@/components/ui/card'
import { SquareCheck } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from '@/environment'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  form: FormType
  introContent: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const form = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
  } = form

  const recaptchaTokenRef = useRef<string>(null)
  const router = useRouter()

  const onSubmit: SubmitHandler<FormFieldBlock[]> = async (data) => {
    if (!recaptchaTokenRef.current) {
      setError('root', { message: 'Please complete the reCAPTCHA' })
      return
    }
    const dataToSend = Object.entries(data).map(([name, value]) => ({
      field: name,
      value,
    }))

    try {
      const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        body: JSON.stringify({
          form: formID,
          submissionData: dataToSend,
          recaptchaToken: recaptchaTokenRef.current,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const res = await req.json()

      if (req.status >= 400) {
        setError('root', {
          message: res.errors?.[0]?.message || 'Internal Server Error',
        })

        return
      }

      if (confirmationType === 'redirect' && redirect) {
        const { url } = redirect

        const redirectUrl = url

        if (redirectUrl) router.push(redirectUrl)
      }
    } catch (err) {
      console.warn(err)
      setError('root', {
        message: 'Something went wrong, please try again later.',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center md:gap-8">
      <RichText className="mb-8 lg:mb-12 max-w-md" data={introContent} enableGutter={false} />
      <Card className="w-full max-w-md ">
        <CardContent className="h-full">
          <FormProvider {...form}>
            {!isSubmitting && isSubmitSuccessful && confirmationType === 'message' && (
              <div className="flex items-center justify-center gap-5 h-full">
                <SquareCheck className="size-16 text-primary" />
                <RichText data={confirmationMessage} />
              </div>
            )}
            {!isSubmitSuccessful && (
              <form
                id={formID}
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-center gap-6"
              >
                <div>
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (Field) {
                        return (
                          <div className="mb-6 last:mb-0" key={index}>
                            <Field
                              form={formFromProps}
                              {...field}
                              {...form}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        )
                      }
                      return null
                    })}
                </div>
                <ReCAPTCHA
                  sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(token) => (recaptchaTokenRef.current = token)}
                  className="mx-auto"
                />
                {errors.root && <div className="text-red-500 text-sm">{errors.root?.message}</div>}
                <Button
                  form={formID}
                  className="w-full"
                  type="submit"
                  variant="default"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <LoadingSpinner />}
                  {submitButtonLabel}
                </Button>
              </form>
            )}
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
