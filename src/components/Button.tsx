type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'transparent' | 'outline'
  size?: 'small' | 'medium' | 'large'
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-xl cursor-pointer transition-colors ${buttonVariant[variant]} ${buttonSize[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const buttonSize = {
  small: 'px-4 py-2',
  medium: 'px-6 py-3',
  large: 'px-8 py-4',
}

const buttonVariant = {
  primary: 'bg-black hover:bg-zinc-800 text-white',
  secondary: 'bg-zinc-200 hover:bg-zinc-300',
  transparent: 'bg-transparent hover:bg-zinc-200',
  outline:
    'bg-transparent hover:bg-zinc-200 border border-zinc-800 hover:border-black',
}
