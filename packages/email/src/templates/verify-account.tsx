import { Button, Preview } from '@react-email/components'
import MasterLayout from '../layouts/master'

type Props = {
  name: string
  url: string
}

export function VerifyAccount({ name, url }: Props) {
  return (
    <MasterLayout>
      <Preview>Verify your email address</Preview>

      <h1 className="mb-6 font-bold text-2xl text-gray-900">Hi {name}</h1>

      <p className="mb-4 text-base text-gray-700 leading-5">
        Please verify your email address by clicking the button below.
      </p>

      <Button
        href={url}
        className="bg-blue-500 px-3 py-2 font-medium text-white leading-4"
      >
        Verify your email address
      </Button>
    </MasterLayout>
  )
}

export default VerifyAccount
