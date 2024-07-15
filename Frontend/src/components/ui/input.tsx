import * as React from 'react'

import { cn } from '@/lib/utils'
import { IconProps } from '@radix-ui/react-icons/dist/types'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  iconClassName?: string
  iconAction?: () => void
  reverse?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, Icon, iconClassName, iconAction, reverse, ...props },
    ref,
  ) => {
    return (
      <span
        className={cn(
          'flex items-center gap-1 w-full h-9 rounded-md pr-4 shadow-sm',
          className,
        )}
      >
        {reverse && Icon && (
          <Icon
            className={cn(
              'w-6 h-6',
              iconClassName,
              iconAction ? 'cursor-pointer' : '',
            )}
            onClick={iconAction}
          />
        )}
        <input
          type={type}
          className={cn(
            'flex w-full bg-transparent outline-none px-3 py-1 border-0 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          )}
          ref={ref}
          {...props}
        />
        {!reverse && Icon && (
          <Icon
            className={cn(
              'w-6 h-6',
              iconClassName,
              iconAction ? 'cursor-pointer' : '',
            )}
            onClick={iconAction}
          />
        )}
      </span>
    )
  },
)
Input.displayName = 'Input'

export { Input }
