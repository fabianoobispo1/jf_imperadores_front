'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Icons } from './icons';
import { LoadingButton } from './ui/loading-button';
import { useState } from 'react';

export default function GitHubSignInButton() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  async function handleLogin() {
    setLoading(true);

    const result = await signIn('github', {
      callbackUrl: callbackUrl ?? '/dashboard'
    });

    if (result?.error) {
      console.log(result);
    } else {
      setLoading(false);
      /*  window.location.href = result?.url ?? '/dashboard'; */
    }
    setLoading(false);
  }

  return (
    <LoadingButton
      className="w-full"
      variant="outline"
      type="button"
disabled
      loading={loading}
      onClick={() => handleLogin()}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue Com Github
    </LoadingButton>
  );
}
