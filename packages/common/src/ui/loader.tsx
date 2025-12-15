import { Icon } from '@iconify/react'
import type * as React from 'react'
import { cn } from 'tailwind-variants'

export function Loader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <Icon icon="lucide:loader-circle" className="animate-spin" />
    </div>
  )
}
