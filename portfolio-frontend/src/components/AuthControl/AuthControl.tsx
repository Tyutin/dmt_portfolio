'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Session } from 'next-auth';
import Button from '../Button/Button';
import './AuthControl.scss';

export default function AuthControl(props: { session: Session | null }) {
  const { session } = props;
  if (!session) {
    return <Button theme='white' onClick={() => signIn('vk')}>Войти</Button>
  }
  return (
    <Link className="auth-link" href={'/profile'}>
        <img
          src={session?.user?.image || ''}
          alt={session?.user?.name || ''}
          className="auth-user-picture"
        />
    </Link>
  );
}
