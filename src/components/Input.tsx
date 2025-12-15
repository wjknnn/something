type InputProps = React.ComponentProps<'input'> & {
  label: string
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={props.id}>{label}</label>
      <input
        {...props}
        className="border border-zinc-400 focus:border-black rounded-xl px-3 py-2"
      />
    </div>
  )
}
