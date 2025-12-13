import { Button, Preview } from '@react-email/components'
import MasterLayout from '../layouts/master'

export default function Email() {
  return (
    <MasterLayout>
      <Preview>See your stats from 2024</Preview>

      <Button
        href="https://example.com"
        className="bg-blue-500 px-3 py-2 font-medium text-white leading-4"
      >
        Click me
      </Button>
    </MasterLayout>
  )
}
