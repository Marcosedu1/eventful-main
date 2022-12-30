import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  title?: string;
  asChild?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  color?: 'primary' | 'secondary' | 'dark';
}

export default function Button( {title, disabled, asChild, children, color = 'primary', size = 'md', ...rest}:Props ) {
  const classes = clsx(`relative text-white py-2 px-4 rounded-full transition-all duration-200 font-bold`, {
    'opacity-25':disabled,
    'bg-blue-600 hover:bg-blue-800':color == 'primary',
    'bg-orange-600 hover:bg-orange-800':color == 'secondary',
    'bg-gray-600 hover:bg-gray-800':color == 'dark',
    'w-[150px]':size == 'sm',
    'w-[250px]':size == 'md',
    'w-[500px]':size == 'lg',
    'w-1':size == 'full',
  });
  const Component = asChild ? Slot : 'button';
  return(
    <Component className={classes} disabled={disabled} {...rest}>
      {children??title}
    </Component>
  )
}