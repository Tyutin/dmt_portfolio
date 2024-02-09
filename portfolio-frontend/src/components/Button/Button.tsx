'use client';
import classNames from 'classnames';
import Link from 'next/link';
import './Button.scss';

export type ButtonProps = {
  onClick?: () => void;
  theme: 'white' | 'user-link' | null;
  additionalClasses?: string | string[];
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  tag?: 'button' | 'a';
  href?: string;
  active?: boolean;
};

export default function Button({
  onClick,
  theme,
  additionalClasses,
  type,
  children,
  tag = 'button',
  href,
  active,
}: ButtonProps) {
  if (tag === 'a') {
    return (
      <Link
        href={href || '/'}
        className={classNames(
          'button',
          {
            [`button_theme_${theme}`]: theme,
          },
          active && `button_theme_${theme}_active`,
          additionalClasses
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={classNames(
        'button',
        {
          [`button_theme_${theme}`]: theme,
        },
        active && `button_theme_${theme}_active`,
        additionalClasses
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
