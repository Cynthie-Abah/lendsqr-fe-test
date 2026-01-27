import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import '../../styles/components/button.scss'

type ButtonProps = {
  variant?: 'default' | 'destructive' | 'outline' | 'outline-gray' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'default',
  size = 'md',
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={clsx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        className
      )}
      {...props}
    />
  );
}