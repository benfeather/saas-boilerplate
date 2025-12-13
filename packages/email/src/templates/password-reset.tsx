import { Button, Preview } from '@react-email/components'
import MasterLayout from '../layouts/master'

type Props = {
  name: string
  url: string
}

export function PasswordReset({ name, url }: Props) {
  return (
    <MasterLayout>
      <Preview>Reset your password</Preview>

      <h1 className="mb-6 font-bold text-2xl text-gray-900">Hi {name}</h1>

      <p className="mb-4 text-base text-gray-700 leading-5">
        Please reset your password by clicking the button below.
      </p>

      <Button
        href={url}
        className="bg-blue-500 px-3 py-2 font-medium text-white leading-4"
      >
        Reset your password
      </Button>
    </MasterLayout>
  )
}

export default PasswordReset
