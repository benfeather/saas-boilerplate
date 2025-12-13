import {
  Body,
  Container,
  Head,
  Html,
  pixelBasedPreset,
  Tailwind,
} from '@react-email/components'

type Props = {
  children: React.ReactNode
}

export default function MasterLayout({ children }: Props) {
  return (
    <Html>
      <Head />
      <Body>
        <Tailwind
          config={{
            presets: [pixelBasedPreset],
            theme: {},
          }}
        >
          <Container className="mx-auto w-full max-w-[600px] p-0">
            {children}
          </Container>
        </Tailwind>
      </Body>
    </Html>
  )
}
